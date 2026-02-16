'use client';

import { useState, useEffect } from 'react';
import { Solicitud, createSolicitud, deleteSolicitud } from '@/lib/api';
import dynamic from 'next/dynamic';

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

const SolicitudListSkeleton = () => (
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

const AlertMessageSkeleton = () => (
  <div className="skeleton-line" style={{ width: '100%', height: '50px', marginBottom: '20px' }}></div>
);

const FormularioSolicitud = dynamic(() => import('./FormularioSolicitud'), {
  loading: () => <FormularioSkeleton />,
  ssr: false,
});

const SolicitudList = dynamic(() => import('./SolicitudList'), {
  loading: () => <SolicitudListSkeleton />,
  ssr: true,
});

const AlertMessage = dynamic(() => import('./AlertMessage'), {
  loading: () => <AlertMessageSkeleton />,
  ssr: true,
});

export default function SolicitudManager({ initialSolicitudes }: SolicitudManagerProps) {
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
  }, [alert]);

  const handleSubmit = async (solicitudData: Omit<Solicitud, 'id' | 'fechaRegistro'>) => {
    try {
      const newSolicitud = await createSolicitud(solicitudData);
      setSolicitudes(prev => [newSolicitud, ...prev]);
      setAlert({ message: 'Solicitud creada exitosamente', type: 'success' });
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
      setAlert({ message: 'Selecciona al menos una solicitud para eliminar', type: 'error' });
      return;
    }

    if (!confirm(`¿Estás seguro de eliminar ${selectedIds.length} solicitud(es)?`)) {
      return;
    }

    try {
      for (const id of selectedIds) {
        await deleteSolicitud(id);
      }
      
      setSolicitudes(prev => prev.filter(s => !selectedIds.includes(s.id)));
      setSelectedIds([]);
      setAlert({ message: `${selectedIds.length} solicitud(es) eliminada(s) exitosamente`, type: 'success' });
    } catch (error) {
      setAlert({ message: (error as Error).message, type: 'error' });
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '40px 20px' }}>
      <div className="container">
        {/* Header Card */}
        <div className="card" style={{ marginBottom: '30px' }}>
          <div className="card-header">
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333', margin: 0 }}>
              Gestión de Solicitudes de Viaje
            </h1>
            <a href="/" className="btn btn-gray">
              Volver al Inicio
            </a>
          </div>
        </div>

        {/* Alert */}
        {alert && <AlertMessage message={alert.message} type={alert.type} />}

        {/* Grid de Formulario y Lista */}
        <div className="grid-2">
          {/* Formulario */}
          <div className="card">
            <h2 className="title">Nueva Solicitud</h2>
            <FormularioSolicitud onSubmit={handleSubmit} />
          </div>

          {/* Lista */}
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