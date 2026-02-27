'use client';

import { useState } from 'react';
import { Search, ChevronDown, CheckCircle, ChefHat, Bike, XCircle, AlertCircle, MapPin, Clock } from 'lucide-react';

type OrderStatus = 'Pending' | 'Confirmed' | 'Preparing' | 'Ready' | 'Completed' | 'Cancelled';
interface Order { id: string; customer: string; email: string; branch: string; mode: 'Delivery' | 'Pickup' | 'Dine-In'; items: string[]; total: string; status: OrderStatus; time: string; tableNo?: number; address?: string; }

const MOCK: Order[] = [
    { id: '#10482', customer: 'Ahmed Al Rashidi', email: 'ahmed@email.com', branch: 'Downtown',   mode: 'Delivery', items: ['Dear Box 16 Pcs', 'San Pellegrino x2'],                            total: 'AED 113', status: 'Pending',   time: '2 min ago',  address: '12 Al Wasl Rd, Dubai' },
    { id: '#10481', customer: 'Sara Nasser',       email: 'sara@email.com',  branch: 'Marina',     mode: 'Pickup',   items: ['Fusion VIP Moriwase 32 Pcs'],                                    total: 'AED 199', status: 'Confirmed', time: '8 min ago'  },
    { id: '#10480', customer: 'James Park',        email: 'james@email.com', branch: 'Motor City', mode: 'Dine-In',  items: ['Fire & Sea Box B 24 Pcs', 'Salmon Sashimi 5 Pcs', 'Red Bull x3'], total: 'AED 220', status: 'Preparing', time: '15 min ago', tableNo: 4 },
    { id: '#10479', customer: 'Lena Hoffman',      email: 'lena@email.com',  branch: 'Downtown',   mode: 'Delivery', items: ['Salmon Avocado Roll 8 Pcs', 'Water x2'],                         total: 'AED 63',  status: 'Ready',     time: '22 min ago', address: 'JBR The Walk' },
    { id: '#10478', customer: 'Mohammed Sultan',   email: 'mo@email.com',    branch: 'Marina',     mode: 'Delivery', items: ['Happy Box 16 Pcs'],                                              total: 'AED 99',  status: 'Completed', time: '35 min ago', address: 'Palm Jumeirah' },
    { id: '#10477', customer: 'Aisha Khalid',      email: 'aisha@email.com', branch: 'Downtown',   mode: 'Pickup',   items: ['Rainbow Dream Roll 8 Pcs', 'Pepsi x2'],                         total: 'AED 73',  status: 'Cancelled', time: '42 min ago' },
];

const PIPELINE: OrderStatus[] = ['Pending', 'Confirmed', 'Preparing', 'Ready', 'Completed'];
const NEXT: Partial<Record<OrderStatus, OrderStatus>> = { Pending: 'Confirmed', Confirmed: 'Preparing', Preparing: 'Ready', Ready: 'Completed' };
const NEXT_LABEL: Partial<Record<OrderStatus, string>> = { Pending: 'Confirm', Confirmed: 'Start Prep', Preparing: 'Mark Ready', Ready: 'Complete' };
const MODE_ICON: Record<string, string> = { Delivery: '🛵', Pickup: '🏠', 'Dine-In': '🍽️' };

const STATUS_CFG: Record<OrderStatus, { color: string; bg: string; border: string; icon: React.ReactNode; barColor: string }> = {
    Pending:   { color: '#fbbf24', bg: 'rgba(251,191,36,0.08)',   border: 'rgba(251,191,36,0.2)',   icon: <AlertCircle size={11} />, barColor: '#fbbf24' },
    Confirmed: { color: '#60a5fa', bg: 'rgba(96,165,250,0.08)',   border: 'rgba(96,165,250,0.2)',   icon: <CheckCircle size={11} />, barColor: '#60a5fa' },
    Preparing: { color: '#FF6A0C', bg: 'rgba(255,106,12,0.08)',   border: 'rgba(255,106,12,0.2)',   icon: <ChefHat    size={11} />, barColor: '#FF6A0C' },
    Ready:     { color: '#4ade80', bg: 'rgba(74,222,128,0.08)',   border: 'rgba(74,222,128,0.2)',   icon: <Bike       size={11} />, barColor: '#4ade80' },
    Completed: { color: '#6b7280', bg: 'rgba(107,114,128,0.08)',  border: 'rgba(107,114,128,0.2)',  icon: <CheckCircle size={11} />, barColor: '#6b7280' },
    Cancelled: { color: '#f87171', bg: 'rgba(248,113,113,0.08)',  border: 'rgba(248,113,113,0.2)',  icon: <XCircle    size={11} />, barColor: '#f87171' },
};

