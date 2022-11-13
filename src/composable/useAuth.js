import { ref } from "vue"
import { auth } from '@/libs/firebase'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { useRouter } from "vue-router"

const currentUser = ref(null)

export default function useAuth(init = false) {
  const router = useRouter()

  const login = async (email, password) => {
    const response = await signInWithEmailAndPassword(auth, email, password)
    if (response) {
      currentUser.value = response.user
      await router.push({ name: 'map' })
    } else {
      throw new Error('login failed')
    }
  }

  const logout = async () => {
    await signOut(auth)
    currentUser.value = null
  }

  const fetchUser = () => {
    auth.onAuthStateChanged(async user => {
      if (user) currentUser.value = user
      else await router.push({ name: 'login' })
    })
  }
  init && fetchUser()

  return {
    currentUser,

    logout,
    login
  }
}
