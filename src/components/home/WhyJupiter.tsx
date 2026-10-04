import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Clock,
  Award,
  Layers,
  FileCheck,
} from "lucide-react";
import type { Locale, Dictionary } from "@/lib/i18n";
import { SaudiLogisticsMap } from "./SaudiLogisticsMap";

interface WhyJupiterProps {
  lang: Locale;
  dict: Dictionary;
}

export function WhyJupiter({ lang }: WhyJupiterProps) {
  const isRtl = lang === "ar";

  const features = [
    {
      code: "01",
      title: isRtl ? "أكثر من 10 سنوات خبرة متخصصة" : "10+ Years of Industry Experience",
      desc: isRtl ? "توريد ودعم فني معتمد في السوق السعودي" : "Certified supply and engineering support across Saudi Arabia",
      icon: <Award className="w-5 h-5 text-[#C59341]" />,
    },
    {
      code: "02",
      title: isRtl ? "تغطية شاملة لكبرى الماركات العالمية" : "Wide Range of Elevator Brands",
      desc: isRtl ? "قطع غيار متوافقة وأصلية مع كبرى المصانع" : "Genuine & compatible parts for world-leading manufacturers",
      icon: <Layers className="w-5 h-5 text-[#C59341]" />,
    },
    {
      code: "03",
      title: isRtl ? "قطع أصلية ومطابقة لكود السلامة EN 81" : "Genuine & Certified Components",
      desc: isRtl ? "ضمان جودة المصنع ومعايير أمان معتمدة" : "Factory-guaranteed quality and verified life-safety compliance",
      icon: <ShieldCheck className="w-5 h-5 text-[#C59341]" />,
    },
    {
      code: "04",
      title: isRtl ? "شبكة إمداد سريعة ومخزون جاهز بالدمام" : "Fast Delivery from Dammam Hub",
      desc: isRtl ? "شحن سريع لكافة مناطق المملكة والخليج" : "Rapid dispatch across all Saudi regions and GCC destinations",
      icon: <Clock className="w-5 h-5 text-[#C59341]" />,
    },
    {
      code: "05",
      title: isRtl ? "دعم واستشارات فنية للمقاولين" : "Technical Support for Your Requirements",
      desc: isRtl ? "مساعدة فورية في مطابقة أرقام القطع والبدائل" : "Direct engineer assistance with part matching and alternatives",
      icon: <FileCheck className="w-5 h-5 text-[#C59341]" />,
    },
  ];

  return (
    <section className="py-14 md:py-20 overflow-hidden">
      <div className="max-w-7xl xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-10 items-center">
          {/* Left Column: Mission & Typography */}
          <div className="lg:col-span-3 space-y-5">
            <div className="flex items-center gap-3 text-xs font-mono font-bold tracking-wider text-slate-400 uppercase">
              <span className="text-slate-800">03</span>
              <span>WHY JUPITER</span>
              <div className="h-px w-12 bg-slate-200" />
            </div>

            <h2 className="text-3xl sm:text-4xl xl:text-5xl font-black text-slate-900 tracking-tight leading-[1.1] uppercase">
              <span>{isRtl ? "الدقـة" : "PRECISION"}</span>
              <br />
              <span>{isRtl ? "في كل" : "IN EVERY"}</span>
              <br />
              <span className="text-[#C59341]">{isRtl ? "مُكـوّن." : "COMPONENT."}</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              {isRtl
                ? "توفر جوبيتر للمصاعد قطع غيار مصاعد عالية الجودة لعمليات التركيب والصيانة والتحديث. نتعاون مع كبرى الشركات العالمية لنضمن لك أعلى درجات الموثوقية والسلامة والأداء."
                : "Jupiter Elevators supplies high-quality elevator spare parts for installation, maintenance and modernization. We work with leading global brands to ensure reliability, safety and performance."}
            </p>

            <div className="pt-2">
              <Link
                href={`/${lang}/about`}
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-900 hover:text-[#C59341] transition-colors group"
              >
                <span>{isRtl ? "عن الشركة" : "About Us"}</span>
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Center Column: High-Impact 3D Saudi Logistics Network Map */}
          <div className="lg:col-span-6 flex justify-center my-6 lg:my-0 w-full">
            <SaudiLogisticsMap lang={lang} />
          </div>

          {/* Right Column: 5 Feature Items */}
          <div className="lg:col-span-3 space-y-3">
            {features.map((item, idx) => (
              <div
                key={idx}
                className="relative overflow-hidden flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/90 hover:border-[#C59341]/60 transition-all duration-300 shadow-2xs hover:shadow-xs group"
              >
                {/* Pure CSS Micro-Dot Texture Layer */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-30 group-hover:opacity-50 transition-opacity duration-300"
                  style={{
                    backgroundImage: "radial-gradient(#94a3b8 0.75px, transparent 0.75px)",
                    backgroundSize: "12px 12px",
                  }}
                  aria-hidden="true"
                />

                {/* Pure CSS Ambient Warm Golden Corner Bleed */}
                <div
                  className="absolute inset-0 pointer-events-none bg-gradient-to-br from-amber-500/[0.05] via-transparent to-amber-500/[0.02] group-hover:from-amber-500/[0.10] transition-colors duration-300"
                  aria-hidden="true"
                />

                {/* Ghosted Engineering Serial Watermark in Background */}
                <div
                  className="absolute -bottom-2.5 right-2 rtl:right-auto rtl:left-2 pointer-events-none select-none font-mono font-black text-3xl sm:text-4xl text-slate-900/[0.04] group-hover:text-[#C59341]/[0.12] transition-colors duration-300 leading-none tracking-tighter"
                  aria-hidden="true"
                >
                  {item.code}
                </div>

                {/* Content */}
                <div className="relative z-10 w-9 h-9 rounded-xl bg-amber-50/90 group-hover:bg-[#C59341] border border-amber-200/60 flex items-center justify-center shrink-0 transition-colors shadow-2xs">
                  <div className="group-hover:text-white transition-colors">
                    {item.icon}
                  </div>
                </div>
                <div className="relative z-10 flex-1 min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight group-hover:text-slate-950 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
