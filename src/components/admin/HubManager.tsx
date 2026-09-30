import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Hub, Category, Product, Role } from '../../types';
import {
  Building2,
  Boxes,
  Plus,
  Edit2,
  Trash2,
  ArrowRightLeft,
  Search,
  CheckCircle2,
  XCircle,
  MapPin,
  Phone,
  UserCheck,
  Sparkles,
  Layers,
  ChevronRight,
  Package,
  Smile,
  Circle,
  ShoppingBag,
  Trash2 as TrashIcon,
  Armchair,
  Zap,
  Truck,
  Eye,
  EyeOff,
  Filter
} from 'lucide-react';

export const HubManager: React.FC = () => {
  const {
    hubs,
    addHub,
    updateHub,
    toggleHubStatus,
    deleteHub,
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    reassignCategoryToHub,
    reassignCategoryToOp,
    products,
    slmUnits,
    userRole,
    currentUser,
    formatNGN
  } = useApp();

  const isSuperAdmin = userRole === 'superadmin' || userRole === 'admin';

  // Active selected hub for drill-down view
  const [selectedHubId, setSelectedHubId] = useState<string>(hubs[0]?.id || 'hub-1');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [isAddHubModalOpen, setIsAddHubModalOpen] = useState(false);
  const [isEditHubModalOpen, setIsEditHubModalOpen] = useState(false);
  const [editingHub, setEditingHub] = useState<Hub | null>(null);

  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // Form states for New Hub
  const [hubFormData, setHubFormData] = useState({
    name: '',
    code: '',
    slmId: 'slm-lagos',
    location: '',
    managerName: '',
    contactPhone: '',
    description: '',
    defaultOpId: 'op-1'
  });

  // Form states for New Category
  const [catFormData, setCatFormData] = useState({
    name: '',
    slug: '',
    iconName: 'Boxes',
    description: '',
    assignedOpId: 'op-1',
    image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=600&q=80'
  });

  const selectedHub = hubs.find(h => h.id === selectedHubId) || hubs[0];
  const hubCategories = categories.filter(c => c.hubId === selectedHubId);
  const hubProducts = products.filter(p => p.hubId === selectedHubId);

  // Total Hub stock value
  const totalHubStockValue = hubProducts.reduce(
    (sum, p) => sum + (p.discountPrice || p.basePrice) * p.stockQuantity,
    0
  );

  const handleCreateHub = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hubFormData.name || !hubFormData.location) {
      alert('Please enter a Hub name and physical location.');
      return;
    }

    const created = addHub({
      name: hubFormData.name,
      code: hubFormData.code || `HUB-${hubs.length + 1}`,
      slmId: hubFormData.slmId,
      location: hubFormData.location,
      managerName: hubFormData.managerName || 'Operations Officer',
      contactPhone: hubFormData.contactPhone || '+234 800 000 0000',
      status: 'active',
      description: hubFormData.description,
      defaultOpId: hubFormData.defaultOpId
    });

    setIsAddHubModalOpen(false);
    setSelectedHubId(created.id);
    setHubFormData({
      name: '',
      code: '',
      slmId: 'slm-lagos',
      location: '',
      managerName: '',
      contactPhone: '',
      description: '',
      defaultOpId: 'op-1'
    });
  };

  const handleEditHubSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingHub) return;
    updateHub(editingHub.id, editingHub);
    setIsEditHubModalOpen(false);
  };

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!catFormData.name) {
      alert('Please enter a Category name.');
      return;
    }

    addCategory({
      hubId: selectedHubId,
      name: catFormData.name,
      slug: catFormData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      iconName: catFormData.iconName,
      description: catFormData.description,
      image: catFormData.image,
      assignedOpId: catFormData.assignedOpId,
      status: 'active'
    });

    setIsAddCategoryModalOpen(false);
    setCatFormData({
      name: '',
      slug: '',
      iconName: 'Boxes',
      description: '',
      assignedOpId: 'op-1',
      image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=600&q=80'
    });
  };

  const handleEditCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;
    updateCategory(editingCategory.id, editingCategory);
    setIsEditCategoryModalOpen(false);
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles size={18} color="#f59e0b" />;
      case 'Smile': return <Smile size={18} color="#3b82f6" />;
      case 'Circle': return <Circle size={18} color="#0f766e" />;
      case 'Package': return <Package size={18} color="#6366f1" />;
      case 'ShoppingBag': return <ShoppingBag size={18} color="#ec4899" />;
      case 'Trash2': return <TrashIcon size={18} color="#ef4444" />;
      case 'Armchair': return <Armchair size={18} color="#8b5cf6" />;
      case 'Zap': return <Zap size={18} color="#eab308" />;
      case 'Truck': return <Truck size={18} color="#14b8a6" />;
      default: return <Boxes size={18} color="#0f766e" />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Top Banner Header */}
      <div style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #062826 100%)',
        borderRadius: '20px',
        padding: '28px 32px',
        color: '#ffffff',
        border: '1px solid #1e293b',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#2dd4bf', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
              <Building2 size={16} /> Hierarchical Structure: SLM → Hubs → Product Categories → Products
            </div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 900, margin: '0 0 6px 0', color: '#ffffff' }}>
              SLM Hub & Category Network
            </h1>
            <p style={{ fontSize: '0.88rem', color: '#94a3b8', margin: 0, maxWidth: '780px', lineHeight: 1.5 }}>
              Manage Hub 1 through Hub 7 and dynamically create new operational hubs (e.g. Hub 8+). Configure independent product categories, OP floor assignments, and live catalog synchronization.
            </p>
          </div>

          {isSuperAdmin && (
            <button
              onClick={() => setIsAddHubModalOpen(true)}
              className="btn-primary"
              style={{ padding: '12px 20px', fontSize: '0.9rem', fontWeight: 800 }}
            >
              <Plus size={18} /> Create New Hub (e.g. Hub 8)
            </button>
          )}
        </div>
      </div>

      {/* Hubs Selector Carousel / Grid */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Building2 size={18} color="#0f766e" /> Active Regional Hubs ({hubs.length})
          </h2>
          <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
            Click any Hub to inspect its categories and product lines
          </span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px'
        }}>
          {hubs.map(hub => {
            const isSelected = hub.id === selectedHubId;
            const catCount = categories.filter(c => c.hubId === hub.id).length;
            const prodCount = products.filter(p => p.hubId === hub.id).length;

            return (
              <div
                key={hub.id}
                onClick={() => setSelectedHubId(hub.id)}
                style={{
                  background: isSelected ? '#f0fdfa' : '#ffffff',
                  borderRadius: '16px',
                  padding: '20px',
                  border: isSelected ? '2px solid #0f766e' : '1px solid #e2e8f0',
                  boxShadow: isSelected ? '0 8px 25px rgba(15, 118, 110, 0.15)' : '0 2px 6px rgba(0,0,0,0.02)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <div style={{
                    background: isSelected ? '#0f766e' : '#0f172a',
                    color: '#ffffff',
                    padding: '4px 10px',
                    borderRadius: '8px',
                    fontSize: '0.75rem',
                    fontWeight: 900
                  }}>
                    {hub.code}
                  </div>

                  <span style={{
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    padding: '2px 8px',
                    borderRadius: '999px',
                    background: hub.status === 'active' ? '#dcfce7' : '#fee2e2',
                    color: hub.status === 'active' ? '#166534' : '#991b1b'
                  }}>
                    {hub.status.toUpperCase()}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0' }}>
                  {hub.name}
                </h3>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#64748b', marginBottom: '12px' }}>
                  <MapPin size={14} color="#0f766e" style={{ flexShrink: 0 }} />
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {hub.location}
                  </span>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  background: isSelected ? '#ffffff' : '#f8fafc',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  fontSize: '0.78rem',
                  border: '1px solid',
                  borderColor: isSelected ? '#ccfbf1' : '#e2e8f0'
                }}>
                  <div>
                    <span style={{ color: '#64748b', display: 'block', fontSize: '0.7rem' }}>Categories</span>
                    <strong style={{ color: '#0f766e', fontSize: '0.95rem' }}>{catCount}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b', display: 'block', fontSize: '0.7rem' }}>Products</span>
                    <strong style={{ color: '#0f172a', fontSize: '0.95rem' }}>{prodCount}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b', display: 'block', fontSize: '0.7rem' }}>Lead OP</span>
                    <strong style={{ color: '#6366f1', fontSize: '0.85rem' }}>{hub.defaultOpId?.toUpperCase() || 'OP-1'}</strong>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Hub Drilldown Details */}
      {selectedHub && (
        <div style={{
          background: '#ffffff',
          borderRadius: '20px',
          border: '1px solid #e2e8f0',
          padding: '28px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.03)'
        }}>
          {/* Hub Header & Actions */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            paddingBottom: '20px',
            borderBottom: '1px solid #f1f5f9'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                  {selectedHub.name}
                </h2>
                <span style={{
                  background: '#f1f5f9',
                  color: '#0f766e',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  padding: '3px 8px',
                  borderRadius: '6px'
                }}>
                  {selectedHub.code}
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>
                {selectedHub.description}
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {isSuperAdmin && (
                <>
                  <button
                    onClick={() => {
                      setEditingHub(selectedHub);
                      setIsEditHubModalOpen(true);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 14px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      background: '#ffffff',
                      color: '#334155',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    <Edit2 size={14} /> Edit Hub
                  </button>

                  <button
                    onClick={() => toggleHubStatus(selectedHub.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 14px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      background: '#ffffff',
                      color: selectedHub.status === 'active' ? '#e11d48' : '#059669',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    {selectedHub.status === 'active' ? <EyeOff size={14} /> : <Eye size={14} />}
                    {selectedHub.status === 'active' ? 'Deactivate' : 'Activate'}
                  </button>

                  <button
                    onClick={() => setIsAddCategoryModalOpen(true)}
                    className="btn-primary"
                    style={{ fontSize: '0.85rem' }}
                  >
                    <Plus size={16} /> Add Product Category to {selectedHub.code}
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Hub Metadata Ribbon */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '14px',
            margin: '20px 0',
            background: '#f8fafc',
            padding: '16px',
            borderRadius: '12px'
          }}>
            <div>
              <span style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>
                Manager / Lead
              </span>
              <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a' }}>
                {selectedHub.managerName}
              </div>
            </div>
            <div>
              <span style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>
                Depot Location
              </span>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>
                {selectedHub.location}
              </div>
            </div>
            <div>
              <span style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>
                Contact Hotline
              </span>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f766e' }}>
                {selectedHub.contactPhone}
              </div>
            </div>
            <div>
              <span style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>
                Total Hub Stock Value
              </span>
              <div style={{ fontSize: '0.95rem', fontWeight: 900, color: '#0f766e' }}>
                {formatNGN(totalHubStockValue)}
              </div>
            </div>
          </div>

          {/* Independent Categories under this Hub */}
          <div style={{ marginTop: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Boxes size={18} color="#0f766e" />
                Product Categories Assigned to {selectedHub.name} ({hubCategories.length})
              </h3>
            </div>

            {hubCategories.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '40px',
                background: '#f8fafc',
                borderRadius: '12px',
                border: '1.5px dashed #cbd5e1'
              }}>
                <Boxes size={36} color="#94a3b8" style={{ marginBottom: '10px' }} />
                <h4 style={{ margin: '0 0 4px 0', color: '#334155' }}>No Categories Assigned Yet</h4>
                <p style={{ margin: '0 0 16px 0', fontSize: '0.82rem', color: '#64748b' }}>
                  Super Admins can create independent categories under this Hub without altering codebase.
                </p>
                {isSuperAdmin && (
                  <button
                    onClick={() => setIsAddCategoryModalOpen(true)}
                    className="btn-primary"
                    style={{ fontSize: '0.85rem' }}
                  >
                    <Plus size={16} /> Create First Category for {selectedHub.code}
                  </button>
                )}
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '18px'
              }}>
                {hubCategories.map(cat => {
                  const prodsInCat = products.filter(p => p.categoryId === cat.id || p.category === cat.name);
                  const opUnit = slmUnits.find(u => u.id === cat.assignedOpId);

                  return (
                    <div
                      key={cat.id}
                      style={{
                        background: '#ffffff',
                        borderRadius: '14px',
                        border: '1px solid #e2e8f0',
                        overflow: 'hidden',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                    >
                      <div style={{ height: '110px', position: 'relative', background: '#0f172a' }}>
                        <img
                          src={cat.image}
                          alt={cat.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
                        />
                        <div style={{
                          position: 'absolute',
                          top: '10px',
                          left: '10px',
                          background: 'rgba(15, 23, 42, 0.85)',
                          color: '#ffffff',
                          padding: '4px 8px',
                          borderRadius: '6px',
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}>
                          {getCategoryIcon(cat.iconName)}
                          <span>{cat.name}</span>
                        </div>

                        <div style={{
                          position: 'absolute',
                          bottom: '10px',
                          right: '10px',
                          background: '#0f766e',
                          color: '#ffffff',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          fontSize: '0.7rem',
                          fontWeight: 800
                        }}>
                          {prodsInCat.length} Product Lines
                        </div>
                      </div>

                      <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                          <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '0 0 12px 0', lineHeight: 1.5 }}>
                            {cat.description}
                          </p>

                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '8px 10px',
                            background: '#f8fafc',
                            borderRadius: '8px',
                            fontSize: '0.75rem',
                            marginBottom: '12px'
                          }}>
                            <span style={{ color: '#64748b' }}>Assigned Operation:</span>
                            <strong style={{ color: '#4338ca' }}>
                              {opUnit?.name || cat.assignedOpId?.toUpperCase() || 'OP-1'}
                            </strong>
                          </div>
                        </div>

                        {isSuperAdmin && (
                          <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid #f1f5f9', paddingTop: '12px' }}>
                            <button
                              onClick={() => {
                                setEditingCategory(cat);
                                setIsEditCategoryModalOpen(true);
                              }}
                              style={{
                                flex: 1,
                                padding: '6px 10px',
                                borderRadius: '6px',
                                border: '1px solid #cbd5e1',
                                background: '#ffffff',
                                color: '#334155',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '4px'
                              }}
                            >
                              <Edit2 size={12} /> Edit
                            </button>

                            <button
                              onClick={() => {
                                const targetHub = hubs.find(h => h.id !== selectedHubId);
                                if (targetHub && window.confirm(`Move category "${cat.name}" to ${targetHub.name}?`)) {
                                  reassignCategoryToHub(cat.id, targetHub.id);
                                }
                              }}
                              style={{
                                padding: '6px 10px',
                                borderRadius: '6px',
                                border: '1px solid #cbd5e1',
                                background: '#ffffff',
                                color: '#0f766e',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                              }}
                              title="Reassign to another Hub"
                            >
                              <ArrowRightLeft size={12} /> Move Hub
                            </button>

                            <button
                              onClick={() => {
                                if (window.confirm(`Are you sure you want to delete category "${cat.name}"?`)) {
                                  deleteCategory(cat.id);
                                }
                              }}
                              style={{
                                padding: '6px 8px',
                                borderRadius: '6px',
                                border: '1px solid #fecaca',
                                background: '#fff1f2',
                                color: '#e11d48',
                                fontSize: '0.75rem',
                                cursor: 'pointer'
                              }}
                              title="Delete Category"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal: Add Hub */}
      {isAddHubModalOpen && (
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
            maxWidth: '560px',
            padding: '28px',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#0f172a', margin: '0 0 6px 0' }}>
              Create New Regional Hub
            </h2>
            <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '0 0 20px 0' }}>
              Add a new Hub (e.g. Hub 8) into the SLM network without altering code.
            </p>

            <form onSubmit={handleCreateHub} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                  Hub Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hub 8 - North-Central Extrusions Center"
                  value={hubFormData.name}
                  onChange={e => setHubFormData({ ...hubFormData, name: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Hub Code
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. HUB-8"
                    value={hubFormData.code}
                    onChange={e => setHubFormData({ ...hubFormData, code: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Default Lead OP
                  </label>
                  <select
                    value={hubFormData.defaultOpId}
                    onChange={e => setHubFormData({ ...hubFormData, defaultOpId: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
                  >
                    <option value="op-1">OP 1 - Heavy Storage</option>
                    <option value="op-2">OP 2 - Sanitation Bins</option>
                    <option value="op-3">OP 3 - Furniture & Seating</option>
                    <option value="op-4">OP 4 - Household & Utilities</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                  Depot Location *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Plot 15 Heavy Industrial Layout, Jos, Plateau"
                  value={hubFormData.location}
                  onChange={e => setHubFormData({ ...hubFormData, location: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Manager / Lead Officer
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Engr. Sadiq Mohammed"
                    value={hubFormData.managerName}
                    onChange={e => setHubFormData({ ...hubFormData, managerName: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Contact Phone
                  </label>
                  <input
                    type="text"
                    placeholder="+234 803 000 0000"
                    value={hubFormData.contactPhone}
                    onChange={e => setHubFormData({ ...hubFormData, contactPhone: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                  Description & Specialty
                </label>
                <textarea
                  rows={2}
                  placeholder="Describe the product categories and operations covered by this hub..."
                  value={hubFormData.description}
                  onChange={e => setHubFormData({ ...hubFormData, description: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsAddHubModalOpen(false)}
                  style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', color: '#64748b', fontWeight: 700, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ flex: 1, padding: '10px', justifyContent: 'center' }}
                >
                  Save & Launch Hub
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Category to Selected Hub */}
      {isAddCategoryModalOpen && (
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
            maxWidth: '520px',
            padding: '28px',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#0f172a', margin: '0 0 6px 0' }}>
              Add Category to {selectedHub.name}
            </h2>
            <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '0 0 20px 0' }}>
              Create an independent product category under this Hub (e.g. Balloons, Animated Buckets, PET Bottles).
            </p>

            <form onSubmit={handleCreateCategory} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Balloons, Animated Buckets, PET Packaging"
                  value={catFormData.name}
                  onChange={e => setCatFormData({ ...catFormData, name: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Icon Style
                  </label>
                  <select
                    value={catFormData.iconName}
                    onChange={e => setCatFormData({ ...catFormData, iconName: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
                  >
                    <option value="Sparkles">✨ Sparkles (Balloons/Party)</option>
                    <option value="Smile">😊 Smile (Animated Buckets)</option>
                    <option value="Boxes">📦 Boxes (Ordinary Buckets)</option>
                    <option value="Circle">⚪ Circle (Bowls & Basins)</option>
                    <option value="Package">🍾 Package (PET Bottles)</option>
                    <option value="ShoppingBag">🛍️ ShoppingBag (PET Packaging)</option>
                    <option value="Layers">🧱 Layers (Storage Drums)</option>
                    <option value="Trash2">🗑️ Trash2 (Sanitation Bins)</option>
                    <option value="Armchair">🪑 Armchair (Furniture)</option>
                    <option value="Zap">⚡ Zap (Electricals)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Assigned OP Floor
                  </label>
                  <select
                    value={catFormData.assignedOpId}
                    onChange={e => setCatFormData({ ...catFormData, assignedOpId: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
                  >
                    <option value="op-1">OP 1 - Heavy Storage & Drums</option>
                    <option value="op-2">OP 2 - Sanitation & Bins</option>
                    <option value="op-3">OP 3 - Furniture & Seating</option>
                    <option value="op-4">OP 4 - Household & Utilities</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                  Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Summary of products in this category..."
                  value={catFormData.description}
                  onChange={e => setCatFormData({ ...catFormData, description: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                  Banner Image URL
                </label>
                <input
                  type="text"
                  value={catFormData.image}
                  onChange={e => setCatFormData({ ...catFormData, image: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsAddCategoryModalOpen(false)}
                  style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', color: '#64748b', fontWeight: 700, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ flex: 1, padding: '10px', justifyContent: 'center' }}
                >
                  Add Category to Hub
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Category */}
      {isEditCategoryModalOpen && editingCategory && (
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
            maxWidth: '520px',
            padding: '28px'
          }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#0f172a', margin: '0 0 6px 0' }}>
              Edit Category: {editingCategory.name}
            </h2>

            <form onSubmit={handleEditCategorySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                  Category Name
                </label>
                <input
                  type="text"
                  required
                  value={editingCategory.name}
                  onChange={e => setEditingCategory({ ...editingCategory, name: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                  Assigned OP Unit
                </label>
                <select
                  value={editingCategory.assignedOpId || 'op-1'}
                  onChange={e => setEditingCategory({ ...editingCategory, assignedOpId: e.target.value })}
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
                  Description
                </label>
                <textarea
                  rows={2}
                  value={editingCategory.description}
                  onChange={e => setEditingCategory({ ...editingCategory, description: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsEditCategoryModalOpen(false)}
                  style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', color: '#64748b', fontWeight: 700, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ flex: 1, padding: '10px', justifyContent: 'center' }}
                >
                  Save Category Updates
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
