<!-- 
  Componente AsciiRenderer - Renderizador ASCII 3D
  Renderiza arte ASCII 3D animado para visualizaciones del museo
-->

<template>
  <div class="ascii-renderer" :class="{ 'is-animating': isAnimating }">
    <div class="ascii-container">
      <pre class="ascii-art" v-html="currentFrame"></pre>
    </div>
    <div class="ascii-controls">
      <button @click="toggleAnimation" class="ascii-btn">
        {{ isAnimating ? '⏸ Pausar' : '▶ Animar' }}
      </button>
      <button @click="changeShape" class="ascii-btn">
        🔄 Cambiar Forma
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

// Props
const props = defineProps({
  shapeType: {
    type: String,
    default: 'cube', // cube, water, axolotl, wave, mangrove, anatomy, ecosystem
    validator: (value) => ['cube', 'water', 'axolotl', 'wave', 'mangrove', 'anatomy', 'ecosystem'].includes(value)
  },
  autoAnimate: {
    type: Boolean,
    default: true
  }
})

// Estado
const isAnimating = ref(props.autoAnimate)
const currentShapeIndex = ref(0)
const frameIndex = ref(0)
let animationInterval = null

// Formas ASCII disponibles
const shapes = {
  mangrove: {
    name: 'Bosque Manglar 3D',
    frames: [
      `
      ╱╲  ╱╲  ╱╲
     ╱  ╲╱  ╲╱  ╲
    ╱ ░░░░░░░░░░ ╲
   │  ░░MANGLAR░░ │
   │ ░░░░░░░░░░░░ │
    ║    ║║║    ║
    ║    ║║║    ║
════╬════╬╬╬════╬════
~~~~│~~~~││~~~~~│~~~~
~~~│││~~│││~───│││~~~
  │││││││││││││││││
 ╔═════════════════╗
 ║ RAÍCES AÉREAS  ║
 ╚═════════════════╝
      `,
      `
      ╱╲  ╱╲  ╱╲
     ╱  ╲╱  ╲╱  ╲
    ╱ ▓▓▓▓▓▓▓▓▓▓ ╲
   │  ▓▓FOLLAJE▓▓ │
   │ ▓▓▓▓▓▓▓▓▓▓▓▓ │
    ║    ║║║    ║
    ║    ║║║    ║
════╬════╬╬╬════╬════
~~~~│~~~~││~~~~~│~~~~
~~││││~││││~──││││~~
 │││││││││││││││││
 ╔═════════════════╗
 ║  ECOSISTEMA 3D ║
 ╚═════════════════╝
      `,
      `
      ╱╲  ╱╲  ╱╲
     ╱  ╲╱  ╲╱  ╲
    ╱ ▒▒▒▒▒▒▒▒▒▒ ╲
   │  ▒▒CANOPY▒▒ │
   │ ▒▒▒▒▒▒▒▒▒▒▒▒ │
    ║    ║║║    ║
    ║    ║║║    ║
════╬════╬╬╬════╬════
~~~~│~~~~││~~~~~│~~~~
~││││││││││~─││││││~
││││││││││││││││││
 ╔═════════════════╗
 ║ FILTRO NATURAL ║
 ╚═════════════════╝
      `
    ]
  },
  cube: {
    name: 'Cubo 3D',
    frames: [
      `
       ╔═══════╗
      ╱       ╱║
     ╱       ╱ ║
    ╔═══════╗  ║
    ║       ║  ║
    ║   █   ║  ╣
    ║       ║ ╱
    ╚═══════╝╱
      `,
      `
       ╔═══════╗
      ╱       ╱║
     ╱   ▓   ╱ ║
    ╔═══════╗  ║
    ║       ║  ║
    ║       ║  ╣
    ║       ║ ╱
    ╚═══════╝╱
      `,
      `
       ╔═══════╗
      ╱       ╱║
     ╱       ╱ ║
    ╔═══════╗  ║
    ║   ▒   ║  ║
    ║       ║  ╣
    ║       ║ ╱
    ╚═══════╝╱
      `
    ]
  },
  water: {
    name: 'Molécula de Agua',
    frames: [
      `
        H
        │
    H───O
        │
        H
    ╔═════════╗
    ║  H₂O    ║
    ╚═════════╝
      `,
      `
        H
       ╱
      O
       ╲
        H───H
    ╔═════════╗
    ║  H₂O    ║
    ╚═════════╝
      `,
      `
    H───H
        │
        O
        │
        H
    ╔═════════╗
    ║  H₂O    ║
    ╚═════════╝
      `
    ]
  },
  axolotl: {
    name: 'Axolotl 3D',
    frames: [
      `
   ∩∩∩∩∩∩∩∩
  ∩ ◕   ◕ ∩
 (    ω    )
  ╲       ╱
   ║█████║
   ║█████║──∿
   ║█████║──∿
   ║█████║──∿
    ╲   ╱
     ╲ ╱
  ╔═══════════╗
  ║  AXOLOTL  ║
  ║ Ambystoma ║
  ╚═══════════╝
      `,
      `
   ∩∩∩∩∩∩∩∩
  ∩ ◉   ◉ ∩
 (    ▿    )
  ╲       ╱
   ║█████║
   ║█████║─∿
   ║█████║──∿
   ║█████║─∿
    ╲   ╱
     ╲ ╱
  ╔═══════════╗
  ║  NADANDO  ║
  ║ Regenera  ║
  ╚═══════════╝
      `,
      `
   ∩∩∩∩∩∩∩∩
  ∩ ◕   ◕ ∩
 (    ◡    )
  ╲       ╱
   ║█████║
   ║█████║──∿
   ║█████║─∿
   ║█████║──∿
    ╲   ╱
     ╲ ╱
  ╔═══════════╗
  ║ MEXICANO  ║
  ║  Xochim.  ║
  ╚═══════════╝
      `
    ]
  },
  anatomy: {
    name: 'Anatomía Axolotl',
    frames: [
      `
  ╔═══════════════════╗
  ║  CORTE LATERAL   ║
  ╚═══════════════════╝
   ∩∩∩ [BRANQUIAS]
  ╔═══════════════╗
  ║ ◉ [OJOS]      ║
  ║ ▓▓▓ [CEREBRO] ║
  ║ ███ [CUERPO]  ║──∿
  ║ ▒▒▒ [ÓRGANOS] ║──∿
  ║ ░░░ [COLA]    ║──∿
  ╚═══════════════╝
   ││││ [PATAS]
      `,
      `
  ╔═══════════════════╗
  ║ REGENERACIÓN 3D  ║
  ╚═══════════════════╝
   ∩∩∩ [BRANQUIAS]
  ╔═══════════════╗
  ║ ◕ [OJOS]      ║
  ║ ▓▓▓ [CEREBRO] ║
  ║ ███ [CUERPO]  ║─∿
  ║ ▒▒▒ [ÓRGANOS] ║──∿
  ║ ░░░ [COLA]    ║─∿
  ╚═══════════════╝
   ││▓▓ [REGEN...]
      `,
      `
  ╔═══════════════════╗
  ║  VISTA INTERNA   ║
  ╚═══════════════════╝
   ∩∩∩ [BRANQUIAS]
  ╔═══════════════╗
  ║ ◉ [OJOS]      ║
  ║ ▓▓▓ [CEREBRO] ║
  ║ ███ [MÚSCULOS]║──∿
  ║ ♥♥♥ [CORAZÓN] ║──∿
  ║ ≈≈≈ [PULMONES]║──∿
  ╚═══════════════╝
   ││││ [PATAS]
      `
    ]
  },
  ecosystem: {
    name: 'Ecosistema Completo',
    frames: [
      `
  [SOL] ☀️  [AIRE]
  ╱╲╱╲╱╲ [HOJAS]
 ╱░░░░░░╲
│ MANGLAR │ 🦅
║   ║║║   ║
══════╬═══════ [AGUA]
~~~~│~│~│~~~~  🐟
~~~│││││││~~~
  │││││││││ [RAÍCES]
 ╔═════════════╗
 ║ BIODIVERSO ║
 ╚═════════════╝
      `,
      `
  [SOL] ☀️  [AIRE]
  ╱╲╱╲╱╲ [HOJAS]
 ╱▓▓▓▓▓▓╲
│ FILTRO  │ 🦜
║   ║║║   ║
══════╬═══════ [AGUA]
~~~~│~│~│~~~~ 🦐
~~│││││││││~~
 │││││││││││ [RAÍCES]
 ╔═════════════╗
 ║ PROTECCIÓN  ║
 ╚═════════════╝
      `,
      `
  [SOL] ☀️  [AIRE]
  ╱╲╱╲╱╲ [HOJAS]
 ╱▒▒▒▒▒▒╲
│ VIVERO  │ 🦀
║   ║║║   ║
══════╬═══════ [AGUA]
~~~~│~│~│~~~~ 🐠
~│││││││││││~
││││││││││││ [RAÍCES]
 ╔═════════════╗
 ║ GUARDERÍA   ║
 ╚═════════════╝
      `
    ]
  },
  wave: {
    name: 'Ciclo del Agua',
    frames: [
      `
    ☁️ ☁️ ☁️
     ╲ │ ╱
      ↓↓↓ [LLUVIA]
    ∿∿∿∿∿∿∿
   ∿  🏔️  ∿
  ∿  ≈≈≈≈  ∿
 ∿ ≈≈≈≈≈≈≈ ∿
∿≈≈≈≈≈≈≈≈≈≈∿
╔═══════════════╗
║ EVAPORACIÓN  ║
╚═══════════════╝
      `,
      `
    ☁️ ☁️ ☁️
      │││
      ↓↓↓ [LLUVIA]
   ∿∿∿∿∿∿∿∿
  ∿  🏔️   ∿
 ∿ ≈≈≈≈≈≈  ∿
∿≈≈≈≈≈≈≈≈≈ ∿
≈≈≈≈≈≈≈≈≈≈≈
╔═══════════════╗
║ CONDENSACIÓN ║
╚═══════════════╝
      `,
      `
    ☁️ ☁️ ☁️
    ╱  │  ╲
   ↓   ↓   ↓
  ∿∿∿∿∿∿∿∿∿
 ∿   🏔️    ∿
∿  ≈≈≈≈≈≈   ∿
 ≈≈≈≈≈≈≈≈≈≈
≈≈≈≈≈≈≈≈≈≈≈
╔═══════════════╗
║ PRECIPITACIÓN║
╚═══════════════╝
      `
    ]
  }
}

