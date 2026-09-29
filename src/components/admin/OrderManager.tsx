import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Order, OrderStatus } from '../../types';
import {
  Truck,
  CheckCircle2,
  Package,
  MapPin,
  FileText,
  Search,
  Filter,
  ArrowRight,
  Printer
} from 'lucide-react';

export const OrderManager: React.FC = () => {
  const { orders, updateOrderStatus, formatNGN } = useApp();

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(orders[0] || null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [carrierInput, setCarrierInput] = useState('');
  const [trackingInput, setTrackingInput] = useState('');

  const filteredOrders = orders.filter(o => {
    if (filterStatus !== 'all' && o.orderStatus !== filterStatus) return false;
    return true;
  });

  const handleUpdateStatus = (status: OrderStatus) => {
    if (!selectedOrder) return;
    updateOrderStatus(selectedOrder.id, status, trackingInput || selectedOrder.trackingNumber, carrierInput || selectedOrder.carrierName);
    setSelectedOrder({
      ...selectedOrder,
      orderStatus: status,
      carrierName: carrierInput || selectedOrder.carrierName,
      trackingNumber: trackingInput || selectedOrder.trackingNumber
    });
  };

  const handlePrintSlip = () => {
    window.print();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Header */}
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
            Order Fulfillment & Logistics Dispatch
          </h1>
          <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>
            Manage Nigerian haulage dispatches, driver assignments, packing slips, and order milestones
          </p>
        </div>

        {/* Filter */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem', background: '#ffffff' }}
          >
            <option value="all">All Order Statuses</option>
            <option value="pending">Pending Payment</option>
            <option value="confirmed">Confirmed</option>
            <option value="processing">Warehouse Processing</option>
            <option value="shipped">Shipped (In Transit)</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      </div>

      {/* 2-Column Workstation */}
      <div style={{ display: 'grid', gridTemplateColumns: '420px 1fr', gap: '24px' }}>
        {/* Left Column: Order Queue List */}
        <div style={{
          background: '#ffffff',
          borderRadius: '18px',
          border: '1px solid #e2e8f0',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          height: '680px',
          overflowY: 'auto'
        }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', margin: '4px 8px' }}>
            Orders Queue ({filteredOrders.length})
          </h3>

          {filteredOrders.map(order => {
            const isSelected = selectedOrder?.id === order.id;

            return (
              <div
                key={order.id}
                onClick={() => {
                  setSelectedOrder(order);
                  setCarrierInput(order.carrierName || '');
                  setTrackingInput(order.trackingNumber || '');
                }}
                style={{
                  padding: '16px',
                  borderRadius: '12px',
                  border: `1.5px solid ${isSelected ? '#0f766e' : '#e2e8f0'}`,
                  background: isSelected ? '#f0fdfa' : '#ffffff',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 900, color: '#0f766e' }}>
                    {order.orderNumber}
                  </span>
                  <span className={`badge ${
                    order.orderStatus === 'delivered' ? 'badge-emerald' :
                    order.orderStatus === 'shipped' ? 'badge-blue' :
                    order.orderStatus === 'processing' ? 'badge-purple' : 'badge-amber'
                  }`}>
                    {order.orderStatus.toUpperCase()}
                  </span>
                </div>

                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>
                  {order.customerName}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '8px' }}>
                  Destination: {order.deliveryAddress.state} • {order.items.length} items
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', borderTop: '1px solid #f1f5f9', paddingTop: '8px' }}>
                  <strong style={{ color: '#0f172a', fontSize: '0.9rem' }}>
                    {formatNGN(order.totalAmount)}
                  </strong>
                  <span style={{ color: '#94a3b8' }}>
                    {new Date(order.createdAt).toLocaleDateString('en-NG')}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Order Detail & Dispatch Slips */}
        {selectedOrder ? (
          <div style={{
            background: '#ffffff',
            borderRadius: '18px',
            border: '1px solid #e2e8f0',
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            height: '680px',
            overflowY: 'auto'
          }}>
            {/* Header with Print & Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: '16px', borderBottom: '1px solid #e2e8f0' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                    {selectedOrder.orderNumber}
                  </h2>
                  <span className="badge badge-emerald">PAID ({selectedOrder.paymentGateway.toUpperCase()})</span>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  Reference: {selectedOrder.paymentReference || 'N/A'} • Created {new Date(selectedOrder.createdAt).toLocaleString('en-NG')}
                </div>
              </div>

              <button
                onClick={handlePrintSlip}
                className="btn-secondary"
                style={{ fontSize: '0.8rem', padding: '8px 14px' }}
              >
                <Printer size={15} /> Print Dispatch Slip
              </button>
            </div>

            {/* Pipeline Stage Transition Buttons */}
            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '10px' }}>
                Advance Order Pipeline Stage:
              </label>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                <button
                  onClick={() => handleUpdateStatus('confirmed')}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '8px',
                    border: 'none',
                    background: selectedOrder.orderStatus === 'confirmed' ? '#0f766e' : '#ffffff',
                    color: selectedOrder.orderStatus === 'confirmed' ? '#ffffff' : '#334155',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                  }}
                >
                  1. Confirmed
                </button>

                <button
                  onClick={() => handleUpdateStatus('processing')}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '8px',
                    border: 'none',
                    background: selectedOrder.orderStatus === 'processing' ? '#0f766e' : '#ffffff',
                    color: selectedOrder.orderStatus === 'processing' ? '#ffffff' : '#334155',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                  }}
                >
                  2. Warehouse Packing
                </button>

                <button
                  onClick={() => handleUpdateStatus('shipped')}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '8px',
                    border: 'none',
                    background: selectedOrder.orderStatus === 'shipped' ? '#0f766e' : '#ffffff',
                    color: selectedOrder.orderStatus === 'shipped' ? '#ffffff' : '#334155',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                  }}
                >
                  3. In Transit (Dispatched)
                </button>

                <button
                  onClick={() => handleUpdateStatus('delivered')}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '8px',
                    border: 'none',
                    background: selectedOrder.orderStatus === 'delivered' ? '#0f766e' : '#ffffff',
                    color: selectedOrder.orderStatus === 'delivered' ? '#ffffff' : '#334155',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                  }}
                >
                  4. Delivered & Signed
                </button>
              </div>
            </div>

            {/* Carrier & Tracking Input Box */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                  Carrier / Delivery Van Unit
                </label>
                <input
                  type="text"
                  placeholder="e.g. IYANU Fleet (Van 04)"
                  value={carrierInput}
                  onChange={e => setCarrierInput(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                  Waybill / Tracking Code
                </label>
                <input
                  type="text"
                  placeholder="e.g. IYN-TRK-99281"
                  value={trackingInput}
                  onChange={e => setTrackingInput(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
                />
              </div>
            </div>

            {/* Delivery Destination Card */}
            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '0.85rem' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a', margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={16} color="#0f766e" /> Delivery Address & Contact
              </h4>
              <div><strong>Recipient:</strong> {selectedOrder.deliveryAddress.fullName}</div>
              <div><strong>Phone:</strong> {selectedOrder.deliveryAddress.phone}</div>
              <div><strong>Address:</strong> {selectedOrder.deliveryAddress.street}, {selectedOrder.deliveryAddress.city}, {selectedOrder.deliveryAddress.state} State</div>
              {selectedOrder.deliveryAddress.deliveryNotes && (
                <div style={{ marginTop: '6px', color: '#64748b' }}>
                  <strong>Gate Notes:</strong> {selectedOrder.deliveryAddress.deliveryNotes}
                </div>
              )}
            </div>

            {/* Line Items Table */}
            <div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a', margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Package size={16} color="#0f766e" /> Package Line Items
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.85rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img src={item.image} alt="" style={{ width: '36px', height: '36px', borderRadius: '6px', objectFit: 'cover' }} />
                      <div>
                        <strong>{item.productName}</strong>
                        {item.variantName && <div style={{ fontSize: '0.72rem', color: '#0f766e' }}>{item.variantName}</div>}
                      </div>
                    </div>
                    <div>
                      <span>{item.quantity} units × {formatNGN(item.price)}</span> = <strong style={{ color: '#0f766e' }}>{formatNGN(item.price * item.quantity)}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
