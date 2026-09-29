import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Order } from '../types';
import {
  Truck,
  CheckCircle2,
  Clock,
  Package,
  MapPin,
  PhoneCall,
  Search,
  ShieldCheck,
  Building2,
  ArrowRight
} from 'lucide-react';

export const OrderTrackingView: React.FC = () => {
  const { orders, selectedTrackingOrder, setSelectedTrackingOrder, formatNGN, setActiveView } = useApp();
  const [searchOrderNumber, setSearchOrderNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Default to selected order or most recent order
  const currentOrder: Order | undefined = selectedTrackingOrder || orders[0];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    const found = orders.find(
      o => o.orderNumber.toLowerCase() === searchOrderNumber.trim().toLowerCase() ||
           o.trackingNumber?.toLowerCase() === searchOrderNumber.trim().toLowerCase()
    );

    if (found) {
      setSelectedTrackingOrder(found);
    } else {
      setErrorMessage(`Order "${searchOrderNumber}" not found. Try search "IYN-2026-0842" or "IYN-2026-0841".`);
    }
  };

  const statusSteps = [
    { key: 'pending', label: 'Order Received', desc: 'Awaiting payment verification' },
    { key: 'confirmed', label: 'Payment Verified', desc: 'Official invoice generated' },
    { key: 'processing', label: 'Warehouse Packing', desc: 'Goods palletized & quality checked' },
    { key: 'shipped', label: 'In Transit', desc: 'Dispatched with logistics fleet' },
    { key: 'delivered', label: 'Delivered', desc: 'Received & signed by customer' }
  ];

  const getStepIndex = (status: string) => {
    switch (status) {
      case 'pending': return 0;
      case 'confirmed': return 1;
      case 'processing': return 2;
      case 'shipped': return 3;
      case 'delivered': return 4;
      default: return 1;
    }
  };

  const activeStepIdx = currentOrder ? getStepIndex(currentOrder.orderStatus) : 1;

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px 20px', width: '100%' }}>
      {/* Header & Order Lookup */}
      <div style={{
        background: '#ffffff',
        borderRadius: '18px',
        padding: '28px',
        border: '1px solid #e2e8f0',
        marginBottom: '24px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 800, color: '#0f766e', textTransform: 'uppercase', marginBottom: '4px' }}>
              <Truck size={15} /> LIVE LOGISTICS DISPATCH TRACKER
            </div>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
              Track Your Delivery in Real-Time
            </h1>
          </div>

          {/* Search Box */}
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '8px', maxWidth: '380px', width: '100%' }}>
            <input
              type="text"
              placeholder="Enter Order # or Tracking Code"
              value={searchOrderNumber}
              onChange={e => setSearchOrderNumber(e.target.value)}
              style={{
                flex: 1,
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1.5px solid #cbd5e1',
                fontSize: '0.85rem'
              }}
            />
            <button type="submit" className="btn-primary" style={{ padding: '0 16px' }}>
              <Search size={16} /> Track
            </button>
          </form>
        </div>

        {errorMessage && (
          <div style={{ marginTop: '12px', padding: '8px 12px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', color: '#b91c1c', fontSize: '0.8rem' }}>
            {errorMessage}
          </div>
        )}
      </div>

      {currentOrder ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Main Status Timeline Card */}
          <div style={{
            background: '#ffffff',
            borderRadius: '18px',
            padding: '32px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
          }}>
            {/* Top Order Summary Info */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: '24px', borderBottom: '1px solid #f1f5f9', gap: '16px' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Order Number:</span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0f766e', margin: '2px 0 0 0' }}>
                  {currentOrder.orderNumber}
                </h3>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                  Placed on {new Date(currentOrder.createdAt).toLocaleString('en-NG')}
                </span>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Current Status:</span>
                <div style={{ marginTop: '4px' }}>
                  <span className={`badge ${
                    currentOrder.orderStatus === 'delivered' ? 'badge-emerald' :
                    currentOrder.orderStatus === 'shipped' ? 'badge-blue' :
                    currentOrder.orderStatus === 'processing' ? 'badge-purple' : 'badge-amber'
                  }`} style={{ fontSize: '0.85rem', padding: '4px 12px' }}>
                    {currentOrder.orderStatus.toUpperCase()}
                  </span>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#0f766e', fontWeight: 700, marginTop: '4px' }}>
                  Tracking ID: {currentOrder.trackingNumber || 'Pending Dispatch'}
                </div>
              </div>
            </div>

            {/* Visual Step Progress Bar */}
            <div style={{ margin: '36px 0 20px 0' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', position: 'relative' }}>
                {/* Connecting Track Line */}
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  left: '10%',
                  right: '10%',
                  height: '4px',
                  background: '#e2e8f0',
                  zIndex: 1
                }}>
                  <div style={{
                    height: '100%',
                    width: `${(activeStepIdx / 4) * 100}%`,
                    background: '#0f766e',
                    transition: 'width 0.4s ease'
                  }} />
                </div>

                {statusSteps.map((step, idx) => {
                  const isCompleted = idx <= activeStepIdx;
                  const isCurrent = idx === activeStepIdx;

                  return (
                    <div key={step.key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', zIndex: 2 }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: isCompleted ? '#0f766e' : '#ffffff',
                        border: `3px solid ${isCompleted ? '#0f766e' : '#cbd5e1'}`,
                        color: isCompleted ? '#ffffff' : '#94a3b8',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '10px',
                        boxShadow: isCurrent ? '0 0 0 4px rgba(15, 118, 110, 0.2)' : 'none',
                        transition: 'all 0.3s ease'
                      }}>
                        {isCompleted ? <CheckCircle2 size={20} /> : <span>{idx + 1}</span>}
                      </div>
                      <span style={{ fontSize: '0.8rem', fontWeight: isCurrent ? 800 : 600, color: isCurrent ? '#0f766e' : '#334155' }}>
                        {step.label}
                      </span>
                      <span style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '2px', maxWidth: '120px' }}>
                        {step.desc}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Carrier & Estimated Delivery SLA Callout */}
            <div style={{
              background: '#f0fdfa',
              border: '1px solid #ccfbf1',
              borderRadius: '12px',
              padding: '16px 20px',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '16px',
              marginTop: '28px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Truck size={24} color="#0f766e" />
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f766e' }}>
                    Carrier: {currentOrder.carrierName || 'IYANU Express Fleet'}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#475569' }}>
                    Driver is dispatched from Ikeja Central Warehouse Hub
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={18} color="#d97706" />
                <div>
                  <span style={{ fontSize: '0.72rem', color: '#64748b', display: 'block' }}>Target Delivery SLA:</span>
                  <strong style={{ fontSize: '0.85rem', color: '#0f172a' }}>
                    {new Date(currentOrder.estimatedDelivery).toLocaleDateString('en-NG', { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </strong>
                </div>
              </div>
            </div>
          </div>

          {/* Details 2-Column: Delivery Address & Ordered Items */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            {/* Delivery Address & Customer Info */}
            <div style={{
              background: '#ffffff',
              borderRadius: '18px',
              padding: '24px',
              border: '1px solid #e2e8f0'
            }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={18} color="#0f766e" /> Destination Address
              </h4>

              <div style={{ fontSize: '0.85rem', color: '#334155', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div><strong>Customer:</strong> {currentOrder.deliveryAddress.fullName}</div>
                <div><strong>Phone:</strong> {currentOrder.deliveryAddress.phone}</div>
                <div><strong>Address:</strong> {currentOrder.deliveryAddress.street}, {currentOrder.deliveryAddress.city}, {currentOrder.deliveryAddress.state}</div>
                {currentOrder.deliveryAddress.deliveryNotes && (
                  <div style={{ background: '#f8fafc', padding: '8px 12px', borderRadius: '6px', fontSize: '0.78rem', color: '#64748b' }}>
                    <strong>Gate Notes:</strong> {currentOrder.deliveryAddress.deliveryNotes}
                  </div>
                )}
              </div>

              <div style={{ marginTop: '20px', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                <button
                  onClick={() => setActiveView('customer-portal')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#0f766e',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <PhoneCall size={14} /> Open Support Inquiry for this Order
                </button>
              </div>
            </div>

            {/* Ordered Items List */}
            <div style={{
              background: '#ffffff',
              borderRadius: '18px',
              padding: '24px',
              border: '1px solid #e2e8f0'
            }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Package size={18} color="#0f766e" /> Package Contents ({currentOrder.items.length} lines)
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {currentOrder.items.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img
                      src={item.image}
                      alt={item.productName}
                      style={{ width: '48px', height: '48px', borderRadius: '6px', objectFit: 'cover' }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.productName}
                      </div>
                      {item.variantName && (
                        <div style={{ fontSize: '0.72rem', color: '#0f766e' }}>{item.variantName}</div>
                      )}
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                        Qty: {item.quantity} × {formatNGN(item.price)}
                      </div>
                    </div>
                    <strong style={{ fontSize: '0.85rem', color: '#0f172a' }}>
                      {formatNGN(item.price * item.quantity)}
                    </strong>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid #f1f5f9', marginTop: '16px', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ fontWeight: 600, color: '#475569' }}>Total Paid:</span>
                <strong style={{ fontWeight: 900, color: '#0f766e', fontSize: '1.1rem' }}>
                  {formatNGN(currentOrder.totalAmount)}
                </strong>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
