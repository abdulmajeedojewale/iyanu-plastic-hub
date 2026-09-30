import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShoppingBag,
  Heart,
  Search,
  Truck,
  ShieldCheck,
  User,
  LayoutDashboard,
  Layers,
  PhoneCall,
  ChevronDown,
  Lock,
  Building2
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    activeView,
    setActiveView,
    userRole,
    setUserRole,
    currentUser,
    isAuthenticated,
    setIsLoginModalOpen,
    switchRole,
    cartItemCount,
    wishlist,
    setIsCartOpen,
    searchQuery,
    setSearchQuery,
    publishedProducts,
    setSelectedProduct,
    tickets
  } = useApp();

  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  // SLA breach count for admin badge
  const breachedTicketsCount = tickets.filter(t => t.isBreached && t.status !== 'resolved').length;

  // Filter products for quick search dropdown
  const searchResults = searchQuery.trim()
    ? publishedProducts.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.hubName && p.hubName.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 5)
    : [];

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
      {/* Top Commercial Announcement Bar */}
      <div style={{
        background: 'linear-gradient(90deg, #062826 0%, #0d5c57 50%, #062826 100%)',
        color: '#f0fdfa',
        fontSize: '0.8rem',
        padding: '6px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontWeight: 500,
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Truck size={14} color="#f59e0b" />
            <strong>Fast Delivery Across Nigeria</strong> (Hub 1 Lagos, Hub 3 Abuja & Nationwide)
          </span>
          <span style={{ display: 'none', md: 'inline' } as React.CSSProperties}>|</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', opacity: 0.9 }}>
            <ShieldCheck size={14} color="#2dd4bf" />
            Factory-Direct 100% Virgin Polymer Guarantee
          </span>
        </div>

        {/* Quick Role & Perspective Switcher */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Active Mode:</span>
          <button
            onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
            style={{
              background: 'rgba(255, 255, 255, 0.12)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              color: '#ffffff',
              borderRadius: '6px',
              padding: '2px 8px',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            {userRole === 'customer' && '🛒 Customer Storefront'}
            {userRole === 'warehouse' && '🏭 Central Warehouse'}
            {userRole === 'slm' && '📦 SLM Director'}
            {userRole === 'op1_manager' && '📦 OP 1 - Heavy Storage'}
            {userRole === 'op2_manager' && '🗑️ OP 2 - Sanitation Bins'}
            {userRole === 'op3_manager' && '🪑 OP 3 - Furniture'}
            {userRole === 'op4_manager' && '🔌 OP 4 - Household'}
            {userRole === 'staff' && '🧑‍💼 Support Staff'}
            {(userRole === 'admin' || userRole === 'superadmin') && '👑 Operations Hub'}
            <ChevronDown size={12} />
          </button>

          {isRoleDropdownOpen && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '4px',
                background: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '8px',
                padding: '6px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                zIndex: 1100,
                minWidth: '240px'
              }}
            >
              <button
                onClick={() => {
                  switchRole('customer');
                  setActiveView('store');
                  setIsRoleDropdownOpen(false);
                }}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  background: userRole === 'customer' ? '#0f766e' : 'transparent',
                  color: '#ffffff',
                  border: 'none',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  display: 'block'
                }}
              >
                🛒 Customer Storefront
              </button>

              <div style={{ height: '1px', background: '#334155', margin: '4px 0' }} />
              <div style={{ padding: '4px 12px', fontSize: '0.68rem', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase' }}>
                Internal SLM Operations
              </div>

              <button
                onClick={() => {
                  switchRole('slm');
                  setActiveView('admin-hubs');
                  setIsRoleDropdownOpen(false);
                }}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  background: userRole === 'slm' ? '#0f766e' : 'transparent',
                  color: '#ffffff',
                  border: 'none',
                  padding: '7px 12px',
                  borderRadius: '6px',
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                  display: 'block'
                }}
              >
                📦 SLM Director (Hubs & Categories)
              </button>

              <button
                onClick={() => {
                  switchRole('warehouse');
                  setActiveView('admin-slm');
                  setIsRoleDropdownOpen(false);
                }}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  background: userRole === 'warehouse' ? '#0f766e' : 'transparent',
                  color: '#ffffff',
                  border: 'none',
                  padding: '7px 12px',
                  borderRadius: '6px',
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                  display: 'block'
                }}
              >
                🏭 Central Warehouse Lead
              </button>

              <button
                onClick={() => {
                  switchRole('op1_manager');
                  setActiveView('admin-slm');
                  setIsRoleDropdownOpen(false);
                }}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  background: userRole === 'op1_manager' ? '#0f766e' : 'transparent',
                  color: '#ffffff',
                  border: 'none',
                  padding: '7px 12px',
                  borderRadius: '6px',
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                  display: 'block'
                }}
              >
                📦 OP 1 - Heavy Storage Lead
              </button>

              <button
                onClick={() => {
                  switchRole('op2_manager');
                  setActiveView('admin-slm');
                  setIsRoleDropdownOpen(false);
                }}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  background: userRole === 'op2_manager' ? '#0f766e' : 'transparent',
                  color: '#ffffff',
                  border: 'none',
                  padding: '7px 12px',
                  borderRadius: '6px',
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                  display: 'block'
                }}
              >
                🗑️ OP 2 - Sanitation & Bins Lead
              </button>

              <button
                onClick={() => {
                  switchRole('op3_manager');
                  setActiveView('admin-slm');
                  setIsRoleDropdownOpen(false);
                }}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  background: userRole === 'op3_manager' ? '#0f766e' : 'transparent',
                  color: '#ffffff',
                  border: 'none',
                  padding: '7px 12px',
                  borderRadius: '6px',
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                  display: 'block'
                }}
              >
                🪑 OP 3 - Commercial Furniture Lead
              </button>

              <button
                onClick={() => {
                  switchRole('op4_manager');
                  setActiveView('admin-slm');
                  setIsRoleDropdownOpen(false);
                }}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  background: userRole === 'op4_manager' ? '#0f766e' : 'transparent',
                  color: '#ffffff',
                  border: 'none',
                  padding: '7px 12px',
                  borderRadius: '6px',
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                  display: 'block'
                }}
              >
                🔌 OP 4 - Household Utilities Lead
              </button>

              <div style={{ height: '1px', background: '#334155', margin: '4px 0' }} />

              <button
                onClick={() => {
                  switchRole('superadmin');
                  setActiveView('admin-dashboard');
                  setIsRoleDropdownOpen(false);
                }}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  background: (userRole === 'admin' || userRole === 'superadmin') ? '#0f766e' : 'transparent',
                  color: '#ffffff',
                  border: 'none',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  display: 'block',
                  fontWeight: 700
                }}
              >
                👑 Super Admin / Executive Hub
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="glass-nav" style={{ padding: '12px 24px' }}>
        <div style={{
          maxWidth: '1380px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px'
        }}>
          {/* Brand Logo */}
          <div
            onClick={() => setActiveView('store')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
              userSelect: 'none'
            }}
          >
            <img
              src="/logo.png"
              alt="IYANU PLASTIC STORE (IPS) Logo"
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                objectFit: 'cover',
                boxShadow: '0 4px 12px rgba(234, 179, 8, 0.35)',
                border: '2px solid #eab308'
              }}
            />
            <div>
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.25rem',
                fontWeight: 900,
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                color: '#0f172a',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                IYANU <span style={{ color: '#0f766e' }}>PLASTIC</span>
                <span style={{
                  background: '#fef3c7',
                  color: '#b45309',
                  fontSize: '0.65rem',
                  padding: '1px 6px',
                  borderRadius: '4px',
                  fontWeight: 800
                }}>
                  HUB
                </span>
              </div>
              <div style={{
                fontSize: '0.65rem',
                fontWeight: 600,
                color: '#64748b',
                letterSpacing: '0.04em',
                textTransform: 'uppercase'
              }}>
                & General Merchandise Nigeria
              </div>
            </div>
          </div>

          {/* Search Bar with Live Suggestions */}
          <div style={{ flex: 1, maxWidth: '520px', position: 'relative' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              background: '#f1f5f9',
              borderRadius: '10px',
              border: `1.5px solid ${isSearchFocused ? '#0f766e' : '#e2e8f0'}`,
              padding: '6px 14px',
              transition: 'all 0.2s ease',
              boxShadow: isSearchFocused ? '0 0 0 3px rgba(15, 118, 110, 0.15)' : 'none'
            }}>
              <Search size={18} color="#64748b" style={{ marginRight: '8px' }} />
              <input
                type="text"
                value={searchQuery}
                onChange={e => {
                  setSearchQuery(e.target.value);
                  if (activeView !== 'catalog' && activeView !== 'store') {
                    setActiveView('catalog');
                  }
                }}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 250)}
                placeholder="Search balloons, buckets, bowls, PET bottles, drums, bins..."
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  fontSize: '0.875rem',
                  fontFamily: 'inherit',
                  color: '#0f172a'
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#94a3b8',
                    cursor: 'pointer',
                    fontSize: '0.75rem',
                    fontWeight: 700
                  }}
                >
                  CLEAR
                </button>
              )}
            </div>

            {/* Quick Live Search Popover */}
            {isSearchFocused && searchResults.length > 0 && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                marginTop: '6px',
                background: '#ffffff',
                borderRadius: '12px',
                boxShadow: '0 15px 30px rgba(0,0,0,0.15)',
                border: '1px solid #e2e8f0',
                overflow: 'hidden',
                zIndex: 1200
              }}>
                <div style={{ padding: '8px 12px', background: '#f8fafc', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                  Matching Products ({searchResults.length})
                </div>
                {searchResults.map(p => (
                  <div
                    key={p.id}
                    onClick={() => {
                      setSelectedProduct(p);
                      setIsSearchFocused(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '10px 14px',
                      borderBottom: '1px solid #f1f5f9',
                      cursor: 'pointer',
                      transition: 'background 0.15s ease'
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#f0fdfa')}
                    onMouseLeave={e => (e.currentTarget.style.background = '#ffffff')}
                  >
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      style={{ width: '40px', height: '40px', borderRadius: '6px', objectFit: 'cover' }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {p.name}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#0f766e', fontWeight: 700 }}>
                        ₦{(p.discountPrice || p.basePrice).toLocaleString()}
                        {p.hubName && (
                          <span style={{ marginLeft: '8px', color: '#64748b', fontWeight: 500, fontSize: '0.7rem' }}>
                            • {p.hubName.split('-')[0]}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Nav Links & Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={() => setActiveView('store')}
              style={{
                background: 'none',
                border: 'none',
                color: activeView === 'store' ? '#0f766e' : '#475569',
                fontWeight: activeView === 'store' ? 700 : 500,
                fontSize: '0.875rem',
                cursor: 'pointer'
              }}
            >
              Home
            </button>

            <button
              onClick={() => setActiveView('catalog')}
              style={{
                background: 'none',
                border: 'none',
                color: activeView === 'catalog' ? '#0f766e' : '#475569',
                fontWeight: activeView === 'catalog' ? 700 : 500,
                fontSize: '0.875rem',
                cursor: 'pointer'
              }}
            >
              Shop Catalog
            </button>

            <button
              onClick={() => setActiveView('order-tracking')}
              style={{
                background: 'none',
                border: 'none',
                color: activeView === 'order-tracking' ? '#0f766e' : '#475569',
                fontWeight: activeView === 'order-tracking' ? 700 : 500,
                fontSize: '0.875rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Truck size={16} />
              Track Order
            </button>

            <button
              onClick={() => setActiveView('customer-portal')}
              style={{
                background: 'none',
                border: 'none',
                color: activeView === 'customer-portal' ? '#0f766e' : '#475569',
                fontWeight: activeView === 'customer-portal' ? 700 : 500,
                fontSize: '0.875rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <User size={16} />
              Customer Desk
            </button>

            {/* Admin Hub Shortcut (Triggers login modal if unauthenticated) */}
            <button
              onClick={() => {
                if (!isAuthenticated && userRole === 'customer') {
                  setIsLoginModalOpen(true);
                } else {
                  setActiveView('admin-dashboard');
                }
              }}
              style={{
                background: activeView.startsWith('admin') ? '#0f766e' : '#0f172a',
                color: '#ffffff',
                border: 'none',
                padding: '7px 12px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                position: 'relative'
              }}
            >
              <LayoutDashboard size={15} />
              {isAuthenticated ? 'Admin Hub' : 'Admin Login'}
              {breachedTicketsCount > 0 && (
                <span className="sla-pulse-urgent" style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-5px',
                  background: '#ef4444',
                  color: '#ffffff',
                  fontSize: '0.65rem',
                  fontWeight: 800,
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {breachedTicketsCount}
                </span>
              )}
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => setActiveView('catalog')}
              title="Saved Items"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                position: 'relative',
                color: '#475569',
                display: 'flex',
                alignItems: 'center',
                padding: '6px'
              }}
            >
              <Heart size={20} color={wishlist.length > 0 ? '#ef4444' : '#64748b'} fill={wishlist.length > 0 ? '#ef4444' : 'none'} />
              {wishlist.length > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '0px',
                  right: '0px',
                  background: '#ef4444',
                  color: '#ffffff',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Trigger Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              style={{
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                border: 'none',
                borderRadius: '10px',
                padding: '8px 14px',
                color: '#0f172a',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 10px rgba(245, 158, 11, 0.25)',
                transition: 'transform 0.15s ease'
              }}
            >
              <ShoppingBag size={18} />
              <span>Cart</span>
              <span style={{
                background: '#0f172a',
                color: '#ffffff',
                padding: '1px 6px',
                borderRadius: '999px',
                fontSize: '0.75rem',
                fontWeight: 800
              }}>
                {cartItemCount}
              </span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};
