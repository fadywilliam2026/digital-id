import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { selectLanguage } from '../redux/user/userSlice'
import i18n from '../i18n'

export const useLanguage = () => {
  const language = useSelector(selectLanguage)
  useEffect(() => {
    document.body.dir = i18n.dir(language)
  }, [language])
}
