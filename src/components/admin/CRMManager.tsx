import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CRMLead, LeadStatus } from '../../types';
import {
  Users,
  Plus,
  PhoneCall,
  MessageSquare,
  Mail,
  Calendar,
  Building2,
  DollarSign,
  Search,
  CheckCircle,
  X
} from 'lucide-react';

export const CRMManager: React.FC = () => {
  const { leads, addLead, updateLeadStatus, addLeadInteraction, formatNGN } = useApp();

  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(leads[0]?.id || null);
  const [isNewLeadModalOpen, setIsNewLeadModalOpen] = useState(false);
  const [interactionNotes, setInteractionNotes] = useState('');
  const [interactionType, setInteractionType] = useState<'whatsapp' | 'call' | 'email' | 'meeting'>('whatsapp');
  const [searchLead, setSearchLead] = useState('');

  // New Lead Form State
  const [newLeadForm, setNewLeadForm] = useState({
    customerName: '',
    businessName: '',
    email: '',
    phone: '',
    state: 'Lagos',
    leadSource: 'Bulk Inquiry' as CRMLead['leadSource'],
    status: 'new' as LeadStatus,
    estimatedValue: 500000,
    assignedStaff: 'Titi Balogun (Key Accounts)',
    notes: ''
  });

  const selectedLead = leads.find(l => l.id === selectedLeadId) || leads[0];

  const handleCreateLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadForm.customerName || !newLeadForm.phone) {
      alert('Please fill out customer name and phone number.');
      return;
    }

    addLead({
      ...newLeadForm,
      estimatedValue: Number(newLeadForm.estimatedValue)
    });

    setIsNewLeadModalOpen(false);
    setNewLeadForm({
      customerName: '',
      businessName: '',
      email: '',
      phone: '',
      state: 'Lagos',
      leadSource: 'Bulk Inquiry',
      status: 'new',
      estimatedValue: 500000,
      assignedStaff: 'Titi Balogun (Key Accounts)',
      notes: ''
    });
  };

  const handleAddInteractionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!interactionNotes.trim() || !selectedLead) return;
    addLeadInteraction(selectedLead.id, interactionType, interactionNotes.trim());
    setInteractionNotes('');
  };

  const filteredLeads = leads.filter(l =>
    l.customerName.toLowerCase().includes(searchLead.toLowerCase()) ||
    (l.businessName && l.businessName.toLowerCase().includes(searchLead.toLowerCase())) ||
    l.phone.includes(searchLead)
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* CRM Top Header */}
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
            CRM & Customer 360° Management
          </h1>
          <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>
            Track Nigerian bulk buyers, key distributors, quote requests, and WhatsApp/Call logs
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <input
            type="text"
            placeholder="Search leads by name, company, phone..."
            value={searchLead}
            onChange={e => setSearchLead(e.target.value)}
            style={{
              padding: '10px 14px',
              borderRadius: '8px',
              border: '1.5px solid #cbd5e1',
              fontSize: '0.85rem',
              width: '280px'
            }}
          />
          <button
            onClick={() => setIsNewLeadModalOpen(true)}
            className="btn-primary"
            style={{ fontSize: '0.85rem' }}
          >
            <Plus size={16} /> New CRM Lead
          </button>
        </div>
      </div>

      {/* 2-Column CRM Hub */}
      <div style={{ display: 'grid', gridTemplateColumns: '400px 1fr', gap: '24px' }}>
        {/* Left Column: Leads List & Pipeline Cards */}
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
            Active Accounts & Leads ({filteredLeads.length})
          </h3>

          {filteredLeads.map(lead => {
            const isSelected = selectedLead?.id === lead.id;

            return (
              <div
                key={lead.id}
                onClick={() => setSelectedLeadId(lead.id)}
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
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    {lead.customerName}
                  </h4>
                  <span className={`badge ${
                    lead.status === 'converted' ? 'badge-emerald' :
                    lead.status === 'negotiation' ? 'badge-amber' :
                    lead.status === 'contacted' ? 'badge-blue' : 'badge-purple'
                  }`}>
                    {lead.status.toUpperCase()}
                  </span>
                </div>

                {lead.businessName && (
                  <div style={{ fontSize: '0.78rem', color: '#0f766e', fontWeight: 700, marginBottom: '4px' }}>
                    🏢 {lead.businessName} ({lead.state})
                  </div>
                )}

                <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '8px' }}>
                  📞 {lead.phone} • Est: <strong>{formatNGN(lead.estimatedValue)}</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#94a3b8', borderTop: '1px solid #f1f5f9', paddingTop: '6px' }}>
                  <span>{lead.interactions.length} interactions</span>
                  <span>Assigned: {lead.assignedStaff.split(' ')[0]}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Customer 360 & Activity Timeline */}
        {selectedLead ? (
          <div style={{
            background: '#ffffff',
            borderRadius: '18px',
            border: '1px solid #e2e8f0',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            height: '680px',
            overflowY: 'auto'
          }}>
            {/* Top Profile Card */}
            <div style={{ paddingBottom: '16px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <h2 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                    {selectedLead.customerName}
                  </h2>
                  <span className="badge badge-emerald">{selectedLead.leadSource}</span>
                </div>
                <div style={{ fontSize: '0.85rem', color: '#475569' }}>
                  {selectedLead.businessName ? `${selectedLead.businessName} • ` : ''}{selectedLead.state} State, Nigeria
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '2px' }}>
                  Email: {selectedLead.email} | Phone: {selectedLead.phone}
                </div>
              </div>

              {/* Status Selector Dropdown */}
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', display: 'block', marginBottom: '4px' }}>
                  Pipeline Stage:
                </label>
                <select
                  value={selectedLead.status}
                  onChange={e => updateLeadStatus(selectedLead.id, e.target.value as any)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '8px',
                    border: '1.5px solid #0f766e',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    background: '#f0fdfa',
                    color: '#0f766e'
                  }}
                >
                  <option value="new">New Inbound</option>
                  <option value="contacted">Contacted</option>
                  <option value="negotiation">In Negotiation</option>
                  <option value="converted">Converted Customer</option>
                  <option value="lost">Lost</option>
                </select>
              </div>
            </div>

            {/* Lifetime Spend & Financials */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
              <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700 }}>LIFETIME VALUE (LTV)</span>
                <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0f766e', marginTop: '2px' }}>
                  {formatNGN(selectedLead.lifetimeSpend)}
                </div>
              </div>

              <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700 }}>PIPELINE VALUE</span>
                <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#d97706', marginTop: '2px' }}>
                  {formatNGN(selectedLead.estimatedValue)}
                </div>
              </div>

              <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700 }}>COMPLETED ORDERS</span>
                <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0f172a', marginTop: '2px' }}>
                  {selectedLead.orderCount} Orders
                </div>
              </div>
            </div>

            {/* Notes & Log Interaction Box */}
            <div style={{ background: '#f0fdfa', padding: '16px', borderRadius: '12px', border: '1px solid #ccfbf1' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f766e', margin: '0 0 8px 0' }}>
                Log Client Activity / WhatsApp Call Notes
              </h4>

              <form onSubmit={handleAddInteractionSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <select
                    value={interactionType}
                    onChange={e => setInteractionType(e.target.value as any)}
                    style={{ padding: '8px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.8rem', background: '#ffffff' }}
                  >
                    <option value="whatsapp">📱 WhatsApp Message</option>
                    <option value="call">📞 Phone Call</option>
                    <option value="email">📧 Email / PDF Quote</option>
                    <option value="meeting">🤝 Site / Factory Visit</option>
                  </select>

                  <input
                    type="text"
                    placeholder="Enter discussion notes or quote summary..."
                    value={interactionNotes}
                    onChange={e => setInteractionNotes(e.target.value)}
                    style={{ flex: 1, padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                  />

                  <button type="submit" className="btn-primary" style={{ padding: '0 16px', fontSize: '0.8rem' }}>
                    Save Note
                  </button>
                </div>
              </form>
            </div>

            {/* Interaction History Timeline */}
            <div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a', margin: '0 0 12px 0' }}>
                Customer Activity Timeline
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {selectedLead.interactions.map(int => (
                  <div
                    key={int.id}
                    style={{
                      padding: '12px 16px',
                      background: '#ffffff',
                      borderRadius: '10px',
                      border: '1px solid #e2e8f0',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px'
                    }}
                  >
                    <div style={{
                      padding: '6px',
                      borderRadius: '8px',
                      background: '#f1f5f9',
                      color: '#0f766e',
                      flexShrink: 0
                    }}>
                      {int.type === 'whatsapp' && <MessageSquare size={16} />}
                      {int.type === 'call' && <PhoneCall size={16} />}
                      {int.type === 'email' && <Mail size={16} />}
                      {int.type === 'meeting' && <Building2 size={16} />}
                      {int.type === 'ticket' && <Users size={16} />}
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#64748b' }}>
                        <span><strong>{int.type.toUpperCase()}</strong> • By {int.agentName}</span>
                        <span>{new Date(int.timestamp).toLocaleString('en-NG')}</span>
                      </div>
                      <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: '#1e293b' }}>
                        {int.notes}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {/* Modal: New CRM Lead */}
      {isNewLeadModalOpen && (
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
            maxWidth: '600px',
            width: '100%',
            padding: '28px',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, color: '#0f172a' }}>
                Add New CRM Lead / Client
              </h3>
              <button
                onClick={() => setIsNewLeadModalOpen(false)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateLeadSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                  Contact Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alhaji Musa Danjuma"
                  value={newLeadForm.customerName}
                  onChange={e => setNewLeadForm({ ...newLeadForm, customerName: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                  Company / Organization Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Kano Bulk Trade Distribution"
                  value={newLeadForm.businessName}
                  onChange={e => setNewLeadForm({ ...newLeadForm, businessName: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Phone (+234) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+234 814 990 1200"
                    value={newLeadForm.phone}
                    onChange={e => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="name@company.ng"
                    value={newLeadForm.email}
                    onChange={e => setNewLeadForm({ ...newLeadForm, email: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Est. Deal Value (₦)
                  </label>
                  <input
                    type="number"
                    value={newLeadForm.estimatedValue}
                    onChange={e => setNewLeadForm({ ...newLeadForm, estimatedValue: Number(e.target.value) })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Assigned Account Manager
                  </label>
                  <input
                    type="text"
                    value={newLeadForm.assignedStaff}
                    onChange={e => setNewLeadForm({ ...newLeadForm, assignedStaff: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem' }}
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary" style={{ padding: '12px', marginTop: '10px' }}>
                Add to CRM Pipeline
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
