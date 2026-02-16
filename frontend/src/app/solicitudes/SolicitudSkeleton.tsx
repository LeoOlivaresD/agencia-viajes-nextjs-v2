import styles from './SolicitudSkeleton.module.css';

export default function SolicitudSkeleton() {
  return (
    <div className={styles.skeletonCard}>
      <div className={styles.skeletonHeader}>
        <div className={styles.skeletonId}></div>
        <div className={styles.skeletonEstado}></div>
      </div>
      <div className={styles.skeletonInfo}>
        <div className={styles.skeletonLine}></div>
        <div className={styles.skeletonLine}></div>
        <div className={styles.skeletonLine}></div>
        <div className={styles.skeletonLine}></div>
        <div className={styles.skeletonLine}></div>
        <div className={styles.skeletonLine}></div>
      </div>
    </div>
  );
}