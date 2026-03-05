'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen } from 'lucide-react';

const eventTypes = [
    { slug: 'wedding', icon: '💍', name: 'חתונה', desc: 'הנציחו את היופי של היום המיוחד עם פריסות אלגנטיות ועיצוב נצחי.', color: '#F9F0F7', border: '#E8C4DF' },
    { slug: 'birthday', icon: '🎂', name: 'יום הולדת', desc: 'חגגו כל שנה עם אלבום שמח וצבעוני מלא זיכרונות.', color: '#FFF8ED', border: '#F5D89A' },
    { slug: 'holiday', icon: '✈️', name: 'חופשה / טיול', desc: 'הפכו הרפתקאות ליומן מסע מעוצב.', color: '#EDF5FF', border: '#A8C8F0' },
    { slug: 'bar-mitzvah', icon: '🕍', name: 'בר / בת מצווה', desc: 'כבדו את אבן הדרך עם ברכות דתיות וסיפור חזותי משמעותי.', color: '#F0F7EF', border: '#A8D4A6' },
    { slug: 'graduation', icon: '🎓', name: 'סיום לימודים', desc: 'ציינו שנים של עבודה קשה עם אוסף תמונות מעורר השראה.', color: '#FFF0ED', border: '#F5B8A8' },
    { slug: 'anniversary', icon: '❤️', name: 'יום נישואין', desc: 'חיו מחדש שנים של אהבה עם אלבום רומנטי.', color: '#FFF0F5', border: '#F5A8C0' },
    { slug: 'christening', icon: '✝️', name: 'הטבלה', desc: 'מזכרת יפה שחוגגת אבן דרך רוחנית.', color: '#F5F0FF', border: '#C8B0F0' },
    { slug: 'baby', icon: '👶', name: 'שנה ראשונה', desc: 'תעדו כל רגע ראשון יקר במסע המדהים שלהם.', color: '#F0F9FF', border: '#A8D8F0' },
];

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

export default function NewOrderPage() {
    const [selected, setSelected] = useState<string | null>(null);

    return (
        <div style={{ background: 'var(--cream)', minHeight: '100vh' }} dir="rtl">
            {/* Header */}
            <header className="glass px-3 sm:px-6 py-3 sm:py-4" style={{ borderBottom: '1px solid rgba(255,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
                <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', flexShrink: 0 }}>
                    <ArrowLeft size={16} style={{ color: 'var(--text-muted)' }} className="hidden sm:block" />
                    <div className="w-7 h-7 rounded-full brand-gradient flex items-center justify-center">
                        <BookOpen size={13} className="text-white" />
                    </div>
                    <span className="font-bold hidden sm:inline" style={{ fontFamily: "'Heebo', sans-serif", color: 'var(--dark)' }}>Holialby</span>
                </Link>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="sm:gap-2">
                    {['אירוע', 'העלאה', 'התאמה', 'תצוגה', 'הזמנה'].map((step, i) => (
                        <div key={step} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                            <div style={{
                                width: 24, height: 24, borderRadius: '50%',
                                background: i === 0 ? 'linear-gradient(135deg, var(--primary-dark), var(--primary))' : 'white',
                                border: `2px solid ${i === 0 ? 'var(--primary)' : 'rgba(255,0,0,0.3)'}`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: 10, fontWeight: 700, color: i === 0 ? 'white' : 'var(--text-muted)'
                            }}>
                                {i + 1}
                            </div>
                            <span style={{ fontSize: 12, color: i === 0 ? 'var(--primary)' : 'var(--text-muted)', fontWeight: i === 0 ? 600 : 400 }} className="hidden md:block">{step}</span>
                            {i < 4 && <div style={{ width: 16, height: 1, background: 'rgba(255,0,0,0.3)' }} className="hidden sm:block" />}
                        </div>
                    ))}
                </div>
                <div className="hidden sm:block" style={{ width: 80 }} />
            </header>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
                <motion.div initial="hidden" animate="show" variants={stagger}>
                    <motion.div variants={fadeUp} className="text-center mb-8 sm:mb-12">
                        <div className="section-tag" style={{ display: 'inline-flex', justifyContent: 'center', marginBottom: 16 }}>שלב 1 מתוך 5</div>
                        <h1 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: "'Heebo', sans-serif" }}>
                            מה האירוע?
                        </h1>
                        <p style={{ color: 'var(--text-muted)', fontSize: 16 }}>
                            בחרו את סוג האירוע — אנחנו נתאים את עיצוב האלבום בצורה מושלמת.
                        </p>
                    </motion.div>

                    <motion.div variants={stagger} className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-12">
                        {eventTypes.map((et) => (
                            <motion.button
                                key={et.slug}
                                variants={fadeUp}
                                onClick={() => setSelected(et.slug)}
                                className="text-right rounded-2xl p-4 sm:p-6 transition-all duration-200"
                                style={{
                                    background: selected === et.slug ? et.color : 'white',
                                    border: `2px solid ${selected === et.slug ? et.border : 'rgba(255,0,0,0.15)'}`,
                                    cursor: 'pointer',
                                    transform: selected === et.slug ? 'scale(1.02)' : 'scale(1)',
                                    boxShadow: selected === et.slug ? `0 8px 30px ${et.border}60` : '0 2px 8px rgba(0,0,0,0.04)',
                                }}
                            >
                                <div className="text-4xl mb-3">{et.icon}</div>
                                <p className="font-semibold mb-1" style={{ color: 'var(--dark)', fontSize: 15 }}>{et.name}</p>
                                <p style={{ color: 'var(--text-muted)', fontSize: 12, lineHeight: 1.5 }}>{et.desc}</p>
                                {selected === et.slug && (
                                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-3 text-xs font-semibold px-3 py-1 rounded-full inline-block" style={{ background: et.border, color: '#fff' }}>
                                        ✓ נבחר
                                    </motion.div>
                                )}
                            </motion.button>
                        ))}
                    </motion.div>

                    {selected && (
                        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                            <Link
                                href={`/order/upload?event=${selected}`}
                                className="btn-primary"
                                style={{ fontSize: 16, padding: '16px 48px' }}
                            >
                                המשיכו עם {eventTypes.find(e => e.slug === selected)?.icon} {eventTypes.find(e => e.slug === selected)?.name}
                                <ArrowLeft size={16} />
                            </Link>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
