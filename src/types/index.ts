export type Role =
  | 'customer'
  | 'staff'
  | 'admin'
  | 'superadmin'
  | 'slm'
  | 'warehouse'
  | 'op1_manager'
  | 'op2_manager'
  | 'op3_manager'
  | 'op4_manager';

export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  role: Role;
  assignedHubId?: string; // For Hub/SLM scoped personnel
  assignedOpId?: string; // For OP 1-4 floor leads
  phone?: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface Hub {
  id: string; // 'hub-1', 'hub-2', ..., 'hub-7', 'hub-8', etc.
  name: string; // e.g. "Hub 1 - Polymer & Packaging Center"
  code: string; // "HUB-1"
  slmId: string; // "slm-lagos", "slm-abuja"
  location: string; // Physical location / Depot
  managerName: string;
  contactPhone: string;
  status: 'active' | 'inactive';
  description: string;
  defaultOpId?: string; // 'op-1', 'op-2', etc.
  createdAt: string;
}

export interface ProductVariant {
  id: string;
  name: string; // e.g. "50 Litres - Deep Blue", "Pack of 6 - White"
  sku: string;
  price: number;
  stock: number;
}

export type ProductAvailability = 'in_stock' | 'low_stock' | 'out_of_stock' | 'discontinued';

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  category: string; // Category name for fast lookup
  categoryId?: string; // Category unique ID
  hubId: string; // e.g. 'hub-1', 'hub-2'
  hubName?: string; // e.g. 'Hub 1'
  slmId?: string; // e.g. 'slm-main'
  assignedOpId: string; // Primary OP responsible: 'op-1', 'op-2', 'op-3', 'op-4', or 'warehouse'
  warehouseLocation?: string; // Store / warehouse rack or bay location
  description: string;
  basePrice: number;
  discountPrice?: number;
  stockQuantity: number; // Total available floor/hub stock
  warehouseStock: number; // Central Store / Warehouse Stock
  opStock: Record<string, number>; // Local stock at each OP: { 'op-1': 40, 'op-2': 10, ... }
  minAlertThreshold?: number; // Minimum safe threshold before low stock trigger
  availability?: ProductAvailability;
  isPublished?: boolean; // When false, hidden from customer storefront
  isFeatured?: boolean;
  isBestseller?: boolean;
  isNewArrival?: boolean;
  rating: number;
  reviewCount: number;
  images: string[];
  specs: Record<string, string>;
  variants?: ProductVariant[];
  minBulkOrderQty?: number;
  bulkDiscountPercent?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  id: string;
  hubId: string; // Direct link to parent Hub: SLM -> Hub -> Category -> Product
  name: string;
  slug: string;
  iconName: string;
  description: string;
  itemCount: number;
  image: string;
  assignedOpId?: string; // Default OP point handling this category
  status?: 'active' | 'inactive';
  createdAt?: string;
}

