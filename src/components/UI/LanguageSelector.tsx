import LanguagesIcon from '../../assets/icons/LanguagesIcon'
import { Flex, Select, Space } from 'antd'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser, setLanguage } from '../../redux/user/userSlice'
import {
  useUserConfigMutation,
  useGetUserConfigQuery,
} from '../../redux/user/userApiSlice'

const options = [
  { value: 'en', label: 'English' },
  { value: 'ar', label: 'Arabic' },
]

const optionsShort = [
  { value: 'en', label: 'EN' },
  { value: 'ar', label: 'AR' },
]

interface Props {
  theme: string
  fill: string
}
const LanguageSelector = ({ theme, fill }: Props) => {
  const user = useSelector(selectCurrentUser)
  useGetUserConfigQuery(null, { skip: !user })
  const [userConfigReq] = useUserConfigMutation()

  const dispatch = useDispatch()
  const { i18n } = useTranslation()
  const handleLanguageChange = (value: string) => {
    if (user) userConfigReq({ appLanguage: value })
    dispatch(setLanguage(value))
    i18n.changeLanguage(value)
  }

  return (
    <Flex>
      <Space
        className={`my-select-container with-icon select-input-${theme}  relative`}
      >
        <Space className="absolute z-10 top-2 left-4 text-center">
          <LanguagesIcon fill={fill} />
        </Space>
        <Select
          defaultValue={i18n.language}
          onChange={handleLanguageChange}
          options={window.innerWidth >= 640 ? options : optionsShort}
          className="options-select"
        />
      </Space>
    </Flex>
  )
}

export default LanguageSelector
