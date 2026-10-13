import type { Product, Category, Hub, CRMLead, SupportTicket, Order, SLMUnit, GoodsRequisition, LowStockAlert } from '../types';

export const INITIAL_HUBS: Hub[] = [
  {
    id: 'hub-1',
    code: 'HUB-1',
    name: 'Hub 1 - Heavy Polymer & Specialty Depot',
    slmId: 'slm-lagos',
    location: 'Plot 12 Commercial Ave, Ikeja Industrial Estate, Lagos',
    managerName: 'Engr. Babatunde Lawal',
    contactPhone: '+234 803 112 3456',
    status: 'active',
    description: 'Primary manufacturing & distribution center for Calibrated Buckets, Ordinary Buckets, Bowls, PET Bottles, Packaging, and Heavy Storage Drums.',
    defaultOpId: 'op-1',
    createdAt: '2026-01-01T08:00:00.000Z'
  },
  {
    id: 'hub-2',
    code: 'HUB-2',
    name: 'Hub 2 - Sanitation & Environmental Logistics',
    slmId: 'slm-lagos',
    location: 'Ikeja Depot - Floor Bay B3, Lagos',
    managerName: 'Folake Adeleke',
    contactPhone: '+234 802 998 7766',
    status: 'active',
    description: 'Specialized logistics hub for commercial mobile waste bins, vintage dustbins, recycling units, and sanitation carts.',
    defaultOpId: 'op-2',
    createdAt: '2026-01-05T08:00:00.000Z'
  },
  {
    id: 'hub-3',
    code: 'HUB-3',
    name: 'Hub 3 - Commercial Furniture & Seating Hub',
    slmId: 'slm-abuja',
    location: 'Idu Industrial Layout Phase 2, Abuja FCT',
    managerName: 'Chinedu Eze',
    contactPhone: '+234 814 550 1289',
    status: 'active',
    description: 'Northern & FCT distribution hub for event monobloc chairs, banquet tables, school desks, and stackable armchairs.',
    defaultOpId: 'op-3',
    createdAt: '2026-01-10T08:00:00.000Z'
  },
  {
    id: 'hub-4',
    code: 'HUB-4',
    name: 'Hub 4 - Household Utilities & Electricals',
    slmId: 'slm-lagos',
    location: 'Ikeja Depot - Floor Bay C2, Lagos',
    managerName: 'Amina Bello',
    contactPhone: '+234 809 331 4455',
    status: 'active',
    description: 'Electrical extension boards, kitchen organizers, utility basins, water jugs, and glassware sets.',
    defaultOpId: 'op-4',
    createdAt: '2026-01-15T08:00:00.000Z'
  },
  {
    id: 'hub-5',
    code: 'HUB-5',
    name: 'Hub 5 - Agriculture & Harvesting Crates',
    slmId: 'slm-southwest',
    location: 'Ibadan Regional Logistics Warehouse, Oyo State',
    managerName: 'Rasheed Alabi',
    contactPhone: '+234 805 123 9988',
    status: 'active',
    description: 'Perforated agro-crates, poultry drinkers, chick feeders, tomato harvest boxes, and seedling trays.',
    defaultOpId: 'op-1',
    createdAt: '2026-01-20T08:00:00.000Z'
  },
  {
    id: 'hub-6',
    code: 'HUB-6',
    name: 'Hub 6 - Industrial Logistics & Chemical Carboys',
    slmId: 'slm-east',
    location: 'Trans-Amadi Industrial Layout, Port Harcourt, Rivers',
    managerName: 'Grace Nnamdi',
    contactPhone: '+234 818 443 2100',
    status: 'active',
    description: 'UN-certified chemical carboys, reinforced containment pallets, and heavy fluid 120L storage drums.',
    defaultOpId: 'op-1',
    createdAt: '2026-01-25T08:00:00.000Z'
  },
  {
    id: 'hub-7',
    code: 'HUB-7',
    name: 'Hub 7 - Retail Merchandise & Packaging Sacks',
    slmId: 'slm-north',
    location: 'Kano Commercial Center, Bompai Industrial Area, Kano',
    managerName: 'Musa Garba',
    contactPhone: '+234 803 776 5432',
    status: 'active',
    description: 'High-density poly sacks, transparent merchandise packaging, cosmetic jars, and retail display racks.',
    defaultOpId: 'op-4',
    createdAt: '2026-02-01T08:00:00.000Z'
  }
];

export const INITIAL_SLM_UNITS: SLMUnit[] = [
  {
    id: 'op-1',
    code: 'OP-1',
    name: 'OP 1 - Heavy Storage, Buckets & Polymer Drums',
    leadOfficer: 'Engr. Babatunde Lawal',
    contactPhone: '+234 803 112 3456',
    hubLocation: 'Hub 1 (Ikeja Depot - Floor Bay A1)',
    minStockAlertThreshold: 25,
    assignedCategories: [
      'Calibrated Buckets',
      'Ordinary Buckets',
      'Bowls',
      'PET Bottles',
      'Packaging Products',
      'Plastic Products & Storage Drums',
      'Agriculture & Harvesting Products',
      'Industrial Logistics & Chemical Carboys'
    ],
    description: 'Specializes in calibrated buckets, ordinary buckets, basins, 50L/60L/120L water storage drums, chemical carboys, PET bottles, and agricultural poultry equipment.'
  },
  {
    id: 'op-2',
    code: 'OP-2',
    name: 'OP 2 - Sanitation & Waste Management',
    leadOfficer: 'Folake Adeleke',
    contactPhone: '+234 802 998 7766',
    hubLocation: 'Hub 2 (Ikeja Depot - Floor Bay B3)',
    minStockAlertThreshold: 20,
    assignedCategories: ['Waste Management & Sanitation'],
    description: 'Handles commercial vintage dustbins, heavy waste bins, pedal sanitation bins, and clinical waste carts.'
  },
  {
    id: 'op-3',
    code: 'OP-3',
    name: 'OP 3 - Commercial Furniture & Seating',
    leadOfficer: 'Chinedu Eze',
    contactPhone: '+234 814 550 1289',
    hubLocation: 'Hub 3 (Idu Industrial Layout, Abuja & Ikeja Bay D)',
    minStockAlertThreshold: 30,
    assignedCategories: ['Durable Plastic Furniture'],
    description: 'Responsible for event monobloc armchairs, bistro tables, school desks, and stackable lounge seating.'
  },
  {
    id: 'op-4',
    code: 'OP-4',
    name: 'OP 4 - Household Utilities & Electricals',
    leadOfficer: 'Amina Bello',
    contactPhone: '+234 809 331 4455',
    hubLocation: 'Hub 4 (Ikeja Depot - Floor Bay C2)',
    minStockAlertThreshold: 35,
    assignedCategories: ['Electrical & Household Items', 'Retail Merchandise & Packaging Sacks'],
    description: 'Manages surge extension boxes, glassware sets, water jugs, kitchen organizers, and retail packaging containers.'
  }
];

