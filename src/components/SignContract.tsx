import { WarningOutlined } from '@ant-design/icons'
import { Button, Flex, Modal, Space } from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import sign from '../assets/icons/Sign.svg'
import { UserStatus } from '../model/userModel'
import { useSendPhoneOtpMutation } from '../redux/auth/authApiSlice'
import {
  Contract,
  useSignContractMutation,
} from '../redux/contract/contractApiSlice'
import { selectCurrentUser, setUser } from '../redux/user/userSlice'
import ErrorAlert from './UI/ErrorAlert'
import OTPInput from './UI/OTPInput'
import Spinner from './UI/Spinner'

type SignContractProps = {
  isRead: boolean
  contract: Contract
}
const SignContract = ({ isRead, contract }: SignContractProps) => {
  const [open, setOpen] = useState(false)
  const [isConfirmSign, setIsConfirmSign] = useState(false)

  const [errorMessage, setErrorMessage] = useState('')

  const currentUser = useSelector(selectCurrentUser)!

  const [sendOTPReq, { isLoading }] = useSendPhoneOtpMutation()
  const [signContractReq, { isLoading: isSigning }] = useSignContractMutation()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { t } = useTranslation()

  const sendOTP = async () => {
    await sendOTPReq({
      phone: currentUser.phoneNumber,
    })
      .unwrap()
      .then(() => {
        setOpen(false)
        setIsConfirmSign(true)
      })
      .finally(() => {
        setOpen(false)
        setIsConfirmSign(true)
      })
    // .catch((error) => {
    //   if (error.status == 'FETCH_ERROR') {
    //     setErrorMessage('Network error')
    //   } else {
    //     setErrorMessage(error.data.message)
    //   }
    // })
  }

  const signContract = async (otp: string) => {
    await navigator.geolocation.getCurrentPosition((position) => {
      signContractReq({
        contractId: contract.id,
        currentLocation: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
        deviceId: currentUser.deviceId,
        otp,
      })
        .unwrap()
        .then(() => {
          if (currentUser.status === 'pending_sign') {
            dispatch(
              setUser({
                user: { ...currentUser, status: 'active' },
                tokens: {
                  accessToken: currentUser.accessToken,
                  refreshToken: currentUser.refreshToken,
                },
              }),
            )
          }
          setIsConfirmSign(false)
          if (currentUser?.status === UserStatus.pending_sign) {
            dispatch(setUser({ status: UserStatus.active }))
            navigate('/profile')
          }
        })
        .catch((error) => {
          console.log(error.data.message)
          setErrorMessage(error.data.message)
        })
    })
  }
  return (
    <>
      <Button
        block
        icon={<img src={sign} />}
        className="bg-[#9EE6D0] rounded-none h-12 font-semibold text-lg"
        disabled={!isRead}
        onClick={() => setOpen(true)}
      >
        {t('sign')}
      </Button>
      <Modal
        open={open}
        footer={null}
        styles={{
          body: {
            fontSize: '16px',
            fontWeight: '400',
            textAlign: 'center',
            padding: '32px 24px',
          },
        }}
        onCancel={() => setOpen(false)}
        centered
        destroyOnClose={true}
      >
        <Flex vertical={true} justify="center" align="center" gap={25}>
          <WarningOutlined className="text-xl" />
          <h1 className="text-gray-700 text-xl font-bold ml-2">
            {t('Before signing, read carefully')}
          </h1>
          {errorMessage && (
            <ErrorAlert description={errorMessage} setError={setErrorMessage} />
          )}
          <p className="text-center text-gray-900 font-normal text-lg">
            {t(
              'Please review the entire contract before signing. Your signature indicates your agreement with the terms. If you have questions, seek clarification. Thank you.',
            )}
          </p>
          <Button
            className="bg-[#0A6046] text-white rounded-none h-11 text-lg font-semibold"
            onClick={sendOTP}
            block
            loading={isLoading}
          >
            {t('I understand')}
          </Button>
        </Flex>
      </Modal>
      <Modal
        title="Sign Contract"
        open={isConfirmSign}
        footer={null}
        onCancel={() => setIsConfirmSign(false)}
        centered
        styles={{
          body: {
            fontSize: '16px',
            fontWeight: '400',
            padding: '32px 24px',
          },
          header: {
            fontSize: '20px',
            fontWeight: '700',
            padding: '16px 16px 0 16px',
            textAlign: 'center',
          },
        }}
        destroyOnClose={true}
        maskClosable={false}
      >
        <Flex vertical={true} className="text-gray-900">
          {errorMessage && (
            <ErrorAlert description={errorMessage} setError={setErrorMessage} />
          )}
          {isSigning ? (
            <Spinner text="Signing contract..." />
          ) : (
            <>
              <Space direction="vertical" align="start">
                <p>{t('You are about to sign the contract titled:')}</p>
                <p className="font-semibold">{contract.title}</p>
                <p>
                  {t('We sent an OTP to your phone to confirm your signature.')}
                </p>
              </Space>
              <Flex align="center" justify="center">
                <OTPInput verify={signContract} resendLink={sendOTP} />
              </Flex>
            </>
          )}
        </Flex>
      </Modal>
    </>
  )
}
export default SignContract
