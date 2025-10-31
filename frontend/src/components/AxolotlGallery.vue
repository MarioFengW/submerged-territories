<!-- 
  Galería de Axolotes con Lightbox
  Muestra la diversidad de especies y colores
-->

<template>
  <div class="axolotl-gallery">
    <h2 class="gallery-title">
      🦎 Galería de Axolotes
      <span class="subtitle">Diversidad de Especies y Colores</span>
    </h2>
    
    <p class="gallery-intro">
      Los axolotes presentan una increíble variedad de colores y patrones, 
      desde el salvaje oscuro hasta las variantes como el leucístico y albino.
    </p>

    <!-- Cuadrícula de imágenes -->
    <div class="gallery-grid">
      <div 
        v-for="(axolotl, index) in axolotls" 
        :key="index"
        class="gallery-item"
        @click="openLightbox(index)"
        @keypress.enter="openLightbox(index)"
        tabindex="0"
        role="button"
        :aria-label="`Ver imagen de ${axolotl.title} en tamaño completo`"
      >
        <div class="image-container">
          <img 
            :src="axolotl.image" 
            :alt="axolotl.description"
            class="gallery-image"
            loading="lazy"
          />
          <div class="image-overlay">
            <span class="zoom-icon">🔍</span>
          </div>
        </div>
        <div class="image-info">
          <h3 class="image-title">{{ axolotl.title }}</h3>
          <p class="image-description">{{ axolotl.description }}</p>
        </div>
      </div>
    </div>

    <!-- Lightbox Modal -->
    <Teleport to="body">
      <Transition name="lightbox-fade">
        <div 
          v-if="lightboxOpen" 
          class="lightbox-backdrop"
          @click="closeLightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Visualización de imagen en tamaño completo"
        >
          <div class="lightbox-container" @click.stop>
            <!-- Botón cerrar -->
            <button 
              @click="closeLightbox"
              class="lightbox-close"
              aria-label="Cerrar visualización"
            >
              ✕
            </button>

            <!-- Navegación -->
            <button 
              @click="prevImage"
              class="lightbox-nav lightbox-prev"
              aria-label="Imagen anterior"
              :disabled="currentIndex === 0"
            >
              ‹
            </button>
            
            <button 
              @click="nextImage"
              class="lightbox-nav lightbox-next"
              aria-label="Imagen siguiente"
              :disabled="currentIndex === axolotls.length - 1"
            >
              ›
            </button>

            <!-- Contenido del lightbox -->
            <div class="lightbox-content">
              <img 
                :src="currentAxolotl.image" 
                :alt="currentAxolotl.description"
                class="lightbox-image"
              />
              <div class="lightbox-info">
                <h3 class="lightbox-title">{{ currentAxolotl.title }}</h3>
                <p class="lightbox-description">{{ currentAxolotl.description }}</p>
                <div class="lightbox-counter">
                  {{ currentIndex + 1 }} / {{ axolotls.length }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Estado
const lightboxOpen = ref(false)
const currentIndex = ref(0)

// Datos de la galería - 10 imágenes de axolotes
const axolotls = ref([
  {
    title: 'Axolote Salvaje',
    description: 'Presenta una coloración marrón oscura con manchas, ideal para camuflaje en su entorno natural.',
    image: 'https://www.treehugger.com/thmb/Mgtxk5FVJXn9SOQhGpA6iB95pho=/2100x1428/filters:fill(auto,1)/GettyImages-141864224-a1134bcdc6294f69a9de13031dd5565a.jpg'
  },
  {
    title: 'Axolote Leucístico',
    description: 'De tonalidad rosada y ojos oscuros, es una de las variantes más vistas en acuarios.',
    image: 'https://th.bing.com/th/id/R.774f15b3abf2e3d6684f044eea51968a?rik=s5pr1tCnffGz%2fw&pid=ImgRaw&r=0'
  },
  {
    title: 'Axolote Albino Dorado',
    description: 'Su piel dorada y ojos rojizos lo hacen destacar entre las variedades albinas.',
    image: 'https://d20zyr0oabjxc2.cloudfront.net/variants/media/raw_images/littlefishaquatics/2022/08/20220802040607.143-PXL_20220802_0359009-1500x1500s.jpeg?signature=E66C09DE011A272C6A1E6E29E1E9A53894118A5E1CC3DB8BE0D88D20C6C63328'
  },
  {
    title: 'Axolote Melanístico',
    description: 'Su color negro intenso lo convierte en una rareza muy buscada por coleccionistas.',
    image: 'https://axolotlplanet.com/cdn/shop/products/melanoid2.jpg?v=1655504344&width=1600'
  },
  {
    title: 'Hábitat del axolote',
    description: 'Ambientes acuáticos con vegetación densa, como los canales de Xochimilco, son su hogar natural.',
    image: 'https://1.bp.blogspot.com/-K8EJDAEYilg/XvUbps-5DUI/AAAAAAAAABw/Ka4bu8QyX-4F1sR6dRGSGLi5U2cFICuGwCK4BGAsYHg/s1200/xoch.jpg'
  },
  {
    title: 'Axolote Bebé',
    description: 'Pequeño y delicado, con branquias externas que resaltan desde temprana edad.',
    image: 'https://d2nvvdzacof5ua.cloudfront.net/wp-content/uploads/2022/07/20124904/Baby-Axolotl.jpeg'
  },
  {
    title: 'Axolote Blanco Puro',
    description: 'De apariencia etérea, esta variante blanca es muy valorada por su singular belleza.',
    image: 'https://descubreenmexico.com/wp-content/uploads/2023/01/AJOLOTE-ALBINO-DORADO.jpeg'
  },
  {
    title: 'Axolote Cobrizo',
    description: 'Destaca por sus reflejos metálicos en tonos cobre y dorado, únicos en su especie.',
    image: 'https://th.bing.com/th/id/R.a612a90caf9580b2db985dabd4ee4646?rik=0y%2f9X80td9jmXQ&pid=ImgRaw&r=0'
  },
  {
    title: 'Conservación de su hábitat',
    description: 'Iniciativas ambientales buscan preservar su ecosistema y evitar su extinción.',
    image: 'https://iphonegr.reforma.com/libre/online07/imagetransformer2/ImageTransformer.aspx?img=https://img.gruporeforma.com/imagenes/960x640/6/383/5382286.jpg&imagencompleta=1'
  }
])


// Computed
const currentAxolotl = computed(() => axolotls.value[currentIndex.value])

// Métodos
function openLightbox(index) {
  currentIndex.value = index
  lightboxOpen.value = true
  document.body.style.overflow = 'hidden'
}

function closeLightbox() {
  lightboxOpen.value = false
  document.body.style.overflow = ''
}

function nextImage() {
  if (currentIndex.value < axolotls.value.length - 1) {
    currentIndex.value++
  }
}

function prevImage() {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

// Manejo de teclado
function handleKeydown(e) {
  if (!lightboxOpen.value) return
  
  switch(e.key) {
    case 'Escape':
      closeLightbox()
      break
    case 'ArrowRight':
      nextImage()
      break
    case 'ArrowLeft':
      prevImage()
      break
  }
}

// Lifecycle
onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.axolotl-gallery {
  padding: 2rem 0;
}

.gallery-title {
  font-size: 2rem;
  font-weight: bold;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.5rem;
  color: #000000;
  text-align: center;
  border: 4px solid #000000;
  padding: 1rem;
  background: #ffffff;
}

.subtitle {
  display: block;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  letter-spacing: 0.05em;
  font-weight: normal;
}

.gallery-intro {
  text-align: center;
  max-width: 700px;
  margin: 1.5rem auto 2rem;
  font-size: 1.1rem;
  line-height: 1.6;
  color: #333333;
  padding: 0 1rem;
}

/* Cuadrícula responsiva */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  padding: 1rem;
  max-width: 1400px;
  margin: 0 auto;
}

.gallery-item {
  background: #ffffff;
  border: 3px solid #000000;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 4px 4px 0 #000000;
}

.gallery-item:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 #000000;
}

