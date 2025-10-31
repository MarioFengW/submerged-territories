<!-- 
  Componente principal de la aplicación
  Museo Virtual del Agua - Estilo Manga
-->

<template>
  <div id="app" class="museum-app">
    <!-- Header estilo manga -->
    <header class="manga-header">
      <div class="header-content">
        <h1 class="museum-title">
          🦎 Museo de Axolote y Manglar
          <span class="subtitle">アホロートルとマングローブ</span>
        </h1>
        <nav class="main-nav">
          <router-link to="/" class="nav-link">Inicio</router-link>
          <router-link to="/rooms" class="nav-link">Salas</router-link>
          <router-link to="/about" class="nav-link">Acerca de</router-link>
        </nav>
      </div>
    </header>

    <!-- Contenido principal con efectos manga -->
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade-slide" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- Footer con estilo manga -->
    <footer class="manga-footer">
      <p>© 2025 Museo Virtual de Axolote y Manglar</p>
      <p class="japanese-text">アホロートルとマングローブ博物館</p>
    </footer>

    <!-- Partículas decorativas estilo manga -->
    <div class="manga-particles" aria-hidden="true">
      <div class="particle" v-for="n in 15" :key="n"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

// Animaciones de partículas al montar
onMounted(() => {
  console.log('🌊 Museo Virtual del Agua iniciado')
})
</script>

<style scoped>
/* Estilos específicos del componente App */
.museum-app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: hidden;
}

.manga-header {
  background: #000000;
  color: #ffffff;
  padding: 1.5rem 2rem;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 100;
  border-bottom: 4px solid #ffffff;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
}

.museum-title {
  font-size: 2rem;
  font-weight: bold;
  margin: 0 0 0.5rem 0;
  text-shadow: 3px 3px 0 rgba(255, 255, 255, 0.3);
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-family: 'Courier New', monospace;
  letter-spacing: 0.1em;
}

.subtitle {
  font-size: 0.9rem;
  opacity: 0.9;
  font-weight: normal;
}

.main-nav {
  display: flex;
  gap: 1.5rem;
  margin-top: 1rem;
}

.nav-link {
  color: #ffffff;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 0;
  transition: all 0.3s ease;
  font-weight: bold;
  border: 2px solid #ffffff;
  background: transparent;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.nav-link:hover {
  background: #ffffff;
  color: #000000;
  transform: translateY(-2px);
  box-shadow: 4px 4px 0 rgba(255, 255, 255, 0.3);
}

.nav-link.router-link-active {
  background: #ffffff;
  color: #000000;
  font-weight: bold;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
}

.main-content {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  z-index: 10;
}

.manga-footer {
  background: #000000;
  color: #ffffff;
  text-align: center;
  padding: 2rem;
  margin-top: auto;
  border-top: 4px solid #ffffff;
  font-family: 'Courier New', monospace;
}

.japanese-text {
  font-size: 0.9rem;
  opacity: 0.7;
  margin-top: 0.5rem;
}

/* Partículas ASCII decorativas */
.manga-particles {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
  font-family: 'Courier New', monospace;
}

.particle {
  position: absolute;
  width: 20px;
  height: 20px;
  color: rgba(0, 0, 0, 0.1);
  font-size: 20px;
  font-weight: bold;
  animation: float 15s infinite ease-in-out;
}

.particle::before {
  content: '•';
}

.particle:nth-child(odd) {
  animation-duration: 20s;
}

.particle:nth-child(3n)::before {
  content: '◦';
}

.particle:nth-child(5n)::before {
  content: '▪';
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0) scale(1);
    opacity: 0;
  }
  10% {
    opacity: 0.5;
  }
  50% {
    transform: translate(100vw, -100vh) scale(1.5);
    opacity: 0.3;
  }
  90% {
    opacity: 0.5;
  }
}

/* Distribución aleatoria de partículas */
.particle:nth-child(1) { left: 10%; animation-delay: 0s; }
.particle:nth-child(2) { left: 20%; animation-delay: 2s; }
.particle:nth-child(3) { left: 30%; animation-delay: 4s; }
.particle:nth-child(4) { left: 40%; animation-delay: 1s; }
.particle:nth-child(5) { left: 50%; animation-delay: 3s; }
.particle:nth-child(6) { left: 60%; animation-delay: 5s; }
.particle:nth-child(7) { left: 70%; animation-delay: 2.5s; }
.particle:nth-child(8) { left: 80%; animation-delay: 4.5s; }
.particle:nth-child(9) { left: 90%; animation-delay: 1.5s; }
.particle:nth-child(10) { left: 15%; animation-delay: 3.5s; }
.particle:nth-child(11) { left: 25%; animation-delay: 5.5s; }
.particle:nth-child(12) { left: 35%; animation-delay: 0.5s; }
.particle:nth-child(13) { left: 45%; animation-delay: 2.2s; }
.particle:nth-child(14) { left: 65%; animation-delay: 4.2s; }
.particle:nth-child(15) { left: 85%; animation-delay: 1.2s; }

/* Transiciones entre vistas */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

@media (max-width: 768px) {
  .museum-title {
    font-size: 1.5rem;
  }
  
  .main-nav {
    flex-wrap: wrap;
    gap: 0.75rem;
  }
  
  .main-content {
    padding: 1rem;
  }
}
</style>
