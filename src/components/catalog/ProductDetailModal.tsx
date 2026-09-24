"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { ElevatorPart } from "@/types/catalog";
import { getProductWhatsAppUrl } from "@/lib/whatsapp";
import {
  X,
  ShieldCheck,
  Check,
  Plus,
  Minus,
  MessageCircle,
  Tag,
  Globe2,
  Cpu,
} from "lucide-react";

interface ProductDetailModalProps {
  part: ElevatorPart | null;
  onClose: () => void;
}

export function ProductDetailModal({ part, onClose }: ProductDetailModalProps) {
  const { t, locale } = useLanguage();
  const { addToCart, isItemInCart } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!part) return null;

  const inCart = isItemInCart(part.id);
  const waUrl = getProductWhatsAppUrl(part, locale);

  const handleAdd = () => {
    addToCart(part, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 end-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Header Info */}
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-slate-50 border border-slate-200 p-3 shrink-0 flex items-center justify-center">
              <Image
                src="/brand/logo_brandmark.svg"
                alt={part.name[locale]}
                fill
                className="object-contain p-2"
              />
            </div>

            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-brand-gold uppercase tracking-wider">
                  {part.subcategory[locale]}
                </span>
                <span className="font-mono text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-semibold">
                  SKU: {part.sku}
                </span>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  {locale === "ar" ? "جاهز للتسليم الفوري" : "In Stock (KSA)"}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                {part.name[locale]}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {part.description[locale]}
              </p>
            </div>
          </div>

          {/* Technical Specifications Table */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1.5 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-brand-gold" />
              <span>{t.catalog.specs}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {Object.entries(part.specifications).map(([key, val]) => (
                <div
                  key={key}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100"
                >
                  <span className="text-slate-500 font-medium">{key}:</span>
                  <span className="font-bold text-slate-800">{val}</span>
                </div>
              ))}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-500 font-medium">{t.catalog.origin}:</span>
                <span className="font-bold text-brand-navy flex items-center gap-1">
                  <Globe2 className="w-3.5 h-3.5 text-brand-gold" />
                  <span>{part.origin}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Compatible Brands */}
          <div className="space-y-2 pt-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-brand-gold" />
              <span>{t.catalog.compatibleWith}</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {part.compatibleBrands.map((brand) => (
                <span
                  key={brand}
                  className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 border border-slate-200"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Quantity Selector */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className="text-xs font-semibold text-slate-500">
                {locale === "ar" ? "الكمية:" : "Quantity:"}
              </span>
              <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="p-2 hover:bg-slate-200 text-slate-600 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center font-mono font-bold text-xs text-slate-800">
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="p-2 hover:bg-slate-200 text-slate-600 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handleAdd}
                className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-bold transition-all shadow-md ${
                  added
                    ? "bg-emerald-600 text-white"
                    : inCart
                    ? "bg-brand-navy text-white hover:bg-brand-navy-light"
                    : "bg-brand-gold hover:bg-brand-gold-dark text-brand-navy shadow-brand-gold/20"
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>{t.catalog.addedToQuote}</span>
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
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors shadow-md shadow-emerald-600/20"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="hidden sm:inline">{t.catalog.directWhatsApp}</span>
                <span className="sm:hidden">{locale === "ar" ? "واتساب" : "WhatsApp"}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
