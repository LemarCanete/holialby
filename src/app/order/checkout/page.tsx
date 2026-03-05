'use client';

import Link from 'next/link';
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { BookOpen, ArrowRight, ArrowLeft, CreditCard, Lock, Check, ShieldCheck } from 'lucide-react';

const albumSizes: Record<string, { name: string; photos: string; pages: string; price: number }> = {
    small: { name: 'Essential', photos: '20–30', pages: '~20', price: 49 },
    medium: { name: 'Classic', photos: '30–50', pages: '~35', price: 79 },
    large: { name: 'Deluxe', photos: '50–80', pages: '~55', price: 119 },
};

function CheckoutPageContent() {
    const params = useSearchParams();
    const event = params.get('event') || 'wedding';
    const photos = parseInt(params.get('photos') || '35');
    const theme = params.get('theme') || 'elegant';
    const names = params.get('names') || 'האלבום שלך';
    const [loading, setLoading] = useState(false);
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvc, setCvc] = useState('');

    // Auto-determine album size from photo count
    const size = photos <= 30 ? 'small' : photos <= 50 ? 'medium' : 'large';
    const album = albumSizes[size];

    const formatCard = (val: string) => {
        const digits = val.replace(/\D/g, '').slice(0, 16);
        return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
    };

    const formatExpiry = (val: string) => {
        const digits = val.replace(/\D/g, '').slice(0, 4);
        if (digits.length > 2) return digits.slice(0, 2) + '/' + digits.slice(2);
        return digits;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            window.location.href = `/order/preview?event=${event}&photos=${photos}&theme=${theme}&names=${encodeURIComponent(names)}`;
        }, 2000);
    };

    const eventLabels: Record<string, string> = {
        wedding: 'חתונה', birthday: 'יום הולדת', holiday: 'חופשה / טיול',
        'bar-mitzvah': 'בר / בת מצווה', graduation: 'סיום לימודים', anniversary: 'יום נישואין',
        christening: 'ברית / הטבלה', baby: 'שנה ראשונה לתינוק',
    };

    const inputStyle = {
        width: '100%',
        background: 'white',
        border: '1px solid #E0E0E0',
        borderRadius: 8,
        padding: '13px 16px',
        color: 'var(--dark)',
        fontSize: 15,
        outline: 'none',
        fontFamily: "'Open Sans', sans-serif",
        boxSizing: 'border-box' as const,
        transition: 'border-color 0.2s',
        textAlign: 'right' as const,
    };

    return (
        <div dir="rtl" style={{ background: 'var(--cream)', minHeight: '100vh' }}>
            <header className="glass px-3 sm:px-6 py-3 sm:py-4" style={{ borderBottom: '1px solid rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
                <Link href={`/order/customize?event=${event}`} style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', flexShrink: 0 }}>
                    <ArrowRight size={16} style={{ color: 'var(--text-muted)' }} className="hidden sm:block" />
                    <div className="w-7 h-7 rounded-full brand-gradient flex items-center justify-center">
                        <BookOpen size={13} className="text-white" />
                    </div>
                    <span className="font-bold hidden sm:inline" style={{ fontFamily: "'Heebo', sans-serif", color: 'var(--dark)' }}>Holialby</span>
                </Link>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    {['אירוע', 'העלאה', 'התאמה', 'תשלום', 'תצוגה'].map((step, i) => (
                        <div key={step} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                            <div style={{
                                width: 24, height: 24, borderRadius: '50%',
                                background: i < 3 ? '#22c55e' : i === 3 ? 'var(--dark)' : 'white',
                                border: `2px solid ${i <= 3 ? 'var(--dark)' : '#E0E0E0'}`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: 10, fontWeight: 700, color: i <= 3 ? 'white' : 'var(--text-muted)'
                            }}>
                                {i < 3 ? '✓' : i + 1}
                            </div>
                            <span style={{ fontSize: 12, color: i === 3 ? 'var(--dark)' : 'var(--text-muted)', fontWeight: i === 3 ? 600 : 400 }} className="hidden md:block">{step}</span>
                            {i < 4 && <div style={{ width: 16, height: 1, background: '#E0E0E0' }} className="hidden sm:block" />}
                        </div>
                    ))}
                </div>
                <div className="hidden sm:block" style={{ width: 80 }} />
            </header>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
                <div className="text-center mb-10">
                    <div className="section-tag" style={{ display: 'inline-flex', marginBottom: 12 }}>שלב 4 מתוך 5</div>
                    <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ fontFamily: "'Heebo', sans-serif" }}>השלם את ההזמנה</h1>
                    <p style={{ color: 'var(--text-muted)' }}>תשלום מאובטח באמצעות Stripe</p>
                </div>

                <div className="grid lg:grid-cols-5 gap-10">
                    {/* RIGHT: Payment Form (in RTL this is the start side) */}
                    <div className="lg:col-span-3">
                        <form onSubmit={handleSubmit}>
                            <div className="rounded-2xl p-6 mb-6" style={{ background: 'white', border: '1px solid #E0E0E0' }}>
                                <div className="flex items-center gap-3 mb-6">
                                    <CreditCard size={20} style={{ color: 'var(--primary)' }} />
                                    <h2 className="text-lg font-bold" style={{ fontFamily: "'Heebo', sans-serif" }}>פרטי תשלום</h2>
                                    <div className="mr-auto flex items-center gap-1" style={{ color: '#22c55e', fontSize: 12, fontWeight: 600 }}>
                                        <Lock size={12} /> מאובטח
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--dark)', display: 'block', marginBottom: 8 }}>אימייל</label>
                                        <input type="email" placeholder="you@example.com" defaultValue="sarah@example.com" style={inputStyle}
                                            onFocus={e => e.target.style.borderColor = 'var(--dark)'}
                                            onBlur={e => e.target.style.borderColor = '#E0E0E0'} />
                                    </div>
                                    <div>
                                        <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--dark)', display: 'block', marginBottom: 8 }}>מספר כרטיס</label>
                                        <input type="text" placeholder="4242 4242 4242 4242" value={cardNumber}
                                            onChange={e => setCardNumber(formatCard(e.target.value))}
                                            style={inputStyle}
                                            onFocus={e => e.target.style.borderColor = 'var(--dark)'}
                                            onBlur={e => e.target.style.borderColor = '#E0E0E0'} />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--dark)', display: 'block', marginBottom: 8 }}>תוקף</label>
                                            <input type="text" placeholder="MM/YY" value={expiry}
                                                onChange={e => setExpiry(formatExpiry(e.target.value))}
                                                style={inputStyle}
                                                onFocus={e => e.target.style.borderColor = 'var(--dark)'}
                                                onBlur={e => e.target.style.borderColor = '#E0E0E0'} />
                                        </div>
                                        <div>
                                            <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--dark)', display: 'block', marginBottom: 8 }}>CVC</label>
                                            <input type="text" placeholder="123" value={cvc}
                                                onChange={e => setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                                                style={inputStyle}
                                                onFocus={e => e.target.style.borderColor = 'var(--dark)'}
                                                onBlur={e => e.target.style.borderColor = '#E0E0E0'} />
                                        </div>
                                    </div>
                                    <div>
                                        <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--dark)', display: 'block', marginBottom: 8 }}>שם בעל הכרטיס</label>
                                        <input type="text" placeholder="שם מלא כפי שמופיע על הכרטיס" style={inputStyle}
                                            onFocus={e => e.target.style.borderColor = 'var(--dark)'}
                                            onBlur={e => e.target.style.borderColor = '#E0E0E0'} />
                                    </div>
                                </div>
                            </div>

                            {/* Shipping */}
                            <div className="rounded-2xl p-6 mb-6" style={{ background: 'white', border: '1px solid #E0E0E0' }}>
                                <h2 className="text-lg font-bold mb-5" style={{ fontFamily: "'Heebo', sans-serif" }}>כתובת למשלוח</h2>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--dark)', display: 'block', marginBottom: 8 }}>שם פרטי</label>
                                            <input type="text" placeholder="שרה" style={inputStyle}
                                                onFocus={e => e.target.style.borderColor = 'var(--dark)'}
                                                onBlur={e => e.target.style.borderColor = '#E0E0E0'} />
                                        </div>
                                        <div>
                                            <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--dark)', display: 'block', marginBottom: 8 }}>שם משפחה</label>
                                            <input type="text" placeholder="כהן" style={inputStyle}
                                                onFocus={e => e.target.style.borderColor = 'var(--dark)'}
                                                onBlur={e => e.target.style.borderColor = '#E0E0E0'} />
                                        </div>
                                    </div>
                                    <div>
                                        <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--dark)', display: 'block', marginBottom: 8 }}>כתובת</label>
                                        <input type="text" placeholder="רחוב הרצל 12, דירה 4" style={inputStyle}
                                            onFocus={e => e.target.style.borderColor = 'var(--dark)'}
                                            onBlur={e => e.target.style.borderColor = '#E0E0E0'} />
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div>
                                            <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--dark)', display: 'block', marginBottom: 8 }}>עיר</label>
                                            <input type="text" placeholder="תל אביב" style={inputStyle}
                                                onFocus={e => e.target.style.borderColor = 'var(--dark)'}
                                                onBlur={e => e.target.style.borderColor = '#E0E0E0'} />
                                        </div>
                                        <div>
                                            <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--dark)', display: 'block', marginBottom: 8 }}>מחוז</label>
                                            <input type="text" placeholder="מרכז" style={inputStyle}
                                                onFocus={e => e.target.style.borderColor = 'var(--dark)'}
                                                onBlur={e => e.target.style.borderColor = '#E0E0E0'} />
                                        </div>
                                        <div>
                                            <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--dark)', display: 'block', marginBottom: 8 }}>מיקוד</label>
                                            <input type="text" placeholder="6100000" style={inputStyle}
                                                onFocus={e => e.target.style.borderColor = 'var(--dark)'}
                                                onBlur={e => e.target.style.borderColor = '#E0E0E0'} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button type="submit" disabled={loading} className="btn-primary w-full justify-center"
                                style={{ display: 'flex', width: '100%', fontSize: 16, padding: '16px', opacity: loading ? 0.7 : 1 }}>
                                {loading ? (
                                    <div className="flex items-center gap-3">
                                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                            style={{ width: 20, height: 20, borderRadius: '50%', border: '2px solid white', borderTopColor: 'transparent' }} />
                                        מעבד תשלום...
                                    </div>
                                ) : (
                                    <>שלם ${album.price}.00 <ArrowLeft size={16} /></>
                                )}
                            </button>

                            <p style={{ textAlign: 'center', marginTop: 16, fontSize: 12, color: 'var(--text-muted)' }}>
                                <b>דמו:</b> לחץ על שלם כדי לדמות תשלום ולהמשיך לתצוגה מקדימה של האלבום
                            </p>
                        </form>
                    </div>

                    {/* LEFT: Order Summary (in RTL this is the end side) */}
                    <div className="lg:col-span-2">
                        <div className="rounded-2xl overflow-hidden" style={{ background: 'white', border: '1px solid #E0E0E0', position: 'sticky', top: 100 }}>
                            {/* Album preview header */}
                            <div className="p-6" style={{ background: 'var(--dark)', color: 'white' }}>
                                <p style={{ fontSize: 11, color: 'var(--primary-light)', letterSpacing: 2, fontWeight: 600, textTransform: 'uppercase', marginBottom: 8 }}>
                                    אלבום {eventLabels[event] || event}
                                </p>
                                <p style={{ fontFamily: "'Heebo', sans-serif", fontSize: 20, fontWeight: 700, marginBottom: 4 }}>{names}</p>
                                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
                                    {photos} תמונות · ערכת נושא {theme}
                                </p>
                            </div>

                            {/* Order details */}
                            <div className="p-6">
                                <h3 className="font-bold mb-4" style={{ fontFamily: "'Heebo', sans-serif" }}>סיכום הזמנה</h3>

                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between" style={{ fontSize: 14, color: 'var(--dark)' }}>
                                        <span>אלבום {album.name} ({album.pages} עמודים)</span>
                                        <span className="font-semibold">${album.price}.00</span>
                                    </div>
                                    <div className="flex justify-between" style={{ fontSize: 14, color: 'var(--text-muted)' }}>
                                        <span>עיצוב ופריסה AI</span>
                                        <span>כלול</span>
                                    </div>
                                    <div className="flex justify-between" style={{ fontSize: 14, color: 'var(--text-muted)' }}>
                                        <span>תוכן דתי</span>
                                        <span>כלול</span>
                                    </div>
                                    <div className="flex justify-between" style={{ fontSize: 14, color: 'var(--text-muted)' }}>
                                        <span>משלוח</span>
                                        <span style={{ color: '#22c55e', fontWeight: 600 }}>חינם</span>
                                    </div>
                                    <div style={{ borderTop: '1px solid #E0E0E0', paddingTop: 12, marginTop: 12 }} className="flex justify-between">
                                        <span className="font-bold" style={{ fontSize: 16 }}>סה״כ</span>
                                        <span className="font-bold" style={{ fontSize: 20, color: 'var(--dark)' }}>${album.price}.00</span>
                                    </div>
                                </div>

                                {/* Trust badges */}
                                <div className="space-y-3 pt-4" style={{ borderTop: '1px solid #E0E0E0' }}>
                                    {[
                                        { icon: <ShieldCheck size={16} style={{ color: '#22c55e' }} />, text: 'אחריות איכות ל-14 יום' },
                                        { icon: <Lock size={16} style={{ color: 'var(--primary)' }} />, text: 'תשלום מוצפן SSL' },
                                        { icon: <Check size={16} style={{ color: 'var(--primary)' }} />, text: 'הדפסה חוזרת חינם בפגמים' },
                                    ].map(item => (
                                        <div key={item.text} className="flex items-center gap-3">
                                            {item.icon}
                                            <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>{item.text}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function CheckoutPage() {
    return (
        <Suspense fallback={<div style={{ minHeight: '100vh', background: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div className="section-tag">טוען...</div></div>}>
            <CheckoutPageContent />
        </Suspense>
    );
}
