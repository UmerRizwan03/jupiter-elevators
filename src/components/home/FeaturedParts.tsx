"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { elevatorProducts } from "@/data/products";
import { getProductWhatsAppUrl } from "@/lib/whatsapp";
import {
  Check,
  Plus,
  MessageCircle,
  ShieldCheck,
  Tag,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

export function FeaturedParts() {
  const { t, locale, isRtl } = useLanguage();
  const { addToCart, isItemInCart } = useCart();
  const [addedIds, setAddedIds] = useState<string[]>([]);

  const featured = elevatorProducts.filter((p) => p.featured).slice(0, 6);
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const handleAdd = (part: (typeof elevatorProducts)[0]) => {
    addToCart(part, 1);
    setAddedIds((prev) => [...prev, part.id]);
    setTimeout(() => {
      setAddedIds((prev) => prev.filter((id) => id !== part.id));
    }, 2000);
  };

  return (
    <section className="py-16 px-4 sm:px-8 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold text-brand-gold uppercase tracking-wider">
              {locale === "ar" ? "جاهزية فورية في مستودعات المملكة" : "Immediate In-Stock Inventory"}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {locale === "ar" ? "أبرز قطع الغيار الأكثر طلباً" : "Popular & Critical Replacement Parts"}
            </h2>
          </div>
          <Link
            href="/catalog"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-navy hover:text-brand-gold transition-colors"
          >
            <span>{locale === "ar" ? "مشاهدة الكتالوج كاملاً" : "Explore All Products"}</span>
            <ArrowIcon className="w-4 h-4" />
          </Link>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((part) => {
            const inCart = isItemInCart(part.id);
            const justAdded = addedIds.includes(part.id);
            const waUrl = getProductWhatsAppUrl(part, locale);

            return (
              <div
                key={part.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-xl hover:border-brand-gold/50 transition-all duration-300"
              >
                <div className="space-y-4">
                  {/* Top Badge & Origin */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{locale === "ar" ? "جاهز للتسليم الفوري" : "In Stock (KSA)"}</span>
                    </span>
                    <span className="text-[11px] font-medium text-slate-400 font-mono">
                      {part.sku}
                    </span>
                  </div>

                  {/* Brand Visual & Title */}
                  <div className="flex gap-4 items-start pt-2">
                    <div className="relative w-16 h-16 rounded-xl bg-slate-50 border border-slate-100 p-2 shrink-0">
                      <Image
                        src="/brand/logo_brandmark.svg"
                        alt={part.name[locale]}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div>
                      <span className="text-[11px] font-semibold text-brand-gold block">
                        {part.subcategory[locale]}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 hover:text-brand-navy transition-colors line-clamp-2">
                        {part.name[locale]}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {part.description[locale]}
                  </p>

                  {/* Compatible Brands Tags */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <Tag className="w-3 h-3 text-slate-400" />
                    {part.compatibleBrands.slice(0, 3).map((brand) => (
                      <span
                        key={brand}
                        className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded"
                      >
                        {brand}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions: Add to RFQ & WhatsApp Inquiry */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => handleAdd(part)}
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
                        <Check className="w-4 h-4" />
                        <span>{t.catalog.addedToQuote}</span>
                      </>
                    ) : inCart ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>{t.catalog.addedToQuote} (+1)</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>{t.catalog.addToQuote}</span>
                      </>
                    )}
                  </button>

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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
