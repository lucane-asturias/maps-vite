<template>
  <div v-if="isLoadingPlaces" class="alert alert-primary text-center">
    <h5>Loading</h5>
    <span>Wait please</span>
  </div>

  <ul v-else-if="places.length > 0" class="list-group mt-3">

    <li v-for="place in places" 
      class="list-group-item list-group-item-action"
      :class="{ 'active': place.id === activePlace }"
      :key="place.id" 
      @click="onPlaceClicked(place)"
    >
      <h5>{{ place.text }}</h5>
      <p>{{ place.place_name }}</p>
      <div align="right">
        <button 
          class="btn btn-sm"
          :class="place.id !== activePlace ? 'btn-outline-primary': 'btn-outline-light'"
          @click.self="getRouteDirections(place)"
        >
          Directions
        </button>
      </div>
    </li>

  </ul>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue'
  import { usePlaces, useMap } from '@/composables'
  import { Feature } from '@/interfaces/places'

  const { isLoadingPlaces, places, userLocation } = usePlaces()
  const { map, setPlaceMarkers, getRouteBetweenPoints } = useMap()
  const activePlace = ref('')

  watch(places, (newPlaces) => {
    activePlace.value = ''
    setPlaceMarkers(newPlaces) // convert in markers
  })

  const onPlaceClicked = (place: Feature) => { 
    activePlace.value = place.id
    const [ lng, lat ] = place.center

    map.value?.flyTo({
      center: [ lng, lat ],
      zoom: 18
    })
  }

  const getRouteDirections = (place: Feature) => { 
    if (!userLocation.value) return
      
    const [ lng, lat ] = place.center
    const [ startLng, startLat ] = userLocation.value

    const start: [number, number] = [ startLng, startLat ]
    const end: [number, number] = [ lng, lat ] 

    getRouteBetweenPoints(start, end)
  }

</script>

<style lang="css" scoped>
li {
  cursor: pointer;
}

h5 {
  font-size: 15px !important;
}

p {
  font-size: 10px;
}
</style>
