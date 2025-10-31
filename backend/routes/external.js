/**
 * Rutas para APIs externas (Proxy)
 * Evita problemas de CORS al hacer peticiones desde el backend
 */

const express = require('express');
const axios = require('axios');
const router = express.Router();

// Configuración de APIs externas
const ANIMALS_API_KEY = process.env.ANIMALS_API_KEY || '';
const TREFLE_API_KEY = process.env.TREFLE_API_KEY || '';

/**
 * GET /api/external/animals/:name
 * Buscar información de un animal por nombre
 */
router.get('/animals/:name', async (req, res) => {
  try {
    const { name } = req.params;
    
    if (!ANIMALS_API_KEY) {
      return res.status(503).json({ 
        error: 'Animals API key not configured',
        useMock: true 
      });
    }

    console.log('🔍 Fetching animal data:', name);

    const response = await axios.get('https://api.api-ninjas.com/v1/animals', {
      params: { name },
      headers: {
        'X-Api-Key': ANIMALS_API_KEY
      },
      timeout: 10000
    });

    console.log('✅ Animal data received');
    res.json(response.data);
    
  } catch (error) {
    console.error('❌ Error fetching animal data:', error.message);
    
    if (error.response) {
      return res.status(error.response.status).json({
        error: 'Error from Animals API',
        status: error.response.status,
        message: error.response.data,
        useMock: true
      });
    }
    
    res.status(500).json({ 
      error: 'Failed to fetch animal data',
      useMock: true 
    });
  }
});

/**
 * GET /api/external/plants/search
 * Buscar plantas por término
 */
router.get('/plants/search', async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!TREFLE_API_KEY) {
      return res.status(503).json({ 
        error: 'Trefle API key not configured',
        useMock: true 
      });
    }

    console.log('🔍 Fetching plant data:', q);

    const response = await axios.get('https://trefle.io/api/v1/plants/search', {
      params: { 
        token: TREFLE_API_KEY,
        q: q
      },
      timeout: 15000
    });

    console.log('✅ Plant data received');
    res.json(response.data);
    
  } catch (error) {
    console.error('❌ Error fetching plant data:', error.message);
    
    if (error.response) {
      return res.status(error.response.status).json({
        error: 'Error from Trefle API',
        status: error.response.status,
        message: error.response.data,
        useMock: true
      });
    }
    
    res.status(500).json({ 
      error: 'Failed to fetch plant data',
      useMock: true 
    });
  }
});

/**
 * GET /api/external/plants/:id
 * Obtener detalles de una planta específica
 */
router.get('/plants/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!TREFLE_API_KEY) {
      return res.status(503).json({ 
        error: 'Trefle API key not configured' 
      });
    }

    console.log('🔍 Fetching plant details, ID:', id);

    const response = await axios.get(`https://trefle.io/api/v1/plants/${id}`, {
      params: { 
        token: TREFLE_API_KEY
      },
      timeout: 15000
    });

    console.log('✅ Plant details received');
    res.json(response.data);
    
  } catch (error) {
    console.error('❌ Error fetching plant details:', error.message);
    
    if (error.response) {
      return res.status(error.response.status).json({
        error: 'Error from Trefle API',
        status: error.response.status,
        message: error.response.data
      });
    }
    
    res.status(404).json({ 
      error: 'Plant not found' 
    });
  }
});

module.exports = router;
