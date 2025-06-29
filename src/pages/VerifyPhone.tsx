import { Flex } from 'antd'

import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import DashboardLayout from '../layout/DashboardLayout'
import VerifyPhoneOTP from '../components/VerifyPhoneOTP'
import { selectCurrentUser } from '../redux/user/userSlice'

export const VerifyPhone = () => {
  const { userName } = useSelector(selectCurrentUser)!

  const { t } = useTranslation()

  return (
    <DashboardLayout page="verify">
      <Flex
        className="text-center"
        justify="center"
        align="center"
        vertical={true}
        gap={10}
      >
        <p className="italic my-2 ">
          {t('welcome')} {userName}
        </p>
        <h1 className="font-bold text-gray-700 text-3xl">
          {t('Verify your phone number')}
        </h1>
      </Flex>

      <Flex
        vertical={true}
        justify="center"
        align="center"
        className="shadow-custom w-fit mx-auto p-5 mt-5"
        gap={20}
      >
        <VerifyPhoneOTP />
      </Flex>
    </DashboardLayout>
  )
}
