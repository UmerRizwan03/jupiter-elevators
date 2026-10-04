# Implementation Plan: Jupiter Elevators (جوبيتر للمصاعد)

## Overview
A modern, high-performance, bilingual (Arabic & English with native RTL) B2B web application for Jupiter Elevators (Space Industrial Cont. Company) in Dammam, Saudi Arabia. The application serves lift contractors, maintenance firms, and technicians with a 12-category spare parts catalog, a frictionless B2B RFQ (Request for Quote) basket, 1-click WhatsApp inquiry integration, an on-site technician "Snap & Send" photo tool, and a crisp, light-themed industrial engineering visual design.

## Architecture Decisions
- **Framework & Router:** Next.js 16 (App Router) with TypeScript.
- **Routing Strategy:** Sub-path locale routing (`/[lang]/...`) where `ar` is default (Arabic-first for Saudi Arabia) and `en` is fully supported.
- **Next.js 16 Conventions:**
  - Route routing via `src/proxy.ts` (Next.js 16 deprecation of `middleware.ts`).
  - Dynamic route parameters accessed via `await params` in pages and layouts.
- **Design System & Theme:**
  - Light-theme engineering aesthetic: Pure White (`#FFFFFF`), Warm Technical Slate (`#F8FAFC` / `#F1F5F9`), Deep Engineering Navy (`#0B1B3D`) for typography, and Industrial Amber/Gold (`#D97706` / `#C59341`) for primary actions.
  - Native RTL handling via HTML `dir="rtl"` / `dir="ltr"` and Tailwind RTL utility variants.
  - Fonts: `Cairo` for Arabic (high legibility) and `Inter` for English.
- **State Management:** React Context + `localStorage` for the client-side RFQ Cart (zero-barrier, no user login required).
- **Conversion Workflows:**
  - Primary: 1-Click WhatsApp integration pre-formatting itemized BOMs to `+966 562614370`.
  - Secondary: RFQ submission confirmation with reference code and printable summary.
  - Emergency: "Snap & Send" technician workflow for unbranded/obsolete part photo lookup.
- **Catalog Architecture:** Static TypeScript data store for 12 categories conforming to `ElevatorPart` schema, supporting instant client-side filtering without heavy database overhead.

---

## Capability Map

| Module ID | Responsibility | Depends On |
|---|---|---|
| `core-i18n-layout` | App router layout, `src/proxy.ts`, bilingual dictionaries, Cairo/Inter fonts, Header, Footer | — |
| `catalog-data` | TypeScript catalog schema, 12-category dataset, filter & search helpers | `core-i18n-layout` |
| `rfq-cart-state` | RFQ cart context, local storage persistence, badge counters, drawer/modal | `catalog-data` |
| `home-and-ui` | Hero banner, Quick Part Finder, Bento category grid, "Snap & Send" widget, trust stats | `rfq-cart-state` |
| `catalog-pages` | Full parts catalog page with faceted filtering, Part detail page with specifications table | `home-and-ui` |
| `rfq-submission` | RFQ quote review page, contractor details form, 1-click WhatsApp BOM generator | `catalog-pages` |
| `about-contact-seo` | About page, Services page, Contact page with Dammam HQ details, JSON-LD SEO schema | `rfq-submission` |

---

## Risks and Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Arabic diacritics clipping or layout misalignments in RTL | Med | Use `Cairo` with generous line-height (`leading-relaxed`), logical CSS properties, and directional icon flipping (`rtl:rotate-180`). |
| Mobile usability issues for field technicians on site | High | Design with minimum 48px tap targets, high contrast, sticky mobile actions, and pre-formatted 1-click WhatsApp links. |
| Next.js 16 breaking changes (`params` promise, `proxy.ts`) | High | Follow exact Next.js 16 conventions verified against `node_modules/next/dist/docs/`. |
| Catalog performance with rich specs | Low | Pure static generation (SSG) with client-side reactive filtering keeps page load instantaneous. |
