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
  ChevronDown,
  Sparkles,
} from "lucide-react";

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
  { en: "All Elevator Types", ar: "جميع أنواع المصاعد", val: "" },
  { en: "Passenger MRL", ar: "مصاعد ركاب MRL", val: "MRL" },
  { en: "Traction High-Speed", ar: "مصاعد جر عالية السرعة", val: "Traction" },
  { en: "Freight & Heavy Cargo", ar: "مصاعد بضائع وشحن", val: "Freight" },
  { en: "Hydraulic Lifts", ar: "مصاعد هيدروليكية", val: "Hydraulic" },
  { en: "Villa & Panoramic", ar: "مصاعد فلل وبانوراما", val: "Villa" },
];

export function Hero() {
  const { locale, isRtl } = useLanguage();
  const router = useRouter();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const [partNumber, setPartNumber] = useState("");
  const [keyword, setKeyword] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("All Brands");
  const [selectedType, setSelectedType] = useState("");

  const handleFinderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (selectedBrand && selectedBrand !== "All Brands") {
      params.set("brand", selectedBrand);
    }

    const queryParts = [partNumber.trim(), keyword.trim(), selectedType.trim()].filter(Boolean);
    if (queryParts.length > 0) {
      params.set("q", queryParts.join(" "));
    }

    router.push(`/catalog?${params.toString()}`);
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#FAF9F6] text-slate-900 pt-6 sm:pt-10 pb-0 border-b border-slate-200">
      
      {/* ─────────────────────────────────────────────────────────────
          1. TOP GIANT WORDMARK (Slide 1 & 3: "AUTOPARTS" composition)
      ───────────────────────────────────────────────────────────── */}
      <div className="w-full text-center relative z-0 select-none px-4">
        <h1 className="text-[14vw] sm:text-[15vw] font-black tracking-tighter uppercase font-sans leading-[0.82] text-center whitespace-nowrap">
          {locale === "ar" ? (
            <>
              <span className="text-[#C59341]">قطع غيار</span>{" "}
              <span className="text-slate-950">المصاعد</span>
            </>
          ) : (
            <>
              <span className="text-[#C59341]">ELEVATOR</span>
              <span className="text-slate-950">PARTS</span>
            </>
          )}
        </h1>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. CENTER 3D COMPONENT STAGE & DYNAMIC WAVE SWEEP
      ───────────────────────────────────────────────────────────── */}
      <div className="relative w-full max-w-[1440px] mx-auto min-h-[380px] sm:min-h-[480px] lg:min-h-[540px] flex items-center justify-center -mt-[4vw] sm:-mt-[5vw] z-10">
        
        {/* Dynamic Contour Wave Lines (Red/Gold thread wave from Slide 1 & 3) */}
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden flex items-center justify-center z-0 opacity-40">
          <svg
            className="w-full h-full"
            viewBox="0 0 1440 600"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M-100,280 C300,420 500,140 720,280 C940,420 1140,160 1540,290"
              stroke="#C59341"
              strokeWidth="2"
              strokeDasharray="6 4"
            />
            <path
              d="M-100,295 C300,435 500,155 720,295 C940,435 1140,175 1540,305"
              stroke="#C59341"
              strokeWidth="1.2"
              strokeOpacity="0.7"
            />
            <path
              d="M-100,310 C300,450 500,170 720,310 C940,450 1140,190 1540,320"
              stroke="#C59341"
              strokeWidth="1"
              strokeOpacity="0.5"
            />
            <path
              d="M-100,325 C300,465 500,185 720,325 C940,465 1140,205 1540,335"
              stroke="#C59341"
              strokeWidth="0.8"
              strokeOpacity="0.3"
            />
          </svg>
        </div>

        {/* ── LEFT BALANCED MICRO-COPY (Slide 1 & 3 exact placement) ── */}
        <div className="absolute start-4 sm:start-12 lg:start-24 top-1/2 -translate-y-1/2 z-20 hidden md:block text-start space-y-8 font-mono">
          <div>
            <span className="text-xs lg:text-sm font-bold text-slate-800 tracking-wider block">
              {locale === "ar" ? "أسعار جملة مباشرة" : "Direct Factory Prices"}
            </span>
            <span className="text-[11px] text-slate-400 block mt-0.5">
              {locale === "ar" ? "بدون وسطاء من كبرى المصانع" : "Zero Middlemen Markups"}
            </span>
          </div>

          <div className="pt-4 border-t border-slate-200">
            <span className="text-[10px] text-brand-gold font-bold uppercase tracking-widest block">
              {locale === "ar" ? "سجل تجاري معتمد" : "OFFICIAL SAUDI CR"}
            </span>
            <span className="text-xs font-bold text-slate-900 block mt-0.5">
              2050078848
            </span>
          </div>
        </div>

        {/* ── CENTER 3D ELEVATOR BRAKE & TRACTION SHEAVE CENTERPIECE ── */}
        <div className="relative z-10 w-[300px] h-[300px] sm:w-[440px] sm:h-[440px] lg:w-[520px] lg:h-[520px] flex items-center justify-center">
          {/* Subtle Ground Radial Shadow */}
          <div className="absolute bottom-4 inset-x-12 h-8 bg-slate-900/10 rounded-full blur-xl pointer-events-none" />

          <div className="relative w-full h-full transform hover:scale-[1.02] transition-transform duration-500">
            <Image
              src="/images/hero/hero_elevator_centerpiece.jpg"
              alt="Jupiter Elevators Traction Sheave & Disc Brake Assembly"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>

        {/* ── RIGHT BALANCED MICRO-COPY (Slide 1 & 3 exact placement) ── */}
        <div className="absolute end-4 sm:end-12 lg:end-24 top-1/2 -translate-y-1/2 z-20 hidden md:block text-end space-y-8 font-mono">
          <div>
            <span className="text-xs lg:text-sm font-bold text-slate-800 tracking-wider block">
              {locale === "ar" ? "شحن فوري بالمملكة" : "Fast KSA Delivery"}
            </span>
            <span className="text-[11px] text-slate-400 block mt-0.5">
              {locale === "ar" ? "الدمام · الرياض · جدة" : "Same-Day Dispatch"}
            </span>
          </div>

          <div className="pt-4 border-t border-slate-200">
            <span className="text-[10px] text-brand-gold font-bold uppercase tracking-widest block">
              {locale === "ar" ? "المستودع المركزي" : "CENTRAL WAREHOUSE"}
            </span>
            <span className="text-xs font-bold text-slate-900 block mt-0.5">
              {locale === "ar" ? "الدمام، المنطقة الشرقية" : "Dammam, Eastern Province"}
            </span>
          </div>
        </div>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. CENTER CALL-TO-ACTION (Slide 3: "All Parts in One Place! / CATALOG")
      ───────────────────────────────────────────────────────────── */}
      <div className="text-center relative z-20 -mt-6 sm:-mt-8 mb-8 space-y-3">
        <p className="text-xs sm:text-sm font-mono font-bold tracking-wider text-slate-600 uppercase">
          {locale === "ar" ? "جميع قطع الغيار في مكان واحد!" : "All Parts in One Place!"}
        </p>

        <div>
          <Link
            href="/catalog"
            className="inline-flex items-center justify-center px-10 py-3.5 rounded-xl bg-[#C59341] hover:bg-[#b08134] text-slate-950 font-black text-xs sm:text-sm font-mono tracking-widest uppercase transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <span>{locale === "ar" ? "الكتالوج" : "CATALOG"}</span>
          </Link>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. BOTTOM FLOATING SEARCH DOCK (Slide 3 exact 5-box bar)
      ───────────────────────────────────────────────────────────── */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 relative z-20 mb-8">
        <form
          onSubmit={handleFinderSubmit}
          className="bg-white rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.06)] border border-slate-200/90 p-2 sm:p-2.5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-2 items-center"
        >
          {/* Field 1: Enter Part Number / SKU */}
          <div className="lg:col-span-3">
            <input
              type="text"
              value={partNumber}
              onChange={(e) => setPartNumber(e.target.value)}
              placeholder={locale === "ar" ? "رقم القطعة / SKU" : "Enter Part number / SKU"}
              className="w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm font-medium rounded-xl border border-slate-200 focus:border-[#C59341] focus:outline-none p-3.5 transition-all"
            />
          </div>

          {/* Field 2: Search by part name / keyword */}
          <div className="lg:col-span-3">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder={locale === "ar" ? "البحث باسم المكون..." : "Search by part name..."}
              className="w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm font-medium rounded-xl border border-slate-200 focus:border-[#C59341] focus:outline-none p-3.5 transition-all"
            />
          </div>

          {/* Field 3: Select car/elevator brand */}
          <div className="lg:col-span-2">
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-slate-900 text-xs sm:text-sm font-medium rounded-xl border border-slate-200 focus:border-[#C59341] focus:outline-none p-3.5 transition-all cursor-pointer"
            >
              {oemBrands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand === "All Brands" ? (locale === "ar" ? "الماركة (الكل)" : "Select brand ▾") : brand}
                </option>
              ))}
            </select>
          </div>

          {/* Field 4: Select elevator model / type */}
          <div className="lg:col-span-2">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-slate-900 text-xs sm:text-sm font-medium rounded-xl border border-slate-200 focus:border-[#C59341] focus:outline-none p-3.5 transition-all cursor-pointer"
            >
              {elevatorTypes.map((type) => (
                <option key={type.val} value={type.val}>
                  {type[locale]}
                </option>
              ))}
            </select>
          </div>

          {/* Field 5: Red/Gold Action Button: Find Part */}
          <div className="lg:col-span-2">
            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-[#C59341] hover:bg-[#b08134] text-slate-950 font-bold text-xs sm:text-sm font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <Search className="w-4 h-4" />
              <span>{locale === "ar" ? "بحث القطع" : "Find part"}</span>
            </button>
          </div>
        </form>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          5. ANGLED BRAND RIBBON TICKER (Slide 1 exact bottom marquee)
      ───────────────────────────────────────────────────────────── */}
      <div className="w-full overflow-hidden bg-slate-950 text-white py-4 relative z-20 border-t border-slate-800">
        <div className="flex items-center gap-8 whitespace-nowrap text-sm sm:text-base font-black font-mono tracking-wider animate-marquee select-none">
          <span className="flex items-center gap-4 text-[#C59341]">
            <span>★</span>
            <span className="text-white">JUPITER ELEVATORS</span>
            <span>★</span>
            <span className="text-white">جوبيتر للمصاعد</span>
            <span>★</span>
            <span className="text-white">ELEVATOR SPARE PARTS</span>
            <span>★</span>
            <span className="text-white">DAMMAM CENTRAL HUB</span>
            <span>★</span>
            <span className="text-white">OTIS</span>
            <span>★</span>
            <span className="text-white">KONE</span>
            <span>★</span>
            <span className="text-white">SCHINDLER</span>
            <span>★</span>
            <span className="text-white">MITSUBISHI</span>
            <span>★</span>
            <span className="text-white">FERMATOR</span>
            <span>★</span>
            <span className="text-white">MONARCH</span>
          </span>
          <span className="flex items-center gap-4 text-[#C59341]">
            <span>★</span>
            <span className="text-white">JUPITER ELEVATORS</span>
            <span>★</span>
            <span className="text-white">جوبيتر للمصاعد</span>
            <span>★</span>
            <span className="text-white">ELEVATOR SPARE PARTS</span>
            <span>★</span>
            <span className="text-white">DAMMAM CENTRAL HUB</span>
            <span>★</span>
            <span className="text-white">OTIS</span>
            <span>★</span>
            <span className="text-white">KONE</span>
            <span>★</span>
            <span className="text-white">SCHINDLER</span>
            <span>★</span>
            <span className="text-white">MITSUBISHI</span>
            <span>★</span>
            <span className="text-white">FERMATOR</span>
            <span>★</span>
            <span className="text-white">MONARCH</span>
          </span>
        </div>
      </div>

    </section>
  );
}
