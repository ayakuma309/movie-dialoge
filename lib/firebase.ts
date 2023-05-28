import { initializeApp, getApps } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'

import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/firestore'
import "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
if (typeof window !== 'undefined' && getApps().length === 0) {
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: "movie-dialoge-a9de9",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  }

  initializeApp(firebaseConfig)
  getAnalytics()
}
