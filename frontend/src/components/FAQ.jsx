import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "@phosphor-icons/react";
import { useLang } from "@/context/LanguageContext";
import { Chapter, FadeUp } from "@/components/Primitives";

export const FAQ = () => {
  const { t } = useLang();
  const f = t.faq;
  const [open, setOpen] = useState(0);

  return (
    <section className="py-24 lg:py-32 bg-surface/60" data-testid="faq-section">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <FadeUp>
          <Chapter n={f.chapter} title={t.nav.contact} />
          <h2 className="mt-6 font-serif text-teal-deep font-normal text-4xl sm:text-5xl tracking-tight leading-[1.05]">
            {f.title}
          </h2>
        </FadeUp>

        <div className="mt-12 divide-y divide-line border-y border-line">
          {f.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <FadeUp key={i} delay={i * 0.04}>
                <div data-testid={`faq-item-${i}`}>
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="w-full flex items-start justify-between gap-6 py-6 text-left"
                    data-testid={`faq-trigger-${i}`}
                  >
                    <span className="font-serif text-xl sm:text-2xl text-teal-deep leading-snug">
                      {item.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="grid place-items-center h-9 w-9 rounded-full border border-line text-teal shrink-0 mt-0.5"
                    >
                      <Plus size={18} weight="bold" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-7 pr-14 text-[15px] text-muted leading-relaxed" data-testid={`faq-answer-${i}`}>
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
};
