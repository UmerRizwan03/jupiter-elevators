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
  Cpu,
  Globe2,
  Compass,
} from "lucide-react";

function CatalogContent() {
  const { t, locale } = useLanguage();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const initialBrand = searchParams.get("brand") || "all";
  const initialQuery = searchParams.get("q") || "";

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState<string>(initialBrand);
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
      if (selectedBrand !== "all" && !p.compatibleBrands.some((b) => b.toLowerCase() === selectedBrand.toLowerCase())) {
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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-xs font-mono">
              <span>ISO 7465 / EN 81 COMPLIANT INVENTORY</span>
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black font-serif tracking-tight text-slate-950">
              {t.catalog.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
              {t.catalog.subtitle}
            </p>
          </div>
          <div className="text-xs font-mono font-bold text-slate-500">
            {locale === "ar" ? "إجمالي القطع المعروضة:" : "SHOWING:"}{" "}
            <span className="text-brand-navy bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-sm">
              {filteredProducts.length} {locale === "ar" ? "قطعة" : "COMPONENTS"}
            </span>
          </div>
        </div>

        {/* Global Search Bar with CAD Frame */}
        <div className="relative">
          <Search className="w-5 h-5 text-brand-gold absolute start-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.catalog.searchPlaceholder}
            className="w-full py-4 ps-12 pe-4 rounded-2xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/30 shadow-sm font-medium"
          />
        </div>
      </div>

      {/* Main Grid: Filters + Catalog Products */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Filter Sidebar */}
        <aside className="lg:col-span-3 bg-white rounded-3xl border border-slate-200 p-6 space-y-6 shadow-sm sticky top-24">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <Filter className="w-4 h-4 text-brand-gold" />
              <span>{t.catalog.filterTitle}</span>
            </h3>
            {(selectedCategory !== "all" ||
              selectedBrand !== "all" ||
              inStockOnly ||
              searchQuery) && (
              <button
                onClick={handleResetFilters}
                className="text-xs text-brand-navy hover:text-brand-gold flex items-center gap-1 font-mono font-semibold"
              >
                <RotateCcw className="w-3 h-3" />
                <span>{t.catalog.clearFilters}</span>
              </button>
            )}
          </div>

          {/* Filter 1: Categories */}
          <div className="space-y-2">
            <label className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider block">
              {locale === "ar" ? "التصنيف الرئيسي" : "COMPONENT CATEGORY"}
            </label>
            <div className="space-y-1 max-h-60 overflow-y-auto pr-1">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`w-full text-start px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  selectedCategory === "all"
                    ? "bg-brand-navy border border-brand-navy text-white font-bold shadow-sm"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {t.catalog.allCategories}
              </button>
              {elevatorCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full text-start px-3 py-2 rounded-xl text-xs font-medium transition-all truncate block ${
                    selectedCategory === cat.id
                      ? "bg-brand-navy border border-brand-navy text-white font-bold shadow-sm"
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
            <label className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider block">
              {locale === "ar" ? "الماركة المتوافقة" : "OEM BRAND COMPATIBILITY"}
            </label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-xs font-mono font-semibold bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-gold/30"
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
                className="w-4 h-4 rounded text-brand-navy focus:ring-brand-navy border-slate-300 bg-white"
              />
              <span>{t.catalog.inStockOnly}</span>
            </label>
          </div>

          {/* Sidebar CTA: Photo Match Tool */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-center relative overflow-hidden">
            <Camera className="w-6 h-6 text-brand-gold mx-auto" />
            <h4 className="text-xs font-bold text-slate-900">
              {locale === "ar" ? "صعوبة في تحديد القطعة؟" : "Can't Identify The Part?"}
            </h4>
            <p className="text-[11px] text-slate-600 leading-tight">
              {locale === "ar"
                ? "أرسل صورة القطعة التالفة عبر الواتساب وسنقوم بمطابقتها فورياً."
                : "Send a photo via WhatsApp for instant technical matching by our lift engineers."}
            </p>
            <a
              href={photoIdUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors shadow-sm"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{locale === "ar" ? "إرسال صورة" : "Snap & Send"}</span>
            </a>
          </div>
        </aside>

        {/* Right Column: Products Grid */}
        <div className="lg:col-span-9 space-y-6">
          {filteredProducts.length === 0 ? (
            /* Empty State */
            <div className="bg-slate-900 rounded-3xl border border-slate-800 p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-brand-gold">
                <Layers className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white">{t.catalog.noResults}</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                {t.catalog.noResultsSubtitle}
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-bold transition-colors"
                >
                  {t.catalog.clearFilters}
                </button>
                <a
                  href={photoIdUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-brand-gold hover:bg-brand-gold-dark text-slate-950 text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{t.catalog.requestCustomQuote}</span>
                </a>
              </div>
            </div>
          ) : (
            /* Blueprint Technical Products Cards Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((part) => {
                const inCart = isItemInCart(part.id);
                const justAdded = recentlyAdded.includes(part.id);
                const waUrl = getProductWhatsAppUrl(part, locale);

                return (
                  <div
                    key={part.id}
                    className="bg-slate-900 rounded-2xl border border-slate-800 hover:border-brand-gold/60 p-5 flex flex-col justify-between hover:shadow-2xl transition-all duration-300 relative group"
                  >
                    <div className="cad-corner-tl opacity-40 group-hover:opacity-100 transition-opacity" />
                    <div className="cad-corner-tr opacity-40 group-hover:opacity-100 transition-opacity" />

                    <div className="space-y-4">
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 text-[10px] font-mono">
                        <span className="bg-slate-950 text-brand-gold px-2.5 py-0.5 rounded border border-slate-800 font-bold">
                          {part.sku}
                        </span>
                        <span className="text-emerald-400 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/80 flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3" />
                          <span>{locale === "ar" ? "جاهز للتسليم" : "In Stock"}</span>
                        </span>
                      </div>

                      {/* Part Image & Details */}
                      <div className="flex gap-3.5 items-start">
                        <div
                          onClick={() => setActiveModalPart(part)}
                          className="relative w-16 h-16 rounded-xl bg-slate-950 border border-slate-800 p-2 shrink-0 cursor-pointer hover:border-brand-gold/50 transition-colors flex items-center justify-center"
                        >
                          <Image
                            src="/brand/logo_brandmark.svg"
                            alt={part.name[locale]}
                            fill
                            className="object-contain p-1"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] font-mono font-semibold text-brand-gold block truncate">
                            {part.subcategory[locale]}
                          </span>
                          <h3
                            onClick={() => setActiveModalPart(part)}
                            className="text-sm font-bold text-white group-hover:text-brand-gold transition-colors line-clamp-2 cursor-pointer leading-snug"
                          >
                            {part.name[locale]}
                          </h3>
                        </div>
                      </div>

                      {/* Specs Blueprint Preview Table */}
                      <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-[10px] font-mono text-slate-400 space-y-1">
                        {Object.entries(part.specifications).slice(0, 2).map(([k, v]) => (
                          <div key={k} className="flex justify-between items-center gap-2">
                            <span className="truncate text-slate-500">{k}:</span>
                            <span className="text-slate-200 font-bold truncate">{v}</span>
                          </div>
                        ))}
                        <div className="flex justify-between items-center pt-1 border-t border-slate-800/60 text-[9px]">
                          <span className="text-slate-500">ORIGIN:</span>
                          <span className="text-brand-gold font-bold">{part.origin}</span>
                        </div>
                      </div>

                      {/* Brand Chips */}
                      <div className="flex flex-wrap items-center gap-1">
                        <Tag className="w-3 h-3 text-slate-500" />
                        {part.compatibleBrands.slice(0, 3).map((brand) => (
                          <button
                            key={brand}
                            onClick={() => setSelectedBrand(brand)}
                            className="text-[10px] font-mono font-medium bg-slate-950 hover:bg-brand-navy text-slate-300 hover:text-brand-gold px-1.5 py-0.5 rounded border border-slate-800 transition-colors"
                          >
                            {brand}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-5 pt-3.5 border-t border-slate-800/80 space-y-2">
                      <div className="flex items-center gap-2">
                        {/* Add to RFQ */}
                        <button
                          onClick={() => handleAddToCart(part)}
                          className={`flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold font-mono transition-all ${
                            justAdded
                              ? "bg-emerald-600 text-white"
                              : inCart
                              ? "bg-brand-navy border border-brand-gold text-brand-gold"
                              : "bg-brand-gold hover:bg-brand-gold-dark text-slate-950"
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
                          className="p-2.5 rounded-xl bg-slate-800 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-slate-700 transition-colors"
                          title={t.catalog.directWhatsApp}
                          aria-label={t.catalog.directWhatsApp}
                        >
                          <MessageCircle className="w-4 h-4" />
                        </a>
                      </div>

                      {/* View Specs Trigger */}
                      <button
                        onClick={() => setActiveModalPart(part)}
                        className="w-full inline-flex items-center justify-center gap-1 text-[11px] font-mono text-slate-400 hover:text-brand-gold transition-colors py-1"
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
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100">
      <Header />
      <main className="flex-1">
        <Suspense
          fallback={
            <div className="max-w-7xl mx-auto p-12 text-center text-slate-500 font-mono">
              LOADING CAD SPEC SHEETS...
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

