import React from "react";
import { Star } from "@phosphor-icons/react";
import { useLang } from "@/context/LanguageContext";
import { Chapter, FadeUp } from "@/components/Primitives";
import { SwipeStack } from "@/components/SwipeStack";

export const Testimonials = () => {
  const { t } = useLang();
  const tt = t.testimonials;
  const items = tt.items.map((it) => ({ quote: it.q, attribution: it.a }));

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
            <SwipeStack items={items} variant="light" showStars testId="testimonial" />
          </div>
        </FadeUp>
      </div>
    </section>
  );
};
