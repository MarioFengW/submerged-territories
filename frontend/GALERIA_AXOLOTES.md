# Galería de Axolotes 🦎

## Descripción

Componente de galería interactiva que muestra la diversidad de especies y colores de axolotes con funcionalidad lightbox completa.

## Características Implementadas

### 1. **Cuadrícula Responsiva**
- Grid adaptativo que se ajusta automáticamente según el tamaño de pantalla
- Desktop: múltiples columnas (hasta 5)
- Tablet: 2-3 columnas
- Mobile: 1 columna
- Diseño limpio con bordes estilo manga

### 2. **10 Imágenes de Axolotes**
Incluye las siguientes variedades:
1. **Axolote Salvaje** - Color marrón oscuro natural
2. **Axolote Leucístico** - Rosado con ojos negros
3. **Axolote Albino Dorado** - Dorado brillante con ojos rojizos
4. **Axolote Melanístico** - Negro completo (muy raro)
5. **Axolote en su Hábitat** - En canales de Xochimilco
6. **Axolote Juvenil** - Ejemplar joven
7. **Axolote Blanco Puro** - Leucístico blanco
8. **Axolote en Regeneración** - Mostrando capacidad regenerativa
9. **Axolote Cobrizo** - Tonos cobrizos y dorados
10. **Axolote en Conservación** - Esfuerzos de protección

### 3. **Efectos Visuales**
- Hover con zoom suave en imágenes
- Overlay oscuro con icono de lupa
- Efecto de sombra "manga style"
- Transiciones fluidas en todas las interacciones

### 4. **Lightbox/Modal Completo**
- Click en cualquier imagen para verla en grande
- Navegación con flechas (siguiente/anterior)
- Botón de cierre visible
- Contador de imágenes (ej: "3 / 10")
- Información detallada (título y descripción)
- Fondo oscuro semi-transparente

### 5. **Accesibilidad**
- Navegación por teclado:
  - `Escape` - Cerrar lightbox
  - `Flecha derecha` - Siguiente imagen
  - `Flecha izquierda` - Imagen anterior
  - `Enter` - Abrir imagen seleccionada
- Atributos ARIA apropiados
- Roles semánticos
- Contraste alto para lectura
- Focus visible en elementos interactivos

### 6. **Diseño Coherente**
- Estilo monocromático en blanco y negro
- Tipografía "Courier New" (estilo manga/terminal)
- Bordes gruesos y sombras pronunciadas
- Color de acento rosa (#E91E63) para interacciones
- Integración perfecta con el diseño existente del museo

### 7. **Rendimiento**
- Lazy loading de imágenes
- Transiciones CSS optimizadas
- Cleanup automático de event listeners
- Prevención de scroll en body cuando el lightbox está abierto

## Ubicación

La galería se muestra automáticamente en la **Sala de Axolotes** (`axolotl-room`) del museo virtual.

## Componentes

### Archivo Principal
- `frontend/src/components/AxolotlGallery.vue`

### Integración
- `frontend/src/views/RoomDetail.vue` (importa y renderiza la galería)

## Uso

La galería se carga automáticamente cuando visitas la sala de axolotes:

1. Navega a "Salas" en el menú principal
2. Selecciona "Reino de los Axolotes" (🦎)
3. Desplázate hacia abajo para ver la galería
4. Haz clic en cualquier imagen para verla en grande
5. Usa las flechas de navegación o el teclado para explorar

## Personalización

### Agregar más imágenes

Edita el array `axolotls` en `AxolotlGallery.vue`:

```javascript
const axolotls = ref([
  {
    title: 'Nombre del Axolote',
    description: 'Descripción breve',
    image: 'URL_de_la_imagen'
  },
  // ... más imágenes
])
```

### Cambiar colores

Modifica las variables CSS en el `<style scoped>`:

```css
/* Color de acento (hover, botones) */
background: #E91E63;

/* Bordes */
border: 3px solid #000000;
```

## Tecnologías Utilizadas

- **Vue 3** - Composition API con `<script setup>`
- **Teleport** - Para renderizar el lightbox fuera del componente
- **CSS Grid** - Para layout responsivo
- **Transitions** - Para animaciones suaves

## Notas Técnicas

- Las imágenes usan Unsplash como fuente temporal
- En producción, reemplazar con imágenes locales o CDN
- El componente es completamente autocontenido
- No requiere librerías externas adicionales

## Mejoras Futuras Opcionales

- [ ] Soporte para gestos táctiles (swipe)
- [ ] Zoom dentro del lightbox
- [ ] Descarga de imágenes
- [ ] Compartir en redes sociales
- [ ] Modo presentación automática
- [ ] Filtros por tipo de axolote
- [ ] Animaciones de carga más elaboradas

---

**Desarrollado para el Museo Virtual del Agua** 🌊
