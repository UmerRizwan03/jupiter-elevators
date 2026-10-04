"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import type { Locale } from "@/lib/i18n";

interface SaudiLogisticsMapProps {
  lang: Locale;
}

interface CityPin {
  id: string;
  nameEn: string;
  nameAr: string;
  x: number; // Viewbox x out of 1024
  y: number; // Viewbox y out of 682
  left: string; // Hotspot left
  top: string; // Hotspot top
  badgeLeft: string; // Exact badge left
  badgeTop: string; // Exact badge top
  isHQ?: boolean;
  beamHeight: number; // height in px
  descEn: string;
  descAr: string;
}

// Precise coordinates mapped to the 3D isometric perspective and text badge positions
const CITIES: CityPin[] = [
  {
    id: "dammam",
    nameEn: "DAMMAM",
    nameAr: "الدمام",
    x: 665.4,
    y: 215.1,
    left: "64.98%",
    top: "31.54%",
    badgeLeft: "69.2%",
    badgeTop: "33.2%",
    isHQ: true,
    beamHeight: 110,
    descEn: "Jupiter Central Logistics Hub • Same-Day Dispatch",
    descAr: "المقر الرئيسي والمستودع المركزي • شحن فوري",
  },
  {
    id: "riyadh",
    nameEn: "RIYADH",
    nameAr: "الرياض",
    x: 572.2,
    y: 319.6,
    left: "55.88%",
    top: "46.86%",
    badgeLeft: "60.5%",
    badgeTop: "45.8%",
    beamHeight: 150,
    descEn: "Capital Express Hub • < 12h Transit",
    descAr: "مركز الإمداد السريع • توصيل خلال 12 ساعة",
  },
  {
    id: "makkah",
    nameEn: "MAKKAH",
    nameAr: "مكة المكرمة",
    x: 337.3,
    y: 391.4,
    left: "32.94%",
    top: "57.39%",
    badgeLeft: "35.2%",
    badgeTop: "55.4%",
    beamHeight: 120,
    descEn: "Western Region Depot • < 24h Transit",
    descAr: "مركز المنطقة الغربية • وصول خلال 24 ساعة",
  },
  {
    id: "jeddah",
    nameEn: "JEDDAH",
    nameAr: "جدة",
    x: 285.0,
    y: 385.0,
    left: "27.83%",
    top: "56.45%",
    badgeLeft: "26.0%",
    badgeTop: "56.4%",
    beamHeight: 95,
    descEn: "Red Sea Commercial Port Hub",
    descAr: "مركز الميناء التجاري ومصاعد الأبراج",
  },
  {
    id: "madinah",
    nameEn: "MADINAH",
    nameAr: "المدينة المنورة",
    x: 296.2,
    y: 277.1,
    left: "28.93%",
    top: "40.63%",
    badgeLeft: "32.5%",
    badgeTop: "39.8%",
    beamHeight: 90,
    descEn: "Regional Hub • OEM Certified Spares",
    descAr: "مركز التوريد الإقليمي • قطع معتمدة",
  },
  {
    id: "jubail",
    nameEn: "JUBAIL",
    nameAr: "الجبيل",
    x: 665.4,
    y: 185.0,
    left: "64.98%",
    top: "27.13%",
    badgeLeft: "66.8%",
    badgeTop: "27.2%",
    beamHeight: 75,
    descEn: "Industrial Sector Parts & Motors",
    descAr: "دعم المنشآت الصناعية والمحركات",
  },
  {
    id: "al-ahsa",
    nameEn: "AL AHSA",
    nameAr: "الأحساء",
    x: 695.6,
    y: 293.2,
    left: "67.93%",
    top: "42.99%",
    badgeLeft: "71.0%",
    badgeTop: "42.4%",
    beamHeight: 80,
    descEn: "Eastern Oasis Corridor Support",
    descAr: "خدمة وتوريد واحة الأحساء",
  },
  {
    id: "tabuk",
    nameEn: "TABUK",
    nameAr: "تبوك",
    x: 213.2,
    y: 164.9,
    left: "20.82%",
    top: "24.18%",
    badgeLeft: "23.4%",
    badgeTop: "23.6%",
    beamHeight: 100,
    descEn: "Northern Frontier & NEOM Coverage",
    descAr: "تغطية المنطقة الشمالية ومشاريع نيوم",
  },
  {
    id: "arar",
    nameEn: "ARAR",
    nameAr: "عرعر",
    x: 411.7,
    y: 69.0,
    left: "40.21%",
    top: "10.12%",
    badgeLeft: "42.5%",
    badgeTop: "10.0%",
    beamHeight: 85,
    descEn: "Northern Border Distribution",
    descAr: "إمداد الحدود الشمالية",
  },
  {
    id: "al-jawf",
    nameEn: "AL JAWF",
    nameAr: "الجوف",
    x: 315.4,
    y: 141.4,
    left: "30.80%",
    top: "20.73%",
    badgeLeft: "33.6%",
    badgeTop: "20.0%",
    beamHeight: 80,
    descEn: "North-West Transit Hub",
    descAr: "محطة الإمداد للشمال الغربي",
  },
  {
    id: "hail",
    nameEn: "HAIL",
    nameAr: "حائل",
    x: 409.9,
    y: 196.8,
    left: "40.03%",
    top: "28.86%",
    badgeLeft: "42.4%",
    badgeTop: "27.4%",
    beamHeight: 80,
    descEn: "North-Central Junction Hub",
    descAr: "نقطة الوصل للشمال والوسط",
  },
  {
    id: "taif",
    nameEn: "TAIF",
    nameAr: "الطائف",
    x: 376.0,
    y: 422.0,
    left: "36.72%",
    top: "61.88%",
    badgeLeft: "38.6%",
    badgeTop: "61.2%",
    beamHeight: 75,
    descEn: "Mountain & Resort Elevator Service",
    descAr: "خدمة مصاعد المنتجعات والمرتفعات",
  },
  {
    id: "abha",
    nameEn: "ABHA",
    nameAr: "أبها",
    x: 438.1,
    y: 522.1,
    left: "42.78%",
    top: "76.55%",
    badgeLeft: "45.6%",
    badgeTop: "76.2%",
    beamHeight: 85,
    descEn: "Southern Province Hub",
    descAr: "مركز الإمداد بالمنطقة الجنوبية",
  },
  {
    id: "jizan",
    nameEn: "JIZAN",
    nameAr: "جازان",
    x: 451.9,
    y: 589.3,
    left: "44.13%",
    top: "86.41%",
    badgeLeft: "46.5%",
    badgeTop: "85.8%",
    beamHeight: 80,
    descEn: "South Red Sea Commercial Transit",
    descAr: "توريد الساحل الجنوبي الغربي",
  },
  {
    id: "najran",
    nameEn: "NAJRAN",
    nameAr: "نجران",
    x: 594.4,
    y: 555.3,
    left: "58.05%",
    top: "81.42%",
    badgeLeft: "60.5%",
    badgeTop: "80.5%",
    beamHeight: 85,
    descEn: "Southern Border Region Dispatch",
    descAr: "إمداد وتوزيع منطقة نجران",
  },
];

