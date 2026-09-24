"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { elevatorProducts } from "@/data/products";
import { companyData } from "@/data/company";
import { ElevatorPart } from "@/types/catalog";
import { getProductWhatsAppUrl } from "@/lib/whatsapp";
import {
  Layers,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Plus,
  Check,
  MessageCircle,
  Cpu,
  Compass,
  Zap,
  Sliders,
  Anchor,
} from "lucide-react";

interface ShaftZone {
  id: string;
  zoneNumber: string;
  name: { en: string; ar: string };
  tagline: { en: string; ar: string };
  description: { en: string; ar: string };
  targetCategoryIds: string[];
  yRangePercent: string;
  icon: React.ElementType;
}

const shaftZones: ShaftZone[] = [
  {
    id: "machine-room",
    zoneNumber: "01",
    name: {
      en: "Machine Room & Drive Overhead",
      ar: "غرفة المحركات ومنظومة الجر العلوية",
    },
    tagline: {
      en: "Core Propulsion & Intelligence Hub",
      ar: "مركز الدفع والتحكم الذكي الفائق",
    },
    description: {
      en: "The nerve center housing high-torque gearless PMSM traction machines, VVVF frequency inverters, precision optical encoders, and integrated microprocessor controllers.",
      ar: "العصب الرئيسي للمصعد ويضم ماكينات الجر بدون تروس، محولات التردد المتغير، مشفرات السرعة ولوحات التحكم الرئيسية.",
    },
    targetCategoryIds: ["controllers", "traction-machines"],
    yRangePercent: "top-[2%] h-[18%]",
    icon: Cpu,
  },
  {
    id: "car-top",
    zoneNumber: "02",
    name: {
      en: "Car Top & Suspension Mechanisms",
      ar: "سقف الكابينة ونظم التعليق",
    },
    tagline: {
      en: "Dynamic Movement & Door Power",
      ar: "مشغلات الحركة والأبواب الذكية",
    },
    description: {
      en: "Mounted on the car frame: smart VVVF door operators, polyurethane hanger rollers, synchronization belts, cross-head safety switches, and traveling cable junctions.",
      ar: "أعلى شاسية الكابينة: مشغلات الأبواب الذكية VVVF، بكرات التعليق، سيور التزامن، ومفاتيح فحص سقف الكابينة.",
    },
    targetCategoryIds: ["door-operators", "wire-ropes"],
    yRangePercent: "top-[22%] h-[20%]",
    icon: Compass,
  },
  {
    id: "cabin-landing",
    zoneNumber: "03",
    name: {
      en: "Passenger Cabin & Landing Entrances",
      ar: "كابينة الركاب وأبواب الأدوار",
    },
    tagline: {
      en: "Passenger Interface & Fire Safety",
      ar: "واجهة الركاب وحماية الأبواب",
    },
    description: {
      en: "Certified fire-rated landing doors (E120/EW60), electromechanical interlocks, vandal-resistant Braille push buttons, TFT displays, and full-height infrared safety light curtains.",
      ar: "أبواب الأدوار المقاومة للحريق، كوالين الأمان الكهربائية، أزرار برايل، شاشات العرض الملونة، والستائر الضوئية لكامل ارتفاع الباب.",
    },
    targetCategoryIds: ["landing-doors", "push-buttons", "sensors-safety"],
    yRangePercent: "top-[44%] h-[22%]",
    icon: Sliders,
  },
  {
    id: "shaftway-rails",
    zoneNumber: "04",
    name: {
      en: "Shaftway, Rails & Counterweight",
      ar: "مسار البئر وسكك التوجيه وثقل الموازنة",
    },
    tagline: {
      en: "Structural Stability & Smooth Travel",
      ar: "الاستقرار الهيكلي وانسيابية الحركة",
    },
    description: {
      en: "ISO 7465 machined T-profile guide rails (T50-T90), heavy forged clips, self-lubricating shoe inserts, progressive safety gears, and magnetic leveling sensors.",
      ar: "سكك التوجيه المصنعة T-Rails، مشابك التثبيت المطروقة، كراسي التوجيه وبطانات النايلون، أجهزة الأمان التدريجية وحساسات التوقف.",
    },
    targetCategoryIds: ["guide-rails", "guide-shoes", "safety-gear"],
    yRangePercent: "top-[68%] h-[16%]",
    icon: Anchor,
  },
  {
    id: "elevator-pit",
    zoneNumber: "05",
    name: {
      en: "Elevator Pit & Safety Foundation",
      ar: "قاع البئر ومنظومة امتصاص الصدمات",
    },
    tagline: {
      en: "Ultimate Fail-Safe Energy Absorption",
      ar: "منظومة الأمان والامتصاص القصوى",
    },
    description: {
      en: "Hydraulic oil buffers, counterweight bottom cushions, governor tension pulleys with safety cutoff switches, and automatic rescue device (ARD) emergency backup systems.",
      ar: "المصدات الهيدروليكية المعتمدة، بكرات شد منظم السرعة، مفاتيح إيقاف قاع البئر، ووحدات الإنقاذ الأوتوماتيكية عند انقطاع الكهرباء.",
    },
    targetCategoryIds: ["shaft-components", "hydraulics"],
    yRangePercent: "top-[86%] h-[12%]",
    icon: Zap,
  },
];

