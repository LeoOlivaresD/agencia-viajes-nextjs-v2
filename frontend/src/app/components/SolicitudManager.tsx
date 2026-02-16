'use client';

import { useState, useEffect } from 'react';
import { Solicitud, createSolicitud, deleteSolicitud } from '@/lib/api';
import dynamic from 'next/dynamic';

interface SolicitudManagerProps {
  initialSolicitudes: Solicitud[];
}

const FormularioSkeleton = () => (
  <div className="bg-white p-10 rounded-2xl shadow-2xl animate-pulse">
    <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
    <div className="space-y-5">
      <div className="h-12 bg-gray-200 rounded-lg"></div>
      <div className="h-12 bg-gray-200 rounded-lg"></div>
      <div className="h-12 bg-gray-200 rounded-lg"></div>
    </div>
  </div>
);

const SolicitudListSkeleton = () => (
  <div className="bg-white p-10 rounded-2xl shadow-2xl">
    <div className="h-8 bg-gray-200 rounded w-1/4 mb-6 animate-pulse"></div>
    {[1, 2, 3].map((i) => (
      <div key={i} className="bg-gray-50 p-5 rounded-xl mb-4 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    ))}
  </div>
);

const AlertMessageSkeleton = () => (
  <div className="p-4 rounded-lg bg-gray-100 animate-pulse">
    <div className="h-5 bg-gray-200 rounded w-1/2"></div>
  </div>
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
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 py-10 px-5">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Gestión de Solicitudes de Viaje</h1>
          <a 
            href="/"
            className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 hover:shadow-lg transition-all"
          >
            Volver al Inicio
          </a>
        </div>

        {/* Alert */}
        {alert && <AlertMessage message={alert.message} type={alert.type} />}

        {/* Grid de Formulario y Lista */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulario */}
          <div className="bg-white rounded-2xl shadow-2xl p-10">
            <h2 className="text-2xl font-bold text-purple-600 mb-6 pb-4 border-b-2 border-gray-200">
              Nueva Solicitud
            </h2>
            <FormularioSolicitud onSubmit={handleSubmit} />
          </div>

          {/* Lista */}
          <div className="bg-white rounded-2xl shadow-2xl p-10 max-h-[800px] overflow-y-auto">
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