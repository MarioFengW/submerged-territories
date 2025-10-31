<!-- 
  Visor 3D Interactivo para Modelos glTF
  Optimizado para web con soporte de LOD y animaciones
-->

<template>
  <div class="model-3d-viewer">
    <div class="viewer-container" ref="containerRef">
      <!-- Canvas para Three.js -->
      <canvas ref="canvasRef" class="viewer-canvas"></canvas>

      <!-- Controles de carga -->
      <div v-if="loading" class="loading-overlay">
        <div class="spinner-3d"></div>
        <p class="loading-text">{{ loadingProgress }}%</p>
        <p class="loading-status">Cargando modelo 3D...</p>
      </div>

      <!-- Fallback para dispositivos sin WebGL -->
      <div v-if="!webglSupported && !loading" class="fallback-overlay">
        <div class="fallback-content">
          <h3>⚠️ WebGL No Disponible</h3>
          <p>Tu dispositivo no soporta WebGL o está deshabilitado.</p>
          <img 
            :src="fallbackImage" 
            :alt="exhibit.title"
            class="fallback-image"
          />
          <button @click="loadLightVersion" class="btn-light-version">
            Ver Versión Ligera
          </button>
        </div>
      </div>

      <!-- Error de carga del modelo -->
      <div v-if="modelError && !loading" class="error-overlay">
        <div class="error-content">
          <h3>⚠️ Modelo 3D No Disponible</h3>
          <p class="error-message">{{ errorMessage }}</p>
          <div class="error-details">
            <p><strong>Ruta esperada:</strong></p>
            <code>{{ exhibit.modelUrl }}</code>
            <p class="error-hint">
              💡 El modelo 3D aún no ha sido agregado al proyecto. 
              <br>
              Por favor, coloca el archivo <code>{{ getModelFileName() }}</code> en la carpeta:
              <br>
              <code>frontend/public/assets/models/</code>
            </p>
            <a 
              href="/assets/models/README.md" 
              target="_blank" 
              class="btn-help"
            >
              📖 Ver Instrucciones
            </a>
          </div>
        </div>
      </div>

      <!-- Controles de interacción -->
      <div v-if="!loading && webglSupported && !modelError" class="interaction-controls">
        <!-- Botón de información general -->
        <button @click="showInfoPanel = true" class="btn-info" title="Ver información">
          ℹ️ Información
        </button>

        <!-- Botón reset cámara -->
        <button @click="resetCamera" class="btn-reset" title="Restablecer vista">
          🔄 Reset
        </button>
      </div>

      <!-- Puntos de interacción (anchors) -->
      <div 
        v-for="anchor in interactionAnchors" 
        :key="anchor.name"
        :ref="el => anchorRefs[anchor.name] = el"
        class="interaction-anchor"
        :class="{ 'active': activeAnchor === anchor.name }"
        @click="handleAnchorClick(anchor)"
        @mouseenter="handleAnchorHover(anchor)"
        @mouseleave="handleAnchorLeave()"
        :style="getAnchorStyle(anchor)"
      >
        <span class="anchor-icon">{{ anchor.icon }}</span>
        <span class="anchor-label">{{ anchor.label }}</span>
      </div>
    </div>

    <!-- Panel de información científica -->
    <Transition name="info-slide">
      <div v-if="showInfoPanel" class="info-panel">
        <button @click="closeInfoPanel" class="btn-close-info">✕</button>
        
        <div class="info-content">
          <h3 class="info-title">{{ scientificInfo.commonName }}</h3>
          <p class="info-scientific">{{ scientificInfo.scientificName }}</p>
          
          <div class="info-section">
            <h4>🏠 Hábitat</h4>
            <p>{{ scientificInfo.habitat }}</p>
          </div>

          <div class="info-section">
            <h4>📝 Descripción</h4>
            <p>{{ scientificInfo.description }}</p>
          </div>

          <div class="info-section">
            <h4>✨ Datos Fascinantes</h4>
            <ul class="curiosities-list">
              <li v-for="(fact, index) in scientificInfo.curiosities" :key="index">
                {{ fact }}
              </li>
            </ul>
          </div>

          <button @click="loadMoreInfo" class="btn-more-info">
            📚 Ver Más Información
          </button>
        </div>
      </div>
    </Transition>

    <!-- Indicador de FPS (solo en desarrollo) -->
    <div v-if="showFPS" class="fps-counter">
      {{ currentFPS }} FPS
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// Props
const props = defineProps({
  exhibit: {
    type: Object,
    required: true
  },
  showFPS: {
    type: Boolean,
    default: false
  }
})

