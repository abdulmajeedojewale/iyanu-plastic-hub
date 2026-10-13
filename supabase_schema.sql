-- ==============================================================================
-- IYANU PLASTIC & GENERAL MERCHANDISE — SUPABASE BACKEND DATABASE SCHEMA
-- Single Source of Truth for E-Commerce + CRM + SLM + Warehouse Inventory
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. User Profiles & Role-Based Access Control (RBAC)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'staff', 'admin', 'superadmin', 'slm', 'warehouse', 'op1_manager', 'op2_manager', 'op3_manager', 'op4_manager')),
    assigned_hub_id TEXT,
    assigned_op_id TEXT,
    phone TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. SLM Hubs (Hub 1, Hub 2, Hub 3, Hub 4, Hub 5, Hub 6, Hub 7, + dynamic new hubs)
CREATE TABLE IF NOT EXISTS hubs (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    code TEXT NOT NULL UNIQUE,
    slm_id TEXT NOT NULL DEFAULT 'slm-main',
    location TEXT NOT NULL,
    manager_name TEXT NOT NULL,
    contact_phone TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    description TEXT,
    default_op_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Product Categories (SLM -> Hub -> Product Category -> Products)
CREATE TABLE IF NOT EXISTS categories (
    id TEXT PRIMARY KEY,
    hub_id TEXT NOT NULL REFERENCES hubs(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    icon_name TEXT DEFAULT 'Boxes',
    description TEXT,
    item_count INT DEFAULT 0,
    image TEXT,
    assigned_op_id TEXT DEFAULT 'op-1',
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Products & Inventory
CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    sku TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL,
    category_id TEXT REFERENCES categories(id) ON DELETE SET NULL,
    hub_id TEXT NOT NULL REFERENCES hubs(id) ON DELETE RESTRICT,
    hub_name TEXT,
    slm_id TEXT DEFAULT 'slm-main',
    assigned_op_id TEXT NOT NULL DEFAULT 'op-1',
    warehouse_location TEXT DEFAULT 'Central Warehouse Bay A',
    description TEXT,
    base_price NUMERIC(12, 2) NOT NULL,
    discount_price NUMERIC(12, 2),
    stock_quantity INT NOT NULL DEFAULT 0,
    warehouse_stock INT NOT NULL DEFAULT 0,
    op_stock JSONB DEFAULT '{}'::jsonb,
    min_alert_threshold INT DEFAULT 20,
    availability TEXT DEFAULT 'in_stock' CHECK (availability IN ('in_stock', 'low_stock', 'out_of_stock', 'discontinued')),
    is_published BOOLEAN DEFAULT true,
    is_archived BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false,
    is_bestseller BOOLEAN DEFAULT false,
    is_new_arrival BOOLEAN DEFAULT false,
    rating NUMERIC(3, 2) DEFAULT 5.0,
    review_count INT DEFAULT 0,
    images TEXT[] DEFAULT ARRAY[]::TEXT[],
    specs JSONB DEFAULT '{}'::jsonb,
    variants JSONB DEFAULT '[]'::jsonb,
    min_bulk_order_qty INT DEFAULT 5,
    bulk_discount_percent INT DEFAULT 10,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Customer Orders
CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    order_number TEXT NOT NULL UNIQUE,
    customer_id TEXT NOT NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    subtotal NUMERIC(12, 2) NOT NULL,
    delivery_fee NUMERIC(12, 2) NOT NULL,
    total_amount NUMERIC(12, 2) NOT NULL,
    payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
    payment_gateway TEXT NOT NULL CHECK (payment_gateway IN ('paystack', 'flutterwave', 'bank_transfer', 'cash_on_delivery')),
    payment_reference TEXT,
    order_status TEXT NOT NULL DEFAULT 'pending' CHECK (order_status IN ('pending', 'confirmed', 'processing', 'ready_for_dispatch', 'shipped', 'delivered', 'cancelled')),
    delivery_address JSONB NOT NULL,
    carrier_name TEXT,
    tracking_number TEXT,
    estimated_delivery TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. SLM Goods Requisitions
CREATE TABLE IF NOT EXISTS slm_requisitions (
    id TEXT PRIMARY KEY,
    requisition_number TEXT NOT NULL UNIQUE,
    op_id TEXT NOT NULL,
    op_name TEXT NOT NULL,
    requester_name TEXT NOT NULL,
    urgency TEXT NOT NULL CHECK (urgency IN ('routine', 'urgent', 'critical_low_stock', 'customer_order_fulfillment')),
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'in_preparation', 'dispatched_to_op', 'received_completed')),
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    notes TEXT,
    rejection_reason TEXT,
    approved_by TEXT,
    approved_at TIMESTAMPTZ,
    dispatched_at TIMESTAMPTZ,
    received_at TIMESTAMPTZ,
    linked_order_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. CRM Leads & Customer Records
CREATE TABLE IF NOT EXISTS crm_leads (
    id TEXT PRIMARY KEY,
    customer_name TEXT NOT NULL,
    business_name TEXT,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    state TEXT NOT NULL,
    lead_source TEXT DEFAULT 'Storefront',
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'negotiation', 'converted', 'lost')),
    estimated_value NUMERIC(12, 2) DEFAULT 0,
    assigned_staff TEXT,
    notes TEXT,
    lifetime_spend NUMERIC(12, 2) DEFAULT 0,
    order_count INT DEFAULT 0,
    last_contact_date TIMESTAMPTZ DEFAULT NOW(),
    interactions JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. SLA Support Tickets
CREATE TABLE IF NOT EXISTS support_tickets (
    id TEXT PRIMARY KEY,
    ticket_number TEXT NOT NULL UNIQUE,
    customer_id TEXT NOT NULL,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    order_id TEXT,
    order_number TEXT,
    subject TEXT NOT NULL,
    category TEXT NOT NULL,
    priority TEXT NOT NULL CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'assigned', 'in_progress', 'waiting', 'resolved', 'closed')),
    assigned_to TEXT DEFAULT 'Unassigned',
    response_deadline TIMESTAMPTZ NOT NULL,
    resolution_deadline TIMESTAMPTZ NOT NULL,
    first_response_at TIMESTAMPTZ,
    resolved_at TIMESTAMPTZ,
    is_breached BOOLEAN DEFAULT false,
    messages JSONB DEFAULT '[]'::jsonb,
    history JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE hubs ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE slm_requisitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;

