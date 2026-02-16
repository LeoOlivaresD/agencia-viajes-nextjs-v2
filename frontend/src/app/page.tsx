import Link from 'next/link';

export default function Home() {
  return (
    <div className="home-container">
      <div className="home-card">
        <h1 className="home-title">Agencia de Viajes Oeste</h1>
        <p className="home-subtitle">Sistema de Gestión de Solicitudes de Viaje</p>
        
        <div style={{ background: '#f0f4ff', borderRadius: '20px', padding: '40px', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '600', color: '#667eea', marginBottom: '20px' }}>
            Bienvenido al Sistema
          </h2>
          <p style={{ color: '#555', marginBottom: '30px', lineHeight: '1.6' }}>
            Gestiona todas tus solicitudes de viaje de manera eficiente. 
            Crea nuevas solicitudes, filtra por estado y administra tu información en tiempo real.
          </p>
          
          <div className="home-features">
            <div className="feature-card">
              <div className="feature-icon">📝</div>
              <h3 className="feature-title">Crear Solicitudes</h3>
              <p className="feature-text">
                Registra nuevas solicitudes de viaje con todos los detalles necesarios
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3 className="feature-title">Filtrar y Buscar</h3>
              <p className="feature-text">
                Filtra solicitudes por estado: pendiente, en proceso o finalizada
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🗑️</div>
              <h3 className="feature-title">Gestionar</h3>
              <p className="feature-text">
                Elimina solicitudes de forma individual o múltiple fácilmente
              </p>
            </div>
          </div>
        </div>

        <div className="home-actions">
          <Link href="/solicitudes" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '15px 35px' }}>
            Ir a Solicitudes
          </Link>
          
          <Link href="/solicitudes/ssr" className="btn btn-gray" style={{ fontSize: '1.1rem', padding: '15px 35px' }}>
            Ver SSR (Server-Side)
          </Link>
        </div>

        <div style={{ marginTop: '50px', paddingTop: '30px', borderTop: '1px solid #ddd' }}>
          <p style={{ fontSize: '0.9rem', color: '#888' }}>
            <strong>Proyecto Semana 6</strong> - Desarrollo Frontend III<br />
            Next.js 15 + TypeScript + Express Backend
          </p>
        </div>
      </div>
    </div>
  );
}