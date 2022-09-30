<template>
  <button v-if="isBtnReady"
    class="btn btn-primary"
    @click="onLocationClicked">
    Ir a minha localização
  </button>
</template>

<script setup lang="ts">
  import { defineComponent, computed, watch } from 'vue'
  import { usePlaces, useMap } from '@/composables'

  const { userLocation, isUserLocationReady } = usePlaces() // la ubicación
  const { map, isMapReady } = useMap() // el mapa

  const isBtnReady = computed<boolean>(() => isUserLocationReady.value && isMapReady.value)

  const onLocationClicked = () => {
    map.value?.flyTo({
      center: userLocation.value,
      zoom: 13,
      essential: true // this animation is considered essential with respect to prefers-reduced-motion
    })
  }

</script>

<style scoped>
button {
  position: fixed;
  top: 30px;
  right: 60px;
}
</style>
