import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quotes, Star, ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { useLang } from "@/context/LanguageContext";
import { Chapter, FadeUp } from "@/components/Primitives";

const cardVariants = {
  enter: (dir) => ({ x: dir > 0 ? 320 : -320, opacity: 0, rotate: dir > 0 ? 6 : -6, scale: 0.92 }),
  center: { x: 0, opacity: 1, rotate: 0, scale: 1 },
  exit: (dir) => ({ x: dir > 0 ? -320 : 320, opacity: 0, rotate: dir > 0 ? -6 : 6, scale: 0.92 }),
};

const TestimonialStack = ({ items }) => {
  const [[index, dir], setState] = useState([0, 0]);
  const [paused, setPaused] = useState(false);
  const n = items.length;
  const reduce = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ).current;

  const paginate = useCallback(
    (d) => setState(([i]) => [(i + d + n) % n, d]),
    [n]
  );

  useEffect(() => {
    if (paused || reduce) return;
    const timer = setInterval(() => paginate(1), 6000);
    return () => clearInterval(timer);
  }, [paused, paginate, reduce]);

  const current = items[index];
  const peek1 = items[(index + 1) % n];
  const peek2 = items[(index + 2) % n];

  return (
    <div
      className="max-w-xl mx-auto"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      data-testid="testimonial-stack"
    >
      <div className="relative h-[340px] sm:h-[300px]">
        {/* peek layers for depth */}
        <div className="absolute inset-x-0 top-0 h-full rounded-3xl bg-surface/70 border border-line shadow-[0_8px_30px_rgba(18,67,64,0.05)]"
          style={{ transform: "translateY(36px) scale(0.90)" }} aria-hidden />
        <div className="absolute inset-x-0 top-0 h-full rounded-3xl bg-surface border border-line shadow-[0_8px_30px_rgba(18,67,64,0.06)]"
          style={{ transform: "translateY(18px) scale(0.95)" }} aria-hidden />

        <AnimatePresence custom={dir} mode="popLayout" initial={false}>
          <motion.figure
            key={index}
            custom={dir}
            variants={cardVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.5}
            onDragEnd={(e, info) => {
              if (info.offset.x < -80) paginate(1);
              else if (info.offset.x > 80) paginate(-1);
            }}
            whileDrag={{ scale: 1.02, cursor: "grabbing" }}
            className="absolute inset-x-0 top-0 h-full rounded-3xl bg-surface border border-line shadow-[0_20px_50px_rgba(18,67,64,0.12)] p-7 sm:p-9 flex flex-col cursor-grab select-none"
            data-testid="testimonial-card"
          >
            <Quotes size={30} weight="fill" className="text-terracotta/70" />
            <blockquote className="mt-4 font-serif text-2xl sm:text-[1.7rem] leading-snug text-teal-deep flex-1">
              {current.q}
            </blockquote>
            <figcaption className="mt-5 pt-4 border-t border-line flex items-center justify-between">
              <span className="text-[13px] text-muted">— {current.a}</span>
              <span className="flex text-terracotta">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} weight="fill" />
                ))}
              </span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      {/* controls */}
      <div className="mt-8 flex items-center justify-center gap-5">
        <button
          onClick={() => paginate(-1)}
          className="grid place-items-center h-11 w-11 rounded-full border border-line text-teal hover:bg-wheat/50 transition-colors"
          data-testid="testimonial-prev"
          aria-label="Previous"
        >
          <ArrowLeft size={18} weight="bold" />
        </button>

        <div className="flex items-center gap-2" data-testid="testimonial-dots">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setState([i, i > index ? 1 : -1])}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? "w-7 bg-teal" : "w-2 bg-line hover:bg-muted/50"
              }`}
              data-testid={`testimonial-dot-${i}`}
              aria-label={`Story ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => paginate(1)}
          className="grid place-items-center h-11 w-11 rounded-full border border-line text-teal hover:bg-wheat/50 transition-colors"
          data-testid="testimonial-next"
          aria-label="Next"
        >
          <ArrowRight size={18} weight="bold" />
        </button>
      </div>
    </div>
  );
};

export const Testimonials = () => {
  const { t } = useLang();
  const tt = t.testimonials;
  return (
    <section className="py-24 lg:py-32" data-testid="testimonials-section">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <FadeUp>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Chapter n={tt.chapter} title={t.nav.home} />
              <h2 className="mt-6 font-serif text-teal-deep font-normal text-4xl sm:text-5xl tracking-tight max-w-2xl leading-[1.05]">
                {tt.title}
              </h2>
              <p className="mt-4 text-lg text-muted max-w-lg">{tt.sub}</p>
            </div>
            <div
              className="flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2.5"
              data-testid="google-rating"
            >
              <div className="flex text-terracotta">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} weight="fill" />
                ))}
              </div>
              <span className="text-sm text-teal font-medium">{tt.rating}</span>
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="mt-16">
            <TestimonialStack items={tt.items} />
          </div>
        </FadeUp>
      </div>
    </section>
  );
};
