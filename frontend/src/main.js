/**
 * Punto de entrada principal de la aplicación Vue.js
 * Museo Virtual del Agua
 */

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import './assets/styles.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
