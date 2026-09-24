"use client";

import React, { useState, useMemo, Suspense } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { elevatorCategories } from "@/data/categories";
import { elevatorProducts } from "@/data/products";
import { ElevatorPart } from "@/types/catalog";
import { ProductDetailModal } from "@/components/catalog/ProductDetailModal";
import { getProductWhatsAppUrl, getPhotoIdWhatsAppUrl } from "@/lib/whatsapp";
import {
  Search,
  Filter,
  Check,
  Plus,
  MessageCircle,
  Tag,
  ShieldCheck,
  RotateCcw,
  Camera,
  Eye,
  Layers,
} from "lucide-react";

function CatalogContent() {
  const { t, locale } = useLanguage();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const initialQuery = searchParams.get("q") || "";

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [activeModalPart, setActiveModalPart] = useState<ElevatorPart | null>(null);

  const { addToCart, isItemInCart } = useCart();
  const [recentlyAdded, setRecentlyAdded] = useState<string[]>([]);

  // Collect unique brands across products
  const allBrands = useMemo(() => {
    const brandsSet = new Set<string>();
    elevatorProducts.forEach((p) => {
      p.compatibleBrands.forEach((b) => brandsSet.add(b));
    });
    return Array.from(brandsSet).sort();
  }, []);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return elevatorProducts.filter((p) => {
      // Category filter
      if (selectedCategory !== "all" && p.categoryId !== selectedCategory) {
        return false;
      }
      // Brand filter
      if (selectedBrand !== "all" && !p.compatibleBrands.includes(selectedBrand)) {
        return false;
      }
      // In-stock filter
      if (inStockOnly && !p.inStock) {
        return false;
      }
      // Keyword search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName =
          p.name.en.toLowerCase().includes(q) || p.name.ar.toLowerCase().includes(q);
        const matchSku = p.sku.toLowerCase().includes(q);
        const matchSub =
          p.subcategory.en.toLowerCase().includes(q) ||
          p.subcategory.ar.toLowerCase().includes(q);
        const matchBrands = p.compatibleBrands.some((b) => b.toLowerCase().includes(q));

        if (!matchName && !matchSku && !matchSub && !matchBrands) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, selectedBrand, inStockOnly, searchQuery]);

  const handleAddToCart = (part: ElevatorPart) => {
    addToCart(part, 1);
    setRecentlyAdded((prev) => [...prev, part.id]);
    setTimeout(() => {
      setRecentlyAdded((prev) => prev.filter((id) => id !== part.id));
    }, 2000);
  };

  const handleResetFilters = () => {
    setSelectedCategory("all");
    setSelectedBrand("all");
    setInStockOnly(false);
    setSearchQuery("");
  };

  const photoIdUrl = getPhotoIdWhatsAppUrl(locale);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-8">
      {/* Page Title & Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {t.catalog.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mt-1">
              {t.catalog.subtitle}
            </p>
          </div>
          <div className="text-xs font-semibold text-slate-600">
            {locale === "ar" ? "إجمالي القطع المعروضة:" : "Showing:"}{" "}
            <span className="font-mono font-bold text-brand-navy bg-slate-100 px-2 py-1 rounded">
              {filteredProducts.length} {locale === "ar" ? "قطعة" : "items"}
            </span>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute start-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.catalog.searchPlaceholder}
            className="w-full py-3.5 ps-12 pe-4 rounded-2xl bg-white border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold shadow-sm font-medium"
          />
        </div>
      </div>

      {/* Main Grid: Filters + Catalog Products */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Filter Sidebar */}
        <aside className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-sm sticky top-24">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Filter className="w-4 h-4 text-brand-gold" />
              <span>{t.catalog.filterTitle}</span>
            </h3>
            {(selectedCategory !== "all" ||
              selectedBrand !== "all" ||
              inStockOnly ||
              searchQuery) && (
              <button
                onClick={handleResetFilters}
                className="text-xs text-brand-gold hover:underline flex items-center gap-1 font-semibold"
              >
                <RotateCcw className="w-3 h-3" />
                <span>{t.catalog.clearFilters}</span>
              </button>
            )}
          </div>

          {/* Filter 1: Categories */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              {locale === "ar" ? "التصنيف الرئيسي" : "Category"}
            </label>
            <div className="space-y-1 max-h-60 overflow-y-auto pr-1">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`w-full text-start px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                  selectedCategory === "all"
                    ? "bg-brand-navy text-white font-bold"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {t.catalog.allCategories}
              </button>
              {elevatorCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full text-start px-3 py-2 rounded-xl text-xs font-medium transition-colors truncate block ${
                    selectedCategory === cat.id
                      ? "bg-brand-navy text-white font-bold"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {cat.name[locale]}
                </button>
              ))}
            </div>
          </div>

          {/* Filter 2: Compatible Brands */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              {locale === "ar" ? "الماركة المتوافقة" : "Compatible Brand"}
            </label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full py-2 px-3 rounded-xl border border-slate-200 text-xs font-medium bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-gold"
            >
              <option value="all">{t.catalog.allBrands}</option>
              {allBrands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* Filter 3: In Stock Only Toggle */}
          <div className="pt-2 border-t border-slate-100">
            <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-slate-700 select-none">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 rounded text-brand-gold focus:ring-brand-gold border-slate-300"
              />
              <span>{t.catalog.inStockOnly}</span>
            </label>
          </div>

          {/* Sidebar CTA: Photo Match Tool */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-center">
            <Camera className="w-6 h-6 text-brand-gold mx-auto" />
            <h4 className="text-xs font-bold text-slate-900">
              {locale === "ar" ? "هل القطعة غير واضحة؟" : "Can't find the part?"}
            </h4>
            <p className="text-[11px] text-slate-500 leading-tight">
              {locale === "ar"
                ? "أرسل صورة القطعة عبر الواتساب وسنقوم بمطابقتها فوراً."
                : "Send a photo via WhatsApp for instant technical matching."}
            </p>
            <a
              href={photoIdUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{locale === "ar" ? "إرسال صورة" : "Send Photo"}</span>
            </a>
          </div>
        </aside>

        {/* Right Column: Products Grid */}
        <div className="lg:col-span-9 space-y-6">
          {filteredProducts.length === 0 ? (
            /* Empty State */
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                <Layers className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">{t.catalog.noResults}</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                {t.catalog.noResultsSubtitle}
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                >
                  {t.catalog.clearFilters}
                </button>
                <a
                  href={photoIdUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-brand-gold hover:bg-brand-gold-dark text-brand-navy text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{t.catalog.requestCustomQuote}</span>
                </a>
              </div>
            </div>
          ) : (
            /* Products Cards Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((part) => {
                const inCart = isItemInCart(part.id);
                const justAdded = recentlyAdded.includes(part.id);
                const waUrl = getProductWhatsAppUrl(part, locale);

                return (
                  <div
                    key={part.id}
                    className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between hover:shadow-xl hover:border-brand-gold/60 transition-all duration-300"
                  >
                    <div className="space-y-3.5">
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 text-[11px]">
                        <span className="font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-semibold">
                          {part.sku}
                        </span>
                        <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3" />
                          <span>{locale === "ar" ? "متوفر" : "In Stock"}</span>
                        </span>
                      </div>

                      {/* Part Image & Details */}
                      <div className="flex gap-3.5 items-start">
                        <div
                          onClick={() => setActiveModalPart(part)}
                          className="relative w-16 h-16 rounded-xl bg-slate-50 border border-slate-100 p-2 shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                        >
                          <Image
                            src="/brand/logo_brandmark.svg"
                            alt={part.name[locale]}
                            fill
                            className="object-contain p-1"
                          />
                        </div>

                        <div className="flex-1">
                          <span className="text-[11px] font-semibold text-brand-gold block">
                            {part.subcategory[locale]}
                          </span>
                          <h3
                            onClick={() => setActiveModalPart(part)}
                            className="text-sm font-bold text-slate-900 hover:text-brand-navy transition-colors line-clamp-2 cursor-pointer leading-snug"
                          >
                            {part.name[locale]}
                          </h3>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {part.description[locale]}
                      </p>

                      {/* Brand Chips */}
                      <div className="flex flex-wrap items-center gap-1">
                        <Tag className="w-3 h-3 text-slate-400" />
                        {part.compatibleBrands.slice(0, 3).map((brand) => (
                          <span
                            key={brand}
                            className="text-[10px] font-medium bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded"
                          >
                            {brand}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-5 pt-3.5 border-t border-slate-100 space-y-2">
                      <div className="flex items-center gap-2">
                        {/* Add to RFQ */}
                        <button
                          onClick={() => handleAddToCart(part)}
                          className={`flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                            justAdded
                              ? "bg-emerald-600 text-white"
                              : inCart
                              ? "bg-brand-navy text-white hover:bg-brand-navy-light"
                              : "bg-brand-gold hover:bg-brand-gold-dark text-brand-navy"
                          }`}
                        >
                          {justAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>{t.catalog.addedToQuote}</span>
                            </>
                          ) : inCart ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>{t.catalog.addedToQuote} (+1)</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>{t.catalog.addToQuote}</span>
                            </>
                          )}
                        </button>

                        {/* Direct WhatsApp */}
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors"
                          title={t.catalog.directWhatsApp}
                          aria-label={t.catalog.directWhatsApp}
                        >
                          <MessageCircle className="w-4 h-4" />
                        </a>
                      </div>

                      {/* View Specs Trigger */}
                      <button
                        onClick={() => setActiveModalPart(part)}
                        className="w-full inline-flex items-center justify-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-brand-navy transition-colors py-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>{t.catalog.viewDetails}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Technical Specs Modal */}
      <ProductDetailModal
        part={activeModalPart}
        onClose={() => setActiveModalPart(null)}
      />
    </div>
  );
}

export default function CatalogPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />
      <main className="flex-1">
        <Suspense
          fallback={
            <div className="max-w-7xl mx-auto p-12 text-center text-slate-400">
              Loading catalog...
            </div>
          }
        >
          <CatalogContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
