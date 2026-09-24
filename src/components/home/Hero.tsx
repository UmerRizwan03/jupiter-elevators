"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
  Cpu,
  Compass,
  Zap,
  CheckCircle2,
  Info,
} from "lucide-react";

interface Hotspot {
  id: string;
  xPercent: number; // percentage from left
  yPercent: number; // percentage from top
  title: { en: string; ar: string };
  spec: { en: string; ar: string };
  badge: { en: string; ar: string };
}

const hotspots: Hotspot[] = [
  {
    id: "sheave",
    xPercent: 62,
    yPercent: 26,
    title: { en: "Traction Sheave", ar: "طارة الجر الرئيسية" },
    spec: {
      en: "400mm QT450 Hardened Ductile Iron | 4×10mm / 5×8mm Grooves",
      ar: "حديد مقسى عالي المتانة 400 مم | مجاري حبال 4×10 مم أو 5×8 مم",
    },
    badge: { en: "EN 12385 Ropes", ar: "حبال معتمدة EN 12385" },
  },
  {
    id: "brake",
    xPercent: 78,
    yPercent: 52,
    title: { en: "Dual-Disc Safety Brake", ar: "فرامل أمان قرصية مزدوجة" },
    spec: {
      en: "Redundant 24V DC Electromagnetic Spring-Applied Fail-Safe",
      ar: "منظومة كهرومغناطيسية مزدوجة 24V DC للطوارئ والانقطاع",
    },
    badge: { en: "EN 81-20 Compliant", ar: "مطابق لمعيار EN 81-20" },
  },
  {
    id: "motor",
    xPercent: 32,
    yPercent: 38,
    title: { en: "PMSM Motor Core", ar: "قلب محرك التزامن المغناطيسي" },
    spec: {
      en: "Rare-Earth NdFeB Magnets | Class F Insulation | 1000kg @ 1.75m/s",
      ar: "مغناطيس دائم NdFeB فائق العزم | عزل فئة F | حمولة 1000 كجم",
    },
    badge: { en: "VVVF High Efficiency", ar: "كفاءة عالية VVVF" },
  },
  {
    id: "encoder",
    xPercent: 12,
    yPercent: 50,
    title: { en: "Rotary Optical Encoder", ar: "مشفر السرعة والموقع الرقمي" },
    spec: {
      en: "2048 PPR Sincos / Endat | Direct Monarch NICE3000 Interface",
      ar: "دقة 2048 نبضة/دورة | توافق مباشر مع لوحات مونارك وستيب",
    },
    badge: { en: "Precision Position", ar: "دقة التحكم بالموقع" },
  },
];

const majorBrands = [
  { name: "MONARCH", query: "Monarch" },
  { name: "FERMATOR", query: "Fermator" },
  { name: "OTIS", query: "Otis" },
  { name: "SCHINDLER", query: "Schindler" },
  { name: "KONE", query: "Kone" },
  { name: "TORIN", query: "Torin" },
  { name: "STEP", query: "Step" },
  { name: "MITSUBISHI", query: "Mitsubishi" },
];

