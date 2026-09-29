import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Star,
  ShoppingBag,
  ShieldCheck,
  Truck,
  Check,
  Package,
  Layers,
  Heart
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    addToCart,
    wishlist,
    toggleWishlist,
    formatNGN
  } = useApp();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'bulk' | 'reviews'>('specs');

  if (!selectedProduct) return null;

  const isSaved = wishlist.includes(selectedProduct.id);
  const activeVariant = selectedProduct.variants ? selectedProduct.variants[selectedVariantIndex] : undefined;
  const currentPrice = activeVariant ? activeVariant.price : (selectedProduct.discountPrice || selectedProduct.basePrice);
  const currentStock = activeVariant ? activeVariant.stock : selectedProduct.stockQuantity;
  const isOutOfStock = currentStock <= 0;

  // Bulk discount calculation
  const isBulkEligible = selectedProduct.minBulkOrderQty && quantity >= selectedProduct.minBulkOrderQty;
  const bulkDiscountRate = isBulkEligible ? (selectedProduct.bulkDiscountPercent || 10) / 100 : 0;
  const finalUnitPrice = isBulkEligible ? currentPrice * (1 - bulkDiscountRate) : currentPrice;
  const subtotal = finalUnitPrice * quantity;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(selectedProduct, activeVariant, quantity);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(6px)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={() => setSelectedProduct(null)}
    >
      <div
        className="animate-fade-in"
        style={{
          background: '#ffffff',
          borderRadius: '20px',
          maxWidth: '960px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          position: 'relative'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 10,
            background: '#f1f5f9',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#475569'
          }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', padding: '32px' }}>
          {/* Left Column: Image Gallery */}
          <div>
            <div style={{
              height: '360px',
              borderRadius: '16px',
              overflow: 'hidden',
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              marginBottom: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img
                src={selectedProduct.images[activeImageIndex] || selectedProduct.images[0]}
                alt={selectedProduct.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Thumbnail switcher if multiple images */}
            {selectedProduct.images.length > 1 && (
              <div style={{ display: 'flex', gap: '8px' }}>
                {selectedProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      border: `2px solid ${activeImageIndex === idx ? '#0f766e' : '#e2e8f0'}`,
                      padding: 0,
                      cursor: 'pointer'
                    }}
                  >
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}

            {/* Value Guarantees Box */}
            <div style={{
              marginTop: '20px',
              padding: '16px',
              background: '#f0fdfa',
              borderRadius: '12px',
              border: '1px solid #ccfbf1',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#0f766e', fontWeight: 600 }}>
                <Truck size={16} /> Fast Dispatch within 24-48 Hours Nationwide
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#0f766e', fontWeight: 600 }}>
                <ShieldCheck size={16} /> 100% Genuine Virgin Grade Polymer Guarantee
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#0f766e', fontWeight: 600 }}>
                <Package size={16} /> Free Replacement SLA if Damaged in Transit
              </div>
            </div>
          </div>

          {/* Right Column: Product Info & Actions */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0f766e', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {selectedProduct.category} • SKU: {selectedProduct.sku}
              </span>
              <button
                onClick={() => toggleWishlist(selectedProduct.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.8rem',
                  color: isSaved ? '#ef4444' : '#64748b'
                }}
              >
                <Heart size={16} fill={isSaved ? '#ef4444' : 'none'} />
                {isSaved ? 'Saved' : 'Wishlist'}
              </button>
            </div>

            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px', lineHeight: 1.25 }}>
              {selectedProduct.name}
            </h2>

            {/* Ratings */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                {[1, 2, 3, 4, 5].map(star => (
                  <Star
                    key={star}
                    size={15}
                    fill={star <= Math.round(selectedProduct.rating) ? '#f59e0b' : '#e2e8f0'}
                    color={star <= Math.round(selectedProduct.rating) ? '#f59e0b' : '#cbd5e1'}
                  />
                ))}
              </div>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>
                {selectedProduct.rating} / 5.0
              </span>
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                ({selectedProduct.reviewCount} customer reviews)
              </span>
            </div>

            {/* Price Box */}
            <div style={{
              background: '#f8fafc',
              padding: '16px',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              marginBottom: '20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                <span style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0f766e', fontFamily: 'var(--font-heading)' }}>
                  {formatNGN(finalUnitPrice)}
                </span>
                {selectedProduct.discountPrice && !isBulkEligible && (
                  <span style={{ fontSize: '1rem', color: '#94a3b8', textDecoration: 'line-through' }}>
                    {formatNGN(selectedProduct.basePrice)}
                  </span>
                )}
                {isBulkEligible && (
                  <span className="badge badge-emerald">
                    Bulk Tier Applied (-{selectedProduct.bulkDiscountPercent}%)
                  </span>
                )}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>
                Prices inclusive of VAT • Official IYANU Invoice provided upon payment
              </div>
            </div>

            {/* Variants Selector */}
            {selectedProduct.variants && selectedProduct.variants.length > 0 && (
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '8px' }}>
                  Select Size / Specification:
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {selectedProduct.variants.map((v, idx) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariantIndex(idx)}
                      style={{
                        padding: '8px 14px',
                        borderRadius: '8px',
                        border: `2px solid ${selectedVariantIndex === idx ? '#0f766e' : '#e2e8f0'}`,
                        background: selectedVariantIndex === idx ? '#f0fdfa' : '#ffffff',
                        color: selectedVariantIndex === idx ? '#0f766e' : '#334155',
                        fontWeight: selectedVariantIndex === idx ? 700 : 500,
                        fontSize: '0.85rem',
                        cursor: 'pointer'
                      }}
                    >
                      {v.name} ({formatNGN(v.price)})
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Controls & Add to Cart */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '24px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                border: '1.5px solid #cbd5e1',
                borderRadius: '10px',
                background: '#ffffff',
                overflow: 'hidden'
              }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{
                    padding: '8px 14px',
                    background: 'none',
                    border: 'none',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    color: '#334155'
                  }}
                >
                  −
                </button>
                <span style={{ padding: '0 12px', fontWeight: 800, fontSize: '0.95rem', minWidth: '36px', textAlign: 'center' }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(currentStock || 999, quantity + 1))}
                  style={{
                    padding: '8px 14px',
                    background: 'none',
                    border: 'none',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    color: '#334155'
                  }}
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                style={{
                  flex: 1,
                  background: isOutOfStock
                    ? '#cbd5e1'
                    : 'linear-gradient(135deg, #0f766e 0%, #134e4a 100%)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '12px 20px',
                  fontSize: '0.95rem',
                  fontWeight: 800,
                  cursor: isOutOfStock ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 12px rgba(15, 118, 110, 0.3)'
                }}
              >
                <ShoppingBag size={18} />
                {isOutOfStock ? 'Out of Stock' : `Add to Cart • Total: ${formatNGN(subtotal)}`}
              </button>
            </div>

            {/* Tabs for Specs / Bulk / Reviews */}
            <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '16px', marginTop: 'auto' }}>
              <div style={{ display: 'flex', gap: '16px', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px', marginBottom: '12px' }}>
                <button
                  onClick={() => setActiveTab('specs')}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '0.85rem',
                    fontWeight: activeTab === 'specs' ? 800 : 500,
                    color: activeTab === 'specs' ? '#0f766e' : '#64748b',
                    borderBottom: activeTab === 'specs' ? '2px solid #0f766e' : 'none',
                    paddingBottom: '6px',
                    cursor: 'pointer'
                  }}
                >
                  Specifications
                </button>
                <button
                  onClick={() => setActiveTab('bulk')}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '0.85rem',
                    fontWeight: activeTab === 'bulk' ? 800 : 500,
                    color: activeTab === 'bulk' ? '#0f766e' : '#64748b',
                    borderBottom: activeTab === 'bulk' ? '2px solid #0f766e' : 'none',
                    paddingBottom: '6px',
                    cursor: 'pointer'
                  }}
                >
                  Wholesale & Bulk Tiers
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '0.85rem',
                    fontWeight: activeTab === 'reviews' ? 800 : 500,
                    color: activeTab === 'reviews' ? '#0f766e' : '#64748b',
                    borderBottom: activeTab === 'reviews' ? '2px solid #0f766e' : 'none',
                    paddingBottom: '6px',
                    cursor: 'pointer'
                  }}
                >
                  Customer Reviews ({selectedProduct.reviewCount})
                </button>
              </div>

              {activeTab === 'specs' && (
                <div style={{ fontSize: '0.8rem', color: '#475569', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {Object.entries(selectedProduct.specs || {}).map(([k, v]) => (
                    <div key={k} style={{ padding: '6px 10px', background: '#f8fafc', borderRadius: '6px' }}>
                      <strong style={{ color: '#1e293b' }}>{k}:</strong> {v}
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'bulk' && (
                <div style={{ fontSize: '0.8rem', color: '#334155' }}>
                  <p style={{ marginBottom: '8px' }}>
                    Buy in wholesale quantities for industrial complexes, schools, hotels, and retail resale:
                  </p>
                  <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span>1 - {selectedProduct.minBulkOrderQty ? selectedProduct.minBulkOrderQty - 1 : 4} units</span>
                      <strong>{formatNGN(currentPrice)} / unit</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#0f766e', fontWeight: 700 }}>
                      <span>{selectedProduct.minBulkOrderQty || 5}+ units (Bulk Tier)</span>
                      <span>{formatNGN(currentPrice * (1 - (selectedProduct.bulkDiscountPercent || 10) / 100))} / unit</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div style={{ fontSize: '0.8rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ padding: '8px', background: '#f8fafc', borderRadius: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: '#0f172a' }}>
                      <span>Alabi K. (Ikeja, Lagos)</span>
                      <span style={{ color: '#f59e0b' }}>★★★★★</span>
                    </div>
                    <p style={{ margin: '4px 0 0 0' }}>Extremely heavy-duty plastic. Delivered right to our warehouse in 24 hours.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
