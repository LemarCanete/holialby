'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Star, Heart, Camera, Package, ChevronRight, ChevronLeft,
  Sparkles, Shield, Globe, ArrowLeft, Quote, Play, Plus, Minus,
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
  { icon: '💍', name: 'חתונה', desc: 'סיפורי אהבה נצחיים' },
  { icon: '🎂', name: 'יום הולדת', desc: 'כל אבן דרך חשובה' },
  { icon: '✈️', name: 'חופשה', desc: 'הרפתקאות בדפוס' },
  { icon: '🕍', name: 'בר / בת מצווה', desc: 'אמונה וחגיגה' },
  { icon: '🎓', name: 'סיום לימודים', desc: 'כל הישג' },
  { icon: '❤️', name: 'יום נישואין', desc: 'שנים של זיכרונות' },
];

const steps = [
  { num: '01', title: 'בחרו את האירוע', desc: 'בחרו את סוג האירוע — חתונה, חופשה, יום הולדת ועוד. התאימו אישית עם שמות, תאריכים ונושאים.', icon: <Sparkles size={22} />, img: '/album-sample-imgs/sample6.jpg' },
  { num: '02', title: 'העלו את התמונות', desc: 'פשוט גררו ושחררו את הרגעים האהובים. ה-AI שלנו מנתח ומדרג כל תמונה לפריסה הטובה ביותר.', icon: <Camera size={22} />, img: '/album-sample-imgs/sample1.jpg' },
  { num: '03', title: 'ה-AI מעצב את האלבום', desc: 'המערכת שלנו מסדרת את התמונות, כותבת כיתובים ומוסיפה טקסט אישי — כולל ברכות דתיות אם תבחרו.', icon: <BookOpen size={22} />, img: '/album-sample-imgs/sample10.jpg' },
  { num: '04', title: 'נמסר עד הדלת', desc: 'אשרו את התצוגה המקדימה, ואנחנו מדפיסים את האלבום באיכות מדהימה ושולחים ישירות אליכם.', icon: <Package size={22} />, img: '/album-sample-imgs/sample9.jpg' },
];

const albumSlides = [
  { img: '/album-sample-imgs/sample9.jpg', label: 'הכריכה', desc: 'כריכה קשה עם כותרת ופרטי אירוע מותאמים', aspect: '4/3' },
  { img: '/album-sample-imgs/sample10.jpg', label: 'עמודים פנימיים', desc: 'פריסות תמונות מעוצבות ע"י AI עם כיתובים', aspect: '3/2' },
  { img: '/album-sample-imgs/sample3.jpg', label: 'רגעים משפחתיים', desc: 'כל זיכרון יקר מונצח באיכות מדהימה', aspect: '3/2' },
  { img: '/album-sample-imgs/sample5.jpg', label: 'דורות', desc: 'מתמונות ישנות לזיכרונות חדשים — הכל באלבום אחד', aspect: '4/3' },
  { img: '/album-sample-imgs/sample1.jpg', label: 'החוויה', desc: 'מזכרת מוחשית שאפשר להחזיק, לשתף ולאהוב', aspect: '2/3' },
];

const testimonials = [
  { name: 'רחל מ.', event: 'אלבום חתונה', text: 'בכיתי כשפתחתי את הקופסה. כל עמוד נראה כאילו עוצב ע"י אמן מקצועי. הברכות בעברית על הכריכה היו הנגיעה הכי יפה.', rating: 5, location: 'ניו יורק', img: '/album-sample-imgs/sample3.jpg' },
  { name: 'דוד כ.', event: 'אלבום חופשה — טיול בישראל', text: 'העלינו 60 תמונות מהטיול המשפחתי והאלבום חזר מסודר בצורה מושלמת — טקס, סיורים, אוכל, הכל בסדר הנכון. מדהים.', rating: 5, location: 'לונדון', img: '/album-sample-imgs/sample10.jpg' },
  { name: 'שרה וטום', event: 'אלבום יום נישואין', text: 'יום הנישואין העשירי שלנו ראוי למשהו מיוחד. האלבום תפס כל רגש בצורה מושלמת. נאהב אותו לנצח.', rating: 5, location: 'לוס אנג\'לס', img: '/album-sample-imgs/sample5.jpg' },
];

