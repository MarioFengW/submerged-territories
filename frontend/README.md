# 🎨 Frontend - Museo Virtual del Agua

Aplicación Vue.js 3 con interfaz estilo manga para explorar el mundo del agua.

## 🚀 Inicio Rápido

### Instalación

```bash
npm install
```

### Ejecución

**Desarrollo:**
```bash
npm run dev
```
Abre `http://localhost:5173`

**Build de Producción:**
```bash
npm run build
```

**Preview del Build:**
```bash
npm run preview
```

## 🎨 Componentes

### Componentes Reutilizables

- **RoomCard.vue** - Tarjeta de sala con estilo manga
- **ExhibitCard.vue** - Tarjeta de exhibición interactiva
- **ContentCard.vue** - Tarjeta de contenido educativo
- **Scene3DPlaceholder.vue** - Placeholder para escenas 3D

### Vistas

- **Home.vue** - Página de inicio con hero y estadísticas
- **Rooms.vue** - Lista de todas las salas
- **RoomDetail.vue** - Detalle de sala individual
- **About.vue** - Información sobre el museo

## 📁 Estructura

```
frontend/
├── src/
│   ├── assets/          # Recursos estáticos
│   ├── components/      # Componentes reutilizables
│   ├── views/           # Páginas/Vistas
│   ├── router/          # Configuración de rutas
│   ├── stores/          # Estado global (Pinia)
│   ├── services/        # Servicios API
│   ├── App.vue          # Componente raíz
│   └── main.js          # Punto de entrada
├── index.html
├── vite.config.js
└── package.json
```

## 🎯 Características

### Gestión de Estado (Pinia)

```javascript
import { useMuseumStore } from '@/stores/museum'

const store = useMuseumStore()
await store.fetchRooms()
```

### Enrutamiento (Vue Router)

- `/` - Inicio
- `/rooms` - Lista de salas
- `/room/:id` - Detalle de sala
- `/about` - Acerca de

### Servicios API

```javascript
import api from '@/services/api'

const rooms = await api.getRooms()
const exhibits = await api.getExhibitsByRoom('water-origin')
```

## 🎨 Personalización

### Colores (CSS Variables)

Edita `src/assets/styles.css`:

```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --accent-color: #4CAF50;
}
```

### Agregar Nueva Sala

1. Actualiza `backend/data/rooms.json`
2. Agrega exhibiciones en `backend/data/exhibits.json`
3. Crea contenido en `backend/data/content.json`

## 🔧 Configuración

### Proxy al Backend

El Vite está configurado para hacer proxy a `http://localhost:3000`:

```javascript
// vite.config.js
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true
    }
  }
}
```

### Alias de Importación

```javascript
import Component from '@/components/Component.vue'
```

El alias `@` apunta a `src/`.

## 📦 Dependencias

- **vue**: Framework principal
- **vue-router**: Enrutamiento
- **pinia**: Gestión de estado
- **axios**: Cliente HTTP
- **vite**: Build tool

## 🎮 Interactividad

### Placeholders 3D

Los componentes 3D actualmente son placeholders. Para implementar Three.js:

```bash
npm install three
```

Luego actualiza `Scene3DPlaceholder.vue` con tu lógica 3D.

## 🌐 Internacionalización (Futuro)

Para agregar múltiples idiomas:

```bash
npm install vue-i18n@9
```

## 📱 Responsive Design

La aplicación es completamente responsive:
- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: < 768px

## 🔜 Mejoras Futuras

- [ ] Implementar Three.js para 3D real
- [ ] PWA con service workers
- [ ] Modo oscuro
- [ ] Animaciones avanzadas
- [ ] Sistema de búsqueda
- [ ] Caché de datos

---

Desarrollado con ⚡ Vue.js y estilo 🎨 manga
