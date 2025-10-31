/**
 * Rutas para las salas del museo
 */

const express = require('express');
const router = express.Router();
const roomsController = require('../controllers/roomsController');

// Obtener todas las salas
router.get('/', roomsController.getAllRooms);

// Obtener sala por ID
router.get('/:id', roomsController.getRoomById);

module.exports = router;
