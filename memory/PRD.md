# PRD — Dr. Aditya Soni Clinic Landing Page

## Original problem statement
Single-page, mobile-first, high-converting top-of-funnel landing page for Dr. Aditya
Soni Clinic (psychiatry & de-addiction, Pratap Nagar, Jaipur). Goal: an anxious/confused
visitor feels understood, self-identifies via an interactive questionnaire, and is guided
to book/call/WhatsApp within ~3 minutes on mobile — in a stigma-heavy context.
Emotional arc: Arrival → Recognition → Trust → Clarity → Relief+Direction → Action.

## Architecture
- **Frontend**: React 19 + Tailwind, framer-motion (reveals/parallax), lenis (smooth scroll),
  @phosphor-icons/react, react-fast-marquee. Bilingual (English/हिंदी) via LanguageContext + i18n.js.
  Sections: Header (sticky, glass), Hero (masked line reveal + parallax), Ribbon marquee,
  Recognition cards, SelfCheck widget, About, Services (bento), WhatToExpect, Testimonials,
  FAQ, FinalCTA (booking form + Google Map), Footer, Mobile CTA bottom bar.
- **Backend**: FastAPI + MongoDB. `POST /api/leads` (store + email), `GET /api/leads`.
  Email via Emergent-managed Resend → dradityasoni1@gmail.com.
- **Design**: Warm sand (#F5F3EC), deep teal (#124340), terracotta (#C87560). Cormorant
  Garamond + Outfit. Jali/mandala motifs, grain, soft rounded cards.

## User personas
- Anxious individual unsure if they "need" help.
- Family member worried about a loved one's addiction / a child's behaviour.
- Privacy-sensitive; mobile-first; Hindi/Hinglish comfortable.

## Core requirements (static)
- Empathy-first, non-diagnostic copy; privacy reassurance throughout.
- Interactive 3-track self-check (General / De-Addiction / Child), 8 questions each,
  frequency scale, progress bar, gentle risk banding (low/moderate/high), name+phone
  capture at END, urgent helpline (Tele-MANAS 14416 / 1800-891-4416) for high risk.
- Language toggle EN/HI. Sticky call/WhatsApp. LocalBusiness/Physician schema, SEO meta.

## Implemented (2026-08-06)
- Full bilingual single-page site with all 11 sections + mobile CTA bar.
- Interactive self-check widget with scoring engine + lead email/DB capture. VERIFIED via curl.
- Booking form with concern dropdown + preferred time + embedded map. Email notify working.
- Placeholder stats (15+ yrs, 1000+ patients) marked editable; AI-generated warm imagery.

## Implemented (later sessions)
- WhatsApp auto-reply setup + prefilled bilingual messages; service deep-dive pages (react-router);
  swipeable anonymous story stacks (SwipeStack); "Insights from Dr. Soni" IG-style section with
  modal viewer; Instagram auto-import backend (`/api/instagram/feed|sync`, falls back to
  src/data/insights.js until INSTAGRAM_* keys are set in backend/.env).
- 2026-09-08: SelfCheck redesigned as a large layered card stack directly below Hero
  (parallax backdrop cards via useScroll/useTransform, whole front card clickable, tap hint,
  single Start button). Result now shows a **Provisional impression** block (severity ×
  track concern, explicitly non-diagnostic), gentle next steps, and a teal "Book Consultation"
  invite that scrolls to #contact. Header gained a "Book Consultation" button (desktop + mobile
  menu). VERIFIED by testing agent (iteration_6.json) in EN + HI.

- 2026-06-08: **Video testimonials** — written quote stack replaced with 4 real patient
  video testimonials (recovery-themed bilingual labels, ffmpeg-generated posters in
  `/frontend/public/posters/`, click-to-play lightbox with Esc/close). `VideoTestimonials.jsx`.
- 2026-06-08: **Real doctor photo** swapped into Hero + About (`IMAGES.drPortrait`).
- 2026-06-08: **Booking prefill** — `PrefillContext` carries name/phone/concern from the
  Self Check result into the booking form with a "from your self-check" note (EN + HI).
- 2026-06-08: **Leads Dashboard** at `/admin/leads` — shared clinic passcode → 12h JWT,
  lead cards with call/WhatsApp actions, risk band, expandable questionnaire answers,
  status pipeline (new/contacted/booked/closed) + filters. Backend: `POST /api/admin/login`,
  `GET /api/admin/me`, `GET /api/leads` (now protected), `PATCH /api/leads/{id}/status`,
  brute-force lockout (8 tries / 15 min per IP). VERIFIED by testing agent (iteration_7.json,
  100% backend + frontend; pytest suite at `/app/backend/tests/test_admin.py`).

- 2026-06-08: **WhatsApp summary** — Self Check result has a "Send my summary on WhatsApp"
  block (plus the options row + thanks screen) that opens WhatsApp pre-filled with concern,
  score, provisional impression and the top 3 most-flagged answers, bilingual. Nothing sends
  until the visitor presses send. Verified in EN + HI via the built wa.me href.

- 2026-06-08: **Hindi → Hinglish**. Per user request the Devanagari locale was removed entirely;
  the second language is now **Hinglish in Roman script** (balanced Jaipur WhatsApp tone).
  Toggle reads English ⇄ Hinglish (lang code stays `hi` internally). Rewrote the whole `hi`
  block of `i18n.js`, the `hi` block of `data/serviceDetails.js`, all 6 `insights.js` captions,
  plus inline error strings in SelfCheck/FinalCTA and the "Agli service" label. Verified by
  testing agent (iteration_8.json): zero Devanagari left in source or rendered pages
  (landing, all 6 service pages, insights modal, admin), English side unchanged.

