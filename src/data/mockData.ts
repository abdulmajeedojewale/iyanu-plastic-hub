import type { Product, Category, CRMLead, SupportTicket, Order, SLMUnit, GoodsRequisition, LowStockAlert } from '../types';

export const INITIAL_SLM_UNITS: SLMUnit[] = [
  {
    id: 'op-1',
    code: 'OP-1',
    name: 'OP 1 - Heavy Storage & Drums',
    leadOfficer: 'Engr. Babatunde Lawal',
    contactPhone: '+234 803 112 3456',
    hubLocation: 'Ikeja Depot - Floor Bay A1',
    minStockAlertThreshold: 25,
    assignedCategories: ['Plastic Products & Storage', 'Industrial & Bulk Logistics'],
    description: 'Specializes in chemical-grade drums, water dispensing tanks, industrial pallets, and heavy containment units.'
  },
  {
    id: 'op-2',
    code: 'OP-2',
    name: 'OP 2 - Sanitation & Waste Management',
    leadOfficer: 'Folake Adeleke',
    contactPhone: '+234 802 998 7766',
    hubLocation: 'Ikeja Depot - Floor Bay B3',
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
    hubLocation: 'Idu Industrial Layout, Abuja & Ikeja Bay D',
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
    hubLocation: 'Ikeja Depot - Floor Bay C2',
    minStockAlertThreshold: 35,
    assignedCategories: ['Electrical & Household Items', 'Retail & General Merchandise'],
    description: 'Manages surge extension boxes, kitchen organizers, basins, buckets, food containers, and merchandise packaging.'
  }
];

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    name: 'Plastic Products & Storage',
    slug: 'plastic-products',
    iconName: 'Boxes',
    description: 'Heavy duty drums, storage containers, basins, buckets, and water tanks.',
    itemCount: 42,
    image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=600&q=80',
    assignedOpId: 'op-1'
  },
  {
    id: 'cat-2',
    name: 'Waste Management & Sanitation',
    slug: 'waste-management',
    iconName: 'Trash2',
    description: '120L/240L mobile waste bins, pedal bins, recycling bins, and hospital bins.',
    itemCount: 25,
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=600&q=80',
    assignedOpId: 'op-2'
  },
  {
    id: 'cat-3',
    name: 'Durable Plastic Furniture',
    slug: 'furniture',
    iconName: 'Armchair',
    description: 'Commercial stackable armchairs, bistro tables, school desks, and party event furniture.',
    itemCount: 19,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80',
    assignedOpId: 'op-3'
  },
  {
    id: 'cat-4',
    name: 'Electrical & Household Items',
    slug: 'electrical-household',
    iconName: 'Zap',
    description: 'Surge extension boxes, rechargeable solar lamps, kitchen organizers, and electrical fittings.',
    itemCount: 28,
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80',
    assignedOpId: 'op-4'
  },
  {
    id: 'cat-5',
    name: 'Industrial & Bulk Logistics',
    slug: 'industrial-bulk',
    iconName: 'Truck',
    description: 'Heavy-duty industrial plastic pallets, chemical carboys, and warehouse sorting crates.',
    itemCount: 14,
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
    assignedOpId: 'op-1'
  },
  {
    id: 'cat-6',
    name: 'Retail & General Merchandise',
    slug: 'general-merchandise',
    iconName: 'ShoppingBag',
    description: 'Packaging sacks, heavy-duty cellophane, retail display hangers, and wholesale utilities.',
    itemCount: 35,
    image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=600&q=80',
    assignedOpId: 'op-4'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: '120L Heavy-Duty Mobile Waste Bin with Wheels',
    slug: '120l-mobile-waste-bin',
    sku: 'IYN-PL-001',
    category: 'Waste Management & Sanitation',
    description: 'High-density polyethylene (HDPE) waste bin equipped with solid rubber wheels and reinforced pedal lid. UV-resistant and built for Nigerian weather and commercial compounds.',
    basePrice: 28500,
    discountPrice: 24900,
    stockQuantity: 85,
    warehouseStock: 240,
    opStock: { 'op-1': 0, 'op-2': 85, 'op-3': 0, 'op-4': 0 },
    assignedOpId: 'op-2',
    minAlertThreshold: 20,
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
      'Material': '100% Virgin HDPE (High Density Polyethylene)',
      'Dimensions': '930mm H x 480mm W x 550mm D',
      'Wheel Type': 'Solid Rubber Heavy Duty Axle',
      'Origin': 'IYANU Certified Industrial Grade'
    },
    variants: [
      { id: 'v1-1', name: 'Forest Green / 120L', sku: 'IYN-PL-001-GRN', price: 24900, stock: 45 },
      { id: 'v1-2', name: 'Royal Blue / 120L', sku: 'IYN-PL-001-BLU', price: 24900, stock: 25 },
      { id: 'v1-3', name: 'Industrial Black / 120L', sku: 'IYN-PL-001-BLK', price: 23500, stock: 15 }
    ]
  },
  {
    id: 'prod-2',
    name: '50L Industrial Water Storage Drum with Dispensing Tap',
    slug: '50l-water-storage-drum',
    sku: 'IYN-PL-002',
    category: 'Plastic Products & Storage',
    description: 'Food-grade leakproof plastic drum with durable brass/PVC tap fitting and screw-top sealed lid. Ideal for homes, eateries, laboratories, and borehole water dispensing.',
    basePrice: 16500,
    discountPrice: 14500,
    stockQuantity: 110,
    warehouseStock: 350,
    opStock: { 'op-1': 110, 'op-2': 0, 'op-3': 0, 'op-4': 0 },
    assignedOpId: 'op-1',
    minAlertThreshold: 25,
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
  {
    id: 'prod-3',
    name: 'Set of 6 Ergonomic Commercial Plastic Armchairs',
    slug: 'set-of-6-plastic-armchairs',
    sku: 'IYN-FN-003',
    category: 'Durable Plastic Furniture',
    description: 'Heavy-duty stackable monobloc chairs capable of holding up to 180kg. Scratch resistant, weatherproof, and perfect for event rental businesses, churches, and outdoor lounges.',
    basePrice: 54000,
    discountPrice: 47500,
    stockQuantity: 34,
    warehouseStock: 180,
    opStock: { 'op-1': 0, 'op-2': 0, 'op-3': 34, 'op-4': 0 },
    assignedOpId: 'op-3',
    minAlertThreshold: 30,
    isFeatured: true,
    isBestseller: true,
    rating: 4.7,
    reviewCount: 29,
    minBulkOrderQty: 10,
    bulkDiscountPercent: 15,
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80'
    ],
    specs: {
      'Quantity': '6 Chairs per bundle',
      'Weight Capacity': '180 kg per seat',
      'Stackable': 'Up to 25 chairs vertically',
      'Finish': 'Matte Gloss with Anti-Slip Foot Pads'
    },
    variants: [
      { id: 'v3-1', name: 'Classic Ivory White (Pack of 6)', sku: 'IYN-FN-003-WHT', price: 47500, stock: 18 },
      { id: 'v3-2', name: 'Executive Dark Green (Pack of 6)', sku: 'IYN-FN-003-GRN', price: 47500, stock: 10 },
      { id: 'v3-3', name: 'Midnight Charcoal (Pack of 6)', sku: 'IYN-FN-003-BLK', price: 47500, stock: 6 }
    ]
  },
  {
    id: 'prod-4',
    name: '6-Way Heavy Duty Surge Extension Box with Individual Switches',
    slug: '6-way-heavy-duty-surge-extension',
    sku: 'IYN-EL-004',
    category: 'Electrical & Household Items',
    description: 'Pure copper wire 3-meter extension cord with over-voltage surge protector and neon LED indicators for each socket. Built for fluctuating Nigerian power lines.',
    basePrice: 9500,
    discountPrice: 7800,
    stockQuantity: 140,
    warehouseStock: 450,
    opStock: { 'op-1': 0, 'op-2': 0, 'op-3': 0, 'op-4': 140 },
    assignedOpId: 'op-4',
    minAlertThreshold: 35,
    isFeatured: false,
    isBestseller: true,
    rating: 4.9,
    reviewCount: 64,
    images: [
      'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80'
    ],
    specs: {
      'Cord Length': '3 Metres 100% Copper',
      'Max Power': '3250W 13A Rating',
      'Protection': 'Surge & Lightning arrester built-in',
      'Warranty': '1 Year IYANU Warranty'
    }
  },
  {
    id: 'prod-5',
    name: '4-Tier Multi-Purpose Kitchen Storage Organizer Trolley',
    slug: '4-tier-storage-organizer-trolley',
    sku: 'IYN-PL-005',
    category: 'Plastic Products & Storage',
    description: 'Breathable perforated plastic rack with 360-degree caster wheels. Excellent for kitchen yams, onions, fruits, bathroom toiletries, and office paperwork.',
    basePrice: 18000,
    discountPrice: 15200,
    stockQuantity: 62,
    warehouseStock: 200,
    opStock: { 'op-1': 62, 'op-2': 0, 'op-3': 0, 'op-4': 0 },
    assignedOpId: 'op-1',
    minAlertThreshold: 20,
    isFeatured: false,
    isBestseller: false,
    isNewArrival: true,
    rating: 4.6,
    reviewCount: 17,
    images: [
      'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80'
    ],
    specs: {
      'Tiers': '4 Deep Storage Baskets',
      'Mobility': '4 Heavy Duty Swivel Casters',
      'Assembly': 'Tool-Free 3-minute snap-lock'
    }
  },
  {
    id: 'prod-6',
    name: '240L Heavy-Duty Commercial Mobile Refuse Bin (Two Wheels)',
    slug: '240l-commercial-mobile-refuse-bin',
    sku: 'IYN-PL-006',
    category: 'Waste Management & Sanitation',
    description: 'Maximum capacity commercial waste bin designed for estates, shopping plazas, hospitals, and industrial parks. Compatible with standard hydraulic lifting trucks.',
    basePrice: 42000,
    discountPrice: 38500,
    stockQuantity: 48,
    warehouseStock: 160,
    opStock: { 'op-1': 0, 'op-2': 48, 'op-3': 0, 'op-4': 0 },
    assignedOpId: 'op-2',
    minAlertThreshold: 15,
    isFeatured: true,
    isBestseller: false,
    rating: 4.9,
    reviewCount: 22,
    minBulkOrderQty: 5,
    bulkDiscountPercent: 10,
    images: [
      'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80'
    ],
    specs: {
      'Capacity': '240 Litres Heavy Volume',
      'Max Load': '110 Kilograms',
      'Standard': 'DIN EN 840 Certified',
      'Lid': 'Heavy Duty Hermetic Smell-Seal'
    }
  },
  {
    id: 'prod-7',
    name: '12-Piece Stackable Airtight Food Grade Storage Containers Set',
    slug: '12-piece-airtight-food-containers-set',
    sku: 'IYN-PL-007',
    category: 'Electrical & Household Items',
    description: 'Microwave, dishwasher, and freezer-safe food preservation containers featuring 4-sided locking silicone seals. Eliminates weevils, moisture, and odors from flour, garri, and rice.',
    basePrice: 14000,
    discountPrice: 11900,
    stockQuantity: 95,
    warehouseStock: 300,
    opStock: { 'op-1': 0, 'op-2': 0, 'op-3': 0, 'op-4': 95 },
    assignedOpId: 'op-4',
    minAlertThreshold: 25,
    isFeatured: false,
    isBestseller: true,
    rating: 4.8,
    reviewCount: 41,
    images: [
      'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80'
    ],
    specs: {
      'Piece Count': '12 Containers + 12 Locking Lids',
      'Material': 'BPA-Free Clear Virgin Polypropylene',
      'Safety': 'Food-Grade Certified & Reusable'
    }
  },
  {
    id: 'prod-8',
    name: 'Industrial Heavy Duty Plastic Pallet (1200 x 1000mm)',
    slug: 'industrial-heavy-duty-plastic-pallet',
    sku: 'IYN-IND-008',
    category: 'Industrial & Bulk Logistics',
    description: 'Rackable virgin polymer pallet with 4-way forklift entry. Termite-proof, washable, and built for pharmaceutical, beverage, and warehouse logistics storage.',
    basePrice: 38000,
    discountPrice: 34000,
    stockQuantity: 55,
    warehouseStock: 220,
    opStock: { 'op-1': 55, 'op-2': 0, 'op-3': 0, 'op-4': 0 },
    assignedOpId: 'op-1',
    minAlertThreshold: 20,
    isFeatured: true,
    isBestseller: false,
    rating: 4.9,
    reviewCount: 19,
    minBulkOrderQty: 20,
    bulkDiscountPercent: 18,
    images: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80'
    ],
    specs: {
      'Static Load': '4000 kg',
      'Dynamic Load': '1500 kg',
      'Racking Load': '1000 kg',
      'Entry': '4-Way Forklift & Manual Pallet Jack'
    }
  }
];

