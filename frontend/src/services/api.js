/**
 * Servicio de API para comunicación con el backend
 * Museo Virtual del Agua
 */

import axios from 'axios'

// Configuración base de axios
const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
})

// Interceptor para manejo de errores global
apiClient.interceptors.response.use(
  response => response.data,
  error => {
    console.error('API Error:', error)
    return Promise.reject(error)
  }
)

/**
 * API del Museo Virtual del Agua
 */
const api = {
  /**
   * Obtener todas las salas del museo
   */
  getRooms() {
    return apiClient.get('/rooms')
  },

  /**
   * Obtener una sala específica por ID
   */
  getRoomById(id) {
    return apiClient.get(`/rooms/${id}`)
  },

  /**
   * Obtener todas las exhibiciones
   */
  getExhibits() {
    return apiClient.get('/exhibits')
  },

  /**
   * Obtener exhibiciones de una sala específica
   */
  getExhibitsByRoom(roomId) {
    return apiClient.get(`/exhibits/room/${roomId}`)
  },

  /**
   * Obtener todo el contenido educativo
   */
  getContent() {
    return apiClient.get('/content')
  },

  /**
   * Obtener contenido por tipo
   */
  getContentByType(type) {
    return apiClient.get(`/content/type/${type}`)
  }
}

export default api
