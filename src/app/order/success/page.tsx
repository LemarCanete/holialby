'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, Package, Mail, BookOpen, ArrowLeft, Home } from 'lucide-react';

const timeline = [
    { status: 'ההזמנה בוצעה', desc: 'האלבום אושר והועבר לתור ההדפסה', done: true },
    { status: 'בהדפסה', desc: 'האלבום שלך מודפס ב-300 DPI', done: false },
    { status: 'בדיקת איכות', desc: 'הצוות שלנו בודק כל עמוד', done: false },
    { status: 'במשלוח', desc: 'נשלח באמצעות שליח עם מעקב', done: false },
    { status: 'נמסר', desc: 'מגיע עד הדלת שלך', done: false },
];

export default function SuccessPage() {
    return (
        <div dir="rtl" style={{ background: 'var(--cream)', minHeight: '100vh' }}>
            <nav className="glass px-4 sm:px-6 py-3 sm:py-4" style={{ borderBottom: '1px solid rgba(255,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full brand-gradient flex items-center justify-center">
                        <BookOpen size={15} className="text-white" />
                    </div>
                    <span className="font-bold text-xl" style={{ fontFamily: 'Heebo, sans-serif', color: 'var(--dark)' }}>Holialby</span>
                </div>
                <Link href="/" className="btn-outline" style={{ padding: '10px 24px', fontSize: 14 }}>
                    <Home size={14} /> דף הבית
                </Link>
            </nav>

            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-20 text-center">
                <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', duration: 0.6 }}>
                    <div className="w-24 h-24 rounded-full brand-gradient flex items-center justify-center mx-auto mb-8 shadow-2xl">
                        <CheckCircle size={48} className="text-white" />
                    </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                    <h1 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: 'Heebo, sans-serif' }}>
                        האלבום שלך נשלח להדפסה! 🎉
                    </h1>
                    <p className="text-lg mb-2" style={{ color: 'var(--text-muted)' }}>
                        הזמנה <span className="font-semibold" style={{ color: 'var(--primary-dark)' }}>#HOL-2026-00847</span> אושרה
                    </p>
                    <p style={{ color: 'var(--text-muted)', fontSize: 15, marginBottom: 40 }}>
                        שלחנו אישור למייל שלך. זמן אספקה משוער: 10–14 ימי עסקים.
                    </p>

                    {/* תיבות מידע */}
                    <div className="grid md:grid-cols-3 gap-4 mb-14">
                        {[
                            { icon: <Package size={22} style={{ color: 'var(--primary)' }} />, title: 'אלבום כריכה קשה', desc: 'גודל A4 · 35 עמודים · נייר 170 גרם' },
                            { icon: <Mail size={22} style={{ color: 'var(--primary)' }} />, title: 'עדכונים במייל', desc: 'הודעות משלוח ישלחו אליך' },
                            { icon: <CheckCircle size={22} style={{ color: '#22c55e' }} />, title: 'אחריות 14 יום', desc: 'הדפסה מחדש מלאה בכל פגם פיזי' },
                        ].map(item => (
                            <div key={item.title} className="rounded-xl p-5" style={{ background: 'white', border: '1px solid rgba(255,0,0,0.15)' }}>
                                <div className="mb-3">{item.icon}</div>
                                <p className="font-semibold mb-1" style={{ color: 'var(--dark)', fontSize: 15 }}>{item.title}</p>
                                <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* ציר זמן הזמנה */}
                    <div className="rounded-2xl p-8 mb-10 text-right" style={{ background: 'white', border: '1px solid rgba(255,0,0,0.15)' }}>
                        <h3 className="text-xl font-bold mb-6" style={{ fontFamily: 'Heebo, sans-serif' }}>מעקב אחר ההזמנה</h3>
                        <div className="space-y-0">
                            {timeline.map((item, i) => (
                                <div key={item.status} className="flex gap-4" style={{ paddingBottom: i < timeline.length - 1 ? 24 : 0 }}>
                                    <div className="flex flex-col items-center">
                                        <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{
                                            background: item.done ? 'linear-gradient(135deg, var(--primary-dark), var(--primary))' : i === 1 ? 'rgba(255,0,0,0.15)' : 'rgba(0,0,0,0.06)',
                                            border: `2px solid ${item.done ? 'var(--primary)' : i === 1 ? 'var(--primary)' : 'rgba(0,0,0,0.1)'}`,
                                        }}>
                                            {item.done
                                                ? <span className="text-white text-xs font-bold">✓</span>
                                                : <span style={{ fontSize: 11, color: i === 1 ? 'var(--primary-dark)' : 'var(--text-muted)', fontWeight: 600 }}>{i + 1}</span>
                                            }
                                        </div>
                                        {i < timeline.length - 1 && (
                                            <div style={{ width: 2, flex: 1, marginTop: 4, background: item.done ? 'var(--primary)' : 'rgba(0,0,0,0.08)', minHeight: 20 }} />
                                        )}
                                    </div>
                                    <div style={{ paddingTop: 4 }}>
                                        <p className="font-semibold" style={{ color: item.done ? 'var(--dark)' : i === 1 ? 'var(--primary-dark)' : 'var(--text-muted)', fontSize: 15 }}>
                                            {item.status} {i === 1 && <span style={{ fontSize: 12, background: 'rgba(255,0,0,0.15)', color: 'var(--primary-dark)', padding: '2px 8px', borderRadius: 99, marginRight: 8 }}>בתהליך</span>}
                                        </p>
                                        <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 2 }}>{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/order/new" className="btn-primary" style={{ fontSize: 15, padding: '14px 36px' }}>
                            יצירת אלבום נוסף <ArrowLeft size={15} />
                        </Link>
                        <Link href="/" className="btn-outline" style={{ fontSize: 15, padding: '14px 36px' }}>
                            חזרה לדף הבית
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