.gallery-item:focus {
  outline: 3px solid #E91E63;
  outline-offset: 2px;
}

.image-container {
  position: relative;
  overflow: hidden;
  aspect-ratio: 4/3;
  background: #f0f0f0;
}

.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.gallery-item:hover .gallery-image {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.gallery-item:hover .image-overlay {
  opacity: 1;
}

.zoom-icon {
  font-size: 3rem;
  color: #ffffff;
}

.image-info {
  padding: 1rem;
  background: #ffffff;
}

.image-title {
  font-size: 1rem;
  font-weight: bold;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
  color: #000000;
}

.image-description {
  font-size: 0.85rem;
  line-height: 1.4;
  color: #555555;
  margin: 0;
}

/* Lightbox */
.lightbox-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.lightbox-container {
  position: relative;
  max-width: 1200px;
  width: 100%;
  max-height: 90vh;
}

.lightbox-close {
  position: absolute;
  top: -3rem;
  right: 0;
  background: #ffffff;
  color: #000000;
  border: 3px solid #ffffff;
  width: 3rem;
  height: 3rem;
  font-size: 2rem;
  cursor: pointer;
  z-index: 10;
  transition: all 0.2s ease;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-close:hover {
  background: #E91E63;
  color: #ffffff;
  transform: rotate(90deg);
}

.lightbox-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: #ffffff;
  color: #000000;
  border: 3px solid #ffffff;
  width: 3rem;
  height: 3rem;
  font-size: 2rem;
  cursor: pointer;
  z-index: 10;
  transition: all 0.2s ease;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-nav:hover:not(:disabled) {
  background: #E91E63;
  color: #ffffff;
}

.lightbox-nav:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.lightbox-prev {
  left: -4rem;
}

.lightbox-next {
  right: -4rem;
}

.lightbox-content {
  background: #ffffff;
  border: 4px solid #ffffff;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.8);
}

.lightbox-image {
  width: 100%;
  height: auto;
  max-height: 70vh;
  object-fit: contain;
  display: block;
  background: #000000;
}

.lightbox-info {
  padding: 1.5rem;
  background: #ffffff;
  border-top: 3px solid #000000;
}

.lightbox-title {
  font-size: 1.5rem;
  font-weight: bold;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.75rem;
  color: #000000;
}

.lightbox-description {
  font-size: 1rem;
  line-height: 1.6;
  color: #333333;
  margin-bottom: 1rem;
}

.lightbox-counter {
  text-align: right;
  font-size: 0.9rem;
  font-family: 'Courier New', monospace;
  color: #666666;
  font-weight: bold;
}

/* Transiciones */
.lightbox-fade-enter-active,
.lightbox-fade-leave-active {
  transition: opacity 0.3s ease;
}

.lightbox-fade-enter-from,
.lightbox-fade-leave-to {
  opacity: 0;
}

/* Responsivo */
@media (max-width: 768px) {
  .gallery-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
  }

  .gallery-title {
    font-size: 1.5rem;
    padding: 0.75rem;
  }

  .subtitle {
    font-size: 0.8rem;
  }

  .gallery-intro {
    font-size: 0.95rem;
  }

  .lightbox-nav {
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1.5rem;
  }

  .lightbox-prev {
    left: 0;
  }

  .lightbox-next {
    right: 0;
  }

  .lightbox-close {
    top: 0;
    right: 0;
    width: 2.5rem;
    height: 2.5rem;
  }

  .lightbox-title {
    font-size: 1.2rem;
  }

  .lightbox-description {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .gallery-grid {
    grid-template-columns: 1fr;
  }

  .lightbox-info {
    padding: 1rem;
  }
}
</style>
