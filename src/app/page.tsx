'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Star, Heart, Camera, Package, ChevronRight, ChevronLeft,
  Sparkles, Shield, Globe, ArrowRight, Quote, Play, Plus, Minus,
  Truck, RefreshCcw, HelpCircle, MessageCircle, Menu, X
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } }
};

const eventTypes = [
  { icon: '💍', name: 'Wedding', desc: 'Timeless love stories' },
  { icon: '🎂', name: 'Birthday', desc: 'Every milestone matters' },
  { icon: '✈️', name: 'Holiday', desc: 'Adventures in print' },
  { icon: '🕍', name: 'Bar / Bat Mitzvah', desc: 'Faith & celebration' },
  { icon: '🎓', name: 'Graduation', desc: 'Every achievement' },
  { icon: '❤️', name: 'Anniversary', desc: 'Years of memories' },
];

const steps = [
  { num: '01', title: 'Choose Your Event', desc: 'Select your event type — wedding, holiday, birthday and more. Personalize with names, dates and themes.', icon: <Sparkles size={22} />, img: '/album-sample-imgs/sample6.jpg' },
  { num: '02', title: 'Upload Your Photos', desc: 'Simply drag and drop your favorite moments. Our AI analyzes and scores each photo for the best layout.', icon: <Camera size={22} />, img: '/album-sample-imgs/sample1.jpg' },
  { num: '03', title: 'AI Designs Your Album', desc: 'Our system arranges your photos, writes captions, and adds personal text — including religious blessings if you choose.', icon: <BookOpen size={22} />, img: '/album-sample-imgs/sample10.jpg' },
  { num: '04', title: 'Delivered to Your Door', desc: 'Approve the preview, and we print your hardcover album in stunning quality and ship it directly to you.', icon: <Package size={22} />, img: '/album-sample-imgs/sample9.jpg' },
];

const albumSlides = [
  { img: '/album-sample-imgs/sample9.jpg', label: 'The Cover', desc: 'Premium hardcover with custom title and event details', aspect: '4/3' },
  { img: '/album-sample-imgs/sample10.jpg', label: 'Inside Pages', desc: 'AI-arranged photo layouts with captions and themes', aspect: '3/2' },
  { img: '/album-sample-imgs/sample3.jpg', label: 'Family Moments', desc: 'Every precious memory captured in stunning detail', aspect: '3/2' },
  { img: '/album-sample-imgs/sample5.jpg', label: 'Generations', desc: 'From old prints to new memories — all in one album', aspect: '4/3' },
  { img: '/album-sample-imgs/sample1.jpg', label: 'The Experience', desc: 'A tangible keepsake you can hold, share, and treasure', aspect: '2/3' },
];

const testimonials = [
  { name: 'Rachel M.', event: 'Wedding Album', text: 'I cried when I opened the box. Every page looked like it was designed by a professional artist. The Hebrew blessings on the cover were the most beautiful touch.', rating: 5, location: 'New York', img: '/album-sample-imgs/sample3.jpg' },
  { name: 'David K.', event: 'Holiday Album — Israel Trip', text: 'We uploaded 60 photos from our family trip and the album came back organized perfectly — ceremony, sightseeing, food, all in the right order. Incredible.', rating: 5, location: 'London', img: '/album-sample-imgs/sample10.jpg' },
  { name: 'Sarah & Tom', event: 'Anniversary Album', text: 'Our 10th anniversary deserved something special. The album captured every emotion perfectly. We\'ll treasure it forever.', rating: 5, location: 'Los Angeles', img: '/album-sample-imgs/sample5.jpg' },
];

const pricing = [
  { name: 'Essential', photos: '20–30', pages: '~20', price: '$49', delivery: '14–21 days', popular: false },
  { name: 'Classic', photos: '30–50', pages: '~35', price: '$79', delivery: '10–14 days', popular: true },
  { name: 'Deluxe', photos: '50–80', pages: '~55', price: '$119', delivery: '7–10 days', popular: false },
];

