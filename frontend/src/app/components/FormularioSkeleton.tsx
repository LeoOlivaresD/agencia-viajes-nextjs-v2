export default function FormularioSkeleton() {
  return (
    <div style={{ padding: '10px 0' }}>
      {/* DNI */}
      <div style={{ marginBottom: '20px' }}>
        <div className="skeleton-line" style={{ width: '150px', height: '18px', marginBottom: '8px' }}></div>
        <div className="skeleton-line" style={{ width: '100%', height: '48px' }}></div>
      </div>

      {/* Nombre */}
      <div style={{ marginBottom: '20px' }}>
        <div className="skeleton-line" style={{ width: '180px', height: '18px', marginBottom: '8px' }}></div>
        <div className="skeleton-line" style={{ width: '100%', height: '48px' }}></div>
      </div>

      {/* Email */}
      <div style={{ marginBottom: '20px' }}>
        <div className="skeleton-line" style={{ width: '140px', height: '18px', marginBottom: '8px' }}></div>
        <div className="skeleton-line" style={{ width: '100%', height: '48px' }}></div>
      </div>

      {/* Origen y Destino */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
        <div>
          <div className="skeleton-line" style={{ width: '100px', height: '18px', marginBottom: '8px' }}></div>
          <div className="skeleton-line" style={{ width: '100%', height: '48px' }}></div>
        </div>
        <div>
          <div className="skeleton-line" style={{ width: '100px', height: '18px', marginBottom: '8px' }}></div>
          <div className="skeleton-line" style={{ width: '100%', height: '48px' }}></div>
        </div>
      </div>

      {/* Tipo de Viaje */}
      <div style={{ marginBottom: '20px' }}>
        <div className="skeleton-line" style={{ width: '130px', height: '18px', marginBottom: '8px' }}></div>
        <div className="skeleton-line" style={{ width: '100%', height: '48px' }}></div>
      </div>

      {/* Fecha y Hora Salida */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
        <div>
          <div className="skeleton-line" style={{ width: '120px', height: '18px', marginBottom: '8px' }}></div>
          <div className="skeleton-line" style={{ width: '100%', height: '48px' }}></div>
        </div>
        <div>
          <div className="skeleton-line" style={{ width: '110px', height: '18px', marginBottom: '8px' }}></div>
          <div className="skeleton-line" style={{ width: '100%', height: '48px' }}></div>
        </div>
      </div>

      {/* Radio buttons */}
      <div style={{ marginBottom: '20px' }}>
        <div className="skeleton-line" style={{ width: '180px', height: '18px', marginBottom: '12px' }}></div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <div className="skeleton-line" style={{ width: '100px', height: '20px' }}></div>
          <div className="skeleton-line" style={{ width: '110px', height: '20px' }}></div>
          <div className="skeleton-line" style={{ width: '100px', height: '20px' }}></div>
        </div>
      </div>

      {/* Botón */}
      <div className="skeleton-line" style={{ width: '100%', height: '48px', marginBottom: 0 }}></div>
    </div>
  );
}