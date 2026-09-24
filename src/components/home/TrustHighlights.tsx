"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { companyData } from "@/data/company";
import { ShieldCheck, Truck, Factory, Users, Award, CheckCircle } from "lucide-react";

export function TrustHighlights() {
  const { locale } = useLanguage();

  return (
    <section className="py-20 px-4 sm:px-8 bg-slate-950 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <span className="text-xs font-mono font-bold text-brand-gold uppercase tracking-widest">
            {locale === "ar" ? "لماذا يختارنا مقاولو المصاعد؟" : "ENGINEERING ADVANTAGE"}
          </span>
          <h2 className="text-2xl sm:text-4xl font-black font-serif text-white tracking-tight">
            {locale === "ar"
              ? "شريكك الاستراتيجي لحلول وقطع غيار المصاعد في المملكة"
              : "Your Strategic Lift Engineering Partner in Saudi Arabia"}
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto font-sans">
            {locale === "ar"
              ? "نجمع بين الخبرة الميدانية العميقة في هندسة المصاعد لأكثر من 30 عاماً، والقدرات اللوجستية العالمية للاستيراد المباشر من الصين والهند."
              : "Combining 30+ years of lift engineering depth with direct international supply chain logistics from premier manufacturing hubs in China and India."}
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3 hover:border-brand-gold/60 transition-all relative group overflow-hidden">
            <div className="cad-corner-tl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 text-brand-gold flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white font-serif">
              {locale === "ar" ? "+30 عاماً خبرة متخصصة" : "30+ Years Lift Expertise"}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              {locale === "ar"
                ? "فريق هندسي متخصص قادر على تشخيص الأعطال وتحديد أدق القطع البديلة لمختلف الموديلات."
                : "Seasoned engineering advisory to accurately identify, match, and troubleshoot components for any elevator model."}
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3 hover:border-brand-gold/60 transition-all relative group overflow-hidden">
            <div className="cad-corner-tl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 text-brand-gold flex items-center justify-center">
              <Factory className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white font-serif">
              {locale === "ar" ? "شراكات تصنيع مباشرة" : "Direct Factory Partnerships"}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              {locale === "ar"
                ? "استيراد مباشر من كبار المصنعين المعتمدين في الصين والهند، لضمان أعلى مواصفات وأفضل سعر."
                : "Direct alliances with certified manufacturing hubs in India and China, delivering peak durability and competitive trade pricing."}
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3 hover:border-brand-gold/60 transition-all relative group overflow-hidden">
            <div className="cad-corner-tl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 text-brand-gold flex items-center justify-center">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white font-serif">
              {locale === "ar" ? "توريد وشحن سريع" : "Rapid KSA-Wide Dispatch"}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              {locale === "ar"
                ? "مخزون جاهز بالدمام وتوصيل فوري للرياض، جدة، وكافة مدن المملكة لتقليل تعطل المصاعد."
                : "Strategic inventory ready in Dammam with expedited freight to Riyadh, Jeddah, and all regions to eliminate lift downtime."}
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3 hover:border-brand-gold/60 transition-all relative group overflow-hidden">
            <div className="cad-corner-tl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 text-brand-gold flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white font-serif">
              {locale === "ar" ? "موثوقية وتوافق معايير" : "Certified Compliance"}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              {locale === "ar"
                ? "منشأة وطنية معتمدة بسجل تجاري ورقم ضريبي معتمد لكافة المشاريع والمناقصات."
                : `Registered Saudi establishment (${companyData.legalName[locale]}) with official CR and VAT compliance.`}
            </p>
          </div>
        </div>

        {/* Dammam Logistics & Central Warehouse Hub Showcase Card */}
        <div className="mt-12 rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden relative shadow-2xl">
          <div className="cad-corner-tl" />
          <div className="cad-corner-tr" />
          <div className="cad-corner-bl" />
          <div className="cad-corner-br" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Warehouse High-Bay Photography */}
            <div className="lg:col-span-7 relative h-72 sm:h-96 w-full overflow-hidden">
              <Image
                src="/images/hero/dammam_warehouse_hub.jpg"
                alt="Jupiter Elevators Dammam Distribution Center"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 start-4 flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 text-xs font-mono text-slate-200">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>DAMMAM HUB // HIGH-BAY INVENTORY DISPATCH</span>
              </div>
            </div>

            {/* Warehouse Logistics Metadata */}
            <div className="lg:col-span-5 p-6 sm:p-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/15 text-brand-gold text-xs font-mono font-bold tracking-wider">
                <Truck className="w-3.5 h-3.5" />
                <span>{locale === "ar" ? "المركز اللوجستي المعتمد" : "CERTIFIED LOGISTICS CENTER"}</span>
              </div>

              <h3 className="text-2xl font-black font-serif text-white tracking-tight">
                {locale === "ar"
                  ? "مستودعاتنا المركزية بالدمام: جاهزية فورية لتوريد كافة مناطق المملكة"
                  : "Dammam Central Distribution Hub: Nationwide Same-Day Dispatch"}
              </h3>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                {locale === "ar"
                  ? "نحتفظ بمخزون استراتيجي ضخم من ماكينات الجر، كبائن المصاعد، أبواب فيرماتور، وسكك التوجيه، مما يضمن توريداً مباشراً وسريعاً لمقاولي المصاعد في الرياض، جدة، والمنطقة الشرقية."
                  : "Holding deep strategic stock of PMSM traction machines, Fermator door operators, guide rails, and controllers to ensure zero project downtime across Riyadh, Jeddah, and the Eastern Province."}
              </p>

              <div className="pt-2 border-t border-slate-800 grid grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <div className="text-slate-500">OFFICIAL CR</div>
                  <div className="text-slate-200 font-bold">{companyData.crNumber}</div>
                </div>
                <div>
                  <div className="text-slate-500">VAT REGISTRATION</div>
                  <div className="text-slate-200 font-bold">{companyData.vatNumber}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

