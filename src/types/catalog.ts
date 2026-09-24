export type SupportedLocale = "en" | "ar";

export interface BilingualText {
  en: string;
  ar: string;
}

export interface ElevatorCategory {
  id: string;
  slug: string;
  name: BilingualText;
  description: BilingualText;
  icon: string;
  subcategories: BilingualText[];
  itemCount?: number;
}

export interface ElevatorPart {
  id: string;
  sku: string;
  slug: string;
  categoryId: string;
  subcategory: BilingualText;
  name: BilingualText;
  description: BilingualText;
  specifications: Record<string, string>;
  compatibleBrands: string[];
  inStock: boolean;
  origin: "China" | "India" | "International";
  featured?: boolean;
  image: string;
  applications?: BilingualText[];
}

export interface RFQItem {
  partId: string;
  sku: string;
  name: BilingualText;
  categoryName: BilingualText;
  quantity: number;
  image: string;
  notes?: string;
}

export interface RFQSubmission {
  companyName: string;
  contactPerson: string;
  phone: string;
  email: string;
  city: string;
  crNumber?: string;
  projectRef?: string;
  notes?: string;
  items: RFQItem[];
}
