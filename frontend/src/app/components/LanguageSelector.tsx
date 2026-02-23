'use client'

import { useLanguage } from '../context/LanguageContext'

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value as 'es' | 'en')}
      style={{
        background: 'white',
        border: '2px solid #667eea',
        borderRadius: '8px',
        padding: '8px 12px',
        fontSize: '0.9rem',
        fontWeight: '600',
        cursor: 'pointer',
        color: '#333'
      }}
    >
      <option value="es">🇨🇱 Español</option>
      <option value="en">🇺🇸 English</option>
    </select>
  );
}