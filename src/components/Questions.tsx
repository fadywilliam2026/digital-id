import { useState } from 'react'

import { useNavigate } from 'react-router'

import { Button } from 'antd'

import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useDeviceId } from '../hooks/useDeviceId'
// import useDeviceUUID from '../hooks/useDeviceUUID'
import { useSignupMutation } from '../redux/auth/authApiSlice'
import { useRecordUserDeviceMutation } from '../redux/user/userApiSlice'
import { setDevice, setUser } from '../redux/user/userSlice'
import Question from './Question'
import ErrorAlert from './UI/ErrorAlert'
import PermissionModal from './UI/PermissionModal'
import Spinner from './UI/Spinner'

interface User {
  userName: string
  email: string
  password: string
  phoneNumber: string
  nationalId: string
}

interface SetIsQuestionsForm {
  setIsQuestionsForm: (value: boolean) => void
}

function Questions({ setIsQuestionsForm }: SetIsQuestionsForm) {
  const [errorMessage, setErrorMessage] = useState('')
  const [firstField, setFirstField] = useState({
    securityQuestionId: 1,
    answer: '',
  })
  const [secondField, setSecondField] = useState({
    securityQuestionId: 2,
    answer: '',
  })
  const [isDeviceIdModal, setIsDeviceIdModal] = useState(true)

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const [signupReq, { isLoading }] = useSignupMutation()
  const [userDeviceReq, { isLoading: isUserDeviceLoading }] =
    useRecordUserDeviceMutation()
  const { notificationToken, requestPermission } = useDeviceId()
  const [uuid] = '123456'
  const { t } = useTranslation()
  console.log(requestPermission)
  const signup = async () => {
    // if (!notificationToken) {
    //   setIsDeviceIdModal(true)
    //   requestPermission()
    //   return
    // }
    const user: User = JSON.parse(localStorage.getItem('user') || '{}')
    signupReq({
      username: user.userName,
      email: user.email,
      password: user.password,
      phone_number: user.phoneNumber,
      deviceId: uuid,
      nationalId: user.nationalId,
      questions: [firstField, secondField],
      signupOrigin: 'web',
    })
      .unwrap()
      .then((res) => {
        dispatch(setUser({ ...res }))
        userDeviceReq({ deviceId: uuid, deviceToken: notificationToken })
          .then(() => {
            dispatch(
              setDevice({ deviceId: uuid, deviceToken: notificationToken }),
            )
            navigate('/verify')
          })
          .catch((error) => {
            if (error.status == 'FETCH_ERROR') {
              setErrorMessage('Network error')
            } else {
              setErrorMessage(error.data.error)
            }
            setIsQuestionsForm(false)
          })
      })
      .catch((error) => {
        if (error.status == 'FETCH_ERROR') {
          setErrorMessage('Network error')
        } else {
          setErrorMessage(error.data.error)
        }
        setIsQuestionsForm(false)
      })
  }

  return (
    <div className="bg-white p-5 flex flex-col gap-5 w-96">
      <PermissionModal
        isOpen={isDeviceIdModal}
        setIsOpen={setIsDeviceIdModal}
        permission="deviceId"
      />
      {isLoading || isUserDeviceLoading ? (
        <div className="text-xl font-bold w-96 h-52 flex items-center justify-center">
          <Spinner text="Loading..." />
        </div>
      ) : (
        <>
          <h2 className="text-gray-900 font-bold text-xl">
            {t('chooseSecurityQuestions')}
          </h2>
          {errorMessage && (
            <div className="w-full">
              <ErrorAlert
                description={errorMessage}
                setError={setErrorMessage}
              />
            </div>
          )}
          <p className="text-gray-900  text-[13px]">
            {t('securityQuestionTip')}
          </p>
          <div className="flex flex-col ">
            <section className="mb-5">
              <Question
                label={t('firstSecurityQuestion')}
                field={firstField}
                setField={setFirstField}
                selectedQuestionIds={secondField.securityQuestionId}
              />
            </section>
            <Question
              label={t('secondSecurityQuestion')}
              field={secondField}
              setField={setSecondField}
              selectedQuestionIds={firstField.securityQuestionId}
            />
          </div>

          <Button
            block
            className="bg-[#0A6046] text-white rounded-none h-11"
            onClick={signup}
          >
            {t('createAccount')}
          </Button>
        </>
      )}
    </div>
  )
}

export default Questions
