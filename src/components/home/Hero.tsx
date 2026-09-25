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
  Shield,
  Cog,
  BarChart3,
  Box,
  ShieldCheck,
  Wrench,
  FileText,
} from "lucide-react";

const popularSearches = [
  { en: "Door Operator", ar: "مشغل الأبواب", href: "/catalog?category=door-operators" },
  { en: "Control Board", ar: "لوحة التحكم", href: "/catalog?category=controllers" },
  { en: "Guide Rail", ar: "سكك التوجيه", href: "/catalog?category=guide-rails" },
  { en: "Push Button", ar: "أزرار الطلب", href: "/catalog?category=push-buttons" },
  { en: "Sensor", ar: "حساسات الأمان", href: "/catalog?category=sensors-safety" },
];

const brandLogos = [
  { name: "OTIS", image: "/images/hero/brand_otis.png", query: "Otis" },
  { name: "KONE", image: "/images/hero/brand_kone.png", query: "Kone" },
  { name: "Schindler", image: "/images/hero/brand_schindler.png", query: "Schindler" },
  { name: "MITSUBISHI ELECTRIC", image: "/images/hero/brand_mitsubishi.png", query: "Mitsubishi" },
  { name: "thyssenkrupp", image: "/images/hero/brand_thyssenkrupp.png", query: "Thyssenkrupp" },
];

