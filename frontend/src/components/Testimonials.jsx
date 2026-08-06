import React from "react";
import { motion } from "framer-motion";
import { Quotes, Star } from "@phosphor-icons/react";
import { useLang } from "@/context/LanguageContext";
import { Chapter, FadeUp } from "@/components/Primitives";

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
            <div className="flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2.5" data-testid="google-rating">
              <div className="flex text-terracotta">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} weight="fill" />
                ))}
              </div>
              <span className="text-sm text-teal font-medium">{tt.rating}</span>
            </div>
          </div>
        </FadeUp>

        <div className="mt-14 columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
          {tt.items.map((item, i) => (
            <FadeUp key={i} delay={(i % 3) * 0.06}>
              <motion.figure
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 240, damping: 22 }}
                className="mb-5 break-inside-avoid bg-surface border border-line rounded-3xl p-7 shadow-[0_8px_30px_rgba(18,67,64,0.05)]"
                data-testid={`testimonial-${i}`}
              >
                <Quotes size={26} weight="fill" className="text-terracotta/70" />
                <blockquote className="mt-3 font-serif text-xl sm:text-2xl leading-snug text-teal-deep">
                  {item.q}
                </blockquote>
                <figcaption className="mt-5 pt-4 border-t border-line text-[13px] text-muted">
                  — {item.a}
                </figcaption>
              </motion.figure>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
};