// Emits
const emit = defineEmits(['onLoad', 'onClick', 'onHover', 'onError'])

// Referencias
const containerRef = ref(null)
const canvasRef = ref(null)
const anchorRefs = ref({})

// Estado
const loading = ref(true)
const loadingProgress = ref(0)
const webglSupported = ref(true)
const arSupported = ref(false)
const showInfoPanel = ref(false)
const activeAnchor = ref(null)
const currentAnimation = ref(null)
const currentLOD = ref('high')
const currentFPS = ref(60)
const modelError = ref(false)
const errorMessage = ref('')

// Three.js objects
let scene, camera, renderer, controls, mixer, clock
let currentModel = null
const animations = ref([])

// Computed
const availableAnimations = computed(() => {
  return props.exhibit.technicalSpecs?.animations || []
})

const interactionAnchors = computed(() => {
  return props.exhibit.interactionAnchors || []
})

const scientificInfo = computed(() => {
  return props.exhibit.scientificInfo || {}
})

const fallbackImage = computed(() => {
  return `/assets/images/${props.exhibit.id}-fallback.jpg`
})

// Métodos
function checkWebGLSupport() {
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    webglSupported.value = !!gl
    
    // Check AR support
    if ('xr' in navigator) {
      navigator.xr.isSessionSupported('immersive-ar').then(supported => {
        arSupported.value = supported
      })
    }
  } catch (e) {
    webglSupported.value = false
  }
}

function initThreeJS() {
  if (!canvasRef.value || !webglSupported.value) return

  // Scene
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0xf5f5f5)

  // Camera
  const aspect = containerRef.value.clientWidth / containerRef.value.clientHeight
  camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 1000)
  camera.position.set(0, 2, 5)

  // Renderer
  renderer = new THREE.WebGLRenderer({
    canvas: canvasRef.value,
    antialias: true,
    alpha: true
  })
  renderer.setSize(containerRef.value.clientWidth, containerRef.value.clientHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap

  // Controls
  controls = new OrbitControls(camera, canvasRef.value)
  controls.enableDamping = true
  controls.dampingFactor = 0.08
  controls.minDistance = 0.5
  controls.maxDistance = 1000
  controls.maxPolarAngle = Math.PI
  controls.enablePan = true
  controls.panSpeed = 0.8
  controls.rotateSpeed = 0.5
  controls.zoomSpeed = 1.2

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
  scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
  directionalLight.position.set(5, 5, 5)
  directionalLight.castShadow = true
  scene.add(directionalLight)

  const fillLight = new THREE.DirectionalLight(0xffffff, 0.3)
  fillLight.position.set(-5, 0, -5)
  scene.add(fillLight)

  // Clock for animations
  clock = new THREE.Clock()

  // Load model
  loadModel()

  // Start animation loop
  animate()
}

function loadModel() {
  const loader = new GLTFLoader()
  
  loader.load(
    props.exhibit.modelUrl,
    (gltf) => {
      currentModel = gltf.scene
      
      // Apply scale
      const scale = props.exhibit.technicalSpecs?.scale || 1
      currentModel.scale.set(scale, scale, scale)
      
      // Optimizar texturas grandes (reducir 4K a 2K automáticamente)
      optimizeTextures(currentModel)
      
      // Center model
      const box = new THREE.Box3().setFromObject(currentModel)
      const center = box.getCenter(new THREE.Vector3())
      currentModel.position.sub(center)
      
      // Add to scene
      scene.add(currentModel)
      
      // Setup animations
      if (gltf.animations && gltf.animations.length > 0) {
        mixer = new THREE.AnimationMixer(currentModel)
        animations.value = gltf.animations
        
        // Play first animation by default
        if (animations.value.length > 0) {
          playAnimation(availableAnimations.value[0])
        }
      }
      
      loading.value = false
      modelError.value = false
      emit('onLoad', { model: currentModel, gltf })
    },
    (xhr) => {
      loadingProgress.value = Math.round((xhr.loaded / xhr.total) * 100)
    },
    (error) => {
      console.error('Error loading 3D model:', error)
      loading.value = false
      modelError.value = true
      
      // Mensaje de error más específico
      if (error.message && error.message.includes('404')) {
        errorMessage.value = `No se encontró el archivo del modelo 3D en la ruta especificada.`
      } else {
        errorMessage.value = `Error al cargar el modelo 3D: ${error.message || 'Error desconocido'}`
      }
      
      emit('onError', { error, message: errorMessage.value })
    }
  )
}

