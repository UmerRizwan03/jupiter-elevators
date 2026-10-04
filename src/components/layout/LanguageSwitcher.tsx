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
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold text-brand-navy hover:text-brand-amber bg-white border border-brand-border hover:border-brand-amber transition-colors shadow-sm"
      title={currentLang === "ar" ? "Switch to English" : "التبديل إلى العربية"}
    >
      <Globe className="w-3.5 h-3.5 text-brand-amber" />
      <span>{currentLang === "ar" ? "English" : "العربية"}</span>
    </Link>
  );
}
