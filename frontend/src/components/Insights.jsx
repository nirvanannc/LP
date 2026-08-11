import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, PlayCircle, ArrowUpRight, X } from "@phosphor-icons/react";
import { useLang } from "@/context/LanguageContext";
import { Chapter, FadeUp } from "@/components/Primitives";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { INSIGHTS } from "@/data/insights";

const cardVariants = {
  enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0, rotate: dir > 0 ? 5 : -5, scale: 0.92 }),
  center: { x: 0, opacity: 1, rotate: 0, scale: 1 },
  exit: (dir) => ({ x: dir > 0 ? -300 : 300, opacity: 0, rotate: dir > 0 ? -5 : 5, scale: 0.92 }),
};

export const Insights = () => {
  const { t, lang } = useLang();
  const ins = t.insights;
  const items = INSIGHTS;
  const n = items.length;

  const [[index, dir], setState] = useState([0, 0]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const movedRef = useRef(false);

  const paginate = useCallback((d) => setState(([i]) => [(i + d + n) % n, d]), [n]);
  const openPost = (i) => {
    setActive(i);
    setOpen(true);
  };
  const modalNav = (d) => setActive((i) => (i + d + n) % n);

  const front = items[index];
  const peek1 = items[(index + 1) % n];
  const peek2 = items[(index + 2) % n];
  const post = items[active];

  return (
    <section id="insights" className="py-24 lg:py-32 bg-surface/60 relative overflow-hidden" data-testid="insights-section">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <FadeUp className="text-center flex flex-col items-center">
          <div className="flex justify-center">
            <Chapter n={ins.chapter} title={ins.tag} />
          </div>
          <h2 className="mt-6 font-serif text-teal-deep font-normal text-4xl sm:text-5xl tracking-tight leading-[1.05]">
            {ins.title}
          </h2>
          <p className="mt-4 text-lg text-muted max-w-xl">{ins.sub}</p>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="mt-14 max-w-md mx-auto" data-testid="insights-stack">
            <div className="relative h-[460px] sm:h-[440px]">
              {/* peek layers */}
              <div
                className="absolute inset-x-0 top-0 h-full rounded-[2rem] overflow-hidden border border-line shadow-[0_8px_30px_rgba(18,67,64,0.05)]"
                style={{ transform: "translateY(34px) scale(0.90)" }}
                aria-hidden
              >
                <img src={peek2.media} alt="" loading="lazy" className="w-full h-full object-cover opacity-70" />
              </div>
              <div
                className="absolute inset-x-0 top-0 h-full rounded-[2rem] overflow-hidden border border-line shadow-[0_8px_30px_rgba(18,67,64,0.06)]"
                style={{ transform: "translateY(17px) scale(0.95)" }}
                aria-hidden
              >
                <img src={peek1.media} alt="" loading="lazy" className="w-full h-full object-cover opacity-85" />
              </div>

              <AnimatePresence custom={dir} mode="popLayout" initial={false}>
                <motion.div
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
                  dragMomentum={false}
                  onPointerDown={() => { movedRef.current = false; }}
                  onDrag={(e, info) => { if (Math.abs(info.offset.x) > 6) movedRef.current = true; }}
                  onDragEnd={(e, info) => {
                    if (info.offset.x < -80) paginate(1);
                    else if (info.offset.x > 80) paginate(-1);
                  }}
                  onClick={() => { if (!movedRef.current) openPost(index); }}
                  whileHover={{ y: -4 }}
                  className="absolute inset-x-0 top-0 h-full rounded-[2rem] overflow-hidden bg-surface border border-line shadow-[0_24px_60px_rgba(18,67,64,0.16)] cursor-pointer select-none flex flex-col"
                  data-testid="insights-card"
                >
                  <div className="relative h-64 sm:h-60 shrink-0">
                    <img src={front.media} alt={front[lang].title} loading="lazy" className="w-full h-full object-cover pointer-events-none" draggable={false} />
                    <div className="absolute inset-0 bg-gradient-to-t from-teal-deep/40 to-transparent" />
                    {front.type === "video" && (
                      <PlayCircle size={54} weight="fill" className="absolute inset-0 m-auto text-sand/90" />
                    )}
                    <span className="absolute top-3 left-3 rounded-full bg-sand/85 backdrop-blur px-3 py-1 text-[11px] uppercase tracking-wide text-teal">
                      Dr. Soni
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-serif text-2xl text-teal-deep leading-tight">{front[lang].title}</h3>
                    <p className="mt-2 text-[14px] text-muted leading-relaxed line-clamp-2">
                      {front[lang].caption}
                    </p>
                    <span
                      className="mt-auto pt-4 inline-flex items-center gap-1.5 text-sm font-medium text-teal"
                      data-testid="insights-card-open"
                    >
                      {ins.readMore}
                      <ArrowUpRight size={16} weight="bold" className="text-terracotta" />
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* controls */}
            <div className="mt-8 flex items-center justify-center gap-5">
              <button
                onClick={() => paginate(-1)}
                className="grid place-items-center h-11 w-11 rounded-full border border-line text-teal hover:bg-wheat/50 transition-colors"
                data-testid="insights-prev"
                aria-label="Previous"
              >
                <ArrowLeft size={18} weight="bold" />
              </button>
              <div className="flex items-center gap-2">
                {items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setState([i, i >= index ? 1 : -1])}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === index ? "w-7 bg-teal" : "w-2 bg-line hover:bg-muted/50"
                    }`}
                    data-testid={`insights-dot-${i}`}
                    aria-label={`Insight ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={() => paginate(1)}
                className="grid place-items-center h-11 w-11 rounded-full border border-line text-teal hover:bg-wheat/50 transition-colors"
                data-testid="insights-next"
                aria-label="Next"
              >
                <ArrowRight size={18} weight="bold" />
              </button>
            </div>
            <p className="mt-4 text-center text-[12px] text-muted/80">{ins.tapHint}</p>
          </div>
        </FadeUp>
      </div>

      {/* On-site post viewer */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="max-w-3xl w-[calc(100%-2rem)] p-0 overflow-hidden bg-surface border border-line rounded-3xl sm:rounded-3xl"
          data-testid="insights-modal"
        >
          <div className="grid md:grid-cols-2">
            <div className="relative bg-teal-deep">
              {post.type === "video" ? (
                <video
                  src={post.media}
                  poster={post.poster}
                  controls
                  playsInline
                  className="w-full h-64 md:h-full object-cover"
                  data-testid="insights-modal-video"
                />
              ) : (
                <img
                  src={post.media}
                  alt={post[lang].title}
                  className="w-full h-64 md:h-full object-cover"
                />
              )}
            </div>

            <div className="p-6 sm:p-8 flex flex-col max-h-[82vh] md:max-h-[600px]">
              <span className="text-[11px] uppercase tracking-[0.22em] text-terracotta">
                Dr. Soni · {active + 1}/{n}
              </span>
              <DialogTitle className="mt-2 font-serif text-2xl sm:text-3xl text-teal-deep font-normal leading-tight">
                {post[lang].title}
              </DialogTitle>
              <DialogDescription className="sr-only">
                Insight from Dr. Aditya Soni
              </DialogDescription>
              <div
                className="mt-4 overflow-y-auto pr-1 text-[15px] text-ink/80 leading-relaxed"
                data-testid="insights-modal-caption"
              >
                {post[lang].caption}
              </div>

              <div className="mt-6 pt-4 border-t border-line flex items-center justify-between">
                <div className="flex gap-2">
                  <button
                    onClick={() => modalNav(-1)}
                    className="grid place-items-center h-10 w-10 rounded-full border border-line text-teal hover:bg-wheat/50 transition-colors"
                    data-testid="insights-modal-prev"
                    aria-label="Previous insight"
                  >
                    <ArrowLeft size={17} weight="bold" />
                  </button>
                  <button
                    onClick={() => modalNav(1)}
                    className="grid place-items-center h-10 w-10 rounded-full border border-line text-teal hover:bg-wheat/50 transition-colors"
                    data-testid="insights-modal-next"
                    aria-label="Next insight"
                  >
                    <ArrowRight size={17} weight="bold" />
                  </button>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-teal text-sand px-4 py-2 text-sm hover:bg-teal-deep transition-colors"
                  data-testid="insights-modal-close"
                >
                  <X size={15} weight="bold" /> {ins.close}
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};
