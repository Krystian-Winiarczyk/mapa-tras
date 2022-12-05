import { ref } from "vue"
import { collection, onSnapshot } from "firebase/firestore"
import { store } from "@/libs/firebase"

import useAuth from "@/composable/useAuth"

const showPlaces = ref(false)
const settingsModal = ref(false)
const groups = ref([])

export default function useSettings(init = false) {
  const { currentUser } = useAuth()

  const getSettingsCollectionRef = (settingKey = 'groups') => collection(store, 'users', currentUser.value.uid, settingKey)
  const getData = async () => {
    const unsubGroups = onSnapshot(getSettingsCollectionRef('groups'), snap => {
      if (!snap.empty) {
        groups.value = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      }
      else groups.value = []

      console.log(groups.value)
    })
  }

  init && getData()

  return {
    settingsModal,
    showPlaces,
    groups
  }
}
