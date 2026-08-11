from fastapi import FastAPI, APIRouter, HTTPException, Header
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import httpx
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional, Annotated, Any
from pydantic.functional_validators import BeforeValidator
from bson import ObjectId
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Email (Emergent managed Resend)
EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ["EMERGENT_EMAIL_KEY"]
EMAIL_FROM_NAME = os.environ["EMAIL_FROM_NAME"]
LEAD_NOTIFY_EMAIL = os.environ.get("LEAD_NOTIFY_EMAIL", "dradityasoni1@gmail.com")

# Instagram feed (Instagram API with Instagram Login). All optional until the clinic connects.
IG_API_VERSION = os.environ.get("IG_API_VERSION", "v23.0")
IG_GRAPH = f"https://graph.instagram.com/{IG_API_VERSION}"
IG_ACCESS_TOKEN = os.environ.get("INSTAGRAM_ACCESS_TOKEN", "").strip()
IG_USER_ID = os.environ.get("INSTAGRAM_USER_ID", "").strip()
IG_ADMIN_TOKEN = os.environ.get("INSTAGRAM_ADMIN_TOKEN", "").strip()
IG_FIELDS = "id,media_type,media_url,thumbnail_url,caption,permalink,timestamp,username"

app = FastAPI()
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


# ---------- Models ----------
PyObjectId = Annotated[str, BeforeValidator(str)]


class AnswerItem(BaseModel):
    question: str
    answer: str
    value: int = 0


class LeadCreate(BaseModel):
    name: str
    phone: str
    source: str = "self_check"           # self_check | booking_form
    track: Optional[str] = None           # general | deaddiction | child
    track_label: Optional[str] = None
    score: Optional[int] = None
    max_score: Optional[int] = None
    risk_band: Optional[str] = None       # low | moderate | high
    concern: Optional[str] = None         # for booking form
    preferred_time: Optional[str] = None
    answers: List[AnswerItem] = []
    language: str = "en"


class Lead(LeadCreate):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    email_sent: bool = False


# ---------- Email helper ----------
def _build_lead_email(lead: Lead) -> str:
    band_colors = {"high": "#B03A2E", "moderate": "#C87560", "low": "#124340"}
    band = (lead.risk_band or "").lower()
    band_color = band_colors.get(band, "#124340")
    src = "Self-Check Questionnaire" if lead.source == "self_check" else "Booking Form"

    rows = []
    def row(label, value):
        if value in (None, "", []):
            return
        rows.append(
            f'<tr><td style="padding:8px 14px;color:#4A6161;font-size:14px;width:180px;vertical-align:top;">{label}</td>'
            f'<td style="padding:8px 14px;color:#0A2523;font-size:14px;font-weight:600;">{value}</td></tr>'
        )

    row("Name", lead.name)
    row("Phone", lead.phone)
    row("Source", src)
    row("Language", "Hindi" if lead.language == "hi" else "English")
    if lead.track_label:
        row("Concern Track", lead.track_label)
    if lead.score is not None:
        row("Score", f"{lead.score} / {lead.max_score}")
    if lead.risk_band:
        row("Risk Band", f'<span style="color:{band_color};text-transform:capitalize;">{lead.risk_band}</span>')
    if lead.concern:
        row("Concern", lead.concern)
    if lead.preferred_time:
        row("Preferred Time", lead.preferred_time)
    row("Received", datetime.now(timezone.utc).strftime("%d %b %Y, %H:%M UTC"))

    answers_html = ""
    if lead.answers:
        ans_rows = "".join(
            f'<tr><td style="padding:6px 14px;color:#0A2523;font-size:13px;">{a.question}</td>'
            f'<td style="padding:6px 14px;color:#4A6161;font-size:13px;text-align:right;">{a.answer}</td></tr>'
            for a in lead.answers
        )
        answers_html = (
            '<h3 style="color:#124340;font-size:15px;margin:24px 0 8px;">Questionnaire responses</h3>'
            f'<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;background:#FCFAF8;border-radius:12px;overflow:hidden;">{ans_rows}</table>'
        )

    return f"""
    <div style="background:#F5F3EC;padding:28px;font-family:Arial,Helvetica,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#FCFAF8;border-radius:16px;overflow:hidden;border:1px solid #E2DCD0;">
        <tr><td style="background:#124340;padding:20px 24px;">
          <div style="color:#F5F3EC;font-size:18px;font-weight:700;">New lead — Dr. Aditya Soni Clinic</div>
          <div style="color:#E8DCC8;font-size:13px;margin-top:4px;">A visitor completed the {src.lower()}.</div>
        </td></tr>
        <tr><td style="padding:22px 10px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">{''.join(rows)}</table>
          {answers_html}
          <div style="margin-top:24px;padding:14px 16px;background:#E8DCC8;border-radius:12px;color:#0A2523;font-size:13px;">
            Tip: call back within a few hours while intent is high. Lead ID: {lead.id}
          </div>
        </td></tr>
      </table>
    </div>
    """


