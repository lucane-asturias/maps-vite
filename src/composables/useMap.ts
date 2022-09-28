import { computed, onMounted } from 'vue'
import { useMapStore, MapState } from '@/stores/mapStore'
import Mapboxgl from 'mapbox-gl'

export const useMap = () => {
  const mapStore = useMapStore()

  return {
    // State
    map: computed(() => mapStore.map),

    // Mutations
    setMap: (map: Mapboxgl.Map) => mapStore.setMap(map)
  }
}