"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { elevatorCategories } from "@/data/categories";
import {
  ArrowRight,
  ArrowLeft,
  Layers,
  Sparkles,
  ChevronDown,
  Box,
} from "lucide-react";

export function CategoryGrid() {
  const { locale, isRtl } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;
  const [showAllCategories, setShowAllCategories] = useState(false);

  return (
    <section className="py-20 px-4 sm:px-8 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-[1440px] mx-auto space-y-12">
        
        {/* Section Header (Inspired by Slide 4) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <div className="space-y-1.5">
            <span className="text-xs font-mono font-bold text-brand-gold uppercase tracking-widest">
              {locale === "ar" ? "كتالوج القطع والمكونات الرئيسية" : "CORE COMPONENT SYSTEMS"}
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight font-sans">
              {locale === "ar" ? "أبرز التصنيفات" : "POPULAR CATEGORIES"}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono font-bold text-slate-900 hover:text-brand-gold transition-colors"
            >
              <span>{locale === "ar" ? "عرض الفهرس الشامل (12 منظومة)" : "VIEW COMPLETE SPEC INDEX"}</span>
              <ArrowIcon className="w-4 h-4 text-brand-gold" />
            </Link>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            EDITORIAL BENTO GRID SYSTEM (Slide 4 exact composition)
        ───────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-0 border border-slate-200 rounded-3xl overflow-hidden bg-slate-100 shadow-sm">
          
          {/* ── CARD 1: TRACTION MACHINES & MOTORS (Large Feature Tile: 5 cols, 2 rows) ── */}
          <div className="lg:col-span-5 lg:row-span-2 bg-white p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-e border-slate-200 group relative overflow-hidden transition-all hover:bg-slate-50/50">
            {/* Top Subtitle & Badge */}
            <div className="flex items-center justify-between z-10">
              <span className="text-xs font-mono font-bold text-brand-gold uppercase tracking-wider">
                {locale === "ar" ? "المنظومة 01 · الدفع والجر" : "SYSTEM 01 · PROPULSION"}
              </span>
              <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full border border-slate-200">
                {locale === "ar" ? "85+ موديل متاح" : "85+ SKUs IN STOCK"}
              </span>
            </div>

            {/* 3D Product Image Render */}
            <div className="relative w-full h-64 sm:h-80 my-4 flex items-center justify-center">
              <Image
                src="/images/bento/traction_motor.jpg"
                alt="PMSM Gearless Traction Machine"
                fill
                className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Bottom Content & Link */}
            <div className="space-y-3 z-10 pt-2 border-t border-slate-100">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-950 font-sans group-hover:text-brand-gold transition-colors">
                  {locale === "ar" ? "ماكينات الجر والمحركات" : "Traction Machines & Motors"}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">
                  {locale === "ar"
                    ? "ماكينات متزامنة مغناطيسية بدون تروس (PMSM) ومحركات تقليدية مع تروس وطارات جر دقيقة الخراطة."
                    : "High-torque permanent magnet synchronous gearless drives and worm-geared motors with precision cast iron sheaves."}
                </p>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex flex-wrap gap-1.5 text-[10px] font-mono text-slate-500">
                  <span className="bg-slate-100 px-2 py-0.5 rounded">PMSM Gearless</span>
                  <span className="bg-slate-100 px-2 py-0.5 rounded">Torin / Montanari</span>
                </div>
                <Link
                  href="/catalog?category=traction-machines"
                  className="inline-flex items-center gap-1 text-xs font-bold font-mono text-slate-950 group-hover:text-brand-gold transition-colors"
                >
                  <span>{locale === "ar" ? "استكشف" : "EXPLORE"}</span>
                  <ArrowIcon className="w-3.5 h-3.5 text-brand-gold transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* ── CELL 2: CATEGORY OVERVIEW TEXT (Middle Top: 4 cols) ── */}
          <div className="lg:col-span-4 bg-slate-50/70 p-6 sm:p-7 flex flex-col justify-between border-b lg:border-e border-slate-200">
            <div className="space-y-3">
              <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest block">
                {locale === "ar" ? "جاهزية التوريد" : "INVENTORY READINESS"}
              </span>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {locale === "ar"
                  ? "تصفح أبرز تصنيفاتنا التي تغطي كافة أنظمة المصاعد الكهربائية والهيدروليكية، المستوردة مباشرة من كبار المصنعين والمعتمدة للمشاريع في المملكة."
                  : "Browse our core component systems including traction drives, intelligent door operators, inverters, and certified safety gears to get the best options for your installations."}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-500">{locale === "ar" ? "الدمام · الرياض · جدة" : "KSA Nationwide Dispatch"}</span>
              <Link
                href="/catalog"
                className="text-brand-gold font-bold hover:underline inline-flex items-center gap-1"
              >
                <span>{locale === "ar" ? "كل القطع" : "All Spares"}</span>
                <ArrowIcon className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* ── CARD 3: CONTROLLERS & INVERTERS (Right Top: 3 cols) ── */}
          <div className="lg:col-span-3 bg-white p-6 flex flex-col justify-between border-b border-slate-200 group relative transition-all hover:bg-slate-50/50">
            <div className="flex items-center justify-between z-10">
              <span className="text-xs font-mono font-bold text-brand-gold uppercase">
                {locale === "ar" ? "المنظومة 02" : "SYSTEM 02"}
              </span>
              <span className="text-[10px] font-mono text-slate-500 font-bold bg-slate-100 px-2 py-0.5 rounded-full">
                NICE3000 / STEP
              </span>
            </div>

            <div className="relative w-full h-36 my-2 flex items-center justify-center">
              <Image
                src="/images/bento/control_board.jpg"
                alt="Elevator Controller Board"
                fill
                className="object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="pt-2 border-t border-slate-100">
              <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-gold transition-colors font-sans">
                {locale === "ar" ? "لوحات التحكم والمحولات" : "Controllers & Inverters"}
              </h3>
              <div className="flex items-center justify-between pt-2">
                <span className="text-[10px] font-mono text-slate-500">ARM Dual-Core / VVVF</span>
                <Link
                  href="/catalog?category=controllers"
                  className="text-xs font-mono font-bold text-slate-900 group-hover:text-brand-gold"
                >
                  <ArrowIcon className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* ── CARD 4: SAFETY GEARS & GOVERNORS (Middle Bottom: 4 cols) ── */}
          <div className="lg:col-span-4 bg-white p-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-e border-slate-200 group relative transition-all hover:bg-slate-50/50">
            <div className="flex items-center justify-between z-10">
              <span className="text-xs font-mono font-bold text-brand-gold uppercase">
                {locale === "ar" ? "المنظومة 03" : "SYSTEM 03"}
              </span>
              <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">
                EN 81 Certified
              </span>
            </div>

            <div className="relative w-full h-40 my-2 flex items-center justify-center">
              <Image
                src="/images/bento/safety_gear.jpg"
                alt="Elevator Progressive Safety Gear"
                fill
                className="object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="pt-2 border-t border-slate-100">
              <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-gold transition-colors font-sans">
                {locale === "ar" ? "منظومة الأمان والبراشوت" : "Safety Gears & Governors"}
              </h3>
              <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                {locale === "ar" ? "أجهزة أمان تدريجية ومنظمات سرعة فائقة الدقة" : "Progressive safety gears, clamps & speed limiters"}
              </p>
              <div className="flex items-center justify-between pt-2">
                <span className="text-[10px] font-mono text-slate-500">Up to 2.5 m/s</span>
                <Link
                  href="/catalog?category=safety-gear"
                  className="text-xs font-mono font-bold text-slate-900 group-hover:text-brand-gold"
                >
                  <ArrowIcon className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* ── CARD 5: AUTOMATIC DOOR OPERATORS (Right Bottom 1: 3 cols) ── */}
          <div className="lg:col-span-3 bg-white p-6 flex flex-col justify-between group relative transition-all hover:bg-slate-50/50">
            <div className="flex items-center justify-between z-10">
              <span className="text-xs font-mono font-bold text-brand-gold uppercase">
                {locale === "ar" ? "المنظومة 04" : "SYSTEM 04"}
              </span>
              <span className="text-[10px] font-mono text-slate-500 font-bold bg-slate-100 px-2 py-0.5 rounded-full">
                VVVF Belt
              </span>
            </div>

            <div className="relative w-full h-40 my-2 flex items-center justify-center">
              <Image
                src="/images/bento/door_operator.jpg"
                alt="Automatic Door Operator Drive"
                fill
                className="object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="pt-2 border-t border-slate-100">
              <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-gold transition-colors font-sans">
                {locale === "ar" ? "مشغلات الأبواب الآلية" : "Automatic Door Operators"}
              </h3>
              <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                {locale === "ar" ? "مشغلات درف تلسكوبية وسنتر متوافقة مع فيرماتور" : "Telescopic & center-opening VVVF drives"}
              </p>
              <div className="flex items-center justify-between pt-2">
                <span className="text-[10px] font-mono text-slate-500">Fermator Compatible</span>
                <Link
                  href="/catalog?category=door-operators"
                  className="text-xs font-mono font-bold text-slate-900 group-hover:text-brand-gold"
                >
                  <ArrowIcon className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* ─────────────────────────────────────────────────────────────
            BOTTOM ROW: SECONDARY BENTO TILES (Push Buttons & Guides)
        ───────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 6: Push Buttons & COP/LOP Fixtures */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between hover:border-brand-gold/60 transition-all shadow-sm group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-brand-gold">
                {locale === "ar" ? "المنظومة 05" : "SYSTEM 05"}
              </span>
              <span className="text-[10px] font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                Braille & LED
              </span>
            </div>

            <div className="relative w-full h-36 my-2 flex items-center justify-center">
              <Image
                src="/images/bento/cop_buttons.jpg"
                alt="Elevator COP Push Buttons"
                fill
                className="object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="pt-2 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-brand-gold transition-colors font-sans">
                {locale === "ar" ? "أزرار الطلب وشاشات العرض (COP/LOP)" : "Push Buttons & Indicators"}
              </h3>
              <div className="flex items-center justify-between pt-2">
                <span className="text-[10px] font-mono text-slate-500">Stainless Steel / Touch</span>
                <Link
                  href="/catalog?category=push-buttons"
                  className="text-xs font-mono font-bold text-slate-900 group-hover:text-brand-gold inline-flex items-center gap-1"
                >
                  <span>{locale === "ar" ? "تصفح" : "View"}</span>
                  <ArrowIcon className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>

          {/* Card 7: Guide Rails & Fixing Hardware */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between hover:border-brand-gold/60 transition-all shadow-sm group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-brand-gold">
                {locale === "ar" ? "المنظومة 06" : "SYSTEM 06"}
              </span>
              <span className="text-[10px] font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                T50 / T75 / T89
              </span>
            </div>

            <div className="flex flex-col items-center justify-center h-36 my-2 text-center p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-2xl font-black font-mono text-slate-900">T-PROFILE</span>
              <span className="text-[11px] text-slate-500 font-mono mt-1">
                {locale === "ar" ? "سكك مسحوبة ومشكلة بدقة عالية" : "Machined & Cold-Drawn Rails"}
              </span>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-brand-gold transition-colors font-sans">
                {locale === "ar" ? "سكك التوجيه ومشابك التثبيت" : "Guide Rails & Hardware"}
              </h3>
              <div className="flex items-center justify-between pt-2">
                <span className="text-[10px] font-mono text-slate-500">High-Tensile Fishplates</span>
                <Link
                  href="/catalog?category=guide-rails"
                  className="text-xs font-mono font-bold text-slate-900 group-hover:text-brand-gold inline-flex items-center gap-1"
                >
                  <span>{locale === "ar" ? "تصفح" : "View"}</span>
                  <ArrowIcon className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>

          {/* Card 8: Expand All 12 Classifications Trigger */}
          <div className="bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-6 flex flex-col justify-between text-center items-center">
            <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 text-brand-gold flex items-center justify-center shadow-sm">
              <Layers className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <div className="text-base font-bold text-slate-900">
                {locale === "ar" ? "تصفح كافة الـ 12 منظومة" : "All 12 Component Groups"}
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                {locale === "ar"
                  ? "أبواب الأدوار، كراسي التوجيه، أحبال الجر، الحساسات والمكونات الهيدروليكية."
                  : "Landing doors, guide shoes, wire ropes, safety sensors & hydraulics."}
              </p>
            </div>

            <button
              onClick={() => setShowAllCategories(!showAllCategories)}
              className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 border border-slate-300 text-xs font-mono font-bold transition-all shadow-sm flex items-center gap-1.5"
            >
              <span>{showAllCategories ? (locale === "ar" ? "إخفاء القائمة" : "Collapse List") : (locale === "ar" ? "عرض باقي التصنيفات" : "Show All Categories")}</span>
              <ChevronDown className={`w-4 h-4 text-brand-gold transform transition-transform ${showAllCategories ? "rotate-180" : ""}`} />
            </button>
          </div>

        </div>

        {/* ─────────────────────────────────────────────────────────────
            EXPANDABLE DRAWER: REMAINING CATEGORIES
        ───────────────────────────────────────────────────────────── */}
        {showAllCategories && (
          <div className="pt-4 border-t border-slate-200 animate-fadeIn">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {elevatorCategories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/catalog?category=${cat.id}`}
                  className="bg-white hover:bg-slate-50 p-3.5 rounded-xl border border-slate-200 hover:border-brand-gold text-start transition-all shadow-sm space-y-1 group"
                >
                  <div className="text-xs font-bold text-slate-900 group-hover:text-brand-gold transition-colors truncate">
                    {cat.name[locale]}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono truncate">
                    {cat.subcategories.length} subcategories
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
