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
  import { ref, watch, onMounted } from 'vue'
  import { usePlaces, useMap } from '@/composables'
  import Mapboxgl from 'mapbox-gl'

  const mapElement = ref<HTMLDivElement>()
  const { userLocation, isUserLocationReady } = usePlaces()
  const { setMap } = useMap()

  const initMap = async () => {
    if (!mapElement.value) throw new Error('Div element does not exists')
    if (!userLocation.value) throw new Error('userLocation does not exists') 

    await Promise.resolve()

    const map = new Mapboxgl.Map({
      container: mapElement.value, // container ID
      style: 'mapbox://styles/mapbox/satellite-streets-v11', // style URL
      center: userLocation.value, // starting position [lng, lat]
      zoom: 13 // starting zoom
    })

    // add zoom and rotation controls to the map.
    map.addControl(new Mapboxgl.NavigationControl());

    // offset is the distance of the popup box from the marker
    const myLocationPopup = new Mapboxgl.Popup({ offset: [0, -25] })
      .setLngLat(userLocation.value)
      .setHTML(`
        <h4>I am here</h4>
        <p>${userLocation.value}</p
      `)

    const myLocationMarker = new Mapboxgl.Marker({ scale: 0.8 })
      .setLngLat(userLocation.value) // set latitude and longitude (where it should go)
      .setPopup(myLocationPopup) // set popup on that marker, which is what should happen when a user clicks
      .addTo(map)

    setMap(map) // centralizing and defining the map in Pinia
  }

  onMounted(() => {
    if (isUserLocationReady.value) return initMap()
  })

  watch(isUserLocationReady, (newVal) => {
    if (isUserLocationReady.value) initMap()
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
