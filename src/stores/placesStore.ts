import { defineStore } from 'pinia'

export type PlacesState = {
  isLoading: boolean
  userLocation?: [number, number] // lng, lat
}

export const usePlacesStore = defineStore('placesStore', {
  state: () => ({
    isLoading: true,
    userLocation: undefined
  } as PlacesState),
  actions: {
    setLongitudeLatitude() {
      const success = ({ coords }) => {
        const { longitude, latitude } = coords
        this.userLocation = [ longitude, latitude ]
      }
      const error = (err) => {
        console.log(err);
        console.warn(`ERROR(${err.code}): ${err.message}`);
        throw new Error('No geolocation :(')
      }
      navigator.geolocation.getCurrentPosition(success, error)
      
      this.isLoading = false
    },
  },
  getters: {
    isUserLocationReady: (state) => {
      return !!state.userLocation
    }
  }
})