// Transit routes precisely matching the highway corridors in the 3D map
const LOGISTICS_ROUTES = [
  // Dammam HQ -> Riyadh
  { d: "M 665.4 215.1 Q 610 260 572.2 319.6", dur: "2.4s" },
  // Riyadh -> Makkah
  { d: "M 572.2 319.6 Q 440 340 337.3 391.4", dur: "2.8s" },
  // Makkah -> Jeddah
  { d: "M 337.3 391.4 L 285.0 385.0", dur: "1.2s" },
  // Makkah -> Taif
  { d: "M 337.3 391.4 L 376.0 422.0", dur: "1.3s" },
  // Riyadh -> Madinah
  { d: "M 572.2 319.6 Q 420 280 296.2 277.1", dur: "2.6s" },
  // Madinah -> Tabuk
  { d: "M 296.2 277.1 Q 240 210 213.2 164.9", dur: "2.3s" },
  // Dammam -> Jubail
  { d: "M 665.4 215.1 L 665.4 185.0", dur: "1.1s" },
  // Dammam -> Al Ahsa
  { d: "M 665.4 215.1 Q 690 250 695.6 293.2", dur: "1.4s" },
  // Riyadh -> Hail
  { d: "M 572.2 319.6 Q 480 240 409.9 196.8", dur: "2.5s" },
  // Hail -> Al Jawf
  { d: "M 409.9 196.8 Q 350 160 315.4 141.4", dur: "1.8s" },
  // Hail -> Arar
  { d: "M 409.9 196.8 Q 420 120 411.7 69.0", dur: "2.0s" },
  // Riyadh -> Abha
  { d: "M 572.2 319.6 Q 510 430 438.1 522.1", dur: "2.7s" },
  // Abha -> Jizan
  { d: "M 438.1 522.1 L 451.9 589.3", dur: "1.2s" },
  // Riyadh -> Najran
  { d: "M 572.2 319.6 Q 600 450 594.4 555.3", dur: "2.5s" },
];

