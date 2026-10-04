import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowDownRight, MessageCircle, FileText } from "lucide-react";
import type { Locale } from "@/lib/i18n";

interface CtaBannerProps {
  lang: Locale;
}

export function CtaBanner({ lang }: CtaBannerProps) {
  const isRtl = lang === "ar";

  return (
    <section className="py-14 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-r from-slate-950 via-[#0d1322] to-slate-900 border border-slate-800 p-8 sm:p-14">
          {/* Background Asset Area (Reserved for custom CTA banner background) */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Whitespace reserved for custom background asset */}
          </div>

          {/* Golden Ambient Glow in Top Right Corner */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-3 text-xs font-mono font-bold tracking-wider text-slate-400 uppercase">
                <span className="text-white">06</span>
                <span>GET STARTED</span>
                <div className="h-px w-12 bg-slate-700" />
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight uppercase">
                {isRtl ? "هل تبحث عن قطعة غيار محددة؟" : "LOOKING FOR A SPECIFIC PART?"}
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 max-w-lg leading-relaxed">
                {isRtl
                  ? "أرسل لنا رقم القطعة أو متطلباتك الفنية وسيقوم فريقنا الهندسي بمطابقتها وتزويدك بالبديل المعتمد وسعر التوريد فوراً."
                  : "Send us your requirement or part number and our engineering team will assist you with the right genuine component immediately."}
              </p>

              {/* Action Buttons: RFQ Basket & WhatsApp */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href={`/${lang}/rfq`}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md group cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-slate-950" />
                  <span>{isRtl ? "طلب تسعير الآن" : "Request a Quote"}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform text-slate-950" />
                </Link>

                <a
                  href="https://wa.me/966562614370?text=Hello%20Jupiter%20Elevators,%20I%20am%20looking%20for%20a%20specific%20elevator%20part."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/40 font-bold text-xs sm:text-sm transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{isRtl ? "استفسار سريع عبر واتساب" : "WhatsApp Inquiry"}</span>
                </a>
              </div>
            </div>

            {/* Right Side Watermark Typography & Accent Arrow */}
            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center text-left lg:text-right rtl:text-right rtl:lg:text-left space-y-2">
              <span className="text-lg sm:text-xl font-mono font-black text-slate-400 tracking-wider uppercase">
                KEEPING
              </span>
              <span className="text-xl sm:text-2xl font-mono font-black text-white tracking-wider uppercase">
                ELEVATORS
              </span>
              <span className="text-lg sm:text-xl font-mono font-black text-[#C59341] tracking-wider uppercase">
                MOVING
              </span>
              <div className="pt-2 text-[#C59341]">
                <ArrowDownRight className="w-8 h-8 rtl:-scale-x-100" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
