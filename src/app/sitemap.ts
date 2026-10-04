import type { MetadataRoute } from "next";
import { getAllParts } from "@/lib/catalog";
import { locales } from "@/lib/i18n";

const BASE_URL = "https://www.jupiterelevators.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const parts = getAllParts();

  const routes: MetadataRoute.Sitemap = [];

  // Localized Core Pages
  locales.forEach((lang) => {
    // Home
    routes.push({
      url: `${BASE_URL}/${lang}`,
      changeFrequency: "daily",
      priority: 1.0,
    });

    // About
    routes.push({
      url: `${BASE_URL}/${lang}/about`,
      changeFrequency: "monthly",
      priority: 0.8,
    });

    // Services
    routes.push({
      url: `${BASE_URL}/${lang}/services`,
      changeFrequency: "weekly",
      priority: 0.85,
    });

    // Catalog Directory
    routes.push({
      url: `${BASE_URL}/${lang}/catalog`,
      changeFrequency: "daily",
      priority: 0.95,
    });

    // Brands Directory
    routes.push({
      url: `${BASE_URL}/${lang}/brands`,
      changeFrequency: "weekly",
      priority: 0.9,
    });

    // Contact
    routes.push({
      url: `${BASE_URL}/${lang}/contact`,
      changeFrequency: "monthly",
      priority: 0.8,
    });

    // RFQ
    routes.push({
      url: `${BASE_URL}/${lang}/rfq`,
      changeFrequency: "daily",
      priority: 0.9,
    });

    // FAQ
    routes.push({
      url: `${BASE_URL}/${lang}/faq`,
      changeFrequency: "weekly",
      priority: 0.75,
    });

    // Terms & Conditions
    routes.push({
      url: `${BASE_URL}/${lang}/terms`,
      changeFrequency: "yearly",
      priority: 0.5,
    });

    // Privacy Policy
    routes.push({
      url: `${BASE_URL}/${lang}/privacy`,
      changeFrequency: "yearly",
      priority: 0.5,
    });

    // Dynamic Part Detail Pages
    parts.forEach((part) => {
      routes.push({
        url: `${BASE_URL}/${lang}/catalog/${part.slug}`,
        changeFrequency: "weekly",
        priority: 0.85,
      });
    });
  });

  return routes;
}

