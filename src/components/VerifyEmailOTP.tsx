import { useDispatch, useSelector } from 'react-redux'
import {
  useSendVerificationEmailMutation,
  useVerifyEmailMutation,
} from '../redux/auth/authApiSlice'
import { useEffect, useState } from 'react'
import ErrorAlert from './UI/ErrorAlert.tsx'
import { useNavigate } from 'react-router'
import OTPInput from './UI/OTPInput.tsx'
import EditEmail from './EditEmail.tsx'
import { selectCurrentUser, setUser } from '../redux/user/userSlice.ts'

const VerifyEmailOTP = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const { email } = useSelector(selectCurrentUser)!

  const [sendToEmailReq] = useSendVerificationEmailMutation()
  const [verifyEmailReq] = useVerifyEmailMutation()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    resendLink()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const verify = async (otpCode: string) => {
    verifyEmailReq({
      email: email,
      otp: otpCode,
    })
      .unwrap()
      .then(() => {
        dispatch(setUser({ isEmailVerified: true, status: 'email_verified' }))
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

  const resendLink = async () => {
    sendToEmailReq({ email })
      .unwrap()
      .then()
      .catch((error) => {
        if (error.status == 'FETCH_ERROR') {
          setErrorMessage('Network error')
        } else {
          setErrorMessage(error.data.message)
        }
      })
  }
  return (
    <>
      <EditEmail />
      {errorMessage && (
        <ErrorAlert description={errorMessage} setError={setErrorMessage} />
      )}
      <OTPInput verify={verify} resendLink={resendLink} />
    </>
  )
}
export default VerifyEmailOTP
