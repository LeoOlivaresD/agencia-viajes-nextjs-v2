'use client';

import { useState, useEffect } from 'react';
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
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block mb-2 text-gray-600 font-medium">DNI o Identificación</label>
        <input
          type="text"
          name="dni"
          value={form.dni}
          onChange={handleChange}
          onBlur={validate}
          placeholder="Ej: 16414595-0"
          disabled={loading}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
        />
        {errors.dni && <p className="text-red-600 text-sm mt-1">{errors.dni}</p>}
      </div>

      <div>
        <label className="block mb-2 text-gray-600 font-medium">Nombre del Cliente</label>
        <input
          type="text"
          name="nombreCliente"
          value={form.nombreCliente}
          onChange={handleChange}
          onBlur={validate}
          placeholder="Ej: Esteban Castro Paredes"
          disabled={loading}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
        />
        {errors.nombreCliente && <p className="text-red-600 text-sm mt-1">{errors.nombreCliente}</p>}
      </div>

      <div>
        <label className="block mb-2 text-gray-600 font-medium">Email (opcional)</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          onBlur={validate}
          placeholder="cliente@ejemplo.com"
          disabled={loading}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
        />
        {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 text-gray-600 font-medium">Origen</label>
          <input
            type="text"
            name="origen"
            value={form.origen}
            onChange={handleChange}
            onBlur={validate}
            placeholder="Santiago, Chile"
            disabled={loading}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
          />
          {errors.origen && <p className="text-red-600 text-sm mt-1">{errors.origen}</p>}
        </div>

        <div>
          <label className="block mb-2 text-gray-600 font-medium">Destino</label>
          <input
            type="text"
            name="destino"
            value={form.destino}
            onChange={handleChange}
            onBlur={validate}
            placeholder="Madrid, España"
            disabled={loading}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
          />
          {errors.destino && <p className="text-red-600 text-sm mt-1">{errors.destino}</p>}
        </div>
      </div>

      <div>
        <label className="block mb-2 text-gray-600 font-medium">Tipo de Viaje</label>
        <select
          name="tipoViaje"
          value={form.tipoViaje}
          onChange={handleChange}
          onBlur={validate}
          disabled={loading}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
        >
          <option value="">Seleccione un tipo</option>
          <option value="negocios">Negocios</option>
          <option value="turismo">Turismo</option>
          <option value="otros">Otros</option>
        </select>
        {errors.tipoViaje && <p className="text-red-600 text-sm mt-1">{errors.tipoViaje}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 text-gray-600 font-medium">Fecha de Salida</label>
          <input
            type="date"
            name="fechaSalida"
            value={form.fechaSalida}
            onChange={handleChange}
            onBlur={validate}
            disabled={loading}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
          />
          {errors.fechaSalida && <p className="text-red-600 text-sm mt-1">{errors.fechaSalida}</p>}
        </div>

        <div>
          <label className="block mb-2 text-gray-600 font-medium">Hora de Salida</label>
          <input
            type="time"
            name="horaSalida"
            value={form.horaSalida}
            onChange={handleChange}
            onBlur={validate}
            disabled={loading}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
          />
          {errors.horaSalida && <p className="text-red-600 text-sm mt-1">{errors.horaSalida}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 text-gray-600 font-medium">Fecha de Regreso</label>
          <input
            type="date"
            name="fechaRegreso"
            value={form.fechaRegreso}
            onChange={handleChange}
            onBlur={validate}
            disabled={loading}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
          />
          {errors.fechaRegreso && <p className="text-red-600 text-sm mt-1">{errors.fechaRegreso}</p>}
        </div>

        <div>
          <label className="block mb-2 text-gray-600 font-medium">Hora de Regreso</label>
          <input
            type="time"
            name="horaRegreso"
            value={form.horaRegreso}
            onChange={handleChange}
            onBlur={validate}
            disabled={loading}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
          />
          {errors.horaRegreso && <p className="text-red-600 text-sm mt-1">{errors.horaRegreso}</p>}
        </div>
      </div>

      <div>
        <label className="block mb-3 text-gray-600 font-medium">Estado de la Solicitud</label>
        <div className="flex gap-5">
          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="pendiente"
              name="estado"
              value="pendiente"
              checked={form.estado === 'pendiente'}
              onChange={handleChange}
              disabled={loading}
              className="w-4 h-4 accent-purple-600"
            />
            <label htmlFor="pendiente" className="cursor-pointer">Pendiente</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="en-proceso"
              name="estado"
              value="en-proceso"
              checked={form.estado === 'en-proceso'}
              onChange={handleChange}
              disabled={loading}
              className="w-4 h-4 accent-purple-600"
            />
            <label htmlFor="en-proceso" className="cursor-pointer">En Proceso</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="finalizada"
              name="estado"
              value="finalizada"
              checked={form.estado === 'finalizada'}
              onChange={handleChange}
              disabled={loading}
              className="w-4 h-4 accent-purple-600"
            />
            <label htmlFor="finalizada" className="cursor-pointer">Finalizada</label>
          </div>
        </div>
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? 'Creando...' : 'Crear Solicitud'}
      </button>
    </form>
  );
}