-- Allow public read access to active Hubs, Categories, and Published Products
CREATE POLICY "Public can view active hubs" ON hubs FOR SELECT USING (status = 'active');
CREATE POLICY "Public can view active categories" ON categories FOR SELECT USING (status = 'active');
CREATE POLICY "Public can view published products" ON products FOR SELECT USING (is_published = true);

-- Allow authenticated admins / staff full access
CREATE POLICY "Staff full access to hubs" ON hubs FOR ALL TO authenticated USING (true);
CREATE POLICY "Staff full access to categories" ON categories FOR ALL TO authenticated USING (true);
CREATE POLICY "Staff full access to products" ON products FOR ALL TO authenticated USING (true);
CREATE POLICY "Staff full access to orders" ON orders FOR ALL TO authenticated USING (true);
CREATE POLICY "Staff full access to slm_requisitions" ON slm_requisitions FOR ALL TO authenticated USING (true);
CREATE POLICY "Staff full access to crm_leads" ON crm_leads FOR ALL TO authenticated USING (true);
CREATE POLICY "Staff full access to support_tickets" ON support_tickets FOR ALL TO authenticated USING (true);

-- Allow public to place orders and create support tickets
CREATE POLICY "Public can insert orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can insert support tickets" ON support_tickets FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can track their order" ON orders FOR SELECT USING (true);

-- ==============================================================================
-- STORAGE BUCKET CONFIGURATION (PRODUCT MEDIA)
-- ==============================================================================
-- 1. Insert product-images public bucket if not present
INSERT INTO storage.buckets (id, name, public) 
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Storage RLS: Public can view product images
CREATE POLICY "Public can view product images" ON storage.objects
    FOR SELECT TO public
    USING (bucket_id = 'product-images');

