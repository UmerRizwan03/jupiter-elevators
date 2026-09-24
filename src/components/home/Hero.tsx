"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { companyData } from "@/data/company";
import { getPhotoIdWhatsAppUrl } from "@/lib/whatsapp";
import {
  Search,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Camera,
  Layers,
  Truck,
  Award,
} from "lucide-react";

export function Hero() {
  const { t, locale, isRtl } = useLanguage();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;
  const photoUrl = getPhotoIdWhatsAppUrl(locale);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/catalog?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/catalog");
    }
  };

  return (
    <section className="relative bg-gradient-to-b from-brand-navy via-brand-navy to-slate-900 text-white pt-12 pb-20 px-4 sm:px-8 overflow-hidden">
      {/* Background Subtle Geometric Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#C59341_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-brand-gold text-xs font-semibold tracking-wide">
            <ShieldCheck className="w-4 h-4 text-brand-gold" />
            <span>{t.hero.badge}</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight sm:leading-tight">
            {t.hero.title}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            {t.hero.subtitle}
          </p>

          {/* Quick Search Bar */}
          <form
            onSubmit={handleSearch}
            className="pt-2 max-w-2xl mx-auto relative flex items-center shadow-2xl"
          >
            <div className="relative w-full">
              <Search className="w-5 h-5 text-slate-400 absolute start-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.catalog.searchPlaceholder}
                className="w-full py-4 ps-12 pe-32 rounded-xl text-slate-900 bg-white placeholder-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-gold shadow-lg"
              />
              <button
                type="submit"
                className="absolute end-2 top-1/2 -translate-y-1/2 px-5 py-2.5 rounded-lg bg-brand-navy hover:bg-brand-navy-light text-white text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <span>{locale === "ar" ? "بحث" : "Search"}</span>
                <ArrowIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-gold hover:bg-brand-gold-dark text-brand-navy font-bold text-sm transition-all shadow-lg shadow-brand-gold/20"
            >
              <Layers className="w-4 h-4" />
              <span>{t.hero.exploreCatalog}</span>
            </Link>

            <a
              href={photoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 font-semibold text-sm transition-all"
            >
              <Camera className="w-4 h-4 text-brand-gold" />
              <span>{t.hero.photoSupport}</span>
            </a>
          </div>
        </div>

        {/* Four Key Industry Metrics */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto pt-8 border-t border-slate-800">
          <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-4 text-center">
            <Award className="w-6 h-6 text-brand-gold mx-auto mb-1.5" />
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">
              {t.hero.stats.experienceYears}
            </div>
            <div className="text-xs text-slate-400 mt-1">{t.hero.stats.experienceLabel}</div>
          </div>

          <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-4 text-center">
            <Layers className="w-6 h-6 text-brand-gold mx-auto mb-1.5" />
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">
              {t.hero.stats.partsInStock}
            </div>
            <div className="text-xs text-slate-400 mt-1">{t.hero.stats.partsLabel}</div>
          </div>

          <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-4 text-center">
            <Truck className="w-6 h-6 text-brand-gold mx-auto mb-1.5" />
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">
              {t.hero.stats.coverage}
            </div>
            <div className="text-xs text-slate-400 mt-1">{t.hero.stats.coverageLabel}</div>
          </div>

          <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-4 text-center">
            <ShieldCheck className="w-6 h-6 text-brand-gold mx-auto mb-1.5" />
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">
              {t.hero.stats.logisticsYears}
            </div>
            <div className="text-xs text-slate-400 mt-1">{t.hero.stats.logisticsLabel}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
