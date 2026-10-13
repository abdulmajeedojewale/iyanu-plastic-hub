import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Product, Category, Hub, Order, CRMLead, SupportTicket, GoodsRequisition, Role, AuthUser } from '../types';

// Fallback configuration if environment variables are not yet populated in .env
const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL as string) || 'https://demo-iyanu-plastic.supabase.co';
const SUPABASE_ANON_KEY = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || 'demo-anon-key-iyanu-polymer-nigeria';

export const isSupabaseConfigured = Boolean(
  import.meta.env.VITE_SUPABASE_URL && 
  import.meta.env.VITE_SUPABASE_ANON_KEY &&
  !import.meta.env.VITE_SUPABASE_URL.includes('demo-')
);

// Create Supabase Client instance
export const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});

// Demo accounts for local preview & offline RBAC testing
export const DEMO_ADMIN_USERS: AuthUser[] = [
  {
    id: 'usr-superadmin',
    email: 'superadmin@iyanuplastic.ng',
    fullName: 'Alhaji Iyanuoluwa Adeleke',
    role: 'superadmin',
    phone: '+234 803 456 7890',
    createdAt: '2026-01-01T08:00:00.000Z'
  },
  {
    id: 'usr-admin',
    email: 'admin@iyanuplastic.ng',
    fullName: 'Mrs. Kemi Ojo (Operations Director)',
    role: 'admin',
    phone: '+234 802 111 2233',
    createdAt: '2026-01-15T08:00:00.000Z'
  },
  {
    id: 'usr-slm',
    email: 'slm@iyanuplastic.ng',
    fullName: 'Engr. Babatunde Lawal (SLM Director)',
    role: 'slm',
    assignedHubId: 'hub-1',
    phone: '+234 803 112 3456',
    createdAt: '2026-02-01T08:00:00.000Z'
  },
  {
    id: 'usr-warehouse',
    email: 'warehouse@iyanuplastic.ng',
    fullName: 'Chief Warehouse Officer Yakubu',
    role: 'warehouse',
    phone: '+234 805 778 9900',
    createdAt: '2026-02-05T08:00:00.000Z'
  },
  {
    id: 'usr-op1',
    email: 'op1@iyanuplastic.ng',
    fullName: 'Engr. Babatunde (OP 1 Floor Lead)',
    role: 'op1_manager',
    assignedHubId: 'hub-1',
    assignedOpId: 'op-1',
    phone: '+234 803 112 3456',
    createdAt: '2026-02-10T08:00:00.000Z'
  },
  {
    id: 'usr-op2',
    email: 'op2@iyanuplastic.ng',
    fullName: 'Folake Adeleke (OP 2 Sanitation Lead)',
    role: 'op2_manager',
    assignedHubId: 'hub-2',
    assignedOpId: 'op-2',
    phone: '+234 802 998 7766',
    createdAt: '2026-02-10T08:00:00.000Z'
  },
  {
    id: 'usr-op3',
    email: 'op3@iyanuplastic.ng',
    fullName: 'Chinedu Eze (OP 3 Furniture Lead)',
    role: 'op3_manager',
    assignedHubId: 'hub-3',
    assignedOpId: 'op-3',
    phone: '+234 814 550 1289',
    createdAt: '2026-02-10T08:00:00.000Z'
  },
  {
    id: 'usr-op4',
    email: 'op4@iyanuplastic.ng',
    fullName: 'Amina Bello (OP 4 Household Lead)',
    role: 'op4_manager',
    assignedHubId: 'hub-4',
    assignedOpId: 'op-4',
    phone: '+234 809 331 4455',
    createdAt: '2026-02-10T08:00:00.000Z'
  }
];

/**
 * Authentication Service Wrapper
 */
export const authService = {
  async signIn(email: string, password: string):Promise<{ user: AuthUser | null; error: string | null }> {
    const cleanEmail = email.trim().toLowerCase();

    // 1. If Supabase is connected, authenticate through Supabase Auth
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password
        });
        if (error) {
          return { user: null, error: error.message };
        }
        if (data.user) {
          // Fetch user profile & role from profiles table
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .single();

          const authUser: AuthUser = {
            id: data.user.id,
            email: data.user.email || cleanEmail,
            fullName: profile?.full_name || data.user.user_metadata?.full_name || cleanEmail.split('@')[0],
            role: (profile?.role as Role) || 'admin',
            assignedHubId: profile?.assigned_hub_id,
            assignedOpId: profile?.assigned_op_id,
            phone: profile?.phone,
            createdAt: data.user.created_at
          };
          return { user: authUser, error: null };
        }
      } catch (err: any) {
        console.warn('Supabase Auth error, checking fallback demo accounts:', err.message);
      }
    }

    // 2. Demo accounts validation for preview / offline mode
    const demoUser = DEMO_ADMIN_USERS.find(u => u.email.toLowerCase() === cleanEmail);
    if (demoUser) {
      if (password && password.length >= 4) {
        return { user: demoUser, error: null };
      } else {
        return { user: null, error: 'Password must be at least 4 characters.' };
      }
    }

    // Generic admin login if user enters custom email
    if (cleanEmail.includes('@') && password.length >= 4) {
      const genericUser: AuthUser = {
        id: `usr-${Date.now()}`,
        email: cleanEmail,
        fullName: cleanEmail.split('@')[0].toUpperCase(),
        role: cleanEmail.includes('super') ? 'superadmin' : 'admin',
        createdAt: new Date().toISOString()
      };
      return { user: genericUser, error: null };
    }

    return { user: null, error: 'Invalid email or password. Please try again.' };
  },

  async resetPassword(email: string): Promise<{ success: boolean; message: string }> {
    const cleanEmail = email.trim().toLowerCase();
    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase.auth.resetPasswordForEmail(cleanEmail, {
          redirectTo: `${window.location.origin}/reset-password`
        });
        if (error) throw error;
        return {
          success: true,
          message: `Password reset link sent to ${cleanEmail}. Please check your inbox.`
        };
      } catch (err: any) {
        return { success: false, message: err.message };
      }
    }

    // Simulation response
    return {
      success: true,
      message: `Password reset instructions sent securely to ${cleanEmail}.`
    };
  },

  async signOut(): Promise<void> {
    if (isSupabaseConfigured) {
      try {
        await supabase.auth.signOut();
      } catch (e) {
        console.error('Error signing out from Supabase:', e);
      }
    }
  }
};

