"""Iteration 10: self-check gate lead sync flag + WebVTT caption files."""
import os
import re
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://drsoni-jaipur.preview.emergentagent.com').rstrip('/')
API = f"{BASE_URL}/api"
PASSCODE = "SoniClinic@2026"

CAPTION_SLUGS = [
    "recovery-1", "recovery-2", "recovery-3", "recovery-4", "hero-doctor",
]
DEVANAGARI_RE = re.compile(r"[\u0900-\u097F]")


@pytest.fixture(scope="module")
def admin_token():
    r = requests.post(f"{API}/admin/login", json={"passcode": PASSCODE})
    assert r.status_code == 200, r.text
    return r.json()["token"]


# ---------- Gate lead persistence ----------
def test_gate_lead_creates_with_sheet_synced_false():
    """Lead submitted from self-check gate should return 200, include sheet_synced=False (empty webhook)."""
    payload = {
        "name": "TEST_gate_user",
        "phone": "9998887010",
        "source": "self_check",
        "track": "general",
        "track_label": "General mental health",
        "score": 15,
        "max_score": 24,
        "risk_band": "moderate",
        "answers": [
            {"question": "Q1", "answer": "Often", "value": 2},
            {"question": "Q2", "answer": "Sometimes", "value": 1},
        ],
        "language": "en",
    }
    r = requests.post(f"{API}/leads", json=payload)
    assert r.status_code == 200, r.text
    data = r.json()
    assert "sheet_synced" in data, "Lead response must include sheet_synced field"
    assert data["sheet_synced"] is False, "sheet_synced should be False when webhook empty"
    assert data["source"] == "self_check"
    assert data["risk_band"] == "moderate"
    assert data["score"] == 15
    assert data["name"] == "TEST_gate_user"


def test_gate_lead_appears_in_admin_dashboard(admin_token):
    payload = {
        "name": "TEST_gate_dashboard",
        "phone": "9998887011",
        "source": "self_check",
        "track": "deaddiction",
        "track_label": "De-addiction",
        "score": 20,
        "max_score": 24,
        "risk_band": "high",
        "answers": [{"question": "Craving?", "answer": "Almost always", "value": 3}],
        "language": "en",
    }
    created = requests.post(f"{API}/leads", json=payload).json()
    r = requests.get(f"{API}/leads", headers={"Authorization": f"Bearer {admin_token}"})
    assert r.status_code == 200
    match = next((x for x in r.json() if x["id"] == created["id"]), None)
    assert match is not None, "Gate lead must appear in admin listing"
    assert match["source"] == "self_check"
    assert match["risk_band"] == "high"
    assert match["answers"] and match["answers"][0]["answer"] == "Almost always"


def test_lead_creation_never_500_when_webhook_empty():
    """Regression: empty GOOGLE_SHEETS_WEBHOOK_URL must no-op silently."""
    for _ in range(3):
        r = requests.post(f"{API}/leads", json={
            "name": "TEST_no500",
            "phone": "9998887012",
            "source": "self_check",
            "language": "en",
        })
        assert r.status_code == 200, f"Got {r.status_code}: {r.text}"


# ---------- Caption files ----------
@pytest.mark.parametrize("slug", CAPTION_SLUGS)
@pytest.mark.parametrize("lang", ["en", "hi"])
def test_caption_file_served(slug, lang):
    url = f"{BASE_URL}/captions/{slug}.{lang}.vtt"
    r = requests.get(url, timeout=15)
    assert r.status_code == 200, f"{url} -> {r.status_code}"
    ctype = r.headers.get("content-type", "").lower()
    assert "text/vtt" in ctype or "vtt" in ctype, f"{url} content-type={ctype}"
    body = r.text.lstrip("\ufeff")
    assert body.startswith("WEBVTT"), f"{url} body should start with WEBVTT, got: {body[:40]!r}"


@pytest.mark.parametrize("slug", CAPTION_SLUGS)
def test_hinglish_caption_no_devanagari(slug):
    url = f"{BASE_URL}/captions/{slug}.hi.vtt"
    r = requests.get(url, timeout=15)
    assert r.status_code == 200
    matches = DEVANAGARI_RE.findall(r.text)
    assert not matches, f"{url} contains Devanagari characters: {matches[:5]}"