export function Hero() {
  const { t, locale, isRtl } = useLanguage();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeHotspotId, setActiveHotspotId] = useState<string>("sheave");

  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;
  const photoUrl = getPhotoIdWhatsAppUrl(locale);

  const activeHotspot =
    hotspots.find((h) => h.id === activeHotspotId) || hotspots[0];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/catalog?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/catalog");
    }
  };

  return (
    <section className="relative bg-[#050C1C] text-white pt-10 pb-20 px-4 sm:px-8 overflow-hidden border-b border-slate-800">
      {/* CAD Blueprint Background & Atmospheric Ambient Glow */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-navy/90 via-transparent to-transparent pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        {/* Main Grid: Split Layout - B2B Console (Left) + 3D Mechanical Stage (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column (7 Cols): Engineering Command Console */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Telemetry & Verification Badge */}
            <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-brand-gold/40 text-brand-gold text-xs font-mono tracking-wider shadow-lg shadow-brand-gold/5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-bold text-slate-100">
                {locale === "ar" ? "المستودع المركزي بالدمام" : "DAMMAM LOGISTICS HUB"}
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-brand-gold font-semibold">
                {locale === "ar" ? "شحن فوري لكافة مدن المملكة" : "SAME-DAY KSA DISPATCH"}
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400">CR: {companyData.crNumber}</span>
            </div>

            {/* Architectural Serif Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-black font-serif tracking-tight leading-[1.12] text-white">
              {locale === "ar" ? (
                <>
                  توريد قطع غيار المصاعد <br />
                  <span className="text-gradient-gold">بأعلى المعايير الهندسية في المملكة</span>
                </>
              ) : (
                <>
                  Certified Elevator Engineering <br />
                  <span className="text-gradient-gold">Spares & Heavy Components In KSA</span>
                </>
              )}
            </h1>

            {/* Strategic Subtitle */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-sans">
              {locale === "ar"
                ? "استيراد مباشر من كبرى مصانع المصاعد في الهند والصين. مخزون فوري لأكثر من 10,000 صنف معتمد (EN 81 وSASO) يخدم مقاولي المصاعد وشركات الصيانة في الدمام، الرياض، وجدة."
                : "Direct factory sourcing from certified manufacturing hubs in India & China. Extensive warehouse inventory in Dammam serving elevator contractors, OEMs, and facility engineers across Riyadh, Jeddah, and nationwide."}
            </p>

            {/* CAD Direct Search Console */}
            <div className="pt-1 max-w-xl">
              <div className="relative bg-slate-900/90 rounded-2xl border border-slate-700/80 p-2 shadow-2xl backdrop-blur-md">
                <div className="cad-corner-tl" />
                <div className="cad-corner-tr" />
                <div className="cad-corner-bl" />
                <div className="cad-corner-br" />

                <form onSubmit={handleSearch} className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-brand-gold absolute start-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={
                        locale === "ar"
                          ? "ابحث برقم القطعة (SKU)، اسم الموديل (NICE3000)، أو الماركة..."
                          : "Search SKU, model (e.g. NICE3000+, VVVF), or OEM brand..."
                      }
                      className="w-full py-2.5 ps-10 pe-3 bg-transparent text-white placeholder-slate-400 text-xs sm:text-sm font-medium focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-brand-gold hover:bg-brand-gold-dark text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shrink-0 shadow-lg shadow-brand-gold/20 font-mono"
                  >
                    <span>{locale === "ar" ? "فحص المخزون" : "LOOKUP"}</span>
                    <ArrowIcon className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="/catalog"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-gold hover:bg-brand-gold-dark text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-brand-gold/20 font-mono"
              >
                <Layers className="w-4 h-4" />
                <span>{locale === "ar" ? "استعراض الكتالوج الهندسي" : "EXPLORE CAD CATALOG"}</span>
              </Link>

              <a
                href={photoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-semibold text-xs transition-all font-mono"
              >
                <Camera className="w-4 h-4 text-brand-gold" />
                <span>{t.hero.photoSupport}</span>
              </a>
            </div>

            {/* OEM Brand Compatibility Strip */}
            <div className="pt-4 border-t border-slate-800/80 space-y-2">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-brand-gold" />
                <span>{locale === "ar" ? "توافق مباشر مع الماركات العالمية:" : "DIRECT OEM COMPATIBILITY LOOKUP:"}</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {majorBrands.map((brand) => (
                  <Link
                    key={brand.name}
                    href={`/catalog?brand=${encodeURIComponent(brand.query)}`}
                    className="px-3 py-1 rounded-lg bg-slate-900/80 hover:bg-brand-gold/15 border border-slate-800 hover:border-brand-gold/60 text-slate-300 hover:text-brand-gold text-[11px] font-mono font-bold transition-all"
                  >
                    {brand.name}
                  </Link>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column (5 Cols): 3D Mechanical Stage with Interactive Hotspots */}
          <div className="lg:col-span-5 relative">
            <div className="relative bg-slate-900/80 rounded-3xl border border-slate-800 p-4 shadow-2xl backdrop-blur-md overflow-hidden group">
              <div className="cad-corner-tl" />
              <div className="cad-corner-tr" />
              <div className="cad-corner-bl" />
              <div className="cad-corner-br" />

              {/* Top HUD Telemetry Bar */}
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 border-b border-slate-800 pb-3 mb-3">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>CAD-STAGE // PMSM-400</span>
                </span>
                <span className="text-brand-gold font-semibold">
                  EN 81-20/50 SPEC
                </span>
                <span>RATED: 1000KG @ 1.75M/S</span>
              </div>

              {/* 3D Traction Machine Visual Container with Hotspots */}
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800/80">
                <Image
                  src="/images/hero/elevator_traction_machine.jpg"
                  alt="Elevator PMSM Gearless Traction Machine"
                  fill
                  priority
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />

                {/* Subtle Blueprint Grid Texture Overlay */}
                <div className="absolute inset-0 bg-blueprint-grid-dense opacity-20 pointer-events-none" />

                {/* Interactive Hotspot Crosshairs */}
                {hotspots.map((hs) => {
                  const isActive = hs.id === activeHotspotId;
                  return (
                    <button
                      key={hs.id}
                      onClick={() => setActiveHotspotId(hs.id)}
                      onMouseEnter={() => setActiveHotspotId(hs.id)}
                      style={{
                        left: `${hs.xPercent}%`,
                        top: `${hs.yPercent}%`,
                      }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group/hs focus:outline-none"
                      aria-label={hs.title[locale]}
                    >
                      {/* Pulsing Target Rings */}
                      <span className="relative flex items-center justify-center w-8 h-8">
                        <span
                          className={`absolute w-full h-full rounded-full transition-all duration-300 ${
                            isActive
                              ? "bg-brand-gold/40 animate-ping"
                              : "bg-slate-500/20 group-hover/hs:bg-brand-gold/30"
                          }`}
                        />
                        <span
                          className={`relative w-4 h-4 rounded-full border-2 transition-all flex items-center justify-center ${
                            isActive
                              ? "bg-brand-gold border-white shadow-lg shadow-brand-gold"
                              : "bg-slate-900 border-brand-gold/80 group-hover/hs:bg-brand-gold"
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Active Hotspot Technical Inspection Card */}
              <div className="mt-3 p-3.5 rounded-xl bg-slate-950/90 border border-brand-gold/40 shadow-xl space-y-1 transition-all">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="font-bold text-brand-gold flex items-center gap-1.5">
                    <Zap className="w-3 h-3 text-brand-gold" />
                    <span>{activeHotspot.title[locale]}</span>
                  </span>
                  <span className="text-[10px] bg-brand-gold/15 text-brand-gold border border-brand-gold/30 px-2 py-0.5 rounded font-bold">
                    {activeHotspot.badge[locale]}
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 leading-snug font-mono">
                  {activeHotspot.spec[locale]}
                </p>
              </div>

              {/* Bottom Quick Switcher Pills for Hotspots */}
              <div className="mt-2.5 grid grid-cols-4 gap-1.5 text-center">
                {hotspots.map((hs) => {
                  const isActive = hs.id === activeHotspotId;
                  return (
                    <button
                      key={hs.id}
                      onClick={() => setActiveHotspotId(hs.id)}
                      className={`py-1 px-1 rounded text-[9px] font-mono truncate transition-all ${
                        isActive
                          ? "bg-brand-gold text-slate-950 font-bold"
                          : "bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800"
                      }`}
                    >
                      {hs.id.toUpperCase()}
                    </button>
                  );
                })}
              </div>

            </div>
          </div>

        </div>

        {/* Technical Engineering Metrics Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl mx-auto pt-6 border-t border-slate-800/80">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 relative overflow-hidden group hover:border-brand-gold/40 transition-all">
            <div className="text-[10px] font-mono text-slate-500 mb-1">SPEC-EXP-01</div>
            <div className="text-3xl font-black text-brand-gold font-mono tracking-tight">
              {t.hero.stats.experienceYears}
            </div>
            <div className="text-xs font-semibold text-slate-200 mt-1">{t.hero.stats.experienceLabel}</div>
            <div className="text-[10px] text-slate-500 font-mono mt-0.5">30+ Yrs Field Diagnostics</div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 relative overflow-hidden group hover:border-brand-gold/40 transition-all">
            <div className="text-[10px] font-mono text-slate-500 mb-1">STOCK-CAP-02</div>
            <div className="text-3xl font-black text-emerald-400 font-mono tracking-tight">
              {t.hero.stats.partsInStock}
            </div>
            <div className="text-xs font-semibold text-slate-200 mt-1">{t.hero.stats.partsLabel}</div>
            <div className="text-[10px] text-slate-500 font-mono mt-0.5">EN 81 & SASO Certified</div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 relative overflow-hidden group hover:border-brand-gold/40 transition-all">
            <div className="text-[10px] font-mono text-slate-500 mb-1">KSA-LOG-03</div>
            <div className="text-3xl font-black text-brand-gold font-mono tracking-tight">
              {t.hero.stats.coverage}
            </div>
            <div className="text-xs font-semibold text-slate-200 mt-1">{t.hero.stats.coverageLabel}</div>
            <div className="text-[10px] text-slate-500 font-mono mt-0.5">Dammam, Riyadh, Jeddah</div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 relative overflow-hidden group hover:border-brand-gold/40 transition-all">
            <div className="text-[10px] font-mono text-slate-500 mb-1">SUPPLY-DIR-04</div>
            <div className="text-3xl font-black text-sky-400 font-mono tracking-tight">
              {t.hero.stats.logisticsYears}
            </div>
            <div className="text-xs font-semibold text-slate-200 mt-1">{t.hero.stats.logisticsLabel}</div>
            <div className="text-[10px] text-slate-500 font-mono mt-0.5">China & India Direct Alliances</div>
          </div>
        </div>

      </div>
    </section>
  );
}