export function SaudiLogisticsMap({ lang }: SaudiLogisticsMapProps) {
  const isRtl = lang === "ar";
  const [hoveredCity, setHoveredCity] = useState<CityPin | null>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isHoveringMap, setIsHoveringMap] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Smooth mouse tilt handler
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x, y });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHoveringMap(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHoveringMap(false);
    setMouseOffset({ x: 0, y: 0 });
    setHoveredCity(null);
  }, []);

  // Compute 3D tilt angles (subtle & elegant)
  const rotateX = isHoveringMap ? mouseOffset.y * -10 : 0;
  const rotateY = isHoveringMap ? mouseOffset.x * 12 : 0;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[880px] xl:max-w-[980px] flex items-center justify-center select-none group perspective-[1400px]"
    >
      {/* Dynamic Golden Ambient Backlight */}
      <div
        className="absolute inset-0 m-auto w-96 h-80 sm:w-[620px] sm:h-[460px] bg-gradient-to-tr from-amber-400/25 via-[#C59341]/15 to-transparent rounded-full blur-3xl pointer-events-none -z-10 transition-all duration-700 ease-out opacity-75 group-hover:opacity-100"
        style={{
          transform: `translate3d(${mouseOffset.x * -20}px, ${mouseOffset.y * -20}px, 0)`,
        }}
        aria-hidden="true"
      />

      {/* 3D Tilted Spatial Canvas Container */}
      <div
        className="relative z-10 w-full aspect-[2048/1364] transition-transform duration-300 ease-out"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Layer 0: The Ultrarealistic 3D Base Plate with Enhanced Edge Contrast */}
        <div className="absolute inset-0 w-full h-full" style={{ transform: "translateZ(0px)" }}>
          <Image
            src="/images/saudi-distribution-map-2x.webp"
            alt={
              isRtl
                ? "خريطة تفاعلية لتوزيع قطع غيار المصاعد في المملكة العربية السعودية - جوبيتر للمصاعد"
                : "Ultrarealistic 3D Saudi Arabia Elevator Spare Parts Distribution Network Map - Jupiter Elevators"
            }
            width={2048}
            height={1364}
            priority
            unoptimized
            className="w-full h-full object-contain filter drop-shadow-[0_25px_50px_rgba(197,147,65,0.22)]"
          />
        </div>

        {/* Layer 1: Animated Living Logistics Laser Corridors (SVG Overlay) */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ transform: "translateZ(12px)" }}
        >
          <svg viewBox="0 0 1024 682" className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="laserGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#FFE082" />
              </linearGradient>

              <filter id="routeGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Pulsing Sonar Ripple emanating from Dammam Central Hub */}
            <circle cx="665.4" cy="215.1" r="16" fill="none" stroke="#F59E0B" strokeWidth="1.5" opacity="0.8">
              <animate attributeName="r" values="8;50;85" dur="3.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.8;0.3;0" dur="3.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="665.4" cy="215.1" r="10" fill="none" stroke="#C59341" strokeWidth="1.8" opacity="0.9">
              <animate attributeName="r" values="5;30;60" dur="3.5s" begin="1.2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.9;0.4;0" dur="3.5s" begin="1.2s" repeatCount="indefinite" />
            </circle>

            {/* Active Moving Laser Routes */}
            {LOGISTICS_ROUTES.map((route, i) => (
              <g key={i}>
                <path
                  d={route.d}
                  fill="none"
                  stroke="url(#laserGold)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeDasharray="12 28"
                  filter="url(#routeGlow)"
                  opacity="0.85"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="100"
                    to="0"
                    dur={route.dur}
                    repeatCount="indefinite"
                  />
                </path>
                <circle r="3.2" fill="#FFFFFF" filter="url(#routeGlow)">
                  <animateMotion path={route.d} dur={route.dur} repeatCount="indefinite" rotate="auto" />
                </circle>
              </g>
            ))}
          </svg>
        </div>

        {/* Layer 2: Volumetric Breathing Vertical Light Beams (Floating translateZ 24px) */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ transform: "translateZ(24px)", transformStyle: "preserve-3d" }}
        >
          {CITIES.map((city) => {
            const isHQ = city.isHQ;
            const isHovered = hoveredCity?.id === city.id;

            return (
              <div
                key={`beam-${city.id}`}
                className="absolute -translate-x-1/2 bottom-0 flex flex-col items-center pointer-events-none transition-all duration-500"
                style={{
                  left: city.left,
                  top: city.top,
                }}
              >
                {/* Vertical Laser Beam */}
                <div
                  className={`w-[2px] -translate-y-full origin-bottom rounded-full transition-all duration-500 ${
                    isHQ
                      ? "bg-gradient-to-t from-amber-400 via-amber-300/80 to-transparent shadow-[0_0_12px_#F59E0B]"
                      : isHovered
                      ? "bg-gradient-to-t from-amber-300 via-amber-200/90 to-transparent shadow-[0_0_10px_#F59E0B]"
                      : "bg-gradient-to-t from-amber-400/60 via-amber-300/40 to-transparent"
                  }`}
                  style={{
                    height: isHovered ? `${city.beamHeight * 1.3}px` : `${city.beamHeight}px`,
                    opacity: isHovered ? 1 : isHQ ? 0.9 : 0.65,
                    animation: isHQ ? "pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite" : undefined,
                  }}
                />
                <div
                  className={`w-4 h-2 -mt-1 rounded-full blur-[2px] transition-all duration-300 ${
                    isHQ || isHovered ? "bg-amber-300/70 scale-125" : "bg-amber-400/30"
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* Layer 3: Ultra-Crisp Native Vector City Pill Badges (Floating translateZ 32px) */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ transform: "translateZ(32px)", transformStyle: "preserve-3d" }}
        >
          {CITIES.map((city) => {
            const isHQ = city.isHQ;
            const isHovered = hoveredCity?.id === city.id;

            return (
              <div
                key={`badge-${city.id}`}
                className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer transition-transform duration-200"
                style={{
                  left: city.badgeLeft,
                  top: city.badgeTop,
                  transform: isHovered ? "translate(-50%, -50%) scale(1.08)" : "translate(-50%, -50%)",
                }}
                onMouseEnter={() => setHoveredCity(city)}
                onMouseLeave={() => setHoveredCity(null)}
              >
                {/* 100% Crisp Vector Label with Native Hardware Typography */}
                <div
                  className={`px-1.5 py-[1px] sm:px-2 sm:py-0.5 rounded-[4px] border shadow-[0_2px_5px_rgba(0,0,0,0.18)] transition-all duration-200 ${
                    isHQ
                      ? "bg-amber-500 text-slate-950 font-black border-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                      : isHovered
                      ? "bg-white text-slate-950 font-black border-amber-400 ring-2 ring-amber-400/50"
                      : "bg-white/95 text-slate-900 font-extrabold border-slate-200/90"
                  }`}
                >
                  <span className="text-[8px] sm:text-[9.5px] md:text-[10.5px] font-sans tracking-wide leading-none select-none uppercase block">
                    {isRtl ? city.nameAr : city.nameEn}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Layer 4: Interactive City Hotspots & Hover Tooltips (Floating translateZ 45px) */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ transform: "translateZ(45px)", transformStyle: "preserve-3d" }}
        >
          {CITIES.map((city) => {
            const isHQ = city.isHQ;
            const isHovered = hoveredCity?.id === city.id;

            return (
              <div
                key={`pin-${city.id}`}
                className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer z-40 group/pin"
                style={{ left: city.left, top: city.top }}
                onMouseEnter={() => setHoveredCity(city)}
                onMouseLeave={() => setHoveredCity(null)}
                tabIndex={0}
                role="button"
                aria-label={city.nameEn}
              >
                {/* HQ Concentric Halo Rings */}
                {isHQ && (
                  <>
                    <span className="absolute -inset-4 rounded-full bg-amber-400/25 animate-ping pointer-events-none" />
                    <span className="absolute -inset-2.5 rounded-full border border-amber-400/80 animate-pulse pointer-events-none" />
                  </>
                )}

                {/* Major City Pulsing Indicators */}
                {(city.id === "riyadh" || city.id === "makkah") && !isHQ && (
                  <span className="absolute -inset-3 rounded-full bg-amber-400/20 animate-ping pointer-events-none" />
                )}

                {/* Touch/Click Target Dot */}
                <div className="w-7 h-7 -m-2 rounded-full flex items-center justify-center">
                  <div
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      isHQ
                        ? "bg-white ring-4 ring-[#C59341] shadow-[0_0_16px_#F59E0B] scale-110"
                        : isHovered
                        ? "bg-white ring-2 ring-amber-400 shadow-[0_0_12px_#F59E0B] scale-125"
                        : "bg-transparent group-hover/pin:bg-amber-300 group-hover/pin:ring-2 group-hover/pin:ring-amber-400"
                    }`}
                  />
                </div>

                {/* Floating Glassmorphism Telemetry Tooltip */}
                {isHovered && (
                  <div
                    className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 whitespace-nowrap z-50 pointer-events-none animate-in fade-in zoom-in-95 duration-200"
                    style={{ transform: "translate3d(-50%, -6px, 20px)" }}
                  >
                    <div className="px-3.5 py-2 rounded-2xl bg-slate-950/95 border border-amber-500/50 shadow-[0_15px_35px_rgba(0,0,0,0.8)] backdrop-blur-xl text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <span className="text-xs sm:text-sm font-bold text-white tracking-wide">
                          {isRtl ? city.nameAr : city.nameEn}
                        </span>
                        {isHQ && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-[#C59341] text-slate-950 uppercase shadow-xs">
                            CENTRAL HUB
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] sm:text-[11px] text-amber-300 font-mono mt-1 font-medium">
                        {isRtl ? city.descAr : city.descEn}
                      </p>
                    </div>
                    {/* Tooltip Arrow */}
                    <div className="w-2.5 h-2.5 bg-slate-950 border-r border-b border-amber-500/50 rotate-45 mx-auto -mt-1.5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
