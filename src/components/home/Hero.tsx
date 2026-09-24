"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { companyData } from "@/data/company";
import { getPhotoIdWhatsAppUrl } from "@/lib/whatsapp";
import {
  Search,
  ArrowRight,
  ArrowLeft,
  Camera,
  Layers,
  Cpu,
  Compass,
  Zap,
  Play,
  Sliders,
  ShieldCheck,
} from "lucide-react";

interface CinematicScene {
  id: string;
  image: string;
  badge: { en: string; ar: string };
  title: { en: string; ar: string };
  subtitle: { en: string; ar: string };
}

const cinematicScenes: CinematicScene[] = [
  {
    id: "traction",
    image: "/images/hero/cinematic_traction_macro.jpg",
    badge: {
      en: "SCENE 01 // TRACTION & HOIST PROPULSION",
      ar: "المشهد 01 // منظومة الجر وحبال الرفع الفائقة",
    },
    title: {
      en: "Heavy-Duty Traction Sheaves & Steel Cables",
      ar: "طارات الجر المقساة وحبال الصلب المعتمدة",
    },
    subtitle: {
      en: "Precision-grooved sheaves and EN 12385 certified steel wire ropes ready for high-speed elevators.",
      ar: "طارات مصنعة بأعلى درجات الدقة وحبال صلب مطابقة للمواصفات الأوروبية للمصاعد فائقة السرعة.",
    },
  },
  {
    id: "architectural",
    image: "/images/hero/cinematic_glass_lift_ascent.jpg",
    badge: {
      en: "SCENE 02 // ARCHITECTURAL ELEVATION & CABINS",
      ar: "المشهد 02 // كبائن الركاب والارتفاع المعماري",
    },
    title: {
      en: "Panoramic Cabins & High-Speed Vertical Mobility",
      ar: "الكبائن البانورامية وأنظمة الحركة الرأسية",
    },
    subtitle: {
      en: "Supplying premier passenger lift components, safety gears, and landing entrances across the Kingdom.",
      ar: "توريد مكونات كبائن الركاب، أجهزة الأمان التدريجية، وأبواب الأدوار لكافة مشاريع المملكة.",
    },
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
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);

  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;
  const photoUrl = getPhotoIdWhatsAppUrl(locale);
  const currentScene = cinematicScenes[activeSceneIndex];

  // Auto-cycle scenes every 9 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSceneIndex((prev) => (prev + 1) % cinematicScenes.length);
    }, 9000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/catalog?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/catalog");
    }
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-between text-white overflow-hidden border-b border-slate-800 bg-[#040814]">
      {/* ─────────────────────────────────────────────────────────────
          1. FULL-BLEED CINEMATIC BACKGROUND WITH TRANSITION & OVERLAYS
      ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        {cinematicScenes.map((scene, idx) => (
          <div
            key={scene.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === activeSceneIndex ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
          >
            <Image
              src={scene.image}
              alt={scene.title[locale]}
              fill
              priority={idx === 0}
              className="object-cover object-center filter brightness-[0.72] contrast-[1.12]"
            />
          </div>
        ))}

        {/* Dramatic Cinematic Lighting Overlays */}
        {/* Top Fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#040814]/90 via-[#040814]/60 to-[#040814] pointer-events-none" />
        {/* Subtle Blueprint Technical Grid */}
        <div className="absolute inset-0 bg-blueprint-grid opacity-20 pointer-events-none" />
        {/* Warm Ambient Gold Spotlight */}
        <div className="absolute top-1/4 start-1/4 w-[600px] h-[350px] bg-brand-gold/15 rounded-full blur-[140px] pointer-events-none" />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. TOP HEADER HUD TICKER & SCENE CONTROLS
      ───────────────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-8 px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          
          {/* Official Verification Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-brand-gold/40 text-brand-gold text-xs font-mono tracking-wider shadow-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold text-white uppercase">
              {locale === "ar" ? "المستودع المركزي بالدمام" : "DAMMAM LOGISTICS HUB"}
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-brand-gold font-semibold">
              {locale === "ar" ? "شحن فوري لكافة مدن المملكة" : "SAME-DAY KSA DISPATCH"}
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">CR: {companyData.crNumber}</span>
          </div>

          {/* Interactive Scene Switcher HUD */}
          <div className="flex items-center gap-2 bg-slate-950/80 backdrop-blur-md p-1 rounded-xl border border-slate-800 text-[11px] font-mono">
            {cinematicScenes.map((scene, idx) => {
              const isActive = idx === activeSceneIndex;
              return (
                <button
                  key={scene.id}
                  onClick={() => setActiveSceneIndex(idx)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                    isActive
                      ? "bg-brand-gold text-slate-950 font-bold shadow-md"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isActive ? "bg-slate-950" : "bg-slate-600"
                    }`}
                  />
                  <span>0{idx + 1}</span>
                  <span className="hidden md:inline">
                    {idx === 0
                      ? locale === "ar"
                        ? "منظومة الجر"
                        : "TRACTION"
                      : locale === "ar"
                      ? "الكبائن المعمارية"
                      : "CABINS"}
                  </span>
                </button>
              );
            })}
          </div>

        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. MAIN HERO STAGE: ARCHITECTURAL HEADLINE & GLASS COMMAND HUB
      ───────────────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-5xl mx-auto w-full px-4 sm:px-8 py-12 text-center space-y-8">
        
        {/* Dynamic Scene Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-brand-gold text-xs font-mono tracking-widest uppercase animate-in fade-in duration-500">
          <Zap className="w-3.5 h-3.5 text-brand-gold" />
          <span>{currentScene.badge[locale]}</span>
        </div>

        {/* Grand Architectural Serif Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-serif tracking-tight leading-[1.12] text-white max-w-4xl mx-auto">
          {locale === "ar" ? (
            <>
              هندسة المصاعد الدقيقة: <br />
              <span className="text-gradient-gold">التوريد المباشر لقطع الغيار والمكونات بالمملكة</span>
            </>
          ) : (
            <>
              Engineered Vertical Mobility: <br />
              <span className="text-gradient-gold">Precision Elevator Spares In Saudi Arabia</span>
            </>
          )}
        </h1>

        {/* Narrative Subtitle */}
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto font-sans">
          {locale === "ar"
            ? "الاستيراد المباشر من كبرى مصانع المصاعد في الصين والهند. مستودعات مركزية بالدمام ومخزون فوري لأكثر من 10,000 صنف معتمد (EN 81 وSASO) يخدم مقاولي المصاعد وشركات الصيانة في كافة مدن المملكة."
            : "Direct factory sourcing from premier manufacturing hubs in China & India. Extensive Dammam warehouse inventory serving elevator contractors, OEMs, and facility management firms across Riyadh, Jeddah, and nationwide."}
        </p>

        {/* Glassmorphic Search & Command Bar */}
        <div className="pt-2 max-w-2xl mx-auto">
          <div className="relative bg-slate-950/85 backdrop-blur-xl rounded-2xl border-2 border-brand-gold/50 hover:border-brand-gold focus-within:border-brand-gold p-2 shadow-2xl transition-all">
            <div className="cad-corner-tl" />
            <div className="cad-corner-tr" />
            <div className="cad-corner-bl" />
            <div className="cad-corner-br" />

            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-5 h-5 text-brand-gold absolute start-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    locale === "ar"
                      ? "ابحث برقم القطعة (SKU)، اسم الموديل (NICE3000)، أو الماركة..."
                      : "Search by SKU, model (e.g. NICE3000+, VVVF), or OEM brand..."
                  }
                  className="w-full py-3 ps-11 pe-3 bg-transparent text-white placeholder-slate-400 text-sm font-medium focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-brand-gold hover:bg-brand-gold-dark text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shrink-0 shadow-lg shadow-brand-gold/20 font-mono"
              >
                <span>{locale === "ar" ? "فحص المخزون" : "LOOKUP"}</span>
                <ArrowIcon className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* Primary Direct CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-brand-gold hover:bg-brand-gold-dark text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-brand-gold/25 font-mono"
          >
            <Layers className="w-4 h-4" />
            <span>{locale === "ar" ? "استعراض الكتالوج الهندسي" : "EXPLORE CAD CATALOG"}</span>
          </Link>

          <a
            href={photoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-950/80 hover:bg-slate-900 text-slate-200 border border-slate-700/80 font-semibold text-xs transition-all font-mono backdrop-blur-md"
          >
            <Camera className="w-4 h-4 text-brand-gold" />
            <span>{t.hero.photoSupport}</span>
          </a>
        </div>

        {/* Fast Brand Compatibility Dock */}
        <div className="pt-4 space-y-2.5">
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center justify-center gap-2">
            <Cpu className="w-3.5 h-3.5 text-brand-gold" />
            <span>{locale === "ar" ? "توافق مباشر مع كبرى الماركات العالمية:" : "DIRECT OEM COMPATIBILITY LOOKUP:"}</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
            {majorBrands.map((brand) => (
              <Link
                key={brand.name}
                href={`/catalog?brand=${encodeURIComponent(brand.query)}`}
                className="px-3.5 py-1.5 rounded-lg bg-slate-950/80 hover:bg-brand-gold/20 border border-slate-800 hover:border-brand-gold text-slate-300 hover:text-brand-gold text-xs font-mono font-semibold transition-all backdrop-blur-md"
              >
                {brand.name}
              </Link>
            ))}
          </div>
        </div>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. LOWER CINEMATIC ENGINEERING METRICS HUD
      ───────────────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-8 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-white/10">
          
          <div className="bg-slate-950/70 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 relative overflow-hidden group hover:border-brand-gold/40 transition-all">
            <div className="cad-corner-tl" />
            <div className="text-[10px] font-mono text-slate-500 mb-1">SPEC-EXP-01</div>
            <div className="text-3xl font-black text-brand-gold font-mono tracking-tight">
              {t.hero.stats.experienceYears}
            </div>
            <div className="text-xs font-semibold text-slate-200 mt-1">{t.hero.stats.experienceLabel}</div>
            <div className="text-[10px] text-slate-500 font-mono mt-0.5">30+ Yrs Field Diagnostics</div>
          </div>

          <div className="bg-slate-950/70 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 relative overflow-hidden group hover:border-brand-gold/40 transition-all">
            <div className="cad-corner-tl" />
            <div className="text-[10px] font-mono text-slate-500 mb-1">STOCK-CAP-02</div>
            <div className="text-3xl font-black text-emerald-400 font-mono tracking-tight">
              {t.hero.stats.partsInStock}
            </div>
            <div className="text-xs font-semibold text-slate-200 mt-1">{t.hero.stats.partsLabel}</div>
            <div className="text-[10px] text-slate-500 font-mono mt-0.5">EN 81 & SASO Certified</div>
          </div>

          <div className="bg-slate-950/70 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 relative overflow-hidden group hover:border-brand-gold/40 transition-all">
            <div className="cad-corner-tl" />
            <div className="text-[10px] font-mono text-slate-500 mb-1">KSA-LOG-03</div>
            <div className="text-3xl font-black text-brand-gold font-mono tracking-tight">
              {t.hero.stats.coverage}
            </div>
            <div className="text-xs font-semibold text-slate-200 mt-1">{t.hero.stats.coverageLabel}</div>
            <div className="text-[10px] text-slate-500 font-mono mt-0.5">Dammam, Riyadh, Jeddah</div>
          </div>

          <div className="bg-slate-950/70 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 relative overflow-hidden group hover:border-brand-gold/40 transition-all">
            <div className="cad-corner-tl" />
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
