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
    <div>
      <h2 className="title">Lista de Solicitudes</h2>
      
      <div className="filter-group">
        <label htmlFor="filtroEstado">Filtrar por estado:</label>
        <select
          id="filtroEstado"
          value={filtroEstado}
          onChange={(e) => onFilterChange(e.target.value)}
          className="filter-select"
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
          className="btn btn-danger w-full mb-2"
        >
          Eliminar seleccionadas ({selectedIds.length})
        </button>
      )}
      
      {solicitudesFiltradas.length === 0 ? (
        <div className="no-data">
          {filtroEstado === 'todas' 
            ? 'No hay solicitudes registradas' 
            : `No hay solicitudes con estado: ${filtroEstado}`}
        </div>
      ) : (
        solicitudesFiltradas.map(solicitud => (
          <div key={solicitud.id} className="solicitud-card">
            <div className="solicitud-header">
              <div className="solicitud-header-left">
                <input 
                  type="checkbox"
                  checked={selectedIds.includes(solicitud.id)}
                  onChange={() => onCheckboxChange(solicitud.id)}
                  className="checkbox"
                />
                <span className="solicitud-id">#{solicitud.id}</span>
              </div>
              <span className={`solicitud-estado estado-${solicitud.estado}`}>
                {solicitud.estado.replace('-', ' ').toUpperCase()}
              </span>
            </div>
            
            <div className="solicitud-info">
              <div className="info-row">
                <span className="info-label">Cliente:</span>
                <span className="info-value">{solicitud.nombreCliente}</span>
              </div>
              <div className="info-row">
                <span className="info-label">DNI:</span>
                <span className="info-value">{solicitud.dni}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Ruta:</span>
                <span className="info-value">{solicitud.origen} - {solicitud.destino}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Tipo:</span>
                <span className="info-value">{solicitud.tipoViaje}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Salida:</span>
                <span className="info-value">{formatFecha(solicitud.fechaSalida)} {solicitud.horaSalida}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Regreso:</span>
                <span className="info-value">{formatFecha(solicitud.fechaRegreso)} {solicitud.horaRegreso}</span>
              </div>
              {solicitud.fechaRegistro && (
                <div className="info-row">
                  <span className="info-label">Registrado:</span>
                  <span className="info-value">
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