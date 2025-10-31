<!-- 
  Componente de Información Científica de Manglares
  Muestra datos en tiempo real desde Trefle Plants API
-->

<template>
  <div class="mangrove-science-panel">
    <h2 class="panel-title">
      🌿 Especies de Manglar - Base de Datos Botánica
      <span class="live-indicator" v-if="!loading">● LIVE</span>
    </h2>

    <p class="intro-text">
      Explora la diversidad de especies de manglar y vegetación asociada en estos ecosistemas únicos 
      donde el agua dulce se encuentra con el mar.
    </p>

    <!-- Estado de carga -->
    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Consultando base de datos botánica mundial...</p>
    </div>

    <!-- Listado de plantas -->
    <div v-else-if="plants && plants.length > 0" class="plants-content">
      <div class="plants-grid">
        <div 
          v-for="plant in plants" 
          :key="plant.id"
          class="plant-card"
          @click="selectPlant(plant)"
          :class="{ 'selected': selectedPlant?.id === plant.id }"
        >
          <div class="plant-image" v-if="plant.image_url">
            <img :src="plant.image_url" :alt="plant.common_name" loading="lazy" />
          </div>
          <div class="plant-image placeholder" v-else>
            <span class="plant-emoji">🌿</span>
          </div>
          
          <div class="plant-info">
            <h3 class="plant-name">{{ plant.common_name }}</h3>
            <p class="scientific-name">{{ plant.scientific_name }}</p>
            <div class="plant-family" v-if="plant.family_common_name">
              {{ plant.family_common_name }}
            </div>
          </div>

          <div class="expand-icon">👁️</div>
        </div>
      </div>

      <!-- Panel de detalle -->
      <Transition name="detail-slide">
        <div v-if="selectedPlant" class="plant-detail-panel">
          <button @click="closeDetail" class="close-detail-btn">✕</button>
          
          <div class="detail-content">
            <div class="detail-header">
              <h3 class="detail-title">{{ selectedPlant.common_name }}</h3>
              <p class="detail-scientific">{{ selectedPlant.scientific_name }}</p>
            </div>

            <div class="detail-grid">
              <div class="detail-section" v-if="selectedPlant.family">
                <div class="detail-label">Familia Botánica</div>
                <div class="detail-value">
                  {{ selectedPlant.family }}
                  <span v-if="selectedPlant.family_common_name"> 
                    ({{ selectedPlant.family_common_name }})
                  </span>
                </div>
              </div>

              <div class="detail-section" v-if="selectedPlant.year">
                <div class="detail-label">Año de Clasificación</div>
                <div class="detail-value">{{ selectedPlant.year }}</div>
              </div>

              <div class="detail-section full-width" v-if="selectedPlant.observations">
                <div class="detail-label">Observaciones Científicas</div>
                <div class="detail-value observations">
                  {{ selectedPlant.observations }}
                </div>
              </div>

              <div class="detail-section full-width" v-if="selectedPlant.bibliography">
                <div class="detail-label">Referencia Bibliográfica</div>
                <div class="detail-value bibliography">
                  {{ selectedPlant.bibliography }}
                </div>
              </div>
            </div>

            <!-- Información adicional específica de manglares -->
            <div class="mangrove-facts" v-if="getMangroveInfo(selectedPlant.common_name)">
              <h4 class="facts-title">🌊 Adaptaciones al Ambiente Marino</h4>
              <p>{{ getMangroveInfo(selectedPlant.common_name) }}</p>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Botón de actualización -->
      <button @click="refreshData" class="refresh-btn" :disabled="loading">
        🔄 Actualizar Base de Datos
      </button>
    </div>

    <!-- Estado sin datos -->
    <div v-else class="error-state">
      <p>❌ No se pudieron cargar datos de plantas.</p>
      <button @click="refreshData" class="retry-btn">Reintentar</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { plantService } from '../services/externalApi'

// Estado
const loading = ref(true)
const plants = ref([])
const selectedPlant = ref(null)

// Información adicional de manglares
const mangroveAdaptations = {
  'Red Mangrove': 'Las raíces aéreas (prop roots) permiten la oxigenación en suelos anaeróbicos y filtran hasta el 90% de la sal del agua marina. Viviparous: las semillas germinan mientras aún están en el árbol.',
  'Black Mangrove': 'Desarrolla neumatóforos (raíces respiratorias) que emergen verticalmente del suelo. Posee glándulas excretoras de sal en las hojas, que cristaliza y es removida por la lluvia o el viento.',
  'White Mangrove': 'Crece en zonas de mayor elevación del manglar. Posee glándulas excretoras de sal en la base de cada hoja. Es más tolerante a variaciones de salinidad que otras especies.',
  'Buttonwood': 'Especie de transición entre el manglar y el bosque terrestre. Sus hojas suculentas ayudan a retener agua dulce. Importante para estabilización de sedimentos costeros.'
}

