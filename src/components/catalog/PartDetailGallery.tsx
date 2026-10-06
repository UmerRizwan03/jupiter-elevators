"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import type { ElevatorPart } from "@/types/catalog";
import type { Locale } from "@/lib/i18n";
import { getPartImageUrl } from "@/lib/catalog";
import { Layers } from "lucide-react";

interface PartDetailGalleryProps {
  part: ElevatorPart;
  lang: Locale;
}

export function PartDetailGallery({ part, lang }: PartDetailGalleryProps) {
  const searchParams = useSearchParams();
  const isRtl = lang === "ar";
  const modelQuery = searchParams?.get("model");

  const activeVariant = useMemo(() => {
    if (modelQuery && part.variants) {
      const found = part.variants.find((v) => v.model === modelQuery);
      if (found) return found;
    }
    return part.variants?.[0];
  }, [modelQuery, part.variants]);

  const imageUrl = getPartImageUrl(part, activeVariant);
  const isVariantSpecific = Boolean(activeVariant?.storagePath);

  return (
    <div className="relative aspect-square overflow-hidden bg-[#F1F3F5] rounded-3xl lg:sticky lg:top-24 border border-slate-100 shadow-2xs group">
      {/* Model Indicator Badge */}
      {activeVariant && isVariantSpecific && (
        <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-xs text-slate-800 border border-slate-200/80 shadow-2xs text-[11px] font-mono font-bold">
          <Layers className="w-3.5 h-3.5 text-[#8A6428]" />
          <span>{activeVariant.model}</span>
        </div>
      )}

      {/* Origin / Genuine Quality Badge */}
      <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4 z-10">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium bg-white/95 backdrop-blur-xs text-slate-700 shadow-2xs border border-slate-200/80">
          {isRtl ? "صورة المنتج المعتمدة" : "Verified Product Image"}
        </span>
      </div>

      {/* Main Image */}
      <div className="relative w-full h-full flex items-center justify-center p-8 sm:p-12">
        <Image
          key={imageUrl}
          src={imageUrl}
          alt={activeVariant?.model ? `${part.name[lang]} (${activeVariant.model})` : part.name[lang]}
          fill
          sizes="(max-width: 1024px) 100vw, 42vw"
          className="object-contain p-8 sm:p-12 transition-transform duration-500 group-hover:scale-105"
          priority
        />
      </div>
    </div>
  );
}