export interface CartItem {
  product: Product;
  selectedVariant?: ProductVariant;
  quantity: number;
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'ready_for_dispatch'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';
export type PaymentGateway = 'paystack' | 'flutterwave' | 'bank_transfer' | 'cash_on_delivery';

export interface DeliveryAddress {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string; // e.g., Lagos, Abuja, Rivers, Oyo
  postalCode?: string;
  deliveryNotes?: string;
}

export interface OrderItemPrep {
  productId: string;
  productName: string;
  variantName?: string;
  price: number;
  quantity: number;
  image: string;
  hubId: string;
  hubName: string;
  assignedOpId: string;
  assignedOpName: string;
  warehouseLocation?: string;
  prepStatus: 'pending_pick' | 'picked_and_packed' | 'ready_for_dispatch';
  pickedAt?: string;
  pickedBy?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderItemPrep[];
  subtotal: number;
  deliveryFee: number;
  totalAmount: number;
  paymentStatus: PaymentStatus;
  paymentGateway: PaymentGateway;
  paymentReference?: string;
  orderStatus: OrderStatus;
  deliveryAddress: DeliveryAddress;
  carrierName?: string;
  trackingNumber?: string;
  createdAt: string;
  estimatedDelivery: string;
}

export type LeadStatus = 'new' | 'contacted' | 'negotiation' | 'converted' | 'lost';
export type InteractionType = 'call' | 'whatsapp' | 'email' | 'meeting' | 'ticket';

export interface CustomerInteraction {
  id: string;
  timestamp: string;
  type: InteractionType;
  notes: string;
  agentName: string;
}

export interface CRMLead {
  id: string;
  customerName: string;
  businessName?: string;
  email: string;
  phone: string;
  state: string;
  leadSource: 'Storefront' | 'Referral' | 'WhatsApp Direct' | 'Bulk Inquiry' | 'Exhibition';
  status: LeadStatus;
  estimatedValue: number;
  assignedStaff: string;
  notes: string;
  lifetimeSpend: number;
  orderCount: number;
  lastContactDate: string;
  interactions: CustomerInteraction[];
}

export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TicketStatus = 'new' | 'assigned' | 'in_progress' | 'waiting' | 'resolved' | 'closed';

export interface SLALog {
  id: string;
  timestamp: string;
  event: string;
  performedBy: string;
}

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  orderId?: string;
  orderNumber?: string;
  subject: string;
  category: 'Damaged Goods' | 'Delivery Delay' | 'Bulk Quotation' | 'Product Inquiry' | 'Payment Issue' | 'General';
  priority: TicketPriority;
  status: TicketStatus;
  assignedTo: string;
  createdAt: string;
  responseDeadline: string; // ISO string
  resolutionDeadline: string; // ISO string
  firstResponseAt?: string;
  resolvedAt?: string;
  isBreached: boolean;
  messages: {
    id: string;
    sender: 'customer' | 'staff' | 'system';
    senderName: string;
    content: string;
    timestamp: string;
  }[];
  history: SLALog[];
}

export interface BusinessKPI {
  todaySalesNGN: number;
  yesterdaySalesNGN: number;
  totalOrdersToday: number;
  pendingDeliveries: number;
  activeCustomers: number;
  urgentTickets: number;
  slaBreachCount: number;
  lowStockItemsCount: number;
}

// ==========================================
// SLM (Stock & Logistics Management) Models
// ==========================================

export interface SLMUnit {
  id: string; // 'op-1', 'op-2', 'op-3', 'op-4', 'warehouse'
  name: string; // e.g. "OP 1 - Heavy Storage & Drums"
  code: string; // e.g. "OP-1"
  leadOfficer: string;
  assignedCategories: string[]; // Category names or IDs assigned to this OP
  description: string;
  hubLocation: string;
  minStockAlertThreshold: number;
  contactPhone: string;
}

export type RequisitionStatus =
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'in_preparation'
  | 'dispatched_to_op'
  | 'received_completed';

export type RequisitionUrgency =
  | 'routine'
  | 'urgent'
  | 'critical_low_stock'
  | 'customer_order_fulfillment';

export interface GoodsRequisitionItem {
  productId: string;
  productName: string;
  sku: string;
  requestedQty: number;
  approvedQty?: number;
  availableWarehouseStock: number;
  unitPrice?: number;
  image?: string;
}

export interface GoodsRequisition {
  id: string;
  requisitionNumber: string;
  opId: string; // Target OP
  opName: string;
  requesterName: string;
  urgency: RequisitionUrgency;
  status: RequisitionStatus;
  items: GoodsRequisitionItem[];
  notes: string;
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
  approvedBy?: string;
  approvedAt?: string;
  dispatchedAt?: string;
  receivedAt?: string;
  linkedOrderId?: string;
}

export interface LowStockAlert {
  id: string;
  productId: string;
  productName: string;
  opId: string;
  opName: string;
  currentStock: number;
  warehouseStock: number;
  threshold: number;
  createdAt: string;
  status: 'active' | 'requisition_created' | 'resolved';
}
