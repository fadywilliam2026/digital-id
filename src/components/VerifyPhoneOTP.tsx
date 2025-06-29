import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { UserStatus } from '../model/userModel'
import {
  useSendPhoneOtpMutation,
  useVerifyOtpMutation,
} from '../redux/auth/authApiSlice'
import { selectCurrentUser, setUser } from '../redux/user/userSlice'
import EditPhoneNumber from './EditPhoneNumber'
import ErrorAlert from './UI/ErrorAlert'
import OTPInput from './UI/OTPInput'

const VerifyPhoneOTP = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const { phoneNumber } = useSelector(selectCurrentUser)!

  const [sendOTPReq] = useSendPhoneOtpMutation()
  const [verifyPhoneReq] = useVerifyOtpMutation()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    resendLink()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const verify = (otp: string) => {
    verifyPhoneReq({ phone: phoneNumber, otp })
      .unwrap()
      .then(() => {
        dispatch(
          setUser({ isPhoneVerified: true, status: UserStatus.phone_verified }),
        )
        navigate('/verify')
      })
      .catch((error) => {
        if (error.status == 'FETCH_ERROR') {
          setErrorMessage('Network error')
        } else {
          setErrorMessage(error.data.message)
        }
      })
  }

  const resendLink = () => {
    sendOTPReq({ phone: phoneNumber }).unwrap().then()
    // .catch((error) => {
    //   if (error.status == 'FETCH_ERROR') {
    //     setErrorMessage('Network error')
    //   } else {
    //     setErrorMessage(error.data.message)
    //   }
    // })
  }

  return (
    <>
      <EditPhoneNumber />
      {errorMessage && (
        <ErrorAlert description={errorMessage} setError={setErrorMessage} />
      )}
      <OTPInput verify={verify} resendLink={resendLink} />
    </>
  )
}
export default VerifyPhoneOTP
