"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Search,
  X,
  SlidersHorizontal,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import type { ElevatorCategory, ElevatorPart } from "@/types/catalog";
import type { Locale, Dictionary } from "@/lib/i18n";
import { PartCard } from "./PartCard";

interface CatalogClientViewProps {
  initialParts: ElevatorPart[];
  categories: ElevatorCategory[];
  compatibleBrands: string[];
  lang: Locale;
  dict: Dictionary;
}

export function CatalogClientView({
  initialParts,
  categories,
  compatibleBrands,
  lang,
  dict,
}: CatalogClientViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const isRtl = lang === "ar";

  // URL State initialized
  const initialQuery = searchParams.get("q") || "";
  const initialCategory = searchParams.get("category") || "all";
  const initialBrand = searchParams.get("brand") || "all";
  const requestedModel = searchParams.get("model") || "all";
  const initialModel = ["pmsm", "geared", "vvvf", "micro"].includes(requestedModel) ? requestedModel : "all";
  const initialInStock = searchParams.get("inStock") === "true";

  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState(initialBrand);
  const [selectedModel, setSelectedModel] = useState(initialModel);
  const [inStockOnly, setInStockOnly] = useState(initialInStock);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [recommendationIndex, setRecommendationIndex] = useState(0);

  // Sync state with URL params
  const updateUrlParams = (
    newQuery: string,
    newCategory: string,
    newBrand: string,
    newInStock: boolean,
    newModel: string
  ) => {
    setCurrentPage(1);
    const params = new URLSearchParams();
    if (newQuery.trim()) params.set("q", newQuery.trim());
    if (newCategory && newCategory !== "all") params.set("category", newCategory);
    if (newBrand && newBrand !== "all") params.set("brand", newBrand);
    if (newInStock) params.set("inStock", "true");
    if (newModel !== "all") params.set("model", newModel);

    router.replace(`/${lang}/catalog?${params.toString()}`, { scroll: false });
  };

  const handleQueryChange = (val: string) => {
    setQuery(val);
    updateUrlParams(val, selectedCategory, selectedBrand, inStockOnly, selectedModel);
  };

  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    updateUrlParams(query, catId, selectedBrand, inStockOnly, selectedModel);
  };

  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand);
    updateUrlParams(query, selectedCategory, brand, inStockOnly, selectedModel);
  };

  const handleInStockToggle = (val: boolean) => {
    setInStockOnly(val);
    updateUrlParams(query, selectedCategory, selectedBrand, val, selectedModel);
  };

  const handleModelChange = (model: string) => {
    setSelectedModel(model);
    updateUrlParams(query, selectedCategory, selectedBrand, inStockOnly, model);
  };

  const clearAllFilters = () => {
    setQuery("");
    setSelectedCategory("all");
    setSelectedBrand("all");
    setSelectedModel("all");
    setInStockOnly(false);
    setCurrentPage(1);
    router.replace(`/${lang}/catalog`, { scroll: false });
  };

  // Filter computation
  const filteredParts = useMemo(() => {
    return initialParts.filter((part) => {
      if (inStockOnly && !part.inStock) return false;
      if (selectedCategory !== "all" && part.categoryId !== selectedCategory) return false;
      if (selectedBrand !== "all" && !part.compatibleBrands.includes(selectedBrand)) return false;
      if (selectedModel !== "all") {
        const searchable = `${part.name.en} ${part.subcategory.en} ${part.description.en} ${Object.values(part.specifications).join(" ")}`.toLowerCase();
        const modelTerms: Record<string, string[]> = {
          pmsm: ["pmsm", "permanent magnet", "gearless"],
          geared: ["geared", "gear machine"],
          vvvf: ["vvvf"],
          micro: ["microprocessor", "micro processor", "controller"],
        };
        if (!modelTerms[selectedModel]?.some((term) => searchable.includes(term))) return false;
      }

      if (query.trim() !== "") {
        const q = query.trim().toLowerCase();
        const matchSku = part.sku.toLowerCase().includes(q);
        const matchNameEn = part.name.en.toLowerCase().includes(q);
        const matchNameAr = part.name.ar.toLowerCase().includes(q);
        const matchSubEn = part.subcategory.en.toLowerCase().includes(q);
        const matchSubAr = part.subcategory.ar.toLowerCase().includes(q);
        if (!matchSku && !matchNameEn && !matchNameAr && !matchSubEn && !matchSubAr) {
          return false;
        }
      }

      return true;
    });
  }, [initialParts, query, selectedCategory, selectedBrand, selectedModel, inStockOnly]);

  // Pagination computation (9 items per page like inspiration)
  const ITEMS_PER_PAGE = 9;
  const totalPages = Math.ceil(filteredParts.length / ITEMS_PER_PAGE) || 1;
  const paginatedParts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredParts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredParts, currentPage]);

  // Recommended critical spares for the secondary shelf
  const recommendedParts = useMemo(() => {
    const featured = initialParts.filter((p) => p.featured);
    return featured.length >= 4 ? featured.slice(0, 8) : initialParts.slice(0, 8);
  }, [initialParts]);

  const activeFiltersCount =
    (selectedCategory !== "all" ? 1 : 0) +
    (selectedBrand !== "all" ? 1 : 0) +
    (selectedModel !== "all" ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (query.trim() ? 1 : 0);

  return (
    <div className="w-full space-y-8">
      {/* Top Search Dock (styled directly after inspiration floating dock) */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-100 shadow-xs relative overflow-hidden flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="w-full md:w-auto">
          <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
            {isRtl ? "كل ما تحتاجه لمصاعدك" : "Give All You Need"}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5 font-medium">
            {isRtl
              ? "مخزون الدمام الاستراتيجي جاهز للشحن الفوري في كافة مناطق المملكة"
              : "Ready in Dammam Hub | 24H Nationwide KSA Dispatch"}
          </p>
        </div>

        <div className="w-full md:w-auto flex flex-col sm:flex-row items-center gap-3">
          <select
            aria-label={isRtl ? "نوع نظام المصعد" : "Elevator system type"}
            value={selectedModel}
            onChange={(event) => handleModelChange(event.target.value)}
            className="w-full sm:w-auto h-11 px-4 rounded-full bg-[#F1F3F5] border border-transparent text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-900"
          >
            <option value="all">{isRtl ? "جميع الأنظمة" : "All systems"}</option>
            <option value="pmsm">PMSM Gearless</option>
            <option value="geared">Geared Machine</option>
            <option value="vvvf">VVVF Drive</option>
            <option value="micro">Microprocessor Controller</option>
          </select>
          {/* Integrated Search Input with Black Pill Button */}
          <div className="relative w-full sm:w-80 md:w-96 flex items-center">
            <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 pl-3.5 rtl:pl-0 rtl:pr-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4 text-slate-400" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              placeholder={
                isRtl
                  ? "ابحث برقم SKU أو اسم القطعة..."
                  : "Search an Elevator Part..."
              }
              className="w-full h-11 pl-10 pr-24 rtl:pl-24 rtl:pr-10 text-xs sm:text-sm bg-[#F1F3F5] rounded-full focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 text-slate-900 transition-all placeholder:text-slate-400 font-medium border border-transparent focus:border-transparent"
            />
            {query ? (
              <button
                onClick={() => handleQueryChange("")}
                className="absolute right-20 rtl:right-auto rtl:left-20 text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            ) : null}
            <button
              type="button"
              onClick={() => updateUrlParams(query, selectedCategory, selectedBrand, inStockOnly, selectedModel)}
              className="absolute right-1.5 rtl:right-auto rtl:left-1.5 h-8 px-4 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors flex items-center justify-center shadow-2xs"
            >
              {isRtl ? "بحث" : "Search"}
            </button>
          </div>

          {/* In-Stock Pill Toggle */}
          <label className="inline-flex items-center gap-2 cursor-pointer bg-[#F1F3F5] px-4 py-2.5 rounded-full select-none hover:bg-slate-200/70 transition-colors shrink-0">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => handleInStockToggle(e.target.checked)}
              className="w-3.5 h-3.5 text-slate-900 rounded border-slate-300 focus:ring-slate-900 accent-slate-900 cursor-pointer"
            />
            <span className="text-xs font-semibold text-slate-700">
              {dict.catalog.inStockOnly}
            </span>
          </label>

          {/* Mobile Filter Toggle Button */}
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#F1F3F5] hover:bg-slate-200 text-xs font-bold text-slate-700"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>{isRtl ? "الفلاتر" : "Filters"}</span>
            {activeFiltersCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] flex items-center justify-center font-bold">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Active Filters Badges */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 px-2">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
            {isRtl ? "التصفية النشطة:" : "ACTIVE FILTERS:"}
          </span>

          {selectedCategory !== "all" && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-900 text-white">
              <span>
                {categories.find((c) => c.id === selectedCategory)?.name[lang]}
              </span>
              <button
                onClick={() => handleCategoryChange("all")}
                className="hover:text-[#C59341]"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedBrand !== "all" && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-900 text-white">
              <span>{selectedBrand}</span>
              <button
                onClick={() => handleBrandChange("all")}
                className="hover:text-[#C59341]"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {inStockOnly && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
              <span>{dict.catalog.inStockOnly}</span>
              <button
                onClick={() => handleInStockToggle(false)}
                className="hover:text-rose-600"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          <button
            onClick={clearAllFilters}
            className="text-xs font-semibold text-rose-600 hover:underline ml-2 rtl:ml-0 rtl:mr-2 flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{dict.catalog.clearFilters}</span>
          </button>
        </div>
      )}

      {/* Main Layout: Sidebar Filters + Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Desktop Sidebar Filters (styled like inspiration clean category tree) */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6 sticky top-24">
          {/* Categories Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center justify-between pb-3 border-b border-slate-100">
              <span>{isRtl ? "الأقسام" : "Category"}</span>
              <span className="text-xs font-mono font-medium text-slate-400">
                [{initialParts.length}]
              </span>
            </h3>

            <div className="space-y-1">
              <button
                onClick={() => handleCategoryChange("all")}
                className={`w-full text-left rtl:text-right px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all flex items-center justify-between ${
                  selectedCategory === "all"
                    ? "bg-[#F1F3F5] text-slate-900 font-bold"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <span>{dict.catalog.all}</span>
                <span className="w-6 h-6 rounded-full bg-white text-slate-700 text-[10px] font-bold flex items-center justify-center shadow-2xs">
                  {initialParts.length}
                </span>
              </button>

              {categories.map((cat) => {
                const count = initialParts.filter((p) => p.categoryId === cat.id).length;
                const isSelected = selectedCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`w-full text-left rtl:text-right px-3.5 py-2.5 rounded-2xl text-xs transition-all flex items-center justify-between ${
                      isSelected
                        ? "bg-[#F1F3F5] text-slate-900 font-bold"
                        : "text-slate-600 hover:bg-slate-50 font-medium"
                    }`}
                  >
                    <span className="line-clamp-1">{cat.name[lang]}</span>
                    <span className="w-6 h-6 rounded-full bg-white text-slate-600 text-[10px] font-medium flex items-center justify-center shadow-2xs">
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Compatible Brands Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center justify-between pb-3 border-b border-slate-100">
              <span>{isRtl ? "الماركات المتوافقة" : "OEM Brands"}</span>
              <ShieldCheck className="w-4 h-4 text-[#C59341]" />
            </h3>

            <div className="flex flex-wrap gap-1.5 max-h-56 overflow-y-auto pr-1">
              <button
                onClick={() => handleBrandChange("all")}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  selectedBrand === "all"
                    ? "bg-slate-900 text-white font-bold"
                    : "bg-[#F1F3F5] text-slate-700 hover:bg-slate-200"
                }`}
              >
                {dict.catalog.all}
              </button>
              {compatibleBrands.map((brand) => {
                const isSelected = selectedBrand === brand;
                return (
                  <button
                    key={brand}
                    onClick={() => handleBrandChange(brand)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                      isSelected
                        ? "bg-slate-900 text-white font-bold"
                        : "bg-[#F1F3F5] text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {brand}
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Mobile Filter Sheet Modal */}
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex justify-end lg:hidden">
            <div className="w-full max-w-xs bg-white h-full p-6 overflow-y-auto space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <span className="font-bold text-slate-900 text-sm">
                  {isRtl ? "تصفية المنتجات" : "Filter Directory"}
                </span>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 rounded-md text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Category Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {dict.catalog.categoryFilter}
                </label>
                <div className="space-y-1">
                  <button
                    onClick={() => {
                      handleCategoryChange("all");
                      setMobileFilterOpen(false);
                    }}
                    className={`w-full text-left rtl:text-right px-3.5 py-2.5 rounded-xl text-xs font-bold ${
                      selectedCategory === "all" ? "bg-slate-900 text-white" : "bg-slate-50"
                    }`}
                  >
                    {dict.catalog.all}
                  </button>
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        handleCategoryChange(c.id);
                        setMobileFilterOpen(false);
                      }}
                      className={`w-full text-left rtl:text-right px-3.5 py-2.5 rounded-xl text-xs ${
                        selectedCategory === c.id ? "bg-slate-900 text-white font-bold" : "bg-slate-50"
                      }`}
                    >
                      {c.name[lang]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Brand Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {dict.catalog.brandFilter}
                </label>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => {
                      handleBrandChange("all");
                      setMobileFilterOpen(false);
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs ${
                      selectedBrand === "all" ? "bg-slate-900 text-white font-bold" : "bg-slate-100"
                    }`}
                  >
                    {dict.catalog.all}
                  </button>
                  {compatibleBrands.map((b) => (
                    <button
                      key={b}
                      onClick={() => {
                        handleBrandChange(b);
                        setMobileFilterOpen(false);
                      }}
                      className={`px-3 py-1.5 rounded-full text-xs ${
                        selectedBrand === b ? "bg-slate-900 text-white font-bold" : "bg-slate-100"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Product Grid Area (3 Columns matching inspiration) */}
        <div className="lg:col-span-9 space-y-6">
          {/* Header count bar */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase">
                02 | {isRtl ? "النتائج المطابقة" : "RESULTS"}
              </span>
              <span className="text-xs font-semibold text-slate-800 bg-white border border-slate-200 px-2.5 py-0.5 rounded-full shadow-2xs">
                {filteredParts.length} {isRtl ? "قطعة" : "Items"}
              </span>
            </div>

            {activeFiltersCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-xs font-semibold text-[#C59341] hover:underline"
              >
                {dict.catalog.clearFilters}
              </button>
            )}
          </div>

          {filteredParts.length > 0 ? (
            <>
              {/* 3-Column Product Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {paginatedParts.map((part) => (
                  <PartCard key={part.id} part={part} lang={lang} dict={dict} />
                ))}
              </div>

              {/* Numbered Pagination (matching inspiration layout: ← Previous 1 2 3 ... 8 9 10 Next →) */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-1 sm:gap-2 pt-10 text-xs font-semibold text-slate-600 select-none">
                  <button
                    onClick={() => {
                      setCurrentPage((p) => Math.max(1, p - 1));
                      window.scrollTo({ top: 300, behavior: "smooth" });
                    }}
                    disabled={currentPage === 1}
                    className="px-3.5 py-2 rounded-full hover:bg-white border border-transparent hover:border-slate-200 disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1.5 transition-all"
                  >
                    <span className="rtl:rotate-180">←</span>
                    <span>{isRtl ? "السابق" : "Previous"}</span>
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                      // Logic to show clean window of page numbers
                      if (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={page}
                            onClick={() => {
                              setCurrentPage(page);
                              window.scrollTo({ top: 300, behavior: "smooth" });
                            }}
                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                              currentPage === page
                                ? "bg-slate-900 text-white font-bold shadow-xs"
                                : "hover:bg-white hover:border hover:border-slate-200 text-slate-600"
                            }`}
                          >
                            {page}
                          </button>
                        );
                      }
                      if (page === currentPage - 2 || page === currentPage + 2) {
                        return (
                          <span key={page} className="px-1 text-slate-400">
                            ...
                          </span>
                        );
                      }
                      return null;
                    })}
                  </div>

                  <button
                    onClick={() => {
                      setCurrentPage((p) => Math.min(totalPages, p + 1));
                      window.scrollTo({ top: 300, behavior: "smooth" });
                    }}
                    disabled={currentPage === totalPages}
                    className="px-3.5 py-2 rounded-full hover:bg-white border border-transparent hover:border-slate-200 disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1.5 transition-all"
                  >
                    <span>{isRtl ? "التالي" : "Next"}</span>
                    <span className="rtl:rotate-180">→</span>
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="bg-white rounded-3xl border border-slate-100 p-12 text-center space-y-4 shadow-xs">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {dict.catalog.noProductsFound}
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                {isRtl
                  ? "جرّب تغيير فئة البحث، أو البحث برقم SKU أو اسم النظام، أو تواصل مباشرة مع فريق الدعم الفني عبر واتساب."
                  : "Try clearing some filters, searching by another SKU/brand, or contact our engineers directly."}
              </p>
              <div className="pt-2">
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors"
                >
                  {dict.catalog.clearFilters}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Secondary Shelf: "Explore our recommendations" (styled directly after inspiration) */}
      <section className="pt-8 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {isRtl ? "قطع الغيار الموصى بها دورياً" : "Explore our recommendations"}
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                setRecommendationIndex((prev) => Math.max(0, prev - 1))
              }
              disabled={recommendationIndex === 0}
              className="w-9 h-9 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center transition-colors shadow-2xs"
              aria-label="Previous recommendations"
            >
              <span className="rtl:rotate-180 text-sm">←</span>
            </button>
            <button
              onClick={() =>
                setRecommendationIndex((prev) =>
                  Math.min(recommendedParts.length - 4, prev + 1)
                )
              }
              disabled={recommendationIndex >= recommendedParts.length - 4}
              className="w-9 h-9 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center transition-colors shadow-2xs"
              aria-label="Next recommendations"
            >
              <span className="rtl:rotate-180 text-sm">→</span>
            </button>
          </div>
        </div>

        {/* Carousel / Grid of 4 Recommended Components */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {recommendedParts
            .slice(recommendationIndex, recommendationIndex + 4)
            .map((part) => (
              <PartCard key={`rec-${part.id}`} part={part} lang={lang} dict={dict} />
            ))}
        </div>
      </section>

      {/* Bottom Dark CTA Banner (matching inspiration bottom dark card) */}
      <section className="pt-6">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-2 max-w-xl text-center md:text-left rtl:md:text-right">
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
              {isRtl
                ? "هل تحتاج لتأسيس خط توريد لمؤسستك؟"
                : "Ready to Establish a Wholesale Contractor Line?"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
              {isRtl
                ? "تواصل مع المكتب الهندسي في الدمام لفتح حساب مقاول، والحصول على تسعيرات الجملة المباشرة وشحن سريع خلال 24 ساعة."
                : "Connect with our Dammam engineering desk for wholesale supply agreements, trade credit facilities, and express on-site part matching."}
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <a
              href="https://wa.me/966562614370?text=Hello,%20we%20want%20to%20open%20a%20wholesale%20contractor%20account%20with%20Jupiter%20Elevators"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-white text-slate-900 hover:bg-slate-100 text-xs font-bold transition-all text-center shadow-sm"
            >
              {isRtl ? "تواصل عبر واتساب" : "Contact Engineering Desk"}
            </a>
            <a
              href={`/${lang}/rfq`}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all text-center border border-slate-700"
            >
              {isRtl ? "مراجعة سلة التسعير" : "Review RFQ Basket"}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

