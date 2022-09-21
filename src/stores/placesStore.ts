import { defineStore } from 'pinia'
import { auth } from "@/utils/firebase";

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
    setLongitudeLatitude(payload) {
      const success = ({ coords }) => {
        console.log('coords', coords)
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