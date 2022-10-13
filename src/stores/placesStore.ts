import { defineStore } from 'pinia'
import { searchApi } from '@/apis'
import { Feature, PlacesResponse } from '@/interfaces/places'

export type PlacesState = {
  isLoading: boolean
  userLocation?: [number, number] // lng, lat
  isLoadingPlaces: boolean
  places: Feature[]
}

export const usePlacesStore = defineStore('placesStore', {
  state: () => ({
    isLoading: true,
    userLocation: undefined,
    isLoadingPlaces: false,
    places: []
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
    async searchPlacesByTerm(queryPayload: string): Promise<Feature[]> {
      if (!this.userLocation) throw new Error('There is no user location')
      if (queryPayload.length === 0) { 
        this.setPlaces([])
        return []
      }

      this.isLoadingPlaces = true // estado de carga

      const response = await searchApi.get<PlacesResponse>(`/${queryPayload}.json`, {
        params: {
          proximity: this.userLocation?.join(',')
        }
      })
      console.log('response', response.data)
      this.setPlaces(response.data.features)
      return response.data.features
    },
    setPlaces(payloadPlaces: Feature[]) {
      this.isLoadingPlaces = false
      this.places = payloadPlaces
    }
  },
  getters: {
    isUserLocationReady: (state) => {
      return !!state.userLocation
    }
  }
})