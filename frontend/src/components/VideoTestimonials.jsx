import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, SpeakerHigh } from "@phosphor-icons/react";
import { VIDEO_TESTIMONIALS } from "@/lib/site";

const Lightbox = ({ video, poster, label, title, onClose }) => {
  const ref = useRef(null);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] bg-[#0A2523]/92 backdrop-blur-md grid place-items-center p-4"
      data-testid="video-lightbox"
    >
      <motion.div
        initial={{ scale: 0.94, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.96, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[min(92vw,520px)]"
      >
        <video
          ref={ref}
          src={video}
          poster={poster}
          controls
          autoPlay
          playsInline
          className="w-full max-h-[78vh] rounded-[1.5rem] bg-black object-contain shadow-[0_30px_90px_rgba(0,0,0,0.5)]"
          data-testid="video-lightbox-player"
        />
        <div className="mt-4 text-center">
          <p className="font-serif text-xl text-sand leading-snug">{title}</p>
          <p className="text-[13px] text-sand/60 mt-1">{label}</p>
        </div>
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute -top-3 -right-2 grid place-items-center h-10 w-10 rounded-full bg-sand text-teal-deep shadow-lg hover:bg-wheat transition-colors"
          data-testid="video-lightbox-close"
        >
          <X size={18} weight="bold" />
        </button>
      </motion.div>
    </motion.div>
  );
};

export const VideoTestimonials = ({ items, note, watchLabel }) => {
  const [open, setOpen] = useState(null);
  const videos = VIDEO_TESTIMONIALS.map((v, i) => ({ ...v, ...(items[i] || {}) }));

  return (
    <div data-testid="video-testimonials">
      <div className="-mx-5 sm:mx-0 px-5 sm:px-0 flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto sm:overflow-visible snap-x snap-mandatory pb-2 sm:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {videos.map((v, i) => (
          <motion.button
            key={v.id}
            onClick={() => setOpen(i)}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6 }}
            className="group relative shrink-0 snap-center w-[74vw] sm:w-auto text-left rounded-[1.5rem] overflow-hidden border border-line bg-teal-deep shadow-[0_18px_50px_rgba(18,67,64,0.14)]"
            data-testid={`video-testimonial-${i}`}
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={v.poster}
                alt={v.label}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover object-[50%_22%] transition-transform duration-700 group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A2523]/90 via-[#0A2523]/15 to-transparent" />

              <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-sand/90 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-teal-deep">
                <SpeakerHigh size={12} weight="fill" className="text-terracotta" /> {watchLabel}
              </span>

              <span className="absolute inset-0 grid place-items-center">
                <span className="grid place-items-center h-14 w-14 rounded-full bg-terracotta text-white shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover:scale-110">
                  <Play size={22} weight="fill" />
                </span>
              </span>

              <span className="absolute inset-x-0 bottom-0 p-4">
                <span className="block font-serif text-[1.05rem] leading-snug text-sand">
                  {v.title}
                </span>
                <span className="mt-1 block text-[12px] text-sand/65">{v.label}</span>
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      <p className="mt-6 text-center text-[12px] text-muted/80 italic">{note}</p>

      <AnimatePresence>
        {open !== null && (
          <Lightbox
            video={videos[open].src}
            poster={videos[open].poster}
            title={videos[open].title}
            label={videos[open].label}
            onClose={() => setOpen(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
