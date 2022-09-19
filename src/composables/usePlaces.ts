import { /*computed,*/ onMounted } from 'vue'
import { usePlacesStore } from '@/stores/placesStore'

export const usePlaces = () => {
  const placesStore = usePlacesStore()

  // cuando se monta el composition function
  onMounted(() => {
    if (!placesStore.isUserLocationReady) {
      return placesStore.setLongitudeLatitude()
    }
    console.log('nfoi')
  })

  // return {
  //   // State
  //   // isLoading: computed(() => store.state.places.isLoading),
  //   // userLocation: computed(() => store.state.places.userLocation),

  //   // // Getters
  //   // isUserLocationReady: computed<boolean>(() => store.getters['places/isUserLocationReady']),
    
  //   // // Actions
  //   // searchPlacesByterm: ( query = '') => store.dispatch('places/searchPlacesByterm', query),

  //   // Mutations
  // }
}