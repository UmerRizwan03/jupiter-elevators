export interface LocalizedString {
  en: string;
  ar: string;
}

export interface ElevatorCategory {
  id: string;
  slug: string;
  name: LocalizedString;
  description: LocalizedString;
  iconName: string;
  subcategories: LocalizedString[];
  popular?: boolean;
}

export interface ElevatorPart {
  id: string;
  sku: string;
  slug: string;
  categoryId: string;
  subcategory: LocalizedString;
  name: LocalizedString;
  description: LocalizedString;
  specifications: Record<string, string>;
  compatibleBrands: string[];
  inStock: boolean; // Ready in Saudi Arabia
  origin: "China" | "India" | "International";
  images: string[];
  datasheetUrl?: string;
  featured?: boolean;
}

export interface RfqCartItem {
  part: ElevatorPart;
  quantity: number;
  notes?: string;
}
