<!-- 
  Componente ContentCard - Tarjeta de contenido educativo
  Muestra información y datos educativos
-->

<template>
  <div class="content-card" :class="`type-${content.type}`">
    <div class="content-header">
      <span class="content-type-badge">{{ typeIcon }} {{ typeLabel }}</span>
      <h3 class="content-title">{{ content.title }}</h3>
    </div>

    <div class="content-body">
      <!-- Contenido de texto -->
      <p v-if="content.content" class="content-text">{{ content.content }}</p>

      <!-- Facts/Datos curiosos -->
      <div v-if="content.facts && content.facts.length" class="facts-section">
        <h4>💡 Datos Curiosos:</h4>
        <ul class="facts-list">
          <li v-for="(fact, index) in content.facts" :key="index">
            {{ fact }}
          </li>
        </ul>
      </div>

      <!-- Amenazas (para sala de amenazas) -->
      <div v-if="content.threats && content.threats.length" class="threats-section">
        <div 
          v-for="threat in content.threats" 
          :key="threat.name"
          class="threat-item"
          :class="`severity-${threat.severity}`"
        >
          <div class="threat-header">
            <strong>{{ threat.name }}</strong>
            <span class="severity-badge">{{ severityLabel(threat.severity) }}</span>
          </div>
          <p>{{ threat.description }}</p>
        </div>
      </div>

      <!-- Acciones (para contenido tipo action) -->
      <div v-if="content.actions && content.actions.length" class="actions-section">
        <h4>{{ content.callToAction || '¿Qué puedes hacer?' }}</h4>
        <ul class="actions-list">
          <li v-for="(action, index) in content.actions" :key="index">
            {{ action }}
          </li>
        </ul>
      </div>

      <!-- Galería de imágenes -->
      <div v-if="content.images && content.images.length" class="gallery-section">
        <div class="gallery-grid">
          <div 
            v-for="(image, index) in content.images" 
            :key="index"
            class="gallery-item"
          >
            <div class="image-placeholder">
              📷 {{ content.descriptions?.[index] || 'Imagen' }}
            </div>
          </div>
        </div>
      </div>

      <!-- Interactivo -->
      <div v-if="content.type === 'interactive'" class="interactive-section">
        <button @click="launchInteractive" class="interactive-btn">
          🎮 Lanzar Experiencia Interactiva
        </button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'

// Props
const props = defineProps({
  content: {
    type: Object,
    required: true
  }
})

// Computed
const typeLabel = computed(() => {
  const labels = {
    'text': 'Texto',
    'interactive': 'Interactivo',
    'gallery': 'Galería',
    'action': 'Acciones'
  }
  return labels[props.content.type] || 'Contenido'
})

const typeIcon = computed(() => {
  const icons = {
    'text': '📄',
    'interactive': '🎮',
    'gallery': '🖼️',
    'action': '✅'
  }
  return icons[props.content.type] || '📌'
})

// Métodos
function severityLabel(severity) {
  const labels = {
    'critical': '⚠️ Crítico',
    'high': '🔴 Alto',
    'medium': '🟡 Medio',
    'low': '🟢 Bajo'
  }
  return labels[severity] || severity
}

function launchInteractive() {
  alert(`Lanzando experiencia interactiva: ${props.content.title}\n\nEsta es una demostración. En producción se cargaría el contenido 3D o animación.`)
}
</script>

<style scoped>
.content-card {
  background: #ffffff;
  border-radius: 0;
  padding: 1.5rem;
  box-shadow: 5px 5px 0 #000000;
  transition: all 0.3s ease;
  border: 4px solid #000000;
  position: relative;
}

.content-card:hover {
  box-shadow: 8px 8px 0 #000000;
  transform: translate(-2px, -2px);
}

.content-header {
  margin-bottom: 1rem;
}

.content-type-badge {
  display: inline-block;
  background: #000000;
  color: #ffffff;
  padding: 0.25rem 0.75rem;
  border-radius: 0;
  font-size: 0.8rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  border: 2px solid #000000;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.content-title {
  font-size: 1.4rem;
  color: #000000;
  margin: 0.5rem 0;
  font-weight: bold;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
}

.content-body {
  color: #000000;
}

.content-text {
  line-height: 1.8;
  margin-bottom: 1rem;
  font-size: 1rem;
  font-family: 'Courier New', monospace;
}

.facts-section {
  background: #000000;
  color: #ffffff;
  padding: 1rem;
  border-radius: 0;
  margin: 1rem 0;
  border: 3px solid #ffffff;
  box-shadow: 3px 3px 0 #000000;
}

.facts-section h4 {
  color: #ffffff;
  margin-bottom: 0.75rem;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
}

.facts-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.facts-list li {
  padding: 0.5rem 0 0.5rem 1.5rem;
  position: relative;
  line-height: 1.6;
}

.facts-list li::before {
  content: '⭐';
  position: absolute;
  left: 0;
}

.threats-section {
  margin: 1rem 0;
}

.threat-item {
  background: #fff3e0;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 0.75rem;
  border-left: 4px solid #ff9800;
}

.threat-item.severity-critical {
  background: #ffebee;
  border-left-color: #f44336;
}

.threat-item.severity-high {
  background: #fff3e0;
  border-left-color: #ff9800;
}

.threat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.threat-header strong {
  color: #333;
  font-size: 1.1rem;
}

.severity-badge {
  font-size: 0.85rem;
  padding: 0.25rem 0.5rem;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.1);
}

.threat-item p {
  margin: 0;
  color: #555;
  line-height: 1.5;
}

.actions-section {
  background: linear-gradient(135deg, #e8f5e9 0%, #f1f8e9 100%);
  padding: 1rem;
  border-radius: 10px;
  margin: 1rem 0;
}

.actions-section h4 {
  color: #4CAF50;
  margin-bottom: 0.75rem;
  font-size: 1.1rem;
}

.actions-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.actions-list li {
  padding: 0.5rem 0 0.5rem 1.5rem;
  position: relative;
  line-height: 1.6;
}

.actions-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #4CAF50;
  font-weight: bold;
  font-size: 1.2rem;
}

.gallery-section {
  margin: 1rem 0;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
}

.gallery-item {
  aspect-ratio: 1;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.85rem;
  text-align: center;
  padding: 0.5rem;
  transition: transform 0.3s ease;
}

.image-placeholder:hover {
  transform: scale(1.05);
}

.interactive-section {
  margin: 1rem 0;
  text-align: center;
}

.interactive-btn {
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 25px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
}

.interactive-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

.manga-panel {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 2px dashed #ddd;
  position: relative;
}

.manga-bubble {
  background: #fff9c4;
  padding: 0.75rem;
  border-radius: 10px;
  font-size: 0.85rem;
  color: #666;
  font-style: italic;
  position: relative;
  display: inline-block;
  border: 2px solid #fbc02d;
}

.bubble-tail {
  position: absolute;
  bottom: -8px;
  left: 20px;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid #fbc02d;
}

/* Diferentes estilos según tipo */
.type-interactive {
  border-top-color: #4CAF50;
}

.type-gallery {
  border-top-color: #E91E63;
}

.type-action {
  border-top-color: #FF9800;
}
</style>
