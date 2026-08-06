import React from "react";
import { Phone, WhatsappLogo, CalendarCheck } from "@phosphor-icons/react";
import { useLang } from "@/context/LanguageContext";
import { waLink, telLink } from "@/lib/site";

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

export const MobileCTABar = () => {
  const { t } = useLang();
  return (
    <div
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-sand/85 backdrop-blur-xl border-t border-line px-3 py-2.5 flex items-center gap-2"
      data-testid="mobile-cta-bar"
    >
      <a
        href={telLink}
        className="flex-1 flex items-center justify-center gap-2 rounded-full bg-teal text-sand py-3 text-sm font-medium"
        data-testid="mobile-bar-call"
      >
        <Phone size={17} weight="fill" /> {t.common.callShort}
      </a>
      <a
        href={waLink()}
        target="_blank"
        rel="noreferrer"
        className="flex-1 flex items-center justify-center gap-2 rounded-full bg-terracotta text-white py-3 text-sm font-medium"
        data-testid="mobile-bar-whatsapp"
      >
        <WhatsappLogo size={18} weight="fill" /> {t.common.whatsappShort}
      </a>
      <button
        onClick={() => scrollTo("contact")}
        className="flex-1 flex items-center justify-center gap-2 rounded-full border border-teal text-teal py-3 text-sm font-medium"
        data-testid="mobile-bar-book"
      >
        <CalendarCheck size={18} weight="bold" /> {t.common.book}
      </button>
    </div>
  );
};
