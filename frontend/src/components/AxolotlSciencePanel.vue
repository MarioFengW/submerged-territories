<!-- 
  Componente de Información Científica del Axolote
  Muestra datos en tiempo real desde Animals API
-->

<template>
  <div class="axolotl-science-panel">
    <h2 class="panel-title">
      🔬 Información Científica en Tiempo Real
      <span class="live-indicator" v-if="!loading">● LIVE</span>
    </h2>

    <!-- Estado de carga -->
    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Consultando base de datos científica...</p>
    </div>

    <!-- Datos del axolote -->
    <div v-else-if="animalData" class="science-content">
      <!-- Taxonomía -->
      <section class="info-section taxonomy-section">
        <h3 class="section-header">📋 Clasificación Taxonómica</h3>
        <div class="info-grid">
          <div class="info-item">
            <span class="label">Nombre Común:</span>
            <span class="value">{{ animalData.name }}</span>
          </div>
          <div class="info-item">
            <span class="label">Nombre Científico:</span>
            <span class="value scientific">{{ taxonomy.scientific_name }}</span>
          </div>
          <div class="info-item">
            <span class="label">Reino:</span>
            <span class="value">{{ taxonomy.kingdom }}</span>
          </div>
          <div class="info-item">
            <span class="label">Clase:</span>
            <span class="value">{{ taxonomy.class }}</span>
          </div>
          <div class="info-item">
            <span class="label">Orden:</span>
            <span class="value">{{ taxonomy.order }}</span>
          </div>
          <div class="info-item">
            <span class="label">Familia:</span>
            <span class="value">{{ taxonomy.family }}</span>
          </div>
        </div>
      </section>

      <!-- Características Biológicas -->
      <section class="info-section characteristics-section">
        <h3 class="section-header">🧬 Características Biológicas</h3>
        <div class="characteristics-grid">
          <div class="char-card" v-if="characteristics.habitat">
            <div class="char-icon">🏠</div>
            <div class="char-label">Hábitat</div>
            <div class="char-value">{{ characteristics.habitat }}</div>
          </div>
          <div class="char-card" v-if="characteristics.diet">
            <div class="char-icon">🍽️</div>
            <div class="char-label">Dieta</div>
            <div class="char-value">{{ characteristics.diet }}</div>
          </div>
          <div class="char-card" v-if="characteristics.lifespan">
            <div class="char-icon">⏱️</div>
            <div class="char-label">Esperanza de Vida</div>
            <div class="char-value">{{ characteristics.lifespan }}</div>
          </div>
          <div class="char-card" v-if="characteristics.length">
            <div class="char-icon">📏</div>
            <div class="char-label">Longitud</div>
            <div class="char-value">{{ characteristics.length }}</div>
          </div>
          <div class="char-card" v-if="characteristics.weight">
            <div class="char-icon">⚖️</div>
            <div class="char-label">Peso</div>
            <div class="char-value">{{ characteristics.weight }}</div>
          </div>
          <div class="char-card" v-if="characteristics.color">
            <div class="char-icon">🎨</div>
            <div class="char-label">Colores</div>
            <div class="char-value">{{ characteristics.color }}</div>
          </div>
        </div>
      </section>

      <!-- Datos Curiosos -->
      <section class="info-section curiosities-section">
        <h3 class="section-header">✨ Datos Fascinantes</h3>
        <div class="curiosities-list">
          <div class="curiosity-item" v-if="characteristics.most_distinctive_feature">
            <span class="curiosity-icon">🌟</span>
            <div>
              <strong>Característica Distintiva:</strong>
              <p>{{ characteristics.most_distinctive_feature }}</p>
            </div>
          </div>
          <div class="curiosity-item" v-if="characteristics.prey">
            <span class="curiosity-icon">🦐</span>
            <div>
              <strong>Alimentación:</strong>
              <p>{{ characteristics.prey }}</p>
            </div>
          </div>
          <div class="curiosity-item" v-if="characteristics.other_name">
            <span class="curiosity-icon">📛</span>
            <div>
              <strong>Otros Nombres:</strong>
              <p>{{ characteristics.other_name }}</p>
            </div>
          </div>
          <div class="curiosity-item" v-if="characteristics.location">
            <span class="curiosity-icon">📍</span>
            <div>
              <strong>Ubicación Natural:</strong>
              <p>{{ characteristics.location }}</p>
            </div>
          </div>
          
          <!-- Datos fascinantes adicionales -->
          <div class="curiosity-item" v-for="(fact, index) in additionalFacts" :key="index">
            <span class="curiosity-icon">✨</span>
            <div>
              <p>{{ fact }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Estado de Conservación -->
      <section class="info-section conservation-section" v-if="characteristics.biggest_threat">
        <h3 class="section-header">⚠️ Estado de Conservación</h3>
        <div class="conservation-alert">
          <div class="alert-icon">🚨</div>
          <div class="alert-content">
            <strong>Principal Amenaza:</strong>
            <p>{{ characteristics.biggest_threat }}</p>
            <div class="population-info" v-if="characteristics.estimated_population_size">
              <strong>Población Estimada:</strong> {{ characteristics.estimated_population_size }}
            </div>
          </div>
        </div>
      </section>

      <!-- Botón de actualización -->
      <button @click="refreshData" class="refresh-btn" :disabled="loading">
        🔄 Actualizar Datos
      </button>
    </div>

    <!-- Error state -->
    <div v-else class="error-state">
      <p>❌ No se pudo cargar la información científica.</p>
      <button @click="refreshData" class="retry-btn">Reintentar</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { animalService } from '../services/externalApi'

// Estado
const loading = ref(true)
const animalData = ref(null)

// Computed
const taxonomy = computed(() => animalData.value?.taxonomy || {})
const characteristics = computed(() => {
  const chars = animalData.value?.characteristics || {}
  
  // Procesar colores si están en formato sin espacios
  if (chars.color && !chars.color.includes(',')) {
    chars.color = formatColors(chars.color)
  }
  
  return chars
})

// Función para formatear colores
function formatColors(colorString) {
  // Mapeo de colores en inglés a español
  const colorMap = {
    'Brown': 'Café',
    'Grey': 'Gris',
    'Gray': 'Gris',
    'Black': 'Negro',
    'White': 'Blanco',
    'Pink': 'Rosa',
    'Gold': 'Dorado',
    'Yellow': 'Amarillo',
    'Tan': 'Beige'
  }
  
  // Separar colores usando mayúsculas como delimitador
  const colors = colorString.match(/[A-Z][a-z]*/g) || [colorString]
  
  // Traducir y unir con comas
  return colors.map(color => colorMap[color] || color).join(', ')
}

// Datos fascinantes adicionales como fallback
const additionalFacts = [
  'El axolote es capaz de regenerar extremidades completas, incluyendo huesos, músculos y nervios.',
  'A diferencia de otros anfibios, el axolote mantiene sus características juveniles toda su vida (neotenia).',
  'Sus branquias externas rosadas pueden regenerarse si se dañan.',
  'Puede regenerar hasta el 40% de su cerebro sin pérdida de memoria.',
  'En la naturaleza, solo habita en los canales de Xochimilco, Ciudad de México.',
  'Los aztecas consideraban al axolote como una manifestación del dios Xolotl.'
]

// Métodos
async function loadAxolotlData() {
  loading.value = true
  try {
    const data = await animalService.getAnimalByName('axolotl')
    if (data && data.length > 0) {
      animalData.value = data[0]
    }
  } catch (error) {
    console.error('Error loading axolotl data:', error)
  } finally {
    loading.value = false
  }
}

async function refreshData() {
  await loadAxolotlData()
}

// Lifecycle
onMounted(() => {
  loadAxolotlData()
})
</script>

<style scoped>
.axolotl-science-panel {
  background: #ffffff;
  border: 4px solid #000000;
  padding: 2rem;
  margin: 2rem 0;
  box-shadow: 6px 6px 0 #000000;
}

.panel-title {
  font-size: 1.8rem;
  font-weight: bold;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1.5rem;
  color: #000000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}

.live-indicator {
  font-size: 0.9rem;
  color: #E91E63;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.loading-state,
.error-state {
  text-align: center;
  padding: 3rem 1rem;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #cccccc;
  border-top: 4px solid #000000;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.science-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.info-section {
  border: 3px solid #000000;
  padding: 1.5rem;
  background: #ffffff;
}

.section-header {
  font-size: 1.3rem;
  font-weight: bold;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 3px solid #000000;
  color: #000000;
}

/* Taxonomía */
.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  padding: 0.75rem;
  background: #f5f5f5;
  border: 2px solid #000000;
}

.label {
  font-size: 0.85rem;
  font-weight: bold;
  text-transform: uppercase;
  color: #666666;
  margin-bottom: 0.25rem;
}

.value {
  font-size: 1rem;
  color: #000000;
  font-weight: bold;
}

.value.scientific {
  font-style: italic;
  color: #E91E63;
}

/* Características */
.characteristics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.char-card {
  background: #ffffff;
  border: 3px solid #000000;
  padding: 1rem;
  text-align: center;
  transition: transform 0.2s ease;
}

.char-card:hover {
  transform: translateY(-2px);
  box-shadow: 4px 4px 0 #000000;
}

.char-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.char-label {
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;
  color: #666666;
  margin-bottom: 0.5rem;
}

.char-value {
  font-size: 0.95rem;
  font-weight: bold;
  color: #000000;
}

/* Curiosidades */
.curiosities-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.curiosity-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: #f9f9f9;
  border-left: 4px solid #E91E63;
}

.curiosity-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.curiosity-item strong {
  display: block;
  margin-bottom: 0.25rem;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  font-size: 0.9rem;
}

.curiosity-item p {
  margin: 0;
  line-height: 1.5;
  color: #333333;
}

/* Conservación */
.conservation-section {
  background: #fff5f5;
}

.conservation-alert {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: #ffffff;
  border: 3px solid #E91E63;
}

.alert-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.alert-content strong {
  display: block;
  margin-bottom: 0.5rem;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  color: #E91E63;
}

.alert-content p {
  margin: 0 0 0.75rem 0;
  line-height: 1.5;
  color: #333333;
}

.population-info {
  padding: 0.5rem;
  background: #f5f5f5;
  border-left: 3px solid #000000;
  font-size: 0.9rem;
}

/* Botones */
.refresh-btn,
.retry-btn {
  background: #000000;
  color: #ffffff;
  border: 3px solid #000000;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 4px 4px 0 #000000;
  margin-top: 1rem;
}

.refresh-btn:hover:not(:disabled),
.retry-btn:hover {
  background: #E91E63;
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 #000000;
}

.refresh-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Responsivo */
@media (max-width: 768px) {
  .axolotl-science-panel {
    padding: 1.5rem;
  }

  .panel-title {
    font-size: 1.3rem;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .characteristics-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .section-header {
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .characteristics-grid {
    grid-template-columns: 1fr;
  }

  .curiosity-item {
    flex-direction: column;
    text-align: center;
  }
}
</style>
