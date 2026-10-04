import React, { Suspense } from "react";
import type { Metadata } from "next";
import { isValidLocale, defaultLocale, getDictionary, type Locale } from "@/lib/i18n";
import { getAllParts, getAllCategories, getAllCompatibleBrands } from "@/lib/catalog";
import { CatalogClientView } from "@/components/catalog/CatalogClientView";
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
  const dict = await getDictionary(validLocale);

  return {
    alternates: getLocalizedAlternates(validLocale, "/catalog"),
    title: dict.catalog.title,
    description: dict.catalog.subtitle,
  };
}

export default async function CatalogPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const validLocale: Locale = isValidLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(validLocale);
  const isRtl = validLocale === "ar";

  const parts = getAllParts();
  const categories = getAllCategories();
  const compatibleBrands = getAllCompatibleBrands();

  return (
    <div className="min-h-screen pb-16 bg-transparent">
      <PageHero
        image="/images/catalog/catalog-hero-bg.jpg"
        imageWebp="/images/catalog/catalog-hero-bg.webp"
        imageAlt="Jupiter Elevators Hoistway & Component Engineering"
        eyebrow="COMPONENT INVENTORY DIRECTORY"
        badge={
          <span className="px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 text-slate-300 font-mono text-xs hidden sm:flex items-center gap-1.5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <strong className="text-white">{parts.length}</strong> ACTIVE SKUS
          </span>
        }
        action={<LineCardModal lang={validLocale} />}
        title={isRtl ? "المتجر" : "Shop"}
        subtitle={
          isRtl
            ? "القطع المعتمدة للمصاعد الكهربائية والهيدروليكية | المملكة العربية السعودية"
            : "Certified Elevator Components | Saudi Arabia Ready Stock"
        }
      />

      {/* Main Content Area with Overlapping Floating Search Dock (matching inspiration) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-10 sm:-mt-12 space-y-8">
        {/* Suspense boundary for client search params */}
        <Suspense
          fallback={
            <div className="p-12 text-center font-mono text-xs text-slate-400">
              LOADING TECHNICAL DIRECTORY...
            </div>
          }
        >
          <CatalogClientView
            initialParts={parts}
            categories={categories}
            compatibleBrands={compatibleBrands}
            lang={validLocale}
            dict={dict}
          />
        </Suspense>
      </div>
    </div>
  );
}

