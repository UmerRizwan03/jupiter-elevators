import type { ElevatorCategory } from "@/types/catalog";

export const categories: ElevatorCategory[] = [
  {
    id: "elevator-controllers",
    slug: "elevator-controllers",
    name: {
      en: "Elevator Controllers",
      ar: "لوحات وأنظمة التحكم",
    },
    description: {
      en: "Microprocessor boards, serial communication, and energy-efficient VVVF inverter drives.",
      ar: "لوحات التحكم الإلكترونية المتطورة، كروت الاتصال التسلسلي، ومحولات التردد المتغير VVVF.",
    },
    iconName: "Cpu",
    popular: true,
    subcategories: [
      { en: "Main Control Boards", ar: "لوحات التحكم الرئيسية" },
      { en: "VVVF Inverter Drives", ar: "محولات التردد المتغير (إنفرتر)" },
      { en: "Relays & Contactors", ar: "المرحلات ومفاتيح التوصيل" },
      { en: "Transformers & ARD", ar: "المحولات ووحدات الطوارئ ARD" },
    ],
  },
  {
    id: "traction-machines",
    slug: "traction-machines",
    name: {
      en: "Traction Machines & Drives",
      ar: "ماكينات الجر ونظم الدفع",
    },
    description: {
      en: "Permanent magnet gearless motors, robust geared units, sheaves, brakes, and encoders.",
      ar: "ماكينات جر بدون تروس (PMSM) ومع تروس، طارات الجر، الفرامل الكهرومغناطيسية، والمشفرات.",
    },
    iconName: "Cog",
    popular: true,
    subcategories: [
      { en: "Gearless PMSM Machines", ar: "ماكينات بدون تروس (Gearless)" },
      { en: "Geared Drive Units", ar: "ماكينات جر بتروس (Geared)" },
      { en: "Traction Sheaves & Pulleys", ar: "طارات الجر والبكرات" },
      { en: "Brakes & Actuation Coils", ar: "الفرامل وملفات التشغيل" },
      { en: "Encoders & Bearings", ar: "أجهزة التشفير والمحامل" },
    ],
  },
  {
    id: "guide-rails",
    slug: "guide-rails",
    name: {
      en: "Guide Rails & Brackets",
      ar: "سكك التوجيه وملحقات التثبيت",
    },
    description: {
      en: "Standard T-profile machined and cold-drawn rails, adjustable wall brackets, and lubricators.",
      ar: "سكك توجيه قياسية T50 إلى T90، مشابك السكك، كمرات التثبيت، وألواح التوصيل ومزيتات السكك.",
    },
    iconName: "Ruler",
    popular: false,
    subcategories: [
      { en: "T-Profile Guide Rails", ar: "سكك التوجيه (T50-T90)" },
      { en: "Rail Clips & Brackets", ar: "مشابك وحوامل السكك" },
      { en: "Fishplates & Fasteners", ar: "ألواح التوصيل ومسامير التثبيت" },
      { en: "Automatic Lubricators", ar: "مزيتات السكك التلقائية" },
    ],
  },
  {
    id: "door-operators",
    slug: "door-operators",
    name: {
      en: "Door Operators & Mechanisms",
      ar: "مشغلات الأبواب الأوتوماتيكية",
    },
    description: {
      en: "Telescopic and center-opening VVVF smart door drives, PM motors, rollers, and sync belts.",
      ar: "مشغلات أبواب الكابينة بنظام VVVF الذكي، محركات المغناطيس الدائم، السيور المسننة والبكرات.",
    },
    iconName: "DoorOpen",
    popular: true,
    subcategories: [
      { en: "VVVF Smart Door Operators", ar: "مشغلات أبواب متغيرة السرعة" },
      { en: "Door Motors & Controllers", ar: "محركات وكروت تحكم الأبواب" },
      { en: "Rollers, Belts & Linkages", ar: "البكرات وسيور الحركة والأذرع" },
    ],
  },
  {
    id: "landing-doors",
    slug: "landing-doors",
    name: {
      en: "Landing Doors & Locks",
      ar: "أبواب الأدوار وأقفال الأمان",
    },
    description: {
      en: "EN 81 compliant electromechanical landing door locks, stainless/glass panels, and sills.",
      ar: "كوالين وأقفال الأبواب الكهروميكانيكية، درف الأبواب استانلس ستيل، والأعتاب السفلية المقواة.",
    },
    iconName: "Lock",
    popular: false,
    subcategories: [
      { en: "Complete Landing Assemblies", ar: "مجموعات أبواب الأدوار الكاملة" },
      { en: "Door Locks & Interlocks", ar: "أقفال وكوالين الأبواب الكهربائية" },
      { en: "Bottom Sills & Tracks", ar: "الأعتاب ومجاري الانزلاق" },
    ],
  },
  {
    id: "push-buttons-indicators",
    slug: "push-buttons-indicators",
    name: {
      en: "Push Buttons & COP / LOP",
      ar: "أزرار الطلب وشاشات العرض",
    },
    description: {
      en: "Vandal-resistant buttons, Braille/ADA floor designations, multimedia TFT LCD screens, and chimes.",
      ar: "أزرار ستانلس مقاومة للتخريب، أزرار بطريقة برايل، شاشات عرض ملونة TFT، وأجراس الوصول.",
    },
    iconName: "Sliders",
    popular: true,
    subcategories: [
      { en: "COP & LOP Push Buttons", ar: "أزرار طلب الكابينة والأدوار" },
      { en: "Braille & ADA Buttons", ar: "أزرار بطريقة برايل لذوي الإعاقة" },
      { en: "Multimedia TFT & LCD Displays", ar: "شاشات عرض الأدوار والوسائط" },
      { en: "Hall Lanterns & Buzzers", ar: "مصابيح الوصول وأجهزة التنبيه" },
    ],
  },
  {
    id: "guide-shoes",
    slug: "guide-shoes",
    name: {
      en: "Guide Shoes & Inserts",
      ar: "كراسي التوجيه والبطانات",
    },
    description: {
      en: "Sliding and polyurethane roller guide shoes, counterweight guides, and low-friction wear liners.",
      ar: "كراسي توجيه منزلقة ودوارة، كراسي ثقل الموازنة، وبطانات نايلون وبولي يوريثان عالية المتانة.",
    },
    iconName: "Footprints",
    popular: false,
    subcategories: [
      { en: "Sliding Guide Shoes", ar: "كراسي التوجيه المنزلقة" },
      { en: "Roller Guide Assemblies", ar: "كراسي التوجيه الدوارة (رولر)" },
      { en: "Counterweight Guide Shoes", ar: "كراسي ثقل الموازنة" },
      { en: "Nylon & PTFE Liners", ar: "بطانات كراسي التوجيه" },
    ],
  },
  {
    id: "safety-gear-governors",
    slug: "safety-gear-governors",
    name: {
      en: "Safety Gears & Governors",
      ar: "منظومة الأمان ومكابح الطوارئ",
    },
    description: {
      en: "Centrifugal overspeed governors, progressive safety clamps, tension pulleys, and slack rope switches.",
      ar: "منظمات السرعة الزائدة (باراشوت)، مكابح الأمان التدريجية، بكرات الشد ومفاتيح قطع الحركة.",
    },
    iconName: "ShieldAlert",
    popular: true,
    subcategories: [
      { en: "Overspeed Governors", ar: "منظمات السرعة الزائدة" },
      { en: "Progressive Safety Gears", ar: "مكابح الأمان التدريجية" },
      { en: "Governor Tension Pulleys", ar: "حبال وبكرات شد منظم السرعة" },
      { en: "Safety Interlock Switches", ar: "مفاتيح الأمان الكهربائية" },
    ],
  },
  {
    id: "wire-ropes-suspension",
    slug: "wire-ropes-suspension",
    name: {
      en: "Wire Ropes & Suspension",
      ar: "حبال الجر ومعدات التعليق",
    },
    description: {
      en: "Certified elevator steel wire ropes (8x19, 6x19), wedge sockets, clamps, and quiet compensation chains.",
      ar: "حبال الجر الفولاذية المعتمدة (8x19 / 6x19)، مرابط الحبال المخروطية، وسلاسل التعويض المعزولة.",
    },
    iconName: "Cable",
    popular: false,
    subcategories: [
      { en: "Steel Wire Ropes (FC/IWRC)", ar: "حبال الجر الفولاذية" },
      { en: "Governor Limiter Ropes", ar: "حبال منظم السرعة" },
      { en: "Rope Sockets & Clamps", ar: "مرابط الحبال والمشابك" },
      { en: "Compensation Chains", ar: "سلاسل وأحبال التعويض" },
    ],
  },
  {
    id: "sensors-door-safety",
    slug: "sensors-door-safety",
    name: {
      en: "Sensors & Door Safety",
      ar: "حساسات السلامة وأجهزة الاستشعار",
    },
    description: {
      en: "Multi-beam infrared light curtains, leveling magnetic switches, deceleration switches, and safety edges.",
      ar: "الستائر الضوئية بالأشعة تحت الحمراء، حساسات التوقف المغناطيسية، ومفاتيح نهاية الشوط.",
    },
    iconName: "Radio",
    popular: true,
    subcategories: [
      { en: "Infrared Light Curtains", ar: "الستائر الضوئية للأبواب" },
      { en: "Magnetic Leveling Sensors", ar: "حساسات التقارب والتسوية" },
      { en: "Limit & Terminal Switches", ar: "مفاتيح نهاية المشوار" },
      { en: "Door Safety Edges", ar: "حواف الأمان الميكانيكية" },
    ],
  },
  {
    id: "hydraulic-components",
    slug: "hydraulic-components",
    name: {
      en: "Hydraulic Components",
      ar: "مكونات المصاعد الهيدروليكية",
    },
    description: {
      en: "Submerged screw pump units, proportional valve blocks, rams, high-pressure hoses, and seals.",
      ar: "مضخات هيدروليكية غاطسة، بلوكات صمامات التحكم النسبي، أسطوانات الضغط العالي وموانع التسريب.",
    },
    iconName: "Gauge",
    popular: false,
    subcategories: [
      { en: "Pumps & Power Packs", ar: "المضخات ووحدات القدرة" },
      { en: "Control Valve Blocks", ar: "بلوكات صمامات التحكم" },
      { en: "Cylinders & Hydraulic Rams", ar: "أسطوانات الضغط العالي" },
      { en: "Seals & Return Filters", ar: "موانع التسريب وفلاتر الزيت" },
    ],
  },
  {
    id: "shaft-equipment",
    slug: "shaft-equipment",
    name: {
      en: "Shaft Equipment & Accessories",
      ar: "تجهيزات البئر ومستلزمات التركيب",
    },
    description: {
      en: "Hydraulic pit buffers, cross-flow cabin ventilation blowers, stainless handrails, and inspection boxes.",
      ar: "مصدات قاع البئر الهيدروليكية، مراوح تهوية الكابينة، درابزينات الاستانلس، وصناديق الفحص.",
    },
    iconName: "Wrench",
    popular: false,
    subcategories: [
      { en: "Hydraulic & Spring Buffers", ar: "مصدات قاع البئر (بفر)" },
      { en: "Cabin Ventilation Blowers", ar: "مراوح تهوية الكابينة الهادئة" },
      { en: "Handrails & Mirrors", ar: "درابزينات ومرايا الكابينة" },
      { en: "Pit Inspection & Ladders", ar: "تجهيزات الفحص وسلالم البئر" },
    ],
  },
];
