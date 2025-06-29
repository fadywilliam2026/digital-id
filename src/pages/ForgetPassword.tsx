import { useEffect, useState } from 'react'
import HomeLayout from '../layout/HomeLayout'
import { useNavigate } from 'react-router'

import ForgetPasswordForm from '../components/ForgetPasswordForm'
import { Flex } from 'antd'
import Password from '../components/Password'
import OtpInput from '../components/OtpInput'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../redux/user/userSlice'

const ForgetPassword = () => {
  const user = useSelector(selectCurrentUser)
  useEffect(() => {
    if (user?.accessToken) navigate('/verify')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const [showPassword, setShowPassword] = useState(false)
  const [isOTPField, setIsOTPField] = useState(false)

  const navigate = useNavigate()

  const content = (
    <HomeLayout>
      {!showPassword && !isOTPField && (
        <div className="flex justify-center items-center">
          <ForgetPasswordForm setShowPassword={setShowPassword} />
        </div>
      )}
      {showPassword && !isOTPField && (
        <Flex justify="center" className="p-5 ">
          <Password setIsOTPField={setIsOTPField} />
        </Flex>
      )}

      {isOTPField && (
        <Flex justify="center">
          <OtpInput verify="forgetPassword" />
        </Flex>
      )}
    </HomeLayout>
  )

  return content
}

export default ForgetPassword
