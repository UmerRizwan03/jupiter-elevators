"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { Locale, Dictionary } from "@/lib/i18n";
import { CardTexture } from "@/components/ui/card-texture";

interface PopularComponentsProps {
  lang: Locale;
  dict: Dictionary;
}

export function PopularComponents({ lang }: PopularComponentsProps) {
  const isRtl = lang === "ar";
  const scrollRef = useRef<HTMLDivElement>(null);

  const products = [
    {
      brand: "KONE",
      name: isRtl ? "إنفرتر محرك KDL" : "KDL Inverter Drive",
      spec: "KDL16L",
      image: "/images/popular/kone-kdl16l.webp",
      slug: "monarch-nice3000-integrated-elevator-controller",
    },
    {
      brand: "WITTUR",
      name: isRtl ? "مشغل الباب" : "Door Operator",
      spec: "Selcom 2.0",
      image: "/images/popular/wittur-door-operator.webp",
      slug: "vvvf-smart-cabin-door-operator-center-opening",
    },
    {
      brand: "Fermator",
      name: isRtl ? "بكرة الباب" : "Door Roller",
      spec: "74 x 20 mm",
      image: "/images/popular/fermator-door-roller.webp",
      slug: "polyurethane-door-hanger-roller-bearing",
    },
    {
      brand: "OTIS",
      name: isRtl ? "كارت كابينة علوي" : "Car Top Board",
      spec: "GAA26800",
      image: "/images/popular/otis-car-top-board.webp",
      slug: "step-f5021-serial-control-board",
    },
    {
      brand: "Schindler",
      name: isRtl ? "حساس وقوف ومستوى" : "Leveling Sensor",
      spec: "ID.NR. S93744",
      image: "/images/popular/schindler-leveling-sensor.webp",
      slug: "bi-stable-magnetic-leveling-sensor-switch",
    },
  ];

  const handleScroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: dir === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-14 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 text-xs font-mono font-bold tracking-wider text-slate-400 uppercase mb-2">
              <span className="text-slate-800">02</span>
              <span>FEATURED PRODUCTS</span>
              <div className="h-px w-16 bg-slate-200" />
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              {isRtl ? "قطع الغيار الأكثر طلباً" : "POPULAR COMPONENTS"}
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-500">
              {isRtl
                ? "قطع غيار موثوقة لأداء فائق وعمر تشغيلي طويل للمصاعد."
                : "Trusted parts for reliable performance and long-lasting operation."}
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-6">
            <Link
              href={`/${lang}/catalog`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-[#C59341] transition-colors group"
            >
              <span>{isRtl ? "عرض جميع المنتجات" : "View All Products"}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </Link>

            {/* Carousel navigation buttons */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => handleScroll("left")}
                className="w-8 h-8 rounded-full border border-slate-300 hover:border-slate-800 flex items-center justify-center text-slate-700 transition-colors cursor-pointer"
                aria-label="Previous Products"
              >
                <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
              </button>
              <button
                onClick={() => handleScroll("right")}
                className="w-8 h-8 rounded-full border border-slate-300 hover:border-slate-800 flex items-center justify-center text-slate-700 transition-colors cursor-pointer"
                aria-label="Next Products"
              >
                <ChevronRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </div>
          </div>
        </div>

        {/* 5 Product Cards Grid */}
        <div
          ref={scrollRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5"
        >
          {products.map((item, idx) => (
            <Link
              key={idx}
              href={`/${lang}/catalog/${item.slug}`}
              className="group bg-white rounded-2xl border border-slate-200/90 p-5 flex flex-col justify-between hover:border-[#C59341]/60 hover:shadow-md transition-all duration-300 min-h-[260px] relative overflow-hidden"
            >
              {/* Engineering Product Texture Background */}
              <CardTexture variant="product" watermark={item.brand} />

              {/* Product Image Area */}
              <div className="w-full h-36 sm:h-40 flex items-center justify-center relative my-1 z-10">
                <Image
                  src={item.image}
                  alt={`${item.brand} ${item.name}`}
                  width={480}
                  height={320}
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 25vw"
                  className="max-h-[135px] w-auto max-w-full object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform duration-300 pointer-events-none select-none"
                />
              </div>

              {/* Card Bottom Area: Brand, Title, Spec on Left + Diagonal Arrow on Right */}
              <div className="flex items-end justify-between mt-auto pt-3 relative z-10">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-800 tracking-tight block">
                    {item.brand}
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">
                    {item.spec}
                  </p>
                </div>

                <div className="text-slate-700 group-hover:text-slate-900 transition-colors mb-0.5 shrink-0 pl-2 rtl:pl-0 rtl:pr-2">
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform rtl:-scale-x-100" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
