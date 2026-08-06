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

## Backlog (P1/P2)
- P1: Admin dashboard UI to view leads (currently JSON endpoint only).
- P1: Swap placeholder photos/stats/affiliations with Dr. Soni's verified details.
- P2: Inner pages per service ("Learn more" currently anchors to contact).
- P2: Real Google Reviews embed; privacy-policy page.

## Next tasks
- Run testing agent (backend + frontend flows), fix any issues.
