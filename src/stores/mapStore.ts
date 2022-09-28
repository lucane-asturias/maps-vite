import { defineStore } from 'pinia'
import Mapboxgl from 'mapbox-gl'

export type MapState = {
  map?: Mapboxgl.Map
  markers: Mapboxgl.Marker[]
  distance?: number
  duration?: number
}

export const useMapStore = defineStore('mapStore', {
  state: () => ({
    map: undefined,
    markers: [],
    distance: undefined,
    duration: undefined
  } as MapState),
  actions: {
    setMap(mapPayload: Mapboxgl.Map) {
      this.map = mapPayload
    },
  },
  getters: {
    isMapReady: (state) => {
      return !!state.map
    }
  }
})