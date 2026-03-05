'use client';

import Link from 'next/link';
import { useState, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, CheckCircle, AlertCircle, BookOpen, ArrowLeft, ArrowRight, ImageIcon } from 'lucide-react';

const MOCK_PHOTOS = [
    { id: '1', name: 'ceremony_01.jpg', size: '4.2 MB', status: 'done' },
    { id: '2', name: 'ceremony_02.jpg', size: '3.8 MB', status: 'done' },
    { id: '3', name: 'reception_dance.jpg', size: '5.1 MB', status: 'done' },
    { id: '4', name: 'couple_portrait.jpg', size: '6.2 MB', status: 'done' },
    { id: '5', name: 'family_group.jpg', size: '4.9 MB', status: 'done' },
];

const eventLabels: Record<string, string> = {
    wedding: '💍 Wedding',
    birthday: '🎂 Birthday',
    holiday: '✈️ Holiday',
    'bar-mitzvah': '🕍 Bar Mitzvah',
    graduation: '🎓 Graduation',
    anniversary: '❤️ Anniversary',
    christening: '✝️ Christening',
    baby: '👶 Baby First Year',
};

function UploadPageContent() {
    const params = useSearchParams();
    const event = params.get('event') || 'wedding';
    const [photos, setPhotos] = useState(MOCK_PHOTOS);
    const [dragging, setDragging] = useState(false);
    const [uploading, setUploading] = useState(false);

    const simulateUpload = useCallback((files: string[]) => {
        if (!files.length) return;
        setUploading(true);
        const newPhotos = files.map((f, i) => ({ id: `new-${Date.now()}-${i}`, name: f, size: `${(Math.random() * 5 + 1).toFixed(1)} MB`, status: 'uploading' as const }));
        setPhotos(prev => [...prev, ...newPhotos]);

        newPhotos.forEach((photo, i) => {
            setTimeout(() => {
                setPhotos(prev => prev.map(p => p.id === photo.id ? { ...p, status: 'done' } : p));
                if (i === newPhotos.length - 1) setUploading(false);
            }, 1000 + i * 600);
        });
    }, []);

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragging(false);
        const fileNames = Array.from(e.dataTransfer.files).map(f => f.name);
        simulateUpload(fileNames);
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileNames = Array.from(e.target.files || []).map(f => f.name);
        simulateUpload(fileNames);
    };

    const removePhoto = (id: string) => setPhotos(prev => prev.filter(p => p.id !== id));

    const doneCount = photos.filter(p => p.status === 'done').length;
    const allDone = photos.length > 0 && !uploading;

    return (
        <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
            {/* Header */}
            <header className="glass" style={{ borderBottom: '1px solid rgba(255,0,0,0.15)', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
                <Link href="/order/new" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
                    <ArrowLeft size={16} style={{ color: 'var(--text-muted)' }} />
                    <div className="w-7 h-7 rounded-full brand-gradient flex items-center justify-center">
                        <BookOpen size={13} className="text-white" />
                    </div>
                    <span className="font-bold" style={{ fontFamily: 'Playfair Display, serif', color: 'var(--dark)' }}>Holialby</span>
                </Link>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {['Event', 'Upload', 'Customize', 'Preview', 'Order'].map((step, i) => (
                        <div key={step} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div style={{
                                width: 28, height: 28, borderRadius: '50%',
                                background: i < 1 ? '#22c55e' : i === 1 ? 'linear-gradient(135deg, var(--primary-dark), var(--primary))' : 'white',
                                border: `2px solid ${i <= 1 ? 'var(--primary)' : 'rgba(255,0,0,0.3)'}`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: 11, fontWeight: 700, color: i <= 1 ? 'white' : 'var(--text-muted)'
                            }}>
                                {i < 1 ? '✓' : i + 1}
                            </div>
                            <span style={{ fontSize: 12, color: i === 1 ? 'var(--primary)' : 'var(--text-muted)', fontWeight: i === 1 ? 600 : 400 }} className="hidden md:block">{step}</span>
                            {i < 4 && <div style={{ width: 24, height: 1, background: 'rgba(255,0,0,0.3)' }} />}
                        </div>
                    ))}
                </div>
                <div style={{ width: 120 }} />
            </header>

            <div className="max-w-4xl mx-auto px-6 py-14">
                <div className="text-center mb-10">
                    <div className="section-tag" style={{ display: 'inline-flex', justifyContent: 'center', marginBottom: 12 }}>Step 2 of 5 · {eventLabels[event]}</div>
                    <h1 className="text-4xl font-bold mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>Upload Your Photos</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: 16 }}>
                        Drag and drop your photos below. We recommend 20–80 photos for the best album.
                    </p>
                </div>

                {/* Upload Zone */}
                <div
                    onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={handleDrop}
                    className="rounded-2xl mb-8 transition-all duration-300 relative overflow-hidden"
                    style={{
                        border: `2px dashed ${dragging ? 'var(--primary)' : 'rgba(255,0,0,0.35)'}`,
                        background: dragging ? 'rgba(255,0,0,0.06)' : 'white',
                        padding: '48px 24px',
                        textAlign: 'center',
                        cursor: 'pointer',
                    }}
                >
                    <input type="file" multiple accept="image/*" onChange={handleFileInput} className="absolute inset-0 opacity-0 cursor-pointer" style={{ zIndex: 1 }} />
                    <motion.div animate={{ scale: dragging ? 1.05 : 1 }}>
                        <div className="w-16 h-16 rounded-full brand-gradient flex items-center justify-center mx-auto mb-5 shadow-lg">
                            <Upload size={28} className="text-white" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--dark)' }}>
                            {dragging ? 'Drop your photos here!' : 'Drag & drop your photos'}
                        </h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>or click to browse · JPG, PNG, HEIC up to 20MB each</p>
                    </motion.div>
                </div>

                {/* Stats bar */}
                {photos.length > 0 && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        className="glass rounded-xl p-4 mb-6 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <ImageIcon size={20} style={{ color: 'var(--primary)' }} />
                            <span className="font-semibold" style={{ color: 'var(--dark)' }}>
                                {doneCount} / {photos.length} photos ready
                            </span>
                        </div>
                        <div className="flex-1 mx-6">
                            <div style={{ background: 'rgba(255,0,0,0.15)', borderRadius: 99, height: 8, overflow: 'hidden' }}>
                                <motion.div
                                    animate={{ width: `${(doneCount / photos.length) * 100}%` }}
                                    style={{ height: '100%', background: 'linear-gradient(90deg, var(--primary-dark), var(--primary))', borderRadius: 99 }}
                                />
                            </div>
                        </div>
                        <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{Math.round((doneCount / photos.length) * 100)}%</span>
                    </motion.div>
                )}

                {/* Photo Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                    <AnimatePresence>
                        {photos.map((photo) => (
                            <motion.div key={photo.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                                className="relative rounded-xl overflow-hidden group"
                                style={{ background: 'white', border: '1px solid rgba(255,0,0,0.2)', padding: 12 }}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,0,0,0.1)' }}>
                                        <ImageIcon size={18} style={{ color: 'var(--primary)' }} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate" style={{ color: 'var(--dark)' }}>{photo.name}</p>
                                        <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>{photo.size}</p>
                                    </div>
                                    {photo.status === 'done'
                                        ? <CheckCircle size={16} style={{ color: '#22c55e', flexShrink: 0 }} />
                                        : <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                                            <AlertCircle size={16} style={{ color: 'var(--primary)' }} />
                                        </motion.div>
                                    }
                                </div>
                                <button onClick={() => removePhoto(photo.id)} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                                    <X size={10} className="text-white" />
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Simulate adding more */}
                <div className="flex justify-center gap-4 mb-10">
                    <button onClick={() => simulateUpload(['new_photo_01.jpg', 'new_photo_02.jpg', 'new_photo_03.jpg'])} className="btn-outline" style={{ fontSize: 14, padding: '10px 28px' }}>
                        + Add More Photos
                    </button>
                </div>

                {allDone && (
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                        <div className="glass rounded-xl p-5 mb-6" style={{ borderColor: 'rgba(34,197,94,0.3)', border: '1px solid', borderRadius: 16 }}>
                            <p className="font-semibold" style={{ color: '#16a34a' }}>
                                ✓ All {photos.length} photos uploaded successfully — our AI will start analyzing them
                            </p>
                        </div>
                        <Link href={`/order/customize?event=${event}&photos=${photos.length}`} className="btn-primary" style={{ fontSize: 16, padding: '16px 48px' }}>
                            Continue to Customize <ArrowRight size={16} />
                        </Link>
                    </motion.div>
                )}
            </div>
        </div>
    );
}

export default function UploadPage() {
    return (
        <Suspense fallback={<div style={{ minHeight: '100vh', background: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div className="section-tag">Loading...</div></div>}>
            <UploadPageContent />
        </Suspense>
    );
}
