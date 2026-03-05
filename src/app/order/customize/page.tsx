'use client';

import Link from 'next/link';
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { BookOpen, ArrowLeft, ArrowRight, ToggleLeft, ToggleRight } from 'lucide-react';

const themes = [
    { id: 'elegant', name: 'Elegant', desc: 'Refined serif fonts, ivory & gold tones', preview: ['#F5ECD7', '#2C1810', '#FF0000'] },
    { id: 'rustic', name: 'Rustic', desc: 'Warm earthy tones, handwritten-style text', preview: ['#8B5E3C', '#F2E8D9', '#6B4423'] },
    { id: 'modern', name: 'Modern', desc: 'Clean lines, bold typography, contrast', preview: ['#1A1A1A', '#FFFFFF', '#E0E0E0'] },
    { id: 'romantic', name: 'Romantic', desc: 'Soft blush pinks, florals, gentle curves', preview: ['#F9C6D0', '#7B3F55', '#FBEEF1'] },
];

const religions = ['Jewish', 'Christian', 'Muslim', 'Hindu', 'Universal / Non-specific'];

function CustomizePageContent() {
    const params = useSearchParams();
    const event = params.get('event') || 'wedding';
    const photos = params.get('photos') || '5';
    const [theme, setTheme] = useState('elegant');
    const [religious, setReligious] = useState(false);
    const [religion, setReligion] = useState('');
    const [name1, setName1] = useState('');
    const [name2, setName2] = useState('');
    const [eventDate, setEventDate] = useState('');

    const eventLabel: Record<string, string> = {
        wedding: '💍 Wedding', birthday: '🎂 Birthday', holiday: '✈️ Holiday',
        'bar-mitzvah': '🕍 Bar Mitzvah', graduation: '🎓 Graduation', anniversary: '❤️ Anniversary',
    };

    return (
        <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
            <header className="glass px-3 sm:px-6 py-3 sm:py-4" style={{ borderBottom: '1px solid rgba(255,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
                <Link href={`/order/upload?event=${event}`} style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', flexShrink: 0 }}>
                    <ArrowLeft size={16} style={{ color: 'var(--text-muted)' }} className="hidden sm:block" />
                    <div className="w-7 h-7 rounded-full brand-gradient flex items-center justify-center">
                        <BookOpen size={13} className="text-white" />
                    </div>
                    <span className="font-bold hidden sm:inline" style={{ fontFamily: 'Playfair Display, serif', color: 'var(--dark)' }}>Holialby</span>
                </Link>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    {['Event', 'Upload', 'Customize', 'Preview', 'Order'].map((step, i) => (
                        <div key={step} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                            <div style={{
                                width: 24, height: 24, borderRadius: '50%',
                                background: i < 2 ? '#22c55e' : i === 2 ? 'linear-gradient(135deg, var(--primary-dark), var(--primary))' : 'white',
                                border: `2px solid ${i <= 2 ? 'var(--primary)' : 'rgba(255,0,0,0.3)'}`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: 10, fontWeight: 700, color: i <= 2 ? 'white' : 'var(--text-muted)'
                            }}>
                                {i < 2 ? '✓' : i + 1}
                            </div>
                            <span style={{ fontSize: 12, color: i === 2 ? 'var(--primary)' : 'var(--text-muted)', fontWeight: i === 2 ? 600 : 400 }} className="hidden md:block">{step}</span>
                            {i < 4 && <div style={{ width: 16, height: 1, background: 'rgba(255,0,0,0.3)' }} className="hidden sm:block" />}
                        </div>
                    ))}
                </div>
                <div className="hidden sm:block" style={{ width: 80 }} />
            </header>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
                <div className="text-center mb-10">
                    <div className="section-tag" style={{ display: 'inline-flex', marginBottom: 12 }}>Step 3 of 5 · {photos} photos uploaded</div>
                    <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>Customize Your Album</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Choose a theme and add personal details — we&apos;ll craft the perfect album.</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-10">
                    {/* LEFT: Theme + Religious */}
                    <div>
                        <h2 className="text-xl font-bold mb-5" style={{ fontFamily: 'Playfair Display, serif' }}>Album Theme</h2>
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            {themes.map(t => (
                                <button key={t.id} onClick={() => setTheme(t.id)} className="rounded-xl overflow-hidden text-left transition-all duration-200" style={{
                                    border: `2px solid ${theme === t.id ? 'var(--primary)' : 'rgba(255,0,0,0.2)'}`,
                                    boxShadow: theme === t.id ? '0 4px 20px rgba(255,0,0,0.25)' : 'none',
                                    cursor: 'pointer', background: 'white'
                                }}>
                                    {/* Theme color preview */}
                                    <div className="flex p-3 gap-1.5">
                                        {t.preview.map((c, i) => (
                                            <div key={i} className="h-8 flex-1 rounded-md" style={{ background: c }} />
                                        ))}
                                    </div>
                                    <div className="px-3 pb-3">
                                        <p className="font-semibold text-sm" style={{ color: 'var(--dark)' }}>{t.name}</p>
                                        <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{t.desc}</p>
                                    </div>
                                    {theme === t.id && <div className="bg-amber-400 text-white text-xs font-bold text-center py-1">✓ Selected</div>}
                                </button>
                            ))}
                        </div>

                        {/* Religious Toggle */}
                        <div className="rounded-xl p-5" style={{ background: 'white', border: '1px solid rgba(255,0,0,0.2)' }}>
                            <div className="flex items-center justify-between mb-3">
                                <div>
                                    <p className="font-semibold" style={{ color: 'var(--dark)' }}>Include Religious Content</p>
                                    <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>Add blessings, verses, and prayers relevant to your faith</p>
                                </div>
                                <button onClick={() => setReligious(!religious)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                    {religious
                                        ? <ToggleRight size={36} style={{ color: 'var(--primary)' }} />
                                        : <ToggleLeft size={36} style={{ color: '#D1D5DB' }} />
                                    }
                                </button>
                            </div>
                            {religious && (
                                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
                                    <div className="grid grid-cols-1 gap-2 mt-3">
                                        {religions.map(r => (
                                            <button key={r} onClick={() => setReligion(r)} className="text-left rounded-lg px-4 py-2.5 transition-all" style={{
                                                background: religion === r ? 'rgba(255,0,0,0.12)' : 'var(--cream)',
                                                border: `1px solid ${religion === r ? 'var(--primary)' : 'transparent'}`,
                                                cursor: 'pointer', fontSize: 14, color: 'var(--dark)'
                                            }}>
                                                {religion === r ? '✓ ' : ''}{r}
                                            </button>
                                        ))}
                                    </div>
                                    {religion && (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 p-4 rounded-lg" style={{ background: 'rgba(255,0,0,0.08)', border: '1px solid rgba(255,0,0,0.25)' }}>
                                            <p style={{ fontSize: 13, color: 'var(--primary-dark)', fontStyle: 'italic' }}>
                                                Example blessing: &ldquo;May your home be filled with joy, laughter, and love — now and forever.&rdquo;
                                            </p>
                                        </motion.div>
                                    )}
                                </motion.div>
                            )}
                        </div>
                    </div>

                    {/* RIGHT: Personal Details */}
                    <div>
                        <h2 className="text-xl font-bold mb-5" style={{ fontFamily: 'Playfair Display, serif' }}>Personal Details</h2>
                        <div className="space-y-4" style={{ background: 'white', border: '1px solid rgba(255,0,0,0.2)', borderRadius: 16, padding: 24 }}>
                            {event === 'wedding' ? (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--dark)' }}>Partner 1 Name</label>
                                        <input value={name1} onChange={e => setName1(e.target.value)} placeholder="e.g. Sarah" className="w-full rounded-lg px-4 py-3 text-sm outline-none transition-all" style={{ border: '1px solid rgba(255,0,0,0.3)', background: 'var(--cream)', color: 'var(--dark)', fontFamily: 'Open Sans' }} onFocus={e => e.target.style.borderColor = 'var(--primary)'} onBlur={e => e.target.style.borderColor = 'rgba(255,0,0,0.3)'} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--dark)' }}>Partner 2 Name</label>
                                        <input value={name2} onChange={e => setName2(e.target.value)} placeholder="e.g. David" className="w-full rounded-lg px-4 py-3 text-sm outline-none transition-all" style={{ border: '1px solid rgba(255,0,0,0.3)', background: 'var(--cream)', color: 'var(--dark)', fontFamily: 'Open Sans' }} onFocus={e => e.target.style.borderColor = 'var(--primary)'} onBlur={e => e.target.style.borderColor = 'rgba(255,0,0,0.3)'} />
                                    </div>
                                </>
                            ) : (
                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--dark)' }}>Subject Name(s)</label>
                                    <input value={name1} onChange={e => setName1(e.target.value)} placeholder="Who is this album for?" className="w-full rounded-lg px-4 py-3 text-sm outline-none" style={{ border: '1px solid rgba(255,0,0,0.3)', background: 'var(--cream)', color: 'var(--dark)', fontFamily: 'Open Sans' }} />
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--dark)' }}>Event Date</label>
                                <input type="date" value={eventDate} onChange={e => setEventDate(e.target.value)} className="w-full rounded-lg px-4 py-3 text-sm outline-none" style={{ border: '1px solid rgba(255,0,0,0.3)', background: 'var(--cream)', color: 'var(--dark)', fontFamily: 'Open Sans' }} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--dark)' }}>Special Notes (optional)</label>
                                <textarea placeholder="Any special requests for the album design?" rows={3} className="w-full rounded-lg px-4 py-3 text-sm outline-none resize-none" style={{ border: '1px solid rgba(255,0,0,0.3)', background: 'var(--cream)', color: 'var(--dark)', fontFamily: 'Open Sans' }} />
                            </div>
                        </div>

                        {/* Preview card */}
                        <div className="mt-6 rounded-xl p-5" style={{ background: 'linear-gradient(135deg, #3D2B1F, #1A1208)', color: 'white' }}>
                            <p style={{ fontSize: 11, color: 'var(--primary)', letterSpacing: 2, fontWeight: 600, textTransform: 'uppercase', marginBottom: 8 }}>Your Album Preview</p>
                            <p style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, fontWeight: 700, marginBottom: 4 }}>
                                {name1 && name2 ? `${name1} & ${name2}` : name1 || 'Your Names Here'}
                            </p>
                            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>
                                {eventDate ? new Date(eventDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Your Date Here'}
                            </p>
                            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
                                {photos} photos · {themes.find(t => t.id === theme)?.name} theme{religious && religion ? ` · ${religion} blessings` : ''}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-12">
                    <Link href={`/order/checkout?event=${event}&photos=${photos}&theme=${theme}&names=${encodeURIComponent((name1 && name2) ? `${name1} & ${name2}` : name1 || 'Your Album')}`} className="btn-primary" style={{ fontSize: 16, padding: '16px 48px' }}>
                        Continue to Checkout <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function CustomizePage() {
    return (
        <Suspense fallback={<div style={{ minHeight: '100vh', background: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div className="section-tag">Loading...</div></div>}>
            <CustomizePageContent />
        </Suspense>
    );
}