// Obtener forma actual
const currentShape = computed(() => {
  const shapeTypes = Object.keys(shapes)
  return shapes[shapeTypes[currentShapeIndex.value]]
})

// Frame actual
const currentFrame = computed(() => {
  return currentShape.value.frames[frameIndex.value]
})

// Métodos
const toggleAnimation = () => {
  isAnimating.value = !isAnimating.value
  if (isAnimating.value) {
    startAnimation()
  } else {
    stopAnimation()
  }
}

const changeShape = () => {
  const shapeTypes = Object.keys(shapes)
  currentShapeIndex.value = (currentShapeIndex.value + 1) % shapeTypes.length
  frameIndex.value = 0
}

const startAnimation = () => {
  if (animationInterval) return
  
  animationInterval = setInterval(() => {
    frameIndex.value = (frameIndex.value + 1) % currentShape.value.frames.length
  }, 500)
}

const stopAnimation = () => {
  if (animationInterval) {
    clearInterval(animationInterval)
    animationInterval = null
  }
}

// Lifecycle
onMounted(() => {
  // Establecer forma inicial basada en el prop
  if (props.shapeType) {
    const shapeTypes = Object.keys(shapes)
    const index = shapeTypes.indexOf(props.shapeType)
    if (index !== -1) {
      currentShapeIndex.value = index
    }
  }
  
  if (isAnimating.value) {
    startAnimation()
  }
})

