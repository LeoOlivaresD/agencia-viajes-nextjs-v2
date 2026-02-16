import Link from 'next/link';
import SolicitudesClient from './SolicitudesClient';
import styles from './solicitudes.module.css';

export default function SolicitudesPage() {
  return (
    <div className={styles.solicitudesContainer}>
      <div className={styles.solicitudesContent}>
        <div className={styles.solicitudesHeader}>
          <h1>Gestion de Solicitudes de Viaje</h1>
          <Link href="/" className={styles.btnBack}>
            Volver al Inicio
          </Link>
        </div>

        <SolicitudesClient />
      </div>
    </div>
  );
}
