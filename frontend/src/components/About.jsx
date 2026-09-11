import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ShieldCheck, Certificate, HeartHalf, Star } from "@phosphor-icons/react";
import { useLang } from "@/context/LanguageContext";
import { Chapter, FadeUp } from "@/components/Primitives";
import { IMAGES, SITE } from "@/lib/site";

const whyIcons = [ShieldCheck, Certificate, HeartHalf];

const Counter = ({ value }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <span ref={ref}>
      <motion.span
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        {value}
      </motion.span>
    </span>
  );
};

export const About = () => {
  const { t } = useLang();
  const a = t.about;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="about" className="py-24 lg:py-32 bg-surface/60 relative" data-testid="about-section">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* portrait */}
          <div ref={ref} className="lg:col-span-5 relative">
            <motion.div style={{ y }} className="relative">
              <div className="overflow-hidden rounded-[2rem] rounded-bl-[6rem] border border-line shadow-[0_30px_80px_rgba(18,67,64,0.14)]">
                <img
                  src={IMAGES.drPortrait}
                  alt="Dr. Aditya Soni — MD Psychiatry, MBA, Prof and Unit Head, Mahatma Gandhi Hospital, Jaipur"
                  className="w-full h-[440px] sm:h-[560px] object-cover object-top"
                  loading="lazy"
                />
              </div>
              <div className="absolute -right-3 sm:-right-6 top-8 bg-teal text-sand rounded-2xl px-5 py-4 shadow-[0_10px_30px_rgba(18,67,64,0.2)]">
                <p className="font-serif text-3xl leading-none">15+</p>
                <p className="text-[11px] uppercase tracking-wide opacity-90 mt-1">years</p>
              </div>
            </motion.div>

            <a
              href={SITE.googleReviewUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-3 text-[14px] font-medium text-teal hover:border-terracotta/45 hover:bg-wheat/40 transition-colors"
              data-testid="about-google-reviews-btn"
            >
              <span className="flex text-terracotta">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} weight="fill" />
                ))}
              </span>
              {t.common.reviews}
            </a>
          </div>

          {/* text */}
          <div className="lg:col-span-7">
            <FadeUp>
              <Chapter n={a.chapter} title={t.nav.about} />
              <p className="mt-6 text-[13px] uppercase tracking-[0.22em] text-terracotta">{a.kicker}</p>
              <h2 className="mt-2 font-serif text-teal-deep font-normal text-4xl sm:text-5xl tracking-tight">
                {a.name}
              </h2>
              <p className="mt-2 text-muted text-[15px]">{a.creds}</p>
              <p className="mt-6 text-lg text-ink/80 leading-relaxed">{a.bio}</p>
            </FadeUp>

            {/* stats */}
            <div className="mt-9 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {a.stats.map((s, i) => (
                <FadeUp key={i} delay={i * 0.06}>
                  <div className="rounded-2xl border border-line bg-sand/50 px-4 py-5 text-center" data-testid={`about-stat-${i}`}>
                    <p className="font-serif text-3xl sm:text-4xl text-teal">
                      <Counter value={s.value} />
                    </p>
                    <p className="text-[12px] text-muted mt-1 leading-tight">{s.label}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
            <p className="mt-2 text-[11px] text-muted/70 italic">{a.statsNote}</p>

            {/* why */}
            <FadeUp delay={0.1}>
              <h3 className="mt-10 font-serif text-2xl text-teal-deep">{a.whyTitle}</h3>
              <div className="mt-5 grid gap-4">
                {a.why.map((w, i) => {
                  const Icon = whyIcons[i];
                  return (
                    <div key={i} className="flex gap-4" data-testid={`about-why-${i}`}>
                      <span className="grid place-items-center h-11 w-11 rounded-full bg-teal/8 text-teal shrink-0">
                        <Icon size={22} weight="light" />
                      </span>
                      <div>
                        <p className="font-medium text-teal-deep">{w.t}</p>
                        <p className="text-[14px] text-muted leading-relaxed">{w.d}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
};
