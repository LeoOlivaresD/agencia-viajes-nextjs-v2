const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(morgan('dev'));
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5000'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dataPath = path.join(__dirname, 'solicitudes.json');

const readSolicitudes = () => {
  try {
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return { solicitudes: [], lastId: 1117 };
  }
};

const writeSolicitudes = (data) => {
  try {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error escribiendo solicitudes:', error);
    return false;
  }
};

app.get('/', (req, res) => {
  res.json({
    message: 'API Agencia de Viajes Oeste - Next.js Backend',
    version: '1.0.0',
    endpoints: {
      solicitudes: 'GET /api/solicitudes/all',
      crearSolicitud: 'POST /api/solicitudes',
      solicitudById: 'GET /api/solicitudes/:id',
      eliminarSolicitud: 'DELETE /api/solicitudes/:id'
    }
  });
});

app.get('/api/solicitudes/all', (req, res) => {
  try {
    const data = readSolicitudes();
    res.json({
      success: true,
      solicitudes: data.solicitudes
    });
  } catch (error) {
    console.error('Error obteniendo solicitudes:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener solicitudes'
    });
  }
});

app.post('/api/solicitudes', (req, res) => {
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

    if (!dni || !nombreCliente || !origen || !destino || !tipoViaje || 
        !fechaSalida || !horaSalida || !fechaRegreso || !horaRegreso || !estado) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son requeridos'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (req.body.email && !emailRegex.test(req.body.email)) {
      return res.status(400).json({
        success: false,
        message: 'Formato de email invalido'
      });
    }

    const data = readSolicitudes();
    data.lastId += 1;
    
    const nuevaSolicitud = {
      dni,
      nombreCliente,
      origen,
      destino,
      tipoViaje,
      fechaSalida,
      horaSalida,
      fechaRegreso,
      horaRegreso,
      estado,
      email: req.body.email || null,
      id: data.lastId,
      fechaRegistro: new Date().toISOString()
    };
    
    data.solicitudes.push(nuevaSolicitud);
    writeSolicitudes(data);

    res.status(201).json({
      success: true,
      message: 'Solicitud creada exitosamente',
      solicitud: nuevaSolicitud
    });
  } catch (error) {
    console.error('Error creando solicitud:', error);
    res.status(500).json({
      success: false,
      message: 'Error al crear solicitud'
    });
  }
});

app.get('/api/solicitudes/:id', (req, res) => {
  try {
    const { id } = req.params;
    const data = readSolicitudes();
    const solicitud = data.solicitudes.find(s => s.id === parseInt(id));
    
    if (!solicitud) {
      return res.status(404).json({
        success: false,
        message: 'Solicitud no encontrada'
      });
    }

    res.json({
      success: true,
      solicitud
    });
  } catch (error) {
    console.error('Error obteniendo solicitud:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener solicitud'
    });
  }
});

// DELETE - Eliminar solicitud por ID (ANTES de los middlewares de error)
app.delete('/api/solicitudes/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    // Leer archivo
    const data = readSolicitudes();
    
    // Buscar índice de la solicitud
    const index = data.solicitudes.findIndex(s => s.id === id);
    
    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: 'Solicitud no encontrada'
      });
    }
    
    // Eliminar solicitud
    data.solicitudes.splice(index, 1);
    
    // Guardar cambios
    writeSolicitudes(data);
    
    res.json({
      success: true,
      message: 'Solicitud eliminada exitosamente'
    });
  } catch (error) {
    console.error('Error eliminando solicitud:', error);
    res.status(500).json({
      success: false,
      message: 'Error al eliminar solicitud'
    });
  }
});

// Middleware 404 - DEBE estar DESPUÉS de todas las rutas
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada'
  });
});

// Middleware de errores - DEBE estar al FINAL
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor'
  });
});

app.listen(PORT, () => {
  console.log(`Servidor Backend corriendo en http://localhost:${PORT}`);
  console.log(`Entorno: ${process.env.NODE_ENV || 'development'}`);
});