-- 3. Storage RLS: Authenticated staff/admin can upload product images
CREATE POLICY "Authenticated users can upload product images" ON storage.objects
    FOR INSERT TO authenticated
    WITH CHECK (bucket_id = 'product-images');

-- 4. Storage RLS: Authenticated staff/admin can update product images
CREATE POLICY "Authenticated users can update product images" ON storage.objects
    FOR UPDATE TO authenticated
    USING (bucket_id = 'product-images');

-- 5. Storage RLS: Authenticated staff/admin can delete product images
CREATE POLICY "Authenticated users can delete product images" ON storage.objects
    FOR DELETE TO authenticated
    USING (bucket_id = 'product-images');

-- ==============================================================================
-- INITIAL SEED DATA: HUBS 1 TO 7 + CATEGORIES & PRODUCTS
-- ==============================================================================

-- Seed Hubs 1 through 7
INSERT INTO hubs (id, name, code, slm_id, location, manager_name, contact_phone, status, description, default_op_id) VALUES
('hub-1', 'Hub 1 - Heavy Polymer & Specialty Depot', 'HUB-1', 'slm-lagos', 'Plot 12 Commercial Ave, Ikeja Industrial Estate, Lagos', 'Engr. Babatunde Lawal', '+234 803 112 3456', 'active', 'Primary manufacturing and fulfillment center for balloons, buckets, bowls, PET packaging, and storage drums.', 'op-1'),
('hub-2', 'Hub 2 - Sanitation & Environmental Logistics', 'HUB-2', 'slm-lagos', 'Ikeja Depot - Floor Bay B3, Lagos', 'Folake Adeleke', '+234 802 998 7766', 'active', 'Specialized handling for 120L/240L wheelie bins, clinical waste containers, and sanitation carts.', 'op-2'),
('hub-3', 'Hub 3 - Commercial Furniture & Seating Hub', 'HUB-3', 'slm-abuja', 'Idu Industrial Layout Phase 2, Abuja FCT', 'Chinedu Eze', '+234 814 550 1289', 'active', 'Distribution center for heavy event monobloc chairs, banquet tables, and institutional seating.', 'op-3'),
('hub-4', 'Hub 4 - Household Utilities & Electricals', 'HUB-4', 'slm-lagos', 'Ikeja Depot - Floor Bay C2, Lagos', 'Amina Bello', '+234 809 331 4455', 'active', 'Assembly & distribution for extension boxes, household basins, and kitchen storage organizers.', 'op-4'),
('hub-5', 'Hub 5 - Agriculture & Harvesting Crates', 'HUB-5', 'slm-southwest', 'Ibadan Regional Logistics Warehouse, Oyo State', 'Rasheed Alabi', '+234 805 123 9988', 'active', 'Perforated agro-crates, poultry transportation crates, and greenhouse seedling trays.', 'op-1'),
('hub-6', 'Hub 6 - Industrial Logistics & Chemical Carboys', 'HUB-6', 'slm-east', 'Trans-Amadi Industrial Layout, Port Harcourt, Rivers', 'Grace Nnamdi', '+234 818 443 2100', 'active', 'UN-certified chemical carboys, reinforced containment pallets, and heavy fluid IBC totes.', 'op-1'),
('hub-7', 'Hub 7 - Retail Merchandise & Packaging Sacks', 'HUB-7', 'slm-north', 'Kano Commercial Center, Bompai Industrial Area, Kano', 'Musa Garba', '+234 803 776 5432', 'active', 'High-density poly sacks, transparent merchandise packaging, and retail display racks.', 'op-4')
ON CONFLICT (id) DO NOTHING;

