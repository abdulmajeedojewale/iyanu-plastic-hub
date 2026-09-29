import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Product } from '../../types';
import {
  Plus,
  Boxes,
  Edit2,
  Trash2,
  AlertTriangle,
  Search,
  Check,
  X,
  Layers,
  Sparkles
} from 'lucide-react';

export const ProductManager: React.FC = () => {
  const { products, categories, addProduct, updateStock, updateProduct, formatNGN } = useApp();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingStockId, setEditingStockId] = useState<string | null>(null);
  const [newStockVal, setNewStockVal] = useState<number>(0);
  const [searchFilter, setSearchFilter] = useState('');

  // New Product Form State
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    sku: '',
    category: categories[0]?.name || 'Plastic Products & Storage',
    description: '',
    basePrice: 15000,
    discountPrice: 13500,
    stockQuantity: 50,
    warehouseStock: 150,
    assignedOpId: 'op-1',
    minAlertThreshold: 20,
    imageUrl: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80',
    minBulkOrderQty: 10,
    bulkDiscountPercent: 12
  });

  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.sku) {
      alert('Please provide product title and SKU.');
      return;
    }

    addProduct({
      name: formData.name,
      slug: formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      sku: formData.sku,
      category: formData.category,
      description: formData.description,
      basePrice: Number(formData.basePrice),
      discountPrice: formData.discountPrice ? Number(formData.discountPrice) : undefined,
      stockQuantity: Number(formData.stockQuantity),
      warehouseStock: Number(formData.warehouseStock || 100),
      opStock: { [formData.assignedOpId]: Number(formData.stockQuantity) },
      assignedOpId: formData.assignedOpId || 'op-1',
      minAlertThreshold: Number(formData.minAlertThreshold || 20),
      minBulkOrderQty: Number(formData.minBulkOrderQty),
      bulkDiscountPercent: Number(formData.bulkDiscountPercent),
      images: [formData.imageUrl],
      specs: {
        'Origin': 'IYANU Polymer Lab Verified',
        'Material': 'High-Density Impact Grade Polymer'
      }
    });

    setIsAddModalOpen(false);
    setFormData({
      name: '',
      slug: '',
      sku: '',
      category: categories[0]?.name || 'Plastic Products & Storage',
      description: '',
      basePrice: 15000,
      discountPrice: 13500,
      stockQuantity: 50,
      warehouseStock: 150,
      assignedOpId: 'op-1',
      minAlertThreshold: 20,
      imageUrl: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80',
      minBulkOrderQty: 10,
      bulkDiscountPercent: 12
    });
  };

  const handleSaveStock = (productId: string) => {
    updateStock(productId, Number(newStockVal));
    setEditingStockId(null);
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchFilter.toLowerCase()) ||
    p.category.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Action Header */}
      <div style={{
        background: '#ffffff',
        borderRadius: '18px',
        padding: '24px 28px',
        border: '1px solid #e2e8f0',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px'
      }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '0 0 4px 0' }}>
            Products & Inventory Management
          </h1>
          <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>
            Manage warehouse stock thresholds, prices in Naira, and multi-variant catalog entries
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Search product or SKU..."
              value={searchFilter}
              onChange={e => setSearchFilter(e.target.value)}
              style={{
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1.5px solid #cbd5e1',
                fontSize: '0.85rem',
                width: '240px'
              }}
            />
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="btn-primary"
            style={{ fontSize: '0.85rem' }}
          >
            <Plus size={16} /> Add New Product
          </button>
        </div>
      </div>

      {/* Product Table */}
      <div style={{
        background: '#ffffff',
        borderRadius: '18px',
        border: '1px solid #e2e8f0',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1.5px solid #e2e8f0', textAlign: 'left', color: '#64748b', fontSize: '0.75rem', textTransform: 'uppercase' }}>
              <th style={{ padding: '14px 16px' }}>Product</th>
              <th style={{ padding: '14px 16px' }}>SKU</th>
              <th style={{ padding: '14px 16px' }}>Category</th>
              <th style={{ padding: '14px 16px' }}>Base Price (₦)</th>
              <th style={{ padding: '14px 16px' }}>Stock Level</th>
              <th style={{ padding: '14px 16px' }}>Bulk Tier</th>
              <th style={{ padding: '14px 16px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(p => {
              const isLowStock = p.stockQuantity <= 15;
              const isEditing = editingStockId === p.id;

              return (
                <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  {/* Product name & thumbnail */}
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        style={{ width: '44px', height: '44px', borderRadius: '8px', objectFit: 'cover' }}
                      />
                      <div>
                        <strong style={{ color: '#0f172a', display: 'block', maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {p.name}
                        </strong>
                        {p.variants && (
                          <span style={{ fontSize: '0.72rem', color: '#0f766e' }}>
                            {p.variants.length} size/color variants
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* SKU */}
                  <td style={{ padding: '14px 16px', fontWeight: 600, color: '#475569' }}>
                    {p.sku}
                  </td>

                  {/* Category */}
                  <td style={{ padding: '14px 16px', color: '#334155' }}>
                    {p.category}
                  </td>

                  {/* Base Price */}
                  <td style={{ padding: '14px 16px', fontWeight: 800, color: '#0f172a' }}>
                    {formatNGN(p.discountPrice || p.basePrice)}
                  </td>

                  {/* Stock Level with inline editor */}
                  <td style={{ padding: '14px 16px' }}>
                    {isEditing ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <input
                          type="number"
                          value={newStockVal}
                          onChange={e => setNewStockVal(Number(e.target.value))}
                          style={{ width: '60px', padding: '4px', borderRadius: '4px', border: '1px solid #0f766e' }}
                        />
                        <button
                          onClick={() => handleSaveStock(p.id)}
                          style={{ background: '#0f766e', color: '#fff', border: 'none', borderRadius: '4px', padding: '4px 6px', cursor: 'pointer' }}
                        >
                          <Check size={14} />
                        </button>
                        <button
                          onClick={() => setEditingStockId(null)}
                          style={{ background: '#cbd5e1', color: '#334155', border: 'none', borderRadius: '4px', padding: '4px 6px', cursor: 'pointer' }}
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{
                          fontWeight: 800,
                          color: isLowStock ? '#e11d48' : '#0f172a',
                          background: isLowStock ? '#fff1f2' : '#f1f5f9',
                          padding: '2px 8px',
                          borderRadius: '6px'
                        }}>
                          {p.stockQuantity} units
                        </span>
                        <button
                          onClick={() => {
                            setEditingStockId(p.id);
                            setNewStockVal(p.stockQuantity);
                          }}
                          style={{ background: 'none', border: 'none', color: '#0f766e', cursor: 'pointer', padding: '2px' }}
                          title="Quick update stock"
                        >
                          <Edit2 size={13} />
                        </button>
                      </div>
                    )}
                  </td>

                  {/* Bulk Tier */}
                  <td style={{ padding: '14px 16px', fontSize: '0.78rem', color: '#64748b' }}>
                    {p.minBulkOrderQty ? `${p.minBulkOrderQty}+ units (-${p.bulkDiscountPercent}%)` : 'Standard'}
                  </td>

                  {/* Action Buttons */}
                  <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                    <button
                      onClick={() => {
                        setEditingStockId(p.id);
                        setNewStockVal(p.stockQuantity);
                      }}
                      className="btn-secondary"
                      style={{ padding: '6px 10px', fontSize: '0.75rem' }}
                    >
                      Adjust Stock
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal: Add New Product */}
      {isAddModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.7)',
          zIndex: 3000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '18px',
            maxWidth: '650px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '28px',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0, color: '#0f172a' }}>
                Add New Product to Catalog
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddProductSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                  Product Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 200L Industrial Chemical Drum with Bungs"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    SKU Code *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. IYN-PL-009"
                    value={formData.sku}
                    onChange={e => setFormData({ ...formData, sku: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem', background: '#ffffff' }}
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Base Price (₦) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.basePrice}
                    onChange={e => setFormData({ ...formData, basePrice: Number(e.target.value) })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Discount Price (₦)
                  </label>
                  <input
                    type="number"
                    value={formData.discountPrice}
                    onChange={e => setFormData({ ...formData, discountPrice: Number(e.target.value) })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Initial Stock *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.stockQuantity}
                    onChange={e => setFormData({ ...formData, stockQuantity: Number(e.target.value) })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                  Image URL
                </label>
                <input
                  type="text"
                  value={formData.imageUrl}
                  onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe material durability, capacity, and usage scenarios..."
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
                />
              </div>

              <button type="submit" className="btn-primary" style={{ padding: '12px', marginTop: '10px' }}>
                Publish Product to Storefront
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
