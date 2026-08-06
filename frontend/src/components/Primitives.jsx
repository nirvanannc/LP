import React from "react";
import { motion } from "framer-motion";

// Section chapter label — "numbered manifesto chapter" style
export const Chapter = ({ n, title }) => (
  <div className="flex items-baseline gap-4" data-testid={`chapter-${n}`}>
    <span className="font-serif text-terracotta text-2xl sm:text-3xl italic leading-none">
      {n}
    </span>
    <span className="text-[11px] uppercase tracking-[0.28em] text-muted font-medium pt-1">
      {title}
    </span>
  </div>
);

// Reusable scroll fade-up wrapper
export const FadeUp = ({ children, delay = 0, className = "", y = 40 }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

// Masked line-by-line reveal for headlines
export const RevealLines = ({ lines, className = "", delay = 0 }) => (
  <span className={className}>
    {lines.map((line, i) => (
      <span key={i} className="reveal-mask">
        <motion.span
          className="block"
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.9, delay: delay + i * 0.12, ease: [0.33, 1, 0.68, 1] }}
        >
          {line}
        </motion.span>
      </span>
    ))}
  </span>
);
