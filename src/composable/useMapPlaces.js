import { computed, reactive, ref } from "vue"
import useNotification from "@/composable/useNotification"

const places = reactive([
  {
    id: 1,
    name: 'Trzęsacz',
    geolocation: [54.075901, 14.992305],
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque est explicabo iure laborum necessitatibus nulla perferendis praesentium provident quod, sapiente unde ut voluptatum? A dignissimos eius maxime pariatur velit? Doloribus?',
    visited: false,
    favourite: false,
    images: [
      'https://ocdn.eu/pulscms-transforms/1/m3Fk9kpTURBXy82OGI1ZWEzMjYwY2Y3OGI3NmY2NDI2MGU3ZDAyY2JmNS5qcGeSlQLNA8AAwsOVAgDNA8DCw94AAaEwBQ'
    ]
  },
  {
    id: 2,
    name: 'Pojezierze Drawskie',
    geolocation: [53.5740035,16.1422275],
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque est explicabo iure laborum necessitatibus nulla perferendis praesentium provident quod, sapiente unde ut voluptatum? A dignissimos eius maxime pariatur velit? Doloribus?',
    visited: true,
    favourite: false,
    images: [
      'https://ocdn.eu/pulscms-transforms/1/eDXk9kqTURBXy81Mzk5YmVmNGY2NjQ5NjQ1YjJkM2YzNWU3ZTE1MjkzZS5qcGVnkpUCzQPAAMLDlQIAzQPAwsPeAAGhMAU'
    ]
  },
  {
    id: 3,
    name: 'Jura Krakowsko-Częstochowska',
    geolocation: [50.2065614,19.8289439],
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque est explicabo iure laborum necessitatibus nulla perferendis praesentium provident quod, sapiente unde ut voluptatum? A dignissimos eius maxime pariatur velit? Doloribus?',
    visited: true,
    favourite: true,
    images: [
      'https://ocdn.eu/pulscms-transforms/1/WMPk9kpTURBXy9kZjMxZmE2NzYwZGZkYjY1YTIwZTE2MjdiY2E4YTBkYy5qcGeSlQLNA8AAwsOVAgDNA8DCw94AAaEwBQ'
    ]
  }
])

const editedPlace = ref(null)

export default function useMapPlaces() {
  const { success, error } = useNotification()

  const changeFavourite = (placeId, value) => {
    const placeIndex = places.findIndex(({ id }) => id === placeId)
    if (placeIndex < 0) error('Coś poszło nie tak!')

    places[placeIndex].favourite = !value
    success('Pomyślnie zaaktualizowano wartość!')
  }

  const changeVisited = (placeId, value) => {
    const placeIndex = places.findIndex(({ id }) => id === placeId)
    if (placeIndex < 0) error('Coś poszło nie tak!')

    places[placeIndex].visited = !value
    success('Pomyślnie zaaktualizowano wartość!')
  }

  // Edit / Create place
  const isPlaceEdited = computed(() => Boolean(editedPlace.value))
  const save = () => {

  }

  return {
    places,

    editedPlace,
    isPlaceEdited,
    save,

    changeFavourite,
    changeVisited
  }
}
