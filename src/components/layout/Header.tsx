"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, Info, Phone, Package, Tags, FileText, ArrowRight, Search } from "lucide-react";
import type { Locale, Dictionary } from "@/lib/i18n";
import { JupiterLogo } from "@/components/common/JupiterLogo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useCart } from "@/context/CartContext";
import { NotchNav, NotchItemData } from "@/components/ui/adaptive-notch-navigation-bar";
import { openCommandPalette } from "@/components/search/CommandPalette";

interface HeaderProps {
  lang: Locale;
  dict: Dictionary;
  children?: React.ReactNode;
}

export function Header({ lang }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { totalItemsCount } = useCart();
  const isRtl = lang === "ar";

  const getNavItems = (): NotchItemData[] => [
    { id: "home", label: isRtl ? "الرئيسية" : "Home", icon: Home },
    { id: "catalog", label: isRtl ? "المنتجات" : "Products", icon: Package },
    { id: "brands", label: isRtl ? "الماركات" : "Brands", icon: Tags },
    { id: "about", label: isRtl ? "عن الشركة" : "About Us", icon: Info },
    { id: "contact", label: isRtl ? "اتصل بنا" : "Contact", icon: Phone },
  ];

  const activeId = () => {
    if (pathname === `/${lang}` || pathname === `/${lang}/`) return "home";
    if (pathname?.includes("/brands")) return "brands";
    if (pathname?.includes("/catalog") && pathname?.includes("view=brands")) return "brands";
    if (pathname?.includes("/catalog")) return "catalog";
    if (pathname?.includes("/about")) return "about";
    if (pathname?.includes("/contact")) return "contact";
    return "home";
  };

  const handleActiveChange = (id: string) => {
    switch (id) {
      case "home": router.push(`/${lang}`); break;
      case "catalog": router.push(`/${lang}/catalog`); break;
      case "brands": router.push(`/${lang}/brands`); break;
      case "about": router.push(`/${lang}/about`); break;
      case "contact": router.push(`/${lang}/contact`); break;
    }
  };

  const LogoSlot = (
    <Link href={`/${lang}`} aria-label={isRtl ? "الصفحة الرئيسية" : "Jupiter Elevators home"} className="flex items-center h-8 cursor-pointer">
      <JupiterLogo variant="light" className="h-5 md:h-6 w-auto" />
    </Link>
  );

  const RightContentSlot = (
    <div className="flex items-center gap-2 sm:gap-3 h-8.5">
      {/* Quick Search Button */}
      <button
        type="button"
        onClick={() => openCommandPalette()}
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors text-xs font-mono"
        title={isRtl ? "بحث عن قطعة (Cmd+K)" : "Search parts (Cmd+K)"}
      >
        <Search className="w-3.5 h-3.5 text-[#C59341]" />
        <span className="hidden md:inline text-[10px] opacity-75">⌘K</span>
      </button>

      <LanguageSwitcher currentLang={lang} />
      
      {/* RFQ Quote Cart Mini-Badge */}
      {totalItemsCount > 0 && (
        <Link
          href={`/${lang}/rfq`}
          className="relative p-1 text-slate-300 hover:text-white transition-colors"
          title="RFQ Basket"
        >
          <FileText className="w-4 h-4 text-amber-500" />
          <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-[9px] font-black rounded-full w-3.5 h-3.5 flex items-center justify-center">
            {totalItemsCount}
          </span>
        </Link>
      )}

      {/* "Get a Quote →" Action Button */}
      <Link
        href={`/${lang}/rfq`}
        className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-zinc-950 hover:bg-slate-200 text-xs font-bold transition-all shadow-sm group"
      >
        <span>{isRtl ? "طلب تسعير" : "Quote"}</span>
        <ArrowRight className="w-3 h-3 rtl:rotate-180 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform" />
      </Link>
    </div>
  );

  return (
    <NotchNav
      items={getNavItems()}
      activeId={activeId()}
      position="top"
      logo={LogoSlot}
      rightContent={RightContentSlot}
      showLogo={true}
      showRightContent={true}
      onActiveChange={handleActiveChange}
    />
  );
}
