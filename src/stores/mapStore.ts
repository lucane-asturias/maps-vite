import { defineStore } from 'pinia'
import Mapboxgl from 'mapbox-gl'
import { Feature } from '@/interfaces/places'

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
    setPlaceMarkers(placesPayload: Feature[]) {
      // Remove markers
      this.markers.forEach(marker => marker.remove())

      if (!this.map) return

      for (const place of placesPayload) {
        const [ lng, lat ] = place.center

        const popup = new Mapboxgl.Popup({ offset: [0, -25] })
          .setLngLat([ lng, lat ])
          .setHTML(`
            <h4>${ place.text }</h4>
            <p>${ place.place_name }</p
          `)

        const marker = new Mapboxgl.Marker()
          .setLngLat([ lng, lat ])
          .setPopup(popup)
          .addTo(this.map)
        }

        this.markers.push(marker)
      }

  },
  getters: {
    isMapReady: (state) => {
      return !!state.map
    }
  }
})