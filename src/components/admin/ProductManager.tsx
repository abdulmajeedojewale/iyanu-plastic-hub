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
  Sparkles,
  Building2,
  MapPin,
  Eye,
  EyeOff,
  Tag,
  Warehouse
} from 'lucide-react';

export const ProductManager: React.FC = () => {
  const {
    products,
    hubs,
    categories,
    addProduct,
    updateStock,
    updateProduct,
    toggleProductPublished,
    deleteProduct,
    formatNGN,
    userRole
  } = useApp();

  const isSuperAdmin = userRole === 'superadmin' || userRole === 'admin';

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [editingStockId, setEditingStockId] = useState<string | null>(null);
  const [newStockVal, setNewStockVal] = useState<number>(0);

  const [searchFilter, setSearchFilter] = useState('');
  const [selectedHubFilter, setSelectedHubFilter] = useState('all');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');

  // Form State for New Product
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    hubId: hubs[0]?.id || 'hub-1',
    categoryId: categories[0]?.id || '',
    category: categories[0]?.name || 'Ordinary Buckets',
    description: '',
    basePrice: 15000,
    discountPrice: 13500,
    stockQuantity: 50,
    warehouseStock: 150,
    assignedOpId: 'op-1',
    warehouseLocation: 'Central Warehouse Bay 01',
    minAlertThreshold: 20,
    imageUrl: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80',
    minBulkOrderQty: 10,
    bulkDiscountPercent: 12,
    isPublished: true
  });

  const availableCategoriesForHub = categories.filter(
    c => c.hubId === (formData.hubId || hubs[0]?.id)
  );

  const handleHubChangeInForm = (newHubId: string) => {
    const catsForNewHub = categories.filter(c => c.hubId === newHubId);
    const defaultCat = catsForNewHub[0] || categories[0];
    const hub = hubs.find(h => h.id === newHubId);

    setFormData(prev => ({
      ...prev,
      hubId: newHubId,
      categoryId: defaultCat?.id || '',
      category: defaultCat?.name || prev.category,
      assignedOpId: defaultCat?.assignedOpId || hub?.defaultOpId || 'op-1'
    }));
  };

  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.sku) {
      alert('Please provide product title and SKU.');
      return;
    }

    const hub = hubs.find(h => h.id === formData.hubId);
    const categoryObj = categories.find(c => c.id === formData.categoryId || c.name === formData.category);

    addProduct({
      name: formData.name,
      slug: formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      sku: formData.sku,
      hubId: formData.hubId,
      hubName: hub ? hub.name : 'Hub 1',
      category: categoryObj ? categoryObj.name : formData.category,
      categoryId: categoryObj?.id,
      assignedOpId: formData.assignedOpId,
      warehouseLocation: formData.warehouseLocation,
      description: formData.description,
      basePrice: Number(formData.basePrice),
      discountPrice: formData.discountPrice ? Number(formData.discountPrice) : undefined,
      stockQuantity: Number(formData.stockQuantity),
      warehouseStock: Number(formData.warehouseStock || 100),
      opStock: { [formData.assignedOpId]: Number(formData.stockQuantity) },
      minAlertThreshold: Number(formData.minAlertThreshold || 20),
      minBulkOrderQty: Number(formData.minBulkOrderQty),
      bulkDiscountPercent: Number(formData.bulkDiscountPercent),
      isPublished: formData.isPublished,
      images: [formData.imageUrl],
      specs: {
        'Origin': 'IYANU Polymer Certified Standard',
        'Material': 'High-Density Impact Grade Polymer',
        'Hub Location': hub?.location || 'Ikeja Depot'
      }
    });

    setIsAddModalOpen(false);
    setFormData({
      name: '',
      sku: '',
      hubId: hubs[0]?.id || 'hub-1',
      categoryId: categories[0]?.id || '',
      category: categories[0]?.name || 'Ordinary Buckets',
      description: '',
      basePrice: 15000,
      discountPrice: 13500,
      stockQuantity: 50,
      warehouseStock: 150,
      assignedOpId: 'op-1',
      warehouseLocation: 'Central Warehouse Bay 01',
      minAlertThreshold: 20,
      imageUrl: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80',
      minBulkOrderQty: 10,
      bulkDiscountPercent: 12,
      isPublished: true
    });
  };

  const handleEditProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    updateProduct(editingProduct.id, editingProduct);
    setIsEditModalOpen(false);
  };

  const handleSaveStock = (productId: string) => {
    updateStock(productId, Number(newStockVal));
    setEditingStockId(null);
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.category.toLowerCase().includes(searchFilter.toLowerCase()) ||
      (p.hubName && p.hubName.toLowerCase().includes(searchFilter.toLowerCase()));

    const matchesHub = selectedHubFilter === 'all' || p.hubId === selectedHubFilter;
    const matchesCategory = selectedCategoryFilter === 'all' || p.categoryId === selectedCategoryFilter || p.category === selectedCategoryFilter;

    return matchesSearch && matchesHub && matchesCategory;
  });

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
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0f766e', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '4px' }}>
            <Building2 size={14} /> Connected Catalog & Database Synchronization
          </div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '0 0 4px 0' }}>
            Products & Inventory Management
          </h1>
          <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>
            Every product is linked to its Hub, Category, and OP. Any update here reflects on the storefront in real time.
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
          {/* Hub Filter */}
          <select
            value={selectedHubFilter}
            onChange={e => setSelectedHubFilter(e.target.value)}
            style={{
              padding: '9px 12px',
              borderRadius: '8px',
              border: '1.5px solid #cbd5e1',
              fontSize: '0.82rem',
              fontWeight: 600,
              background: '#ffffff'
            }}
          >
            <option value="all">All Hubs (1 - {hubs.length})</option>
            {hubs.map(h => (
              <option key={h.id} value={h.id}>{h.name}</option>
            ))}
          </select>

          {/* Search Box */}
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Search product, SKU, Hub..."
              value={searchFilter}
              onChange={e => setSearchFilter(e.target.value)}
              style={{
                padding: '9px 14px',
                borderRadius: '8px',
                border: '1.5px solid #cbd5e1',
                fontSize: '0.82rem',
                width: '210px'
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
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1.5px solid #e2e8f0', textAlign: 'left', color: '#64748b', fontSize: '0.72rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '14px 16px' }}>Product</th>
                <th style={{ padding: '14px 16px' }}>SKU</th>
                <th style={{ padding: '14px 16px' }}>Hub / Category</th>
                <th style={{ padding: '14px 16px' }}>Assigned OP</th>
                <th style={{ padding: '14px 16px' }}>Base Price (₦)</th>
                <th style={{ padding: '14px 16px' }}>Floor Stock</th>
                <th style={{ padding: '14px 16px' }}>Storefront</th>
                <th style={{ padding: '14px 16px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
                    No products found matching the filter criteria.
                  </td>
                </tr>
              ) : (
                filteredProducts.map(p => {
                  const isLowStock = p.stockQuantity <= (p.minAlertThreshold || 20);
                  const isEditing = editingStockId === p.id;
                  const isPublished = p.isPublished !== false;
                  const hub = hubs.find(h => h.id === p.hubId);

                  return (
                    <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      {/* Product Name & Thumbnail */}
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <img
                            src={p.images[0] || 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80'}
                            alt={p.name}
                            style={{ width: '44px', height: '44px', borderRadius: '8px', objectFit: 'cover' }}
                          />
                          <div>
                            <strong style={{ color: '#0f172a', display: 'block', maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {p.name}
                            </strong>
                            <span style={{ fontSize: '0.72rem', color: '#64748b' }}>
                              {p.warehouseLocation || 'Central Warehouse'}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* SKU */}
                      <td style={{ padding: '14px 16px', fontWeight: 600, color: '#475569' }}>
                        {p.sku}
                      </td>

                      {/* Hub & Category */}
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                          <span style={{
                            fontSize: '0.72rem',
                            fontWeight: 800,
                            color: '#0f766e',
                            background: '#f0fdfa',
                            padding: '1px 6px',
                            borderRadius: '4px',
                            display: 'inline-block',
                            width: 'fit-content'
                          }}>
                            {hub?.code || p.hubName?.split('-')[0] || 'HUB-1'}
                          </span>
                          <span style={{ color: '#1e293b', fontWeight: 600, fontSize: '0.8rem' }}>
                            {p.category}
                          </span>
                        </div>
                      </td>

                      {/* Assigned OP */}
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          color: '#4338ca',
                          background: '#e0e7ff',
                          padding: '2px 8px',
                          borderRadius: '6px'
                        }}>
                          {p.assignedOpId.toUpperCase()}
                        </span>
                      </td>

                      {/* Base Price */}
                      <td style={{ padding: '14px 16px', fontWeight: 800, color: '#0f172a' }}>
                        {formatNGN(p.discountPrice || p.basePrice)}
                      </td>

                      {/* Floor Stock Level with inline editor */}
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
                              style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer' }}
                              title="Adjust Stock Quantity"
                            >
                              <Edit2 size={13} />
                            </button>
                          </div>
                        )}
                      </td>

                      {/* Storefront Published Toggle */}
                      <td style={{ padding: '14px 16px' }}>
                        <button
                          onClick={() => toggleProductPublished(p.id)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '3px 8px',
                            borderRadius: '6px',
                            border: '1px solid',
                            borderColor: isPublished ? '#bbf7d0' : '#fecaca',
                            background: isPublished ? '#f0fdf4' : '#fff1f2',
                            color: isPublished ? '#166534' : '#991b1b',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            cursor: 'pointer'
                          }}
                          title={isPublished ? 'Visible on Storefront - Click to unpublish' : 'Hidden from Storefront - Click to publish'}
                        >
                          {isPublished ? <Eye size={12} /> : <EyeOff size={12} />}
                          {isPublished ? 'Live' : 'Hidden'}
                        </button>
                      </td>

                      {/* Actions */}
                      <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                          <button
                            onClick={() => {
                              setEditingProduct(p);
                              setIsEditModalOpen(true);
                            }}
                            style={{
                              padding: '5px 8px',
                              borderRadius: '6px',
                              border: '1px solid #cbd5e1',
                              background: '#ffffff',
                              color: '#334155',
                              cursor: 'pointer'
                            }}
                            title="Edit Product Details"
                          >
                            <Edit2 size={14} />
                          </button>

                          <button
                            onClick={() => {
                              if (window.confirm(`Delete product "${p.name}" from catalog?`)) {
                                deleteProduct(p.id);
                              }
                            }}
                            style={{
                              padding: '5px 8px',
                              borderRadius: '6px',
                              border: '1px solid #fecaca',
                              background: '#fff1f2',
                              color: '#e11d48',
                              cursor: 'pointer'
                            }}
                            title="Delete Product"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Add New Product */}
      {isAddModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2100,
          padding: '20px'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '20px',
            width: '100%',
            maxWidth: '680px',
            padding: '28px',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#0f172a', margin: '0 0 6px 0' }}>
              Create New Product
            </h2>
            <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '0 0 20px 0' }}>
              Add a new product with full Hub, Category, and OP routing parameters.
            </p>

            <form onSubmit={handleAddProductSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 50L Water Storage Drum with Dispenser Tap"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    SKU Code *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="IYN-PL-005"
                    value={formData.sku}
                    onChange={e => setFormData({ ...formData, sku: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
                  />
                </div>
              </div>

              {/* Hub & Category Selection */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Assigned Hub (SLM Structure) *
                  </label>
                  <select
                    value={formData.hubId}
                    onChange={e => handleHubChangeInForm(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
                  >
                    {hubs.map(h => (
                      <option key={h.id} value={h.id}>{h.name} ({h.code})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Product Category (under selected Hub) *
                  </label>
                  <select
                    value={formData.categoryId}
                    onChange={e => {
                      const cat = categories.find(c => c.id === e.target.value);
                      setFormData({
                        ...formData,
                        categoryId: e.target.value,
                        category: cat?.name || formData.category,
                        assignedOpId: cat?.assignedOpId || formData.assignedOpId
                      });
                    }}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
                  >
                    {availableCategoriesForHub.length > 0 ? (
                      availableCategoriesForHub.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))
                    ) : (
                      categories.map(c => (
                        <option key={c.id} value={c.id}>{c.name} (Global)</option>
                      ))
                    )}
                  </select>
                </div>
              </div>

              {/* OP Assignment & Warehouse Location */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Responsible Operational Unit (OP)
                  </label>
                  <select
                    value={formData.assignedOpId}
                    onChange={e => setFormData({ ...formData, assignedOpId: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
                  >
                    <option value="op-1">OP 1 - Heavy Storage & Drums</option>
                    <option value="op-2">OP 2 - Sanitation & Bins</option>
                    <option value="op-3">OP 3 - Furniture & Seating</option>
                    <option value="op-4">OP 4 - Household & Utilities</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Store / Warehouse Bay Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Bay A3 / Rack 02"
                    value={formData.warehouseLocation}
                    onChange={e => setFormData({ ...formData, warehouseLocation: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
                  />
                </div>
              </div>

              {/* Prices */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Base Price (₦) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.basePrice}
                    onChange={e => setFormData({ ...formData, basePrice: Number(e.target.value) })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Discount / Sale Price (₦)
                  </label>
                  <input
                    type="number"
                    value={formData.discountPrice}
                    onChange={e => setFormData({ ...formData, discountPrice: Number(e.target.value) })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
                  />
                </div>
              </div>

              {/* Stocks */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Initial Floor Stock
                  </label>
                  <input
                    type="number"
                    value={formData.stockQuantity}
                    onChange={e => setFormData({ ...formData, stockQuantity: Number(e.target.value) })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Central Warehouse Stock
                  </label>
                  <input
                    type="number"
                    value={formData.warehouseStock}
                    onChange={e => setFormData({ ...formData, warehouseStock: Number(e.target.value) })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Low Stock Alert Limit
                  </label>
                  <input
                    type="number"
                    value={formData.minAlertThreshold}
                    onChange={e => setFormData({ ...formData, minAlertThreshold: Number(e.target.value) })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
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
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                  Product Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Detailed specifications and material description..."
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', color: '#64748b', fontWeight: 700, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ flex: 1, padding: '10px', justifyContent: 'center' }}
                >
                  Create Product & Sync
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Existing Product */}
      {isEditModalOpen && editingProduct && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2100,
          padding: '20px'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '20px',
            width: '100%',
            maxWidth: '680px',
            padding: '28px',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#0f172a', margin: '0 0 6px 0' }}>
              Edit Product: {editingProduct.name}
            </h2>

            <form onSubmit={handleEditProductSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Product Title
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProduct.name}
                    onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    SKU Code
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProduct.sku}
                    onChange={e => setEditingProduct({ ...editingProduct, sku: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
                  />
                </div>
              </div>

              {/* Hub & Category Assignment */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Assigned Hub
                  </label>
                  <select
                    value={editingProduct.hubId}
                    onChange={e => {
                      const h = hubs.find(hub => hub.id === e.target.value);
                      setEditingProduct({
                        ...editingProduct,
                        hubId: e.target.value,
                        hubName: h?.name
                      });
                    }}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
                  >
                    {hubs.map(h => (
                      <option key={h.id} value={h.id}>{h.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Category
                  </label>
                  <select
                    value={editingProduct.categoryId || editingProduct.category}
                    onChange={e => {
                      const cat = categories.find(c => c.id === e.target.value || c.name === e.target.value);
                      setEditingProduct({
                        ...editingProduct,
                        categoryId: cat?.id,
                        category: cat ? cat.name : e.target.value
                      });
                    }}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name} ({hubs.find(h => h.id === c.hubId)?.code || 'Global'})</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price & Stock */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Base Price (₦)
                  </label>
                  <input
                    type="number"
                    value={editingProduct.basePrice}
                    onChange={e => setEditingProduct({ ...editingProduct, basePrice: Number(e.target.value) })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Discount Price (₦)
                  </label>
                  <input
                    type="number"
                    value={editingProduct.discountPrice || ''}
                    onChange={e => setEditingProduct({ ...editingProduct, discountPrice: Number(e.target.value) || undefined })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                  Warehouse / Rack Location
                </label>
                <input
                  type="text"
                  value={editingProduct.warehouseLocation || ''}
                  onChange={e => setEditingProduct({ ...editingProduct, warehouseLocation: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', color: '#64748b', fontWeight: 700, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ flex: 1, padding: '10px', justifyContent: 'center' }}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
