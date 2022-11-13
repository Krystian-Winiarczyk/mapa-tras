import { ref } from "vue"

const showPlaces = ref(false)

export default function useSidebar() {
  return {
    showPlaces
  }
}
