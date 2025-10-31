/**
 * Configuración de rutas de Vue Router
 * Navegación del Museo Virtual del Agua
 */

import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Rooms from '../views/Rooms.vue'
import RoomDetail from '../views/RoomDetail.vue'
import About from '../views/About.vue'
import ApiTest from '../components/ApiTest.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: 'Inicio - Museo Virtual del Agua' }
  },
  {
    path: '/rooms',
    name: 'Rooms',
    component: Rooms,
    meta: { title: 'Salas del Museo' }
  },
  {
    path: '/room/:id',
    name: 'RoomDetail',
    component: RoomDetail,
    meta: { title: 'Sala' },
    props: true
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: { title: 'Acerca del Museo' }
  },
  {
    path: '/api-test',
    name: 'ApiTest',
    component: ApiTest,
    meta: { title: 'Prueba de APIs' }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})

// Actualizar título de la página
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Museo Virtual del Agua'
  next()
})

export default router
