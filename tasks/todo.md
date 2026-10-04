# Implementation Tasks: Jupiter Elevators

## Phase 1: Foundation, Bilingual Engine & Layout (`core-i18n-layout`)

- [x] Task 1.1: Core i18n Dictionary & Config Setup
  - Acceptance: Dictionaries created for `ar` and `en` covering navigation, common CTAs, trust badges, and forms; helper functions `getDictionary(locale)` and locale type definitions created.
  - Verify: TypeScript compiles without errors.
  - Files: `src/lib/i18n.ts`, `src/dictionaries/en.json`, `src/dictionaries/ar.json`

- [x] Task 1.2: Next.js 16 Locale Routing & `proxy.ts`
  - Acceptance: `src/proxy.ts` intercepts requests, detects or redirects root `/` to `/ar` (default) while allowing `/en`; static assets and `_next` bypass proxy.
  - Verify: Running `npm run build` or tests recognizes `proxy.ts`.
  - Files: `src/proxy.ts`, `src/app/page.tsx`

- [x] Task 1.3: Root Layout & Typography Setup
  - Acceptance: `src/app/[lang]/layout.tsx` configures Cairo and Inter fonts, sets dynamic `dir="rtl"` for Arabic and `dir="ltr"` for English, includes global styles with clean light-theme variables.
  - Verify: Page loads with correct HTML `lang` and `dir` attributes.
  - Files: `src/app/[lang]/layout.tsx`, `src/app/globals.css`, `tailwind.config.ts`

- [x] Task 1.4: Header & Footer with Institutional Credentials
  - Acceptance: Header displays logo, bilingual navigation links, language toggle (AR/EN), phone/WhatsApp button, and floating RFQ badge; Footer displays Space Industrial Cont. Co. name, CR (`2050078848`), VAT (`311250980100003`), Dammam registered address, and operating hours.
  - Verify: Header and footer render cleanly in both LTR and RTL across desktop and mobile.
  - Files: `src/components/layout/Header.tsx`, `src/components/layout/Footer.tsx`, `src/components/layout/LanguageSwitcher.tsx`

### Checkpoint: Foundation
- [x] Next.js 16 builds clean (`npm run build`).
- [x] Sub-path routing works for `/ar` and `/en` with dynamic RTL/LTR flipping.
- [x] Header and Footer render with proper branding, fonts, and legal badges.

---

## Phase 2: Catalog Data Store & Filtering Helpers (`catalog-data`)

- [x] Task 2.1: Catalog TypeScript Schema & Category Types
  - Acceptance: Data model defined for `ElevatorPart`, category, subcategory, brand compatibility, and stock status according to `docs/products-and-components.md`.
  - Verify: Type definitions are exported and clean.
  - Files: `src/types/catalog.ts`

- [x] Task 2.2: 12-Category Elevator Parts Dataset
  - Acceptance: Realistic, comprehensive dataset created covering all 12 categories (Controllers, Traction Machines, Rails, Door Operators, Landing Doors, Push Buttons, Guide Shoes, Safety Gears, Wire Ropes, Sensors, Hydraulic, Shaft Equipment) with authentic SKUs, bilingual names, specs, and brand compatibility (Monarch, Step, Otis, Schindler, Kone, etc.).
  - Verify: Dataset adheres to `ElevatorPart` schema and imports without type errors.
  - Files: `src/data/parts.ts`, `src/data/categories.ts`

- [x] Task 2.3: Search & Faceted Filter Utilities
  - Acceptance: Pure functions to search parts by keyword (name, SKU, subcategory), filter by category ID, filter by brand, and filter by in-stock status.
  - Verify: Helper functions return expected filtered results across both English and Arabic queries.
  - Files: `src/lib/catalog.ts`

---

## Phase 3: RFQ Quote Basket State (`rfq-cart-state`)

