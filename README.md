# Jupiter Elevators (جوبيتر للمصاعد)

<div align="center">

![Jupiter Elevators Logo](/public/images/logo.png)

**Premier Elevator Spare Parts & Mechanical Components Procurement Portal**  
*Serving the Kingdom of Saudi Arabia (Dammam · Riyadh · Jeddah · Khobar · Jubail · Nationwide)*

[![Next.js](https://img.shields.io/badge/Next.js-16.3.6-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Saudi PDPL Compliant](https://img.shields.io/badge/Saudi_PDPL-Compliant-006C35?style=flat-square)](https://dpa.gov.sa/)
[![Build Status](https://img.shields.io/badge/Build-138%2F138%20SSG%20Passing-success?style=flat-square)]()
[![License](https://img.shields.io/badge/License-Proprietary-red?style=flat-square)]()

</div>

---

## Institutional Background & Legal Entity

**Jupiter Elevators** is the dedicated commercial elevator components division of **Space Industrial Cont. Company** (شركة سبيس للمقاولات الصناعية), headquartered in Dammam, Eastern Province, Kingdom of Saudi Arabia. With over 30 years of combined engineering experience in the vertical transportation sector, Jupiter Elevators operates as a tier-1 direct importer and stocking distributor of OEM-grade elevator parts, traction machines, door systems, and control electronics sourced directly from certified manufacturing facilities in India, China, and Europe.

* **Legal Entity:** Space Industrial Cont. Company (شركة سبيس للمقاولات الصناعية)
* **Commercial Registration (CR):** `2050078848`
* **VAT Registration Certificate:** `311250980100003`
* **Central Distribution Hub:** Dammam Industrial Area, Eastern Province, KSA
* **Hotline / WhatsApp:** `+966 56 261 4370`
* **Sales & Quotations (Primary):** `sales@jupiterelevators.com`
* **General & Corporate:** `info@jupiterelevators.com`
* **Operational Backup:** `elevatorsjupiter@gmail.com`
* **Official Website:** [https://jupiterelevators.com](https://jupiterelevators.com)
* **Social Channels:** [Instagram (@jupiterelevators)](https://www.instagram.com/jupiterelevators?stkn=dGh2eTBvNmxwNnps) · [Facebook](https://www.facebook.com/share/1Q6pwuLyj8/)

---

## Application Architecture & Highlights

The platform is an enterprise-grade B2B digital catalog and Request For Quote (RFQ) procurement engine engineered with **Next.js 16 (App Router + Turbopack)**, **React 19**, **TypeScript**, and **Tailwind CSS**. Designed specifically for elevator maintenance contractors, civil developers, facility managers, and independent technicians across Saudi Arabia, it eliminates opaque pricing and slow quoting cycles with instant BOM compilation, automated email RFQ submission via Resend, and single-tap WhatsApp technical escalation.

```
                          ┌──────────────────────────────────────┐
                          │         Next.js App Router           │
                          │   Bilingual Engine (/en & /ar)       │
                          └──────────────────┬───────────────────┘
                                             │
             ┌───────────────────────────────┼───────────────────────────────┐
             │                               │                               │
             ▼                               ▼                               ▼
   ┌───────────────────┐           ┌───────────────────┐           ┌───────────────────┐
   │ Interactive Catalog│           │   RFQ BOM Engine  │           │ Kinetic UI Layer  │
   │ 110+ Verified SKUs│           │ Context + Storage │           │ Canvas Gear Chain │
   │ 12 Tech Categories│           │ Resend API + WA   │           │ Hoistway Spine    │
   └───────────────────┘           └───────────────────┘           └───────────────────┘
```

---

## Key Features

### 1. Native Bilingual Architecture & Bidirectional Mirroring
* **Default English (`/en`) & Native Arabic (`/ar`):** Sub-path routing with language autodetection and persistence.
* **Full RTL / LTR Typography System:** Powered by `next/font/google` utilizing **Cairo** for Arabic and **Inter** for English.
* **Layout Directionality:** Zero CSS flipping issues; layout seamlessly mirrors flex containers, absolute positioning, transforms, and data tables using Tailwind logical utility classes (`rtl:`, `ltr:`, `start-`, `end-`).

### 2. Interactive Hoistway Aesthetics & Engineering Canvas
* **Kinetic Hoistway Spine:** A dynamic, scroll-linked vertical elevator shaft visualization running along the page margin, complete with guide rails, floor landing tick marks, traveling car indicator, and counterweight kinetic feedback.
* **GSAP Canvas Mechanical Gear Train:** A high-precision mechanical gear chain animation illustrating high-speed traction kinematics.
* **Blueprint Textures:** Custom architectural card textures with industrial watermarks (`ELEVATOR SPECIFICATION`, `EN 81 COMPLIANT`).

### 3. Engineering Parts Catalog (110+ Commercial SKUs)
Pre-indexed and categorized according to international vertical transportation norms:
1. **Integrated Controllers & Inverters:** Monarch NICE3000+, STEP F5021, KONE KDL16L, Yaskawa L1000A drives.
2. **PMSM Gearless & Geared Traction Machines:** Torin Drive, Montanari Giulio, Alberto Sassi units.
3. **Guide Rails & Cold-Drawn Fishplates:** Marazzi, Savera T-profile rails (T70, T82, T89, T127).
4. **Automatic Door Operators & Car Mechanisms:** Fermator VVVF5/VVVF7, Wittur Hydra/Augusta, Selcom operators.
5. **Landing Door Systems & Mechanical Interlocks:** Complete door hanger brackets, pick-up rollers, locks.
6. **Operating Panels & Fixtures:** Hairline stainless steel COP (Car Operating Panels) and LOP (Landing Operating Panels) with Braille, TFT displays, and dot-matrix indicators.
7. **Guide Shoes & Roller Assemblies:** Swivel guide shoes, spring-loaded roller guides, and synthetic oil cups.
8. **Overspeed Governors & Safety Clamps:** Bi-directional instantaneous and progressive safety gear packages.
9. **Steel Wire Ropes & Traveling Cables:** Gustav Wolf & Drako traction ropes, flat traveling cables, PVC compensation chains.
10. **Safety Sensors & Infrared Curtains:** WECO 917A multi-beam infrared light curtains, CEDES optical sensors, overload weighing transducers.
11. **Hydraulic Power Packs & Control Valves:** Blain Hydraulics KV/EV series valves, Bucher power units.
12. **Shaft Hardware & Pit Equipment:** Heavy-duty polyurethane & oil buffers, limit switches, pit inspection stations.

### 4. Technical Line Card Modal
* Instant modal view for each SKU featuring full technical specifications, rated speed ($m/s$), rated capacity ($kg$), duty cycles, electrical input/output, dimensions, and OEM cross-brand compatibility.
* Single-click addition to RFQ Basket with live feedback.

### 5. Instant Command Palette (`Cmd+K` / `Ctrl+K`)
* Global modal search accessible from any page.
* Search by SKU, product title, manufacturer, or application in English or Arabic.
* Full keyboard navigation (Arrow Up/Down, Enter to view, Esc to close).

### 6. B2B RFQ (Request for Quote) Basket & BOM Dispatch
* Multi-item procurement list builder stored in `localStorage` through a dedicated React `CartContext`.
* Dynamic item notes (e.g., custom shaft length, voltage requirements, motor shaft diameter).
* **Dual Dispatch Engine:**
  * **Automated Email Delivery (Resend API):** Sends formatted procurement request with complete customer details and itemized SKU table to Jupiter sales engineers.
  * **WhatsApp Instant Escalation:** Generates a pre-formatted message for rapid on-call quotation with Dammam dispatch.

### 7. Field Technician "Photo Part Identification"
* One-tap camera tool tailored for on-site technicians encountering worn, unbranded, or legacy elevator parts.
* Connects directly to WhatsApp dispatch (`+966 56 261 4370`) with pre-filled technical identification prompts.

### 8. Multinational OEM Compatibility Matrix (`/[lang]/brands`)
* Cross-reference guides and replacement components for global manufacturers:
  * **Otis Elevator** (MCS, GeN2, Spec-60, OVF20)
  * **KONE** (MonoSpace, MiniSpace, V3F16, KDL series)
  * **Schindler** (Smart 001/002, 3300/5500, Bionic 5, Miconic)
  * **Mitsubishi Electric** (GPS, NexWay, SPVF, VFGL)
  * **TK Elevator / ThyssenKrupp** (CPI, TAC50, Synergy)
  * **Hyundai, Orona, Sigma, LG, Fuji, and Monarch systems**

### 9. Saudi PDPL & Compliance Engine
* Built-in Saudi Personal Data Protection Law (PDPL) consent manager ([`CookieConsent.tsx`](src/components/common/CookieConsent.tsx)) with granular accept/essential controls.
* Complete bilingual Privacy Policy (`/[lang]/privacy`) and Terms of Service (`/[lang]/terms`).
* Inline accessible form error validation (no intrusive native `alert()` dialogs) conforming to WCAG 2.1 AA standards.

### 10. Performance, SEO & PWA
* **100% Static Site Generation (SSG):** 138 static HTML pages prerendered at build time for instant TTFB.
* **Dynamic Open Graph Images:** Server-generated high-contrast branded cards via `next/og` (`/[lang]/opengraph-image.tsx`).
* **Search Engine Optimization:** Localized JSON-LD schemas (`LocalBusiness`, `WholesaleStore`), `sitemap.xml`, `robots.txt`, and canonical `hreflang` tags.
* **Full Favicon Suite:** Standard multi-resolution `.ico`, Apple touch icon (180×180), Android Chrome PWA icons (192×192 & 512×512), and `manifest.webmanifest`.
* **Static Asset Caching:** 1-year immutable caching configured in `next.config.ts` for all static media.

---

## Tech Stack & Libraries

| Technology | Role | Purpose |
| :--- | :--- | :--- |
| **Next.js 16 (App Router)** | Framework | SSG, routing, middleware, metadata, image optimization |
| **Turbopack** | Bundler | Next-generation ultra-fast Rust-based development & build engine |
| **React 19** | UI Library | Server & Client component rendering, hooks, transitions |
| **TypeScript 5** | Language | End-to-end static typing for catalog, dictionaries, and forms |
| **Tailwind CSS 4** | Styling | Utility-first responsive design with native RTL directionality |
| **GSAP (GreenSock)** | Animation | Canvas-based mechanical gear kinematics and hoistway spine |
| **Lucide React** | Icons | Crisp, accessible vector iconography |
| **Resend** | Email API | Serverless delivery of customer RFQs and contact inquiries |
| **Sharp** | Image Processor | High-efficiency lossless WebP/JPEG compression |

---

## Project Structure

```
jupiter-elevators/
├── public/
│   ├── favicon.ico                   # Multi-resolution ICO
│   ├── apple-touch-icon.png          # iOS home screen icon (180x180)
│   ├── icon-192.png / icon-512.png   # Android & PWA icons
│   ├── icon.svg                      # Scalable SVG brand mark
│   └── images/
│       ├── about/                    # Quality bench & facility imagery
│       ├── brands/                   # Skyscraper atrium hero backdrop
│       ├── catalog/                  # Hoistway perspective hero image
│       ├── parts/                    # High-res elevator component imagery
│       ├── services/                 # Modernization, emergency dispatch, AMC
│       └── saudi-distribution-map.webp
├── src/
│   ├── app/
│   │   ├── not-found.tsx             # Root 404 handler
│   │   ├── manifest.ts               # PWA Web Manifest definition
│   │   ├── robots.ts                 # Crawler directives
│   │   ├── sitemap.ts                # Multilingual sitemap generator
│   │   ├── api/
│   │   │   └── inquiry/route.ts      # Resend serverless email endpoint
│   │   └── [lang]/
│   │       ├── layout.tsx            # Global layout (Fonts, Header, Footer, Toast, Cart)
│   │       ├── not-found.tsx         # Localized 404 server component
│   │       ├── NotFoundClientView.tsx# Localized 404 client interactive view
│   │       ├── opengraph-image.tsx   # Dynamic OpenGraph image generator
│   │       ├── page.tsx              # Homepage (Hero, Stats, Categories, Map, CTA)
│   │       ├── about/page.tsx        # Company heritage, Dammam hub, quality bench
│   │       ├── brands/page.tsx       # Multinational elevator compatibility
│   │       ├── catalog/
│   │       │   ├── page.tsx          # Filterable parts directory
│   │       │   └── [slug]/page.tsx   # Individual SKU specification pages
│   │       ├── contact/page.tsx      # Contact coordinates & inquiry form
│   │       ├── faq/page.tsx          # Technical & commercial procurement FAQs
│   │       ├── privacy/page.tsx      # Saudi PDPL Privacy Policy
│   │       ├── rfq/page.tsx          # Bill of Materials checkout & submission
│   │       ├── services/page.tsx     # Engineering, modernization & emergency dispatch
│   │       └── terms/page.tsx        # Commercial B2B Terms & Conditions
│   ├── components/
│   │   ├── cart/                     # FloatingCartButton, MobileActionBar
│   │   ├── catalog/                  # CatalogClientView, LineCardModal
│   │   ├── common/                   # CookieConsent, SectionHeaders
│   │   ├── contact/                  # ContactForm with inline validation
│   │   ├── hero/                     # CanvasGearChain, HeroStats
│   │   ├── layout/                   # Header, Footer, SubpageHoistwaySpine
│   │   ├── rfq/                      # RfqClientView, CartItemRow
│   │   ├── search/                   # CommandPalette (Cmd+K modal)
│   │   └── ui/                       # Buttons, badges, toasts, card textures
│   ├── context/
│   │   └── CartContext.tsx           # Shopping basket state with localStorage sync
│   ├── data/
│   │   └── parts.ts                  # 110+ comprehensive elevator parts database
│   ├── dictionaries/
│   │   ├── en.json                   # English localization strings
│   │   └── ar.json                   # Arabic localization strings
│   ├── lib/
│   │   ├── catalog.ts                # Catalog query utilities & search filters
│   │   ├── i18n.ts                   # Internationalization config & direction helpers
│   │   └── seo.ts                    # Dynamic metadata & JSON-LD generators
│   └── types/
│       ├── catalog.ts                # TypeScript interfaces for parts & categories
│       └── rfq.ts                    # RFQ, CartItem, and Inquiry types
├── .env.example                      # Sample environment variables
├── next.config.ts                    # Next.js configuration & Cache-Control headers
├── package.json                      # Project dependencies & scripts
└── tsconfig.json                     # TypeScript strict configuration
```

---

## Getting Started

### Prerequisites
* **Node.js:** v18.18.0 or higher (Tested on Node.js v20 and v22 LTS)
* **Package Manager:** `npm`, `pnpm`, or `yarn`

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/UmerRizwan03/jupiter-elevators.git
   cd jupiter-elevators
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   Open `.env.local` and define your credentials:
   ```env
   # Resend API Key for sending RFQ and contact inquiry emails
   RESEND_API_KEY=re_your_api_key_here

   # Email sender address (must be a verified domain in Resend)
   RFQ_FROM_EMAIL=procurement@jupiterelevators.com

   # Primary recipient for inbound sales & RFQ quotes
   RFQ_TO_EMAIL=sales@jupiterelevators.com

   # Safety CC backup inbox
   RFQ_CC_EMAIL=elevatorsjupiter@gmail.com

   # Executive escalation inbox (routed for critical tenders & emergencies)
   RFQ_EXECUTIVE_EMAIL=mahaboob@jupiterelevators.com

   # Optional Google Analytics 4 Measurement ID
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

4. **Launch the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts Next.js development server with Turbopack on port 3000 |
| `npm run build` | Compiles application, executes TypeScript checks, and builds 138 static pages |
| `npm run start` | Serves the production build locally |
| `npm run lint` | Runs ESLint across all TypeScript and React files |
| `npx tsc --noEmit` | Validates TypeScript types across the entire codebase |

---

## Production Deployment

### Recommended: Vercel (Zero-Config)
The application is pre-configured for automated continuous deployment on [Vercel](https://vercel.com):

1. Link your GitHub repository to Vercel.
2. Ensure the Framework Preset is set to **Next.js**.
3. Under **Settings → Environment Variables**, add:
   * `RESEND_API_KEY`
   * `RFQ_FROM_EMAIL`
   * `RFQ_TO_EMAIL`
   * `NEXT_PUBLIC_GA_ID` (optional)
4. Trigger deployment. All 138 static routes, OpenGraph images, and sitemaps will build automatically.

### Self-Hosted Node.js / Docker
To host on a VPS or containerized cloud server:

```bash
# 1. Build the production application
npm run build

# 2. Run the standalone Node.js production server
NODE_ENV=production npm run start -p 8080
```

---

## Compliance & Standards Reference

All products distributed by Jupiter Elevators conform to international vertical transportation and Saudi civil defense safety codes:
* **EN 81-20 / EN 81-50:** Safety rules for the construction and installation of passenger and goods passenger lifts.
* **SASO (Saudi Standards, Metrology and Quality Organization):** Technical regulations for elevators used in residential and commercial buildings.
* **ISO 9001 / CE:** Quality management certifications from international manufacturing facilities.
* **Saudi PDPL:** Kingdom of Saudi Arabia Personal Data Protection Law implemented across all customer inquiry handling.

---

## Commercial Contact & Support

For immediate quotations, emergency parts dispatch, or distributorship inquiries:

* **Headquarters:** Space Industrial Cont. Company / Jupiter Elevators
* **Location:** Dammam Industrial Area, Eastern Province, Kingdom of Saudi Arabia
* **Phone / Hotline:** `+966 56 261 4370`
* **Direct WhatsApp:** [Chat with a Sales Engineer](https://wa.me/966562614370)
* **Sales & Quotations:** `sales@jupiterelevators.com`
* **General & Corporate:** `info@jupiterelevators.com`
* **Official Website:** [https://jupiterelevators.com](https://jupiterelevators.com)

---

## Copyright & Ownership

Copyright © 2026 **Space Industrial Cont. Company** / **Jupiter Elevators**. All rights reserved.  
All brand names, trademarks, and registered logos (including Otis, KONE, Schindler, Mitsubishi, ThyssenKrupp, Wittur, Fermator, Monarch, and STEP) are the property of their respective owners and are referenced solely for cross-brand replacement compatibility.
