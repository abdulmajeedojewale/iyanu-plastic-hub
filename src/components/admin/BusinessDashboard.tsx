import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  TrendingUp,
  ShoppingBag,
  Users,
  Clock,
  AlertTriangle,
  Truck,
  ArrowUpRight,
  ShieldCheck,
  DollarSign
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export const BusinessDashboard: React.FC = () => {
  const { orders, products, leads, tickets, formatNGN, setActiveView } = useApp();

  // Metrics calculations
  const totalRevenue = orders.reduce((sum, o) => sum + (o.paymentStatus === 'paid' ? o.totalAmount : 0), 0);
  const todayRevenue = 1093100; // Simulated today's run rate
  const pendingOrders = orders.filter(o => o.orderStatus === 'pending' || o.orderStatus === 'confirmed' || o.orderStatus === 'processing');
  const breachedTickets = tickets.filter(t => t.isBreached && t.status !== 'resolved');
  const lowStockProducts = products.filter(p => p.stockQuantity <= 15);

  // Revenue chart data
  const salesTrendData = [
    { day: 'Mon', sales: 480000, orders: 8 },
    { day: 'Tue', sales: 720000, orders: 12 },
    { day: 'Wed', sales: 610000, orders: 9 },
    { day: 'Thu', sales: 940000, orders: 15 },
    { day: 'Fri', sales: 1250000, orders: 21 },
    { day: 'Sat', sales: 1850000, orders: 28 },
    { day: 'Today', sales: 1093100, orders: orders.length }
  ];

  // Category distribution data
  const categoryChartData = [
    { name: 'Plastics & Drums', value: 45, color: '#0f766e' },
    { name: 'Furniture', value: 25, color: '#f59e0b' },
    { name: 'Electricals', value: 18, color: '#3b82f6' },
    { name: 'General Merch', value: 12, color: '#8b5cf6' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Header Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0f172a', margin: '0 0 4px 0' }}>
            Executive Business Dashboard
          </h1>
          <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>
            Real-time Nigerian commerce revenue, fulfillment pipeline & customer SLA health
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setActiveView('admin-orders')}
            className="btn-primary"
            style={{ fontSize: '0.85rem' }}
          >
            <Truck size={16} /> Manage Dispatches
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '18px'
      }}>
        {/* Today's Sales Card */}
        <div style={{
          background: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          padding: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
              Today's Sales
            </span>
            <div style={{ padding: '6px', borderRadius: '8px', background: '#ecfdf5', color: '#0f766e' }}>
              <TrendingUp size={16} />
            </div>
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f766e', fontFamily: 'var(--font-heading)' }}>
            {formatNGN(todayRevenue)}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#059669', marginTop: '6px', fontWeight: 700 }}>
            <ArrowUpRight size={14} /> +18.4% vs yesterday
          </div>
        </div>

        {/* Total Orders Card */}
        <div style={{
          background: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          padding: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
              Total Active Orders
            </span>
            <div style={{ padding: '6px', borderRadius: '8px', background: '#eff6ff', color: '#2563eb' }}>
              <ShoppingBag size={16} />
            </div>
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', fontFamily: 'var(--font-heading)' }}>
            {orders.length} Orders
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '6px' }}>
            {pendingOrders.length} pending warehouse dispatch
          </div>
        </div>

        {/* Active CRM Leads & Customers */}
        <div style={{
          background: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          padding: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
              CRM Customer Base
            </span>
            <div style={{ padding: '6px', borderRadius: '8px', background: '#faf5ff', color: '#7c3aed' }}>
              <Users size={16} />
            </div>
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', fontFamily: 'var(--font-heading)' }}>
            {leads.length + 184}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#7c3aed', marginTop: '6px', fontWeight: 700 }}>
            {leads.filter(l => l.status === 'negotiation').length} bulk negotiations open
          </div>
        </div>

        {/* SLA Health & Breaches */}
        <div style={{
          background: breachedTickets.length > 0 ? '#fff1f2' : '#ffffff',
          borderRadius: '16px',
          border: `1px solid ${breachedTickets.length > 0 ? '#fecdd3' : '#e2e8f0'}`,
          padding: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: breachedTickets.length > 0 ? '#9f1239' : '#64748b', textTransform: 'uppercase' }}>
              SLA Health
            </span>
            <div style={{ padding: '6px', borderRadius: '8px', background: breachedTickets.length > 0 ? '#ffe4e6' : '#fffbeb', color: breachedTickets.length > 0 ? '#e11d48' : '#d97706' }}>
              <Clock size={16} />
            </div>
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 900, color: breachedTickets.length > 0 ? '#e11d48' : '#0f172a', fontFamily: 'var(--font-heading)' }}>
            {breachedTickets.length === 0 ? '100% OK' : `${breachedTickets.length} Breached`}
          </div>
          <div style={{ fontSize: '0.75rem', color: breachedTickets.length > 0 ? '#be123c' : '#64748b', marginTop: '6px' }}>
            {tickets.length} total active tickets logged
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        {/* Weekly Revenue Trend Area Chart */}
        <div style={{
          background: '#ffffff',
          borderRadius: '18px',
          border: '1px solid #e2e8f0',
          padding: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                Weekly Revenue (NGN ₦)
              </h3>
              <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '2px 0 0 0' }}>
                Daily sales performance across retail and bulk commercial buyers
              </p>
            </div>
            <span className="badge badge-emerald">Live Updates</span>
          </div>

          <div style={{ height: '260px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesTrendData}>
                <defs>
                  <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0f766e" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#0f766e" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={12}
                  tickFormatter={val => `₦${(val / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  formatter={(val: any) => [formatNGN(val), 'Revenue']}
                  contentStyle={{ background: '#0f172a', color: '#ffffff', borderRadius: '8px', border: 'none' }}
                />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#0f766e"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#salesGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Share Breakdown */}
        <div style={{
          background: '#ffffff',
          borderRadius: '18px',
          border: '1px solid #e2e8f0',
          padding: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
        }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: '0 0 4px 0' }}>
            Product Sales Share
          </h3>
          <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '0 0 16px 0' }}>
            Volume breakdown by department
          </p>

          <div style={{ height: '170px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
            {categoryChartData.map(cat => (
              <div key={cat.name} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#334155' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: cat.color }} />
                  {cat.name}
                </span>
                <strong style={{ color: '#0f172a' }}>{cat.value}%</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders Queue Table */}
      <div style={{
        background: '#ffffff',
        borderRadius: '18px',
        border: '1px solid #e2e8f0',
        padding: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
              Recent Order Fulfillment Queue
            </h3>
            <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '2px 0 0 0' }}>
              Pending logistics dispatch and verified transactions
            </p>
          </div>
          <button
            onClick={() => setActiveView('admin-orders')}
            style={{
              background: 'none',
              border: 'none',
              color: '#0f766e',
              fontWeight: 700,
              fontSize: '0.8rem',
              cursor: 'pointer'
            }}
          >
            View All Orders ({orders.length}) →
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1.5px solid #e2e8f0', textAlign: 'left', color: '#64748b', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '10px 12px' }}>Order #</th>
                <th style={{ padding: '10px 12px' }}>Customer</th>
                <th style={{ padding: '10px 12px' }}>Destination</th>
                <th style={{ padding: '10px 12px' }}>Amount (NGN)</th>
                <th style={{ padding: '10px 12px' }}>Status</th>
                <th style={{ padding: '10px 12px' }}>Carrier / Tracking</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(o => (
                <tr key={o.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px', fontWeight: 800, color: '#0f766e' }}>{o.orderNumber}</td>
                  <td style={{ padding: '12px', fontWeight: 600, color: '#0f172a' }}>{o.customerName}</td>
                  <td style={{ padding: '12px', color: '#475569' }}>{o.deliveryAddress.state}</td>
                  <td style={{ padding: '12px', fontWeight: 800, color: '#0f172a' }}>{formatNGN(o.totalAmount)}</td>
                  <td style={{ padding: '12px' }}>
                    <span className={`badge ${
                      o.orderStatus === 'delivered' ? 'badge-emerald' :
                      o.orderStatus === 'shipped' ? 'badge-blue' :
                      o.orderStatus === 'processing' ? 'badge-purple' : 'badge-amber'
                    }`}>
                      {o.orderStatus.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ padding: '12px', fontSize: '0.75rem', color: '#64748b' }}>
                    {o.carrierName || 'Fleet Dispatch'} ({o.trackingNumber || 'Pending'})
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
