"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { companyData } from "@/data/company";
import {
  ShieldCheck,
  Award,
  Globe2,
  TrendingUp,
  Target,
  Eye,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Factory,
  Building2,
} from "lucide-react";

export default function AboutPage() {
  const { t, locale, isRtl } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-slate-50">
        {/* Page Hero Header */}
        <section className="bg-brand-navy text-white py-16 px-4 sm:px-8 border-b border-brand-navy-light relative overflow-hidden">
          <div className="max-w-7xl mx-auto space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/15 text-brand-gold text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t.about.legalSubtitle}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-serif tracking-tight">
              {t.about.title}
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
              {locale === "ar"
                ? "تأسست شركة جوبيتر للمصاعد (شركة سبيس للمقاولات الصناعية) لسد الفجوة الكبيرة في توفر قطع غيار المصاعد بالمملكة العربية السعودية، وتوفير بدائل وحلول فورية للمقاولين وشركات الصيانة."
                : "Jupiter Elevators (Space Industrial Cont. Company) was established in 2018 to solve the persistent spare parts shortage in Saudi Arabia, empowering elevator contractors and maintenance firms with immediate local stock and direct manufacturer access."}
            </p>
          </div>
        </section>

        {/* Heritage & 30+ Years Leadership Story */}
        <section className="py-16 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-6">
                <span className="text-xs font-bold text-brand-gold uppercase tracking-wider">
                  {locale === "ar" ? "قصة التأسيس والريادة" : "Founding & Industry Heritage"}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
                  {t.about.heritageTitle}
                </h2>
                <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
                  <p>
                    {locale === "ar"
                      ? "يقود جوبيتر للمصاعد فريق من الخبراء بقيادة الأستاذ محبوب ف. م.، مدعوماً بكفاءات تمتلك أكثر من 30 عاماً من الخبرة المتخصصة في كبرى شركات المصاعد العالمية، إلى جانب أكثر من 33 عاماً من الخبرة المتمرسة في الاستيراد الدولي والخدمات اللوجستية وإدارة المستودعات."
                      : "Jupiter Elevators is led by founder Mahaboob V M, backed by an elite leadership core with over 30 years of direct technical experience in major international lift corporations, complemented by 33+ years of expertise in cross-border import, logistics, and multi-tier warehousing."}
                  </p>
                  <p>
                    {locale === "ar"
                      ? "انطلاقاً من مقرنا المسجل في الدمام ونشاطنا الميداني في الرياض، نركز بنسبة 100% على تخصص قطع الغيار والمكونات بدلاً من المصاعد الكاملة، مما يمكننا من تأمين أعلى درجات التوافر، وتقليص زمن التوريد، وتوفير حلول تنافسية ومضمونة."
                      : "Headquartered from our registered base in Dammam with active operations in Riyadh, we focus exclusively on spare parts rather than complete turnkey installations. This singular focus allows us to guarantee unprecedented stock readiness, slash lead times, and deliver cost efficiencies."}
                  </p>
                </div>

                {/* Dual Experience Pillars */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                    <Award className="w-8 h-8 text-brand-gold shrink-0 mt-0.5" />
                    <div>
                      <div className="text-lg font-bold text-slate-900">
                        {locale === "ar" ? "30+ عاماً في المصاعد" : "30+ Years in Lifts"}
                      </div>
                      <div className="text-xs text-slate-500">
                        {locale === "ar" ? "تشخيص فوري وهندسة بدائل معتمدة" : "Expert diagnostic matching & safety compliance"}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                    <Globe2 className="w-8 h-8 text-brand-gold shrink-0 mt-0.5" />
                    <div>
                      <div className="text-lg font-bold text-slate-900">
                        {locale === "ar" ? "33+ عاماً لوجستيات" : "33+ Years Logistics"}
                      </div>
                      <div className="text-xs text-slate-500">
                        {locale === "ar" ? "سلاسل إمداد مباشرة وموثوقة" : "Direct supply routes from China & India"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Brand Visual Identity Display */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-72 h-72 sm:w-80 sm:h-80 bg-slate-50 rounded-2xl border border-slate-200 p-6 flex flex-col items-center justify-center text-center shadow-inner">
                  <div className="relative w-48 h-48">
                    <Image
                      src="/brand/brandmark_transparent.png"
                      alt="Jupiter Elevators Mark"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="mt-2 text-xs font-bold text-brand-navy">
                    {companyData.brandName[locale]}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {companyData.tagline[locale]}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-12 px-4 sm:px-8 bg-white border-y border-slate-200">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-brand-navy text-brand-gold flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">{t.about.missionTitle}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {locale === "ar"
                  ? "تزويد قطاع المصاعد في المملكة بقطع غيار عالية الجودة وموثوقة وجاهزة للتسليم الفوري بأسعار تنافسية، مع تقديم دعم فني احترافي يبني شراكات طويلة الأمد ويحافظ على تشغيل المصاعد بأعلى معايير السلامة والكفاءة."
                  : "To provide the Saudi elevator industry with dependable, certified spare parts that are readily available at competitive prices, paired with responsive engineering consultation that builds enduring partnerships and guarantees passenger safety."}
              </p>
            </div>

            {/* Vision */}
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-brand-navy text-brand-gold flex items-center justify-center">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">{t.about.visionTitle}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {locale === "ar"
                  ? "أن نكون الشركة الرائدة والأولى الموثوقة لحلول وقطع غيار المصاعد في المملكة العربية السعودية، والتوسع مستقبلاً من توزيع قطع الغيار إلى تصنيع وتوريد أنظمة المصاعد المتكاملة محلياً وإقليمياً."
                  : "To become the premier and most trusted elevator solutions company in Saudi Arabia, expanding long-term from spare parts distribution into manufacturing and supplying engineered elevator systems across the Kingdom and international GCC markets."}
              </p>
            </div>
          </div>
        </section>

        {/* Strategic Partnerships: India & China */}
        <section className="py-16 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="max-w-2xl mx-auto text-center space-y-2">
              <span className="text-xs font-bold text-brand-gold uppercase tracking-wider">
                {locale === "ar" ? "التحالفات العالمية" : "Global Alliances"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {t.about.partnershipsTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                {locale === "ar"
                  ? "علاقات تصنيع مباشرة وممتدة تضمن مطابقة المواصفات القياسية الأوروبية EN 81 والمواصفات السعودية SASO."
                  : "Direct manufacturing relationships ensuring full compliance with European EN 81 and Saudi SASO safety standards."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-sm">
                    CN
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    {locale === "ar" ? "المصانع المعتمدة في الصين" : "Certified Chinese Manufacturing Hubs"}
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {locale === "ar"
                    ? "شراكات استراتيجية مع كبار مصنعي ماكينات الجر بدون تروس (PMSM)، ومشغلات الأبواب الذكية VVVF، واللوحات المتكاملة، وأنظمة الأمان والحساسات الكهروضوئية."
                    : "Strategic tie-ups with leading manufacturers of PMSM gearless machines, intelligent VVVF door operators, integrated controller systems, and full-height infrared safety curtains."}
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-700 flex items-center justify-center font-bold text-sm">
                    IN
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    {locale === "ar" ? "المصانع المتخصصة في الهند" : "Specialized Indian Manufacturing Hubs"}
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {locale === "ar"
                    ? "توريد الحبال الفولاذية المجدولة المعتمدة، وسكك التوجيه، والمسبوكات الدقيقة، ومكونات التعليق، والمثبتات المطروقة عالية المتانة."
                    : "Procurement of certified elevator steel wire traction ropes, precision cast iron sheaves, machined guide components, wedge sockets, and forged mechanical hardware."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Corporate Values */}
        <section className="py-16 px-4 sm:px-8 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto space-y-10">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold text-brand-gold uppercase tracking-wider">
                {locale === "ar" ? "مبادئ العمل" : "Our Principles"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {t.about.valuesTitle}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {companyData.coreValues.map((val, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-2 hover:border-brand-gold/50 transition-colors"
                >
                  <CheckCircle2 className="w-6 h-6 text-brand-gold" />
                  <h3 className="text-base font-bold text-slate-900">{val.title[locale]}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {val.description[locale]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16 px-4 sm:px-8 bg-brand-navy text-white text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-2xl sm:text-3xl font-black">
              {locale === "ar" ? "جاهزون لتلبية احتياجات مشاريعكم" : "Ready to Support Your Elevator Projects"}
            </h2>
            <p className="text-slate-300 text-sm">
              {locale === "ar"
                ? "تواصل مع فريق المبيعات الهندسية اليوم للحصول على عروض أسعار تنافسية وجداول توريد مرنة."
                : "Connect with our engineering sales specialists today for custom quotations and delivery schedules."}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/catalog"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-gold hover:bg-brand-gold-dark text-brand-navy font-bold text-sm transition-all"
              >
                <span>{t.catalog.title}</span>
                <ArrowIcon className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm transition-all border border-slate-700"
              >
                <span>{t.nav.contact}</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