export function Hero() {
  const { locale, isRtl } = useLanguage();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/catalog?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/catalog");
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-white text-slate-900 pt-6 sm:pt-10 lg:pt-12">
      {/* ─────────────────────────────────────────────────────────────
          1. MAIN HERO GRID (TWO COLUMNS)
      ───────────────────────────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center min-h-[580px] lg:min-h-[660px]">
          
          {/* LEFT COLUMN: HEADLINE, SEARCH & ACTION CONTROLS */}
          <div className="lg:col-span-6 xl:col-span-5 space-y-6 z-20 pt-4 pb-6">
            
            {/* Eyebrow Tag */}
            <div className="flex items-center gap-3 animate-hero-slide-left animation-delay-200">
              <span className="text-xs sm:text-sm font-bold font-mono tracking-wider text-[#B88B4A] uppercase">
                {locale === "ar"
                  ? "قطع غيار المصاعد · المملكة العربية السعودية"
                  : "ELEVATOR SPARE PARTS · SAUDI ARABIA"}
              </span>
              <span className="w-12 h-[1.5px] bg-[#C29B63] inline-block" />
            </div>

            {/* Main Headline */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-6xl lg:text-[64px] xl:text-[70px] font-black text-slate-950 tracking-tight leading-[1.08] font-sans">
                {locale === "ar" ? (
                  <>
                    <span className="block animate-hero-fade-up animation-delay-300">
                      قطع غيار موثوقة
                    </span>
                    <span className="block animate-hero-fade-up animation-delay-450">
                      لارتقاء مستدام نحو
                    </span>
                    <span className="block text-[#C29B63] animate-hero-fade-up animation-delay-600">
                      المستقبل.
                    </span>
                  </>
                ) : (
                  <>
                    <span className="block animate-hero-fade-up animation-delay-300">
                      Reliable Parts
                    </span>
                    <span className="block animate-hero-fade-up animation-delay-450">
                      for a Higher
                    </span>
                    <span className="block text-[#C29B63] animate-hero-fade-up animation-delay-600">
                      Tomorrow.
                    </span>
                  </>
                )}
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl animate-hero-fade-up animation-delay-500 font-sans">
              {locale === "ar"
                ? "قطع غيار ومكونات مصاعد معتمدة لضمان حركة رأسية أكثر أماناً، انسيابية وموثوقية."
                : "Elevator spare parts and components for a safer, smoother and more reliable vertical world."}
            </p>

            {/* Floating Search Bar */}
            <div className="pt-2 animate-hero-fade-up animation-delay-700">
              <form
                onSubmit={handleSearch}
                className="bg-white rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.08)] border border-slate-200/90 p-2 sm:p-2.5 flex items-center gap-2 group focus-within:border-[#C29B63] transition-all max-w-xl"
              >
                <Search className="w-5 h-5 text-slate-400 ms-3 shrink-0 group-focus-within:text-[#C29B63] transition-colors" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    locale === "ar"
                      ? "ابحث برقم القطعة، الماركة أو اسم المكون..."
                      : "Search by part number, brand or component..."
                  }
                  className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm font-medium focus:outline-none px-2"
                />
                <button
                  type="submit"
                  className="px-5 sm:px-6 py-3 rounded-xl bg-gradient-to-r from-[#C99D5F] to-[#B88B4A] hover:from-[#B88B4A] hover:to-[#A3773A] text-slate-950 font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 shrink-0 shadow-sm font-sans"
                >
                  <span>{locale === "ar" ? "بحث القطع" : "Find Part"}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </button>
              </form>
            </div>

            {/* Popular Searches Filter Chips */}
            <div className="flex flex-wrap items-center gap-2 pt-1 animate-hero-fade-up animation-delay-900">
              <span className="text-xs text-slate-500 font-medium">
                {locale === "ar" ? "الأكثر بحثاً:" : "Popular searches:"}
              </span>
              {popularSearches.map((item) => (
                <Link
                  key={item.en}
                  href={item.href}
                  className="px-3 py-1 rounded-full bg-slate-50 hover:bg-white text-xs text-slate-600 hover:text-slate-950 border border-slate-200/90 hover:border-[#C29B63] transition-all shadow-sm font-medium"
                >
                  {item[locale]}
                </Link>
              ))}
            </div>

          </div>

          {/* RIGHT COLUMN: 3D MACHINE HERO VISUAL WITH INTERACTIVE FLOATING CALLOUTS */}
          <div className="lg:col-span-6 xl:col-span-7 relative w-full h-[460px] sm:h-[560px] lg:h-[640px] flex items-center justify-center animate-hero-scale-up animation-delay-300">
            
            {/* Background 3D Machine Image */}
            <div className="relative w-full h-full">
              <Image
                src="/images/hero/hero_bg_clean.jpg"
                alt="Jupiter Elevators Traction Machine 3D Exploded View"
                fill
                priority
                className="object-contain object-center lg:object-right select-none pointer-events-none"
              />
            </div>

            {/* SVG Connecting Leader Lines Overlay */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none hidden md:block z-20"
              viewBox="0 0 700 640"
              fill="none"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Leader Line 1: Gearbox Card to Gear Wheel */}
              <path
                d="M 280 150 L 360 150 L 400 240"
                stroke="#C29B63"
                strokeWidth="1.5"
                strokeDasharray="4 3"
                className="animate-line-draw"
              />
              <circle cx="400" cy="240" r="3.5" fill="#C29B63" />

              {/* Leader Line 2: Brake System Card to Brake Caliper */}
              <path
                d="M 520 150 L 590 150 L 610 320"
                stroke="#C29B63"
                strokeWidth="1.5"
                strokeDasharray="4 3"
                className="animate-line-draw"
              />
              <circle cx="610" cy="320" r="3.5" fill="#C29B63" />

              {/* Leader Line 3: Traction Sheave Card to Sheave Assembly */}
              <path
                d="M 330 460 L 380 460 L 420 380"
                stroke="#C29B63"
                strokeWidth="1.5"
                strokeDasharray="4 3"
                className="animate-line-draw"
              />
              <circle cx="420" cy="380" r="3.5" fill="#C29B63" />
            </svg>

            {/* ── CALLOUT CARD 1: GEARBOX (Top Left) ── */}
            <div className="absolute top-6 sm:top-14 left-4 sm:left-10 z-30 animate-hero-callout animation-delay-600">
              <div className="animate-hero-float-1">
                <Link
                  href="/catalog?category=traction-machines"
                  className="bg-white/95 backdrop-blur-md rounded-2xl p-2.5 pe-4 shadow-[0_12px_32px_rgba(0,0,0,0.08)] border border-slate-100 hover:border-[#C29B63] transition-all flex items-center gap-3 group"
                >
                  <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-slate-50 border border-slate-100 p-1 shrink-0 flex items-center justify-center overflow-hidden">
                    <Image
                      src="/images/hero/thumb_gearbox.png"
                      alt="Gearbox"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-slate-900 group-hover:text-[#B88B4A] transition-colors">
                      {locale === "ar" ? "صندوق التروس" : "Gearbox"}
                    </div>
                    <div className="text-[10px] text-slate-500 font-medium">
                      {locale === "ar" ? "منظومة دفع فائقة الأداء" : "High performance drive systems"}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#B88B4A] transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-all ms-1" />
                </Link>
              </div>
            </div>

            {/* ── CALLOUT CARD 2: BRAKE SYSTEM (Top Right) ── */}
            <div className="absolute top-6 sm:top-14 right-2 sm:right-6 z-30 animate-hero-callout animation-delay-800">
              <div className="animate-hero-float-2">
                <Link
                  href="/catalog?category=safety-gear"
                  className="bg-white/95 backdrop-blur-md rounded-2xl p-2.5 pe-4 shadow-[0_12px_32px_rgba(0,0,0,0.08)] border border-slate-100 hover:border-[#C29B63] transition-all flex items-center gap-3 group"
                >
                  <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-slate-50 border border-slate-100 p-1 shrink-0 flex items-center justify-center overflow-hidden">
                    <Image
                      src="/images/hero/thumb_brake.png"
                      alt="Brake System"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-slate-900 group-hover:text-[#B88B4A] transition-colors">
                      {locale === "ar" ? "نظام الفرامل" : "Brake System"}
                    </div>
                    <div className="text-[10px] text-slate-500 font-medium">
                      {locale === "ar" ? "تحكم وأمان متطور" : "Enhanced safety and control"}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#B88B4A] transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-all ms-1" />
                </Link>
              </div>
            </div>

            {/* ── CALLOUT CARD 3: TRACTION SHEAVE (Bottom Left of Machine) ── */}
            <div className="absolute bottom-24 sm:bottom-28 left-8 sm:left-24 z-30 animate-hero-callout animation-delay-1000">
              <div className="animate-hero-float-3">
                <Link
                  href="/catalog?category=traction-machines"
                  className="bg-white/95 backdrop-blur-md rounded-2xl p-2.5 pe-4 shadow-[0_12px_32px_rgba(0,0,0,0.08)] border border-slate-100 hover:border-[#C29B63] transition-all flex items-center gap-3 group"
                >
                  <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-slate-50 border border-slate-100 p-1 shrink-0 flex items-center justify-center overflow-hidden">
                    <Image
                      src="/images/hero/thumb_sheave.png"
                      alt="Traction Sheave"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-slate-900 group-hover:text-[#B88B4A] transition-colors">
                      {locale === "ar" ? "طارة الجر" : "Traction Sheave"}
                    </div>
                    <div className="text-[10px] text-slate-500 font-medium">
                      {locale === "ar" ? "خراطة دقيقة لأعلى متانة" : "Precision machined for durability"}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#B88B4A] transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-all ms-1" />
                </Link>
              </div>
            </div>

            {/* ── FLOATING GLASS BADGE: SAFETY / RELIABILITY / EFFICIENCY (Bottom Right) ── */}
            <div className="absolute bottom-6 sm:bottom-12 right-2 sm:right-6 z-30 animate-hero-slide-right animation-delay-900">
              <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-[0_15px_35px_rgba(0,0,0,0.08)] border border-white/80 space-y-3.5 max-w-[210px] sm:max-w-[220px]">
                {/* Item 1: Safety */}
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#C29B63]/10 text-[#C29B63] flex items-center justify-center shrink-0 mt-0.5">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-slate-900 tracking-wider uppercase font-mono">
                      {locale === "ar" ? "الأمان" : "SAFETY"}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      {locale === "ar" ? "ثقة مطلقة" : "You can trust"}
                    </div>
                  </div>
                </div>

                {/* Item 2: Reliability */}
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#C29B63]/10 text-[#C29B63] flex items-center justify-center shrink-0 mt-0.5">
                    <Cog className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-slate-900 tracking-wider uppercase font-mono">
                      {locale === "ar" ? "الموثوقية" : "RELIABILITY"}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      {locale === "ar" ? "مصممة لتحمل شاق" : "Built to perform"}
                    </div>
                  </div>
                </div>

                {/* Item 3: Efficiency */}
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#C29B63]/10 text-[#C29B63] flex items-center justify-center shrink-0 mt-0.5">
                    <BarChart3 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-slate-900 tracking-wider uppercase font-mono">
                      {locale === "ar" ? "الكفاءة" : "EFFICIENCY"}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      {locale === "ar" ? "لحركة أكثر انسيابية" : "For a smoother tomorrow"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. BOTTOM TRUST STRIP & MAJOR OEM BRANDS SECTION
      ───────────────────────────────────────────────────────────── */}
      <div className="w-full border-t border-slate-200/90 bg-white py-5 px-4 sm:px-8 mt-4 animate-hero-fade-up animation-delay-1000">
        <div className="max-w-[1400px] mx-auto flex flex-col xl:flex-row items-center justify-between gap-6">
          
          {/* LEFT: 4 VALUE PILLARS (CIRCULAR GOLD ICONS) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 items-center w-full xl:w-auto">
            
            {/* Pillar 1: Wide Range */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#C29B63] flex items-center justify-center text-[#C29B63] shrink-0 bg-[#C29B63]/5">
                <Box className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-slate-800 leading-snug">
                <div>{locale === "ar" ? "تشكيلة واسعة" : "Wide Range"}</div>
                <div className="text-slate-500 font-normal">{locale === "ar" ? "من قطع الغيار" : "of Spare Parts"}</div>
              </div>
            </div>

            {/* Pillar 2: Trusted Brands */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#C29B63] flex items-center justify-center text-[#C29B63] shrink-0 bg-[#C29B63]/5">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-slate-800 leading-snug">
                <div>{locale === "ar" ? "ماركات عالمية" : "Trusted"}</div>
                <div className="text-slate-500 font-normal">{locale === "ar" ? "موثوقة معتمدة" : "Brands"}</div>
              </div>
            </div>

            {/* Pillar 3: Technical Support */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#C29B63] flex items-center justify-center text-[#C29B63] shrink-0 bg-[#C29B63]/5">
                <Wrench className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-slate-800 leading-snug">
                <div>{locale === "ar" ? "دعم فني" : "Technical"}</div>
                <div className="text-slate-500 font-normal">{locale === "ar" ? "واستشارات هندسية" : "Support"}</div>
              </div>
            </div>

            {/* Pillar 4: Quick Quotation */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#C29B63] flex items-center justify-center text-[#C29B63] shrink-0 bg-[#C29B63]/5">
                <FileText className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-slate-800 leading-snug">
                <div>{locale === "ar" ? "تسعير فوري" : "Quick"}</div>
                <div className="text-slate-500 font-normal">{locale === "ar" ? "خلال دقائق" : "Quotation"}</div>
              </div>
            </div>

          </div>

          {/* VERTICAL DIVIDER ON LARGE SCREENS */}
          <div className="hidden xl:block h-10 w-[1px] bg-slate-200" />

          {/* RIGHT: OUR BRANDS STRIP */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full xl:w-auto justify-end">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 shrink-0">
              {locale === "ar" ? "الماركات المعتمدة" : "OUR BRANDS"}
            </span>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              {brandLogos.map((brand) => (
                <Link
                  key={brand.name}
                  href={`/catalog?brand=${encodeURIComponent(brand.query)}`}
                  className="relative h-7 sm:h-8 w-20 sm:w-24 opacity-80 hover:opacity-100 transition-all filter hover:brightness-105 shrink-0"
                  title={brand.name}
                >
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    fill
                    className="object-contain"
                  />
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
