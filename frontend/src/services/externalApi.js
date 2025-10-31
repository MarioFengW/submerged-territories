/**
 * Servicio para APIs externas
 * Animals API y Trefle Plants API
 */

import axios from 'axios'

// Configuración para el proxy del backend (evita CORS)
const backendApi = axios.create({
  baseURL: 'http://localhost:3000/api/external',
  timeout: 15000
})

/**
 * API de Animales
 */
export const animalService = {
  /**
   * Buscar información de un animal por nombre
   * @param {string} name - Nombre del animal (ej: "axolotl")
   * @returns {Promise} - Datos del animal
   */
  async getAnimalByName(name) {
    try {
      console.log('🔍 Fetching animal data via backend proxy:', name)
      
      const response = await backendApi.get(`/animals/${name}`)
      
      console.log('✅ Animal data received:', response.data)
      return response.data
    } catch (error) {
      console.error('❌ Error fetching animal data:', error.message)
      if (error.response) {
        console.error('Response status:', error.response.status)
        console.error('Response data:', error.response.data)
        
        // Si el backend sugiere usar mock
        if (error.response.data?.useMock) {
          console.warn('📦 Backend suggests using mock data')
          return this.getMockAnimalData(name)
        }
      }
      // Retornar datos mock en caso de error
      console.warn('📦 Using mock data as fallback')
      return this.getMockAnimalData(name)
    }
  },

  /**
   * Datos mock para desarrollo/fallback
   */
  getMockAnimalData(name) {
    const mockData = {
      axolotl: [
        {
          name: 'Axolotl',
          taxonomy: {
            kingdom: 'Animalia',
            phylum: 'Chordata',
            class: 'Amphibia',
            order: 'Urodela',
            family: 'Ambystomatidae',
            genus: 'Ambystoma',
            scientific_name: 'Ambystoma mexicanum'
          },
          locations: ['Mexico'],
          characteristics: {
            prey: 'Gusanos, insectos, peces pequeños',
            name_of_young: 'Larva',
            group_behavior: 'Solitario',
            estimated_population_size: 'Menos de 1,000 en estado salvaje',
            biggest_threat: 'Contaminación del agua y urbanización',
            most_distinctive_feature: 'Branquias externas y capacidad de regeneración',
            other_name: 'Pez Caminante Mexicano',
            gestation_period: '14 días',
            habitat: 'Lagos y canales de agua dulce',
            diet: 'Carnívoro',
            type: 'Anfibio',
            common_name: 'Axolotl',
            number_of_species: '1',
            location: 'Lago Xochimilco, Ciudad de México',
            color: 'Rosa, Café, Blanco, Negro, Dorado',
            skin_type: 'Permeable',
            lifespan: '10-15 años',
            weight: '60-200g',
            length: '15-45cm',
            age_of_sexual_maturity: '12-18 meses',
            venomous: 'No'
          }
        }
      ]
    }

    return mockData[name] || []
  }
}

/**
 * API de Plantas
 */
export const plantService = {
  /**
   * Buscar plantas por nombre
   * @param {string} query - Término de búsqueda (ej: "mangrove")
   * @returns {Promise} - Lista de plantas
   */
  async searchPlants(query) {
    try {
      console.log('🔍 Fetching plant data via backend proxy:', query)
      
      const response = await backendApi.get('/plants/search', {
        params: { q: query }
      })
      
      console.log('✅ Plant data received:', response.data)
      return response.data
    } catch (error) {
      console.error('❌ Error fetching plant data:', error.message)
      if (error.response) {
        console.error('Response status:', error.response.status)
        console.error('Response data:', error.response.data)
        
        // Si el backend sugiere usar mock
        if (error.response.data?.useMock) {
          console.warn('📦 Backend suggests using mock data')
          return this.getMockPlantData(query)
        }
      }
      console.warn('📦 Using mock data as fallback')
      return this.getMockPlantData(query)
    }
  },

  /**
   * Obtener información de una planta específica
   * @param {string} id - ID de la planta
   * @returns {Promise} - Datos de la planta
   */
  async getPlantById(id) {
    try {
      console.log('🔍 Fetching plant details via backend proxy, ID:', id)

      const response = await backendApi.get(`/plants/${id}`)
      
      console.log('✅ Plant details received:', response.data)
      return response.data
    } catch (error) {
      console.error('❌ Error fetching plant details:', error.message)
      if (error.response) {
        console.error('Response status:', error.response.status)
        console.error('Response data:', error.response.data)
      }
      return null
    }
  },

  /**
   * Datos mock para desarrollo/fallback
   */
  getMockPlantData(query) {
    const mockMangroves = {
      data: [
        {
          id: 1,
          common_name: 'Red Mangrove',
          scientific_name: 'Rhizophora mangle',
          family_common_name: 'Mangrove Family',
          year: 1753,
          bibliography: 'Sp. Pl. 1: 443',
          image_url: 'https://images.unsplash.com/photo-1590227986583-2f634e98855e?w=400',
          observations: 'Most common mangrove species. Can tolerate high salinity.',
          family: 'Rhizophoraceae',
          links: {
            self: '/api/v1/plants/1'
          }
        },
        {
          id: 2,
          common_name: 'Black Mangrove',
          scientific_name: 'Avicennia germinans',
          family_common_name: 'Verbena Family',
          year: 1753,
          bibliography: 'Sp. Pl. 1: 110',
          image_url: 'https://images.unsplash.com/photo-1565008576549-57569a49371d?w=400',
          observations: 'Identified by pneumatophores (breathing roots) that grow vertically.',
          family: 'Acanthaceae',
          links: {
            self: '/api/v1/plants/2'
          }
        },
        {
          id: 3,
          common_name: 'White Mangrove',
          scientific_name: 'Laguncularia racemosa',
          family_common_name: 'Leadwood Tree Family',
          year: 1753,
          bibliography: 'Sp. Pl. 1: 177',
          image_url: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=400',
          observations: 'Found in higher elevations of mangrove forests. Salt-excreting glands on leaves.',
          family: 'Combretaceae',
          links: {
            self: '/api/v1/plants/3'
          }
        },
        {
          id: 4,
          common_name: 'Buttonwood',
          scientific_name: 'Conocarpus erectus',
          family_common_name: 'Combretum Family',
          year: 1753,
          bibliography: 'Sp. Pl. 1: 176',
          image_url: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=400',
          observations: 'Often considered a mangrove associate. Grows at forest edges.',
          family: 'Combretaceae',
          links: {
            self: '/api/v1/plants/4'
          }
        }
      ]
    }

    return query.toLowerCase().includes('mang') ? mockMangroves : { data: [] }
  }
}

export default {
  animalService,
  plantService
}
