import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.brandSection}>
          <h1 className={styles.brandTitle}>Agencia de Viajes Oeste</h1>
          <p className={styles.brandSubtitle}>Tu próxima aventura comienza aquí</p>
        </div>

        <div className={styles.actionSection}>
          <h2>Bienvenido</h2>
          <p className={styles.description}>
            Sistema de gestión de solicitudes de viaje con Server-Side Rendering
          </p>
          
          <div className={styles.buttonGroup}>
            <Link href="/solicitudes" className={styles.btnPrimary}>
              Gestionar Solicitudes
            </Link>
            <Link href="/solicitudes/ssr" className={styles.btnSecondary}>
              Ver Solicitudes (SSR)
            </Link>
          </div>

          <div className={styles.features}>
            <div className={styles.feature}>
              <span className={styles.icon}>✓</span>
              <span>Renderizado del Servidor</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.icon}>✓</span>
              <span>API REST Backend</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.icon}>✓</span>
              <span>TypeScript + Next.js 15</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
