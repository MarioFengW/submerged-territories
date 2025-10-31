<template>
  <div class="api-test">
    <h2>🧪 Prueba de APIs</h2>
    
    <div class="test-section">
      <h3>🐾 Animals API (API Ninjas)</h3>
      <button @click="testAnimalsApi" :disabled="loadingAnimals">
        {{ loadingAnimals ? 'Cargando...' : 'Probar Animals API (Axolotl)' }}
      </button>
      <div v-if="animalsResult" class="result">
        <h4>Resultado:</h4>
        <pre>{{ JSON.stringify(animalsResult, null, 2) }}</pre>
      </div>
    </div>

    <div class="test-section">
      <h3>🌿 Trefle Plants API</h3>
      <button @click="testPlantsApi" :disabled="loadingPlants">
        {{ loadingPlants ? 'Cargando...' : 'Probar Trefle API (Mangrove)' }}
      </button>
      <div v-if="plantsResult" class="result">
        <h4>Resultado:</h4>
        <pre>{{ JSON.stringify(plantsResult, null, 2) }}</pre>
      </div>
    </div>

    <div class="env-info">
      <h3>🔑 Configuración de APIs</h3>
      <p><strong>Backend Proxy:</strong> ✅ Activo (evita problemas de CORS)</p>
      <p><strong>Animals API:</strong> {{ hasAnimalsKey ? '✅ Configurada en backend' : '❌ No configurada' }}</p>
      <p><strong>Trefle API:</strong> {{ hasTrefleKey ? '✅ Configurada en backend' : '❌ No configurada' }}</p>
      <p style="margin-top: 1rem; font-size: 0.9rem; color: #00FF00;">
        💡 Las peticiones ahora pasan por http://localhost:3000/api/external
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { animalService, plantService } from '../services/externalApi'

const loadingAnimals = ref(false)
const loadingPlants = ref(false)
const animalsResult = ref(null)
const plantsResult = ref(null)

const hasAnimalsKey = computed(() => {
  return true // Ahora las APIs pasan por el backend
})

const hasTrefleKey = computed(() => {
  return true // Ahora las APIs pasan por el backend
})

async function testAnimalsApi() {
  loadingAnimals.value = true
  animalsResult.value = null
  
  console.log('🧪 Testing Animals API...')
  console.log('API Key present:', hasAnimalsKey.value)
  
  try {
    const result = await animalService.getAnimalByName('axolotl')
    animalsResult.value = result
  } catch (error) {
    console.error('Error in test:', error)
    animalsResult.value = { error: error.message }
  } finally {
    loadingAnimals.value = false
  }
}

async function testPlantsApi() {
  loadingPlants.value = true
  plantsResult.value = null
  
  console.log('🧪 Testing Trefle Plants API...')
  console.log('API Key present:', hasTrefleKey.value)
  
  try {
    const result = await plantService.searchPlants('mangrove')
    plantsResult.value = result
  } catch (error) {
    console.error('Error in test:', error)
    plantsResult.value = { error: error.message }
  } finally {
    loadingPlants.value = false
  }
}
</script>

<style scoped>
.api-test {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Courier New', monospace;
}

h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
  color: #000;
  text-transform: uppercase;
  border: 4px solid #000;
  padding: 1rem;
  background: #FFD700;
}

.test-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  border: 3px solid #000;
  background: #fff;
  box-shadow: 6px 6px 0 #000;
}

h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #000;
  text-transform: uppercase;
}

button {
  background: #4CAF50;
  color: #fff;
  border: 3px solid #000;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: bold;
  font-family: 'Courier New', monospace;
  cursor: pointer;
  text-transform: uppercase;
  box-shadow: 4px 4px 0 #000;
  transition: all 0.2s;
}

button:hover:not(:disabled) {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 #000;
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
  opacity: 0.6;
}

.result {
  margin-top: 1rem;
  padding: 1rem;
  background: #f0f0f0;
  border: 2px solid #000;
  max-height: 400px;
  overflow-y: auto;
}

.result h4 {
  margin-bottom: 0.5rem;
  color: #E91E63;
}

pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  font-size: 0.85rem;
  line-height: 1.4;
}

.env-info {
  margin-top: 2rem;
  padding: 1.5rem;
  background: #000;
  color: #00FF00;
  border: 3px solid #00FF00;
  box-shadow: 6px 6px 0 #00FF00;
}

.env-info h3 {
  color: #00FF00;
  border-bottom: 2px solid #00FF00;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
}

.env-info p {
  margin: 0.5rem 0;
  font-size: 1.1rem;
}
</style>