function getModelFileName() {
  if (!props.exhibit.modelUrl) return ''
  const parts = props.exhibit.modelUrl.split('/')
  return parts[parts.length - 1]
}

function optimizeTextures(model) {
  // Reducir texturas grandes automáticamente
  model.traverse((child) => {
    if (child.isMesh) {
      const material = child.material
      
      if (material) {
        // Si es un array de materiales
        const materials = Array.isArray(material) ? material : [material]
        
        materials.forEach((mat) => {
          // Iterar sobre todas las propiedades que pueden contener texturas
          const textureProperties = ['map', 'normalMap', 'roughnessMap', 'metalnessMap', 'aoMap', 'emissiveMap']
          
          textureProperties.forEach((prop) => {
            if (mat[prop] && mat[prop].isTexture) {
              const texture = mat[prop]
              
              // Si la textura es muy grande (4K = 4096x4096), reducir calidad
              if (texture.image && (texture.image.width > 2048 || texture.image.height > 2048)) {
                console.log(`Optimizando textura grande: ${texture.image.width}x${texture.image.height}`)
                
                // Reducir tamaño máximo a 2K
                const canvas = document.createElement('canvas')
                const ctx = canvas.getContext('2d')
                
                const maxSize = 2048
                const scale = Math.min(maxSize / texture.image.width, maxSize / texture.image.height, 1)
                
                canvas.width = texture.image.width * scale
                canvas.height = texture.image.height * scale
                
                ctx.drawImage(texture.image, 0, 0, canvas.width, canvas.height)
                
                texture.image = canvas
                texture.needsUpdate = true
              }
              
              // Configurar filtros para mejor rendimiento
              texture.minFilter = THREE.LinearMipmapLinearFilter
              texture.magFilter = THREE.LinearFilter
              texture.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy())
            }
          })
        })
      }
    }
  })
}

function animate() {
  requestAnimationFrame(animate)
  
  const delta = clock.getDelta()
  
  if (mixer) {
    mixer.update(delta)
  }
  
  if (controls) {
    controls.update()
  }
  
  if (renderer && scene && camera) {
    renderer.render(scene, camera)
  }
  
  // Update FPS
  if (props.showFPS) {
    currentFPS.value = Math.round(1 / delta)
  }
  
  // Update anchor positions
  updateAnchorPositions()
}

function playAnimation(animName) {
  if (!mixer || !animations.value.length) return
  
  const animation = animations.value.find(a => a.name === animName)
  if (!animation) return
  
  mixer.stopAllAction()
  const action = mixer.clipAction(animation)
  action.play()
  currentAnimation.value = animName
}

function changeLOD() {
  // In production, this would load different model files
  console.log('Changing LOD to:', currentLOD.value)
  // For now, just adjust quality settings
  switch(currentLOD.value) {
    case 'low':
      renderer.setPixelRatio(1)
      break
    case 'medium':
      renderer.setPixelRatio(1.5)
      break
    case 'high':
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      break
  }
}

function resetCamera() {
  camera.position.set(2, 1, 3)
  controls.reset()
}

function handleAnchorClick(anchor) {
  activeAnchor.value = anchor.name
  
  if (anchor.name === 'interact_info') {
    showInfoPanel.value = true
  }
  
  emit('onClick', anchor.name, anchor)
}

function handleAnchorHover(anchor) {
  emit('onHover', anchor.name, anchor)
}

function handleAnchorLeave() {
  // Optional hover end logic
}

