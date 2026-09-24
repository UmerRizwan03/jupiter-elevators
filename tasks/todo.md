# Task List: Jupiter Elevators Bilingual Web Platform

---

## Phase 1: Foundation & Project Scaffolding

### Task 1: Initialize Next.js Project with TypeScript and Tailwind CSS
**Description:** Set up the core Next.js App Router application with TypeScript, Tailwind CSS, Lucide React icons, and project directory structure. Configure ESLint and standard path aliases.

**Acceptance criteria:**
- [x] Next.js app runs cleanly on local dev server.
- [x] Tailwind CSS is configured and styles apply correctly.
- [x] Directory structure is organized (`src/app`, `src/components`, `src/data`, `src/lib`, `src/types`).

**Verification:**
- [x] Build succeeds: `npm run build`
- [x] Dev server starts: `npm run dev`

**Dependencies:** None

**Files likely touched:**
- `package.json`
- `tailwind.config.ts`
- `tsconfig.json`
- `src/app/layout.tsx`
- `src/app/page.tsx`

**Estimated scope:** Medium (3-5 files)

---

### Task 2: Implement Bilingual i18n & RTL Layout Infrastructure
**Description:** Configure dual-language routing (`/en` and `/ar`) with automated document direction (`dir="ltr"` and `dir="rtl"`). Integrate English (Inter) and Arabic (Cairo / IBM Plex Sans Arabic) typography, and create a shared localization context/provider with translation dictionaries.

**Acceptance criteria:**
- [x] Switching between `/en` and `/ar` updates the language state and html `dir` attribute smoothly.
- [x] Layout mirroring works reliably using Tailwind logical classes (`start-`, `end-`, `ms-`, `me-`).
- [x] Font rendering in Arabic is crisp, modern, and aligned with Saudi commercial standards.

**Verification:**
- [x] Manual check: Visit `/en` and verify LTR layout; visit `/ar` and verify RTL layout.
- [x] Build succeeds without hydration or layout errors.

**Dependencies:** Task 1

**Files likely touched:**
- `src/app/layout.tsx`
- `src/lib/i18n.ts`
- `src/context/LanguageContext.tsx`
- `src/data/translations/en.ts`
- `src/data/translations/ar.ts`

**Estimated scope:** Medium (4-5 files)

---

### Task 3: Define Data Schema & Seed Catalog Dataset
**Description:** Create strongly-typed TypeScript interfaces and a comprehensive seed data file containing all 12 elevator spare parts categories, their subcomponents, company profile information, and realistic seed products with specifications.

**Acceptance criteria:**
- [x] Type definitions cover `ElevatorCategory`, `ElevatorPart`, `CompanyInfo`, and `RFQItem`.
- [x] All 12 categories from the client brief are populated with bilingual names and descriptions.
- [x] Sample products are seeded with realistic part numbers, specifications, brand compatibility, and origin tags.

**Verification:**
- [x] TypeScript compilation succeeds with zero type errors (`npx tsc --noEmit`).

**Dependencies:** Task 1

**Files likely touched:**
- `src/types/catalog.ts`
- `src/types/company.ts`
- `src/data/categories.ts`
- `src/data/products.ts`
- `src/data/company.ts`

**Estimated scope:** Medium (4-5 files)

---

### Checkpoint 1: Foundation
- [x] Application builds without errors (`npm run build`).
- [x] Bilingual routing works for both `/en` and `/ar`.
- [x] Catalog data types and seed models are verified.

---

## Phase 2: Navigation & Corporate Pages

### Task 4: Global Bilingual Header and Trust-Building Footer
**Description:** Build the responsive top navigation bar, quick contact bar, language switcher, mobile drawer menu, and corporate footer displaying official Saudi CR (2050078848), VAT number, Dammam address, and working hours.

**Acceptance criteria:**
- [x] Desktop navigation features Category dropdown, Quick Search trigger, and RFQ Quote Basket badge.
- [x] Mobile navigation opens a smooth drawer menu optimized for thumb navigation on site.
- [x] Footer clearly presents registered Dammam details, operating hours (Sat-Thu 8 AM - 5 PM), WhatsApp link, and quick links.

**Verification:**
- [x] Manual check: Header and footer render properly on mobile and desktop in both EN and AR.
- [x] Click on language switcher toggles between English and Arabic seamlessly.

**Dependencies:** Task 2, Task 3

**Files likely touched:**
- `src/components/layout/Header.tsx`
- `src/components/layout/Footer.tsx`
- `src/components/layout/LanguageSwitcher.tsx`
- `src/components/layout/MobileMenu.tsx`

**Estimated scope:** Medium (4 files)

---

