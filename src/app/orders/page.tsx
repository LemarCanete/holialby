'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Package, ArrowLeft, ChevronLeft } from 'lucide-react';

const orders = [
    { id: 'HOL-2026-00847', event: '💍 חתונה', names: 'שרה ודוד', photos: 48, status: 'awaiting_approval', statusLabel: 'תצוגה מקדימה מוכנה', date: '5 מרץ, 2026', price: '$79', steps: [true, true, true, false, false, false, false] },
    { id: 'HOL-2026-00832', event: '✈️ חופשה', names: 'טיול איטליה 2025', photos: 32, status: 'shipped', statusLabel: 'נשלח', date: '10 פבר׳, 2026', price: '$49', steps: [true, true, true, true, true, true, false] },
    { id: 'HOL-2026-00801', event: '🎂 יום הולדת', names: 'יום הולדת 60 לאמא', photos: 22, status: 'delivered', statusLabel: 'נמסר', date: '14 ינו׳, 2026', price: '$49', steps: [true, true, true, true, true, true, true] },
];

const stepLabels = ['הוזמן', 'הועלה', 'בעיצוב', 'תצוגה', 'אושר', 'במשלוח', 'נמסר'];

const statusColors: Record<string, { bg: string; color: string }> = {
    awaiting_approval: { bg: 'rgba(59,130,246,0.12)', color: '#2563eb' },
    shipped: { bg: 'rgba(34,197,94,0.12)', color: '#16a34a' },
    delivered: { bg: 'rgba(34,197,94,0.18)', color: '#15803d' },
};

export default function OrdersPage() {
    return (
        <div dir="rtl" style={{ background: 'var(--cream)', minHeight: '100vh' }}>
            <nav className="glass px-4 sm:px-6 py-3 sm:py-4" style={{ borderBottom: '1px solid rgba(255,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
                <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
                    <div className="w-7 h-7 rounded-full brand-gradient flex items-center justify-center">
                        <BookOpen size={13} className="text-white" />
                    </div>
                    <span className="font-bold" style={{ fontFamily: 'Heebo, sans-serif', color: 'var(--dark)' }}>Holialby</span>
                </Link>
                <div className="flex items-center gap-3">
                    <Link href="/order/new" className="btn-primary" style={{ fontSize: 13, padding: '10px 22px' }}>
                        + אלבום חדש
                    </Link>
                </div>
            </nav>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-14">
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: 'Heebo, sans-serif' }}>ההזמנות שלי</h1>
                        <p style={{ color: 'var(--text-muted)', marginTop: 4, fontSize: 15 }}>עקבו אחרי האלבומים שלכם מהיצירה ועד המשלוח</p>
                    </div>
                </div>

                <div className="space-y-6">
                    {orders.map((order, i) => {
                        const sc = statusColors[order.status] || { bg: 'rgba(0,0,0,0.06)', color: 'var(--text-muted)' };
                        return (
                            <motion.div key={order.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                                className="rounded-2xl overflow-hidden" style={{ background: 'white', border: '1px solid rgba(255,0,0,0.15)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                                <div className="p-4 sm:p-6">
                                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-0 mb-5">
                                        <div className="flex items-center gap-3 sm:gap-4">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl brand-gradient flex items-center justify-center text-xl sm:text-2xl shadow-md flex-shrink-0">
                                                {order.event.split(' ')[0]}
                                            </div>
                                            <div className="min-w-0">
                                                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1">
                                                    <p className="font-bold" style={{ color: 'var(--dark)', fontSize: 16 }}>{order.names}</p>
                                                    <span style={{ background: sc.bg, color: sc.color, padding: '3px 10px', borderRadius: 99, fontSize: 11, fontWeight: 600 }}>{order.statusLabel}</span>
                                                </div>
                                                <p className="text-xs sm:text-sm" style={{ color: 'var(--text-muted)' }}>
                                                    {order.id} · {order.photos} תמונות · {order.price} · {order.date}
                                                </p>
                                            </div>
                                        </div>
                                        <Link href="/order/preview" className="flex-shrink-0 self-start sm:self-auto" style={{ display: 'flex', alignItems: 'center', gap: 4, textDecoration: 'none', color: 'var(--primary)', fontSize: 13, fontWeight: 600, background: 'rgba(255,0,0,0.08)', padding: '8px 16px', borderRadius: 99, border: '1px solid rgba(255,0,0,0.25)' }}>
                                            {order.status === 'awaiting_approval' ? 'סקירת אלבום' : 'צפייה בפרטים'}
                                            <ChevronLeft size={13} />
                                        </Link>
                                    </div>

                                    {/* ציר זמן שלבים */}
                                    <div className="flex items-center gap-1 overflow-x-auto pb-1" style={{ direction: 'ltr' }}>
                                        {stepLabels.map((label, si) => (
                                            <div key={label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, minWidth: 44 }}>
                                                <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                                                    <div style={{
                                                        width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                                                        background: order.steps[si] ? 'linear-gradient(135deg, var(--primary-dark), var(--primary))' : 'var(--cream)',
                                                        border: `2px solid ${order.steps[si] ? 'var(--primary)' : 'rgba(255,0,0,0.25)'}`,
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                        fontSize: 10, color: 'white', fontWeight: 700
                                                    }}>
                                                        {order.steps[si] ? '✓' : si + 1}
                                                    </div>
                                                    {si < stepLabels.length - 1 && (
                                                        <div style={{ flex: 1, height: 2, background: order.steps[si] && order.steps[si + 1] ? 'linear-gradient(90deg, var(--primary), var(--primary-dark))' : order.steps[si] ? 'linear-gradient(90deg, var(--primary), rgba(255,0,0,0.2))' : 'rgba(255,0,0,0.15)' }} />
                                                    )}
                                                </div>
                                                <p style={{ fontSize: 10, color: order.steps[si] ? 'var(--primary-dark)' : 'var(--text-muted)', fontWeight: order.steps[si] ? 600 : 400, textAlign: 'center', lineHeight: 1.2 }}>{label}</p>
                                            </div>
                                        ))}
                                    </div>

                                    {order.status === 'awaiting_approval' && (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 rounded-lg px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0" style={{ background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.2)' }}>
                                            <p style={{ color: '#2563eb', fontSize: 13, fontWeight: 500 }}>🎉 התצוגה המקדימה של האלבום מוכנה! בדקו ואשרו להדפסה.</p>
                                            <Link href="/order/preview" style={{ display: 'flex', alignItems: 'center', gap: 4, textDecoration: 'none', color: '#2563eb', fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap' }}>
                                                סקירה עכשיו <ArrowLeft size={13} />
                                            </Link>
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* קריאה לפעולה בתחתית */}
                <div className="mt-10 rounded-2xl p-8 text-center" style={{ background: 'white', border: '1px dashed rgba(255,0,0,0.3)' }}>
                    <div className="w-12 h-12 rounded-full brand-gradient flex items-center justify-center mx-auto mb-4">
                        <Package size={22} className="text-white" />
                    </div>
                    <p className="font-semibold mb-2" style={{ fontFamily: 'Heebo, sans-serif', fontSize: 18 }}>יצירת אלבום נוסף</p>
                    <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 16 }}>הפכו עוד זכרונות לאלבומים מודפסים ומעוצבים</p>
                    <Link href="/order/new" className="btn-primary" style={{ fontSize: 14, padding: '12px 32px' }}>
                        התחלת אלבום חדש <ArrowLeft size={14} />
                    </Link>
                </div>
            </div>
        </div>
    );
}
