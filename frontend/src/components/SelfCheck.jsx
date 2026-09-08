import React, { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Brain,
  Wine,
  Baby,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Phone,
  WhatsappLogo,
  CalendarCheck,
  Lifebuoy,
  CheckCircle,
  Warning,
  Sparkle,
  ClipboardText,
  Compass,
  ChatCircleDots,
} from "@phosphor-icons/react";
import { useLang } from "@/context/LanguageContext";
import { useBookingPrefill } from "@/context/PrefillContext";
import { CONTENT } from "@/i18n";
import { Chapter, FadeUp } from "@/components/Primitives";
import { SITE, waLink, telLink } from "@/lib/site";
import { submitLead } from "@/lib/api";

const trackIcons = { general: Brain, deaddiction: Wine, child: Baby };
const getIcons = [ClipboardText, Compass, ChatCircleDots];

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

export const SelfCheck = () => {
  const { t, lang } = useLang();
  const { setPrefill } = useBookingPrefill();
  const sc = t.selfcheck;
  const R = sc.results;

  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ["start end", "end start"] });
  const cardY = useTransform(scrollYProgress, [0, 1], [34, -34]);
  const backY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const midY = useTransform(scrollYProgress, [0, 1], [48, -48]);
  const backRot = useTransform(scrollYProgress, [0, 1], [-5, -2]);
  const midRot = useTransform(scrollYProgress, [0, 1], [3, 1]);

  const [stage, setStage] = useState("intro"); // intro | track | question | result
  const [track, setTrack] = useState(null);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [dir, setDir] = useState(1);
  const [locked, setLocked] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [err, setErr] = useState("");

  const questions = track ? sc.questions[track] : [];
  const maxScore = questions.length * 3;

  const score = useMemo(() => answers.reduce((s, a) => s + (a?.value || 0), 0), [answers]);

  const band = useMemo(() => {
    if (maxScore === 0) return "low";
    const pct = score / maxScore;
    if (pct >= 0.62) return "high";
    if (pct >= 0.32) return "moderate";
    return "low";
  }, [score, maxScore]);

  const bandData = R[band];

  const trackLabelFor = (id) => sc.tracks.find((x) => x.id === id)?.label || "";

  const chooseTrack = (id) => {
    setTrack(id);
    setAnswers([]);
    setCurrent(0);
    setDir(1);
    setStage("question");
  };

  const answer = (opt) => {
    if (locked) return;
    setLocked(true);
    const q = questions[current];
    const next = [...answers];
    next[current] = { question: q, answer: sc.scaleLabels[opt], value: opt };
    setAnswers(next);
    setDir(1);
    if (current < questions.length - 1) {
      setTimeout(() => {
        setCurrent((c) => c + 1);
        setLocked(false);
      }, 220);
    } else {
      setTimeout(() => {
        setStage("result");
        setLocked(false);
      }, 260);
    }
  };

  const goBack = () => {
    setDir(-1);
    if (current > 0) setCurrent((c) => c - 1);
    else setStage("track");
  };

  const restart = () => {
    setStage("intro");
    setTrack(null);
    setCurrent(0);
    setAnswers([]);
    setLocked(false);
    setName("");
    setPhone("");
    setSubmitted(false);
    setErr("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    if (!name.trim() || phone.replace(/\D/g, "").length < 10) {
      setErr(lang === "hi" ? "कृपया नाम और सही 10-अंकों का नंबर भरें।" : "Please enter your name and a valid 10-digit number.");
      return;
    }
    setSubmitting(true);
    try {
      await submitLead({
        name: name.trim(),
        phone: phone.trim(),
        source: "self_check",
        track,
        track_label: trackLabelFor(track),
        score,
        max_score: maxScore,
        risk_band: band,
        answers,
        language: lang,
      });
      setSubmitted(true);
    } catch (e2) {
      setErr(lang === "hi" ? "कुछ गड़बड़ हुई। कृपया फिर कोशिश करें या कॉल करें।" : "Something went wrong. Please try again or call us.");
    } finally {
      setSubmitting(false);
    }
  };

  const trackToConcern = { general: 0, deaddiction: 1, child: 2 };

  const goToBooking = () => {
    setPrefill({
      name: name.trim(),
      phone: phone.trim(),
      concern: t.finalCTA.concerns[trackToConcern[track]] || "",
      fromSelfCheck: true,
      stamp: Date.now(),
    });
    scrollTo("contact");
  };

  const stepVariants = {
    enter: (d) => ({ x: d > 0 ? 50 : -50, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d) => ({ x: d > 0 ? -50 : 50, opacity: 0 }),
  };

  const progress = stage === "question" ? ((current + 1) / questions.length) * 100 : 0;

  return (
    <section id="selfcheck" className="py-24 lg:py-32 relative overflow-hidden" data-testid="selfcheck-section">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-20 right-0 h-[420px] w-[420px] rounded-full bg-wheat/40 blur-3xl" />
      </div>
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <FadeUp className="text-center flex flex-col items-center">
          <div className="flex justify-center">
            <Chapter n={sc.chapter} title={t.nav.selfcheck} />
          </div>
          <h2 className="mt-6 font-serif text-teal-deep font-normal text-4xl sm:text-5xl tracking-tight leading-[1.05]">
            {sc.title}
          </h2>
          <p className="mt-4 text-lg text-muted max-w-xl">{sc.sub}</p>
        </FadeUp>

        <FadeUp delay={0.1} className="mt-12 sm:mt-16">
          <div ref={cardRef} className="relative" data-testid="selfcheck-card-stack">
            {/* layered backdrop cards */}
            <motion.div
              aria-hidden
              style={{ y: backY, rotate: backRot }}
              className="pointer-events-none absolute inset-x-6 sm:inset-x-10 -top-6 bottom-6 rounded-[2rem] bg-teal/10 border border-teal/10"
            />
            <motion.div
              aria-hidden
              style={{ y: midY, rotate: midRot }}
              className="pointer-events-none absolute inset-x-3 sm:inset-x-5 -top-3 bottom-3 rounded-[2rem] bg-wheat/70 border border-line"
            />
            <motion.div
              style={{ y: cardY }}
              onClick={stage === "intro" ? () => setStage("track") : undefined}
              role={stage === "intro" ? "button" : undefined}
              tabIndex={stage === "intro" ? 0 : undefined}
              onKeyDown={stage === "intro" ? (e) => e.key === "Enter" && setStage("track") : undefined}
              whileHover={stage === "intro" ? { y: -6, scale: 1.005 } : undefined}
              className={`relative bg-surface border border-line rounded-[2rem] shadow-[0_30px_80px_rgba(18,67,64,0.14)] overflow-hidden ${
                stage === "intro" ? "cursor-pointer" : ""
              }`}
              data-testid="selfcheck-front-card"
            >
            {/* progress bar */}
            {stage === "question" && (
              <div className="h-1.5 bg-wheat/60">
                <motion.div
                  className="h-full bg-terracotta"
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.5 }}
                />
              </div>
            )}

            <div className="p-6 sm:p-10 min-h-[440px] flex flex-col">
              <AnimatePresence mode="wait" custom={dir}>
                {/* INTRO */}
                {stage === "intro" && (
                  <motion.div
                    key="intro"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex-1 flex flex-col items-center justify-center text-center"
                    data-testid="selfcheck-intro"
                  >
                    <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.22em] text-terracotta mb-4">
                      <Sparkle size={14} weight="fill" /> {sc.tapHint}
                    </span>
                    <h3 className="font-serif text-3xl sm:text-4xl text-teal-deep leading-tight max-w-lg">
                      {sc.introTitle}
                    </h3>
                    <p className="mt-3 text-[15px] sm:text-base text-muted max-w-lg leading-relaxed">
                      {sc.introBody}
                    </p>

                    {/* what you'll get */}
                    <div className="mt-8 w-full max-w-md">
                      <p className="text-[12px] uppercase tracking-[0.2em] text-terracotta">
                        {sc.whatYouGetTitle}
                      </p>
                      <div className="mt-4 grid gap-2.5 text-left">
                        {sc.whatYouGet.map((item, i) => {
                          const GetIcon = getIcons[i];
                          return (
                            <div
                              key={i}
                              className="flex items-center gap-3 rounded-2xl bg-sand/50 border border-line px-4 py-3"
                              data-testid={`selfcheck-benefit-${i}`}
                            >
                              <span className="grid place-items-center h-9 w-9 rounded-full bg-teal/8 text-teal shrink-0">
                                <GetIcon size={19} weight="light" />
                              </span>
                              <span className="text-[14px] text-ink/80 leading-snug">{item}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* disclaimer */}
                    <div className="mt-6 flex items-start gap-2 text-[13px] text-muted max-w-md bg-wheat/40 rounded-2xl px-4 py-3">
                      <ShieldCheck size={18} weight="fill" className="text-terracotta shrink-0 mt-0.5" />
                      <span>{sc.disclaimer}</span>
                    </div>

                    {/* one prominent bilingual start button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setStage("track");
                      }}
                      className="mt-8 inline-flex flex-col items-center rounded-full bg-teal text-sand px-10 py-4 hover:bg-teal-deep transition-colors duration-300 shadow-[0_10px_30px_rgba(18,67,64,0.18)]"
                      data-testid="selfcheck-start-btn"
                    >
                      <span className="inline-flex items-center gap-2 font-medium text-base">
                        {CONTENT[lang].selfcheck.startCTA}
                        <ArrowRight size={18} weight="bold" />
                      </span>
                      <span className="text-[12px] text-sand/70 mt-0.5">
                        {CONTENT[lang === "en" ? "hi" : "en"].selfcheck.startCTA}
                      </span>
                    </button>
                  </motion.div>
                )}

                {/* TRACK SELECT */}
                {stage === "track" && (
                  <motion.div
                    key="track"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex-1"
                    data-testid="selfcheck-track"
                  >
                    <h3 className="font-serif text-2xl sm:text-3xl text-teal-deep text-center">
                      {sc.chooseTrack}
                    </h3>
                    <p className="text-center text-muted mt-2 mb-8 text-[15px]">{sc.chooseTrackSub}</p>
                    <div className="grid gap-4">
                      {sc.tracks.map((tr) => {
                        const Icon = trackIcons[tr.id];
                        return (
                          <button
                            key={tr.id}
                            onClick={() => chooseTrack(tr.id)}
                            className="group flex items-center gap-4 text-left rounded-2xl border border-line bg-sand/40 hover:bg-wheat/50 hover:border-terracotta/40 px-5 py-4 transition-colors duration-300"
                            data-testid={`track-${tr.id}`}
                          >
                            <span className="grid place-items-center h-12 w-12 rounded-full bg-teal text-sand shrink-0">
                              <Icon size={24} weight="light" />
                            </span>
                            <span className="flex-1">
                              <span className="block font-medium text-teal-deep text-lg">{tr.label}</span>
                              <span className="block text-[13px] text-muted">{tr.desc}</span>
                            </span>
                            <ArrowRight
                              size={20}
                              className="text-muted group-hover:text-terracotta group-hover:translate-x-1 transition-all duration-300"
                            />
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* QUESTION */}
                {stage === "question" && (
                  <motion.div
                    key={`q-${current}`}
                    custom={dir}
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="flex-1 flex flex-col"
                    data-testid="selfcheck-question"
                  >
                    <div className="flex items-center justify-between text-[12px] uppercase tracking-[0.2em] text-muted">
                      <span>
                        {sc.progress} {current + 1} {sc.of} {questions.length}
                      </span>
                      <span className="text-terracotta">{trackLabelFor(track)}</span>
                    </div>
                    <p className="mt-6 font-serif text-2xl sm:text-3xl leading-snug text-teal-deep flex-1">
                      {questions[current]}
                    </p>
                    <div className="mt-8 grid gap-3">
                      {sc.scaleLabels.map((label, opt) => {
                        const selected = answers[current]?.value === opt;
                        return (
                          <button
                            key={opt}
                            onClick={() => answer(opt)}
                            className={`flex items-center gap-3 rounded-2xl border px-5 py-4 text-left transition-colors duration-200 ${
                              selected
                                ? "border-teal bg-teal text-sand"
                                : "border-line bg-sand/40 hover:border-terracotta/50 hover:bg-wheat/40 text-teal-deep"
                            }`}
                            data-testid={`answer-opt-${opt}`}
                          >
                            <span
                              className={`grid place-items-center h-6 w-6 rounded-full border text-[11px] font-medium ${
                                selected ? "border-sand text-sand" : "border-muted/50 text-muted"
                              }`}
                            >
                              {opt}
                            </span>
                            <span className="text-[15px] font-medium">{label}</span>
                          </button>
                        );
                      })}
                    </div>
                    <button
                      onClick={goBack}
                      className="mt-6 inline-flex items-center gap-1.5 text-sm text-muted hover:text-teal transition-colors self-start"
                      data-testid="selfcheck-back-btn"
                    >
                      <ArrowLeft size={16} /> {sc.back}
                    </button>
                  </motion.div>
                )}

                {/* RESULT */}
                {stage === "result" && (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex-1"
                    data-testid="selfcheck-result"
                  >
                    {!submitted ? (
                      <>
                        <p className="text-[12px] uppercase tracking-[0.22em] text-terracotta mb-3">
                          {R.summaryTitle}
                        </p>
                        <div
                          className={`rounded-2xl p-6 ${
                            band === "high"
                              ? "bg-[#B03A2E]/8 border border-[#B03A2E]/25"
                              : band === "moderate"
                              ? "bg-terracotta/8 border border-terracotta/25"
                              : "bg-teal/6 border border-teal/20"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {band === "high" ? (
                              <Warning size={22} weight="fill" className="text-[#B03A2E]" />
                            ) : (
                              <CheckCircle size={22} weight="fill" className="text-teal" />
                            )}
                            <span
                              className={`text-[12px] uppercase tracking-[0.2em] font-medium ${
                                band === "high" ? "text-[#B03A2E]" : "text-teal"
                              }`}
                              data-testid="result-band"
                            >
                              {bandData.band}
                            </span>
                          </div>
                          <h3 className="mt-3 font-serif text-2xl sm:text-3xl text-teal-deep leading-snug">
                            {bandData.headline}
                          </h3>
                          <p className="mt-3 text-[15px] text-ink/80 leading-relaxed">{bandData.body}</p>

                          {/* provisional impression */}
                          <div
                            className="mt-5 rounded-xl bg-surface/80 border border-line px-4 py-3.5"
                            data-testid="result-provisional"
                          >
                            <p className="text-[11px] uppercase tracking-[0.2em] text-terracotta">
                              {R.provisionalTitle}
                            </p>
                            <p className="mt-1.5 text-[15px] text-teal-deep leading-snug">
                              <span className="font-medium">
                                {R.severity[band]} {R.provisionalConcern[track]}
                              </span>
                              <span className="text-muted">{R.provisionalTail}</span>
                            </p>
                          </div>

                          <p className="mt-4 text-[12px] text-muted italic flex items-start gap-1.5">
                            <ShieldCheck size={15} className="text-terracotta shrink-0 mt-0.5" />
                            {R.notDiagnosis}
                          </p>
                        </div>

                        {/* urgent helpline */}
                        {band === "high" && (
                          <a
                            href={`tel:${SITE.helpline}`}
                            className="mt-4 flex items-center gap-3 rounded-2xl bg-[#B03A2E] text-white px-5 py-4"
                            data-testid="result-helpline"
                          >
                            <Lifebuoy size={26} weight="fill" />
                            <span>
                              <span className="block text-[12px] uppercase tracking-wide opacity-90">
                                {R.helplineLabel}
                              </span>
                              <span className="block text-lg font-semibold">
                                {SITE.helpline} · {SITE.helplineAlt}
                              </span>
                            </span>
                          </a>
                        )}

                        {/* gentle next steps */}
                        <div className="mt-5" data-testid="result-next-steps">
                          <p className="text-[12px] uppercase tracking-[0.18em] text-terracotta">
                            {R.nextStepsTitle}
                          </p>
                          <ul className="mt-3 grid gap-2">
                            {bandData.nextSteps.map((step, i) => (
                              <li key={i} className="flex gap-2.5 text-[14px] text-ink/80 leading-snug">
                                <span className="grid place-items-center h-5 w-5 rounded-full bg-teal/10 text-teal text-[11px] font-medium shrink-0 mt-0.5">
                                  {i + 1}
                                </span>
                                <span>{step}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* booking invite */}
                        <div
                          className="mt-6 rounded-2xl bg-teal text-sand p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4"
                          data-testid="result-book-invite"
                        >
                          <p className="flex-1 text-[15px] leading-relaxed text-sand/90">{R.bookInvite}</p>
                          <button
                            onClick={goToBooking}
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-terracotta text-white px-6 py-3.5 font-medium hover:brightness-95 transition-[filter] duration-300 shrink-0"
                            data-testid="result-book-consultation-btn"
                          >
                            <CalendarCheck size={18} weight="bold" /> {t.common.book}
                          </button>
                        </div>

                        {/* lead form */}
                        <div className="mt-6">
                          <h4 className="font-medium text-teal-deep text-lg">{R.formTitle}</h4>
                          <p className="text-[13px] text-muted mt-1">{R.formSub}</p>
                          <form onSubmit={handleSubmit} className="mt-4 grid gap-3">
                            <div>
                              <label className="text-[13px] text-muted">{R.nameLabel}</label>
                              <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder={R.namePh}
                                className="mt-1 w-full rounded-xl border border-line bg-sand/40 px-4 py-3 text-teal-deep outline-none focus:border-teal transition-colors"
                                data-testid="result-name-input"
                              />
                            </div>
                            <div>
                              <label className="text-[13px] text-muted">{R.phoneLabel}</label>
                              <input
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                inputMode="numeric"
                                placeholder={R.phonePh}
                                className="mt-1 w-full rounded-xl border border-line bg-sand/40 px-4 py-3 text-teal-deep outline-none focus:border-teal transition-colors"
                                data-testid="result-phone-input"
                              />
                            </div>
                            <p className="text-[12px] text-muted flex items-center gap-1.5">
                              <ShieldCheck size={14} className="text-terracotta" />
                              {R.formPrivacy}
                            </p>
                            {err && <p className="text-[13px] text-[#B03A2E]" data-testid="result-error">{err}</p>}
                            <button
                              type="submit"
                              disabled={submitting}
                              className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-teal text-sand px-7 py-4 font-medium hover:bg-teal-deep transition-colors duration-300 disabled:opacity-60"
                              data-testid="result-submit-btn"
                            >
                              {submitting ? R.submitting : R.submit}
                            </button>
                          </form>

                          <div className="mt-6 pt-5 border-t border-line">
                            <p className="text-[12px] uppercase tracking-[0.18em] text-terracotta text-center">
                              {R.optionsTitle}
                            </p>
                            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                              <a href={telLink} className="flex items-center justify-center gap-2 rounded-2xl border border-line bg-sand/40 py-3.5 text-[14px] font-medium text-teal hover:bg-wheat/50 hover:border-terracotta/40 transition-colors" data-testid="result-call">
                                <Phone size={18} weight="fill" className="text-terracotta" /> {t.common.call}
                              </a>
                              <a href={waLink(t.wa.selfcheck)} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-2xl border border-line bg-sand/40 py-3.5 text-[14px] font-medium text-teal hover:bg-wheat/50 hover:border-terracotta/40 transition-colors" data-testid="result-whatsapp">
                                <WhatsappLogo size={18} weight="fill" className="text-terracotta" /> {t.common.whatsapp}
                              </a>
                              <button onClick={goToBooking} className="flex items-center justify-center gap-2 rounded-2xl border border-line bg-sand/40 py-3.5 text-[14px] font-medium text-teal hover:bg-wheat/50 hover:border-terracotta/40 transition-colors" data-testid="result-book">
                                <CalendarCheck size={18} weight="bold" className="text-terracotta" /> {t.common.bookOnline}
                              </button>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="flex-1 flex flex-col items-center justify-center text-center py-10" data-testid="result-thanks">
                        <span className="grid place-items-center h-16 w-16 rounded-full bg-teal/10 text-teal mb-5">
                          <CheckCircle size={34} weight="fill" />
                        </span>
                        <p className="font-serif text-2xl sm:text-3xl text-teal-deep max-w-md leading-snug">
                          {R.thanks}
                        </p>
                        <p className="text-muted mt-3 text-[14px]">{R.thanksSub}</p>
                        <div className="mt-6 flex flex-wrap justify-center gap-2">
                          <a href={telLink} className="inline-flex items-center gap-1.5 rounded-full bg-teal text-sand px-5 py-3 text-sm">
                            <Phone size={16} weight="fill" /> {t.common.call}
                          </a>
                          <a href={waLink(t.wa.selfcheck)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-terracotta text-white px-5 py-3 text-sm">
                            <WhatsappLogo size={16} weight="fill" /> {t.common.whatsapp}
                          </a>
                        </div>
                        <button onClick={restart} className="mt-5 text-sm text-muted hover:text-teal underline underline-offset-4">
                          {R.restart}
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            </motion.div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
};
