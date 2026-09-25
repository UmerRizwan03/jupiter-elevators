"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { elevatorCategories } from "@/data/categories";
import {
  Cpu,
  Cog,
  Ruler,
  Maximize2,
  DoorClosed,
  Sliders,
  Anchor,
  ShieldAlert,
  GitCommit,
  Scan,
  Droplets,
  Box,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

// Icon mapping helper
const iconMap: Record<string, React.ElementType> = {
  Cpu,
  Cog,
  Ruler,
  Maximize2,
  DoorClosed,
  Sliders,
  Anchor,
  ShieldAlert,
  GitCommit,
  Scan,
  Droplets,
  Box,
};

export function CategoryGrid() {
  const { t, locale, isRtl } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section className="py-20 px-4 sm:px-8 bg-[#FAFAFA] text-slate-900 relative overflow-hidden border-b border-slate-200">
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-brand-gold uppercase tracking-widest">
              {locale === "ar" ? "كتالوج القطع والمكونات الشامل" : "CATEGORIZED COMPONENT MATRIX"}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black font-serif text-slate-950 tracking-tight">
              {locale === "ar" ? "12 تصنيفاً رئيسياً لقطع غيار المصاعد" : "12 Primary Spare Parts Classifications"}
            </h2>
          </div>
          <Link
            href="/catalog"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-brand-navy hover:text-brand-gold transition-colors"
          >
            <span>{locale === "ar" ? "عرض جميع القطع في الكتالوج" : "VIEW COMPLETE SPEC INDEX"}</span>
            <ArrowIcon className="w-4 h-4 text-brand-gold" />
          </Link>
        </div>

        {/* 12 Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {elevatorCategories.map((category) => {
            const Icon = iconMap[category.icon] || Box;

            return (
              <Link
                key={category.id}
                href={`/catalog?category=${category.id}`}
                className="group bg-white hover:bg-white rounded-2xl p-6 border border-slate-200/90 hover:border-brand-gold/70 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between relative overflow-hidden"
              >
                <div className="cad-corner-tl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="cad-corner-tr opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="space-y-4">
                  {/* Category Icon */}
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 group-hover:border-brand-gold text-brand-gold flex items-center justify-center transition-colors shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-navy transition-colors font-serif">
                      {category.name[locale]}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {category.description[locale]}
                    </p>
                  </div>

                  {/* Subcomponents Chips */}
                  <div className="pt-2 flex flex-wrap gap-1.5 font-mono">
                    {category.subcategories.slice(0, 3).map((sub, i) => (
                      <span
                        key={i}
                        className="text-[10px] bg-slate-50 text-slate-700 px-2 py-0.5 rounded border border-slate-200 font-medium"
                      >
                        {sub[locale]}
                      </span>
                    ))}
                    {category.subcategories.length > 3 && (
                      <span className="text-[10px] font-bold text-brand-gold px-1">
                        +{category.subcategories.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Action Link */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-bold text-slate-500 group-hover:text-brand-navy transition-colors">
                  <span>{locale === "ar" ? "تصفح القطع" : "EXPLORE PARTS"}</span>
                  <ArrowIcon className="w-4 h-4 text-brand-gold transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

