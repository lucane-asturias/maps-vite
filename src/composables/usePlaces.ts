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
    isLoading: computed<boolean>(() => placesStore.isLoading),
    userLocation: computed(() => placesStore.userLocation),
    places: computed(() => placesStore.places),
    isLoadingPlaces: computed<boolean>(() => placesStore.isLoadingPlaces),

    // Getters
    isUserLocationReady: computed<boolean>(() => placesStore.isUserLocationReady),
    
    // Actions
    searchPlacesByTerm: ( query = '') => placesStore.searchPlacesByTerm(query)
  }
}