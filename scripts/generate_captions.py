"""One-off: generate English + Hinglish WebVTT captions for the testimonial videos."""
import asyncio
import json
import os
import subprocess
import sys
from pathlib import Path

from dotenv import load_dotenv
from emergentintegrations.llm.openai import OpenAISpeechToText
from emergentintegrations.llm.chat import LlmChat, UserMessage

load_dotenv("/app/backend/.env")
KEY = os.environ["EMERGENT_LLM_KEY"]

WORK = Path("/tmp/captions")
OUT = Path("/app/frontend/public/captions")
WORK.mkdir(parents=True, exist_ok=True)
OUT.mkdir(parents=True, exist_ok=True)

VIDEOS = {
    "recovery-1": "https://customer-assets-lqy194kg.emergentagent.net/job_drsoni-jaipur/artifacts/1oi296t3_video%20testimonial.mp4",
    "recovery-2": "https://customer-assets-lqy194kg.emergentagent.net/job_drsoni-jaipur/artifacts/m3ptzj18_7680c4c3-20ac-4cf7-b547-3fe8a921564f.MP4",
    "recovery-3": "https://customer-assets-lqy194kg.emergentagent.net/job_drsoni-jaipur/artifacts/b0t90fm5_best%20psychologist%20in%20jaipur.mp4",
    "recovery-4": "https://customer-assets-lqy194kg.emergentagent.net/job_drsoni-jaipur/artifacts/xt8algvx_best-psychiatrist-in-jaipur.mp4",
    "hero-doctor": "https://customer-assets-lqy194kg.emergentagent.net/job_drsoni-jaipur/artifacts/doax0voh_WhatsApp%20Video%202026-09-11%20at%2018.32.47.mp4",
}

PROMPT = """You are preparing subtitles for a psychiatry clinic's patient testimonial videos (Jaipur, India).
The speakers talk in Hindi. You receive the raw Hindi transcript split into numbered segments.

For EACH segment return:
- "en": a natural, warm English translation (not word-for-word), same meaning, subtitle length.
- "hi": the SAME Hindi speech written in ROMAN script (Hinglish, how people type on WhatsApp in Jaipur).
  Never use Devanagari script. Keep common English words in English.

Rules: keep one segment per input segment, same order, no extra commentary, never invent content,
keep each line under ~90 characters, fix obvious transcription noise.
Return ONLY JSON: {"segments": [{"i": 1, "en": "...", "hi": "..."}, ...]}"""


def ts(seconds: float) -> str:
    ms = int(round(seconds * 1000))
    h, ms = divmod(ms, 3600000)
    m, ms = divmod(ms, 60000)
    s, ms = divmod(ms, 1000)
    return f"{h:02d}:{m:02d}:{s:02d}.{ms:03d}"


def extract_audio(slug: str, url: str) -> Path:
    mp4 = WORK / f"{slug}.mp4"
    mp3 = WORK / f"{slug}.mp3"
    if not mp3.exists():
        if not mp4.exists():
            subprocess.run(["curl", "-sL", "-o", str(mp4), url], check=True)
        subprocess.run(
            ["ffmpeg", "-v", "error", "-i", str(mp4), "-vn", "-ac", "1", "-ar", "16000",
             "-b:a", "48k", str(mp3), "-y"],
            check=True,
        )
    return mp3


async def transcribe(mp3: Path):
    stt = OpenAISpeechToText(api_key=KEY)
    with open(mp3, "rb") as f:
        resp = await stt.transcribe(
            file=f,
            model="whisper-1",
            response_format="verbose_json",
            language="hi",
            temperature=0.0,
            timestamp_granularities=["segment"],
        )
    return [
        {"start": s["start"] if isinstance(s, dict) else s.start,
         "end": s["end"] if isinstance(s, dict) else s.end,
         "text": (s["text"] if isinstance(s, dict) else s.text).strip()}
        for s in resp.segments
    ]


async def localise(slug: str, segments):
    chat = LlmChat(api_key=KEY, session_id=f"captions-{slug}", system_message=PROMPT).with_model(
        "openai", "gpt-5.4"
    )
    payload = json.dumps(
        {"segments": [{"i": i + 1, "text": s["text"]} for i, s in enumerate(segments)]},
        ensure_ascii=False,
    )
    raw = await chat.send_message(UserMessage(text=payload))
    text = raw.strip()
    if text.startswith("```"):
        text = text.split("```")[1].lstrip("json").strip()
    return json.loads(text)["segments"]


def write_vtt(path: Path, segments, lines):
    by_i = {int(x["i"]): x for x in lines}
    out = ["WEBVTT", ""]
    for i, seg in enumerate(segments, start=1):
        line = by_i.get(i)
        if not line:
            continue
        out.append(f"{ts(seg['start'])} --> {ts(seg['end'])}")
        out.append(line["text"])
        out.append("")
    path.write_text("\n".join(out), encoding="utf-8")


async def main():
    for slug, url in VIDEOS.items():
        print(f"--- {slug}", flush=True)
        mp3 = extract_audio(slug, url)
        segments = await transcribe(mp3)
        print(f"    {len(segments)} segments", flush=True)
        lines = await localise(slug, segments)
        write_vtt(OUT / f"{slug}.en.vtt", segments, [{"i": x["i"], "text": x["en"]} for x in lines])
        write_vtt(OUT / f"{slug}.hi.vtt", segments, [{"i": x["i"], "text": x["hi"]} for x in lines])
        print(f"    wrote {slug}.en.vtt / {slug}.hi.vtt", flush=True)


if __name__ == "__main__":
    sys.exit(asyncio.run(main()))
