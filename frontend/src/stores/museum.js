/**
 * Store de Pinia para gestión de estado
 * Museo Virtual del Agua
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '../services/api'

export const useMuseumStore = defineStore('museum', () => {
  // Estado
  const rooms = ref([])
  const currentRoom = ref(null)
  const exhibits = ref([])
  const content = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Getters (computed)
  const roomCount = computed(() => rooms.value.length)
  const exhibitCount = computed(() => exhibits.value.length)
  
  /**
   * Obtener sala por ID
   */
  const getRoomById = computed(() => {
    return (id) => rooms.value.find(room => room.id === id)
  })

  /**
   * Obtener exhibiciones de una sala
   */
  const getExhibitsByRoom = computed(() => {
    return (roomId) => exhibits.value.filter(ex => ex.roomId === roomId)
  })

  // Actions
  /**
   * Cargar todas las salas desde la API
   */
  async function fetchRooms() {
    loading.value = true
    error.value = null
    try {
      const response = await api.getRooms()
      rooms.value = response.data
    } catch (err) {
      error.value = 'Error al cargar las salas del museo'
      console.error('Error fetching rooms:', err)
    } finally {
      loading.value = false
    }
  }

  /**
   * Cargar exhibiciones desde la API
   */
  async function fetchExhibits() {
    loading.value = true
    error.value = null
    try {
      const response = await api.getExhibits()
      exhibits.value = response.data
    } catch (err) {
      error.value = 'Error al cargar las exhibiciones'
      console.error('Error fetching exhibits:', err)
    } finally {
      loading.value = false
    }
  }

  /**
   * Cargar contenido desde la API
   */
  async function fetchContent() {
    loading.value = true
    error.value = null
    try {
      const response = await api.getContent()
      content.value = response.data
    } catch (err) {
      error.value = 'Error al cargar el contenido'
      console.error('Error fetching content:', err)
    } finally {
      loading.value = false
    }
  }

  /**
   * Establecer sala actual
   */
  function setCurrentRoom(room) {
    currentRoom.value = room
  }

  /**
   * Limpiar error
   */
  function clearError() {
    error.value = null
  }

  return {
    // Estado
    rooms,
    currentRoom,
    exhibits,
    content,
    loading,
    error,
    // Getters
    roomCount,
    exhibitCount,
    getRoomById,
    getExhibitsByRoom,
    // Actions
    fetchRooms,
    fetchExhibits,
    fetchContent,
    setCurrentRoom,
    clearError
  }
})
