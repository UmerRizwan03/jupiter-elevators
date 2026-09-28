"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowDown, ArrowUp, ChevronDown, CheckCircle, HelpCircle } from "lucide-react";

interface FaqItem {
  q: { en: string; ar: string };
  a: { en: string; ar: string };
}

const faqs: FaqItem[] = [
  {
    q: {
      en: "What types of elevator spare parts do you supply?",
      ar: "ما هي أنواع قطع غيار المصاعد التي توفرونها؟",
    },
    a: {
      en: "We supply all major mechanical, electrical, and safety systems including PMSM gearless traction motors, controllers (NICE3000+, STEP), VVVF door operators, guide rails (T50-T90), safety gears, speed governors, and COP/LOP push buttons for commercial and residential elevators.",
      ar: "نوفر كافة المنظومات الميكانيكية والكهربائية والأمان، بما في ذلك ماكينات الجر بدون تروس، لوحات التحكم (نايس 3000، ستيب)، مشغلات الأبواب، سكك التوجيه، أجهزة الأمان، وحبال الجر لمصاعد الركاب والبضائع.",
    },
  },
  {
    q: {
      en: "How quickly can parts be delivered across Saudi Arabia?",
      ar: "ما هي سرعة التوصيل والشحن لكافة مدن المملكة؟",
    },
    a: {
      en: "From our central warehouse in Dammam, in-stock orders are dispatched the same day. Standard delivery to Riyadh and the Eastern Province is within 24 hours, and 24 to 48 hours for Jeddah, Makkah, Madinah, and other regions.",
      ar: "يتم شحن الطلبات المتوفرة بمستودعنا المركزي بالدمام في نفس اليوم. التوصيل للرياض والمنطقة الشرقية يتم خلال 24 ساعة، وخلال 24-48 ساعة لجدة، مكة، المدينة وكافة المناطق.",
    },
  },
  {
    q: {
      en: "Do you issue official VAT invoices and CR documentation for trade clients?",
      ar: "هل تصدرون فواتير ضريبية رسمية ومستندات سجل تجاري للشركات؟",
    },
    a: {
      en: "Yes, Jupiter Elevators operates under Space Industrial Cont. Co. (CR: 2050078848 | VAT: 311250980100003). All quotations and invoices are fully compliant for institutional tenders and corporate accounts.",
      ar: "نعم، تعمل جوبيتر للمصاعد تحت مظلة شركة الفضاء للمقاولات الصناعية (س.ت: 2050078848 | رقم ضريبي: 311250980100003). كافة عروض الأسعار والفواتير معتمدة ومطابقة للمواصفات الحكومية والمشاريع.",
    },
  },
  {
    q: {
      en: "What if I cannot identify the part number or manufacturer model?",
      ar: "ماذا لو لم أتمكن من معرفة رقم القطعة أو موديل المصعد؟",
    },
    a: {
      en: "Our on-site technical team offers instant photo identification. Simply take a clear photo of the broken component, motor nameplate, or controller board, and send it directly via our WhatsApp direct line for rapid cross-referencing.",
      ar: "يقدم فريقنا الهندسي خدمة المطابقة بالصور للمهندسين الميدانيين. يكفي التقاط صورة واضحة للقطعة المعطلة أو لوحة بيانات المحرك وإرسالها عبر واتساب لتحديد البديل المطابق فوراً.",
    },
  },
];

