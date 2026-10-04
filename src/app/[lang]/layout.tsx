import type { Metadata } from "next";
import Script from "next/script";
import { Cairo, Inter } from "next/font/google";
import "@/app/globals.css";
import { isValidLocale, defaultLocale, getDirection, getDictionary, locales, type Locale } from "@/lib/i18n";
import { getLocalBusinessJsonLd } from "@/lib/seo";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import { FloatingCartButton } from "@/components/cart/FloatingCartButton";
import { MobileActionBar } from "@/components/cart/MobileActionBar";
import { ToastProvider } from "@/components/ui/toast";
import { SubpageHoistwaySpine } from "@/components/layout/SubpageHoistwaySpine";
import { CookieConsent } from "@/components/common/CookieConsent";

import { CommandPalette } from "@/components/search/CommandPalette";

const cairo = Cairo({ subsets: ["arabic", "latin"], weight: ["400", "500", "600", "700", "800", "900"], display: "swap" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], display: "swap" });

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const validLocale: Locale = isValidLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(validLocale);

  return {
    metadataBase: new URL("https://www.jupiterelevators.com"),
    title: {
      default: `${dict.brand.name} | ${dict.brand.tagline}`,
      template: `%s | ${dict.brand.name}`,
    },
    description: dict.brand.tagline,
    keywords: [
      "elevator spare parts",
      "elevator components",
      "saudi arabia elevator parts",
      "dammam elevator supply",
      "قطع غيار مصاعد",
      "لوحات تحكم مصاعد",
      "ماكينات جر مصاعد",
      "مشغلات أبواب مصاعد",
      "سكك توجيه مصاعد",
      "شركة سبيس للمقاولات الصناعية",
    ],
    authors: [{ name: "Space Industrial Cont. Company" }],
    icons: {
      icon: [
        { url: "/icon.svg", type: "image/svg+xml" },
        { url: "/favicon.ico", sizes: "32x32" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
      shortcut: "/favicon.ico",
    },
    openGraph: {
      title: `${dict.brand.name} | ${dict.brand.tagline}`,
      description: dict.brand.tagline,
      locale: validLocale === "ar" ? "ar_SA" : "en_US",
      type: "website",
      images: [
        {
          url: `/${validLocale}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: dict.brand.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${dict.brand.name} | ${dict.brand.tagline}`,
      description: dict.brand.tagline,
      images: [`/${validLocale}/opengraph-image`],
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const validLocale: Locale = isValidLocale(lang) ? lang : defaultLocale;
  const dir = getDirection(validLocale);
  const dict = await getDictionary(validLocale);
  const jsonLd = getLocalBusinessJsonLd(validLocale);

  const fontClass = validLocale === "ar" ? cairo.className : inter.className;

  return (
    <html lang={validLocale} dir={dir}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body className={`${fontClass} min-h-screen flex flex-col bg-[#F6F7F9] text-slate-900 selection:bg-[#C59341] selection:text-white pb-14 md:pb-0`}>
        <CartProvider>
          <ToastProvider>
            <Header lang={validLocale} dict={dict} />
            <SubpageHoistwaySpine lang={validLocale} />
            <main className="flex-1 w-full pt-12 md:pt-14 relative z-10">{children}</main>
            <Footer lang={validLocale} dict={dict} />
            <FloatingCartButton lang={validLocale} />
            <MobileActionBar lang={validLocale} />
            <CommandPalette lang={validLocale} />
            <CookieConsent lang={validLocale} />
          </ToastProvider>
        </CartProvider>
      </body>
    </html>
  );
}
