import React, { createContext, useContext, useState, useCallback } from "react";
import { CONTENT } from "@/i18n";

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState("en");
  const toggle = useCallback(() => setLang((l) => (l === "en" ? "hi" : "en")), []);
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
