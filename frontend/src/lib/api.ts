const API_BASE = 'http://localhost:5000/api/solicitudes';

export interface Solicitud {
  id: number;
  dni: string;
  nombreCliente: string;
  origen: string;
  destino: string;
  tipoViaje: string;
  fechaSalida: string;
  horaSalida: string;
  fechaRegreso: string;
  horaRegreso: string;
  estado: string;
  email?: string;
  fechaRegistro?: string;
}

export async function getSolicitudes(): Promise<Solicitud[]> {
  const res = await fetch(`${API_BASE}/all`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Error fetching solicitudes');
  const data = await res.json();
  return data.solicitudes || [];
}

export async function createSolicitud(solicitud: Omit<Solicitud, 'id' | 'fechaRegistro'>): Promise<Solicitud> {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(solicitud),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Error creating solicitud');
  }
  const data = await res.json();
  return data.solicitud;
}

export async function deleteSolicitud(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/${id}`, { 
    method: 'DELETE' 
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Error deleting solicitud');
  }
}