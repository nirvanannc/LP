import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { WhatsappLogo, ArrowDown, ShieldCheck } from "@phosphor-icons/react";
import { useLang } from "@/context/LanguageContext";
import { RevealLines } from "@/components/Primitives";
import { IMAGES, waLink } from "@/lib/site";

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

export const Hero = () => {
  const { t } = useLang();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yImg = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const yBadge = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-40 pb-16 lg:pb-24 grain"
      data-testid="hero-section"
    >
      {/* soft radial lighting */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -right-32 h-[520px] w-[520px] rounded-full bg-wheat/50 blur-3xl" />
        <div className="absolute top-40 -left-40 h-[420px] w-[420px] rounded-full bg-terracotta/10 blur-3xl" />
      </div>
      {/* jali motif */}
      <img
        src={IMAGES.jali}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -right-24 top-10 w-[420px] opacity-[0.06] mix-blend-multiply -z-10"
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        {/* Left — copy */}
        <motion.div style={{ opacity }} className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3.5 py-1.5 text-[12px] tracking-wide text-teal mb-6"
            data-testid="hero-eyebrow"
          >
            <ShieldCheck size={15} weight="fill" className="text-terracotta" />
            {t.hero.eyebrow}
          </motion.div>

          <h1 className="font-serif text-teal-deep font-bold tracking-tight text-[2.7rem] leading-[1.02] sm:text-6xl lg:text-[4.6rem]">
            <RevealLines lines={t.hero.lines} delay={0.25} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="mt-6 text-lg sm:text-xl text-ink/80 max-w-xl leading-relaxed"
            data-testid="hero-sub"
          >
            {t.hero.sub}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.7 }}
            className="mt-3 text-[15px] text-muted max-w-xl leading-relaxed"
          >
            {t.hero.reassure}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.7 }}
            className="mt-8 flex flex-col sm:flex-row gap-3"
          >
            <button
              onClick={() => scrollTo("selfcheck")}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-teal text-sand px-7 py-4 text-base font-medium hover:bg-teal-deep transition-colors duration-300 shadow-[0_10px_30px_rgba(18,67,64,0.18)]"
              data-testid="hero-cta-selfcheck"
            >
              {t.hero.cta}
              <ArrowDown
                size={18}
                weight="bold"
                className="transition-transform duration-300 group-hover:translate-y-1"
              />
            </button>
            <a
              href={waLink(t.wa.general)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-teal/25 bg-surface text-teal px-7 py-4 text-base font-medium hover:border-teal transition-colors duration-300"
              data-testid="hero-cta-whatsapp"
            >
              <WhatsappLogo size={20} weight="fill" className="text-terracotta" />
              {t.hero.cta2}
            </a>
          </motion.div>

          {/* doctor chip */}
          <motion.button
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.35, duration: 0.7 }}
            onClick={() => scrollTo("about")}
            whileHover={{ y: -3 }}
            className="mt-7 group inline-flex items-center gap-3 rounded-full border border-line bg-surface/80 backdrop-blur-sm pl-1.5 pr-5 py-1.5 text-left hover:border-terracotta/45 transition-colors"
            data-testid="hero-doctor-chip"
          >
            <img
              src={IMAGES.drPortrait}
              alt="Dr. Aditya Soni"
              className="h-11 w-11 rounded-full object-cover object-top ring-1 ring-line"
              loading="eager"
            />
            <span className="leading-tight">
              <span className="block text-[10px] uppercase tracking-[0.2em] text-terracotta">
                {t.hero.doctorChip}
              </span>
              <span className="block font-serif text-[1.05rem] text-teal-deep">{t.about.name}</span>
              <span className="block text-[11px] text-muted">{t.about.creds}</span>
            </span>
          </motion.button>

          {/* trust strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2"
            data-testid="hero-trust-strip"
          >
            {t.hero.trust.map((item, i) => (
              <React.Fragment key={i}>
                {i > 0 && <span className="h-1 w-1 rounded-full bg-terracotta/60" />}
                <span className="text-[13px] text-muted">{item}</span>
              </React.Fragment>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — portrait */}
        <div className="lg:col-span-5 relative">
          <motion.div
            style={{ y: yImg }}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="mx-auto max-w-[420px] lg:max-w-none overflow-hidden rounded-[2rem] rounded-tr-[6rem] border border-line bg-white shadow-[0_30px_80px_rgba(18,67,64,0.16)]">
              <img
                src={IMAGES.heroArt}
                alt="Mental health illustration — it's okay to ask for help"
                className="w-full aspect-square object-contain"
                loading="eager"
              />
            </div>
            {/* privacy badge — kept below the art so the artwork's own caption stays readable */}
            <motion.div
              style={{ y: yBadge }}
              className="mx-auto lg:mx-0 mt-5 w-fit bg-surface/95 backdrop-blur-md border border-line rounded-2xl px-4 py-3 shadow-[0_10px_30px_rgba(18,67,64,0.12)] max-w-[240px]"
            >
              <div className="flex items-center gap-2 text-teal">
                <ShieldCheck size={20} weight="fill" className="text-terracotta shrink-0" />
                <span className="font-serif text-lg leading-none">{t.common.privacy}</span>
              </div>
              <p className="mt-1.5 text-[12px] text-muted leading-snug">
                koi jaanega toh nahi — promise.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
