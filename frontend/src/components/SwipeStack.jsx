import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quotes, Star, ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { IMAGES } from "@/lib/site";

const cardVariants = {
  enter: (dir) => ({ x: dir > 0 ? 320 : -320, opacity: 0, rotate: dir > 0 ? 6 : -6, scale: 0.92 }),
  center: { x: 0, opacity: 1, rotate: 0, scale: 1 },
  exit: (dir) => ({ x: dir > 0 ? -320 : 320, opacity: 0, rotate: dir > 0 ? -6 : 6, scale: 0.92 }),
};

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// items: [{ quote, attribution }]
export const SwipeStack = ({
  items,
  variant = "light",
  showStars = false,
  testId = "stack",
  heightClass = "h-[340px] sm:h-[300px]",
  autoMs = 6000,
}) => {
  const [[index, dir], setState] = useState([0, 0]);
  const [paused, setPaused] = useState(false);
  const [reduce] = useState(prefersReduced);
  const n = items.length;

  const paginate = useCallback((d) => setState(([i]) => [(i + d + n) % n, d]), [n]);

  useEffect(() => {
    if (paused || reduce || n < 2) return;
    const t = setInterval(() => paginate(1), autoMs);
    return () => clearInterval(t);
  }, [paused, reduce, n, paginate, autoMs]);

  const dark = variant === "dark";
  const current = items[index];

  const cardBase = dark
    ? "bg-teal text-sand border border-sand/12"
    : "bg-surface text-teal-deep border border-line";
  const quoteText = dark
    ? "font-serif italic text-xl sm:text-2xl leading-snug text-sand/95"
    : "font-serif text-2xl sm:text-[1.7rem] leading-snug text-teal-deep";
  const attrText = dark ? "text-sand/70" : "text-muted";
  const divider = dark ? "border-sand/15" : "border-line";
  const quoteIcon = dark ? "text-sand/35" : "text-terracotta/70";

  const peekA = dark ? "bg-teal/60 border-sand/10" : "bg-surface/70 border-line";
  const peekB = dark ? "bg-teal/80 border-sand/10" : "bg-surface border-line";

  return (
    <div
      className="max-w-xl mx-auto"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      data-testid={testId}
    >
      <div className={`relative ${heightClass}`}>
        {n > 1 && (
          <>
            <div
              className={`absolute inset-x-0 top-0 h-full rounded-3xl border ${peekA} shadow-[0_8px_30px_rgba(18,67,64,0.05)]`}
              style={{ transform: "translateY(36px) scale(0.90)" }}
              aria-hidden
            />
            <div
              className={`absolute inset-x-0 top-0 h-full rounded-3xl border ${peekB} shadow-[0_8px_30px_rgba(18,67,64,0.06)]`}
              style={{ transform: "translateY(18px) scale(0.95)" }}
              aria-hidden
            />
          </>
        )}

        <AnimatePresence custom={dir} mode="popLayout" initial={false}>
          <motion.figure
            key={index}
            custom={dir}
            variants={cardVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            drag={n > 1 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.5}
            onDragEnd={(e, info) => {
              if (info.offset.x < -80) paginate(1);
              else if (info.offset.x > 80) paginate(-1);
            }}
            whileDrag={{ scale: 1.02, cursor: "grabbing" }}
            className={`absolute inset-x-0 top-0 h-full overflow-hidden rounded-3xl ${cardBase} shadow-[0_20px_50px_rgba(18,67,64,0.12)] p-7 sm:p-9 flex flex-col ${n > 1 ? "cursor-grab" : ""} select-none`}
            data-testid={`${testId}-card`}
          >
            {dark && (
              <img
                src={IMAGES.jali}
                alt=""
                aria-hidden
                className="pointer-events-none absolute -right-14 -bottom-14 w-56 opacity-[0.06] invert"
              />
            )}
            <Quotes size={30} weight="fill" className={`relative ${quoteIcon}`} />
            <blockquote className={`relative mt-4 flex-1 ${quoteText}`}>
              {current.quote}
            </blockquote>
            <figcaption className={`relative mt-5 pt-4 border-t ${divider} flex items-center justify-between`}>
              <span className={`text-[13px] ${attrText}`}>— {current.attribution}</span>
              {showStars && (
                <span className="flex text-terracotta">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} weight="fill" />
                  ))}
                </span>
              )}
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      {n > 1 && (
        <div className="mt-8 flex items-center justify-center gap-5">
          <button
            onClick={() => paginate(-1)}
            className="grid place-items-center h-11 w-11 rounded-full border border-line text-teal hover:bg-wheat/50 transition-colors"
            data-testid={`${testId}-prev`}
            aria-label="Previous"
          >
            <ArrowLeft size={18} weight="bold" />
          </button>

          <div className="flex items-center gap-2" data-testid={`${testId}-dots`}>
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setState([i, i >= index ? 1 : -1])}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index ? "w-7 bg-teal" : "w-2 bg-line hover:bg-muted/50"
                }`}
                data-testid={`${testId}-dot-${i}`}
                aria-label={`Item ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => paginate(1)}
            className="grid place-items-center h-11 w-11 rounded-full border border-line text-teal hover:bg-wheat/50 transition-colors"
            data-testid={`${testId}-next`}
            aria-label="Next"
          >
            <ArrowRight size={18} weight="bold" />
          </button>
        </div>
      )}
    </div>
  );
};
