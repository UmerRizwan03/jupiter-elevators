import React from "react";
import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { isValidLocale, defaultLocale, getDictionary, type Locale } from "@/lib/i18n";
import { JupiterLogo } from "@/components/common/JupiterLogo";
import { HoistwayAnatomy } from "@/components/about/HoistwayAnatomy";
import { AboutScrollAnimations } from "@/components/about/AboutScrollAnimations";
import { LineCardModal } from "@/components/catalog/LineCardModal";
import { PageHero } from "@/components/layout/PageHero";
import {
  ArrowRight,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { getLocalizedAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const validLocale: Locale = isValidLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(validLocale);

  return {
    alternates: getLocalizedAlternates(validLocale, "/about"),
    title: dict.nav.about,
    description: dict.brand.tagline,
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const validLocale: Locale = isValidLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(validLocale);
  const isRtl = validLocale === "ar";

  const operationalLedger = [
    {
      num: "01",
      title: {
        en: "Permanent Shelf Depth & Heavy Tonnage",
        ar: "عمق المخزون الاستراتيجي والأوزان الثقيلة",
      },
      summary: {
        en: "Over 48 sub-assemblies permanently warehoused in Dammam—from 5m machined guide rails and PMSM gearless machines to microelectronic VVVF drive cards—ready for immediate job-site loading.",
        ar: "أكثر من 48 فئة فرعية مخزنة بشكل دائم في مستودع الدمام، تشمل سكك التوجيه المشغولة، محركات الجيرلس المتزامنة، وكروت الإنفرتر الإلكترونية جاهزة للتحميل الفوري.",
      },
      metric: "48+ SKUs",
      metricLabel: { en: "Stock Lines", ar: "فئات بالمستودع" },
    },
    {
      num: "02",
      title: {
        en: "In-House Electronic & Bench Testing",
        ar: "فحص إلكتروني وميكانيكي على منصات الاختبار",
      },
      summary: {
        en: "Dielectric withstand testing, oscilloscope pulse-frequency verification, and parameter pre-staging for Monarch and STEP controllers before handover, guaranteeing zero out-of-box failure.",
        ar: "اختبارات عزل الجهد الكهربائي، فحص نبضات الإنكودر براسم الإشارة، وضبط معايير التشغيل للوحات مونارك وستيب قبل التسليم للمقاول لضمان خلوها من أي عيب مصنعي.",
      },
      metric: "0% D.O.A",
      metricLabel: { en: "Defect Rate", ar: "نسبة الأعطال" },
    },
    {
      num: "03",
      title: {
        en: "Factory-Direct Tier-1 Partnerships",
        ar: "قنوات توريد مباشرة من كبرى المصانع المعتمدة",
      },
      summary: {
        en: "Contracted direct supply lines in Spain, Germany, India, and China (Fermator, Wittur, Blain, TorinDrive), eliminating layered broker markups and ensuring 100% genuine component provenance.",
        ar: "عقود توريد مباشرة مع كبرى المصانع العالمية في إسبانيا وألمانيا والهند والصين، مما يلغي هوامش الوسطاء ويضمن أصالة القطع 100%.",
      },
      metric: "100%",
      metricLabel: { en: "OEM Genuine", ar: "قطع أصلية معتمدة" },
    },
    {
      num: "04",
      title: {
        en: "Hot-Shot KSA Logistics Network",
        ar: "أسطول شحن فوري لإنهاء توقف المباني",
      },
      summary: {
        en: "Positioned adjacent to Dammam Port and King Fahd International Airport: <4h emergency delivery in Eastern Province, and same-day carrier dispatch across Riyadh, Western, and Southern regions.",
        ar: "موقع استراتيجي قرب ميناء الملك عبدالعزيز ومطار الدمام: تسليم خلال أقل من 4 ساعات بحاضرة الدمام، وشحن سريع خلال 24 ساعة لكافة مدن المملكة.",
      },
      metric: "< 4h SLA",
      metricLabel: { en: "Eastern Province", ar: "المنطقة الشرقية" },
    },
  ];

  const milestones = [
    {
      year: "2018",
      phase: "PHASE 01",
      title: {
        en: "Industrial Foundation in Dammam",
        ar: "التأسيس وانطلاق التوريد التخصصي للمصاعد",
      },
      description: {
        en: "Establishment of Space Industrial Contracting Co., deploying specialized procurement operations dedicated strictly to elevator maintenance firms and modernization projects in Eastern Saudi Arabia.",
        ar: "تأسيس شركة سبيس للمقاولات الصناعية وبدء العمليات التخصصية لتوريد مكونات المصاعد لشركات الصيانة ومشاريع التحديث في المنطقة الشرقية.",
      },
    },
    {
      year: "2020",
      phase: "PHASE 02",
      title: {
        en: "Central High-Bay Hub & Diagnostic Lab",
        ar: "تدشين المستودع المركزي عالي التخزين ومختبر الفحص",
      },
      description: {
        en: "Inauguration of our dedicated spare parts distribution facility in Dammam, introducing climate-controlled storage for microelectronics and in-house safety gear testing.",
        ar: "تدشين المستودع المركزي لقطع الغيار في الدمام، وتجهيز أقسام التخزين المكيف للوحات الإلكترونية ومنصات الفحص الميداني.",
      },
    },
    {
      year: "2023",
      phase: "PHASE 03",
      title: {
        en: "Tier-1 OEM Direct Manufacturing Pipelines",
        ar: "شراكات توريد مباشرة مع كبرى المصانع العالمية",
      },
      description: {
        en: "Execution of long-term direct factory agreements with global manufacturers (Monarch, Fermator, Wittur, TorinDrive), securing stable wholesale inventory.",
        ar: "توقيع اتفاقيات توريد مباشرة وطويلة الأمد مع كبرى المصانع العالمية لتوفير سلاسل إمداد مستقرة بدون وسطاء وبأفضل الأسعار.",
      },
    },
    {
      year: "2026",
      phase: "PHASE 04",
      title: {
        en: "Digital Procurement Platform & 48-Part Catalog",
        ar: "المنصة الرقمية وشبكة التوزيع الوطنية",
      },
      description: {
        en: "Deployment of our high-speed technical parts catalog across 48 sub-assemblies, same-day freight routing, and instant WhatsApp engineering consultation.",
        ar: "إطلاق الكتالوج الهندسي الرقمي الشامل لـ 48 فئة قطع غيار معتمدة، وتفعيل مسارات الشحن السريع لكافة مناطق المملكة.",
      },
    },
  ];

  return (
    <div data-about-page className="bg-transparent text-slate-900 min-h-screen pb-24">
      <AboutScrollAnimations />
      
      <PageHero
        image="/images/about/about-hero-bg.jpg"
        imageWebp="/images/about/about-hero-bg.webp"
        imageAlt="Jupiter Elevators Diagnostic Rig & Engineering Heritage"
        eyebrow="OFFICIAL CORPORATE DOSSIER"
        badge={
          <span className="px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 text-slate-300 font-mono text-xs hidden sm:flex items-center gap-1.5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            SPACE INDUSTRIAL CONT. CO.
          </span>
        }
        action={<LineCardModal lang={validLocale} />}
        title={isRtl ? "من نحن" : "About"}
        subtitle={
          isRtl
            ? "شريان منظومة المصاعد في المملكة العربية السعودية | مستودع الدمام المركزي"
            : "The Artery of the Vertical Fleet | Dammam Central Distribution Hub"
        }
      />

      {/* ========================================================================= */}
      {/* 2. UNBOXED CREDENTIALS RIBBON (NO BULKY CARD) */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="border-b border-slate-200 pb-6 flex flex-wrap items-center justify-between gap-6 text-xs font-mono text-slate-700">
          <div className="flex flex-wrap items-center gap-6 sm:gap-10">
            <div className="flex items-center gap-2.5">
              <JupiterLogo mode="mark" size="sm" />
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">LEGAL ENTITY</span>
                <strong className="text-slate-950 font-bold">{dict.brand.legalName}</strong>
              </div>
            </div>

            <div className="h-6 w-px bg-slate-200 hidden md:block" />

            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">COMMERCIAL REG.</span>
              <strong className="text-slate-950 font-bold">
                {dict.brand.cr.replace(/CR:\s*/i, "CR ")}
              </strong>
            </div>

            <div className="h-6 w-px bg-slate-200 hidden lg:block" />

            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">TAX IDENTIFIER</span>
              <strong className="text-slate-950 font-bold">
                {dict.brand.vat.replace(/VAT:\s*/i, "VAT ")}
              </strong>
            </div>

            <div className="h-6 w-px bg-slate-200 hidden xl:block" />

            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">ESTABLISHED</span>
              <strong className="text-slate-950 font-bold">2018 | DAMMAM</strong>
            </div>
          </div>

          <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>DAMMAM HUB ACTIVE | &lt; 4H DISPATCH SLA</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. MAIN UNBOXED EDITORIAL MONOGRAPH (ZERO CARD SOUP) */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-24 sm:space-y-32">
        
        {/* ========================================================================= */}
        {/* CHAPTER 01: THE ARITHMETIC OF DOWNTIME (WHY FOUNDED) */}
        {/* ========================================================================= */}
        <section className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            {/* Left Index Column */}
            <div className="lg:col-span-4 space-y-2">
              <span className="text-xs font-mono font-bold text-[#C59341] uppercase tracking-widest block">
                CHAPTER | 01
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                {isRtl ? "حسابات فترات التوقف" : "The Arithmetic of Elevator Downtime"}
              </h2>
              <p className="text-xs font-mono text-slate-400 uppercase tracking-wider pt-1">
                FOUNDING MANDATE | DAMMAM 2018
              </p>
            </div>

            {/* Right Narrative Column (Unboxed, Pure Typography) */}
            <div className="lg:col-span-8 space-y-8">
              <blockquote data-about-reveal className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-snug">
                {isRtl ? (
                  <>
                    &ldquo;70% من أعطال المصاعد في الخليج سببها قطع استهلاكية دقيقة..{" "}
                    <span className="text-[#C59341]">تنتظر 4 أسابيع للشحن الخارجي.</span>&rdquo;
                  </>
                ) : (
                  <>
                    &ldquo;70% of elevator outages in the Gulf are caused by small consumable parts..{" "}
                    <span className="text-[#C59341]">stuck 4 weeks away on European air freight.</span>&rdquo;
                  </>
                )}
              </blockquote>

              <p data-about-reveal className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
                {isRtl
                  ? "في الأبراج السكنية والمستشفيات والمراكز التجارية، لا يتوقف المصعد عادةً بسبب انهيار ميكانيكي هائل، بل بسبب بكرة باب متآكلة، أو دايود تالف في الستارة الضوئية، أو كونتاكتور مساعد محروق. النموذج القديم القائم على استيراد القطعة بعد حدوث العطل يكلف ملاك المباني أسابيع من التوقف وخسارة ثقة السكان. تأسست جوبيتر للمصاعد لكسر هذا الاحتكار اللوجستي وتأمين كافة المكونات فورياً من مستودع الدمام."
                  : "In residential towers, hospitals, and commercial properties, elevators rarely fail due to cataclysmic structural damage. They stop because of a worn polyurethane door roller, a degraded photodiode in a light curtain, or an oxidized auxiliary contactor. The obsolete practice of ordering parts from Europe or Asia after an outage occurs leads to weeks of costly building paralysis. Jupiter Elevators was engineered specifically to break that supply chain bottleneck through dedicated in-country inventory."}
              </p>

              {/* Unboxed Comparative Logistics Metrics Strip */}
              <div data-about-stagger className="pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                    OVERSEAS IMPORT DELAY
                  </span>
                  <span className="text-2xl font-mono font-bold text-rose-500 block">21 - 45 DAYS</span>
                  <p className="text-xs text-slate-500">
                    {isRtl ? "انتظار الشحن والتخليص الجمركي" : "Airfreight backorders & customs delay"}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                    JUPITER READY DISPATCH
                  </span>
                  <span className="text-2xl font-mono font-black text-emerald-600 block">&lt; 4 HOURS</span>
                  <p className="text-xs text-slate-500">
                    {isRtl ? "تسليم فوري من مستودع الدمام" : "Direct pickup / van dispatch in Eastern Prov."}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                    KSA NATIONWIDE SLA
                  </span>
                  <span className="text-2xl font-mono font-bold text-[#C59341] block">24 HOURS</span>
                  <p className="text-xs text-slate-500">
                    {isRtl ? "شحن بري سريع لكافة المدن" : "Express freight to Riyadh, Jeddah & all regions"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* CHAPTER 02: VERTICAL HOISTWAY ANATOMY (UNBOXED ARCHITECTURAL EXPLORER) */}
        {/* ========================================================================= */}
        <section className="border-t border-slate-300 pt-12 space-y-6">
          <div data-about-reveal className="flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold text-[#C59341] uppercase tracking-widest block">
                CHAPTER | 02
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                {isRtl
                  ? "تشريح عمود المصعد: معالجة فترات التوقف عند نقاط الخطر"
                  : "The Anatomy of Zero Downtime: Preempting Critical Shaft Failure"}
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              HOISTWAY SPEC | 4 ELEVATIONS
            </span>
          </div>

          <p data-about-reveal className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
            {isRtl
              ? "تتوزع أكثر من 48 مجموعة ميكانيكية وإلكترونية على امتداد بئر المصعد. نحتفظ في مستودع الدمام بمخزون فوري مسبق الفحص لكل مكون استهلاكي معرض للتلف لمنع توقف الأبراج والمباني."
              : "Over 48 mechanical and electronic sub-assemblies operate along the vertical hoistway. We maintain bench-tested, pre-cleared stock in Dammam for every high-wear failure vector."}
          </p>

          <div data-about-reveal>
            <HoistwayAnatomy lang={validLocale} isRtl={isRtl} />
          </div>
        </section>

        {/* ========================================================================= */}
        {/* CHAPTER 03: THE 4 OPERATIONAL COMMITMENTS (UNBOXED SPEC LEDGER) */}
        {/* ========================================================================= */}
        <section className="border-t border-slate-300 pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            {/* Left Index Column */}
            <div className="lg:col-span-4 space-y-2">
              <span className="text-xs font-mono font-bold text-[#C59341] uppercase tracking-widest block">
                CHAPTER | 03
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                {isRtl ? "الالتزامات التشغيلية" : "Operational Commitments"}
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed pt-1">
                {isRtl
                  ? "معايير هندسية صارمة تحكم كل خطوة من الاستيراد المباشر وحتى التسليم الميداني."
                  : "Rigorous engineering standards governing our supply pipeline from factory floor to job site."}
              </p>
            </div>

            {/* Right Column: Architectural Spec Ledger Table (Zero Cards!) */}
            <div data-about-stagger className="lg:col-span-8 divide-y divide-slate-200 border-t border-b border-slate-200">
              {operationalLedger.map((row) => (
                <div
                  key={row.num}
                  className="py-6 sm:py-8 grid grid-cols-1 sm:grid-cols-12 gap-4 items-start group"
                >
                  {/* Number */}
                  <div className="sm:col-span-2">
                    <span className="font-mono text-2xl sm:text-3xl font-black text-slate-300 group-hover:text-[#C59341] transition-colors">
                      {row.num}.
                    </span>
                  </div>

                  {/* Title & Summary */}
                  <div className="sm:col-span-7 space-y-1.5">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-950 tracking-tight">
                      {row.title[isRtl ? "ar" : "en"]}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {row.summary[isRtl ? "ar" : "en"]}
                    </p>
                  </div>

                  {/* Right Metric */}
                  <div className="sm:col-span-3 sm:text-end pt-2 sm:pt-0">
                    <span className="font-mono text-xl sm:text-2xl font-black text-slate-950 block">
                      {row.metric}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                      {row.metricLabel[isRtl ? "ar" : "en"]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* CHAPTER 04: QUALITY TESTING BENCH & SUPPLY CORRIDOR (ARCHITECTURAL PLATES) */}
        {/* ========================================================================= */}
        <section className="border-t border-slate-300 pt-12 space-y-8">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold text-[#C59341] uppercase tracking-widest block">
                CHAPTER | 04
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                {isRtl
                  ? "المختبر الفني وقنوات الشحن المباشرة"
                  : "In-House Diagnostic Lab & Global Freight Corridors"}
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              FACILITY VERIFICATION | 26°26&apos;N
            </span>
          </div>

          <div data-about-stagger className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Plate: In-House Diagnostic Bench */}
            <div className="space-y-4">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 border border-slate-200">
                <Image
                  src="/images/about/quality-bench.jpg"
                  alt="Precision Electronic Bench Testing"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                  <span>[FIG. 01] 1,000V DIELECTRIC BENCH &amp; OSCILLOSCOPE RIG</span>
                  <span>ZERO D.O.A.</span>
                </div>
                <h3 className="text-xl font-bold text-slate-950 tracking-tight">
                  {isRtl
                    ? "فحص كل كارت ومغير سرعة قبل خروجه للموقع"
                    : "Zero Dead-on-Arrival Components: Strict Pre-Dispatch Staging"}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {isRtl
                    ? "قبل تسليم أي لوحة تحكم متكاملة أو كارت أبواب، تخضع القطعة لفحص دقيق براسم الإشارة ومقاييس العزل للتأكد من سلامة المعالج والريليهات، مما يوفر على مهندسي الصيانة ساعات ثمينة في مواقع العمل."
                    : "Before any integrated controller, drive inverter, or safety switch leaves our facility, technicians verify pulse trains, relay response times, and coil insulation resistance using digital diagnostic benches—guaranteeing 100% plug-and-play field reliability."}
                </p>
              </div>
            </div>

            {/* Right Plate: Global Logistics Artery Map */}
            <div className="space-y-4">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950 border border-slate-900 flex items-center justify-center p-6">
                <Image
                  src="/images/saudi-distribution-map-2x.webp"
                  alt="Saudi Arabia Elevator Logistics Distribution Map"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain object-center opacity-80"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                  <span>[FIG. 02] DIRECT SUPPLY ARTERY: FACTORIES TO 13 KSA PROVINCES</span>
                  <span>PORT: SA DMM</span>
                </div>
                <h3 className="text-xl font-bold text-slate-950 tracking-tight">
                  {isRtl
                    ? "من المصانع العالمية المعتمدة مباشرة إلى مشاريع المملكة"
                    : "Direct Freight Pipeline: From Global Plants to Saudi Shafts"}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {isRtl
                    ? "ترتبط جوبيتر بقنوات شحن بحري وجوي مباشرة من المصانع المعتمدة في سرقسطة وشتوتغارت ونينغبو وتشيناي إلى ميناء الملك عبدالعزيز ومطار الدمام، ومنها عبر أسطول التوزيع البري إلى مقاولي المصاعد في 13 منطقة إدارية."
                    : "Jupiter operates dedicated freight corridors connecting Tier-1 European and Asian manufacturing plants directly into King Abdulaziz Port and Dammam Air Cargo, routed seamlessly to MEP contractors across all 13 Saudi administrative regions."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* CHAPTER 05: INFRASTRUCTURE CHRONOLOGY LEDGER (2018 - 2026) */}
        {/* ========================================================================= */}
        <section className="border-t border-slate-300 pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            {/* Left Index Column */}
            <div className="lg:col-span-4 space-y-2">
              <span className="text-xs font-mono font-bold text-[#C59341] uppercase tracking-widest block">
                CHAPTER | 05
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                {isRtl ? "التسلسل الزمني للبنية التحتية" : "Infrastructure Evolution Ledger"}
              </h2>
              <p className="text-xs font-mono text-slate-400 uppercase tracking-wider pt-1">
                CHRONOLOGY | 2018 - 2026
              </p>
            </div>

            {/* Right Column: Clean Monograph Timeline (Zero Cards) */}
            <div data-about-stagger className="lg:col-span-8 divide-y divide-slate-200 border-t border-b border-slate-200">
              {milestones.map((m) => (
                <div
                  key={m.year}
                  className="py-6 sm:py-8 grid grid-cols-1 sm:grid-cols-12 gap-4 items-baseline group"
                >
                  <div className="sm:col-span-3">
                    <span className="font-mono text-3xl sm:text-4xl font-black text-slate-900 group-hover:text-[#C59341] transition-colors block">
                      {m.year}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mt-1">
                      {m.phase}
                    </span>
                  </div>

                  <div className="sm:col-span-9 space-y-2">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-950 tracking-tight">
                      {m.title[isRtl ? "ar" : "en"]}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {m.description[isRtl ? "ar" : "en"]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* CHAPTER 06: OFFICIAL PROCUREMENT DESK (UNBOXED CTA STATEMENT) */}
        {/* ========================================================================= */}
        <section className="border-t border-slate-300 pt-12 pb-6">
          <div data-about-reveal className="space-y-6">
            <div className="space-y-2 max-w-3xl">
              <span className="text-xs font-mono font-bold text-[#C59341] uppercase tracking-widest block">
                PROCUREMENT DESK | DAMMAM CENTRAL HUB
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
                {isRtl
                  ? "فتح حساب توريد هندسي لمؤسستك أو طلب تسعير فوري"
                  : "Establish a Wholesale Contractor Supply Line or Request an RFQ"}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed pt-2">
                {isRtl
                  ? "تواصل مباشرة مع مهندسينا في مستودع الدمام للحصول على عروض أسعار الجملة، أو مطابقة القطع النادرة من لوحة البيانات، أو جدولة الشحن الفوري لمشاريعك في كافة مناطق المملكة."
                  : "Connect directly with our engineering desk in Dammam for contract wholesale rates, instant part matching from nameplate photos, or emergency dispatch scheduling across Saudi Arabia."}
              </p>
            </div>

            {/* Direct Contact Details Strip */}
            <div className="flex flex-wrap items-center gap-6 sm:gap-10 py-6 border-y border-slate-200 text-xs sm:text-sm font-mono text-slate-800">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C59341]" />
                <span>Dammam Central Hub | Eastern Province</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C59341]" />
                <a href="tel:+966562614370" dir="ltr" className="hover:text-[#C59341] transition-colors">+966 562614370</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C59341]" />
                <a href="mailto:elevatorsjupiter@gmail.com" className="hover:text-[#C59341] transition-colors">elevatorsjupiter@gmail.com</a>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
              <Link
                href={`/${validLocale}/catalog`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-slate-950 hover:bg-slate-900 text-white text-xs font-mono font-bold uppercase tracking-widest transition-all group"
              >
                <span>{isRtl ? "استعراض الكتالوج الفني (48 منتج)" : "EXPLORE 48-PART CATALOG"}</span>
                <ArrowRight className="w-4 h-4 text-[#C59341] group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
              </Link>
              <Link
                href={`/${validLocale}/contact`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-slate-50 border border-slate-300 text-slate-950 text-xs font-mono font-bold uppercase tracking-widest transition-all"
              >
                <span>{isRtl ? "التواصل مع المكتب الهندسي" : "CONNECT WITH ENGINEERING"}</span>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