export function ElevatorShaftExplorer() {
  const { locale, isRtl } = useLanguage();
  const { addToCart, isItemInCart } = useCart();
  const [activeZoneId, setActiveZoneId] = useState<string>("machine-room");
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const activeZone = shaftZones.find((z) => z.id === activeZoneId) || shaftZones[0];

  // Get matching parts for the active zone
  const matchingParts = elevatorProducts
    .filter((p) => activeZone.targetCategoryIds.includes(p.categoryId))
    .slice(0, 3);

  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const handleAdd = (part: ElevatorPart) => {
    addToCart(part, 1);
    setJustAddedId(part.id);
    setTimeout(() => setJustAddedId(null), 1800);
  };

  return (
    <section className="py-24 px-4 sm:px-8 bg-slate-950 text-white relative overflow-hidden border-y border-slate-800">
      {/* CAD Blueprint Subtle Grid */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-25 pointer-events-none" />
      <div className="absolute -top-40 -end-40 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-xs font-mono tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-brand-gold animate-ping" />
              <span>{locale === "ar" ? "نظام استكشاف البئر التفاعلي" : "Interactive Shaft Anatomy"}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black font-serif tracking-tight text-white">
              {locale === "ar" ? "تشريح مصعد الركاب: المكونات ومنظومة الأمان" : "Explore The Complete Elevator Anatomy"}
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm max-w-2xl leading-relaxed">
              {locale === "ar"
                ? "انقر على أي قسم في بئر المصعد لعرض القطع والمكونات الهندسية المتوفرة فورياً في مستودعاتنا بالمملكة."
                : "Select any elevator shaft zone to inspect critical mechanical, electrical, and life-safety components in stock."}
            </p>
          </div>

          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 border border-brand-gold/40 hover:border-brand-gold text-brand-gold text-xs font-bold transition-all shrink-0 font-mono"
          >
            <span>{locale === "ar" ? "فهرس الأصناف الكامل" : "Full CAD Parts Index"}</span>
            <ArrowIcon className="w-4 h-4" />
          </Link>
        </div>

        {/* Explorer Main Workspace: Interactive Shaft Visualizer + Real-Time Component Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Technical Shaft Diagram */}
          <div className="lg:col-span-5 bg-slate-900/90 rounded-3xl border border-slate-800 p-6 relative shadow-2xl overflow-hidden">
            {/* Technical Header with Crosshair Coordinates */}
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 border-b border-slate-800/80 pb-3 mb-4">
              <span className="flex items-center gap-1.5 text-brand-gold">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                <span>SHAFT-ELEVATION-2D</span>
              </span>
              <span>SCALE: 1:50 | EN 81-20</span>
            </div>

            {/* Zone Selector Pills */}
            <div className="flex flex-col gap-2 relative z-20">
              {shaftZones.map((zone) => {
                const isActive = zone.id === activeZoneId;
                const Icon = zone.icon;

                return (
                  <button
                    key={zone.id}
                    onClick={() => setActiveZoneId(zone.id)}
                    className={`w-full text-start p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                      isActive
                        ? "bg-brand-navy border-brand-gold shadow-lg shadow-brand-gold/10 text-white"
                        : "bg-slate-950/60 border-slate-800/80 hover:border-slate-700 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          isActive
                            ? "bg-brand-gold text-brand-navy"
                            : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold text-brand-gold">
                            ZONE {zone.zoneNumber}
                          </span>
                        </div>
                        <span className="text-xs font-bold text-slate-100 block truncate">
                          {zone.name[locale]}
                        </span>
                      </div>
                    </div>

                    <div
                      className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                        isActive ? "bg-brand-gold shadow-sm shadow-brand-gold" : "bg-slate-700"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Graphic Elevator Shaft Schematic Blueprint at the bottom */}
            <div className="mt-6 pt-4 border-t border-slate-800/80 relative h-48 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden flex items-center justify-center">
              {/* Technical Drawing Lines */}
              <div className="absolute inset-0 bg-blueprint-grid-dense opacity-20" />
              
              {/* Guide Rails Vertical Rails */}
              <div className="absolute top-0 bottom-0 left-[35%] w-[2px] bg-slate-700" />
              <div className="absolute top-0 bottom-0 right-[35%] w-[2px] bg-slate-700" />

              {/* Counterweight */}
              <div className="absolute top-[20%] right-[32%] w-6 h-20 bg-slate-800 border border-slate-600 rounded-sm flex items-center justify-center">
                <span className="text-[8px] font-mono text-slate-400 -rotate-90">CW-1000</span>
              </div>

              {/* Cabin Frame */}
              <div
                className={`w-36 h-28 rounded-lg border-2 flex flex-col justify-between p-2 transition-all duration-500 relative z-10 ${
                  activeZoneId === "machine-room"
                    ? "border-slate-700 bg-slate-900/60"
                    : activeZoneId === "car-top"
                    ? "border-brand-gold bg-brand-navy/60 shadow-lg shadow-brand-gold/20"
                    : activeZoneId === "cabin-landing"
                    ? "border-emerald-500 bg-emerald-950/40 shadow-lg shadow-emerald-500/20"
                    : activeZoneId === "shaftway-rails"
                    ? "border-sky-500 bg-sky-950/40"
                    : "border-amber-500 bg-amber-950/40"
                }`}
              >
                {/* Car Top Gear Marker */}
                <div className="flex items-center justify-between text-[8px] font-mono text-slate-400 border-b border-slate-700/60 pb-1">
                  <span>CAR TOP</span>
                  <span className="text-brand-gold">▲▼ PASSENGER</span>
                </div>
                {/* Center Arrows */}
                <div className="text-center font-mono font-bold text-xs text-brand-gold">
                  {locale === "ar" ? companyData.brandName.ar : companyData.brandName.en}
                </div>
                {/* Car Floor */}
                <div className="flex items-center justify-between text-[8px] font-mono text-slate-500 border-t border-slate-700/60 pt-1">
                  <span>SAFETY CLAMP</span>
                  <span>EN 81</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Active Zone Details & Component Showcase */}
          <div className="lg:col-span-7 space-y-6">
            {/* Active Zone Detail Card */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-brand-navy/60 rounded-3xl border border-slate-800 p-8 shadow-xl space-y-4 relative overflow-hidden">
              <div className="cad-corner-tl" />
              <div className="cad-corner-tr" />
              <div className="cad-corner-bl" />
              <div className="cad-corner-br" />

              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-mono font-bold text-brand-gold uppercase tracking-widest">
                  ZONE {activeZone.zoneNumber} // {activeZone.tagline[locale]}
                </span>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-800/80">
                  {locale === "ar" ? "قطع غيار معتمدة متوفرة" : "Genuine Spares Ready"}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black font-serif tracking-tight text-white">
                {activeZone.name[locale]}
              </h3>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                {activeZone.description[locale]}
              </p>
            </div>

            {/* In-Stock Parts For This Zone */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
                <span>{locale === "ar" ? "القطع المتوفرة لهذا القسم:" : "CRITICAL COMPONENTS IN THIS ZONE:"}</span>
                <span className="text-brand-gold">{matchingParts.length} verified items</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {matchingParts.map((part) => {
                  const inCart = isItemInCart(part.id);
                  const isJustAdded = justAddedId === part.id;
                  const waUrl = getProductWhatsAppUrl(part, locale);

                  return (
                    <div
                      key={part.id}
                      className="bg-slate-900 rounded-2xl border border-slate-800 hover:border-brand-gold/60 p-4 flex flex-col justify-between transition-all duration-200 shadow-md group"
                    >
                      <div className="space-y-3">
                        {/* SKU & Origin */}
                        <div className="flex items-center justify-between text-[10px] font-mono">
                          <span className="text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                            {part.sku}
                          </span>
                          <span className="text-emerald-400 font-semibold">{part.origin}</span>
                        </div>

                        {/* Image & Title */}
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 p-1.5 shrink-0 flex items-center justify-center">
                            <Image
                              src="/brand/logo_brandmark.svg"
                              alt={part.name[locale]}
                              fill
                              className="object-contain p-1"
                            />
                          </div>
                          <div className="min-w-0">
                            <span className="text-[10px] text-brand-gold font-semibold truncate block">
                              {part.subcategory[locale]}
                            </span>
                            <h4 className="text-xs font-bold text-slate-100 group-hover:text-brand-gold transition-colors line-clamp-2 leading-snug">
                              {part.name[locale]}
                            </h4>
                          </div>
                        </div>

                        {/* Specs Snippet */}
                        <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800/80 text-[10px] font-mono text-slate-400 space-y-1">
                          {Object.entries(part.specifications).slice(0, 2).map(([k, v]) => (
                            <div key={k} className="flex justify-between">
                              <span className="truncate max-w-[90px]">{k}:</span>
                              <span className="text-slate-200 font-bold truncate">{v}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2">
                        <button
                          onClick={() => handleAdd(part)}
                          className={`flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-bold transition-all ${
                            isJustAdded
                              ? "bg-emerald-600 text-white"
                              : inCart
                              ? "bg-brand-navy border border-brand-gold text-brand-gold"
                              : "bg-brand-gold hover:bg-brand-gold-dark text-slate-950"
                          }`}
                        >
                          {isJustAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>{locale === "ar" ? "تمت الإضافة" : "Added"}</span>
                            </>
                          ) : inCart ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>{locale === "ar" ? "في السلة" : "In Quote"}</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>{locale === "ar" ? "طلب تسعير" : "Add to RFQ"}</span>
                            </>
                          )}
                        </button>

                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-xl bg-slate-800 hover:bg-emerald-600 hover:text-white text-emerald-400 border border-slate-700 transition-colors"
                          title="WhatsApp Inquiry"
                          aria-label="WhatsApp Inquiry"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