const pricing = [
  { name: 'בסיסי', photos: '20–30', pages: '~20', price: '$49', delivery: '14–21 ימים', popular: false },
  { name: 'קלאסי', photos: '30–50', pages: '~35', price: '$79', delivery: '10–14 ימים', popular: true },
  { name: 'דלוקס', photos: '50–80', pages: '~55', price: '$119', delivery: '7–10 ימים', popular: false },
];

const faqs = [
  { q: 'איך זה עובד?', a: 'זה פשוט! בחרו את סוג האירוע, העלו את התמונות (ממליצים 20–80), התאימו את הנושא והוסיפו ברכות דתיות. ה-AI שלנו מעצב פריסת אלבום יפה, מסדר את התמונות בסדר נרטיבי ויוצר כיתובים. אתם צופים ומאשרים לפני שאנחנו מדפיסים ושולחים.' },
  { q: 'אילו תמונות כדאי להעלות?', a: 'העלו את הרגעים הטובים ביותר — צילומי טקס, תמונות קבוצתיות, רגעים ספונטניים, נופים. ה-AI שלנו מדרג כל תמונה לפי איכות ובוחר את הטובות ביותר. ממליצים על לפחות 20 תמונות. פורמטים: JPG, PNG, HEIC עד 20MB.' },
  { q: 'כמה זמן לוקח המשלוח?', a: 'זמני המשלוח תלויים במסלול: בסיסי (14–21 ימי עסקים), קלאסי (10–14), דלוקס (7–10). כל ההזמנות כוללות משלוח חינם. אנחנו שולחים לכל העולם עם עדכוני מעקב במייל.' },
  { q: 'מה מדיניות ההחזרות?', a: 'אנחנו מציעים אחריות איכות של 14 יום. אם האלבום מגיע עם פגם פיזי — הדפסות שגויות, בעיות כריכה, עמודים פגומים — נדפיס מחדש ללא עלות. לאחר אישור התצוגה המקדימה, העיצוב נחשב סופי.' },
  { q: 'אפשר לכלול תוכן דתי?', a: 'בהחלט! אנחנו מציעים ברכות, פסוקים ותפילות מהיהדות, הנצרות, האסלאם, ההינדואיזם ומסורות אוניברסליות. בזמן ההתאמה, הפעילו את התוכן הדתי ובחרו את האמונה. ברכות ממוקמות על מחלקי פרקים והכריכה.' },
  { q: 'מה מפרט האלבום?', a: 'כל האלבומים בגודל A4 כריכה קשה (22 × 29 ס"מ) מודפסים על נייר 170 גרם באיכות 300 DPI. הכריכה כוללת כותרת, שמות ותאריך. נושאים: אלגנטי, כפרי, מודרני ורומנטי.' },
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
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)' }} />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p style={{ fontSize: 12, color: 'var(--primary-light)', letterSpacing: 2, fontWeight: 600, textTransform: 'uppercase', marginBottom: 6 }}>
                {current + 1} / {albumSlides.length}
              </p>
              <h3 style={{ fontFamily: "'Heebo', sans-serif", fontSize: 28, color: 'white', fontWeight: 700, marginBottom: 4 }}>
                {albumSlides[current].label}
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 15 }}>
                {albumSlides[current].desc}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        <button onClick={prev} className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all hover:scale-110" style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer', color: 'white' }}>
          <ChevronRight size={20} />
        </button>
        <button onClick={next} className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all hover:scale-110" style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer', color: 'white' }}>
          <ChevronLeft size={20} />
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
            className="w-full flex items-center justify-between p-5 text-right transition-colors"
            style={{ cursor: 'pointer', background: open === i ? 'rgba(255,0,0,0.03)' : 'white' }}
          >
            <span className="font-semibold pl-4" style={{ color: 'var(--dark)', fontSize: 16 }}>{faq.q}</span>
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
            <span className="font-bold text-lg sm:text-xl" style={{ fontFamily: "'Heebo', sans-serif", color: 'var(--dark)' }}>
              Holialby
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {[{ label: 'איך זה עובד', href: '#how-it-works' }, { label: 'גלריה', href: '#gallery' }, { label: 'מחירון', href: '#pricing' }, { label: 'שאלות נפוצות', href: '#faq' }].map(item => (
              <a key={item.label} href={item.href} style={{ color: 'var(--text-muted)', fontSize: 14, fontWeight: 500, textDecoration: 'none' }} className="hover:opacity-80 transition-opacity">{item.label}</a>
            ))}
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <Link href="/login" className="btn-outline" style={{ padding: '10px 24px', fontSize: 14 }}>התחברות</Link>
            <Link href="/order/new" className="btn-primary" style={{ padding: '10px 24px', fontSize: 14 }}>
              צור אלבום <ArrowLeft size={14} />
            </Link>
          </div>
          <button className="sm:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--dark)' }}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
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
                {[{ label: 'איך זה עובד', href: '#how-it-works' }, { label: 'גלריה', href: '#gallery' }, { label: 'מחירון', href: '#pricing' }, { label: 'שאלות נפוצות', href: '#faq' }].map(item => (
                  <a key={item.label} href={item.href} onClick={() => setMobileMenuOpen(false)} className="block py-2" style={{ color: 'var(--dark)', fontSize: 15, fontWeight: 500, textDecoration: 'none' }}>{item.label}</a>
                ))}
                <div className="flex gap-3 pt-2">
                  <Link href="/login" className="btn-outline flex-1 justify-center" style={{ padding: '10px 16px', fontSize: 14 }}>התחברות</Link>
                  <Link href="/order/new" className="btn-primary flex-1 justify-center" style={{ padding: '10px 16px', fontSize: 14 }}>צור אלבום</Link>
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
              <Sparkles size={12} /> אלבומי תמונות מונעי AI
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-3xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-4 sm:mb-6" style={{ color: 'var(--dark)' }}>
              האירוע שלך,<br />
              <span className="brand-text">נשמר</span><br />
              ביופי מושלם
            </motion.h1>
            <motion.p variants={fadeUp} className="text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed" style={{ color: 'var(--text-muted)', maxWidth: 460 }}>
              העלו תמונות מכל אירוע — חתונה, יום הולדת, חופשה.
              ה-AI שלנו מעצב אלבום מודפס מרהיב עם כיתובים אישיים,
              פריסות ייחודיות וברכות דתיות.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-10">
              <Link href="/order/new" className="btn-primary justify-center sm:justify-start" style={{ fontSize: 15, padding: '14px 32px' }}>
                התחילו את האלבום <ArrowLeft size={16} />
              </Link>
              <a href="#how-it-works" className="btn-outline justify-center sm:justify-start" style={{ fontSize: 15, padding: '14px 32px' }}>
                איך זה עובד
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
                <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>נאהב על ידי 2,400+ משפחות</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero image */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl" style={{ aspectRatio: '3/4' }}>
              <Image
                src="/album-sample-imgs/sample1.jpg"
                alt="אלבום תמונות"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 40%)' }} />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)' }}>
                  <p style={{ fontSize: 11, color: 'var(--primary)', fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 }}>אלבום חתונה</p>
                  <p style={{ fontFamily: "'Heebo', sans-serif", fontSize: 18, color: 'var(--dark)', fontWeight: 700 }}>שרה ודוד — יוני 2025</p>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>48 תמונות · 35 עמודים · נושא אלגנטי</p>
                </div>
              </div>
            </div>
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 3 }} className="absolute -top-4 -left-4 glass rounded-xl p-3 shadow-lg hidden sm:block">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full brand-gradient flex items-center justify-center">
                  <Heart size={14} className="text-white" />
                </div>
                <div>
                  <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--dark)' }}>עיצוב AI</p>
                  <p style={{ fontSize: 10, color: 'var(--text-muted)' }}>פריסה ייחודית</p>
                </div>
              </div>
            </motion.div>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 3.5, delay: 0.5 }} className="absolute -bottom-4 -right-4 glass rounded-xl p-3 shadow-lg hidden sm:block">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <Shield size={14} className="text-green-600" />
                </div>
                <div>
                  <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--dark)' }}>מוכן לדפוס</p>
                  <p style={{ fontSize: 10, color: 'var(--text-muted)' }}>איכות 300 DPI</p>
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
              <Globe size={12} /> לכל אירוע
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold">
              אלבומים לכל אירוע
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 text-lg max-w-xl mx-auto" style={{ color: 'var(--text-muted)' }}>
              מחגיגות אינטימיות ועד טקסים גדולים, אנחנו יוצרים את האלבום המושלם לרגע שלכם.
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
            <motion.div variants={fadeUp} className="lg:col-span-2 lg:sticky lg:top-32">
              <div className="section-tag" style={{ background: 'rgba(255,0,0,0.15)', color: 'var(--primary-light)', borderColor: 'rgba(255,0,0,0.3)' }}>
                <BookOpen size={12} /> גלו את האלבום
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                מהכריכה<br />עד העמוד האחרון
              </h2>
              <p className="mb-8" style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16, lineHeight: 1.7 }}>
                לחצו כדי לגלות איך האלבום שלכם נראה — מהכריכה הקשה ועד עמודי התמונות המעוצבים.
              </p>
              <div className="space-y-4">
                {[
                  { icon: <Shield size={18} />, text: 'כריכה קשה איכותית' },
                  { icon: <Camera size={18} />, text: 'פריסת תמונות ע"י AI' },
                  { icon: <Sparkles size={18} />, text: 'כיתובים וברכות מותאמות' },
                  { icon: <Package size={18} />, text: 'נייר 170 גרם איכותי' },
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
              <Play size={12} /> ראו בפעולה
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold">
              צפו בקסם קורה
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 text-lg max-w-xl mx-auto" style={{ color: 'var(--text-muted)' }}>
              ראו איך האלבומים שלנו נראים במציאות — מפתיחת החבילה ועד דפדוף בעמודים.
            </motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-2 gap-6">
            {[
              { src: '/album-sample-vids/sample1.mp4', label: 'פתיחת האלבום', desc: 'צפו בכריכה הקשה מגיעה' },
              { src: '/album-sample-vids/sample2.mp4', label: 'דפדוף בעמודים', desc: 'ראו את עיצובי ה-AI מתעוררים לחיים' },
              { src: '/album-sample-vids/sample3.mp4', label: 'תקריב איכות', desc: 'נייר 170 גרם עם הדפסה חיה' },
              { src: '/album-sample-vids/sample4.mp4', label: 'המתנה המושלמת', desc: 'מזכרת שנשמרת לדורות' },
            ].map((vid) => (
              <motion.div key={vid.label} variants={fadeUp} className="rounded-2xl overflow-hidden card-hover" style={{ background: 'var(--cream)', border: '1px solid #E8E8E8' }}>
                <div className="relative" style={{ aspectRatio: '16/9' }}>
                  <video src={vid.src} autoPlay muted loop playsInline className="w-full h-full object-cover" />
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
              <BookOpen size={12} /> התהליך
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold">
              איך זה עובד
            </motion.h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="space-y-8">
            {steps.map((step, i) => (
              <motion.div key={step.num} variants={fadeUp} className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
                <div className={`relative rounded-2xl overflow-hidden shadow-lg ${i % 2 === 1 ? 'md:order-2' : ''}`} style={{ aspectRatio: '4/3' }}>
                  <Image src={step.img} alt={step.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)' }} />
                  <div className="absolute bottom-4 right-4">
                    <div className="w-12 h-12 rounded-full brand-gradient flex items-center justify-center text-white shadow-lg">
                      {step.icon}
                    </div>
                  </div>
                </div>
                <div className={`${i % 2 === 1 ? 'md:order-1' : ''}`}>
                  <span className="text-5xl sm:text-6xl font-bold" style={{ color: 'var(--primary)', opacity: 0.12 }}>{step.num}</span>
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 -mt-6">{step.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: 15, lineHeight: 1.7 }}>{step.desc}</p>
                  {i < steps.length - 1 && (
                    <div className="mt-4 hidden md:block" style={{ width: 2, height: 40, background: 'rgba(255,0,0,0.15)', marginRight: 4 }} />
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-14">
            <Link href="/order/new" className="btn-primary" style={{ fontSize: 16, padding: '16px 48px' }}>
              התחילו ליצור את האלבום שלי <ArrowLeft size={16} />
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
              <Heart size={12} /> סיפורי לקוחות
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold">
              משפחות אוהבות את האלבומים
            </motion.h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <motion.div key={t.name} variants={fadeUp} className="card-hover rounded-2xl overflow-hidden" style={{ background: 'var(--cream)', border: '1px solid #E8E8E8' }}>
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
                    <div className="mr-auto flex gap-0.5">
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
              <Package size={12} /> מחירון
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold">
              מחירים פשוטים ושקופים
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4" style={{ color: 'var(--text-muted)' }}>
              כל המסלולים כוללים: כריכה קשה A4, עיצוב AI, כיתובים אישיים, תוכן דתי
            </motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-3 gap-6">
            {pricing.map((plan) => (
              <motion.div key={plan.name} variants={fadeUp} className={`card-hover rounded-2xl p-8 relative ${plan.popular ? 'ring-2' : ''}`} style={{ background: 'white', border: `1px solid`, borderColor: plan.popular ? 'var(--primary)' : '#E8E8E8' }}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-white text-xs font-bold px-4 py-1 rounded-full brand-gradient">
                    הכי פופולרי
                  </div>
                )}
                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>{plan.photos} תמונות · {plan.pages} עמודים</p>
                <div className="text-4xl font-bold mb-6 brand-text">{plan.price}</div>
                <ul className="space-y-3 mb-8">
                  {[`אלבום A4 כריכה קשה`, `עיצוב פריסה ע"י AI`, 'כיתובים מותאמים', 'ברכות דתיות (אופציונלי)', `משלוח תוך ${plan.delivery}`].map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm" style={{ color: 'var(--dark-muted)' }}>
                      <div className="w-4 h-4 rounded-full brand-gradient flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/order/new" className={plan.popular ? 'btn-primary w-full justify-center' : 'btn-outline w-full justify-center'} style={{ display: 'flex', width: '100%' }}>
                  בחרו {plan.name}
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
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="lg:col-span-2">
              <motion.div variants={fadeUp} className="section-tag">
                <HelpCircle size={12} /> שאלות נפוצות
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold mb-4">
                יש שאלות?
              </motion.h2>
              <motion.p variants={fadeUp} style={{ color: 'var(--text-muted)', fontSize: 16, lineHeight: 1.7, marginBottom: 24 }}>
                כל מה שצריך לדעת על יצירת האלבום המושלם שלכם. לא מצאתם?
              </motion.p>
              <motion.div variants={fadeUp}>
                <Link href="#" className="btn-outline" style={{ fontSize: 14, padding: '12px 28px' }}>
                  <MessageCircle size={16} /> צרו קשר
                </Link>
              </motion.div>
              <motion.div variants={fadeUp} className="relative rounded-2xl overflow-hidden mt-8 hidden lg:block" style={{ height: 220 }}>
                <Image src="/album-sample-imgs/sample6.jpg" alt="תהליך יצירת אלבום" fill className="object-cover" sizes="400px" />
              </motion.div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="lg:col-span-3">
              <FAQ />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER CTA ==================== */}
      <section className="py-16 sm:py-24 relative overflow-hidden" style={{ background: 'var(--dark)' }}>
        <div className="absolute inset-0 opacity-15">
          <Image src="/album-sample-imgs/sample10.jpg" alt="" fill className="object-cover" sizes="100vw" />
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-white">
            הזיכרונות שלכם ראויים<br /><span className="brand-text">ליותר ממסך טלפון</span>
          </h2>
          <p className="text-base sm:text-lg mb-8 sm:mb-10" style={{ color: 'rgba(255,255,255,0.6)' }}>
            הפכו את הרגעים היקרים לאלבום מודפס שנשמר לכל החיים.
          </p>
          <Link href="/order/new" className="btn-primary" style={{ fontSize: 16, padding: '16px 40px', background: 'var(--primary)', boxShadow: '0 4px 30px rgba(255,0,0,0.4)' }}>
            צרו את האלבום שלי עכשיו <ArrowLeft size={17} />
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
            <span className="font-bold text-white" style={{ fontFamily: "'Heebo', sans-serif" }}>Holialby</span>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>© 2026 Holialby. כל הזכויות שמורות.</p>
          <div className="flex gap-6">
            {['פרטיות', 'תנאי שימוש', 'צור קשר'].map(l => (
              <a key={l} href="#" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, textDecoration: 'none' }} className="hover:text-white transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
