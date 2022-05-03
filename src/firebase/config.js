import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyBzUGl9aW_dj43YSU7GVL_1CjJPHaozLlM',
  authDomain: 'photographer-9ee9c.firebaseapp.com',
  projectId: 'photographer-9ee9c',
  storageBucket: 'photographer-9ee9c.appspot.com',
  messagingSenderId: '232738032334',
  appId: '1:232738032334:web:837ddfd59fc39037725e9f',
  measurementId: 'G-FNEBFCR3C5'
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

// timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { projectAuth, projectFirestore, projectStorage, timestamp }
