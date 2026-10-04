"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, MessageCircle, Search, X } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ElevatorBrand } from "@/data/brands";
import { BrandLogo } from "./BrandLogo";

interface BrandsClientViewProps {
  brands: ElevatorBrand[];
  brandPartCounts: Record<string, { total: number; inStock: number }>;
  lang: Locale;
}

export function BrandsClientView({
  brands,
  brandPartCounts,
  lang,
}: BrandsClientViewProps) {
  const isRtl = lang === "ar";
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: isRtl ? "جميع الماركات" : "All brands" },
    { id: "multinational", label: isRtl ? "الماركات العالمية" : "Global OEMs" },
    { id: "controllers", label: isRtl ? "أنظمة التحكم" : "Controllers" },
    { id: "doorSystems", label: isRtl ? "أنظمة الأبواب" : "Door systems" },
    { id: "machines", label: isRtl ? "ماكينات الجر" : "Traction machines" },
  ];

  const filteredBrands = useMemo(() => {
    const searchTerm = query.trim().toLowerCase();
    return brands.filter((brand) => {
      if (selectedCategory !== "all" && brand.category !== selectedCategory) return false;
      if (!searchTerm) return true;

      return [
        brand.name,
        brand.description.en,
        brand.description.ar,
        ...brand.supportedSystems.en,
        ...brand.supportedSystems.ar,
      ].some((value) => value.toLowerCase().includes(searchTerm));
    });
  }, [brands, query, selectedCategory]);

  return (
    <div>
      <div className="flex flex-col gap-5 border-b border-slate-200 pb-5 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-x-5 gap-y-2" role="group" aria-label={isRtl ? "تصفية الماركات" : "Filter brands by type"}>
          {categories.map((category) => {
            const selected = selectedCategory === category.id;
            const count = category.id === "all"
              ? brands.length
              : brands.filter((brand) => brand.category === category.id).length;

            return (
              <button
                key={category.id}
                type="button"
                aria-pressed={selected}
                onClick={() => setSelectedCategory(category.id)}
                className={`border-b-2 py-2 text-sm transition-colors ${
                  selected
                    ? "border-[#9A702D] font-semibold text-slate-950"
                    : "border-transparent text-slate-500 hover:text-slate-900"
                }`}
              >
                {category.label} <span className="ms-1 text-xs text-slate-400">{count}</span>
              </button>
            );
          })}
        </div>

        <label className="relative block w-full md:max-w-xs">
          <span className="sr-only">{isRtl ? "ابحث عن ماركة أو نظام" : "Search brands or systems"}</span>
          <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={isRtl ? "ابحث عن ماركة أو نظام" : "Search a brand or system"}
            className="h-11 w-full border border-slate-300 bg-white ps-10 pe-10 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label={isRtl ? "إمسح البحث" : "Clear search"}
              className="absolute end-2 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-slate-800"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </label>
      </div>

      <p className="py-4 text-xs text-slate-500" aria-live="polite">
        {isRtl
          ? `${filteredBrands.length} ماركات`
          : `${filteredBrands.length} ${filteredBrands.length === 1 ? "brand" : "brands"}`}
      </p>

      {filteredBrands.length > 0 ? (
        <ul className="divide-y divide-slate-200 border-y border-slate-200">
          {filteredBrands.map((brand) => {
            const counts = brandPartCounts[brand.catalogBrandName] ?? { total: 0, inStock: 0 };
            const catalogUrl = `/${lang}/catalog?brand=${encodeURIComponent(brand.catalogBrandName)}`;
            const whatsappInquiryUrl = `https://wa.me/966562614370?text=${encodeURIComponent(
              isRtl
                ? `السلام عليكم، أود الاستفسار عن قطع غيار لمصاعد ماركة ${brand.name}`
                : `Hello, I would like to inquire about spare parts for ${brand.name} elevators.`
            )}`;

            return (
              <li key={brand.id} className="grid gap-4 py-6 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:gap-5 lg:grid-cols-[3.5rem_minmax(0,1fr)_12rem_13rem] lg:items-center">
                <div className="flex h-12 w-12 items-center justify-center">
                  <BrandLogo brandId={brand.id} className="h-10 w-10" />
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h2 className="text-lg font-semibold tracking-tight text-slate-950">{brand.name}</h2>
                    <span className="text-xs text-slate-500">{brand.country[lang]}</span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-slate-600">
                    {brand.description[lang]}
                  </p>
                  <p className="mt-2 line-clamp-1 text-xs text-slate-500">
                    <span className="font-medium text-slate-700">{isRtl ? "الأنظمة:" : "Systems:"}</span>{" "}
                    {brand.supportedSystems[lang].join(" · ")}
                  </p>
                </div>

                <p className="text-sm text-slate-600 sm:col-start-2 lg:col-start-auto lg:text-end">
                  {counts.inStock > 0 ? (
                    <>
                      <span className="font-semibold text-slate-950">{counts.inStock}</span>{" "}
                      {isRtl ? "قطع متوفرة" : "parts in stock"}
                      {counts.total > counts.inStock && (
                        <span className="block text-xs text-slate-500">
                          {isRtl ? `${counts.total} قطع متوافقة` : `${counts.total} compatible listings`}
                        </span>
                      )}
                    </>
                  ) : counts.total > 0 ? (
                    <>
                      {isRtl ? "لا يوجد مخزون معلن" : "No listed stock"}
                      <span className="block text-xs text-slate-500">
                        {isRtl ? `${counts.total} قطع متوافقة` : `${counts.total} compatible listings`}
                      </span>
                    </>
                  ) : (
                    isRtl ? "التوفر حسب الطلب" : "Availability on request"
                  )}
                </p>

                <div className="flex items-center gap-4 sm:col-start-2 lg:col-start-auto lg:justify-end">
                  <Link
                    href={catalogUrl}
                    className="inline-flex min-h-10 items-center justify-center gap-2 bg-slate-950 px-4 text-sm font-medium text-white transition-colors hover:bg-slate-800"
                  >
                    <span>{isRtl ? "عرض القطع" : "Browse compatible parts"}</span>
                    <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
                  </Link>
                  <a
                    href={whatsappInquiryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={isRtl ? `استفسار عن ${brand.name} عبر واتساب` : `Ask about ${brand.name} on WhatsApp`}
                    className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-950"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    <span className="hidden xl:inline">{isRtl ? "استفسار" : "Ask"}</span>
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="border-y border-slate-200 py-12 text-center">
          <h2 className="text-lg font-semibold text-slate-950">
            {isRtl ? "لم نعثر على ماركات مطابقة" : "No matching brands"}
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            {isRtl ? "جرّب بحثًا آخر أو تغيير الفئة." : "Try another search or category."}
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setSelectedCategory("all");
            }}
            className="mt-4 text-sm font-medium text-[#8A6428] underline underline-offset-4"
          >
            {isRtl ? "إعادة ضبط البحث" : "Clear filters"}
          </button>
        </div>
      )}

      <aside className="mt-10 flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-600">
          {isRtl
            ? "تبحث عن ماركة أو نظام غير مدرج؟ راسلنا بصورة لوحة البيانات للمساعدة في التحديد."
            : "Looking for an unlisted brand or system? Send us a nameplate photo and we’ll help identify it."}
        </p>
        <Link
          href={`/${lang}/contact`}
          className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-[#8A6428] hover:underline"
        >
          <span>{isRtl ? "مكتب الهندسة" : "Contact our team"}</span>
          <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
        </Link>
      </aside>
    </div>
  );
}
