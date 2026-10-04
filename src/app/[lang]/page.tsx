import { isValidLocale, defaultLocale, getDictionary, type Locale } from "@/lib/i18n";
import type { Metadata } from "next";
import { getLocalizedAlternates } from "@/lib/seo";
import { getAllCompatibleBrands } from "@/lib/catalog";
import { Hero } from "@/components/home/Hero";
import { CategoryBentoGrid } from "@/components/home/CategoryBentoGrid";
import { PopularComponents } from "@/components/home/PopularComponents";
import { WhyJupiter } from "@/components/home/WhyJupiter";
import { TrustedBrands } from "@/components/home/TrustedBrands";
import { ProcessSection } from "@/components/home/ProcessSection";
import { CtaBanner } from "@/components/home/CtaBanner";
import { GearChainCanvas } from "@/components/home/GearChainCanvas";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const validLocale: Locale = isValidLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(validLocale);

  return {
    title: dict.brand.tagline,
    description: dict.brand.tagline,
    alternates: getLocalizedAlternates(validLocale, "/"),
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const validLocale: Locale = isValidLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(validLocale);
  const compatibleBrands = getAllCompatibleBrands();

  return (
    <div className="flex flex-col w-full bg-[#F6F7F9] relative">
      {/* Background Animated 2.5D Gear Chain Canvas */}
      <GearChainCanvas lang={validLocale} />

      {/* 1. Hero Section */}
      <Hero
        lang={validLocale}
        dict={dict}
        compatibleBrands={compatibleBrands}
      />

      {/* 2. Section 01: Explore by Category */}
      <CategoryBentoGrid lang={validLocale} dict={dict} />

      {/* 3. Section 02: Featured Products / Popular Components */}
      <PopularComponents lang={validLocale} dict={dict} />

      {/* 4. Section 03: Why Jupiter (Precision in Every Component) */}
      <WhyJupiter lang={validLocale} dict={dict} />

      {/* 5. Section 04: Trusted Brands */}
      <TrustedBrands lang={validLocale} />

      {/* 6. Section 05: Our Process (From Enquiry to Delivery) */}
      <ProcessSection lang={validLocale} />

      {/* 7. Section 06: Get Started / CTA Callout Banner */}
      <CtaBanner lang={validLocale} />
    </div>
  );
}
