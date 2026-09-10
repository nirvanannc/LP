import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { CONTENT } from "@/i18n";
import { detectLanguage } from "@/lib/api";

const LanguageContext = createContext(null);
const STORE_KEY = "clinic_lang";

// Browser-side hint used when the IP lookup is unavailable.
const browserPrefersHinglish = () => {
  const langs = navigator.languages || [navigator.language || ""];
  if (langs.some((l) => /^(hi|mr|raj|gu|pa|bn)/i.test(l))) return true;
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone === "Asia/Kolkata";
  } catch {
    return false;
  }
};

export const LanguageProvider = ({ children }) => {
  const stored = typeof window !== "undefined" ? localStorage.getItem(STORE_KEY) : null;
  const [lang, setLangState] = useState(stored === "hi" || stored === "en" ? stored : "en");

  const setLang = useCallback((l) => {
    setLangState(l);
    localStorage.setItem(STORE_KEY, l);
  }, []);

  const toggle = useCallback(() => setLang(lang === "en" ? "hi" : "en"), [lang, setLang]);

  // Auto-default for Indian visitors — only until they pick a language themselves.
  useEffect(() => {
    if (stored === "hi" || stored === "en") return;
    let cancelled = false;
    detectLanguage()
      .then((l) => {
        if (!cancelled) setLangState(l === "hi" || browserPrefersHinglish() ? "hi" : "en");
      })
      .catch(() => {
        if (!cancelled && browserPrefersHinglish()) setLangState("hi");
      });
    return () => {
      cancelled = true;
    };
  }, [stored]);

  const t = CONTENT[lang];
  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
};