async def _send_lead_email(lead: Lead) -> bool:
    urgent = (lead.risk_band or "").lower() == "high"
    prefix = "URGENT — " if urgent else ""
    subject = f"{prefix}New lead: {lead.name} ({lead.phone})"
    payload = {
        "to": [LEAD_NOTIFY_EMAIL],
        "subject": subject,
        "html": _build_lead_email(lead),
        "from_name": EMAIL_FROM_NAME,
    }
    try:
        async with httpx.AsyncClient(timeout=30) as http:
            resp = await http.post(
                f"{EMAIL_BASE_URL}/api/v1/email/send",
                headers={"X-Email-Key": EMAIL_KEY},
                json=payload,
            )
        resp.raise_for_status()
        return True
    except Exception as e:
        logger.error(f"Lead email send failed: {str(e)}")
        return False


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Dr. Aditya Soni Clinic API"}


@api_router.post("/leads", response_model=Lead)
async def create_lead(payload: LeadCreate):
    lead = Lead(**payload.model_dump())
    email_sent = await _send_lead_email(lead)
    lead.email_sent = email_sent
    doc = lead.model_dump()
    await db.leads.insert_one(doc)
    return lead


@api_router.get("/leads", response_model=List[Lead])
async def list_leads():
    docs = await db.leads.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    return [Lead(**d) for d in docs]


# ---------- Instagram feed ----------
def _require_ig_admin(authorization: Optional[str]):
    if not IG_ADMIN_TOKEN:
        raise HTTPException(503, "Instagram admin token not configured")
    token = (authorization or "").replace("Bearer ", "").strip()
    if token != IG_ADMIN_TOKEN:
        raise HTTPException(401, "Unauthorized")


async def _ig_sync(limit: int = 30) -> int:
    if not IG_ACCESS_TOKEN or not IG_USER_ID:
        raise HTTPException(503, "Instagram is not connected yet")
    params = {"fields": IG_FIELDS, "limit": min(limit, 50), "access_token": IG_ACCESS_TOKEN}
    try:
        async with httpx.AsyncClient(timeout=25) as http:
            resp = await http.get(f"{IG_GRAPH}/{IG_USER_ID}/media", params=params)
        resp.raise_for_status()
        data = resp.json().get("data", [])
    except Exception as e:
        logger.error(f"Instagram sync failed: {str(e)}")
        raise HTTPException(502, "Instagram request failed")

    count = 0
    for item in data:
        doc = {
            "media_id": item["id"],
            "media_type": item.get("media_type"),
            "media_url": item.get("media_url"),
            "thumbnail_url": item.get("thumbnail_url"),
            "caption": item.get("caption", ""),
            "permalink": item.get("permalink"),
            "timestamp": item.get("timestamp"),
            "username": item.get("username"),
            "synced_at": datetime.now(timezone.utc).isoformat(),
        }
        await db.instagram_media.update_one(
            {"media_id": item["id"]},
            {"$set": doc, "$setOnInsert": {"featured": False}},
            upsert=True,
        )
        count += 1
    return count


@api_router.get("/instagram/feed")
async def instagram_feed(limit: int = 6, featured_only: bool = False):
    """Public, cached feed. Returns [] when not connected — frontend falls back to curated posts."""
    query = {"featured": True} if featured_only else {}
    docs = await db.instagram_media.find(query, {"_id": 0}).sort("timestamp", -1).to_list(max(1, min(limit, 50)))
    if featured_only and not docs:
        docs = await db.instagram_media.find({}, {"_id": 0}).sort("timestamp", -1).to_list(max(1, min(limit, 50)))
    return {"connected": bool(IG_ACCESS_TOKEN and IG_USER_ID), "data": docs}


@api_router.post("/instagram/sync")
async def instagram_sync(authorization: Optional[str] = Header(None)):
    _require_ig_admin(authorization)
    return {"imported": await _ig_sync()}


class FeatureBody(BaseModel):
    featured: bool


@api_router.patch("/instagram/media/{media_id}/feature")
async def instagram_feature(media_id: str, body: FeatureBody, authorization: Optional[str] = Header(None)):
    _require_ig_admin(authorization)
    result = await db.instagram_media.update_one(
        {"media_id": media_id}, {"$set": {"featured": body.featured}}
    )
    if not result.matched_count:
        raise HTTPException(404, "Media not found")
    return {"media_id": media_id, "featured": body.featured}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