export const INITIAL_REQUISITIONS: GoodsRequisition[] = [
  {
    id: 'req-001',
    requisitionNumber: 'REQ-2026-0089',
    opId: 'op-3',
    opName: 'OP 3 - Commercial Furniture & Seating',
    requesterName: 'Chinedu Eze (OP 3 Supervisor)',
    urgency: 'urgent',
    status: 'in_preparation',
    notes: 'Urgent stock replenishment requested for upcoming weekend event orders. 50 units required.',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    approvedBy: 'Chief Warehouse Officer Yakubu',
    approvedAt: new Date(Date.now() - 3600000 * 3).toISOString(),
    items: [
      {
        productId: 'prod-3',
        productName: 'Set of 6 Ergonomic Commercial Plastic Armchairs',
        sku: 'IYN-FN-003',
        requestedQty: 50,
        approvedQty: 50,
        availableWarehouseStock: 180,
        unitPrice: 47500,
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=400&q=80'
      }
    ]
  },
  {
    id: 'req-002',
    requisitionNumber: 'REQ-2026-0090',
    opId: 'op-1',
    opName: 'OP 1 - Heavy Storage & Drums',
    requesterName: 'Engr. Babatunde Lawal',
    urgency: 'critical_low_stock',
    status: 'pending',
    notes: 'Floor stock for 50L drums dropped below 20 units. Requisitioning 30 units from central store.',
    createdAt: new Date(Date.now() - 3600000 * 1.5).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 1.5).toISOString(),
    items: [
      {
        productId: 'prod-2',
        productName: '50L Industrial Water Storage Drum with Dispensing Tap',
        sku: 'IYN-PL-002',
        requestedQty: 30,
        availableWarehouseStock: 350,
        unitPrice: 14500,
        image: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=400&q=80'
      }
    ]
  },
  {
    id: 'req-003',
    requisitionNumber: 'REQ-2026-0085',
    opId: 'op-2',
    opName: 'OP 2 - Sanitation & Waste Management',
    requesterName: 'Folake Adeleke',
    urgency: 'customer_order_fulfillment',
    status: 'received_completed',
    notes: 'Requisition fulfilled and floor stock updated for municipal health tender.',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    approvedBy: 'Chief Warehouse Officer Yakubu',
    approvedAt: new Date(Date.now() - 3600000 * 36).toISOString(),
    dispatchedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    receivedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    items: [
      {
        productId: 'prod-1',
        productName: '120L Heavy-Duty Mobile Waste Bin with Wheels',
        sku: 'IYN-PL-001',
        requestedQty: 40,
        approvedQty: 40,
        availableWarehouseStock: 240,
        unitPrice: 24900,
        image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=400&q=80'
      }
    ]
  },
  {
    id: 'req-004',
    requisitionNumber: 'REQ-2026-0091',
    opId: 'op-4',
    opName: 'OP 4 - Household Utilities & Electricals',
    requesterName: 'Amina Bello',
    urgency: 'routine',
    status: 'dispatched_to_op',
    notes: 'Transfer in progress from Ikeja Central Warehouse to Bay C2 floor.',
    createdAt: new Date(Date.now() - 3600000 * 6).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 1).toISOString(),
    approvedBy: 'Chief Warehouse Officer Yakubu',
    approvedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    dispatchedAt: new Date(Date.now() - 3600000 * 1).toISOString(),
    items: [
      {
        productId: 'prod-4',
        productName: '6-Way Heavy Duty Surge Extension Box with Individual Switches',
        sku: 'IYN-EL-004',
        requestedQty: 60,
        approvedQty: 60,
        availableWarehouseStock: 450,
        unitPrice: 7800,
        image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=400&q=80'
      }
    ]
  }
];

