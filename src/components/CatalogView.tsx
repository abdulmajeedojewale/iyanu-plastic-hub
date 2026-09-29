import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from './ProductCard';
import {
  Filter,
  SlidersHorizontal,
  Search,
  Boxes,
  Check
} from 'lucide-react';

export const CatalogView: React.FC = () => {
  const {
    products,
    categories,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    formatNGN
  } = useApp();

  const [inStockOnly, setInStockOnly] = useState(false);
  const [hasBulkDiscountOnly, setHasBulkDiscountOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(750000);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category filter
      if (selectedCategory !== 'all') {
        const catObj = categories.find(c => c.slug === selectedCategory);
        if (catObj && product.category !== catObj.name) {
          return false;
        }
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        const matchesSku = product.sku.toLowerCase().includes(query);
        if (!matchesName && !matchesCategory && !matchesSku) return false;
      }

      // Stock filter
      if (inStockOnly && product.stockQuantity <= 0) return false;

      // Bulk discount filter
      if (hasBulkDiscountOnly && !product.minBulkOrderQty) return false;

      // Price filter
      const price = product.discountPrice || product.basePrice;
      if (price > maxPrice) return false;

      return true;
    }).sort((a, b) => {
      const priceA = a.discountPrice || a.basePrice;
      const priceB = b.discountPrice || b.basePrice;

      if (sortBy === 'price-asc') return priceA - priceB;
      if (sortBy === 'price-desc') return priceB - priceA;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [products, categories, selectedCategory, searchQuery, inStockOnly, hasBulkDiscountOnly, maxPrice, sortBy]);

  return (
    <div style={{ maxWidth: '1380px', margin: '0 auto', padding: '24px', width: '100%' }}>
      {/* Top Banner & Header */}
      <div style={{
        background: '#ffffff',
        borderRadius: '16px',
        padding: '24px 32px',
        border: '1px solid #e2e8f0',
        marginBottom: '28px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px'
      }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0f172a', margin: '0 0 6px 0' }}>
            Product Catalog & Inventory
          </h1>
          <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>
            Showing {filteredProducts.length} verified products available for instant order and dispatch
          </p>
        </div>

        {/* Sort selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569' }}>Sort by:</label>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              border: '1.5px solid #cbd5e1',
              fontSize: '0.85rem',
              background: '#ffffff',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <option value="featured">★ Featured & Bestsellers</option>
            <option value="price-asc">Price: Low to High (₦)</option>
            <option value="price-desc">Price: High to Low (₦)</option>
            <option value="rating">Top Customer Ratings</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '28px' }}>
        {/* Left Filter Sidebar */}
        <aside style={{
          background: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          padding: '24px',
          height: 'fit-content'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingBottom: '16px', borderBottom: '1px solid #f1f5f9', marginBottom: '20px' }}>
            <SlidersHorizontal size={18} color="#0f766e" />
            <h3 style={{ fontSize: '1rem', fontWeight: 800, margin: 0, color: '#0f172a' }}>Filter Products</h3>
          </div>

          {/* Categories Filter */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '10px' }}>
              Categories
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <button
                onClick={() => setSelectedCategory('all')}
                style={{
                  textAlign: 'left',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: 'none',
                  background: selectedCategory === 'all' ? '#f0fdfa' : 'transparent',
                  color: selectedCategory === 'all' ? '#0f766e' : '#475569',
                  fontWeight: selectedCategory === 'all' ? 700 : 500,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span>All Categories</span>
                <span>{products.length}</span>
              </button>

              {categories.map(cat => {
                const count = products.filter(p => p.category === cat.name).length;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.slug)}
                    style={{
                      textAlign: 'left',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: 'none',
                      background: selectedCategory === cat.slug ? '#f0fdfa' : 'transparent',
                      color: selectedCategory === cat.slug ? '#0f766e' : '#475569',
                      fontWeight: selectedCategory === cat.slug ? 700 : 500,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{cat.name}</span>
                    <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Range Slider */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 800, color: '#334155', textTransform: 'uppercase' }}>
                Max Price
              </label>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f766e' }}>
                {formatNGN(maxPrice)}
              </span>
            </div>
            <input
              type="range"
              min="5000"
              max="750000"
              step="5000"
              value={maxPrice}
              onChange={e => setMaxPrice(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#0f766e', cursor: 'pointer' }}
            />
          </div>

          {/* Checkbox toggles */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#334155', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={e => setInStockOnly(e.target.checked)}
                style={{ accentColor: '#0f766e', width: '16px', height: '16px' }}
              />
              <span>In Stock Only</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#334155', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={hasBulkDiscountOnly}
                onChange={e => setHasBulkDiscountOnly(e.target.checked)}
                style={{ accentColor: '#0f766e', width: '16px', height: '16px' }}
              />
              <span>Bulk Discount Tier Available</span>
            </label>
          </div>

          {/* Reset Filters */}
          <button
            onClick={() => {
              setSelectedCategory('all');
              setInStockOnly(false);
              setHasBulkDiscountOnly(false);
              setMaxPrice(750000);
              setSearchQuery('');
            }}
            style={{
              width: '100%',
              marginTop: '20px',
              padding: '10px',
              background: '#f1f5f9',
              border: 'none',
              borderRadius: '8px',
              color: '#475569',
              fontWeight: 700,
              fontSize: '0.8rem',
              cursor: 'pointer'
            }}
          >
            Reset All Filters
          </button>
        </aside>

        {/* Right Product Grid */}
        <main>
          {filteredProducts.length === 0 ? (
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '60px 20px',
              textAlign: 'center',
              border: '1px solid #e2e8f0'
            }}>
              <Boxes size={48} color="#cbd5e1" style={{ margin: '0 auto 16px auto' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0' }}>
                No products match your filter
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 20px 0' }}>
                Try adjusting your search query, increasing maximum price, or resetting filters.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                  setMaxPrice(750000);
                  setInStockOnly(false);
                }}
                className="btn-primary"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '20px'
            }}>
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
