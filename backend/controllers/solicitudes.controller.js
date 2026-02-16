const solicitudesService = require('../services/solicitudes.service');

exports.createSolicitud = (req, res) => {
  try {
    const {
      dni,
      nombreCliente,
      origen,
      destino,
      tipoViaje,
      fechaSalida,
      horaSalida,
      fechaRegreso,
      horaRegreso,
      estado
    } = req.body;

    // Validaciones
    const errors = {};
    if (!dni || dni.trim().length === 0) {
      errors.dni = 'RUT es obligatorio';
    }
    if (!nombreCliente || nombreCliente.trim().length === 0) {
      errors.nombreCliente = 'Nombre del cliente es obligatorio';
    }
    if (!origen || origen.trim().length === 0) {
      errors.origen = 'Origen es obligatorio';
    }
    if (!destino || destino.trim().length === 0) {
      errors.destino = 'Destino es obligatorio';
    }
    if (!tipoViaje || tipoViaje.trim().length === 0) {
      errors.tipoViaje = 'Tipo de viaje es obligatorio';
    }
    if (!fechaSalida) {
      errors.fechaSalida = 'Fecha de salida es obligatoria';
    }
    if (!horaSalida) {
      errors.horaSalida = 'Hora de salida es obligatoria';
    }
    if (!fechaRegreso) {
      errors.fechaRegreso = 'Fecha de regreso es obligatoria';
    }
    if (!horaRegreso) {
      errors.horaRegreso = 'Hora de regreso es obligatoria';
    }
    if (!estado) {
      errors.estado = 'Estado es obligatorio';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (req.body.email && !emailRegex.test(req.body.email)) {
      errors.email = 'Correo electrónico inválido';
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ 
        success: false,
        error: 'Datos de solicitud inválidos',
        details: errors,
        code: 'VALIDATION_ERROR'
      });
    }

    const solicitud = solicitudesService.createSolicitud({
      dni: dni.trim(),
      nombreCliente: nombreCliente.trim(),
      origen: origen.trim(),
      destino: destino.trim(),
      tipoViaje: tipoViaje.trim(),
      fechaSalida,
      horaSalida,
      fechaRegreso,
      horaRegreso,
      estado,
      email: req.body.email || null
    });

    res.status(201).json({
      success: true,
      message: 'Solicitud creada exitosamente',
      solicitud,
      code: 'CREATED'
    });
  } catch (error) {
    console.error('Error creando solicitud:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error interno del servidor al crear solicitud',
      message: error.message,
      code: 'INTERNAL_SERVER_ERROR'
    });
  }
};

exports.getSolicitudes = (req, res) => {
  try {
    const solicitudes = solicitudesService.getSolicitudes();
    res.status(200).json({
      success: true,
      solicitudes,
      count: solicitudes.length,
      code: 'SUCCESS'
    });
  } catch (error) {
    console.error('Error obteniendo solicitudes:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error interno del servidor al obtener solicitudes',
      message: error.message,
      code: 'INTERNAL_SERVER_ERROR'
    });
  }
};

exports.getSolicitudById = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ 
        success: false,
        error: 'ID de solicitud inválido',
        details: { id: 'El ID debe ser un número válido' },
        code: 'INVALID_ID'
      });
    }

    const solicitud = solicitudesService.getSolicitudById(id);
    
    if (!solicitud) {
      return res.status(404).json({ 
        success: false,
        error: `Solicitud con ID ${id} no encontrada`,
        code: 'NOT_FOUND'
      });
    }

    res.status(200).json({
      success: true,
      solicitud,
      code: 'SUCCESS'
    });
  } catch (error) {
    console.error('Error obteniendo solicitud:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error interno del servidor al obtener solicitud',
      message: error.message,
      code: 'INTERNAL_SERVER_ERROR'
    });
  }
};

exports.deleteSolicitud = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ 
        success: false,
        error: 'ID de solicitud inválido',
        details: { id: 'El ID debe ser un número válido' },
        code: 'INVALID_ID'
      });
    }

    const solicitudEliminada = solicitudesService.deleteSolicitud(id);
    
    if (solicitudEliminada === null) {
      return res.status(404).json({ 
        success: false,
        error: `Solicitud con ID ${id} no encontrada`,
        code: 'NOT_FOUND'
      });
    }
    
    res.status(200).json({
      success: true,
      message: `Solicitud #${id} eliminada exitosamente`,
      solicitud: solicitudEliminada,
      code: 'DELETED'
    });
  } catch (error) {
    console.error('Error eliminando solicitud:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error interno del servidor al eliminar solicitud',
      message: error.message,
      code: 'INTERNAL_SERVER_ERROR'
    });
  }
};