- 2026-06-10: **Auto language default** — `GET /api/geo` resolves the visitor's country via
  ipwho.is (keyless free tier, 1000 req/day, 7-day Mongo cache in `geo_cache`, fails open and
  never blocks render). India → site opens in Hinglish; otherwise English. Browser fallback
  (navigator.languages / Asia-Kolkata timezone) is used when the IP lookup is unavailable.
  A visitor's manual toggle is remembered in `localStorage.clinic_lang` and always wins.
  Hero headline weight bumped to bold.

- 2026-06-10: **CSV export** — `GET /api/leads/export.csv` (admin token required) streams all
  leads with headers (Received, Name, Phone, Status, Source, Language, Concern track, Score,
  Max score, Risk band, Concern, Preferred time, Email sent, Lead ID) as a dated attachment;
  "Export CSV" button in the dashboard header. Verified: 401 without token, correct
  Content-Disposition, and browser download named `dr-soni-leads-YYYY-MM-DD.csv`.

- 2026-06-11: **Hero artwork** — hero image swapped to the user's "Mental Health · It's okay to
  ask for help" illustration (`IMAGES.heroArt`), square `object-contain` so no text is cropped,
  capped at 420px on mobile; privacy badge moved below the art so the artwork caption stays
  readable. Dr. Soni's photo remains in the About section.

- 2026-06-11: **Hero doctor chip** — small avatar chip under the hero CTAs ("Your doctor" /
  "Aapke doctor" + name + creds) using Dr. Soni's real photo; tapping it scrolls to About.
  `data-testid="hero-doctor-chip"`. Verified at 1920px and 390px, no overflow.

- 2026-06-11: **Clinic details + banner + Google reviews** — credentials changed to
  "MD (Psychiatry), MBA · Prof and Unit Head, Mahatma Gandhi Hospital, Jaipur" (About, hero chip,
  trust strip shows the short form); footer/contact now show timings 4:00 PM – 8:00 PM, full
  Raj Plaza / Kumbha Marg address (map embed updated) and phone 09929300003; a slim top banner
  in the header announces online video consultations with a tap-to-call link
  (`data-testid="online-consult-banner"`); Google reviews buttons added under the About portrait
  and at the end of the self-check result (`SITE.googleReviewUrl` — currently a Maps search link,
  TO REPLACE with the clinic's exact Google review URL when the user shares it).

  `SITE.googleReviewUrl` = `https://www.google.com/maps?cid=11855348771608360738` (read-reviews
  view of the clinic's real Google listing, resolved from the user's g.page link).

- 2026-06-11: **Hero video** — the hero media is now Dr. Soni's own video message
  (`HERO_VIDEO` in `lib/site.js`, poster frame at `/posters/hero-doctor.jpg` generated with
  ffmpeg). Shows as a poster with a play button (saves mobile data on a 14 MB clip) and plays
  inline with controls on tap. Bilingual labels `hero.videoLabel` / `hero.videoCta`. The
  "Mental Health / It's okay to ask for help" illustration is no longer shown in the hero
  (`IMAGES.heroArt` retained in site.js if needed elsewhere).

- 2026-06-12: **Video alignment fix + self-check education copy.** Testimonial lightbox now
  reads each clip's intrinsic ratio on `loadedmetadata` and applies it as an inline
  `aspect-ratio` with `w-auto max-h-[74vh]`, so portrait and landscape clips both fit with no
  black letterbox bars; overlay tint fixed to `rgba(10,37,35,0.93)` (the Tailwind `/92` arbitrary
  opacity was rendering washed out); poster crops centred. Hero player switched to
  `object-contain` so nothing is cropped. Self Check result now also shows a track-specific
  educational block (`results.education[track]`, "What this may be") plus a
  `result-call-invite` tel CTA with 09929300003 and safe/confidential/judgment-free wording,
  in EN and Hinglish. Verified by testing agent (iteration_9.json, frontend 100%).

- 2026-06-12: **Video captions + self-check lead gate + Google Sheets sync.**
  Captions: `scripts/generate_captions.py` (Whisper `whisper-1` via EMERGENT_LLM_KEY + gpt-5.4 for
  translation/transliteration) produced `/frontend/public/captions/{recovery-1..4,hero-doctor}.{en,hi}.vtt`;
  both players render two `<track>`s (English + Hinglish) defaulting to the site language.
  Gate: after Q8 a `gate` stage asks name + phone (phone mandatory, "skip for now" link);
  submitting saves the lead and reveals the result with `result-captured-note`; skipping keeps the
  old in-result form. Sheets: `create_lead` now schedules `_sync_lead_to_sheet` as a BackgroundTask
  posting to `GOOGLE_SHEETS_WEBHOOK_URL` (Apps Script web app, shared `GOOGLE_SHEETS_TOKEN`) —
  fail-open, no-ops while the URL is empty, `sheet_synced` flag on the lead. Setup docs:
  `/app/GOOGLE_SHEETS_SETUP.md` + `/app/GOOGLE_SHEETS_APPS_SCRIPT.gs`. **Waiting on the user for the
  Apps Script web app URL.** Verified by testing agent (iteration_10.json, backend 18/18, frontend 100%).

## Backlog (P1/P2)
- P1: Activate real Instagram feed — needs INSTAGRAM_ACCESS_TOKEN, INSTAGRAM_USER_ID,
  INSTAGRAM_ADMIN_TOKEN from the user.
- P1: Admin dashboard — DONE (see 2026-06-08). Next: CSV export + lead notes field.
- P1: Swap placeholder photos/stats/affiliations with Dr. Soni's verified details.
- P2: Inner pages per service ("Learn more" currently anchors to contact).
- P2: Real Google Reviews embed; privacy-policy page.

## Next tasks
- Run testing agent (backend + frontend flows), fix any issues.
