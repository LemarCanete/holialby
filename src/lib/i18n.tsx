'use client';

import { useEffect, useState } from 'react';
import { Globe } from 'lucide-react';

declare global {
  interface Window {
    google: {
      translate: {
        TranslateElement: new (
          options: { pageLanguage: string; includedLanguages: string; layout: number; autoDisplay: boolean },
          elementId: string
        ) => void;
      };
    };
    googleTranslateElementInit: () => void;
  }
}

export function GoogleTranslate() {
  const [isEnglish, setIsEnglish] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (document.getElementById('google-translate-script')) return;

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'he',
          includedLanguages: 'en,he',
          layout: 0,
          autoDisplay: false,
        },
        'google_translate_element'
      );
      setReady(true);
    };

    const script = document.createElement('script');
    script.id = 'google-translate-script';
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const toggleLanguage = () => {
    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
    if (!select) return;

    if (isEnglish) {
      // Switch back to Hebrew (original)
      select.value = '';
      select.dispatchEvent(new Event('change'));
    } else {
      // Switch to English
      select.value = 'en';
      select.dispatchEvent(new Event('change'));
    }
    setIsEnglish(!isEnglish);
  };

  return (
    <>
      {/* Hidden Google Translate element */}
      <div id="google_translate_element" style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', height: 0, overflow: 'hidden' }} />

      {/* Custom globe toggle button */}
      <button
        onClick={toggleLanguage}
        aria-label={isEnglish ? 'Switch to Hebrew' : 'Switch to English'}
        style={{
          position: 'fixed',
          top: 14,
          left: 14,
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(0, 0, 0, 0.1)',
          borderRadius: 50,
          padding: '7px 14px',
          cursor: 'pointer',
          fontSize: 13,
          fontWeight: 600,
          fontFamily: "'Heebo', 'Open Sans', sans-serif",
          color: '#121212',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.14)';
          e.currentTarget.style.transform = 'translateY(-1px)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        <Globe size={16} />
        <span>{isEnglish ? 'עברית' : 'EN'}</span>
      </button>
    </>
  );
}
