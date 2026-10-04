export interface ElevatorBrand {
  id: string;
  name: string;
  logoAlt: string;
  country: {
    en: string;
    ar: string;
  };
  category: "multinational" | "controllers" | "doorSystems" | "machines";
  description: {
    en: string;
    ar: string;
  };
  supportedSystems: {
    en: string[];
    ar: string[];
  };
  catalogBrandName: string;
  featured?: boolean;
}

export const elevatorBrands: ElevatorBrand[] = [
  {
    id: "otis",
    name: "OTIS",
    logoAlt: "Otis Elevator Company",
    country: {
      en: "USA | Global",
      ar: "الولايات المتحدة | عالمي",
    },
    category: "multinational",
    description: {
      en: "Full spare parts support for Otis Gen2, 2000, and MCS systems: COP/LOP car buttons, car top boards, door interlocks, and leveling sensors.",
      ar: "دعم شامل لقطع غيار مصاعد أوتيس Gen2 و 2000 و MCS: أزرار الكابينة، لوحات سقف الكابينة، أقفال الأبواب، وحساسات التوقف.",
    },
    supportedSystems: {
      en: ["Gen2 Series", "MCS-220 / 311", "AT120 Door Operator", "DO2000"],
      ar: ["سلسلة Gen2", "أنظمة MCS-220/311", "مشغل أبواب AT120", "مشغل DO2000"],
    },
    catalogBrandName: "Otis",
    featured: true,
  },
  {
    id: "kone",
    name: "KONE",
    logoAlt: "KONE Elevators",
    country: {
      en: "Finland | Global",
      ar: "فنلندا | عالمي",
    },
    category: "multinational",
    description: {
      en: "Certified components for KONE MonoSpace, MiniSpace, and TranSys: V3F drive inverters, KDL16L boards, door rollers, and optical sensors.",
      ar: "مكونات معتمدة لمصاعد كوني MonoSpace و MiniSpace: محولات V3F، لوحات KDL16L، بكرات الأبواب، والحساسات الضوئية.",
    },
    supportedSystems: {
      en: ["MonoSpace", "MiniSpace", "KDL16L Drives", "AMD Door Systems"],
      ar: ["MonoSpace", "MiniSpace", "محولات KDL16L", "أنظمة أبواب AMD"],
    },
    catalogBrandName: "KONE",
    featured: true,
  },
  {
    id: "schindler",
    name: "Schindler",
    logoAlt: "Schindler Group",
    country: {
      en: "Switzerland | Global",
      ar: "سويسرا | عالمي",
    },
    category: "multinational",
    description: {
      en: "Replacement solutions for Schindler 3300, 5500, and Smart series: QKS door operators, magnetic leveling sensors, safety switches, and brake coils.",
      ar: "حلول إحلال لمصاعد شيندلر 3300 و 5500: مشغلات أبواب QKS، حساسات التوقف المغناطيسية، مفاتيح الأمان، وملفات الفرامل.",
    },
    supportedSystems: {
      en: ["Schindler 3300/5500", "QKS9 / QKS11", "Bionic 5", "Smart MRL"],
      ar: ["شيندلر 3300/5500", "أنظمة QKS9/QKS11", "لوحات Bionic 5", "مصاعد Smart MRL"],
    },
    catalogBrandName: "Schindler",
    featured: true,
  },
  {
    id: "mitsubishi",
    name: "MITSUBISHI",
    logoAlt: "Mitsubishi Electric Elevators",
    country: {
      en: "Japan | Global",
      ar: "اليابان | عالمي",
    },
    category: "multinational",
    description: {
      en: "Precision Japanese components for GPS-III, NexWay, and SPVF: door contact blocks, heavy-duty guide shoes, limit switches, and encoder interfaces.",
      ar: "قطع يابانية دقيقة لمصاعد ميتسوبيشي GPS-III و NexWay و SPVF: كتل تلامس الأبواب، كراسي التوجيه، ومفاتيح نهاية المشوار.",
    },
    supportedSystems: {
      en: ["GPS Series", "NexWay", "SPVF Controller", "Heavy Duty Door Clutches"],
      ar: ["سلسلة GPS", "مصاعد NexWay", "تحكم SPVF", "كوالين وأبواب الخدمة الشاقة"],
    },
    catalogBrandName: "Mitsubishi",
    featured: true,
  },
  {
    id: "tke",
    name: "TK ELEVATOR",
    logoAlt: "TK Elevator (ThyssenKrupp)",
    country: {
      en: "Germany | Global",
      ar: "ألمانيا | عالمي",
    },
    category: "multinational",
    description: {
      en: "Original and OEM replacement parts for ThyssenKrupp Synergy, Evolution, and Tugela: CPI inverters, door locks, push buttons, and safety gears.",
      ar: "قطع أصلية وبديلة لمصاعد تيسين كروب Synergy و Evolution: محولات CPI، كوالين الأبواب، أزرار الطلب، وبراشوتات الأمان.",
    },
    supportedSystems: {
      en: ["Synergy Series", "Evolution", "CPI Inverters", "Tugela Escalators"],
      ar: ["سلسلة Synergy", "سلسلة Evolution", "محولات CPI", "سلالم Tugela المتحركة"],
    },
    catalogBrandName: "ThyssenKrupp",
    featured: true,
  },
  {
    id: "monarch",
    name: "MONARCH",
    logoAlt: "Monarch Inovance",
    country: {
      en: "Global | Asia",
      ar: "عالمي | آسيا",
    },
    category: "controllers",
    description: {
      en: "Authorized distribution for Monarch Inovance integrated lift controllers: NICE3000+, NICE1000+, NICE2000, PG encoder cards, and car operating panels.",
      ar: "توزيع معتمد لأجهزة التحكم المتكاملة مونارك إينوفانس: NICE3000+ و NICE1000+ و NICE2000، كروت الإنكودر، ولوحات طلب الكابينة.",
    },
    supportedSystems: {
      en: ["NICE3000+ Integrated", "NICE1000+ Controller", "NICE2000", "PG Encoder Cards"],
      ar: ["لوحة التحكم NICE3000+", "جهاز NICE1000+", "نظام NICE2000", "كروت الإنكودر PG"],
    },
    catalogBrandName: "Monarch",
    featured: true,
  },
  {
    id: "step",
    name: "STEP ELECTRIC",
    logoAlt: "STEP Electric Corporation",
    country: {
      en: "Global | Asia",
      ar: "عالمي | آسيا",
    },
    category: "controllers",
    description: {
      en: "Leading serial control systems: STEP F5021 main boards, AS380 integrated drives, serial car call boards, and CAN-bus communication modules.",
      ar: "أنظمة التحكم التسلسلي الرائدة: لوحات STEP F5021، أجهزة AS380 المتكاملة، لوحات الاتصال التسلسلي، ووحدات CAN-bus.",
    },
    supportedSystems: {
      en: ["F5021 Motherboards", "AS380 Integrated Drives", "Serial Car Boards", "CAN-Bus Systems"],
      ar: ["اللوحات الأم F5021", "محولات AS380 المدمجة", "لوحات الكابينة التسلسلية", "شبكات CAN-Bus"],
    },
    catalogBrandName: "STEP",
    featured: true,
  },
  {
    id: "fermator",
    name: "FERMATOR",
    logoAlt: "Fermator Door Systems",
    country: {
      en: "Spain | Europe",
      ar: "إسبانيا | أوروبا",
    },
    category: "doorSystems",
    description: {
      en: "World-class automatic landing and car door mechanisms: 40/10 VVVF operators, door hangers, landing interlocks, and emergency release rollers.",
      ar: "آليات أبواب المصاعد العالمية: مشغلات الأبواب 40/10 VVVF، علاقات الأبواب، كوالين الطوابق، وبكرات الفتح اليدوي في الطوارئ.",
    },
    supportedSystems: {
      en: ["40/10 VVVF Operators", "Compact Operators", "Landing Door Locks", "Telescopic Hangers"],
      ar: ["مشغلات 40/10 VVVF", "مشغلات كومباكت", "كوالين أبواب الطوابق", "علاقات الأبواب التلسكوبية"],
    },
    catalogBrandName: "Fermator",
    featured: true,
  },
  {
    id: "wittur",
    name: "WITTUR",
    logoAlt: "Wittur Group",
    country: {
      en: "Germany | Europe",
      ar: "ألمانيا | أوروبا",
    },
    category: "doorSystems",
    description: {
      en: "Engineered German door systems and safety gears: Hydra, Augusta, and Fineline door operators, progressive safety gears, and guide shoes.",
      ar: "أنظمة الأبواب وبراشوتات الأمان الألمانية: مشغلات Hydra و Augusta و Fineline، براشوتات الأمان التدريجية، وكراسي التوجيه.",
    },
    supportedSystems: {
      en: ["Hydra Door Systems", "Augusta Operators", "Progressive Safety Gear", "Roller Guide Shoes"],
      ar: ["أنظمة أبواب Hydra", "مشغلات Augusta", "براشوتات أمان تدريجية", "كراسي توجيه بعجلات"],
    },
    catalogBrandName: "Wittur",
    featured: true,
  },
  {
    id: "torindrive",
    name: "TORINDRIVE",
    logoAlt: "TorinDrive Traction Machines",
    country: {
      en: "International",
      ar: "دولي",
    },
    category: "machines",
    description: {
      en: "High-efficiency permanent magnet synchronous (PMSM) gearless and geared traction machines, deflector sheaves, and brake lining assemblies.",
      ar: "ماكينات الجر بدون تروس (PMSM) وماكينات الجيربوكس عالية الكفاءة، طارات التوجيه، ومجموعات بطانات الفرامل.",
    },
    supportedSystems: {
      en: ["PMSM Gearless Machines", "Geared Traction Units", "Deflector Sheaves", "Electromagnetic Brakes"],
      ar: ["ماكينات جر بدون تروس PMSM", "ماكينات جر بتروس", "طارات التوجيه الحرة", "فرامل كهرومغناطيسية"],
    },
    catalogBrandName: "TorinDrive",
    featured: false,
  },
  {
    id: "montanari",
    name: "MONTANARI",
    logoAlt: "Montanari Giulio & C.",
    country: {
      en: "Italy | Europe",
      ar: "إيطاليا | أوروبا",
    },
    category: "machines",
    description: {
      en: "Renowned Italian heavy-duty geared and gearless traction machines, replacement sheaves, synthetic brake pads, and motor encoders.",
      ar: "ماكينات المصاعد الإيطالية الشهيرة بتروس وبدون تروس، طارات الجر البديلة، تيل الفرامل الصناعي، وإنكودرات المحركات.",
    },
    supportedSystems: {
      en: ["Penta Series", "Gearless MGX", "Traction Sheaves", "Precision Brake Assemblies"],
      ar: ["سلسلة Penta", "ماكينات MGX بدون تروس", "طارات السحب", "مجموعات الفرامل الدقيقة"],
    },
    catalogBrandName: "Montanari",
    featured: false,
  },
  {
    id: "bluelight",
    name: "BLUELIGHT",
    logoAlt: "Shenyang Bluelight",
    country: {
      en: "Global | Asia",
      ar: "عالمي | آسيا",
    },
    category: "controllers",
    description: {
      en: "Energy-saving PM synchronous machines, microcomputer integrated control systems, and automated emergency battery rescue units (ARD).",
      ar: "ماكينات متزامنة موفرة للطاقة، أنظمة تحكم حاسوبية متكاملة، ووحدات الهبوط الاضطراري في الطوارئ (ARD).",
    },
    supportedSystems: {
      en: ["BL2000 Series", "BL6 Control Systems", "ARD Battery Backup", "PMSM Machines"],
      ar: ["سلسلة BL2000", "أنظمة تحكم BL6", "وحدات بطاريات ARD", "محركات PMSM"],
    },
    catalogBrandName: "BlueLight",
    featured: false,
  },
  {
    id: "fujitec",
    name: "FUJITEC",
    logoAlt: "Fujitec Elevators",
    country: {
      en: "Japan | Global",
      ar: "اليابان | عالمي",
    },
    category: "multinational",
    description: {
      en: "Quality Japanese vertical transportation spares: VIRIDIS, EXDN, door operators, traction sheave liners, leveling switches, and safety interlocks.",
      ar: "قطع غيار مصاعد فوجيتك اليابانية: VIRIDIS و EXDN، مشغلات الأبواب، حشوات طارات الجر، حساسات التوقف، ومفاتيح الأمان.",
    },
    supportedSystems: {
      en: ["VIRIDIS Series", "EXDN Elevators", "Door Clutches", "Traction Liners"],
      ar: ["سلسلة VIRIDIS", "مصاعد EXDN", "كوالين الأبواب", "حشوات طارات السحب"],
    },
    catalogBrandName: "Fujitec",
    featured: false,
  },
  {
    id: "hitachi",
    name: "HITACHI",
    logoAlt: "Hitachi Elevators",
    country: {
      en: "Japan | Global",
      ar: "اليابان | عالمي",
    },
    category: "multinational",
    description: {
      en: "Reliable replacement parts for Hitachi HGP, B88, and Urban Ace series: car station PCBs, door operator belts, interlocks, and traveling cable accessories.",
      ar: "قطع غيار موثوقة لمصاعد هيتاشي HGP و B88 و Urban Ace: كروت الكابينة، سيور مشغلات الأبواب، الكوالين، ومستلزمات الكوابل المرنة.",
    },
    supportedSystems: {
      en: ["HGP Series", "B88 Systems", "Urban Ace", "Door Belts & Hangers"],
      ar: ["سلسلة HGP", "أنظمة B88", "Urban Ace", "سيور وعلاقات الأبواب"],
    },
    catalogBrandName: "Hitachi",
    featured: false,
  },
];

