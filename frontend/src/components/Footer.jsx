import React from "react";
import { InstagramLogo, FacebookLogo, LinkedinLogo, Phone, WhatsappLogo } from "@phosphor-icons/react";
import { useLang } from "@/context/LanguageContext";
import { SITE, waLink, telLink } from "@/lib/site";

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export const Footer = () => {
  const { t } = useLang();
  const f = t.footer;
  const links = [
    { id: "top", label: t.nav.home },
    { id: "about", label: t.nav.about },
    { id: "services", label: t.nav.services },
    { id: "selfcheck", label: t.nav.selfcheck },
    { id: "contact", label: t.nav.contact },
  ];

  return (
    <footer className="bg-teal-deep text-sand pt-16 pb-28 lg:pb-10" data-testid="site-footer">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <span className="grid place-items-center h-10 w-10 rounded-full bg-sand text-teal font-serif text-xl italic">as</span>
              <span className="font-serif text-2xl">{SITE.clinicName}</span>
            </div>
            <p className="mt-4 text-sand/70 max-w-sm leading-relaxed">{f.tagline}</p>
            <div className="mt-6 flex gap-3">
              <a href={telLink} className="grid place-items-center h-10 w-10 rounded-full bg-sand/10 hover:bg-sand/20 transition-colors" data-testid="footer-call" aria-label="Call"><Phone size={18} weight="fill" /></a>
              <a href={waLink()} target="_blank" rel="noreferrer" className="grid place-items-center h-10 w-10 rounded-full bg-sand/10 hover:bg-sand/20 transition-colors" data-testid="footer-whatsapp" aria-label="WhatsApp"><WhatsappLogo size={18} weight="fill" /></a>
            </div>
          </div>

          <div>
            <p className="text-[12px] uppercase tracking-[0.2em] text-sand/50">{f.quick}</p>
            <ul className="mt-4 grid gap-2.5">
              {links.map((l) => (
                <li key={l.id}>
                  <button onClick={() => scrollTo(l.id)} className="text-sand/75 hover:text-sand transition-colors" data-testid={`footer-nav-${l.id}`}>
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[12px] uppercase tracking-[0.2em] text-sand/50">{f.contact}</p>
            <ul className="mt-4 grid gap-2.5 text-sand/75">
              <li>{SITE.addressLine}</li>
              <li><a href={telLink} className="hover:text-sand transition-colors">{SITE.phoneDisplay}</a></li>
              <li className="break-all"><a href={`mailto:${SITE.email}`} className="hover:text-sand transition-colors">{SITE.email}</a></li>
              <li>{SITE.timings}</li>
            </ul>
            <p className="mt-5 text-[12px] uppercase tracking-[0.2em] text-sand/50">{f.social}</p>
            <div className="mt-3 flex gap-3">
              {[InstagramLogo, FacebookLogo, LinkedinLogo].map((Ic, i) => (
                <a key={i} href="#" className="grid place-items-center h-9 w-9 rounded-full bg-sand/10 hover:bg-sand/20 transition-colors" aria-label="social">
                  <Ic size={17} weight="fill" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-sand/12">
          <p className="text-[12px] text-sand/50 leading-relaxed max-w-3xl">{f.disclaimer}</p>
          <div className="mt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[12px] text-sand/50">
            <span>© {new Date().getFullYear()} {SITE.clinicName}. {f.rights}</span>
            <a href="#" className="hover:text-sand transition-colors" data-testid="footer-privacy">{f.privacyPolicy}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