export const INITIAL_LOW_STOCK_ALERTS: LowStockAlert[] = [
  {
    id: 'lsa-1',
    productId: 'prod-3',
    productName: 'Set of 6 Ergonomic Commercial Plastic Armchairs',
    opId: 'op-3',
    opName: 'OP 3 - Commercial Furniture & Seating',
    currentStock: 34,
    warehouseStock: 180,
    threshold: 30,
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    status: 'requisition_created'
  },
  {
    id: 'lsa-2',
    productId: 'prod-2',
    productName: '50L Industrial Water Storage Drum with Dispensing Tap',
    opId: 'op-1',
    opName: 'OP 1 - Heavy Storage & Drums',
    currentStock: 18,
    warehouseStock: 350,
    threshold: 25,
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    status: 'active'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-101',
    orderNumber: 'IYN-2026-0842',
    customerId: 'cust-1',
    customerName: 'Chief Emeka Okafor',
    customerEmail: 'emeka.okafor@primeventures.ng',
    customerPhone: '+234 803 456 7890',
    items: [
      {
        productId: 'prod-1',
        productName: '120L Heavy-Duty Mobile Waste Bin with Wheels',
        variantName: 'Forest Green / 120L',
        price: 24900,
        quantity: 12,
        image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=400&q=80',
        assignedOpId: 'op-2',
        assignedOpName: 'OP 2 - Sanitation & Waste Management',
        prepStatus: 'picked_and_packed',
        pickedAt: new Date(Date.now() - 3600000 * 3).toISOString(),
        pickedBy: 'Folake Adeleke (OP 2)'
      },
      {
        productId: 'prod-2',
        productName: '50L Industrial Water Storage Drum with Dispensing Tap',
        variantName: 'Opaque White / 50L',
        price: 14500,
        quantity: 5,
        image: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=400&q=80',
        assignedOpId: 'op-1',
        assignedOpName: 'OP 1 - Heavy Storage & Drums',
        prepStatus: 'picked_and_packed',
        pickedAt: new Date(Date.now() - 3600000 * 2.5).toISOString(),
        pickedBy: 'Engr. Babatunde Lawal (OP 1)'
      }
    ],
    subtotal: 371300,
    deliveryFee: 15000,
    totalAmount: 386300,
    paymentStatus: 'paid',
    paymentGateway: 'paystack',
    paymentReference: 'PSTK_REF_991823101',
    orderStatus: 'shipped',
    deliveryAddress: {
      fullName: 'Chief Emeka Okafor',
      email: 'emeka.okafor@primeventures.ng',
      phone: '+234 803 456 7890',
      street: '14 Admiralty Way, Lekki Phase 1',
      city: 'Lagos',
      state: 'Lagos',
      deliveryNotes: 'Please ring the intercom at Gate 2. Forklift on site for offloading.'
    },
    carrierName: 'IYANU Fleet Logistics (Van 04)',
    trackingNumber: 'IYN-EXP-889102-NG',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    estimatedDelivery: new Date(Date.now() + 3600000 * 20).toISOString()
  },
  {
    id: 'ord-102',
    orderNumber: 'IYN-2026-0841',
    customerId: 'cust-2',
    customerName: 'Hajiya Fatima Al-Hassan',
    customerEmail: 'fatima.hassan@abujagardens.com',
    customerPhone: '+234 802 331 4455',
    items: [
      {
        productId: 'prod-3',
        productName: 'Set of 6 Ergonomic Commercial Plastic Armchairs',
        variantName: 'Classic Ivory White (Pack of 6)',
        price: 47500,
        quantity: 8,
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=400&q=80',
        assignedOpId: 'op-3',
        assignedOpName: 'OP 3 - Commercial Furniture & Seating',
        prepStatus: 'ready_for_dispatch',
        pickedAt: new Date(Date.now() - 3600000 * 18).toISOString(),
        pickedBy: 'Chinedu Eze (OP 3)'
      }
    ],
    subtotal: 380000,
    deliveryFee: 20000,
    totalAmount: 400000,
    paymentStatus: 'paid',
    paymentGateway: 'flutterwave',
    paymentReference: 'FLW_MOCK_881920',
    orderStatus: 'processing',
    deliveryAddress: {
      fullName: 'Hajiya Fatima Al-Hassan',
      email: 'fatima.hassan@abujagardens.com',
      phone: '+234 802 331 4455',
      street: 'Plot 102 Diplomatic Zone, Maitama',
      city: 'Abuja',
      state: 'Abuja (FCT)',
      deliveryNotes: 'Deliver to Banquet Hall side gate.'
    },
    carrierName: 'IYANU Interstate Haulage Hub',
    trackingNumber: 'IYN-INT-441209-NG',
    createdAt: new Date(Date.now() - 3600000 * 26).toISOString(),
    estimatedDelivery: new Date(Date.now() + 3600000 * 6).toISOString()
  },
  {
    id: 'ord-103',
    orderNumber: 'IYN-2026-0840',
    customerId: 'cust-3',
    customerName: 'Alhaji Musa Danjuma',
    customerEmail: 'musa.danjuma@kanotrade.net',
    customerPhone: '+234 814 990 1200',
    items: [
      {
        productId: 'prod-8',
        productName: 'Industrial Heavy Duty Plastic Pallet (1200 x 1000mm)',
        price: 34000,
        quantity: 20,
        image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=400&q=80',
        assignedOpId: 'op-1',
        assignedOpName: 'OP 1 - Heavy Storage & Drums',
        prepStatus: 'pending_pick'
      }
    ],
    subtotal: 680000,
    deliveryFee: 35000,
    totalAmount: 715000,
    paymentStatus: 'paid',
    paymentGateway: 'bank_transfer',
    paymentReference: 'GTB_TRF_55001923',
    orderStatus: 'confirmed',
    deliveryAddress: {
      fullName: 'Alhaji Musa Danjuma',
      email: 'musa.danjuma@kanotrade.net',
      phone: '+234 814 990 1200',
      street: 'Plot 44 Bompai Industrial Area',
      city: 'Kano',
      state: 'Kano',
      deliveryNotes: 'Truck offloading ramp available at Bay 3.'
    },
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    estimatedDelivery: new Date(Date.now() + 3600000 * 48).toISOString()
  }
];

