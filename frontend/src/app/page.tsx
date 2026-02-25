'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import '@/app/i18n';

export default function Home() {
  const { t } = useTranslation('solicitud');

  return (
    <div className="home-container">
      <div className="home-card">
        <h1 className="home-title">{t('title')}</h1>
        <p className="home-subtitle">{t('title')}</p>

        <div style={{ background: '#f0f4ff', borderRadius: '20px', padding: '40px', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '600', color: '#667eea', marginBottom: '20px' }}>
            {t('formTitle')}
          </h2>

          <div className="home-features">
            <div className="feature-card">
              <div className="feature-icon">📝</div>
              <h3 className="feature-title">{t('button.submit')}</h3>
              <p className="feature-text">{t('message.noData')}</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3 className="feature-title">{t('filter.label')}</h3>
              <p className="feature-text">{t('filter.all')}</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🗑️</div>
              <h3 className="feature-title">{t('listTitle')}</h3>
              <p className="feature-text">{t('message.selectToDelete')}</p>
            </div>
          </div>
        </div>

        <div className="home-actions">
          <Link href="/solicitudes" className="btn btn-primary"
            style={{ fontSize: '1.1rem', padding: '15px 35px' }}>
            {t('listTitle')}
          </Link>

          <Link href="/solicitudes/ssr" className="btn btn-gray"
            style={{ fontSize: '1.1rem', padding: '15px 35px' }}>
            SSR
          </Link>
        </div>

        <div style={{ marginTop: '50px', paddingTop: '30px', borderTop: '1px solid #ddd' }}>
          <p style={{ fontSize: '0.9rem', color: '#888' }}>
            <strong>Proyecto Semana 8</strong> - Desarrollo Frontend III<br />
            Next.js 16 + TypeScript + Express Backend
          </p>
        </div>
      </div>
    </div>
  );
}