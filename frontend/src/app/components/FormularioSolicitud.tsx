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

  // Función para limpiar RUT (eliminar puntos y guiones)
  const limpiarRut = (rut: string): string => {
    return rut.replace(/\./g, '').replace(/-/g, '');
  };

  // Función para validar RUT chileno
  const validarRut = (rut: string): boolean => {
    const rutLimpio = limpiarRut(rut);
    
    // Debe tener entre 8 y 9 caracteres (7-8 números + 1 dígito verificador)
    if (rutLimpio.length < 8 || rutLimpio.length > 9) {
      return false;
    }

    // Separar número y dígito verificador
    const cuerpo = rutLimpio.slice(0, -1);
    const dv = rutLimpio.slice(-1).toUpperCase();

    // El cuerpo debe ser solo números
    if (!/^\d+$/.test(cuerpo)) {
      return false;
    }

    // Calcular dígito verificador
    let suma = 0;
    let multiplicador = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
      suma += parseInt(cuerpo[i]) * multiplicador;
      multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }

    const dvEsperado = 11 - (suma % 11);
    let dvCalculado: string;

    if (dvEsperado === 11) {
      dvCalculado = '0';
    } else if (dvEsperado === 10) {
      dvCalculado = 'K';
    } else {
      dvCalculado = dvEsperado.toString();
    }

    return dv === dvCalculado;
  };

  // Función para formatear RUT mientras se escribe
  const formatearRut = (rut: string): string => {
    const rutLimpio = limpiarRut(rut);
    
    if (rutLimpio.length === 0) return '';
    
    // Agregar guión antes del último dígito
    if (rutLimpio.length > 1) {
      return rutLimpio.slice(0, -1) + '-' + rutLimpio.slice(-1);
    }
    
    return rutLimpio;
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    // Validación RUT
    if (!form.dni.trim()) {
      newErrors.dni = 'RUT es requerido';
    } else if (!validarRut(form.dni)) {
      newErrors.dni = 'RUT inválido. Formato: 12345678-9 o 12345678-K';
    }
    
    // Validaciones básicas
    if (!form.nombreCliente.trim()) newErrors.nombreCliente = 'Nombre del cliente es requerido';
    if (!form.origen.trim()) newErrors.origen = 'Origen es requerido';
    if (!form.destino.trim()) newErrors.destino = 'Destino es requerido';
    if (!form.tipoViaje) newErrors.tipoViaje = 'Tipo de viaje es requerido';
    if (!form.fechaSalida) newErrors.fechaSalida = 'Fecha de salida es requerida';
    if (!form.horaSalida) newErrors.horaSalida = 'Hora de salida es requerida';
    if (!form.fechaRegreso) newErrors.fechaRegreso = 'Fecha de regreso es requerida';
    if (!form.horaRegreso) newErrors.horaRegreso = 'Hora de regreso es requerida';
    
    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (form.email && !emailRegex.test(form.email)) {
      newErrors.email = 'Correo electrónico inválido';
    }

    // Validaciones de fechas
    if (form.fechaSalida && form.fechaRegreso) {
      const fechaSalida = new Date(form.fechaSalida + 'T' + (form.horaSalida || '00:00'));
      const fechaRegreso = new Date(form.fechaRegreso + 'T' + (form.horaRegreso || '00:00'));
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);

      // La fecha de salida no puede ser en el pasado
      const fechaSalidaSolo = new Date(form.fechaSalida);
      if (fechaSalidaSolo < hoy) {
        newErrors.fechaSalida = 'La fecha de salida no puede ser en el pasado';
      }

      // La fecha de regreso debe ser posterior a la fecha de salida
      if (fechaRegreso <= fechaSalida) {
        newErrors.fechaRegreso = 'La fecha de regreso debe ser posterior a la fecha de salida';
      }

      // Si es el mismo día, validar horas
      if (form.fechaSalida === form.fechaRegreso && form.horaSalida && form.horaRegreso) {
        if (form.horaRegreso <= form.horaSalida) {
          newErrors.horaRegreso = 'La hora de regreso debe ser posterior a la hora de salida';
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
      // Enviar RUT limpio al backend
      await onSubmit({
        ...form,
        dni: limpiarRut(form.dni)
      });
      
      // Reset form
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
    
    // Formatear RUT mientras se escribe
    if (name === 'dni') {
      const rutFormateado = formatearRut(value);
      setForm(prev => ({ ...prev, [name]: rutFormateado }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Obtener fecha mínima (hoy)
  const hoy = new Date().toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">RUT</label>
        <input
          type="text"
          name="dni"
          value={form.dni}
          onChange={handleChange}
          onBlur={validate}
          placeholder="Ej: 16414595-0"
          disabled={loading}
          className="form-input"
          maxLength={10}
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
            min={hoy}
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
            min={form.fechaSalida || hoy}
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