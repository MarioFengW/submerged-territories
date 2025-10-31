<!-- 
  Componente ExhibitCard - Tarjeta de exhibición
  Muestra información de una exhibición interactiva
-->

<template>
  <div class="exhibit-card" :class="`type-${exhibit.type}`">
    <div class="exhibit-header">
      <div class="type-badge">{{ typeIcon }} {{ typeLabel }}</div>
      <h3 class="exhibit-title">{{ exhibit.title }}</h3>
    </div>

    <div class="exhibit-body">
      <p class="exhibit-description">{{ exhibit.description }}</p>

      <!-- Renderizador ASCII (solo visible cuando showModel = true) -->
      <div v-if="showModel && modelShape" class="ascii-model-container">
        <AsciiRenderer :shapeType="modelShape" :autoAnimate="true" />
        <button @click="showModel = false" class="close-model-btn">
          ✕ Cerrar Modelo
        </button>
      </div>

      <!-- Nota informativa si existe -->
      <div v-if="exhibit.infoNote" class="info-note">
        <div class="note-content">
          <span class="note-icon">ℹ️</span>
          <p>{{ exhibit.infoNote }}</p>
        </div>
      </div>
    </div>

    <div class="exhibit-footer">
      <button @click="viewExhibit" class="view-btn">
        {{ actionText }} ✨
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import AsciiRenderer from './AsciiRenderer.vue'

// Props
const props = defineProps({
  exhibit: {
    type: Object,
    required: true
  }
})

// Estado local
const showModel = ref(false)
const route = useRoute()

// Computed: Tipo de exhibición
const typeLabel = computed(() => {
  const types = {
    '3d-model': 'Modelo 3D',
    'animation': 'Animación',
    'panorama-360': 'Vista 360°',
    '3d-scene': 'Escena 3D',
    'cutaway-view': 'Vista de Corte',
    'comparison-slider': 'Comparación',
    'data-visualization': 'Visualización',
    'interactive-quiz': 'Quiz Interactivo'
  }
  return types[props.exhibit.type] || 'Exhibición'
})

const typeIcon = computed(() => {
  const icons = {
    '3d-model': '🎨',
    'animation': '🎬',
    'panorama-360': '🌐',
    '3d-scene': '🏞️',
    'cutaway-view': '🔍',
    'comparison-slider': '⚖️',
    'data-visualization': '📊',
    'interactive-quiz': '🎮'
  }
  return icons[props.exhibit.type] || '✨'
})

const actionText = computed(() => {
  const actions = {
    '3d-model': 'Ver Modelo',
    'animation': 'Ver Animación',
    'panorama-360': 'Explorar 360°',
    '3d-scene': 'Entrar a Escena',
    'interactive-quiz': 'Jugar Ahora'
  }
  return actions[props.exhibit.type] || 'Ver Exhibición'
})

// Computed: Determinar qué modelo ASCII mostrar
const modelShape = computed(() => {
  const roomId = route.params.id
  const exhibitTitle = props.exhibit.title.toLowerCase()
  
  // Mapeo por ID de sala
  if (roomId === 'axolotl-room') {
    if (exhibitTitle.includes('interactivo') || exhibitTitle.includes('3d')) {
      return 'axolotl'
    } else if (exhibitTitle.includes('anatomía')) {
      return 'anatomy'
    }
  }
  
  if (roomId === 'mangrove-forest') {
    if (exhibitTitle.includes('ecosistema') || exhibitTitle.includes('biodiversidad')) {
      return 'ecosystem'
    } else if (exhibitTitle.includes('recorrido') || exhibitTitle.includes('bosque')) {
      return 'mangrove'
    }
  }
  
  if (roomId === 'water-origin') {
    return 'wave'
  }
  
  // Por defecto
  return 'cube'
})

// Métodos
function viewExhibit() {
  if (props.exhibit.type === '3d-model' || props.exhibit.type === 'animation') {
    // Mostrar el modelo ASCII
    showModel.value = true
  } else {
    // Para otros tipos, mostrar alerta
    alert(`Abriendo: ${props.exhibit.title}\n\nEsta exhibición interactiva estará disponible próximamente.`)
  }
}
</script>

<style scoped>
.exhibit-card {
  background: #ffffff;
  border-radius: 0;
  overflow: hidden;
  box-shadow: 5px 5px 0 #000000;
  transition: all 0.3s ease;
  border: 4px solid #000000;
}

.exhibit-card:hover {
  transform: translate(-3px, -3px);
  box-shadow: 8px 8px 0 #000000;
}

.exhibit-header {
  padding: 1.25rem;
  background: #000000;
  border-bottom: 4px solid #ffffff;
}

.type-badge {
  display: inline-block;
  background: #ffffff;
  color: #000000;
  padding: 0.25rem 0.75rem;
  border-radius: 0;
  font-size: 0.85rem;
  font-weight: bold;
  margin-bottom: 0.75rem;
  border: 2px solid #ffffff;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.exhibit-title {
  font-size: 1.3rem;
  color: #ffffff;
  margin: 0;
  font-weight: bold;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
}

.exhibit-body {
  padding: 1.25rem;
}

.ascii-model-container {
  background: #ffffff;
  border: 4px solid #000000;
  padding: 1.5rem;
  margin: 1.5rem 0;
  box-shadow: 5px 5px 0 #000000;
  position: relative;
}

.close-model-btn {
  margin-top: 1rem;
  width: 100%;
  padding: 0.5rem;
  background: #000000;
  color: #ffffff;
  border: 3px solid #000000;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s ease;
}

.close-model-btn:hover {
  background: #ffffff;
  color: #000000;
  border-color: #000000;
}

.exhibit-description {
  color: #000000;
  line-height: 1.6;
  margin-bottom: 1rem;
  font-family: 'Courier New', monospace;
}

.info-note {
  background: #000000;
  color: #ffffff;
  padding: 1rem;
  border-radius: 0;
  margin: 1rem 0;
  position: relative;
  border: 3px solid #ffffff;
  box-shadow: 3px 3px 0 #000000;
}

.note-content {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.note-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
  filter: grayscale(100%) brightness(300%);
}

.note-content p {
  margin: 0;
  color: #ffffff;
  font-style: normal;
  font-family: 'Courier New', monospace;
  line-height: 1.6;
}

.model-info,
.panorama-info {
  background: #000000;
  color: #ffffff;
  padding: 0.75rem;
  border-radius: 0;
  margin-top: 1rem;
  border: 3px solid #ffffff;
}

.model-info p,
.panorama-info p {
  margin: 0.25rem 0;
  font-size: 0.9rem;
  color: #ffffff;
  font-family: 'Courier New', monospace;
}

.exhibit-footer {
  padding: 1rem 1.25rem;
  background: #000000;
  border-top: 4px solid #ffffff;
}

.view-btn {
  width: 100%;
  padding: 0.75rem;
  background: #ffffff;
  color: #000000;
  border: 3px solid #ffffff;
  border-radius: 0;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 3px 3px 0 #ffffff;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.view-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.view-btn:active {
  transform: translateY(0);
}

/* Diferentes colores según tipo */
.type-3d-model {
  border-left-color: #4CAF50;
}

.type-animation {
  border-left-color: #FF9800;
}

.type-panorama-360 {
  border-left-color: #2196F3;
}

.type-interactive-quiz {
  border-left-color: #E91E63;
}
</style>
