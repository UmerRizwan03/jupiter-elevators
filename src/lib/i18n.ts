import { en } from "@/data/translations/en";
import { ar } from "@/data/translations/ar";
import { SupportedLocale } from "@/types/catalog";

export const translations = { en, ar };

export function isRtl(locale: SupportedLocale): boolean {
  return locale === "ar";
}
