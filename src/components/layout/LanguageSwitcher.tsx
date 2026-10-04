"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe } from "lucide-react";
import type { Locale } from "@/lib/i18n";

interface LanguageSwitcherProps {
  currentLang: Locale;
}

export function LanguageSwitcher({ currentLang }: LanguageSwitcherProps) {
  const pathname = usePathname() || "";
  const targetLang: Locale = currentLang === "ar" ? "en" : "ar";

  // Replace locale prefix in current pathname
  const segments = pathname.split("/").filter(Boolean);
  let targetPath = `/${targetLang}`;

  if (segments.length > 1) {
    targetPath = `/${targetLang}/${segments.slice(1).join("/")}`;
  }

  return (
    <Link
      href={targetPath}
      className="inline-flex items-center justify-center gap-1 px-2 py-1 sm:px-2.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-semibold text-slate-200 hover:text-white bg-white/10 hover:bg-white/20 border border-white/15 transition-all shrink-0"
      title={currentLang === "ar" ? "Switch to English" : "التبديل إلى العربية"}
      aria-label={currentLang === "ar" ? "Switch to English" : "التبديل إلى العربية"}
    >
      <Globe className="w-3 h-3 text-[#C59341] shrink-0" />
      <span className="font-mono uppercase text-[10px] sm:text-[11px] leading-none">
        {currentLang === "ar" ? "EN" : "عربي"}
      </span>
    </Link>
  );
}
