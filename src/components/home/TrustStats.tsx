import React from "react";
import { ShieldCheck, Award } from "lucide-react";
import type { Locale, Dictionary } from "@/lib/i18n";

interface TrustStatsProps {
  lang: Locale;
  dict: Dictionary;
}

export function TrustStats({ lang, dict }: TrustStatsProps) {
  const isRtl = lang === "ar";

  const stats = [
    {
      value: dict.trust.yearsExperience,
      label: dict.trust.yearsExperienceLabel,
      subtext: isRtl ? "في قطاع هندسة وصيانة المصاعد" : "In lift engineering & technical maintenance",
    },
    {
      value: dict.trust.logisticsYears,
      label: dict.trust.logisticsYearsLabel,
      subtext: isRtl ? "في الاستيراد والتخزين من الهند والصين" : "In international sourcing and warehousing",
    },
    {
      value: dict.trust.categoriesCount,
      label: dict.trust.categoriesLabel,
      subtext: isRtl ? "تغطي كافة متطلبات مصاعد الركاب والبضائع" : "Covering all passenger & freight lift components",
    },
    {
      value: dict.trust.genuineParts,
      label: dict.trust.genuinePartsLabel,
      subtext: isRtl ? "مطابقة لمواصفات السلامة EN 81 وكود البناء" : "EN 81 certified life-safety compliance",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-brand-navy text-xs font-bold mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-amber" />
            <span>{isRtl ? "الثقة والموثوقية المؤسسية" : "Institutional Trust & Reliability"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-navy tracking-tight">
            {dict.trust.title}
          </h2>
          <p className="mt-3 text-sm text-slate-500 leading-relaxed">
            {dict.trust.subtitle}
          </p>
        </div>

        {/* 4 Big Numbers (Inspired by Slide 5 & 9) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-50 border border-slate-200 p-7 rounded-2xl flex flex-col justify-between hover:border-brand-amber/60 hover:shadow-md transition-all group"
            >
              <div>
                <span className="text-4xl sm:text-5xl font-black tracking-tight text-brand-navy group-hover:text-brand-amber transition-colors">
                  {item.value}
                </span>
                <h3 className="text-sm font-bold text-slate-800 mt-2">
                  {item.label}
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-4 pt-3 border-t border-slate-200">
                {item.subtext}
              </p>
            </div>
          ))}
        </div>

        {/* Legal Entity Trust Banner */}
        <div className="mt-12 bg-slate-100/70 border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left rtl:md:text-right">
            <div className="w-14 h-14 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-xs">
              <Award className="w-7 h-7 text-brand-amber" />
            </div>
            <div>
              <h4 className="text-base font-bold text-brand-navy">
                {dict.brand.legalName}
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                {isRtl
                  ? "كيان نظامي مرخص في المملكة العربية السعودية بسجل تجاري معتمد ورقم ضريبي ساري"
                  : "Officially registered enterprise in Saudi Arabia with verified CR and VAT registrations"}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <span className="px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-mono font-bold text-slate-800">
              {dict.brand.cr}
            </span>
            <span className="px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-mono font-bold text-slate-800">
              {dict.brand.vat}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
