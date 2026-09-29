import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SupportTicket, TicketPriority } from '../types';
import {
  User,
  ShoppingBag,
  Clock,
  MessageSquare,
  PlusCircle,
  CheckCircle2,
  AlertCircle,
  FileText,
  Send,
  Truck,
  ShieldAlert
} from 'lucide-react';

export const CustomerPortalView: React.FC = () => {
  const {
    orders,
    tickets,
    createTicket,
    addTicketMessage,
    formatNGN,
    setSelectedTrackingOrder,
    setActiveView
  } = useApp();

  const [activeTab, setActiveTab] = useState<'orders' | 'tickets' | 'new_ticket'>('orders');
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(tickets[0]?.id || null);
  const [chatMessage, setChatMessage] = useState('');

  // New ticket form state
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketCategory, setTicketCategory] = useState<SupportTicket['category']>('Product Inquiry');
  const [ticketPriority, setTicketPriority] = useState<TicketPriority>('medium');
  const [ticketCustomerName, setTicketCustomerName] = useState('Chief Emeka Okafor');
  const [ticketCustomerPhone, setTicketCustomerPhone] = useState('+234 803 456 7890');
  const [ticketCustomerEmail, setTicketCustomerEmail] = useState('emeka.okafor@primeventures.ng');
  const [ticketOrderNumber, setTicketOrderNumber] = useState('IYN-2026-0842');
  const [ticketInitialMessage, setTicketInitialMessage] = useState('');

  const selectedTicket = tickets.find(t => t.id === selectedTicketId) || tickets[0];

  const handleCreateTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject || !ticketInitialMessage) {
      alert('Please fill out the ticket subject and description.');
      return;
    }

    createTicket({
      subject: ticketSubject,
      category: ticketCategory,
      priority: ticketPriority,
      customerName: ticketCustomerName,
      customerPhone: ticketCustomerPhone,
      customerEmail: ticketCustomerEmail,
      orderNumber: ticketOrderNumber,
      initialMessage: ticketInitialMessage
    });

    setTicketSubject('');
    setTicketInitialMessage('');
    setActiveTab('tickets');
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim() || !selectedTicket) return;
    addTicketMessage(selectedTicket.id, chatMessage.trim(), 'customer');
    setChatMessage('');
  };

  return (
    <div style={{ maxWidth: '1380px', margin: '0 auto', padding: '24px 20px', width: '100%' }}>
      {/* Portal Hero & Header */}
      <div style={{
        background: '#ffffff',
        borderRadius: '18px',
        padding: '28px 32px',
        border: '1px solid #e2e8f0',
        marginBottom: '24px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #0f766e 0%, #134e4a 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontWeight: 900,
            fontSize: '1.25rem'
          }}>
            EO
          </div>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
              Customer Portal & SLA Center
            </h1>
            <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '2px 0 0 0' }}>
              Welcome back, Chief Emeka Okafor • Prime Ventures Nigeria
            </p>
          </div>
        </div>

        {/* Action Tabs */}
        <div style={{ display: 'flex', gap: '8px', background: '#f1f5f9', padding: '4px', borderRadius: '10px' }}>
          <button
            onClick={() => setActiveTab('orders')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'orders' ? '#ffffff' : 'transparent',
              color: activeTab === 'orders' ? '#0f766e' : '#475569',
              fontWeight: activeTab === 'orders' ? 800 : 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              boxShadow: activeTab === 'orders' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <ShoppingBag size={15} /> My Orders ({orders.length})
          </button>

          <button
            onClick={() => setActiveTab('tickets')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'tickets' ? '#ffffff' : 'transparent',
              color: activeTab === 'tickets' ? '#0f766e' : '#475569',
              fontWeight: activeTab === 'tickets' ? 800 : 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              boxShadow: activeTab === 'tickets' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <MessageSquare size={15} /> Support Tickets & SLA ({tickets.length})
          </button>

          <button
            onClick={() => setActiveTab('new_ticket')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'new_ticket' ? '#0f766e' : 'transparent',
              color: activeTab === 'new_ticket' ? '#ffffff' : '#475569',
              fontWeight: activeTab === 'new_ticket' ? 800 : 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <PlusCircle size={15} /> Open New SLA Ticket
          </button>
        </div>
      </div>

      {/* Tab 1: Orders History */}
      {activeTab === 'orders' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {orders.map(order => (
            <div
              key={order.id}
              style={{
                background: '#ffffff',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                padding: '24px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '20px'
              }}
            >
              <div style={{ maxWidth: '400px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    {order.orderNumber}
                  </h3>
                  <span className={`badge ${
                    order.orderStatus === 'delivered' ? 'badge-emerald' :
                    order.orderStatus === 'shipped' ? 'badge-blue' :
                    order.orderStatus === 'processing' ? 'badge-purple' : 'badge-amber'
                  }`}>
                    {order.orderStatus.toUpperCase()}
                  </span>
                </div>
                <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0 }}>
                  Date: {new Date(order.createdAt).toLocaleDateString('en-NG')} • Payment: {order.paymentGateway.toUpperCase()} ({order.paymentStatus})
                </p>
                <div style={{ fontSize: '0.8rem', color: '#334155', marginTop: '8px' }}>
                  {order.items.map(i => `${i.quantity}x ${i.productName}`).join(' • ')}
                </div>
              </div>

              <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block' }}>Total Paid:</span>
                  <strong style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f766e', fontFamily: 'var(--font-heading)' }}>
                    {formatNGN(order.totalAmount)}
                  </strong>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => {
                      setSelectedTrackingOrder(order);
                      setActiveView('order-tracking');
                    }}
                    className="btn-secondary"
                    style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                  >
                    <Truck size={14} /> Track Fleet
                  </button>

                  <button
                    onClick={() => {
                      setTicketOrderNumber(order.orderNumber);
                      setTicketSubject(`Inquiry regarding Order #${order.orderNumber}`);
                      setActiveTab('new_ticket');
                    }}
                    className="btn-primary"
                    style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                  >
                    <MessageSquare size={14} /> Open Ticket
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Support Tickets & Live SLA Chat */}
      {activeTab === 'tickets' && (
        <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: '24px' }}>
          {/* Left: Ticket List */}
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            height: 'fit-content'
          }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', margin: '4px 8px 10px 8px' }}>
              Your Active Support Inquiries
            </h3>

            {tickets.map(t => {
              const isSelected = selectedTicket?.id === t.id;
              const isBreached = t.isBreached && t.status !== 'resolved';

              return (
                <div
                  key={t.id}
                  onClick={() => setSelectedTicketId(t.id)}
                  style={{
                    padding: '14px',
                    borderRadius: '12px',
                    border: `1.5px solid ${isSelected ? '#0f766e' : '#e2e8f0'}`,
                    background: isSelected ? '#f0fdfa' : '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0f766e' }}>
                      {t.ticketNumber}
                    </span>
                    <span className={`badge ${
                      t.priority === 'urgent' ? 'badge-rose' :
                      t.priority === 'high' ? 'badge-amber' : 'badge-blue'
                    }`}>
                      {t.priority.toUpperCase()} SLA
                    </span>
                  </div>

                  <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a', margin: '0 0 6px 0', lineHeight: 1.3 }}>
                    {t.subject}
                  </h4>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', color: '#64748b' }}>
                    <span>Status: <strong>{t.status.toUpperCase()}</strong></span>
                    {isBreached ? (
                      <span style={{ color: '#ef4444', fontWeight: 800 }}>⚠️ SLA BREACHED</span>
                    ) : (
                      <span>Resolution in: {Math.max(1, Math.round((new Date(t.resolutionDeadline).getTime() - Date.now()) / 3600000))}h</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Live Ticket Conversation & Timeline */}
          {selectedTicket ? (
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              display: 'flex',
              flexDirection: 'column',
              height: '620px',
              overflow: 'hidden'
            }}>
              {/* Ticket Header */}
              <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0f766e' }}>
                        {selectedTicket.ticketNumber}
                      </span>
                      <span className={`badge ${
                        selectedTicket.priority === 'urgent' ? 'badge-rose' :
                        selectedTicket.priority === 'high' ? 'badge-amber' : 'badge-blue'
                      }`}>
                        {selectedTicket.priority.toUpperCase()} PRIORITY
                      </span>
                      <span className="badge badge-emerald">
                        {selectedTicket.status.toUpperCase()}
                      </span>
                    </div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: '0 0 4px 0' }}>
                      {selectedTicket.subject}
                    </h3>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                      Assigned Officer: <strong>{selectedTicket.assignedTo}</strong>
                    </span>
                  </div>

                  <div style={{ textAlign: 'right', fontSize: '0.75rem', color: '#64748b' }}>
                    <div>Opened: {new Date(selectedTicket.createdAt).toLocaleTimeString('en-NG')}</div>
                    <div>Target Resolution: {new Date(selectedTicket.resolutionDeadline).toLocaleTimeString('en-NG')}</div>
                  </div>
                </div>
              </div>

              {/* Message History */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {selectedTicket.messages.map(msg => {
                  const isStaff = msg.sender === 'staff';
                  return (
                    <div
                      key={msg.id}
                      style={{
                        alignSelf: isStaff ? 'flex-start' : 'flex-end',
                        maxWidth: '80%',
                        background: isStaff ? '#f1f5f9' : '#0f766e',
                        color: isStaff ? '#0f172a' : '#ffffff',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
                      }}
                    >
                      <div style={{ fontSize: '0.7rem', fontWeight: 700, marginBottom: '4px', opacity: 0.85 }}>
                        {msg.senderName} • {new Date(msg.timestamp).toLocaleTimeString('en-NG')}
                      </div>
                      <p style={{ margin: 0, fontSize: '0.85rem', lineHeight: 1.4 }}>
                        {msg.content}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendMessage} style={{ padding: '16px 20px', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  placeholder="Type your response to the support team..."
                  value={chatMessage}
                  onChange={e => setChatMessage(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1.5px solid #cbd5e1',
                    fontSize: '0.85rem'
                  }}
                />
                <button type="submit" className="btn-primary" style={{ padding: '0 20px' }}>
                  <Send size={16} /> Send
                </button>
              </form>
            </div>
          ) : null}
        </div>
      )}

      {/* Tab 3: Open New Ticket Form */}
      {activeTab === 'new_ticket' && (
        <div style={{
          background: '#ffffff',
          borderRadius: '18px',
          border: '1px solid #e2e8f0',
          padding: '32px',
          maxWidth: '750px',
          margin: '0 auto'
        }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0' }}>
            Open Official Support & SLA Ticket
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 24px 0' }}>
            Our support desk guarantees response times based on your issue urgency level.
          </p>

          <form onSubmit={handleCreateTicketSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                Ticket Subject *
              </label>
              <input
                type="text"
                required
                placeholder="Brief summary of your inquiry or request"
                value={ticketSubject}
                onChange={e => setTicketSubject(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Issue Category *
                </label>
                <select
                  value={ticketCategory}
                  onChange={e => setTicketCategory(e.target.value as any)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem', background: '#ffffff' }}
                >
                  <option value="Damaged Goods">Damaged Goods in Transit</option>
                  <option value="Delivery Delay">Delivery Delay / Fleet Status</option>
                  <option value="Bulk Quotation">Wholesale / Bulk Quotation Request</option>
                  <option value="Product Inquiry">Product Inquiry / Specifications</option>
                  <option value="Payment Issue">Payment / Bank Transfer Verification</option>
                  <option value="General">General Inquiries</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Urgency / Priority SLA *
                </label>
                <select
                  value={ticketPriority}
                  onChange={e => setTicketPriority(e.target.value as any)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem', background: '#ffffff' }}
                >
                  <option value="urgent">🚨 Urgent (15 min response • 2 hr resolution)</option>
                  <option value="high">🔥 High (30 min response • 6 hr resolution)</option>
                  <option value="medium">⚡ Medium (2 hr response • 24 hr resolution)</option>
                  <option value="low">📋 Low (4 hr response • 48 hr resolution)</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                Related Order Number (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. IYN-2026-0842"
                value={ticketOrderNumber}
                onChange={e => setTicketOrderNumber(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                Detailed Description *
              </label>
              <textarea
                required
                rows={4}
                placeholder="Please describe in detail your issue, quantities involved, or quotation requirements..."
                value={ticketInitialMessage}
                onChange={e => setTicketInitialMessage(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
              />
            </div>

            <button type="submit" className="btn-primary" style={{ marginTop: '10px', padding: '14px' }}>
              Submit SLA Ticket & Start Clock
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