onUnmounted(() => {
  stopAnimation()
})
</script>

<style scoped>
.ascii-renderer {
  background: #ffffff;
  border: 4px solid #000000;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  box-shadow: 6px 6px 0 #000000;
  transition: all 0.3s ease;
}

.ascii-renderer:hover {
  transform: translate(-2px, -2px);
  box-shadow: 8px 8px 0 #000000;
}

.ascii-renderer.is-animating {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    border-color: #000000;
  }
  50% {
    border-color: #666666;
  }
}

.ascii-container {
  background: #000000;
  padding: 2rem;
  border: 3px solid #ffffff;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.1);
}

.ascii-art {
  font-family: 'Courier New', 'Consolas', monospace;
  font-size: 14px;
  line-height: 1.2;
  color: #000000;
  text-align: center;
  margin: 0;
  white-space: pre;
  text-shadow: none;
  font-weight: bold;
}

.ascii-controls {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.ascii-btn {
  background: #000000;
  color: #ffffff;
  border: 3px solid #ffffff;
  padding: 0.75rem 1.5rem;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  box-shadow: 3px 3px 0 #ffffff;
}

.ascii-btn:hover {
  background: #ffffff;
  color: #000000;
  transform: translate(-2px, -2px);
  box-shadow: 5px 5px 0 #000000;
}

.ascii-btn:active {
  transform: translate(0, 0);
  box-shadow: 2px 2px 0 #000000;
}

@media (max-width: 768px) {
  .ascii-art {
    font-size: 10px;
  }
  
  .ascii-container {
    padding: 1rem;
  }
  
  .ascii-renderer {
    padding: 1rem;
  }
}
</style>