### Task 5: Home Page Implementation
**Description:** Construct a high-impact B2B homepage with a hero banner, quick category navigation grid, "Emergency Breakdown / Photo Part Identification" card, value proposition counters (30+ years experience, direct India/China supply), and quick RFQ prompt.

**Acceptance criteria:**
- [x] Hero section clearly articulates value proposition in both EN and AR.
- [x] Category grid presents all 12 elevator spare parts categories with intuitive iconography.
- [x] "Photo Part Identification" CTA connects directly to WhatsApp with pre-filled text.
- [x] Fast search bar immediately routes to catalog with matching query.

**Verification:**
- [x] Visual inspection across desktop (1440px) and mobile (375px).
- [x] WhatsApp CTA launches correct URL scheme with phone `+966562614370`.

**Dependencies:** Task 4

**Files likely touched:**
- `src/app/page.tsx`
- `src/components/home/Hero.tsx`
- `src/components/home/CategoryGrid.tsx`
- `src/components/home/PhotoIdentificationBanner.tsx`
- `src/components/home/TrustHighlights.tsx`

**Estimated scope:** Medium (5 files)

---

### Task 6: About Us & Corporate Heritage Page
**Description:** Develop the About Us page detailing the founding story, leadership heritage (30+ years elevator engineering + 33+ years international import logistics), mission, vision, core values, and strategic manufacturing alliances in India and China.

**Acceptance criteria:**
- [x] Narrative accurately reflects the founder's experience and company purpose.
- [x] Core values (Quality, Reliability, Safety, etc.) are rendered in attractive cards.
- [x] Partnership highlights with China and India are professionally presented.

**Verification:**
- [x] Manual check: Page loads with zero console warnings and clean responsive typography.

**Dependencies:** Task 4

**Files likely touched:**
- `src/app/about/page.tsx`

**Estimated scope:** Small (3 files)

---

### Task 7: Services & Technical Capabilities Page
**Description:** Build the Services page outlining Component Sourcing, Technical Support & Identification, AMC & Maintenance Assistance, and Emergency Breakdown Service with dedicated inquiry buttons.

**Acceptance criteria:**
- [x] All 6 core services are clearly explained with industrial scope of work.
- [x] Direct inquiry buttons trigger focused WhatsApp or contact modal with service pre-selected.

**Verification:**
- [x] Manual check: All action buttons link to inquiry workflows.

**Dependencies:** Task 4

**Files likely touched:**
- `src/app/services/page.tsx`

**Estimated scope:** Small (2-3 files)

---

### Checkpoint 2: Corporate & Content Presence
- [x] All general pages (Home, About, Services) are complete in English and Arabic.
- [x] Responsive navigation and mobile drawer operate smoothly.
- [x] Build succeeds with zero errors.

---

## Phase 3: Parts Catalog, Search & Interactive RFQ Engine

### Task 8: Interactive Parts Catalog & Filtering System
**Description:** Build the catalog page with category selection sidebar/chips, real-time keyword search, brand compatibility filters (Otis, Schindler, Kone, etc.), and responsive product cards with "Add to Quote" actions.

**Acceptance criteria:**
- [x] Users can filter by any of the 12 primary categories.
- [x] Live search filters by part name, SKU, or subcategory instantly.
- [x] Product cards display high-res placeholder/image, category tag, SKU, and "Add to Quote" button.

**Verification:**
- [x] Filter by category changes results accurately.
- [x] Search input matches bilingual titles.

**Dependencies:** Task 3, Task 4

**Files likely touched:**
- `src/app/catalog/page.tsx`
- `src/components/catalog/ProductDetailModal.tsx`

**Estimated scope:** Medium (4-5 files)

---

### Task 9: Product Detail View & Technical Specs Modal
**Description:** Implement detailed product view displaying full technical specifications, origin (India/China), brand compatibility list, high-resolution imagery, and dual action buttons: "Add to RFQ List" and "Direct WhatsApp Inquiry".

**Acceptance criteria:**
- [x] Modal / Page displays complete technical attribute tables.
- [x] "Direct WhatsApp Inquiry" encodes the specific SKU and part title into the message link.
- [x] Quantity selector allows bulk part counts before adding to quote.

**Verification:**
- [x] Clicking WhatsApp inquiry opens WhatsApp with formatted message: *"Hello Jupiter Elevators, I would like to inquire about [Part Name] (SKU: [SKU])..."*

**Dependencies:** Task 8

**Files likely touched:**
- `src/components/catalog/ProductDetailModal.tsx`

**Estimated scope:** Small to Medium (3 files)

---

### Task 10: RFQ Quote Basket State Management
**Description:** Build persistent client-side quote cart using Zustand or React Context with LocalStorage persistence. Allow adding/removing parts, incrementing quantities, and clearing the cart with a floating badge indicator.

