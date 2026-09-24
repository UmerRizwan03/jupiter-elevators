"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { PhotoIdentificationBanner } from "@/components/home/PhotoIdentificationBanner";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { FeaturedParts } from "@/components/home/FeaturedParts";
import { TrustHighlights } from "@/components/home/TrustHighlights";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Hero />
        <PhotoIdentificationBanner />
        <CategoryGrid />
        <FeaturedParts />
        <TrustHighlights />
      </main>
      <Footer />
    </div>
  );
}