export const INITIAL_LEADS: CRMLead[] = [
  {
    id: 'lead-1',
    customerName: 'Engr. Babatunde Sanusi',
    businessName: 'Sanusi Agro & Poultry Farm',
    email: 'babatunde@sanusiagro.ng',
    phone: '+234 803 771 9900',
    state: 'Ogun',
    leadSource: 'Bulk Inquiry',
    status: 'negotiation',
    estimatedValue: 1850000,
    assignedStaff: 'Titi Balogun (Key Accounts)',
    notes: 'Requested quotation for 150 units of 50L feed drums and 40 plastic pallets. Awaiting final board signoff.',
    lifetimeSpend: 620000,
    orderCount: 3,
    lastContactDate: new Date(Date.now() - 3600000 * 8).toISOString(),
    interactions: [
      {
        id: 'int-1',
        timestamp: new Date(Date.now() - 3600000 * 8).toISOString(),
        type: 'call',
        notes: 'Followed up on volume discount tiers. Offered 14% discount for 150+ drums.',
        agentName: 'Titi Balogun'
      },
      {
        id: 'int-2',
        timestamp: new Date(Date.now() - 3600000 * 48).toISOString(),
        type: 'whatsapp',
        notes: 'Sent formal PDF quotation with bank details.',
        agentName: 'Titi Balogun'
      }
    ]
  },
  {
    id: 'lead-2',
    customerName: 'Madam Grace Obioma',
    businessName: 'Grace Event Rentals & Decor',
    email: 'grace@obiomaevents.com',
    phone: '+234 809 334 5511',
    state: 'Lagos',
    leadSource: 'Storefront',
    status: 'converted',
    estimatedValue: 950000,
    assignedStaff: 'Kester Igwe (Sales)',
    notes: 'High-volume repeat customer for armchairs and round folding tables. Prefers weekend deliveries.',
    lifetimeSpend: 2400000,
    orderCount: 8,
    lastContactDate: new Date(Date.now() - 3600000 * 20).toISOString(),
    interactions: [
      {
        id: 'int-3',
        timestamp: new Date(Date.now() - 3600000 * 20).toISOString(),
        type: 'whatsapp',
        notes: 'Confirmed satisfaction with 60 ivory chairs delivered last Thursday.',
        agentName: 'Kester Igwe'
      }
    ]
  },
  {
    id: 'lead-3',
    customerName: 'Dr. Chinedu Eze',
    businessName: 'Apex Specialist Clinic',
    email: 'c.eze@apexclinic.ng',
    phone: '+234 818 200 4488',
    state: 'Enugu',
    leadSource: 'Referral',
    status: 'new',
    estimatedValue: 480000,
    assignedStaff: 'Titi Balogun (Key Accounts)',
    notes: 'Needs color-coded medical waste bins (Yellow & Red) and airtight hygiene containers.',
    lifetimeSpend: 0,
    orderCount: 0,
    lastContactDate: new Date(Date.now() - 3600000 * 2).toISOString(),
    interactions: [
      {
        id: 'int-4',
        timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
        type: 'ticket',
        notes: 'Inbound web inquiry regarding hospital grade certification.',
        agentName: 'System Bot'
      }
    ]
  }
];

