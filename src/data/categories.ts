import { ElevatorCategory } from "@/types/catalog";

export const elevatorCategories: ElevatorCategory[] = [
  {
    id: "controllers",
    slug: "controllers",
    name: {
      en: "Elevator Controllers & Drives",
      ar: "لوحات التحكم والمحولات",
    },
    description: {
      en: "Advanced integrated microprocessor controllers, VVVF inverter drives, safety relays, transformers, and emergency rescue units.",
      ar: "لوحات تحكم دقيقة متكاملة، محولات تردد متغير، مرحلات ومفاتيح أمان، ووحدات إنقاذ الطوارئ.",
    },
    icon: "Cpu",
    subcategories: [
      { en: "Main Control Boards", ar: "لوحات التحكم الرئيسية" },
      { en: "VVVF Drives", ar: "محولات التردد المتغير" },
      { en: "Relays & Contactors", ar: "المرحلات والقواطع الكهرومغناطيسية" },
      { en: "Transformers & Power Supplies", ar: "المحولات ووحدات التغذية" },
    ],
  },
  {
    id: "traction-machines",
    slug: "traction-machines",
    name: {
      en: "Traction Machines & Motors",
      ar: "ماكينات الجر والمحركات",
    },
    description: {
      en: "High-torque permanent magnet gearless machines, heavy-duty geared motors, traction sheaves, brakes, and precision rotary encoders.",
      ar: "ماكينات جر بدون تروس مغناطيسية، محركات مع تروس، طارات الجر، أنظمة الفرامل والمشفرات الدورانية.",
    },
    icon: "Cog",
    subcategories: [
      { en: "Gearless & Geared Machines", ar: "ماكينات بدون تروس ومع تروس" },
      { en: "Traction Sheaves", ar: "طارات الجر والبكرات" },
      { en: "Brakes & Brake Coils", ar: "الفرامل وملفات الكبح" },
      { en: "Bearings & Encoders", ar: "المحامل والمشفرات" },
    ],
  },
  {
    id: "guide-rails",
    slug: "guide-rails",
    name: {
      en: "Guide Rails & Hardware",
      ar: "سكك التوجيه ومستلزمات التثبيت",
    },
    description: {
      en: "Machined and cold-drawn T-profile guide rails (T50-T90), forged rail clips, adjustable brackets, fishplates, and auto lubricators.",
      ar: "سكك توجيه مصنعة ومسحوبة (T50-T90)، مشابك فولاذية، حوامل تثبيت قابلة للتعديل ومزيتات أوتوماتيكية.",
    },
    icon: "Ruler",
    subcategories: [
      { en: "T50 / T70 / T75 / T78 / T89 / T90", ar: "سكك مقاسات T50 / T70 / T75 / T89 / T90" },
      { en: "Rail Clips & Brackets", ar: "مشابك وحوامل السكك" },
      { en: "Fishplates & Fasteners", ar: "ألواح التوصيل ومسامير التثبيت" },
      { en: "Guide Rail Lubricators", ar: "مزيتات سكك التوجيه" },
    ],
  },
  {
    id: "door-operators",
    slug: "door-operators",
    name: {
      en: "Door Operators & Mechanisms",
      ar: "مشغلات الأبواب ومحركاتها",
    },
    description: {
      en: "Smart VVVF automatic door operators, brushless DC motors, synchronous drive belts, polyurethane hanger rollers, and linkages.",
      ar: "مشغلات أبواب أوتوماتيكية ذكية، محركات بدون فرش، سيور مسننة وبكرات تعليق عالية المتانة.",
    },
    icon: "Maximize2",
    subcategories: [
      { en: "Automatic Door Operators", ar: "مشغلات الأبواب الأوتوماتيكية" },
      { en: "VVVF Door Operators", ar: "مشغلات أبواب بتحكم التردد المتغير" },
      { en: "Motors & Controllers", ar: "محركات ووحدات تحكم الأبواب" },
      { en: "Rollers, Belts & Linkages", ar: "بكرات، سيور وأذرع ميكانيكية" },
    ],
  },
  {
    id: "landing-doors",
    slug: "landing-doors",
    name: {
      en: "Landing Doors & Fixtures",
      ar: "أبواب الأدوار وملحقاتها",
    },
    description: {
      en: "Certified fire-rated landing door assemblies, decorative stainless steel panels, safety interlocks, extruded sills, and tracks.",
      ar: "مجموعات أبواب أدوار مقاومة للحريق، درف استيل، كوالين وأقفال أمان كهروميكانيكية، وأعتاب ألمنيوم.",
    },
    icon: "DoorClosed",
    subcategories: [
      { en: "Complete Door Assemblies", ar: "مجموعات أبواب الأدوار الكاملة" },
      { en: "Door Panels & Frames", ar: "درف وإطارات الأبواب" },
      { en: "Door Locks & Interlocks", ar: "أقفال وكوالين الأبواب الكهربائية" },
      { en: "Door Sills & Tracks", ar: "أعتاب ومجاري الأبواب" },
    ],
  },
  {
    id: "push-buttons",
    slug: "push-buttons",
    name: {
      en: "COP, LOP & Indicators",
      ar: "أزرار الطلب وشاشات العرض",
    },
    description: {
      en: "Vandal-resistant micro-motion push buttons, tactile Braille buttons, dot-matrix & TFT LCD displays, hall lanterns, and buzzers.",
      ar: "أزرار ستانلس ستيل مقاومة للعبث، أزرار بطريقة برايل، شاشات عرض TFT وLED، ومصابيح طلب الأدوار.",
    },
    icon: "Sliders",
    subcategories: [
      { en: "COP & LOP Push Buttons", ar: "أزرار لوحات الكابينة والأدوار" },
      { en: "Braille Buttons", ar: "أزرار بطريقة برايل" },
      { en: "Floor & Direction Indicators", ar: "شاشات عرض الأدوار والاتجاهات" },
      { en: "Hall Lamps & Buzzer", ar: "مصابيح الوصول وأجراس التنبيه" },
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
      en: "High-speed roller guide shoes, heavy cast iron sliding guide shoes, counterweight shoes, and self-lubricating nylon liners.",
      ar: "كراسي توجيه دوارة للسرعات العالية، كراسي انزلاقية، كراسي ثقل الموازنة وبطانات نايلون ذاتية التزييت.",
    },
    icon: "Anchor",
    subcategories: [
      { en: "Sliding & Roller Guide Shoes", ar: "كراسي التوجيه المنزلقة والدوارة" },
      { en: "Adjustable Guide Shoes", ar: "كراسي توجيه قابلة للضبط" },
      { en: "Counterweight Shoes", ar: "كراسي ثقل الموازنة" },
      { en: "Inserts & Liners", ar: "بطانات كراسي التوجيه" },
    ],
  },
  {
    id: "safety-gear",
    slug: "safety-gear",
    name: {
      en: "Safety Gear & Governors",
      ar: "منظومة الأمان ومنظمات السرعة",
    },
    description: {
      en: "Bi-directional overspeed governors, progressive & instantaneous safety gears, weighted pit tension pulleys, and safety switches.",
      ar: "منظمات السرعة الزائدة ثنائية الاتجاه، أجهزة أمان تدريجية وفورية، بكرات شد قاع البئر ومفاتيح السلامة.",
    },
    icon: "ShieldAlert",
    subcategories: [
      { en: "Overspeed Governors", ar: "منظمات السرعة الزائدة" },
      { en: "Safety Gear (Progressive/Instant)", ar: "أجهزة الأمان التدريجية والفورية" },
      { en: "Governor Ropes & Pulleys", ar: "حبال وبكرات منظم السرعة" },
      { en: "Safety Switches", ar: "مفاتيح الأمان الكهربائية" },
    ],
  },
  {
    id: "wire-ropes",
    slug: "wire-ropes",
    name: {
      en: "Wire Ropes & Suspension",
      ar: "حبال الجر ومعدات التعليق",
    },
    description: {
      en: "Specialized elevator steel wire ropes (8x19, 6x19), governor cables, wedge sockets, clamps, and quiet compensation chains.",
      ar: "حبال جر فولاذية مجدولة معتمدة للمصاعد، حبال منظم السرعة، مرابط الحبال، وسلاسل تعويض هادئة.",
    },
    icon: "GitCommit",
    subcategories: [
      { en: "Steel Wire Ropes", ar: "حبال الجر الفولاذية" },
      { en: "Governor Ropes", ar: "حبال منظم السرعة" },
      { en: "Rope Sockets & Clamps", ar: "مرابط ومشابك تثبيت الحبال" },
      { en: "Compensation Chains & Ropes", ar: "سلاسل وأحبال التعويض" },
    ],
  },
  {
    id: "sensors-safety",
    slug: "sensors-safety",
    name: {
      en: "Sensors & Door Safety",
      ar: "حساسات السلامة وأجهزة الاستشعار",
    },
    description: {
      en: "Full-height infrared safety light curtains, terminal limit switches, inductive proximity leveling sensors, and door contacts.",
      ar: "ستائر ضوئية بالأشعة تحت الحمراء لكامل ارتفاع الباب، مفاتيح نهاية المشوار، حساسات التقارب ونقاط تلامس الأبواب.",
    },
    icon: "Scan",
    subcategories: [
      { en: "Light Curtains & Photocells", ar: "الستائر الضوئية والخلايا الكهروضوئية" },
      { en: "Limit Switches", ar: "مفاتيح نهاية المشوار" },
      { en: "Proximity Sensors", ar: "حساسات التقارب وضبط التوقف" },
      { en: "Door Contacts & Safety Edges", ar: "نقاط تلامس الأبواب وحواف الأمان" },
    ],
  },
  {
    id: "hydraulics",
    slug: "hydraulics",
    name: {
      en: "Hydraulic Components",
      ar: "مكونات المصاعد الهيدروليكية",
    },
    description: {
      en: "Submerged screw pumps, proportional hydraulic valve blocks, cylinders, high-pressure braided hoses, and sealing kits.",
      ar: "مضخات هيدروليكية غاطسة، بلوكات صمامات تناسبية، أسطوانات وخراطيم ضغط عالي وأطقم موانع تسريب.",
    },
    icon: "Droplets",
    subcategories: [
      { en: "Pumps & Power Units", ar: "مضخات ووحدات الطاقة الهيدروليكية" },
      { en: "Valves & Solenoids", ar: "صمامات التحكم والملفات الكهرومغناطيسية" },
      { en: "Cylinders & Hoses", ar: "الأسطوانات وخراطيم الضغط العالي" },
      { en: "Seals & Filters", ar: "موانع التسريب وفلاتر الزيت" },
    ],
  },
  {
    id: "shaft-components",
    slug: "shaft-components",
    name: {
      en: "Pit, Cabin & Shaft Equipment",
      ar: "تجهيزات البئر والكابينة الإضافية",
    },
    description: {
      en: "Hydraulic oil and polyurethane buffers, low-noise cabin cross-flow blowers, stainless handrails, mirrors, and anchor hardware.",
      ar: "مصدات هيدروليكية وبولي يوريثان لقاع البئر، مراوح تهوية هادئة، درابزينات ومرايا كابينة ومثبتات تركيب.",
    },
    icon: "Box",
    subcategories: [
      { en: "Buffers & Pit Equipment", ar: "المصدات وتجهيزات قاع البئر" },
      { en: "Cabin Fans & Lights", ar: "مراوح وتهوية الكابينة والإنارة" },
      { en: "Handrails & Mirrors", ar: "الدرابزينات والمرايا" },
      { en: "Fasteners & Installation Accessories", ar: "المثبتات ومستلزمات التركيب" },
    ],
  },
];
