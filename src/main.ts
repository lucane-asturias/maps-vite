import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

import mapboxgl from 'mapbox-gl'
 
mapboxgl.accessToken = 'pk.eyJ1IjoibHVjYW5lIiwiYSI6ImNsMHZnOHFnMTBnNzgzY256cXU4aDQ4ZzQifQ.LwTCSjhjQ-lx8q5b3yTxYg';

if (!navigator.geolocation) {
  alert('Seu navegador não suporta geolocalização')
  throw new Error('Tu navegador no soporta el geolocation')
}

createApp(App)
  .use(createPinia())
  .use(router)
  .mount('#app')
