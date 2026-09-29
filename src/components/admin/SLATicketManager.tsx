import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SupportTicket, TicketStatus, TicketPriority } from '../../types';
import {
  Clock,
  AlertTriangle,
  CheckCircle2,
  UserCheck,
  Send,
  ShieldAlert,
  ArrowUpRight,
  MessageSquare,
  Search,
  Filter
} from 'lucide-react';

export const SLATicketManager: React.FC = () => {
  const {
    tickets,
    updateTicketStatus,
    assignTicket,
    addTicketMessage,
    escalateTicket
  } = useApp();

  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(tickets[0]?.id || null);
  const [staffReply, setStaffReply] = useState('');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const selectedTicket = tickets.find(t => t.id === selectedTicketId) || tickets[0];

  const handleStaffReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!staffReply.trim() || !selectedTicket) return;
    addTicketMessage(selectedTicket.id, staffReply.trim(), 'staff');
    setStaffReply('');
  };

  const handleEscalate = () => {
    if (!selectedTicket) return;
    const reason = prompt('Please enter the escalation reason:');
    if (reason) {
      escalateTicket(selectedTicket.id, reason);
    }
  };

  const filteredTickets = tickets.filter(t => {
    if (filterPriority !== 'all' && t.priority !== filterPriority) return false;
    if (filterStatus !== 'all' && t.status !== filterStatus) return false;
    return true;
  });

  const staffList = [
    'Titi Balogun (Key Accounts & QC)',
    'Kester Igwe (Logistics & Dispatches)',
    'Biodun Alabi (Technical Engineer)',
    'Chiamaka Okon (Payments Desk)'
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* SLA Header & KPI Overview */}
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
            SLA Support & Resolution Engine
          </h1>
          <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>
            Strict service-level agreement tracking: Response Clocks, Escalations & Resolution Workflows
          </p>
        </div>

        {/* SLA Filters */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <select
            value={filterPriority}
            onChange={e => setFilterPriority(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem', background: '#ffffff' }}
          >
            <option value="all">All Priorities</option>
            <option value="urgent">🚨 Urgent Priority</option>
            <option value="high">🔥 High Priority</option>
            <option value="medium">⚡ Medium Priority</option>
            <option value="low">📋 Low Priority</option>
          </select>

          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem', background: '#ffffff' }}
          >
            <option value="all">All Statuses</option>
            <option value="new">New</option>
            <option value="assigned">Assigned</option>
            <option value="in_progress">In Progress</option>
            <option value="waiting">Waiting on Customer</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      {/* 2-Column SLA Workstation */}
      <div style={{ display: 'grid', gridTemplateColumns: '420px 1fr', gap: '24px' }}>
        {/* Left Column: Tickets Queue */}
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 8px' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
              SLA Queue ({filteredTickets.length})
            </h3>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Sorted by deadline</span>
          </div>

          {filteredTickets.map(t => {
            const isSelected = selectedTicket?.id === t.id;
            const isBreached = t.isBreached && t.status !== 'resolved';
            const hoursLeft = Math.round((new Date(t.resolutionDeadline).getTime() - Date.now()) / 3600000);

            return (
              <div
                key={t.id}
                onClick={() => setSelectedTicketId(t.id)}
                style={{
                  padding: '16px',
                  borderRadius: '12px',
                  border: `1.5px solid ${isBreached ? '#fca5a5' : isSelected ? '#0f766e' : '#e2e8f0'}`,
                  background: isBreached ? '#fff1f2' : isSelected ? '#f0fdfa' : '#ffffff',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#0f766e' }}>
                    {t.ticketNumber} • {t.category}
                  </span>
                  <span className={`badge ${
                    t.priority === 'urgent' ? 'badge-rose' :
                    t.priority === 'high' ? 'badge-amber' : 'badge-blue'
                  }`}>
                    {t.priority.toUpperCase()}
                  </span>
                </div>

                <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0', lineHeight: 1.3 }}>
                  {t.subject}
                </h4>

                <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '8px' }}>
                  Customer: <strong>{t.customerName}</strong> ({t.customerPhone})
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', borderTop: '1px solid #f1f5f9', paddingTop: '8px' }}>
                  <span className="badge badge-emerald">{t.status.toUpperCase()}</span>

                  {isBreached ? (
                    <span style={{ color: '#e11d48', fontWeight: 900 }}>⚠️ SLA BREACHED</span>
                  ) : t.status === 'resolved' ? (
                    <span style={{ color: '#059669', fontWeight: 700 }}>✓ Resolved</span>
                  ) : (
                    <span style={{ color: hoursLeft <= 2 ? '#d97706' : '#64748b', fontWeight: 700 }}>
                      ⏱️ {hoursLeft > 0 ? `${hoursLeft}h remaining` : 'Due now'}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Ticket Resolver Station */}
        {selectedTicket ? (
          <div style={{
            background: '#ffffff',
            borderRadius: '18px',
            border: '1px solid #e2e8f0',
            display: 'flex',
            flexDirection: 'column',
            height: '680px',
            overflow: 'hidden'
          }}>
            {/* Header Control Panel */}
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0f766e' }}>
                      {selectedTicket.ticketNumber}
                    </span>
                    <span className={`badge ${
                      selectedTicket.priority === 'urgent' ? 'badge-rose' :
                      selectedTicket.priority === 'high' ? 'badge-amber' : 'badge-blue'
                    }`}>
                      {selectedTicket.priority.toUpperCase()} SLA
                    </span>
                    {selectedTicket.orderNumber && (
                      <span className="badge badge-purple">
                        Order #{selectedTicket.orderNumber}
                      </span>
                    )}
                  </div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f172a', margin: '0 0 4px 0' }}>
                    {selectedTicket.subject}
                  </h2>
                  <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                    Client: {selectedTicket.customerName} ({selectedTicket.customerPhone} • {selectedTicket.customerEmail})
                  </div>
                </div>

                {/* Urgent Escalation Button */}
                {selectedTicket.priority !== 'urgent' && (
                  <button
                    onClick={handleEscalate}
                    style={{
                      background: '#fff1f2',
                      color: '#be123c',
                      border: '1px solid #fecdd3',
                      padding: '8px 14px',
                      borderRadius: '8px',
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <ShieldAlert size={14} /> Escalate Ticket
                  </button>
                )}
              </div>

              {/* Status & Assignment Selectors */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#475569' }}>Status:</label>
                  <select
                    value={selectedTicket.status}
                    onChange={e => updateTicketStatus(selectedTicket.id, e.target.value as any)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '8px',
                      border: '1.5px solid #0f766e',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      background: '#ffffff',
                      color: '#0f766e'
                    }}
                  >
                    <option value="new">1. New Request</option>
                    <option value="assigned">2. Assigned</option>
                    <option value="in_progress">3. In Progress</option>
                    <option value="waiting">4. Waiting on Customer</option>
                    <option value="resolved">5. Resolved & Closed</option>
                  </select>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#475569' }}>Assigned Staff:</label>
                  <select
                    value={selectedTicket.assignedTo}
                    onChange={e => assignTicket(selectedTicket.id, e.target.value)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.8rem',
                      background: '#ffffff'
                    }}
                  >
                    <option value="Unassigned (Auto-Queue)">Unassigned</option>
                    {staffList.map(st => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <div style={{ marginLeft: 'auto', fontSize: '0.75rem', color: '#64748b' }}>
                  Target Resolution: <strong>{new Date(selectedTicket.resolutionDeadline).toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' })}</strong>
                </div>
              </div>
            </div>

            {/* Ticket Conversation Body */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {selectedTicket.messages.map(msg => {
                const isStaff = msg.sender === 'staff';
                return (
                  <div
                    key={msg.id}
                    style={{
                      alignSelf: isStaff ? 'flex-end' : 'flex-start',
                      maxWidth: '75%',
                      background: isStaff ? '#0f766e' : '#f1f5f9',
                      color: isStaff ? '#ffffff' : '#0f172a',
                      padding: '14px 18px',
                      borderRadius: '14px',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
                    }}
                  >
                    <div style={{ fontSize: '0.72rem', fontWeight: 700, marginBottom: '4px', opacity: 0.85 }}>
                      {msg.senderName} ({msg.sender.toUpperCase()}) • {new Date(msg.timestamp).toLocaleTimeString('en-NG')}
                    </div>
                    <p style={{ margin: 0, fontSize: '0.85rem', lineHeight: 1.45 }}>
                      {msg.content}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Staff Reply Form */}
            <form onSubmit={handleStaffReply} style={{ padding: '16px 20px', borderTop: '1px solid #e2e8f0', background: '#f8fafc', display: 'flex', gap: '10px' }}>
              <input
                type="text"
                placeholder="Type official response to customer (stops first-response timer)..."
                value={staffReply}
                onChange={e => setStaffReply(e.target.value)}
                style={{
                  flex: 1,
                  padding: '12px 14px',
                  borderRadius: '8px',
                  border: '1.5px solid #cbd5e1',
                  fontSize: '0.85rem'
                }}
              />
              <button type="submit" className="btn-primary" style={{ padding: '0 20px' }}>
                <Send size={16} /> Send Reply
              </button>
            </form>
          </div>
        ) : null}
      </div>
    </div>
  );
};
