import { Solicitud } from '@/lib/api';

interface SolicitudListProps {
  solicitudes: Solicitud[];
  filtroEstado: string;
  selectedIds: number[];
  onCheckboxChange: (id: number) => void;
  onDeleteSelected: () => void;
  onFilterChange: (estado: string) => void;
}

export default function SolicitudList({
  solicitudes,
  filtroEstado,
  selectedIds,
  onCheckboxChange,
  onDeleteSelected,
  onFilterChange,
}: SolicitudListProps) {
  const formatFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const solicitudesFiltradas = filtroEstado === 'todas' 
    ? solicitudes 
    : solicitudes.filter(sol => sol.estado === filtroEstado);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-purple-600 pb-4 border-b-2 border-gray-200">
        Lista de Solicitudes
      </h2>
      
      <div className="p-4 bg-gray-50 rounded-lg flex items-center gap-4">
        <label htmlFor="filtroEstado" className="font-semibold text-gray-700 whitespace-nowrap">
          Filtrar por estado:
        </label>
        <select
          id="filtroEstado"
          value={filtroEstado}
          onChange={(e) => onFilterChange(e.target.value)}
          className="flex-1 max-w-xs px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 font-semibold text-gray-700"
        >
          <option value="todas">Todas</option>
          <option value="pendiente">Pendiente</option>
          <option value="en-proceso">En Proceso</option>
          <option value="finalizada">Finalizada</option>
        </select>
      </div>

      {selectedIds.length > 0 && (
        <button 
          onClick={onDeleteSelected}
          className="w-full py-3 bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
        >
          Eliminar seleccionadas ({selectedIds.length})
        </button>
      )}
      
      {solicitudesFiltradas.length === 0 ? (
        <div className="text-center text-gray-500 py-10 text-lg">
          {filtroEstado === 'todas' 
            ? 'No hay solicitudes registradas' 
            : `No hay solicitudes con estado: ${filtroEstado}`}
        </div>
      ) : (
        solicitudesFiltradas.map(solicitud => (
          <div key={solicitud.id} className="bg-gray-50 rounded-xl p-5 border-2 border-gray-200 hover:border-purple-500 hover:shadow-lg transition-all">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <input 
                  type="checkbox"
                  checked={selectedIds.includes(solicitud.id)}
                  onChange={() => onCheckboxChange(solicitud.id)}
                  className="w-5 h-5 accent-purple-600 cursor-pointer"
                />
                <span className="text-xl font-bold text-purple-600">#{solicitud.id}</span>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                solicitud.estado === 'pendiente' ? 'bg-yellow-100 text-yellow-800' :
                solicitud.estado === 'en-proceso' ? 'bg-blue-100 text-blue-800' :
                'bg-green-100 text-green-800'
              }`}>
                {solicitud.estado.replace('-', ' ').toUpperCase()}
              </span>
            </div>
            
            <div className="grid gap-2">
              <div className="flex gap-2">
                <span className="font-semibold text-gray-600">Cliente:</span>
                <span className="text-gray-800">{solicitud.nombreCliente}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-gray-600">DNI:</span>
                <span className="text-gray-800">{solicitud.dni}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-gray-600">Ruta:</span>
                <span className="text-gray-800">{solicitud.origen} - {solicitud.destino}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-gray-600">Tipo:</span>
                <span className="text-gray-800">{solicitud.tipoViaje}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-gray-600">Salida:</span>
                <span className="text-gray-800">{formatFecha(solicitud.fechaSalida)} {solicitud.horaSalida}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-gray-600">Regreso:</span>
                <span className="text-gray-800">{formatFecha(solicitud.fechaRegreso)} {solicitud.horaRegreso}</span>
              </div>
              {solicitud.fechaRegistro && (
                <div className="flex gap-2">
                  <span className="font-semibold text-gray-600">Registrado:</span>
                  <span className="text-gray-800">
                    {new Date(solicitud.fechaRegistro).toLocaleString('es-ES')}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}