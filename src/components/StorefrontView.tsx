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
  Layers,
  Building2
} from 'lucide-react';

interface StorefrontViewProps {
  onOpenBulkModal?: () => void;
}

export const StorefrontView: React.FC<StorefrontViewProps> = () => {
  const {
    publishedProducts,
    categories,
    hubs,
    setSelectedCategory,
    setActiveView,
    formatNGN
  } = useApp();

  const featuredProducts = publishedProducts.filter(p => p.isFeatured).slice(0, 4);
  const bestsellers = publishedProducts.filter(p => p.isBestseller).slice(0, 4);
  const newArrivals = publishedProducts.slice(0, 4);

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

        <div style={{ maxWidth: '720px', position: 'relative', zIndex: 2 }}>
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
            From balloons, animated & ordinary buckets, bowls, PET bottles and packaging to heavy-duty 120L waste bins and commercial furniture. Factory prices, verified polymer durability, guaranteed delivery.
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
                setSelectedCategory('pet-bottles');
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
              Shop Hub 1 PET Packaging & Drums
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
              <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '4px 0 0 0' }}>
                24-48hr dispatch across Lagos, Abuja, Kano, Port Harcourt
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
              background: '#fef3c7',
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
              <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '4px 0 0 0' }}>
                High-impact, UV-stabilized, shatterproof industrial grade
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
                Bulk Wholesale Discounts
              </h4>
              <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '4px 0 0 0' }}>
                Tiered commercial pricing up to 15% off large orders
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
              background: '#fdf2f8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#db2777',
              flexShrink: 0
            }}>
              <PhoneCall size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, margin: 0, color: '#0f172a' }}>
                Direct Customer SLA Desk
              </h4>
              <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '4px 0 0 0' }}>
                Guaranteed rapid response on quotes, orders & inquiries
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories (Hub 1 and Regional Hub categories) */}
      <section style={{ maxWidth: '1380px', margin: '0 auto', padding: '0 24px', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0f766e', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
              SLM Hub Category Network
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
              Shop by Product Category
            </h2>
          </div>

          <button
            onClick={() => {
              setSelectedCategory('all');
              setActiveView('catalog');
            }}
            style={{
              background: 'none',
              border: 'none',
              color: '#0f766e',
              fontWeight: 800,
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer'
            }}
          >
            View All Categories <ArrowRight size={16} />
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px'
        }}>
          {categories.slice(0, 8).map(cat => {
            const count = publishedProducts.filter(p => p.categoryId === cat.id || p.category === cat.name).length;
            const hub = hubs.find(h => h.id === cat.hubId);

            return (
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
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.08)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.03)';
                }}
              >
                <div style={{ height: '140px', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={cat.image}
                    alt={cat.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  {hub && (
                    <span style={{
                      position: 'absolute',
                      top: '8px',
                      left: '8px',
                      background: 'rgba(15, 23, 42, 0.85)',
                      color: '#2dd4bf',
                      fontSize: '0.65rem',
                      fontWeight: 800,
                      padding: '2px 6px',
                      borderRadius: '4px'
                    }}>
                      {hub.code}
                    </span>
                  )}
                </div>
                <div style={{ padding: '16px' }}>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', margin: '0 0 4px 0' }}>
                    {cat.name}
                  </h3>
                  <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                    {count} Products in Catalog
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Products Section */}
      <section style={{ maxWidth: '1380px', margin: '0 auto', padding: '0 24px', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0f766e', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
              Handpicked Essentials
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
              Featured Factory Products
            </h2>
          </div>

          <button
            onClick={() => setActiveView('catalog')}
            style={{
              background: 'none',
              border: 'none',
              color: '#0f766e',
              fontWeight: 800,
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer'
            }}
          >
            Browse All <ArrowRight size={16} />
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Bestsellers Section */}
      {bestsellers.length > 0 && (
        <section style={{ maxWidth: '1380px', margin: '0 auto', padding: '0 24px', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '24px' }}>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#d97706', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
                High Demand in Nigeria
              </div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                Bestselling Polymer Supplies
              </h2>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            {bestsellers.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
