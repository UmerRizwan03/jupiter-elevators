"use client";

import React from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { getEmergencyWhatsAppUrl } from "@/lib/whatsapp";
import {
  Wrench,
  Settings,
  FileCheck,
  Search,
  Headphones,
  Globe2,
  ShieldAlert,
  Compass,
  Zap,
  ArrowRight,
  ArrowLeft,
  MessageCircle,
} from "lucide-react";

export default function ServicesPage() {
  const { t, locale, isRtl } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;
  const emergencyUrl = getEmergencyWhatsAppUrl(locale);

  const servicesList = [
    {
      id: "component-sourcing",
      icon: Globe2,
      badge: { en: "Core Capability", ar: "الخدمة الأساسية" },
      title: {
        en: "Global Component Sourcing (China & India)",
        ar: "التوريد المباشر والاستيراد من الهند والصين",
      },
      description: {
        en: "Direct factory sourcing of hard-to-find, obsolete, or high-volume elevator components. Leveraging 33+ years of logistics experience to negotiate competitive trade pricing and reliable sea/air freight.",
        ar: "توريد مخصص ومباشر لقطع الغيار النادرة والمكونات ذات الأحجام الكبيرة من المصانع المعتمدة مباشرة، بالاعتماد على خبرة لوجستية تمتد لأكثر من 33 عاماً.",
      },
      features: [
        { en: "Direct manufacturer pricing", ar: "أسعار استيراد مباشرة من المصنع" },
        { en: "Custom fabrication capabilities", ar: "إمكانية التصنيع بمواصفات خاصة" },
        { en: "Comprehensive quality pre-inspection", ar: "فحص جودة دقيق قبل الشحن" },
      ],
    },
    {
      id: "technical-support",
      icon: Headphones,
      badge: { en: "Engineering Advisory", ar: "استشارات هندسية" },
      title: {
        en: "Technical Assistance & Part Identification",
        ar: "الدعم الفني وتحديد ومطابقة القطع",
      },
      description: {
        en: "Technical assistance for elevator contractors, maintenance companies, and technicians, including troubleshooting, component identification from photos, installation guidance, and technical recommendations.",
        ar: "مساعدة فنية متخصصة لمقاولي وشركات وفنيي الصيانة لتحديد القطع التالفة من خلال الصور ولوحات البيانات، مع تقديم إرشادات التركيب والبدائل المطابقة.",
      },
      features: [
        { en: "Photo-based component matching", ar: "مطابقة القطع من خلال الصور" },
        { en: "Cross-brand compatibility verification", ar: "التحقق من التوافق بين الماركات" },
        { en: "Controller wiring & parameter support", ar: "دعم توصيلات وبرمجة الكنترول" },
      ],
    },
    {
      id: "emergency-support",
      icon: Zap,
      badge: { en: "Rapid Dispatch", ar: "استجابة سريعة" },
      title: {
        en: "Emergency Breakdown Support",
        ar: "الدعم السريع لحالات الطوارئ والأعطال",
      },
      description: {
        en: "Responsive emergency assistance for elevator breakdowns and urgent technical issues, with the objective of reducing building downtime and restoring safe operation as quickly as possible.",
        ar: "استجابة طارئة وفورية لتوفير قطع الغيار الحرجة للمصاعد المتوقفة في الأبراج والمستشفيات والمنشآت الحيوية لتقليل فترات التعطل واستعادة التشغيل الآمن.",
      },
      features: [
        { en: "Priority warehouse dispatch", ar: "أولوية التجهيز والشحن السريع" },
        { en: "Direct WhatsApp hotline", ar: "خط ساخن مباشر عبر الواتساب" },
        { en: "Immediate stock hold", ar: "حجز فوري للقطع المتوفرة" },
      ],
    },
    {
      id: "maintenance-support",
      icon: Settings,
      badge: { en: "Contractor Backing", ar: "مساندة المقاولين" },
      title: {
        en: "Maintenance & AMC Component Support",
        ar: "دعم عقود الصيانة الدورية والسنوية (AMC)",
      },
      description: {
        en: "Flexible component supply solutions for scheduled inspections, preventive maintenance, wear-and-tear replenishment, and troubleshooting throughout the contract period.",
        ar: "توفير حزم قطع الغيار الاستهلاكية ومستلزمات الصيانة الدورية والوقائية للشركات التي تدير عقود صيانة سنوية للمباني والأبراج.",
      },
      features: [
        { en: "Scheduled consumable packages", ar: "باقات دورية للقطع الاستهلاكية" },
        { en: "Volume trade discounts", ar: "خصومات تجارية للكميات والعقود" },
        { en: "Guaranteed inventory reserve", ar: "تخصيص مخزون احتياطي للمشاريع" },
      ],
    },
    {
      id: "installation-support",
      icon: Wrench,
      badge: { en: "Field Guidance", ar: "إشراف ميداني" },
      title: {
        en: "Installation & Hardware Guidance",
        ar: "دعم وإرشادات التركيب الميداني",
      },
      description: {
        en: "Guidance on professional installation of elevator equipment, traction machines, rails, and door operators in accordance with approved specifications, safety requirements, and manufacturer recommendations.",
        ar: "تقديم الاستشارات والمواصفات الفنية المعتمدة لتركيب سكك التوجيه، ماكينات الجر، ومشغلات الأبواب وفق متطلبات السلامة وتوصيات المصنع.",
      },
      features: [
        { en: "Alignment & tolerance guidance", ar: "معايير الوزنية والتسامح الميكانيكي" },
        { en: "EN 81 compliance checks", ar: "التوافق مع اشتراطات EN 81" },
        { en: "Safety switch wiring plans", ar: "مخططات دوائر الأمان الكهربائية" },
      ],
    },
    {
      id: "consulting-modernization",
      icon: Compass,
      badge: { en: "System Upgrades", ar: "تحديث المصاعد" },
      title: {
        en: "Consulting & Modernization Solutions",
        ar: "الاستشارات الفنية وحلول تحديث المصاعد القديمة",
      },
      description: {
        en: "Technical consultation for elevator projects, spare parts selection, modernization requirements, equipment compatibility, and energy-efficient VVVF drive upgrades.",
        ar: "استشارات متخصصة لتحديث المصاعد القديمة، واستبدال لوحات التحكم التقليدية بأنظمة VVVF موفرة للطاقة، وتطوير كبائن وأبواب المصاعد.",
      },
      features: [
        { en: "Controller modernization kits", ar: "أطقم متكاملة لتحديث الكنترول" },
        { en: "Door operator retrofits", ar: "تحديث أبواب الأدوار والكابينة" },
        { en: "Ride comfort optimization", ar: "تحسين نعومة الرحلة وتخفيض الضوضاء" },
      ],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-slate-50">
        {/* Hero Header */}
        <section className="bg-brand-navy text-white py-16 px-4 sm:px-8 border-b border-brand-navy-light">
          <div className="max-w-7xl mx-auto space-y-4">
            <span className="text-xs font-bold text-brand-gold uppercase tracking-wider">
              {locale === "ar" ? "حلول متكاملة لقطاع المصاعد" : "Integrated Elevator Services"}
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
              {t.services.title}
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              {t.services.subtitle}
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesList.map((srv) => {
              const Icon = srv.icon;
              return (
                <div
                  key={srv.id}
                  className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-xl hover:border-brand-gold/60 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <div className="w-12 h-12 rounded-xl bg-brand-navy text-brand-gold flex items-center justify-center">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                        {srv.badge[locale]}
                      </span>
                    </div>

                    <h2 className="text-lg font-bold text-slate-900 leading-snug">
                      {srv.title[locale]}
                    </h2>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {srv.description[locale]}
                    </p>

                    <div className="pt-2 border-t border-slate-100 space-y-2">
                      {srv.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0" />
                          <span>{feat[locale]}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-slate-100">
                    <Link
                      href={`/contact?service=${srv.id}`}
                      className="inline-flex items-center justify-between w-full text-xs font-bold text-brand-navy hover:text-brand-gold transition-colors"
                    >
                      <span>{t.services.learnMore}</span>
                      <ArrowIcon className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Emergency Callout Card */}
        <section className="pb-16 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto bg-slate-900 rounded-3xl p-8 sm:p-12 text-white border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center md:text-start">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                {locale === "ar" ? "خدمة الطوارئ السريعة" : "Emergency Quick Support"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black">
                {locale === "ar"
                  ? "هل لديك مصعد متوقف وبحاجة لقطعة غيار عاجلة؟"
                  : "Have an Elevator Down Requiring Urgent Parts?"}
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm max-w-xl">
                {locale === "ar"
                  ? "فريقنا الهندسي جاهز للتجاوب السريع وتجهيز القطع الحرجة في الدمام والرياض لتفادي تعطل المرافق."
                  : "Our engineering hotline is on standby to expedite critical component dispatch across Dammam and Riyadh."}
              </p>
            </div>
            <a
              href={emergencyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all shrink-0 shadow-lg shadow-emerald-600/30"
            >
              <MessageCircle className="w-5 h-5" />
              <span>{t.nav.emergencySupport}</span>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
