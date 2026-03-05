'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Package, Clock, CheckCircle, TrendingUp, Eye, Filter, Search } from 'lucide-react';

const stats = [
    { label: 'Total Orders', value: '284', change: '+12 this week', icon: <Package size={20} />, color: 'var(--primary)' },
    { label: 'Revenue', value: '$22,840', change: '+18% vs last month', icon: <TrendingUp size={20} />, color: '#22c55e' },
    { label: 'Pending Review', value: '7', change: 'Awaiting approval', icon: <Clock size={20} />, color: '#f59e0b' },
    { label: 'Delivered', value: '251', change: '88% success rate', icon: <CheckCircle size={20} />, color: '#3b82f6' },
];

const orders = [
    { id: 'HOL-2026-00847', customer: 'Sarah M.', event: '💍 Wedding', photos: 48, status: 'Awaiting Approval', date: 'Mar 5, 2026', price: '$79' },
    { id: 'HOL-2026-00846', customer: 'David K.', event: '✈️ Holiday', photos: 32, status: 'Generating', date: 'Mar 5, 2026', price: '$49' },
    { id: 'HOL-2026-00845', customer: 'Rachel L.', event: '🎂 Birthday', photos: 56, status: 'Printing', date: 'Mar 4, 2026', price: '$119' },
    { id: 'HOL-2026-00844', customer: 'Tom A.', event: '🎓 Graduation', photos: 24, status: 'Shipped', date: 'Mar 3, 2026', price: '$49' },
    { id: 'HOL-2026-00843', customer: 'Anna B.', event: '❤️ Anniversary', photos: 40, status: 'Delivered', date: 'Mar 2, 2026', price: '$79' },
    { id: 'HOL-2026-00842', customer: 'Michael C.', event: '💍 Wedding', photos: 72, status: 'Delivered', date: 'Mar 1, 2026', price: '$119' },
    { id: 'HOL-2026-00841', customer: 'Leila D.', event: '🕍 Bar Mitzvah', photos: 44, status: 'Photos Uploaded', date: 'Feb 28, 2026', price: '$79' },
];

const statusColors: Record<string, { bg: string; color: string }> = {
    'Photos Uploaded': { bg: 'rgba(100,116,139,0.15)', color: '#64748B' },
    'Generating': { bg: 'rgba(245,158,11,0.15)', color: '#d97706' },
    'Awaiting Approval': { bg: 'rgba(59,130,246,0.15)', color: '#2563eb' },
    'Printing': { bg: 'rgba(168,85,247,0.15)', color: '#9333ea' },
    'Shipped': { bg: 'rgba(34,197,94,0.15)', color: '#16a34a' },
    'Delivered': { bg: 'rgba(34,197,94,0.2)', color: '#15803d' },
};

