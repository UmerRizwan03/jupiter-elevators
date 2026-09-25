"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { companyData } from "@/data/company";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { getEmergencyWhatsAppUrl } from "@/lib/whatsapp";
import {
  Phone,
  Clock,
  ShieldCheck,
  ShoppingCart,
  Menu,
  X,
  AlertTriangle,
  ChevronDown,
  Search,
  ArrowRight,
} from "lucide-react";
import { elevatorCategories } from "@/data/categories";

export function Header() {
  const { t, locale, isRtl } = useLanguage();
  const { totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  const emergencyUrl = getEmergencyWhatsAppUrl(locale);

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-slate-200">
      {/* 1. TOP UTILITY BAR (Official Credentials & Fast Touchpoints) */}
      <div className="bg-brand-navy text-slate-200 text-xs py-2 px-4 sm:px-8 border-b border-brand-navy-light">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Official Saudi Credentials */}
          <div className="flex items-center gap-3 text-slate-300">
            <span className="inline-flex items-center gap-1.5 font-medium text-brand-gold-light">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" />
              <span>{locale === "ar" ? "س.ت:" : "CR:"}</span>
              <strong className="tracking-wide text-white">{companyData.crNumber}</strong>
            </span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:inline-flex items-center gap-1">
              <span>{locale === "ar" ? "الرقم الضريبي:" : "VAT:"}</span>
              <span className="font-mono text-slate-300">{companyData.vatNumber}</span>
            </span>
          </div>

          {/* Quick Contact, Hours & Language Switcher */}
          <div className="flex items-center gap-4 ms-auto">
            <div className="hidden lg:flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-brand-gold" />
              <span>{companyData.businessHours.hours[locale]}</span>
              <span className="text-slate-500">({companyData.businessHours.days[locale]})</span>
            </div>

            <a
              href={`tel:${companyData.contact.primaryPhone}`}
              className="inline-flex items-center gap-1.5 text-slate-200 hover:text-brand-gold font-medium transition-colors"
              dir="ltr"
            >
              <Phone className="w-3.5 h-3.5 text-brand-gold" />
              <span>{companyData.contact.displayPhone}</span>
            </a>

            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-6 animate-hero-fade-down">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="relative h-11 w-44 sm:h-13 sm:w-56">
            <Image
              src="/brand/logo_horizontal.svg"
              alt="Jupiter Elevators"
              fill
              priority
              className="object-contain"
            />
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-800">
          <Link
            href="/"
            className="relative py-1 hover:text-brand-navy transition-colors font-bold text-slate-950"
          >
            <span>{t.nav.home}</span>
            <span className="absolute bottom-0 inset-x-0 h-[2px] bg-[#C29B63] rounded-full" />
          </Link>

          {/* Categories Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setCategoriesOpen(true)}
            onMouseLeave={() => setCategoriesOpen(false)}
          >
            <Link
              href="/catalog"
              className="inline-flex items-center gap-1 hover:text-brand-navy transition-colors py-1 text-slate-700"
            >
              <span>{locale === "ar" ? "المنتجات" : "Products"}</span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </Link>

            {categoriesOpen && (
              <div className="absolute top-full start-0 mt-1 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 grid gap-1 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  {t.catalog.allCategories}
                </div>
                {elevatorCategories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/catalog?category=${cat.id}`}
                    onClick={() => setCategoriesOpen(false)}
                    className="px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-brand-navy transition-colors flex items-center justify-between"
                  >
                    <span>{cat.name[locale]}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/catalog"
            className="hover:text-brand-navy transition-colors py-1 text-slate-700"
          >
            {locale === "ar" ? "الماركات" : "Brands"}
          </Link>

          <Link
            href="/about"
            className="hover:text-brand-navy transition-colors py-1 text-slate-700"
          >
            {t.nav.about}
          </Link>

          <Link
            href="/contact"
            className="hover:text-brand-navy transition-colors py-1 text-slate-700"
          >
            {t.nav.contact}
          </Link>
        </nav>

        {/* Action Controls: Search Icon, Language Switcher & Request Quote */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Quick Search Icon Trigger */}
          <Link
            href="/catalog"
            className="p-2 rounded-xl text-slate-600 hover:text-brand-navy hover:bg-slate-100 transition-colors"
            aria-label="Search Catalog"
            title={locale === "ar" ? "البحث في الكتالوج" : "Search Catalog"}
          >
            <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </Link>

          <div className="h-5 w-[1px] bg-slate-200 hidden sm:block" />

          {/* Language Switcher */}
          <div className="hidden sm:block">
            <LanguageSwitcher className="border-slate-200 text-slate-700 hover:border-brand-gold hover:text-brand-navy" />
          </div>

          {/* Primary Request Quote CTA Button */}
          <Link
            href="/quote"
            className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C29B63] to-[#B88B4A] hover:from-[#B88B4A] hover:to-[#A3773A] text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-sm hover:shadow-md shrink-0"
          >
            <span>{locale === "ar" ? "طلب تسعير" : "Request Quote"}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            {totalItems > 0 && (
              <span className="inline-flex items-center justify-center bg-brand-navy text-brand-gold font-mono text-[10px] font-bold w-5 h-5 rounded-full shadow-sm animate-pulse ms-1">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* 3. MOBILE SLIDE-DOWN DRAWER MENU */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 px-4 py-6 shadow-lg">
          <nav className="flex flex-col gap-4 text-base font-semibold text-slate-800">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 hover:text-brand-navy"
            >
              {t.nav.home}
            </Link>
            <Link
              href="/catalog"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 hover:text-brand-navy"
            >
              {t.nav.catalog}
            </Link>
            <Link
              href="/services"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 hover:text-brand-navy"
            >
              {t.nav.services}
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 hover:text-brand-navy"
            >
              {t.nav.about}
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 hover:text-brand-navy"
            >
              {t.nav.contact}
            </Link>
          </nav>

          <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col gap-3">
            <a
              href={emergencyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-emerald-600 text-white font-bold text-sm"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>{t.nav.emergencySupport}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
