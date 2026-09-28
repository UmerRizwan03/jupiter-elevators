"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import {
  Search,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Cpu,
  Layers,
  Sparkles,
  ChevronDown,
  Clock,
  Box,
  CheckCircle,
} from "lucide-react";

const popularSearches = [
  { en: "Traction Machine", ar: "ماكينة الجر", href: "/catalog?category=traction-machines" },
  { en: "NICE3000+ Board", ar: "لوحة نايس 3000", href: "/catalog?q=NICE3000" },
  { en: "Door Operator", ar: "مشغل الأبواب", href: "/catalog?category=door-operators" },
  { en: "Guide Rail T75", ar: "سكك T75", href: "/catalog?category=guide-rails" },
  { en: "Safety Gear", ar: "جهاز البراشوت", href: "/catalog?category=safety-gear" },
  { en: "Push Button", ar: "أزرار الطلب", href: "/catalog?category=push-buttons" },
];

const oemBrands = [
  "All Brands",
  "Otis",
  "Kone",
  "Schindler",
  "Mitsubishi",
  "Thyssenkrupp",
  "Monarch",
  "Fermator",
  "Torin Drive",
  "STEP",
  "Yaskawa",
  "Montanari",
];

const elevatorTypes = [
  { en: "All Lift Types", ar: "جميع أنواع المصاعد", val: "" },
  { en: "Passenger MRL (Gearless)", ar: "مصاعد ركاب بدون غرفة (MRL)", val: "MRL" },
  { en: "High-Speed Traction", ar: "مصاعد جر عالية السرعة", val: "Traction" },
  { en: "Freight & Heavy Cargo", ar: "مصاعد بضائع وأحمال ثقيلة", val: "Freight" },
  { en: "Hydraulic Systems", ar: "مصاعد هيدروليكية", val: "Hydraulic" },
  { en: "Panoramic & Villa Lifts", ar: "مصاعد بانوراما وفلل", val: "Villa" },
];

const componentCategories = [
  { en: "All Component Systems", ar: "جميع المنظومات", val: "all" },
  { en: "Traction Machines & Motors", ar: "ماكينات الجر والمحركات", val: "traction-machines" },
  { en: "Controllers & VVVF Drives", ar: "لوحات التحكم والمحولات", val: "controllers" },
  { en: "Door Operators & Mechanisms", ar: "مشغلات الأبواب", val: "door-operators" },
  { en: "Safety Gears & Governors", ar: "منظومة الأمان ومنظم السرعة", val: "safety-gear" },
  { en: "Guide Rails & Hardware", ar: "سكك التوجيه ومستلزمات التثبيت", val: "guide-rails" },
  { en: "Push Buttons & COP/LOP", ar: "أزرار الطلب وشاشات العرض", val: "push-buttons" },
];

