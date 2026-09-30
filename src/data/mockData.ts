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
    description: 'Primary manufacturing & distribution center for Balloons, Animated Buckets, Ordinary Buckets, Bowls, PET Bottles, PET Packaging, and Heavy Storage Drums.',
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
    description: 'Specialized logistics hub for commercial 120L/240L wheelie bins, recycling units, pedal hospital bins, and heavy sanitation carts.',
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
    description: 'Northern & FCT distribution hub for event monobloc chairs, banquet tables, school desks, and stackable lounge armchairs.',
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
    description: 'Electrical extension boards, kitchen organizers, utility basins, and multi-compartment containers.',
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
    description: 'Perforated agro-crates, poultry transportation crates, tomato harvest boxes, and seedling trays.',
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
    description: 'UN-certified chemical carboys, reinforced containment pallets, and heavy fluid IBC totes.',
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
    description: 'High-density poly sacks, transparent merchandise packaging, and retail display racks.',
    defaultOpId: 'op-4',
    createdAt: '2026-02-01T08:00:00.000Z'
  }
];

export const INITIAL_SLM_UNITS: SLMUnit[] = [
  {
    id: 'op-1',
    code: 'OP-1',
    name: 'OP 1 - Heavy Storage & Drums',
    leadOfficer: 'Engr. Babatunde Lawal',
    contactPhone: '+234 803 112 3456',
    hubLocation: 'Hub 1 (Ikeja Depot - Floor Bay A1)',
    minStockAlertThreshold: 25,
    assignedCategories: ['Ordinary Buckets', 'Bowls', 'PET Bottles', 'PET Packaging', 'Plastic Products & Storage', 'Heavy Storage Drums & Tanks'],
    description: 'Specializes in chemical-grade drums, water dispensing tanks, ordinary buckets, basins, PET bottles & packaging.'
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
    description: 'Handles commercial 120L/240L wheelie bins, recycling bins, pedal hospital bins, and heavy sanitation carts.'
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
    description: 'Responsible for event monobloc chairs, banquet tables, school desks, and stackable lounge armchairs.'
  },
  {
    id: 'op-4',
    code: 'OP-4',
    name: 'OP 4 - Household Utilities & Electricals',
    leadOfficer: 'Amina Bello',
    contactPhone: '+234 809 331 4455',
    hubLocation: 'Hub 4 (Ikeja Depot - Floor Bay C2)',
    minStockAlertThreshold: 35,
    assignedCategories: ['Balloons', 'Animated Buckets', 'Electrical & Household Items', 'Retail & General Merchandise'],
    description: 'Manages balloons, animated printed buckets, surge extension boxes, kitchen organizers, and merchandise packaging.'
  }
];

