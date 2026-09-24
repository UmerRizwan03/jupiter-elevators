# Jupiter Elevators (جوبيتر للمصاعد)

> **Official Elevator Spare Parts & Components Distributor — Kingdom of Saudi Arabia**  
> *Legal Entity:* Space Industrial Cont. Company (شركة سبيس للمقاولات الصناعية)  
> *Commercial Registration (CR):* 2050078848 | *VAT Registration:* 311250980100003  
> *Headquarters:* Dammam, Saudi Arabia (Serving Dammam, Riyadh, Jeddah, and all KSA)

---

## Overview

A modern, high-performance, bilingual (English & Arabic with full native RTL) B2B web application for **Jupiter Elevators**. Built to provide elevator contractors, maintenance companies, facility managers, and technicians with rapid access to verified elevator spare parts and components directly imported from leading manufacturers in India and China.

### Key Capabilities

* **First-Class Bilingual & RTL Engine:** Native switching between English (`ltr`) and Arabic (`rtl`), featuring **Cairo** and **Inter** typography.
* **12 Comprehensive Spare Parts Categories:** Pre-populated catalog covering controllers, traction machines, guide rails, door operators, landing doors, push buttons/COP/LOP, guide shoes, safety gear & governors, wire ropes, safety sensors, hydraulic components, and shaft equipment.
* **B2B RFQ (Request for Quote) Basket:** Frictionless procurement list builder allowing contractors to request commercial quotes without public retail pricing.
* **Instant 1-Click WhatsApp Inquiries:** Automatic pre-formatted message generation with part SKUs, names, and contractor details sent directly to sales engineers (`+966 562614370`).
* **Field Technician "Photo Identification" Tool:** Direct workflow for on-site technicians to photograph unbranded or damaged elevator components and submit for immediate technical matching.
* **Institutional Credibility:** Prominent display of Saudi CR, VAT, registered Dammam address, and 30+ years of lift engineering heritage.

---

## Tech Stack

* **Framework:** [Next.js](https://nextjs.org/) (App Router)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Icons:** [Lucide React](https://lucide.dev/)
* **Fonts:** `next/font/google` (Cairo for Arabic, Inter for English)
* **State Management:** React Context with LocalStorage persistence for the RFQ cart

---

## Getting Started

### Prerequisites

* Node.js 18+ (tested on Node v22)
* npm or yarn or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/UmerRizwan03/jupiter-elevators.git

# Navigate to project directory
cd jupiter-elevators

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

---

## Deployment to Vercel

The application is optimized for zero-config deployment on [Vercel](https://vercel.com):

1. Push your repository to GitHub.
2. Import the repository into your Vercel Dashboard.
3. Framework Preset: **Next.js**
4. Deploy!

Alternatively, deploy using the Vercel CLI:

```bash
npx vercel
```

---

## License & Intellectual Property

Copyright © 2026 **Space Industrial Cont. Company** / **Jupiter Elevators**. All rights reserved.