export function Hero() {
  const { locale, isRtl } = useLanguage();
  const router = useRouter();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  // Dock Filter States
  const [partSku, setPartSku] = useState("");
  const [keyword, setKeyword] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("All Brands");
  const [selectedType, setSelectedType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleFinderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (selectedCategory && selectedCategory !== "all") {
      params.set("category", selectedCategory);
    }
    if (selectedBrand && selectedBrand !== "All Brands") {
      params.set("brand", selectedBrand);
    }

    const queryParts = [partSku.trim(), keyword.trim(), selectedType.trim()].filter(Boolean);
    if (queryParts.length > 0) {
      params.set("q", queryParts.join(" "));
    }

    router.push(`/catalog?${params.toString()}`);
  };

  return (
    <section className="relative w-full overflow-hidden bg-white text-slate-900 pt-8 sm:pt-12 pb-16 lg:pb-24 border-b border-slate-200">
      
      {/* ─────────────────────────────────────────────────────────────
          1. GIANT ATMOSPHERIC BACKGROUND WATERMARK TYPOGRAPHY (Slide 3 & 5)
      ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 w-full h-[620px] pointer-events-none select-none z-0 overflow-hidden flex items-center justify-center">
        <span className="text-[14vw] font-black uppercase tracking-tighter text-slate-900/[0.035] leading-none whitespace-nowrap transform -translate-y-12">
          {locale === "ar" ? "قطع غيار المصاعد" : "ELEVATOR PARTS"}
        </span>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. SEAMLESS 3D FEATHERED BACKDROP RENDER
      ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden">
        <Image
          src="/images/hero/hero_3d_feathered.jpg"
          alt="Jupiter Elevators Traction Machine 3D View"
          fill
          priority
          className={`object-cover ${
            isRtl
              ? "object-left-bottom sm:object-left -scale-x-100"
              : "object-right-bottom sm:object-right"
          } select-none opacity-90`}
        />

        {/* Soft Multi-Directional Gradient Washes for Natural 3D Immersion */}
        <div
          className={`absolute inset-y-0 ${
            isRtl
              ? "right-0 bg-gradient-to-l from-white via-white/95 to-transparent"
              : "left-0 bg-gradient-to-r from-white via-white/95 to-transparent"
          } w-full lg:w-[54%] pointer-events-none`}
        />

        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white via-white/70 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. MAIN HERO CONTENT STAGE
      ───────────────────────────────────────────────────────────── */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center min-h-[520px] lg:min-h-[580px]">
          
          {/* LEFT: EDITORIAL HEADLINE & TRUST TAGS */}
          <div className="lg:col-span-6 xl:col-span-5 space-y-6 pt-4">
            
            {/* Top Tagline with Side Trust Accents */}
            <div className="flex items-center gap-3">
              <span className="text-xs sm:text-sm font-bold font-mono tracking-wider text-brand-gold uppercase">
                {locale === "ar"
                  ? "المستودع الرئيسي بالدمام · المملكة العربية السعودية"
                  : "CENTRAL DAMMAM HUB · SAUDI ARABIA"}
              </span>
              <span className="w-10 h-[1.5px] bg-brand-gold inline-block" />
            </div>

            {/* Main Headline */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-6xl lg:text-[62px] font-black text-slate-950 tracking-tight leading-[1.08] font-sans">
                {locale === "ar" ? (
                  <>
                    <span className="block">قطع غيار موثوقة</span>
                    <span className="block">لارتقاء مستدام نحو</span>
                    <span className="block text-brand-gold">المستقبل.</span>
                  </>
                ) : (
                  <>
                    <span className="block">Reliable Parts</span>
                    <span className="block">for a Higher</span>
                    <span className="block text-brand-gold">Tomorrow.</span>
                  </>
                )}
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl font-sans">
              {locale === "ar"
                ? "أكثر من 15,000 قطعة غيار ومكونات مصاعد معتمدة ومستوردة مباشرة من كبار المصنعين في الصين والهند لتسليم فوري في كافة مدن المملكة."
                : "Over 15,000+ certified elevator components, PMSM gearless machines, controllers, and door operators imported directly from China and India for immediate dispatch across KSA."}
            </p>

            {/* Direct CTA Buttons & Value Props */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/catalog"
                className="px-7 py-3.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-sm transition-all shadow-md flex items-center gap-2 group font-sans"
              >
                <span>{locale === "ar" ? "تصفح كتالوج القطع" : "BROWSE CATALOG"}</span>
                <ArrowIcon className="w-4 h-4 text-brand-gold transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/quote"
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 font-bold text-sm transition-all shadow-sm flex items-center gap-2 font-sans"
              >
                <span>{locale === "ar" ? "طلب تسعير سريع" : "REQUEST RFQ"}</span>
              </Link>
            </div>

            {/* Side Trust Badges (Slide 3 inspiration: Honest Prices / Fast Delivery) */}
            <div className="flex items-center gap-6 pt-2 text-xs font-mono text-slate-500">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>{locale === "ar" ? "أسعار جملة تنافسية" : "Direct Trade Pricing"}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-brand-gold" />
                <span>{locale === "ar" ? "شحن فوري بالمملكة" : "KSA-Wide Fast Dispatch"}</span>
              </div>
            </div>

          </div>

          {/* RIGHT: FLOATING CALLOUT ANNOTATIONS ON 3D ASSEMBLY */}
          <div className="lg:col-span-6 xl:col-span-7 relative w-full h-[420px] sm:h-[500px] lg:h-[560px] flex items-center justify-center">
            
            {/* SVG Connecting Leader Lines Overlay */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none hidden md:block z-20"
              viewBox="0 0 700 640"
              fill="none"
              preserveAspectRatio="xMidYMid meet"
            >
              <path
                d={isRtl ? "M 420 150 L 340 150 L 300 240" : "M 280 150 L 360 150 L 400 240"}
                stroke="#C59341"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />
              <circle cx={isRtl ? "300" : "400"} cy="240" r="3.5" fill="#C59341" />

              <path
                d={isRtl ? "M 180 150 L 110 150 L 90 320" : "M 520 150 L 590 150 L 610 320"}
                stroke="#C59341"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />
              <circle cx={isRtl ? "90" : "610"} cy="320" r="3.5" fill="#C59341" />

              <path
                d={isRtl ? "M 370 460 L 320 460 L 280 380" : "M 330 460 L 380 460 L 420 380"}
                stroke="#C59341"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />
              <circle cx={isRtl ? "280" : "420"} cy="380" r="3.5" fill="#C59341" />
            </svg>

            {/* CALLOUT 1: GEARLESS PMSM DRIVE */}
            <div className={`absolute top-6 sm:top-10 ${isRtl ? "end-4 sm:end-8" : "start-4 sm:start-8"} z-30`}>
              <Link
                href="/catalog?category=traction-machines"
                className="bg-white/95 backdrop-blur-md rounded-2xl p-2.5 pe-4 shadow-[0_12px_32px_rgba(0,0,0,0.09)] border border-slate-200/90 hover:border-brand-gold transition-all flex items-center gap-3 group"
              >
                <div className="relative w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 p-1 shrink-0 flex items-center justify-center overflow-hidden">
                  <Image
                    src="/images/hero/thumb_gearbox.png"
                    alt="Gearbox"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-slate-900 group-hover:text-brand-gold transition-colors">
                    {locale === "ar" ? "ماكينة الجر PMSM" : "PMSM Traction Drive"}
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">
                    {locale === "ar" ? "عزم فائق وكفاءة طاقة" : "High torque & silent travel"}
                  </div>
                </div>
              </Link>
            </div>

            {/* CALLOUT 2: BRAKE CALIPER & SAFETY */}
            <div className={`absolute top-6 sm:top-10 ${isRtl ? "start-2 sm:start-6" : "end-2 sm:end-6"} z-30`}>
              <Link
                href="/catalog?category=safety-gear"
                className="bg-white/95 backdrop-blur-md rounded-2xl p-2.5 pe-4 shadow-[0_12px_32px_rgba(0,0,0,0.09)] border border-slate-200/90 hover:border-brand-gold transition-all flex items-center gap-3 group"
              >
                <div className="relative w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 p-1 shrink-0 flex items-center justify-center overflow-hidden">
                  <Image
                    src="/images/hero/thumb_brake.png"
                    alt="Brake System"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-slate-900 group-hover:text-brand-gold transition-colors">
                    {locale === "ar" ? "نظام الفرامل المزدوجة" : "Dual Brake Caliper"}
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">
                    {locale === "ar" ? "استجابة كبح كهرومغناطيسية" : "Certified EN 81-20 safety"}
                  </div>
                </div>
              </Link>
            </div>

            {/* CALLOUT 3: TRACTION SHEAVE */}
            <div className={`absolute bottom-16 sm:bottom-20 ${isRtl ? "end-8 sm:end-20" : "start-8 sm:start-20"} z-30`}>
              <Link
                href="/catalog?category=traction-machines"
                className="bg-white/95 backdrop-blur-md rounded-2xl p-2.5 pe-4 shadow-[0_12px_32px_rgba(0,0,0,0.09)] border border-slate-200/90 hover:border-brand-gold transition-all flex items-center gap-3 group"
              >
                <div className="relative w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 p-1 shrink-0 flex items-center justify-center overflow-hidden">
                  <Image
                    src="/images/hero/thumb_sheave.png"
                    alt="Traction Sheave"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-slate-900 group-hover:text-brand-gold transition-colors">
                    {locale === "ar" ? "طارة الجر المخددة" : "Precision Machined Sheave"}
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">
                    {locale === "ar" ? "مقاومة تآكل وعمر تشغيلي طويل" : "Hardened ductile cast steel"}
                  </div>
                </div>
              </Link>
            </div>

          </div>

        </div>

        {/* ─────────────────────────────────────────────────────────────
            4. THE SIGNATURE FEATURE: HORIZONTAL PART FINDER DOCK (Slide 3)
        ───────────────────────────────────────────────────────────── */}
        <div className="mt-8 pt-4">
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-slate-200/90 max-w-6xl mx-auto">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 px-3 pb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-brand-gold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{locale === "ar" ? "أداة البحث المباشر عن قطع المصاعد" : "OEM ELEVATOR EQUIPMENT SELECTOR"}</span>
              </span>
              <span className="hidden sm:inline text-slate-400">
                {locale === "ar" ? "تصفية فورية حسب الماركة ورقم القطعة" : "Drill-down by OEM Part #, Brand, & System"}
              </span>
            </div>

            <form onSubmit={handleFinderSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-2 sm:gap-2.5 items-center">
              
              {/* Field 1: Part Number / SKU */}
              <div className="lg:col-span-3 relative">
                <div className="relative flex items-center">
                  <Search className="w-4 h-4 text-slate-400 absolute start-3 pointer-events-none" />
                  <input
                    type="text"
                    value={partSku}
                    onChange={(e) => setPartSku(e.target.value)}
                    placeholder={locale === "ar" ? "رقم القطعة / SKU (مثال: JP-CB-204)" : "Enter Part # / SKU..."}
                    className="w-full bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm font-medium rounded-xl border border-slate-200/90 focus:border-brand-gold focus:outline-none py-3 ps-9 pe-3 transition-all"
                  />
                </div>
              </div>

              {/* Field 2: Select Brand */}
              <div className="lg:col-span-2 relative">
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-slate-900 text-xs sm:text-sm font-medium rounded-xl border border-slate-200/90 focus:border-brand-gold focus:outline-none py-3 px-3 transition-all cursor-pointer"
                >
                  {oemBrands.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand === "All Brands" ? (locale === "ar" ? "الماركة (الكل)" : "Select Brand") : brand}
                    </option>
                  ))}
                </select>
              </div>

              {/* Field 3: Select Elevator Type */}
              <div className="lg:col-span-2 relative">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-slate-900 text-xs sm:text-sm font-medium rounded-xl border border-slate-200/90 focus:border-brand-gold focus:outline-none py-3 px-3 transition-all cursor-pointer"
                >
                  {elevatorTypes.map((type) => (
                    <option key={type.val} value={type.val}>
                      {type[locale]}
                    </option>
                  ))}
                </select>
              </div>

              {/* Field 4: Component Category */}
              <div className="lg:col-span-3 relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-slate-900 text-xs sm:text-sm font-medium rounded-xl border border-slate-200/90 focus:border-brand-gold focus:outline-none py-3 px-3 transition-all cursor-pointer"
                >
                  {componentCategories.map((cat) => (
                    <option key={cat.val} value={cat.val}>
                      {cat[locale]}
                    </option>
                  ))}
                </select>
              </div>

              {/* Field 5: Submit Action Button */}
              <div className="lg:col-span-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-brand-gold hover:bg-brand-gold-dark text-slate-950 font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-sm font-sans"
                >
                  <Search className="w-4 h-4" />
                  <span>{locale === "ar" ? "بحث القطع" : "Find Spares"}</span>
                </button>
              </div>

            </form>

            {/* Popular Searches Chips */}
            <div className="flex flex-wrap items-center gap-2 pt-3 px-2">
              <span className="text-[11px] font-mono font-medium text-slate-400">
                {locale === "ar" ? "الأكثر طلباً:" : "Popular searches:"}
              </span>
              {popularSearches.map((item) => (
                <Link
                  key={item.en}
                  href={item.href}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-[11px] font-mono text-slate-700 hover:text-slate-950 border border-slate-200 transition-all"
                >
                  {item[locale]}
                </Link>
              ))}
            </div>

          </div>
        </div>

      </div>

    </section>
  );
}
