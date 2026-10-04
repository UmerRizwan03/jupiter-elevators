"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, ChevronDown } from "lucide-react";
import type { Locale, Dictionary } from "@/lib/i18n";
import { BorderBeam } from "@/components/ui/border-beam";

interface HeroProps {
  lang: Locale;
  dict: Dictionary;
  compatibleBrands?: string[];
}

export function Hero({ lang, compatibleBrands = [] }: HeroProps) {
  const router = useRouter();
  const isRtl = lang === "ar";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [selectedModel, setSelectedModel] = useState("all");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set("q", searchQuery.trim());
    if (selectedCategory !== "all") params.set("category", selectedCategory);
    if (selectedBrand !== "all") params.set("brand", selectedBrand);
    if (selectedModel !== "all") params.set("model", selectedModel);

    router.push(`/${lang}/catalog?${params.toString()}`);
  };

  const categories = [
    { id: "traction-machines", name: isRtl ? "أنظمة الجر والماكينات" : "Traction Machines" },
    { id: "elevator-controllers", name: isRtl ? "لوحات التحكم والإنفرتر" : "Controllers & Inverters" },
    { id: "door-operators", name: isRtl ? "أنظمة ومشغلات الأبواب" : "Door Operators" },
    { id: "safety-gear-governors", name: isRtl ? "مكونات الأمان والبراشوت" : "Safety Gear & Governors" },
    { id: "push-buttons-indicators", name: isRtl ? "الأزرار وشاشات الكابينة" : "Buttons & Indicators" },
    { id: "wire-ropes-suspension", name: isRtl ? "حبال الجر وكابلات السفر" : "Wire Ropes & Cables" },
  ];

  const defaultCompatibleBrands = [
    "KONE",
    "OTIS",
    "Schindler",
    "Mitsubishi",
    "Fermator",
    "Wittur",
    "Monarch",
    "Step",
  ];
  const brandList = compatibleBrands && compatibleBrands.length > 0 ? compatibleBrands : defaultCompatibleBrands;

  return (
    <section className="relative w-full overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24">
      {/* Full-Width JUPITER Watermark Background Element across the Bottom of Hero */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden pointer-events-none select-none z-0 leading-none">
        <svg
          viewBox="0 0 1440 200"
          className="w-full h-auto max-h-[160px] sm:max-h-[220px] md:max-h-[260px] text-slate-200/50 fill-current block"
          preserveAspectRatio="none"
        >
          <text
            x="50%"
            y="92%"
            textAnchor="middle"
            textLength="1400"
            lengthAdjust="spacing"
            className="font-black text-[200px] uppercase font-sans"
          >
            JUPITER
          </text>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Typography & Structured Search Card (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Breadcrumb breadline */}
            <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono font-semibold tracking-wider text-slate-400 uppercase">
              <span>{isRtl ? "مكونات المصاعد" : "ELEVATOR COMPONENTS"}</span>
              <span className="text-slate-300">/</span>
              <span>{isRtl ? "قطع الغيار" : "SPARE PARTS"}</span>
              <span className="text-slate-300">/</span>
              <span className="text-[#C59341] font-bold">
                {isRtl ? "التحديث والتطوير" : "MODERNIZATION"}
              </span>
            </div>

            {/* Giant Hero Headline */}
            <div className="space-y-1">
              <h1 className={`max-w-full ${isRtl ? "font-sans" : "font-serif"} text-5xl sm:text-6xl md:text-7xl lg:text-[5.25rem] xl:text-[6.25rem] 2xl:text-[7rem] font-semibold text-slate-900 tracking-[-0.055em] leading-[0.92] uppercase`}>
                {isRtl ? (
                  <>
                    <span>{"نرتقي"}</span>
                    <br />
                    <span className="text-[#C59341]">{"فـوق"}</span>
                    <br />
                    <span>{"التوقعـات."}</span>
                  </>
                ) : (
                  <>
                    <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
                      <span className="hero-word-reveal hero-word-reveal-1 inline-block">
                        ELEVATING
                      </span>
                    </span>
                    <span className="block translate-x-[0.18em] overflow-hidden pb-[0.08em] -mb-[0.08em] text-[#C59341]">
                      <span className="hero-word-reveal hero-word-reveal-2 inline-block italic">
                        BEYOND
                      </span>
                    </span>
                    <span className="block translate-x-[0.42em] overflow-hidden pb-[0.08em] -mb-[0.08em] text-[0.72em] tracking-[-0.04em]">
                      <span className="hero-word-reveal hero-word-reveal-3 inline-block">
                        EXPECTATIONS.
                      </span>
                    </span>
                  </>
                )}
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-600 max-w-lg leading-relaxed font-normal">
              {isRtl
                ? "قطع غيار ومكونات مصاعد أصلية وموثوقة لعمليات التركيب، الصيانة الدورية، والتحديث الشامل."
                : "Reliable elevator spare parts for installation, maintenance and modernization."}
            </p>

            {/* Structured Search Box Card with Animated Border Beam */}
            <div className="relative max-w-lg rounded-2xl p-[1.5px] overflow-hidden shadow-xl z-30 group">
              {/* Animated Luminous Border Beam */}
              <BorderBeam
                duration={6}
                colorFrom="#C59341"
                colorTo="#FDE68A"
                glow
              />

              {/* Inner Search Box Content */}
              <div className="bg-white rounded-[15px] p-4 sm:p-5 relative z-10 border border-slate-100/80">
                <form onSubmit={handleSearchSubmit} className="space-y-3">
                  {/* Search Input Bar */}
                  <div className="relative flex items-center">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 rtl:left-auto rtl:right-3.5 pointer-events-none" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={
                        isRtl
                          ? "ابحث برقم القطعة، الموديل، أو كلمة بحث..."
                          : "Search by part number, component, model or keyword..."
                      }
                      className="w-full h-11 pl-10 pr-24 rtl:pl-24 rtl:pr-10 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all font-medium"
                    />
                    <button
                      type="submit"
                      className="absolute right-1.5 rtl:right-auto rtl:left-1.5 h-8 px-4 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
                    >
                      {isRtl ? "بحث" : "Search"}
                    </button>
                  </div>

                  {/* Dropdowns Filters Row */}
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    {/* Category Dropdown */}
                    <div className="relative">
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full h-10 px-2.5 pr-7 rtl:pr-2.5 rtl:pl-7 rounded-lg bg-slate-50 border border-slate-200 text-[11px] font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-slate-900 appearance-none cursor-pointer truncate"
                      >
                        <option value="all">
                          {isRtl ? "اختر الفئة" : "Select Category"}
                        </option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 rtl:right-auto rtl:left-2 top-3 pointer-events-none" />
                    </div>

                    {/* Brand Dropdown */}
                    <div className="relative">
                      <select
                        value={selectedBrand}
                        onChange={(e) => setSelectedBrand(e.target.value)}
                        className="w-full h-10 px-2.5 pr-7 rtl:pr-2.5 rtl:pl-7 rounded-lg bg-slate-50 border border-slate-200 text-[11px] font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-slate-900 appearance-none cursor-pointer truncate"
                      >
                        <option value="all">
                          {isRtl ? "اختر الماركة" : "Select Brand"}
                        </option>
                        {brandList.map((brand) => (
                          <option key={brand} value={brand}>
                            {brand}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 rtl:right-auto rtl:left-2 top-3 pointer-events-none" />
                    </div>

                    {/* Model Dropdown */}
                    <div className="relative">
                      <select
                        value={selectedModel}
                        onChange={(e) => setSelectedModel(e.target.value)}
                        className="w-full h-10 px-2.5 pr-7 rtl:pr-2.5 rtl:pl-7 rounded-lg bg-slate-50 border border-slate-200 text-[11px] font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-slate-900 appearance-none cursor-pointer truncate"
                      >
                        <option value="all">
                          {isRtl ? "اختر الموديل" : "Select Model"}
                        </option>
                        <option value="pmsm">PMSM Gearless</option>
                        <option value="geared">Geared Machine</option>
                        <option value="vvvf">VVVF Door Drive</option>
                        <option value="micro">Microprocessor Main</option>
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 rtl:right-auto rtl:left-2 top-3 pointer-events-none" />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Right Column: Oversized Mechanical Orb Centerpiece (5 cols) */}
          <div className="lg:col-span-5 relative flex items-center justify-center lg:justify-end mt-8 lg:mt-0">
            <div className="relative w-[340px] sm:w-[440px] md:w-[500px] lg:w-[580px] xl:w-[680px] 2xl:w-[740px] lg:-mr-16 xl:-mr-24 rtl:lg:-mr-0 rtl:lg:-ml-16 rtl:xl:-ml-24 pointer-events-none select-none transition-transform duration-700 hover:scale-[1.02]">
              <Image
                id="hero-mechanical-orb"
                src="/images/hero/jupiter-mechanical-orb.webp"
                alt="Jupiter Elevators Mechanical Engineering Orb"
                width={900}
                height={900}
                priority
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 70vw, 740px"
                className="w-full h-auto object-contain filter drop-shadow-[0_25px_50px_rgba(11,27,61,0.20)]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
