'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import styles from './solicitudes.module.css';
import SolicitudSkeleton from '../../components/SolicitudSkeleton';
import FormularioSkeleton from '../../components/FormularioSkeleton';

// Lazy loading del componente de formulario SIN loading component
const FormularioSolicitud = dynamic(() => import('./FormularioSolicitud'), {
  ssr: false
});

interface Solicitud {
  id: number;
  dni: string;
  nombreCliente: string;
  origen: string;
  destino: string;
  tipoViaje: string;
  fechaSalida: string;
  horaSalida: string;
  fechaRegreso: string;
  horaRegreso: string;
  estado: string;
  email?: string;
  fechaRegistro?: string;
}

export default function SolicitudesClient() {
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [filtroEstado, setFiltroEstado] = useState<string>('todas');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  useEffect(() => {
    loadSolicitudes();
    simulateFormLoading();
  }, []);

  const simulateFormLoading = async () => {
    // Simular espera de 3 segundos para el formulario
    await new Promise(resolve => setTimeout(resolve, 3000));
    setFormLoading(false);
  };

  const loadSolicitudes = async () => {
    setLoading(true);
    try {
      // Simular espera de 3 segundos
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const response = await fetch('/api/solicitudes');
      const data = await response.json();
      
      if (data.success) {
        setSolicitudes(data.solicitudes);
      }
    } catch (err) {
      console.error('Error cargando solicitudes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSolicitudCreated = () => {
    loadSolicitudes();
  };

  const formatFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
      setError('Selecciona al menos una solicitud para eliminar');
      setTimeout(() => setError(''), 3000);
      return;
    }

    if (!confirm(`¿Estás seguro de eliminar ${selectedIds.length} solicitud(es)?`)) {
      return;
    }

    try {
      for (const id of selectedIds) {
        await fetch(`/api/solicitudes/${id}`, {
          method: 'DELETE'
        });
      }
      
      setSuccess(`${selectedIds.length} solicitud(es) eliminada(s) exitosamente`);
      setSelectedIds([]);
      loadSolicitudes();
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Error al eliminar solicitudes');
      setTimeout(() => setError(''), 3000);
    }
  };

  const solicitudesFiltradas = filtroEstado === 'todas' 
    ? solicitudes 
    : solicitudes.filter(sol => sol.estado === filtroEstado);

  return (
    <div className={styles.solicitudesGrid}>
      <div className={styles.solicitudesFormSection}>
        <h2 className={styles.sectionTitle}>Nueva Solicitud</h2>
        {formLoading ? (
          <FormularioSkeleton />
        ) : (
          <FormularioSolicitud onSolicitudCreated={handleSolicitudCreated} />
        )}
      </div>

      <div className={styles.solicitudesListSection}>
        <h2 className={styles.sectionTitle}>Lista de Solicitudes</h2>
        
        {error && <div className={styles.errorMessage}>{error}</div>}
        {success && <div className={styles.successMessage}>{success}</div>}
        
        <div className={styles.filterGroup}>
          <label htmlFor="filtroEstado">Filtrar por estado:</label>
          <select
            id="filtroEstado"
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="todas">Todas</option>
            <option value="pendiente">Pendiente</option>
            <option value="en-proceso">En Proceso</option>
            <option value="finalizada">Finalizada</option>
          </select>
        </div>

        {selectedIds.length > 0 && (
          <button 
            onClick={handleDeleteSelected}
            className={styles.btnDelete}
          >
            Eliminar seleccionadas ({selectedIds.length})
          </button>
        )}
        
        {loading ? (
          <>
            <SolicitudSkeleton />
            <SolicitudSkeleton />
            <SolicitudSkeleton />
          </>
        ) : solicitudesFiltradas.length === 0 ? (
          <div className={styles.noSolicitudes}>
            {filtroEstado === 'todas' 
              ? 'No hay solicitudes registradas' 
              : `No hay solicitudes con estado: ${filtroEstado}`}
          </div>
        ) : (
          solicitudesFiltradas.map(solicitud => (
            <div key={solicitud.id} className={styles.solicitudCard}>
              <div className={styles.solicitudHeader}>
                <div className={styles.solicitudHeaderLeft}>
                  <input 
                    type="checkbox"
                    checked={selectedIds.includes(solicitud.id)}
                    onChange={() => handleCheckboxChange(solicitud.id)}
                    className={styles.checkbox}
                  />
                  <span className={styles.solicitudId}>#{solicitud.id}</span>
                </div>
                <span className={`${styles.solicitudEstado} ${styles[`estado${solicitud.estado.replace('-', '')}`]}`}>
                  {solicitud.estado.replace('-', ' ').toUpperCase()}
                </span>
              </div>
              <div className={styles.solicitudInfo}>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Cliente:</span>
                  <span className={styles.infoValue}>{solicitud.nombreCliente}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>DNI:</span>
                  <span className={styles.infoValue}>{solicitud.dni}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Ruta:</span>
                  <span className={styles.infoValue}>{solicitud.origen} - {solicitud.destino}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Tipo:</span>
                  <span className={styles.infoValue}>{solicitud.tipoViaje}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Salida:</span>
                  <span className={styles.infoValue}>{formatFecha(solicitud.fechaSalida)} {solicitud.horaSalida}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Regreso:</span>
                  <span className={styles.infoValue}>{formatFecha(solicitud.fechaRegreso)} {solicitud.horaRegreso}</span>
                </div>
                {solicitud.fechaRegistro && (
                  <div className={styles.infoRow}>
                    <span className={styles.infoLabel}>Registrado:</span>
                    <span className={styles.infoValue}>
                      {new Date(solicitud.fechaRegistro).toLocaleString('es-ES')}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}