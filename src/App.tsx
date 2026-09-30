import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { ToastContainer } from './components/ToastContainer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { StorefrontView } from './components/StorefrontView';
import { CatalogView } from './components/CatalogView';
import { OrderTrackingView } from './components/OrderTrackingView';
import { CustomerPortalView } from './components/CustomerPortalView';
import { AdminLayout } from './components/admin/AdminLayout';
import { BusinessDashboard } from './components/admin/BusinessDashboard';
import { ProductManager } from './components/admin/ProductManager';
import { HubManager } from './components/admin/HubManager';
import { CRMManager } from './components/admin/CRMManager';
import { SLATicketManager } from './components/admin/SLATicketManager';
import { OrderManager } from './components/admin/OrderManager';
import { SLMManager } from './components/admin/SLMManager';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import {
  Layers,
  PhoneCall,
  Mail,
  MapPin,
  ShieldCheck,
  Truck,
  Heart
} from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeView, setActiveView, setIsLoginModalOpen } = useApp();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Top Header */}
      <Header />

      {/* Main Body Routing */}
      <div style={{ flex: 1 }}>
        {activeView === 'store' && <StorefrontView />}
        {activeView === 'catalog' && <CatalogView />}
        {activeView === 'order-tracking' && <OrderTrackingView />}
        {activeView === 'customer-portal' && <CustomerPortalView />}

        {/* Admin Section */}
        {activeView === 'admin-dashboard' && (
          <AdminLayout>
            <BusinessDashboard />
          </AdminLayout>
        )}
        {activeView === 'admin-hubs' && (
          <AdminLayout>
            <HubManager />
          </AdminLayout>
        )}
        {activeView === 'admin-slm' && (
          <AdminLayout>
            <SLMManager />
          </AdminLayout>
        )}
        {activeView === 'admin-products' && (
          <AdminLayout>
            <ProductManager />
          </AdminLayout>
        )}
        {activeView === 'admin-crm' && (
          <AdminLayout>
            <CRMManager />
          </AdminLayout>
        )}
        {activeView === 'admin-sla' && (
          <AdminLayout>
            <SLATicketManager />
          </AdminLayout>
        )}
        {activeView === 'admin-orders' && (
          <AdminLayout>
            <OrderManager />
          </AdminLayout>
        )}
      </div>

      {/* Footer (Rendered on Customer Views) */}
      {!activeView.startsWith('admin') && (
        <footer style={{
          background: '#0b1120',
          color: '#ffffff',
          padding: '56px 24px 24px 24px',
          borderTop: '1px solid #1e293b',
          marginTop: '60px'
        }}>
          <div style={{
            maxWidth: '1380px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '40px',
            paddingBottom: '40px',
            borderBottom: '1px solid #1e293b'
          }}>
            {/* Col 1: Brand Info */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                <img
                  src="/logo.png"
                  alt="IPS Logo"
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid #eab308',
                    boxShadow: '0 4px 10px rgba(234, 179, 8, 0.4)'
                  }}
                />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 900, margin: 0 }}>
                  IYANU <span style={{ color: '#2dd4bf' }}>PLASTIC</span> HUB
                </h3>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.6, margin: '0 0 16px 0' }}>
                Nigeria's verified commercial distributor of virgin-grade polymer storage drums, mobile waste bins, heavy furniture, and general household utilities.
              </p>
              <div style={{ fontSize: '0.8rem', color: '#2dd4bf', fontWeight: 600 }}>
                RC No: 1849202 • CAC Certified Manufacturer
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '16px', color: '#f8fafc' }}>
                Quick Navigation
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
                <li>
                  <a onClick={() => setActiveView('catalog')} style={{ color: '#94a3b8', cursor: 'pointer', textDecoration: 'none' }}>
                    Shop Heavy Drums & Bins
                  </a>
                </li>
                <li>
                  <a onClick={() => setActiveView('order-tracking')} style={{ color: '#94a3b8', cursor: 'pointer', textDecoration: 'none' }}>
                    Live Fleet Order Tracking
                  </a>
                </li>
                <li>
                  <a onClick={() => setActiveView('customer-portal')} style={{ color: '#94a3b8', cursor: 'pointer', textDecoration: 'none' }}>
                    Customer Portal & SLA Desk
                  </a>
                </li>
                <li>
                  <a onClick={() => setIsLoginModalOpen(true)} style={{ color: '#2dd4bf', cursor: 'pointer', textDecoration: 'none', fontWeight: 700 }}>
                    👑 Staff & Admin Portal Login
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Nigerian Logistics & Hubs */}
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '16px', color: '#f8fafc' }}>
                Warehouse Hubs & Fulfillment
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem', color: '#94a3b8' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <MapPin size={16} color="#2dd4bf" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span><strong>Hub 1 (Lagos):</strong> Plot 12 Commercial Avenue, Ikeja Industrial Estate</span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <MapPin size={16} color="#2dd4bf" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span><strong>Hub 3 (Abuja Depot):</strong> Idu Industrial Layout, Phase 2, Abuja FCT</span>
                </div>
              </div>
            </div>

            {/* Col 4: Contact & Hotlines */}
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '16px', color: '#f8fafc' }}>
                Wholesale Desk & Support
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', color: '#94a3b8' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <PhoneCall size={15} color="#f59e0b" />
                  <span>+234 803 456 7890 (Direct Hotline)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Mail size={15} color="#f59e0b" />
                  <span>orders@iyanuplastic.ng</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Truck size={15} color="#2dd4bf" />
                  <span>Interstate Haulage Dispatch Active</span>
                </div>
              </div>
            </div>
          </div>

          <div style={{
            maxWidth: '1380px',
            margin: '24px auto 0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.75rem',
            color: '#64748b',
            gap: '12px'
          }}>
            <div>
              © {new Date().getFullYear()} IYANU PLASTIC & GENERAL MERCHANDISE LTD. All rights reserved.
            </div>
            <div>
              Powered by Supabase Auth & PostgreSQL Realtime Single Source of Truth
            </div>
          </div>
        </footer>
      )}

      {/* Global Modals & Drawers */}
      <ProductDetailModal />
      <CartDrawer onProceedToCheckout={() => setIsCheckoutOpen(true)} />
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderSuccess={() => {
          setIsCheckoutOpen(false);
          setActiveView('order-tracking');
        }}
      />
      <AdminLoginModal />
      <ToastContainer />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
