import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CloudRain,
  Wine,
  Baby,
  HeartHalf,
  UsersThree,
  VideoCamera,
  ArrowLeft,
  ArrowRight,
  Check,
  ShieldCheck,
  Phone,
  WhatsappLogo,
  CalendarCheck,
} from "@phosphor-icons/react";
import { useLang } from "@/context/LanguageContext";
import { FadeUp } from "@/components/Primitives";
import { SERVICE_DETAILS, SERVICE_SLUGS } from "@/data/serviceDetails";
import { IMAGES, waLink, telLink } from "@/lib/site";

const iconBySlug = {
  "anxiety-depression": CloudRain,
  "de-addiction": Wine,
  "child-adolescent": Baby,
  "sexual-health": HeartHalf,
  "couples-family": UsersThree,
  "online-consultation": VideoCamera,
};

export const ServiceDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { t, lang } = useLang();

  const data = SERVICE_DETAILS[lang];
  const svc = data?.items?.[slug];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (!svc) navigate("/", { replace: true });
  }, [svc, navigate]);

  if (!svc) return null;

  const Icon = iconBySlug[slug] || CloudRain;
  const idx = SERVICE_SLUGS.indexOf(slug);
  const nextSlug = SERVICE_SLUGS[(idx + 1) % SERVICE_SLUGS.length];
  const next = data.items[nextSlug];
  const ui = data.ui;

  const goContact = () => navigate("/#contact");

  return (
    <div data-testid="service-detail-page">
      {/* Hero band */}
      <section className="relative overflow-hidden bg-teal text-sand pt-32 sm:pt-36 pb-20 grain">
        <img
          src={IMAGES.jali}
          alt=""
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-10 w-[440px] opacity-[0.06] invert"
        />
        <div className="pointer-events-none absolute -bottom-24 left-1/4 h-[380px] w-[380px] rounded-full bg-terracotta/20 blur-3xl" />
        <div className="max-w-4xl mx-auto px-5 sm:px-8 relative">
          <button
            onClick={() => navigate("/#services")}
            className="inline-flex items-center gap-2 text-sand/70 hover:text-sand transition-colors text-sm mb-8"
            data-testid="service-back-link"
          >
            <ArrowLeft size={16} /> {ui.allServices}
          </button>

          <FadeUp>
            <span className="grid place-items-center h-16 w-16 rounded-2xl bg-sand/12 text-sand mb-6">
              <Icon size={32} weight="light" />
            </span>
            <p className="text-[12px] uppercase tracking-[0.24em] text-terracotta">{ui.kicker}</p>
            <h1 className="mt-3 font-serif font-light text-4xl sm:text-6xl tracking-tight leading-[1.02]">
              {svc.title}
            </h1>
            <p className="mt-5 font-serif italic text-xl sm:text-2xl text-sand/80 max-w-2xl leading-snug">
              {svc.tagline}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Body */}
      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <FadeUp>
            <p className="text-lg sm:text-xl text-ink/85 leading-relaxed max-w-3xl">{svc.intro}</p>
          </FadeUp>

          {/* who it's for */}
          <FadeUp delay={0.05}>
            <div className="mt-10 rounded-3xl bg-wheat/40 border border-line px-6 py-6 sm:px-8 sm:py-7">
              <p className="text-[12px] uppercase tracking-[0.2em] text-terracotta">{ui.forWhoTitle}</p>
              <p className="mt-2 text-[15px] sm:text-base text-ink/80 leading-relaxed">{svc.forWho}</p>
            </div>
          </FadeUp>

          {/* signs + approach */}
          <div className="mt-12 grid md:grid-cols-2 gap-8 sm:gap-10">
            <FadeUp>
              <h2 className="font-serif text-2xl sm:text-3xl text-teal-deep">{ui.signsTitle}</h2>
              <ul className="mt-5 grid gap-3">
                {svc.signs.map((s, i) => (
                  <li key={i} className="flex gap-3 text-[15px] text-ink/80" data-testid={`service-sign-${i}`}>
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-terracotta shrink-0" />
                    <span className="leading-relaxed">{s}</span>
                  </li>
                ))}
              </ul>
            </FadeUp>

            <FadeUp delay={0.06}>
              <h2 className="font-serif text-2xl sm:text-3xl text-teal-deep">{ui.approachTitle}</h2>
              <ul className="mt-5 grid gap-3">
                {svc.approach.map((s, i) => (
                  <li key={i} className="flex gap-3 text-[15px] text-ink/80" data-testid={`service-approach-${i}`}>
                    <span className="grid place-items-center h-6 w-6 rounded-full bg-teal/10 text-teal shrink-0 mt-0.5">
                      <Check size={13} weight="bold" />
                    </span>
                    <span className="leading-relaxed">{s}</span>
                  </li>
                ))}
              </ul>
            </FadeUp>
          </div>

          {/* privacy reassure */}
          <FadeUp delay={0.05}>
            <div className="mt-12 flex items-start gap-3 rounded-2xl border border-teal/15 bg-teal/[0.04] px-5 py-4">
              <ShieldCheck size={20} weight="fill" className="text-terracotta shrink-0 mt-0.5" />
              <p className="text-[14px] text-ink/80 leading-relaxed">{ui.reassure}</p>
            </div>
          </FadeUp>

          {/* CTA */}
          <FadeUp delay={0.05}>
            <div className="mt-14 rounded-[2rem] bg-surface border border-line p-8 sm:p-10 text-center shadow-[0_20px_60px_rgba(18,67,64,0.08)]">
              <h2 className="font-serif text-3xl sm:text-4xl text-teal-deep leading-tight">{ui.ctaTitle}</h2>
              <p className="mt-3 text-muted max-w-md mx-auto">{ui.ctaSub}</p>
              <div className="mt-7 flex flex-col sm:flex-row justify-center gap-3">
                <button
                  onClick={goContact}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-teal text-sand px-7 py-4 font-medium hover:bg-teal-deep transition-colors"
                  data-testid="service-book-btn"
                >
                  <CalendarCheck size={18} weight="bold" /> {t.common.book}
                </button>
                <a
                  href={telLink}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-teal/25 text-teal px-7 py-4 font-medium hover:bg-wheat/50 transition-colors"
                  data-testid="service-call-btn"
                >
                  <Phone size={18} weight="fill" /> {t.common.call}
                </a>
                <a
                  href={waLink(t.wa.booking)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-teal/25 text-teal px-7 py-4 font-medium hover:bg-wheat/50 transition-colors"
                  data-testid="service-whatsapp-btn"
                >
                  <WhatsappLogo size={19} weight="fill" className="text-terracotta" /> {t.common.whatsapp}
                </a>
              </div>
              <p className="mt-6 text-[12px] text-muted/80 italic max-w-lg mx-auto">{ui.disclaimer}</p>
            </div>
          </FadeUp>

          {/* next service */}
          <FadeUp delay={0.05}>
            <Link
              to={`/services/${nextSlug}`}
              className="group mt-10 flex items-center justify-between gap-4 rounded-2xl border border-line bg-sand/40 hover:bg-wheat/50 px-6 py-5 transition-colors"
              data-testid="service-next-link"
            >
              <span>
                <span className="block text-[12px] uppercase tracking-[0.2em] text-muted">
                  {lang === "hi" ? "अगली सेवा" : "Next service"}
                </span>
                <span className="block font-serif text-xl sm:text-2xl text-teal-deep mt-0.5">
                  {next.title}
                </span>
              </span>
              <ArrowRight
                size={22}
                className="text-terracotta group-hover:translate-x-1 transition-transform shrink-0"
              />
            </Link>
          </FadeUp>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