export const INITIAL_TICKETS: SupportTicket[] = [
  {
    id: 'tkt-1',
    ticketNumber: 'TKT-8901',
    customerId: 'cust-1',
    customerName: 'Chief Emeka Okafor',
    customerPhone: '+234 803 456 7890',
    customerEmail: 'emeka.okafor@primeventures.ng',
    orderId: 'ord-101',
    orderNumber: 'IYN-2026-0842',
    subject: 'Request for delivery driver phone number & estimated arrival time',
    category: 'Delivery Delay',
    priority: 'high',
    status: 'in_progress',
    assignedTo: 'Kester Igwe (Logistics Officer)',
    createdAt: new Date(Date.now() - 3600000 * 1.2).toISOString(),
    responseDeadline: new Date(Date.now() - 3600000 * 0.7).toISOString(),
    resolutionDeadline: new Date(Date.now() + 3600000 * 4.8).toISOString(),
    firstResponseAt: new Date(Date.now() - 3600000 * 0.9).toISOString(),
    isBreached: false,
    messages: [
      {
        id: 'm-1',
        sender: 'customer',
        senderName: 'Chief Emeka Okafor',
        content: 'Good day, please who is the dispatch driver carrying my waste bins to Lekki? We need his contact for our estate gate clearance.',
        timestamp: new Date(Date.now() - 3600000 * 1.2).toISOString()
      },
      {
        id: 'm-2',
        sender: 'staff',
        senderName: 'Kester Igwe',
        content: 'Hello Chief Okafor! Your dispatch is Van 04 driven by Mr. Sunday (+234 806 554 1122). He is currently on Admiralty Way and will arrive in approx 25 minutes.',
        timestamp: new Date(Date.now() - 3600000 * 0.9).toISOString()
      }
    ],
    history: [
      {
        id: 'log-1',
        timestamp: new Date(Date.now() - 3600000 * 1.2).toISOString(),
        event: 'Ticket logged via Customer Portal',
        performedBy: 'Customer'
      },
      {
        id: 'log-2',
        timestamp: new Date(Date.now() - 3600000 * 0.9).toISOString(),
        event: 'First response sent within 18 minutes (SLA Passed)',
        performedBy: 'Kester Igwe'
      }
    ]
  },
  {
    id: 'tkt-2',
    ticketNumber: 'TKT-8902',
    customerId: 'cust-4',
    customerName: 'Pastor David Olumide',
    customerPhone: '+234 805 770 1234',
    customerEmail: 'pastordavid@livingword.org',
    subject: 'Urgent: 1 Armchair arrived with minor leg scuffing during transit',
    category: 'Damaged Goods',
    priority: 'urgent',
    status: 'assigned',
    assignedTo: 'Titi Balogun (Quality Control)',
    createdAt: new Date(Date.now() - 3600000 * 0.5).toISOString(),
    responseDeadline: new Date(Date.now() - 3600000 * 0.25).toISOString(),
    resolutionDeadline: new Date(Date.now() + 3600000 * 1.5).toISOString(),
    firstResponseAt: new Date(Date.now() - 3600000 * 0.3).toISOString(),
    isBreached: false,
    messages: [
      {
        id: 'm-3',
        sender: 'customer',
        senderName: 'Pastor David Olumide',
        content: 'We received the 30 white chairs for our auditorium. 1 chair had a cracked base arm. Kindly arrange immediate replacement.',
        timestamp: new Date(Date.now() - 3600000 * 0.5).toISOString()
      },
      {
        id: 'm-4',
        sender: 'staff',
        senderName: 'Titi Balogun',
        content: 'Apologies for this Pastor David. We have dispatched a brand new replacement chair immediately via express rider at zero extra cost.',
        timestamp: new Date(Date.now() - 3600000 * 0.3).toISOString()
      }
    ],
    history: [
      {
        id: 'log-3',
        timestamp: new Date(Date.now() - 3600000 * 0.5).toISOString(),
        event: 'Urgent damage claim received',
        performedBy: 'System'
      },
      {
        id: 'log-4',
        timestamp: new Date(Date.now() - 3600000 * 0.3).toISOString(),
        event: 'Replacement dispatch initiated',
        performedBy: 'Titi Balogun'
      }
    ]
  },
  {
    id: 'tkt-3',
    ticketNumber: 'TKT-8898',
    customerId: 'cust-5',
    customerName: 'Alhaja Sikirat Bello',
    customerPhone: '+234 802 884 9911',
    customerEmail: 'sikirat.bello@gmail.com',
    subject: 'Wholesale enquiry for 500 sets of food grade containers for Ramadan charity',
    category: 'Bulk Quotation',
    priority: 'medium',
    status: 'waiting',
    assignedTo: 'Kester Igwe (Sales)',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    responseDeadline: new Date(Date.now() - 3600000 * 3).toISOString(),
    resolutionDeadline: new Date(Date.now() + 3600000 * 19).toISOString(),
    firstResponseAt: new Date(Date.now() - 3600000 * 3.5).toISOString(),
    isBreached: false,
    messages: [
      {
        id: 'm-5',
        sender: 'customer',
        senderName: 'Alhaja Sikirat Bello',
        content: 'We need pricing for 500 sets of the 12-piece food storage boxes with customized logo printing on the lids.',
        timestamp: new Date(Date.now() - 3600000 * 5).toISOString()
      },
      {
        id: 'm-6',
        sender: 'staff',
        senderName: 'Kester Igwe',
        content: 'Quotation sent to email. Waiting for logo artwork file from client.',
        timestamp: new Date(Date.now() - 3600000 * 3.5).toISOString()
      }
    ],
    history: [
      {
        id: 'log-5',
        timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
        event: 'Ticket opened',
        performedBy: 'Customer'
      }
    ]
  }
];

export const NIGERIAN_STATES = [
  'Lagos', 'Abuja (FCT)', 'Oyo', 'Ogun', 'Rivers', 'Kano', 'Kaduna', 'Enugu', 'Anambra', 
  'Delta', 'Edo', 'Akwa Ibom', 'Ondo', 'Osun', 'Kwara', 'Plateau', 'Imo', 'Abia'
];
