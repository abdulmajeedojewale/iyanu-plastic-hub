import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { NIGERIAN_STATES } from '../data/mockData';
import { PaymentGateway, Order } from '../types';
import {
  X,
  ShieldCheck,
  CreditCard,
  Building2,
  Truck,
  CheckCircle2,
  Lock,
  ArrowRight
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onOrderSuccess
}) => {
  const { cart, cartTotal, placeOrder, formatNGN } = useApp();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: 'Lagos',
    deliveryNotes: ''
  });

  const [paymentGateway, setPaymentGateway] = useState<PaymentGateway>('paystack');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'form' | 'gateway_modal' | 'confirmed'>('form');

  if (!isOpen) return null;

  // Calculate delivery fee
  let deliveryFee = 3500;
  if (formData.state.includes('Lagos')) deliveryFee = 3500;
  else if (['Ogun', 'Oyo', 'Osun'].includes(formData.state)) deliveryFee = 6000;
  else if (['Abuja (FCT)', 'Rivers', 'Kano', 'Kaduna'].includes(formData.state)) deliveryFee = 12500;
  else deliveryFee = 15000;

  const grandTotal = cartTotal + deliveryFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone || !formData.street) {
      alert('Please fill all required delivery address fields.');
      return;
    }

    setPaymentStep('gateway_modal');
  };

  const handleSimulatePaymentCompletion = async () => {
    setIsProcessing(true);
    setTimeout(async () => {
      try {
        const confirmedOrder = await placeOrder({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          street: formData.street,
          city: formData.city || formData.state,
          state: formData.state,
          deliveryNotes: formData.deliveryNotes,
          paymentGateway
        });
        setIsProcessing(false);
        setPaymentStep('confirmed');
        onOrderSuccess(confirmedOrder);
      } catch (err) {
        setIsProcessing(false);
        console.error(err);
      }
    }, 1500);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(6px)',
        zIndex: 2200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
      onClick={onClose}
    >
      <div
        className="animate-fade-in"
        style={{
          background: '#ffffff',
          borderRadius: '20px',
          maxWidth: '850px',
          width: '100%',
          maxHeight: '92vh',
          overflowY: 'auto',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
          position: 'relative'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          padding: '20px 28px',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#f8fafc'
        }}>
          <div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0, color: '#0f172a' }}>
              Secure Nigerian Checkout
            </h2>
            <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '2px 0 0 0' }}>
              IYANU PLASTIC & GENERAL MERCHANDISE Order Dispatch System
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: '#ffffff',
              border: '1px solid #cbd5e1',
              borderRadius: '50%',
              width: '34px',
              height: '34px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#475569'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Step 1: Address & Options Form */}
        {paymentStep === 'form' && (
          <form onSubmit={handleSubmit} style={{ padding: '28px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '32px' }}>
              {/* Left: Customer Info & Address */}
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f766e', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Truck size={18} /> 1. Delivery Details
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Chief Emeka Okafor"
                      value={formData.fullName}
                      onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '1.5px solid #cbd5e1',
                        borderRadius: '8px',
                        fontSize: '0.85rem'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                      Phone Number (+234) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+234 803 123 4567"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '1.5px solid #cbd5e1',
                        borderRadius: '8px',
                        fontSize: '0.85rem'
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Email Address (For Invoice & Tracking) *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@business.ng"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1.5px solid #cbd5e1',
                      borderRadius: '8px',
                      fontSize: '0.85rem'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '14px', marginBottom: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                      Street Address / Company Compound *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 14 Admiralty Way, Lekki Phase 1"
                      value={formData.street}
                      onChange={e => setFormData({ ...formData, street: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '1.5px solid #cbd5e1',
                        borderRadius: '8px',
                        fontSize: '0.85rem'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                      Destination State *
                    </label>
                    <select
                      value={formData.state}
                      onChange={e => setFormData({ ...formData, state: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '1.5px solid #cbd5e1',
                        borderRadius: '8px',
                        fontSize: '0.85rem',
                        background: '#ffffff'
                      }}
                    >
                      {NIGERIAN_STATES.map(s => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Delivery Notes / Gate Access Code
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Call security post at gate, deliver to warehouse bay 2"
                    value={formData.deliveryNotes}
                    onChange={e => setFormData({ ...formData, deliveryNotes: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1.5px solid #cbd5e1',
                      borderRadius: '8px',
                      fontSize: '0.85rem'
                    }}
                  />
                </div>

                {/* Payment Gateway Selection */}
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f766e', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CreditCard size={18} /> 2. Nigerian Payment Channel
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <label
                    style={{
                      border: `2px solid ${paymentGateway === 'paystack' ? '#0f766e' : '#e2e8f0'}`,
                      background: paymentGateway === 'paystack' ? '#f0fdfa' : '#ffffff',
                      borderRadius: '10px',
                      padding: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      cursor: 'pointer'
                    }}
                  >
                    <input
                      type="radio"
                      name="gateway"
                      checked={paymentGateway === 'paystack'}
                      onChange={() => setPaymentGateway('paystack')}
                    />
                    <div>
                      <strong style={{ fontSize: '0.85rem', color: '#0f172a', display: 'block' }}>Paystack</strong>
                      <span style={{ fontSize: '0.7rem', color: '#64748b' }}>Cards, Bank Transfer, USSD</span>
                    </div>
                  </label>

                  <label
                    style={{
                      border: `2px solid ${paymentGateway === 'flutterwave' ? '#0f766e' : '#e2e8f0'}`,
                      background: paymentGateway === 'flutterwave' ? '#f0fdfa' : '#ffffff',
                      borderRadius: '10px',
                      padding: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      cursor: 'pointer'
                    }}
                  >
                    <input
                      type="radio"
                      name="gateway"
                      checked={paymentGateway === 'flutterwave'}
                      onChange={() => setPaymentGateway('flutterwave')}
                    />
                    <div>
                      <strong style={{ fontSize: '0.85rem', color: '#0f172a', display: 'block' }}>Flutterwave</strong>
                      <span style={{ fontSize: '0.7rem', color: '#64748b' }}>Cards, QR, Direct Debit</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Right: Order Summary */}
              <div style={{
                background: '#f8fafc',
                borderRadius: '14px',
                padding: '20px',
                border: '1px solid #e2e8f0',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, margin: '0 0 14px 0', color: '#0f172a' }}>
                  Order Summary ({cart.length} items)
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '200px', overflowY: 'auto', marginBottom: '14px' }}>
                  {cart.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                      <span style={{ color: '#475569', maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {item.quantity}x {item.product.name}
                      </span>
                      <strong style={{ color: '#0f172a' }}>
                        {formatNGN((item.selectedVariant?.price ?? item.product.discountPrice ?? item.product.basePrice) * item.quantity)}
                      </strong>
                    </div>
                  ))}
                </div>

                <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                    <span>Subtotal:</span>
                    <span>{formatNGN(cartTotal)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                    <span>Dispatch to {formData.state}:</span>
                    <span>{formatNGN(deliveryFee)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: 900, color: '#0f766e', borderTop: '1.5px dashed #cbd5e1', paddingTop: '10px' }}>
                    <span>Total Amount:</span>
                    <span>{formatNGN(grandTotal)}</span>
                  </div>
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
                  <button
                    type="submit"
                    style={{
                      width: '100%',
                      background: 'linear-gradient(135deg, #0f766e 0%, #134e4a 100%)',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '14px',
                      fontSize: '0.95rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 12px rgba(15, 118, 110, 0.3)'
                    }}
                  >
                    <span>Proceed to Pay {formatNGN(grandTotal)}</span>
                    <ArrowRight size={18} />
                  </button>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.72rem', color: '#64748b', marginTop: '10px' }}>
                    <Lock size={12} /> 256-bit Encrypted Nigerian Gateway
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}

        {/* Step 2: Interactive Nigerian Gateway Payment Simulator */}
        {paymentStep === 'gateway_modal' && (
          <div style={{ padding: '36px', textAlign: 'center' }}>
            <div style={{
              maxWidth: '440px',
              margin: '0 auto',
              background: '#ffffff',
              border: '2px solid #0f766e',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 15px 30px rgba(15, 118, 110, 0.15)'
            }}>
              <div style={{
                display: 'inline-flex',
                padding: '6px 14px',
                borderRadius: '8px',
                background: paymentGateway === 'paystack' ? '#0ba4db' : '#f5a623',
                color: '#ffffff',
                fontWeight: 900,
                fontSize: '0.9rem',
                marginBottom: '16px',
                letterSpacing: '0.04em'
              }}>
                {paymentGateway === 'paystack' ? 'PAYSTACK POPUP SECURE' : 'FLUTTERWAVE CHECKOUT'}
              </div>

              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 6px 0' }}>
                Pay IYANU PLASTIC NIG
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 16px 0' }}>
                Customer: {formData.fullName} ({formData.email})
              </p>

              <div style={{
                fontSize: '2rem',
                fontWeight: 900,
                color: '#0f766e',
                fontFamily: 'var(--font-heading)',
                marginBottom: '20px'
              }}>
                {formatNGN(grandTotal)}
              </div>

              <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '20px', fontSize: '0.8rem', textAlign: 'left' }}>
                <div><strong>Delivery State:</strong> {formData.state}</div>
                <div><strong>Items:</strong> {cart.length} product lines</div>
                <div><strong>SLA Dispatch:</strong> Within 24-48 hours</div>
              </div>

              <button
                onClick={handleSimulatePaymentCompletion}
                disabled={isProcessing}
                style={{
                  width: '100%',
                  background: isProcessing ? '#94a3b8' : '#059669',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '14px',
                  fontSize: '1rem',
                  fontWeight: 800,
                  cursor: isProcessing ? 'wait' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                {isProcessing ? 'Verifying Transaction with CBN / NIBSS...' : `Authorize & Pay ${formatNGN(grandTotal)}`}
              </button>

              <button
                onClick={() => setPaymentStep('form')}
                disabled={isProcessing}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#64748b',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  marginTop: '12px',
                  textDecoration: 'underline'
                }}
              >
                Cancel & Return
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Success Confirmation */}
        {paymentStep === 'confirmed' && (
          <div style={{ padding: '48px', textAlign: 'center' }}>
            <div style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: '#ecfdf5',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <CheckCircle2 size={42} color="#10b981" />
            </div>

            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: '0 0 8px 0' }}>
              Payment & Order Successful!
            </h3>
            <p style={{ color: '#475569', fontSize: '0.9rem', maxWidth: '460px', margin: '0 auto 24px auto' }}>
              Your order has been recorded in our warehouse fulfillment queue. Our dispatch officer will call <strong>{formData.phone}</strong> prior to delivery.
            </p>

            <button
              onClick={onClose}
              className="btn-primary"
              style={{ padding: '12px 28px', fontSize: '0.9rem' }}
            >
              View Order Tracking & Receipt
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
