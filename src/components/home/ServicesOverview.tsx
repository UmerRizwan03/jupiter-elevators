import React from "react";
import Link from "next/link";
import {
  PackageCheck,
  Search,
  FileCheck,
  AlertTriangle,
  ArrowUpRight,
  Zap,
} from "lucide-react";
import type { Locale, Dictionary } from "@/lib/i18n";

interface ServicesOverviewProps {
  lang: Locale;
  dict: Dictionary;
}

export function ServicesOverview({ lang, dict }: ServicesOverviewProps) {
  const isRtl = lang === "ar";

  const services = [
    {
      title: dict.services.sourcingTitle,
      desc: dict.services.sourcingDesc,
      icon: <PackageCheck className="w-6 h-6 text-brand-amber" />,
    },
    {
      title: dict.services.identificationTitle,
      desc: dict.services.identificationDesc,
      icon: <Search className="w-6 h-6 text-brand-amber" />,
    },
    {
      title: dict.services.amcTitle,
      desc: dict.services.amcDesc,
      icon: <FileCheck className="w-6 h-6 text-brand-amber" />,
    },
    {
      title: dict.services.emergencyTitle,
      desc: dict.services.emergencyDesc,
      icon: <AlertTriangle className="w-6 h-6 text-rose-500" />,
    },
    {
      title: dict.services.modernizationTitle,
      desc: dict.services.modernizationDesc,
      icon: <Zap className="w-6 h-6 text-brand-amber" />,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-brand-navy text-xs font-bold mb-3 shadow-2xs">
            <span>{isRtl ? "نطاق الخدمات والتوريد" : "Comprehensive B2B Services"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-navy tracking-tight">
            {dict.services.title}
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            {dict.services.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-brand-navy/30 hover:shadow-md transition-all"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-5">
                  {service.icon}
                </div>
                <h3 className="text-base font-bold text-brand-navy">
                  {service.title}
                </h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  {service.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-brand-amber">
                <span>{isRtl ? "طلب استشارة" : "Request Service"}</span>
                <ArrowUpRight className="w-4 h-4 rtl:rotate-90" />
              </div>
            </div>
          ))}

          {/* Quick Contact Card inside the grid */}
          <div className="bg-brand-navy text-white rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-lg">
            <div>
              <span className="text-xs uppercase font-mono tracking-wider text-brand-gold">
                {isRtl ? "فريق الدعم الفني" : "Technical Support"}
              </span>
              <h3 className="text-lg font-bold text-white mt-2">
                {isRtl ? "هل لديك متطلبات خاصة أو مشروع كبير؟" : "Custom Inquiries or Large Volume Supply?"}
              </h3>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                {isRtl
                  ? "تواصل مباشرة مع مهندسينا لمناقشة التوريد الدوري وجداول الصيانة بأسعار خاصة."
                  : "Connect with our technical engineers for periodic supply agreements and contractor rates."}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800">
              <Link
                href={`/${lang}/contact`}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-brand-amber hover:bg-brand-amber-hover text-white text-xs font-bold shadow-sm transition-colors"
              >
                <span>{dict.nav.contact}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
