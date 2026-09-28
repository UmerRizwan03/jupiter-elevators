"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const brands = [
  { name: "OTIS", query: "Otis" },
  { name: "SCHINDLER", query: "Schindler" },
  { name: "KONE", query: "Kone" },
  { name: "MITSUBISHI ELECTRIC", query: "Mitsubishi" },
  { name: "THYSSENKRUPP", query: "Thyssenkrupp" },
  { name: "FERMATOR", query: "Fermator" },
  { name: "MONARCH", query: "Monarch" },
  { name: "TORIN DRIVE", query: "Torin Drive" },
  { name: "WITTUR", query: "Wittur" },
  { name: "STEP", query: "STEP" },
  { name: "YASKAWA", query: "Yaskawa" },
  { name: "MONTANARI", query: "Montanari" },
];

export function BrandMarquee() {
  const { locale } = useLanguage();

  return (
    <section className="w-full bg-[#FAFAFA] border-b border-slate-200 py-6 overflow-hidden select-none">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        
        {/* Top Label */}
        <div className="flex items-center justify-between text-[11px] font-mono font-bold tracking-widest text-slate-400 uppercase pb-4">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
            <span>
              {locale === "ar"
                ? "الماركات العالمية المتوافقة والمعتمدة للتوريد"
                : "COMPATIBLE OEM BRANDS & GLOBAL MANUFACTURERS"}
            </span>
          </span>
          <span className="hidden md:inline text-slate-400">
            {locale === "ar" ? "اضغط على أي ماركة لتصفية القطع" : "CLICK ANY BRAND TO FILTER SPARES"}
          </span>
        </div>

        {/* Editorial Slash-Separated Brand Ticker (Slide 6 & 9 inspiration) */}
        <div className="flex flex-wrap items-center justify-between gap-y-3 gap-x-4 sm:gap-x-6 pt-1 text-xs sm:text-sm lg:text-base font-black tracking-wider font-mono">
          {brands.map((b, idx) => (
            <React.Fragment key={b.name}>
              <Link
                href={`/catalog?brand=${encodeURIComponent(b.query)}`}
                className="text-slate-800 hover:text-brand-gold transition-colors hover:scale-105 transform duration-200"
              >
                {b.name}
              </Link>
              {idx < brands.length - 1 && (
                <span className="text-brand-gold/60 font-light select-none">/</span>
              )}
            </React.Fragment>
          ))}
        </div>

      </div>
    </section>
  );
}
