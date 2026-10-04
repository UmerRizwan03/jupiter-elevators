"use client";

import React from "react";
import Link from "next/link";
import { FileText, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { Locale } from "@/lib/i18n";
import { BorderBeam } from "@/components/ui/border-beam";

interface FloatingCartButtonProps {
  lang: Locale;
}

export function FloatingCartButton({ lang }: FloatingCartButtonProps) {
  const { totalItemsCount } = useCart();

  if (totalItemsCount === 0) return null;

  const isRtl = lang === "ar";

  return (
    <div className="fixed bottom-6 left-6 rtl:left-auto rtl:right-6 z-40 hidden md:block animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="relative p-[1.5px] rounded-full overflow-hidden shadow-2xl group">
        <BorderBeam duration={5} />

        <Link
          href={`/${lang}/rfq`}
          className="relative z-10 flex items-center gap-3.5 bg-slate-900 hover:bg-slate-800 text-white px-5 py-3 rounded-full transition-all"
        >
          <div className="relative">
            <FileText className="w-5 h-5 text-[#C59341]" />
            <span className="absolute -top-2 -right-2 rtl:-right-auto rtl:-left-2 bg-[#C59341] text-white text-[10px] font-mono font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center shadow-xs">
              {totalItemsCount}
            </span>
          </div>

          <div className="flex flex-col text-left rtl:text-right">
            <span className="text-xs font-mono font-bold leading-tight uppercase tracking-wider text-white">
              {isRtl ? "سلة طلب التسعير" : "BOM QUOTE BASKET"}
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              [{totalItemsCount} {isRtl ? "مكونات محددة" : "SKUS READY"}]
            </span>
          </div>

          <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
            <ArrowRight className="w-3.5 h-3.5 text-[#C59341] rtl:rotate-180 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform" />
          </div>
        </Link>
      </div>
    </div>
  );
}

