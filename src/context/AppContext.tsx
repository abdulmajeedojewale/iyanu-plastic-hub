import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Product,
  Category,
  Hub,
  CartItem,
  Order,
  CRMLead,
  SupportTicket,
  Role,
  AuthUser,
  OrderStatus,
  TicketPriority,
  TicketStatus,
  LeadStatus,
  ProductVariant,
  PaymentGateway,
  SLMUnit,
  GoodsRequisition,
  RequisitionStatus,
  RequisitionUrgency,
  LowStockAlert,
  OrderItemPrep
} from '../types';
import {
  INITIAL_HUBS,
  INITIAL_CATEGORIES,
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  INITIAL_LEADS,
  INITIAL_TICKETS,
  INITIAL_SLM_UNITS,
  INITIAL_REQUISITIONS,
  INITIAL_LOW_STOCK_ALERTS
} from '../data/mockData';
import { authService, syncService, DEMO_ADMIN_USERS } from '../services/supabase';

interface Toast {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}

interface AppContextType {
  // Navigation & Active View
  activeView: string;
  setActiveView: (view: string) => void;

  // Authentication & RBAC
  currentUser: AuthUser | null;
  isAuthenticated: boolean;
  userRole: Role;
  setUserRole: (role: Role) => void;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ success: boolean; message: string }>;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
  switchRole: (role: Role) => void;

  // Hierarchical Hub Management (SLM -> Hubs -> Product Categories -> Products)
  hubs: Hub[];
  selectedHubFilter: string;
  setSelectedHubFilter: (hubId: string) => void;
  addHub: (hubData: Omit<Hub, 'id' | 'createdAt'>) => Hub;
  updateHub: (id: string, updates: Partial<Hub>) => void;
  toggleHubStatus: (id: string) => void;
  deleteHub: (id: string) => void;

  // Hierarchical Product Categories per Hub
  categories: Category[];
  selectedCategory: string;
  setSelectedCategory: (catIdOrName: string) => void;
  addCategory: (catData: Omit<Category, 'id' | 'createdAt' | 'itemCount'>) => Category;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  reassignCategoryToHub: (categoryId: string, targetHubId: string) => void;
  reassignCategoryToOp: (categoryId: string, newOpId: string) => void;

  // Products & Single Source of Truth
  products: Product[];
  publishedProducts: Product[];
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  addProduct: (product: Omit<Product, 'id' | 'rating' | 'reviewCount'>) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  toggleProductPublished: (id: string) => void;
  deleteProduct: (id: string) => void;
  updateStock: (productId: string, newStock: number, variantId?: string) => void;

  // SLM & Operations Pipeline
  slmUnits: SLMUnit[];
  requisitions: GoodsRequisition[];
  lowStockAlerts: LowStockAlert[];
  selectedOpFilter: string;
  setSelectedOpFilter: (opId: string) => void;
  createRequisition: (data: {
    opId: string;
    requesterName: string;
    urgency: RequisitionUrgency;
    items: { productId: string; requestedQty: number }[];
    notes?: string;
    linkedOrderId?: string;
  }) => GoodsRequisition;
  updateRequisitionStatus: (
    reqId: string,
    status: RequisitionStatus,
    payload?: {
      approvedQtyMap?: Record<string, number>;
      notes?: string;
      rejectionReason?: string;
    }
  ) => void;
  updateOpDetails: (opId: string, updates: Partial<SLMUnit>) => void;
  updateItemPrepStatus: (
    orderId: string,
    productId: string,
    status: 'pending_pick' | 'picked_and_packed' | 'ready_for_dispatch'
  ) => void;
  dismissLowStockAlert: (alertId: string) => void;
  generateRequisitionFromLowStock: (alertId: string, requestedQty: number) => void;
  transferStockToOp: (productId: string, targetOpId: string, qty: number) => void;

  // Cart & Shopping
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, variant?: ProductVariant, quantity?: number) => void;
  removeFromCart: (productId: string, variantId?: string) => void;
  updateCartQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartItemCount: number;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;

  // Orders & Fulfillment
  orders: Order[];
  placeOrder: (orderData: {
    fullName: string;
    email: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    deliveryNotes?: string;
    paymentGateway: PaymentGateway;
  }) => Promise<Order>;
  updateOrderStatus: (
    orderId: string,
    status: OrderStatus,
    trackingNumber?: string,
    carrierName?: string
  ) => void;
  selectedTrackingOrder: Order | null;
  setSelectedTrackingOrder: (order: Order | null) => void;

  // CRM
  leads: CRMLead[];
  addLead: (lead: Omit<CRMLead, 'id' | 'interactions' | 'lifetimeSpend' | 'orderCount' | 'lastContactDate'>) => void;
  updateLeadStatus: (leadId: string, status: LeadStatus) => void;
  addLeadInteraction: (leadId: string, type: 'call' | 'whatsapp' | 'email' | 'meeting', notes: string) => void;

  // SLA & Support Tickets
  tickets: SupportTicket[];
  createTicket: (data: {
    subject: string;
    category: SupportTicket['category'];
    priority: TicketPriority;
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    orderNumber?: string;
    initialMessage: string;
  }) => void;
  updateTicketStatus: (ticketId: string, status: TicketStatus) => void;
  assignTicket: (ticketId: string, staffName: string) => void;
  addTicketMessage: (ticketId: string, content: string, sender: 'customer' | 'staff') => void;
  escalateTicket: (ticketId: string, reason: string) => void;

  // Notifications & Currency Helper
  toasts: Toast[];
  addToast: (type: Toast['type'], title: string, message: string) => void;
  removeToast: (id: string) => void;
  formatNGN: (amount: number) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial states with localStorage synchronization for offline capability & fast preview
  const [hubs, setHubs] = useState<Hub[]>(() => {
    const saved = localStorage.getItem('iyanu_hubs_v2');
    return saved ? JSON.parse(saved) : INITIAL_HUBS;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('iyanu_categories_v2');
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('iyanu_products_v2');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [slmUnits, setSlmUnits] = useState<SLMUnit[]>(() => {
    const saved = localStorage.getItem('iyanu_slm_units_v2');
    return saved ? JSON.parse(saved) : INITIAL_SLM_UNITS;
  });

  const [requisitions, setRequisitions] = useState<GoodsRequisition[]>(() => {
    const saved = localStorage.getItem('iyanu_requisitions_v2');
    return saved ? JSON.parse(saved) : INITIAL_REQUISITIONS;
  });

  const [lowStockAlerts, setLowStockAlerts] = useState<LowStockAlert[]>(() => {
    const saved = localStorage.getItem('iyanu_low_stock_alerts_v2');
    return saved ? JSON.parse(saved) : INITIAL_LOW_STOCK_ALERTS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('iyanu_orders_v2');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [leads, setLeads] = useState<CRMLead[]>(() => {
    const saved = localStorage.getItem('iyanu_leads_v2');
    return saved ? JSON.parse(saved) : INITIAL_LEADS;
  });

  const [tickets, setTickets] = useState<SupportTicket[]>(() => {
    const saved = localStorage.getItem('iyanu_tickets_v2');
    return saved ? JSON.parse(saved) : INITIAL_TICKETS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('iyanu_cart_v2');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('iyanu_wishlist_v2');
    return saved ? JSON.parse(saved) : [];
  });

  // Auth & Session State
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    const saved = localStorage.getItem('iyanu_auth_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [userRole, setUserRole] = useState<Role>(() => {
    const savedUser = localStorage.getItem('iyanu_auth_user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser).role || 'customer';
      } catch {
        return 'customer';
      }
    }
    return 'customer';
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [activeView, setActiveView] = useState<string>('store');
  const [selectedHubFilter, setSelectedHubFilter] = useState<string>('all');
  const [selectedOpFilter, setSelectedOpFilter] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedTrackingOrder, setSelectedTrackingOrder] = useState<Order | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Derived published products list for customer storefront (Single Source of Truth)
  const publishedProducts = products.filter(p => p.isPublished !== false);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('iyanu_hubs_v2', JSON.stringify(hubs));
  }, [hubs]);

  useEffect(() => {
    localStorage.setItem('iyanu_categories_v2', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('iyanu_products_v2', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('iyanu_slm_units_v2', JSON.stringify(slmUnits));
  }, [slmUnits]);

  useEffect(() => {
    localStorage.setItem('iyanu_requisitions_v2', JSON.stringify(requisitions));
  }, [requisitions]);

  useEffect(() => {
    localStorage.setItem('iyanu_low_stock_alerts_v2', JSON.stringify(lowStockAlerts));
  }, [lowStockAlerts]);

  useEffect(() => {
    localStorage.setItem('iyanu_orders_v2', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('iyanu_leads_v2', JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem('iyanu_tickets_v2', JSON.stringify(tickets));
  }, [tickets]);

  useEffect(() => {
    localStorage.setItem('iyanu_cart_v2', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('iyanu_wishlist_v2', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('iyanu_auth_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('iyanu_auth_user');
    }
  }, [currentUser]);

  // Periodic SLA Breach Checker
  useEffect(() => {
    const interval = setInterval(() => {
      setTickets(prev => {
        const now = new Date().getTime();
        return prev.map(ticket => {
          if (ticket.status !== 'resolved' && ticket.status !== 'closed') {
            const deadline = new Date(ticket.resolutionDeadline).getTime();
            if (now > deadline && !ticket.isBreached) {
              return {
                ...ticket,
                isBreached: true,
                history: [
                  ...ticket.history,
                  {
                    id: `log-breach-${Date.now()}`,
                    timestamp: new Date().toISOString(),
                    event: 'AUTOMATED SLA BREACH: Resolution deadline exceeded!',
                    performedBy: 'SLA Engine System'
                  }
                ]
              };
            }
          }
          return ticket;
        });
      });
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const addToast = (type: Toast['type'], title: string, message: string) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`;
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const formatNGN = (amount: number): string => {
    return '₦' + Number(amount || 0).toLocaleString('en-NG', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };

  // Helper to find Hub & OP for a product
  const getHubAndOpForProduct = (product: Product): { hubId: string; hubName: string; opId: string; opName: string; warehouseLocation: string } => {
    let hub = hubs.find(h => h.id === product.hubId);
    if (!hub) hub = hubs[0] || { id: 'hub-1', name: 'Hub 1', code: 'HUB-1', slmId: 'slm-lagos', location: 'Ikeja', managerName: 'Babatunde', contactPhone: '', status: 'active', description: '', createdAt: '' };

    let opId = product.assignedOpId || hub.defaultOpId || 'op-1';
    let op = slmUnits.find(u => u.id === opId);
    let opName = op ? op.name : `OP Unit (${opId.toUpperCase()})`;

    return {
      hubId: hub.id,
      hubName: hub.name,
      opId,
      opName,
      warehouseLocation: product.warehouseLocation || `${hub.name} - Bay 01`
    };
  };

  // ==========================================
  // AUTHENTICATION & RBAC
  // ==========================================
  const login = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    const res = await authService.signIn(email, pass);
    if (res.error || !res.user) {
      addToast('error', 'Login Failed', res.error || 'Authentication failed');
      return { success: false, error: res.error || 'Authentication failed' };
    }

    setCurrentUser(res.user);
    setUserRole(res.user.role);
    setIsLoginModalOpen(false);

    // Route user based on role
    if (res.user.role === 'customer') {
      setActiveView('store');
    } else if (res.user.role === 'slm' || res.user.role.startsWith('op') || res.user.role === 'warehouse') {
      setActiveView('admin-slm');
    } else {
      setActiveView('admin-dashboard');
    }

    addToast('success', `Welcome back, ${res.user.fullName}`, `Logged in as ${res.user.role.toUpperCase()}`);
    return { success: true };
  };

  const logout = async () => {
    await authService.signOut();
    setCurrentUser(null);
    setUserRole('customer');
    setActiveView('store');
    addToast('info', 'Logged Out', 'You have been securely signed out.');
  };

  const resetPassword = async (email: string) => {
    return authService.resetPassword(email);
  };

  const switchRole = (role: Role) => {
    setUserRole(role);
    if (currentUser) {
      setCurrentUser({ ...currentUser, role });
    } else {
      // Find matching demo user for seamless admin preview
      const demo = DEMO_ADMIN_USERS.find(d => d.role === role);
      if (demo) {
        setCurrentUser(demo);
      }
    }
  };

  // ==========================================
  // HIERARCHICAL HUB MANAGEMENT
  // ==========================================
  const addHub = (hubData: Omit<Hub, 'id' | 'createdAt'>): Hub => {
    const hubCount = hubs.length + 1;
    const id = `hub-${Date.now()}`;
    const newHub: Hub = {
      ...hubData,
      id,
      code: hubData.code || `HUB-${hubCount}`,
      createdAt: new Date().toISOString()
    };

    setHubs(prev => [...prev, newHub]);
    syncService.syncHub(newHub);

    addToast('success', 'New Hub Created', `${newHub.name} has been added to the SLM network.`);
    return newHub;
  };

  const updateHub = (id: string, updates: Partial<Hub>) => {
    setHubs(prev =>
      prev.map(h => {
        if (h.id === id) {
          const updated = { ...h, ...updates, updatedAt: new Date().toISOString() };
          syncService.syncHub(updated);
          return updated;
        }
        return h;
      })
    );
    addToast('success', 'Hub Updated', 'Hub configurations saved successfully.');
  };

  const toggleHubStatus = (id: string) => {
    setHubs(prev =>
      prev.map(h => {
        if (h.id === id) {
          const newStatus: 'active' | 'inactive' = h.status === 'active' ? 'inactive' : 'active';
          const updated: Hub = { ...h, status: newStatus };
          syncService.syncHub(updated);
          addToast('info', 'Hub Status Changed', `${h.name} is now ${newStatus.toUpperCase()}.`);
          return updated;
        }
        return h;
      })
    );
  };

  const deleteHub = (id: string) => {
    // Check if products exist under this hub
    const hasProducts = products.some(p => p.hubId === id);
    if (hasProducts) {
      addToast('error', 'Cannot Delete Hub', 'This Hub contains active products. Please reassign products first.');
      return;
    }
    setHubs(prev => prev.filter(h => h.id !== id));
    addToast('info', 'Hub Removed', 'Hub removed from network.');
  };

  // ==========================================
  // HIERARCHICAL CATEGORY MANAGEMENT (PER HUB)
  // ==========================================
  const addCategory = (catData: Omit<Category, 'id' | 'createdAt' | 'itemCount'>): Category => {
    const id = `cat-${Date.now()}`;
    const newCat: Category = {
      ...catData,
      id,
      itemCount: 0,
      status: catData.status || 'active',
      createdAt: new Date().toISOString()
    };

    setCategories(prev => [...prev, newCat]);
    syncService.syncCategory(newCat);

    // Update SLM unit assigned categories if applicable
    if (newCat.assignedOpId) {
      setSlmUnits(prev =>
        prev.map(u =>
          u.id === newCat.assignedOpId
            ? { ...u, assignedCategories: Array.from(new Set([...u.assignedCategories, newCat.name])) }
            : u
        )
      );
    }

    addToast('success', 'Product Category Created', `Category "${newCat.name}" added to Hub.`);
    return newCat;
  };

  const updateCategory = (id: string, updates: Partial<Category>) => {
    setCategories(prev =>
      prev.map(c => {
        if (c.id === id) {
          const oldName = c.name;
          const updated = { ...c, ...updates };
          syncService.syncCategory(updated);

          // If category name was renamed, update linked products
          if (updates.name && updates.name !== oldName) {
            setProducts(pList =>
              pList.map(p => (p.category === oldName || p.categoryId === id ? { ...p, category: updates.name! } : p))
            );
          }
          return updated;
        }
        return c;
      })
    );
    addToast('success', 'Category Saved', 'Product category details updated.');
  };

  const deleteCategory = (id: string) => {
    const category = categories.find(c => c.id === id);
    if (!category) return;

    // Check if products exist in this category
    const hasProducts = products.some(p => p.categoryId === id || p.category === category.name);
    if (hasProducts) {
      addToast('error', 'Cannot Delete Category', 'This category contains products. Reassign or delete products first.');
      return;
    }

    setCategories(prev => prev.filter(c => c.id !== id));
    addToast('info', 'Category Deleted', `Category "${category.name}" removed.`);
  };

  const reassignCategoryToHub = (categoryId: string, targetHubId: string) => {
    const targetHub = hubs.find(h => h.id === targetHubId);
    if (!targetHub) return;

    setCategories(prev =>
      prev.map(c => {
        if (c.id === categoryId) {
          const updated = { ...c, hubId: targetHubId };
          syncService.syncCategory(updated);
          return updated;
        }
        return c;
      })
    );

    // Also reassign all products under this category
    setProducts(prev =>
      prev.map(p => {
        if (p.categoryId === categoryId) {
          const updated = { ...p, hubId: targetHubId, hubName: targetHub.name };
          syncService.syncProduct(updated);
          return updated;
        }
        return p;
      })
    );

    addToast('success', 'Hub Reassignment Complete', `Category moved to ${targetHub.name}.`);
  };

  const reassignCategoryToOp = (categoryId: string, newOpId: string) => {
    setCategories(prev =>
      prev.map(c => {
        if (c.id === categoryId) {
          const updated = { ...c, assignedOpId: newOpId };
          syncService.syncCategory(updated);
          return updated;
        }
        return c;
      })
    );

    const category = categories.find(c => c.id === categoryId);
    const targetOp = slmUnits.find(u => u.id === newOpId);

    if (category) {
      // Update products in this category
      setProducts(prev =>
        prev.map(p => {
          if (p.categoryId === categoryId || p.category === category.name) {
            const updated = { ...p, assignedOpId: newOpId };
            syncService.syncProduct(updated);
            return updated;
          }
          return p;
        })
      );

      // Update SLM unit category assignments
      setSlmUnits(prev =>
        prev.map(u => {
          if (u.id === newOpId) {
            return {
              ...u,
              assignedCategories: Array.from(new Set([...u.assignedCategories, category.name]))
            };
          } else {
            return {
              ...u,
              assignedCategories: u.assignedCategories.filter(name => name !== category.name)
            };
          }
        })
      );
    }

    addToast(
      'success',
      'Category Reassigned to OP',
      `Category "${category?.name || categoryId}" is now managed by ${targetOp?.name || newOpId}.`
    );
  };

  // ==========================================
  // PRODUCT MANAGEMENT (SINGLE SOURCE OF TRUTH)
  // ==========================================
  const addProduct = (newProdData: Omit<Product, 'id' | 'rating' | 'reviewCount'>): Product => {
    const id = `prod-${Date.now()}`;
    const hubInfo = getHubAndOpForProduct(newProdData as Product);

    const newProduct: Product = {
      ...newProdData,
      id,
      hubId: newProdData.hubId || hubInfo.hubId,
      hubName: hubInfo.hubName,
      assignedOpId: newProdData.assignedOpId || hubInfo.opId,
      warehouseLocation: newProdData.warehouseLocation || hubInfo.warehouseLocation,
      rating: 5.0,
      reviewCount: 0,
      isPublished: newProdData.isPublished !== false,
      warehouseStock: newProdData.warehouseStock || 100,
      opStock: newProdData.opStock || { [hubInfo.opId]: newProdData.stockQuantity || 30 },
      minAlertThreshold: newProdData.minAlertThreshold || 20,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setProducts(prev => [newProduct, ...prev]);
    syncService.syncProduct(newProduct);

    // Update category item count
    setCategories(prev =>
      prev.map(c => (c.name === newProduct.category || c.id === newProduct.categoryId ? { ...c, itemCount: c.itemCount + 1 } : c))
    );

    addToast('success', 'Product Created & Live', `${newProduct.name} added to catalog.`);
    return newProduct;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev =>
      prev.map(p => {
        if (p.id === id) {
          const updated = { ...p, ...updates, updatedAt: new Date().toISOString() };
          syncService.syncProduct(updated);
          return updated;
        }
        return p;
      })
    );
    addToast('success', 'Catalog Updated', 'Product details saved.');
  };

  const toggleProductPublished = (id: string) => {
    setProducts(prev =>
      prev.map(p => {
        if (p.id === id) {
          const isPublished = p.isPublished === false ? true : false;
          const updated: Product = { ...p, isPublished, updatedAt: new Date().toISOString() };
          syncService.syncProduct(updated);
          addToast(
            'info',
            isPublished ? 'Product Published' : 'Product Unpublished',
            isPublished ? `${p.name} is now visible on the storefront.` : `${p.name} removed from customer storefront.`
          );
          return updated;
        }
        return p;
      })
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    syncService.deleteProduct(id);
    addToast('info', 'Product Deleted', 'Product removed from database.');
  };

  const updateStock = (productId: string, newStock: number, variantId?: string) => {
    setProducts(prev =>
      prev.map(p => {
        if (p.id === productId) {
          let updated: Product;
          if (variantId && p.variants) {
            const updatedVariants = p.variants.map(v =>
              v.id === variantId ? { ...v, stock: newStock } : v
            );
            const totalStock = updatedVariants.reduce((sum, v) => sum + v.stock, 0);
            updated = { ...p, stockQuantity: totalStock, variants: updatedVariants, updatedAt: new Date().toISOString() };
          } else {
            const currentOpMap = { ...(p.opStock || {}), [p.assignedOpId]: newStock };
            updated = { ...p, stockQuantity: newStock, opStock: currentOpMap, updatedAt: new Date().toISOString() };
          }
          syncService.syncProduct(updated);
          return updated;
        }
        return p;
      })
    );
    addToast('info', 'Stock Level Adjusted', `Stock level updated to ${newStock} units.`);
  };

  // ==========================================
  // SLM REQUISITIONS & TRANSFERS
  // ==========================================
  const createRequisition = (data: {
    opId: string;
    requesterName: string;
    urgency: RequisitionUrgency;
    items: { productId: string; requestedQty: number }[];
    notes?: string;
    linkedOrderId?: string;
  }): GoodsRequisition => {
    const op = slmUnits.find(u => u.id === data.opId);
    const opName = op ? op.name : `OP Unit (${data.opId.toUpperCase()})`;
    const reqNum = `REQ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const requisitionItems = data.items.map(it => {
      const p = products.find(prod => prod.id === it.productId);
      return {
        productId: it.productId,
        productName: p ? p.name : 'Standard Polymer Product',
        sku: p ? p.sku : 'IYN-SKU',
        requestedQty: it.requestedQty,
        availableWarehouseStock: p ? p.warehouseStock : 100,
        unitPrice: p ? p.discountPrice || p.basePrice : 0,
        image: p && p.images.length > 0 ? p.images[0] : undefined
      };
    });

    const newReq: GoodsRequisition = {
      id: `req-${Date.now()}`,
      requisitionNumber: reqNum,
      opId: data.opId,
      opName,
      requesterName: data.requesterName,
      urgency: data.urgency,
      status: 'pending',
      items: requisitionItems,
      notes: data.notes || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      linkedOrderId: data.linkedOrderId
    };

    setRequisitions(prev => [newReq, ...prev]);
    syncService.syncRequisition(newReq);

    // Resolve / update low stock alerts
    data.items.forEach(it => {
      setLowStockAlerts(prev =>
        prev.map(a =>
          a.productId === it.productId && a.opId === data.opId
            ? { ...a, status: 'requisition_created' }
            : a
        )
      );
    });

    addToast(
      'success',
      'Goods Requisition Submitted',
      `Requisition #${reqNum} sent to Central Warehouse for ${requisitionItems.length} product line(s).`
    );

    return newReq;
  };

  const updateRequisitionStatus = (
    reqId: string,
    status: RequisitionStatus,
    payload?: {
      approvedQtyMap?: Record<string, number>;
      notes?: string;
      rejectionReason?: string;
    }
  ) => {
    const targetReq = requisitions.find(r => r.id === reqId);
    if (!targetReq) return;

    const now = new Date().toISOString();

    setRequisitions(prev =>
      prev.map(req => {
        if (req.id !== reqId) return req;

        const updatedItems = req.items.map(item => {
          if (payload?.approvedQtyMap && payload.approvedQtyMap[item.productId] !== undefined) {
            return {
              ...item,
              approvedQty: payload.approvedQtyMap[item.productId]
            };
          }
          if (status === 'approved' && item.approvedQty === undefined) {
            return {
              ...item,
              approvedQty: item.requestedQty
            };
          }
          return item;
        });

        const updates: Partial<GoodsRequisition> = {
          status,
          updatedAt: now,
          items: updatedItems
        };

        if (status === 'approved') {
          updates.approvedBy = currentUser?.fullName || 'Chief Warehouse Officer Yakubu';
          updates.approvedAt = now;
        } else if (status === 'dispatched_to_op') {
          updates.dispatchedAt = now;
        } else if (status === 'received_completed') {
          updates.receivedAt = now;
        } else if (status === 'rejected') {
          updates.rejectionReason = payload?.rejectionReason || 'Stock insufficient in central storage';
        }

        if (payload?.notes) {
          updates.notes = req.notes ? `${req.notes}\n[Update]: ${payload.notes}` : payload.notes;
        }

        const merged = { ...req, ...updates };
        syncService.syncRequisition(merged);
        return merged;
      })
    );

    // If Dispatched to OP -> Deduct from Central Warehouse Stock
    if (status === 'dispatched_to_op') {
      targetReq.items.forEach(it => {
        const qtyToDeduct = it.approvedQty ?? it.requestedQty;
        setProducts(prev =>
          prev.map(p => {
            if (p.id === it.productId) {
              const newWhStock = Math.max(0, p.warehouseStock - qtyToDeduct);
              const updated = { ...p, warehouseStock: newWhStock };
              syncService.syncProduct(updated);
              return updated;
            }
            return p;
          })
        );
      });
      addToast(
        'info',
        'Dispatched from Warehouse',
        `Requisition #${targetReq.requisitionNumber} dispatched to ${targetReq.opName}.`
      );
    }

    // If Received & Completed by OP -> Credit to Target OP Local Floor Stock!
    if (status === 'received_completed') {
      targetReq.items.forEach(it => {
        const qtyToAdd = it.approvedQty ?? it.requestedQty;
        setProducts(prev =>
          prev.map(p => {
            if (p.id === it.productId) {
              const currentOpStock = p.opStock ? p.opStock[targetReq.opId] || 0 : 0;
              const newOpStockMap = {
                ...(p.opStock || {}),
                [targetReq.opId]: currentOpStock + qtyToAdd
              };
              const totalOpStock = Object.values(newOpStockMap).reduce((sum, v) => sum + v, 0);
              const updated = {
                ...p,
                opStock: newOpStockMap,
                stockQuantity: totalOpStock
              };
              syncService.syncProduct(updated);
              return updated;
            }
            return p;
          })
        );

        setLowStockAlerts(prev =>
          prev.map(a =>
            a.productId === it.productId && a.opId === targetReq.opId
              ? { ...a, status: 'resolved' }
              : a
          )
        );
      });

      try {
        confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
      } catch {
        // ignore
      }

      addToast(
        'success',
        'Goods Received & Stock Credited',
        `${targetReq.opName} confirmed receipt. Local floor inventory updated successfully!`
      );
    }
  };

  const updateOpDetails = (opId: string, updates: Partial<SLMUnit>) => {
    setSlmUnits(prev => prev.map(u => (u.id === opId ? { ...u, ...updates } : u)));
    addToast('success', 'OP Details Saved', 'Operations point settings updated.');
  };

  const updateItemPrepStatus = (
    orderId: string,
    productId: string,
    status: 'pending_pick' | 'picked_and_packed' | 'ready_for_dispatch'
  ) => {
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id !== orderId) return ord;

        const updatedItems = ord.items.map(it => {
          if (it.productId === productId) {
            return {
              ...it,
              prepStatus: status,
              pickedAt: status !== 'pending_pick' ? new Date().toISOString() : undefined,
              pickedBy: status !== 'pending_pick' ? (currentUser?.fullName || 'SLM Logistics Staff') : undefined
            };
          }
          return it;
        });

        const allPacked = updatedItems.every(
          it => it.prepStatus === 'picked_and_packed' || it.prepStatus === 'ready_for_dispatch'
        );

        let newOrderStatus = ord.orderStatus;
        if (allPacked && ord.orderStatus === 'confirmed') {
          newOrderStatus = 'ready_for_dispatch';
        }

        const updatedOrder = {
          ...ord,
          items: updatedItems,
          orderStatus: newOrderStatus
        };
        syncService.syncOrder(updatedOrder);
        return updatedOrder;
      })
    );

    addToast('info', 'Item Preparation Updated', `Product marked as ${status.replace(/_/g, ' ').toUpperCase()}.`);
  };

  const dismissLowStockAlert = (alertId: string) => {
    setLowStockAlerts(prev => prev.filter(a => a.id !== alertId));
    addToast('info', 'Alert Dismissed', 'Low stock alert cleared.');
  };

  const generateRequisitionFromLowStock = (alertId: string, requestedQty: number) => {
    const alert = lowStockAlerts.find(a => a.id === alertId);
    if (!alert) return;

    createRequisition({
      opId: alert.opId,
      requesterName: `${alert.opName} Officer`,
      urgency: 'critical_low_stock',
      items: [{ productId: alert.productId, requestedQty }],
      notes: `Automated 1-click requisition triggered from Low Stock threshold alert (${alert.currentStock} units remaining).`
    });

    setLowStockAlerts(prev =>
      prev.map(a => (a.id === alertId ? { ...a, status: 'requisition_created' } : a))
    );
  };

  const transferStockToOp = (productId: string, targetOpId: string, qty: number) => {
    setProducts(prev =>
      prev.map(p => {
        if (p.id === productId) {
          const newWh = Math.max(0, p.warehouseStock - qty);
          const currentOp = p.opStock ? p.opStock[targetOpId] || 0 : 0;
          const newOpMap = {
            ...(p.opStock || {}),
            [targetOpId]: currentOp + qty
          };
          const totalStock = Object.values(newOpMap).reduce((sum, v) => sum + v, 0);
          const updated = {
            ...p,
            warehouseStock: newWh,
            opStock: newOpMap,
            stockQuantity: totalStock
          };
          syncService.syncProduct(updated);
          return updated;
        }
        return p;
      })
    );

    const product = products.find(p => p.id === productId);
    const targetOp = slmUnits.find(u => u.id === targetOpId);

    addToast(
      'success',
      'Stock Transferred',
      `Transferred ${qty} units of ${product?.name} to ${targetOp?.name}.`
    );
  };

  // ==========================================
  // CART & CHECKOUT
  // ==========================================
  const addToCart = (product: Product, variant?: ProductVariant, quantity = 1) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(
        item => item.product.id === product.id && item.selectedVariant?.id === variant?.id
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, selectedVariant: variant, quantity }];
      }
    });

    addToast(
      'success',
      'Added to Cart',
      `${quantity}x ${product.name}${variant ? ` (${variant.name})` : ''} added to your cart.`
    );
  };

  const removeFromCart = (productId: string, variantId?: string) => {
    setCart(prev =>
      prev.filter(item => !(item.product.id === productId && item.selectedVariant?.id === variantId))
    );
  };

  const updateCartQuantity = (productId: string, quantity: number, variantId?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantId);
      return;
    }
    setCart(prev =>
      prev.map(item => {
        if (item.product.id === productId && item.selectedVariant?.id === variantId) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => {
    const unitPrice =
      item.selectedVariant?.price ?? item.product.discountPrice ?? item.product.basePrice;
    return sum + unitPrice * item.quantity;
  }, 0);

  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        addToast('info', 'Wishlist', 'Item removed from your wishlist.');
        return prev.filter(id => id !== productId);
      } else {
        addToast('success', 'Wishlist', 'Item saved to your wishlist.');
        return [...prev, productId];
      }
    });
  };

  // ==========================================
  // ORDER PLACEMENT (ROUTING TO HUB & SLM)
  // ==========================================
  const placeOrder = async (orderData: {
    fullName: string;
    email: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    deliveryNotes?: string;
    paymentGateway: PaymentGateway;
  }): Promise<Order> => {
    const orderNumber = `IYN-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const subtotal = cartTotal;

    // Delivery fee calculation
    let deliveryFee = 3500;
    if (orderData.state.includes('Lagos')) deliveryFee = 3500;
    else if (['Ogun', 'Oyo', 'Osun'].includes(orderData.state)) deliveryFee = 6000;
    else if (['Abuja (FCT)', 'Rivers', 'Kano', 'Kaduna'].includes(orderData.state))
      deliveryFee = 12500;
    else deliveryFee = 15000;

    const totalAmount = subtotal + deliveryFee;

    // Build order items with full Hub, OP, and Warehouse routing information
    const orderItems: OrderItemPrep[] = cart.map(item => {
      const routing = getHubAndOpForProduct(item.product);
      return {
        productId: item.product.id,
        productName: item.product.name,
        variantName: item.selectedVariant?.name,
        price: item.selectedVariant?.price ?? item.product.discountPrice ?? item.product.basePrice,
        quantity: item.quantity,
        image: item.product.images[0] || '',
        hubId: routing.hubId,
        hubName: routing.hubName,
        assignedOpId: routing.opId,
        assignedOpName: routing.opName,
        warehouseLocation: routing.warehouseLocation,
        prepStatus: 'pending_pick'
      };
    });

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      customerId: `cust-${Date.now().toString().slice(-4)}`,
      customerName: orderData.fullName,
      customerEmail: orderData.email,
      customerPhone: orderData.phone,
      items: orderItems,
      subtotal,
      deliveryFee,
      totalAmount,
      paymentStatus: 'paid',
      paymentGateway: orderData.paymentGateway,
      paymentReference: `${orderData.paymentGateway.toUpperCase()}_TX_${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      orderStatus: 'confirmed',
      deliveryAddress: {
        fullName: orderData.fullName,
        email: orderData.email,
        phone: orderData.phone,
        street: orderData.street,
        city: orderData.city,
        state: orderData.state,
        deliveryNotes: orderData.deliveryNotes
      },
      carrierName: 'IYANU Fleet Logistics Dispatch',
      trackingNumber: `IYN-TRK-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 3600000 * 48).toISOString()
    };

    // Deduct stock from OP and check for low stock triggers
    cart.forEach(item => {
      const routing = getHubAndOpForProduct(item.product);
      const currentOpStock = item.product.opStock ? item.product.opStock[routing.opId] || 0 : 0;
      const remainingOpStock = Math.max(0, currentOpStock - item.quantity);
      const threshold = item.product.minAlertThreshold || 20;

      setProducts(prev =>
        prev.map(p => {
          if (p.id === item.product.id) {
            const updatedOpMap = {
              ...(p.opStock || {}),
              [routing.opId]: remainingOpStock
            };
            const newTotal = Object.values(updatedOpMap).reduce((sum, v) => sum + v, 0);
            const updatedProduct = {
              ...p,
              opStock: updatedOpMap,
              stockQuantity: newTotal
            };
            syncService.syncProduct(updatedProduct);
            return updatedProduct;
          }
          return p;
        })
      );

      if (remainingOpStock <= threshold) {
        const newAlert: LowStockAlert = {
          id: `lsa-${Date.now()}-${item.product.id}`,
          productId: item.product.id,
          productName: item.product.name,
          opId: routing.opId,
          opName: routing.opName,
          currentStock: remainingOpStock,
          warehouseStock: item.product.warehouseStock,
          threshold,
          createdAt: new Date().toISOString(),
          status: 'active'
        };
        setLowStockAlerts(prev => [newAlert, ...prev]);
      }
    });

    // Update CRM Records
    setLeads(prev => {
      const existing = prev.find(l => l.email.toLowerCase() === orderData.email.toLowerCase());
      if (existing) {
        return prev.map(l =>
          l.id === existing.id
            ? {
                ...l,
                lifetimeSpend: l.lifetimeSpend + totalAmount,
                orderCount: l.orderCount + 1,
                lastContactDate: new Date().toISOString()
              }
            : l
        );
      } else {
        const newLead: CRMLead = {
          id: `lead-${Date.now()}`,
          customerName: orderData.fullName,
          email: orderData.email,
          phone: orderData.phone,
          state: orderData.state,
          leadSource: 'Storefront',
          status: 'converted',
          estimatedValue: totalAmount,
          assignedStaff: 'Kester Igwe (Sales)',
          notes: `Placed order ${orderNumber} for ${cart.length} item line(s).`,
          lifetimeSpend: totalAmount,
          orderCount: 1,
          lastContactDate: new Date().toISOString(),
          interactions: [
            {
              id: `int-${Date.now()}`,
              timestamp: new Date().toISOString(),
              type: 'ticket',
              notes: `Order ${orderNumber} confirmed online (${formatNGN(totalAmount)}) via ${orderData.paymentGateway}.`,
              agentName: 'System Bot'
            }
          ]
        };
        return [newLead, ...prev];
      }
    });

    setOrders(prev => [newOrder, ...prev]);
    syncService.syncOrder(newOrder);
    clearCart();

    try {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    } catch {
      // ignore
    }

    addToast(
      'success',
      'Order Confirmed & Sent to Hub Dispatch',
      `Order ${orderNumber} placed. Picking tickets dispatched to responsible Hub & OP floor units.`
    );
    setSelectedTrackingOrder(newOrder);
    return newOrder;
  };

  const updateOrderStatus = (
    orderId: string,
    status: OrderStatus,
    trackingNumber?: string,
    carrierName?: string
  ) => {
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id === orderId) {
          const updated = {
            ...ord,
            orderStatus: status,
            trackingNumber: trackingNumber || ord.trackingNumber,
            carrierName: carrierName || ord.carrierName
          };
          syncService.syncOrder(updated);
          return updated;
        }
        return ord;
      })
    );
    addToast('info', 'Order Status Updated', `Order marked as ${status.toUpperCase()}.`);
  };

  // ==========================================
  // CRM OPERATIONS
  // ==========================================
  const addLead = (
    leadData: Omit<CRMLead, 'id' | 'interactions' | 'lifetimeSpend' | 'orderCount' | 'lastContactDate'>
  ) => {
    const newLead: CRMLead = {
      ...leadData,
      id: `lead-${Date.now()}`,
      lifetimeSpend: 0,
      orderCount: 0,
      lastContactDate: new Date().toISOString(),
      interactions: [
        {
          id: `int-${Date.now()}`,
          timestamp: new Date().toISOString(),
          type: 'call',
          notes: 'Lead registered in CRM pipeline.',
          agentName: leadData.assignedStaff
        }
      ]
    };
    setLeads(prev => [newLead, ...prev]);
    addToast('success', 'Lead Added', `${newLead.customerName} added to CRM.`);
  };

  const updateLeadStatus = (leadId: string, status: LeadStatus) => {
    setLeads(prev =>
      prev.map(l => (l.id === leadId ? { ...l, status, lastContactDate: new Date().toISOString() } : l))
    );
    addToast('info', 'CRM Pipeline Updated', `Lead status changed to ${status.toUpperCase()}.`);
  };

  const addLeadInteraction = (
    leadId: string,
    type: 'call' | 'whatsapp' | 'email' | 'meeting',
    notes: string
  ) => {
    const newInt = {
      id: `int-${Date.now()}`,
      timestamp: new Date().toISOString(),
      type,
      notes,
      agentName: currentUser?.fullName || 'Staff Admin'
    };
    setLeads(prev =>
      prev.map(l => {
        if (l.id === leadId) {
          return {
            ...l,
            lastContactDate: new Date().toISOString(),
            interactions: [newInt, ...l.interactions]
          };
        }
        return l;
      })
    );
    addToast('success', 'Activity Logged', `${type.toUpperCase()} interaction recorded.`);
  };

  // ==========================================
  // SLA SUPPORT TICKETS
  // ==========================================
  const createTicket = (data: {
    subject: string;
    category: SupportTicket['category'];
    priority: TicketPriority;
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    orderNumber?: string;
    initialMessage: string;
  }) => {
    const now = Date.now();
    let responseHours = 2;
    let resolutionHours = 24;

    if (data.priority === 'urgent') {
      responseHours = 0.25;
      resolutionHours = 2;
    } else if (data.priority === 'high') {
      responseHours = 0.5;
      resolutionHours = 6;
    } else if (data.priority === 'medium') {
      responseHours = 2;
      resolutionHours = 24;
    } else {
      responseHours = 4;
      resolutionHours = 48;
    }

    const ticketNumber = `TKT-${Math.floor(1000 + Math.random() * 9000)}`;
    const newTicket: SupportTicket = {
      id: `tkt-${now}`,
      ticketNumber,
      customerId: `cust-${now.toString().slice(-4)}`,
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      customerEmail: data.customerEmail,
      orderNumber: data.orderNumber,
      subject: data.subject,
      category: data.category,
      priority: data.priority,
      status: 'new',
      assignedTo: 'Unassigned (Auto-Queue)',
      createdAt: new Date(now).toISOString(),
      responseDeadline: new Date(now + responseHours * 3600000).toISOString(),
      resolutionDeadline: new Date(now + resolutionHours * 3600000).toISOString(),
      isBreached: false,
      messages: [
        {
          id: `msg-${now}`,
          sender: 'customer',
          senderName: data.customerName,
          content: data.initialMessage,
          timestamp: new Date(now).toISOString()
        }
      ],
      history: [
        {
          id: `log-${now}`,
          timestamp: new Date(now).toISOString(),
          event: `Ticket opened with [${data.priority.toUpperCase()}] SLA policy. Response deadline: ${responseHours}h`,
          performedBy: 'Customer Portal'
        }
      ]
    };

    setTickets(prev => [newTicket, ...prev]);
    addToast(
      'success',
      'Support Ticket Opened',
      `Ticket #${ticketNumber} created. Target first response in ${responseHours >= 1 ? `${responseHours}h` : `${responseHours * 60}m`}.`
    );
  };

  const updateTicketStatus = (ticketId: string, status: TicketStatus) => {
    setTickets(prev =>
      prev.map(t => {
        if (t.id === ticketId) {
          const updates: Partial<SupportTicket> = { status };
          if (status === 'resolved' || status === 'closed') {
            updates.resolvedAt = new Date().toISOString();
          }
          return {
            ...t,
            ...updates,
            history: [
              ...t.history,
              {
                id: `log-${Date.now()}`,
                timestamp: new Date().toISOString(),
                event: `Ticket status moved to [${status.toUpperCase()}]`,
                performedBy: currentUser?.fullName || 'Support Staff'
              }
            ]
          };
        }
        return t;
      })
    );
    addToast('info', 'Ticket Status Changed', `Ticket marked as ${status.toUpperCase()}.`);
  };

  const assignTicket = (ticketId: string, staffName: string) => {
    setTickets(prev =>
      prev.map(t => {
        if (t.id === ticketId) {
          return {
            ...t,
            assignedTo: staffName,
            status: t.status === 'new' ? 'assigned' : t.status,
            history: [
              ...t.history,
              {
                id: `log-${Date.now()}`,
                timestamp: new Date().toISOString(),
                event: `Assigned to ${staffName}`,
                performedBy: currentUser?.fullName || 'Supervisor'
              }
            ]
          };
        }
        return t;
      })
    );
    addToast('info', 'Ticket Assigned', `Assigned to ${staffName}.`);
  };

  const addTicketMessage = (ticketId: string, content: string, sender: 'customer' | 'staff') => {
    setTickets(prev =>
      prev.map(t => {
        if (t.id === ticketId) {
          const isFirstStaffResp = sender === 'staff' && !t.firstResponseAt;
          return {
            ...t,
            firstResponseAt: isFirstStaffResp ? new Date().toISOString() : t.firstResponseAt,
            status:
              sender === 'staff'
                ? t.status === 'new' || t.status === 'assigned'
                  ? 'in_progress'
                  : t.status
                : t.status,
            messages: [
              ...t.messages,
              {
                id: `msg-${Date.now()}`,
                sender,
                senderName: sender === 'staff' ? t.assignedTo || 'IYANU Support Team' : t.customerName,
                content,
                timestamp: new Date().toISOString()
              }
            ],
            history: isFirstStaffResp
              ? [
                  ...t.history,
                  {
                    id: `log-${Date.now()}`,
                    timestamp: new Date().toISOString(),
                    event: 'First Response SLA achieved',
                    performedBy: t.assignedTo || 'Staff'
                  }
                ]
              : t.history
          };
        }
        return t;
      })
    );
  };

  const escalateTicket = (ticketId: string, reason: string) => {
    setTickets(prev =>
      prev.map(t => {
        if (t.id === ticketId) {
          return {
            ...t,
            priority: 'urgent',
            history: [
              ...t.history,
              {
                id: `log-esc-${Date.now()}`,
                timestamp: new Date().toISOString(),
                event: `ESCALATED TO URGENT: ${reason}`,
                performedBy: currentUser?.fullName || 'Supervisor Alert'
              }
            ]
          };
        }
        return t;
      })
    );
    addToast('warning', 'Ticket Escalated', `Ticket escalated to Urgent priority: ${reason}`);
  };

  return (
    <AppContext.Provider
      value={{
        activeView,
        setActiveView,
        currentUser,
        isAuthenticated: Boolean(currentUser),
        userRole,
        setUserRole,
        login,
        logout,
        resetPassword,
        isLoginModalOpen,
        setIsLoginModalOpen,
        switchRole,
        hubs,
        selectedHubFilter,
        setSelectedHubFilter,
        addHub,
        updateHub,
        toggleHubStatus,
        deleteHub,
        categories,
        selectedCategory,
        setSelectedCategory,
        addCategory,
        updateCategory,
        deleteCategory,
        reassignCategoryToHub,
        reassignCategoryToOp,
        products,
        publishedProducts,
        selectedProduct,
        setSelectedProduct,
        searchQuery,
        setSearchQuery,
        addProduct,
        updateProduct,
        toggleProductPublished,
        deleteProduct,
        updateStock,
        slmUnits,
        requisitions,
        lowStockAlerts,
        selectedOpFilter,
        setSelectedOpFilter,
        createRequisition,
        updateRequisitionStatus,
        updateOpDetails,
        updateItemPrepStatus,
        dismissLowStockAlert,
        generateRequisitionFromLowStock,
        transferStockToOp,
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartItemCount,
        wishlist,
        toggleWishlist,
        orders,
        placeOrder,
        updateOrderStatus,
        selectedTrackingOrder,
        setSelectedTrackingOrder,
        leads,
        addLead,
        updateLeadStatus,
        addLeadInteraction,
        tickets,
        createTicket,
        updateTicketStatus,
        assignTicket,
        addTicketMessage,
        escalateTicket,
        toasts,
        addToast,
        removeToast,
        formatNGN
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
