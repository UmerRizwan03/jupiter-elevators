# Implementation Plan: Jupiter Elevators Bilingual B2B Web Application

## Overview
Develop a modern, high-performance, bilingual (English & Arabic with full RTL support) B2B web application for **Jupiter Elevators** (legal entity: Space Industrial Cont. Company). The platform showcases 12 comprehensive categories of elevator spare parts and components sourced from India and China, provides an interactive B2B Request for Quote (RFQ) basket without public retail prices, integrates seamless 1-click WhatsApp parts lookup and photo identification for field technicians, and emphasizes the company's 30+ years of lift industry background and official Saudi credentials (CR: 2050078848, VAT: 311250980100003).

---

## Architecture Decisions
1. **Next.js (App Router) + TypeScript + Tailwind CSS:**
   * *Rationale:* Lightning-fast hybrid static/server rendering for instant load times and peak Saudi SEO performance. Built-in API routes handle server-side RFQ emailing and security without requiring a standalone backend service.
2. **First-Class Bilingual & Native RTL Engine:**
   * *Rationale:* Fully supports `/en` and `/ar` routes with automated HTML `dir="rtl"` / `dir="ltr"` attribute switching, paired with Cairo/IBM Plex Arabic and Inter typography.
3. **B2B RFQ Cart with Persistent State (Zustand / LocalStorage):**
   * *Rationale:* Industrial buyers and contractors don't purchase spare parts with standard consumer credit card checkouts. They build lists of parts, specify quantities/SKUs, and submit an RFQ to receive custom quotes, volume discounts, and freight lead-time confirmation.
4. **Instant WhatsApp Integration with Smart Payload Generator:**
   * *Rationale:* WhatsApp is the undisputed communication channel for Saudi contractors and field technicians. Every product and the quote cart can generate a formatted, readable WhatsApp message directly to `+966 562614370`.
5. **Static Seed Data with Structured Extensibility:**
   * *Rationale:* The 12 primary elevator categories and seed spare parts catalog will reside in structured TypeScript models and JSON files, allowing immediate zero-latency querying, instant search, and effortless future database migration.

---

## Task List Summary by Phase

### Phase 1: Foundations & Architecture Setup
* **Task 1:** Initialize Next.js project with TypeScript, Tailwind CSS, Lucide icons, and bilingual i18n routing structure.
* **Task 2:** Configure design system tokens, typography (Inter + Cairo), and RTL/LTR layout wrapper.
* **Task 3:** Implement mock dataset and TypeScript interfaces for the 12 spare parts categories, sample products, and corporate metadata.

### Checkpoint 1: Foundation
* Application compiles cleanly, bilingual routing switches between English (LTR) and Arabic (RTL), and brand styling is active.

### Phase 2: Core Components & Navigation
* **Task 4:** Build global bilingual Header, Navigation Bar (with language switcher, category mega-menu, and live RFQ cart badge), and Trust Footer (with CR/VAT and Dammam registered address).
* **Task 5:** Implement Home Page Hero, Quick Search, Category Showcase, Core Value Propositions, and "Photo Part Identification" Emergency Callout.
* **Task 6:** Build About Us & Corporate Heritage Page (highlighting 30+ years lift experience, 33+ years logistics, mission, values, and China/India partnerships).
* **Task 7:** Build Services Page (Component Sourcing, Technical Support, Maintenance/AMC Support, Breakdown Assistance).

### Checkpoint 2: Corporate & Content Presence
* Navigation, static content pages, and responsiveness are verified across mobile and desktop in both English and Arabic.

### Phase 3: Catalog, Search, and RFQ Engine
* **Task 8:** Implement Product Catalog Page with category sidebar, keyword search, brand compatibility filters, and responsive product grid.
* **Task 9:** Build Product Detail Page / Quick-View Modal featuring technical specs, SKUs, "Add to Quote", and "Inquire on WhatsApp".
* **Task 10:** Develop the interactive RFQ Basket (state management, quantity updates, order summary, contractor contact form).
* **Task 11:** Implement RFQ Submission Handler & WhatsApp Payload Generator (pre-populating parts list into WhatsApp chat and email notifications).

### Checkpoint 3: Complete User Journey
* End-to-end B2B buyer flow tested: Find part -> Add to Quote -> Fill details -> Transmit RFQ via WhatsApp and web form.

### Phase 4: Contact, Polish, SEO & Verification
* **Task 12:** Build Contact Page with registered Dammam address, regional coverage (Riyadh, Dammam, Jeddah), business hours, interactive map, and inquiry form.
* **Task 13:** Configure Saudi Local Business JSON-LD Schema, OpenGraph meta tags, and bilingual SEO tags.
* **Task 14:** Full accessibility, responsive mobile auditing, and build verification.

### Checkpoint 4: Project Sign-Off
* Ready for deployment with zero build errors and verified mobile performance.

---

## Risks and Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Arabic typography rendering or RTL layout alignment issues | High | Use Tailwind CSS logical properties (`ms-`, `me-`, `ps-`, `pe-`, `start-`, `end-`) and test with Cairo/IBM Plex Arabic fonts from Day 1. |
| Incomplete product images or datasheets during development | Medium | Create crisp, professional technical diagram SVG placeholders and structured spec tables so the catalog looks production-ready immediately. |
| Confusion between Dammam registered office and Riyadh contact operations | Low | Explicitly present the registered address as Dammam (P.O. Box 60113, Dammam-31545) while highlighting Kingdom-wide delivery coverage (Riyadh, Dammam, Jeddah). |
| Complex RFQ form causing drop-offs | Medium | Keep the RFQ submission form streamlined (Company Name, Contact Person, Phone/WhatsApp, Delivery City) and provide an instant 1-click WhatsApp alternative. |

---

## Open Questions for Final Alignment
1. **Initial Seed Products Quantity:** We have all 12 categories and subcomponents; should we populate 3–5 representative parts per category (approx. 40–50 items) for launch?
2. **RFQ Notification Email Destination:** Should the web form submit directly to `sales@jupiterelevators.com` and `mahaboob@jupiterelevators.com`?
3. **Logo / Assets:** Does the client already have an existing high-res logo file (SVG/PNG), or should we design a clean, professional vector logo for "Jupiter Elevators"?