export const INITIAL_CATEGORIES: Category[] = [
  // Hub 1 Categories
  {
    id: 'cat-h1-1',
    hubId: 'hub-1',
    name: 'Balloons',
    slug: 'balloons',
    iconName: 'Sparkles',
    description: 'Festive, event decorative, metallic, and commercial party polymer balloons.',
    itemCount: 14,
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=600&q=80',
    assignedOpId: 'op-4',
    status: 'active',
    createdAt: '2026-01-01T08:00:00.000Z'
  },
  {
    id: 'cat-h1-2',
    hubId: 'hub-1',
    name: 'Animated Buckets',
    slug: 'animated-buckets',
    iconName: 'Smile',
    description: 'Character-printed and decorative children water buckets with anti-crack flex polymer handles.',
    itemCount: 18,
    image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=600&q=80',
    assignedOpId: 'op-4',
    status: 'active',
    createdAt: '2026-01-01T08:00:00.000Z'
  },
  {
    id: 'cat-h1-3',
    hubId: 'hub-1',
    name: 'Ordinary Buckets',
    slug: 'ordinary-buckets',
    iconName: 'Boxes',
    description: 'Heavy-duty household laundry, cleaning, and multipurpose buckets with graduation marks.',
    itemCount: 26,
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=600&q=80',
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
    itemCount: 22,
    image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=600&q=80',
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
    itemCount: 35,
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
    assignedOpId: 'op-1',
    status: 'active',
    createdAt: '2026-01-01T08:00:00.000Z'
  },
  {
    id: 'cat-h1-6',
    hubId: 'hub-1',
    name: 'PET Packaging',
    slug: 'pet-packaging',
    iconName: 'ShoppingBag',
    description: 'Industrial clamshells, thermoformed trays, tamper-proof food containers, and merchandise jars.',
    itemCount: 30,
    image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=600&q=80',
    assignedOpId: 'op-1',
    status: 'active',
    createdAt: '2026-01-01T08:00:00.000Z'
  },
  {
    id: 'cat-h1-7',
    hubId: 'hub-1',
    name: 'Plastic Products & Storage',
    slug: 'plastic-products',
    iconName: 'Layers',
    description: 'Heavy duty drums, chemical carboys, storage containers, basins, buckets, and water tanks.',
    itemCount: 42,
    image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=600&q=80',
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
    description: '120L/240L mobile waste bins, pedal bins, recycling bins, and hospital clinical bins.',
    itemCount: 25,
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=600&q=80',
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
    description: 'Commercial stackable armchairs, bistro tables, school desks, and party event furniture.',
    itemCount: 19,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80',
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
    description: 'Surge extension boxes, rechargeable solar lamps, kitchen organizers, and electrical fittings.',
    itemCount: 28,
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80',
    assignedOpId: 'op-4',
    status: 'active',
    createdAt: '2026-01-15T08:00:00.000Z'
  },
  // Hub 5 Categories
  {
    id: 'cat-h5-1',
    hubId: 'hub-5',
    name: 'Agriculture & Harvesting Crates',
    slug: 'agriculture-crates',
    iconName: 'Truck',
    description: 'Heavy duty ventilated tomato crates, poultry transport crates, and seedling propagation trays.',
    itemCount: 16,
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
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
    description: 'UN-certified chemical carboys, reinforced containment pallets, and heavy fluid IBC totes.',
    itemCount: 12,
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
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
    description: 'High-density poly sacks, transparent merchandise packaging, and retail display racks.',
    itemCount: 35,
    image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=600&q=80',
    assignedOpId: 'op-4',
    status: 'active',
    createdAt: '2026-02-01T08:00:00.000Z'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  // Hub 1 Products
  {
    id: 'prod-h1-1',
    name: 'Pack of 100 Premium Metallic Party Balloons (Assorted Colors)',
    slug: 'pack-of-100-metallic-party-balloons',
    sku: 'IYN-BL-101',
    category: 'Balloons',
    categoryId: 'cat-h1-1',
    hubId: 'hub-1',
    hubName: 'Hub 1 - Heavy Polymer & Specialty Depot',
    slmId: 'slm-lagos',
    assignedOpId: 'op-4',
    warehouseLocation: 'Hub 1 Floor Bay A1 / Shelf 04',
    description: 'Durable, high-elasticity latex-polymer balloons suited for festive celebrations, wedding decor, and promotional events. Helium and air compatible.',
    basePrice: 6500,
    discountPrice: 5200,
    stockQuantity: 140,
    warehouseStock: 450,
    opStock: { 'op-1': 0, 'op-2': 0, 'op-3': 0, 'op-4': 140 },
    minAlertThreshold: 25,
    availability: 'in_stock',
    isPublished: true,
    isFeatured: true,
    isBestseller: true,
    rating: 4.9,
    reviewCount: 44,
    minBulkOrderQty: 10,
    bulkDiscountPercent: 15,
    images: [
      'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=800&q=80'
    ],
    specs: {
      'Pack Count': '100 Pieces',
      'Material': 'High Elasticity Polymer Latex',
      'Size': '12-Inch (Inflated)',
      'Inflation Compatibility': 'Air & Helium Compatible',
      'Origin': 'Hub 1 Specialty Line'
    },
    variants: [
      { id: 'v-bl-1', name: 'Metallic Gold & Silver / 100pcs', sku: 'IYN-BL-101-GLD', price: 5500, stock: 80 },
      { id: 'v-bl-2', name: 'Rainbow Multi-Color / 100pcs', sku: 'IYN-BL-101-RNB', price: 5200, stock: 60 }
    ]
  },
  {
    id: 'prod-h1-2',
    name: '15L Animated Character Children Water Bucket with Lid',
    slug: '15l-animated-character-bucket',
    sku: 'IYN-AB-201',
    category: 'Animated Buckets',
    categoryId: 'cat-h1-2',
    hubId: 'hub-1',
    hubName: 'Hub 1 - Heavy Polymer & Specialty Depot',
    slmId: 'slm-lagos',
    assignedOpId: 'op-4',
    warehouseLocation: 'Hub 1 Floor Bay A2 / Rack 02',
    description: 'Vibrant child-friendly water bucket with heat-transferred cartoon graphics, shatter-proof flexible polymer handle, and matching snap-on dust lid.',
    basePrice: 4800,
    discountPrice: 4200,
    stockQuantity: 95,
    warehouseStock: 300,
    opStock: { 'op-1': 0, 'op-2': 0, 'op-3': 0, 'op-4': 95 },
    minAlertThreshold: 20,
    availability: 'in_stock',
    isPublished: true,
    isFeatured: true,
    rating: 4.8,
    reviewCount: 31,
    minBulkOrderQty: 12,
    bulkDiscountPercent: 10,
    images: [
      'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80'
    ],
    specs: {
      'Capacity': '15 Litres',
      'Material': 'BPA-Free Virgin Polypropylene',
      'Graphic': 'Scratch-Proof Heat Seal Character Print',
      'Lid': 'Snap-Lock Dust Cover Included'
    },
    variants: [
      { id: 'v-ab-1', name: 'Cartoon Heroes (Royal Blue)', sku: 'IYN-AB-201-BLU', price: 4200, stock: 50 },
      { id: 'v-ab-2', name: 'Princess Magic (Coral Pink)', sku: 'IYN-AB-201-PNK', price: 4200, stock: 45 }
    ]
  },
  {
    id: 'prod-h1-3',
    name: '25L Heavy-Duty Ordinary Household Bucket with Steel Handle',
    slug: '25l-heavy-duty-ordinary-bucket',
    sku: 'IYN-OB-301',
    category: 'Ordinary Buckets',
    categoryId: 'cat-h1-3',
    hubId: 'hub-1',
    hubName: 'Hub 1 - Heavy Polymer & Specialty Depot',
    slmId: 'slm-lagos',
    assignedOpId: 'op-1',
    warehouseLocation: 'Hub 1 Central Storage Bay 01',
    description: 'Rugged thick-walled multipurpose utility bucket with anti-rust galvanized steel bail handle and ergonomic grip. Internal litre graduation scale.',
    basePrice: 5500,
    discountPrice: 4800,
    stockQuantity: 180,
    warehouseStock: 600,
    opStock: { 'op-1': 180, 'op-2': 0, 'op-3': 0, 'op-4': 0 },
    minAlertThreshold: 30,
    availability: 'in_stock',
    isPublished: true,
    isBestseller: true,
    rating: 4.9,
    reviewCount: 68,
    minBulkOrderQty: 20,
    bulkDiscountPercent: 12,
    images: [
      'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80'
    ],
    specs: {
      'Volume': '25 Litres',
      'Handle': 'Galvanized 5mm Steel with Poly Grip',
      'Wall Thickness': '2.8mm Impact Grade',
      'Graduation': 'Litre markings up to 25L'
    }
  },
  {
    id: 'prod-h1-4',
    name: 'Deep Poly Catering & Soaking Basin Bowl (45cm Diameter)',
    slug: 'deep-poly-catering-soaking-basin-bowl',
    sku: 'IYN-BW-401',
    category: 'Bowls',
    categoryId: 'cat-h1-4',
    hubId: 'hub-1',
    hubName: 'Hub 1 - Heavy Polymer & Specialty Depot',
    slmId: 'slm-lagos',
    assignedOpId: 'op-1',
    warehouseLocation: 'Hub 1 Central Storage Bay 02',
    description: 'Heavy gauge circular wash and catering bowl with wide rolled rim for sturdy lifting. Ideal for commercial kitchens, laundry, and food processing.',
    basePrice: 6200,
    discountPrice: 5400,
    stockQuantity: 125,
    warehouseStock: 380,
    opStock: { 'op-1': 125, 'op-2': 0, 'op-3': 0, 'op-4': 0 },
    minAlertThreshold: 20,
    availability: 'in_stock',
    isPublished: true,
    rating: 4.7,
    reviewCount: 39,
    minBulkOrderQty: 10,
    bulkDiscountPercent: 10,
    images: [
      'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80'
    ],
    specs: {
      'Diameter': '450mm (45cm)',
      'Depth': '220mm',
      'Capacity': '28 Litres',
      'Material': 'Virgin Food-Grade Polymer'
    }
  },
  {
    id: 'prod-h1-5',
    name: 'Pack of 50 Crystal Clear 500ml PET Juice Bottles with Tamper Caps',
    slug: 'pack-of-50-500ml-pet-bottles',
    sku: 'IYN-PET-501',
    category: 'PET Bottles',
    categoryId: 'cat-h1-5',
    hubId: 'hub-1',
    hubName: 'Hub 1 - Heavy Polymer & Specialty Depot',
    slmId: 'slm-lagos',
    assignedOpId: 'op-1',
    warehouseLocation: 'Hub 1 Preform & Blowmolding Bay P3',
    description: 'Food-grade 500ml clear PET bottles with 38mm neck finish and security ring tamper-evident caps. Standard for juice, zobo, tiger nut drink, and table water bottlers.',
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
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80'
    ],
    specs: {
      'Pack Size': '50 Bottles + 50 Caps',
      'Capacity': '500ml',
      'Neck Size': '38mm High-Seal',
      'Cap Type': 'Tamper-Evident Safety Ring',
      'Clarity': 'Ultra Clear Glass-Like Finish'
    }
  },
  {
    id: 'prod-h1-6',
    name: 'Pack of 100 Tamper-Proof PET Clamshell Food Packaging Containers',
    slug: 'pack-of-100-pet-clamshell-packaging',
    sku: 'IYN-PET-601',
    category: 'PET Packaging',
    categoryId: 'cat-h1-6',
    hubId: 'hub-1',
    hubName: 'Hub 1 - Heavy Polymer & Specialty Depot',
    slmId: 'slm-lagos',
    assignedOpId: 'op-1',
    warehouseLocation: 'Hub 1 Thermoforming Bay P4',
    description: 'Hinged transparent thermoformed PET food containers with airtight snap-lock closure. Perfect for bakeries, salad bars, fruit platters, and quick-service restaurant takeaways.',
    basePrice: 14500,
    discountPrice: 12800,
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
      'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80'
    ],
    specs: {
      'Pack Quantity': '100 Clamshell Units',
      'Dimensions': '200mm x 140mm x 75mm',
      'Material': '100% Recyclable Food-Grade PET',
      'Seal': 'Perimeter Snap-Tight Leak Barrier'
    }
  },
  {
    id: 'prod-h1-7',
    name: '50L Industrial Water Storage Drum with Dispensing Tap',
    slug: '50l-water-storage-drum',
    sku: 'IYN-PL-002',
    category: 'Plastic Products & Storage',
    categoryId: 'cat-h1-7',
    hubId: 'hub-1',
    hubName: 'Hub 1 - Heavy Polymer & Specialty Depot',
    slmId: 'slm-lagos',
    assignedOpId: 'op-1',
    warehouseLocation: 'Hub 1 Central Storage Bay 05',
    description: 'Food-grade leakproof plastic drum with durable brass/PVC tap fitting and screw-top sealed lid. Ideal for homes, eateries, laboratories, and borehole water dispensing.',
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
      'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80'
    ],
    specs: {
      'Volume': '50 Litres',
      'Tap': 'Reinforced Anti-Leak Dispenser Tap included',
      'Food Grade': 'Yes (BPA Free)',
      'Handles': 'Double Reinforced Side Grips'
    },
    variants: [
      { id: 'v2-1', name: 'Opaque White / 50L', sku: 'IYN-PL-002-WHT', price: 14500, stock: 70 },
      { id: 'v2-2', name: 'Sky Blue / 50L', sku: 'IYN-PL-002-BLU', price: 14500, stock: 40 }
    ]
  },

  // Hub 2 Products (Sanitation)
  {
    id: 'prod-h2-1',
    name: '120L Heavy-Duty Mobile Waste Bin with Wheels',
    slug: '120l-mobile-waste-bin',
    sku: 'IYN-PL-001',
    category: 'Waste Management & Sanitation',
    categoryId: 'cat-h2-1',
    hubId: 'hub-2',
    hubName: 'Hub 2 - Sanitation & Environmental Logistics',
    slmId: 'slm-lagos',
    assignedOpId: 'op-2',
    warehouseLocation: 'Hub 2 Floor Bay B3 / Lane 01',
    description: 'High-density polyethylene (HDPE) waste bin equipped with solid rubber wheels and reinforced pedal lid. UV-resistant and built for Nigerian weather and commercial compounds.',
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
      'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80'
    ],
    specs: {
      'Capacity': '120 Litres',
      'Material': '100% Virgin HDPE',
      'Dimensions': '930mm H x 480mm W x 550mm D',
      'Wheel Type': 'Solid Rubber Heavy Duty Axle'
    },
    variants: [
      { id: 'v1-1', name: 'Forest Green / 120L', sku: 'IYN-PL-001-GRN', price: 24900, stock: 45 },
      { id: 'v1-2', name: 'Royal Blue / 120L', sku: 'IYN-PL-001-BLU', price: 24900, stock: 25 },
      { id: 'v1-3', name: 'Industrial Black / 120L', sku: 'IYN-PL-001-BLK', price: 23500, stock: 15 }
    ]
  },

  // Hub 3 Products (Furniture)
  {
    id: 'prod-h3-1',
    name: 'Set of 6 Ergonomic Commercial Plastic Armchairs',
    slug: 'set-of-6-plastic-armchairs',
    sku: 'IYN-FN-003',
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
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80'
    ],
    specs: {
      'Weight Capacity': '180kg per Chair',
      'Stackability': 'Up to 25 Chairs High',
      'Material': 'Virgin Polypropylene with UV Inhibitors'
    }
  },

  // Hub 4 Products (Household & Electricals)
  {
    id: 'prod-h4-1',
    name: '6-Way Heavy-Duty Surge Protector Extension Box with 3m Cord',
    slug: '6-way-surge-protector-extension-box',
    sku: 'IYN-EL-004',
    category: 'Electrical & Household Items',
    categoryId: 'cat-h4-1',
    hubId: 'hub-4',
    hubName: 'Hub 4 - Household Utilities & Electricals',
    slmId: 'slm-lagos',
    assignedOpId: 'op-4',
    warehouseLocation: 'Hub 4 Floor Bay C2 / Shelf 10',
    description: 'Fire-retardant poly casing equipped with individual neon switches, master fuse overload trip breaker, and pure copper busbar conductor.',
    basePrice: 8500,
    discountPrice: 7200,
    stockQuantity: 120,
    warehouseStock: 400,
    opStock: { 'op-1': 0, 'op-2': 0, 'op-3': 0, 'op-4': 120 },
    minAlertThreshold: 35,
    availability: 'in_stock',
    isPublished: true,
    rating: 4.9,
    reviewCount: 88,
    minBulkOrderQty: 12,
    bulkDiscountPercent: 15,
    images: [
      'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80'
    ],
    specs: {
      'Cable Length': '3.0 Metres Heavy Duty Copper',
      'Max Load': '3250 Watts / 13A Max',
      'Surge Rating': '1050 Joules Overvoltage Protection'
    }
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
        productName: 'Pack of 50 Crystal Clear 500ml PET Juice Bottles with Tamper Caps',
        price: 8500,
        quantity: 10,
        image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
        hubId: 'hub-1',
        hubName: 'Hub 1 - Heavy Polymer & Specialty Depot',
        assignedOpId: 'op-1',
        assignedOpName: 'OP 1 - Heavy Storage & Drums',
        warehouseLocation: 'Hub 1 Blowmolding Bay P3',
        prepStatus: 'picked_and_packed',
        pickedAt: '2026-03-28T10:15:00.000Z',
        pickedBy: 'Lawal (OP-1)'
      },
      {
        productId: 'prod-h1-1',
        productName: 'Pack of 100 Premium Metallic Party Balloons (Assorted Colors)',
        variantName: 'Metallic Gold & Silver / 100pcs',
        price: 5500,
        quantity: 5,
        image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80',
        hubId: 'hub-1',
        hubName: 'Hub 1 - Heavy Polymer & Specialty Depot',
        assignedOpId: 'op-4',
        assignedOpName: 'OP 4 - Household Utilities & Electricals',
        warehouseLocation: 'Hub 1 Floor Bay A1 / Shelf 04',
        prepStatus: 'picked_and_packed',
        pickedAt: '2026-03-28T10:45:00.000Z',
        pickedBy: 'Amina (OP-4)'
      }
    ],
    subtotal: 112500,
    deliveryFee: 3500,
    totalAmount: 116000,
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
        productName: 'Set of 6 Ergonomic Commercial Plastic Armchairs',
        price: 47500,
        quantity: 4,
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
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
    opName: 'OP 1 - Heavy Storage & Drums',
    requesterName: 'Engr. Babatunde Lawal',
    urgency: 'customer_order_fulfillment',
    status: 'pending',
    items: [
      {
        productId: 'prod-h1-5',
        productName: 'Pack of 50 Crystal Clear 500ml PET Juice Bottles with Tamper Caps',
        sku: 'IYN-PET-501',
        requestedQty: 100,
        availableWarehouseStock: 800,
        unitPrice: 8500,
        image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80'
      }
    ],
    notes: 'Bulk bottling plant order scheduled for weekend dispatch. Immediate warehouse floor replenishment requested.',
    createdAt: '2026-03-29T08:00:00.000Z',
    updatedAt: '2026-03-29T08:00:00.000Z'
  },
  {
    id: 'req-102',
    requisitionNumber: 'REQ-2026-4408',
    opId: 'op-4',
    opName: 'OP 4 - Household Utilities & Electricals',
    requesterName: 'Amina Bello',
    urgency: 'routine',
    status: 'approved',
    items: [
      {
        productId: 'prod-h1-1',
        productName: 'Pack of 100 Premium Metallic Party Balloons (Assorted Colors)',
        sku: 'IYN-BL-101',
        requestedQty: 50,
        approvedQty: 50,
        availableWarehouseStock: 450,
        unitPrice: 5200,
        image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80'
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
    productName: 'Set of 6 Ergonomic Commercial Plastic Armchairs',
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
    lifetimeSpend: 116000,
    orderCount: 1,
    lastContactDate: '2026-03-28T09:30:00.000Z',
    interactions: [
      {
        id: 'int-1',
        timestamp: '2026-03-28T09:30:00.000Z',
        type: 'ticket',
        notes: 'Placed Order IYN-2026-8812 for PET Bottles & Balloons (₦116,000 paid).',
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
