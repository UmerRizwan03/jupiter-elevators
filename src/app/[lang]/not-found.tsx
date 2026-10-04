"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, AlertTriangle, Layers } from "lucide-react";
import { CardTexture } from "@/components/ui/card-texture";

export default function NotFound() {
  const pathname = usePathname();
  const lang = pathname?.split("/")[1] === "en" ? "en" : "ar";
  return (
    <div className="py-16 sm:py-24 bg-[#F6F7F9] min-h-[75vh] flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 w-full">
        <div className="bg-white rounded-2xl border border-slate-200/90 p-8 sm:p-12 shadow-2xs relative overflow-hidden text-center group hover:border-[#C59341]/60 transition-all duration-300">
          <CardTexture variant="blueprint" watermark="ERROR | 404" />

          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-mono font-bold">
              <AlertTriangle className="w-3.5 h-3.5 text-[#C59341]" />
              <span>{lang === "ar" ? "404 | الصفحة غير موجودة" : "404 | COMPONENT ROUTE NOT LOCATED"}</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl font-mono font-black text-slate-900 tracking-tight">
                404
              </h1>
              <h2 className="text-lg sm:text-xl font-bold text-slate-800">
                {lang === "ar" ? "المواصفة أو الصفحة غير متاحة" : "Specification or Page Unavailable"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed pt-1">
                {lang === "ar"
                  ? "المواصفة أو رقم القطعة أو المستند المطلوب غير موجود أو تم نقله."
                  : "The component SKU, datasheet, or document you requested does not exist or has been relocated within our central warehouse index."}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-4 font-mono text-xs">
              <Link
                href={`/${lang}/catalog`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition-all shadow-xs"
              >
                <Layers className="w-4 h-4 text-[#C59341]" />
                <span>{lang === "ar" ? "ابحث في كتالوج المنتجات" : "SEARCH CATALOG DIRECTORY"}</span>
              </Link>
              <Link
                href={`/${lang}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold transition-all border border-slate-200"
              >
                <Home className="w-4 h-4" />
                <span>{lang === "ar" ? "العودة إلى الرئيسية" : "RETURN HOME"}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

