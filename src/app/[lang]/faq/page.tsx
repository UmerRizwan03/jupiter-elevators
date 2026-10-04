import React from "react";
import type { Metadata } from "next";
import { isValidLocale, defaultLocale, type Locale } from "@/lib/i18n";
import { CardTexture } from "@/components/ui/card-texture";
import { getFaqJsonLd } from "@/lib/seo";
import {
  HelpCircle,
  MessageCircle,
} from "lucide-react";
import { getLocalizedAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const validLocale: Locale = isValidLocale(lang) ? lang : defaultLocale;

  return {
    alternates: getLocalizedAlternates(validLocale, "/faq"),
    title: validLocale === "ar" ? "الأسئلة الشائعة والدعم الفني" : "Technical FAQs & Help Desk",
    description:
      validLocale === "ar"
        ? "إجابات شاملة حول مطابقة قطع غيار المصاعد، الشحن السريع في السعودية، الضمان واعتماد EN 81."
        : "Answers on elevator spare parts compatibility, express KSA shipping, warranty and EN 81 compliance.",
  };
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const validLocale: Locale = isValidLocale(lang) ? lang : defaultLocale;
  const isRtl = validLocale === "ar";

  const faqs = [
    {
      category: "QUALITY & GENUINE PARTS",
      question: isRtl
        ? "هل قطع الغيار ومكونات المصاعد لديكم أصلية 100% أم بدائل مقلدة؟"
        : "Are your elevator spare parts 100% genuine OEM or aftermarket replicas?",
      answer: isRtl
        ? "نحن نورد فقط القطع الأصلية والمكونات المعتمدة من كبرى المصانع العالمية في الهند، الصين، وأوروبا (مثل Monarch و Wittur و Fermator و STEP). كل شحنة تخضع للفحص الميكانيكي والكهربائي وتأتي مصحوبة برقم تسلسلي وشهادات المنشأ الأصلية."
        : "We strictly supply genuine OEM and certified industrial components from verified tier-1 global manufacturers in India, China, and Europe (such as Monarch, Wittur, Fermator, and STEP). Every consignment is tested and accompanied by traceability serials and certificates of origin.",
    },
    {
      category: "SAFETY & CODE COMPLIANCE",
      question: isRtl
        ? "هل المكونات مطابقة لكود البناء السعودي وكود المصاعد الأوروبي EN 81؟"
        : "Do your components meet the Saudi Building Code (SBC) and European EN 81 standard?",
      answer: isRtl
        ? "نعم، كافة أنظمة الأمان (باراشوتات التوقف، منظمات السرعة، أقفال الأبواب، وأجهزة الإنقاذ التلقائي ARD) مطابقة تماماً لمتطلبات كود المصاعد السعودي وكود EN 81-20 / EN 81-50 معتمدة من هيئة المواصفات والمقاييس (SASO)."
        : "Yes, all safety mechanisms (safety gears, overspeed governors, door locks, and Automatic Rescue Devices ARD) fully comply with Saudi Building Code requirements and European Norms EN 81-20 / EN 81-50, backed by SASO and CE compliance documentation.",
    },
    {
      category: "LOGISTICS & SHIPPING",
      question: isRtl
        ? "ما هي المدة المتوقعة لتوصيل قطع الغيار إلى الرياض، جدة، وباقي المدن؟"
        : "What are the shipping delivery times to Riyadh, Jeddah, and other KSA cities?",
      answer: isRtl
        ? "المنطقة الشرقية (الدمام والخبر والجبيل): استلام فوري من المستودع أو توصيل خلال ساعتين. الرياض والقصيم: شحن سريع خلال 24 ساعة عبر الشحن المباشر. جدة ومكة والمدينة والمنطقة الجنوبية: شحن يومي يصل خلال 24 إلى 48 ساعة."
        : "Eastern Province (Dammam, Khobar, Jubail): Immediate warehouse pickup or express 2-hour courier. Riyadh & Central Province: 24-hour express courier. Western & Southern Provinces (Jeddah, Makkah, Medina): Daily scheduled freight arriving within 24 to 48 hours.",
    },
    {
      category: "CONTRACTOR ACCOUNTS & PRICING",
      question: isRtl
        ? "كيف يمكن لشركات الصيانة والمقاولين الحصول على أسعار الجملة أو تسهيلات الدفع؟"
        : "How can elevator maintenance firms obtain wholesale pricing or commercial credit lines?",
      answer: isRtl
        ? "يمكن لشركات صيانة المصاعد والمقاولين المسجلين في السعودية فتح حساب توريد تجاري بالاتصال المباشر بمكتب المبيعات أو إرسال طلب تسعير (RFQ). نوفر خصومات كميات خاصة وتسهيلات دفع معتمدة للشركات ذات العقود الدورية."
        : "Registered maintenance contractors and MEP firms in Saudi Arabia can establish commercial wholesale accounts by submitting an RFQ or contacting our engineering sales desk directly. We offer volume tier discounts and structured payment terms for periodic maintenance contracts.",
    },
    {
      category: "TECHNICAL MATCHING & OBSOLETE PARTS",
      question: isRtl
        ? "لدينا لوحة تحكم أو محرك أبواب قديم مجهول البيانات، كيف تساعدوننا في مطابقته؟"
        : "We have an obsolete or unbranded control board/motor, how do you assist with identification?",
      answer: isRtl
        ? "فريقنا الهندسي في الدمام يوفر خدمة مجانية فورية عبر واتساب: يمكنك إرسال صورة واضحة للقطعة التالفة ولوحة بيانات المحرك، وسيقوم مهندسونا بتحديد الموديل واقتراح البديل المعتمد المتوافق 100% هندسياً."
        : "Our Dammam engineering desk provides a free WhatsApp photo-matching service: simply photograph the damaged board or motor rating plate, and our engineers will determine the exact model and propose a 100% mechanically and electrically compatible replacement.",
    },
    {
      category: "WARRANTY & RETURNS",
      question: isRtl
        ? "ما هو الضمان المقدم على كروت التحكم والمحركات والمغيرات؟"
        : "What is your warranty policy on controllers, inverters, and drive machines?",
      answer: isRtl
        ? "نقدم ضماناً تشغيلياً كاملاً ضد عيوب التصنيع يبدأ من تاريخ التوريد لمدة 12 شهراً لكروت التحكم والمحركات، مع توفير استبدال فوري في حال ثبوت أي خلل مصنعي وفق الشروط التجارية المعتمدة."
        : "We provide an official 12-month manufacturer defect warranty on all electronic boards, inverters, and traction machines from the date of dispatch, with immediate replacement for verified manufacturing defects under standard commercial terms.",
    },
  ];

  const jsonLd = getFaqJsonLd(faqs);

  return (
    <div className="py-10 sm:py-16 bg-transparent min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <section>
          <div className="flex items-center gap-3 text-xs font-mono font-bold tracking-wider text-slate-400 uppercase mb-3">
            <span className="text-slate-800">01</span>
            <span>TECHNICAL KNOWLEDGE BASE & FAQS</span>
            <div className="h-px w-16 bg-slate-200" />
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                {isRtl ? "الأسئلة الشائعة والدعم الفني" : "Technical FAQs & Support Desk"}
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
                {isRtl
                  ? "إجابات معتمدة من كادرنا الهندسي حول توريد قطع الغيار، معايير المطابقة EN 81، وجداول الشحن والتوصيل في المملكة."
                  : "Verified answers from our engineering desk on component sourcing, EN 81 compliance, and nationwide KSA logistics."}
              </p>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-slate-600 bg-white border border-slate-200 px-3.5 py-2 rounded-xl shrink-0 shadow-2xs">
              <HelpCircle className="w-4 h-4 text-[#C59341]" />
              <span>FREQUENTLY ASKED SPECIFICATIONS</span>
            </div>
          </div>
        </section>

        {/* FAQs List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-2xs relative overflow-hidden group hover:border-[#C59341]/60 transition-all duration-300"
            >
              <CardTexture variant="blueprint" watermark={`FAQ | 0${index + 1}`} />

              <div className="relative z-10 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-slate-400">
                    0{index + 1} |
                  </span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 uppercase">
                    {faq.category}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                  {faq.question}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Still Have Questions Hotline Banner */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 sm:p-10 text-white shadow-md relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="relative z-10 space-y-2">
            <span className="text-xs font-mono text-[#C59341] font-bold">
              UNRESOLVED SPECIFICATION?
            </span>
            <h3 className="text-xl font-bold text-white">
              {isRtl ? "هل لديك استفسار عن قطعة غير مدرجة؟" : "Have a part requirement not listed above?"}
            </h3>
            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              {isRtl
                ? "تواصل مباشرة مع مهندسينا في الدمام عبر واتساب وسنقوم بالرد بالتوفر والسعر خلال دقائق معدودة."
                : "Connect directly with our Dammam engineers via WhatsApp for real-time SKU lookup and quote."}
            </p>
          </div>

          <a
            href="https://wa.me/966562614370"
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs shadow-md transition-colors"
          >
            <MessageCircle className="w-4 h-4 fill-white text-transparent" />
            <span>{isRtl ? "تواصل مع مهندس عبر واتساب" : "WhatsApp Engineering Desk"}</span>
          </a>
        </div>
      </div>
    </div>
  );
}

