import { useEffect, useState } from 'react'
// import { getToken, messaging } from '../../firebaseConfig'
import { isSupported } from 'firebase/messaging'
import { initializeApp } from 'firebase/app'
import { getMessaging, getToken } from 'firebase/messaging'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIRE_BASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIRE_BASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIRE_BASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIRE_BASE_APP_ID,
  measurementId: import.meta.env.VITE_FIRE_BASE_MEASUREMENT_ID,
}

export const useDeviceId = () => {
  const app = initializeApp(firebaseConfig)
  const [notificationToken, setNotificationToken] = useState('')
  const [isSupportedBrowser, setIsSupportedBrowser] = useState(false)
  isSupported().then((result) => {
    setIsSupportedBrowser(result)
  })

  const requestPermission = () => {
    isSupported().then((result) => {
      setIsSupportedBrowser(result)
      console.log('Requesting permission...')
      if (!isSupportedBrowser) return
      const messaging = getMessaging(app)
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          return getToken(messaging, {
            vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
          })
            .then((currentToken) => {
              if (currentToken) {
                console.log('Token: ', currentToken)
                setNotificationToken(currentToken)
              } else {
                alert(
                  'No registration token available. Request permission to generate one.',
                )
              }
            })
            .catch((err) => {
              console.log('An error occurred while retrieving token. ', err)
            })
        }
      })
    })
  }

  useEffect(() => {
    if (!('Notification' in window)) {
      alert('This browser does not support desktop notification')
      return
    }

    requestPermission()
  }, [isSupportedBrowser])
  return { notificationToken, requestPermission }
}
