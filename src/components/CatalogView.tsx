import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from './ProductCard';
import {
  Filter,
  SlidersHorizontal,
  Search,
  Boxes,
  Building2,
  Check
} from 'lucide-react';

export const CatalogView: React.FC = () => {
  const {
    publishedProducts,
    categories,
    hubs,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    formatNGN
  } = useApp();

  const [selectedHub, setSelectedHub] = useState<string>('all');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [hasBulkDiscountOnly, setHasBulkDiscountOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(750000);

  // Filtered and sorted products using publishedProducts (Single source of truth)
  const filteredProducts = useMemo(() => {
    return publishedProducts.filter(product => {
      // Hub filter
      if (selectedHub !== 'all' && product.hubId !== selectedHub) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'all') {
        const catObj = categories.find(c => c.slug === selectedCategory || c.id === selectedCategory || c.name === selectedCategory);
        if (catObj && product.categoryId !== catObj.id && product.category !== catObj.name) {
          return false;
        }
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        const matchesSku = product.sku.toLowerCase().includes(query);
        const matchesHub = product.hubName && product.hubName.toLowerCase().includes(query);
        if (!matchesName && !matchesCategory && !matchesSku && !matchesHub) return false;
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
  }, [publishedProducts, categories, selectedHub, selectedCategory, searchQuery, inStockOnly, hasBulkDiscountOnly, maxPrice, sortBy]);

  const availableCategories = selectedHub === 'all'
    ? categories
    : categories.filter(c => c.hubId === selectedHub);

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
            Product Catalog & Polymer Inventory
          </h1>
          <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>
            Showing {filteredProducts.length} verified polymer items across Nigerian fulfillment hubs.
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

          {/* Hub Filter */}
          <div style={{ marginBottom: '22px' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '8px' }}>
              Fulfillment Hub
            </label>
            <select
              value={selectedHub}
              onChange={e => {
                setSelectedHub(e.target.value);
                setSelectedCategory('all');
              }}
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: '8px',
                border: '1.5px solid #cbd5e1',
                fontSize: '0.82rem',
                fontWeight: 600,
                background: '#ffffff'
              }}
            >
              <option value="all">All Regional Hubs</option>
              {hubs.map(h => (
                <option key={h.id} value={h.id}>{h.name}</option>
              ))}
            </select>
          </div>

          {/* Categories Filter */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '10px' }}>
              Product Categories
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '320px', overflowY: 'auto' }}>
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
                <span>{publishedProducts.length}</span>
              </button>

              {availableCategories.map(cat => {
                const count = publishedProducts.filter(p => p.categoryId === cat.id || p.category === cat.name).length;
                const isSelected = selectedCategory === cat.slug || selectedCategory === cat.id || selectedCategory === cat.name;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.slug)}
                    style={{
                      textAlign: 'left',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: 'none',
                      background: isSelected ? '#f0fdfa' : 'transparent',
                      color: isSelected ? '#0f766e' : '#475569',
                      fontWeight: isSelected ? 700 : 500,
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
              min="3000"
              max="500000"
              step="2000"
              value={maxPrice}
              onChange={e => setMaxPrice(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#0f766e', cursor: 'pointer' }}
            />
          </div>

          {/* Quick Checkbox Toggles */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#334155', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={e => setInStockOnly(e.target.checked)}
                style={{ accentColor: '#0f766e', width: '16px', height: '16px' }}
              />
              In Stock Only
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#334155', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={hasBulkDiscountOnly}
                onChange={e => setHasBulkDiscountOnly(e.target.checked)}
                style={{ accentColor: '#0f766e', width: '16px', height: '16px' }}
              />
              Has Bulk Wholesale Discount Tier
            </label>
          </div>
        </aside>

        {/* Product Grid Area */}
        <main>
          {filteredProducts.length === 0 ? (
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              padding: '60px 20px',
              textAlign: 'center'
            }}>
              <Boxes size={48} color="#94a3b8" style={{ marginBottom: '16px' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: '0 0 8px 0' }}>
                No Products Match Your Filter
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#64748b', margin: '0 0 20px 0' }}>
                Try clearing search terms or selecting "All Categories" / "All Hubs".
              </p>
              <button
                onClick={() => {
                  setSelectedHub('all');
                  setSelectedCategory('all');
                  setSearchQuery('');
                  setInStockOnly(false);
                  setMaxPrice(750000);
                }}
                className="btn-primary"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '24px'
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
