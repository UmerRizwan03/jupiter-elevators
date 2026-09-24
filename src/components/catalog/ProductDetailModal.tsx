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
  Layers,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-slate-900 text-white rounded-3xl shadow-2xl border border-slate-800 max-h-[90vh] overflow-y-auto">
        <div className="cad-corner-tl" />
        <div className="cad-corner-tr" />
        <div className="cad-corner-bl" />
        <div className="cad-corner-br" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 end-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Header Info */}
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-slate-950 border border-slate-800 p-3 shrink-0 flex items-center justify-center">
              <Image
                src="/brand/logo_brandmark.svg"
                alt={part.name[locale]}
                fill
                className="object-contain p-2"
              />
            </div>

            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono font-bold text-brand-gold uppercase tracking-wider">
                  {part.subcategory[locale]}
                </span>
                <span className="font-mono text-xs bg-slate-950 text-slate-300 px-2 py-0.5 rounded border border-slate-800 font-semibold">
                  SKU: {part.sku}
                </span>
                <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-800/80">
                  {locale === "ar" ? "جاهز للتسليم الفوري" : "In Stock (KSA)"}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black font-serif text-white leading-snug">
                {part.name[locale]}
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {part.description[locale]}
              </p>
            </div>
          </div>

          {/* Technical Specifications Table */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-mono font-bold text-brand-gold uppercase tracking-wider border-b border-slate-800 pb-1.5 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-brand-gold" />
              <span>{t.catalog.specs} (EN 81-20 & SASO)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
              {Object.entries(part.specifications).map(([key, val]) => (
                <div
                  key={key}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800/80"
                >
                  <span className="text-slate-400 font-medium">{key}:</span>
                  <span className="font-bold text-slate-100">{val}</span>
                </div>
              ))}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                <span className="text-slate-400 font-medium">{t.catalog.origin}:</span>
                <span className="font-bold text-brand-gold flex items-center gap-1.5">
                  <Globe2 className="w-3.5 h-3.5" />
                  <span>{part.origin} Direct Factory</span>
                </span>
              </div>
            </div>
          </div>

          {/* Compatible Brands */}
          <div className="space-y-2 pt-2">
            <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-brand-gold" />
              <span>{t.catalog.compatibleWith}</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {part.compatibleBrands.map((brand) => (
                <span
                  key={brand}
                  className="text-xs font-mono font-semibold px-2.5 py-1 rounded-lg bg-slate-950 text-slate-200 border border-slate-800"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Quantity Selector */}
            <div className="flex items-center gap-3 w-full sm:w-auto font-mono">
              <span className="text-xs font-semibold text-slate-400">
                {locale === "ar" ? "الكمية المطلوبة:" : "Quantity:"}
              </span>
              <div className="flex items-center border border-slate-800 rounded-xl overflow-hidden bg-slate-950">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="p-2.5 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center font-mono font-bold text-xs text-brand-gold">
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="p-2.5 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3 w-full sm:w-auto font-mono">
              <button
                onClick={handleAdd}
                className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-bold transition-all shadow-md ${
                  added
                    ? "bg-emerald-600 text-white"
                    : inCart
                    ? "bg-brand-navy border border-brand-gold text-brand-gold"
                    : "bg-brand-gold hover:bg-brand-gold-dark text-slate-950"
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

