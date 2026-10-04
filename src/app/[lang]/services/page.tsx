import React from "react";
import Image from "next/image";
import type { Metadata } from "next";
import { isValidLocale, defaultLocale, getDictionary, type Locale } from "@/lib/i18n";
import { CardTexture } from "@/components/ui/card-texture";
import {
  PackageCheck,
  Search,
  FileCheck,
  AlertTriangle,
  Zap,
  MessageCircle,
  ShieldCheck,
  Camera,
  Clock,
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
    alternates: getLocalizedAlternates(validLocale, "/services"),
    title: dict.nav.services,
    description: dict.services.subtitle,
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const validLocale: Locale = isValidLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(validLocale);
  const isRtl = validLocale === "ar";

  const servicesList = [
    {
      code: "01",
      id: "sourcing",
      badge: "GLOBAL OEM SOURCING",
      image: "/images/services/sourcing.jpg",
      icon: <PackageCheck className="w-6 h-6 text-[#C59341]" />,
      title: dict.services.sourcingTitle,
      desc: dict.services.sourcingDesc,
      details: isRtl
        ? "نوفر شبكة استيراد وتوريد مباشرة تربطنا بأكبر مصنعي قطع المصاعد في الهند والصين. نلتزم بفحص كل شحنة والتأكد من مطابقتها التامة لمواصفات المصعد المطلوبة مع سرعة الشحن والتخليص الجمركي في موانئ المملكة."
        : "We maintain direct manufacturing supply pipelines connecting our Saudi clients with premier certified component manufacturers in India and China, ensuring rapid freight customs clearance and strict quality inspection.",
      sla: isRtl ? "شحن دولي وسريع" : "DIRECT FACTORY IMPORT",
      variant: "blueprint" as const,
    },
    {
      code: "02",
      id: "identification",
      badge: "ENGINEERING DESK",
      image: "/images/services/photo-matching.jpg",
      icon: <Search className="w-6 h-6 text-[#C59341]" />,
      title: dict.services.identificationTitle,
      desc: dict.services.identificationDesc,
      details: isRtl
        ? "يواجه الفنيون في المواقع صعوبة عند تلف أو محو بيانات القطع القديمة. نوفر خدمة هندسية فورية عبر واتساب للتعرف على كروت التحكم، محركات الأبواب، والمكابح من خلال الصور ولوحات البيانات واقتراح البدائل المعتمدة."
        : "Our engineering desk assists on-site technicians with photograph-based identification of unbranded or obsolete control boards, door motors, and safety mechanisms to suggest tested, modern drop-in replacements.",
      sla: isRtl ? "مطابقة فورية بالصور" : "< 15 MIN PHOTO MATCH",
      variant: "product" as const,
    },
    {
      code: "03",
      id: "amc",
      badge: "B2B CONTRACTS",
      image: "/images/services/amc-consumables.jpg",
      icon: <FileCheck className="w-6 h-6 text-[#C59341]" />,
      title: dict.services.amcTitle,
      desc: dict.services.amcDesc,
      details: isRtl
        ? "نقدم لشركات صيانة المصاعد وإدارة المرافق اتفاقيات توريد دورية للقطع الاستهلاكية (البكرات، السيور، الزيوت، البطانات) بأسعار خاصة مجدولة تضمن استقرار ميزانيات الصيانة وعدم توقف المصاعد."
        : "Structured supply agreements for elevator maintenance firms and facility management operators covering high-wear consumables (rollers, belts, shoes, liners) with pre-negotiated commercial pricing and delivery schedules.",
      sla: isRtl ? "أسعار جملة مجدولة" : "SCHEDULED WHOLESALE",
      variant: "process" as const,
    },
    {
      code: "04",
      id: "emergency",
      badge: "PRIORITY LIFELINE",
      image: "/images/services/emergency-dispatch.jpg",
      icon: <AlertTriangle className="w-6 h-6 text-rose-500" />,
      title: dict.services.emergencyTitle,
      desc: dict.services.emergencyDesc,
      details: isRtl
        ? "خدمة أولوية خاصة بالمستشفيات، الفنادق، والأبراج التجارية والسكنية الحيوية لتجهيز وشحن قطع الغيار الحرجة في أسرع وقت ممكن لإنهاء الأعطال المفاجئة."
        : "Emergency priority dispatch for commercial towers, hotels, and residential complexes requiring urgent spare parts to terminate unexpected elevator downtime.",
      sla: isRtl ? "جاهزية طوارئ 24/7" : "24/7 DOWNTIME TERMINATION",
      variant: "blueprint" as const,
    },
    {
      code: "05",
      id: "modernization",
      badge: "RETROFIT & UPGRADES",
      image: "/images/services/modernization-vvvf.jpg",
      icon: <Zap className="w-6 h-6 text-[#C59341]" />,
      title: dict.services.modernizationTitle,
      desc: dict.services.modernizationDesc,
      details: isRtl
        ? "استشارات هندسية متخصصة لترقية أنظمة التحكم القديمة إلى لوحات ذكية بتقنية VVVF الموفرة للطاقة، وتحويل مشغلات الأبواب اليدوية أو الميكانيكية القديمة إلى أنظمة أوتوماتيكية هادئة."
        : "Consulting on modernizing legacy elevator controllers to energy-efficient VVVF microprocessor systems and upgrading obsolete door operators to modern, silent variable-frequency drives.",
      sla: isRtl ? "ترقية VVVF وأنظمة ذكية" : "VVVF SYSTEM UPGRADE",
      variant: "dots" as const,
    },
  ];

  return (
    <div className="py-10 sm:py-16 bg-transparent min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <section>
          <div className="flex items-center gap-3 text-xs font-mono font-bold tracking-wider text-slate-400 uppercase mb-3">
            <span className="text-slate-800">01</span>
            <span>ENGINEERING & TECHNICAL SERVICES</span>
            <div className="h-px w-16 bg-slate-200" />
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                {dict.services.title}
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
                {dict.services.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-slate-500 bg-white border border-slate-200 px-3.5 py-2 rounded-xl shrink-0 shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-[#C59341]" />
              <span>EN 81 & SASO COMPLIANT DESK</span>
            </div>
          </div>
        </section>

        {/* Services Bento List */}
        <section className="space-y-5">
          {servicesList.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-2xs relative overflow-hidden group hover:border-[#C59341]/60 transition-all duration-300"
            >
              <CardTexture variant={service.variant} watermark={`SRV | ${service.code}`} />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* Visual Thumbnail */}
                <div className="lg:col-span-3">
                  <div className="relative w-full h-[150px] sm:h-[160px] rounded-xl overflow-hidden border border-slate-200/90 shadow-2xs group-hover:shadow-xs transition-shadow">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-2 left-2 rtl:left-auto rtl:right-2 z-10">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-900/80 backdrop-blur-xs text-white">
                        {service.code} | TRACK
                      </span>
                    </div>
                  </div>
                </div>

                {/* Header & Title Column */}
                <div className="lg:col-span-3 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200/80 uppercase">
                      {service.badge}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    {service.title}
                  </h3>
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold text-[#C59341]">
                    <Clock className="w-3 h-3" />
                    <span>{service.sla}</span>
                  </div>
                </div>

                {/* Middle Description Column */}
                <div className="lg:col-span-4 text-xs sm:text-sm text-slate-600 leading-relaxed border-t lg:border-t-0 lg:border-l lg:rtl:border-l-0 lg:rtl:border-r border-slate-100 pt-3 lg:pt-0 lg:pl-6 lg:rtl:pl-0 lg:rtl:pr-6">
                  <p className="font-semibold text-slate-800 mb-1">{service.desc}</p>
                  <p className="text-slate-500 leading-relaxed text-xs">{service.details}</p>
                </div>

                {/* Right Action Column */}
                <div className="lg:col-span-2 flex lg:justify-end gap-2 pt-2 lg:pt-0">
                  <a
                    href={`https://wa.me/966562614370?text=${encodeURIComponent(
                      isRtl
                        ? `السلام عليكم، أود طلب استشارة أو خدمة بخصوص: ${service.title}`
                        : `Hello, I would like to inquire about: ${service.title}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full lg:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono font-bold transition-all shadow-xs"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#C59341]" />
                    <span>{isRtl ? "طلب الخدمة" : "INQUIRE"}</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Technician Snap & Send Support Card */}
        <section>
          <div className="flex items-center gap-3 text-xs font-mono font-bold tracking-wider text-slate-400 uppercase mb-3">
            <span className="text-slate-800">02</span>
            <span>FIELD TECHNICIAN INSTANT MATCHING</span>
            <div className="h-px w-16 bg-slate-200" />
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 sm:p-10 text-white shadow-md relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />

            <div className="flex items-center gap-5 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-[#C59341] shrink-0">
                <Camera className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-mono text-[#C59341] font-bold block mb-1">
                  WHATSAPP ENGINEERING HOTLINE | 24H RESPONSE
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {isRtl ? "هل أنت فني في الموقع وتحتاج مطابقة سريعة؟" : "Are you an on-site technician needing immediate matching?"}
                </h3>
                <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
                  {isRtl
                    ? "التقط صورة للوحة بيانات المحرك، كارت الكنترول، أو آلية الأبواب التالفة وأرسلها لفريقنا الفني للمطابقة السريعة وتأكيد توفر البديل."
                    : "Send a clear photo of the motor plate, control board, or door mechanism to our engineering desk for immediate compatibility check."}
                </p>
              </div>
            </div>

            <a
              href="https://wa.me/966562614370"
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs shrink-0 shadow-md transition-colors"
            >
              <MessageCircle className="w-4 h-4 fill-white text-transparent" />
              <span>{dict.hero.quickWhatsApp}</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

