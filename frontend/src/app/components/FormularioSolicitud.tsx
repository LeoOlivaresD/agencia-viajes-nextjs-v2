'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Solicitud } from '@/lib/api';
import { useTranslation } from 'react-i18next';
import '@/app/i18n';

interface FormularioSolicitudProps {
  onSubmit: (solicitud: Omit<Solicitud, 'id' | 'fechaRegistro'>) => Promise<void>;
}

interface FormValues {
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
  email: string;
}

const limpiarRut = (rut: string): string => rut.replace(/\./g, '').replace(/-/g, '');

const formatearRut = (rut: string): string => {
  const rutLimpio = limpiarRut(rut);
  if (rutLimpio.length === 0) return '';
  if (rutLimpio.length > 1) return rutLimpio.slice(0, -1) + '-' + rutLimpio.slice(-1);
  return rutLimpio;
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

export default function FormularioSolicitud({ onSubmit }: FormularioSolicitudProps) {
  const { t, i18n } = useTranslation('solicitud');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    trigger,
    watch,
    setValue,
  } = useForm<FormValues>({
    defaultValues: {
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
      email: '',
    },
  });

  // Re-validar cuando cambia el idioma (igual que el profesor)
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      void trigger();
    }
  }, [i18n.language, trigger, errors]);

  const fechaSalida = watch('fechaSalida');
  const hoy = new Date().toISOString().split('T')[0];

  const onSubmitForm = async (data: FormValues) => {
    await onSubmit({ ...data, dni: limpiarRut(data.dni) });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>

      {/* DNI / RUT */}
      <div className="form-group">
        <label className="form-label">{t('label.dni')}</label>
        <input
          type="text"
          className="form-input"
          maxLength={10}
          placeholder={t('placeholder.dni')}
          {...register('dni', {
            required: t('error.dniRequired'),
            validate: (value) => validarRut(value) || t('error.dniInvalid'),
            onChange: (e) => setValue('dni', formatearRut(e.target.value)),
          })}
        />
        {errors.dni && <p className="form-error">{errors.dni.message}</p>}
      </div>

      {/* Nombre cliente */}
      <div className="form-group">
        <label className="form-label">{t('label.name')}</label>
        <input
          type="text"
          className="form-input"
          placeholder={t('placeholder.name')}
          {...register('nombreCliente', {
            required: t('error.nameRequired'),
          })}
        />
        {errors.nombreCliente && <p className="form-error">{errors.nombreCliente.message}</p>}
      </div>

      {/* Email */}
      <div className="form-group">
        <label className="form-label">{t('label.email')}</label>
        <input
          type="email"
          className="form-input"
          placeholder={t('placeholder.email')}
          {...register('email', {
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: t('error.emailInvalid'),
            },
          })}
        />
        {errors.email && <p className="form-error">{errors.email.message}</p>}
      </div>

      {/* Origen / Destino */}
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">{t('label.origin')}</label>
          <input
            type="text"
            className="form-input"
            placeholder={t('placeholder.origin')}
            {...register('origen', { required: t('error.originRequired') })}
          />
          {errors.origen && <p className="form-error">{errors.origen.message}</p>}
        </div>
        <div className="form-group">
          <label className="form-label">{t('label.destination')}</label>
          <input
            type="text"
            className="form-input"
            placeholder={t('placeholder.destination')}
            {...register('destino', { required: t('error.destinationRequired') })}
          />
          {errors.destino && <p className="form-error">{errors.destino.message}</p>}
        </div>
      </div>

      {/* Tipo de viaje */}
      <div className="form-group">
        <label className="form-label">{t('label.tripType')}</label>
        <select
          className="form-select"
          {...register('tipoViaje', { required: t('error.tripTypeRequired') })}
        >
          <option value="">{t('placeholder.tripType')}</option>
          <option value="negocios">{t('tripType.business')}</option>
          <option value="turismo">{t('tripType.tourism')}</option>
          <option value="otros">{t('tripType.other')}</option>
        </select>
        {errors.tipoViaje && <p className="form-error">{errors.tipoViaje.message}</p>}
      </div>

      {/* Fecha y hora de salida */}
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">{t('label.departureDate')}</label>
          <input
            type="date"
            className="form-input"
            min={hoy}
            {...register('fechaSalida', {
              required: t('error.departureDateRequired'),
              validate: (value) =>
                value >= hoy || t('error.departureDatePast'),
            })}
          />
          {errors.fechaSalida && <p className="form-error">{errors.fechaSalida.message}</p>}
        </div>
        <div className="form-group">
          <label className="form-label">{t('label.departureTime')}</label>
          <input
            type="time"
            className="form-input"
            {...register('horaSalida', { required: t('error.departureTimeRequired') })}
          />
          {errors.horaSalida && <p className="form-error">{errors.horaSalida.message}</p>}
        </div>
      </div>

      {/* Fecha y hora de regreso */}
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">{t('label.returnDate')}</label>
          <input
            type="date"
            className="form-input"
            min={fechaSalida || hoy}
            {...register('fechaRegreso', {
              required: t('error.returnDateRequired'),
              validate: (value) =>
                !fechaSalida || value >= fechaSalida || t('error.returnDateBeforeDeparture'),
            })}
          />
          {errors.fechaRegreso && <p className="form-error">{errors.fechaRegreso.message}</p>}
        </div>
        <div className="form-group">
          <label className="form-label">{t('label.returnTime')}</label>
          <input
            type="time"
            className="form-input"
            {...register('horaRegreso', {
              required: t('error.returnTimeRequired'),
              validate: (value, formValues) => {
                if (formValues.fechaSalida === formValues.fechaRegreso) {
                  return value > formValues.horaSalida || t('error.returnTimeBeforeDeparture');
                }
                return true;
              },
            })}
          />
          {errors.horaRegreso && <p className="form-error">{errors.horaRegreso.message}</p>}
        </div>
      </div>

      {/* Estado — radio buttons */}
      <div className="form-group">
        <label className="form-label">{t('label.status')}</label>
        <div className="radio-group">
          {(['pendiente', 'en-proceso', 'finalizada'] as const).map((estado) => (
            <div key={estado} className="radio-option">
              <input
                type="radio"
                id={estado}
                value={estado}
                {...register('estado', { required: t('error.statusRequired') })}
              />
              <label htmlFor={estado}>
                {t(`status.${estado === 'pendiente' ? 'pending' : estado === 'en-proceso' ? 'inProcess' : 'completed'}`)}
              </label>
            </div>
          ))}
        </div>
        {errors.estado && <p className="form-error">{errors.estado.message}</p>}
      </div>

      <button type="submit" disabled={isSubmitting} className="btn btn-primary w-full">
        {isSubmitting ? t('button.submitting') : t('button.submit')}
      </button>
    </form>
  );
}