<!-- 
  Vista de detalle de una sala específica
  Muestra contenido y exhibiciones de la sala
-->

<template>
  <div class="room-detail" v-if="room">
    <!-- Header de la sala con estilo manga -->
    <div class="room-header" :style="{ background: room.color }">
      <button @click="goBack" class="back-btn">
        ← Volver
      </button>
      
      <div class="room-header-content">
        <div class="room-icon">{{ room.icon }}</div>
        <h1 class="room-title">{{ room.title }}</h1>
        <p class="room-subtitle">{{ room.subtitle }}</p>
        <p class="room-description">{{ room.description }}</p>
      </div>
    </div>

    <!-- Contenido de la sala -->
    <div class="room-content">
      <!-- Exhibiciones Interactivas - Modelo 3D -->
      <section class="exhibits-section" v-if="interactive3DExhibit">
        <h2 class="section-title">🎨 Exhibición Interactiva 3D</h2>
        <Model3DViewer 
          :exhibit="interactive3DExhibit"
          :showFPS="false"
          @onLoad="handle3DLoad"
          @onClick="handle3DClick"
          @onHover="handle3DHover"
          @onError="handle3DError"
        />
      </section>

      <!-- Contenido educativo -->
      <section class="content-section" v-if="roomContent.length > 0">
        <h2 class="section-title">📚 Contenido Educativo</h2>
        <div class="content-list">
          <ContentCard 
            v-for="content in roomContent" 
            :key="content.id"
            :content="content"
          />
        </div>
      </section>

      <!-- Panel de Información Científica del Axolote -->
      <section v-if="room.id === 'axolotl-room'" class="science-section">
        <AxolotlSciencePanel />
      </section>

      <!-- Galería de Axolotes (solo para la sala de axolotes) -->
      <section v-if="room.id === 'axolotl-room'" class="axolotl-gallery-section">
        <AxolotlGallery />
      </section>

      <!-- Panel de Información Científica de Manglares -->
      <section v-if="room.id === 'mangrove-forest'" class="science-section">
        <MangroveSciencePanel />
      </section>
    </div>
  </div>

  <!-- Estado de carga -->
  <div v-else-if="loading" class="loading">
    <div class="spinner"></div>
    <p>Preparando la sala...</p>
  </div>

  <!-- Sala no encontrada -->
  <div v-else class="not-found">
    <h2>❌ Sala no encontrada</h2>
    <p>La sala que buscas no existe o ha sido trasladada.</p>
    <router-link to="/rooms" class="btn-primary">Ver todas las salas</router-link>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMuseumStore } from '../stores/museum'
import ExhibitCard from '../components/ExhibitCard.vue'
import ContentCard from '../components/ContentCard.vue'
import Model3DViewer from '../components/Model3DViewer.vue'
import AxolotlGallery from '../components/AxolotlGallery.vue'
import AxolotlSciencePanel from '../components/AxolotlSciencePanel.vue'
import MangroveSciencePanel from '../components/MangroveSciencePanel.vue'

const route = useRoute()
const router = useRouter()
const store = useMuseumStore()

// Estado
const loading = ref(true)

// Computed
const room = computed(() => store.getRoomById(route.params.id))
const roomExhibits = computed(() => store.getExhibitsByRoom(route.params.id))
const roomContent = computed(() => 
  store.content.filter(c => c.roomId === route.params.id)
)

// Filtrar exhibición 3D interactiva principal
const interactive3DExhibit = computed(() => {
  return roomExhibits.value.find(e => e.type === '3d-model-interactive')
})

// Otras exhibiciones (no 3D interactivo)
const otherExhibits = computed(() => {
  return roomExhibits.value.filter(e => e.type !== '3d-model-interactive')
})

// Métodos
function goBack() {
  router.push('/rooms')
}

// Handlers para el modelo 3D
function handle3DLoad(data) {
  console.log('Modelo 3D cargado:', data)
}

function handle3DClick(anchorName, anchor) {
  console.log('Clicked anchor:', anchorName)
  
  // Si hacen clic en "more_info", mostrar el panel de API científica
  if (anchorName === 'more_info') {
    // Scroll to science panel
    const scienceSection = document.querySelector('.science-section')
    if (scienceSection) {
      scienceSection.scrollIntoView({ behavior: 'smooth' })
    }
  }
}

function handle3DHover(anchorName) {
  console.log('Hovering anchor:', anchorName)
}

function handle3DError(error) {
  console.error('Error en modelo 3D:', error)
}

// Cargar datos
onMounted(async () => {
  try {
    await Promise.all([
      store.fetchRooms(),
      store.fetchExhibits(),
      store.fetchContent()
    ])
  } catch (error) {
    console.error('Error loading room data:', error)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.room-detail {
  width: 100%;
}

.room-header {
  color: #ffffff;
  background: #000000;
  padding: 3rem 2rem;
  border-radius: 0;
  margin-bottom: 2rem;
  position: relative;
  box-shadow: 0 0 0 4px #ffffff;
  border: 4px solid #ffffff;
}

.back-btn {
  background: transparent;
  color: #ffffff;
  border: 3px solid #ffffff;
  padding: 0.75rem 1.5rem;
  border-radius: 0;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: all 0.3s ease;
  margin-bottom: 1.5rem;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  box-shadow: 3px 3px 0 #ffffff;
}

.back-btn:hover {
  background: #ffffff;
  color: #000000;
  transform: translate(-2px, -2px);
  box-shadow: 5px 5px 0 #ffffff;
}

.room-header-content {
  max-width: 800px;
}

.room-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  filter: grayscale(100%) brightness(300%) contrast(200%);
}

.room-title {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  text-shadow: 3px 3px 0 rgba(255, 255, 255, 0.2);
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.room-subtitle {
  font-size: 1.3rem;
  opacity: 0.9;
  margin-bottom: 1rem;
  font-style: normal;
  font-family: 'Courier New', monospace;
}

.room-description {
  font-size: 1.1rem;
  line-height: 1.6;
  opacity: 0.95;
  font-family: 'Courier New', monospace;
}

.room-content {
  padding: 1rem 0;
}

.section-title {
  font-size: 1.8rem;
  color: #000000;
  margin: 2rem 0 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 4px solid #000000;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: bold;
}

.exhibits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.content-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.science-section {
  margin-top: 3rem;
  padding: 0 1rem;
}

.axolotl-gallery-section {
  margin-top: 3rem;
  padding: 0 1rem;
}

.scene-3d-section {
  margin-top: 3rem;
}

.loading,
.not-found {
  text-align: center;
  padding: 4rem 2rem;
}

.spinner {
  width: 60px;
  height: 60px;
  border: 5px solid #cccccc;
  border-top: 5px solid #000000;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.not-found h2 {
  font-size: 2rem;
  color: #000000;
  margin-bottom: 1rem;
  font-family: 'Courier New', monospace;
  font-weight: bold;
}

.btn-primary {
  display: inline-block;
  margin-top: 1.5rem;
  padding: 1rem 2rem;
  background: #000000;
  color: #ffffff;
  text-decoration: none;
  border-radius: 0;
  font-weight: bold;
  transition: all 0.3s ease;
  border: 3px solid #000000;
  box-shadow: 4px 4px 0 #000000;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.btn-primary:hover {
  background: #ffffff;
  color: #000000;
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 #000000;
}

@media (max-width: 768px) {
  .room-icon {
    font-size: 3rem;
  }
  
  .room-title {
    font-size: 1.8rem;
  }
  
  .exhibits-grid {
    grid-template-columns: 1fr;
  }
}
</style>