- [x] Task 3.1: RFQ Cart Context & LocalStorage Persistence
  - Acceptance: React Context (`CartContext`) providing `addItem`, `removeItem`, `updateQuantity`, `clearCart`, `items`, and `totalItemsCount`, persisted in browser `localStorage`.
  - Verify: Adding parts updates count badge and survives page reloads.
  - Files: `src/context/CartContext.tsx`

- [x] Task 3.2: Floating RFQ Badge & Mobile Sticky Bar
  - Acceptance: Persistent floating button on desktop and sticky bottom bar on mobile showing live cart item count and instant WhatsApp inquiry button.
  - Verify: Cart badge dynamically updates and provides 1-tap navigation to `/[lang]/rfq`.
  - Files: `src/components/cart/FloatingCartButton.tsx`, `src/components/cart/MobileActionBar.tsx`

### Checkpoint: Data & State
- [x] Complete 12-category catalog dataset available.
- [x] Cart state persists across route changes and reloads.
- [x] Filter utilities return accurate slices of data.

---

## Phase 4: UI Components & Home Page (`home-and-ui`)

- [x] Task 4.1: Industrial Light Hero Section & Quick Part Finder Bar
  - Acceptance: Hero banner featuring authoritative headline, component render visual, and a prominent horizontal quick search bar (SKU/keyword, Category dropdown, Brand dropdown) that routes directly to `/catalog` with query params.
  - Verify: Quick finder searches and navigates with correct URL query parameters.
  - Files: `src/components/home/Hero.tsx`, `src/components/home/QuickPartFinder.tsx`

- [x] Task 4.2: Modular Category Grid (Bento Grid)
  - Acceptance: Bento-style category showcase highlighting top categories with clean light card borders, part counts, Arabic/English titles, and click-through to filtered catalog.
  - Verify: Responsive grid renders seamlessly on mobile, tablet, and desktop.
  - Files: `src/components/home/CategoryBentoGrid.tsx`

- [x] Task 4.3: "Snap & Send" Technician Photo Tool Banner
  - Acceptance: Visual on-site technician section explaining the 3-step breakdown workflow (Take photo -> Send WhatsApp -> Get matched part) with direct WhatsApp link pre-filled with photo prompt.
  - Verify: Clicking trigger opens WhatsApp with localized Arabic/English prompt for image inquiry.
  - Files: `src/components/home/SnapAndSendBanner.tsx`

- [x] Task 4.4: Authority, Trust & Services Sections
  - Acceptance: Stat counters (30+ years engineering, 33+ years logistics, 100% factory direct), Space Industrial Cont. Co. trust card, and 4 core service modules (Sourcing, AMC, Part Matching, Emergency Breakdown).
  - Verify: Numbers and credentials clearly displayed in light theme cards.
  - Files: `src/components/home/TrustStats.tsx`, `src/components/home/ServicesOverview.tsx`, `src/app/[lang]/page.tsx`

---

## Phase 5: Catalog & Part Detail Views (`catalog-pages`)

- [x] Task 5.1: Catalog Browse & Faceted Filter Page (`/[lang]/catalog`)
  - Acceptance: Full catalog page with responsive sidebar (desktop) and slide-out sheet (mobile), search input, category filters, brand filters, in-stock toggle, and part count display.
  - Verify: Real-time filtering updates product grid without full page reloads.
  - Files: `src/app/[lang]/catalog/page.tsx`, `src/components/catalog/CatalogFilters.tsx`, `src/components/catalog/PartCard.tsx`

- [x] Task 5.2: Part Detail Page (`/[lang]/catalog/[slug]`)
  - Acceptance: Detailed part view featuring breadcrumbs, high-res image visual, SKU with copy button, stock status, origin (India/China), technical specifications table, brand compatibility list, quantity selector with "Add to Quote", and 1-click WhatsApp inquiry.
  - Verify: Page statically generates for catalog parts and specs render cleanly.
  - Files: `src/app/[lang]/catalog/[slug]/page.tsx`, `src/components/catalog/PartSpecsTable.tsx`

---

