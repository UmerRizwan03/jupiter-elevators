import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Mail,
  Phone,
} from "lucide-react";
import type { Locale, Dictionary } from "@/lib/i18n";
import { JupiterLogo } from "@/components/common/JupiterLogo";

interface FooterProps {
  lang: Locale;
  dict: Dictionary;
}

export function Footer({ lang }: FooterProps) {
  const isRtl = lang === "ar";

  return (
    <footer className="relative z-20 w-full bg-[#0B0F19] text-slate-300 pt-16 pb-12 overflow-hidden">
      {/* Saudi Skyline Background Element */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 pointer-events-none select-none z-0 overflow-hidden flex justify-center opacity-30">
        <div className="relative w-full max-w-[1920px] h-[260px] sm:h-[340px] lg:h-[440px]">
          <Image
          src="/images/footer-skyline.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-bottom"
          style={{
            maskImage: "linear-gradient(to top, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
            WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
          }}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          {/* Column 1: Brand & Tagline & Socials */}
          <div className="lg:col-span-4 space-y-4">
            <JupiterLogo variant="dark" />

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm pt-2">
              {isRtl
                ? "شريكك الموثوق لقطع غيار المصاعد. مكونات معتمدة لعمليات التركيب، الصيانة الدورية والتحديث الشامل."
                : "Your trusted partner for elevator spare parts. Reliable components for installation, maintenance and modernization."}
            </p>

            <div className="pt-2 text-[11px] text-slate-500 font-mono">
              <span>CR: 2050078848 | VAT: 311250980100003</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {isRtl ? "روابط سريعة" : "Quick Links"}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href={`/${lang}`} className="hover:text-white transition-colors">
                  {isRtl ? "الرئيسية" : "Home"}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/catalog`} className="hover:text-white transition-colors">
                  {isRtl ? "المنتجات" : "Products"}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/brands`} className="hover:text-white transition-colors">
                  {isRtl ? "الماركات" : "Brands"}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/about`} className="hover:text-white transition-colors">
                  {isRtl ? "عن الشركة" : "About Us"}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/contact`} className="hover:text-white transition-colors">
                  {isRtl ? "اتصل بنا" : "Contact"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Products */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {isRtl ? "المنتجات" : "Products"}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href={`/${lang}/catalog?category=traction-machines`} className="hover:text-white transition-colors">
                  {isRtl ? "أنظمة الجر" : "Traction Systems"}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/catalog?category=elevator-controllers`} className="hover:text-white transition-colors">
                  {isRtl ? "أنظمة التحكم" : "Control Systems"}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/catalog?category=door-operators`} className="hover:text-white transition-colors">
                  {isRtl ? "أنظمة الأبواب" : "Door Systems"}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/catalog?category=safety-gear-governors`} className="hover:text-white transition-colors">
                  {isRtl ? "مكونات الأمان" : "Safety Components"}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/catalog?category=push-buttons-indicators`} className="hover:text-white transition-colors">
                  {isRtl ? "مكونات الكابينة" : "Cabin Components"}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/catalog?category=wire-ropes-suspension`} className="hover:text-white transition-colors">
                  {isRtl ? "الحبال والملحقات" : "Cables & Accessories"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Support */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {isRtl ? "الدعم" : "Support"}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href={`/${lang}/rfq`} className="hover:text-white transition-colors">
                  {isRtl ? "طلب تسعير" : "Request a Quote"}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/services`} className="hover:text-white transition-colors">
                  {isRtl ? "الدعم الفني" : "Technical Support"}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/services`} className="hover:text-white transition-colors">
                  {isRtl ? "الشحن والتوصيل" : "Shipping & Delivery"}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/faq`} className="hover:text-white transition-colors">
                  {isRtl ? "الأسئلة الشائعة" : "FAQs"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Contact Us */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {isRtl ? "اتصل بنا" : "Contact Us"}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C59341] shrink-0 mt-0.5" />
                <span>
                  {isRtl
                    ? "الدمام، السعودية / دبي، الإمارات"
                    : "Dammam, KSA / Dubai, UAE"}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C59341] shrink-0" />
                <a href="mailto:info@jupiterelevators.com" className="hover:text-white transition-colors">
                  info@jupiterelevators.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C59341] shrink-0" />
                <a href="tel:+966562614370" className="hover:text-white transition-colors" dir="ltr">
                  +966 562614370
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Terms */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Jupiter Elevators. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href={`/${lang}/privacy`} className="hover:text-slate-400 transition-colors">
              {isRtl ? "سياسة الخصوصية" : "Privacy Policy"}
            </Link>
            <Link href={`/${lang}/terms`} className="hover:text-slate-400 transition-colors">
              {isRtl ? "الشروط والأحكام" : "Terms & Conditions"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
