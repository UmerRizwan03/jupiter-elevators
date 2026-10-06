"use client";

import React, { useState } from "react";
import { Plus, Minus, Check, MessageCircle, FileText, Share2, Layers } from "lucide-react";
import type { ElevatorPart, PartVariant } from "@/types/catalog";
import type { Locale, Dictionary } from "@/lib/i18n";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/ui/toast";

interface PartDetailActionsProps {
  part: ElevatorPart;
  lang: Locale;
  dict: Dictionary;
  selectedVariant?: PartVariant;
  onVariantChange?: (variant: PartVariant) => void;
}

export function PartDetailActions({
  part,
  lang,
  dict,
  selectedVariant: externalVariant,
  onVariantChange,
}: PartDetailActionsProps) {
  const { addItem, items } = useCart();
  const { toast } = useToast();
  const [internalVariant, setInternalVariant] = useState<PartVariant | undefined>(
    part.variants?.[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const isRtl = lang === "ar";

  const activeVariant = externalVariant || internalVariant;
  const variants = part.variants || [];

  const isInCart = items.some(
    (item) =>
      item.part.id === part.id &&
      (!activeVariant || item.selectedVariant?.model === activeVariant.model)
  );

  const handleVariantSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const found = variants.find((v) => v.model === e.target.value);
    if (found) {
      setInternalVariant(found);
      onVariantChange?.(found);
    }
  };

  const handleAddToCart = () => {
    addItem(part, quantity, undefined, activeVariant);
    setJustAdded(true);
    toast({
      title: isRtl ? "تمت الإضافة لسلة التسعير" : "Added to Quote Basket",
      description: `[${activeVariant?.model || part.sku}] ${part.name[lang]} (x${quantity})`,
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
        text: `${part.name[lang]} - SKU: ${part.sku}${
          activeVariant ? ` - Model: ${activeVariant.model}` : ""
        }`,
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

  const formatVariantLabel = (v: PartVariant) => {
    let extra = "";
    if (v.specifications) {
      const firstSpec = Object.entries(v.specifications)[0];
      if (firstSpec) {
        const val = Array.isArray(firstSpec[1]) ? firstSpec[1].join("/") : firstSpec[1];
        extra = ` (${val})`;
      }
    } else if (v.type) {
      extra = ` - ${v.type}`;
    }
    return `${v.model}${extra}`;
  };

  const variantText = activeVariant ? `\n${isRtl ? "الموديل المحدد:" : "Selected Model:"} ${activeVariant.model}` : "";

  const whatsappInquiryUrl = `https://wa.me/966562614370?text=${encodeURIComponent(
    isRtl
      ? `السلام عليكم، أود طلب عرض سعر رسمي للقطعة التالية:\nالاسم: ${part.name.ar}\nرقم القطعة SKU: ${part.sku}${variantText}\nالكمية المطلوبة: ${quantity}`
      : `Hello, I would like an official quotation for:\nPart: ${part.name.en}\nSKU: ${part.sku}${variantText}\nQuantity Requested: ${quantity}`
  )}`;

  return (
    <div className="space-y-4">
      {/* Model & Variant Selector (if variants exist) */}
      {variants.length > 0 && (
        <div className="rounded-xl border border-amber-200/90 bg-amber-50/50 p-4 space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="variant-selector"
              className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-slate-800"
            >
              <Layers className="w-3.5 h-3.5 text-[#8A6428]" />
              <span>{isRtl ? "تحديد الموديل المطلوب:" : "Select Specific Model / Variant:"}</span>
            </label>
            <span className="text-[11px] font-mono font-semibold text-[#8A6428] bg-white px-2 py-0.5 rounded border border-amber-200">
              {variants.length} {isRtl ? "موديل متاح" : "models available"}
            </span>
          </div>

          <select
            id="variant-selector"
            value={activeVariant?.model || ""}
            onChange={handleVariantSelect}
            className="w-full h-11 px-3 rounded-lg border border-slate-300 bg-white text-xs sm:text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#8A6428] shadow-2xs"
          >
            {variants.map((v) => (
              <option key={v.model} value={v.model}>
                {formatVariantLabel(v)}
              </option>
            ))}
          </select>

          {activeVariant?.specifications && (
            <div className="pt-1 flex flex-wrap gap-2 text-[11px] font-mono text-slate-600">
              {Object.entries(activeVariant.specifications).slice(0, 4).map(([k, v]) => (
                <span
                  key={k}
                  className="inline-flex items-center px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700"
                >
                  <strong className="font-semibold text-slate-900 mr-1 rtl:mr-0 rtl:ml-1">
                    {k.replace(/_/g, " ")}:
                  </strong>
                  {Array.isArray(v) ? v.join(" / ") : v}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Quantity Selector + Add To Quote */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        {/* Quantity Stepper */}
        <div className="flex h-12 items-center border border-slate-300 bg-white px-2 rounded-lg">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="flex h-8 w-8 items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors rounded"
            title="Decrease Quantity"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-12 text-center font-bold text-sm font-mono text-slate-800">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="flex h-8 w-8 items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors rounded"
            title="Increase Quantity"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Add to Quote Button */}
        <button
          onClick={handleAddToCart}
          className={`flex h-12 flex-1 items-center justify-center gap-2 px-6 rounded-lg text-sm font-semibold text-white transition-all shadow-xs ${
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
              <FileText className="w-4 h-4 text-[#D8C49F]" />
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
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 text-sm font-medium text-slate-800 transition-colors hover:border-slate-500 hover:text-slate-950 shadow-2xs"
        >
          <MessageCircle className="w-4 h-4 text-emerald-600" />
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

