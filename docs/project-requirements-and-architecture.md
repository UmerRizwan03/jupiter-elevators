# Project Architecture & Technical Specification

## 1. Executive Summary & Core Objectives
* **Project Name:** Jupiter Elevators (جوبيتر للمصاعد)
* **Client / Legal Entity:** Space Industrial Cont. Company (CR: 2050078848 | VAT: 311250980100003)
* **Goal:** Deliver a modern, high-performance, bilingual (English & Arabic) B2B web application that establishes Jupiter Elevators as the premier elevator spare parts and component distributor across the Kingdom of Saudi Arabia.
* **Core Conversion Funnel:** 
  1. Discovery & Search: Intuitive part and brand lookup.
  2. RFQ Cart: "Add to Quote" without direct retail checkout prices.
  3. One-Click WhatsApp Inquiries: Instant message generation with part SKU, name, and quantity.
  4. "Snap & Send" Part Photo Identification: Direct breakdown/emergency part assistance.

---

## 2. Technology Stack Selection

### Frontend & Core Framework
* **Framework:** **Next.js (App Router)** with **TypeScript**
  * *Why Next.js App Router?*
    * **Lightning-Fast Performance:** Hybrid Static Site Generation (SSG) for all catalog pages guarantees near-instant load speeds and optimal Google SEO indexing in Saudi Arabia.
    * **Bilingual i18n & Native RTL Support:** Full routing support for `/en` and `/ar` with automatic HTML `dir="rtl"` / `dir="ltr"` switching.
    * **Edge/Server Actions:** Serverless API endpoints for direct RFQ email delivery (via Resend or Nodemailer) without requiring a separate backend server.
* **Styling & Design System:** **Tailwind CSS v3/v4** with `@tailwindcss/typography`
* **Icons:** **Lucide React** (modern, clean, and lightweight)
* **State Management:** **Zustand** or lightweight React Context with LocalStorage persistence for the RFQ Quote Cart (client-side persistence of selected parts).
* **Fonts:** 
  * English: Inter or Plus Jakarta Sans (Modern, high-legibility sans-serif)
  * Arabic: Cairo or IBM Plex Sans Arabic (Premium, crisp, highly legible Arabic typography)

---

## 3. Brand Identity & Visual Language

### Color Palette
| Token | Hex Code | Purpose |
|---|---|---|
| **Primary Navy** | `#0B1B3D` | Dominant brand color, conveys engineering authority, reliability, and security |
| **Deep Steel** | `#1E293B` | Headers, dark cards, contrast surfaces |
| **Industrial Amber/Gold** | `#E59E00` / `#D97706` | Accent color, action buttons ("Request Quote", "Add to RFQ"), badges |
| **WhatsApp Green** | `#25D366` | Direct WhatsApp conversion buttons |
| **Neutral Slate** | `#F8FAFC` / `#F1F5F9` | Clean, modern page backgrounds, card containers |
| **Muted Gray** | `#64748B` | Secondary text, specifications labels, borders |

---

## 4. Key Functional Features & Workflows

### 1. Bilingual Architecture (EN / AR)
* First-class internationalization from Day 1.
* Seamless language toggle in the header.
* Automatic layout flipping:
  * English: Left-to-Right (`dir="ltr"`)
  * Arabic: Right-to-Left (`dir="rtl"`)
* Professional Saudi industrial terminology used throughout Arabic copy (e.g., لوحات التحكم, سكك التوجيه, كراسي التوجيه, ماكينات الجر).

### 2. B2B Catalog & Search Experience
* 12 Primary Categories cleanly surfaced with visual icons and bilingual descriptions.
* Fast client-side keyword search (search by part name, SKU, or category).
* Filter by:
  * Category (e.g., Traction, Door Operators, Safety Gear)
  * Subcategory
  * In-Stock Status (Ready for dispatch in KSA)
* Product Card / Detail View:
  * Part specifications table
  * High-res imagery / schematics
  * "Add to Quote" button (with quantity selector)
  * "Quick WhatsApp Inquiry" button

### 3. Interactive RFQ (Request for Quote) Basket
* Floating cart icon showing count of selected spare parts.
* Dedicated RFQ page where clients:
  * Review selected parts and adjust quantities.
  * Enter Company Name, Contact Person, Phone, Email, Delivery City (Dammam, Riyadh, Jeddah, etc.).
  * Optional: Commercial Registration (CR) or Project Reference.
  * Submit button triggers:
    1. Direct email notification to `sales@jupiterelevators.com`.
    2. Optional 1-click WhatsApp transmission with full pre-formatted bill of materials.

### 4. "Photo Part Identification" Emergency Tool
* A dedicated section targeting technicians on-site:
  * *"Cannot find the exact part number or brand?"*
  * Direct prompt to take a clear photo of the worn/broken elevator part, motor tag, or PCB, and immediately send it to the technical team via WhatsApp for instant lookup and sourcing.

### 5. Services & Corporate Trust Showcase
* Highlighting 30+ years in lift engineering and 33+ years in international logistics/importation.
* Strategic partnerships with vetted manufacturers in China and India.
* Official CR (2050078848) and VAT (311250980100003) badges in header/footer to ensure compliance and institutional trust.
* Service modules: Component Sourcing, Technical Support, AMC Support, and Emergency Breakdown Assistance.

---

## 5. SEO & Saudi Market Compliance
* Local SEO schema (JSON-LD) for Saudi Arabia LocalBusiness and Industrial Supplier:
  * Dammam registered address
  * Riyadh and Jeddah service radius
  * Official contact details, WhatsApp, and CR/VAT numbers
* OpenGraph social preview tags in both Arabic and English.
* Mobile-first responsive optimization (over 70% of maintenance inquiries happen via mobile on job sites).
