import React from "react";
import { FileText, Calculator, CheckCircle, Truck, ChevronRight } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { CardTexture } from "@/components/ui/card-texture";

interface ProcessSectionProps {
  lang: Locale;
}

export function ProcessSection({ lang }: ProcessSectionProps) {
  const isRtl = lang === "ar";

  const steps = [
    {
      num: "01",
      title: isRtl ? "إرسال الاستفسار" : "Enquire",
      desc: isRtl ? "شاركنا رقم القطعة أو متطلباتك الفنية." : "Share your requirement or part number.",
      icon: <FileText className="w-5 h-5 text-[#C59341]" />,
    },
    {
      num: "02",
      title: isRtl ? "استلام عرض السعر" : "Get a Quote",
      desc: isRtl ? "احصل على أفضل سعر وتأكيد للتوفر فوراً." : "Receive the best price and availability.",
      icon: <Calculator className="w-5 h-5 text-[#C59341]" />,
    },
    {
      num: "03",
      title: isRtl ? "تأكيد الطلب" : "Confirm",
      desc: isRtl ? "اعتمد طلبك بكل ثقة وضمان للجودة." : "Place your order with confidence.",
      icon: <CheckCircle className="w-5 h-5 text-[#C59341]" />,
    },
    {
      num: "04",
      title: isRtl ? "التوصيل السريع" : "Fast Delivery",
      desc: isRtl ? "شحن وتوصيل القطع لموقعك في أي مدينة." : "Parts delivered to your location worldwide.",
      icon: <Truck className="w-5 h-5 text-[#C59341]" />,
    },
  ];

  return (
    <section className="py-14 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 text-xs font-mono font-bold tracking-wider text-slate-400 uppercase mb-2">
            <span className="text-slate-800">05</span>
            <span>OUR PROCESS</span>
            <div className="h-px w-16 bg-slate-200" />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
            {isRtl ? "من الاستفسار حتى التسليم" : "FROM ENQUIRY TO DELIVERY"}
          </h2>
        </div>

        {/* 4 Process Cards with Chevron Connectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="relative overflow-hidden bg-white border border-slate-200/90 rounded-2xl p-6 flex flex-col justify-between hover:border-[#C59341]/60 transition-all duration-300 shadow-2xs hover:shadow-xs group"
            >
              {/* Technical Process Flow Texture Background */}
              <CardTexture variant="process" watermark={step.num} />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-slate-400">
                    {step.num}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-amber-50/90 border border-amber-200/60 flex items-center justify-center group-hover:bg-[#C59341] transition-colors shadow-2xs">
                    <div className="group-hover:text-white transition-colors">
                      {step.icon}
                    </div>
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-slate-950 transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {/* Step indicator arrow */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3.5 rtl:-right-auto rtl:-left-3.5 top-1/2 -translate-y-1/2 z-10">
                  <div className="w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 shadow-2xs">
                    <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
