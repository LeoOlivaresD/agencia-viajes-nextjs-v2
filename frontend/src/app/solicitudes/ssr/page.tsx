import Link from 'next/link';
import styles from './ssr.module.css';

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

async function getSolicitudes(): Promise<Solicitud[]> {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    const response = await fetch(`${API_URL}/solicitudes/all`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return data.solicitudes || [];
  } catch (error) {
    console.error('Error obteniendo solicitudes:', error);
    return [];
  }
}

export default async function SolicitudesSSRPage() {
  const solicitudes = await getSolicitudes();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1>Solicitudes de Viaje - SSR</h1>
          <Link href="/" className={styles.btnBack}>
            Volver al Inicio
          </Link>
        </div>

        <div className={styles.solicitudesList}>
          {solicitudes.length === 0 ? (
            <p className={styles.noSolicitudes}>No hay solicitudes registradas</p>
          ) : (
            solicitudes.map(sol => (
              <div key={sol.id} className={styles.solicitudItem}>
                <h3>Solicitud #{sol.id}</h3>
                <p><strong>Cliente:</strong> {sol.nombreCliente}</p>
                <p><strong>DNI:</strong> {sol.dni}</p>
                <p><strong>Ruta:</strong> {sol.origen} - {sol.destino}</p>
                <p><strong>Tipo:</strong> {sol.tipoViaje}</p>
                <p><strong>Salida:</strong> {sol.fechaSalida} {sol.horaSalida}</p>
                <p><strong>Regreso:</strong> {sol.fechaRegreso} {sol.horaRegreso}</p>
                <p><strong>Estado:</strong> {sol.estado}</p>
                {sol.fechaRegistro && (
                  <p><strong>Registrado:</strong> {new Date(sol.fechaRegistro).toLocaleString('es-ES')}</p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
