export default function SolicitudListSkeleton() {
  return (
    <div>
      <div className="skeleton-line" style={{ width: '200px', height: '32px', marginBottom: '25px' }}></div>
      
      <div className="filter-group" style={{ background: '#f0f0f0', animation: 'pulse 1.5s ease-in-out infinite' }}>
        <div className="skeleton-line" style={{ width: '100%', height: '40px', margin: 0 }}></div>
      </div>
      
      {[1, 2, 3].map((i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton-header">
            <div className="skeleton-id"></div>
            <div className="skeleton-estado"></div>
          </div>
          <div className="skeleton-line" style={{ width: '70%' }}></div>
          <div className="skeleton-line" style={{ width: '60%' }}></div>
          <div className="skeleton-line" style={{ width: '85%' }}></div>
          <div className="skeleton-line" style={{ width: '50%' }}></div>
          <div className="skeleton-line" style={{ width: '75%' }}></div>
          <div className="skeleton-line" style={{ width: '65%', marginBottom: 0 }}></div>
        </div>
      ))}
    </div>
  );
}