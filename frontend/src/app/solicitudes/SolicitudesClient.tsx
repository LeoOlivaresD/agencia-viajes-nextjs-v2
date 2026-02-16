'use client';

import { useState, useEffect } from 'react';
import styles from './solicitudes.module.css';

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  
  const [formData, setFormData] = useState({
    dni: '',
    nombreCliente: '',
    origen: '',
    destino: '',
    tipoViaje: '',
    fechaSalida: '',
    horaSalida: '',
    fechaRegreso: '',
    horaRegreso: '',
    estado: 'pendiente',
    email: ''
  });

  useEffect(() => {
    loadSolicitudes();
  }, []);

  const loadSolicitudes = async () => {
    try {
      const response = await fetch('/api/solicitudes');
      const data = await response.json();
      
      if (data.success) {
        setSolicitudes(data.solicitudes);
      }
    } catch (err) {
      console.error('Error cargando solicitudes:', err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateEmail = (email: string) => {
    if (!email) return true;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.dni || !formData.nombreCliente || !formData.origen || 
        !formData.destino || !formData.tipoViaje || !formData.fechaSalida || 
        !formData.horaSalida || !formData.fechaRegreso || !formData.horaRegreso) {
      setError('Todos los campos son requeridos');
      return;
    }

    if (formData.email && !validateEmail(formData.email)) {
      setError('Formato de email invalido');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/solicitudes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (data.success) {
        setSuccess('Solicitud creada exitosamente');
        setFormData({
          dni: '',
          nombreCliente: '',
          origen: '',
          destino: '',
          tipoViaje: '',
          fechaSalida: '',
          horaSalida: '',
          fechaRegreso: '',
          horaRegreso: '',
          estado: 'pendiente',
          email: ''
        });
        loadSolicitudes();
        
        setTimeout(() => {
          setSuccess('');
        }, 3000);
      } else {
        setError(data.message || 'Error al crear solicitud');
      }
    } catch (err) {
      setError('Error al crear solicitud');
    } finally {
      setLoading(false);
    }
  };

  const formatFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={styles.solicitudesGrid}>
      <div className={styles.solicitudesFormSection}>
        <h2 className={styles.sectionTitle}>Nueva Solicitud</h2>
        
        {error && <div className={styles.errorMessage}>{error}</div>}
        {success && <div className={styles.successMessage}>{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="dni">DNI o Identificacion</label>
            <input
              type="text"
              id="dni"
              name="dni"
              value={formData.dni}
              onChange={handleChange}
              placeholder="Ej: 16414595-0"
              disabled={loading}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="nombreCliente">Nombre del Cliente</label>
            <input
              type="text"
              id="nombreCliente"
              name="nombreCliente"
              value={formData.nombreCliente}
              onChange={handleChange}
              placeholder="Ej: Esteban Castro Paredes"
              disabled={loading}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email (opcional)</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="cliente@ejemplo.com"
              disabled={loading}
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="origen">Origen</label>
              <input
                type="text"
                id="origen"
                name="origen"
                value={formData.origen}
                onChange={handleChange}
                placeholder="Santiago, Chile"
                disabled={loading}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="destino">Destino</label>
              <input
                type="text"
                id="destino"
                name="destino"
                value={formData.destino}
                onChange={handleChange}
                placeholder="Madrid, España"
                disabled={loading}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="tipoViaje">Tipo de Viaje</label>
            <select
              id="tipoViaje"
              name="tipoViaje"
              value={formData.tipoViaje}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="">Seleccione un tipo</option>
              <option value="negocios">Negocios</option>
              <option value="turismo">Turismo</option>
              <option value="otros">Otros</option>
            </select>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="fechaSalida">Fecha de Salida</label>
              <input
                type="date"
                id="fechaSalida"
                name="fechaSalida"
                value={formData.fechaSalida}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="horaSalida">Hora de Salida</label>
              <input
                type="time"
                id="horaSalida"
                name="horaSalida"
                value={formData.horaSalida}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="fechaRegreso">Fecha de Regreso</label>
              <input
                type="date"
                id="fechaRegreso"
                name="fechaRegreso"
                value={formData.fechaRegreso}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="horaRegreso">Hora de Regreso</label>
              <input
                type="time"
                id="horaRegreso"
                name="horaRegreso"
                value={formData.horaRegreso}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
          </div>

          <div className={styles.estadoGroup}>
            <label>Estado de la Solicitud</label>
            <div className={styles.radioGroup}>
              <div className={styles.radioOption}>
                <input
                  type="radio"
                  id="pendiente"
                  name="estado"
                  value="pendiente"
                  checked={formData.estado === 'pendiente'}
                  onChange={handleChange}
                  disabled={loading}
                />
                <label htmlFor="pendiente">Pendiente</label>
              </div>
              <div className={styles.radioOption}>
                <input
                  type="radio"
                  id="en-proceso"
                  name="estado"
                  value="en-proceso"
                  checked={formData.estado === 'en-proceso'}
                  onChange={handleChange}
                  disabled={loading}
                />
                <label htmlFor="en-proceso">En Proceso</label>
              </div>
              <div className={styles.radioOption}>
                <input
                  type="radio"
                  id="finalizada"
                  name="estado"
                  value="finalizada"
                  checked={formData.estado === 'finalizada'}
                  onChange={handleChange}
                  disabled={loading}
                />
                <label htmlFor="finalizada">Finalizada</label>
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            className={styles.btn}
            disabled={loading}
          >
            {loading ? 'Creando...' : 'Crear Solicitud'}
          </button>
        </form>
      </div>

      <div className={styles.solicitudesListSection}>
        <h2 className={styles.sectionTitle}>Lista de Solicitudes</h2>
        
        {solicitudes.length === 0 ? (
          <div className={styles.noSolicitudes}>
            No hay solicitudes registradas
          </div>
        ) : (
          solicitudes.map(solicitud => (
            <div key={solicitud.id} className={styles.solicitudCard}>
              <div className={styles.solicitudHeader}>
                <span className={styles.solicitudId}>#{solicitud.id}</span>
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
