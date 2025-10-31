<!-- 
  Componente RoomCard - Tarjeta de sala estilo manga
  Componente reutilizable para mostrar información de una sala
-->

<template>
  <div class="room-card" :style="cardStyle">
    <div class="card-header">
      <div class="room-icon">{{ room.icon }}</div>
      <div class="room-order">Sala {{ room.order }}</div>
    </div>
    
    <div class="card-body">
      <h3 class="room-name">{{ room.name }}</h3>
      <p class="room-description">{{ room.description }}</p>
    </div>
    
    <div class="card-footer">
      <router-link 
        :to="`/room/${room.id}`" 
        class="explore-btn"
        :style="{ background: room.color }"
      >
        Explorar 🚀
      </router-link>
    </div>

    <!-- Efecto manga en la esquina -->
    <div class="manga-corner" :style="{ borderTopColor: room.color }"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// Props
const props = defineProps({
  room: {
    type: Object,
    required: true
  }
})

// Computed: Estilo dinámico basado en el color de la sala
const cardStyle = computed(() => ({
  borderColor: props.room.color,
  '--room-color': props.room.color
}))
</script>

<style scoped>
.room-card {
  background: #ffffff;
  border-radius: 0;
  overflow: hidden;
  box-shadow: 6px 6px 0 #000000;
  transition: all 0.3s ease;
  border: 4px solid #000000;
  position: relative;
  display: flex;
  flex-direction: column;
}

.room-card:hover {
  transform: translate(-3px, -3px);
  box-shadow: 9px 9px 0 #000000;
}

.card-header {
  padding: 1.5rem;
  background: #000000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 4px solid #ffffff;
}

.room-icon {
  font-size: 3rem;
  animation: bounce 2s infinite;
  filter: grayscale(100%) brightness(300%) contrast(200%);
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.room-order {
  background: #ffffff;
  color: #000000;
  padding: 0.5rem 1rem;
  border-radius: 0;
  font-weight: bold;
  font-size: 0.9rem;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border: 2px solid #000000;
}

.card-body {
  padding: 1.5rem;
  flex: 1;
}

.room-name {
  font-size: 1.4rem;
  color: #000000;
  margin-bottom: 0.75rem;
  font-weight: bold;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.room-description {
  color: #000000;
  line-height: 1.6;
  font-size: 0.95rem;
  font-family: 'Courier New', monospace;
}

.card-footer {
  padding: 1rem 1.5rem;
  background: #000000;
  border-top: 4px solid #ffffff;
}

.explore-btn {
  display: block;
  width: 100%;
  padding: 0.75rem;
  text-align: center;
  color: #000000;
  text-decoration: none;
  border-radius: 0;
  font-weight: bold;
  transition: all 0.3s ease;
  box-shadow: 3px 3px 0 #ffffff;
  background: #ffffff;
  border: 3px solid #ffffff;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.explore-btn:hover {
  transform: translate(-2px, -2px);
  box-shadow: 5px 5px 0 #ffffff;
}

/* Esquina decorativa ASCII */
.manga-corner {
  position: absolute;
  top: 0;
  right: 0;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 50px 50px 0;
  border-color: transparent #ffffff transparent transparent;
  opacity: 0.3;
}
</style>
