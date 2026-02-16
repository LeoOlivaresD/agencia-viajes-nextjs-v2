const express = require('express');
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Middleware para CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Ruta de inicio
app.get('/', (req, res) => {
  res.json({
    message: 'API Agencia de Viajes Oeste - Next.js Backend',
    version: '2.0.0',
    endpoints: {
      solicitudes: 'GET /api/solicitudes/all',
      crearSolicitud: 'POST /api/solicitudes',
      solicitudById: 'GET /api/solicitudes/:id',
      eliminarSolicitud: 'DELETE /api/solicitudes/:id'
    }
  });
});

// Rutas de solicitudes
const solicitudesRoutes = require('./routes/solicitudes.routes');
app.use('/api/solicitudes', solicitudesRoutes);

// Middleware de manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});