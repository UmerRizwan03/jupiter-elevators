import React from "react";
import { Camera, MessageCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import type { Locale, Dictionary } from "@/lib/i18n";

interface SnapAndSendBannerProps {
  lang: Locale;
  dict: Dictionary;
}

export function SnapAndSendBanner({ lang, dict }: SnapAndSendBannerProps) {
  const isRtl = lang === "ar";

  const whatsappPrompt = encodeURIComponent(
    isRtl
      ? "السلام عليكم ورحمة الله، أنا فني صيانة مصاعد في الموقع ومرفق صورة لقطعة غيار تالفة / بدون كود وأرغب في معرفة رقمها والبديل المتوفر وسعرها."
      : "Hello, I am an on-site elevator maintenance technician with a photo of a damaged/unbranded part. I would like help identifying the replacement part and price."
  );

  return (
    <section id="snap-and-send" className="py-14 md:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-brand-navy to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Light Effect */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-brand-amber/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-brand-gold text-xs font-bold border border-white/10">
                <Camera className="w-3.5 h-3.5" />
                <span>{dict.snapAndSend.badge}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                {dict.snapAndSend.title}
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
                {dict.snapAndSend.description}
              </p>

              {/* 3 Step Visual Flow */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
                <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl">
                  <span className="text-brand-amber font-mono font-black text-base">01</span>
                  <p className="text-xs font-semibold text-white mt-1">
                    {dict.snapAndSend.step1}
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl">
                  <span className="text-brand-amber font-mono font-black text-base">02</span>
                  <p className="text-xs font-semibold text-white mt-1">
                    {dict.snapAndSend.step2}
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl">
                  <span className="text-brand-amber font-mono font-black text-base">03</span>
                  <p className="text-xs font-semibold text-white mt-1">
                    {dict.snapAndSend.step3}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4">
                <a
                  href={`https://wa.me/966562614370?text=${whatsappPrompt}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-brand-whatsapp hover:bg-brand-whatsapp-hover text-white font-bold text-sm shadow-lg transition-all"
                >
                  <MessageCircle className="w-5 h-5 fill-white text-transparent" />
                  <span>{dict.snapAndSend.cta}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </a>
              </div>
            </div>

            {/* Right Graphic: Mobile Photo Preview Simulation */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="bg-slate-800/90 border border-slate-700 p-5 rounded-2xl max-w-sm w-full shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-slate-700 text-xs text-slate-400">
                  <span className="font-semibold text-slate-200">
                    {isRtl ? "مطابقة سريعة عبر واتساب" : "Direct WhatsApp Matching"}
                  </span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold">
                    {isRtl ? "متاح الآن" : "Online"}
                  </span>
                </div>

                <div className="my-4 p-4 rounded-xl bg-slate-900/80 border border-dashed border-slate-600 text-center">
                  <Camera className="w-10 h-10 text-brand-gold mx-auto mb-2 opacity-80" />
                  <p className="text-xs text-slate-300 font-medium">
                    {isRtl
                      ? "صوّر القطعة أو لوحة بيانات المحرك"
                      : "Photo of part or motor rating plate"}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-1">
                    PNG, JPG, HEIC
                  </p>
                </div>

                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{isRtl ? "مطابقة دقيقة لكافة الماركات العالمية" : "Matching for all lift controller brands"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{isRtl ? "تسعير فوري وتأكيد التوفر في الدمام" : "Instant stock verification in Dammam"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
