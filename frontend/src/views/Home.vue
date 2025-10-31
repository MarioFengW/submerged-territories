<!-- 
  Vista de inicio del Museo Virtual del Agua
  Página principal con bienvenida estilo manga
-->

<template>
  <div class="home-view">
    <!-- Hero section estilo manga -->
    <section class="hero-section">
      <div class="manga-frame">
        <h1 class="hero-title">
          Museo Virtual de Axolote y Manglar
          <span class="japanese">アホロートルとマングローブ</span>
        </h1>
        <p class="hero-description">
          Descubre dos ecosistemas acuáticos extraordinarios: el hogar del axolote mexicano en Xochimilco 
          y los manglares costeros que protegen nuestras costas. Una experiencia inmersiva con modelos 3D 
          interactivos y datos científicos en tiempo real.
        </p>
        <div class="cta-buttons">
          <router-link to="/rooms" class="btn-primary">
            🚀 Iniciar Recorrido
          </router-link>
          <router-link to="/about" class="btn-secondary">
            ℹ️ Más Información
          </router-link>
        </div>
      </div>

    </section>

    <!-- Sección de salas destacadas -->
    <section class="featured-rooms">
      <h2 class="section-title">
        🌊 Explora Nuestras Salas
      </h2>
      
      <div v-if="loading" class="loading">
        <div class="spinner"></div>
        <p>Cargando salas del museo...</p>
      </div>

      <div v-else class="rooms-grid">
        <RoomCard 
          v-for="room in featuredRooms" 
          :key="room.id"
          :room="room"
        />
      </div>
    </section>

    <!-- Sección de estadísticas -->
    <section class="stats-section">
      <div class="stat-card">
        <div class="stat-icon">🏛️</div>
        <div class="stat-number">{{ roomCount }}</div>
        <div class="stat-label">Salas Interactivas</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">🎨</div>
        <div class="stat-number">2</div>
        <div class="stat-label">Exhibiciones 3D</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">📚</div>
        <div class="stat-number">50+</div>
        <div class="stat-label">Datos Fascinantes</div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useMuseumStore } from '../stores/museum'
import RoomCard from '../components/RoomCard.vue'

const store = useMuseumStore()

// Estado local
const loading = ref(true)

// Computed
const featuredRooms = computed(() => store.rooms.slice(0, 4))
const roomCount = computed(() => store.roomCount)
const exhibitCount = computed(() => store.exhibitCount)

// Cargar datos al montar el componente
onMounted(async () => {
  try {
    await Promise.all([
      store.fetchRooms(),
      store.fetchExhibits()
    ])
  } catch (error) {
    console.error('Error loading data:', error)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.home-view {
  width: 100%;
}

/* Hero section */
.hero-section {
  background: #000000;
  color: #ffffff;
  padding: 4rem 2rem;
  border-radius: 0;
  margin-bottom: 3rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 0 4px #ffffff, 0 0 0 8px #000000;
  border: 4px solid #ffffff;
}

.manga-frame {
  max-width: 800px;
  position: relative;
  z-index: 2;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-shadow: 4px 4px 0 rgba(255, 255, 255, 0.2);
  line-height: 1.2;
  font-family: 'Courier New', monospace;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.japanese {
  display: block;
  font-size: 1.2rem;
  opacity: 0.8;
  margin-top: 0.5rem;
  font-family: monospace;
}

.hero-description {
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  opacity: 0.95;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn-primary,
.btn-secondary {
  padding: 1rem 2rem;
  border-radius: 0;
  font-weight: bold;
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-block;
  box-shadow: 4px 4px 0 #ffffff;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.btn-primary {
  background: #ffffff;
  color: #000000;
  border: 3px solid #ffffff;
}

.btn-primary:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 #ffffff;
}

.btn-secondary {
  background: transparent;
  color: #ffffff;
  border: 3px solid #ffffff;
}

.btn-secondary:hover {
  background: #ffffff;
  color: #000000;
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 #ffffff;
}

/* Personaje manga */
.manga-character {
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 1;
}

.character-bubble {
  background: #ffffff;
  color: #000000;
  padding: 1rem 1.5rem;
  border-radius: 0;
  position: relative;
  box-shadow: 0 0 0 3px #000000;
  max-width: 200px;
  border: 3px solid #000000;
  font-family: 'Courier New', monospace;
}

.character-bubble::after {
  content: '';
  position: absolute;
  bottom: -12px;
  right: 30px;
  width: 0;
  height: 0;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-top: 12px solid #000000;
}

.character-bubble::before {
  content: '';
  position: absolute;
  bottom: -8px;
  right: 32px;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid #ffffff;
  z-index: 1;
}

.character-bubble p {
  margin: 0.25rem 0;
  font-size: 0.9rem;
  font-weight: bold;
}

/* Sección de salas */
.featured-rooms {
  margin-bottom: 3rem;
}

.section-title {
  font-size: 2rem;
  color: #000000;
  margin-bottom: 2rem;
  text-align: center;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-shadow: 3px 3px 0 rgba(0, 0, 0, 0.1);
}

.loading {
  text-align: center;
  padding: 3rem;
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

.rooms-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  padding: 1rem 0;
}

/* Estadísticas */
.stats-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
  padding: 2rem;
  background: #000000;
  border-radius: 0;
  border: 4px solid #ffffff;
}

.stat-card {
  text-align: center;
  padding: 2rem;
  background: #ffffff;
  border-radius: 0;
  box-shadow: 0 0 0 3px #000000;
  transition: transform 0.3s ease;
  border: 3px solid #000000;
}

.stat-card:hover {
  transform: translate(-3px, -3px);
  box-shadow: 6px 6px 0 #000000;
}

.stat-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  filter: grayscale(100%) contrast(200%);
}

.stat-number {
  font-size: 2.5rem;
  font-weight: bold;
  color: #000000;
  margin-bottom: 0.5rem;
  font-family: 'Courier New', monospace;
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
}

.stat-label {
  font-size: 1rem;
  color: #000000;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 1.8rem;
  }
  
  .manga-character {
    display: none;
  }
  
  .rooms-grid {
    grid-template-columns: 1fr;
  }
}
</style>
