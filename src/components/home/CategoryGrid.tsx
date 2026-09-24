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
    <section className="py-16 px-4 sm:px-8 bg-white">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-brand-gold uppercase tracking-wider">
              {locale === "ar" ? "كتالوج القطع والمكونات" : "Parts & Components Catalog"}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {locale === "ar" ? "12 تصنيفاً رئيسياً لقطع غيار المصاعد" : "12 Comprehensive Spare Parts Categories"}
            </h2>
          </div>
          <Link
            href="/catalog"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-navy hover:text-brand-gold transition-colors"
          >
            <span>{locale === "ar" ? "عرض جميع القطع في الكتالوج" : "View Complete Catalog"}</span>
            <ArrowIcon className="w-4 h-4" />
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
                className="group bg-slate-50 hover:bg-white rounded-2xl p-6 border border-slate-200 hover:border-brand-gold/60 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Category Icon */}
                  <div className="w-12 h-12 rounded-xl bg-brand-navy group-hover:bg-brand-gold text-brand-gold group-hover:text-brand-navy flex items-center justify-center transition-colors shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-navy transition-colors">
                      {category.name[locale]}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {category.description[locale]}
                    </p>
                  </div>

                  {/* Subcomponents Chips */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {category.subcategories.slice(0, 3).map((sub, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-medium bg-white group-hover:bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200"
                      >
                        {sub[locale]}
                      </span>
                    ))}
                    {category.subcategories.length > 3 && (
                      <span className="text-[10px] font-medium text-brand-gold px-1">
                        +{category.subcategories.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Action Link */}
                <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs font-bold text-brand-navy group-hover:text-brand-gold transition-colors">
                  <span>{locale === "ar" ? "تصفح القطع" : "Browse Parts"}</span>
                  <ArrowIcon className="w-4 h-4 transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
