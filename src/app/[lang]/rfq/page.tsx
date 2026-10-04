import React from "react";
import type { Metadata } from "next";
import { isValidLocale, defaultLocale, getDictionary, type Locale } from "@/lib/i18n";
import { RfqClientView } from "@/components/rfq/RfqClientView";
import { Calculator } from "lucide-react";
import { getLocalizedAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const validLocale: Locale = isValidLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(validLocale);

  return {
    alternates: getLocalizedAlternates(validLocale, "/rfq"),
    title: dict.rfq.title,
    description: dict.rfq.subtitle,
  };
}

export default async function RfqPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const validLocale: Locale = isValidLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(validLocale);

  return (
    <div className="py-8 sm:py-12 bg-transparent min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Page Header */}
        <div>
          <div className="flex items-center gap-3 text-xs font-mono font-bold tracking-wider text-slate-400 uppercase mb-3">
            <span className="text-slate-800">01</span>
            <span>BILL OF MATERIALS (BOM) & QUOTATIONS</span>
            <div className="h-px w-16 bg-slate-200" />
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                {dict.rfq.title}
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
                {dict.rfq.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-slate-600 bg-white border border-slate-200 px-3.5 py-2 rounded-xl shrink-0 shadow-2xs">
              <Calculator className="w-4 h-4 text-[#C59341]" />
              <span>INSTANT CONTRACTOR DISPATCH</span>
            </div>
          </div>
        </div>

        <RfqClientView lang={validLocale} dict={dict} />
      </div>
    </div>
  );
}

