<template>
  <div>

    <div v-if="!isUserLocationReady"
      class="loading-map d-flex justifiy-content-center align-items-center">
      <div class="text-center">
        <h3>Espere por favor</h3>
        <span>Localizando...</span>
      </div>
    </div>
    
    <div v-show="isUserLocationReady" class="map-container" ref="mapElement" />

  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { usePlaces } from '@/composables'
  import MapView from '@/components/MapView.vue'

  const mapElement = ref<HTMLDivElement>()
  const { userLocation, isUserLocationReady } = usePlaces()

  onMounted(() => {
    console.log('mapElement.value', mapElement.value)
  })
</script>

<style lang="css" scoped>

.loading-map {
  background-color: rgba(0, 0, 0, .8); /* ? */
  color: white; /* ? */
  height: 100vh;
  width: 100vw;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9999;
}

.map-container {
  position: fixed;
  width: 100vw;
  height: 100vh;
}
</style>
