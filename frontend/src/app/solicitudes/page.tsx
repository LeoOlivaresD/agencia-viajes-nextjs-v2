import { Suspense } from 'react';
import SolicitudManager from '../components/SolicitudManager';
import { getSolicitudes, Solicitud } from '@/lib/api';

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function SolicitudesLoader() {
  let solicitudes: Solicitud[] = [];
  try {
    await delay(3000); // Simula retraso de red (skeleton loading)
    solicitudes = await getSolicitudes();
  } catch (error) {
    console.error('Error fetching solicitudes:', error);
  }

  return <SolicitudManager initialSolicitudes={solicitudes} />;
}

export default async function SolicitudesPage() {
  return (
    <Suspense fallback={<SolicitudManagerSkeleton />}>
      <SolicitudesLoader />
    </Suspense>
  );
}

function SolicitudManagerSkeleton() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '40px 20px' }}>
      <div className="container">
        {/* Header Skeleton */}
        <div className="card skeleton" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <div className="skeleton-line" style={{ width: '300px', height: '32px' }}></div>
          <div className="skeleton-line" style={{ width: '150px', height: '48px', borderRadius: '8px' }}></div>
        </div>

        {/* Grid Skeleton */}
        <div className="grid-2">
          {/* Formulario Skeleton */}
          <div className="card skeleton">
            <div className="skeleton-line" style={{ width: '200px', height: '32px', marginBottom: '30px' }}></div>
            <div className="skeleton-line" style={{ width: '100%', height: '48px', marginBottom: '20px' }}></div>
            <div className="skeleton-line" style={{ width: '100%', height: '48px', marginBottom: '20px' }}></div>
            <div className="skeleton-line" style={{ width: '100%', height: '48px', marginBottom: '20px' }}></div>
            <div className="skeleton-line" style={{ width: '100%', height: '48px', marginBottom: '20px' }}></div>
            <div className="skeleton-line" style={{ width: '100%', height: '48px' }}></div>
          </div>

          {/* Lista Skeleton */}
          <div className="card skeleton">
            <div className="skeleton-line" style={{ width: '200px', height: '32px', marginBottom: '30px' }}></div>
            {[1, 2, 3].map((i) => (
              <div key={i} className="skeleton-card">
                <div className="skeleton-line" style={{ width: '70%', marginBottom: '10px' }}></div>
                <div className="skeleton-line" style={{ width: '50%', marginBottom: '10px' }}></div>
                <div className="skeleton-line" style={{ width: '85%' }}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}