/*
      This component will be deleting once the enhancement applied.

*/

import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react'

import { Input, Button, Flex } from 'antd'
import { useSelector } from 'react-redux'

import { useNavigate } from 'react-router'

import {
  useChangePasswordMutation,
  useSendPhoneOtpMutation,
  useSendVerificationEmailMutation,
  useVerifyOtpMutation,
} from '../redux/auth/authApiSlice'
import { useVerifyEmailMutation } from '../redux/auth/authApiSlice'
import ErrorAlert from './UI/ErrorAlert'
import Spinner from './UI/Spinner'
import { useTranslation } from 'react-i18next'
import {
  RejectContractBody,
  useRejectContractMutation,
} from '../redux/contract/contractApiSlice'
import { selectCurrentUser } from '../redux/user/userSlice'

interface OtpInputProps {
  verify: 'phone' | 'email' | 'forgetPassword' | 'contractAction'
  reject?: RejectContractBody
}

const OtpInput: React.FC<OtpInputProps> = ({ verify, reject }) => {
  const { userName } = JSON.parse(localStorage.getItem('user') || '{}')

  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const inputRefs = useRef(Array(6).fill(null))
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0]?.focus()
    }
  }, [])

  const currentUser = useSelector(selectCurrentUser)
  const [errorMessage, setErrorMessage] = useState('')

  const [verifyOtpReq, { isLoading }] = useVerifyOtpMutation()
  const [verifyEmailReq, { isLoading: emailIsLoading }] =
    useVerifyEmailMutation()
  const [changePasswordReq, { isLoading: changePasswordIsLoading }] =
    useChangePasswordMutation()

  const [, setResendLoading] = useState(false)

  const [sendPhoneOtpReq] = useSendPhoneOtpMutation()

  const [resendEmailOtpReq] = useSendVerificationEmailMutation()

  const [rejectContractReq] = useRejectContractMutation()

  const navigate = useNavigate()

  const [timer, setTimer] = useState(90)

  useEffect(() => {
    let countdown: number | undefined
    if (timer > 0) {
      countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1)
      }, 1000)
    }

    return () => {
      clearInterval(countdown)
    }
  }, [timer])

  const resetTimer = () => {
    setTimer(30)
  }
  const handleResendOtp = async () => {
    try {
      setResendLoading(true)
      if (verify === 'phone' || verify === 'contractAction') {
        await sendPhoneOtpReq({ phone: currentUser?.phoneNumber as string })
      } else {
        await resendEmailOtpReq({ email: currentUser?.email as string })
      }
      resetTimer()
    } catch (error) {
      console.error('Error sending OTP:', error)
    } finally {
      setResendLoading(false)
    }
  }
  const { t } = useTranslation()

  const handleInputChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    const newOtp = [...otp]
    newOtp[index] = e.target.value
    setOtp(newOtp)

    // Focus on the next input
    if (e.target.value !== '' && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const verifyPhone = async (otpCode: string) => {
    verifyOtpReq({
      phone: currentUser?.phoneNumber as string,
      otp: otpCode,
    })
      .unwrap()
      .then(() => {
        const updatedUser = {
          ...currentUser,
          isPhoneVerified: true,
          status: 'phone_verified',
        }
        localStorage.setItem('user', JSON.stringify(updatedUser))
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

  const verifyEmail = async (otpCode: string) => {
    verifyEmailReq({
      email: currentUser?.email as string,
      otp: otpCode,
    })
      .unwrap()
      .then(() => {
        const updatedUser = {
          ...currentUser,
          isEmailVerified: true,
          status: 'email_verified',
        }
        localStorage.setItem('user', JSON.stringify(updatedUser))
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

  const verifyForgetPasswordbyEmail = async (otpCode: string) => {
    changePasswordReq({
      newPassword: localStorage.getItem('userPassword') as string,
      email: localStorage.getItem('userEmail') as string,
      otp: otpCode,
    })
      .unwrap()
      .then(() => {
        localStorage.removeItem('userPassword')
        localStorage.removeItem('userEmail')
        navigate('/')
      })
      .catch((error) => {
        if (error.status == 'FETCH_ERROR') {
          setErrorMessage('Network error')
        } else {
          setErrorMessage(error.data.message)
        }
      })

    console.log(verify)
  }

  const otpVerify = async () => {
    console.log(otp)
    const otpCode = otp.join('')
    console.log('verify is: ', verify)
    if (verify === 'email') {
      verifyEmail(otpCode)
    } else if (verify === 'phone') {
      verifyPhone(otpCode)
    } else if (verify === 'forgetPassword') {
      verifyForgetPasswordbyEmail(otpCode)
    } else if (verify === 'contractAction') {
      rejectContractReq({
        contractId: reject?.contractId as number,
        rejectionReason: reject?.rejectionReason as string,
        otp: otpCode,
      })
        .unwrap()
        .then(() => {
          navigate(`/contract/${reject?.contractId}`)
        })
        .catch((error) => {
          if (error.status == 'FETCH_ERROR') {
            setErrorMessage('Network error')
          } else {
            setErrorMessage(error.data.message)
          }
        })
    }
  }

  const detailsContent =
    verify === 'email' ? (
      <p>{currentUser?.email}</p>
    ) : verify === 'phone' ? (
      <p>{currentUser?.phoneNumber}</p>
    ) : verify === 'forgetPassword' ? (
      <p></p>
    ) : null

  return (
    <Flex vertical className="bg-white p-2 sm:p-5 sm:w-fit mx-auto">
      <p className="italic">
        {t('welcome')} {userName}
      </p>
      {isLoading || emailIsLoading || changePasswordIsLoading ? (
        <div className=" mt-5 w-60">
          <Spinner text="Loading..." />
        </div>
      ) : (
        <>
          {errorMessage ? (
            <div className="m-5">
              <ErrorAlert
                description={errorMessage}
                setError={setErrorMessage}
              />
            </div>
          ) : (
            <>
              {verify === 'phone' && (
                <>
                  <h3 className=" text-[#344054] font-bold">
                    {t('verifyPhone')}
                  </h3>
                  <p className="text-[#101828] text-sm">{t('codePhone')}</p>
                </>
              )}

              {verify === 'email' && (
                <>
                  <h3 className=" text-[#344054] font-bold">
                    {t('verifyEmail')}
                  </h3>
                  <p className="text-[#101828] text-sm">{t('codeEmail')}</p>
                </>
              )}
              {verify === 'forgetPassword' && !currentUser && (
                <>
                  <h3 className=" text-[#344054] font-bold">
                    {t('verifyEmail')}
                  </h3>
                  <p>{localStorage.getItem('userEmail')}</p>
                  <p className="text-[#101828] text-sm">{t('codeEmail')}</p>
                </>
              )}
            </>
          )}
          <Flex justify="center">{detailsContent}</Flex>
          <Flex justify="center" className="mt-5">
            {otp.map((digit, index) => (
              <Input
                key={index}
                className="border-1 border-[#D0D5DD] rounded-none w-12 h-16 text-2xl text-[#101828] text-center mr-2 font-bold hide-arrow"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInputChange(index, e)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                ref={(el) => (inputRefs.current[index] = el)}
                type="number"
              />
            ))}
          </Flex>
          <Button
            type="primary"
            className="bg-[#0A6046] text-white mt-4 rounded-none"
            onClick={() => otpVerify()}
            disabled={otp.join('').length < 6}
          >
            {t('verify')}
          </Button>
          <div>
            <Button
              type="primary"
              className="bg-[#0A6046] text-white mt-4 rounded-none"
              onClick={handleResendOtp}
              disabled={timer > 0}
            >
              {t('Resend OTP')} {timer > 0 ? `${timer}s` : ''}
            </Button>
          </div>
        </>
      )}
    </Flex>
  )
}

export default OtpInput