function updateAnchorPositions() {
  // Update 2D positions of anchors based on 3D positions
  interactionAnchors.value.forEach(anchor => {
    const anchorEl = anchorRefs.value[anchor.name]
    if (!anchorEl || !camera || !currentModel) return
    
    const vector = new THREE.Vector3(
      anchor.position.x,
      anchor.position.y,
      anchor.position.z
    )
    
    vector.project(camera)
    
    const x = (vector.x * 0.5 + 0.5) * containerRef.value.clientWidth
    const y = (vector.y * -0.5 + 0.5) * containerRef.value.clientHeight
    
    anchorEl.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`
  })
}

function getAnchorStyle(anchor) {
  return {
    position: 'absolute',
    left: '0px',
    top: '0px'
  }
}

function closeInfoPanel() {
  showInfoPanel.value = false
  activeAnchor.value = null
}

function loadMoreInfo() {
  // This would trigger the API panel
  emit('onClick', 'more_info')
}

function loadLightVersion() {
  currentLOD.value = 'low'
  webglSupported.value = true
  initThreeJS()
}

function launchAR() {
  // AR implementation would go here
  console.log('Launching AR experience...')
}

function getAnimationLabel(animName) {
  const labels = {
    idle: '⏸️ Reposo',
    swim: '🏊 Nadar',
    'close-up': '🔍 Detalle',
    wind: '💨 Viento',
    fauna: '🦀 Fauna'
  }
  return labels[animName] || animName
}

function handleResize() {
  if (!renderer || !camera || !containerRef.value) return
  
  const width = containerRef.value.clientWidth
  const height = containerRef.value.clientHeight
  
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  
  renderer.setSize(width, height)
}

// Lifecycle
onMounted(() => {
  checkWebGLSupport()
  if (webglSupported.value) {
    initThreeJS()
  }
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  
  if (renderer) {
    renderer.dispose()
  }
  
  if (controls) {
    controls.dispose()
  }
  
  if (scene) {
    scene.traverse((object) => {
      if (object.geometry) object.geometry.dispose()
      if (object.material) {
        if (Array.isArray(object.material)) {
          object.material.forEach(material => material.dispose())
        } else {
          object.material.dispose()
        }
      }
    })
  }
})
</script>

<style scoped>
.model-3d-viewer {
  width: 100%;
  background: #ffffff;
  border: 4px solid #000000;
  box-shadow: 6px 6px 0 #000000;
  position: relative;
  min-height: 600px;
}

.viewer-container {
  position: relative;
  width: 100%;
  height: 600px;
  background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
}

.viewer-canvas {
  width: 100%;
  height: 100%;
  display: block;
}

/* Loading */
.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.95);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.spinner-3d {
  width: 80px;
  height: 80px;
  border: 6px solid #cccccc;
  border-top: 6px solid #000000;
  border-radius: 50%;
  animation: spin3d 1s linear infinite;
}

@keyframes spin3d {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text {
  font-size: 2rem;
  font-weight: bold;
  font-family: 'Courier New', monospace;
  margin-top: 1rem;
  color: #000000;
}

.loading-status {
  font-size: 1rem;
  color: #666666;
  margin-top: 0.5rem;
}

/* Fallback */
.fallback-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  padding: 2rem;
}

.fallback-content {
  text-align: center;
  max-width: 500px;
}

.fallback-content h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #FF5722;
}

.fallback-image {
  width: 100%;
  max-width: 400px;
  height: auto;
  border: 3px solid #000000;
  margin: 1rem 0;
}

.btn-light-version {
  background: #4CAF50;
  color: #ffffff;
  border: 3px solid #4CAF50;
  padding: 0.75rem 1.5rem;
  font-weight: bold;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 4px 4px 0 #000000;
}

.btn-light-version:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 #000000;
}

/* Error Overlay */
.error-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  padding: 2rem;
}

.error-content {
  text-align: center;
  max-width: 600px;
  background: #ffffff;
  border: 4px solid #FF5722;
  padding: 2rem;
  box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.3);
}

.error-content h3 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #FF5722;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
}

.error-message {
  font-size: 1.1rem;
  color: #333333;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.error-details {
  background: #f0f0f0;
  border: 2px solid #cccccc;
  padding: 1.5rem;
  text-align: left;
  margin-top: 1rem;
}

.error-details p {
  margin: 0.75rem 0;
  color: #666666;
}

.error-details code {
  display: inline-block;
  background: #000000;
  color: #00FF00;
  padding: 0.25rem 0.5rem;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  margin: 0.5rem 0;
  border: 2px solid #333333;
}

.error-hint {
  font-size: 0.95rem;
  line-height: 1.8;
  margin-top: 1rem;
  color: #555555;
}

.btn-help {
  display: inline-block;
  background: #2196F3;
  color: #ffffff;
  border: 3px solid #2196F3;
  padding: 0.75rem 1.5rem;
  font-weight: bold;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 4px 4px 0 #000000;
  margin-top: 1rem;
}

.btn-help:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 #000000;
}

/* Controls */
.interaction-controls {
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.98);
  border: 4px solid #000000;
  padding: 1rem 1.5rem;
  box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.6);
  z-index: 5;
  max-width: 90%;
  border-radius: 4px;
}

.btn-info {
  background: #2196F3;
  color: #ffffff;
  border: 3px solid #2196F3;
  padding: 0.6rem 1.2rem;
  font-size: 0.85rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.3);
  border-radius: 2px;
}

.btn-info:hover {
  transform: translateY(-2px);
  box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.4);
  background: #1976D2;
}

.btn-reset {
  background: #4CAF50;
  color: #ffffff;
  border: 3px solid #4CAF50;
  padding: 0.6rem 1.2rem;
  font-size: 0.85rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.3);
  border-radius: 2px;
}

.btn-reset:hover {
  transform: translateY(-2px);
  box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.4);
  background: #45a049;
}

/* Interaction Anchors */
.interaction-anchor {
  position: absolute;
  background: #ffffff;
  border: 3px solid #000000;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.5);
  z-index: 3;
}

.interaction-anchor:hover {
  transform: translate(-50%, -50%) scale(1.2);
  box-shadow: 5px 5px 0 rgba(0, 0, 0, 0.7);
  background: #E91E63;
  color: #ffffff;
}

.interaction-anchor.active {
  background: #E91E63;
  color: #ffffff;
}

.anchor-icon {
  font-size: 1.5rem;
}

.anchor-label {
  position: absolute;
  bottom: -2rem;
  left: 50%;
  transform: translateX(-50%);
  background: #000000;
  color: #ffffff;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  white-space: nowrap;
  font-family: 'Courier New', monospace;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.interaction-anchor:hover .anchor-label {
  opacity: 1;
}

/* Info Panel */
.info-panel {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 350px;
  max-height: calc(100% - 2rem);
  background: #ffffff;
  border: 4px solid #000000;
  box-shadow: 6px 6px 0 #000000;
  z-index: 20;
  overflow-y: auto;
}

.btn-close-info {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: #ffffff;
  border: 3px solid #000000;
  width: 2.5rem;
  height: 2.5rem;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  z-index: 1;
}

.btn-close-info:hover {
  background: #E91E63;
  color: #ffffff;
  transform: rotate(90deg);
}

.info-content {
  padding: 2rem 1.5rem 1.5rem;
}

.info-title {
  font-size: 1.4rem;
  font-weight: bold;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
  color: #000000;
}

.info-scientific {
  font-size: 1.1rem;
  font-style: italic;
  color: #E91E63;
  font-weight: bold;
  margin-bottom: 1.5rem;
}

.info-section {
  margin-bottom: 1.5rem;
}

.info-section h4 {
  font-size: 1rem;
  font-weight: bold;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
  color: #000000;
}

.info-section p {
  line-height: 1.6;
  color: #333333;
}

.curiosities-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.curiosities-list li {
  padding-left: 1.5rem;
  margin-bottom: 0.75rem;
  position: relative;
  line-height: 1.5;
  color: #333333;
}

.curiosities-list li::before {
  content: '✨';
  position: absolute;
  left: 0;
}

.btn-more-info {
  width: 100%;
  background: #4CAF50;
  color: #ffffff;
  border: 3px solid #4CAF50;
  padding: 0.75rem;
  font-weight: bold;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 4px 4px 0 #000000;
  margin-top: 1rem;
}

.btn-more-info:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 #000000;
}

/* Transitions */
.info-slide-enter-active,
.info-slide-leave-active {
  transition: all 0.3s ease;
}

.info-slide-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.info-slide-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

/* FPS Counter */
.fps-counter {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: rgba(0, 0, 0, 0.8);
  color: #00ff00;
  padding: 0.5rem 1rem;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  font-size: 1rem;
  border: 2px solid #00ff00;
  z-index: 10;
}

/* Responsive */
@media (max-width: 768px) {
  .viewer-container {
    height: 400px;
  }

  .interaction-controls {
    flex-direction: row;
    bottom: 0.5rem;
    padding: 0.75rem;
    gap: 0.75rem;
    max-width: 95%;
  }

  .btn-info,
  .btn-reset {
    padding: 0.5rem 0.8rem;
    font-size: 0.75rem;
  }

  .info-panel {
    width: calc(100% - 2rem);
    max-height: 70vh;
  }

  .interaction-anchor {
    width: 40px;
    height: 40px;
  }

  .anchor-icon {
    font-size: 1.2rem;
  }
}

@media (max-width: 480px) {
  .interaction-controls {
    padding: 0.5rem;
    gap: 0.5rem;
  }

  .btn-info,
  .btn-reset {
    padding: 0.4rem 0.6rem;
    font-size: 0.7rem;
  }
}
</style>
