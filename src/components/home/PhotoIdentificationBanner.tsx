"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { getPhotoIdWhatsAppUrl } from "@/lib/whatsapp";
import { Camera, CheckCircle2, Zap, Clock, ArrowRight, ArrowLeft } from "lucide-react";

export function PhotoIdentificationBanner() {
  const { t, locale, isRtl } = useLanguage();
  const photoUrl = getPhotoIdWhatsAppUrl(locale);
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section className="py-16 px-4 sm:px-8 bg-[#FAFAFA] border-b border-slate-200">
      <div className="max-w-[1440px] mx-auto">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm relative overflow-hidden">
          
          {/* Subtle Corner Markers */}
          <div className="cad-corner-tl" />
          <div className="cad-corner-tr" />
          <div className="cad-corner-bl" />
          <div className="cad-corner-br" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 text-brand-gold text-xs font-mono font-bold tracking-wide">
                <Zap className="w-3.5 h-3.5" />
                <span>{t.photoTool.badge}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight leading-snug font-sans">
                {t.photoTool.title}
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl font-sans">
                {t.photoTool.subtitle}
              </p>

              {/* Three quick benefits */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{locale === "ar" ? "تحديد فوري للموديل" : "Instant Model Identification"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand-gold shrink-0" />
                  <span>{locale === "ar" ? "تسعير خلال دقائق" : "Quotes Within Minutes"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{locale === "ar" ? "بدائل متوافقة معتمدة" : "Certified Compatible Replacements"}</span>
                </div>
              </div>
            </div>

            {/* Right Action: Camera Snap CTA */}
            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center">
              <a
                href={photoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base transition-all shadow-md text-center font-sans group"
              >
                <Camera className="w-5 h-5 shrink-0 group-hover:scale-110 transition-transform" />
                <span>{t.photoTool.buttonText}</span>
                <ArrowIcon className="w-4 h-4" />
              </a>
              <span className="text-[11px] font-mono text-slate-400 mt-2.5 text-center lg:text-end w-full">
                {locale === "ar" ? "خط مباشر لمهندسي وفنيي الصيانة بالموقع" : "Direct on-site WhatsApp line for field technicians"}
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
