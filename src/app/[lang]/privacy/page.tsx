import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { isValidLocale, defaultLocale, type Locale } from "@/lib/i18n";
import { CardTexture } from "@/components/ui/card-texture";
import { ShieldCheck } from "lucide-react";
import { getLocalizedAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const validLocale: Locale = isValidLocale(lang) ? lang : defaultLocale;

  return {
    alternates: getLocalizedAlternates(validLocale, "/privacy"),
    title: validLocale === "ar" ? "سياسة الخصوصية وحماية البيانات" : "Privacy & Data Protection Policy",
    description:
      validLocale === "ar"
        ? "سياسة الخصوصية وحماية البيانات الشخصية لشركة سبيس للمقاولات الصناعية وفقاً لنظام حماية البيانات الشخصية في السعودية (PDPL)."
        : "Privacy policy and data governance for Jupiter Elevators in compliance with the Saudi Personal Data Protection Law (PDPL).",
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const validLocale: Locale = isValidLocale(lang) ? lang : defaultLocale;
  const isRtl = validLocale === "ar";

  const privacySections = [
    {
      num: "01",
      title: isRtl ? "الالتزام بنظام حماية البيانات السعودي (PDPL)" : "Commitment to Saudi PDPL Governance",
      content: isRtl
        ? "تلتزم شركة سبيس للمقاولات الصناعية (جوبيتر للمصاعد) التزاماً تاماً بنظام حماية البيانات الشخصية الصادر بالمرسوم الملكي رقم (م/19) ولوائحه التنفيذية في المملكة العربية السعودية، لضمان خصوصية وسرية بيانات عملائنا من مقاولين ومهندسين ومؤسسات صيانة."
        : "Space Industrial Cont. Company (Jupiter Elevators) strictly complies with the Saudi Personal Data Protection Law (PDPL) promulgated under Royal Decree No. (M/19), ensuring comprehensive confidentiality for contractor, engineer, and facility data.",
    },
    {
      num: "02",
      title: isRtl ? "البيانات التي نقوم بجمعها" : "Categories of Data Collected",
      content: isRtl
        ? "نقتصر على جمع البيانات الضرورية لإتمام عمليات التسعير والتوريد والشحن، وتشمل: اسم المسؤول، اسم المؤسسة أو الشركة، السجل التجاري، رقم الجوال للتواصل عبر واتساب، عنوان التسليم الميداني، ومواصفات القطع المطلوبة."
        : "We collect strictly necessary B2B operational data: contact person name, company name, commercial registration number, phone number for WhatsApp logistics dispatch, project delivery address, and requested component specifications.",
    },
    {
      num: "03",
      title: isRtl ? "أغراض استخدام ومعالجة البيانات" : "Purposes of Data Processing",
      content: isRtl
        ? "تُستخدم البيانات فقط لأغراض: إصدار عروض الأسعار الرسمية (BOM)، ترتيب الشحن السريع مع شركات النقل المعتمدة في المملكة (مثل سمسا وناقل)، تقديم الدعم الفني والمطابقة الميدانية، والامتثال للمتطلبات الضريبية والجمركية الصادرة من هيئة الزكاة والضريبة والجمارك (ZATCA)."
        : "Collected information is utilized exclusively for generating official quotations, coordinating transport via licensed couriers (e.g., SMSA, NAQEL), providing technical component matching, and adhering to ZATCA commercial invoicing mandates.",
    },
    {
      num: "04",
      title: isRtl ? "أمن وحماية البيانات" : "Data Storage Security & Protection",
      content: isRtl
        ? "نطبق أعلى معايير التشفير الفني (SSL/TLS) وبروتوكولات الأمان المؤسسي لحماية قواعد بيانات التوريد من أي وصول أو تعديل غير مصرح به، ولا نقوم على الإطلاق ببيع أو مشاركة بيانات عملائنا مع أي جهات تسويقية خارجية."
        : "We employ enterprise-grade SSL/TLS encryption and strict access governance to protect commercial data from unauthorized access. We strictly do not sell, rent, or trade client information to any third-party marketing entities.",
    },
    {
      num: "05",
      title: isRtl ? "حقوق صاحب البيانات الشخصية" : "Data Subject Rights",
      content: isRtl
        ? "يحق لك في أي وقت: طلب الاطلاع على بياناتك المسجلة لدينا، طلب تعديلها أو تحديثها، أو طلب حذف بياناتك وسجلات تواصلك التجاري عند انتهاء العلاقة التعاقدية وفقاً للضوابط النظامية المعمول بها."
        : "Under the Saudi PDPL, you reserve the right to access your stored contact records, request updates or corrections, and request data erasure upon conclusion of commercial dealings, subject to statutory tax record retention requirements.",
    },
    {
      num: "06",
      title: isRtl ? "مشاركة بيانات الاستفسار مع مزودي الخدمة" : "Inquiry delivery and service providers",
      content: isRtl
        ? "نستخدم بيانات التواصل وطلب التسعير للرد على استفسارك. عند تفعيل البريد الإلكتروني، تُرسل البيانات عبر Resend إلى صندوق البريد المخصص للمبيعات. وقد يفتح الموقع مسودة واتساب لتراجعها وترسلها بنفسك. قد تعالج Resend وWhatsApp البيانات وفق سياساتهما الخاصة. لا ترسل معلومات شخصية حساسة عبر هذه النماذج."
        : "We use the contact and quote details you submit to respond to your inquiry. When email delivery is enabled, the form sends those details through Resend to our designated sales inbox. Your browser may also open a WhatsApp draft for you to review and send. Resend and WhatsApp may process data under their own privacy terms. Do not include sensitive personal data in these forms.",
    },
  ];

  return (
    <div className="py-10 sm:py-16 bg-transparent min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <section>
          <div className="flex items-center gap-3 text-xs font-mono font-bold tracking-wider text-slate-400 uppercase mb-3">
            <span className="text-slate-800">01</span>
            <span>DATA GOVERNANCE & PRIVACY COMPLIANCE</span>
            <div className="h-px w-16 bg-slate-200" />
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                {isRtl ? "سياسة الخصوصية وحماية البيانات" : "Privacy & Data Protection Policy"}
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
                {isRtl
                  ? "حوكمة البيانات التجارية والامتثال الكامل لنظام حماية البيانات الشخصية في المملكة العربية السعودية (PDPL)."
                  : "Transparent commercial data management in full accordance with the Saudi Personal Data Protection Law (PDPL)."}
              </p>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-slate-600 bg-white border border-slate-200 px-3.5 py-2 rounded-xl shrink-0 shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>SAUDI PDPL COMPLIANT</span>
            </div>
          </div>
        </section>

        {/* Privacy Sections */}
        <div className="space-y-5">
          {privacySections.map((sec) => (
            <div
              key={sec.num}
              className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-2xs relative overflow-hidden group hover:border-[#C59341]/60 transition-all duration-300"
            >
              <CardTexture variant="blueprint" watermark={`PDPL | ${sec.num}`} />

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

        {/* Data Protection Officer Contact */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-600 space-y-1">
            <span className="font-bold text-slate-900 block">
              {isRtl ? "مسؤول حماية البيانات (DPO):" : "Data Protection Officer (DPO):"}
            </span>
            <p>Email: legal@jupiterelevators.com | Phone: +966 562614370</p>
            <p>Space Industrial Cont. Company, Dammam 31545, Saudi Arabia</p>
          </div>

          <Link
            href={`/${validLocale}/contact`}
            className="shrink-0 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-mono font-bold text-xs transition-colors"
          >
            {isRtl ? "مراسلة مسؤول الخصوصية" : "Contact Privacy Officer"}
          </Link>
        </div>
      </div>
    </div>
  );
}

