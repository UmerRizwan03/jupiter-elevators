import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Locale, Dictionary } from "@/lib/i18n";
import { CardTexture } from "@/components/ui/card-texture";

interface CategoryBentoGridProps {
  lang: Locale;
  dict: Dictionary;
}

export function CategoryBentoGrid({ lang }: CategoryBentoGridProps) {
  const isRtl = lang === "ar";

  const categories = [
    {
      num: "01",
      slug: "traction-machines",
      image: "/images/components/traction-systems.webp",
      name: isRtl ? "أنظمة الجر" : "Traction Systems",
    },
    {
      num: "02",
      slug: "elevator-controllers",
      image: "/images/components/control-systems.webp",
      name: isRtl ? "أنظمة التحكم" : "Control Systems",
    },
    {
      num: "03",
      slug: "door-operators",
      image: "/images/components/door-systems.webp",
      name: isRtl ? "أنظمة الأبواب" : "Door Systems",
    },
    {
      num: "04",
      slug: "safety-gear-governors",
      image: "/images/components/safety-components.webp",
      name: isRtl ? "مكونات الأمان" : "Safety Components",
    },
    {
      num: "05",
      slug: "push-buttons-indicators",
      image: "/images/components/cabin-components.webp",
      name: isRtl ? "مكونات الكابينة" : "Cabin Components",
    },
    {
      num: "06",
      slug: "wire-ropes-suspension",
      image: "/images/components/cables-accessories.webp",
      name: isRtl ? "الكابلات والملحقات" : "Cables & Accessories",
    },
  ];

  return (
    <section className="py-14 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 text-xs font-mono font-bold tracking-wider text-slate-400 uppercase mb-2">
              <span className="text-slate-800">01</span>
              <span>EXPLORE BY CATEGORY</span>
              <div className="h-px w-16 bg-slate-200" />
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              {isRtl ? "مكونات المصاعد الرئيسية" : "ELEVATOR COMPONENTS"}
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-500">
              {isRtl
                ? "قطع غيار ومكونات هندسية معتمدة لكافة الأنظمة والماركات العالمية."
                : "High-quality parts and certified components for all major elevator brands."}
            </p>
          </div>

          <Link
            href={`/${lang}/catalog`}
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs font-bold text-slate-900 hover:text-[#C59341] transition-colors group"
          >
            <span>{isRtl ? "عرض جميع الفئات" : "View All Categories"}</span>
            <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 6 Category Cards Grid (3 cols x 2 rows) matching screenshot design */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.num}
              href={`/${lang}/catalog?category=${cat.slug}`}
              className="group bg-white hover:border-[#C59341]/60 border border-slate-200/90 rounded-2xl p-5 sm:p-6 transition-all duration-300 shadow-2xs hover:shadow-md flex items-center justify-between min-h-[190px] sm:min-h-[210px] relative overflow-hidden"
            >
              {/* Technical Blueprint Texture Background */}
              <CardTexture variant="blueprint" watermark={`CAT | ${cat.num}`} />

              {/* Left Column: Number, Title, Arrow Circle */}
              <div className="flex flex-col justify-between self-stretch z-10 w-1/2 pr-3 rtl:pr-0 rtl:pl-3">
                <span className="text-xs sm:text-sm font-mono font-semibold text-slate-400">
                  {cat.num}
                </span>

                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight my-auto py-2">
                  {cat.name}
                </h3>

                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-stone-300 group-hover:border-slate-900 group-hover:bg-slate-900 flex items-center justify-center transition-colors">
                  <ArrowRight className="w-4 h-4 rtl:rotate-180 text-slate-700 group-hover:text-white transition-colors" />
                </div>
              </div>

              {/* Right Column: Category image */}
              <div className="w-1/2 h-full min-h-[140px] sm:min-h-[160px] flex items-center justify-center relative">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 40vw, 25vw"
                  className="object-contain p-1 transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
