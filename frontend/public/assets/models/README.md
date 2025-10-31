# Directorio de Modelos 3D

Este directorio debe contener los archivos `.glb` de los modelos 3D interactivos.

## Modelos Requeridos

### 1. axolotl.glb
- **Ubicación**: `/public/assets/models/axolotl.glb`
- **Formato**: glTF 2.0 Binary (.glb)
- **Especificaciones técnicas**:
  - Triángulos: ~25,000
  - Texturas embebidas (PBR workflow)
  - Animaciones requeridas: `idle`, `swim`, `close-up`
  - Anchors de interacción: `head`, `gills`, `tail`, `more_info`
  
### 2. mangrove.glb
- **Ubicación**: `/public/assets/models/mangrove.glb`
- **Formato**: glTF 2.0 Binary (.glb)
- **Especificaciones técnicas**:
  - Triángulos: ~30,000
  - Texturas embebidas (PBR workflow)
  - Animaciones requeridas: `grow`, `roots`, `ecosystem`
  - Anchors de interacción: `roots`, `trunk`, `leaves`, `more_info`

## Cómo obtener modelos de prueba

Mientras esperas los modelos finales del equipo de 3D, puedes usar modelos de prueba:

### Opción 1: Descargar modelos gratuitos
Sitios recomendados:
- **Sketchfab**: https://sketchfab.com/3d-models?features=downloadable&sort_by=-likeCount
  - Busca "axolotl" o "salamander"
  - Filtra por "Downloadable" y formato "glTF"
  
- **Poly Haven**: https://polyhaven.com/models
  - Modelos de alta calidad, 100% gratuitos
  
- **Quaternius**: http://quaternius.com/
  - Modelos low-poly estilo stylized

### Opción 2: Convertir modelos existentes
Si tienes modelos en otros formatos (.fbx, .obj, .blend):

1. Usar Blender (gratuito): https://www.blender.org/
   - Abrir el modelo
   - File > Export > glTF 2.0 (.glb)
   - Asegurarte de exportar con texturas embebidas

2. Usar herramientas online:
   - https://products.aspose.app/3d/conversion
   - https://anyconv.com/3d-converter/

## Verificar el modelo

Una vez colocado el archivo `.glb` en esta carpeta, verifica:

1. **Ruta correcta**: El archivo debe estar exactamente en:
   ```
   frontend/public/assets/models/axolotl.glb
   frontend/public/assets/models/mangrove.glb
   ```

2. **Formato válido**: Debe ser glTF 2.0 Binary (.glb), no .gltf separado

3. **Tamaño recomendado**: 
   - Menos de 10 MB para carga rápida
   - Optimizar texturas a 2K máximo

4. **Prueba local**: 
   - Reiniciar el servidor de desarrollo (`npm run dev`)
   - Navegar a la sala correspondiente
   - El modelo debería visualizarse automáticamente

## Troubleshooting

**Error: "Failed to load model"**
- Verifica que el archivo existe en la ruta correcta
- Comprueba la consola del navegador para detalles del error
- Asegúrate de que el formato es .glb (no .gltf con archivos separados)

**El modelo se ve negro/sin texturas**
- Las texturas deben estar embebidas en el .glb
- En Blender, al exportar, marca "Export textures"

**El modelo es muy grande/lento**
- Reduce el número de polígonos
- Comprime las texturas (usa 1K o 2K en lugar de 4K)
- Considera usar herramientas de optimización como gltf-pipeline

## Documentación Completa

Para especificaciones técnicas detalladas, consulta:
- **ESPECIFICACIONES_MODELO_3D.md** (en la raíz del proyecto)
- Documentación de glTF: https://www.khronos.org/gltf/
- Three.js GLTFLoader: https://threejs.org/docs/#examples/en/loaders/GLTFLoader
