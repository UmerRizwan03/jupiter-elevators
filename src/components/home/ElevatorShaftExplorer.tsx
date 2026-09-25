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
    <section className="py-20 px-4 sm:px-8 bg-slate-50 text-slate-900 relative overflow-hidden border-y border-slate-200">
      {/* Light Blueprint Faint Grid */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-brand-gold text-xs font-mono tracking-wider uppercase shadow-sm">
              <span className="w-2 h-2 rounded-full bg-brand-gold animate-ping" />
              <span>{locale === "ar" ? "نظام استكشاف البئر التفاعلي" : "Interactive Shaft Anatomy"}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black font-serif tracking-tight text-slate-950">
              {locale === "ar" ? "تشريح مصعد الركاب: المكونات ومنظومة الأمان" : "Explore Complete Elevator Shaft Anatomy"}
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm max-w-2xl leading-relaxed font-sans">
              {locale === "ar"
                ? "انقر على أي قسم في بئر المصعد لعرض القطع والمكونات الهندسية المتوفرة فورياً في مستودعاتنا بالمملكة."
                : "Select any elevator shaft zone to inspect critical mechanical, electrical, and life-safety components in stock."}
            </p>
          </div>

          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-slate-200 hover:border-brand-gold text-slate-800 text-xs font-bold transition-all shrink-0 font-mono shadow-sm"
          >
            <span>{locale === "ar" ? "فهرس الأصناف الكامل" : "FULL CAD PARTS INDEX"}</span>
            <ArrowIcon className="w-4 h-4 text-brand-gold" />
          </Link>
        </div>

        {/* Explorer Main Workspace: Interactive Shaft Visualizer + Real-Time Component Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Technical Shaft Diagram (Crisp Light Architectural Drafting) */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 relative shadow-sm overflow-hidden">
            <div className="cad-corner-tl" />
            <div className="cad-corner-tr" />
            <div className="cad-corner-bl" />
            <div className="cad-corner-br" />

            {/* Technical Header with Crosshair Coordinates */}
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 border-b border-slate-200 pb-3 mb-4">
              <span className="flex items-center gap-1.5 text-brand-gold font-bold">
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
                        ? "bg-brand-navy border-brand-gold shadow-md text-white"
                        : "bg-slate-50/70 border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-950 hover:bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          isActive
                            ? "bg-brand-gold text-slate-950"
                            : "bg-white text-slate-600 border border-slate-200 shadow-sm"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[10px] font-mono font-bold ${
                              isActive ? "text-brand-gold" : "text-slate-500"
                            }`}
                          >
                            ZONE {zone.zoneNumber}
                          </span>
                        </div>
                        <span
                          className={`text-xs font-bold block truncate ${
                            isActive ? "text-white" : "text-slate-900"
                          }`}
                        >
                          {zone.name[locale]}
                        </span>
                      </div>
                    </div>

                    <div
                      className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                        isActive ? "bg-brand-gold" : "bg-slate-300"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Graphic Elevator Shaft Schematic Blueprint at the bottom */}
            <div className="mt-6 pt-4 border-t border-slate-200 relative h-48 bg-slate-100/70 rounded-2xl border border-slate-200 overflow-hidden flex items-center justify-center">
              {/* Technical Drawing Grid */}
              <div className="absolute inset-0 bg-blueprint-grid-dense opacity-40" />
              
              {/* Guide Rails Vertical Lines */}
              <div className="absolute top-0 bottom-0 left-[35%] w-[2px] bg-slate-300" />
              <div className="absolute top-0 bottom-0 right-[35%] w-[2px] bg-slate-300" />

              {/* Counterweight */}
              <div className="absolute top-[20%] right-[32%] w-6 h-20 bg-slate-200 border border-slate-400 rounded-sm flex items-center justify-center shadow-sm">
                <span className="text-[8px] font-mono text-slate-500 -rotate-90">CW-1000</span>
              </div>

              {/* Cabin Frame */}
              <div
                className={`w-36 h-28 rounded-lg border-2 flex flex-col justify-between p-2 transition-all duration-500 relative z-10 bg-white ${
                  activeZoneId === "machine-room"
                    ? "border-slate-400 shadow-sm"
                    : activeZoneId === "car-top"
                    ? "border-brand-gold shadow-md"
                    : activeZoneId === "cabin-landing"
                    ? "border-emerald-600 shadow-md"
                    : activeZoneId === "shaftway-rails"
                    ? "border-sky-600 shadow-md"
                    : "border-amber-600 shadow-md"
                }`}
              >
                {/* Car Top Gear Marker */}
                <div className="flex items-center justify-between text-[8px] font-mono text-slate-500 border-b border-slate-200 pb-1">
                  <span>CAR TOP</span>
                  <span className="text-brand-gold font-bold">▲▼ CABIN</span>
                </div>
                {/* Center Brand */}
                <div className="text-center font-mono font-bold text-xs text-brand-navy">
                  {locale === "ar" ? companyData.brandName.ar : companyData.brandName.en}
                </div>
                {/* Car Floor */}
                <div className="flex items-center justify-between text-[8px] font-mono text-slate-500 border-t border-slate-200 pt-1">
                  <span>SAFETY CLAMP</span>
                  <span>EN 81</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Active Zone Details & Component Showcase */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Active Zone Detail Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-4 relative overflow-hidden">
              <div className="cad-corner-tl" />
              <div className="cad-corner-tr" />
              <div className="cad-corner-bl" />
              <div className="cad-corner-br" />

              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-mono font-bold text-brand-gold uppercase tracking-widest">
                  ZONE {activeZone.zoneNumber} // {activeZone.tagline[locale]}
                </span>
                <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 font-semibold">
                  {locale === "ar" ? "قطع غيار معتمدة متوفرة" : "Genuine Spares Ready"}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black font-serif tracking-tight text-slate-900">
                {activeZone.name[locale]}
              </h3>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans">
                {activeZone.description[locale]}
              </p>
            </div>

            {/* In-Stock Parts For This Zone */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-slate-500 px-1">
                <span>{locale === "ar" ? "القطع المتوفرة لهذا القسم:" : "CRITICAL COMPONENTS IN THIS ZONE:"}</span>
                <span className="text-brand-navy font-bold">{matchingParts.length} verified items</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {matchingParts.map((part) => {
                  const inCart = isItemInCart(part.id);
                  const isJustAdded = justAddedId === part.id;
                  const waUrl = getProductWhatsAppUrl(part, locale);

                  return (
                    <div
                      key={part.id}
                      className="bg-white rounded-2xl border border-slate-200 hover:border-brand-gold/60 p-4 flex flex-col justify-between transition-all duration-200 shadow-sm hover:shadow-md group"
                    >
                      <div className="space-y-3">
                        {/* SKU & Origin */}
                        <div className="flex items-center justify-between text-[10px] font-mono">
                          <span className="text-slate-700 bg-slate-100 px-2 py-0.5 rounded font-bold">
                            {part.sku}
                          </span>
                          <span className="text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
                            {part.origin}
                          </span>
                        </div>

                        {/* Image & Title */}
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 p-1.5 shrink-0 flex items-center justify-center">
                            <Image
                              src="/brand/logo_brandmark.svg"
                              alt={part.name[locale]}
                              fill
                              className="object-contain p-1"
                            />
                          </div>
                          <div className="min-w-0">
                            <span className="text-[10px] text-brand-gold font-mono font-semibold truncate block">
                              {part.subcategory[locale]}
                            </span>
                            <h4 className="text-xs font-bold text-slate-900 group-hover:text-brand-gold transition-colors line-clamp-2 leading-snug">
                              {part.name[locale]}
                            </h4>
                          </div>
                        </div>

                        {/* Specs Snippet */}
                        <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/80 text-[10px] font-mono text-slate-600 space-y-1">
                          {Object.entries(part.specifications).slice(0, 2).map(([k, v]) => (
                            <div key={k} className="flex justify-between">
                              <span className="truncate max-w-[90px] text-slate-400">{k}:</span>
                              <span className="text-slate-900 font-bold truncate">{v}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                        <button
                          onClick={() => handleAdd(part)}
                          className={`flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-bold transition-all ${
                            isJustAdded
                              ? "bg-emerald-600 text-white"
                              : inCart
                              ? "bg-brand-navy text-white"
                              : "bg-brand-navy hover:bg-brand-navy-light text-white"
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
                          className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors"
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