export const INITIAL_CATEGORIES: Category[] = [
  // Hub 1 Categories
  {
    id: 'cat-h1-2',
    hubId: 'hub-1',
    name: 'Calibrated Buckets',
    slug: 'calibrated-buckets',
    iconName: 'Boxes',
    description: 'Heavy-duty calibrated household, laundry, and industrial-grade buckets with precision litre graduation marks. Includes Happy Family 5L, Kennygon, 11L, 15L, 21L, and 25L.',
    itemCount: 44,
    image: 'https://www.iyanuplasticstores.com/web/image/product.template/12333/image_512/%5BP124%5D%20P124%20-%2015L%20Bucket%20HF?unique=3fc1fe9',
    assignedOpId: 'op-1',
    status: 'active',
    createdAt: '2026-01-01T08:00:00.000Z'
  },
  {
    id: 'cat-h1-3',
    hubId: 'hub-1',
    name: 'Ordinary Buckets',
    slug: 'ordinary-buckets',
    iconName: 'Boxes',
    description: 'Everyday heavy-duty laundry, cleaning, and multipurpose household water buckets with anti-break handles.',
    itemCount: 38,
    image: 'https://www.iyanuplasticstores.com/web/image/product.template/12327/image_512/%5BP117%5D%20P117%20-%20Spiral%20Bucket%2015L%20VIK?unique=dea483c',
    assignedOpId: 'op-1',
    status: 'active',
    createdAt: '2026-01-01T08:00:00.000Z'
  },
  {
    id: 'cat-h1-4',
    hubId: 'hub-1',
    name: 'Bowls',
    slug: 'bowls',
    iconName: 'Circle',
    description: 'Extra-deep polymer washing, mixing, catering, and soaking basins with non-slip base grip.',
    itemCount: 195,
    image: 'https://www.iyanuplasticstores.com/web/image/product.template/24734/image_512/%5BCC46%5D%20CC46%20-%20Dome%20Basin%2020cm?unique=3553933',
    assignedOpId: 'op-1',
    status: 'active',
    createdAt: '2026-01-01T08:00:00.000Z'
  },
  {
    id: 'cat-h1-5',
    hubId: 'hub-1',
    name: 'PET Bottles',
    slug: 'pet-bottles',
    iconName: 'Package',
    description: 'Crystal-clear food grade PET preforms, juice bottles, beverage packaging, and dispenser containers.',
    itemCount: 32,
    image: 'https://www.iyanuplasticstores.com/web/image/product.template/24549/image_512/%5BA12%5D%20A12%20-%20Jojo%20500ml%20%2828mm-L%29%20x120%20%C2%B2%E2%81%B0?unique=b30f566',
    assignedOpId: 'op-1',
    status: 'active',
    createdAt: '2026-01-01T08:00:00.000Z'
  },
  {
    id: 'cat-h1-6',
    hubId: 'hub-1',
    name: 'Packaging Products',
    slug: 'packaging',
    iconName: 'ShoppingBag',
    description: 'Industrial clamshells, thermoformed trays, tamper-proof jars, and retail packaging containers.',
    itemCount: 30,
    image: 'https://www.iyanuplasticstores.com/web/image/product.template/24678/image_512/%5BB48%5D%20B48%20-%20Pioneer%20400ml?unique=ba01484',
    assignedOpId: 'op-1',
    status: 'active',
    createdAt: '2026-01-01T08:00:00.000Z'
  },
  {
    id: 'cat-h1-7',
    hubId: 'hub-1',
    name: 'Plastic Products & Storage Drums',
    slug: 'plastic-products',
    iconName: 'Layers',
    description: 'Heavy duty storage drums, water dispensing kegs, chemical containers, basins, and storage solutions.',
    itemCount: 1153,
    image: 'https://www.iyanuplasticstores.com/web/image/product.template/5109/image_512/%5BA123%5D%20A123%20-%20Keg%2050L%20SAC%2A%2A%2A?unique=f0c55a8',
    assignedOpId: 'op-1',
    status: 'active',
    createdAt: '2026-01-01T08:00:00.000Z'
  },
  // Hub 2 Categories
  {
    id: 'cat-h2-1',
    hubId: 'hub-2',
    name: 'Waste Management & Sanitation',
    slug: 'waste-management',
    iconName: 'Trash2',
    description: '120L & 240L mobile waste wheelie bins, vintage dustbins, recycling bins, and hospital clinical bins.',
    itemCount: 44,
    image: 'https://www.iyanuplasticstores.com/web/image/product.template/24032/image_512/%5BN105%5D%20N105%20-%20Vintage%20Dustbin%20%28B%29?unique=849c816',
    assignedOpId: 'op-2',
    status: 'active',
    createdAt: '2026-01-05T08:00:00.000Z'
  },
  // Hub 3 Categories
  {
    id: 'cat-h3-1',
    hubId: 'hub-3',
    name: 'Durable Plastic Furniture',
    slug: 'furniture',
    iconName: 'Armchair',
    description: 'Commercial stackable monobloc chairs, banquet tables, school desks, and outdoor armchairs.',
    itemCount: 57,
    image: 'https://www.iyanuplasticstores.com/web/image/product.template/24699/image_512/%5BC1%5D%20C1%20-%20Strong%20S%20Chair%2A%2A%2A?unique=f9246cb',
    assignedOpId: 'op-3',
    status: 'active',
    createdAt: '2026-01-10T08:00:00.000Z'
  },
  // Hub 4 Categories
  {
    id: 'cat-h4-1',
    hubId: 'hub-4',
    name: 'Electrical & Household Items',
    slug: 'electrical-household',
    iconName: 'Zap',
    description: 'Surge extension boxes, kitchen organizers, water jugs, glassware sets, and electrical fittings.',
    itemCount: 385,
    image: 'https://www.iyanuplasticstores.com/web/image/product.template/18540/image_512/%5BYY123%5D%20YY123%20-%20Wine%20Glass%20x6%20%5BES1002%5D?unique=8a1f5e8',
    assignedOpId: 'op-4',
    status: 'active',
    createdAt: '2026-01-15T08:00:00.000Z'
  },
  // Hub 5 Categories
  {
    id: 'cat-h5-1',
    hubId: 'hub-5',
    name: 'Agriculture & Harvesting Products',
    slug: 'agriculture-crates',
    iconName: 'Truck',
    description: 'Heavy-duty poultry drinkers, baby feeders, perforated agro harvest crates, and seedling propagation trays.',
    itemCount: 12,
    image: 'https://www.iyanuplasticstores.com/web/image/product.template/24186/image_512/%5BL2%5D%20L2%20-%2010L%20Drinker%20%2A%2A%2A?unique=b30f566',
    assignedOpId: 'op-1',
    status: 'active',
    createdAt: '2026-01-20T08:00:00.000Z'
  },
  // Hub 6 Categories
  {
    id: 'cat-h6-1',
    hubId: 'hub-6',
    name: 'Industrial Logistics & Chemical Carboys',
    slug: 'industrial-carboys',
    iconName: 'Layers',
    description: 'UN-certified chemical carboys, reinforced containment pallets, and heavy fluid 120L storage drums.',
    itemCount: 12,
    image: 'https://www.iyanuplasticstores.com/web/image/product.template/12384/image_512/%5BP203%5D%20P203%20-%20120L%20Drum%20OK.?unique=2c8df98',
    assignedOpId: 'op-1',
    status: 'active',
    createdAt: '2026-01-25T08:00:00.000Z'
  },
  // Hub 7 Categories
  {
    id: 'cat-h7-1',
    hubId: 'hub-7',
    name: 'Retail Merchandise & Packaging Sacks',
    slug: 'retail-sacks',
    iconName: 'ShoppingBag',
    description: 'High-density poly sacks, transparent merchandise packaging, cosmetic containers, and retail display racks.',
    itemCount: 29,
    image: 'https://www.iyanuplasticstores.com/web/image/product.template/11079/image_512/%5BH107%5D%20H107%20-%20Beauty%20100ml%20Pink%20Gold?unique=2c7a7d9',
    assignedOpId: 'op-4',
    status: 'active',
    createdAt: '2026-02-01T08:00:00.000Z'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  // 1. Calibrated Buckets - 15L Happy Family
  {
    id: 'prod-h1-2',
    name: 'P124 - 15L Calibrated Household Bucket HF with Lid',
    slug: '15l-calibrated-bucket-with-lid',
    sku: 'P124',
    category: 'Calibrated Buckets',
    categoryId: 'cat-h1-2',
    hubId: 'hub-1',
    hubName: 'Hub 1 - Heavy Polymer & Specialty Depot',
    slmId: 'slm-lagos',
    assignedOpId: 'op-1',
    warehouseLocation: 'Hub 1 Central Storage Bay 02',
    description: '15-litre multipurpose calibrated household bucket with precision litre graduation marks, ergonomic handle, and matching snap-on lid. Ideal for domestic, laundry, and commercial use.',
    basePrice: 3200,
    discountPrice: 2900,
    stockQuantity: 120,
    warehouseStock: 400,
    opStock: { 'op-1': 120, 'op-2': 0, 'op-3': 0, 'op-4': 0 },
    minAlertThreshold: 20,
    availability: 'in_stock',
    isPublished: true,
    isFeatured: true,
    isBestseller: true,
    rating: 4.8,
    reviewCount: 47,
    minBulkOrderQty: 12,
    bulkDiscountPercent: 10,
    images: [
      'https://www.iyanuplasticstores.com/web/image/product.template/12333/image_512/%5BP124%5D%20P124%20-%2015L%20Bucket%20HF?unique=3fc1fe9',
      'https://www.iyanuplasticstores.com/web/image/product.template/12325/image_512/%5BP107%5D%20P107%20-%2011L%20Bucket%20HF%20%C2%B2%E2%81%B4?unique=3fc1fe9'
    ],
    specs: {
      'Capacity': '15 Litres',
      'Material': 'BPA-Free Virgin Polypropylene',
      'Graduation': 'Precision litre markings up to 15L',
      'Lid': 'Snap-Lock Dust Cover Included'
    },
    variants: [
      { id: 'v-cb-1', name: '15L - Sky Blue', sku: 'P124-BLU', price: 2900, stock: 65 },
      { id: 'v-cb-2', name: '15L - Forest Green', sku: 'P124-GRN', price: 2900, stock: 55 }
    ]
  },

  // 2. Calibrated Buckets - 21L RDA
  {
    id: 'prod-h1-3',
    name: 'P201 - 21L Heavy-Duty Calibrated Industrial Bucket RDA',
    slug: '21l-calibrated-industrial-bucket',
    sku: 'P201',
    category: 'Calibrated Buckets',
    categoryId: 'cat-h1-2',
    hubId: 'hub-1',
    hubName: 'Hub 1 - Heavy Polymer & Specialty Depot',
    slmId: 'slm-lagos',
    assignedOpId: 'op-1',
    warehouseLocation: 'Hub 1 Central Storage Bay 01',
    description: 'Rugged thick-walled calibrated bucket with internal litre graduation scale and reinforced handle grip for commercial liquid handling.',
    basePrice: 5500,
    discountPrice: 4800,
    stockQuantity: 180,
    warehouseStock: 600,
    opStock: { 'op-1': 180, 'op-2': 0, 'op-3': 0, 'op-4': 0 },
    minAlertThreshold: 30,
    availability: 'in_stock',
    isPublished: true,
    isFeatured: true,
    isBestseller: true,
    rating: 4.9,
    reviewCount: 68,
    minBulkOrderQty: 20,
    bulkDiscountPercent: 12,
    images: [
      'https://www.iyanuplasticstores.com/web/image/product.template/12382/image_512/%5BP201%5D%20P201%20-%2021L%20Bucket%20RDA%20%C2%B9%C2%B2?unique=8ba886e',
      'https://www.iyanuplasticstores.com/web/image/product.template/12333/image_512/%5BP124%5D%20P124%20-%2015L%20Bucket%20HF?unique=3fc1fe9'
    ],
    specs: {
      'Volume': '21 Litres',
      'Handle': 'Galvanized 5mm Steel with Poly Grip',
      'Wall Thickness': '2.8mm Impact Grade',
      'Graduation': 'Precision litre markings up to 21L'
    }
  },

  // 3. Ordinary Buckets - 15L Spiral Bucket VIK
  {
    id: 'prod-h1-1',
    name: 'P117 - 15L Spiral Ordinary Utility Bucket VIK',
    slug: '15l-spiral-ordinary-bucket',
    sku: 'P117',
    category: 'Ordinary Buckets',
    categoryId: 'cat-h1-3',
    hubId: 'hub-1',
    hubName: 'Hub 1 - Heavy Polymer & Specialty Depot',
    slmId: 'slm-lagos',
    assignedOpId: 'op-1',
    warehouseLocation: 'Hub 1 Floor Bay A1 / Shelf 04',
    description: 'Durable everyday household, laundry, and cleaning bucket with ergonomic flex handle and reinforced base rim.',
    basePrice: 3500,
    discountPrice: 3100,
    stockQuantity: 140,
    warehouseStock: 450,
    opStock: { 'op-1': 140, 'op-2': 0, 'op-3': 0, 'op-4': 0 },
    minAlertThreshold: 25,
    availability: 'in_stock',
    isPublished: true,
    isFeatured: true,
    isBestseller: true,
    rating: 4.9,
    reviewCount: 44,
    minBulkOrderQty: 10,
    bulkDiscountPercent: 10,
    images: [
      'https://www.iyanuplasticstores.com/web/image/product.template/12327/image_512/%5BP117%5D%20P117%20-%20Spiral%20Bucket%2015L%20VIK?unique=dea483c',
      'https://www.iyanuplasticstores.com/web/image/product.template/24352/image_512/%5BP1%5D%20P1%20-%20Prince%20Bucket%207L?unique=7339414'
    ],
    specs: {
      'Capacity': '15 Litres',
      'Material': 'Virgin Polypropylene',
      'Handle': 'Anti-Crack Polymer Grip',
      'Design': 'Reinforced Spiral Ribs'
    }
  },

  // 4. Bowls - CC46 Dome Basin 20cm
  {
    id: 'prod-h1-4',
    name: 'CC46 - Deep Catering & Washing Dome Basin Bowl (45cm)',
    slug: 'deep-poly-catering-soaking-basin-bowl',
    sku: 'CC46',
    category: 'Bowls',
    categoryId: 'cat-h1-4',
    hubId: 'hub-1',
    hubName: 'Hub 1 - Heavy Polymer & Specialty Depot',
    slmId: 'slm-lagos',
    assignedOpId: 'op-1',
    warehouseLocation: 'Hub 1 Central Storage Bay 02',
    description: 'Heavy gauge circular wash and catering bowl with wide rolled rim for sturdy lifting. Ideal for commercial kitchens, laundry, and food processing.',
    basePrice: 6500,
    discountPrice: 5800,
    stockQuantity: 125,
    warehouseStock: 380,
    opStock: { 'op-1': 125, 'op-2': 0, 'op-3': 0, 'op-4': 0 },
    minAlertThreshold: 20,
    availability: 'in_stock',
    isPublished: true,
    isFeatured: true,
    rating: 4.7,
    reviewCount: 39,
    minBulkOrderQty: 10,
    bulkDiscountPercent: 10,
    images: [
      'https://www.iyanuplasticstores.com/web/image/product.template/24734/image_512/%5BCC46%5D%20CC46%20-%20Dome%20Basin%2020cm?unique=3553933',
      'https://www.iyanuplasticstores.com/web/image/product.template/13523/image_512/%5BH195%5D%20H195%20-%20Jelly%20Bowl%20x4?unique=bc39f2e'
    ],
    specs: {
      'Diameter': '450mm (45cm)',
      'Depth': '220mm',
      'Capacity': '28 Litres',
      'Material': 'Virgin Food-Grade Polymer'
    }
  },

  // 5. PET Bottles - A12 Jojo 500ml
  {
    id: 'prod-h1-5',
    name: 'A12 - Pack of 120 Food-Grade Jojo 500ml PET Bottles',
    slug: 'pack-of-120-500ml-pet-bottles',
    sku: 'A12',
    category: 'PET Bottles',
    categoryId: 'cat-h1-5',
    hubId: 'hub-1',
    hubName: 'Hub 1 - Heavy Polymer & Specialty Depot',
    slmId: 'slm-lagos',
    assignedOpId: 'op-1',
    warehouseLocation: 'Hub 1 Preform & Blowmolding Bay P3',
    description: 'Food-grade 500ml clear PET bottles with 28mm neck finish and security ring tamper-evident caps. Standard for juice, zobo, tiger nut drink, and table water bottlers.',
    basePrice: 9500,
    discountPrice: 8500,
    stockQuantity: 210,
    warehouseStock: 800,
    opStock: { 'op-1': 210, 'op-2': 0, 'op-3': 0, 'op-4': 0 },
    minAlertThreshold: 40,
    availability: 'in_stock',
    isPublished: true,
    isBestseller: true,
    rating: 4.9,
    reviewCount: 92,
    minBulkOrderQty: 5,
    bulkDiscountPercent: 12,
    images: [
      'https://www.iyanuplasticstores.com/web/image/product.template/24549/image_512/%5BA12%5D%20A12%20-%20Jojo%20500ml%20%2828mm-L%29%20x120%20%C2%B2%E2%81%B0?unique=b30f566',
      'https://www.iyanuplasticstores.com/web/image/product.template/24553/image_512/%5BA13%5D%20A13%20-%20Dettol%20200ml%20%2828mm-L%29%20x180%20%C2%B2%E2%81%B0?unique=a0ad8eb'
    ],
    specs: {
      'Pack Size': '120 Bottles + 120 Caps',
      'Volume': '500ml per Bottle',
      'Material': 'BPA-Free Food Grade Virgin PET',
      'Cap Type': '28mm Tamper-Evident Safety Ring'
    }
  },

  // 6. Packaging - B48 Pioneer 400ml
  {
    id: 'prod-h1-6',
    name: 'B48 - Pioneer 400ml Food Packaging Containers (Pack of 50)',
    slug: 'pioneer-400ml-packaging-jars',
    sku: 'B48',
    category: 'Packaging Products',
    categoryId: 'cat-h1-6',
    hubId: 'hub-1',
    hubName: 'Hub 1 - Heavy Polymer & Specialty Depot',
    slmId: 'slm-lagos',
    assignedOpId: 'op-1',
    warehouseLocation: 'Hub 1 Packaging Storage Bay 04',
    description: 'Thermoformed clear food containers with leak-tight airtight seal lids. Suitable for catering takeaway, spices, snacks, and condiments.',
    basePrice: 7500,
    discountPrice: 6600,
    stockQuantity: 160,
    warehouseStock: 500,
    opStock: { 'op-1': 160, 'op-2': 0, 'op-3': 0, 'op-4': 0 },
    minAlertThreshold: 30,
    availability: 'in_stock',
    isPublished: true,
    rating: 4.8,
    reviewCount: 54,
    minBulkOrderQty: 5,
    bulkDiscountPercent: 15,
    images: [
      'https://www.iyanuplasticstores.com/web/image/product.template/24678/image_512/%5BB48%5D%20B48%20-%20Pioneer%20400ml?unique=ba01484'
    ],
    specs: {
      'Pack Quantity': '50 Units with Lids',
      'Capacity': '400ml',
      'Microwave Safe': 'Yes (Up to 100°C)',
      'Seal Type': 'Airtight Snap-Lid'
    }
  },

  // 7. Storage Drums & Kegs - A123 Keg 50L
  {
    id: 'prod-h1-7',
    name: 'A123 - 50L Heavy-Duty Industrial Water Storage Drum & Keg',
    slug: '50l-water-storage-drum',
    sku: 'A123',
    category: 'Plastic Products & Storage Drums',
    categoryId: 'cat-h1-7',
    hubId: 'hub-1',
    hubName: 'Hub 1 - Heavy Polymer & Specialty Depot',
    slmId: 'slm-lagos',
    assignedOpId: 'op-1',
    warehouseLocation: 'Hub 1 Central Storage Bay 05',
    description: 'Food-grade leakproof plastic drum with durable dispensing tap and screw-top sealed lid. Ideal for homes, eateries, laboratories, and borehole water dispensing.',
    basePrice: 16500,
    discountPrice: 14500,
    stockQuantity: 110,
    warehouseStock: 350,
    opStock: { 'op-1': 110, 'op-2': 0, 'op-3': 0, 'op-4': 0 },
    minAlertThreshold: 25,
    availability: 'in_stock',
    isPublished: true,
    isFeatured: true,
    isBestseller: true,
    rating: 4.9,
    reviewCount: 52,
    minBulkOrderQty: 5,
    bulkDiscountPercent: 8,
    images: [
      'https://www.iyanuplasticstores.com/web/image/product.template/5109/image_512/%5BA123%5D%20A123%20-%20Keg%2050L%20SAC%2A%2A%2A?unique=f0c55a8',
      'https://www.iyanuplasticstores.com/web/image/product.template/23914/image_512/%5BP71%5D%20P71%20-%2060L%20Drum%20OK%2A%2A?unique=8ba886e',
      'https://www.iyanuplasticstores.com/web/image/product.template/12384/image_512/%5BP203%5D%20P203%20-%20120L%20Drum%20OK.?unique=2c8df98'
    ],
    specs: {
      'Volume': '50 Litres',
      'Fittings': 'Brass/PVC 1/2-Inch Tap Port Included',
      'Lid': 'Heavy Screw-Lock Airtight Ring Lid',
      'Handles': 'Molded Dual Carrying Handles'
    },
    variants: [
      { id: 'v2-1', name: 'Opaque White / 50L', sku: 'A123-WHT', price: 14500, stock: 70 },
      { id: 'v2-2', name: 'Sky Blue / 50L', sku: 'A123-BLU', price: 14500, stock: 40 }
    ]
  },

  // 8. Waste Management - N105 Vintage Dustbin
  {
    id: 'prod-h2-1',
    name: 'N105 - Heavy-Duty Vintage Dustbin & Sanitation Waste Bin (Large)',
    slug: 'vintage-sanitation-dustbin-large',
    sku: 'N105',
    category: 'Waste Management & Sanitation',
    categoryId: 'cat-h2-1',
    hubId: 'hub-2',
    hubName: 'Hub 2 - Sanitation & Environmental Logistics',
    slmId: 'slm-lagos',
    assignedOpId: 'op-2',
    warehouseLocation: 'Hub 2 Floor Bay B3 / Lane 01',
    description: 'High-density polyethylene (HDPE) sanitation dustbin equipped with fitted odor-lock lid and side carrying handles. UV-resistant and built for Nigerian weather and commercial compounds.',
    basePrice: 28500,
    discountPrice: 24900,
    stockQuantity: 85,
    warehouseStock: 240,
    opStock: { 'op-1': 0, 'op-2': 85, 'op-3': 0, 'op-4': 0 },
    minAlertThreshold: 20,
    availability: 'in_stock',
    isPublished: true,
    isFeatured: true,
    isBestseller: true,
    rating: 4.8,
    reviewCount: 38,
    minBulkOrderQty: 10,
    bulkDiscountPercent: 12,
    images: [
      'https://www.iyanuplasticstores.com/web/image/product.template/24032/image_512/%5BN105%5D%20N105%20-%20Vintage%20Dustbin%20%28B%29?unique=849c816',
      'https://www.iyanuplasticstores.com/web/image/product.template/24033/image_512/%5BN106%5D%20N106%20-%20Vintage%20Dustbin%20%28S%29?unique=849c816'
    ],
    specs: {
      'Capacity': '60-80 Litres Waste Capacity',
      'Material': 'UV-Stabilized High Impact HDPE',
      'Lid': 'Odor-Seal Contoured Lid',
      'Handles': 'Reinforced Side Grip Handles'
    },
    variants: [
      { id: 'v1-1', name: 'Forest Green', sku: 'N105-GRN', price: 24900, stock: 45 },
      { id: 'v1-2', name: 'Royal Blue', sku: 'N105-BLU', price: 24900, stock: 25 },
      { id: 'v1-3', name: 'Industrial Black', sku: 'N105-BLK', price: 23500, stock: 15 }
    ]
  },

  // 9. Furniture - C1 Strong S Chair
  {
    id: 'prod-h3-1',
    name: 'C1 - Strong S Commercial Monobloc Armchairs (Set of 6)',
    slug: 'set-of-6-plastic-armchairs',
    sku: 'C1',
    category: 'Durable Plastic Furniture',
    categoryId: 'cat-h3-1',
    hubId: 'hub-3',
    hubName: 'Hub 3 - Commercial Furniture & Seating Hub',
    slmId: 'slm-abuja',
    assignedOpId: 'op-3',
    warehouseLocation: 'Hub 3 Abuja Depot Bay D1',
    description: 'Heavy-duty stackable monobloc chairs capable of holding up to 180kg. Scratch resistant, weatherproof, and perfect for event rental businesses, churches, and outdoor lounges.',
    basePrice: 54000,
    discountPrice: 47500,
    stockQuantity: 34,
    warehouseStock: 180,
    opStock: { 'op-1': 0, 'op-2': 0, 'op-3': 34, 'op-4': 0 },
    minAlertThreshold: 30,
    availability: 'in_stock',
    isPublished: true,
    isFeatured: true,
    rating: 4.7,
    reviewCount: 29,
    minBulkOrderQty: 10,
    bulkDiscountPercent: 10,
    images: [
      'https://www.iyanuplasticstores.com/web/image/product.template/24699/image_512/%5BC1%5D%20C1%20-%20Strong%20S%20Chair%2A%2A%2A?unique=f9246cb',
      'https://www.iyanuplasticstores.com/web/image/product.template/10639/image_512/%5BC10%5D%20C10%20-%20Zico%20Chair%20OK%2A%2A%2A?unique=bb5090d',
      'https://www.iyanuplasticstores.com/web/image/product.template/10675/image_512/%5BC116%5D%20C116%20-%20Safari%20Table%2A%2A%2A?unique=e7b05e1'
    ],
    specs: {
      'Weight Capacity': '180kg per Chair',
      'Stackability': 'Up to 25 Chairs High',
      'Material': 'Virgin Polypropylene with UV Inhibitors',
      'Color Options': 'Pure White, Dark Wine, Royal Blue'
    }
  },

  // 10. Household & Electricals - YY123 Glassware & Extension Board
  {
    id: 'prod-h4-1',
    name: 'YY123 - Household Glassware Set x6 & Multi-Way Extension Board',
    slug: 'household-glassware-extension-set',
    sku: 'YY123',
    category: 'Electrical & Household Items',
    categoryId: 'cat-h4-1',
    hubId: 'hub-4',
    hubName: 'Hub 4 - Household Utilities & Electricals',
    slmId: 'slm-lagos',
    assignedOpId: 'op-4',
    warehouseLocation: 'Hub 4 Floor Bay C2 / Shelf 10',
    description: 'Household dining and utilities package including premium wine glassware set of 6 and heavy-duty copper busbar extension box.',
    basePrice: 8500,
    discountPrice: 7200,
    stockQuantity: 120,
    warehouseStock: 400,
    opStock: { 'op-1': 0, 'op-2': 0, 'op-3': 0, 'op-4': 120 },
    minAlertThreshold: 35,
    availability: 'in_stock',
    isPublished: true,
    isFeatured: true,
    rating: 4.9,
    reviewCount: 88,
    minBulkOrderQty: 12,
    bulkDiscountPercent: 15,
    images: [
      'https://www.iyanuplasticstores.com/web/image/product.template/18540/image_512/%5BYY123%5D%20YY123%20-%20Wine%20Glass%20x6%20%5BES1002%5D?unique=8a1f5e8',
      'https://www.iyanuplasticstores.com/web/image/product.template/24680/image_512/%5BB67%5D%20B67%20-%201.6L%20Water%20Jug%20%2A%2A%2A?unique=9c92852'
    ],
    specs: {
      'Glassware Count': '6 Wine Glasses (Lead-Free)',
      'Water Jug': '1.6L Food Grade Water Pitcher',
      'Casing Material': 'Impact Resistant Fire-Retardant Polymer'
    }
  },

  // 11. Agriculture - L2 10L Poultry Drinker
  {
    id: 'prod-h5-1',
    name: 'L2 - 10L Agro Poultry Drinker & Baby Feeder System',
    slug: '10l-poultry-drinker-feeder-system',
    sku: 'L2',
    category: 'Agriculture & Harvesting Products',
    categoryId: 'cat-h5-1',
    hubId: 'hub-5',
    hubName: 'Hub 5 - Agriculture & Harvesting Crates',
    slmId: 'slm-southwest',
    assignedOpId: 'op-1',
    warehouseLocation: 'Hub 5 Floor Bay E1',
    description: 'Automated gravity-feed 10L poultry drinker and chick feeding equipment. Impact-resistant polymer with anti-algae UV stabilization.',
    basePrice: 3500,
    discountPrice: 2900,
    stockQuantity: 95,
    warehouseStock: 320,
    opStock: { 'op-1': 95, 'op-2': 0, 'op-3': 0, 'op-4': 0 },
    minAlertThreshold: 20,
    availability: 'in_stock',
    isPublished: true,
    rating: 4.8,
    reviewCount: 22,
    minBulkOrderQty: 10,
    bulkDiscountPercent: 12,
    images: [
      'https://www.iyanuplasticstores.com/web/image/product.template/24186/image_512/%5BL2%5D%20L2%20-%2010L%20Drinker%20%2A%2A%2A?unique=b30f566',
      'https://www.iyanuplasticstores.com/web/image/product.template/24250/image_512/%5BB33%5D%20B33%20-%20Baby%20Feeder%20SAC?unique=3dc3a39'
    ],
    specs: {
      'Capacity': '10 Litres',
      'Application': 'Broiler, Layer & Poultry Farming',
      'Material': 'Virgin Food-Grade Polymer with UV Sunblock'
    }
  },

  // 12. Industrial Logistics - P203 120L Drum OK
  {
    id: 'prod-h6-1',
    name: 'P203 - 120L Heavy-Duty Industrial Fluid Drum with Sealed Lid',
    slug: '120l-industrial-fluid-drum',
    sku: 'P203',
    category: 'Industrial Logistics & Chemical Carboys',
    categoryId: 'cat-h6-1',
    hubId: 'hub-6',
    hubName: 'Hub 6 - Industrial Logistics & Chemical Carboys',
    slmId: 'slm-east',
    assignedOpId: 'op-1',
    warehouseLocation: 'Hub 6 Heavy Storage Yard',
    description: 'UN-certified heavy chemical and bulk water 120L storage drum. Seamless molding with heavy-duty rim handles and clamp ring lid.',
    basePrice: 13500,
    discountPrice: 11500,
    stockQuantity: 60,
    warehouseStock: 200,
    opStock: { 'op-1': 60, 'op-2': 0, 'op-3': 0, 'op-4': 0 },
    minAlertThreshold: 15,
    availability: 'in_stock',
    isPublished: true,
    rating: 4.9,
    reviewCount: 19,
    minBulkOrderQty: 5,
    bulkDiscountPercent: 10,
    images: [
      'https://www.iyanuplasticstores.com/web/image/product.template/12384/image_512/%5BP203%5D%20P203%20-%20120L%20Drum%20OK.?unique=2c8df98'
    ],
    specs: {
      'Capacity': '120 Litres',
      'Wall Thickness': '3.5mm Heavy Gauge HDPE',
      'Lid': 'Lever-Lock Ring Sealed Cover'
    }
  },

  // ── CALIBRATED BUCKETS ──────────────────────────────────────────────────────

  // 13. P107 - 11L Calibrated Household Bucket HF
  {
    id: 'prod-h1-8',
    name: 'P107 - 11L Calibrated Household Bucket HF',
    slug: '11l-calibrated-household-bucket-hf',
    sku: 'P107',
    category: 'Calibrated Buckets',
    categoryId: 'cat-h1-2',
    hubId: 'hub-1',
    hubName: 'Hub 1 - Heavy Polymer & Specialty Depot',
    slmId: 'slm-lagos',
    assignedOpId: 'op-1',
    warehouseLocation: 'Hub 1 Central Storage Bay 02',
    description: '11-litre calibrated household bucket with measurement graduation markings and ergonomic handle. Ideal for domestic cleaning, laundry, and storage.',
    basePrice: 2400,
    discountPrice: 2100,
    stockQuantity: 200,
    warehouseStock: 600,
    opStock: { 'op-1': 200, 'op-2': 0, 'op-3': 0, 'op-4': 0 },
    minAlertThreshold: 30,
    availability: 'in_stock',
    isPublished: true,
    isFeatured: false,
    isBestseller: true,
    rating: 4.7,
    reviewCount: 33,
    minBulkOrderQty: 12,
    bulkDiscountPercent: 10,
    images: [
      'https://www.iyanuplasticstores.com/web/image/product.template/12325/image_512/%5BP107%5D%20P107%20-%2011L%20Bucket%20HF%20%C2%B2%E2%81%B4?unique=3fc1fe9'
    ],
    specs: {
      'Capacity': '11 Litres',
      'Material': 'BPA-Free Virgin Polypropylene',
      'Graduation': 'Litre markings up to 11L',
      'Handle': 'Ergonomic Polymer Grip'
    }
  },

  // 14. P1 - Prince 7L Bucket
  {
    id: 'prod-h1-9',
    name: 'P1 - Prince 7L Lightweight Household Bucket',
    slug: 'prince-7l-household-bucket',
    sku: 'P1',
    category: 'Calibrated Buckets',
    categoryId: 'cat-h1-2',
    hubId: 'hub-1',
    hubName: 'Hub 1 - Heavy Polymer & Specialty Depot',
    slmId: 'slm-lagos',
    assignedOpId: 'op-1',
    warehouseLocation: 'Hub 1 Central Storage Bay 02',
    description: 'Compact 7-litre Prince bucket ideal for small household chores, children\'s bathing, mopping, and gardening. Lightweight yet durable.',
    basePrice: 1200,
    discountPrice: 990,
    stockQuantity: 350,
    warehouseStock: 900,
    opStock: { 'op-1': 350, 'op-2': 0, 'op-3': 0, 'op-4': 0 },
    minAlertThreshold: 50,
    availability: 'in_stock',
    isPublished: true,
    isBestseller: true,
    rating: 4.6,
    reviewCount: 61,
    minBulkOrderQty: 24,
    bulkDiscountPercent: 12,
    images: [
      'https://www.iyanuplasticstores.com/web/image/product.template/24352/image_512/%5BP1%5D%20P1%20-%20Prince%20Bucket%207L?unique=7339414'
    ],
    specs: {
      'Capacity': '7 Litres',
      'Material': 'Virgin Polypropylene',
      'Handle': 'Flexible Poly Loop Handle',
      'Use': 'Domestic, Children & Garden'
    }
  },

  // ── ORDINARY BUCKETS ─────────────────────────────────────────────────────────

  // 15. P71 - 60L Ordinary Heavy Drum Bucket
  {
    id: 'prod-h1-10',
    name: 'P71 - 60L Heavy-Duty Storage Drum Bucket',
    slug: '60l-heavy-storage-drum-bucket',
    sku: 'P71',
    category: 'Ordinary Buckets',
    categoryId: 'cat-h1-3',
    hubId: 'hub-1',
    hubName: 'Hub 1 - Heavy Polymer & Specialty Depot',
    slmId: 'slm-lagos',
    assignedOpId: 'op-1',
    warehouseLocation: 'Hub 1 Floor Bay A2',
    description: 'Extra-large 60L commercial storage drum bucket. Ideal for industrial water storage, paint mixing, chemical containment, and bulk processing.',
    basePrice: 7800,
    discountPrice: 6800,
    stockQuantity: 130,
    warehouseStock: 400,
    opStock: { 'op-1': 130, 'op-2': 0, 'op-3': 0, 'op-4': 0 },
    minAlertThreshold: 20,
    availability: 'in_stock',
    isPublished: true,
    isFeatured: true,
    rating: 4.8,
    reviewCount: 27,
    minBulkOrderQty: 5,
    bulkDiscountPercent: 8,
    images: [
      'https://www.iyanuplasticstores.com/web/image/product.template/23914/image_512/%5BP71%5D%20P71%20-%2060L%20Drum%20OK%2A%2A?unique=8ba886e'
    ],
    specs: {
      'Capacity': '60 Litres',
      'Material': 'High-Density Polyethylene (HDPE)',
      'Handle': 'Reinforced Wire + Grip',
      'Applications': 'Industrial / Commercial'
    }
  },

  // ── BOWLS ────────────────────────────────────────────────────────────────────

  // 16. H195 - Jelly Bowl x4 Set
  {
    id: 'prod-h1-11',
    name: 'H195 - Jelly Mixing & Serving Bowl Set (Pack of 4)',
    slug: 'jelly-mixing-serving-bowl-set-x4',
    sku: 'H195',
    category: 'Bowls',
    categoryId: 'cat-h1-4',
    hubId: 'hub-1',
    hubName: 'Hub 1 - Heavy Polymer & Specialty Depot',
    slmId: 'slm-lagos',
    assignedOpId: 'op-1',
    warehouseLocation: 'Hub 1 Central Storage Bay 02',
    description: 'Set of 4 vibrant-colored food-grade jelly bowls for catering, food prep, serving, and kitchen organization. Stackable and dishwasher safe.',
    basePrice: 3500,
    discountPrice: 2900,
    stockQuantity: 220,
    warehouseStock: 700,
    opStock: { 'op-1': 220, 'op-2': 0, 'op-3': 0, 'op-4': 0 },
    minAlertThreshold: 30,
    availability: 'in_stock',
    isPublished: true,
    isBestseller: true,
    rating: 4.8,
    reviewCount: 45,
    minBulkOrderQty: 12,
    bulkDiscountPercent: 10,
    images: [
      'https://www.iyanuplasticstores.com/web/image/product.template/13523/image_512/%5BH195%5D%20H195%20-%20Jelly%20Bowl%20x4?unique=bc39f2e'
    ],
    specs: {
      'Pack Quantity': '4 Bowls per Pack',
      'Material': 'Food-Grade Polypropylene',
      'Dishwasher Safe': 'Yes',
      'Stackable': 'Yes'
    }
  },

  // ── PET BOTTLES ──────────────────────────────────────────────────────────────

  // 17. A13 - Dettol 200ml PET Bottles x180
  {
    id: 'prod-h1-12',
    name: 'A13 - Dettol Style 200ml PET Bottles (Pack of 180)',
    slug: 'dettol-200ml-pet-bottles-x180',
    sku: 'A13',
    category: 'PET Bottles',
    categoryId: 'cat-h1-5',
    hubId: 'hub-1',
    hubName: 'Hub 1 - Heavy Polymer & Specialty Depot',
    slmId: 'slm-lagos',
    assignedOpId: 'op-1',
    warehouseLocation: 'Hub 1 Preform & Blowmolding Bay P3',
    description: '200ml food-grade amber PET bottles with 28mm tamper-evident caps. Perfect for antiseptics, sanitizers, syrups, and small-scale beverage packaging.',
    basePrice: 11500,
    discountPrice: 9800,
    stockQuantity: 180,
    warehouseStock: 600,
    opStock: { 'op-1': 180, 'op-2': 0, 'op-3': 0, 'op-4': 0 },
    minAlertThreshold: 30,
    availability: 'in_stock',
    isPublished: true,
    isBestseller: true,
    rating: 4.8,
    reviewCount: 74,
    minBulkOrderQty: 5,
    bulkDiscountPercent: 12,
    images: [
      'https://www.iyanuplasticstores.com/web/image/product.template/24553/image_512/%5BA13%5D%20A13%20-%20Dettol%20200ml%20%2828mm-L%29%20x180%20%C2%B2%E2%81%B0?unique=a0ad8eb'
    ],
    specs: {
      'Pack Size': '180 Bottles + 180 Caps',
      'Volume': '200ml per Bottle',
      'Material': 'BPA-Free Food Grade Virgin PET',
      'Cap Type': '28mm Tamper-Evident Safety Ring'
    }
  },

  // ── PACKAGING PRODUCTS ───────────────────────────────────────────────────────

  // 18. B67 - 1.6L Water Jug Packaging
  {
    id: 'prod-h1-13',
    name: 'B67 - 1.6L Crystal Clear Water Jug & Serving Pitcher',
    slug: '1-6l-crystal-water-jug-pitcher',
    sku: 'B67',
    category: 'Packaging Products',
    categoryId: 'cat-h1-6',
    hubId: 'hub-1',
    hubName: 'Hub 1 - Heavy Polymer & Specialty Depot',
    slmId: 'slm-lagos',
    assignedOpId: 'op-1',
    warehouseLocation: 'Hub 1 Packaging Storage Bay 04',
    description: 'Premium crystal-clear 1.6L serving jug with lid. Ideal for water, juice, zobo, and chapman service at events, restaurants, and homes. BPA-free and food-safe.',
    basePrice: 2800,
    discountPrice: 2300,
    stockQuantity: 280,
    warehouseStock: 850,
    opStock: { 'op-1': 280, 'op-2': 0, 'op-3': 0, 'op-4': 0 },
    minAlertThreshold: 40,
    availability: 'in_stock',
    isPublished: true,
    isFeatured: true,
    isBestseller: true,
    rating: 4.9,
    reviewCount: 88,
    minBulkOrderQty: 12,
    bulkDiscountPercent: 15,
    images: [
      'https://www.iyanuplasticstores.com/web/image/product.template/24680/image_512/%5BB67%5D%20B67%20-%201.6L%20Water%20Jug%20%2A%2A%2A?unique=9c92852'
    ],
    specs: {
      'Capacity': '1.6 Litres',
      'Material': 'Crystal BPA-Free Copolymer',
      'Lid': 'Snap Seal Pouring Lid',
      'Dishwasher Safe': 'Yes'
    },
    variants: [
      { id: 'v-b67-1', name: 'Crystal Clear', sku: 'B67-CLR', price: 2300, stock: 180 },
      { id: 'v-b67-2', name: 'Frosted White', sku: 'B67-WHT', price: 2300, stock: 100 }
    ]
  },

  // ── PLASTIC PRODUCTS & STORAGE DRUMS ─────────────────────────────────────────

  // 19. P71 60L Open Drum (Storage)
  {
    id: 'prod-h1-14',
    name: 'A200 - 25L Food-Grade Water Storage Keg with Tap',
    slug: '25l-food-grade-water-keg-with-tap',
    sku: 'A200',
    category: 'Plastic Products & Storage Drums',
    categoryId: 'cat-h1-7',
    hubId: 'hub-1',
    hubName: 'Hub 1 - Heavy Polymer & Specialty Depot',
    slmId: 'slm-lagos',
    assignedOpId: 'op-1',
    warehouseLocation: 'Hub 1 Central Storage Bay 05',
    description: 'Compact 25L food-grade plastic keg with dispensing tap port. Perfect for clean water storage in homes, offices, and remote locations.',
    basePrice: 8500,
    discountPrice: 7200,
    stockQuantity: 150,
    warehouseStock: 450,
    opStock: { 'op-1': 150, 'op-2': 0, 'op-3': 0, 'op-4': 0 },
    minAlertThreshold: 25,
    availability: 'in_stock',
    isPublished: true,
    isFeatured: true,
    rating: 4.8,
    reviewCount: 41,
    minBulkOrderQty: 5,
    bulkDiscountPercent: 10,
    images: [
      'https://www.iyanuplasticstores.com/web/image/product.template/5109/image_512/%5BA123%5D%20A123%20-%20Keg%2050L%20SAC%2A%2A%2A?unique=f0c55a8'
    ],
    specs: {
      'Volume': '25 Litres',
      'Fittings': 'PVC 1/2-Inch Tap Port',
      'Lid': 'Screw-Top Sealed Ring Lid',
      'Material': 'Food Grade HDPE'
    }
  },

  // ── WASTE MANAGEMENT & SANITATION ────────────────────────────────────────────

  // 20. N106 - Vintage Dustbin Small
  {
    id: 'prod-h2-2',
    name: 'N106 - Vintage Compact Sanitation Dustbin (Small)',
    slug: 'vintage-compact-sanitation-dustbin-small',
    sku: 'N106',
    category: 'Waste Management & Sanitation',
    categoryId: 'cat-h2-1',
    hubId: 'hub-2',
    hubName: 'Hub 2 - Sanitation & Environmental Logistics',
    slmId: 'slm-lagos',
    assignedOpId: 'op-2',
    warehouseLocation: 'Hub 2 Floor Bay B3 / Lane 02',
    description: 'Compact vintage-style sanitation dustbin with fitted lid. Perfect for office desks, kitchens, hotel rooms, and small outdoor spaces.',
    basePrice: 12500,
    discountPrice: 10500,
    stockQuantity: 120,
    warehouseStock: 380,
    opStock: { 'op-1': 0, 'op-2': 120, 'op-3': 0, 'op-4': 0 },
    minAlertThreshold: 20,
    availability: 'in_stock',
    isPublished: true,
    rating: 4.7,
    reviewCount: 25,
    minBulkOrderQty: 10,
    bulkDiscountPercent: 12,
    images: [
      'https://www.iyanuplasticstores.com/web/image/product.template/24033/image_512/%5BN106%5D%20N106%20-%20Vintage%20Dustbin%20%28S%29?unique=849c816'
    ],
    specs: {
      'Capacity': '25-30 Litres',
      'Material': 'UV-Stabilized HDPE',
      'Lid': 'Contoured Odor-Seal Lid',
      'Color Options': 'Green, Blue, Black, Red'
    }
  },

  // 21. 240L Mobile Wheelie Waste Bin
  {
    id: 'prod-h2-3',
    name: 'WB240 - 240L Commercial Mobile Wheelie Waste Bin',
    slug: '240l-commercial-mobile-wheelie-bin',
    sku: 'WB240',
    category: 'Waste Management & Sanitation',
    categoryId: 'cat-h2-1',
    hubId: 'hub-2',
    hubName: 'Hub 2 - Sanitation & Environmental Logistics',
    slmId: 'slm-lagos',
    assignedOpId: 'op-2',
    warehouseLocation: 'Hub 2 Floor Bay B3 / Lane 03',
    description: 'Heavy-duty 240L wheeled outdoor waste collection bin with hinged lid, 2 large rubber wheels, and ergonomic push bar. Standard for estates, offices, and commercial premises.',
    basePrice: 85000,
    discountPrice: 72000,
    stockQuantity: 45,
    warehouseStock: 120,
    opStock: { 'op-1': 0, 'op-2': 45, 'op-3': 0, 'op-4': 0 },
    minAlertThreshold: 10,
    availability: 'in_stock',
    isPublished: true,
    isFeatured: true,
    rating: 4.9,
    reviewCount: 18,
    minBulkOrderQty: 5,
    bulkDiscountPercent: 15,
    images: [
      'https://www.iyanuplasticstores.com/web/image/product.template/24032/image_512/%5BN105%5D%20N105%20-%20Vintage%20Dustbin%20%28B%29?unique=849c816'
    ],
    specs: {
      'Capacity': '240 Litres',
      'Wheels': '2 x 200mm Heavy-Duty Rubber',
      'Lid': 'Hinged Odor-Control Lid',
      'Material': 'Recycled & Virgin HDPE'
    }
  },

  // ── DURABLE PLASTIC FURNITURE ─────────────────────────────────────────────────

  // 22. C10 - Zico Stackable Chair
  {
    id: 'prod-h3-2',
    name: 'C10 - Zico Stackable Armchair (Single / Per Piece)',
    slug: 'zico-stackable-armchair',
    sku: 'C10',
    category: 'Durable Plastic Furniture',
    categoryId: 'cat-h3-1',
    hubId: 'hub-3',
    hubName: 'Hub 3 - Commercial Furniture & Seating Hub',
    slmId: 'slm-abuja',
    assignedOpId: 'op-3',
    warehouseLocation: 'Hub 3 Abuja Depot Bay D1',
    description: 'Premium ergonomic stackable Zico armchair with contoured backrest support. Ideal for offices, schools, event halls, and outdoor venues. Up to 120kg load.',
    basePrice: 9500,
    discountPrice: 8200,
    stockQuantity: 120,
    warehouseStock: 450,
    opStock: { 'op-1': 0, 'op-2': 0, 'op-3': 120, 'op-4': 0 },
    minAlertThreshold: 30,
    availability: 'in_stock',
    isPublished: true,
    isBestseller: true,
    rating: 4.8,
    reviewCount: 44,
    minBulkOrderQty: 10,
    bulkDiscountPercent: 10,
    images: [
      'https://www.iyanuplasticstores.com/web/image/product.template/10639/image_512/%5BC10%5D%20C10%20-%20Zico%20Chair%20OK%2A%2A%2A?unique=bb5090d'
    ],
    specs: {
      'Weight Capacity': '120kg',
      'Stackability': 'Up to 20 Chairs',
      'Material': 'Virgin Polypropylene',
      'Color Options': 'White, Black, Blue, Brown'
    },
    variants: [
      { id: 'v-c10-1', name: 'Pure White', sku: 'C10-WHT', price: 8200, stock: 60 },
      { id: 'v-c10-2', name: 'Jet Black', sku: 'C10-BLK', price: 8200, stock: 35 },
      { id: 'v-c10-3', name: 'Royal Blue', sku: 'C10-BLU', price: 8500, stock: 25 }
    ]
  },

  // 23. C116 - Safari Plastic Table
  {
    id: 'prod-h3-3',
    name: 'C116 - Safari Round Plastic Folding Table (1.2m)',
    slug: 'safari-round-plastic-folding-table',
    sku: 'C116',
    category: 'Durable Plastic Furniture',
    categoryId: 'cat-h3-1',
    hubId: 'hub-3',
    hubName: 'Hub 3 - Commercial Furniture & Seating Hub',
    slmId: 'slm-abuja',
    assignedOpId: 'op-3',
    warehouseLocation: 'Hub 3 Abuja Depot Bay D2',
    description: 'Durable 1.2m Safari round plastic table with steel-reinforced folding legs. Ideal for event hire businesses, banquets, restaurants, and conference halls.',
    basePrice: 32000,
    discountPrice: 28000,
    stockQuantity: 65,
    warehouseStock: 200,
    opStock: { 'op-1': 0, 'op-2': 0, 'op-3': 65, 'op-4': 0 },
    minAlertThreshold: 15,
    availability: 'in_stock',
    isPublished: true,
    isFeatured: true,
    rating: 4.7,
    reviewCount: 22,
    minBulkOrderQty: 5,
    bulkDiscountPercent: 10,
    images: [
      'https://www.iyanuplasticstores.com/web/image/product.template/10675/image_512/%5BC116%5D%20C116%20-%20Safari%20Table%2A%2A%2A?unique=e7b05e1'
    ],
    specs: {
      'Diameter': '1.2 Metres (120cm)',
      'Legs': 'Steel-Reinforced Folding',
      'Load Capacity': 'Up to 150kg',
      'Material': 'High-Impact Virgin Polypropylene'
    }
  },

  // ── ELECTRICAL & HOUSEHOLD ITEMS ──────────────────────────────────────────────

  // 24. B33 - Baby Feeder & Nursing Set
  {
    id: 'prod-h4-2',
    name: 'B33 - Baby Nursing Feeding Bottle Set (SAC Certified)',
    slug: 'baby-nursing-feeding-bottle-set',
    sku: 'B33',
    category: 'Electrical & Household Items',
    categoryId: 'cat-h4-1',
    hubId: 'hub-4',
    hubName: 'Hub 4 - Household Utilities & Electricals',
    slmId: 'slm-lagos',
    assignedOpId: 'op-4',
    warehouseLocation: 'Hub 4 Floor Bay C2 / Shelf 11',
    description: 'SAC-certified BPA-free baby nursing bottles. Heat-resistant borosilicate glass-equivalent PET with anti-colic nipple system and leak-proof cap.',
    basePrice: 3200,
    discountPrice: 2700,
    stockQuantity: 300,
    warehouseStock: 900,
    opStock: { 'op-1': 0, 'op-2': 0, 'op-3': 0, 'op-4': 300 },
    minAlertThreshold: 40,
    availability: 'in_stock',
    isPublished: true,
    isBestseller: true,
    rating: 4.9,
    reviewCount: 102,
    minBulkOrderQty: 12,
    bulkDiscountPercent: 15,
    images: [
      'https://www.iyanuplasticstores.com/web/image/product.template/24250/image_512/%5BB33%5D%20B33%20-%20Baby%20Feeder%20SAC?unique=3dc3a39'
    ],
    specs: {
      'Certification': 'SAC BPA-Free Safety Certified',
      'Capacity': '250ml / 8oz',
      'Nipple': 'Anti-Colic Silicone Nipple',
      'Heat Safe': 'Up to 120°C sterilization'
    }
  },

  // 25. H107 - Beauty 100ml Cosmetic Jar
  {
    id: 'prod-h4-3',
    name: 'H107 - Beauty 100ml Premium Cosmetic Cream Jar (Pink Gold)',
    slug: 'beauty-100ml-pink-gold-cosmetic-jar',
    sku: 'H107',
    category: 'Electrical & Household Items',
    categoryId: 'cat-h4-1',
    hubId: 'hub-4',
    hubName: 'Hub 4 - Household Utilities & Electricals',
    slmId: 'slm-lagos',
    assignedOpId: 'op-4',
    warehouseLocation: 'Hub 4 Floor Bay C2 / Shelf 12',
    description: 'Premium acrylic cosmetic jar with metallic pink-gold lid. Perfect for body butter, shea cream, whipped lotion, and homemade beauty product packaging.',
    basePrice: 1800,
    discountPrice: 1500,
    stockQuantity: 500,
    warehouseStock: 1500,
    opStock: { 'op-1': 0, 'op-2': 0, 'op-3': 0, 'op-4': 500 },
    minAlertThreshold: 60,
    availability: 'in_stock',
    isPublished: true,
    isFeatured: true,
    isBestseller: true,
    rating: 4.8,
    reviewCount: 136,
    minBulkOrderQty: 24,
    bulkDiscountPercent: 18,
    images: [
      'https://www.iyanuplasticstores.com/web/image/product.template/11079/image_512/%5BH107%5D%20H107%20-%20Beauty%20100ml%20Pink%20Gold?unique=2c7a7d9'
    ],
    specs: {
      'Volume': '100ml',
      'Material': 'Premium Crystal Acrylic',
      'Lid': 'Metallic Pink-Gold Screw Cap',
      'Applications': 'Body Butter, Cream, Lotion, Lip Scrub'
    },
    variants: [
      { id: 'v-h107-1', name: 'Pink Gold', sku: 'H107-PNK', price: 1500, stock: 300 },
      { id: 'v-h107-2', name: 'Silver Chrome', sku: 'H107-SLV', price: 1600, stock: 200 }
    ]
  },

  // ── AGRICULTURE & HARVESTING ─────────────────────────────────────────────────

  // 26. L3 - 5L Poultry Drinker
  {
    id: 'prod-h5-2',
    name: 'L3 - 5L Compact Poultry Drinker for Broilers & Chicks',
    slug: '5l-compact-poultry-drinker-broilers-chicks',
    sku: 'L3',
    category: 'Agriculture & Harvesting Products',
    categoryId: 'cat-h5-1',
    hubId: 'hub-5',
    hubName: 'Hub 5 - Agriculture & Harvesting Crates',
    slmId: 'slm-southwest',
    assignedOpId: 'op-1',
    warehouseLocation: 'Hub 5 Floor Bay E1',
    description: 'Compact 5-litre gravity-feed automatic poultry drinker. Designed for day-old chicks and broilers. UV-stabilized to prevent algae growth in water.',
    basePrice: 1800,
    discountPrice: 1500,
    stockQuantity: 350,
    warehouseStock: 1000,
    opStock: { 'op-1': 350, 'op-2': 0, 'op-3': 0, 'op-4': 0 },
    minAlertThreshold: 50,
    availability: 'in_stock',
    isPublished: true,
    isBestseller: true,
    rating: 4.9,
    reviewCount: 87,
    minBulkOrderQty: 20,
    bulkDiscountPercent: 15,
    images: [
      'https://www.iyanuplasticstores.com/web/image/product.template/24186/image_512/%5BL2%5D%20L2%20-%2010L%20Drinker%20%2A%2A%2A?unique=b30f566'
    ],
    specs: {
      'Capacity': '5 Litres',
      'Application': 'Day-old chicks, Broilers, Small Poultry',
      'Material': 'UV-Stabilized Food-Grade Polymer',
      'Feeding Tray': 'Integrated 360° Tray'
    }
  },

  // 27. AG10 - Harvest Agro Crate (Perforated)
  {
    id: 'prod-h5-3',
    name: 'AG10 - Heavy-Duty Perforated Agro Harvest Crate (50kg)',
    slug: 'heavy-duty-perforated-agro-harvest-crate',
    sku: 'AG10',
    category: 'Agriculture & Harvesting Products',
    categoryId: 'cat-h5-1',
    hubId: 'hub-5',
    hubName: 'Hub 5 - Agriculture & Harvesting Crates',
    slmId: 'slm-southwest',
    assignedOpId: 'op-1',
    warehouseLocation: 'Hub 5 Floor Bay E2',
    description: 'Industrial-grade perforated plastic agro crate for tomatoes, peppers, cassava, yam, and produce harvesting. Vented for air circulation. Stackable up to 8 crates.',
    basePrice: 7500,
    discountPrice: 6500,
    stockQuantity: 200,
    warehouseStock: 600,
    opStock: { 'op-1': 200, 'op-2': 0, 'op-3': 0, 'op-4': 0 },
    minAlertThreshold: 30,
    availability: 'in_stock',
    isPublished: true,
    isFeatured: true,
    rating: 4.8,
    reviewCount: 33,
    minBulkOrderQty: 10,
    bulkDiscountPercent: 12,
    images: [
      'https://www.iyanuplasticstores.com/web/image/product.template/24186/image_512/%5BL2%5D%20L2%20-%2010L%20Drinker%20%2A%2A%2A?unique=b30f566'
    ],
    specs: {
      'Load Capacity': '50kg',
      'Ventilation': 'Perforated All-Side Venting',
      'Stackability': 'Up to 8 Crates',
      'Material': 'High-Density Polyethylene (HDPE)'
    }
  },

  // ── INDUSTRIAL LOGISTICS & CARBOYS ───────────────────────────────────────────

  // 28. P203B - 60L Chemical Carboy Jerry Can
  {
    id: 'prod-h6-2',
    name: 'CJ60 - 60L UN-Certified Chemical Jerry Can Carboy',
    slug: '60l-un-certified-chemical-jerry-can-carboy',
    sku: 'CJ60',
    category: 'Industrial Logistics & Chemical Carboys',
    categoryId: 'cat-h6-1',
    hubId: 'hub-6',
    hubName: 'Hub 6 - Industrial Logistics & Chemical Carboys',
    slmId: 'slm-east',
    assignedOpId: 'op-1',
    warehouseLocation: 'Hub 6 Chemical Storage Zone B',
    description: 'UN-certified 60L chemical carboy jerry can for safe storage and transport of acids, solvents, bleach, chemicals, and industrial fluids. Fitted with vented anti-spill cap.',
    basePrice: 9500,
    discountPrice: 8200,
    stockQuantity: 80,
    warehouseStock: 250,
    opStock: { 'op-1': 80, 'op-2': 0, 'op-3': 0, 'op-4': 0 },
    minAlertThreshold: 15,
    availability: 'in_stock',
    isPublished: true,
    isFeatured: true,
    rating: 4.9,
    reviewCount: 14,
    minBulkOrderQty: 5,
    bulkDiscountPercent: 10,
    images: [
      'https://www.iyanuplasticstores.com/web/image/product.template/12384/image_512/%5BP203%5D%20P203%20-%20120L%20Drum%20OK.?unique=2c8df98'
    ],
    specs: {
      'Capacity': '60 Litres',
      'Certification': 'UN Certified for Hazardous Liquids',
      'Cap': 'Vented Anti-Spill Safety Cap',
      'Material': 'HDPE Chemical-Resistant Grade'
    }
  },

  // ── RETAIL MERCHANDISE & PACKAGING SACKS ────────────────────────────────────

  // 29. SK25 - 25kg Polypropylene Woven Sack
  {
    id: 'prod-h7-1',
    name: 'SK25 - 25kg Heavy-Duty Polypropylene Woven Sack (Bundle of 100)',
    slug: '25kg-polypropylene-woven-sack-bundle-100',
    sku: 'SK25',
    category: 'Retail Merchandise & Packaging Sacks',
    categoryId: 'cat-h7-1',
    hubId: 'hub-7',
    hubName: 'Hub 7 - Retail Merchandise & Packaging Sacks',
    slmId: 'slm-north',
    assignedOpId: 'op-4',
    warehouseLocation: 'Hub 7 Kano Depot Bay K1',
    description: 'Bundle of 100 heavy-duty virgin polypropylene woven sacks rated for 25kg capacity. Ideal for grains, flour, fertilizers, seeds, animal feed, and retail merchandise packaging.',
    basePrice: 18500,
    discountPrice: 15500,
    stockQuantity: 90,
    warehouseStock: 280,
    opStock: { 'op-1': 0, 'op-2': 0, 'op-3': 0, 'op-4': 90 },
    minAlertThreshold: 15,
    availability: 'in_stock',
    isPublished: true,
    isFeatured: true,
    rating: 4.7,
    reviewCount: 29,
    minBulkOrderQty: 5,
    bulkDiscountPercent: 12,
    images: [
      'https://www.iyanuplasticstores.com/web/image/product.template/11079/image_512/%5BH107%5D%20H107%20-%20Beauty%20100ml%20Pink%20Gold?unique=2c7a7d9'
    ],
    specs: {
      'Bundle Quantity': '100 Sacks',
      'Load Capacity': '25kg per Sack',
      'Material': 'Virgin Woven Polypropylene (PP)',
      'Applications': 'Grains, Fertilizer, Animal Feed'
    }
  },

  // 30. SK50 - 50kg Heavy-Duty Sack
  {
    id: 'prod-h7-2',
    name: 'SK50 - 50kg Heavy-Duty Polypropylene Woven Sack (Bundle of 50)',
    slug: '50kg-polypropylene-woven-sack-bundle-50',
    sku: 'SK50',
    category: 'Retail Merchandise & Packaging Sacks',
    categoryId: 'cat-h7-1',
    hubId: 'hub-7',
    hubName: 'Hub 7 - Retail Merchandise & Packaging Sacks',
    slmId: 'slm-north',
    assignedOpId: 'op-4',
    warehouseLocation: 'Hub 7 Kano Depot Bay K2',
    description: 'Bundle of 50 industrial-grade 50kg polypropylene woven sacks for bulk commodity packaging. UV-treated for outdoor storage resistance. Laminated inner lining available.',
    basePrice: 14500,
    discountPrice: 12000,
    stockQuantity: 70,
    warehouseStock: 220,
    opStock: { 'op-1': 0, 'op-2': 0, 'op-3': 0, 'op-4': 70 },
    minAlertThreshold: 12,
    availability: 'in_stock',
    isPublished: true,
    rating: 4.8,
    reviewCount: 22,
    minBulkOrderQty: 5,
    bulkDiscountPercent: 10,
    images: [
      'https://www.iyanuplasticstores.com/web/image/product.template/11079/image_512/%5BH107%5D%20H107%20-%20Beauty%20100ml%20Pink%20Gold?unique=2c7a7d9'
    ],
    specs: {
      'Bundle Quantity': '50 Sacks',
      'Load Capacity': '50kg per Sack',
      'Material': 'UV-Treated Woven Polypropylene',
      'Inner Lining': 'Optional Laminated PE Inner'
    }
  },

  // 31. H180 - Cosmetic Pump Bottle 500ml
  {
    id: 'prod-h7-3',
    name: 'H180 - 500ml Cosmetic Pump Dispenser Bottle (Lotion/Soap)',
    slug: '500ml-cosmetic-pump-dispenser-bottle',
    sku: 'H180',
    category: 'Retail Merchandise & Packaging Sacks',
    categoryId: 'cat-h7-1',
    hubId: 'hub-7',
    hubName: 'Hub 7 - Retail Merchandise & Packaging Sacks',
    slmId: 'slm-north',
    assignedOpId: 'op-4',
    warehouseLocation: 'Hub 7 Kano Depot Bay K3',
    description: 'Premium 500ml clear cosmetic pump dispenser bottle for liquid soap, lotion, serum, shampoo, and sanitizer. Stainless steel spring pump with adjustable lock-down head.',
    basePrice: 2200,
    discountPrice: 1800,
    stockQuantity: 450,
    warehouseStock: 1200,
    opStock: { 'op-1': 0, 'op-2': 0, 'op-3': 0, 'op-4': 450 },
    minAlertThreshold: 60,
    availability: 'in_stock',
    isPublished: true,
    isBestseller: true,
    rating: 4.8,
    reviewCount: 95,
    minBulkOrderQty: 24,
    bulkDiscountPercent: 18,
    images: [
      'https://www.iyanuplasticstores.com/web/image/product.template/11079/image_512/%5BH107%5D%20H107%20-%20Beauty%20100ml%20Pink%20Gold?unique=2c7a7d9'
    ],
    specs: {
      'Volume': '500ml',
      'Pump': 'Stainless Spring Lock-Down Pump',
      'Material': 'Premium Crystal PET',
      'Applications': 'Soap, Lotion, Sanitizer, Serum'
    },
    variants: [
      { id: 'v-h180-1', name: 'Crystal Clear', sku: 'H180-CLR', price: 1800, stock: 250 },
      { id: 'v-h180-2', name: 'Frosted White', sku: 'H180-WHT', price: 1900, stock: 200 }
    ]
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-101',
    orderNumber: 'IYN-2026-8812',
    customerId: 'cust-101',
    customerName: 'Chief Emmanuel Nwosu',
    customerEmail: 'nwosu.holdings@gmail.com',
    customerPhone: '+234 803 332 9988',
    items: [
      {
        productId: 'prod-h1-5',
        productName: 'A12 - Pack of 120 Food-Grade Jojo 500ml PET Bottles',
        price: 8500,
        quantity: 10,
        image: 'https://www.iyanuplasticstores.com/web/image/product.template/24549/image_512/%5BA12%5D%20A12%20-%20Jojo%20500ml%20%2828mm-L%29%20x120%20%C2%B2%E2%81%B0?unique=b30f566',
        hubId: 'hub-1',
        hubName: 'Hub 1 - Heavy Polymer & Specialty Depot',
        assignedOpId: 'op-1',
        assignedOpName: 'OP 1 - Heavy Storage, Buckets & Polymer Drums',
        warehouseLocation: 'Hub 1 Preform & Blowmolding Bay P3',
        prepStatus: 'picked_and_packed',
        pickedAt: '2026-03-28T10:15:00.000Z',
        pickedBy: 'Lawal (OP-1)'
      },
      {
        productId: 'prod-h1-2',
        productName: 'P124 - 15L Calibrated Household Bucket HF with Lid',
        variantName: '15L - Sky Blue',
        price: 2900,
        quantity: 10,
        image: 'https://www.iyanuplasticstores.com/web/image/product.template/12333/image_512/%5BP124%5D%20P124%20-%2015L%20Bucket%20HF?unique=3fc1fe9',
        hubId: 'hub-1',
        hubName: 'Hub 1 - Heavy Polymer & Specialty Depot',
        assignedOpId: 'op-1',
        assignedOpName: 'OP 1 - Heavy Storage, Buckets & Polymer Drums',
        warehouseLocation: 'Hub 1 Central Storage Bay 02',
        prepStatus: 'picked_and_packed',
        pickedAt: '2026-03-28T10:45:00.000Z',
        pickedBy: 'Lawal (OP-1)'
      }
    ],
    subtotal: 114000,
    deliveryFee: 3500,
    totalAmount: 117500,
    paymentStatus: 'paid',
    paymentGateway: 'paystack',
    paymentReference: 'PSTK_TX_981249120',
    orderStatus: 'ready_for_dispatch',
    deliveryAddress: {
      fullName: 'Chief Emmanuel Nwosu',
      email: 'nwosu.holdings@gmail.com',
      phone: '+234 803 332 9988',
      street: '14 Admiralty Way, Lekki Phase 1',
      city: 'Lagos Island',
      state: 'Lagos',
      deliveryNotes: 'Gate is black with golden eagle crest. Ring bell 2.'
    },
    carrierName: 'IYANU Express Fleet Truck #04',
    trackingNumber: 'IYN-TRK-772910',
    createdAt: '2026-03-28T09:30:00.000Z',
    estimatedDelivery: '2026-03-30T16:00:00.000Z'
  },
  {
    id: 'ord-102',
    orderNumber: 'IYN-2026-9045',
    customerId: 'cust-102',
    customerName: 'Hajiya Fatima Dangote',
    customerEmail: 'f.dangote@kannofoods.ng',
    customerPhone: '+234 802 998 1122',
    items: [
      {
        productId: 'prod-h3-1',
        productName: 'C1 - Strong S Commercial Monobloc Armchairs (Set of 6)',
        price: 47500,
        quantity: 4,
        image: 'https://www.iyanuplasticstores.com/web/image/product.template/24699/image_512/%5BC1%5D%20C1%20-%20Strong%20S%20Chair%2A%2A%2A?unique=f9246cb',
        hubId: 'hub-3',
        hubName: 'Hub 3 - Commercial Furniture & Seating Hub',
        assignedOpId: 'op-3',
        assignedOpName: 'OP 3 - Commercial Furniture & Seating',
        warehouseLocation: 'Hub 3 Abuja Depot Bay D1',
        prepStatus: 'pending_pick'
      }
    ],
    subtotal: 190000,
    deliveryFee: 12500,
    totalAmount: 202500,
    paymentStatus: 'paid',
    paymentGateway: 'flutterwave',
    paymentReference: 'FLW_TX_44091823',
    orderStatus: 'processing',
    deliveryAddress: {
      fullName: 'Hajiya Fatima Dangote',
      email: 'f.dangote@kannofoods.ng',
      phone: '+234 802 998 1122',
      street: 'Plot 402 Maitama District',
      city: 'Abuja Municipal',
      state: 'Abuja (FCT)'
    },
    carrierName: 'IYANU Interstate Haulage #12',
    trackingNumber: 'IYN-TRK-881203',
    createdAt: '2026-03-29T11:15:00.000Z',
    estimatedDelivery: '2026-03-31T14:00:00.000Z'
  }
];

export const INITIAL_REQUISITIONS: GoodsRequisition[] = [
  {
    id: 'req-101',
    requisitionNumber: 'REQ-2026-4410',
    opId: 'op-1',
    opName: 'OP 1 - Heavy Storage, Buckets & Polymer Drums',
    requesterName: 'Engr. Babatunde Lawal',
    urgency: 'customer_order_fulfillment',
    status: 'pending',
    items: [
      {
        productId: 'prod-h1-5',
        productName: 'A12 - Pack of 120 Food-Grade Jojo 500ml PET Bottles',
        sku: 'A12',
        requestedQty: 100,
        availableWarehouseStock: 800,
        unitPrice: 8500,
        image: 'https://www.iyanuplasticstores.com/web/image/product.template/24549/image_512/%5BA12%5D%20A12%20-%20Jojo%20500ml%20%2828mm-L%29%20x120%20%C2%B2%E2%81%B0?unique=b30f566'
      }
    ],
    notes: 'Bulk bottling plant order scheduled for weekend dispatch. Immediate warehouse floor replenishment requested.',
    createdAt: '2026-03-29T08:00:00.000Z',
    updatedAt: '2026-03-29T08:00:00.000Z'
  },
  {
    id: 'req-102',
    requisitionNumber: 'REQ-2026-4408',
    opId: 'op-1',
    opName: 'OP 1 - Heavy Storage, Buckets & Polymer Drums',
    requesterName: 'Engr. Babatunde Lawal',
    urgency: 'routine',
    status: 'approved',
    items: [
      {
        productId: 'prod-h1-2',
        productName: 'P124 - 15L Calibrated Household Bucket HF with Lid',
        sku: 'P124',
        requestedQty: 50,
        approvedQty: 50,
        availableWarehouseStock: 400,
        unitPrice: 2900,
        image: 'https://www.iyanuplasticstores.com/web/image/product.template/12333/image_512/%5BP124%5D%20P124%20-%2015L%20Bucket%20HF?unique=3fc1fe9'
      }
    ],
    notes: 'Routine weekly floor stock top-up for Ikeja retail outlet.',
    approvedBy: 'Chief Warehouse Officer Yakubu',
    approvedAt: '2026-03-28T14:20:00.000Z',
    createdAt: '2026-03-28T11:00:00.000Z',
    updatedAt: '2026-03-28T14:20:00.000Z'
  }
];

export const INITIAL_LOW_STOCK_ALERTS: LowStockAlert[] = [
  {
    id: 'lsa-1',
    productId: 'prod-h3-1',
    productName: 'C1 - Strong S Commercial Monobloc Armchairs (Set of 6)',
    opId: 'op-3',
    opName: 'OP 3 - Commercial Furniture & Seating',
    currentStock: 34,
    warehouseStock: 180,
    threshold: 30,
    createdAt: '2026-03-29T10:00:00.000Z',
    status: 'active'
  }
];

export const INITIAL_LEADS: CRMLead[] = [
  {
    id: 'lead-1',
    customerName: 'Chief Emmanuel Nwosu',
    businessName: 'Nwosu Beverage Bottling Industries',
    email: 'nwosu.holdings@gmail.com',
    phone: '+234 803 332 9988',
    state: 'Lagos',
    leadSource: 'Storefront',
    status: 'converted',
    estimatedValue: 850000,
    assignedStaff: 'Kester Igwe (Sales Lead)',
    notes: 'Major commercial bottling account purchasing 500ml PET preforms, bottles, and storage drums monthly.',
    lifetimeSpend: 117500,
    orderCount: 1,
    lastContactDate: '2026-03-28T09:30:00.000Z',
    interactions: [
      {
        id: 'int-1',
        timestamp: '2026-03-28T09:30:00.000Z',
        type: 'ticket',
        notes: 'Placed Order IYN-2026-8812 for PET Bottles & Calibrated Buckets (₦117,500 paid).',
        agentName: 'System Bot'
      }
    ]
  },
  {
    id: 'lead-2',
    customerName: 'Folashade Adeleke',
    businessName: 'Eko Grand Events & Rental Services',
    email: 'events@ekogrand.ng',
    phone: '+234 802 443 1122',
    state: 'Lagos',
    leadSource: 'WhatsApp Direct',
    status: 'negotiation',
    estimatedValue: 1200000,
    assignedStaff: 'Kemi Ojo (Operations Director)',
    notes: 'Inquiring for bulk wholesale order of 300 monobloc armchairs and 50 round banquet tables.',
    lifetimeSpend: 0,
    orderCount: 0,
    lastContactDate: '2026-03-29T12:00:00.000Z',
    interactions: [
      {
        id: 'int-2',
        timestamp: '2026-03-29T12:00:00.000Z',
        type: 'call',
        notes: 'Discussed 12% bulk discount tier and delivery to Victoria Island event center.',
        agentName: 'Kemi Ojo'
      }
    ]
  }
];

export const INITIAL_TICKETS: SupportTicket[] = [
  {
    id: 'tkt-1',
    ticketNumber: 'TKT-8901',
    customerId: 'cust-101',
    customerName: 'Chief Emmanuel Nwosu',
    customerPhone: '+234 803 332 9988',
    customerEmail: 'nwosu.holdings@gmail.com',
    orderNumber: 'IYN-2026-8812',
    subject: 'Request for scheduled afternoon delivery gate clearance',
    category: 'Delivery Delay',
    priority: 'medium',
    status: 'in_progress',
    assignedTo: 'Kester Igwe',
    createdAt: '2026-03-28T12:00:00.000Z',
    responseDeadline: '2026-03-28T14:00:00.000Z',
    resolutionDeadline: '2026-03-29T12:00:00.000Z',
    firstResponseAt: '2026-03-28T12:30:00.000Z',
    isBreached: false,
    messages: [
      {
        id: 'msg-1',
        sender: 'customer',
        senderName: 'Chief Emmanuel Nwosu',
        content: 'Please ensure driver arrives between 2pm - 4pm as security protocols require prior entry pass at Lekki Phase 1.',
        timestamp: '2026-03-28T12:00:00.000Z'
      },
      {
        id: 'msg-2',
        sender: 'staff',
        senderName: 'Kester Igwe',
        content: 'Noted with thanks, Chief. Driver assigned is Adeyemi (+234 803 990 1234) on Fleet Truck #04. Delivery window confirmed for 2:30pm.',
        timestamp: '2026-03-28T12:30:00.000Z'
      }
    ],
    history: [
      {
        id: 'log-1',
        timestamp: '2026-03-28T12:00:00.000Z',
        event: 'Ticket opened with [MEDIUM] SLA policy. Target 2h response.',
        performedBy: 'Customer Portal'
      },
      {
        id: 'log-2',
        timestamp: '2026-03-28T12:30:00.000Z',
        event: 'First Response SLA achieved in 30 minutes',
        performedBy: 'Kester Igwe'
      }
    ]
  }
];

export const NIGERIAN_STATES: string[] = [
  'Lagos',
  'Abuja (FCT)',
  'Ogun',
  'Oyo',
  'Rivers',
  'Kano',
  'Kaduna',
  'Anambra',
  'Enugu',
  'Delta',
  'Edo',
  'Ondo',
  'Osun',
  'Kwara',
  'Akwa Ibom',
  'Cross River',
  'Imo',
  'Abia',
  'Plateau',
  'Benue',
  'Niger',
  'Bauchi',
  'Borno',
  'Sokoto',
  'Katsina',
  'Adamawa',
  'Gombe',
  'Nasarawa',
  'Taraba',
  'Yobe',
  'Kebbi',
  'Zamfara',
  'Jigawa',
  'Ebonyi',
  'Ekiti',
  'Bayelsa',
  'Kogi'
];
