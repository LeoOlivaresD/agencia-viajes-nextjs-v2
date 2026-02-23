'use client';

import { useState } from 'react';
import { Solicitud } from '@/lib/api';
import { useTranslation } from 'react-i18next';
import '@/app/i18n';

interface FormularioSolicitudProps {
  onSubmit: (solicitud: Omit<Solicitud, 'id' | 'fechaRegistro'>) => Promise<void>;
}

export default function FormularioSolicitud({ onSubmit }: FormularioSolicitudProps) {
  const { t } = useTranslation('solicitud');
  const [form, setForm] = useState({
    dni: '',
    nombreCliente: '',
    origen: '',
    destino: '',
    tipoViaje: '',
    fechaSalida: '',
    horaSalida: '',
    fechaRegreso: '',
    horaRegreso: '',
    estado: 'pendiente',
    email: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const limpiarRut = (rut: string): string => {
    return rut.replace(/\./g, '').replace(/-/g, '');
  };

  const validarRut = (rut: string): boolean => {
    const rutLimpio = limpiarRut(rut);
    if (rutLimpio.length < 8 || rutLimpio.length > 9) return false;
    const cuerpo = rutLimpio.slice(0, -1);
    const dv = rutLimpio.slice(-1).toUpperCase();
    if (!/^\d+$/.test(cuerpo)) return false;
    if (!/^[\dK]$/.test(dv)) return false;
    return true;
  };

  const formatearRut = (rut: string): string => {
    const rutLimpio = limpiarRut(rut);
    if (rutLimpio.length === 0) return '';
    if (rutLimpio.length > 1) {
      return rutLimpio.slice(0, -1) + '-' + rutLimpio.slice(-1);
    }
    return rutLimpio;
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!form.dni.trim()) {
      newErrors.dni = t('error.dniRequired');
    } else if (!validarRut(form.dni)) {
      newErrors.dni = t('error.dniInvalid');
    }

    if (!form.nombreCliente.trim()) newErrors.nombreCliente = t('error.nameRequired');
    if (!form.origen.trim()) newErrors.origen = t('error.originRequired');
    if (!form.destino.trim()) newErrors.destino = t('error.destinationRequired');
    if (!form.tipoViaje) newErrors.tipoViaje = t('error.tripTypeRequired');
    if (!form.fechaSalida) newErrors.fechaSalida = t('error.departureDateRequired');
    if (!form.horaSalida) newErrors.horaSalida = t('error.departureTimeRequired');
    if (!form.fechaRegreso) newErrors.fechaRegreso = t('error.returnDateRequired');
    if (!form.horaRegreso) newErrors.horaRegreso = t('error.returnTimeRequired');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (form.email && !emailRegex.test(form.email)) {
      newErrors.email = t('error.emailInvalid');
    }

    if (form.fechaSalida && form.fechaRegreso) {
      const hoy = new Date();
      const year = hoy.getFullYear();
      const month = String(hoy.getMonth() + 1).padStart(2, '0');
      const day = String(hoy.getDate()).padStart(2, '0');
      const hoyString = `${year}-${month}-${day}`;

      if (form.fechaSalida < hoyString) {
        newErrors.fechaSalida = t('error.departureDatePast');
      }
      if (form.fechaRegreso < form.fechaSalida) {
        newErrors.fechaRegreso = t('error.returnDateBeforeDeparture');
      }
      if (form.fechaSalida === form.fechaRegreso && form.horaSalida && form.horaRegreso) {
        if (form.horaRegreso <= form.horaSalida) {
          newErrors.horaRegreso = t('error.returnTimeBeforeDeparture');
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await onSubmit({ ...form, dni: limpiarRut(form.dni) });
      setForm({
        dni: '', nombreCliente: '', origen: '', destino: '',
        tipoViaje: '', fechaSalida: '', horaSalida: '',
        fechaRegreso: '', horaRegreso: '', estado: 'pendiente', email: ''
      });
      setErrors({});
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'dni') {
      setForm(prev => ({ ...prev, [name]: formatearRut(value) }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const hoy = new Date().toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">{t('label.dni')}</label>
        <input type="text" name="dni" value={form.dni} onChange={handleChange}
          onBlur={validate} placeholder={t('placeholder.dni')}
          disabled={loading} className="form-input" maxLength={10} />
        {errors.dni && <p className="form-error">{errors.dni}</p>}
      </div>

      <div className="form-group">
        <label className="form-label">{t('label.name')}</label>
        <input type="text" name="nombreCliente" value={form.nombreCliente}
          onChange={handleChange} onBlur={validate}
          placeholder={t('placeholder.name')} disabled={loading} className="form-input" />
        {errors.nombreCliente && <p className="form-error">{errors.nombreCliente}</p>}
      </div>

      <div className="form-group">
        <label className="form-label">{t('label.email')}</label>
        <input type="email" name="email" value={form.email} onChange={handleChange}
          onBlur={validate} placeholder={t('placeholder.email')}
          disabled={loading} className="form-input" />
        {errors.email && <p className="form-error">{errors.email}</p>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">{t('label.origin')}</label>
          <input type="text" name="origen" value={form.origen} onChange={handleChange}
            onBlur={validate} placeholder={t('placeholder.origin')}
            disabled={loading} className="form-input" />
          {errors.origen && <p className="form-error">{errors.origen}</p>}
        </div>
        <div className="form-group">
          <label className="form-label">{t('label.destination')}</label>
          <input type="text" name="destino" value={form.destino} onChange={handleChange}
            onBlur={validate} placeholder={t('placeholder.destination')}
            disabled={loading} className="form-input" />
          {errors.destino && <p className="form-error">{errors.destino}</p>}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">{t('label.tripType')}</label>
        <select name="tipoViaje" value={form.tipoViaje} onChange={handleChange}
          onBlur={validate} disabled={loading} className="form-select">
          <option value="">{t('placeholder.tripType')}</option>
          <option value="negocios">{t('tripType.business')}</option>
          <option value="turismo">{t('tripType.tourism')}</option>
          <option value="otros">{t('tripType.other')}</option>
        </select>
        {errors.tipoViaje && <p className="form-error">{errors.tipoViaje}</p>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">{t('label.departureDate')}</label>
          <input type="date" name="fechaSalida" value={form.fechaSalida}
            onChange={handleChange} onBlur={validate} min={hoy}
            disabled={loading} className="form-input" />
          {errors.fechaSalida && <p className="form-error">{errors.fechaSalida}</p>}
        </div>
        <div className="form-group">
          <label className="form-label">{t('label.departureTime')}</label>
          <input type="time" name="horaSalida" value={form.horaSalida}
            onChange={handleChange} onBlur={validate}
            disabled={loading} className="form-input" />
          {errors.horaSalida && <p className="form-error">{errors.horaSalida}</p>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">{t('label.returnDate')}</label>
          <input type="date" name="fechaRegreso" value={form.fechaRegreso}
            onChange={handleChange} onBlur={validate}
            min={form.fechaSalida || hoy} disabled={loading} className="form-input" />
          {errors.fechaRegreso && <p className="form-error">{errors.fechaRegreso}</p>}
        </div>
        <div className="form-group">
          <label className="form-label">{t('label.returnTime')}</label>
          <input type="time" name="horaRegreso" value={form.horaRegreso}
            onChange={handleChange} onBlur={validate}
            disabled={loading} className="form-input" />
          {errors.horaRegreso && <p className="form-error">{errors.horaRegreso}</p>}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">{t('label.status')}</label>
        <div className="radio-group">
          <div className="radio-option">
            <input type="radio" id="pendiente" name="estado" value="pendiente"
              checked={form.estado === 'pendiente'} onChange={handleChange} disabled={loading} />
            <label htmlFor="pendiente">{t('status.pending')}</label>
          </div>
          <div className="radio-option">
            <input type="radio" id="en-proceso" name="estado" value="en-proceso"
              checked={form.estado === 'en-proceso'} onChange={handleChange} disabled={loading} />
            <label htmlFor="en-proceso">{t('status.inProcess')}</label>
          </div>
          <div className="radio-option">
            <input type="radio" id="finalizada" name="estado" value="finalizada"
              checked={form.estado === 'finalizada'} onChange={handleChange} disabled={loading} />
            <label htmlFor="finalizada">{t('status.completed')}</label>
          </div>
        </div>
      </div>

      <button type="submit" disabled={loading} className="btn btn-primary w-full">
        {loading ? t('button.submitting') : t('button.submit')}
      </button>
    </form>
  );
}