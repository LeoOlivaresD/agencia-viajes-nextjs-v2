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
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 py-10 px-5">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Skeleton */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 flex justify-between items-center animate-pulse">
          <div className="h-9 bg-gray-200 rounded w-1/3"></div>
          <div className="h-12 w-40 bg-gray-200 rounded-lg"></div>
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulario Skeleton */}
          <div className="bg-white rounded-2xl shadow-2xl p-10 animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="space-y-5">
              <div className="h-12 bg-gray-200 rounded-lg"></div>
              <div className="h-12 bg-gray-200 rounded-lg"></div>
              <div className="h-12 bg-gray-200 rounded-lg"></div>
              <div className="h-12 bg-gray-200 rounded-lg"></div>
              <div className="h-12 bg-gray-200 rounded-lg"></div>
            </div>
          </div>

          {/* Lista Skeleton */}
          <div className="bg-white rounded-2xl shadow-2xl p-10 animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-50 p-5 rounded-xl mb-4">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}