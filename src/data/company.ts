import { CompanyDetails } from "@/types/company";

export const companyData: CompanyDetails = {
  brandName: {
    en: "Jupiter Elevators",
    ar: "جوبيتر للمصاعد",
  },
  legalName: {
    en: "Space Industrial Cont. Company",
    ar: "شركة سبيس للمقاولات الصناعية",
  },
  tagline: {
    en: "Elevating Beyond Expectations",
    ar: "الارتقاء بما يفوق التوقعات",
  },
  crNumber: "2050078848",
  vatNumber: "311250980100003",
  establishedYear: 2018,
  founder: {
    name: "Mahaboob V M",
    role: {
      en: "Founder & Marketing Director",
      ar: "المؤسس ومدير التسويق",
    },
    experienceLiftYears: 30,
    experienceLogisticsYears: 33,
  },
  contact: {
    primaryPhone: "+966562614370",
    whatsappNumber: "+966562614370",
    displayPhone: "+966 56 261 4370",
    emails: {
      sales: "sales@jupiterelevators.com",
      info: "info@jupiterelevators.com",
      management: "mahaboob@jupiterelevators.com",
    },
    domain: "www.jupiterelevators.com",
  },
  address: {
    poBox: "P.O. Box-60113",
    postalCode: "31545",
    district: {
      en: "Al-Badariya District",
      ar: "حي البادرية",
    },
    city: {
      en: "Dammam",
      ar: "الدمام",
    },
    country: {
      en: "Kingdom of Saudi Arabia",
      ar: "المملكة العربية السعودية",
    },
    coverageCities: [
      { en: "Dammam", ar: "الدمام" },
      { en: "Riyadh", ar: "الرياض" },
      { en: "Jeddah", ar: "جدة" },
      { en: "Khobar", ar: "الخبر" },
      { en: "Makkah", ar: "مكة المكرمة" },
      { en: "Madinah", ar: "المدينة المنورة" },
    ],
  },
  businessHours: {
    days: {
      en: "Saturday – Thursday",
      ar: "السبت – الخميس",
    },
    hours: {
      en: "8:00 AM – 5:00 PM",
      ar: "8:00 صباحاً – 5:00 مساءً",
    },
    friday: {
      en: "Closed (Emergency on-call)",
      ar: "مغلق (طوارئ تحت الطلب)",
    },
  },
  coreValues: [
    {
      title: { en: "Quality First", ar: "الجودة العالية" },
      description: {
        en: "Supplying certified, reliable components from verified manufacturing leaders in India and China.",
        ar: "توريد قطع غيار ومكونات معتمدة وموثوقة من كبار المصنعين المعتمدين في الهند والصين.",
      },
      icon: "ShieldCheck",
    },
    {
      title: { en: "Immediate Stock", ar: "جاهزية المخزون" },
      description: {
        en: "Maintaining robust local inventory in Saudi Arabia to eliminate elevator downtime.",
        ar: "الحفاظ على مخزون محلي دائم في المملكة لتقليل فترات توقف المصاعد والأعطال.",
      },
      icon: "PackageCheck",
    },
    {
      title: { en: "Direct Sourcing", ar: "توريد مباشر" },
      description: {
        en: "Cost efficiency and authentic quality passed directly to elevator contractors and MEP firms.",
        ar: "كفاءة عالية في التكلفة وأسعار تنافسية مباشرة لمقاولي المصاعد وشركات الصيانة.",
      },
      icon: "TrendingUp",
    },
    {
      title: { en: "Expert Technical Support", ar: "دعم فني متخصص" },
      description: {
        en: "Backed by 30+ years of lift engineering expertise for accurate part identification and troubleshooting.",
        ar: "مدعوم بأكثر من 30 عاماً من الخبرة الهندسية في المصاعد للمطابقة الدقيقة وحل الأعطال.",
      },
      icon: "Headset",
    },
  ],
};
