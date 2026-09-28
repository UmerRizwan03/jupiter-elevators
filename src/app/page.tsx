"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { BrandMarquee } from "@/components/home/BrandMarquee";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { ElevatorShaftExplorer } from "@/components/home/ElevatorShaftExplorer";
import { AboutWatermarkSection } from "@/components/home/AboutWatermarkSection";
import { FeaturedParts } from "@/components/home/FeaturedParts";
import { PhotoIdentificationBanner } from "@/components/home/PhotoIdentificationBanner";
import { MetricsAndFaq } from "@/components/home/MetricsAndFaq";
import { ContactMapDock } from "@/components/home/ContactMapDock";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        {/* 1. Hero with Watermark Depth & Floating Part Finder Dock */}
        <Hero />

        {/* 2. Editorial Slash-Separated OEM Brand Strip */}
        <BrandMarquee />

        {/* 3. Popular Categories Bento Grid (Slide 4 Inspiration) */}
        <CategoryGrid />

        {/* 4. Interactive Elevator Shaft Anatomy Explorer */}
        <ElevatorShaftExplorer />

        {/* 5. About Section with Giant Watermark Typography (Slide 5 Inspiration) */}
        <AboutWatermarkSection />

        {/* 6. Fast-Moving Spares Grid */}
        <FeaturedParts />

        {/* 7. Field Technician Camera Photo ID WhatsApp Tool */}
        <PhotoIdentificationBanner />

        {/* 8. Precision Performance Metrics & FAQ Accordion (Slide 8 & 9 Inspiration) */}
        <MetricsAndFaq />

        {/* 9. Geographic Coordinates & Quick RFQ Contact Terminal (Slide 7 & 8 Inspiration) */}
        <ContactMapDock />
      </main>
      <Footer />
    </div>
  );
}
