"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { dictionaries, Locale } from "@/i18n/locales";

type LanguageContextType = {
  lang: Locale;
  setLang: (lang: Locale) => void;
  t: (key: keyof typeof dictionaries["en"]["navbar"] | keyof typeof dictionaries["en"]["hero"], section: "navbar" | "hero") => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Locale>("en");

  useEffect(() => {
    // Check local storage for saved language preference on mount
    const savedLang = localStorage.getItem("app-lang") as Locale;
    if (savedLang && dictionaries[savedLang]) {
      setLangState(savedLang);
    }
  }, []);

  useEffect(() => {
    // Handle RTL logic for Arabic
    if (lang === "ar") {
      document.documentElement.dir = "rtl";
    } else {
      document.documentElement.dir = "ltr";
    }
    // Save preference
    localStorage.setItem("app-lang", lang);
  }, [lang]);

  const setLang = (newLang: Locale) => {
    setLangState(newLang);
  };

  const t = (key: any, section: "navbar" | "hero") => {
    return (dictionaries[lang][section] as any)[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