-- Seed Hub 1 Categories
INSERT INTO categories (id, hub_id, name, slug, icon_name, description, item_count, image, assigned_op_id, status) VALUES
('cat-h1-2', 'hub-1', 'Calibrated Buckets', 'calibrated-buckets', 'Boxes', 'Heavy-duty calibrated household, laundry, and industrial-grade buckets with precision litre graduation marks.', 44, 'https://www.iyanuplasticstores.com/web/image/product.template/12333/image_512/%5BP124%5D%20P124%20-%2015L%20Bucket%20HF?unique=3fc1fe9', 'op-1', 'active'),
('cat-h1-3', 'hub-1', 'Ordinary Buckets', 'ordinary-buckets', 'Boxes', 'Everyday heavy-duty laundry, cleaning, and multipurpose household water buckets with graduation marks.', 38, 'https://www.iyanuplasticstores.com/web/image/product.template/12327/image_512/%5BP117%5D%20P117%20-%20Spiral%20Bucket%2015L%20VIK?unique=dea483c', 'op-1', 'active'),
('cat-h1-4', 'hub-1', 'Bowls', 'bowls', 'Circle', 'Extra-deep polymer washing, mixing, catering, and soaking basins with non-slip base grip.', 195, 'https://www.iyanuplasticstores.com/web/image/product.template/24734/image_512/%5BCC46%5D%20CC46%20-%20Dome%20Basin%2020cm?unique=3553933', 'op-1', 'active'),
('cat-h1-5', 'hub-1', 'PET Bottles', 'pet-bottles', 'Package', 'Crystal-clear food grade PET preforms, juice bottles, beverage packaging, and dispenser containers.', 32, 'https://www.iyanuplasticstores.com/web/image/product.template/24549/image_512/%5BA12%5D%20A12%20-%20Jojo%20500ml%20%2828mm-L%29%20x120%20%C2%B2%E2%81%B0?unique=b30f566', 'op-1', 'active'),
('cat-h1-6', 'hub-1', 'Packaging Products', 'packaging', 'ShoppingBag', 'Industrial clamshells, thermoformed trays, tamper-proof jars, and retail packaging containers.', 30, 'https://www.iyanuplasticstores.com/web/image/product.template/24678/image_512/%5BB48%5D%20B48%20-%20Pioneer%20400ml?unique=ba01484', 'op-1', 'active'),
('cat-h1-7', 'hub-1', 'Plastic Products & Storage Drums', 'plastic-products', 'Layers', 'Industrial 20L to 120L water and chemical storage drums with brass tap fittings and sealed lids.', 1153, 'https://www.iyanuplasticstores.com/web/image/product.template/5109/image_512/%5BA123%5D%20A123%20-%20Keg%2050L%20SAC%2A%2A%2A?unique=f0c55a8', 'op-1', 'active'),
-- Hub 2 Categories
('cat-h2-1', 'hub-2', 'Waste Management & Sanitation', 'waste-management', 'Trash2', '120L & 240L mobile waste wheelie bins, vintage dustbins, recycling bins, and hospital clinical bins.', 44, 'https://www.iyanuplasticstores.com/web/image/product.template/24032/image_512/%5BN105%5D%20N105%20-%20Vintage%20Dustbin%20%28B%29?unique=849c816', 'op-2', 'active'),
-- Hub 3 Categories
('cat-h3-1', 'hub-3', 'Durable Plastic Furniture', 'furniture', 'Armchair', 'Commercial stackable monobloc chairs, banquet tables, school desks, and outdoor armchairs.', 57, 'https://www.iyanuplasticstores.com/web/image/product.template/24699/image_512/%5BC1%5D%20C1%20-%20Strong%20S%20Chair%2A%2A%2A?unique=f9246cb', 'op-3', 'active'),
-- Hub 4 Categories
('cat-h4-1', 'hub-4', 'Electrical & Household Items', 'electrical-household', 'Zap', 'Surge extension boxes, rechargeable solar lamps, kitchen organizers, and electrical fittings.', 385, 'https://www.iyanuplasticstores.com/web/image/product.template/18540/image_512/%5BYY123%5D%20YY123%20-%20Wine%20Glass%20x6%20%5BES1002%5D?unique=8a1f5e8', 'op-4', 'active')
ON CONFLICT (id) DO NOTHING;