const faqs = [
  { q: 'How does it work?', a: 'It\'s simple! Choose your event type, upload your photos (we recommend 20–80), customize your theme and add optional religious blessings. Our AI then designs a beautiful album layout, arranges your photos in narrative order, and generates captions. You preview and approve before we print and ship your hardcover album.' },
  { q: 'What photos should I upload?', a: 'Upload your best moments — ceremony shots, group photos, candid moments, landscapes, detail shots. Our AI scores each photo for quality and composition, then selects the best ones for your album. We recommend at least 20 photos for a great result. JPG, PNG, and HEIC formats are all supported, up to 20MB each.' },
  { q: 'How long does shipping take?', a: 'Shipping times depend on your plan: Essential (14–21 business days), Classic (10–14 business days), Deluxe (7–10 business days). All orders include free standard shipping. We ship worldwide and you\'ll receive tracking updates via email.' },
  { q: 'What\'s your refund policy?', a: 'We offer a 14-day quality guarantee. If your album arrives with any physical defect — misprints, binding issues, damaged pages — we\'ll reprint it at no cost. Please note that once you approve the digital preview, the design is considered final. We encourage careful review before approval.' },
  { q: 'Can I include religious content?', a: 'Absolutely! We offer religious blessings, verses, and prayers from Jewish, Christian, Muslim, Hindu, and universal traditions. During customization, simply toggle on religious content and select your faith. Relevant blessings are beautifully placed on section dividers and the cover.' },
  { q: 'What are the album specifications?', a: 'All albums are hardcover A4 size (22 × 29cm) printed on premium 170gsm portrait paper at 300 DPI. The cover features your custom title, names, and event date. Available themes include Elegant, Rustic, Modern, and Romantic.' },
];

