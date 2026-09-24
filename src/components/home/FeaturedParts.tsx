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
  Cpu,
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
    <section className="py-20 px-4 sm:px-8 bg-slate-950 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-brand-gold uppercase tracking-widest">
              {locale === "ar" ? "جاهزية فورية في مستودعات المملكة" : "READY DISPATCH INVENTORY"}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black font-serif text-white tracking-tight">
              {locale === "ar" ? "أبرز قطع الغيار الأكثر طلباً" : "Critical Fast-Moving Replacement Units"}
            </h2>
          </div>
          <Link
            href="/catalog"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-brand-gold hover:text-brand-gold-light transition-colors"
          >
            <span>{locale === "ar" ? "مشاهدة الكتالوج كاملاً" : "EXPLORE ALL IN-STOCK SPARES"}</span>
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
                className="bg-slate-900 rounded-2xl border border-slate-800 p-6 flex flex-col justify-between hover:shadow-2xl hover:border-brand-gold/60 transition-all duration-300 relative group overflow-hidden"
              >
                <div className="cad-corner-tl opacity-40 group-hover:opacity-100 transition-opacity" />
                <div className="cad-corner-tr opacity-40 group-hover:opacity-100 transition-opacity" />

                <div className="space-y-4">
                  {/* Top Badge & Origin */}
                  <div className="flex items-center justify-between gap-2 text-[10px] font-mono">
                    <span className="inline-flex items-center gap-1 font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded border border-emerald-800/80">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{locale === "ar" ? "جاهز للتسليم الفوري" : "IN STOCK (KSA)"}</span>
                    </span>
                    <span className="font-mono bg-slate-950 text-brand-gold px-2 py-0.5 rounded border border-slate-800 font-bold">
                      {part.sku}
                    </span>
                  </div>

                  {/* Brand Visual & Title */}
                  <div className="flex gap-4 items-start pt-1">
                    <div className="relative w-16 h-16 rounded-xl bg-slate-950 border border-slate-800 p-2 shrink-0 flex items-center justify-center">
                      <Image
                        src="/brand/logo_brandmark.svg"
                        alt={part.name[locale]}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono font-semibold text-brand-gold block truncate">
                        {part.subcategory[locale]}
                      </span>
                      <h3 className="text-base font-bold text-white group-hover:text-brand-gold transition-colors line-clamp-2 leading-snug font-serif">
                        {part.name[locale]}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {part.description[locale]}
                  </p>

                  {/* Specs Snippet */}
                  <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-[10px] font-mono text-slate-400 space-y-1">
                    {Object.entries(part.specifications).slice(0, 2).map(([k, v]) => (
                      <div key={k} className="flex justify-between items-center gap-2">
                        <span className="truncate text-slate-500">{k}:</span>
                        <span className="text-slate-200 font-bold truncate">{v}</span>
                      </div>
                    ))}
                  </div>

                  {/* Compatible Brands Tags */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <Tag className="w-3 h-3 text-slate-500" />
                    {part.compatibleBrands.slice(0, 3).map((brand) => (
                      <span
                        key={brand}
                        className="text-[10px] font-mono bg-slate-950 text-slate-300 px-2 py-0.5 rounded border border-slate-800"
                      >
                        {brand}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions: Add to RFQ & WhatsApp Inquiry */}
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-2 font-mono">
                  <button
                    onClick={() => handleAdd(part)}
                    className={`flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                      justAdded
                        ? "bg-emerald-600 text-white"
                        : inCart
                        ? "bg-brand-navy border border-brand-gold text-brand-gold"
                        : "bg-brand-gold hover:bg-brand-gold-dark text-slate-950"
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
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-slate-700 transition-colors"
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

