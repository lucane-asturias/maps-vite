import { defineStore } from 'pinia'
import Mapboxgl from 'mapbox-gl'
import { directionsApi } from '@/apis'
import { Feature } from '@/interfaces/places'
import { DirectionsResponse } from '@/interfaces/directions'

export interface MapState {
  map?: Mapboxgl.Map
  markers: Mapboxgl.Marker[]
  distance?: number
  duration?: number
  hours?: number
  minutes?: number
}

export type LngLat = [ number, number ]

export const useMapStore = defineStore('mapStore', {
  state: () => ({
    map: undefined,
    markers: [],
    distance: undefined,
    duration: undefined,
    hours: undefined,
    minutes: undefined
  } as MapState),
  actions: {
    setMap(mapPayload: Mapboxgl.Map) {
      this.map = mapPayload
    },
    setPlaceMarkers(placesPayload: Feature[]) {
      // Remove markers
      this.markers.forEach(marker => marker.remove())
      this.markers = []

      if (!this.map) return
      // Create markers
      for (const place of placesPayload) {
        const [ lng, lat ] = place.center

        const popup = new Mapboxgl.Popup({ offset: [0, -25] })
          .setLngLat([ lng, lat ])
          .setHTML(`
            <h4>${ place.text }</h4>
            <p>${ place.place_name }</p
          `)

        const marker = new Mapboxgl.Marker({ scale: 0.8 })
          .setLngLat([ lng, lat ])
          .setPopup(popup)
          .addTo(this.map)

        this.markers.push(marker)
      }

      // Clear Polyline
      if (this.map.getLayer('RouteString')) {
        this.map.removeLayer('RouteString')
        this.map.removeSource('PolylineString')
        this.distance = undefined
        this.duration = undefined
        this.hours = undefined
        this.minutes = undefined
      }
    },
    setDistanceDuration({ distance, duration }: { distance: number, duration: number }) {
      console.log('disntace', distance)
      console.log('duration', duration)
      let kms = distance / 1000
          kms = Math.round(kms * 100)
          kms /= 100 // convert meter in kilometer

      this.distance = kms

      let minutesPerHour = Math.floor(duration / 60)
      let resultHours = minutesPerHour / 60
      let resultMinutes = resultHours - Math.floor(resultHours)
          resultMinutes *= 60

      const convertedHours = Math.floor(resultHours)
      const convertedMinutes = Math.round(resultMinutes)

      this.hours = convertedHours
      this.minutes = convertedMinutes
    },
    async getRouteBetweenPoints({ start, end }: { start: LngLat, end: LngLat }) {
      const response = await directionsApi.get<DirectionsResponse>(`${ start.join(',') };${ end.join(',') }`)
      console.log('.routes[0].geometry.coordinates', response.data)

      this.setDistanceDuration({
        distance: response.data.routes[0].distance,
        duration: response.data.routes[0].duration
      })   

      this.setRoutePolyline(response.data.routes[0].geometry.coordinates)
    },
    setRoutePolyline(coords: number[][]) {
      const start = coords[0] // initial point
      const end   = coords[ coords.length - 1 ] // end/final point

      // Definir los bounds 
      const bounds = new Mapboxgl.LngLatBounds(
        [start[0], start[1]],
        [start[0], start[1]],
      )
      
      // Agregamos cada punto al bounds
      for (const coord of coords) {
        const newCoord: [number, number] = [coord[0], coord[1]] // lat and lng
        bounds.extend( newCoord ) // expande os delimitadores (bounds) para incluir novas coordenadas
      }
      // Center these bounds in the viewport
      this.map?.fitBounds( bounds, {
        padding: 200 // The amount of padding in pixels to add to the given bounds
      })

      /* Trace Polyline - source: A map/layer source states which data the map should display. 
      A source provides map data that MapboxGL JS can use to render a visual representation of that data. */
      const soucerData: Mapboxgl.AnySourceData = {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coords
            }
          }]
        }
      }

      if (this.map?.getLayer('RouteString')) {
        this.map.removeLayer('RouteString')
        this.map.removeSource('PolylineString')
      }

      this.map?.addSource('PolylineString', soucerData ) // A source containing GeoJSON

      this.map?.addLayer({
        id: 'RouteString',
        type: 'line', // A stroked line
        source: 'PolylineString', // References a source id that's already been defined
        layout: {
          'line-cap': 'round', // line end
          'line-join': 'round' // line when joining
        },
        paint: {
          'line-color': 'black',
          'line-width': 3
        }
      })
    }
  },
  getters: {
    isMapReady: (state) => {
      return !!state.map
    }
  }
})