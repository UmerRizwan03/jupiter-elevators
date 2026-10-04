import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { isValidLocale, defaultLocale, type Locale } from "@/lib/i18n";
import { CardTexture } from "@/components/ui/card-texture";
import { Scale } from "lucide-react";
import { getLocalizedAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const validLocale: Locale = isValidLocale(lang) ? lang : defaultLocale;

  return {
    alternates: getLocalizedAlternates(validLocale, "/terms"),
    title: validLocale === "ar" ? "الشروط والأحكام التجارية" : "Commercial Terms & Conditions",
    description:
      validLocale === "ar"
        ? "الشروط والأحكام الرسمية لتوريد قطع غيار ومكونات المصاعد لشركة سبيس للمقاولات الصناعية (جوبيتر للمصاعد)."
        : "Official commercial terms and supply conditions for Jupiter Elevators (Space Industrial Cont. Co.).",
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const validLocale: Locale = isValidLocale(lang) ? lang : defaultLocale;
  const isRtl = validLocale === "ar";

  const termsSections = [
    {
      num: "01",
      title: isRtl ? "الهوية المؤسسية والتعريفات" : "Corporate Identity & Definitions",
      content: isRtl
        ? "تشير هذه الشروط إلى 'جوبيتر للمصاعد' (الاسم التجاري لشركة سبيس للمقاولات الصناعية)، سجل تجاري رقم: 2050078848، ورقم ضريبي: 311250980100003، ومقرها الرئيسي في الدمام، المملكة العربية السعودية. يُقصد بـ 'العميل' أي شركة أو مؤسسة أو فرد يتقدم بطلب تسعير أو يشتري قطع غيار ومكونات مصاعد من الشركة."
        : "These terms govern commercial relations with Jupiter Elevators (trading brand of Space Industrial Cont. Company), CR: 2050078848, VAT: 311250980100003, headquartered in Dammam, Kingdom of Saudi Arabia. 'Client' refers to any maintenance firm, contractor, or commercial buyer ordering components.",
    },
    {
      num: "02",
      title: isRtl ? "عروض الأسعار وصلاحيتها" : "Quotations & Price Validity",
      content: isRtl
        ? "تعتبر كافة عروض الأسعار الرسمية الصادرة من جوبيتر للمصاعد صالحة لمدة 15 يوماً تقويمياً من تاريخ إصدارها ما لم يُنص على خلاف ذلك كتابةً. تحتفظ الشركة بحق تعديل الأسعار بناءً على تقلبات سلاسل التوريد وأسعار الصرف الرسمية قبل اعتماد أمر الشراء النهائي."
        : "All formal commercial quotations issued by Jupiter Elevators remain valid for 15 calendar days from issuance unless stated otherwise in writing. Pricing is subject to freight and currency fluctuations prior to formal Purchase Order (PO) confirmation.",
    },
    {
      num: "03",
      title: isRtl ? "المطابقة الفنية والمواصفات EN 81" : "Technical Specification & EN 81 Standards",
      content: isRtl
        ? "كافة قطع الغيار الموردة تطابق المواصفات الهندسية ومقاييس الأمان الدولية (EN 81-20/50) ومواصفات الهيئة السعودية للمواصفات والمقاييس والجودة (SASO). يقع على عاتق الفني أو المهندس المشرف في الموقع مسؤولية التأكد من مطابقة أبعاد وجهد التشغيل وموديل القطعة قبل البدء في التركيب النهائي."
        : "Components supplied adhere to life-safety norms including EN 81-20/50 and SASO standards. The receiving technician is responsible for verifying electrical voltage, dimensions, and system compatibility prior to permanent installation.",
    },
    {
      num: "04",
      title: isRtl ? "الضمان التجاري وحدود المسؤولية" : "Warranty & Liability Limitations",
      content: isRtl
        ? "تضمن جوبيتر للمصاعد خلو المكونات الإلكترونية والميكانيكية الجديدة من عيوب التصنيع لمدة 12 شهراً من تاريخ التسليم. لا يشمل الضمان التلف الناتج عن سوء التوصيل الكهربائي، التذبذب في التيار، الصواعق، أو أخطاء التركيب في الموقع."
        : "Jupiter Elevators warrants new electronic and mechanical elevator components against manufacturing defects for 12 months from delivery. Warranty excludes damages arising from incorrect wiring, power surges, or improper installation by third parties.",
    },
    {
      num: "05",
      title: isRtl ? "سياسة الإرجاع والاستبدال" : "Return & Exchange Policy",
      content: isRtl
        ? "يحق للعميل طلب إرجاع أو استبدال القطع غير المستخدمة بحالتها وتغليفها الأصلي خلال 7 أيام من تاريخ الاستلام، وتخضع الكروت الإلكترونية لفحص السلامة المسبق في ورشتنا الفنية بالدمام قبل اعتماد الإرجاع."
        : "Clients may request return or exchange of unused, sealed items in original packaging within 7 days of receipt. Electronic boards undergo bench testing at our Dammam technical facility before credit confirmation.",
    },
    {
      num: "06",
      title: isRtl ? "القانون الحاكم والاختصاص القضائي" : "Governing Law & Jurisdiction",
      content: isRtl
        ? "تخضع هذه الشروط والأحكام وتُفسر وفقاً للأنظمة واللوائح التجارية المعمول بها في المملكة العربية السعودية، وتختص المحاكم التجارية في مدينة الدمام بالنظر في أي نزاع قد ينشأ عن تنفيذ هذه الشروط."
        : "These terms are governed by the commercial laws and regulations of the Kingdom of Saudi Arabia, and the Commercial Courts of Dammam possess exclusive jurisdiction over any contractual dispute.",
    },
  ];

  return (
    <div className="py-10 sm:py-16 bg-transparent min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <section>
          <div className="flex items-center gap-3 text-xs font-mono font-bold tracking-wider text-slate-400 uppercase mb-3">
            <span className="text-slate-800">01</span>
            <span>LEGAL FRAMEWORK & COMMERCIAL TERMS</span>
            <div className="h-px w-16 bg-slate-200" />
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                {isRtl ? "الشروط والأحكام التجارية" : "Commercial Terms & Conditions"}
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
                {isRtl
                  ? "القواعد والسياسات المنظمة لتوريد قطع غيار المصاعد، عروض الأسعار، الضمان، وحقوق المقاولين والعملاء في المملكة."
                  : "Standard commercial policies governing procurement, quotation validity, warranty, and logistics across KSA."}
              </p>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-slate-600 bg-white border border-slate-200 px-3.5 py-2 rounded-xl shrink-0 shadow-2xs">
              <Scale className="w-4 h-4 text-[#C59341]" />
              <span>KSA COMMERCIAL LAW COMPLIANT</span>
            </div>
          </div>
        </section>

        {/* Terms Sections */}
        <div className="space-y-5">
          {termsSections.map((sec) => (
            <div
              key={sec.num}
              className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-2xs relative overflow-hidden group hover:border-[#C59341]/60 transition-all duration-300"
            >
              <CardTexture variant="process" watermark={`TERMS | ${sec.num}`} />

              <div className="relative z-10 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#C59341]">
                    {sec.num} |
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    {sec.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                  {sec.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Contact Desk Notice */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-600">
            <span className="font-bold text-slate-900 block">
              {isRtl ? "مكتب الامتثال والعقود التجارية:" : "Commercial Contracts & Compliance Desk:"}
            </span>
            <span>CR: 2050078848 | VAT: 311250980100003 | Dammam, KSA</span>
          </div>

          <Link
            href={`/${validLocale}/contact`}
            className="shrink-0 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-mono font-bold text-xs transition-colors"
          >
            {isRtl ? "تواصل مع الإدارة القانونية" : "Contact Contracts Desk"}
          </Link>
        </div>
      </div>
    </div>
  );
}

