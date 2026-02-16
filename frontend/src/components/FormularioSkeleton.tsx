import styles from './FormularioSkeleton.module.css';

export default function FormularioSkeleton() {
  return (
    <div className={styles.formSkeleton}>
      {/* DNI */}
      <div className={styles.skeletonField}>
        <div className={styles.skeletonLabel}></div>
        <div className={styles.skeletonInput}></div>
      </div>

      {/* Nombre */}
      <div className={styles.skeletonField}>
        <div className={styles.skeletonLabel}></div>
        <div className={styles.skeletonInput}></div>
      </div>

      {/* Email */}
      <div className={styles.skeletonField}>
        <div className={styles.skeletonLabel}></div>
        <div className={styles.skeletonInput}></div>
      </div>

      {/* Origen y Destino */}
      <div className={styles.skeletonRow}>
        <div className={styles.skeletonField}>
          <div className={styles.skeletonLabel}></div>
          <div className={styles.skeletonInput}></div>
        </div>
        <div className={styles.skeletonField}>
          <div className={styles.skeletonLabel}></div>
          <div className={styles.skeletonInput}></div>
        </div>
      </div>

      {/* Tipo de Viaje */}
      <div className={styles.skeletonField}>
        <div className={styles.skeletonLabel}></div>
        <div className={styles.skeletonInput}></div>
      </div>

      {/* Fecha y Hora Salida */}
      <div className={styles.skeletonRow}>
        <div className={styles.skeletonField}>
          <div className={styles.skeletonLabel}></div>
          <div className={styles.skeletonInput}></div>
        </div>
        <div className={styles.skeletonField}>
          <div className={styles.skeletonLabel}></div>
          <div className={styles.skeletonInput}></div>
        </div>
      </div>

      {/* Fecha y Hora Regreso */}
      <div className={styles.skeletonRow}>
        <div className={styles.skeletonField}>
          <div className={styles.skeletonLabel}></div>
          <div className={styles.skeletonInput}></div>
        </div>
        <div className={styles.skeletonField}>
          <div className={styles.skeletonLabel}></div>
          <div className={styles.skeletonInput}></div>
        </div>
      </div>

      {/* Radio Buttons */}
      <div className={styles.skeletonField}>
        <div className={styles.skeletonLabel}></div>
        <div className={styles.skeletonRadioGroup}>
          <div className={styles.skeletonRadio}></div>
          <div className={styles.skeletonRadio}></div>
          <div className={styles.skeletonRadio}></div>
        </div>
      </div>

      {/* Botón */}
      <div className={styles.skeletonButton}></div>
    </div>
  );
}