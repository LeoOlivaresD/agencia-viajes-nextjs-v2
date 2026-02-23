'use client';

import { useState, useEffect } from 'react';
import { Solicitud, createSolicitud, deleteSolicitud } from '@/lib/api';
import dynamic from 'next/dynamic';
import { useTranslation } from 'react-i18next';
import '@/app/i18n';

interface SolicitudManagerProps {
  initialSolicitudes: Solicitud[];
}

const FormularioSkeleton = () => (
  <div className="skeleton" style={{ padding: '20px' }}>
    <div className="skeleton-line" style={{ width: '200px', height: '32px', marginBottom: '30px' }}></div>
    <div className="skeleton-line" style={{ width: '100%', height: '48px', marginBottom: '20px' }}></div>
    <div className="skeleton-line" style={{ width: '100%', height: '48px', marginBottom: '20px' }}></div>
    <div className="skeleton-line" style={{ width: '100%', height: '48px', marginBottom: '20px' }}></div>
  </div>
);

const SolicitudListSkeletonFallback = () => (
  <div style={{ padding: '20px' }}>
    <div className="skeleton-line" style={{ width: '25%', height: '32px', marginBottom: '20px' }}></div>
    {[1, 2, 3].map((i) => (
      <div key={i} className="skeleton-card">
        <div className="skeleton-line" style={{ width: '70%', marginBottom: '10px' }}></div>
        <div className="skeleton-line" style={{ width: '50%' }}></div>
      </div>
    ))}
  </div>
);

const AlertSkeleton = () => (
  <div className="skeleton-line" style={{ width: '100%', height: '50px', marginBottom: '20px' }}></div>
);

const FormularioSolicitud = dynamic(() => import('./FormularioSolicitud'), {
  loading: () => <FormularioSkeleton />,
  ssr: false,
});

const SolicitudList = dynamic(() => import('./SolicitudList'), {
  loading: () => <SolicitudListSkeletonFallback />,
  ssr: true,
});

const AlertMessage = dynamic(() => import('./AlertMessage'), {
  loading: () => <AlertSkeleton />,
  ssr: true,
});

export default function SolicitudManager({ initialSolicitudes }: SolicitudManagerProps) {
  const { t } = useTranslation('solicitud');
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>(initialSolicitudes);
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [filtroEstado, setFiltroEstado] = useState<string>('todas');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  useEffect(() => {
    setSolicitudes(initialSolicitudes);
  }, [initialSolicitudes]);

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 3000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [alert]);

  const handleSubmit = async (solicitudData: Omit<Solicitud, 'id' | 'fechaRegistro'>) => {
    try {
      const newSolicitud = await createSolicitud(solicitudData);
      setSolicitudes(prev => [newSolicitud, ...prev]);
      setAlert({ message: t('message.created'), type: 'success' });
    } catch (error) {
      setAlert({ message: (error as Error).message, type: 'error' });
    }
  };

  const handleCheckboxChange = (id: number) => {
    setSelectedIds(prev =>
      prev.includes(id)
        ? prev.filter(selectedId => selectedId !== id)
        : [...prev, id]
    );
  };

  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) {
      setAlert({ message: t('message.selectToDelete'), type: 'error' });
      return;
    }

    if (!confirm(t('message.confirmDelete', { count: selectedIds.length }))) {
      return;
    }

    try {
      for (const id of selectedIds) {
        await deleteSolicitud(id);
      }
      setSolicitudes(prev => prev.filter(s => !selectedIds.includes(s.id)));
      setSelectedIds([]);
      setAlert({ message: t('message.deleted', { count: selectedIds.length }), type: 'success' });
    } catch (error) {
      setAlert({ message: (error as Error).message, type: 'error' });
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '40px 20px' }}>
      <div className="container">
        <div className="card" style={{ marginBottom: '30px' }}>
          <div className="card-header">
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333', margin: 0 }}>
              {t('title')}
            </h1>
            <a href="/" className="btn btn-gray">
              {t('button.cancel', { ns: 'common' })}
            </a>
          </div>
        </div>

        {alert && <AlertMessage message={alert.message} type={alert.type} />}

        <div className="grid-2">
          <div className="card">
            <h2 className="title">{t('formTitle')}</h2>
            <FormularioSolicitud onSubmit={handleSubmit} />
          </div>

          <div className="card scroll-container">
            <SolicitudList
              solicitudes={solicitudes}
              filtroEstado={filtroEstado}
              selectedIds={selectedIds}
              onCheckboxChange={handleCheckboxChange}
              onDeleteSelected={handleDeleteSelected}
              onFilterChange={setFiltroEstado}
            />
          </div>
        </div>
      </div>
    </div>
  );
}