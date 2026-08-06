import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Phone, WhatsappLogo, List, X, Translate } from "@phosphor-icons/react";
import { useLang } from "@/context/LanguageContext";
import { SITE, waLink, telLink } from "@/lib/site";

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

export const Header = () => {
  const { t, lang, toggle } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = [
    { id: "top", label: t.nav.home },
    { id: "about", label: t.nav.about },
    { id: "services", label: t.nav.services },
    { id: "selfcheck", label: t.nav.selfcheck },
    { id: "contact", label: t.nav.contact },
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-[background-color,box-shadow,padding] duration-500 ${
        scrolled
          ? "bg-sand/80 backdrop-blur-xl border-b border-line py-2.5 shadow-[0_8px_30px_rgba(18,67,64,0.06)]"
          : "bg-transparent py-4"
      }`}
      data-testid="site-header"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between gap-4">
        {/* Brand */}
        <button
          onClick={() => scrollTo("top")}
          className="flex items-center gap-3 text-left group"
          data-testid="brand-logo"
        >
          <span className="grid place-items-center h-10 w-10 rounded-full bg-teal text-sand font-serif text-xl italic shrink-0">
            as
          </span>
          <span className="leading-tight">
            <span className="block font-serif text-teal text-lg sm:text-xl">
              {SITE.clinicName}
            </span>
            <span className="hidden sm:block text-[11px] text-muted tracking-wide">
              {t.header.tagline}
            </span>
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {nav.map((n) => (
            <button
              key={n.id}
              onClick={() => scrollTo(n.id)}
              className="text-sm text-muted hover:text-teal transition-colors duration-300 relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 hover:after:w-full after:bg-terracotta after:transition-all after:duration-300"
              data-testid={`nav-${n.id}`}
            >
              {n.label}
            </button>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <button
            onClick={toggle}
            className="hidden sm:flex items-center gap-1.5 rounded-full border border-line px-3 py-2 text-sm text-teal hover:bg-wheat/60 transition-colors duration-300"
            data-testid="lang-toggle"
            aria-label="Toggle language"
          >
            <Translate size={16} weight="bold" />
            {t.langLabel}
          </button>
          <a
            href={telLink}
            className="grid place-items-center h-10 w-10 rounded-full bg-teal text-sand hover:bg-teal-deep transition-colors duration-300"
            data-testid="header-call-btn"
            aria-label="Call clinic"
          >
            <Phone size={18} weight="fill" />
          </a>
          <a
            href={waLink()}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:grid place-items-center h-10 w-10 rounded-full bg-terracotta text-white hover:brightness-95 transition-[filter] duration-300"
            data-testid="header-whatsapp-btn"
            aria-label="WhatsApp us"
          >
            <WhatsappLogo size={19} weight="fill" />
          </a>
          <button
            className="lg:hidden grid place-items-center h-10 w-10 rounded-full border border-line text-teal"
            onClick={() => setOpen((o) => !o)}
            data-testid="mobile-menu-toggle"
            aria-label="Menu"
          >
            {open ? <X size={20} /> : <List size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="lg:hidden overflow-hidden bg-sand/95 backdrop-blur-xl border-t border-line mt-2"
        >
          <div className="px-5 py-4 flex flex-col gap-1">
            {nav.map((n) => (
              <button
                key={n.id}
                onClick={() => {
                  scrollTo(n.id);
                  setOpen(false);
                }}
                className="text-left py-3 text-teal border-b border-line/60 last:border-0"
                data-testid={`mobile-nav-${n.id}`}
              >
                {n.label}
              </button>
            ))}
            <button
              onClick={toggle}
              className="mt-3 flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm text-teal w-fit"
              data-testid="mobile-lang-toggle"
            >
              <Translate size={16} weight="bold" /> {t.langLabel}
            </button>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};
