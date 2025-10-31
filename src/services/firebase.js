import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore'

let db = null

export async function initFirebase() {
  // Try to read config from environment (Vite injects import.meta.env) or local backup file
  const cfg = getFirebaseConfigFromEnv() || await getLocalBackup()
  if (!cfg) return console.warn('Firebase config not found; contacts will fail.')
  const app = initializeApp(cfg)
  db = getFirestore(app)
}

function getFirebaseConfigFromEnv() {
  try {
    return {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID
    }
  } catch (e) {
    return null
  }
}

async function getLocalBackup() {
  try {
    const res = await fetch('/local_config_backup.json')
    if (!res.ok) return null
    return await res.json()
  } catch (e) {
    return null
  }
}

export async function getContacts() {
  if (!db) return []
  const snapshot = await getDocs(collection(db, 'contacts'))
  return snapshot.docs.map(d => d.data())
}

export async function addContactToDb(contact) {
  if (!db) throw new Error('DB not initialized')
  await addDoc(collection(db, 'contacts'), contact)
}

export async function removeContactFromDb(index) {
  if (!db) throw new Error('DB not initialized')
  const snapshot = await getDocs(collection(db, 'contacts'))
  const id = snapshot.docs[index].id
  await deleteDoc(doc(db, 'contacts', id))
}

// backup local não é mais gerado no frontend; use local_config_backup.json na raiz (gitignored)
