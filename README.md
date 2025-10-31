# 🦎🌿 Museo Virtual de Axolote y Manglar

Museo virtual interactivo dedicado a la conservación del axolote mexicano y los ecosistemas de manglar. Experiencia educativa con modelos 3D, visualizaciones ASCII y datos científicos en tiempo real.

## 📋 Descripción

Este proyecto es una aplicación web educativa que permite explorar dos ecosistemas acuáticos extraordinarios:

- **🦎 Axolote Mexicano**: Especie endémica en peligro crítico de extinción, habitante de los canales de Xochimilco
- **🌿 Manglares**: Ecosistemas costeros vitales que protegen nuestras costas y capturan carbono

### Características principales:

- ✨ Modelos 3D interactivos con Three.js
- 📡 Datos científicos en tiempo real desde APIs especializadas
- 🎨 Diseño estilo manga con estética monocromática
- 🔬 Información taxonómica y biológica actualizada
- 📱 Diseño responsive para todos los dispositivos

## 🛠️ Tecnologías

### Frontend
- **Vue.js 3** - Framework reactivo
- **Three.js** - Renderizado 3D
- **Vite** - Build tool y dev server
- **Vue Router** - Navegación

### Backend
- **Node.js** - Runtime de JavaScript
- **Express** - Framework web
- **Axios** - Cliente HTTP para APIs externas

### APIs Externas
- **Animals API (API Ninjas)** - Datos científicos de animales
- **Trefle Plants API** - Información de plantas y manglares

## 📦 Instalación

### Prerrequisitos

- **Node.js** v16 o superior
- **npm** v7 o superior

### 1. Clonar el repositorio

```bash
git clone https://github.com/MarioFengW/submerged-territories.git
cd submerged-territories
```

### 2. Instalar dependencias

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd frontend
npm install
```

### 3. Configurar variables de entorno

#### Backend (`backend/.env`)
```env
PORT=3000
NODE_ENV=development

# APIs Externas
ANIMALS_API_KEY=tu_api_key_aqui
TREFLE_API_KEY=tu_api_key_aqui
```

#### Frontend (`frontend/.env`)
```env
# Estas variables ya no son necesarias si usas el backend proxy
# Pero puedes configurarlas si quieres usar las APIs directamente
VITE_ANIMALS_API_KEY=tu_api_key_aqui
VITE_TREFLE_API_KEY=tu_api_key_aqui
```

### 4. Obtener API Keys (opcional)

- **Animals API**: https://api-ninjas.com/api/animals
- **Trefle Plants API**: https://trefle.io/

*Nota: El proyecto incluye datos mock que se usan automáticamente si no hay API keys configuradas.*

## 🚀 Ejecución

### Opción 1: Script automático (Windows PowerShell)

```powershell
.\start-safe.ps1
```

Este script inicia automáticamente el backend y el frontend.

### Opción 2: Inicio manual

#### Terminal 1 - Backend
```bash
cd backend
node server.js
```
El backend estará disponible en: `http://localhost:3000`

#### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```
El frontend estará disponible en: `http://localhost:5173` (o el puerto que Vite asigne)

## 📂 Estructura del Proyecto

```
submerged-territories/
├── backend/              # Servidor Express
│   ├── controllers/      # Controladores de rutas
│   ├── data/            # Datos JSON del museo
│   ├── routes/          # Definición de rutas API
│   ├── server.js        # Servidor principal
│   └── .env             # Variables de entorno
│
├── frontend/            # Aplicación Vue.js
│   ├── public/          # Archivos estáticos
│   │   └── assets/
│   │       └── models/  # Modelos 3D (.glb/.gltf)
│   ├── src/
│   │   ├── assets/      # Estilos CSS
│   │   ├── components/  # Componentes Vue
│   │   ├── router/      # Configuración de rutas
│   │   ├── services/    # Servicios API
│   │   ├── stores/      # Estado global (Pinia)
│   │   └── views/       # Vistas/Páginas
│   ├── index.html       # HTML principal
│   └── .env             # Variables de entorno
│
└── start-safe.ps1       # Script de inicio automático
```

## 🎮 Uso

1. **Página de Inicio**: Bienvenida y acceso a las salas
2. **Salas del Museo**: 
   - Galería de Axolotes
   - Bosque de Manglares
3. **Visor 3D Interactivo**: 
   - Rotar, hacer zoom y explorar modelos 3D
   - Ver información científica en tiempo real
4. **Panel de Información**: Datos biológicos y taxonómicos

### Controles del Visor 3D:
- **Click + Arrastrar**: Rotar modelo
- **Scroll**: Zoom in/out
- **Click derecho + Arrastrar**: Mover (pan)
- **Botón Reset**: Restablecer cámara
- **Botón Info**: Ver información científica

### Las APIs no funcionan
- Verifica que el backend esté corriendo
- Confirma que las API keys estén en `backend/.env`
- El sistema usa datos mock automáticamente si las APIs fallan

### Modelos 3D no cargan
- Asegúrate de que los archivos `.glb` o `.gltf` estén en `frontend/public/assets/models/`
- Verifica las rutas en `backend/data/exhibits.json`

## 👥 Autor

Mario Feng - [MarioFengW](https://github.com/MarioFengW)
---