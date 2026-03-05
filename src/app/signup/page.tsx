'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Eye, EyeOff, ArrowLeft, Check } from 'lucide-react';

export default function SignupPage() {
    const [showPass, setShowPass] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            window.location.href = '/order/new';
        }, 1200);
    };

    const passwordChecks = [
        { label: 'לפחות 8 תווים', met: password.length >= 8 },
        { label: 'אות גדולה אחת', met: /[A-Z]/.test(password) },
        { label: 'מספר אחד', met: /[0-9]/.test(password) },
    ];

    return (
        <div dir="rtl" style={{ background: 'var(--dark)', minHeight: '100vh', display: 'flex' }}>
            {/* Right (RTL): Illustration */}
            <div className="hidden lg:flex flex-1 flex-col items-center justify-center p-16 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1A1208, #3D2B1F)' }}>
                <div className="absolute inset-0 opacity-10">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="absolute rounded-full" style={{
                            width: 200 + i * 60, height: 200 + i * 60,
                            border: '1px solid var(--primary)',
                            top: '50%', left: '50%',
                            transform: 'translate(-50%, -50%)',
                            opacity: 1 - i * 0.12
                        }} />
                    ))}
                </div>
                <div className="relative text-center">
                    <div className="w-20 h-20 rounded-full brand-gradient flex items-center justify-center mx-auto mb-8 shadow-2xl">
                        <BookOpen size={38} className="text-white" />
                    </div>
                    <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Heebo', sans-serif" }}>
                        הצטרפו אלינו
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16, maxWidth: 300 }}>
                        צרו חשבון והתחילו לעצב אלבומי תמונות מדהימים בעזרת AI.
                    </p>
                    <div className="mt-10 grid grid-cols-2 gap-4 max-w-xs mx-auto">
                        {['284 אלבומים נוצרו', 'דירוג 4.9★', 'אחריות 14 יום', 'משלוח חינם'].map(item => (
                            <div key={item} className="rounded-xl px-4 py-3 text-center" style={{ background: 'rgba(255,0,0,0.1)', border: '1px solid rgba(255,0,0,0.2)' }}>
                                <p style={{ fontSize: 13, color: 'var(--primary-light)', fontWeight: 500 }}>{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Left (RTL): Form */}
            <div className="flex-1 w-full lg:max-w-md flex flex-col justify-center px-5 sm:px-8 py-8 sm:py-12">
                <div className="flex items-center gap-2 mb-12">
                    <div className="w-8 h-8 rounded-full brand-gradient flex items-center justify-center">
                        <BookOpen size={15} className="text-white" />
                    </div>
                    <span className="font-bold text-white text-xl" style={{ fontFamily: "'Heebo', sans-serif" }}>Holialby</span>
                </div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Heebo', sans-serif" }}>יצירת חשבון</h1>
                    <p style={{ color: 'rgba(255,255,255,0.4)', marginBottom: 32, fontSize: 15 }}>
                        כבר יש לכם חשבון? <Link href="/login" style={{ color: 'var(--primary)', textDecoration: 'none' }}>התחברו ←</Link>
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: 8 }}>שם מלא</label>
                            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="ישראל ישראלי" required
                                style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, padding: '13px 16px', color: 'white', fontSize: 15, outline: 'none', fontFamily: 'Open Sans', boxSizing: 'border-box' }} />
                        </div>
                        <div>
                            <label style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: 8 }}>כתובת אימייל</label>
                            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required
                                style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, padding: '13px 16px', color: 'white', fontSize: 15, outline: 'none', fontFamily: 'Open Sans', boxSizing: 'border-box' }} />
                        </div>
                        <div>
                            <label style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: 8 }}>סיסמה</label>
                            <div style={{ position: 'relative' }}>
                                <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required
                                    style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, padding: '13px 48px 13px 16px', color: 'white', fontSize: 15, outline: 'none', fontFamily: 'Open Sans', boxSizing: 'border-box' }} />
                                <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.3)' }}>
                                    {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {password.length > 0 && (
                                <div style={{ display: 'flex', gap: 16, marginTop: 10 }}>
                                    {passwordChecks.map(check => (
                                        <div key={check.label} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                            <Check size={12} style={{ color: check.met ? '#34D399' : 'rgba(255,255,255,0.15)' }} />
                                            <span style={{ fontSize: 11, color: check.met ? '#34D399' : 'rgba(255,255,255,0.25)' }}>{check.label}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button type="submit" disabled={loading} className="btn-primary w-full justify-center" style={{ display: 'flex', width: '100%', fontSize: 15, padding: '15px', opacity: loading ? 0.7 : 1 }}>
                            {loading ? (
                                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} style={{ width: 20, height: 20, borderRadius: '50%', border: '2px solid white', borderTopColor: 'transparent' }} />
                            ) : (
                                <>יצירת חשבון <ArrowLeft size={16} /></>
                            )}
                        </button>
                    </form>

                    <div style={{ margin: '24px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
                        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>או הרשמו עם</span>
                        <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
                    </div>

                    <button style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, padding: '13px 16px', color: 'white', fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, fontFamily: 'Open Sans' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                        הרשמו עם Google
                    </button>

                    <p style={{ textAlign: 'center', marginTop: 20, fontSize: 12, color: 'rgba(255,255,255,0.2)', lineHeight: 1.6 }}>
                        בלחיצה על ״יצירת חשבון״ אתם מסכימים ל<a href="#" style={{ color: 'rgba(255,255,255,0.35)', textDecoration: 'underline' }}>תנאי השימוש</a> ול<a href="#" style={{ color: 'rgba(255,255,255,0.35)', textDecoration: 'underline' }}>מדיניות הפרטיות</a>.
                    </p>

                    <p style={{ textAlign: 'center', marginTop: 12, fontSize: 13, color: 'rgba(255,255,255,0.2)' }}>
                        <b style={{ color: 'rgba(255,255,255,0.35)' }}>הערת דמו:</b> מלאו פרטים כלשהם או לחצו יצירת חשבון
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
