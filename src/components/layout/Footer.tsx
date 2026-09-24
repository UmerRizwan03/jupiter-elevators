"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { companyData } from "@/data/company";
import { elevatorCategories } from "@/data/categories";
import {
  ShieldCheck,
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  MessageCircle,
} from "lucide-react";

export function Footer() {
  const { t, locale } = useLanguage();

  return (
    <footer className="bg-brand-navy text-slate-300 pt-16 pb-8 border-t border-brand-navy-light mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Column 1: Company Profile & Official Credentials */}
          <div className="space-y-4">
            <div className="relative h-12 w-48 bg-white/5 rounded-lg p-2">
              <Image
                src="/brand/logo_horizontal.svg"
                alt="Jupiter Elevators"
                fill
                className="object-contain filter brightness-110"
              />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {locale === "ar"
                ? "الموزع الرائد لقطع غيار ومكونات المصاعد المستوردة مباشرة من الهند والصين إلى كافة مدن المملكة العربية السعودية."
                : "The leading distributor of elevator spare parts and components imported directly from India and China across the Kingdom of Saudi Arabia."}
            </p>

            {/* Official Registration Cards */}
            <div className="bg-slate-900/80 rounded-lg p-3 border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5 text-brand-gold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{t.footer.crLabel}:</span>
                </span>
                <strong className="font-mono text-white tracking-wider">{companyData.crNumber}</strong>
              </div>
              <div className="flex items-center justify-between text-slate-300 border-t border-slate-800 pt-1.5">
                <span className="text-slate-400">{t.footer.vatLabel}:</span>
                <span className="font-mono text-slate-300">{companyData.vatNumber}</span>
              </div>
              <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-800">
                {companyData.legalName[locale]}
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-b border-slate-800 pb-2">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-brand-gold transition-colors">
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="hover:text-brand-gold transition-colors">
                  {t.nav.catalog}
                </Link>
              </li>
              <li>
                <Link href="/quote" className="hover:text-brand-gold transition-colors">
                  {t.nav.rfqQuote}
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-brand-gold transition-colors">
                  {t.nav.services}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand-gold transition-colors">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-gold transition-colors">
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Spare Parts Categories */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-b border-slate-800 pb-2">
              {t.footer.categories}
            </h4>
            <ul className="space-y-2 text-xs">
              {elevatorCategories.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/catalog?category=${cat.id}`}
                    className="hover:text-brand-gold transition-colors truncate block"
                  >
                    {cat.name[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Registered Address & Direct Touchpoints */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-b border-slate-800 pb-2">
              {t.footer.contactUs}
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">
                    {companyData.address.city[locale]}, {companyData.address.country[locale]}
                  </p>
                  <p className="text-slate-400">
                    {companyData.address.district[locale]}, {companyData.address.poBox} (Code:{" "}
                    {companyData.address.postalCode})
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-brand-gold shrink-0" />
                <div>
                  <p>
                    {companyData.businessHours.days[locale]}: {companyData.businessHours.hours[locale]}
                  </p>
                  <p className="text-slate-500 text-[11px]">{companyData.businessHours.friday[locale]}</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-gold shrink-0" />
                <a
                  href={`tel:${companyData.contact.primaryPhone}`}
                  className="hover:text-brand-gold font-mono"
                  dir="ltr"
                >
                  {companyData.contact.displayPhone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-gold shrink-0" />
                <a
                  href={`mailto:${companyData.contact.emails.sales}`}
                  className="hover:text-brand-gold font-mono"
                >
                  {companyData.contact.emails.sales}
                </a>
              </div>

              {/* Direct WhatsApp Action */}
              <div className="pt-2">
                <a
                  href={`https://wa.me/${companyData.contact.whatsappNumber.replace("+", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{locale === "ar" ? "محادثة فورية عبر واتساب" : "Chat on WhatsApp"}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Service Locations */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} {companyData.brandName[locale]} - {companyData.legalName[locale]}.{" "}
            {t.footer.rights}
          </p>
          <div className="flex flex-wrap items-center gap-2 text-[11px]">
            <span className="text-slate-400">{locale === "ar" ? "نطاق الخدمة والتوريد:" : "Serving:"}</span>
            {companyData.address.coverageCities.map((city, idx) => (
              <span key={city.en} className="text-slate-400">
                {city[locale]}
                {idx < companyData.address.coverageCities.length - 1 && " •"}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
