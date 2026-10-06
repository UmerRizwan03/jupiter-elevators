import { categories } from "@/data/categories";
import { parts } from "@/data/parts";
import type { ElevatorCategory, ElevatorPart } from "@/types/catalog";

export function getAllCategories(): ElevatorCategory[] {
  return categories;
}

export function getCategoryById(id: string): ElevatorCategory | undefined {
  return categories.find((c) => c.id === id || c.slug === id);
}

export function getAllParts(): ElevatorPart[] {
  return parts;
}

export function getPartBySlug(slug: string): ElevatorPart | undefined {
  return parts.find((p) => p.slug === slug || p.id === slug);
}

export function getFeaturedParts(): ElevatorPart[] {
  return parts.filter((p) => p.featured);
}

export function getPartsByCategory(categoryId: string): ElevatorPart[] {
  return parts.filter((p) => p.categoryId === categoryId);
}

export function getAllCompatibleBrands(): string[] {
  const brandSet = new Set<string>();
  parts.forEach((p) => {
    p.compatibleBrands.forEach((b) => brandSet.add(b));
  });
  return Array.from(brandSet).sort();
}

export interface FilterOptions {
  query?: string;
  categoryId?: string;
  brand?: string;
  inStockOnly?: boolean;
}

export function filterParts(options: FilterOptions): ElevatorPart[] {
  const { query, categoryId, brand, inStockOnly } = options;

  return parts.filter((part) => {
    // 1. In-stock check
    if (inStockOnly && !part.inStock) {
      return false;
    }

    // 2. Category check
    if (categoryId && categoryId !== "all" && part.categoryId !== categoryId) {
      return false;
    }

    // 3. Brand compatibility check
    if (brand && brand !== "all" && !part.compatibleBrands.includes(brand)) {
      return false;
    }

    // 4. Keyword query check (SKU, English name, Arabic name, subcategory)
    if (query && query.trim() !== "") {
      const q = query.trim().toLowerCase();
      const matchSku = part.sku.toLowerCase().includes(q);
      const matchNameEn = part.name.en.toLowerCase().includes(q);
      const matchNameAr = part.name.ar.toLowerCase().includes(q);
      const matchSubEn = part.subcategory.en.toLowerCase().includes(q);
      const matchSubAr = part.subcategory.ar.toLowerCase().includes(q);
      const matchVariant = part.variants?.some(
        (v) =>
          v.model.toLowerCase().includes(q) ||
          (v.type && v.type.toLowerCase().includes(q))
      );

      if (!matchSku && !matchNameEn && !matchNameAr && !matchSubEn && !matchSubAr && !matchVariant) {
        return false;
      }
    }

    return true;

  });
}

export function getPartImageUrl(part: ElevatorPart): string {
  if (part.images?.[0]) return part.images[0];

  const s = part.slug.toLowerCase();

  // Part-specific exact mappings
  if (s.includes("kone") || s.includes("kdl16l") || s.includes("inverter")) {
    return "/images/popular/kone-kdl16l.webp";
  }
  if (s.includes("otis") || s.includes("car-top") || s.includes("f5021") || s.includes("pcb")) {
    return "/images/popular/otis-car-top-board.webp";
  }
  if (s.includes("wittur") || s.includes("door-operator")) {
    return "/images/popular/wittur-door-operator.webp";
  }
  if (s.includes("fermator") || s.includes("roller") || s.includes("hanger")) {
    return "/images/popular/fermator-door-roller.webp";
  }
  if (s.includes("schindler") || s.includes("sensor") || s.includes("switch")) {
    return "/images/popular/schindler-leveling-sensor.webp";
  }
  if (s.includes("cabin") || s.includes("push-button") || s.includes("cop") || s.includes("lop")) {
    return "/images/components/cabin-components.webp";
  }
  if (s.includes("cable") || s.includes("rope") || s.includes("suspension")) {
    return "/images/components/cables-accessories.webp";
  }

  // Category fallback mappings
  switch (part.categoryId) {
    case "traction-machines":
      return "/images/components/traction-systems.webp";
    case "elevator-controllers":
      return "/images/components/control-systems.webp";
    case "door-operators":
      return "/images/components/door-systems.webp";
    case "safety-gear-governors":
      return "/images/components/safety-components.webp";
    case "push-buttons-indicators":
      return "/images/components/cabin-components.webp";
    case "wire-ropes-suspension":
      return "/images/components/cables-accessories.webp";
    default:
      return "/images/components/traction-systems.webp";
  }
}
