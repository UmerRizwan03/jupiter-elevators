"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Check,
  Plus,
  Copy,
} from "lucide-react";
import type { ElevatorPart } from "@/types/catalog";
import type { Locale, Dictionary } from "@/lib/i18n";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/ui/toast";
import { getPartImageUrl } from "@/lib/catalog";

interface PartCardProps {
  part: ElevatorPart;
  lang: Locale;
  dict: Dictionary;
}

export function PartCard({ part, lang, dict }: PartCardProps) {
  const { addItem, items } = useCart();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const isRtl = lang === "ar";
  const isInCart = items.some((item) => item.part.id === part.id);

  const handleCopySku = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(part.sku);
    setCopied(true);
    toast({
      title: isRtl ? "تم نسخ رقم القطعة" : "SKU Copied to Clipboard",
      description: part.sku,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(part, 1);
    setJustAdded(true);
    toast({
      title: isRtl ? "تمت الإضافة لسلة التسعير" : "Added to Quote Basket",
      description: `[${part.sku}] ${part.name[lang]}`,
      action: {
        label: isRtl ? "عرض السلة" : "Review RFQ",
        url: `/${lang}/rfq`,
      },
    });
    setTimeout(() => setJustAdded(false), 2000);
  };

  const whatsappInquiryUrl = `https://wa.me/966562614370?text=${encodeURIComponent(
    isRtl
      ? `السلام عليكم، أود الاستفسار عن توفر وسعر القطعة التالية:\nالاسم: ${part.name.ar}\nرقم القطعة SKU: ${part.sku}`
      : `Hello, I would like to inquire about the availability and quotation for:\nPart: ${part.name.en}\nSKU: ${part.sku}`
  )}`;

  return (
    <div className="group bg-white rounded-3xl p-3 sm:p-3.5 flex flex-col justify-between border border-slate-100 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
      {/* Product Image Stage (matching inspiration rounded container) */}
      <div className="relative w-full h-[185px] sm:h-[195px] bg-[#F1F3F5] rounded-2xl flex items-center justify-center p-4 overflow-hidden">
        {/* Category Pill Tag (top-right as in inspiration) */}
        <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3 z-10">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium bg-white text-slate-700 shadow-2xs border border-slate-100">
            {part.subcategory[lang] || part.origin}
          </span>
        </div>

        {/* Live Stock Pulse Pill (top-left) */}
        <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 z-10">
          {part.inStock ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/95 text-emerald-700 shadow-2xs border border-emerald-100/60">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>{dict.catalog.inStock}</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/95 text-amber-700 shadow-2xs border border-amber-100/60">
              <span>{dict.catalog.onOrder}</span>
            </span>
          )}
        </div>

        {/* Center Product Image */}
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={getPartImageUrl(part)}
            alt={part.name[lang]}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>

      {/* Card Info Section */}
      <div className="p-3 pt-3.5 space-y-2.5 flex-1 flex flex-col justify-between">
        {/* Row 1: Title & Wholesale Badge */}
        <div className="flex items-start justify-between gap-2">
          <Link href={`/${lang}/catalog/${part.slug}`} className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#C59341] transition-colors truncate leading-tight">
              {part.name[lang]}
            </h3>
          </Link>
          <span className="text-xs sm:text-sm font-black text-slate-900 font-mono shrink-0">
            {isRtl ? "طلب تسعير" : "Wholesale"}
          </span>
        </div>

        {/* Row 2: Rating & Compatible Brands / SKU */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-[11px]">
            <span className="text-amber-500 text-xs">★</span>
            <span className="font-bold text-slate-900">5.0</span>
            <span className="text-slate-400">
              ({part.compatibleBrands.slice(0, 2).join(", ") || "EN 81"})
            </span>
          </div>

          <button
            onClick={handleCopySku}
            type="button"
            className="inline-flex items-center gap-1 text-[10px] font-mono text-slate-400 hover:text-slate-800 transition-colors"
            title="Copy SKU"
          >
            <span>{part.sku}</span>
            {copied ? (
              <Check className="w-2.5 h-2.5 text-emerald-600" />
            ) : (
              <Copy className="w-2.5 h-2.5" />
            )}
          </button>
        </div>

        {/* Row 3: Dual Pill Action Buttons (matching inspiration pill layout) */}
        <div className="grid grid-cols-2 gap-2 pt-1.5">
          {/* Add to RFQ Pill Button */}
          <button
            onClick={handleAddToCart}
            type="button"
            className={`h-9 px-3 rounded-full text-xs font-semibold transition-all flex items-center justify-center gap-1.5 border shadow-2xs ${
              justAdded || isInCart
                ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                : "bg-white text-slate-800 border-slate-200 hover:bg-slate-50"
            }`}
          >
            {justAdded || isInCart ? (
              <>
                <Check className="w-3 h-3 text-emerald-600" />
                <span className="truncate">{dict.catalog.addedToQuote}</span>
              </>
            ) : (
              <>
                <Plus className="w-3 h-3 text-slate-500" />
                <span className="truncate">{dict.catalog.addToQuote}</span>
              </>
            )}
          </button>

          {/* Buy Now / Direct Order Black Pill Button */}
          <a
            href={whatsappInquiryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="h-9 px-3 rounded-full text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
          >
            <span className="truncate">{isRtl ? "طلب مباشر" : "Direct Order"}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