export default function AdminOrdersPage() {
    const [orders, setOrders]           = useState<Order[]>(MOCK);
    const [search, setSearch]           = useState('');
    const [filterStatus, setFilterStatus] = useState<OrderStatus | 'All'>('All');
    const [filterMode, setFilterMode]   = useState<'All' | string>('All');
    const [expandedId, setExpandedId]   = useState<string | null>(null);

    const advance = (id: string) => setOrders(prev => prev.map(o => o.id !== id ? o : NEXT[o.status] ? { ...o, status: NEXT[o.status]! } : o));
    const cancel  = (id: string) => setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'Cancelled' } : o));

    const filtered = orders.filter(o => {
        const q = search.toLowerCase();
        return (!q || o.id.toLowerCase().includes(q) || o.customer.toLowerCase().includes(q))
            && (filterStatus === 'All' || o.status === filterStatus)
            && (filterMode   === 'All' || o.mode   === filterMode);
    });

    const liveCount = orders.filter(o => ['Pending','Confirmed','Preparing','Ready'].includes(o.status)).length;

    return (
        <div style={{ maxWidth: 1200, fontFamily: '"DM Sans", system-ui, sans-serif' }}>

            {/* ── Header ── */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 28, animation: 'fadeUp 0.4s ease both' }}>
                <div>
                    <h2 style={{ fontSize: 26, fontWeight: 800, margin: '0 0 5px', letterSpacing: '-0.04em', color: '#fff' }}>
                        Orders
                    </h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                        <span style={{
                            width: 7, height: 7, borderRadius: '50%',
                            background: '#4ade80', boxShadow: '0 0 7px rgba(74,222,128,0.9)',
                            display: 'inline-block', animation: 'pulse 2s infinite',
                        }} />
                        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>
                            {liveCount} active order{liveCount !== 1 ? 's' : ''} right now
                        </span>
                    </div>
                </div>
            </div>

            {/* ── Pipeline summary pills ── */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginBottom: 20 }}>
                {PIPELINE.map((s, i) => {
                    const count  = orders.filter(o => o.status === s).length;
                    const cfg    = STATUS_CFG[s];
                    const active = filterStatus === s;
                    return (
                        <button
                            key={s}
                            onClick={() => setFilterStatus(active ? 'All' : s)}
                            style={{
                                padding: '16px 18px',
                                borderRadius: 14,
                                border: active ? `1px solid ${cfg.border}` : '1px solid rgba(255,255,255,0.06)',
                                background: active ? cfg.bg : 'rgba(255,255,255,0.03)',
                                textAlign: 'left',
                                cursor: 'pointer',
                                transition: 'all 0.18s',
                                animation: `fadeUp 0.4s ease both`,
                                animationDelay: `${i * 0.06}s`,
                                position: 'relative',
                                overflow: 'hidden',
                            }}
                            onMouseEnter={e => {
                                if (!active) {
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                                }
                            }}
                            onMouseLeave={e => {
                                if (!active) {
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                                }
                            }}
                        >
                            {/* Top color bar */}
                            <div style={{
                                position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                                background: active ? cfg.barColor : 'transparent',
                                boxShadow: active ? `0 0 8px ${cfg.barColor}` : 'none',
                                transition: 'all 0.18s',
                            }} />
                            <p style={{ fontSize: 26, fontWeight: 900, color: '#fff', margin: '0 0 6px', letterSpacing: '-0.04em' }}>
                                {count}
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: cfg.color, fontSize: 11, fontWeight: 700 }}>
                                {cfg.icon} {s}
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* ── Filters ── */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 18, flexWrap: 'wrap' }}>
                {/* Search */}
                <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
                    <Search size={13} style={{
                        position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
                        color: 'rgba(255,255,255,0.2)', pointerEvents: 'none',
                    }} />
                    <input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search by ID or customer…"
                        style={{
                            width: '100%', boxSizing: 'border-box',
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.07)',
                            borderRadius: 10, padding: '9px 12px 9px 34px',
                            fontSize: 13, color: '#fff',
                            outline: 'none', fontFamily: 'inherit',
                            transition: 'border-color 0.2s',
                        }}
                        onFocus={e => (e.currentTarget.style.borderColor = 'rgba(255,106,12,0.4)')}
                        onBlur={e  => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)')}
                    />
                </div>

                {/* Mode filter */}
                <select
                    value={filterMode}
                    onChange={e => setFilterMode(e.target.value)}
                    style={{
                        appearance: 'none',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.07)',
                        color: 'rgba(255,255,255,0.5)',
                        borderRadius: 10, padding: '9px 16px',
                        fontSize: 13, outline: 'none', cursor: 'pointer',
                        fontFamily: 'inherit',
                    }}
                >
                    <option value="All">All Modes</option>
                    <option value="Delivery">🛵 Delivery</option>
                    <option value="Pickup">🏠 Pickup</option>
                    <option value="Dine-In">🍽️ Dine-In</option>
                </select>
            </div>

            {/* ── Order rows ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {filtered.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '64px 0', color: 'rgba(255,255,255,0.15)', fontSize: 14 }}>
                        No orders found.
                    </div>
                )}

                {filtered.map((order, i) => {
                    const cfg      = STATUS_CFG[order.status];
                    const expanded = expandedId === order.id;

                    return (
                        <div
                            key={order.id}
                            style={{
                                background: 'rgba(255,255,255,0.03)',
                                border: `1px solid ${expanded ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.06)'}`,
                                borderRadius: 16,
                                overflow: 'hidden',
                                transition: 'border-color 0.18s',
                                animation: `fadeUp 0.4s ease both`,
                                animationDelay: `${i * 0.05}s`,
                            }}
                            onMouseEnter={e => {
                                if (!expanded) (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)';
                            }}
                            onMouseLeave={e => {
                                if (!expanded) (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)';
                            }}
                        >
                            {/* Colored status bar at top */}
                            <div style={{
                                height: 2,
                                background: cfg.barColor,
                                opacity: 0.7,
                                boxShadow: `0 0 8px ${cfg.barColor}66`,
                            }} />

                            {/* Main row */}
                            <div
                                style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 20px', cursor: 'pointer' }}
                                onClick={() => setExpandedId(expanded ? null : order.id)}
                            >
                                {/* Mode icon tile */}
                                <div style={{
                                    width: 40, height: 40, borderRadius: 11, flexShrink: 0,
                                    background: 'rgba(255,106,12,0.08)',
                                    border: '1px solid rgba(255,106,12,0.15)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: 18,
                                }}>
                                    {MODE_ICON[order.mode]}
                                </div>

                                {/* 4-column grid */}
                                <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 0.8fr', gap: 16, minWidth: 0 }}>

                                    {/* Customer */}
                                    <div>
                                        <p style={{ fontSize: 11, fontFamily: 'monospace', color: '#FF6A0C', fontWeight: 700, margin: '0 0 2px' }}>
                                            {order.id}
                                        </p>
                                        <p style={{ fontSize: 13, fontWeight: 700, color: '#fff', margin: '0 0 1px', letterSpacing: '-0.01em' }}>
                                            {order.customer}
                                        </p>
                                        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.22)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {order.email}
                                        </p>
                                    </div>

                                    {/* Branch */}
                                    <div>
                                        <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', margin: '0 0 3px', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>
                                            Branch
                                        </p>
                                        <p style={{ fontSize: 13, fontWeight: 600, color: '#fff', margin: '0 0 2px' }}>{order.branch}</p>
                                        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', margin: 0 }}>
                                            {MODE_ICON[order.mode]} {order.mode}
                                            {order.tableNo ? ` · Table ${order.tableNo}` : ''}
                                        </p>
                                    </div>

                                    {/* Items */}
                                    <div>
                                        <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', margin: '0 0 3px', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>
                                            Items
                                        </p>
                                        <p style={{ fontSize: 13, fontWeight: 600, color: '#fff', margin: '0 0 2px' }}>
                                            {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                                        </p>
                                        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', margin: 0, display: 'flex', alignItems: 'center', gap: 3 }}>
                                            <Clock size={10} /> {order.time}
                                        </p>
                                    </div>

                                    {/* Total + status */}
                                    <div>
                                        <p style={{ fontSize: 15, fontWeight: 800, color: '#fff', margin: '0 0 6px', letterSpacing: '-0.03em' }}>
                                            {order.total}
                                        </p>
                                        <div style={{
                                            display: 'inline-flex', alignItems: 'center', gap: 4,
                                            fontSize: 10, fontWeight: 700,
                                            color: cfg.color,
                                            background: cfg.bg,
                                            border: `1px solid ${cfg.border}`,
                                            borderRadius: 20, padding: '3px 8px',
                                            letterSpacing: '0.03em',
                                        }}>
                                            {cfg.icon} {order.status}
                                        </div>
                                    </div>
                                </div>

                                {/* Expand chevron */}
                                <ChevronDown
                                    size={15}
                                    style={{
                                        color: 'rgba(255,255,255,0.2)',
                                        flexShrink: 0,
                                        transition: 'transform 0.2s',
                                        transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                                    }}
                                />
                            </div>

                            {/* ── Expanded detail panel ── */}
                            {expanded && (
                                <div style={{
                                    padding: '0 20px 20px',
                                    borderTop: '1px solid rgba(255,255,255,0.05)',
                                }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: order.address ? '1fr 1fr' : '1fr', gap: 20, paddingTop: 18 }}>

                                        {/* Items list */}
                                        <div>
                                            <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 800 }}>
                                                Order Items
                                            </p>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                                {order.items.map((item, idx) => (
                                                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                                        <span style={{
                                                            width: 5, height: 5, borderRadius: '50%', flexShrink: 0,
                                                            background: '#FF6A0C',
                                                            boxShadow: '0 0 4px rgba(255,106,12,0.6)',
                                                        }} />
                                                        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)' }}>{item}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Address */}
                                        {order.address && (
                                            <div>
                                                <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 800 }}>
                                                    Delivery Address
                                                </p>
                                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                                                    <div style={{
                                                        width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                                                        background: 'rgba(255,106,12,0.1)',
                                                        border: '1px solid rgba(255,106,12,0.2)',
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    }}>
                                                        <MapPin size={13} style={{ color: '#FF6A0C' }} />
                                                    </div>
                                                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', margin: 0, lineHeight: 1.5 }}>
                                                        {order.address}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Action buttons */}
                                    <div style={{ display: 'flex', gap: 8, marginTop: 18, alignItems: 'center' }}>
                                        {NEXT[order.status] && (
                                            <button
                                                onClick={() => advance(order.id)}
                                                style={{
                                                    height: 36, padding: '0 18px',
                                                    background: 'linear-gradient(135deg, #FF6A0C, #e55a00)',
                                                    border: 'none', borderRadius: 9,
                                                    color: '#fff', fontSize: 12, fontWeight: 700,
                                                    cursor: 'pointer', letterSpacing: '0.02em',
                                                    boxShadow: '0 4px 14px rgba(255,106,12,0.35)',
                                                    display: 'flex', alignItems: 'center', gap: 6,
                                                    transition: 'transform 0.15s, box-shadow 0.15s',
                                                    fontFamily: 'inherit',
                                                }}
                                                onMouseEnter={e => {
                                                    e.currentTarget.style.transform = 'translateY(-1px)';
                                                    e.currentTarget.style.boxShadow = '0 6px 18px rgba(255,106,12,0.45)';
                                                }}
                                                onMouseLeave={e => {
                                                    e.currentTarget.style.transform = 'translateY(0)';
                                                    e.currentTarget.style.boxShadow = '0 4px 14px rgba(255,106,12,0.35)';
                                                }}
                                            >
                                                {NEXT_LABEL[order.status]}
                                            </button>
                                        )}

                                        {!['Completed', 'Cancelled'].includes(order.status) && (
                                            <button
                                                onClick={() => cancel(order.id)}
                                                style={{
                                                    height: 36, padding: '0 16px',
                                                    background: 'rgba(248,113,113,0.07)',
                                                    border: '1px solid rgba(248,113,113,0.2)',
                                                    borderRadius: 9,
                                                    color: '#f87171', fontSize: 12, fontWeight: 700,
                                                    cursor: 'pointer', letterSpacing: '0.02em',
                                                    display: 'flex', alignItems: 'center', gap: 6,
                                                    transition: 'background 0.15s, border-color 0.15s',
                                                    fontFamily: 'inherit',
                                                }}
                                                onMouseEnter={e => {
                                                    e.currentTarget.style.background = 'rgba(248,113,113,0.12)';
                                                    e.currentTarget.style.borderColor = 'rgba(248,113,113,0.35)';
                                                }}
                                                onMouseLeave={e => {
                                                    e.currentTarget.style.background = 'rgba(248,113,113,0.07)';
                                                    e.currentTarget.style.borderColor = 'rgba(248,113,113,0.2)';
                                                }}
                                            >
                                                <XCircle size={12} /> Cancel Order
                                            </button>
                                        )}

                                        {order.status === 'Completed' && (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#4ade80', fontWeight: 700 }}>
                                                <CheckCircle size={13} /> Order Completed
                                            </div>
                                        )}
                                        {order.status === 'Cancelled' && (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#f87171', fontWeight: 700 }}>
                                                <XCircle size={13} /> Order Cancelled
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap');
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(10px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50%       { opacity: 0.35; }
                }
                input::placeholder { color: rgba(255,255,255,0.15) !important; }
                select option { background: #1a1a22; color: #fff; }
            `}</style>
        </div>
    );
}