function AlbumViewer() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent(c => c === 0 ? albumSlides.length - 1 : c - 1);
  const next = () => setCurrent(c => c === albumSlides.length - 1 ? 0 : c + 1);

  return (
    <div>
      {/* Main image */}
      <div className="relative rounded-2xl overflow-hidden shadow-2xl" style={{ background: '#111', minHeight: 260 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="relative w-full"
            style={{ minHeight: 260 }}
          >
            <Image
              src={albumSlides[current].img}
              alt={albumSlides[current].label}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 60vw"
              priority={current === 0}
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)' }} />
            {/* Label */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p style={{ fontSize: 12, color: 'var(--primary-light)', letterSpacing: 2, fontWeight: 600, textTransform: 'uppercase', marginBottom: 6 }}>
                {current + 1} / {albumSlides.length}
              </p>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: 'white', fontWeight: 700, marginBottom: 4 }}>
                {albumSlides[current].label}
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 15 }}>
                {albumSlides[current].desc}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Nav arrows */}
        <button onClick={prev} className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all hover:scale-110" style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer', color: 'white' }}>
          <ChevronLeft size={20} />
        </button>
        <button onClick={next} className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all hover:scale-110" style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer', color: 'white' }}>
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Thumbnail strip */}
      <div className="flex gap-2 sm:gap-3 mt-3 sm:mt-4">
        {albumSlides.map((slide, i) => (
          <button key={i} onClick={() => setCurrent(i)} className="relative flex-1 rounded-md sm:rounded-lg overflow-hidden transition-all" style={{ height: 48, opacity: i === current ? 1 : 0.5, border: i === current ? '2px solid var(--primary)' : '2px solid transparent', cursor: 'pointer' }}>
            <Image src={slide.img} alt={slide.label} fill className="object-cover" sizes="120px" />
          </button>
        ))}
      </div>
    </div>
  );
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div key={i} className="rounded-xl overflow-hidden" style={{ background: 'white', border: '1px solid #E8E8E8' }}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between p-5 text-left transition-colors"
            style={{ cursor: 'pointer', background: open === i ? 'rgba(255,0,0,0.03)' : 'white' }}
          >
            <span className="font-semibold pr-4" style={{ color: 'var(--dark)', fontSize: 16 }}>{faq.q}</span>
            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: open === i ? 'var(--primary)' : '#F0F0F0' }}>
              {open === i ? <Minus size={16} color="white" /> : <Plus size={16} color="#666" />}
            </div>
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{ overflow: 'hidden' }}
              >
                <p style={{ padding: '0 20px 20px', color: 'var(--text-muted)', fontSize: 15, lineHeight: 1.7 }}>
                  {faq.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      {/* NAVBAR */}
      <nav className="glass fixed top-0 left-0 right-0 z-50" style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full brand-gradient flex items-center justify-center">
              <BookOpen size={16} className="text-white" />
            </div>
            <span className="font-bold text-lg sm:text-xl" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--dark)' }}>
              Holialby
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {[{ label: 'How It Works', href: '#how-it-works' }, { label: 'Gallery', href: '#gallery' }, { label: 'Pricing', href: '#pricing' }, { label: 'FAQ', href: '#faq' }].map(item => (
              <a key={item.label} href={item.href} style={{ color: 'var(--text-muted)', fontSize: 14, fontWeight: 500, textDecoration: 'none' }} className="hover:opacity-80 transition-opacity">{item.label}</a>
            ))}
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <Link href="/login" className="btn-outline" style={{ padding: '10px 24px', fontSize: 14 }}>Log in</Link>
            <Link href="/order/new" className="btn-primary" style={{ padding: '10px 24px', fontSize: 14 }}>
              Create Album <ArrowRight size={14} />
            </Link>
          </div>
          {/* Mobile hamburger */}
          <button className="sm:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--dark)' }}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="sm:hidden overflow-hidden"
              style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}
            >
              <div className="px-4 py-4 space-y-3">
                {[{ label: 'How It Works', href: '#how-it-works' }, { label: 'Gallery', href: '#gallery' }, { label: 'Pricing', href: '#pricing' }, { label: 'FAQ', href: '#faq' }].map(item => (
                  <a key={item.label} href={item.href} onClick={() => setMobileMenuOpen(false)} className="block py-2" style={{ color: 'var(--dark)', fontSize: 15, fontWeight: 500, textDecoration: 'none' }}>{item.label}</a>
                ))}
                <div className="flex gap-3 pt-2">
                  <Link href="/login" className="btn-outline flex-1 justify-center" style={{ padding: '10px 16px', fontSize: 14 }}>Log in</Link>
                  <Link href="/order/new" className="btn-primary flex-1 justify-center" style={{ padding: '10px 16px', fontSize: 14 }}>Create Album</Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ==================== HERO ==================== */}
      <section className="relative overflow-hidden pt-24 sm:pt-28 pb-12 sm:pb-20" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.div variants={fadeUp} className="section-tag">
              <Sparkles size={12} /> AI-Powered Photo Albums
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-3xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-4 sm:mb-6" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--dark)' }}>
              Your Event,<br />
              <span className="brand-text">Beautifully</span><br />
              Remembered
            </motion.h1>
            <motion.p variants={fadeUp} className="text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed" style={{ color: 'var(--text-muted)', maxWidth: 460 }}>
              Upload your photos from any event — wedding, birthday, holiday.
              Our AI designs a stunning physical album with personal captions,
              layouts, and optional religious blessings.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-10">
              <Link href="/order/new" className="btn-primary justify-center sm:justify-start" style={{ fontSize: 15, padding: '14px 32px' }}>
                Start Your Album <ArrowRight size={16} />
              </Link>
              <a href="#how-it-works" className="btn-outline justify-center sm:justify-start" style={{ fontSize: 15, padding: '14px 32px' }}>
                See How It Works
              </a>
            </motion.div>
            <motion.div variants={fadeUp} className="flex items-center gap-6">
              <div className="flex -space-x-2">
                {['/album-sample-imgs/sample3.jpg', '/album-sample-imgs/sample5.jpg', '/album-sample-imgs/sample6.jpg', '/album-sample-imgs/sample1.jpg'].map((src, i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden relative" style={{ zIndex: 4 - i }}>
                    <Image src={src} alt="" fill className="object-cover" sizes="40px" />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#FF0000" color="#FF0000" />)}
                  <span className="ml-1 font-semibold text-sm">4.9</span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>Loved by 2,400+ families</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero image */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl" style={{ aspectRatio: '3/4' }}>
              <Image
                src="/album-sample-imgs/sample1.jpg"
                alt="Photo album with polaroid camera"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              {/* Overlay at bottom */}
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 40%)' }} />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)' }}>
                  <p style={{ fontSize: 11, color: 'var(--primary)', fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 }}>Wedding Album</p>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: 'var(--dark)', fontWeight: 700 }}>Sarah & David — June 2025</p>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>48 photos · 35 pages · Elegant theme</p>
                </div>
              </div>
            </div>
            {/* Floating badges — hidden on small mobile to avoid overflow */}
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 3 }} className="absolute -top-4 -right-4 glass rounded-xl p-3 shadow-lg hidden sm:block">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full brand-gradient flex items-center justify-center">
                  <Heart size={14} className="text-white" />
                </div>
                <div>
                  <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--dark)' }}>AI-Designed</p>
                  <p style={{ fontSize: 10, color: 'var(--text-muted)' }}>Unique layout</p>
                </div>
              </div>
            </motion.div>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 3.5, delay: 0.5 }} className="absolute -bottom-4 -left-4 glass rounded-xl p-3 shadow-lg hidden sm:block">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <Shield size={14} className="text-green-600" />
                </div>
                <div>
                  <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--dark)' }}>Print-Ready</p>
                  <p style={{ fontSize: 10, color: 'var(--text-muted)' }}>300 DPI quality</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ==================== EVENT TYPES ==================== */}
      <section className="py-14 sm:py-20" style={{ background: 'white' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
            <motion.div variants={fadeUp} className="section-tag" style={{ justifyContent: 'center', display: 'inline-flex' }}>
              <Globe size={12} /> Any Occasion
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
              Albums for Every Event
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 text-lg max-w-xl mx-auto" style={{ color: 'var(--text-muted)' }}>
              From intimate celebrations to grand ceremonies, we create the perfect album for your moment.
            </motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {eventTypes.map((et) => (
              <motion.div key={et.name} variants={fadeUp}>
                <Link href="/order/new" className="card-hover block rounded-2xl p-6 text-center" style={{ background: 'var(--cream)', border: '1px solid #E8E8E8', textDecoration: 'none' }}>
                  <div className="text-4xl mb-3">{et.icon}</div>
                  <p className="font-semibold text-sm" style={{ color: 'var(--dark)' }}>{et.name}</p>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>{et.desc}</p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==================== INTERACTIVE ALBUM VIEWER ==================== */}
      <section id="gallery" className="py-14 sm:py-24" style={{ background: 'var(--dark)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="grid lg:grid-cols-5 gap-12 items-start">
            {/* Left text */}
            <motion.div variants={fadeUp} className="lg:col-span-2 lg:sticky lg:top-32">
              <div className="section-tag" style={{ background: 'rgba(255,0,0,0.15)', color: 'var(--primary-light)', borderColor: 'rgba(255,0,0,0.3)' }}>
                <BookOpen size={12} /> Explore the Album
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                From Cover<br />to Last Page
              </h2>
              <p className="mb-8" style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16, lineHeight: 1.7 }}>
                Click through to explore what your album looks like — from the premium hardcover exterior to the beautifully arranged photo pages inside.
              </p>
              <div className="space-y-4">
                {[
                  { icon: <Shield size={18} />, text: 'Premium hardcover binding' },
                  { icon: <Camera size={18} />, text: 'AI-arranged photo layouts' },
                  { icon: <Sparkles size={18} />, text: 'Custom captions & blessings' },
                  { icon: <Package size={18} />, text: '170gsm portrait paper' },
                ].map(item => (
                  <div key={item.text} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.08)', color: 'var(--primary-light)' }}>
                      {item.icon}
                    </div>
                    <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 15 }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            {/* Right viewer */}
            <motion.div variants={fadeUp} className="lg:col-span-3">
              <AlbumViewer />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ==================== VIDEO SHOWCASE ==================== */}
      <section className="py-14 sm:py-24" style={{ background: 'white' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center mb-10 sm:mb-14">
            <motion.div variants={fadeUp} className="section-tag" style={{ justifyContent: 'center', display: 'inline-flex' }}>
              <Play size={12} /> See It in Action
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
              Watch the Magic Happen
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 text-lg max-w-xl mx-auto" style={{ color: 'var(--text-muted)' }}>
              See how our albums look and feel in real life — from unboxing to flipping through the pages.
            </motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-2 gap-6">
            {[
              { src: '/album-sample-vids/sample1.mp4', label: 'Album Unboxing', desc: 'Watch the premium hardcover arrive' },
              { src: '/album-sample-vids/sample2.mp4', label: 'Flipping Through Pages', desc: 'See the AI-designed layouts come alive' },
              { src: '/album-sample-vids/sample3.mp4', label: 'Quality Close-Up', desc: '170gsm paper with vivid print quality' },
              { src: '/album-sample-vids/sample4.mp4', label: 'The Perfect Gift', desc: 'A keepsake that lasts generations' },
            ].map((vid) => (
              <motion.div key={vid.label} variants={fadeUp} className="rounded-2xl overflow-hidden card-hover" style={{ background: 'var(--cream)', border: '1px solid #E8E8E8' }}>
                <div className="relative" style={{ aspectRatio: '16/9' }}>
                  <video
                    src={vid.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold mb-1" style={{ fontSize: 16 }}>{vid.label}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>{vid.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==================== HOW IT WORKS ==================== */}
      <section id="how-it-works" className="py-14 sm:py-24" style={{ background: 'var(--cream)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center mb-10 sm:mb-16">
            <motion.div variants={fadeUp} className="section-tag" style={{ justifyContent: 'center', display: 'inline-flex' }}>
              <BookOpen size={12} /> The Process
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
              How It Works
            </motion.h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="space-y-8">
            {steps.map((step, i) => (
              <motion.div key={step.num} variants={fadeUp} className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
                {/* Image */}
                <div className={`relative rounded-2xl overflow-hidden shadow-lg ${i % 2 === 1 ? 'md:order-2' : ''}`} style={{ aspectRatio: '4/3' }}>
                  <Image src={step.img} alt={step.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)' }} />
                  <div className="absolute bottom-4 left-4">
                    <div className="w-12 h-12 rounded-full brand-gradient flex items-center justify-center text-white shadow-lg">
                      {step.icon}
                    </div>
                  </div>
                </div>
                {/* Text */}
                <div className={`${i % 2 === 1 ? 'md:order-1' : ''}`}>
                  <span className="text-5xl sm:text-6xl font-bold" style={{ color: 'var(--primary)', opacity: 0.12 }}>{step.num}</span>
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 -mt-6" style={{ fontFamily: "'Playfair Display', serif" }}>{step.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: 15, lineHeight: 1.7 }}>{step.desc}</p>
                  {i < steps.length - 1 && (
                    <div className="mt-4 hidden md:block" style={{ width: 2, height: 40, background: 'rgba(255,0,0,0.15)', marginLeft: 4 }} />
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-14">
            <Link href="/order/new" className="btn-primary" style={{ fontSize: 16, padding: '16px 48px' }}>
              Start Creating My Album <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ==================== PHOTO STRIP ==================== */}
      <section className="py-4 overflow-hidden" style={{ background: 'var(--dark)' }}>
        <motion.div
          animate={{ x: [0, -1200] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="flex gap-4"
          style={{ width: 'max-content' }}
        >
          {[...Array(2)].flatMap((_, setIdx) =>
            [1, 3, 5, 6, 9, 10].map((n) => (
              <div key={`${setIdx}-${n}`} className="relative rounded-lg overflow-hidden flex-shrink-0" style={{ width: 200, height: 140 }}>
                <Image src={`/album-sample-imgs/sample${n}.jpg`} alt="" fill className="object-cover" sizes="200px" />
              </div>
            ))
          )}
        </motion.div>
      </section>

      {/* ==================== TESTIMONIALS ==================== */}
      <section className="py-14 sm:py-24" style={{ background: 'white' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center mb-10 sm:mb-16">
            <motion.div variants={fadeUp} className="section-tag" style={{ justifyContent: 'center', display: 'inline-flex' }}>
              <Heart size={12} /> Customer Stories
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
              Families Love Their Albums
            </motion.h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <motion.div key={t.name} variants={fadeUp} className="card-hover rounded-2xl overflow-hidden" style={{ background: 'var(--cream)', border: '1px solid #E8E8E8' }}>
                {/* Testimonial image */}
                <div className="relative" style={{ height: 180 }}>
                  <Image src={t.img} alt={t.event} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--cream) 0%, transparent 60%)' }} />
                </div>
                <div className="p-6 -mt-8 relative">
                  <Quote size={28} style={{ color: 'var(--primary)', opacity: 0.4, marginBottom: 12 }} />
                  <p className="mb-6 leading-relaxed" style={{ color: 'var(--dark-muted)', fontSize: 15 }}>&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full brand-gradient flex items-center justify-center text-white font-bold text-sm">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold" style={{ color: 'var(--dark)' }}>{t.name}</p>
                      <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{t.event} · {t.location}</p>
                    </div>
                    <div className="ml-auto flex gap-0.5">
                      {[...Array(t.rating)].map((_, i) => <Star key={i} size={12} fill="#FF0000" color="#FF0000" />)}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==================== PRICING ==================== */}
      <section id="pricing" className="py-14 sm:py-24" style={{ background: 'var(--cream)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.div variants={fadeUp} className="section-tag" style={{ justifyContent: 'center', display: 'inline-flex' }}>
              <Package size={12} /> Pricing
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
              Simple, Transparent Pricing
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4" style={{ color: 'var(--text-muted)' }}>
              All tiers include: hardcover A4, AI layout, personal captions, religious content option
            </motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-3 gap-6">
            {pricing.map((plan) => (
              <motion.div key={plan.name} variants={fadeUp} className={`card-hover rounded-2xl p-8 relative ${plan.popular ? 'ring-2' : ''}`} style={{ background: 'white', border: `1px solid`, borderColor: plan.popular ? 'var(--primary)' : '#E8E8E8' }}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-white text-xs font-bold px-4 py-1 rounded-full brand-gradient">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-xl font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>{plan.name}</h3>
                <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>{plan.photos} photos · {plan.pages} pages</p>
                <div className="text-4xl font-bold mb-6 brand-text" style={{ fontFamily: "'Playfair Display', serif" }}>{plan.price}</div>
                <ul className="space-y-3 mb-8">
                  {['Hardcover A4 album', 'AI-designed layout', 'Custom captions', 'Religious blessings (optional)', `Ships in ${plan.delivery}`].map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm" style={{ color: 'var(--dark-muted)' }}>
                      <div className="w-4 h-4 rounded-full brand-gradient flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/order/new" className={plan.popular ? 'btn-primary w-full justify-center' : 'btn-outline w-full justify-center'} style={{ display: 'flex', width: '100%' }}>
                  Choose {plan.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==================== FAQ ==================== */}
      <section id="faq" className="py-14 sm:py-24" style={{ background: 'white' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Left side */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="lg:col-span-2">
              <motion.div variants={fadeUp} className="section-tag">
                <HelpCircle size={12} /> FAQ
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Got Questions?
              </motion.h2>
              <motion.p variants={fadeUp} style={{ color: 'var(--text-muted)', fontSize: 16, lineHeight: 1.7, marginBottom: 24 }}>
                Everything you need to know about creating your perfect album. Can&apos;t find what you&apos;re looking for?
              </motion.p>
              <motion.div variants={fadeUp}>
                <Link href="#" className="btn-outline" style={{ fontSize: 14, padding: '12px 28px' }}>
                  <MessageCircle size={16} /> Contact Support
                </Link>
              </motion.div>
              {/* Decorative image */}
              <motion.div variants={fadeUp} className="relative rounded-2xl overflow-hidden mt-8 hidden lg:block" style={{ height: 220 }}>
                <Image src="/album-sample-imgs/sample6.jpg" alt="Album creation process" fill className="object-cover" sizes="400px" />
              </motion.div>
            </motion.div>
            {/* Right side — FAQ accordion */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="lg:col-span-3">
              <FAQ />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER CTA ==================== */}
      <section className="py-16 sm:py-24 relative overflow-hidden" style={{ background: 'var(--dark)' }}>
        {/* Background image */}
        <div className="absolute inset-0 opacity-15">
          <Image src="/album-sample-imgs/sample10.jpg" alt="" fill className="object-cover" sizes="100vw" />
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
            Your memories deserve<br /><span className="brand-text">more than a phone screen</span>
          </h2>
          <p className="text-base sm:text-lg mb-8 sm:mb-10" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Turn your precious moments into a physical album that lasts a lifetime.
          </p>
          <Link href="/order/new" className="btn-primary" style={{ fontSize: 16, padding: '16px 40px', background: 'var(--primary)', boxShadow: '0 4px 30px rgba(255,0,0,0.4)' }}>
            Create My Album Now <ArrowRight size={17} />
          </Link>
        </motion.div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer style={{ background: '#0A0A0A', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '32px 24px' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full brand-gradient flex items-center justify-center">
              <BookOpen size={13} className="text-white" />
            </div>
            <span className="font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Holialby</span>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>© 2026 Holialby. All rights reserved.</p>
          <div className="flex gap-6">
            {['Privacy', 'Terms', 'Contact'].map(l => (
              <a key={l} href="#" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, textDecoration: 'none' }} className="hover:text-white transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
