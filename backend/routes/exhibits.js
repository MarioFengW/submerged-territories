/**
 * Rutas para las exhibiciones del museo
 */

const express = require('express');
const router = express.Router();
const exhibitsController = require('../controllers/exhibitsController');

// Obtener todas las exhibiciones
router.get('/', exhibitsController.getAllExhibits);

// Obtener exhibiciones por sala
router.get('/room/:roomId', exhibitsController.getExhibitsByRoom);

module.exports = router;
