import React from "react";
import { useLang } from "@/context/LanguageContext";
import { Chapter, FadeUp } from "@/components/Primitives";
import { IMAGES } from "@/lib/site";

export const WhatToExpect = () => {
  const { t } = useLang();
  const e = t.expect;
  return (
    <section className="py-24 lg:py-32 bg-teal text-sand relative overflow-hidden" data-testid="expect-section">
      <img
        src={IMAGES.jali}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -left-32 -bottom-24 w-[460px] opacity-[0.05] invert"
      />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5">
            <FadeUp>
              <div className="[&_span]:text-sand/60 [&_.font-serif]:text-terracotta">
                <Chapter n={e.chapter} title={t.nav.contact} />
              </div>
              <h2 className="mt-6 font-serif font-normal text-4xl sm:text-5xl tracking-tight leading-[1.05]">
                {e.title}
              </h2>
              <p className="mt-4 text-lg text-sand/75 max-w-md">{e.sub}</p>
              <div className="mt-8 overflow-hidden rounded-[2rem] rounded-tr-[5rem] border border-sand/15">
                <img
                  src={IMAGES.consult}
                  alt="A warm, private consultation room at Dr. Aditya Soni Clinic, Jaipur"
                  className="w-full h-64 object-cover"
                  loading="lazy"
                />
              </div>
            </FadeUp>
          </div>

          <div className="lg:col-span-7 lg:pt-4">
            <div className="relative">
              <div className="absolute left-[27px] top-4 bottom-4 w-px bg-sand/15 hidden sm:block" />
              <div className="grid gap-6">
                {e.steps.map((step, i) => (
                  <FadeUp key={i} delay={i * 0.08}>
                    <div className="flex gap-5" data-testid={`expect-step-${i}`}>
                      <span className="relative z-10 grid place-items-center h-14 w-14 rounded-full bg-sand text-teal font-serif text-2xl shrink-0">
                        {i + 1}
                      </span>
                      <div className="bg-teal-deep/40 border border-sand/12 rounded-2xl px-6 py-5 flex-1">
                        <h3 className="font-serif text-2xl text-sand">{step.t}</h3>
                        <p className="mt-1.5 text-[15px] text-sand/70 leading-relaxed">{step.d}</p>
                      </div>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
