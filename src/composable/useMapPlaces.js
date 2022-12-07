import { computed, ref } from "vue"
import useNotification from "@/composable/useNotification"
import { store } from '@/libs/firebase'
import { addDoc, setDoc, collection, doc, GeoPoint, onSnapshot, query, where } from 'firebase/firestore'
import useAuth from "@/composable/useAuth"
import { getGeoPoints } from "@/utils"

const places = ref([])

const editedPlace = ref(null)

export default function useMapPlaces(init = false) {
  let subscriber = null
  const { currentUser } = useAuth()
  const { success, error } = useNotification()

  const items = computed(() => places.value)

  // Edit / Create place
  const isPlaceEdited = computed(() => Boolean(editedPlace.value))

  const updatePlace = async (payload = editedPlace.value) => {
    const uid = currentUser.value.uid
    const id = payload?.id
    const collectionRef = collection(store, 'users', uid, 'trips')

    const item = { ...payload }
    const points = getGeoPoints(item.geolocation)
    if (!points) return

    item.geolocation = new GeoPoint(points[0], points[1])

    try {
      if (Boolean(id)) {
        delete item.id
        const docRef = doc(store, 'users', uid, 'trips', id)
        await setDoc(docRef, item)
        success('Pomyślnie zaaktualizowano!')
      } else {
        const newDocRef = await addDoc(collectionRef, item)
        success('Pomyślnie dodano!')
      }
    } catch (err) {
      error(err?.message || 'Coś poszło nie tak!!')
    } finally {
      editedPlace.value = null
    }
  }

  const getData = async filter => {
    if (subscriber) subscriber()
    console.log('filter', filter)

    const collectionRef = collection(store, 'users', currentUser.value.uid, 'trips')
    const filters = [
      where('visited', '!=', false)
      // where('favourite', '==', true)
    ]
    if (filter?.group) filters.push(where('group.name', '==', filter.group.name))
    if (filter?.isVisited) filters.push(where('visited', '==', true))
    if (filter?.isNotVisited) filters.push(where('visited', '==', false))
    if (filter?.isFavourite) filters.push(where('favourite', '==', true))
    if (filter?.isNotFavourite) filters.push(where('favourite', '==', false))

    const builder = query(collectionRef, ...filters)

    subscriber = onSnapshot(builder, docsSnap => {
      if (!docsSnap.empty) {
        places.value = docsSnap.docs.map(doc => {
          const data = doc.data()
          return { id: doc.id, ...data, geolocation: [data.geolocation?.latitude, data.geolocation?.longitude] }
        })
      } else {
        places.value = []
      }
    })

  }

  init && getData()

  return {
    items,

    editedPlace,
    isPlaceEdited,

    updatePlace,
    getData
  }
}
