import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import translationsEn from './locale/en.json'
import translationsAr from './locale/ar.json'

const resources = {
  en: {
    translation: translationsEn,
  },
  ar: {
    translation: translationsAr,
  },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: resources,
    lng: localStorage.getItem('i18nextLng') || 'ar',

    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  })

export default i18n
