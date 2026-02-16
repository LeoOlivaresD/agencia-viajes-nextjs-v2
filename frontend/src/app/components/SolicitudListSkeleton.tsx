export default function SolicitudListSkeleton() {
  return (
    <div>
      <div className="skeleton-line" style={{ width: '25%', height: '32px', marginBottom: '20px' }}></div>
      
      <div className="filter-group skeleton">
        <div className="skeleton-line" style={{ width: '100%', height: '40px' }}></div>
      </div>
      
      {[1, 2, 3].map((i) => (
        <div key={i} className="skeleton-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
            <div className="skeleton-line" style={{ width: '100px' }}></div>
            <div className="skeleton-line" style={{ width: '120px', borderRadius: '20px' }}></div>
          </div>
          <div className="skeleton-line" style={{ width: '70%' }}></div>
          <div className="skeleton-line" style={{ width: '60%' }}></div>
          <div className="skeleton-line" style={{ width: '85%' }}></div>
          <div className="skeleton-line" style={{ width: '50%' }}></div>
          <div className="skeleton-line" style={{ width: '75%' }}></div>
          <div className="skeleton-line" style={{ width: '65%' }}></div>
        </div>
      ))}
    </div>
  );
}