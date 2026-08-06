import React from "react";
import Marquee from "react-fast-marquee";
import { useLang } from "@/context/LanguageContext";

export const Ribbon = () => {
  const { t } = useLang();
  return (
    <div className="bg-teal text-sand py-5 overflow-hidden" data-testid="marquee-ribbon">
      <Marquee speed={34} gradient={false} autoFill>
        {t.marquee.map((phrase, i) => (
          <span key={i} className="flex items-center">
            <span className="font-serif italic text-2xl sm:text-3xl px-8 text-sand/95">
              {phrase}
            </span>
            <span className="text-terracotta text-xl">✦</span>
          </span>
        ))}
      </Marquee>
    </div>
  );
};
