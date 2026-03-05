'use client';

import Link from 'next/link';
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { BookOpen, ArrowLeft, ArrowRight, Check, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';

const MOCK_PAGES = [
    { type: 'cover', label: 'Cover', bg: 'from-amber-950 to-stone-900' },
    { type: 'full_bleed', label: 'Page 1', bg: 'from-stone-800 to-amber-900' },
    { type: 'spread_2', label: 'Pages 2–3', bg: 'from-amber-900 to-stone-800' },
    { type: 'grid_4', label: 'Pages 4–5', bg: 'from-stone-700 to-amber-800' },
    { type: 'text_quote', label: 'Page 6', bg: 'from-amber-800 to-stone-700' },
    { type: 'spread_2', label: 'Pages 7–8', bg: 'from-stone-800 to-amber-900' },
    { type: 'grid_4', label: 'Pages 9–10', bg: 'from-amber-900 to-stone-800' },
    { type: 'back', label: 'Back Cover', bg: 'from-stone-900 to-amber-950' },
];

function PreviewPageContent() {
    const params = useSearchParams();
    const event = params.get('event') || 'wedding';
    const photos = params.get('photos') || '5';
    const theme = params.get('theme') || 'elegant';
    const names = params.get('names') || 'Your Album';
    const [currentPage, setCurrentPage] = useState(0);
    const [approved, setApproved] = useState(false);
    const [notes, setNotes] = useState('');
    const [showApproveForm, setShowApproveForm] = useState(false);

    const page = MOCK_PAGES[currentPage];

    return (
        <div style={{ background: 'var(--dark)', minHeight: '100vh' }}>
            <header style={{ borderBottom: '1px solid rgba(255,0,0,0.2)', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50, background: 'rgba(26,18,8,0.95)', backdropFilter: 'blur(12px)' }}>
                <Link href={`/order/customize?event=${event}&photos=${photos}`} style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
                    <ArrowLeft size={16} style={{ color: 'rgba(255,255,255,0.4)' }} />
                    <div className="w-7 h-7 rounded-full brand-gradient flex items-center justify-center">
                        <BookOpen size={13} className="text-white" />
                    </div>
                    <span className="font-bold" style={{ fontFamily: 'Playfair Display, serif', color: 'white' }}>Holialby</span>
                </Link>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {['Event', 'Upload', 'Customize', 'Preview', 'Order'].map((step, i) => (
                        <div key={step} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div style={{
                                width: 28, height: 28, borderRadius: '50%',
                                background: i < 3 ? '#22c55e' : i === 3 ? 'linear-gradient(135deg, var(--primary-dark), var(--primary))' : 'rgba(255,255,255,0.1)',
                                border: `2px solid ${i <= 3 ? 'var(--primary)' : 'rgba(255,255,255,0.2)'}`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: 11, fontWeight: 700, color: i <= 3 ? 'white' : 'rgba(255,255,255,0.4)'
                            }}>
                                {i < 3 ? '✓' : i + 1}
                            </div>
                            <span style={{ fontSize: 12, color: i === 3 ? 'var(--primary)' : 'rgba(255,255,255,0.3)', fontWeight: i === 3 ? 600 : 400 }} className="hidden md:block">{step}</span>
                            {i < 4 && <div style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.15)' }} />}
                        </div>
                    ))}
                </div>
                <div style={{ width: 120 }} />
            </header>

            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="text-center mb-8">
                    <div className="section-tag" style={{ display: 'inline-flex', marginBottom: 12, background: 'rgba(255,0,0,0.15)', color: 'var(--primary-light)' }}>Step 4 of 5 · AI-Generated Preview</div>
                    <h1 className="text-3xl font-bold mb-2 text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
                        Your Album Preview
                    </h1>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 15 }}>
                        {names} · {photos} photos · {theme.charAt(0).toUpperCase() + theme.slice(1)} theme · {MOCK_PAGES.length} pages
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 items-start">
                    {/* Main Album Viewer */}
                    <div className="lg:col-span-2">
                        {/* Album page display */}
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-6" style={{ aspectRatio: page.type === 'spread_2' || page.type === 'grid_4' ? '2/1' : '3/4', background: 'black', maxHeight: '500px' }}>
                            <div className={`absolute inset-0 bg-gradient-to-br ${page.bg}`} />

                            {/* Page content based on type */}
                            {page.type === 'cover' && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                                    <div className="w-20 h-20 rounded-full brand-gradient flex items-center justify-center mb-6 shadow-2xl">
                                        <BookOpen size={36} className="text-white" />
                                    </div>
                                    <p style={{ color: 'var(--primary-light)', fontSize: 12, letterSpacing: 3, fontWeight: 600, textTransform: 'uppercase', marginBottom: 12 }}>
                                        {event === 'wedding' ? 'Wedding Album' : event.charAt(0).toUpperCase() + event.slice(1) + ' Album'}
                                    </p>
                                    <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 32, color: 'white', fontWeight: 700, marginBottom: 8 }}>{names}</h2>
                                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>June 2025</p>
                                    <div className="absolute bottom-0 left-0 right-0 h-1 brand-gradient" />
                                </div>
                            )}
                            {page.type === 'full_bleed' && (
                                <div className="absolute inset-0 flex items-end">
                                    <div className="p-6 w-full" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
                                        <p style={{ color: 'var(--primary-light)', fontSize: 11, letterSpacing: 2, marginBottom: 6 }}>THE CEREMONY</p>
                                        <p style={{ color: 'white', fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 600 }}>The moment everything changed</p>
                                    </div>
                                </div>
                            )}
                            {page.type === 'spread_2' && (
                                <div className="absolute inset-0 grid grid-cols-2 gap-2 p-4">
                                    {[0, 1].map(i => (
                                        <div key={i} className="rounded-lg" style={{ background: `rgba(255,255,255,${0.05 + i * 0.03})`, display: 'flex', alignItems: 'flex-end', padding: 12 }}>
                                            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11 }}>Photo caption {i + 1}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {page.type === 'grid_4' && (
                                <div className="absolute inset-0 grid grid-cols-2 gap-2 p-4">
                                    {[0, 1, 2, 3].map(i => (
                                        <div key={i} className="rounded-lg" style={{ background: `rgba(255,255,255,${0.04 + (i % 3) * 0.02})` }} />
                                    ))}
                                </div>
                            )}
                            {page.type === 'text_quote' && (
                                <div className="absolute inset-0 flex items-center justify-center p-10 text-center">
                                    <div>
                                        <p style={{ fontSize: 40, color: 'var(--primary)', marginBottom: 20, opacity: 0.5 }}>&ldquo;</p>
                                        <p style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, color: 'white', lineHeight: 1.7, fontStyle: 'italic', marginBottom: 20 }}>
                                            May your home be filled with joy, laughter, and boundless love — now and for all the years to come.
                                        </p>
                                        <p style={{ color: 'var(--primary-light)', fontSize: 12, letterSpacing: 1 }}>— Traditional Blessing</p>
                                    </div>
                                </div>
                            )}
                            {page.type === 'back' && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                                    <div className="w-12 h-12 rounded-full brand-gradient flex items-center justify-center mb-4">
                                        <BookOpen size={20} className="text-white" />
                                    </div>
                                    <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>Designed by Holialby</p>
                                </div>
                            )}

                            {/* Watermark */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <p style={{ color: 'rgba(255,255,255,0.04)', fontSize: 48, fontWeight: 900, transform: 'rotate(-30deg)', userSelect: 'none', whiteSpace: 'nowrap' }}>PREVIEW</p>
                            </div>

                            {/* Page label */}
                            <div className="absolute top-3 right-3 glass px-3 py-1 rounded-full" style={{ fontSize: 11, color: 'var(--primary)' }}>
                                {page.label}
                            </div>
                        </div>

                        {/* Navigation */}
                        <div className="flex items-center justify-between">
                            <button onClick={() => setCurrentPage(Math.max(0, currentPage - 1))} disabled={currentPage === 0} className="btn-outline" style={{ padding: '10px 20px', fontSize: 14, opacity: currentPage === 0 ? 0.4 : 1 }}>
                                <ChevronLeft size={16} /> Prev
                            </button>

                            {/* Page thumbnails */}
                            <div className="flex gap-2">
                                {MOCK_PAGES.map((p, i) => (
                                    <button key={i} onClick={() => setCurrentPage(i)} className="w-8 h-8 rounded-lg transition-all" style={{
                                        background: i === currentPage ? 'linear-gradient(135deg, var(--primary-dark), var(--primary))' : 'rgba(255,255,255,0.1)',
                                        border: '1px solid rgba(255,255,255,0.2)',
                                        cursor: 'pointer', fontSize: 10, color: 'white', fontWeight: 600
                                    }}>
                                        {i + 1}
                                    </button>
                                ))}
                            </div>

                            <button onClick={() => setCurrentPage(Math.min(MOCK_PAGES.length - 1, currentPage + 1))} disabled={currentPage === MOCK_PAGES.length - 1} className="btn-outline" style={{ padding: '10px 20px', fontSize: 14, opacity: currentPage === MOCK_PAGES.length - 1 ? 0.4 : 1 }}>
                                Next <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>

                    {/* RIGHT: Approval Panel */}
                    <div>
                        {!approved ? (
                            <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,0,0,0.2)' }}>
                                <h3 className="text-xl font-bold mb-2 text-white" style={{ fontFamily: 'Playfair Display, serif' }}>Review Your Album</h3>
                                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, marginBottom: 20 }}>
                                    Browse all {MOCK_PAGES.length} pages. Once you&apos;re happy, approve and we&apos;ll send it to print.
                                </p>

                                <div className="space-y-3 mb-6">
                                    {[`${photos} photos arranged across ${MOCK_PAGES.length} pages`, `${theme.charAt(0).toUpperCase() + theme.slice(1)} theme applied`, 'AI captions generated', 'Religious blessing included on page 6'].map(item => (
                                        <div key={item} className="flex items-center gap-3">
                                            <div className="w-5 h-5 rounded-full brand-gradient flex items-center justify-center flex-shrink-0">
                                                <Check size={10} className="text-white" />
                                            </div>
                                            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>{item}</p>
                                        </div>
                                    ))}
                                </div>

                                {!showApproveForm ? (
                                    <div className="space-y-3">
                                        <button onClick={() => setShowApproveForm(true)} className="btn-primary w-full justify-center" style={{ display: 'flex', width: '100%' }}>
                                            Approve This Album ✓
                                        </button>
                                        <button className="btn-outline w-full justify-center" style={{ display: 'flex', width: '100%', fontSize: 14, borderColor: 'rgba(255,255,255,0.3)', color: 'rgba(255,255,255,0.6)' }}>
                                            <RotateCcw size={14} /> Request Changes
                                        </button>
                                    </div>
                                ) : (
                                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                                        <textarea
                                            value={notes}
                                            onChange={e => setNotes(e.target.value)}
                                            placeholder="Any final notes? (optional) e.g. 'Looks perfect!' or 'Please change the font on page 3'"
                                            rows={4}
                                            className="w-full rounded-lg px-4 py-3 text-sm outline-none resize-none mb-4"
                                            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,0,0,0.3)', color: 'white', fontFamily: 'Open Sans' }}
                                        />
                                        <Link href="/order/success" className="btn-primary w-full justify-center" style={{ display: 'flex', width: '100%' }} onClick={() => setApproved(true)}>
                                            Confirm Approval <ArrowRight size={16} />
                                        </Link>
                                    </motion.div>
                                )}
                            </div>
                        ) : (
                            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="rounded-2xl p-8 text-center" style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)' }}>
                                <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-4">
                                    <Check size={32} className="text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Album Approved!</h3>
                                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>Your album is now going to print. You&apos;ll receive shipping updates via email.</p>
                            </motion.div>
                        )}

                        {/* Package info */}
                        <div className="rounded-xl p-5 mt-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,0,0,0.15)' }}>
                            <p className="font-semibold mb-3" style={{ color: 'var(--primary)' }}>What you get</p>
                            {['Hardcover A4 album (21 × 29.7cm)', '170gsm portrait paper', 'Free shipping', '14-day quality guarantee'].map(f => (
                                <div key={f} className="flex items-center gap-2 mb-2">
                                    <Check size={12} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>{f}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function PreviewPage() {
    return (
        <Suspense fallback={<div style={{ minHeight: '100vh', background: 'var(--dark)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div className="section-tag">Loading...</div></div>}>
            <PreviewPageContent />
        </Suspense>
    );
}
