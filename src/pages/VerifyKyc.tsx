import { useState } from 'react'

import { Button, Flex, Typography } from 'antd'
import NationalId from '../components/kyc/NationalId'

import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import ErrorAlert from '../components/UI/ErrorAlert'
import Spinner from '../components/UI/Spinner'
import DashboardLayout from '../layout/DashboardLayout'
import { useInitQuery } from '../redux/kyc/kycApiSlice'
import { selectCurrentUser } from '../redux/user/userSlice'

const VerifyKyc = () => {
  const [errorMessage, setErrorMessage] = useState('')
  // const kycState = localStorage.getItem('kycState')

  const { isLoading: isInit } = useInitQuery(undefined, {
    // skip: kycState !== 'init',
    skip: true,
  })

  const currentUser = useSelector(selectCurrentUser)
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
          {t('welcome')} {currentUser?.userName}
        </p>
        {/* <h1 className="font-bold text-gray-700 text-3xl">{t('note')}</h1> */}
      </Flex>
      <Flex
        vertical={true}
        justify="center"
        align="center"
        className="shadow-custom w-fit mx-auto p-5 mt-5"
        gap={20}
      >
        <Typography.Text>
          {t('Please verify your identity On our App')}
        </Typography.Text>
        <Button
          block
          className="bg-[#9EE6D0] text-[#063D2D] rounded-none h-11 mt-5 font-semibold "
          onClick={() => {
            localStorage.removeItem('user')
            localStorage.removeItem('notificationToken')
            window.location.reload()
          }}
          type="primary"
        >
          {t('Confirm')}
        </Button>{' '}
      </Flex>
    </DashboardLayout>
  )

  const content = isInit ? (
    <Flex
      justify="center"
      align="center"
      className="w-[200px] min-h-[150px] bg-white mt-12 mx-auto"
    >
      <Spinner text="Loading..." />
    </Flex>
  ) : errorMessage !== '' ? (
    <ErrorAlert description={errorMessage} setError={setErrorMessage} />
  ) : (
    <NationalId />
  )

  return <DashboardLayout page="verify">{content}</DashboardLayout>
}

export default VerifyKyc
