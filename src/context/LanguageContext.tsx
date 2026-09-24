"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { SupportedLocale } from "@/types/catalog";
import { en } from "@/data/translations/en";
import { ar } from "@/data/translations/ar";

type TranslationsType = typeof en;

interface LanguageContextType {
  locale: SupportedLocale;
  setLocale: (loc: SupportedLocale) => void;
  toggleLocale: () => void;
  t: TranslationsType;
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<SupportedLocale>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("jupiter_locale") as SupportedLocale;
    if (saved === "ar" || saved === "en") {
      setLocaleState(saved);
      document.documentElement.dir = saved === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = saved;
    }
  }, []);

  const setLocale = (newLocale: SupportedLocale) => {
    setLocaleState(newLocale);
    localStorage.setItem("jupiter_locale", newLocale);
    document.documentElement.dir = newLocale === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = newLocale;
  };

  const toggleLocale = () => {
    const next = locale === "en" ? "ar" : "en";
    setLocale(next);
  };

  const t = locale === "ar" ? ar : en;
  const isRtl = locale === "ar";

  return (
    <LanguageContext.Provider value={{ locale, setLocale, toggleLocale, t, isRtl }}>
      <div dir={isRtl ? "rtl" : "ltr"} className={isRtl ? "font-arabic" : "font-sans"}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
