import React, { useState } from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { ShoppingBag, Star, Heart, Check, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, wishlist, toggleWishlist, setSelectedProduct, formatNGN } = useApp();
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [isAddedRecently, setIsAddedRecently] = useState(false);

  const isSaved = wishlist.includes(product.id);
  const activeVariant = product.variants ? product.variants[selectedVariantIndex] : undefined;
  const currentPrice = activeVariant ? activeVariant.price : (product.discountPrice || product.basePrice);
  const hasDiscount = product.discountPrice && product.discountPrice < product.basePrice;
  const discountPercent = hasDiscount
    ? Math.round(((product.basePrice - (product.discountPrice || 0)) / product.basePrice) * 100)
    : 0;

  const currentStock = activeVariant ? activeVariant.stock : product.stockQuantity;
  const isOutOfStock = currentStock <= 0;
  const isLowStock = currentStock > 0 && currentStock <= 10;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isOutOfStock) return;
    addToCart(product, activeVariant, 1);
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 1200);
  };

  return (
    <div
      onClick={() => setSelectedProduct(product)}
      style={{
        background: '#ffffff',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
        transition: 'all 0.25s ease',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 12px 24px rgba(15, 118, 110, 0.12)';
        e.currentTarget.style.borderColor = '#99f6e4';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.03)';
        e.currentTarget.style.borderColor = '#e2e8f0';
      }}
    >
      {/* Badges Overlay */}
      <div style={{
        position: 'absolute',
        top: '12px',
        left: '12px',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: '4px'
      }}>
        {hasDiscount && (
          <span className="badge badge-amber" style={{ fontWeight: 800 }}>
            -{discountPercent}% OFF
          </span>
        )}
        {product.isBestseller && (
          <span className="badge badge-emerald" style={{ fontWeight: 800 }}>
            ★ BEST SELLER
          </span>
        )}
        {product.minBulkOrderQty && (
          <span className="badge badge-purple" style={{ fontSize: '0.65rem' }}>
            BULK DISCOUNT AVAILABLE
          </span>
        )}
      </div>

      {/* Wishlist Toggle Button */}
      <button
        onClick={e => {
          e.stopPropagation();
          toggleWishlist(product.id);
        }}
        style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          zIndex: 10,
          background: 'rgba(255, 255, 255, 0.9)',
          border: '1px solid #e2e8f0',
          borderRadius: '50%',
          width: '34px',
          height: '34px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
        }}
      >
        <Heart
          size={16}
          color={isSaved ? '#ef4444' : '#64748b'}
          fill={isSaved ? '#ef4444' : 'none'}
        />
      </button>

      {/* Image Gallery Preview */}
      <div style={{
        height: '210px',
        background: '#f8fafc',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <img
          src={product.images[0]}
          alt={product.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease'
          }}
          loading="lazy"
        />
        {isOutOfStock && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.65)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontWeight: 800,
            fontSize: '0.9rem',
            letterSpacing: '0.05em'
          }}>
            OUT OF STOCK
          </div>
        )}
      </div>

      {/* Product Content Body */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Category & Rating */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
          <span style={{ fontSize: '0.72rem', color: '#0f766e', fontWeight: 700, textTransform: 'uppercase' }}>
            {product.category}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.75rem', fontWeight: 700, color: '#334155' }}>
            <Star size={13} fill="#f59e0b" color="#f59e0b" />
            <span>{product.rating}</span>
            <span style={{ color: '#94a3b8', fontWeight: 500 }}>({product.reviewCount})</span>
          </div>
        </div>

        {/* Product Title */}
        <h3 style={{
          fontSize: '0.95rem',
          fontWeight: 700,
          color: '#0f172a',
          margin: '0 0 8px 0',
          lineHeight: 1.35,
          minHeight: '2.7em',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {product.name}
        </h3>

        {/* Variant selector chips if variants exist */}
        {product.variants && product.variants.length > 0 && (
          <div
            onClick={e => e.stopPropagation()}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '10px' }}
          >
            {product.variants.map((variant, idx) => (
              <button
                key={variant.id}
                onClick={() => setSelectedVariantIndex(idx)}
                style={{
                  fontSize: '0.7rem',
                  padding: '2px 6px',
                  borderRadius: '6px',
                  border: `1px solid ${selectedVariantIndex === idx ? '#0f766e' : '#cbd5e1'}`,
                  background: selectedVariantIndex === idx ? '#f0fdfa' : '#f8fafc',
                  color: selectedVariantIndex === idx ? '#0f766e' : '#475569',
                  fontWeight: selectedVariantIndex === idx ? 700 : 500,
                  cursor: 'pointer'
                }}
              >
                {variant.name.split('/')[0].trim()}
              </button>
            ))}
          </div>
        )}

        {/* Stock Status Indicator */}
        <div style={{ fontSize: '0.72rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          {isOutOfStock ? (
            <span style={{ color: '#ef4444', fontWeight: 600 }}>• Out of stock</span>
          ) : isLowStock ? (
            <span style={{ color: '#d97706', fontWeight: 700 }}>• Only {currentStock} units left in Lagos hub</span>
          ) : (
            <span style={{ color: '#059669', fontWeight: 600 }}>• {currentStock} in stock (Ready to dispatch)</span>
          )}
        </div>

        {/* Price & Action Button Footer */}
        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid #f1f5f9' }}>
          <div>
            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', fontFamily: 'var(--font-heading)' }}>
              {formatNGN(currentPrice)}
            </div>
            {hasDiscount && (
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', textDecoration: 'line-through' }}>
                {formatNGN(product.basePrice)}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              onClick={e => {
                e.stopPropagation();
                setSelectedProduct(product);
              }}
              title="View Specifications & Images"
              style={{
                background: '#f1f5f9',
                border: 'none',
                borderRadius: '8px',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#475569',
                cursor: 'pointer'
              }}
            >
              <Eye size={16} />
            </button>

            <button
              onClick={handleQuickAdd}
              disabled={isOutOfStock}
              style={{
                background: isAddedRecently
                  ? '#10b981'
                  : isOutOfStock
                  ? '#cbd5e1'
                  : 'linear-gradient(135deg, #0f766e 0%, #134e4a 100%)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '0 12px',
                height: '36px',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: isOutOfStock ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease'
              }}
            >
              {isAddedRecently ? (
                <>
                  <Check size={16} />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={15} />
                  <span>Add</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
