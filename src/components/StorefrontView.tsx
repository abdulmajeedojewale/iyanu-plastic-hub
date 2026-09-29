import React from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from './ProductCard';
import {
  Truck,
  ShieldCheck,
  Award,
  Zap,
  PhoneCall,
  ArrowRight,
  Boxes,
  ShoppingBag,
  Sparkles,
  Layers
} from 'lucide-react';

interface StorefrontViewProps {
  onOpenBulkModal?: () => void;
}

export const StorefrontView: React.FC<StorefrontViewProps> = () => {
  const {
    products,
    categories,
    setSelectedCategory,
    setActiveView,
    formatNGN
  } = useApp();

  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 4);
  const bestsellers = products.filter(p => p.isBestseller).slice(0, 4);
  const newArrivals = products.filter(p => p.isNewArrival).slice(0, 4);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', paddingBottom: '60px' }}>
      {/* Hero Banner Section */}
      <section style={{
        background: 'linear-gradient(135deg, #062826 0%, #0f766e 60%, #134e4a 100%)',
        borderRadius: '24px',
        color: '#ffffff',
        padding: '52px 44px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(6, 40, 38, 0.25)',
        margin: '20px 24px 0 24px'
      }}>
        {/* Decorative background glow */}
        <div style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(45, 212, 191, 0.25) 0%, rgba(0,0,0,0) 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: '680px', position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.12)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            padding: '6px 14px',
            borderRadius: '999px',
            fontSize: '0.8rem',
            fontWeight: 700,
            marginBottom: '20px',
            color: '#99f6e4'
          }}>
            <Sparkles size={14} color="#f59e0b" />
            NIGERIA’S #1 DIRECT PLASTIC & MERCHANDISE DISTRIBUTOR
          </div>

          <h1 style={{
            fontSize: '2.8rem',
            lineHeight: 1.15,
            fontWeight: 900,
            marginBottom: '18px',
            letterSpacing: '-0.03em'
          }}>
            Premium Quality Plastics & Household Supplies, <span style={{ color: '#fbbf24' }}>Delivered Nationwide.</span>
          </h1>

          <p style={{
            fontSize: '1.05rem',
            color: '#ccfbf1',
            lineHeight: 1.6,
            marginBottom: '28px',
            fontWeight: 400
          }}>
            From heavy-duty 120L mobile waste bins and food-grade storage drums to commercial furniture, electrical fittings, and industrial logistics pallets. Factory prices, verified polymer durability, guaranteed delivery.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setActiveView('catalog');
              }}
              style={{
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                color: '#0f172a',
                border: 'none',
                borderRadius: '12px',
                padding: '14px 28px',
                fontSize: '0.95rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 15px rgba(245, 158, 11, 0.3)'
              }}
            >
              <ShoppingBag size={18} />
              <span>Explore Full Catalog</span>
              <ArrowRight size={18} />
            </button>

            <button
              onClick={() => {
                setSelectedCategory('plastic-products');
                setActiveView('catalog');
              }}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1.5px solid rgba(255, 255, 255, 0.3)',
                color: '#ffffff',
                borderRadius: '12px',
                padding: '14px 24px',
                fontSize: '0.95rem',
                fontWeight: 700,
                cursor: 'pointer',
                backdropFilter: 'blur(8px)'
              }}
            >
              Heavy-Duty Drums & Bins
            </button>
          </div>
        </div>
      </section>

      {/* Trust & Commercial Guarantees */}
      <section style={{ maxWidth: '1380px', margin: '0 auto', padding: '0 24px', width: '100%' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px'
        }}>
          <div style={{
            background: '#ffffff',
            padding: '20px',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: '#ecfdf5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0f766e',
              flexShrink: 0
            }}>
              <Truck size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, margin: 0, color: '#0f172a' }}>
                Interstate Delivery SLA
              </h4>
              <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '2px 0 0 0' }}>
                Express dispatches to all 36 Nigerian states & FCT Abuja.
              </p>
            </div>
          </div>

          <div style={{
            background: '#ffffff',
            padding: '20px',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: '#fffbeb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#d97706',
              flexShrink: 0
            }}>
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, margin: 0, color: '#0f172a' }}>
                100% Virgin Polymer
              </h4>
              <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '2px 0 0 0' }}>
                Heavy impact & UV-proof materials engineered for longevity.
              </p>
            </div>
          </div>

          <div style={{
            background: '#ffffff',
            padding: '20px',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: '#eff6ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#2563eb',
              flexShrink: 0
            }}>
              <Award size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, margin: 0, color: '#0f172a' }}>
                Wholesale Price Tiers
              </h4>
              <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '2px 0 0 0' }}>
                Bulk volume price discounts for businesses, schools & hotels.
              </p>
            </div>
          </div>

          <div style={{
            background: '#ffffff',
            padding: '20px',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: '#faf5ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#7c3aed',
              flexShrink: 0
            }}>
              <Zap size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, margin: 0, color: '#0f172a' }}>
                Dedicated SLA Support
              </h4>
              <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '2px 0 0 0' }}>
                Real-time support ticket resolution within guaranteed timeframes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Grid Section */}
      <section style={{ maxWidth: '1380px', margin: '0 auto', padding: '0 24px', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
              Shop by Category
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '4px 0 0 0' }}>
              Explore our core plastic manufacturing and general merchandise departments
            </p>
          </div>
          <button
            onClick={() => setActiveView('catalog')}
            style={{
              background: 'none',
              border: 'none',
              color: '#0f766e',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            View All ({categories.length}) <ArrowRight size={16} />
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
          gap: '16px'
        }}>
          {categories.map(cat => (
            <div
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.slug);
                setActiveView('catalog');
              }}
              style={{
                background: '#ffffff',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                padding: '20px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '190px',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = '#0f766e';
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(15, 118, 110, 0.1)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: '#f0fdfa',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0f766e',
                marginBottom: '12px'
              }}>
                <Boxes size={22} />
              </div>

              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: '0 0 4px 0' }}>
                  {cat.name}
                </h3>
                <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0, lineHeight: 1.3 }}>
                  {cat.description}
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', paddingTop: '8px', borderTop: '1px solid #f1f5f9' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0f766e' }}>
                  {cat.itemCount}+ products
                </span>
                <ArrowRight size={14} color="#0f766e" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section style={{ maxWidth: '1380px', margin: '0 auto', padding: '0 24px', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 800, color: '#d97706', textTransform: 'uppercase', marginBottom: '4px' }}>
              <Zap size={14} /> HOT PICKS
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
              Featured Commercial Plastics
            </h2>
          </div>
          <button
            onClick={() => setActiveView('catalog')}
            style={{
              background: 'none',
              border: 'none',
              color: '#0f766e',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            Explore Catalog <ArrowRight size={16} />
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '20px'
        }}>
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Wholesale & Commercial Bulk Quotation Banner */}
      <section style={{ maxWidth: '1380px', margin: '0 auto', padding: '0 24px', width: '100%' }}>
        <div style={{
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          borderRadius: '20px',
          padding: '36px 40px',
          color: '#ffffff',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
          border: '1px solid #334155',
          boxShadow: '0 15px 30px rgba(0,0,0,0.2)'
        }}>
          <div style={{ maxWidth: '600px' }}>
            <span className="badge badge-amber" style={{ marginBottom: '12px' }}>
              BULK BUYERS & CONTRACTORS
            </span>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 900, margin: '8px 0 10px 0', lineHeight: 1.2 }}>
              Ordering 50+ Units for Your Business, Facility or School?
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>
              Receive direct factory wholesale pricing, customized logo printing, flexible invoicing terms, and dedicated haulage trailer delivery straight to your site in Nigeria.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button
              onClick={() => setActiveView('customer-portal')}
              style={{
                background: '#0f766e',
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                padding: '14px 24px',
                fontSize: '0.9rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <PhoneCall size={18} />
              <span>Request Wholesale Quote / SLA</span>
            </button>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', textAlign: 'center' }}>
              Or Call Hotline: +234 (0) 803 IYANU-NIG
            </span>
          </div>
        </div>
      </section>

      {/* Best-Sellers & General Merchandise */}
      <section style={{ maxWidth: '1380px', margin: '0 auto', padding: '0 24px', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
              Best-Selling Household & Merchandise
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '4px 0 0 0' }}>
              Highest rated by Nigerian businesses, event organizers, and households
            </p>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '20px'
        }}>
          {bestsellers.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};
