import { BilingualText } from "./catalog";

export interface CompanyDetails {
  brandName: BilingualText;
  legalName: BilingualText;
  tagline: BilingualText;
  crNumber: string;
  vatNumber: string;
  establishedYear: number;
  founder: {
    name: string;
    role: BilingualText;
    experienceLiftYears: number;
    experienceLogisticsYears: number;
  };
  contact: {
    primaryPhone: string;
    whatsappNumber: string;
    displayPhone: string;
    emails: {
      sales: string;
      info: string;
      management: string;
    };
    domain: string;
  };
  address: {
    poBox: string;
    postalCode: string;
    district: BilingualText;
    city: BilingualText;
    country: BilingualText;
    coverageCities: BilingualText[];
  };
  businessHours: {
    days: BilingualText;
    hours: BilingualText;
    friday: BilingualText;
  };
  coreValues: {
    title: BilingualText;
    description: BilingualText;
    icon: string;
  }[];
}