**Acceptance criteria:**
- [x] Items added from catalog persist across page refreshes and language switches.
- [x] Cart drawer / indicator displays live count of unique items and total quantities.
- [x] Quantity can be incremented, decremented, or removed directly.

**Verification:**
- [x] Add item -> reload browser -> item remains in cart.
- [x] Language toggle does not reset the cart.

**Dependencies:** Task 8

**Files likely touched:**
- `src/context/CartContext.tsx`

**Estimated scope:** Small to Medium (3 files)

---

### Task 11: RFQ Submission Flow & WhatsApp RFQ Generator
**Description:** Develop the dedicated `/quote` page where clients review their bill of materials and submit contractor details (Company, Name, Phone, Email, Delivery City). Provide two submission channels: direct web form submission and 1-click WhatsApp transmission with full order formatting.

**Acceptance criteria:**
- [x] Form validates required fields (Name, Phone, City).
- [x] WhatsApp submission formats the list cleanly with bullet points, quantities, and client contact info.
- [x] Web form posts to Next.js API route (`/api/rfq`) for email logging/forwarding.
- [x] Clear success confirmation message displayed upon submission.

**Verification:**
- [x] Submit test quotation via WhatsApp button and verify generated text format.
- [x] Submit test quotation via web form and verify 200 OK API response.

**Dependencies:** Task 10

**Files likely touched:**
- `src/app/quote/page.tsx`
- `src/app/api/rfq/route.ts`
- `src/lib/whatsapp.ts`

**Estimated scope:** Medium (4 files)

---

### Checkpoint 3: Complete Buyer Journey
- [x] Complete flow verified: Browse catalog -> Filter category -> Add 2 parts to RFQ -> Go to Quote page -> Submit RFQ via WhatsApp and web form.
- [x] All features operate identically in both English and Arabic.

---

## Phase 4: Contact, Polish & Production Readiness

### Task 12: Contact Page & Multi-Channel Touchpoints
**Description:** Build the Contact page featuring the Dammam registered address (P.O. Box-60113, Dammam-31545, Al-Badariya District), working hours (Sat-Thu 8 AM - 5 PM), direct email addresses (`sales@`, `info@`, `mahaboob@`), interactive Google Maps embed, and quick message form.

**Acceptance criteria:**
- [x] Clear presentation of Dammam office coordinates and regional dispatch coverage (Riyadh, Dammam, Jeddah).
- [x] Working hours and Friday closing status clearly highlighted.
- [x] Direct click-to-call and click-to-email links function properly.

**Verification:**
- [x] Manual check of links and contact form responsiveness.

**Dependencies:** Task 4

**Files likely touched:**
- `src/app/contact/page.tsx`

**Estimated scope:** Small (3 files)

---

### Task 13: Local SEO, JSON-LD Schema & Saudi Regional Metadata
**Description:** Implement comprehensive SEO metadata, bilingual OpenGraph tags, Twitter cards, and structured JSON-LD schemas (`LocalBusiness`, `Store`, `PostalAddress` in Dammam, CR and VAT attributes).

**Acceptance criteria:**
- [x] JSON-LD schema renders valid structured data for Google rich snippets.
- [x] Dynamic canonical and `hreflang` tags set up for `/en` and `/ar`.
- [x] OpenGraph images and social sharing previews verified.

**Verification:**
- [x] Validate schema syntax using Google Rich Results Test format.
- [x] View page source to confirm `hreflang` and meta tags.

**Dependencies:** Task 5, Task 8, Task 12

**Files likely touched:**
- `src/components/seo/JsonLd.tsx`
- `src/app/sitemap.ts`
- `src/app/robots.ts`
- `src/app/layout.tsx`

**Estimated scope:** Small to Medium (3-4 files)

---

### Task 14: Responsive UI Audit, Performance Optimization & Final Build
**Description:** Perform complete responsive testing across mobile, tablet, and desktop viewports, optimize image assets and icons, verify RTL alignment across all components, and execute final production build.

**Acceptance criteria:**
- [x] Zero layout shift or horizontal overflow on mobile screens.
- [x] `npm run build` generates optimized static pages with zero warnings/errors.
- [x] Lighthouse score target: Performance > 90, Accessibility > 95, SEO > 95.

**Verification:**
- [x] Run `npm run build`.
- [x] Run local production preview `npm run start` and test navigation end-to-end.

**Dependencies:** All previous tasks

**Files likely touched:**
- Global project audit

**Estimated scope:** Medium

---

### Checkpoint 4: Final Project Sign-Off
- [x] Production build succeeds without errors.
- [x] Dual-language (EN / AR) and RTL support verified across all 14 tasks.
- [x] B2B RFQ engine and WhatsApp integration tested and verified.
