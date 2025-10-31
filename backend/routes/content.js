/**
 * Rutas para el contenido del museo
 */

const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');

// Obtener todo el contenido
router.get('/', contentController.getAllContent);

// Obtener contenido por tipo
router.get('/type/:type', contentController.getContentByType);

module.exports = router;
