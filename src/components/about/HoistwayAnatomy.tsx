"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";

interface HoistwayAnatomyProps {
  lang: string;
  isRtl: boolean;
}

interface ShaftZone {
  id: string;
  code: string;
  level: string;
  elevationMeters: string;
  name: { en: string; ar: string };
  categorySlug: string;
  failureVectors: { en: string; ar: string };
  dammamSolution: { en: string; ar: string };
  metrics: { label: { en: string; ar: string }; value: string }[];
  highlightItems: { en: string; ar: string }[];
}

export function HoistwayAnatomy({ lang, isRtl }: HoistwayAnatomyProps) {
  const [activeZoneId, setActiveZoneId] = useState<string>("zone-machine-room");

  const zones: ShaftZone[] = [
    {
      id: "zone-machine-room",
      code: "ZONE 01",
      level: "PH | ROOF",
      elevationMeters: "+45.00 M",
      name: {
        en: "Machine Room & Traction Penthouse",
        ar: "غرفة المحرك وأنظمة الجر والتحكم",
      },
      categorySlug: "elevator-controllers",
      failureVectors: {
        en: "Thermal stress on IGBT drive inverters, auxiliary contactor pitting, brake coil insulation breakdown, and encoder pulse drift under high ambient Saudi temperatures.",
        ar: "الإجهاد الحراري لوحدات الإنفرتر IGBT، تآكل نقاط تلامس الكونتاكتورات المساعدة، وانهيار عزل ملفات الفرامل وانحراف إشارة الإنكودر بسبب حرارة الصيف المرتفعة.",
      },
      dammamSolution: {
        en: "Immediate off-the-shelf dispatch of pre-tested Monarch NICE3000+, STEP F5021 controllers, Schneider contactors, and TorinDrive GTW7 gearless machines.",
        ar: "جاهزية فورية للتسليم الفوري للوحات مونارك NICE3000+، كروت ستيب F5021، كونتاكتورات شنايدر المعتمدة، ومحركات تورين درايف عديمة التروس.",
      },
      metrics: [
        { label: { en: "Power Range", ar: "نطاق القدرة" }, value: "5.5 - 22 kW" },
        { label: { en: "Operating Temp", ar: "حرارة التشغيل" }, value: "Up to 55°C" },
        { label: { en: "Stock SLA", ar: "مهلة التسليم" }, value: "< 4h Local" },
      ],
      highlightItems: [
        { en: "Monarch NICE3000+ Inverter Controllers", ar: "لوحات تحكم متكاملة مونارك NICE3000+" },
        { en: "TorinDrive GTW7 PMSM Gearless Machines", ar: "محركات جيرلس مغناطيسية تورين درايف" },
        { en: "Dual-Plunger 110V DC Brake Assemblies", ar: "أطقم ملفات فرامل مزدوجة 110 فولت" },
        { en: "Schneider Heavy Safety Contactors", ar: "كونتاكتورات أمان ثقيلة شنايدر" },
      ],
    },
    {
      id: "zone-car-top",
      code: "ZONE 02",
      level: "MID | CAR TOP",
      elevationMeters: "+22.50 M",
      name: {
        en: "Car Top & Kinetic Door Mechanics",
        ar: "سقف الكابينة ومشغلات الأبواب الحركية",
      },
      categorySlug: "door-operators",
      failureVectors: {
        en: "Worn polyurethane roller treads causing door binding, shredded synchronous belts from misaligned tracks, and burned door motor DC driver cards.",
        ar: "تآكل عجلات البولي يوريثان مسبباً انحشار الأبواب، تمزق سيور التوقيت المسننة، واحتراق كروت التحكم لمحركات الأبواب المستمرة.",
      },
      dammamSolution: {
        en: "Complete Fermator 40/10 VVVF and Wittur Hydra Plus operators, 65mm 95 Shore A replacement rollers, and HTD 8M high-torque belts in ready stock.",
        ar: "مشغلات أبواب فيرماتور 40/10 وويتر هيدرا بلس متغيرة السرعة، عجلات 65 مم فائقة المقاومة، وسيور توقيت HTD 8M جاهزة للتسليم المباشر.",
      },
      metrics: [
        { label: { en: "Cycle Rating", ar: "معدل الدورات" }, value: "2.5M Cycles" },
        { label: { en: "Roller Hardness", ar: "صلابة البكرات" }, value: "95 Shore A" },
        { label: { en: "EN Standard", ar: "المعيار المعتمد" }, value: "EN 81-20/50" },
      ],
      highlightItems: [
        { en: "Fermator 40/10 VVVF Telescopic Drives", ar: "مشغلات أبواب تلسكوبية فيرماتور 40/10" },
        { en: "Wittur Hydra Plus Center-Opening Drives", ar: "مشغلات أبواب سنتر ويتر هيدرا بلس" },
        { en: "65mm PU Ball-Bearing Door Rollers", ar: "بكرات أبواب بولي يوريثان 65 مم مع رمان بلي" },
        { en: "HTD 8M Synchronous Toothed Belts", ar: "سيور توقيت مسننة عالية العزم HTD 8M" },
      ],
    },
    {
      id: "zone-shaftway",
      code: "ZONE 03",
      level: "SHAFT | LANDINGS",
      elevationMeters: "+12.00 M",
      name: {
        en: "Shaftway, Optical Safety & Landing Entrances",
        ar: "بئر المصعد وأبواب الأعتاب وحواجز السلامة",
      },
      categorySlug: "sensors-switches",
      failureVectors: {
        en: "Blown infrared diodes in door light curtains causing door re-opening loops, oxidized landing interlock contacts tripping safety circuits, and failed leveling switches.",
        ar: "تعطل دايودات الستائر الضوئية مسبباً تكرار فتح الأبواب، أكسدة نقاط تلامس كوالين الأبواب قاطعاً دائرة الأمان، وتلف حساسات الليفل المغناطيسية.",
      },
      dammamSolution: {
        en: "WECO 917A 128-beam multi-sensor infrared curtains, CE-certified EN 81-20 fire-rated door locks, and bi-stable magnetic leveling switches.",
        ar: "ستائر ضوئية 128 شعاع WECO 917A، كوالين أبواب معتمدة EN 81-20 ضد الحريق، ومفاتيح مغناطيسية ثنائية الاستقرار للوقوف الدقيق.",
      },
      metrics: [
        { label: { en: "Beam Density", ar: "كثافة الأشعة" }, value: "128 Beams" },
        { label: { en: "Fire Rating", ar: "مقاومة الحريق" }, value: "E120 / EW60" },
        { label: { en: "Response Time", ar: "زمن الاستجابة" }, value: "< 45 ms" },
      ],
      highlightItems: [
        { en: "WECO 917A 128-Beam Light Curtains", ar: "ستائر ضوئية متعددة الأشعة WECO 917A" },
        { en: "EN 81-20 Electromechanical Interlocks", ar: "أقفال كوالين أبواب إلكتروميكانيكية معتمدة" },
        { en: "Bi-Stable Magnetic Floor Leveling Switches", ar: "حساسات ليفل مغناطيسية ثنائية الاستقرار" },
        { en: "Extruded Aluminum Landing Sill Tracks", ar: "أعتاب ألومنيوم مسحوب عالية المتانة" },
      ],
    },
    {
      id: "zone-pit",
      code: "ZONE 04",
      level: "PIT | BASE",
      elevationMeters: "-03.50 M",
      name: {
        en: "Shaft Pit, Governors & Life-Safety Arrest",
        ar: "بئر المصعد، منظمات السرعة، وفرامل الطوارئ",
      },
      categorySlug: "safety-gear",
      failureVectors: {
        en: "Slack governor wire ropes tripping car switches, seized safety gear wedge blocks, and degraded hydraulic buffer seals leaking fluid in damp pits.",
        ar: "ارتخاء وايرات منظم السرعة مسبباً فصل الدائرة، انحشار فكوك براشوت الأمان، وتلف جوانات مصدات الزيت الهيدروليكية في قاع البئر.",
      },
      dammamSolution: {
        en: "Heavy-duty EN 81 hydraulic oil buffers, bi-directional centrifugal governors, weighted tension pulleys, and progressive safety gears (up to 3,000kg).",
        ar: "مصدات زيت هيدروليكية معتمدة، منظمات سرعة طاردة مركزية ثنائية الاتجاه، أثقال شد واير المنظم، وبراشوت أمان متدرج حتى 3000 كجم.",
      },
      metrics: [
        { label: { en: "Arrest Load", ar: "حمولة الأمان" }, value: "Up to 3,000 kg" },
        { label: { en: "Rated Speed", ar: "السرعة القصوى" }, value: "Up to 3.5 m/s" },
        { label: { en: "Compliance", ar: "المطابقة" }, value: "EN 81-20/50" },
      ],
      highlightItems: [
        { en: "Progressive Safety Gear Pairs (3000 kg)", ar: "أزواج براشوت أمان متدرج حمولة 3000 كجم" },
        { en: "Centrifugal Bi-Directional Overspeed Governors", ar: "منظمات سرعة طاردة مركزية ثنائية الاتجاه" },
        { en: "Heavy-Duty EN 81 Hydraulic Oil Buffers", ar: "مصدات هيدروليكية زيتية معتمدة EN 81" },
        { en: "Weighted Pit Tension Pulley Assemblies", ar: "بكرات شد واير المنظم المزودة بأثقال ومفتاح أمان" },
      ],
    },
  ];

  const activeZone = zones.find((z) => z.id === activeZoneId) || zones[0];

  return (
    <div className="pt-6">
      {/* Interactive Hoistway Blueprint Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Vertical Shaft Zone Wayfinding (Unboxed Elevation Index) */}
        <div className="lg:col-span-4 border-t border-slate-300 pt-4">
          <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center justify-between">
            <span>{isRtl ? "محطة الارتفاع" : "HOISTWAY ELEVATIONS"}</span>
            <span className="text-[#C59341]">4 ZONES</span>
          </div>

          <div className="divide-y divide-slate-200">
            {zones.map((zone) => {
              const isActive = zone.id === activeZoneId;
              return (
                <button
                  key={zone.id}
                  onClick={() => setActiveZoneId(zone.id)}
                  className={`text-start w-full py-4 transition-colors group flex items-start justify-between gap-4 ${
                    isActive ? "text-slate-950 font-bold" : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-mono tracking-wider ${
                          isActive
                            ? "text-[#C59341] font-bold"
                            : "text-slate-400 group-hover:text-slate-600"
                        }`}
                      >
                        {zone.code}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        [{zone.elevationMeters}]
                      </span>
                    </div>

                    <h4
                      className={`text-sm sm:text-base leading-snug ${
                        isActive ? "text-slate-950 font-bold" : "text-slate-700"
                      }`}
                    >
                      {zone.name[isRtl ? "ar" : "en"]}
                    </h4>
                  </div>

                  <span
                    className={`shrink-0 mt-1 w-2 h-2 rounded-full transition-transform ${
                      isActive
                        ? "bg-[#C59341] scale-125"
                        : "bg-slate-300 group-hover:bg-slate-400"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Unboxed Architectural Dossier */}
        <div className="lg:col-span-8 border-t border-slate-300 pt-4 space-y-6">
          {/* Header row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div className="space-y-1">
              <span className="text-[11px] font-mono font-bold text-[#C59341] uppercase tracking-widest block">
                {activeZone.code} | ELEVATION {activeZone.elevationMeters} | {activeZone.level}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {activeZone.name[isRtl ? "ar" : "en"]}
              </h3>
            </div>

            <Link
              href={`/${lang}/catalog?category=${activeZone.categorySlug}`}
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-900 hover:text-[#C59341] transition-colors group"
            >
              <span>{isRtl ? "استعراض قطع هذا القطاع بالكتالوج" : "EXPLORE ZONE IN CATALOG"}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#C59341] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* Dual Threat & Solution Columns (Unboxed, pure typography & rules) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-2">
            {/* Failure Vectors */}
            <div className="space-y-2 border-l-2 rtl:border-l-0 rtl:border-r-2 border-rose-400 pl-4 rtl:pl-0 rtl:pr-4">
              <div className="flex items-center gap-2 text-[11px] font-mono font-bold text-rose-700 uppercase tracking-wider">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
                <span>{isRtl ? "نواقل العطل الميدانية" : "FIELD FAILURE VECTORS"}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {activeZone.failureVectors[isRtl ? "ar" : "en"]}
              </p>
            </div>

            {/* Dammam Shelf Solution */}
            <div className="space-y-2 border-l-2 rtl:border-l-0 rtl:border-r-2 border-emerald-500 pl-4 rtl:pl-0 rtl:pr-4">
              <div className="flex items-center gap-2 text-[11px] font-mono font-bold text-emerald-800 uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{isRtl ? "جاهزية مستودع الدمام" : "DAMMAM SHELF READINESS"}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {activeZone.dammamSolution[isRtl ? "ar" : "en"]}
              </p>
            </div>
          </div>

          {/* Technical Spec Ledger Strip */}
          <div className="grid grid-cols-3 gap-6 py-4 border-y border-slate-200">
            {activeZone.metrics.map((m, i) => (
              <div key={i} className="space-y-0.5">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                  {m.label[isRtl ? "ar" : "en"]}
                </span>
                <span className="text-lg sm:text-xl font-mono font-black text-slate-900 block">
                  {m.value}
                </span>
              </div>
            ))}
          </div>

          {/* Ready Components Checklist (Unboxed) */}
          <div className="space-y-3 pt-2">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest block">
              {isRtl ? "المكونات المعتمدة الجاهزة فوراً:" : "VERIFIED IMMEDIATE STOCK FOR THIS ELEVATION:"}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-xs">
              {activeZone.highlightItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 py-1 text-slate-700 font-medium"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C59341] shrink-0" />
                  <span className="truncate">{item[isRtl ? "ar" : "en"]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
