"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { companyData } from "@/data/company";
import { ShieldCheck, Truck, Factory, Award, ArrowRight, ArrowLeft } from "lucide-react";

export function AboutWatermarkSection() {
  const { locale, isRtl } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-8 bg-[#FAFAFA] text-slate-900 overflow-hidden border-b border-slate-200">
      
      {/* ─────────────────────────────────────────────────────────────
          1. GIANT WATERMARK TYPOGRAPHY (Slide 5 inspiration)
      ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none flex items-center justify-center z-0 overflow-hidden">
        <span className="text-[12vw] font-black uppercase tracking-tighter text-slate-900/[0.035] leading-tight text-center max-w-7xl">
          {locale === "ar"
            ? "خبرة هندسية موثوقة لأكثر من 30 عاماً"
            : "TRUSTED LIFT SPARES WITH EXPERT SERVICE"}
        </span>
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10 space-y-12">
        
        {/* Top Minimalist Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 border-b border-slate-200 pb-8">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-brand-gold uppercase tracking-widest">
              {locale === "ar" ? "نبذة عن الشركة" : "ABOUT JUPITER ELEVATORS"}
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight font-sans">
              {locale === "ar"
                ? "شريكك الهندسي واللوجستي الموثوق"
                : "Engineered for Absolute Reliability"}
            </h2>
          </div>

          <div className="max-w-xl text-xs sm:text-sm text-slate-600 leading-relaxed font-sans space-y-2">
            <p>
              {locale === "ar"
                ? "نحن نقدم أكثر من 30 عاماً من الخبرة المتخصصة في هندسة المصاعد و33 عاماً من التوريد والاستيراد المباشر من كبرى المصانع في الصين والهند. مع مخزون استراتيجي واسع النطاق في مستودعاتنا المركزية بالدمام، نضمن تلبية احتياجات مقاولي المصاعد وفنيي الصيانة بسرعة فائقة وأسعار تجارية منافسة."
                : "We provide over 30 years of specialized lift engineering expertise and 33+ years of direct international logistics from vetted manufacturing hubs in China and India. With extensive inventory in our central Dammam distribution hub, we guarantee precision part identification, trade pricing, and rapid delivery across Saudi Arabia."}
            </p>
          </div>
        </div>

        {/* Central Visual & Capability Cards Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
          
          {/* Central 3D Engineering Render Box */}
          <div className="lg:col-span-6 relative h-72 sm:h-96 w-full rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-sm flex items-center justify-center p-6">
            <div className="absolute top-4 start-4 flex items-center gap-2 text-[10px] font-mono text-slate-400">
              <span className="w-2 h-2 rounded-full bg-brand-gold" />
              <span>PMSM PROPULSION SYSTEM // OEM STANDARD</span>
            </div>

            <div className="relative w-full h-full">
              <Image
                src="/images/bento/traction_motor.jpg"
                alt="Jupiter Elevators Engineering Excellence"
                fill
                className="object-contain p-4 hover:scale-105 transition-transform duration-700"
              />
            </div>

            <div className="absolute bottom-4 end-4 bg-slate-900/90 text-white text-[10px] font-mono px-3 py-1 rounded-full backdrop-blur-sm">
              DAMMAM STOCK READY
            </div>
          </div>

          {/* Right Capabilities & Official Verification Grid */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Capability 1: Engineering Depth */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-start gap-4 hover:border-brand-gold/60 transition-all shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 text-brand-gold flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-slate-900 font-sans">
                  {locale === "ar" ? "+30 عاماً خبرة هندسية ميدانية" : "30+ Years Lift Engineering Depth"}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {locale === "ar"
                    ? "استشارات فنية دقيقة لتشخيص الأعطال وتحديد القطع البديلة المتوافقة 100% مع المصاعد القديمة والحديثة."
                    : "Comprehensive engineering diagnosis to accurately match parts across vintage and next-generation lift systems."}
                </p>
              </div>
            </div>

            {/* Capability 2: Direct Import Alliances */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-start gap-4 hover:border-brand-gold/60 transition-all shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 text-brand-gold flex items-center justify-center shrink-0">
                <Factory className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-slate-900 font-sans">
                  {locale === "ar" ? "شراكات استيراد مباشرة من الصين والهند" : "Direct Factory Alliances (China & India)"}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {locale === "ar"
                    ? "قنوات توريد مباشرة بدون وسطاء لتقديم أسعار جملة تنافسية تضمن أعلى ربحية لمقاولي الصيانة."
                    : "Direct manufacturer supply lines delivering wholesale pricing and factory warranties to elevator contractors."}
                </p>
              </div>
            </div>

            {/* Capability 3: Official Saudi Compliance Badges */}
            <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-brand-gold shrink-0" />
                <div className="space-y-0.5 text-xs font-mono">
                  <div className="text-slate-300 font-bold">{companyData.legalName[locale]}</div>
                  <div className="text-slate-400">
                    CR: <span className="text-white font-bold">{companyData.crNumber}</span> · VAT:{" "}
                    <span className="text-white font-bold">{companyData.vatNumber}</span>
                  </div>
                </div>
              </div>

              <Link
                href="/about"
                className="px-4 py-2 rounded-xl bg-brand-gold hover:bg-brand-gold-dark text-slate-950 font-bold text-xs font-mono inline-flex items-center gap-1.5 transition-colors shrink-0"
              >
                <span>{locale === "ar" ? "المزيد عنا" : "About Us"}</span>
                <ArrowIcon className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
