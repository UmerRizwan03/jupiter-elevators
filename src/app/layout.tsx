import type { Metadata } from "next";
import { Inter, Cairo } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { CartProvider } from "@/context/CartContext";
import { JsonLd } from "@/components/seo/JsonLd";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.jupiterelevators.com"),
  title: "Jupiter Elevators | Elevator Spare Parts & Components Saudi Arabia",
  description:
    "Jupiter Elevators (Space Industrial Cont. Co. CR: 2050078848) supplies high-grade elevator spare parts imported from India and China across Dammam, Riyadh, Jeddah, and all KSA.",
  keywords: [
    "elevator spare parts",
    "قطع غيار مصاعد",
    "elevator components Saudi Arabia",
    "Dammam elevator parts",
    "Riyadh elevator maintenance",
    "NICE3000 controller",
    "traction machine",
    "guide rails T75 T89",
    "elevator doors Fermator",
    "Saudi Arabia elevator supply",
  ],
  authors: [{ name: "Jupiter Elevators" }],
  creator: "Jupiter Elevators",
  icons: {
    icon: "/favicon.png",
    apple: "/brand/brandmark_icon_192.png",
  },
  openGraph: {
    title: "Jupiter Elevators | Trusted Elevator Spare Parts in KSA",
    description:
      "Direct imports from India & China. Extensive stock in Dammam serving Riyadh, Jeddah, and all Saudi Arabia.",
    url: "https://www.jupiterelevators.com",
    siteName: "Jupiter Elevators",
    images: [
      {
        url: "/brand/logo_full_transparent.png",
        width: 955,
        height: 959,
        alt: "Jupiter Elevators Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cairo.variable}`}>
      <body className="min-h-screen flex flex-col">
        <JsonLd />
        <LanguageProvider>
          <CartProvider>{children}</CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
