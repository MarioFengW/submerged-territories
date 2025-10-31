<!-- 
  Vista de salas del museo
  Muestra todas las salas disponibles
-->

<template>
  <div class="rooms-view">
    <h1 class="page-title">
      🏛️ Salas del Museo
      <span class="subtitle">Elige tu próxima aventura</span>
    </h1>

    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Preparando las salas...</p>
    </div>

    <div v-else-if="error" class="error-message">
      <p>❌ {{ error }}</p>
      <button @click="retryLoad" class="retry-btn">Reintentar</button>
    </div>

    <div v-else class="rooms-container">
      <TransitionGroup name="room-list" tag="div" class="rooms-grid">
        <RoomCard 
          v-for="room in sortedRooms" 
          :key="room.id"
          :room="room"
        />
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useMuseumStore } from '../stores/museum'
import RoomCard from '../components/RoomCard.vue'

const store = useMuseumStore()

// Estado local
const loading = ref(true)
const error = ref(null)

// Computed: Salas ordenadas por orden
const sortedRooms = computed(() => {
  return [...store.rooms].sort((a, b) => a.order - b.order)
})

// Cargar salas
async function loadRooms() {
  loading.value = true
  error.value = null
  try {
    await store.fetchRooms()
  } catch (err) {
    error.value = 'Error al cargar las salas. Por favor, intenta de nuevo.'
  } finally {
    loading.value = false
  }
}

// Reintentar carga
function retryLoad() {
  loadRooms()
}

// Cargar al montar
onMounted(() => {
  loadRooms()
})
</script>

<style scoped>
.rooms-view {
  padding: 1rem;
}

.page-title {
  font-size: 2.5rem;
  color: #000000;
  margin-bottom: 2rem;
  text-align: center;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: bold;
  text-shadow: 3px 3px 0 rgba(0, 0, 0, 0.1);
}

.subtitle {
  display: block;
  font-size: 1.2rem;
  color: #000000;
  font-weight: normal;
  margin-top: 0.5rem;
  font-family: 'Courier New', monospace;
}

.loading,
.error-message {
  text-align: center;
  padding: 3rem;
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

.error-message {
  color: #000000;
  font-size: 1.2rem;
  font-family: 'Courier New', monospace;
  font-weight: bold;
}

.retry-btn {
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background: #000000;
  color: #ffffff;
  border: 3px solid #000000;
  border-radius: 0;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: all 0.3s ease;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  box-shadow: 4px 4px 0 #000000;
}

.retry-btn:hover {
  background: #ffffff;
  color: #000000;
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 #000000;
}

.rooms-container {
  width: 100%;
}

.rooms-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem 0;
}

/* Animaciones de transición para las tarjetas */
.room-list-enter-active,
.room-list-leave-active {
  transition: all 0.5s ease;
}

.room-list-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.room-list-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.room-list-move {
  transition: transform 0.5s ease;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 1.8rem;
  }
  
  .rooms-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
