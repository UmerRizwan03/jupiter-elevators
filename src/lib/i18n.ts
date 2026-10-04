import englishDictionary from "@/dictionaries/en.json";

export const defaultLocale = "ar" as const;
export const locales = ["en", "ar"] as const;

export type Locale = (typeof locales)[number];

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export function getDirection(locale: Locale): "rtl" | "ltr" {
  return locale === "ar" ? "rtl" : "ltr";
}

const dictionaries = {
  ar: () => import("@/dictionaries/ar.json").then((module) => module.default),
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
};

export type Dictionary = typeof englishDictionary;

export async function getDictionary(locale: Locale) {
  if (!isValidLocale(locale)) {
    return dictionaries[defaultLocale]();
  }
  return dictionaries[locale]();
}
