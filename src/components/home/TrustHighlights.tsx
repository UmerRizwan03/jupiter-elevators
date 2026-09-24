"use client";

import React from "react";
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
      </div>
    </section>
  );
}

