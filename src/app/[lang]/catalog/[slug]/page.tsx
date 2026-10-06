import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  defaultLocale,
  getDictionary,
  isValidLocale,
  locales,
  type Locale,
} from "@/lib/i18n";
import {
  getAllParts,
  getPartBySlug,
  getCategoryById,
  getPartsByCategory,
  getPartImageUrl,
} from "@/lib/catalog";
import { ArrowRight, ChevronRight } from "lucide-react";
import { PartDetailActions } from "@/components/catalog/PartDetailActions";
import { PartVariantMatrix } from "@/components/catalog/PartVariantMatrix";
import { getProductJsonLd } from "@/lib/seo";
import { getLocalizedAlternates } from "@/lib/seo";

export function generateStaticParams() {
  const parts = getAllParts();
  return locales.flatMap((lang) => parts.map((part) => ({ lang, slug: part.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const validLocale: Locale = isValidLocale(lang) ? lang : defaultLocale;
  const part = getPartBySlug(slug);

  if (!part) return {
    alternates: getLocalizedAlternates(validLocale, `/catalog/${slug}`), title: "Part Not Found" };

  return {
    alternates: getLocalizedAlternates(validLocale, `/catalog/${part.slug}`),
    title: `${part.name[validLocale]} (${part.sku})`,
    description: part.description[validLocale],
  };
}

export default async function PartDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const validLocale: Locale = isValidLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(validLocale);
  const part = getPartBySlug(slug);
  if (!part) notFound();



  const category = getCategoryById(part.categoryId);
  const relatedParts = getPartsByCategory(part.categoryId)
    .filter((item) => item.id !== part.id)
    .slice(0, 3);
  const isRtl = validLocale === "ar";
  const productJsonLd = getProductJsonLd(part, validLocale);

  return (
    <div className="min-h-screen bg-transparent py-8 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <div className="mx-auto max-w-7xl space-y-14 px-4 sm:px-6 lg:px-8">
        <nav
          aria-label={isRtl ? "مسار التنقل" : "Breadcrumb"}
          className="flex items-center gap-2 overflow-x-auto whitespace-nowrap pb-1 text-xs text-slate-500"
        >
          <Link href={`/${validLocale}`} className="hover:text-slate-950">
            {dict.nav.home}
          </Link>
          <ChevronRight className="h-3 w-3 shrink-0 rtl:rotate-180" aria-hidden="true" />
          <Link href={`/${validLocale}/catalog`} className="hover:text-slate-950">
            {dict.nav.catalog}
          </Link>
          {category && (
            <>
              <ChevronRight className="h-3 w-3 shrink-0 rtl:rotate-180" aria-hidden="true" />
              <Link
                href={`/${validLocale}/catalog?category=${category.id}`}
                className="hover:text-slate-950"
              >
                {category.name[validLocale]}
              </Link>
            </>
          )}
          <ChevronRight className="h-3 w-3 shrink-0 rtl:rotate-180" aria-hidden="true" />
          <span className="font-mono text-slate-800">{part.sku}</span>
        </nav>

        <section className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-14">
          <div className="relative aspect-square overflow-hidden bg-[#F1F3F5] lg:sticky lg:top-24 lg:col-span-5">
            <Image
              src={getPartImageUrl(part)}
              alt={part.name[validLocale]}
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-contain p-8 sm:p-12"
              priority
            />
          </div>

          <div className="lg:col-span-7 lg:py-2">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
              {category && (
                <Link
                  href={`/${validLocale}/catalog?category=${category.id}`}
                  className="font-medium text-[#8A6428] underline decoration-[#D8C49F] underline-offset-4 hover:decoration-[#8A6428]"
                >
                  {part.subcategory[validLocale]}
                </Link>
              )}
              <span className="text-slate-300" aria-hidden="true">|</span>
              <span className="font-mono text-xs text-slate-500">SKU {part.sku}</span>
            </div>

            <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-4xl">
              {part.name[validLocale]}
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              {part.description[validLocale]}
            </p>

            <dl className="mt-7 grid grid-cols-1 gap-y-4 border-y border-slate-200 py-5 text-sm sm:grid-cols-2 sm:gap-x-8">
              <div>
                <dt className="text-slate-500">{isRtl ? "التوفر" : "Availability"}</dt>
                <dd className={`mt-1 font-medium ${part.inStock ? "text-emerald-800" : "text-amber-800"}`}>
                  {part.inStock ? dict.catalog.inStock : dict.catalog.onOrder}
                </dd>
              </div>
              <div>
                <dt className="text-slate-500">{dict.catalog.origin}</dt>
                <dd className="mt-1 font-medium text-slate-900">{part.origin}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-slate-500">{dict.catalog.compatibleWith}</dt>
                <dd className="mt-1 font-medium leading-relaxed text-slate-900">
                  {part.compatibleBrands.length
                    ? part.compatibleBrands.join(" · ")
                    : isRtl
                      ? "يرجى التواصل للتحقق من التوافق"
                      : "Contact us to confirm compatibility"}
                </dd>
              </div>
            </dl>

            <div className="mt-6">
              <Suspense fallback={<div className="h-12 bg-slate-100 animate-pulse rounded-lg" />}>
                <PartDetailActions
                  part={part}
                  lang={validLocale}
                  dict={dict}
                />
              </Suspense>
            </div>
          </div>
        </section>

        {Object.keys(part.specifications).length > 0 && (
          <section aria-labelledby="specifications-heading">
            <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3 border-b border-slate-300 pb-3">
              <h2 id="specifications-heading" className="text-xl font-semibold tracking-tight text-slate-950">
                {dict.catalog.specifications}
              </h2>
              <span className="font-mono text-xs text-slate-500">SKU {part.sku}</span>
            </div>
            <dl className="grid grid-cols-1 gap-x-12 sm:grid-cols-2">
              {Object.entries(part.specifications).map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-start justify-between gap-6 border-b border-slate-200 py-3 text-sm"
                >
                  <dt className="text-slate-500">{key}</dt>
                  <dd className="text-right font-medium text-slate-900 rtl:text-left">{value}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {part.variants && part.variants.length > 0 && (
          <Suspense fallback={<div className="h-32 bg-slate-100 animate-pulse rounded-xl" />}>
            <PartVariantMatrix
              part={part}
              lang={validLocale}
              dict={dict}
            />
          </Suspense>
        )}



        {relatedParts.length > 0 && (
          <section aria-labelledby="related-heading">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-300 pb-3">
              <h2 id="related-heading" className="text-xl font-semibold tracking-tight text-slate-950">
                {isRtl ? "قطع ذات صلة" : "Related parts"}
              </h2>
              <Link
                href={`/${validLocale}/catalog?category=${part.categoryId}`}
                className="inline-flex items-center gap-1 text-sm font-medium text-[#8A6428] hover:underline"
              >
                <span>{isRtl ? "عرض الفئة" : "View category"}</span>
                <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" aria-hidden="true" />
              </Link>
            </div>
            <ul className="divide-y divide-slate-200">
              {relatedParts.map((related) => (
                <li key={related.id}>
                  <Link
                    href={`/${validLocale}/catalog/${related.slug}`}
                    className="group flex items-center gap-4 py-4"
                  >
                    <span className="relative h-16 w-16 shrink-0 overflow-hidden bg-[#F1F3F5]">
                      <Image
                        src={getPartImageUrl(related)}
                        alt={related.name[validLocale]}
                        fill
                        sizes="64px"
                        className="object-contain p-2"
                      />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-medium text-slate-900 group-hover:text-[#8A6428]">
                        {related.name[validLocale]}
                      </span>
                      <span className="mt-1 block font-mono text-xs text-slate-500">
                        SKU {related.sku} · {related.inStock ? dict.catalog.inStock : dict.catalog.onOrder}
                      </span>
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 group-hover:text-[#8A6428] rtl:rotate-180" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
