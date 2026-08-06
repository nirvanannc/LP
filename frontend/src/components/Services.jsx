import React from "react";
import { motion } from "framer-motion";
import {
  CloudRain,
  Wine,
  Baby,
  HeartHalf,
  UsersThree,
  VideoCamera,
  ArrowUpRight,
} from "@phosphor-icons/react";
import { useLang } from "@/context/LanguageContext";
import { Chapter, FadeUp } from "@/components/Primitives";

const icons = [CloudRain, Wine, Baby, HeartHalf, UsersThree, VideoCamera];
// bento spans (12-col): make first & last wider
const spans = [
  "md:col-span-7",
  "md:col-span-5",
  "md:col-span-5",
  "md:col-span-7",
  "md:col-span-7",
  "md:col-span-5",
];

export const Services = () => {
  const { t } = useLang();
  const s = t.services;
  return (
    <section id="services" className="py-24 lg:py-32" data-testid="services-section">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <FadeUp>
          <Chapter n={s.chapter} title={t.nav.services} />
          <h2 className="mt-6 font-serif text-teal-deep font-normal text-4xl sm:text-5xl tracking-tight max-w-2xl leading-[1.05]">
            {s.title}
          </h2>
          <p className="mt-4 text-lg text-muted max-w-xl">{s.sub}</p>
        </FadeUp>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-12 gap-5">
          {s.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <FadeUp key={i} delay={i * 0.05} className={spans[i]}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 240, damping: 22 }}
                  className="group h-full bg-surface border border-line rounded-3xl p-7 sm:p-8 flex flex-col justify-between shadow-[0_8px_30px_rgba(18,67,64,0.05)] relative overflow-hidden"
                  data-testid={`service-card-${i}`}
                >
                  <span className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-wheat/40 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative">
                    <span className="grid place-items-center h-14 w-14 rounded-2xl bg-teal text-sand mb-6">
                      <Icon size={28} weight="light" />
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-teal-deep">{item.t}</h3>
                    <p className="mt-2 text-[15px] text-muted leading-relaxed max-w-md">{item.d}</p>
                  </div>
                  <button
                    onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                    className="relative mt-6 inline-flex items-center gap-1.5 text-sm text-teal font-medium w-fit"
                    data-testid={`service-learn-${i}`}
                  >
                    {s.learn}
                    <ArrowUpRight
                      size={17}
                      weight="bold"
                      className="text-terracotta group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                    />
                  </button>
                </motion.div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
};
