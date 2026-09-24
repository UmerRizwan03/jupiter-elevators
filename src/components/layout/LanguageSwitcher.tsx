"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Globe } from "lucide-react";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale, toggleLocale, t } = useLanguage();

  return (
    <button
      onClick={toggleLocale}
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide transition-all border ${
        locale === "en"
          ? "border-brand-gold/40 text-brand-gold hover:bg-brand-gold/10"
          : "border-brand-gold/40 text-brand-gold hover:bg-brand-gold/10"
      } ${className}`}
      aria-label="Toggle language"
    >
      <Globe className="w-3.5 h-3.5" />
      <span>{t.nav.switchLanguage}</span>
    </button>
  );
}