// Métodos
async function loadMangroveData() {
  loading.value = true
  try {
    const data = await plantService.searchPlants('mangrove')
    plants.value = data.data || []
  } catch (error) {
    console.error('Error loading mangrove data:', error)
  } finally {
    loading.value = false
  }
}

async function refreshData() {
  selectedPlant.value = null
  await loadMangroveData()
}

function selectPlant(plant) {
  selectedPlant.value = plant
}

function closeDetail() {
  selectedPlant.value = null
}

function getMangroveInfo(commonName) {
  return mangroveAdaptations[commonName] || null
}

// Lifecycle
onMounted(() => {
  loadMangroveData()
})
</script>

<style scoped>
.mangrove-science-panel {
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
  margin-bottom: 1rem;
  color: #000000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}

.live-indicator {
  font-size: 0.9rem;
  color: #4CAF50;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.intro-text {
  font-size: 1rem;
  line-height: 1.6;
  color: #333333;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: #f5f5f5;
  border-left: 4px solid #4CAF50;
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
  border-top: 4px solid #4CAF50;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.plants-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Grid de plantas */
.plants-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.plant-card {
  background: #ffffff;
  border: 3px solid #000000;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
  position: relative;
}

.plant-card:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 #000000;
}

.plant-card.selected {
  border-color: #4CAF50;
  box-shadow: 0 0 0 3px #4CAF50;
}

.plant-image {
  width: 100%;
  aspect-ratio: 16/9;
  overflow: hidden;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.plant-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.plant-image.placeholder {
  background: linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%);
}

.plant-emoji {
  font-size: 4rem;
  filter: grayscale(100%) brightness(200%);
}

.plant-info {
  padding: 1rem;
}

.plant-name {
  font-size: 1.1rem;
  font-weight: bold;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
  color: #000000;
}

.scientific-name {
  font-style: italic;
  color: #4CAF50;
  font-weight: bold;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}

.plant-family {
  font-size: 0.85rem;
  color: #666666;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.expand-icon {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #ffffff;
  border: 2px solid #000000;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.plant-card:hover .expand-icon {
  opacity: 1;
}

/* Panel de detalle */
.plant-detail-panel {
  background: #f9f9f9;
  border: 4px solid #4CAF50;
  padding: 2rem;
  position: relative;
  margin-top: 1rem;
}

.close-detail-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #ffffff;
  border: 3px solid #000000;
  width: 2.5rem;
  height: 2.5rem;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.close-detail-btn:hover {
  background: #E91E63;
  color: #ffffff;
  transform: rotate(90deg);
}

.detail-content {
  padding-right: 3rem;
}

.detail-header {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 3px solid #000000;
}

.detail-title {
  font-size: 1.6rem;
  font-weight: bold;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
  color: #000000;
}

.detail-scientific {
  font-size: 1.2rem;
  font-style: italic;
  color: #4CAF50;
  font-weight: bold;
  margin: 0;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.detail-section {
  background: #ffffff;
  border: 2px solid #000000;
  padding: 1rem;
}

.detail-section.full-width {
  grid-column: 1 / -1;
}

.detail-label {
  font-size: 0.85rem;
  font-weight: bold;
  text-transform: uppercase;
  color: #666666;
  margin-bottom: 0.5rem;
  letter-spacing: 0.05em;
}

.detail-value {
  font-size: 1rem;
  color: #000000;
  line-height: 1.5;
}

.detail-value.observations,
.detail-value.bibliography {
  font-size: 0.95rem;
  line-height: 1.6;
}

.mangrove-facts {
  background: #e8f5e9;
  border: 3px solid #4CAF50;
  padding: 1.5rem;
  margin-top: 1.5rem;
}

.facts-title {
  font-size: 1.1rem;
  font-weight: bold;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  margin-bottom: 0.75rem;
  color: #2E7D32;
}

.mangrove-facts p {
  margin: 0;
  line-height: 1.6;
  color: #333333;
}

/* Transiciones */
.detail-slide-enter-active,
.detail-slide-leave-active {
  transition: all 0.3s ease;
}

.detail-slide-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.detail-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Botones */
.refresh-btn,
.retry-btn {
  background: #4CAF50;
  color: #ffffff;
  border: 3px solid #4CAF50;
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
  background: #2E7D32;
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 #000000;
}

.refresh-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Responsivo */
@media (max-width: 768px) {
  .mangrove-science-panel {
    padding: 1.5rem;
  }

  .panel-title {
    font-size: 1.3rem;
  }

  .plants-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }

  .detail-content {
    padding-right: 0;
  }

  .close-detail-btn {
    top: 0.5rem;
    right: 0.5rem;
  }

  .detail-grid {
    grid-template-columns: 1fr;
  }
}
</style>
