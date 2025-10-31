/**
 * Servidor principal del Museo Virtual del Agua
 * Express API para servir contenido del museo
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importar rutas
const roomsRouter = require('./routes/rooms');
const contentRouter = require('./routes/content');
const exhibitsRouter = require('./routes/exhibits');
const externalRouter = require('./routes/external');

// Usar rutas
app.use('/api/rooms', roomsRouter);
app.use('/api/content', contentRouter);
app.use('/api/exhibits', exhibitsRouter);
app.use('/api/external', externalRouter);

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.json({
    message: '🌊 Bienvenido al API del Museo Virtual del Agua',
    version: '1.0.0',
    endpoints: {
      rooms: '/api/rooms',
      content: '/api/content',
      exhibits: '/api/exhibits'
    }
  });
});

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🌊 Servidor del Museo Virtual del Agua corriendo en http://localhost:${PORT}`);
  console.log(`📚 Documentación API: http://localhost:${PORT}/`);
});
