"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Filter, Shield, ArrowRight } from "lucide-react";
import type { Locale, Dictionary } from "@/lib/i18n";
import { categories } from "@/data/categories";

interface QuickPartFinderProps {
  lang: Locale;
  dict: Dictionary;
  compatibleBrands: string[];
}

export function QuickPartFinder({ lang, dict, compatibleBrands }: QuickPartFinderProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (selectedCategory && selectedCategory !== "all") params.set("category", selectedCategory);
    if (selectedBrand && selectedBrand !== "all") params.set("brand", selectedBrand);

    router.push(`/${lang}/catalog?${params.toString()}`);
  };

  const isRtl = lang === "ar";

  return (
    <div className="w-full bg-white rounded-2xl shadow-xl border border-slate-200/80 p-5 md:p-7 relative z-20">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand-navy/5 flex items-center justify-center text-brand-navy">
            <Search className="w-4 h-4 text-brand-navy" />
          </div>
          <div>
            <h2 className="text-sm md:text-base font-bold text-brand-navy">
              {dict.finder.title}
            </h2>
            <p className="text-xs text-slate-500">
              {dict.finder.subtitle}
            </p>
          </div>
        </div>
        <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-brand-amber border border-amber-200 text-xs font-semibold">
          <Shield className="w-3.5 h-3.5" />
          <span>{isRtl ? "مخزون السعودية" : "KSA Warehouse Stock"}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {/* Field 1: SKU or Keyword */}
        <div className="relative">
          <label htmlFor="sku-search" className="sr-only">
            {dict.finder.searchPlaceholder}
          </label>
          <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 pl-3.5 rtl:pl-0 rtl:pr-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            id="sku-search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={dict.finder.searchPlaceholder}
            className="w-full h-12 pl-10 rtl:pl-3.5 rtl:pr-10 text-xs md:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy focus:border-transparent text-slate-900 transition-all font-medium placeholder:text-slate-400"
          />
        </div>

        {/* Field 2: Category Selector */}
        <div className="relative">
          <label htmlFor="category-select" className="sr-only">
            {dict.finder.allCategories}
          </label>
          <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 pl-3.5 rtl:pl-0 rtl:pr-3.5 flex items-center pointer-events-none text-slate-400">
            <Filter className="w-4 h-4" />
          </div>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full h-12 pl-10 rtl:pl-3.5 rtl:pr-10 text-xs md:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy focus:border-transparent text-slate-800 transition-all font-medium appearance-none cursor-pointer"
          >
            <option value="all">{dict.finder.allCategories}</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name[lang]}
              </option>
            ))}
          </select>
        </div>

        {/* Field 3: Compatible Lift Brand */}
        <div className="relative">
          <label htmlFor="brand-select" className="sr-only">
            {dict.finder.allBrands}
          </label>
          <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 pl-3.5 rtl:pl-0 rtl:pr-3.5 flex items-center pointer-events-none text-slate-400">
            <Shield className="w-4 h-4" />
          </div>
          <select
            id="brand-select"
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="w-full h-12 pl-10 rtl:pl-3.5 rtl:pr-10 text-xs md:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy focus:border-transparent text-slate-800 transition-all font-medium appearance-none cursor-pointer"
          >
            <option value="all">{dict.finder.allBrands}</option>
            {compatibleBrands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        {/* Field 4: Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full h-12 bg-brand-amber hover:bg-brand-amber-hover text-white font-bold text-sm rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
          >
            <span>{dict.finder.submit}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </button>
        </div>
      </form>
    </div>
  );
}
