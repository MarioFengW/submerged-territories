<!-- 
  Componente Scene3DPlaceholder
  Placeholder para escenas 3D (se reemplazará con Three.js en producción)
-->

<template>
  <div class="scene-3d-placeholder">
    <div class="scene-container">
      <!-- Mensaje de placeholder -->
      <div class="placeholder-content">
        <div class="placeholder-icon">🌐</div>
        <h3>Escena 3D: {{ roomName }}</h3>
        <p>Aquí se renderizaría una escena 3D interactiva usando Three.js</p>
        
        <div class="features-list">
          <div class="feature-item">
            <span class="feature-icon">🎮</span>
            <span>Controles de cámara interactivos</span>
          </div>
          <div class="feature-item">
            <span class="feature-icon">🎨</span>
            <span>Modelos 3D optimizados</span>
          </div>
          <div class="feature-item">
            <span class="feature-icon">💫</span>
            <span>Efectos de partículas</span>
          </div>
          <div class="feature-item">
            <span class="feature-icon">🔊</span>
            <span>Ambiente sonoro inmersivo</span>
          </div>
        </div>

        <button @click="launchDemo" class="demo-btn">
          🚀 Lanzar Demo
        </button>
      </div>

      <!-- Representación visual simulada -->
      <div class="visual-demo">
        <div class="grid-lines"></div>
        <div class="rotating-cube">
          <div class="cube-face front">{{ roomIcon }}</div>
          <div class="cube-face back">3D</div>
          <div class="cube-face left">VR</div>
          <div class="cube-face right">AR</div>
          <div class="cube-face top">🌊</div>
          <div class="cube-face bottom">💧</div>
        </div>
      </div>
    </div>

    <!-- Info técnica -->
    <div class="tech-info">
      <p>
        <strong>Tecnologías sugeridas:</strong> 
        Three.js, WebGL, GLTF/GLB models, Orbit Controls
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// Props
const props = defineProps({
  roomId: {
    type: String,
    required: true
  },
  roomName: {
    type: String,
    required: true
  }
})

// Computed: Icono según la sala
const roomIcon = computed(() => {
  const icons = {
    'water-origin': '💧',
    'axolotl-room': '🦎',
    'mangrove-forest': '🌴',
    'threats-room': '⚠️'
  }
  return icons[props.roomId] || '🌊'
})

// Métodos
function launchDemo() {
  alert(`Demo 3D de: ${props.roomName}\n\nEn producción, aquí se inicializaría:\n\n• Renderizador Three.js\n• Carga de modelos GLTF\n• Controles de cámara\n• Iluminación y sombras\n• Física y animaciones\n\nPara implementar:\n1. npm install three\n2. Importar modelos 3D\n3. Configurar escena y cámara\n4. Agregar controles interactivos`)
}
</script>

<style scoped>
.scene-3d-placeholder {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.scene-container {
  min-height: 400px;
  display: flex;
  padding: 2rem;
  gap: 2rem;
  position: relative;
}

.placeholder-content {
  flex: 1;
  color: white;
  z-index: 2;
}

.placeholder-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

.placeholder-content h3 {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  color: #fff;
}

.placeholder-content p {
  opacity: 0.9;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.features-list {
  margin: 1.5rem 0;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0;
  opacity: 0.9;
}

.feature-icon {
  font-size: 1.5rem;
}

.demo-btn {
  margin-top: 1.5rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 30px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.demo-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
}

/* Demo visual */
.visual-demo {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.grid-lines {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(102, 126, 234, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(102, 126, 234, 0.1) 1px, transparent 1px);
  background-size: 30px 30px;
  animation: gridMove 20s linear infinite;
}

@keyframes gridMove {
  0% {
    transform: perspective(500px) rotateX(60deg) translateZ(0);
  }
  100% {
    transform: perspective(500px) rotateX(60deg) translateZ(30px);
  }
}

.rotating-cube {
  width: 150px;
  height: 150px;
  position: relative;
  transform-style: preserve-3d;
  animation: rotateCube 15s infinite linear;
}

@keyframes rotateCube {
  0% {
    transform: rotateX(0deg) rotateY(0deg);
  }
  100% {
    transform: rotateX(360deg) rotateY(360deg);
  }
}

.cube-face {
  position: absolute;
  width: 150px;
  height: 150px;
  background: rgba(102, 126, 234, 0.3);
  border: 2px solid rgba(102, 126, 234, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  color: white;
  backdrop-filter: blur(10px);
}

.front  { transform: translateZ(75px); }
.back   { transform: translateZ(-75px) rotateY(180deg); }
.left   { transform: translateX(-75px) rotateY(-90deg); }
.right  { transform: translateX(75px) rotateY(90deg); }
.top    { transform: translateY(-75px) rotateX(90deg); }
.bottom { transform: translateY(75px) rotateX(-90deg); }

.tech-info {
  background: rgba(0, 0, 0, 0.3);
  padding: 1rem 2rem;
  color: white;
  font-size: 0.9rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.tech-info strong {
  color: #667eea;
}

@media (max-width: 768px) {
  .scene-container {
    flex-direction: column;
    padding: 1.5rem;
  }
  
  .visual-demo {
    min-height: 200px;
  }
  
  .rotating-cube {
    width: 100px;
    height: 100px;
  }
  
  .cube-face {
    width: 100px;
    height: 100px;
    font-size: 1.5rem;
  }
  
  .front  { transform: translateZ(50px); }
  .back   { transform: translateZ(-50px) rotateY(180deg); }
  .left   { transform: translateX(-50px) rotateY(-90deg); }
  .right  { transform: translateX(50px) rotateY(90deg); }
  .top    { transform: translateY(-50px) rotateX(90deg); }
  .bottom { transform: translateY(50px) rotateX(-90deg); }
}
</style>
