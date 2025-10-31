# 🌊 Backend - Museo Virtual del Agua

API REST para el Museo Virtual del Agua construida con Node.js y Express.

## 🚀 Inicio Rápido

### Instalación

```bash
npm install
```

### Ejecución

**Desarrollo (con auto-reload):**
```bash
npm run dev
```

**Producción:**
```bash
npm start
```

El servidor estará disponible en: `http://localhost:3000`

## 📡 Endpoints

### Raíz
- `GET /` - Información de la API

### Salas del Museo
- `GET /api/rooms` - Listar todas las salas
- `GET /api/rooms/:id` - Obtener sala específica

**Ejemplo de respuesta:**
```json
{
  "success": true,
  "count": 4,
  "data": [
    {
      "id": "water-origin",
      "name": "El Agua Como Origen",
      "title": "💧 El Agua Como Origen de la Vida",
      "description": "Explora el papel fundamental del agua...",
      "theme": "origin",
      "color": "#4A90E2",
      "icon": "💧",
      "order": 1
    }
  ]
}
```

### Exhibiciones
- `GET /api/exhibits` - Listar todas las exhibiciones
- `GET /api/exhibits/room/:roomId` - Exhibiciones por sala

### Contenido Educativo
- `GET /api/content` - Todo el contenido
- `GET /api/content/type/:type` - Contenido filtrado por tipo

## 📁 Estructura

```
backend/
├── controllers/      # Lógica de negocio
├── data/            # Datos JSON
├── routes/          # Definición de rutas
├── .env             # Variables de entorno
├── server.js        # Punto de entrada
└── package.json
```

## 🔧 Configuración

### Variables de Entorno

Crea o edita `.env`:

```env
PORT=3000
NODE_ENV=development
```

## 📦 Dependencias

- **express**: Framework web
- **cors**: Middleware CORS
- **dotenv**: Variables de entorno
- **nodemon**: Auto-reload en desarrollo

## 🛡️ Seguridad

- CORS habilitado para desarrollo
- Validación de entrada básica
- Manejo de errores centralizado

## 📝 Notas

- Los datos actualmente se sirven desde archivos JSON
- Para producción, considera migrar a una base de datos (MongoDB, PostgreSQL)
- Implementa autenticación si necesitas endpoints privados

## 🔜 Mejoras Futuras

- [ ] Base de datos real
- [ ] Autenticación JWT
- [ ] Rate limiting
- [ ] Logging avanzado
- [ ] Tests unitarios
- [ ] Documentación con Swagger

---

Desarrollado con 💧 para el Museo Virtual del Agua
