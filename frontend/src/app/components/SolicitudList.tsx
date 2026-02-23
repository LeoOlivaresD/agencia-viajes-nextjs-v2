import { Solicitud } from '@/lib/api';
import { useTranslation } from 'react-i18next';
import '@/app/i18n';

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
  const { t } = useTranslation('solicitud');

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
      <h2 className="title">{t('listTitle')}</h2>

      <div className="filter-group">
        <label htmlFor="filtroEstado">{t('filter.label')}</label>
        <select
          id="filtroEstado"
          value={filtroEstado}
          onChange={(e) => onFilterChange(e.target.value)}
          className="filter-select"
        >
          <option value="todas">{t('filter.all')}</option>
          <option value="pendiente">{t('status.pending')}</option>
          <option value="en-proceso">{t('status.inProcess')}</option>
          <option value="finalizada">{t('status.completed')}</option>
        </select>
      </div>

      {selectedIds.length > 0 && (
        <button
          onClick={onDeleteSelected}
          className="btn btn-danger w-full mb-2"
        >
          {t('button.deleteSelected', { count: selectedIds.length })}
        </button>
      )}

      {solicitudesFiltradas.length === 0 ? (
        <div className="no-data">
          {filtroEstado === 'todas'
            ? t('message.noData')
            : t('message.noDataFiltered', { estado: filtroEstado })}
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
                <span className="info-label">{t('label.client')}</span>
                <span className="info-value">{solicitud.nombreCliente}</span>
              </div>
              <div className="info-row">
                <span className="info-label">{t('label.dni_label')}</span>
                <span className="info-value">{solicitud.dni}</span>
              </div>
              <div className="info-row">
                <span className="info-label">{t('label.route')}</span>
                <span className="info-value">{solicitud.origen} - {solicitud.destino}</span>
              </div>
              <div className="info-row">
                <span className="info-label">{t('label.type')}</span>
                <span className="info-value">{solicitud.tipoViaje}</span>
              </div>
              <div className="info-row">
                <span className="info-label">{t('label.departure')}</span>
                <span className="info-value">{formatFecha(solicitud.fechaSalida)} {solicitud.horaSalida}</span>
              </div>
              <div className="info-row">
                <span className="info-label">{t('label.return')}</span>
                <span className="info-value">{formatFecha(solicitud.fechaRegreso)} {solicitud.horaRegreso}</span>
              </div>
              {solicitud.fechaRegistro && (
                <div className="info-row">
                  <span className="info-label">{t('label.registered')}</span>
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