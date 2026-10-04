"use client";

import React from "react";
import Link from "next/link";
import { MessageCircle, FileText, Camera, Search } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { Locale } from "@/lib/i18n";
import { openCommandPalette } from "@/components/search/CommandPalette";

interface MobileActionBarProps {
  lang: Locale;
}

export function MobileActionBar({ lang }: MobileActionBarProps) {
  const { totalItemsCount } = useCart();
  const isRtl = lang === "ar";

  const whatsappMessage = encodeURIComponent(
    isRtl
      ? "السلام عليكم، أود الاستفسار عن توفر وتسعير قطع غيار مصاعد."
      : "Hello, I would like to inquire about elevator spare parts availability and quotation."
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-3 py-2 shadow-2xl md:hidden">
      <div className="grid grid-cols-4 gap-1.5 items-center">
        {/* Quick Search */}
        <button
          onClick={() => openCommandPalette()}
          className="flex flex-col items-center justify-center py-1 px-1 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors text-center"
        >
          <Search className="w-4.5 h-4.5 text-[#C59341] mb-0.5" />
          <span className="text-[10px] font-mono font-bold leading-tight">
            {isRtl ? "بحث" : "SEARCH"}
          </span>
        </button>

        {/* Snap Photo Match */}
        <a
          href={`https://wa.me/966562614370?text=${encodeURIComponent(
            isRtl
              ? "السلام عليكم، مرفق صورة لقطعة مصعد أحتاج مطابقتها وتحديد البديل وسعره."
              : "Hello, I am sharing a photo of an elevator component that needs identification and pricing."
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1 px-1 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors text-center"
        >
          <Camera className="w-4.5 h-4.5 text-slate-700 mb-0.5" />
          <span className="text-[10px] font-mono font-bold leading-tight">
            {isRtl ? "صوّر بديل" : "PHOTO"}
          </span>
        </a>

        {/* WhatsApp Direct */}
        <a
          href={`https://wa.me/966562614370?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1 px-1 rounded-xl bg-[#25D366] text-white shadow-xs font-bold text-[10px]"
        >
          <MessageCircle className="w-4.5 h-4.5 fill-white text-transparent mb-0.5" />
          <span className="font-mono">{isRtl ? "واتساب" : "CHAT"}</span>
        </a>

        {/* RFQ Basket */}
        <Link
          href={`/${lang}/rfq`}
          className="relative flex flex-col items-center justify-center py-1 px-1 rounded-xl bg-slate-900 text-white shadow-xs text-center"
        >
          <div className="relative">
            <FileText className="w-4.5 h-4.5 text-[#C59341]" />
            {totalItemsCount > 0 && (
              <span className="absolute -top-1.5 -right-2 rtl:-right-auto rtl:-left-2 bg-[#C59341] text-white text-[9px] font-mono font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center">
                {totalItemsCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-mono font-bold leading-tight mt-0.5">
            {isRtl ? "السلة" : "BOM"}
          </span>
        </Link>
      </div>
    </div>
  );
}

