"use client";

import React, { useState } from "react";
import { Plus, Minus, Check, MessageCircle, FileText, Share2 } from "lucide-react";
import type { ElevatorPart } from "@/types/catalog";
import type { Locale, Dictionary } from "@/lib/i18n";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/ui/toast";

interface PartDetailActionsProps {
  part: ElevatorPart;
  lang: Locale;
  dict: Dictionary;
}

export function PartDetailActions({ part, lang, dict }: PartDetailActionsProps) {
  const { addItem, items } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const isRtl = lang === "ar";

  const isInCart = items.some((item) => item.part.id === part.id);

  const handleAddToCart = () => {
    addItem(part, quantity);
    setJustAdded(true);
    toast({
      title: isRtl ? "تمت الإضافة لسلة التسعير" : "Added to Quote Basket",
      description: `[${part.sku}] ${part.name[lang]} (x${quantity})`,
      action: {
        label: isRtl ? "عرض السلة" : "Review RFQ",
        url: `/${lang}/rfq`,
      },
    });
    setTimeout(() => setJustAdded(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: part.name[lang],
        text: `${part.name[lang]} - SKU: ${part.sku}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: isRtl ? "تم نسخ رابط القطعة" : "Link Copied to Clipboard",
        description: part.name[lang],
      });
    }
  };

  const whatsappInquiryUrl = `https://wa.me/966562614370?text=${encodeURIComponent(
    isRtl
      ? `السلام عليكم، أود طلب عرض سعر رسمي للقطعة التالية:\nالاسم: ${part.name.ar}\nرقم القطعة SKU: ${part.sku}\nالكمية المطلوبة: ${quantity}`
      : `Hello, I would like an official quotation for:\nPart: ${part.name.en}\nSKU: ${part.sku}\nQuantity Requested: ${quantity}`
  )}`;

  return (
    <div className="space-y-4">
      {/* Quantity Selector + Add To Quote */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        {/* Quantity Stepper */}
        <div className="flex h-12 items-center border border-slate-300 bg-white px-2">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="flex h-8 w-8 items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
            title="Decrease Quantity"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-12 text-center font-bold text-sm font-mono text-slate-800">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="flex h-8 w-8 items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
            title="Increase Quantity"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Add to Quote Button */}
        <button
          onClick={handleAddToCart}
          className={`flex h-12 flex-1 items-center justify-center gap-2 px-6 text-sm font-semibold text-white transition-colors ${
            justAdded || isInCart
              ? "bg-emerald-700 hover:bg-emerald-800"
              : "bg-slate-950 hover:bg-slate-800"
          }`}
        >
          {justAdded || isInCart ? (
            <>
              <Check className="w-4 h-4" />
              <span>{dict.catalog.addedToQuote}</span>
            </>
          ) : (
            <>
              <FileText className="w-4 h-4 text-brand-gold" />
              <span>{dict.catalog.addToQuote}</span>
            </>
          )}
        </button>
      </div>

      {/* Direct WhatsApp and Share Buttons */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-slate-200 pt-4">
        <a
          href={whatsappInquiryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 items-center justify-center gap-2 border border-slate-300 px-4 text-sm font-medium text-slate-800 transition-colors hover:border-slate-500 hover:text-slate-950"
        >
          <MessageCircle className="w-4 h-4 fill-white text-transparent" />
          <span>{dict.catalog.whatsappInquiry}</span>
        </a>

        <button
          onClick={handleShare}
          className="inline-flex h-10 items-center justify-center gap-2 px-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-950"
        >
          <Share2 className="w-4 h-4 text-slate-500" />
          <span>{dict.catalog.sharePart}</span>
        </button>
      </div>
    </div>
  );
}
