"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { getPhotoIdWhatsAppUrl } from "@/lib/whatsapp";
import { Camera, CheckCircle2, MessageSquare, Zap, Clock } from "lucide-react";

export function PhotoIdentificationBanner() {
  const { t, locale, isRtl } = useLanguage();
  const photoUrl = getPhotoIdWhatsAppUrl(locale);

  return (
    <section className="py-12 px-4 sm:px-8 bg-slate-100">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-brand-navy via-brand-navy-light to-brand-navy rounded-2xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          {/* Subtle Decorative Background Element */}
          <div className="absolute end-0 top-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/20 text-brand-gold text-xs font-bold tracking-wide">
                <Zap className="w-3.5 h-3.5" />
                <span>{t.photoTool.badge}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-snug">
                {t.photoTool.title}
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                {t.photoTool.subtitle}
              </p>

              {/* Three quick benefits */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{locale === "ar" ? "تحديد فوري للموديل" : "Instant Model Identification"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{locale === "ar" ? "تسعير خلال دقائق" : "Quotes Within Minutes"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{locale === "ar" ? "بدائل متوافقة معتمدة" : "Certified Compatible Replacements"}</span>
                </div>
              </div>
            </div>

            {/* Right Action */}
            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center">
              <a
                href={photoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm sm:text-base transition-all shadow-lg shadow-emerald-500/30 text-center"
              >
                <Camera className="w-5 h-5 shrink-0" />
                <span>{t.photoTool.buttonText}</span>
              </a>
              <span className="text-[11px] text-slate-400 mt-2 text-center lg:text-end w-full">
                {locale === "ar" ? "متاح مباشرة للمهندسين وفنيي الصيانة بالموقع" : "Direct line for field technicians & engineers"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
