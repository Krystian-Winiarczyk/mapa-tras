import { initializeApp } from 'firebase/app'

import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAtw3AH3PUdBb1ShmHbRIrUNnyL1ZknwGI",
  authDomain: "mapa-e549a.firebaseapp.com",
  projectId: "mapa-e549a",
  storageBucket: "mapa-e549a.appspot.com",
  messagingSenderId: "446952857706",
  appId: "1:446952857706:web:98a2b4f50cd09bd337aa13",
  measurementId: "G-LVDJGCMY54"
}

const firebaseApp = initializeApp(firebaseConfig)

const auth = getAuth(firebaseApp)

export { auth, firebaseApp }
