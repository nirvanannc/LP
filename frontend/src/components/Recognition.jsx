import React from "react";
import { motion } from "framer-motion";
import { Quotes } from "@phosphor-icons/react";
import { useLang } from "@/context/LanguageContext";
import { Chapter, FadeUp } from "@/components/Primitives";

export const Recognition = () => {
  const { t } = useLang();
  const r = t.recognition;
  return (
    <section className="py-24 lg:py-32 relative" data-testid="recognition-section">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <FadeUp>
          <Chapter n={r.chapter} title={t.nav.home} />
          <h2 className="mt-6 font-serif text-teal-deep font-normal text-4xl sm:text-5xl tracking-tight max-w-3xl leading-[1.05]">
            {r.title}
          </h2>
          <p className="mt-4 text-lg text-muted max-w-xl">{r.sub}</p>
        </FadeUp>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {r.cards.map((card, i) => (
            <FadeUp key={i} delay={i * 0.06}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="h-full bg-surface border border-line rounded-3xl p-7 shadow-[0_8px_30px_rgba(18,67,64,0.05)]"
                data-testid={`recognition-card-${i}`}
              >
                <Quotes size={26} weight="fill" className="text-terracotta/70" />
                <p className="mt-4 font-serif text-2xl leading-snug text-teal-deep">
                  “{card}”
                </p>
                <p className="mt-5 pt-4 border-t border-line text-[13px] text-muted">
                  {r.validation}
                </p>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
};
