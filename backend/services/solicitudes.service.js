const fs = require('fs');
const path = require('path');

// Ruta al archivo de datos
const dataPath = path.join(__dirname, '../data/solicitudes.json');

// Función para leer solicitudes del archivo
function readSolicitudes() {
  if (!fs.existsSync(dataPath)) {
    // Si no existe, crearlo con estructura inicial
    const initialData = { solicitudes: [], lastId: 1117 };
    fs.writeFileSync(dataPath, JSON.stringify(initialData, null, 2));
    return initialData;
  }
  try {
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    throw new Error('Error reading solicitudes file');
  }
}

// Función para escribir solicitudes al archivo
function writeSolicitudes(data) {
  try {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  } catch (error) {
    throw new Error('Error writing solicitudes file');
  }
}

// Crear nueva solicitud
exports.createSolicitud = (solicitudData) => {
  const data = readSolicitudes();
  data.lastId += 1;
  
  const newSolicitud = {
    id: data.lastId,
    ...solicitudData,
    fechaRegistro: new Date().toISOString()
  };
  
  data.solicitudes.push(newSolicitud);
  writeSolicitudes(data);
  return newSolicitud;
};

// Obtener todas las solicitudes
exports.getSolicitudes = () => {
  const data = readSolicitudes();
  return data.solicitudes.sort((a, b) => b.id - a.id);
};

// Obtener solicitud por ID
exports.getSolicitudById = (id) => {
  const data = readSolicitudes();
  return data.solicitudes.find(s => s.id === id);
};

// Eliminar solicitud
exports.deleteSolicitud = (id) => {
  const data = readSolicitudes();
  const index = data.solicitudes.findIndex(s => s.id === id);
  
  if (index === -1) return null;
  
  const solicitudEliminada = data.solicitudes[index];
  data.solicitudes.splice(index, 1);
  writeSolicitudes(data);
  return solicitudEliminada;
};