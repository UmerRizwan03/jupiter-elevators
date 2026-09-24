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
  Award,
  Compass,
  CheckCircle,
  Cpu,
  Wrench,
  Factory,
} from "lucide-react";

export function Hero() {
  const { t, locale, isRtl } = useLanguage();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");

  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;
  const photoUrl = getPhotoIdWhatsAppUrl(locale);

  const topBrands = [
    { name: "Monarch", logo: "MONARCH" },
    { name: "Fermator", logo: "FERMATOR" },
    { name: "Otis", logo: "OTIS" },
    { name: "Schindler", logo: "SCHINDLER" },
    { name: "Kone", logo: "KONE" },
    { name: "Torin", logo: "TORIN" },
    { name: "Step", logo: "STEP" },
    { name: "Mitsubishi", logo: "MITSUBISHI" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/catalog?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/catalog");
    }
  };

  const handleBrandClick = (brandName: string) => {
    setSelectedBrand(brandName);
    router.push(`/catalog?brand=${encodeURIComponent(brandName)}`);
  };

  return (
    <section className="relative bg-gradient-to-b from-brand-navy-deep via-brand-navy to-slate-950 text-white pt-14 pb-20 px-4 sm:px-8 overflow-hidden border-b border-slate-800">
      {/* Blueprint Grid Lines & Engineering Crosshairs */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-brand-gold/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Decorative Blueprint Corner Crosshairs */}
      <div className="max-w-7xl mx-auto relative z-10 space-y-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Top Verification Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 border border-brand-gold/40 text-brand-gold text-xs font-mono tracking-wider shadow-lg shadow-brand-gold/5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-white">SAUDI ARABIA SPARE PARTS STOCK</span>
            <span className="text-slate-500">|</span>
            <span>CR: {companyData.crNumber}</span>
          </div>

          {/* Architectural Serif Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-serif tracking-tight leading-[1.15] text-white">
            {locale === "ar" ? (
              <>
                الريادة في توريد{" "}
                <span className="text-gradient-gold">قطع غيار ومكونات المصاعد</span> في المملكة
              </>
            ) : (
              <>
                Engineered Precision:{" "}
                <span className="text-gradient-gold">Elevator Spare Parts & Components</span> Across KSA
              </>
            )}
          </h1>

          {/* Subtitle */}
          <p className="text-slate-300 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed font-sans">
            {locale === "ar"
              ? "استيراد مباشر من كبار المصنعين في الهند والصين. مخزون دائم بالدمام يخدم الرياض، جدة، وكافة مدن المملكة بشحن فوري ودعم هندسي لأكثر من 30 عاماً."
              : "Direct factory imports from certified engineering hubs in India & China. Immediate stock in Dammam serving Riyadh, Jeddah, and nationwide with same-day dispatch."}
          </p>

          {/* Direct Search Bar with CAD Frame */}
          <div className="pt-2 max-w-2xl mx-auto">
            <form
              onSubmit={handleSearch}
              className="relative flex items-center bg-slate-900/90 rounded-2xl border-2 border-brand-gold/50 hover:border-brand-gold focus-within:border-brand-gold transition-colors p-1.5 shadow-2xl backdrop-blur-md"
            >
              <Search className="w-5 h-5 text-brand-gold ms-3 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  locale === "ar"
                    ? "ابحث باسم القطعة، الكود أو الماركة (مثال: نايس 3000، فيرماتور، سكة T89)..."
                    : "Search by part name, SKU, or brand (e.g. NICE 3000+, Fermator, T89 Rails)..."
                }
                className="w-full py-3 px-3 text-white bg-transparent placeholder-slate-400 text-xs sm:text-sm font-medium focus:outline-none"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-brand-gold hover:bg-brand-gold-dark text-slate-950 text-xs sm:text-sm font-black transition-all flex items-center gap-1.5 shrink-0 shadow-md font-mono"
              >
                <span>{locale === "ar" ? "ابحث بالكتالوج" : "LOOKUP PART"}</span>
                <ArrowIcon className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-navy border border-brand-gold/40 hover:bg-brand-navy-light text-brand-gold text-xs font-bold transition-all shadow-md font-mono"
            >
              <Layers className="w-4 h-4" />
              <span>{t.hero.exploreCatalog}</span>
            </Link>

            <a
              href={photoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/20"
            >
              <Camera className="w-4 h-4" />
              <span>{t.hero.photoSupport}</span>
            </a>
          </div>
        </div>

        {/* Fast Brand Compatibility Strip */}
        <div className="pt-8 border-t border-slate-800/80">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-3 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-2 text-brand-gold">
              <Compass className="w-4 h-4" />
              <span>{locale === "ar" ? "توافق مباشر مع الماركات العالمية:" : "OEM COMPATIBILITY LOOKUP:"}</span>
            </span>
            <span className="text-[11px] text-slate-500">
              {locale === "ar" ? "اختر الماركة لعرض البدائل المعتمدة" : "Select brand to filter compatible replacements"}
            </span>
          </div>

          {/* Brand Chips Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
            {topBrands.map((b) => (
              <button
                key={b.name}
                onClick={() => handleBrandClick(b.name)}
                className="py-2.5 px-3 rounded-xl bg-slate-900/80 hover:bg-brand-navy border border-slate-800 hover:border-brand-gold/60 text-slate-300 hover:text-white text-xs font-mono font-bold transition-all text-center tracking-wider hover:scale-105"
              >
                {b.logo}
              </button>
            ))}
          </div>
        </div>

        {/* Engineering Metrics Ribbon */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-start space-y-1 relative overflow-hidden">
            <div className="cad-corner-tl" />
            <div className="text-2xl sm:text-3xl font-black font-mono text-brand-gold">
              30+ YRS
            </div>
            <div className="text-xs font-semibold text-slate-200">
              {locale === "ar" ? "خبرة في هندسة المصاعد" : "Lift Engineering Expertise"}
            </div>
            <div className="text-[11px] text-slate-500">
              {locale === "ar" ? "تشخيص الأعطال وتحديد البدائل" : "Direct diagnostic & fault isolation"}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-start space-y-1 relative overflow-hidden">
            <div className="cad-corner-tl" />
            <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400">
              10,000+
            </div>
            <div className="text-xs font-semibold text-slate-200">
              {locale === "ar" ? "قطع ومكونات معتمدة" : "Components In Catalog"}
            </div>
            <div className="text-[11px] text-slate-500">
              {locale === "ar" ? "مطابقة لمواصفات EN 81 وSASO" : "EN 81 & SASO standard compliance"}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-start space-y-1 relative overflow-hidden">
            <div className="cad-corner-tl" />
            <div className="text-2xl sm:text-3xl font-black font-mono text-brand-gold">
              SAME-DAY
            </div>
            <div className="text-xs font-semibold text-slate-200">
              {locale === "ar" ? "شحن وتوريد فوري" : "Dispatch Across KSA"}
            </div>
            <div className="text-[11px] text-slate-500">
              {locale === "ar" ? "الدمام، الرياض، جدة وكافة المدن" : "Dammam, Riyadh, Jeddah, Makkah"}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-start space-y-1 relative overflow-hidden">
            <div className="cad-corner-tl" />
            <div className="text-2xl sm:text-3xl font-black font-mono text-sky-400">
              33+ YRS
            </div>
            <div className="text-xs font-semibold text-slate-200">
              {locale === "ar" ? "استيراد مباشر من المصانع" : "Direct China & India Sourcing"}
            </div>
            <div className="text-[11px] text-slate-500">
              {locale === "ar" ? "أسعار تجارية تنافسية للمقاولين" : "Unmatched trade pricing for contractors"}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

