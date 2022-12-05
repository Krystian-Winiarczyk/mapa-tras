import { computed, onBeforeMount, onMounted, ref, watch } from "vue"
import useMapPlaces from "@/composable/useMapPlaces"

const defaultCenterPoint = [52.159445, 19.457216]
const currentPoint = ref(defaultCenterPoint)

export default function useMap(init = false) {
  const { editedPlace } = useMapPlaces()

  const mapUrl = ref('https://tile.jawg.io/470c3ef0-9903-4e46-a5f9-222fea6f9acc/{z}/{x}/{y}{r}.png?access-token=NNng8V1bQq9y8jqMam1VUhpJHYiz9lZ67Gmi0uLJzP8iUFBjdutCwL3IJc65Eypw')
  const zoom = ref(7)

  const getCurrentPoint = computed(() => currentPoint.value)
  const loadCurrentPoint = () => {
    // Get current user geolocation
    navigator.geolocation.getCurrentPosition(pos => {
      currentPoint.value = [pos.coords.latitude, pos.coords.longitude]
    }, error => {
      console.log('Error')
      // Set default geolocation on error
      currentPoint.value = defaultCenterPoint
    })
  }

  watch(editedPlace, newValue => {
    if (newValue && newValue !== true) currentPoint.value = newValue.geolocation
    else currentPoint.value = getCurrentPoint.value
  })

  init && onBeforeMount(() => {
    loadCurrentPoint()
  })

  init && onMounted(() => {
    loadCurrentPoint()
  })

  return {
    defaultCenterPoint,
    mapUrl,
    zoom,
    currentPoint,
    getCurrentPoint
  }
}
