import { computed, onMounted } from 'vue'
import { usePlacesStore } from '@/stores/placesStore'

export const usePlaces = () => {
  const placesStore = usePlacesStore()

  // cuando se monta el composition function
  onMounted(() => {
    if (!placesStore.isUserLocationReady) {
      return placesStore.setLongitudeLatitude()
    }
  })

  return {
    // State
    isLoading: computed(() => placesStore.isLoading),
    userLocation: computed(() => placesStore.userLocation),

    // Getters
    isUserLocationReady: computed<boolean>(() => placesStore.isUserLocationReady),
    
    // Actions
    // searchPlacesByterm: ( query = '') => store.dispatch('places/searchPlacesByterm', query),

    // Mutations
  }
}