'use client';

import { useState } from 'react';
import { Solicitud } from '@/lib/api';

interface FormularioSolicitudProps {
  onSubmit: (solicitud: Omit<Solicitud, 'id' | 'fechaRegistro'>) => Promise<void>;
}

export default function FormularioSolicitud({ onSubmit }: FormularioSolicitudProps) {
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

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.dni.trim()) newErrors.dni = 'DNI es requerido';
    if (!form.nombreCliente.trim()) newErrors.nombreCliente = 'Nombre del cliente es requerido';
    if (!form.origen.trim()) newErrors.origen = 'Origen es requerido';
    if (!form.destino.trim()) newErrors.destino = 'Destino es requerido';
    if (!form.tipoViaje) newErrors.tipoViaje = 'Tipo de viaje es requerido';
    if (!form.fechaSalida) newErrors.fechaSalida = 'Fecha de salida es requerida';
    if (!form.horaSalida) newErrors.horaSalida = 'Hora de salida es requerida';
    if (!form.fechaRegreso) newErrors.fechaRegreso = 'Fecha de regreso es requerida';
    if (!form.horaRegreso) newErrors.horaRegreso = 'Hora de regreso es requerida';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (form.email && !emailRegex.test(form.email)) {
      newErrors.email = 'Correo electrónico inválido';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setLoading(true);
    try {
      await onSubmit(form);
      setForm({
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
      setErrors({});
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">DNI o Identificación</label>
        <input
          type="text"
          name="dni"
          value={form.dni}
          onChange={handleChange}
          onBlur={validate}
          placeholder="Ej: 16414595-0"
          disabled={loading}
          className="form-input"
        />
        {errors.dni && <p className="form-error">{errors.dni}</p>}
      </div>

      <div className="form-group">
        <label className="form-label">Nombre del Cliente</label>
        <input
          type="text"
          name="nombreCliente"
          value={form.nombreCliente}
          onChange={handleChange}
          onBlur={validate}
          placeholder="Ej: Esteban Castro Paredes"
          disabled={loading}
          className="form-input"
        />
        {errors.nombreCliente && <p className="form-error">{errors.nombreCliente}</p>}
      </div>

      <div className="form-group">
        <label className="form-label">Email (opcional)</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          onBlur={validate}
          placeholder="cliente@ejemplo.com"
          disabled={loading}
          className="form-input"
        />
        {errors.email && <p className="form-error">{errors.email}</p>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Origen</label>
          <input
            type="text"
            name="origen"
            value={form.origen}
            onChange={handleChange}
            onBlur={validate}
            placeholder="Santiago, Chile"
            disabled={loading}
            className="form-input"
          />
          {errors.origen && <p className="form-error">{errors.origen}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Destino</label>
          <input
            type="text"
            name="destino"
            value={form.destino}
            onChange={handleChange}
            onBlur={validate}
            placeholder="Madrid, España"
            disabled={loading}
            className="form-input"
          />
          {errors.destino && <p className="form-error">{errors.destino}</p>}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Tipo de Viaje</label>
        <select
          name="tipoViaje"
          value={form.tipoViaje}
          onChange={handleChange}
          onBlur={validate}
          disabled={loading}
          className="form-select"
        >
          <option value="">Seleccione un tipo</option>
          <option value="negocios">Negocios</option>
          <option value="turismo">Turismo</option>
          <option value="otros">Otros</option>
        </select>
        {errors.tipoViaje && <p className="form-error">{errors.tipoViaje}</p>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Fecha de Salida</label>
          <input
            type="date"
            name="fechaSalida"
            value={form.fechaSalida}
            onChange={handleChange}
            onBlur={validate}
            disabled={loading}
            className="form-input"
          />
          {errors.fechaSalida && <p className="form-error">{errors.fechaSalida}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Hora de Salida</label>
          <input
            type="time"
            name="horaSalida"
            value={form.horaSalida}
            onChange={handleChange}
            onBlur={validate}
            disabled={loading}
            className="form-input"
          />
          {errors.horaSalida && <p className="form-error">{errors.horaSalida}</p>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Fecha de Regreso</label>
          <input
            type="date"
            name="fechaRegreso"
            value={form.fechaRegreso}
            onChange={handleChange}
            onBlur={validate}
            disabled={loading}
            className="form-input"
          />
          {errors.fechaRegreso && <p className="form-error">{errors.fechaRegreso}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Hora de Regreso</label>
          <input
            type="time"
            name="horaRegreso"
            value={form.horaRegreso}
            onChange={handleChange}
            onBlur={validate}
            disabled={loading}
            className="form-input"
          />
          {errors.horaRegreso && <p className="form-error">{errors.horaRegreso}</p>}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Estado de la Solicitud</label>
        <div className="radio-group">
          <div className="radio-option">
            <input
              type="radio"
              id="pendiente"
              name="estado"
              value="pendiente"
              checked={form.estado === 'pendiente'}
              onChange={handleChange}
              disabled={loading}
            />
            <label htmlFor="pendiente">Pendiente</label>
          </div>
          <div className="radio-option">
            <input
              type="radio"
              id="en-proceso"
              name="estado"
              value="en-proceso"
              checked={form.estado === 'en-proceso'}
              onChange={handleChange}
              disabled={loading}
            />
            <label htmlFor="en-proceso">En Proceso</label>
          </div>
          <div className="radio-option">
            <input
              type="radio"
              id="finalizada"
              name="estado"
              value="finalizada"
              checked={form.estado === 'finalizada'}
              onChange={handleChange}
              disabled={loading}
            />
            <label htmlFor="finalizada">Finalizada</label>
          </div>
        </div>
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="btn btn-primary w-full"
      >
        {loading ? 'Creando...' : 'Crear Solicitud'}
      </button>
    </form>
  );
}