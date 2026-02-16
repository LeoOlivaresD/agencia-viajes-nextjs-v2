export default function FormularioSkeleton() {
  return (
    <div className="skeleton">
      <div className="skeleton-line" style={{ width: '150px', marginBottom: '10px' }}></div>
      <div className="skeleton-line" style={{ width: '100%', height: '48px', marginBottom: '20px' }}></div>
      
      <div className="skeleton-line" style={{ width: '150px', marginBottom: '10px' }}></div>
      <div className="skeleton-line" style={{ width: '100%', height: '48px', marginBottom: '20px' }}></div>
      
      <div className="skeleton-line" style={{ width: '150px', marginBottom: '10px' }}></div>
      <div className="skeleton-line" style={{ width: '100%', height: '48px', marginBottom: '20px' }}></div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
        <div className="skeleton-line" style={{ width: '100%', height: '48px' }}></div>
        <div className="skeleton-line" style={{ width: '100%', height: '48px' }}></div>
      </div>
      
      <div className="skeleton-line" style={{ width: '100%', height: '48px', marginBottom: '20px' }}></div>
      <div className="skeleton-line" style={{ width: '100%', height: '48px' }}></div>
    </div>
  );
}