## Phase 6: B2B RFQ Quote Submission Funnel (`rfq-submission`)

- [x] Task 6.1: RFQ Basket Review & Itemized List
  - Acceptance: Dedicated `/[lang]/rfq` page displaying itemized table with thumbnails, SKU, title, quantity steppers, unit notes, item removal, and empty state with "Browse Catalog" CTA.
  - Verify: Quantity adjustments update cart context and totals instantly.
  - Files: `src/app/[lang]/rfq/page.tsx`, `src/components/rfq/RfqItemList.tsx`

- [x] Task 6.2: Contractor Form & 1-Click WhatsApp BOM Generator
  - Acceptance: Procurement form collecting Company Name, Contact Person, Phone, Email, Delivery City in KSA, and optional Project Ref; "Send via WhatsApp" button encodes a clean, professional Bill of Materials (BOM) to `+966 562614370`.
  - Verify: Generated WhatsApp URL contains formatted Arabic/English BOM with contractor details and items.
  - Files: `src/components/rfq/RfqForm.tsx`, `src/lib/whatsapp.ts`

- [x] Task 6.3: Quotation Summary & Confirmation State
  - Acceptance: Client-side submission confirmation showing generated RFQ reference code (e.g., `JP-RFQ-2026-XXXX`), summary breakdown, and option to print/save quotation request.
  - Verify: Submitting displays confirmation card and clears cart appropriately.
  - Files: `src/components/rfq/RfqConfirmation.tsx`

### Checkpoint: Full Commercial Flow
- [x] Adding parts from catalog ➔ viewing RFQ basket ➔ filling contractor form ➔ generating WhatsApp BOM works end-to-end.
- [x] Field technician "Snap & Send" opens WhatsApp directly.

---

## Phase 7: Supporting Pages, SEO & Final Polish (`about-contact-seo`)

- [x] Task 7.1: About Us / Heritage Page (`/[lang]/about`)
  - Acceptance: Company profile of Space Industrial Cont. Co., leadership by Mahaboob V M, 30+ years engineering legacy, mission, vision, and core values.
  - Verify: Clean responsive reading experience in both Arabic and English.
  - Files: `src/app/[lang]/about/page.tsx`

- [x] Task 7.2: Services Page (`/[lang]/services`)
  - Acceptance: Detailed breakdown of the 6 core services (Spare Parts Sourcing, Part Identification, Preventive/Corrective Maintenance, AMC Support, Emergency Breakdown, Modernization Consulting).
  - Verify: Service cards with clear B2B inquiry actions.
  - Files: `src/app/[lang]/services/page.tsx`

- [x] Task 7.3: Contact & Emergency Breakdown Page (`/[lang]/contact`)
  - Acceptance: Dammam HQ address (Al-Badariya District, P.O. Box 60113), business hours (Sat-Thu 8am-5pm), emergency on-call notice, direct contact cards (Phone, WhatsApp, Email), interactive inquiry form, and nationwide coverage indicators.
  - Verify: Contact page renders with working mailto, tel, and WhatsApp links.
  - Files: `src/app/[lang]/contact/page.tsx`, `src/components/contact/ContactForm.tsx`

- [x] Task 7.4: SEO Metadata & LocalBusiness JSON-LD
  - Acceptance: OpenGraph tags, bilingual titles/descriptions, and JSON-LD structured data for Saudi Arabia LocalBusiness / Industrial Supplier with registered Dammam address, CR, VAT, and phone numbers.
  - Verify: Valid JSON-LD structure in document head.
  - Files: `src/app/[lang]/layout.tsx`, `src/lib/seo.ts`

### Final Verification Gate
- [x] `npm run build` succeeds with zero TypeScript or lint errors.
- [x] Sub-path navigation (`/ar` and `/en`) works flawlessly with RTL/LTR transitions.
- [x] Catalog search, filtering, and detail views function properly.
- [x] RFQ basket and WhatsApp inquiry transmission verified.
- [x] Light-theme UI is responsive, accessible, and polished.
