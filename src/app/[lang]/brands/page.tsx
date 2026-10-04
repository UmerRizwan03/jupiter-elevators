import { Suspense } from "react";
import type { Metadata } from "next";
import { isValidLocale, defaultLocale, type Locale } from "@/lib/i18n";
import { getAllParts } from "@/lib/catalog";
import { elevatorBrands } from "@/data/brands";
import { BrandsClientView } from "@/components/brands/BrandsClientView";
import { LineCardModal } from "@/components/catalog/LineCardModal";
import { PageHero } from "@/components/layout/PageHero";
import { getLocalizedAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const validLocale: Locale = isValidLocale(lang) ? lang : defaultLocale;
  const isRtl = validLocale === "ar";

  return {
    alternates: getLocalizedAlternates(validLocale, "/brands"),
    title: isRtl
      ? "الماركات العالمية المتوافقة | قطع غيار أوتيس، كوني، شيندلر، مونارك"
      : "Compatible Elevator Brands | Otis, KONE, Schindler, Monarch",
    description: isRtl
      ? "توزيع وتوريد قطع غيار المصاعد المتوافقة مع كبرى الشركات العالمية: أوتيس، كوني، شيندلر، ميتسوبيشي، ومونارك في السعودية. مخزون جاهز للتسليم الفوري في الدمام."
      : "Compatible elevator spare parts by lift brand and system, with in-stock availability shown for the Dammam hub.",
  };
}

export default async function BrandsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const validLocale: Locale = isValidLocale(lang) ? lang : defaultLocale;
  const isRtl = validLocale === "ar";

  const brandPartCounts: Record<string, { total: number; inStock: number }> = {};
  getAllParts().forEach((part) => {
    part.compatibleBrands.forEach((brandName) => {
      const counts = (brandPartCounts[brandName] ??= { total: 0, inStock: 0 });
      counts.total += 1;
      if (part.inStock) counts.inStock += 1;
    });
  });

  return (
    <div className="min-h-screen bg-transparent pb-16">
      <PageHero
        image="/images/brands/brands-hero-bg.jpg"
        imageWebp="/images/brands/brands-hero-bg.webp"
        imageAlt="Elevator brands and systems supported by Jupiter Elevators"
        eyebrow={isRtl ? "جوبيتر للمصاعد · الدمام" : "Jupiter Elevators · Dammam"}
        badge={
          <span className="px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 text-slate-300 font-mono text-xs hidden sm:flex items-center gap-1.5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {elevatorBrands.length} SUPPORTED BRANDS
          </span>
        }
        action={<LineCardModal lang={validLocale} />}
        title={isRtl ? "العلامات" : "Elevator brands"}
        subtitle={
          isRtl
            ? "اختر ماركة المصعد للبحث عن قطع الغيار المتوافقة والمتوفرة."
            : "Find compatible spare parts by elevator brand or system. Stock counts reflect parts currently marked in stock."
        }
      />

      <div className="mx-auto max-w-7xl px-4 pt-7 sm:px-6 lg:px-8 lg:pt-9">
        <Suspense
          fallback={<p className="py-8 text-sm text-slate-500">{isRtl ? "جارٍ تحميل الماركات..." : "Loading brands..."}</p>}
        >
          <BrandsClientView
            brands={elevatorBrands}
            brandPartCounts={brandPartCounts}
            lang={validLocale}
          />
        </Suspense>
      </div>
    </div>
  );
}