export function MetricsAndFaq() {
  const { locale, isRtl } = useLanguage();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 px-4 sm:px-8 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-[1440px] mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* ─────────────────────────────────────────────────────────────
              LEFT COLUMN: "WHY US" & MINIMALIST DATA GRID (Slide 8 & 9)
          ───────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-brand-gold uppercase tracking-widest">
                {locale === "ar" ? "المزايا التشغيلية" : "WHY CHOOSE JUPITER ELEVATORS"}
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight font-sans">
                {locale === "ar" ? "لماذا نحن؟" : "WHY US"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans max-w-lg">
                {locale === "ar"
                  ? "نحن لا نكتفي بتوفير قطع غيار المصاعد، بل نقدم منظومة هندسية متكاملة مدعومة بمخزون محلي ضخم، وأسعار تجارية منافسة، واستشارات فنية تضمن إنهاء أعطال المصاعد بأسرع وقت."
                  : "We don't just supply elevator parts — we provide an engineered reliability ecosystem. Built on 30+ years of technical lift mastery, direct factory pricing, and nationwide KSA dispatch."}
              </p>
            </div>

            {/* Horizontal Line-Separated Metric Grid (Slide 8 exact style) */}
            <div className="divide-y divide-slate-200 border-y border-slate-200 font-mono">
              
              {/* Stat 1: 15K+ */}
              <div className="py-5 flex items-baseline justify-between gap-4">
                <div className="text-4xl sm:text-5xl font-black text-slate-950 tracking-tight">
                  15K+
                </div>
                <div className="text-xs sm:text-sm text-slate-600 font-sans text-end">
                  <div className="font-bold text-slate-900">
                    {locale === "ar" ? "قطعة غيار متوفرة بالمخزون" : "Elevator Parts in Stock"}
                  </div>
                  <div className="text-slate-400 text-[11px]">
                    {locale === "ar" ? "جاهزية فورية بمستودع الدمام" : "Dammam Central Hub Readiness"}
                  </div>
                </div>
              </div>

              {/* Stat 2: 100% */}
              <div className="py-5 flex items-baseline justify-between gap-4">
                <div className="text-4xl sm:text-5xl font-black text-brand-gold tracking-tight">
                  100%
                </div>
                <div className="text-xs sm:text-sm text-slate-600 font-sans text-end">
                  <div className="font-bold text-slate-900">
                    {locale === "ar" ? "ضمان تطابق المواصفات والأمان" : "Accurate Fit & Safety Guarantee"}
                  </div>
                  <div className="text-slate-400 text-[11px]">
                    {locale === "ar" ? "معايير EN 81 والجودة المعتمدة" : "EN 81 / CE Certified Components"}
                  </div>
                </div>
              </div>

              {/* Stat 3: 30+ */}
              <div className="py-5 flex items-baseline justify-between gap-4">
                <div className="text-4xl sm:text-5xl font-black text-slate-950 tracking-tight">
                  30+
                </div>
                <div className="text-xs sm:text-sm text-slate-600 font-sans text-end">
                  <div className="font-bold text-slate-900">
                    {locale === "ar" ? "عاماً من الخبرة الهندسية" : "Years Lift Engineering Depth"}
                  </div>
                  <div className="text-slate-400 text-[11px]">
                    {locale === "ar" ? "استيراد مباشر منذ عام 1993" : "Direct Sourcing Since 1993"}
                  </div>
                </div>
              </div>

              {/* Stat 4: 45 Min */}
              <div className="py-5 flex items-baseline justify-between gap-4">
                <div className="text-4xl sm:text-5xl font-black text-slate-950 tracking-tight">
                  45m
                </div>
                <div className="text-xs sm:text-sm text-slate-600 font-sans text-end">
                  <div className="font-bold text-slate-900">
                    {locale === "ar" ? "متوسط سرعة الرد على طلبات التسعير" : "Average RFQ Response Time"}
                  </div>
                  <div className="text-slate-400 text-[11px]">
                    {locale === "ar" ? "عروض أسعار تجارية مفصلة" : "Fast WhatsApp & Email Quotations"}
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              RIGHT COLUMN: CLEAN MINIMALIST FAQ ACCORDION (Slide 8)
          ───────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
                {locale === "ar" ? "إجابات الخبراء" : "FREQUENTLY ASKED QUESTIONS"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight font-sans">
                {locale === "ar" ? "الأسئلة الشائعة" : "FAQ"}
              </h2>
            </div>

            {/* Accordion Container with clean horizontal borders */}
            <div className="divide-y divide-slate-200 border-y border-slate-200">
              {faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;

                return (
                  <div key={index} className="py-4 transition-all">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full flex items-center justify-between text-start gap-4 focus:outline-none group"
                    >
                      <span className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-brand-gold transition-colors font-sans">
                        {faq.q[locale]}
                      </span>
                      <span className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 group-hover:border-brand-gold group-hover:text-brand-gold transition-colors shrink-0">
                        <ChevronDown
                          className={`w-4 h-4 transform transition-transform duration-300 ${
                            isOpen ? "rotate-180 text-brand-gold" : ""
                          }`}
                        />
                      </span>
                    </button>

                    {isOpen && (
                      <div className="pt-3 pb-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans animate-fadeIn">
                        {faq.a[locale]}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Direct Technical Advisory Callout */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-slate-900 font-sans">
                  {locale === "ar" ? "هل لديك استفسار فني خاص بمشروعك؟" : "Have a specific technical question?"}
                </div>
                <div className="text-[11px] text-slate-500">
                  {locale === "ar" ? "فريقنا الهندسي متاح للرد على كافة الاستشارات" : "Our engineering consultants are on standby"}
                </div>
              </div>

              <Link
                href="/contact"
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono font-bold transition-colors shrink-0"
              >
                {locale === "ar" ? "تواصل معنا" : "Contact Team"}
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
