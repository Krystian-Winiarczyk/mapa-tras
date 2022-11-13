import { onBeforeMount, ref } from "vue"

export default function useMap() {
  const mapUrl = ref('https://tile.jawg.io/470c3ef0-9903-4e46-a5f9-222fea6f9acc/{z}/{x}/{y}{r}.png?access-token=NNng8V1bQq9y8jqMam1VUhpJHYiz9lZ67Gmi0uLJzP8iUFBjdutCwL3IJc65Eypw')
  const zoom = ref(7)
  const currentPoint = ref([0, 0])

  onBeforeMount(() => {
    // Get current user geolocation
    navigator.geolocation.getCurrentPosition(pos => {
      currentPoint.value = [pos.coords.latitude, pos.coords.longitude]
    }, error => {
      // Set default geolocation on error
      currentPoint.value = [52.22977, 21.01178]
    })
  })

  return {
    mapUrl,
    zoom,
    currentPoint
  }
}