export default function AdminPage() {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all');

    const filtered = orders.filter(o => {
        const matchSearch = o.customer.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase());
        const matchFilter = filter === 'all' || o.status.toLowerCase().includes(filter.toLowerCase());
        return matchSearch && matchFilter;
    });

    return (
        <div style={{ background: '#0F0B07', minHeight: '100vh', color: 'white' }}>
            {/* Sidebar */}
            <div style={{ display: 'flex' }}>
                <aside style={{ width: 220, background: '#16120A', borderRight: '1px solid rgba(255,0,0,0.12)', minHeight: '100vh', padding: '24px 16px', flexShrink: 0, position: 'fixed', top: 0, bottom: 0, overflowY: 'auto' }}>
                    <div className="flex items-center gap-2 mb-10">
                        <div className="w-8 h-8 rounded-full brand-gradient flex items-center justify-center">
                            <BookOpen size={15} className="text-white" />
                        </div>
                        <div>
                            <p className="font-bold" style={{ fontFamily: 'Playfair Display, serif', color: 'white', fontSize: 15 }}>Holialby</p>
                            <p style={{ fontSize: 10, color: 'var(--primary)', letterSpacing: 1 }}>ADMIN PANEL</p>
                        </div>
                    </div>

                    {['Dashboard', 'Orders', 'Albums', 'Customers', 'Analytics', 'Settings'].map((item, i) => (
                        <div key={item} style={{
                            padding: '10px 12px', borderRadius: 8, marginBottom: 4, cursor: 'pointer',
                            background: i === 0 ? 'rgba(255,0,0,0.15)' : 'transparent',
                            color: i === 0 ? 'var(--primary)' : 'rgba(255,255,255,0.4)',
                            fontWeight: i === 0 ? 600 : 400, fontSize: 14
                        }}>
                            {item}
                        </div>
                    ))}

                    <div className="mt-auto pt-20">
                        <Link href="/" style={{ display: 'block', padding: '10px 12px', borderRadius: 8, color: 'rgba(255,255,255,0.3)', fontSize: 13, textDecoration: 'none' }}>
                            ← Back to site
                        </Link>
                    </div>
                </aside>

                {/* Main content */}
                <main style={{ marginLeft: 220, flex: 1, padding: '32px 32px' }}>
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-2xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>Dashboard</h1>
                            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, marginTop: 2 }}>Thursday, March 5, 2026</p>
                        </div>
                        <Link href="/order/new" className="btn-primary" style={{ fontSize: 13, padding: '10px 24px' }}>
                            + New Order
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
                        {stats.map((stat) => (
                            <motion.div key={stat.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl p-5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                                <div className="flex items-center justify-between mb-4">
                                    <div style={{ color: stat.color }}>{stat.icon}</div>
                                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.05)', padding: '3px 8px', borderRadius: 99 }}>MTD</span>
                                </div>
                                <p className="text-2xl font-bold mb-1" style={{ color: 'white' }}>{stat.value}</p>
                                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{stat.label}</p>
                                <p style={{ fontSize: 11, color: stat.color, marginTop: 4 }}>{stat.change}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Orders Table */}
                    <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                        <div className="flex items-center justify-between p-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                            <h2 className="text-lg font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>Recent Orders</h2>
                            <div className="flex items-center gap-3">
                                {/* Search */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '8px 12px' }}>
                                    <Search size={14} style={{ color: 'rgba(255,255,255,0.3)' }} />
                                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search orders..." style={{ background: 'none', border: 'none', outline: 'none', color: 'white', fontSize: 13, width: 150 }} />
                                </div>
                                {/* Filter */}
                                <select value={filter} onChange={e => setFilter(e.target.value)} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '8px 12px', color: 'white', fontSize: 13, outline: 'none', cursor: 'pointer' }}>
                                    <option value="all">All Status</option>
                                    <option value="approval">Awaiting Approval</option>
                                    <option value="generating">Generating</option>
                                    <option value="printing">Printing</option>
                                    <option value="shipped">Shipped</option>
                                    <option value="delivered">Delivered</option>
                                </select>
                            </div>
                        </div>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                    {['Order ID', 'Customer', 'Event', 'Photos', 'Status', 'Date', 'Price', ''].map(h => (
                                        <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, color: 'rgba(255,255,255,0.3)', fontWeight: 600, letterSpacing: 0.5 }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((order, i) => {
                                    const sc = statusColors[order.status] || { bg: 'rgba(255,255,255,0.08)', color: 'white' };
                                    return (
                                        <motion.tr key={order.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', cursor: 'pointer' }} className="hover:bg-white/5">
                                            <td style={{ padding: '14px 16px', fontSize: 13, color: 'var(--primary-light)' }}>{order.id}</td>
                                            <td style={{ padding: '14px 16px', fontSize: 13, fontWeight: 500 }}>{order.customer}</td>
                                            <td style={{ padding: '14px 16px', fontSize: 13 }}>{order.event}</td>
                                            <td style={{ padding: '14px 16px', fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{order.photos}</td>
                                            <td style={{ padding: '14px 16px' }}>
                                                <span style={{ background: sc.bg, color: sc.color, padding: '4px 10px', borderRadius: 99, fontSize: 12, fontWeight: 600 }}>{order.status}</span>
                                            </td>
                                            <td style={{ padding: '14px 16px', fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>{order.date}</td>
                                            <td style={{ padding: '14px 16px', fontSize: 13, fontWeight: 600, color: 'var(--primary)' }}>{order.price}</td>
                                            <td style={{ padding: '14px 16px' }}>
                                                <Link href="/order/preview" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--primary)', textDecoration: 'none', background: 'rgba(255,0,0,0.1)', padding: '5px 12px', borderRadius: 99, border: '1px solid rgba(255,0,0,0.25)' }}>
                                                    <Eye size={12} /> View
                                                </Link>
                                            </td>
                                        </motion.tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        {filtered.length === 0 && (
                            <div style={{ padding: 40, textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: 14 }}>No orders found</div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