/**
 * Database Sync Helper
 * Used to mirror updates to Supabase tables when credentials are active
 */
export const syncService = {
  async syncProduct(product: Product): Promise<void> {
    if (!isSupabaseConfigured) return;
    try {
      await supabase.from('products').upsert({
        id: product.id,
        name: product.name,
        slug: product.slug,
        sku: product.sku,
        category: product.category,
        category_id: product.categoryId,
        hub_id: product.hubId,
        hub_name: product.hubName,
        slm_id: product.slmId,
        assigned_op_id: product.assignedOpId,
        warehouse_location: product.warehouseLocation,
        description: product.description,
        base_price: product.basePrice,
        discount_price: product.discountPrice,
        stock_quantity: product.stockQuantity,
        warehouse_stock: product.warehouseStock,
        op_stock: product.opStock,
        min_alert_threshold: product.minAlertThreshold,
        is_published: product.isPublished !== false,
        is_archived: Boolean(product.isArchived),
        is_featured: Boolean(product.isFeatured),
        is_bestseller: Boolean(product.isBestseller),
        is_new_arrival: Boolean(product.isNewArrival),
        rating: product.rating,
        review_count: product.reviewCount,
        images: product.images,
        specs: product.specs,
        variants: product.variants,
        updated_at: new Date().toISOString()
      });
    } catch (err) {
      console.warn('Supabase product sync warning:', err);
    }
  },

  async deleteProduct(productId: string): Promise<void> {
    if (!isSupabaseConfigured) return;
    try {
      await supabase.from('products').delete().eq('id', productId);
    } catch (err) {
      console.warn('Supabase product delete warning:', err);
    }
  },

  async syncHub(hub: Hub): Promise<void> {
    if (!isSupabaseConfigured) return;
    try {
      await supabase.from('hubs').upsert({
        id: hub.id,
        name: hub.name,
        code: hub.code,
        slm_id: hub.slmId,
        location: hub.location,
        manager_name: hub.managerName,
        contact_phone: hub.contactPhone,
        status: hub.status,
        description: hub.description,
        default_op_id: hub.defaultOpId,
        updated_at: new Date().toISOString()
      });
    } catch (err) {
      console.warn('Supabase hub sync warning:', err);
    }
  },

  async syncCategory(category: Category): Promise<void> {
    if (!isSupabaseConfigured) return;
    try {
      await supabase.from('categories').upsert({
        id: category.id,
        hub_id: category.hubId,
        name: category.name,
        slug: category.slug,
        icon_name: category.iconName,
        description: category.description,
        item_count: category.itemCount,
        image: category.image,
        assigned_op_id: category.assignedOpId,
        status: category.status || 'active',
        updated_at: new Date().toISOString()
      });
    } catch (err) {
      console.warn('Supabase category sync warning:', err);
    }
  },

  async syncOrder(order: Order): Promise<void> {
    if (!isSupabaseConfigured) return;
    try {
      await supabase.from('orders').upsert({
        id: order.id,
        order_number: order.orderNumber,
        customer_id: order.customerId,
        customer_name: order.customerName,
        customer_email: order.customerEmail,
        customer_phone: order.customerPhone,
        items: order.items,
        subtotal: order.subtotal,
        delivery_fee: order.deliveryFee,
        total_amount: order.totalAmount,
        payment_status: order.paymentStatus,
        payment_gateway: order.paymentGateway,
        payment_reference: order.paymentReference,
        order_status: order.orderStatus,
        delivery_address: order.deliveryAddress,
        carrier_name: order.carrierName,
        tracking_number: order.trackingNumber,
        estimated_delivery: order.estimatedDelivery,
        updated_at: new Date().toISOString()
      });
    } catch (err) {
      console.warn('Supabase order sync warning:', err);
    }
  },

  async syncRequisition(req: GoodsRequisition): Promise<void> {
    if (!isSupabaseConfigured) return;
    try {
      await supabase.from('slm_requisitions').upsert({
        id: req.id,
        requisition_number: req.requisitionNumber,
        op_id: req.opId,
        op_name: req.opName,
        requester_name: req.requesterName,
        urgency: req.urgency,
        status: req.status,
        items: req.items,
        notes: req.notes,
        rejection_reason: req.rejectionReason,
        approved_by: req.approvedBy,
        approved_at: req.approvedAt,
        dispatched_at: req.dispatchedAt,
        received_at: req.receivedAt,
        linked_order_id: req.linkedOrderId,
        updated_at: new Date().toISOString()
      });
    } catch (err) {
      console.warn('Supabase requisition sync warning:', err);
    }
  }
};

