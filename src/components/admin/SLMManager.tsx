import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  PackageCheck,
  AlertTriangle,
  ArrowRightLeft,
  Truck,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
  Boxes,
  Layers,
  Settings2,
  Building2,
  UserCheck,
  Phone,
  MapPin,
  ChevronRight,
  ClipboardList,
  Sparkles,
  ShoppingBag,
  ArrowUpRight,
  ShieldCheck,
  Send,
  Warehouse
} from 'lucide-react';
import { RequisitionStatus, RequisitionUrgency, GoodsRequisition } from '../../types';

export const SLMManager: React.FC = () => {
  const {
    slmUnits,
    requisitions,
    products,
    categories,
    lowStockAlerts,
    orders,
    userRole,
    formatNGN,
    createRequisition,
    updateRequisitionStatus,
    reassignCategoryToOp,
    updateOpDetails,
    updateItemPrepStatus,
    generateRequisitionFromLowStock,
    dismissLowStockAlert,
    transferStockToOp
  } = useApp();

  // Active tab inside SLM view
  const [activeTab, setActiveTab] = useState<'requisitions' | 'order-prep' | 'stock-matrix' | 'low-stock' | 'op-config'>('requisitions');
  
  // Selected OP filter (All, OP-1, OP-2, OP-3, OP-4, Warehouse)
  const [selectedOp, setSelectedOp] = useState<string>('all');
  
  // Search and filter inside tables
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Modals state
  const [isNewReqOpen, setIsNewReqOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [selectedReqForReview, setSelectedReqForReview] = useState<GoodsRequisition | null>(null);

  // New Requisition Form State
  const [reqOpId, setReqOpId] = useState<string>('op-1');
  const [reqRequester, setReqRequester] = useState<string>('Engr. Babatunde (Floor Lead)');
  const [reqUrgency, setReqUrgency] = useState<RequisitionUrgency>('routine');
  const [reqProductId, setReqProductId] = useState<string>(products[0]?.id || '');
  const [reqQty, setReqQty] = useState<number>(20);
  const [reqNotes, setReqNotes] = useState<string>('');

  // Stock Transfer Form State
  const [transferProdId, setTransferProdId] = useState<string>(products[0]?.id || '');
  const [transferTargetOp, setTransferTargetOp] = useState<string>('op-1');
  const [transferQty, setTransferQty] = useState<number>(10);

  // Filtered Requisitions
  const filteredRequisitions = requisitions.filter(req => {
    const matchesOp = selectedOp === 'all' || req.opId === selectedOp;
    const matchesStatus = statusFilter === 'all' || req.status === statusFilter;
    const matchesSearch =
      req.requisitionNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.opName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.items.some(i => i.productName.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesOp && matchesStatus && matchesSearch;
  });

  // Filtered Low Stock Alerts
  const filteredAlerts = lowStockAlerts.filter(a => {
    return selectedOp === 'all' || a.opId === selectedOp;
  });

  // Filtered Orders Requiring OP Preparation
  const pendingPrepOrderItems: {
    orderId: string;
    orderNumber: string;
    customerName: string;
    customerState: string;
    productId: string;
    productName: string;
    variantName?: string;
    quantity: number;
    image: string;
    assignedOpId: string;
    assignedOpName: string;
    prepStatus: 'pending_pick' | 'picked_and_packed' | 'ready_for_dispatch';
    createdAt: string;
  }[] = [];

  orders.forEach(ord => {
    ord.items.forEach(it => {
      if (selectedOp === 'all' || it.assignedOpId === selectedOp) {
        pendingPrepOrderItems.push({
          orderId: ord.id,
          orderNumber: ord.orderNumber,
          customerName: ord.customerName,
          customerState: ord.deliveryAddress.state,
          productId: it.productId,
          productName: it.productName,
          variantName: it.variantName,
          quantity: it.quantity,
          image: it.image,
          assignedOpId: it.assignedOpId,
          assignedOpName: it.assignedOpName,
          prepStatus: it.prepStatus,
          createdAt: ord.createdAt
        });
      }
    });
  });

  // Statistics
  const pendingReqCount = requisitions.filter(r => r.status === 'pending').length;
  const inPrepReqCount = requisitions.filter(r => r.status === 'in_preparation' || r.status === 'dispatched_to_op').length;
  const completedReqCount = requisitions.filter(r => r.status === 'received_completed').length;
  const activeAlertCount = lowStockAlerts.filter(a => a.status === 'active').length;
  const pendingPickOrderCount = pendingPrepOrderItems.filter(i => i.prepStatus === 'pending_pick').length;

  const currentActiveUnit = slmUnits.find(u => u.id === selectedOp);

  const handleCreateRequisitionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reqProductId || reqQty <= 0) return;

    createRequisition({
      opId: reqOpId,
      requesterName: reqRequester,
      urgency: reqUrgency,
      items: [{ productId: reqProductId, requestedQty: Number(reqQty) }],
      notes: reqNotes
    });

    setIsNewReqOpen(false);
    setReqNotes('');
  };

  const handleDirectTransferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transferProdId || transferQty <= 0) return;
    transferStockToOp(transferProdId, transferTargetOp, Number(transferQty));
    setIsTransferModalOpen(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Top Banner & Title Bar */}
      <div style={{
        background: 'linear-gradient(135deg, #042f2e 0%, #0f766e 60%, #115e59 100%)',
        borderRadius: '16px',
        padding: '28px 32px',
        color: '#ffffff',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 10px 25px rgba(15, 118, 110, 0.2)',
        gap: '20px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <span style={{
              background: 'rgba(255,255,255,0.2)',
              color: '#5eead4',
              fontSize: '0.75rem',
              fontWeight: 900,
              padding: '4px 10px',
              borderRadius: '20px',
              letterSpacing: '0.05em',
              textTransform: 'uppercase'
            }}>
              Internal Operations Control
            </span>
            <span style={{ color: '#99f6e4', fontSize: '0.85rem', fontWeight: 600 }}>
              Warehouse ⟷ OP 1-4 Flow
            </span>
          </div>
          <h1 style={{ fontSize: '1.9rem', fontWeight: 900, margin: '0 0 6px 0', letterSpacing: '-0.02em' }}>
            SLM & Internal Goods Requisition Hub
          </h1>
          <p style={{ margin: 0, color: '#ccfbf1', fontSize: '0.9rem', maxWidth: '650px', lineHeight: 1.5 }}>
            Automated internal stock requisition, OP floor inventory management, Central Warehouse replenishment, and online order picking pipeline.
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setIsTransferModalOpen(true)}
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: '#ffffff',
              borderRadius: '10px',
              padding: '10px 18px',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s'
            }}
          >
            <ArrowRightLeft size={16} /> Direct Warehouse Transfer
          </button>

          <button
            onClick={() => setIsNewReqOpen(true)}
            style={{
              background: '#2dd4bf',
              color: '#042f2e',
              border: 'none',
              borderRadius: '10px',
              padding: '10px 20px',
              fontSize: '0.85rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 14px rgba(45, 212, 191, 0.4)',
              transition: 'all 0.2s'
            }}
          >
            <Plus size={18} /> New Goods Requisition
          </button>
        </div>
      </div>

      {/* OP Unit Filter Bar */}
      <div style={{
        background: '#ffffff',
        borderRadius: '14px',
        padding: '16px 20px',
        border: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 800, color: '#334155' }}>
            <Building2 size={18} color="#0f766e" /> Operations Unit (OP) Focus:
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setSelectedOp('all')}
              style={{
                padding: '7px 14px',
                borderRadius: '8px',
                border: '1px solid',
                borderColor: selectedOp === 'all' ? '#0f766e' : '#e2e8f0',
                background: selectedOp === 'all' ? '#f0fdfa' : '#ffffff',
                color: selectedOp === 'all' ? '#0f766e' : '#64748b',
                fontWeight: 700,
                fontSize: '0.8rem',
                cursor: 'pointer'
              }}
            >
              All SLM Points ({slmUnits.length})
            </button>

            {slmUnits.map(unit => {
              const isSelected = selectedOp === unit.id;
              return (
                <button
                  key={unit.id}
                  onClick={() => setSelectedOp(unit.id)}
                  style={{
                    padding: '7px 14px',
                    borderRadius: '8px',
                    border: '1px solid',
                    borderColor: isSelected ? '#0f766e' : '#e2e8f0',
                    background: isSelected ? '#0f766e' : '#ffffff',
                    color: isSelected ? '#ffffff' : '#334155',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <span style={{
                    fontSize: '0.7rem',
                    background: isSelected ? 'rgba(255,255,255,0.25)' : '#f1f5f9',
                    padding: '1px 5px',
                    borderRadius: '4px',
                    fontWeight: 900
                  }}>
                    {unit.code}
                  </span>
                  {unit.name.split('-')[1]?.trim() || unit.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected OP details card */}
        {currentActiveUnit && (
          <div style={{
            background: '#f8fafc',
            border: '1px dashed #cbd5e1',
            borderRadius: '10px',
            padding: '12px 16px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.8rem',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <UserCheck size={15} color="#0f766e" />
                <span><strong>Lead Officer:</strong> {currentActiveUnit.leadOfficer}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={15} color="#0f766e" />
                <span><strong>Depot Bay:</strong> {currentActiveUnit.hubLocation}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Phone size={15} color="#0f766e" />
                <span><strong>Intercom / Line:</strong> {currentActiveUnit.contactPhone}</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#64748b' }}>Assigned Product Lines:</span>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {currentActiveUnit.assignedCategories.map(cat => (
                  <span key={cat} style={{
                    background: '#e0f2fe',
                    color: '#0369a1',
                    padding: '2px 8px',
                    borderRadius: '6px',
                    fontSize: '0.72rem',
                    fontWeight: 700
                  }}>
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Top 5 KPI Metrics */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
        gap: '16px'
      }}>
        {/* Metric 1: Pending Requisitions */}
        <div style={{
          background: '#ffffff',
          borderRadius: '14px',
          padding: '20px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Pending Approvals</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Clock size={16} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0f172a' }}>
            {pendingReqCount}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#b45309', fontWeight: 600 }}>
            Awaiting Warehouse stock approval
          </span>
        </div>

        {/* Metric 2: Stock in Prep / Dispatch */}
        <div style={{
          background: '#ffffff',
          borderRadius: '14px',
          padding: '20px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>In Transit to OP</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#e0e7ff', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Truck size={16} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0f172a' }}>
            {inPrepReqCount}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#4338ca', fontWeight: 600 }}>
            Being prepared / moving to OP floor
          </span>
        </div>

        {/* Metric 3: Online Order Lines to Pick */}
        <div style={{
          background: '#ffffff',
          borderRadius: '14px',
          padding: '20px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Orders Pending Pick</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#ccfbf1', color: '#0f766e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShoppingBag size={16} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0f172a' }}>
            {pendingPickOrderCount}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#0f766e', fontWeight: 600 }}>
            Online orders awaiting OP packing
          </span>
        </div>

        {/* Metric 4: Low Stock Alarms */}
        <div style={{
          background: '#ffffff',
          borderRadius: '14px',
          padding: '20px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Low Stock Alarms</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#fee2e2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AlertTriangle size={16} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: activeAlertCount > 0 ? '#dc2626' : '#0f172a' }}>
            {activeAlertCount}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#dc2626', fontWeight: 600 }}>
            {activeAlertCount > 0 ? 'Requires immediate requisition' : 'All OP stock levels safe'}
          </span>
        </div>

        {/* Metric 5: Completed Transfers */}
        <div style={{
          background: '#ffffff',
          borderRadius: '14px',
          padding: '20px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Completed Requisitions</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle2 size={16} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0f172a' }}>
            {completedReqCount}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 600 }}>
            Credited to OP floor stock
          </span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{ display: 'flex', gap: '10px', borderBottom: '2px solid #e2e8f0', paddingBottom: '2px', overflowX: 'auto' }}>
        {[
          { id: 'requisitions', label: 'Internal Goods Request Sheet', icon: <ClipboardList size={16} />, count: filteredRequisitions.length },
          { id: 'order-prep', label: 'Online Orders Picking Queue', icon: <ShoppingBag size={16} />, count: pendingPickOrderCount, highlight: pendingPickOrderCount > 0 },
          { id: 'stock-matrix', label: 'Central & OP Floor Stock Matrix', icon: <Boxes size={16} /> },
          { id: 'low-stock', label: 'Low Stock Alarms', icon: <AlertTriangle size={16} />, count: activeAlertCount, highlight: activeAlertCount > 0 },
          { id: 'op-config', label: 'Category & OP Structure Manager', icon: <Settings2 size={16} /> }
        ].map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 18px',
                background: 'none',
                border: 'none',
                borderBottom: isActive ? '3px solid #0f766e' : '3px solid transparent',
                color: isActive ? '#0f766e' : '#64748b',
                fontWeight: isActive ? 800 : 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                marginBottom: '-2px',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease'
              }}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span style={{
                  background: tab.highlight ? '#fee2e2' : (isActive ? '#0f766e' : '#f1f5f9'),
                  color: tab.highlight ? '#dc2626' : (isActive ? '#ffffff' : '#64748b'),
                  fontSize: '0.7rem',
                  fontWeight: 900,
                  padding: '2px 7px',
                  borderRadius: '999px'
                }}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ========================================================= */}
      {/* TAB 1: INTERNAL GOODS REQUISITION SHEET                   */}
      {/* ========================================================= */}
      {activeTab === 'requisitions' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Search & Filter Bar */}
          <div style={{
            background: '#ffffff',
            borderRadius: '12px',
            padding: '14px 18px',
            border: '1px solid #e2e8f0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div style={{ position: 'relative', minWidth: '280px', flex: 1, maxWidth: '450px' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input
                type="text"
                placeholder="Search requisition #, product, or OP unit..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px 9px 36px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.85rem'
                }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Filter Status:</span>
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                style={{
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: '#334155',
                  background: '#ffffff'
                }}
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending Approval</option>
                <option value="approved">Approved</option>
                <option value="in_preparation">In Preparation</option>
                <option value="dispatched_to_op">Dispatched to OP</option>
                <option value="received_completed">Received & Completed</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          {/* Requisition Table */}
          <div style={{
            background: '#ffffff',
            borderRadius: '14px',
            border: '1px solid #e2e8f0',
            overflow: 'hidden',
            boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', fontWeight: 800 }}>
                  <th style={{ padding: '14px 18px' }}>Requisition #</th>
                  <th style={{ padding: '14px 18px' }}>Target OP & Requester</th>
                  <th style={{ padding: '14px 18px' }}>Requested Items</th>
                  <th style={{ padding: '14px 18px' }}>Qty Req / WH Avail</th>
                  <th style={{ padding: '14px 18px' }}>Urgency</th>
                  <th style={{ padding: '14px 18px' }}>Current Status</th>
                  <th style={{ padding: '14px 18px', textAlign: 'right' }}>Workflow Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequisitions.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ padding: '48px', textAlign: 'center', color: '#94a3b8' }}>
                      <ClipboardList size={36} style={{ margin: '0 auto 12px auto', opacity: 0.4 }} />
                      <p style={{ margin: 0, fontWeight: 600 }}>No goods requisitions found matching current filters.</p>
                    </td>
                  </tr>
                ) : (
                  filteredRequisitions.map(req => {
                    const statusConfig = {
                      pending: { bg: '#fef3c7', color: '#92400e', label: 'Pending Approval' },
                      approved: { bg: '#e0f2fe', color: '#0369a1', label: 'Approved by WH' },
                      in_preparation: { bg: '#e0e7ff', color: '#3730a3', label: 'In Preparation' },
                      dispatched_to_op: { bg: '#fef08a', color: '#854d0e', label: 'Dispatched to OP' },
                      received_completed: { bg: '#dcfce7', color: '#15803d', label: 'Received & Stock Credited' },
                      rejected: { bg: '#fee2e2', color: '#991b1b', label: 'Rejected' }
                    }[req.status];

                    const urgencyConfig = {
                      routine: { bg: '#f1f5f9', color: '#475569', label: 'Routine' },
                      urgent: { bg: '#fef3c7', color: '#b45309', label: 'Urgent' },
                      critical_low_stock: { bg: '#fee2e2', color: '#b91c1c', label: 'Critical Low Stock' },
                      customer_order_fulfillment: { bg: '#ccfbf1', color: '#0f766e', label: 'Order Fulfillment' }
                    }[req.urgency];

                    return (
                      <tr key={req.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        {/* Requisition Number & Date */}
                        <td style={{ padding: '14px 18px', verticalAlign: 'middle' }}>
                          <div style={{ fontWeight: 800, color: '#0f172a' }}>{req.requisitionNumber}</div>
                          <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                            {new Date(req.createdAt).toLocaleDateString('en-NG', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </td>

                        {/* OP Unit & Officer */}
                        <td style={{ padding: '14px 18px', verticalAlign: 'middle' }}>
                          <div style={{ fontWeight: 700, color: '#334155' }}>{req.opName}</div>
                          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>By: {req.requesterName}</div>
                        </td>

                        {/* Items */}
                        <td style={{ padding: '14px 18px', verticalAlign: 'middle' }}>
                          {req.items.map((item, idx) => (
                            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: idx > 0 ? '4px' : 0 }}>
                              {item.image && (
                                <img src={item.image} alt={item.productName} style={{ width: '28px', height: '28px', borderRadius: '4px', objectFit: 'cover' }} />
                              )}
                              <div>
                                <span style={{ fontWeight: 600, color: '#1e293b' }}>{item.productName}</span>
                                <span style={{ fontSize: '0.72rem', color: '#94a3b8', display: 'block' }}>SKU: {item.sku}</span>
                              </div>
                            </div>
                          ))}
                        </td>

                        {/* Quantity breakdown */}
                        <td style={{ padding: '14px 18px', verticalAlign: 'middle' }}>
                          {req.items.map((item, idx) => (
                            <div key={idx}>
                              <strong style={{ color: '#0f766e', fontSize: '0.95rem' }}>{item.requestedQty} units</strong>
                              <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block' }}>
                                (WH Avail: {item.availableWarehouseStock})
                              </span>
                            </div>
                          ))}
                        </td>

                        {/* Urgency */}
                        <td style={{ padding: '14px 18px', verticalAlign: 'middle' }}>
                          <span style={{
                            background: urgencyConfig.bg,
                            color: urgencyConfig.color,
                            fontSize: '0.72rem',
                            fontWeight: 800,
                            padding: '3px 8px',
                            borderRadius: '6px'
                          }}>
                            {urgencyConfig.label}
                          </span>
                        </td>

                        {/* Current Status */}
                        <td style={{ padding: '14px 18px', verticalAlign: 'middle' }}>
                          <span style={{
                            background: statusConfig.bg,
                            color: statusConfig.color,
                            fontSize: '0.75rem',
                            fontWeight: 800,
                            padding: '4px 10px',
                            borderRadius: '20px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}>
                            {req.status === 'received_completed' && <CheckCircle2 size={12} />}
                            {req.status === 'pending' && <Clock size={12} />}
                            {statusConfig.label}
                          </span>
                        </td>

                        {/* Action buttons based on workflow step */}
                        <td style={{ padding: '14px 18px', verticalAlign: 'middle', textAlign: 'right' }}>
                          <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                            {req.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => updateRequisitionStatus(req.id, 'approved')}
                                  style={{
                                    background: '#0f766e',
                                    color: '#ffffff',
                                    border: 'none',
                                    borderRadius: '6px',
                                    padding: '6px 10px',
                                    fontSize: '0.75rem',
                                    fontWeight: 700,
                                    cursor: 'pointer'
                                  }}
                                >
                                  Approve Stock
                                </button>
                                <button
                                  onClick={() => updateRequisitionStatus(req.id, 'rejected', { rejectionReason: 'Insufficient central stock' })}
                                  style={{
                                    background: '#fee2e2',
                                    color: '#b91c1c',
                                    border: 'none',
                                    borderRadius: '6px',
                                    padding: '6px 10px',
                                    fontSize: '0.75rem',
                                    fontWeight: 700,
                                    cursor: 'pointer'
                                  }}
                                >
                                  Reject
                                </button>
                              </>
                            )}

                            {req.status === 'approved' && (
                              <button
                                onClick={() => updateRequisitionStatus(req.id, 'in_preparation')}
                                style={{
                                  background: '#4f46e5',
                                  color: '#ffffff',
                                  border: 'none',
                                  borderRadius: '6px',
                                  padding: '6px 12px',
                                  fontSize: '0.75rem',
                                  fontWeight: 700,
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '4px'
                                }}
                              >
                                <Boxes size={13} /> Mark In Prep
                              </button>
                            )}

                            {req.status === 'in_preparation' && (
                              <button
                                onClick={() => updateRequisitionStatus(req.id, 'dispatched_to_op')}
                                style={{
                                  background: '#0f766e',
                                  color: '#ffffff',
                                  border: 'none',
                                  borderRadius: '6px',
                                  padding: '6px 12px',
                                  fontSize: '0.75rem',
                                  fontWeight: 700,
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '4px'
                                }}
                              >
                                <Truck size={13} /> Dispatch to OP
                              </button>
                            )}

                            {req.status === 'dispatched_to_op' && (
                              <button
                                onClick={() => updateRequisitionStatus(req.id, 'received_completed')}
                                style={{
                                  background: '#16a34a',
                                  color: '#ffffff',
                                  border: 'none',
                                  borderRadius: '6px',
                                  padding: '6px 12px',
                                  fontSize: '0.75rem',
                                  fontWeight: 800,
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                  boxShadow: '0 2px 8px rgba(22, 163, 74, 0.3)'
                                }}
                              >
                                <CheckCircle2 size={13} /> Confirm Receipt
                              </button>
                            )}

                            {req.status === 'received_completed' && (
                              <span style={{ fontSize: '0.72rem', color: '#16a34a', fontWeight: 700 }}>
                                ✓ Floor Stock Updated
                              </span>
                            )}
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
      )}

      {/* ========================================================= */}
      {/* TAB 2: ONLINE ORDERS PICKING & OP PREPARATION QUEUE       */}
      {/* ========================================================= */}
      {activeTab === 'order-prep' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '12px',
            padding: '16px 20px',
            border: '1px solid #e2e8f0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div>
              <h3 style={{ margin: '0 0 4px 0', fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>
                Online Customer Orders Requiring OP Fulfillment
              </h3>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>
                Each line item is routed to its designated OP point for picking, packing, and dispatch readiness.
              </p>
            </div>

            <div style={{ fontSize: '0.8rem', color: '#0f766e', fontWeight: 700, background: '#f0fdfa', padding: '6px 12px', borderRadius: '8px', border: '1px solid #ccfbf1' }}>
              Pending Pick Items: {pendingPrepOrderItems.filter(i => i.prepStatus === 'pending_pick').length}
            </div>
          </div>

          <div style={{
            background: '#ffffff',
            borderRadius: '14px',
            border: '1px solid #e2e8f0',
            overflow: 'hidden'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', fontWeight: 800 }}>
                  <th style={{ padding: '14px 18px' }}>Order # & Customer</th>
                  <th style={{ padding: '14px 18px' }}>Target Delivery State</th>
                  <th style={{ padding: '14px 18px' }}>Ordered Product</th>
                  <th style={{ padding: '14px 18px' }}>Responsible OP Unit</th>
                  <th style={{ padding: '14px 18px' }}>Pick Status</th>
                  <th style={{ padding: '14px 18px', textAlign: 'right' }}>Fulfillment Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingPrepOrderItems.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ padding: '48px', textAlign: 'center', color: '#94a3b8' }}>
                      <CheckCircle2 size={36} style={{ margin: '0 auto 12px auto', color: '#16a34a' }} />
                      <p style={{ margin: 0, fontWeight: 700, color: '#1e293b' }}>All online orders are packed and prepared!</p>
                    </td>
                  </tr>
                ) : (
                  pendingPrepOrderItems.map((item, idx) => {
                    const prod = products.find(p => p.id === item.productId);
                    const opFloorStock = prod?.opStock ? prod.opStock[item.assignedOpId] || 0 : 0;
                    const isStockSufficient = opFloorStock >= item.quantity;

                    return (
                      <tr key={`${item.orderId}-${item.productId}-${idx}`} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '14px 18px' }}>
                          <div style={{ fontWeight: 800, color: '#0f172a' }}>{item.orderNumber}</div>
                          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{item.customerName}</div>
                        </td>

                        <td style={{ padding: '14px 18px' }}>
                          <span style={{ background: '#f1f5f9', color: '#334155', padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
                            {item.customerState}
                          </span>
                        </td>

                        <td style={{ padding: '14px 18px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {item.image && (
                              <img src={item.image} alt={item.productName} style={{ width: '32px', height: '32px', borderRadius: '6px', objectFit: 'cover' }} />
                            )}
                            <div>
                              <div style={{ fontWeight: 700, color: '#1e293b' }}>{item.quantity}x {item.productName}</div>
                              {item.variantName && <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{item.variantName}</div>}
                            </div>
                          </div>
                        </td>

                        <td style={{ padding: '14px 18px' }}>
                          <span style={{ fontWeight: 700, color: '#0f766e' }}>{item.assignedOpName}</span>
                          <div style={{ fontSize: '0.75rem', color: isStockSufficient ? '#16a34a' : '#dc2626', fontWeight: 600 }}>
                            Floor Stock: {opFloorStock} units ({isStockSufficient ? 'Sufficient' : 'Low Stock!'})
                          </div>
                        </td>

                        <td style={{ padding: '14px 18px' }}>
                          <span style={{
                            background: item.prepStatus === 'picked_and_packed' ? '#dcfce7' : (item.prepStatus === 'ready_for_dispatch' ? '#e0f2fe' : '#fef3c7'),
                            color: item.prepStatus === 'picked_and_packed' ? '#15803d' : (item.prepStatus === 'ready_for_dispatch' ? '#0369a1' : '#b45309'),
                            fontSize: '0.75rem',
                            fontWeight: 800,
                            padding: '3px 8px',
                            borderRadius: '12px'
                          }}>
                            {item.prepStatus === 'picked_and_packed' ? 'Picked & Packed' : (item.prepStatus === 'ready_for_dispatch' ? 'Ready for Dispatch' : 'Pending Pick')}
                          </span>
                        </td>

                        <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                          <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                            {item.prepStatus === 'pending_pick' ? (
                              <>
                                <button
                                  onClick={() => updateItemPrepStatus(item.orderId, item.productId, 'picked_and_packed')}
                                  style={{
                                    background: '#0f766e',
                                    color: '#ffffff',
                                    border: 'none',
                                    borderRadius: '6px',
                                    padding: '6px 12px',
                                    fontSize: '0.75rem',
                                    fontWeight: 700,
                                    cursor: 'pointer'
                                  }}
                                >
                                  ✓ Pick & Pack
                                </button>
                                {!isStockSufficient && (
                                  <button
                                    onClick={() => {
                                      createRequisition({
                                        opId: item.assignedOpId,
                                        requesterName: `${item.assignedOpName} Lead`,
                                        urgency: 'customer_order_fulfillment',
                                        items: [{ productId: item.productId, requestedQty: item.quantity * 2 }],
                                        notes: `Auto-requisition to fulfill online order ${item.orderNumber}`,
                                        linkedOrderId: item.orderId
                                      });
                                    }}
                                    style={{
                                      background: '#fee2e2',
                                      color: '#b91c1c',
                                      border: 'none',
                                      borderRadius: '6px',
                                      padding: '6px 10px',
                                      fontSize: '0.75rem',
                                      fontWeight: 700,
                                      cursor: 'pointer'
                                    }}
                                  >
                                    Request from WH
                                  </button>
                                )}
                              </>
                            ) : (
                              <span style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 700 }}>
                                Ready for Truck Dispatch
                              </span>
                            )}
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
      )}

      {/* ========================================================= */}
      {/* TAB 3: CENTRAL & OP FLOOR STOCK MATRIX                    */}
      {/* ========================================================= */}
      {activeTab === 'stock-matrix' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '12px',
            padding: '16px 20px',
            border: '1px solid #e2e8f0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div>
              <h3 style={{ margin: '0 0 4px 0', fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>
                Multi-Point Inventory Allocation Matrix
              </h3>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>
                Live visibility across Central Main Warehouse, OP 1, OP 2, OP 3, and OP 4 local floor holdings.
              </p>
            </div>

            <button
              onClick={() => setIsTransferModalOpen(true)}
              style={{
                background: '#0f766e',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 16px',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <ArrowRightLeft size={15} /> Transfer Stock
            </button>
          </div>

          <div style={{
            background: '#ffffff',
            borderRadius: '14px',
            border: '1px solid #e2e8f0',
            overflow: 'hidden'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', fontWeight: 800 }}>
                  <th style={{ padding: '14px 18px' }}>Product & SKU</th>
                  <th style={{ padding: '14px 18px' }}>Assigned Primary OP</th>
                  <th style={{ padding: '14px 18px', background: '#f0fdfa', color: '#0f766e' }}>Central WH Stock</th>
                  <th style={{ padding: '14px 18px' }}>OP 1 Stock</th>
                  <th style={{ padding: '14px 18px' }}>OP 2 Stock</th>
                  <th style={{ padding: '14px 18px' }}>OP 3 Stock</th>
                  <th style={{ padding: '14px 18px' }}>OP 4 Stock</th>
                  <th style={{ padding: '14px 18px', textAlign: 'right' }}>Total Available</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => {
                  const op1Stock = product.opStock ? product.opStock['op-1'] || 0 : 0;
                  const op2Stock = product.opStock ? product.opStock['op-2'] || 0 : 0;
                  const op3Stock = product.opStock ? product.opStock['op-3'] || 0 : 0;
                  const op4Stock = product.opStock ? product.opStock['op-4'] || 0 : 0;
                  const primaryOp = slmUnits.find(u => u.id === product.assignedOpId);

                  return (
                    <tr key={product.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '14px 18px' }}>
                        <div style={{ fontWeight: 700, color: '#1e293b' }}>{product.name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>SKU: {product.sku}</div>
                      </td>

                      <td style={{ padding: '14px 18px' }}>
                        <span style={{
                          background: '#f1f5f9',
                          color: '#0f766e',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          fontWeight: 700
                        }}>
                          {primaryOp ? primaryOp.code : 'OP-1'} ({primaryOp?.name.split('-')[1]?.trim() || 'General'})
                        </span>
                      </td>

                      <td style={{ padding: '14px 18px', background: '#f0fdfa', fontWeight: 800, color: '#0f766e' }}>
                        {product.warehouseStock} units
                      </td>

                      <td style={{ padding: '14px 18px', color: product.assignedOpId === 'op-1' && op1Stock < 25 ? '#dc2626' : '#334155', fontWeight: product.assignedOpId === 'op-1' ? 700 : 400 }}>
                        {op1Stock}
                      </td>

                      <td style={{ padding: '14px 18px', color: product.assignedOpId === 'op-2' && op2Stock < 20 ? '#dc2626' : '#334155', fontWeight: product.assignedOpId === 'op-2' ? 700 : 400 }}>
                        {op2Stock}
                      </td>

                      <td style={{ padding: '14px 18px', color: product.assignedOpId === 'op-3' && op3Stock < 30 ? '#dc2626' : '#334155', fontWeight: product.assignedOpId === 'op-3' ? 700 : 400 }}>
                        {op3Stock}
                      </td>

                      <td style={{ padding: '14px 18px', color: product.assignedOpId === 'op-4' && op4Stock < 35 ? '#dc2626' : '#334155', fontWeight: product.assignedOpId === 'op-4' ? 700 : 400 }}>
                        {op4Stock}
                      </td>

                      <td style={{ padding: '14px 18px', textAlign: 'right', fontWeight: 900, color: '#0f172a' }}>
                        {product.stockQuantity + product.warehouseStock} units
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 4: LOW STOCK ALARMS & AUTO-REQUISITION TRIGGERS       */}
      {/* ========================================================= */}
      {activeTab === 'low-stock' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '12px',
            padding: '16px 20px',
            border: '1px solid #e2e8f0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div>
              <h3 style={{ margin: '0 0 4px 0', fontSize: '1rem', fontWeight: 800, color: '#dc2626' }}>
                Operational Low Stock Warning Desk
              </h3>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>
                Alarms trigger automatically when an OP's floor stock dips below its designated safe buffer. Click to trigger 1-click requisition.
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
            {filteredAlerts.length === 0 ? (
              <div style={{ gridColumn: '1 / -1', background: '#ffffff', padding: '40px', borderRadius: '14px', textAlign: 'center', color: '#16a34a', border: '1px solid #e2e8f0' }}>
                <CheckCircle2 size={40} style={{ margin: '0 auto 12px auto' }} />
                <h4 style={{ margin: '0 0 4px 0', fontSize: '1.1rem' }}>No Active Low Stock Alerts</h4>
                <p style={{ margin: 0, color: '#64748b', fontSize: '0.85rem' }}>All OP floor levels are currently above defined safe thresholds.</p>
              </div>
            ) : (
              filteredAlerts.map(alert => (
                <div
                  key={alert.id}
                  style={{
                    background: '#ffffff',
                    borderRadius: '14px',
                    border: '1px solid #fee2e2',
                    padding: '20px',
                    boxShadow: '0 4px 12px rgba(220, 38, 38, 0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '14px'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{
                        background: '#fee2e2',
                        color: '#b91c1c',
                        padding: '2px 8px',
                        borderRadius: '6px',
                        fontSize: '0.72rem',
                        fontWeight: 800
                      }}>
                        {alert.opName}
                      </span>

                      <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                        {new Date(alert.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    <h4 style={{ fontSize: '0.95rem', fontWeight: 800, margin: '0 0 8px 0', color: '#0f172a' }}>
                      {alert.productName}
                    </h4>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.8rem', background: '#fef2f2', padding: '10px', borderRadius: '8px' }}>
                      <div>
                        <span style={{ color: '#991b1b', display: 'block', fontSize: '0.72rem' }}>Current OP Stock</span>
                        <strong style={{ color: '#dc2626', fontSize: '1.1rem' }}>{alert.currentStock} units</strong>
                      </div>
                      <div>
                        <span style={{ color: '#991b1b', display: 'block', fontSize: '0.72rem' }}>Warehouse Reserve</span>
                        <strong style={{ color: '#0f766e', fontSize: '1.1rem' }}>{alert.warehouseStock} units</strong>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', borderTop: '1px solid #f1f5f9', paddingTop: '12px' }}>
                    <button
                      onClick={() => dismissLowStockAlert(alert.id)}
                      style={{
                        background: '#f1f5f9',
                        color: '#64748b',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '6px 12px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Dismiss
                    </button>

                    {alert.status === 'requisition_created' ? (
                      <span style={{ fontSize: '0.75rem', color: '#0f766e', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        ✓ Requisition Generated
                      </span>
                    ) : (
                      <button
                        onClick={() => generateRequisitionFromLowStock(alert.id, 30)}
                        style={{
                          background: '#0f766e',
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '6px 14px',
                          fontSize: '0.75rem',
                          fontWeight: 800,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <Plus size={14} /> Request 30 Units
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 5: DYNAMIC CATEGORY & OP STRUCTURE CONFIGURATION       */}
      {/* ========================================================= */}
      {activeTab === 'op-config' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '12px',
            padding: '16px 20px',
            border: '1px solid #e2e8f0'
          }}>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>
              Dynamic Operations Point & Product Category Mapping
            </h3>
            <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>
              Reassign categories between OP 1, OP 2, OP 3, and OP 4 dynamically without code rebuilds. Product routing updates instantly across orders and requisitions.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {slmUnits.map(unit => (
              <div
                key={unit.id}
                style={{
                  background: '#ffffff',
                  borderRadius: '14px',
                  border: '1px solid #e2e8f0',
                  padding: '20px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      background: '#0f766e',
                      color: '#ffffff',
                      fontSize: '0.75rem',
                      fontWeight: 900,
                      padding: '3px 8px',
                      borderRadius: '6px'
                    }}>
                      {unit.code}
                    </span>
                    <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>
                      {unit.name}
                    </h4>
                  </div>
                </div>

                <div style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: 1.4 }}>
                  {unit.description}
                </div>

                <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', fontSize: '0.78rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div><strong>Lead Officer:</strong> {unit.leadOfficer}</div>
                  <div><strong>Depot Zone:</strong> {unit.hubLocation}</div>
                  <div><strong>Safe Threshold:</strong> {unit.minStockAlertThreshold} units</div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '8px' }}>
                    Categories Assigned to {unit.code}:
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {categories.map(cat => {
                      const isAssigned = (cat.assignedOpId === unit.id) || unit.assignedCategories.includes(cat.name);
                      return (
                        <div
                          key={cat.id}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '8px 12px',
                            borderRadius: '8px',
                            background: isAssigned ? '#f0fdfa' : '#ffffff',
                            border: '1px solid',
                            borderColor: isAssigned ? '#99f6e4' : '#e2e8f0',
                            fontSize: '0.8rem'
                          }}
                        >
                          <span style={{ fontWeight: isAssigned ? 700 : 500, color: isAssigned ? '#0f766e' : '#64748b' }}>
                            {cat.name}
                          </span>

                          <select
                            value={cat.assignedOpId || 'op-1'}
                            onChange={e => reassignCategoryToOp(cat.id, e.target.value)}
                            style={{
                              fontSize: '0.72rem',
                              padding: '3px 6px',
                              borderRadius: '4px',
                              border: '1px solid #cbd5e1',
                              fontWeight: 600,
                              background: '#ffffff'
                            }}
                          >
                            <option value="op-1">OP-1 (Storage)</option>
                            <option value="op-2">OP-2 (Sanitation)</option>
                            <option value="op-3">OP-3 (Furniture)</option>
                            <option value="op-4">OP-4 (Household)</option>
                          </select>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 1: CREATE NEW GOODS REQUISITION                     */}
      {/* ========================================================= */}
      {isNewReqOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.65)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '560px',
            padding: '28px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ margin: '0 0 4px 0', fontSize: '1.2rem', fontWeight: 900, color: '#0f172a' }}>
                  New Internal Goods Requisition
                </h3>
                <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>
                  Request stock replenishment from Central Store/Warehouse to OP floor.
                </p>
              </div>
              <button
                onClick={() => setIsNewReqOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
              >
                <XCircle size={22} />
              </button>
            </div>

            <form onSubmit={handleCreateRequisitionSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Target Operations Point (OP):
                </label>
                <select
                  value={reqOpId}
                  onChange={e => {
                    setReqOpId(e.target.value);
                    const unit = slmUnits.find(u => u.id === e.target.value);
                    if (unit) setReqRequester(`${unit.leadOfficer}`);
                  }}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                >
                  {slmUnits.map(unit => (
                    <option key={unit.id} value={unit.id}>
                      {unit.code} - {unit.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Requesting Officer / Staff:
                </label>
                <input
                  type="text"
                  value={reqRequester}
                  onChange={e => setReqRequester(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Select Product to Requisition:
                </label>
                <select
                  value={reqProductId}
                  onChange={e => setReqProductId(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                >
                  {products.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} (Warehouse Reserve: {p.warehouseStock} units)
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Requested Quantity:
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={reqQty}
                    onChange={e => setReqQty(Number(e.target.value))}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Requisition Urgency:
                  </label>
                  <select
                    value={reqUrgency}
                    onChange={e => setReqUrgency(e.target.value as RequisitionUrgency)}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                  >
                    <option value="routine">Routine Stocking</option>
                    <option value="urgent">Urgent Stock Replenishment</option>
                    <option value="critical_low_stock">Critical Low Stock Warning</option>
                    <option value="customer_order_fulfillment">Online Order Fulfillment</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Requisition Notes / Justification:
                </label>
                <textarea
                  rows={3}
                  value={reqNotes}
                  onChange={e => setReqNotes(e.target.value)}
                  placeholder="e.g. Replenishing Bay floor for anticipated weekend volume..."
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsNewReqOpen(false)}
                  style={{
                    background: '#f1f5f9',
                    color: '#64748b',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px 18px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    background: '#0f766e',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px 20px',
                    fontSize: '0.85rem',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  Submit Requisition to Warehouse
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 2: DIRECT WAREHOUSE STOCK TRANSFER                  */}
      {/* ========================================================= */}
      {isTransferModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.65)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '520px',
            padding: '28px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ margin: '0 0 4px 0', fontSize: '1.2rem', fontWeight: 900, color: '#0f172a' }}>
                  Direct Warehouse Stock Transfer
                </h3>
                <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>
                  Instant transfer of physical stock from Central Reserve to an OP floor.
                </p>
              </div>
              <button
                onClick={() => setIsTransferModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
              >
                <XCircle size={22} />
              </button>
            </div>

            <form onSubmit={handleDirectTransferSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Select Product:
                </label>
                <select
                  value={transferProdId}
                  onChange={e => setTransferProdId(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                >
                  {products.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} (Warehouse Reserve: {p.warehouseStock})
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Destination OP:
                  </label>
                  <select
                    value={transferTargetOp}
                    onChange={e => setTransferTargetOp(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                  >
                    {slmUnits.map(unit => (
                      <option key={unit.id} value={unit.id}>
                        {unit.code} - {unit.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Transfer Quantity:
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={transferQty}
                    onChange={e => setTransferQty(Number(e.target.value))}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsTransferModalOpen(false)}
                  style={{
                    background: '#f1f5f9',
                    color: '#64748b',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px 18px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    background: '#0f766e',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px 20px',
                    fontSize: '0.85rem',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  Execute Transfer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
