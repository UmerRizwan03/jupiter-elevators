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

export interface PartVariant {
  model: string;
  name?: LocalizedString;
  type?: string;
  specifications?: Record<string, string | number | (string | number)[]>;
  storagePath?: string;
  image?: string;
  inStock?: boolean;
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
  variants?: PartVariant[];
}

export interface RfqCartItem {
  part: ElevatorPart;
  selectedVariant?: PartVariant;
  quantity: number;
  notes?: string;
}

