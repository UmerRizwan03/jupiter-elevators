"use client";

import React, { useState, useMemo } from "react";
import { Search, Plus, Check, Layers } from "lucide-react";
import type { ElevatorPart, PartVariant } from "@/types/catalog";
import type { Locale, Dictionary } from "@/lib/i18n";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/ui/toast";

interface PartVariantMatrixProps {
  part: ElevatorPart;
  lang: Locale;
  dict: Dictionary;
  selectedVariant?: PartVariant;
  onSelectVariant?: (variant: PartVariant) => void;
}

export function PartVariantMatrix({
  part,
  lang,
  dict,
  selectedVariant,
  onSelectVariant,
}: PartVariantMatrixProps) {
  const { addItem, items } = useCart();
  const { toast } = useToast();
  const [filterQuery, setFilterQuery] = useState("");
  const [addedModel, setAddedModel] = useState<string | null>(null);
  const isRtl = lang === "ar";

  const variants = useMemo(() => part.variants || [], [part.variants]);


  const filteredVariants = useMemo(() => {
    if (!filterQuery.trim()) return variants;
    const q = filterQuery.trim().toLowerCase();
    return variants.filter((v) => {
      const matchModel = v.model.toLowerCase().includes(q);
      const matchType = v.type?.toLowerCase().includes(q);
      const matchSpecs = v.specifications
        ? Object.entries(v.specifications).some(
            ([k, val]) =>
              k.toLowerCase().includes(q) || String(val).toLowerCase().includes(q)
          )
        : false;
      return matchModel || matchType || matchSpecs;
    });
  }, [variants, filterQuery]);

  if (variants.length === 0) return null;

  const handleAddVariantToQuote = (variant: PartVariant) => {
    addItem(part, 1, undefined, variant);
    setAddedModel(variant.model);
    toast({
      title: isRtl ? "تمت إضافة الموديل لسلة التسعير" : "Model Added to Quote Basket",
      description: `[${variant.model}] ${part.name[lang]}`,
      action: {
        label: isRtl ? "عرض السلة" : "Review RFQ",
        url: `/${lang}/rfq`,
      },
    });
    setTimeout(() => setAddedModel(null), 2000);
  };

  const formatSpecValue = (specs?: Record<string, string | number | (string | number)[]>) => {
    if (!specs) return isRtl ? "مطابق للمواصفات القياسية" : "Standard Factory Spec";
    return Object.entries(specs)
      .map(([k, v]) => {
        const cleanKey = k.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
        const displayVal = Array.isArray(v) ? v.join(" / ") : v;
        return `${cleanKey}: ${displayVal}`;
      })
      .slice(0, 3)
      .join(" · ");
  };

  return (
    <section aria-labelledby="variant-matrix-heading" className="space-y-4 pt-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-300 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#8A6428]" />
            <h2 id="variant-matrix-heading" className="text-xl font-semibold tracking-tight text-slate-950">
              {isRtl ? "مصفوفة الموديلات والخيارات الفنية" : "Factory Model & Specification Matrix"}
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {isRtl
              ? `يحتوي هذا المكون على ${variants.length} موديل قياسي متوفر للطلب المباشر أو التسعير الفوري للمشاريع.`
              : `This parent product family includes ${variants.length} factory models ready for direct dispatch and project RFQs.`}
          </p>
        </div>

        {/* Filter Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder={isRtl ? "تصفية الموديلات (مثال: 11KW)..." : "Filter models (e.g. 11kW)..."}
            className="w-full h-9 pl-9 pr-3 rtl:pl-3 rtl:pr-9 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#8A6428] font-mono"
          />
        </div>
      </div>

      {/* Responsive Matrix Table Container */}
      <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white shadow-2xs">
        <table className="w-full text-left rtl:text-right text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-mono text-[11px] uppercase tracking-wider">
            <tr>
              <th scope="col" className="px-4 py-3 font-bold">{isRtl ? "رقم الموديل" : "Model Code"}</th>
              <th scope="col" className="px-4 py-3 font-bold">{isRtl ? "النوع / السلسلة" : "Type / Subseries"}</th>
              <th scope="col" className="px-4 py-3 font-bold">{isRtl ? "المواصفات الفنية" : "Key Specifications"}</th>
              <th scope="col" className="px-4 py-3 font-bold text-center">{isRtl ? "التوفر" : "Status"}</th>
              <th scope="col" className="px-4 py-3 font-bold text-right rtl:text-left">{isRtl ? "الإجراء" : "Action"}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredVariants.slice(0, 50).map((v) => {
              const isSelected = selectedVariant?.model === v.model;
              const isAdded = addedModel === v.model;
              const isInCart = items.some(
                (item) => item.part.id === part.id && item.selectedVariant?.model === v.model
              );

              return (
                <tr
                  key={v.model}
                  onClick={() => onSelectVariant?.(v)}
                  className={`cursor-pointer transition-colors ${
                    isSelected
                      ? "bg-amber-50/80 font-medium"
                      : "hover:bg-slate-50/80"
                  }`}
                >
                  {/* Model Code */}
                  <td className="px-4 py-3 font-mono font-bold text-slate-900 whitespace-nowrap">
                    <span className="flex items-center gap-1.5">
                      {isSelected && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8A6428]" />
                      )}
                      <span>{v.model}</span>
                    </span>
                  </td>

                  {/* Type / Subseries */}
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">
                    {v.type || part.subcategory[lang]}
                  </td>

                  {/* Specifications */}
                  <td className="px-4 py-3 text-slate-700 font-mono">
                    {formatSpecValue(v.specifications)}
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3 text-center whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>{isRtl ? "متوفر" : "In Stock"}</span>
                    </span>
                  </td>

                  {/* Action */}
                  <td className="px-4 py-3 text-right rtl:text-left whitespace-nowrap">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddVariantToQuote(v);
                      }}
                      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        isAdded || isInCart
                          ? "bg-emerald-700 text-white hover:bg-emerald-800"
                          : "bg-slate-900 text-white hover:bg-slate-800"
                      }`}
                    >
                      {isAdded || isInCart ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>{dict.catalog.addedToQuote}</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>{isRtl ? "إضافة للسلة" : "Add to RFQ"}</span>
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filteredVariants.length > 50 && (
          <div className="p-3 bg-slate-50 border-t border-slate-200 text-center text-xs text-slate-500 font-mono">
            {isRtl
              ? `يتم عرض أول 50 موديل من إجمالي ${filteredVariants.length}. استخدم حقل التصفية بالأعلى للبحث عن موديل محدد.`
              : `Showing first 50 models of ${filteredVariants.length}. Use the filter above to search for a specific model code.`}
          </div>
        )}

        {filteredVariants.length === 0 && (
          <div className="p-8 text-center text-slate-500 text-xs">
            {isRtl
              ? "لم يتم العثور على موديل يطابق معايير البحث."
              : "No factory models match your filter criteria."}
          </div>
        )}
      </div>
    </section>
  );
}
