"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShieldCheck, X } from "lucide-react";
import type { Locale } from "@/lib/i18n";

interface CookieConsentProps {
  lang: Locale;
}

export function CookieConsent({ lang }: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false);
  const isRtl = lang === "ar";

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const consent = localStorage.getItem("jupiter_cookie_consent");
        if (!consent) {
          setIsVisible(true);
        }
      } catch {
        // Ignore localStorage errors (e.g. incognito)
      }
    }, 150);

    return () => clearTimeout(timer);
  }, []);

  const handleConsent = (choice: "accepted" | "essential") => {
    try {
      localStorage.setItem("jupiter_cookie_consent", choice);
    } catch {
      // Ignore error
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="region"
      aria-label={isRtl ? "إشعار ملفات تعريف الارتباط" : "Cookie consent"}
      className="fixed bottom-16 md:bottom-6 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-50 animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      <div className="bg-slate-900/95 text-white backdrop-blur-md border border-slate-700/80 rounded-2xl p-4 md:p-5 shadow-2xl">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#C59341]/20 border border-[#C59341]/40 flex items-center justify-center shrink-0 mt-0.5 text-[#C59341]">
            <ShieldCheck className="w-4 h-4" />
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#C59341] mb-1">
              {isRtl ? "الامتثال وحماية البيانات (PDPL)" : "Privacy & Compliance (PDPL)"}
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {isRtl
                ? "نستخدم ملفات تعريف الارتباط والتحليلات لتحسين تجربة التوريد الصناعي وفق نظام حماية البيانات الشخصية السعودي (PDPL)."
                : "We use essential cookies and technical analytics to optimize your procurement experience in compliance with Saudi PDPL."}
            </p>
            <div className="mt-1">
              <Link
                href={`/${lang}/privacy`}
                className="text-[11px] font-mono text-[#C59341] hover:underline"
              >
                {isRtl ? "سياسة الخصوصية والشروط" : "Read Privacy Policy →"}
              </Link>
            </div>

            <div className="mt-3.5 flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleConsent("accepted")}
                className="flex-1 py-1.5 px-3 bg-[#C59341] hover:bg-[#A8792F] text-white text-xs font-mono font-bold rounded-lg transition-colors text-center"
              >
                {isRtl ? "قبول الكل" : "Accept All"}
              </button>
              <button
                type="button"
                onClick={() => handleConsent("essential")}
                className="py-1.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono rounded-lg transition-colors text-center"
              >
                {isRtl ? "الضرورية فقط" : "Essential Only"}
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleConsent("essential")}
            aria-label={isRtl ? "إغلاق" : "Dismiss"}
            className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
