const express = require('express');
const router = express.Router();
const solicitudesController = require('../controllers/solicitudes.controller');

// Definir rutas CRUD
router.post('/', solicitudesController.createSolicitud);
router.get('/all', solicitudesController.getSolicitudes);
router.get('/:id', solicitudesController.getSolicitudById);
router.delete('/:id', solicitudesController.deleteSolicitud);

module.exports = router;