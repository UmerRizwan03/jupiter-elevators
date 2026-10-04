import type { ElevatorPart } from "@/types/catalog";
import type { Locale } from "./i18n";
import { defaultLocale } from "./i18n";
import { getPartImageUrl } from "./catalog";

export function getLocalizedAlternates(locale: Locale, pathname: string) {
  const normalizedPath = pathname === "/" ? "" : pathname.replace(/\/$/, "");

  return {
    canonical: `/${locale}${normalizedPath}`,
    languages: {
      en: `/en${normalizedPath}`,
      ar: `/ar${normalizedPath}`,
      "x-default": `/${defaultLocale}${normalizedPath}`,
    },
  };
}

export function getLocalBusinessJsonLd(locale: "ar" | "en") {
  return {
    "@context": "https://schema.org",
    "@type": "WholesaleStore",
    name: locale === "ar" ? "جوبيتر للمصاعد" : "Jupiter Elevators",
    alternateName: "Space Industrial Cont. Company",
    url: "https://www.jupiterelevators.com",
    logo: "https://www.jupiterelevators.com/images/logo.svg",
    telephone: "+966562614370",
    email: "elevatorsjupiter@gmail.com",
    sameAs: [
      "https://www.instagram.com/jupiterelevators?stkn=dGh2eTBvNmxwNnps",
      "https://www.facebook.com/share/1Q6pwuLyj8/",
    ],
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Al-Badariya District, P.O. Box-60113",
      addressLocality: "Dammam",
      postalCode: "31545",
      addressCountry: "SA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "26.4207",
      longitude: "50.0888",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Saturday",
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
        ],
        opens: "08:00",
        closes: "17:00",
      },
    ],
    areaServed: [
      { "@type": "City", name: "Dammam" },
      { "@type": "City", name: "Riyadh" },
      { "@type": "City", name: "Jeddah" },
      { "@type": "Country", name: "Saudi Arabia" },
    ],
    identifier: [
      {
        "@type": "PropertyValue",
        name: "Commercial Registration (CR)",
        value: "2050078848",
      },
      {
        "@type": "PropertyValue",
        name: "VAT Number",
        value: "311250980100003",
      },
    ],
  };
}

export function getProductJsonLd(part: ElevatorPart, locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: part.name[locale],
    description: part.description[locale],
    sku: part.sku,
    mpn: part.sku,
    image: [`https://www.jupiterelevators.com${getPartImageUrl(part)}`],
    brand: {
      "@type": "Brand",
      name: part.compatibleBrands[0] || "Jupiter Elevators",
    },
  };
}

export function getFaqJsonLd(
  faqs: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

