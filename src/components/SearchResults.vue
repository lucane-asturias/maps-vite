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
        >
          Directions
        </button>
      </div>
    </li>

  </ul>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { usePlaces, useMap } from '@/composables'
  import { Feature } from '@/interfaces/places'

  const { isLoadingPlaces, places } = usePlaces()
  const { map } = useMap()
  const activePlace = ref('')

  const onPlaceClicked = (place: Feature) => { 
    activePlace.value = place.id
    const [ lng, lat ] = place.center

    map.value?.flyTo({
      center: [ lng, lat ],
      zoom: 18
    })
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
