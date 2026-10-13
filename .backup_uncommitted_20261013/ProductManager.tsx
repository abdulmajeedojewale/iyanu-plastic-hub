import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Product } from '../../types';
import { storageService, productService } from '../../services/supabase';
import {
  Plus,
  Boxes,
  Edit2,
  Trash2,
  AlertTriangle,
  Search,
  Check,
  X,
  Sparkles,
  Building2,
  Eye,
  EyeOff,
  Upload,
  Archive,
  RotateCcw,
  Star,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  ShoppingBag,
  ExternalLink,
  Copy
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
    archiveProduct,
    unarchiveProduct,
    deleteProduct,
    formatNGN,
    userRole
  } = useApp();


  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);
  const [deleteConfirmProduct, setDeleteConfirmProduct] = useState<Product | null>(null);

  // Active form tabs
  const [addFormTab, setAddFormTab] = useState<'general' | 'pricing' | 'inventory' | 'images' | 'specs'>('general');
  const [editFormTab, setEditFormTab] = useState<'general' | 'pricing' | 'inventory' | 'images' | 'specs'>('general');

  // Inline stock editing
  const [editingStockId, setEditingStockId] = useState<string | null>(null);
  const [newStockVal, setNewStockVal] = useState<number>(0);

  // Filters, search, sort, pagination
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedHubFilter, setSelectedHubFilter] = useState('all');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [selectedOpFilter, setSelectedOpFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft' | 'low_stock' | 'out_of_stock' | 'archived'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc' | 'stock-desc' | 'stock-asc'>('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Image Upload States
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // Form State for New Product
  const defaultNewProductForm = {
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
    warehouseLocation: 'Central Warehouse Bay A',
    minAlertThreshold: 20,
    availability: 'in_stock' as const,
    images: [
      'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80'
    ],
    minBulkOrderQty: 10,
    bulkDiscountPercent: 10,
    isPublished: true,
    isFeatured: false,
    isBestseller: false,
    isNewArrival: true,
    specs: {
      'Material': 'High-Density Virgin Polymer (HDPE)',
      'Origin': 'IYANU Polymer Certified Factory Standard',
      'Impact Resistance': 'Heavy Industrial Impact Grade'
    } as Record<string, string>
  };

  const [formData, setFormData] = useState(defaultNewProductForm);
  const [newSpecKey, setNewSpecKey] = useState('');
  const [newSpecValue, setNewSpecValue] = useState('');

  // Categories available for the currently chosen Hub in Add Form
  const availableCategoriesForAddHub = useMemo(() => {
    return categories.filter(c => c.hubId === formData.hubId);
  }, [categories, formData.hubId]);

  const handleHubChangeInAddForm = (newHubId: string) => {
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

  // Multiple Image Upload Handler for Add Form
  const handleAddFormFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadError(null);

    const fileList = Array.from(files);
    const { urls, errors } = await storageService.uploadMultipleImages(fileList, 'products');

    setIsUploading(false);

    if (errors.length > 0) {
      setUploadError(errors.join(' | '));
    }

    if (urls.length > 0) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...urls]
      }));
    }

    // Reset input
    e.target.value = '';
  };

  // Add Image via URL for Add Form
  const handleAddImageUrl = () => {
    if (!imageUrlInput.trim()) return;
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, imageUrlInput.trim()]
    }));
    setImageUrlInput('');
  };

  // Reorder Images in Add Form
  const handleMoveImageAddForm = (index: number, direction: 'left' | 'right') => {
    setFormData(prev => {
      const newImages = [...prev.images];
      const targetIndex = direction === 'left' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= newImages.length) return prev;
      const temp = newImages[index];
      newImages[index] = newImages[targetIndex];
      newImages[targetIndex] = temp;
      return { ...prev, images: newImages };
    });
  };

  // Set Primary Image in Add Form
  const handleSetPrimaryImageAddForm = (index: number) => {
    setFormData(prev => {
      const newImages = [...prev.images];
      const [selected] = newImages.splice(index, 1);
      return { ...prev, images: [selected, ...newImages] };
    });
  };

  // Remove Image in Add Form
  const handleRemoveImageAddForm = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  // Add Specification Row
  const handleAddSpecRow = () => {
    if (!newSpecKey.trim() || !newSpecValue.trim()) return;
    setFormData(prev => ({
      ...prev,
      specs: { ...prev.specs, [newSpecKey.trim()]: newSpecValue.trim() }
    }));
    setNewSpecKey('');
    setNewSpecValue('');
  };

  const handleRemoveSpecRow = (key: string) => {
    setFormData(prev => {
      const copy = { ...prev.specs };
      delete copy[key];
      return { ...prev, specs: copy };
    });
  };

  // Edit Form Helpers
  const handleEditFormFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editingProduct) return;
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadError(null);

    const fileList = Array.from(files);
    const { urls, errors } = await storageService.uploadMultipleImages(fileList, 'products');

    setIsUploading(false);

    if (errors.length > 0) {
      setUploadError(errors.join(' | '));
    }

    if (urls.length > 0) {
      setEditingProduct({
        ...editingProduct,
        images: [...(editingProduct.images || []), ...urls]
      });
    }

    e.target.value = '';
  };

  const handleMoveImageEditForm = (index: number, direction: 'left' | 'right') => {
    if (!editingProduct) return;
    const newImages = [...(editingProduct.images || [])];
    const targetIndex = direction === 'left' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newImages.length) return;
    const temp = newImages[index];
    newImages[index] = newImages[targetIndex];
    newImages[targetIndex] = temp;
    setEditingProduct({ ...editingProduct, images: newImages });
  };

  const handleSetPrimaryImageEditForm = (index: number) => {
    if (!editingProduct) return;
    const newImages = [...(editingProduct.images || [])];
    const [selected] = newImages.splice(index, 1);
    setEditingProduct({ ...editingProduct, images: [selected, ...newImages] });
  };

  const handleRemoveImageEditForm = (index: number) => {
    if (!editingProduct) return;
    setEditingProduct({
      ...editingProduct,
      images: (editingProduct.images || []).filter((_, i) => i !== index)
    });
  };

  // Form Submissions
  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors([]);

    const validation = productService.validateProduct({
      name: formData.name,
      sku: formData.sku,
      basePrice: Number(formData.basePrice),
      discountPrice: formData.discountPrice ? Number(formData.discountPrice) : undefined,
      hubId: formData.hubId,
      category: formData.category,
      assignedOpId: formData.assignedOpId
    });

    if (!validation.valid) {
      setValidationErrors(validation.errors);
      return;
    }

    const hub = hubs.find(h => h.id === formData.hubId);
    const categoryObj = categories.find(c => c.id === formData.categoryId || c.name === formData.category);

    const created = addProduct({
      name: formData.name.trim(),
      slug: formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      sku: formData.sku.trim().toUpperCase(),
      hubId: formData.hubId,
      hubName: hub ? hub.name : 'Hub 1',
      category: categoryObj ? categoryObj.name : formData.category,
      categoryId: categoryObj?.id,
      assignedOpId: formData.assignedOpId,
      warehouseLocation: formData.warehouseLocation || 'Central Warehouse Bay A',
      description: formData.description,
      basePrice: Number(formData.basePrice),
      discountPrice: formData.discountPrice ? Number(formData.discountPrice) : undefined,
      stockQuantity: Number(formData.stockQuantity),
      warehouseStock: Number(formData.warehouseStock || 100),
      opStock: { [formData.assignedOpId]: Number(formData.stockQuantity) },
      minAlertThreshold: Number(formData.minAlertThreshold || 20),
      availability: formData.availability,
      minBulkOrderQty: Number(formData.minBulkOrderQty || 10),
      bulkDiscountPercent: Number(formData.bulkDiscountPercent || 10),
      isPublished: formData.isPublished,
      isFeatured: formData.isFeatured,
      isBestseller: formData.isBestseller,
      isNewArrival: formData.isNewArrival,
      images: formData.images.length > 0 ? formData.images : ['https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80'],
      specs: formData.specs
    });

    if (created) {
      setIsAddModalOpen(false);
      setFormData(defaultNewProductForm);
      setAddFormTab('general');
    }
  };

  const handleEditProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    setValidationErrors([]);

    const validation = productService.validateProduct({
      name: editingProduct.name,
      sku: editingProduct.sku,
      basePrice: Number(editingProduct.basePrice),
      discountPrice: editingProduct.discountPrice ? Number(editingProduct.discountPrice) : undefined,
      hubId: editingProduct.hubId,
      category: editingProduct.category,
      assignedOpId: editingProduct.assignedOpId
    });

    if (!validation.valid) {
      setValidationErrors(validation.errors);
      return;
    }

    const hub = hubs.find(h => h.id === editingProduct.hubId);
    const categoryObj = categories.find(c => c.id === editingProduct.categoryId || c.name === editingProduct.category);

    const success = updateProduct(editingProduct.id, {
      ...editingProduct,
      hubName: hub ? hub.name : editingProduct.hubName,
      category: categoryObj ? categoryObj.name : editingProduct.category,
      categoryId: categoryObj?.id || editingProduct.categoryId,
      basePrice: Number(editingProduct.basePrice),
      discountPrice: editingProduct.discountPrice ? Number(editingProduct.discountPrice) : undefined,
      stockQuantity: Number(editingProduct.stockQuantity),
      warehouseStock: Number(editingProduct.warehouseStock || 0),
      minAlertThreshold: Number(editingProduct.minAlertThreshold || 20),
      minBulkOrderQty: Number(editingProduct.minBulkOrderQty || 5),
      bulkDiscountPercent: Number(editingProduct.bulkDiscountPercent || 10)
    });

    if (success) {
      setIsEditModalOpen(false);
      setEditingProduct(null);
    }
  };

  const handleSaveStock = (productId: string) => {
    updateStock(productId, Number(newStockVal));
    setEditingStockId(null);
  };

  // Filtering, Searching, and Sorting
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Search query
      if (searchFilter.trim()) {
        const q = searchFilter.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesSku = p.sku.toLowerCase().includes(q);
        const matchesCat = p.category.toLowerCase().includes(q);
        const matchesHub = p.hubName && p.hubName.toLowerCase().includes(q);
        const matchesLoc = p.warehouseLocation && p.warehouseLocation.toLowerCase().includes(q);
        if (!matchesName && !matchesSku && !matchesCat && !matchesHub && !matchesLoc) {
          return false;
        }
      }

      // Hub Filter
      if (selectedHubFilter !== 'all' && p.hubId !== selectedHubFilter) {
        return false;
      }

      // Category Filter
      if (selectedCategoryFilter !== 'all') {
        if (p.categoryId !== selectedCategoryFilter && p.category !== selectedCategoryFilter) {
          return false;
        }
      }

      // OP Filter (OP 1 to OP 4)
      if (selectedOpFilter !== 'all' && p.assignedOpId !== selectedOpFilter) {
        return false;
      }

      // Status Filter
      if (statusFilter === 'published') {
        if (p.isPublished === false || p.isArchived) return false;
      } else if (statusFilter === 'draft') {
        if (p.isPublished !== false || p.isArchived) return false;
      } else if (statusFilter === 'low_stock') {
        const threshold = p.minAlertThreshold || 20;
        if (p.stockQuantity <= 0 || p.stockQuantity > threshold || p.isArchived) return false;
      } else if (statusFilter === 'out_of_stock') {
        if (p.stockQuantity > 0 || p.isArchived) return false;
      } else if (statusFilter === 'archived') {
        if (!p.isArchived) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
      if (sortBy === 'price-asc') {
        const pA = a.discountPrice || a.basePrice;
        const pB = b.discountPrice || b.basePrice;
        return pA - pB;
      }
      if (sortBy === 'price-desc') {
        const pA = a.discountPrice || a.basePrice;
        const pB = b.discountPrice || b.basePrice;
        return pB - pA;
      }
      if (sortBy === 'stock-asc') return a.stockQuantity - b.stockQuantity;
      if (sortBy === 'stock-desc') return b.stockQuantity - a.stockQuantity;
      // Default: newest first
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    });
  }, [products, searchFilter, selectedHubFilter, selectedCategoryFilter, selectedOpFilter, statusFilter, sortBy]);

  // Statistics Summary
  const stats = useMemo(() => {
    const total = products.length;
    const published = products.filter(p => p.isPublished !== false && !p.isArchived).length;
    const draft = products.filter(p => p.isPublished === false && !p.isArchived).length;
    const archived = products.filter(p => p.isArchived).length;
    const lowStock = products.filter(p => p.stockQuantity > 0 && p.stockQuantity <= (p.minAlertThreshold || 20) && !p.isArchived).length;
    const outOfStock = products.filter(p => p.stockQuantity <= 0 && !p.isArchived).length;
    return { total, published, draft, archived, lowStock, outOfStock };
  }, [products]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProducts.length / pageSize) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredProducts.slice(start, start + pageSize);
  }, [filteredProducts, currentPage, pageSize]);

  // Copy SKU to clipboard
  const handleCopySku = (sku: string) => {
    navigator.clipboard.writeText(sku);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Banner & Control Bar */}
      <div style={{
        background: '#ffffff',
        borderRadius: '20px',
        padding: '24px 28px',
        border: '1px solid #e2e8f0',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.02)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0f766e', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '4px' }}>
            <Building2 size={14} /> Catalog Database & Image Storage Management
          </div>
          <h1 style={{ fontSize: '1.65rem', fontWeight: 900, color: '#0f172a', margin: '0 0 4px 0' }}>
            Products & Catalog Management
          </h1>
          <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>
            Create, update, upload images, and control products across all Hubs and OP 1–OP 4 sections in real time.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button
            onClick={() => {
              setFormData(defaultNewProductForm);
              setValidationErrors([]);
              setUploadError(null);
              setIsAddModalOpen(true);
            }}
            className="btn-primary"
            style={{ fontSize: '0.86rem', padding: '10px 18px', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Plus size={16} /> Add New Product
          </button>
        </div>
      </div>

      {/* Catalog Metric Strip */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
        gap: '14px'
      }}>
        <div style={{ background: '#ffffff', padding: '16px', borderRadius: '14px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#f0fdfa', color: '#0f766e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Boxes size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Total Catalog</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#0f172a' }}>{stats.total}</div>
          </div>
        </div>

        <div style={{ background: '#ffffff', padding: '16px', borderRadius: '14px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#f0fdf4', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Eye size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Live On Store</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#16a34a' }}>{stats.published}</div>
          </div>
        </div>

        <div style={{ background: '#ffffff', padding: '16px', borderRadius: '14px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#f1f5f9', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <EyeOff size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Draft / Hidden</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#475569' }}>{stats.draft}</div>
          </div>
        </div>

        <div style={{ background: '#ffffff', padding: '16px', borderRadius: '14px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#fffbeb', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AlertTriangle size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Low Stock</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#d97706' }}>{stats.lowStock}</div>
          </div>
        </div>

        <div style={{ background: '#ffffff', padding: '16px', borderRadius: '14px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#fff1f2', color: '#e11d48', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AlertCircle size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Out Of Stock</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#e11d48' }}>{stats.outOfStock}</div>
          </div>
        </div>

        <div style={{ background: '#ffffff', padding: '16px', borderRadius: '14px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#faf5ff', color: '#9333ea', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Archive size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Archived</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#9333ea' }}>{stats.archived}</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div style={{
        background: '#ffffff',
        borderRadius: '16px',
        padding: '16px 20px',
        border: '1px solid #e2e8f0',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Search Input */}
        <div style={{ position: 'relative', flex: '1 1 240px' }}>
          <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search by title, SKU, category, or bay..."
            value={searchFilter}
            onChange={e => {
              setSearchFilter(e.target.value);
              setCurrentPage(1);
            }}
            style={{
              width: '100%',
              padding: '9px 12px 9px 36px',
              borderRadius: '8px',
              border: '1.5px solid #cbd5e1',
              fontSize: '0.83rem',
              color: '#0f172a'
            }}
          />
        </div>

        {/* Filter Controls */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
          {/* Hub Filter */}
          <select
            value={selectedHubFilter}
            onChange={e => {
              setSelectedHubFilter(e.target.value);
              setCurrentPage(1);
            }}
            style={{
              padding: '8px 10px',
              borderRadius: '8px',
              border: '1.5px solid #cbd5e1',
              fontSize: '0.8rem',
              fontWeight: 600,
              background: '#ffffff',
              color: '#334155'
            }}
          >
            <option value="all">All Hubs ({hubs.length})</option>
            {hubs.map(h => (
              <option key={h.id} value={h.id}>{h.code} - {h.name.split('-')[1]?.trim() || h.name}</option>
            ))}
          </select>

          {/* Category Filter */}
          <select
            value={selectedCategoryFilter}
            onChange={e => {
              setSelectedCategoryFilter(e.target.value);
              setCurrentPage(1);
            }}
            style={{
              padding: '8px 10px',
              borderRadius: '8px',
              border: '1.5px solid #cbd5e1',
              fontSize: '0.8rem',
              fontWeight: 600,
              background: '#ffffff',
              color: '#334155'
            }}
          >
            <option value="all">All Categories</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          {/* OP Classification Filter (OP 1 to OP 4) */}
          <select
            value={selectedOpFilter}
            onChange={e => {
              setSelectedOpFilter(e.target.value);
              setCurrentPage(1);
            }}
            style={{
              padding: '8px 10px',
              borderRadius: '8px',
              border: '1.5px solid #cbd5e1',
              fontSize: '0.8rem',
              fontWeight: 700,
              background: '#ffffff',
              color: '#4338ca'
            }}
          >
            <option value="all">All OP Sections (1–4)</option>
            <option value="op-1">OP 1 - Heavy Storage & Drums</option>
            <option value="op-2">OP 2 - Sanitation & Bins</option>
            <option value="op-3">OP 3 - Furniture & Seating</option>
            <option value="op-4">OP 4 - Household & Utilities</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={e => {
              setStatusFilter(e.target.value as any);
              setCurrentPage(1);
            }}
            style={{
              padding: '8px 10px',
              borderRadius: '8px',
              border: '1.5px solid #cbd5e1',
              fontSize: '0.8rem',
              fontWeight: 600,
              background: '#ffffff',
              color: '#334155'
            }}
          >
            <option value="all">All Statuses</option>
            <option value="published">🟢 Live on Store</option>
            <option value="draft">⚪ Draft / Hidden</option>
            <option value="low_stock">🟡 Low Stock Warning</option>
            <option value="out_of_stock">🔴 Out of Stock</option>
            <option value="archived">🟣 Archived</option>
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
            style={{
              padding: '8px 10px',
              borderRadius: '8px',
              border: '1.5px solid #cbd5e1',
              fontSize: '0.8rem',
              fontWeight: 600,
              background: '#ffffff',
              color: '#334155'
            }}
          >
            <option value="newest">Sort: Newest First</option>
            <option value="name-asc">Sort: Name (A-Z)</option>
            <option value="name-desc">Sort: Name (Z-A)</option>
            <option value="price-asc">Sort: Price (Low to High)</option>
            <option value="price-desc">Sort: Price (High to Low)</option>
            <option value="stock-desc">Sort: Highest Stock</option>
            <option value="stock-asc">Sort: Lowest Stock</option>
          </select>
        </div>
      </div>

      {/* Main Product Data Table */}
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
              <tr style={{ background: '#f8fafc', borderBottom: '1.5px solid #e2e8f0', textAlign: 'left', color: '#64748b', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <th style={{ padding: '14px 16px' }}>Product & Images</th>
                <th style={{ padding: '14px 16px' }}>SKU Code</th>
                <th style={{ padding: '14px 16px' }}>Hub / Category</th>
                <th style={{ padding: '14px 16px' }}>OP Classification</th>
                <th style={{ padding: '14px 16px' }}>Price (₦)</th>
                <th style={{ padding: '14px 16px' }}>Stock Level</th>
                <th style={{ padding: '14px 16px' }}>Visibility</th>
                <th style={{ padding: '14px 16px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ padding: '60px 20px', textAlign: 'center', color: '#64748b' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                      <Boxes size={36} color="#cbd5e1" />
                      <strong style={{ color: '#334155' }}>No products match the selected criteria.</strong>
                      <span style={{ fontSize: '0.8rem' }}>Try clearing filters or search terms.</span>
                      <button
                        onClick={() => {
                          setSearchFilter('');
                          setSelectedHubFilter('all');
                          setSelectedCategoryFilter('all');
                          setSelectedOpFilter('all');
                          setStatusFilter('all');
                        }}
                        style={{
                          marginTop: '8px',
                          background: '#f1f5f9',
                          border: '1px solid #cbd5e1',
                          padding: '6px 14px',
                          borderRadius: '6px',
                          fontSize: '0.78rem',
                          cursor: 'pointer'
                        }}
                      >
                        Reset All Filters
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedProducts.map(p => {
                  const isLowStock = p.stockQuantity > 0 && p.stockQuantity <= (p.minAlertThreshold || 20);
                  const isOutOfStock = p.stockQuantity <= 0;
                  const isEditing = editingStockId === p.id;
                  const isPublished = p.isPublished !== false && !p.isArchived;
                  const isArchived = Boolean(p.isArchived);
                  const hub = hubs.find(h => h.id === p.hubId);
                  const imageCount = p.images?.length || 1;
                  const primaryImage = p.images?.[0] || 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80';

                  const opColorMap: Record<string, { bg: string; color: string; label: string }> = {
                    'op-1': { bg: '#e0e7ff', color: '#3730a3', label: 'OP 1 • Storage' },
                    'op-2': { bg: '#ecfdf5', color: '#065f46', label: 'OP 2 • Sanitation' },
                    'op-3': { bg: '#fef3c7', color: '#92400e', label: 'OP 3 • Furniture' },
                    'op-4': { bg: '#fae8ff', color: '#86198f', label: 'OP 4 • Household' }
                  };
                  const opStyle = opColorMap[p.assignedOpId] || { bg: '#f1f5f9', color: '#475569', label: p.assignedOpId.toUpperCase() };

                  return (
                    <tr
                      key={p.id}
                      style={{
                        borderBottom: '1px solid #f1f5f9',
                        background: isArchived ? '#fbfbfe' : '#ffffff',
                        opacity: isArchived ? 0.75 : 1
                      }}
                    >
                      {/* Product Name & Primary Image */}
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{ position: 'relative', width: '48px', height: '48px', flexShrink: 0 }}>
                            <img
                              src={primaryImage}
                              alt={p.name}
                              style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '8px',
                                objectFit: 'cover',
                                border: '1px solid #e2e8f0'
                              }}
                            />
                            {imageCount > 1 && (
                              <span style={{
                                position: 'absolute',
                                bottom: '-3px',
                                right: '-3px',
                                background: '#0f172a',
                                color: '#ffffff',
                                fontSize: '0.62rem',
                                fontWeight: 800,
                                padding: '1px 4px',
                                borderRadius: '4px',
                                border: '1px solid #ffffff'
                              }}>
                                +{imageCount - 1}
                              </span>
                            )}
                          </div>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <strong
                                onClick={() => setPreviewProduct(p)}
                                style={{
                                  color: '#0f172a',
                                  fontSize: '0.88rem',
                                  maxWidth: '220px',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap',
                                  display: 'block',
                                  cursor: 'pointer'
                                }}
                                title={p.name}
                              >
                                {p.name}
                              </strong>
                              {p.isFeatured && (
                                <span title="Featured Product" style={{ color: '#f59e0b', display: 'flex' }}>
                                  <Star size={13} fill="#f59e0b" />
                                </span>
                              )}
                            </div>
                            <span style={{ fontSize: '0.72rem', color: '#64748b', display: 'block' }}>
                              {p.warehouseLocation || 'Central Warehouse'}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* SKU with 1-click copy */}
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span style={{ fontWeight: 700, color: '#334155', fontFamily: 'monospace', fontSize: '0.82rem' }}>
                            {p.sku}
                          </span>
                          <button
                            onClick={() => handleCopySku(p.sku)}
                            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: '2px' }}
                            title="Copy SKU code"
                          >
                            <Copy size={12} />
                          </button>
                        </div>
                      </td>

                      {/* Hub & Category */}
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                          <span style={{
                            fontSize: '0.68rem',
                            fontWeight: 800,
                            color: '#0f766e',
                            background: '#f0fdfa',
                            border: '1px solid #ccfbf1',
                            padding: '1px 6px',
                            borderRadius: '4px',
                            display: 'inline-block',
                            width: 'fit-content'
                          }}>
                            {hub?.code || p.hubName?.split('-')[0]?.trim() || 'HUB-1'}
                          </span>
                          <span style={{ color: '#1e293b', fontWeight: 600, fontSize: '0.78rem' }}>
                            {p.category}
                          </span>
                        </div>
                      </td>

                      {/* Assigned OP Classification */}
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          color: opStyle.color,
                          background: opStyle.bg,
                          padding: '3px 8px',
                          borderRadius: '6px',
                          display: 'inline-block',
                          whiteSpace: 'nowrap'
                        }}>
                          {opStyle.label}
                        </span>
                      </td>

                      {/* Base & Discount Price */}
                      <td style={{ padding: '14px 16px' }}>
                        <div>
                          <span style={{ fontWeight: 900, color: '#0f172a', fontSize: '0.88rem' }}>
                            {formatNGN(p.discountPrice || p.basePrice)}
                          </span>
                          {p.discountPrice && p.discountPrice < p.basePrice && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '1px' }}>
                              <span style={{ textDecoration: 'line-through', color: '#94a3b8', fontSize: '0.72rem' }}>
                                {formatNGN(p.basePrice)}
                              </span>
                              <span style={{ color: '#16a34a', fontSize: '0.68rem', fontWeight: 800 }}>
                                -{Math.round(((p.basePrice - p.discountPrice) / p.basePrice) * 100)}%
                              </span>
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Floor Stock Level with inline editor */}
                      <td style={{ padding: '14px 16px' }}>
                        {isEditing ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <input
                              type="number"
                              min={0}
                              value={newStockVal}
                              onChange={e => setNewStockVal(Number(e.target.value))}
                              style={{ width: '64px', padding: '4px', borderRadius: '4px', border: '1.5px solid #0f766e', fontSize: '0.8rem' }}
                            />
                            <button
                              onClick={() => handleSaveStock(p.id)}
                              style={{ background: '#0f766e', color: '#fff', border: 'none', borderRadius: '4px', padding: '4px 6px', cursor: 'pointer' }}
                              title="Save stock level"
                            >
                              <Check size={14} />
                            </button>
                            <button
                              onClick={() => setEditingStockId(null)}
                              style={{ background: '#cbd5e1', color: '#334155', border: 'none', borderRadius: '4px', padding: '4px 6px', cursor: 'pointer' }}
                              title="Cancel"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ) : (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{
                              fontWeight: 800,
                              fontSize: '0.78rem',
                              color: isOutOfStock ? '#e11d48' : (isLowStock ? '#d97706' : '#0f172a'),
                              background: isOutOfStock ? '#fff1f2' : (isLowStock ? '#fffbeb' : '#f1f5f9'),
                              padding: '2px 8px',
                              borderRadius: '6px'
                            }}>
                              {p.stockQuantity} {isOutOfStock ? '(Out of Stock)' : (isLowStock ? '(Low)' : 'units')}
                            </span>
                            <button
                              onClick={() => {
                                setEditingStockId(p.id);
                                setNewStockVal(p.stockQuantity);
                              }}
                              style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '2px' }}
                              title="Quick-adjust Floor Stock"
                            >
                              <Edit2 size={12} />
                            </button>
                          </div>
                        )}
                      </td>

                      {/* Storefront Published Toggle */}
                      <td style={{ padding: '14px 16px' }}>
                        {isArchived ? (
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '3px 8px',
                            borderRadius: '6px',
                            background: '#faf5ff',
                            border: '1px solid #e9d5ff',
                            color: '#7e22ce',
                            fontSize: '0.72rem',
                            fontWeight: 800
                          }}>
                            <Archive size={11} /> Archived
                          </span>
                        ) : (
                          <button
                            onClick={() => toggleProductPublished(p.id)}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              padding: '3px 8px',
                              borderRadius: '6px',
                              border: '1px solid',
                              borderColor: isPublished ? '#bbf7d0' : '#e2e8f0',
                              background: isPublished ? '#f0fdf4' : '#f8fafc',
                              color: isPublished ? '#166534' : '#64748b',
                              fontSize: '0.72rem',
                              fontWeight: 800,
                              cursor: 'pointer'
                            }}
                            title={isPublished ? 'Visible on Storefront — Click to unpublish' : 'Hidden from Storefront — Click to make live'}
                          >
                            {isPublished ? <Eye size={12} /> : <EyeOff size={12} />}
                            {isPublished ? 'Live' : 'Hidden'}
                          </button>
                        )}
                      </td>

                      {/* Action Buttons */}
                      <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                          {/* Storefront Preview */}
                          <button
                            onClick={() => setPreviewProduct(p)}
                            style={{
                              padding: '6px 8px',
                              borderRadius: '6px',
                              border: '1px solid #cbd5e1',
                              background: '#ffffff',
                              color: '#0f766e',
                              cursor: 'pointer'
                            }}
                            title="Preview on Storefront"
                          >
                            <ExternalLink size={14} />
                          </button>

                          {/* Edit Details */}
                          <button
                            onClick={() => {
                              setEditingProduct(p);
                              setValidationErrors([]);
                              setUploadError(null);
                              setEditFormTab('general');
                              setIsEditModalOpen(true);
                            }}
                            style={{
                              padding: '6px 8px',
                              borderRadius: '6px',
                              border: '1px solid #cbd5e1',
                              background: '#ffffff',
                              color: '#334155',
                              cursor: 'pointer'
                            }}
                            title="Edit Product Details & Images"
                          >
                            <Edit2 size={14} />
                          </button>

                          {/* Archive / Unarchive */}
                          {isArchived ? (
                            <button
                              onClick={() => unarchiveProduct(p.id)}
                              style={{
                                padding: '6px 8px',
                                borderRadius: '6px',
                                border: '1px solid #d8b4fe',
                                background: '#faf5ff',
                                color: '#9333ea',
                                cursor: 'pointer'
                              }}
                              title="Restore Archived Product"
                            >
                              <RotateCcw size={14} />
                            </button>
                          ) : (
                            <button
                              onClick={() => archiveProduct(p.id)}
                              style={{
                                padding: '6px 8px',
                                borderRadius: '6px',
                                border: '1px solid #cbd5e1',
                                background: '#ffffff',
                                color: '#64748b',
                                cursor: 'pointer'
                              }}
                              title="Safely Archive Product (Hide from Catalog)"
                            >
                              <Archive size={14} />
                            </button>
                          )}

                          {/* Safe Delete with Confirmation */}
                          <button
                            onClick={() => setDeleteConfirmProduct(p)}
                            style={{
                              padding: '6px 8px',
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

        {/* Pagination Bar */}
        <div style={{
          padding: '14px 20px',
          borderTop: '1px solid #f1f5f9',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          background: '#ffffff',
          fontSize: '0.82rem',
          color: '#64748b'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>Showing {filteredProducts.length === 0 ? 0 : (currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, filteredProducts.length)} of {filteredProducts.length} products</span>
            <select
              value={pageSize}
              onChange={e => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              style={{
                marginLeft: '8px',
                padding: '4px 8px',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                fontSize: '0.78rem'
              }}
            >
              <option value={10}>10 per page</option>
              <option value={25}>25 per page</option>
              <option value={50}>50 per page</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '6px 10px',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                background: currentPage <= 1 ? '#f8fafc' : '#ffffff',
                color: currentPage <= 1 ? '#cbd5e1' : '#334155',
                cursor: currentPage <= 1 ? 'not-allowed' : 'pointer'
              }}
            >
              <ChevronLeft size={14} /> Prev
            </button>

            {Array.from({ length: totalPages }).map((_, i) => {
              const pNum = i + 1;
              if (totalPages > 6 && Math.abs(pNum - currentPage) > 2 && pNum !== 1 && pNum !== totalPages) {
                if (Math.abs(pNum - currentPage) === 3) return <span key={pNum}>...</span>;
                return null;
              }
              const isActive = pNum === currentPage;
              return (
                <button
                  key={pNum}
                  onClick={() => setCurrentPage(pNum)}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '6px',
                    border: '1px solid',
                    borderColor: isActive ? '#0f766e' : '#cbd5e1',
                    background: isActive ? '#0f766e' : '#ffffff',
                    color: isActive ? '#ffffff' : '#334155',
                    fontWeight: isActive ? 800 : 500,
                    cursor: 'pointer'
                  }}
                >
                  {pNum}
                </button>
              );
            })}

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '6px 10px',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                background: currentPage >= totalPages ? '#f8fafc' : '#ffffff',
                color: currentPage >= totalPages ? '#cbd5e1' : '#334155',
                cursor: currentPage >= totalPages ? 'not-allowed' : 'pointer'
              }}
            >
              Next <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* MODAL: ADD NEW PRODUCT */}
      {isAddModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.82)',
          backdropFilter: 'blur(5px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2100,
          padding: '20px'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            width: '100%',
            maxWidth: '780px',
            maxHeight: '92vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
            border: '1px solid #e2e8f0'
          }}>
            {/* Modal Header */}
            <div style={{
              background: 'linear-gradient(135deg, #062826 0%, #0f766e 100%)',
              padding: '24px 28px',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#99f6e4', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Catalog Management Portal
                </span>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#ffffff', margin: '2px 0 0 0' }}>
                  Add New Product to Catalog
                </h2>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  border: 'none',
                  color: '#ffffff',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div style={{
              display: 'flex',
              background: '#f8fafc',
              borderBottom: '1px solid #e2e8f0',
              padding: '0 20px',
              gap: '6px',
              overflowX: 'auto'
            }}>
              {[
                { id: 'general', label: '1. General Info' },
                { id: 'pricing', label: '2. Pricing & Wholesale' },
                { id: 'inventory', label: '3. Inventory & Bay' },
                { id: 'images', label: `4. Product Images (${formData.images.length})` },
                { id: 'specs', label: '5. Specifications' }
              ].map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setAddFormTab(tab.id as any)}
                  style={{
                    padding: '12px 14px',
                    border: 'none',
                    background: 'transparent',
                    borderBottom: addFormTab === tab.id ? '2.5px solid #0f766e' : '2.5px solid transparent',
                    color: addFormTab === tab.id ? '#0f766e' : '#64748b',
                    fontWeight: addFormTab === tab.id ? 800 : 600,
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Validation Errors Notice */}
            {validationErrors.length > 0 && (
              <div style={{
                margin: '16px 28px 0 28px',
                padding: '12px 16px',
                borderRadius: '10px',
                background: '#fef2f2',
                border: '1px solid #fecaca',
                color: '#991b1b',
                fontSize: '0.82rem'
              }}>
                <strong>Please resolve the following:</strong>
                <ul style={{ margin: '4px 0 0 0', paddingLeft: '20px' }}>
                  {validationErrors.map((err, i) => <li key={i}>{err}</li>)}
                </ul>
              </div>
            )}

            {/* Modal Body */}
            <form onSubmit={handleAddProductSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1, overflowY: 'auto', padding: '24px 28px' }}>
              {/* TAB 1: GENERAL INFO */}
              {addFormTab === 'general' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                        Product Title *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 50L Heavy Duty Storage Drum with Dispensing Tap"
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
                        placeholder="IYN-DRUM-50L"
                        value={formData.sku}
                        onChange={e => setFormData({ ...formData, sku: e.target.value.toUpperCase() })}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem', textTransform: 'uppercase' }}
                      />
                    </div>
                  </div>

                  {/* Hub & Category */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                        Assigned Production / Depot Hub *
                      </label>
                      <select
                        value={formData.hubId}
                        onChange={e => handleHubChangeInAddForm(e.target.value)}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
                      >
                        {hubs.map(h => (
                          <option key={h.id} value={h.id}>{h.code} - {h.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                        Product Category *
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
                        {availableCategoriesForAddHub.length > 0 ? (
                          availableCategoriesForAddHub.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                          ))
                        ) : (
                          categories.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                          ))
                        )}
                      </select>
                    </div>
                  </div>

                  {/* OP Classification & Bay */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                        Operational Unit (OP Classification) *
                      </label>
                      <select
                        value={formData.assignedOpId}
                        onChange={e => setFormData({ ...formData, assignedOpId: e.target.value })}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
                      >
                        <option value="op-1">OP 1 - Heavy Storage, Drums, Buckets & PET</option>
                        <option value="op-2">OP 2 - Sanitation, Waste Bins & Wheeled Carts</option>
                        <option value="op-3">OP 3 - Commercial Plastic Furniture & Seating</option>
                        <option value="op-4">OP 4 - Household Utilities, Electricals & Balloons</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                        Warehouse Rack / Bay Location
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Bay A3 / Pallet Rack 02"
                        value={formData.warehouseLocation}
                        onChange={e => setFormData({ ...formData, warehouseLocation: e.target.value })}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                      Detailed Product Description
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Describe polymer grade, intended commercial or household use, durability features, and fittings..."
                      value={formData.description}
                      onChange={e => setFormData({ ...formData, description: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: PRICING & WHOLESALE */}
              {addFormTab === 'pricing' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                        Base Retail Price (₦) *
                      </label>
                      <input
                        type="number"
                        min={100}
                        required
                        value={formData.basePrice}
                        onChange={e => setFormData({ ...formData, basePrice: Number(e.target.value) })}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                        Discount / Promotional Sale Price (₦)
                      </label>
                      <input
                        type="number"
                        min={0}
                        value={formData.discountPrice || ''}
                        onChange={e => setFormData({ ...formData, discountPrice: Number(e.target.value) || 0 })}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
                      />
                      {formData.discountPrice > 0 && formData.discountPrice < formData.basePrice && (
                        <div style={{ fontSize: '0.72rem', color: '#16a34a', fontWeight: 700, marginTop: '4px' }}>
                          Customer Savings: {Math.round(((formData.basePrice - formData.discountPrice) / formData.basePrice) * 100)}% discount!
                        </div>
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                        Minimum Bulk Order Quantity (Units)
                      </label>
                      <input
                        type="number"
                        min={1}
                        value={formData.minBulkOrderQty}
                        onChange={e => setFormData({ ...formData, minBulkOrderQty: Number(e.target.value) })}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                        Bulk Order Discount (%)
                      </label>
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={formData.bulkDiscountPercent}
                        onChange={e => setFormData({ ...formData, bulkDiscountPercent: Number(e.target.value) })}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
                      />
                    </div>
                  </div>

                  {/* Promotional Visibility Toggles */}
                  <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <strong style={{ fontSize: '0.82rem', color: '#0f172a' }}>Merchandising Badges & Storefront Exposure</strong>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={formData.isPublished}
                          onChange={e => setFormData({ ...formData, isPublished: e.target.checked })}
                        />
                        <span>Published on Storefront</span>
                      </label>

                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={formData.isFeatured}
                          onChange={e => setFormData({ ...formData, isFeatured: e.target.checked })}
                        />
                        <span>Featured on Homepage</span>
                      </label>

                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={formData.isBestseller}
                          onChange={e => setFormData({ ...formData, isBestseller: e.target.checked })}
                        />
                        <span>Best Seller Badge</span>
                      </label>

                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={formData.isNewArrival}
                          onChange={e => setFormData({ ...formData, isNewArrival: e.target.checked })}
                        />
                        <span>New Arrival Badge</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: INVENTORY */}
              {addFormTab === 'inventory' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                        Initial Floor Available Stock (Units) *
                      </label>
                      <input
                        type="number"
                        min={0}
                        value={formData.stockQuantity}
                        onChange={e => setFormData({ ...formData, stockQuantity: Number(e.target.value) })}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                        Central Warehouse Reserve Stock (Units) *
                      </label>
                      <input
                        type="number"
                        min={0}
                        value={formData.warehouseStock}
                        onChange={e => setFormData({ ...formData, warehouseStock: Number(e.target.value) })}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                        Low Stock Alert Threshold (Units)
                      </label>
                      <input
                        type="number"
                        min={1}
                        value={formData.minAlertThreshold}
                        onChange={e => setFormData({ ...formData, minAlertThreshold: Number(e.target.value) })}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
                      />
                      <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Triggers SLM requisition alert when stock dips below this value.</span>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                        Availability Status
                      </label>
                      <select
                        value={formData.availability}
                        onChange={e => setFormData({ ...formData, availability: e.target.value as any })}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
                      >
                        <option value="in_stock">In Stock (Ready for Dispatch)</option>
                        <option value="low_stock">Low Stock</option>
                        <option value="out_of_stock">Out of Stock</option>
                        <option value="discontinued">Discontinued</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: PRODUCT IMAGES */}
              {addFormTab === 'images' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  {/* File Upload Zone */}
                  <div style={{
                    border: '2px dashed #0f766e',
                    borderRadius: '14px',
                    padding: '24px',
                    textAlign: 'center',
                    background: '#f0fdfa',
                    cursor: 'pointer',
                    position: 'relative'
                  }}>
                    <input
                      type="file"
                      multiple
                      accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
                      onChange={handleAddFormFileUpload}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        opacity: 0,
                        cursor: 'pointer',
                        width: '100%',
                        height: '100%'
                      }}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', pointerEvents: 'none' }}>
                      <Upload size={28} color="#0f766e" />
                      <div>
                        <strong style={{ fontSize: '0.88rem', color: '#0f766e' }}>
                          {isUploading ? 'Uploading Image(s)...' : 'Click to Upload or Drag & Drop Product Images'}
                        </strong>
                        <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '2px' }}>
                          Supports JPG, PNG, WebP, GIF, SVG (Up to 5 MB per file). Multiple images allowed.
                        </div>
                      </div>
                    </div>
                  </div>

                  {uploadError && (
                    <div style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '10px 14px', borderRadius: '8px', color: '#991b1b', fontSize: '0.8rem' }}>
                      {uploadError}
                    </div>
                  )}

                  {/* Manual URL Input */}
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      placeholder="Or paste an image web link (e.g. Unsplash or Cloud URL)..."
                      value={imageUrlInput}
                      onChange={e => setImageUrlInput(e.target.value)}
                      style={{ flex: 1, padding: '9px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.82rem' }}
                    />
                    <button
                      type="button"
                      onClick={handleAddImageUrl}
                      style={{
                        padding: '9px 16px',
                        background: '#0f766e',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      Add URL
                    </button>
                  </div>

                  {/* Image Gallery & Reordering */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#334155', marginBottom: '8px' }}>
                      Image Gallery ({formData.images.length} Image{formData.images.length === 1 ? '' : 's'}) — The first image is the primary cover
                    </label>

                    {formData.images.length === 0 ? (
                      <div style={{ padding: '24px', textAlign: 'center', background: '#f8fafc', borderRadius: '10px', color: '#94a3b8', fontSize: '0.82rem' }}>
                        No images uploaded yet. Upload at least one product photo for optimal customer conversion.
                      </div>
                    ) : (
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
                        gap: '12px'
                      }}>
                        {formData.images.map((img, idx) => (
                          <div
                            key={idx}
                            style={{
                              position: 'relative',
                              borderRadius: '10px',
                              overflow: 'hidden',
                              border: idx === 0 ? '2px solid #0f766e' : '1px solid #e2e8f0',
                              background: '#f8fafc',
                              display: 'flex',
                              flexDirection: 'column'
                            }}
                          >
                            <img
                              src={img}
                              alt={`Thumbnail ${idx + 1}`}
                              style={{ width: '100%', height: '110px', objectFit: 'cover' }}
                            />

                            {/* Badge for cover */}
                            {idx === 0 && (
                              <div style={{
                                position: 'absolute',
                                top: '6px',
                                left: '6px',
                                background: '#0f766e',
                                color: '#ffffff',
                                fontSize: '0.62rem',
                                fontWeight: 900,
                                padding: '2px 6px',
                                borderRadius: '4px'
                              }}>
                                COVER
                              </div>
                            )}

                            {/* Image Actions Bar */}
                            <div style={{
                              padding: '6px',
                              background: '#ffffff',
                              borderTop: '1px solid #f1f5f9',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              gap: '4px'
                            }}>
                              <button
                                type="button"
                                disabled={idx === 0}
                                onClick={() => handleMoveImageAddForm(idx, 'left')}
                                style={{
                                  background: '#f1f5f9',
                                  border: 'none',
                                  padding: '4px',
                                  borderRadius: '4px',
                                  cursor: idx === 0 ? 'not-allowed' : 'pointer',
                                  color: idx === 0 ? '#cbd5e1' : '#334155'
                                }}
                                title="Move left / up"
                              >
                                ←
                              </button>

                              {idx !== 0 && (
                                <button
                                  type="button"
                                  onClick={() => handleSetPrimaryImageAddForm(idx)}
                                  style={{
                                    background: '#f0fdfa',
                                    border: '1px solid #99f6e4',
                                    color: '#0f766e',
                                    fontSize: '0.62rem',
                                    fontWeight: 800,
                                    padding: '2px 4px',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                  }}
                                  title="Set as main product photo"
                                >
                                  Make Cover
                                </button>
                              )}

                              <button
                                type="button"
                                disabled={idx === formData.images.length - 1}
                                onClick={() => handleMoveImageAddForm(idx, 'right')}
                                style={{
                                  background: '#f1f5f9',
                                  border: 'none',
                                  padding: '4px',
                                  borderRadius: '4px',
                                  cursor: idx === formData.images.length - 1 ? 'not-allowed' : 'pointer',
                                  color: idx === formData.images.length - 1 ? '#cbd5e1' : '#334155'
                                }}
                                title="Move right / down"
                              >
                                →
                              </button>

                              <button
                                type="button"
                                onClick={() => handleRemoveImageAddForm(idx)}
                                style={{
                                  background: '#fff1f2',
                                  border: 'none',
                                  padding: '4px',
                                  borderRadius: '4px',
                                  cursor: 'pointer',
                                  color: '#e11d48'
                                }}
                                title="Remove photo"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 5: SPECIFICATIONS */}
              {addFormTab === 'specs' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <strong style={{ fontSize: '0.82rem', color: '#0f172a', display: 'block', marginBottom: '8px' }}>
                      Add Technical Specifications & Attributes
                    </strong>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input
                        type="text"
                        placeholder="Specification Name (e.g. Volume Capacity, Wall Thickness)"
                        value={newSpecKey}
                        onChange={e => setNewSpecKey(e.target.value)}
                        style={{ flex: 1, padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.82rem' }}
                      />
                      <input
                        type="text"
                        placeholder="Value (e.g. 50 Litres, 3.5mm Heavy Duty)"
                        value={newSpecValue}
                        onChange={e => setNewSpecValue(e.target.value)}
                        style={{ flex: 1, padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.82rem' }}
                      />
                      <button
                        type="button"
                        onClick={handleAddSpecRow}
                        style={{
                          background: '#0f766e',
                          color: '#ffffff',
                          border: 'none',
                          padding: '8px 14px',
                          borderRadius: '8px',
                          fontSize: '0.82rem',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        Add Spec
                      </button>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {Object.entries(formData.specs).map(([key, val]) => (
                      <div
                        key={key}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '10px 14px',
                          background: '#ffffff',
                          borderRadius: '8px',
                          border: '1px solid #e2e8f0'
                        }}
                      >
                        <div>
                          <strong style={{ fontSize: '0.82rem', color: '#334155', marginRight: '8px' }}>{key}:</strong>
                          <span style={{ fontSize: '0.82rem', color: '#64748b' }}>{val}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveSpecRow(key)}
                          style={{ background: 'transparent', border: 'none', color: '#e11d48', cursor: 'pointer' }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Form Bottom Action Buttons */}
              <div style={{
                marginTop: '24px',
                paddingTop: '16px',
                borderTop: '1px solid #e2e8f0',
                display: 'flex',
                gap: '12px',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  style={{
                    padding: '10px 18px',
                    borderRadius: '8px',
                    border: '1.5px solid #cbd5e1',
                    background: '#ffffff',
                    color: '#64748b',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ padding: '10px 22px', fontSize: '0.88rem' }}
                  >
                    <Check size={16} /> Save & Publish Product
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT PRODUCT */}
      {isEditModalOpen && editingProduct && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.82)',
          backdropFilter: 'blur(5px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2100,
          padding: '20px'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            width: '100%',
            maxWidth: '780px',
            maxHeight: '92vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
            border: '1px solid #e2e8f0'
          }}>
            {/* Modal Header */}
            <div style={{
              background: 'linear-gradient(135deg, #062826 0%, #0f766e 100%)',
              padding: '24px 28px',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#99f6e4', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Edit Product Catalog Record
                </span>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#ffffff', margin: '2px 0 0 0' }}>
                  {editingProduct.name}
                </h2>
              </div>
              <button
                onClick={() => {
                  setIsEditModalOpen(false);
                  setEditingProduct(null);
                }}
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  border: 'none',
                  color: '#ffffff',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div style={{
              display: 'flex',
              background: '#f8fafc',
              borderBottom: '1px solid #e2e8f0',
              padding: '0 20px',
              gap: '6px',
              overflowX: 'auto'
            }}>
              {[
                { id: 'general', label: '1. General Info' },
                { id: 'pricing', label: '2. Pricing & Wholesale' },
                { id: 'inventory', label: '3. Inventory & Bay' },
                { id: 'images', label: `4. Images (${editingProduct.images?.length || 0})` },
                { id: 'specs', label: '5. Specifications' }
              ].map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setEditFormTab(tab.id as any)}
                  style={{
                    padding: '12px 14px',
                    border: 'none',
                    background: 'transparent',
                    borderBottom: editFormTab === tab.id ? '2.5px solid #0f766e' : '2.5px solid transparent',
                    color: editFormTab === tab.id ? '#0f766e' : '#64748b',
                    fontWeight: editFormTab === tab.id ? 800 : 600,
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Validation Errors Notice */}
            {validationErrors.length > 0 && (
              <div style={{
                margin: '16px 28px 0 28px',
                padding: '12px 16px',
                borderRadius: '10px',
                background: '#fef2f2',
                border: '1px solid #fecaca',
                color: '#991b1b',
                fontSize: '0.82rem'
              }}>
                <strong>Please resolve the following:</strong>
                <ul style={{ margin: '4px 0 0 0', paddingLeft: '20px' }}>
                  {validationErrors.map((err, i) => <li key={i}>{err}</li>)}
                </ul>
              </div>
            )}

            {/* Modal Body */}
            <form onSubmit={handleEditProductSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1, overflowY: 'auto', padding: '24px 28px' }}>
              {/* TAB 1: GENERAL */}
              {editFormTab === 'general' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                        Product Title *
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
                        SKU Code *
                      </label>
                      <input
                        type="text"
                        required
                        value={editingProduct.sku}
                        onChange={e => setEditingProduct({ ...editingProduct, sku: e.target.value.toUpperCase() })}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem', textTransform: 'uppercase' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                        Assigned Production / Depot Hub
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
                          <option key={h.id} value={h.id}>{h.code} - {h.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                        Product Category
                      </label>
                      <select
                        value={editingProduct.categoryId || editingProduct.category}
                        onChange={e => {
                          const cat = categories.find(c => c.id === e.target.value || c.name === e.target.value);
                          setEditingProduct({
                            ...editingProduct,
                            categoryId: cat?.id,
                            category: cat ? cat.name : e.target.value,
                            assignedOpId: cat?.assignedOpId || editingProduct.assignedOpId
                          });
                        }}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
                      >
                        {categories.map(c => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                        Responsible Operational Unit (OP)
                      </label>
                      <select
                        value={editingProduct.assignedOpId}
                        onChange={e => setEditingProduct({ ...editingProduct, assignedOpId: e.target.value })}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
                      >
                        <option value="op-1">OP 1 - Heavy Storage, Drums & Buckets</option>
                        <option value="op-2">OP 2 - Sanitation & Waste Bins</option>
                        <option value="op-3">OP 3 - Commercial Plastic Furniture</option>
                        <option value="op-4">OP 4 - Household Utilities & Electricals</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                        Warehouse Rack / Bay Location
                      </label>
                      <input
                        type="text"
                        value={editingProduct.warehouseLocation || ''}
                        onChange={e => setEditingProduct({ ...editingProduct, warehouseLocation: e.target.value })}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                      Detailed Product Description
                    </label>
                    <textarea
                      rows={3}
                      value={editingProduct.description || ''}
                      onChange={e => setEditingProduct({ ...editingProduct, description: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: PRICING */}
              {editFormTab === 'pricing' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                        Base Retail Price (₦) *
                      </label>
                      <input
                        type="number"
                        min={100}
                        required
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
                        min={0}
                        value={editingProduct.discountPrice || ''}
                        onChange={e => setEditingProduct({ ...editingProduct, discountPrice: Number(e.target.value) || undefined })}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                        Minimum Bulk Order Quantity
                      </label>
                      <input
                        type="number"
                        min={1}
                        value={editingProduct.minBulkOrderQty || 5}
                        onChange={e => setEditingProduct({ ...editingProduct, minBulkOrderQty: Number(e.target.value) })}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                        Bulk Discount Percentage (%)
                      </label>
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={editingProduct.bulkDiscountPercent || 10}
                        onChange={e => setEditingProduct({ ...editingProduct, bulkDiscountPercent: Number(e.target.value) })}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
                      />
                    </div>
                  </div>

                  <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <strong style={{ fontSize: '0.82rem', color: '#0f172a' }}>Merchandising Badges & Storefront Exposure</strong>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={editingProduct.isPublished !== false}
                          onChange={e => setEditingProduct({ ...editingProduct, isPublished: e.target.checked })}
                        />
                        <span>Published on Storefront</span>
                      </label>

                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={Boolean(editingProduct.isFeatured)}
                          onChange={e => setEditingProduct({ ...editingProduct, isFeatured: e.target.checked })}
                        />
                        <span>Featured on Homepage</span>
                      </label>

                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={Boolean(editingProduct.isBestseller)}
                          onChange={e => setEditingProduct({ ...editingProduct, isBestseller: e.target.checked })}
                        />
                        <span>Best Seller Badge</span>
                      </label>

                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={Boolean(editingProduct.isNewArrival)}
                          onChange={e => setEditingProduct({ ...editingProduct, isNewArrival: e.target.checked })}
                        />
                        <span>New Arrival Badge</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: INVENTORY */}
              {editFormTab === 'inventory' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                        Floor Available Stock (Units)
                      </label>
                      <input
                        type="number"
                        min={0}
                        value={editingProduct.stockQuantity}
                        onChange={e => setEditingProduct({ ...editingProduct, stockQuantity: Number(e.target.value) })}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                        Central Warehouse Reserve Stock (Units)
                      </label>
                      <input
                        type="number"
                        min={0}
                        value={editingProduct.warehouseStock || 0}
                        onChange={e => setEditingProduct({ ...editingProduct, warehouseStock: Number(e.target.value) })}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                        Low Stock Alert Threshold
                      </label>
                      <input
                        type="number"
                        min={1}
                        value={editingProduct.minAlertThreshold || 20}
                        onChange={e => setEditingProduct({ ...editingProduct, minAlertThreshold: Number(e.target.value) })}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                        Availability Status
                      </label>
                      <select
                        value={editingProduct.availability || 'in_stock'}
                        onChange={e => setEditingProduct({ ...editingProduct, availability: e.target.value as any })}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
                      >
                        <option value="in_stock">In Stock (Active)</option>
                        <option value="low_stock">Low Stock</option>
                        <option value="out_of_stock">Out of Stock</option>
                        <option value="discontinued">Discontinued</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: IMAGES */}
              {editFormTab === 'images' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  <div style={{
                    border: '2px dashed #0f766e',
                    borderRadius: '14px',
                    padding: '24px',
                    textAlign: 'center',
                    background: '#f0fdfa',
                    cursor: 'pointer',
                    position: 'relative'
                  }}>
                    <input
                      type="file"
                      multiple
                      accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
                      onChange={handleEditFormFileUpload}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        opacity: 0,
                        cursor: 'pointer',
                        width: '100%',
                        height: '100%'
                      }}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', pointerEvents: 'none' }}>
                      <Upload size={28} color="#0f766e" />
                      <div>
                        <strong style={{ fontSize: '0.88rem', color: '#0f766e' }}>
                          {isUploading ? 'Uploading Image(s)...' : 'Click or Drag & Drop to Upload New Photos'}
                        </strong>
                        <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '2px' }}>
                          JPG, PNG, WebP, GIF, SVG (Up to 5 MB per file).
                        </div>
                      </div>
                    </div>
                  </div>

                  {uploadError && (
                    <div style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '10px 14px', borderRadius: '8px', color: '#991b1b', fontSize: '0.8rem' }}>
                      {uploadError}
                    </div>
                  )}

                  {/* Image Gallery */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#334155', marginBottom: '8px' }}>
                      Current Gallery Photos ({(editingProduct.images || []).length})
                    </label>

                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
                      gap: '12px'
                    }}>
                      {(editingProduct.images || []).map((img, idx) => (
                        <div
                          key={idx}
                          style={{
                            position: 'relative',
                            borderRadius: '10px',
                            overflow: 'hidden',
                            border: idx === 0 ? '2px solid #0f766e' : '1px solid #e2e8f0',
                            background: '#f8fafc',
                            display: 'flex',
                            flexDirection: 'column'
                          }}
                        >
                          <img
                            src={img}
                            alt={`Thumbnail ${idx + 1}`}
                            style={{ width: '100%', height: '110px', objectFit: 'cover' }}
                          />

                          {idx === 0 && (
                            <div style={{
                              position: 'absolute',
                              top: '6px',
                              left: '6px',
                              background: '#0f766e',
                              color: '#ffffff',
                              fontSize: '0.62rem',
                              fontWeight: 900,
                              padding: '2px 6px',
                              borderRadius: '4px'
                            }}>
                              COVER
                            </div>
                          )}

                          <div style={{
                            padding: '6px',
                            background: '#ffffff',
                            borderTop: '1px solid #f1f5f9',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '4px'
                          }}>
                            <button
                              type="button"
                              disabled={idx === 0}
                              onClick={() => handleMoveImageEditForm(idx, 'left')}
                              style={{
                                background: '#f1f5f9',
                                border: 'none',
                                padding: '4px',
                                borderRadius: '4px',
                                cursor: idx === 0 ? 'not-allowed' : 'pointer',
                                color: idx === 0 ? '#cbd5e1' : '#334155'
                              }}
                            >
                              ←
                            </button>

                            {idx !== 0 && (
                              <button
                                type="button"
                                onClick={() => handleSetPrimaryImageEditForm(idx)}
                                style={{
                                  background: '#f0fdfa',
                                  border: '1px solid #99f6e4',
                                  color: '#0f766e',
                                  fontSize: '0.62rem',
                                  fontWeight: 800,
                                  padding: '2px 4px',
                                  borderRadius: '4px',
                                  cursor: 'pointer'
                                }}
                              >
                                Cover
                              </button>
                            )}

                            <button
                              type="button"
                              disabled={idx === (editingProduct.images?.length || 1) - 1}
                              onClick={() => handleMoveImageEditForm(idx, 'right')}
                              style={{
                                background: '#f1f5f9',
                                border: 'none',
                                padding: '4px',
                                borderRadius: '4px',
                                cursor: idx === (editingProduct.images?.length || 1) - 1 ? 'not-allowed' : 'pointer',
                                color: idx === (editingProduct.images?.length || 1) - 1 ? '#cbd5e1' : '#334155'
                              }}
                            >
                              →
                            </button>

                            <button
                              type="button"
                              onClick={() => handleRemoveImageEditForm(idx)}
                              style={{
                                background: '#fff1f2',
                                border: 'none',
                                padding: '4px',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                color: '#e11d48'
                              }}
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: SPECS */}
              {editFormTab === 'specs' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {Object.entries(editingProduct.specs || {}).map(([key, val]) => (
                      <div
                        key={key}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '10px 14px',
                          background: '#ffffff',
                          borderRadius: '8px',
                          border: '1px solid #e2e8f0'
                        }}
                      >
                        <div>
                          <strong style={{ fontSize: '0.82rem', color: '#334155', marginRight: '8px' }}>{key}:</strong>
                          <span style={{ fontSize: '0.82rem', color: '#64748b' }}>{val}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const copy = { ...editingProduct.specs };
                            delete copy[key];
                            setEditingProduct({ ...editingProduct, specs: copy });
                          }}
                          style={{ background: 'transparent', border: 'none', color: '#e11d48', cursor: 'pointer' }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Form Bottom Actions */}
              <div style={{
                marginTop: '24px',
                paddingTop: '16px',
                borderTop: '1px solid #e2e8f0',
                display: 'flex',
                gap: '12px',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setEditingProduct(null);
                  }}
                  style={{
                    padding: '10px 18px',
                    borderRadius: '8px',
                    border: '1.5px solid #cbd5e1',
                    background: '#ffffff',
                    color: '#64748b',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn-primary"
                  style={{ padding: '10px 22px', fontSize: '0.88rem' }}
                >
                  <Check size={16} /> Save Product Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: LIVE STOREFRONT PREVIEW */}
      {previewProduct && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2200,
          padding: '20px'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            maxWidth: '680px',
            width: '100%',
            overflow: 'hidden',
            boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{
              background: '#0f172a',
              color: '#ffffff',
              padding: '16px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Eye size={16} color="#2dd4bf" />
                <span style={{ fontSize: '0.85rem', fontWeight: 800 }}>Storefront Customer Experience Preview</span>
              </div>
              <button
                onClick={() => setPreviewProduct(null)}
                style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ padding: '28px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div>
                <img
                  src={previewProduct.images?.[0] || 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80'}
                  alt={previewProduct.name}
                  style={{ width: '100%', height: '260px', objectFit: 'cover', borderRadius: '14px', border: '1px solid #e2e8f0' }}
                />
                <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                  {previewProduct.images?.slice(1, 4).map((m, i) => (
                    <img key={i} src={m} alt="" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #e2e8f0' }} />
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#0f766e', background: '#f0fdfa', padding: '2px 8px', borderRadius: '4px', width: 'fit-content' }}>
                  {previewProduct.category} • {previewProduct.assignedOpId.toUpperCase()}
                </span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0f172a', margin: 0, lineHeight: 1.3 }}>
                  {previewProduct.name}
                </h3>
                <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                  SKU: <strong>{previewProduct.sku}</strong>
                </div>

                <div style={{ margin: '6px 0' }}>
                  <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0f766e' }}>
                    {formatNGN(previewProduct.discountPrice || previewProduct.basePrice)}
                  </div>
                  {previewProduct.discountPrice && (
                    <div style={{ textDecoration: 'line-through', color: '#94a3b8', fontSize: '0.82rem' }}>
                      {formatNGN(previewProduct.basePrice)}
                    </div>
                  )}
                </div>

                <p style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                  {previewProduct.description || 'Durable polymer manufacturing certified by IYANU Polymer Nigeria.'}
                </p>

                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: previewProduct.stockQuantity > 0 ? '#16a34a' : '#e11d48', marginTop: '6px' }}>
                  {previewProduct.stockQuantity > 0 ? `✓ In Stock (${previewProduct.stockQuantity} units available)` : '✗ Out of Stock'}
                </div>

                <button
                  type="button"
                  style={{
                    marginTop: '10px',
                    padding: '10px',
                    borderRadius: '8px',
                    background: '#0f766e',
                    color: '#ffffff',
                    border: 'none',
                    fontWeight: 800,
                    fontSize: '0.85rem',
                    cursor: 'default',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <ShoppingBag size={16} /> Add to Cart (Customer View)
                </button>
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '12px 24px', borderTop: '1px solid #e2e8f0', textAlign: 'right' }}>
              <button
                onClick={() => setPreviewProduct(null)}
                style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#ffffff', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 700 }}
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: SAFE DELETE CONFIRMATION */}
      {deleteConfirmProduct && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(5px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2300,
          padding: '20px'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '20px',
            maxWidth: '460px',
            width: '100%',
            padding: '28px',
            boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#fff1f2', color: '#e11d48', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
              <AlertTriangle size={24} />
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f172a', textAlign: 'center', margin: '0 0 8px 0' }}>
              Delete "{deleteConfirmProduct.name}"?
            </h3>

            <p style={{ fontSize: '0.85rem', color: '#64748b', textAlign: 'center', lineHeight: 1.5, margin: '0 0 20px 0' }}>
              Are you sure you want to permanently delete this product? If you simply want to hide it from customer orders, you can <strong>Archive</strong> it instead.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button
                onClick={() => {
                  deleteProduct(deleteConfirmProduct.id);
                  setDeleteConfirmProduct(null);
                }}
                style={{
                  padding: '10px 16px',
                  borderRadius: '8px',
                  background: '#e11d48',
                  color: '#ffffff',
                  border: 'none',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                Yes, Permanently Delete Product
              </button>

              <button
                onClick={() => {
                  archiveProduct(deleteConfirmProduct.id);
                  setDeleteConfirmProduct(null);
                }}
                style={{
                  padding: '10px 16px',
                  borderRadius: '8px',
                  background: '#faf5ff',
                  color: '#9333ea',
                  border: '1px solid #e9d5ff',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                Archive Instead (Safe & Reversible)
              </button>

              <button
                onClick={() => setDeleteConfirmProduct(null)}
                style={{
                  padding: '10px 16px',
                  borderRadius: '8px',
                  background: '#f8fafc',
                  color: '#475569',
                  border: '1px solid #cbd5e1',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  marginTop: '4px'
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
