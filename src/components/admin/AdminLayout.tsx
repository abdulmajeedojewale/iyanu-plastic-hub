import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Boxes,
  Users,
  Clock,
  Truck,
  ArrowLeft,
  ClipboardList,
  ShieldCheck,
  Building2,
  Layers,
  ChevronDown,
  Warehouse,
  UserCheck
} from 'lucide-react';
import { Role } from '../../types';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const {
    activeView,
    setActiveView,
    tickets,
    userRole,
    setUserRole,
    requisitions,
    lowStockAlerts
  } = useApp();

  const breachedTickets = tickets.filter(t => t.isBreached && t.status !== 'resolved');
  const pendingRequisitions = requisitions.filter(r => r.status === 'pending');
  const activeAlerts = lowStockAlerts.filter(a => a.status === 'active');

  const navItems = [
    {
      id: 'admin-dashboard',
      label: 'Executive Dashboard',
      icon: <LayoutDashboard size={18} />
    },
    {
      id: 'admin-slm',
      label: 'SLM & Requisitions',
      icon: <ClipboardList size={18} />,
      badge: pendingRequisitions.length > 0 ? `${pendingRequisitions.length} REQ` : (activeAlerts.length > 0 ? 'ALERT' : undefined),
      badgeColor: pendingRequisitions.length > 0 ? '#f59e0b' : '#ef4444'
    },
    {
      id: 'admin-orders',
      label: 'Order Dispatch Pipeline',
      icon: <Truck size={18} />
    },
    {
      id: 'admin-products',
      label: 'Products & Inventory',
      icon: <Boxes size={18} />
    },
    {
      id: 'admin-crm',
      label: 'CRM & Customer 360',
      icon: <Users size={18} />
    },
    {
      id: 'admin-sla',
      label: 'SLA Support Engine',
      icon: <Clock size={18} />,
      badge: breachedTickets.length > 0 ? `${breachedTickets.length} BREACH` : undefined,
      badgeColor: '#ef4444'
    }
  ];

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 100px)', background: '#f8fafc' }}>
      {/* Admin Sidebar */}
      <aside style={{
        width: '270px',
        background: '#0f172a',
        color: '#ffffff',
        padding: '24px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        flexShrink: 0
      }}>
        {/* Hub Title with Logo */}
        <div style={{ padding: '0 8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img
            src="/logo.png"
            alt="IPS Logo"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid #eab308',
              boxShadow: '0 2px 8px rgba(234, 179, 8, 0.4)'
            }}
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#2dd4bf', fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              IYANU MANAGEMENT
            </div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#ffffff', margin: '2px 0 0 0' }}>
              Operations Hub
            </h2>
          </div>
        </div>

        {/* Role-Based Switcher inside Admin Sidebar */}
        <div style={{
          background: '#1e293b',
          borderRadius: '10px',
          padding: '12px',
          border: '1px solid #334155'
        }}>
          <label style={{ display: 'block', fontSize: '0.7rem', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 800, marginBottom: '6px' }}>
            Active Personnel Role:
          </label>
          <select
            value={userRole}
            onChange={e => setUserRole(e.target.value as Role)}
            style={{
              width: '100%',
              background: '#0f172a',
              color: '#5eead4',
              border: '1px solid #0f766e',
              borderRadius: '6px',
              padding: '6px 8px',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            <option value="superadmin">👑 Super Admin / General Manager</option>
            <option value="admin">🏢 Executive Admin</option>
            <option value="warehouse">🏭 Central Warehouse Lead</option>
            <option value="op1_manager">📦 OP 1 - Heavy Storage Lead</option>
            <option value="op2_manager">🗑️ OP 2 - Sanitation Lead</option>
            <option value="op3_manager">🪑 OP 3 - Furniture Lead</option>
            <option value="op4_manager">🔌 OP 4 - Household Lead</option>
            <option value="staff">🧑‍💼 Support Staff</option>
          </select>
        </div>

        {/* Navigation Menu */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
          {navItems.map(item => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: 'none',
                  background: isActive ? 'linear-gradient(135deg, #0f766e 0%, #134e4a 100%)' : 'transparent',
                  color: isActive ? '#ffffff' : '#94a3b8',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {item.icon}
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className="sla-pulse-urgent" style={{
                    background: item.badgeColor,
                    color: '#ffffff',
                    fontSize: '0.65rem',
                    fontWeight: 900,
                    padding: '2px 6px',
                    borderRadius: '999px'
                  }}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Switch to Customer Storefront button */}
        <div style={{ borderTop: '1px solid #1e293b', paddingTop: '16px' }}>
          <button
            onClick={() => {
              setUserRole('customer');
              setActiveView('store');
            }}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 14px',
              borderRadius: '8px',
              background: '#1e293b',
              color: '#94a3b8',
              border: 'none',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <ArrowLeft size={16} /> Return to Storefront
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '32px', overflowX: 'hidden' }}>
        {children}
      </main>
    </div>
  );
};
