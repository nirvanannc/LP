import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  WhatsappLogo,
  MapPin,
  Clock,
  EnvelopeSimple,
  CheckCircle,
  ShieldCheck,
  CaretDown,
} from "@phosphor-icons/react";
import { useLang } from "@/context/LanguageContext";
import { Chapter, FadeUp } from "@/components/Primitives";
import { SITE, waLink, telLink } from "@/lib/site";
import { submitLead } from "@/lib/api";

export const FinalCTA = () => {
  const { t, lang } = useLang();
  const c = t.finalCTA;

  const [form, setForm] = useState({ name: "", phone: "", concern: "", preferred_time: "" });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    if (!form.name.trim() || form.phone.replace(/\D/g, "").length < 10) {
      setErr(lang === "hi" ? "कृपया नाम और सही 10-अंकों का नंबर भरें।" : "Please enter your name and a valid 10-digit number.");
      return;
    }
    setSubmitting(true);
    try {
      await submitLead({
        name: form.name.trim(),
        phone: form.phone.trim(),
        source: "booking_form",
        concern: form.concern,
        preferred_time: form.preferred_time,
        language: lang,
      });
      setDone(true);
    } catch {
      setErr(lang === "hi" ? "कुछ गड़बड़ हुई। कृपया कॉल करें।" : "Something went wrong. Please call us.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 lg:py-32 relative overflow-hidden" data-testid="final-cta-section">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -bottom-20 left-1/3 h-[420px] w-[420px] rounded-full bg-wheat/50 blur-3xl" />
      </div>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <FadeUp className="text-center flex flex-col items-center">
          <div className="flex justify-center">
            <Chapter n={c.chapter} title={t.nav.contact} />
          </div>
          <h2 className="mt-6 font-serif text-teal-deep font-normal text-4xl sm:text-6xl tracking-tight max-w-3xl leading-[1.03]">
            {c.title}
          </h2>
          <p className="mt-4 text-lg text-muted max-w-xl">{c.sub}</p>
        </FadeUp>

        {/* three CTA buttons */}
        <FadeUp delay={0.1}>
          <div className="mt-10 grid sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
            <a href={telLink} className="flex items-center justify-center gap-2 rounded-full bg-teal text-sand py-4 font-medium hover:bg-teal-deep transition-colors" data-testid="final-call">
              <Phone size={18} weight="fill" /> {t.common.call}
            </a>
            <a href={waLink(t.wa.booking)} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-full bg-terracotta text-white py-4 font-medium hover:brightness-95 transition-[filter]" data-testid="final-whatsapp">
              <WhatsappLogo size={19} weight="fill" /> {t.common.whatsapp}
            </a>
            <a href="#book-form" className="flex items-center justify-center gap-2 rounded-full border border-teal text-teal py-4 font-medium hover:bg-wheat/50 transition-colors" data-testid="final-book-scroll">
              {t.common.book}
            </a>
          </div>
        </FadeUp>

        <div className="mt-14 grid lg:grid-cols-2 gap-6" id="book-form">
          {/* form */}
          <FadeUp>
            <div className="bg-surface border border-line rounded-[2rem] p-7 sm:p-9 shadow-[0_20px_60px_rgba(18,67,64,0.08)] h-full">
              {!done ? (
                <>
                  <h3 className="font-serif text-2xl sm:text-3xl text-teal-deep">{c.formTitle}</h3>
                  <form onSubmit={onSubmit} className="mt-6 grid gap-4">
                    <div>
                      <label className="text-[13px] text-muted">{c.nameLabel}</label>
                      <input value={form.name} onChange={set("name")} placeholder={c.namePh}
                        className="mt-1 w-full rounded-xl border border-line bg-sand/40 px-4 py-3 text-teal-deep outline-none focus:border-teal transition-colors"
                        data-testid="book-name-input" />
                    </div>
                    <div>
                      <label className="text-[13px] text-muted">{c.phoneLabel}</label>
                      <input value={form.phone} onChange={set("phone")} inputMode="numeric" placeholder={c.phonePh}
                        className="mt-1 w-full rounded-xl border border-line bg-sand/40 px-4 py-3 text-teal-deep outline-none focus:border-teal transition-colors"
                        data-testid="book-phone-input" />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[13px] text-muted">{c.concernLabel}</label>
                        <div className="relative mt-1">
                          <select value={form.concern} onChange={set("concern")}
                            className="w-full appearance-none rounded-xl border border-line bg-sand/40 px-4 py-3 pr-10 text-teal-deep outline-none focus:border-teal transition-colors"
                            data-testid="book-concern-select">
                            <option value="">{c.concernPh}</option>
                            {c.concerns.map((x, i) => <option key={i} value={x}>{x}</option>)}
                          </select>
                          <CaretDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted" />
                        </div>
                      </div>
                      <div>
                        <label className="text-[13px] text-muted">{c.timeLabel}</label>
                        <input value={form.preferred_time} onChange={set("preferred_time")} placeholder={c.timePh}
                          className="mt-1 w-full rounded-xl border border-line bg-sand/40 px-4 py-3 text-teal-deep outline-none focus:border-teal transition-colors"
                          data-testid="book-time-input" />
                      </div>
                    </div>
                    <p className="text-[12px] text-muted flex items-center gap-1.5">
                      <ShieldCheck size={14} className="text-terracotta" /> {c.privacy}
                    </p>
                    {err && <p className="text-[13px] text-[#B03A2E]" data-testid="book-error">{err}</p>}
                    <button type="submit" disabled={submitting}
                      className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-teal text-sand px-7 py-4 font-medium hover:bg-teal-deep transition-colors disabled:opacity-60"
                      data-testid="book-submit-btn">
                      {submitting ? c.submitting : c.submit}
                    </button>
                  </form>
                </>
              ) : (
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  className="h-full flex flex-col items-center justify-center text-center py-10" data-testid="book-thanks">
                  <span className="grid place-items-center h-16 w-16 rounded-full bg-teal/10 text-teal mb-5">
                    <CheckCircle size={34} weight="fill" />
                  </span>
                  <p className="font-serif text-2xl sm:text-3xl text-teal-deep max-w-md leading-snug">{c.thanks}</p>
                </motion.div>
              )}
            </div>
          </FadeUp>

          {/* address + map */}
          <FadeUp delay={0.08}>
            <div className="bg-surface border border-line rounded-[2rem] overflow-hidden shadow-[0_20px_60px_rgba(18,67,64,0.08)] h-full flex flex-col">
              <div className="p-7 sm:p-9">
                <h3 className="font-serif text-2xl sm:text-3xl text-teal-deep">{c.addressTitle}</h3>
                <div className="mt-5 grid gap-4 text-[15px]">
                  <a href={SITE.mapEmbed.replace("&output=embed", "").replace("/maps?q=", "/maps/search/?api=1&query=")} target="_blank" rel="noreferrer" className="flex gap-3 group" data-testid="contact-address">
                    <MapPin size={20} weight="fill" className="text-terracotta shrink-0 mt-0.5" />
                    <span className="text-ink/80 group-hover:text-teal transition-colors">{SITE.addressLine}</span>
                  </a>
                  <a href={telLink} className="flex gap-3 group" data-testid="contact-phone">
                    <Phone size={20} weight="fill" className="text-terracotta shrink-0 mt-0.5" />
                    <span className="text-ink/80 group-hover:text-teal transition-colors">{SITE.phoneDisplay}</span>
                  </a>
                  <a href={`mailto:${SITE.email}`} className="flex gap-3 group" data-testid="contact-email">
                    <EnvelopeSimple size={20} weight="fill" className="text-terracotta shrink-0 mt-0.5" />
                    <span className="text-ink/80 group-hover:text-teal transition-colors break-all">{SITE.email}</span>
                  </a>
                  <div className="flex gap-3">
                    <Clock size={20} weight="fill" className="text-terracotta shrink-0 mt-0.5" />
                    <span className="text-ink/80">{SITE.timings}</span>
                  </div>
                </div>
              </div>
              <div className="mt-auto border-t border-line">
                <iframe
                  title="Dr. Aditya Soni Clinic location — Pratap Nagar, Jaipur"
                  src={SITE.mapEmbed}
                  className="w-full h-64 grayscale-[0.15]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  data-testid="contact-map"
                />
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
};