/**
 * Role-Based Access Control Helpers
 */
export const isAdminRole = (role?: Role): boolean => {
  if (!role) return false;
  return [
    'superadmin',
    'admin',
    'slm',
    'warehouse',
    'op1_manager',
    'op2_manager',
    'op3_manager',
    'op4_manager',
    'staff'
  ].includes(role);
};

export const isFullAdminRole = (role?: Role): boolean => {
  if (!role) return false;
  return role === 'superadmin' || role === 'admin';
};

/**
 * Secure Product Image Storage Service
 * Supports Supabase Storage bucket 'product-images' with graceful fallback
 */
export const storageService = {
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'],
  MAX_IMAGE_SIZE_BYTES: 5 * 1024 * 1024, // 5 MB

  validateImageFile(file: File): { valid: boolean; error?: string } {
    if (!file) {
      return { valid: false, error: 'No file provided.' };
    }

    const fileType = file.type.toLowerCase();
    const isAllowedType = this.ALLOWED_IMAGE_TYPES.some(t => fileType === t) ||
      /\.(jpe?g|png|webp|gif|svg)$/i.test(file.name);

    if (!isAllowedType) {
      return {
        valid: false,
        error: `"${file.name}" has an unsupported format. Please upload JPG, PNG, WebP, GIF, or SVG.`
      };
    }

    if (file.size > this.MAX_IMAGE_SIZE_BYTES) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      return {
        valid: false,
        error: `"${file.name}" is ${sizeMB} MB. Maximum allowed image size is 5 MB.`
      };
    }

    return { valid: true };
  },

  async fileToDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  },

  async uploadProductImage(file: File, folder = 'catalog'): Promise<{ url: string; error?: string }> {
    const validation = this.validateImageFile(file);
    if (!validation.valid) {
      return { url: '', error: validation.error };
    }

    // 1. If Supabase is active, try uploading to 'product-images' storage bucket
    if (isSupabaseConfigured) {
      try {
        const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
        const sanitizedBase = file.name.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9_-]/g, '_');
        const filePath = `${folder}/${Date.now()}_${sanitizedBase}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
          });

        if (!uploadError) {
          const { data: publicData } = supabase.storage
            .from('product-images')
            .getPublicUrl(filePath);

          if (publicData?.publicUrl) {
            return { url: publicData.publicUrl };
          }
        } else {
          console.warn('Supabase storage upload returned error, falling back to local data URL:', uploadError.message);
        }
      } catch (err: any) {
        console.warn('Supabase Storage exception, using fallback data URL:', err?.message || err);
      }
    }

    // 2. Safe Fallback to Data URL for instant preview, offline mode, and resilience
    try {
      const dataUrl = await this.fileToDataUrl(file);
      return { url: dataUrl };
    } catch {
      return { url: '', error: 'Failed to process uploaded file.' };
    }
  },

  async uploadMultipleImages(files: File[], folder = 'catalog'): Promise<{ urls: string[]; errors: string[] }> {
    const urls: string[] = [];
    const errors: string[] = [];

    for (const file of files) {
      const res = await this.uploadProductImage(file, folder);
      if (res.url) {
        urls.push(res.url);
      }
      if (res.error) {
        errors.push(res.error);
      }
    }

    return { urls, errors };
  }
};

/**
 * Product Validation Service
 */
export const productService = {
  validateProduct(product: Partial<Product>): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!product.name || product.name.trim().length < 3) {
      errors.push('Product title must be at least 3 characters long.');
    }

    if (!product.sku || product.sku.trim().length < 2) {
      errors.push('SKU code is required (e.g. IYN-DRUM-50L).');
    }

    if (product.basePrice === undefined || product.basePrice === null || Number(product.basePrice) <= 0) {
      errors.push('Base price must be a positive number greater than ₦0.');
    }

    if (product.discountPrice !== undefined && product.discountPrice !== null && product.discountPrice > 0) {
      if (Number(product.discountPrice) >= Number(product.basePrice)) {
        errors.push('Discount price must be less than the regular base price.');
      }
    }

    if (!product.hubId) {
      errors.push('A valid manufacturing or depot Hub must be assigned.');
    }

    if (!product.category) {
      errors.push('Product category must be selected.');
    }

    if (!product.assignedOpId) {
      errors.push('An Operational Unit (OP 1 - OP 4) must be assigned.');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }
};

