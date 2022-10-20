import { computed, onMounted } from 'vue'
import { useMapStore, MapState, LngLat } from '@/stores/mapStore'
import { Feature } from '@/interfaces/places'
import Mapboxgl from 'mapbox-gl'

export const useMap = () => {
  const mapStore = useMapStore()

  return {
    // State
    map: computed(() => mapStore.map),
    distance: computed(() => mapStore.distance),
    hours: computed(() => mapStore.hours),
    minutes: computed(() => mapStore.minutes),

    // Getters
    isMapReady: computed<boolean>(() => mapStore.isMapReady),

    // Actions
    setMap: (map: Mapboxgl.Map) => mapStore.setMap(map),
    setPlaceMarkers: (places: Feature[]) => mapStore.setPlaceMarkers(places),
    getRouteBetweenPoints: (start: LngLat, end: LngLat) => mapStore.getRouteBetweenPoints({ start, end })
  }
}