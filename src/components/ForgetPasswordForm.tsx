import { Button, Form, Input, Space } from 'antd'
import { MailOutlined } from '@ant-design/icons'

import ErrorAlert from './UI/ErrorAlert'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useOtpChangePasswordByEmailMutation } from '../redux/auth/authApiSlice'
import { selectCurrentUser } from '../redux/user/userSlice'

interface Values {
  email: string
}

type ForgetPasswordFormProps = {
  setShowPassword: (value: boolean) => void
}

const ForgetPasswordForm = ({ setShowPassword }: ForgetPasswordFormProps) => {
  const currentUser = useSelector(selectCurrentUser)

  const [errorMessage, setErrorMessage] = useState('')

  const [form] = Form.useForm()

  const [otpChangePasswordByEmailReq, { isLoading }] =
    useOtpChangePasswordByEmailMutation()

  const { t } = useTranslation()

  const sendOtp = async (values: Values) => {
    console.log('Sending OTP...')
    otpChangePasswordByEmailReq({
      email: values.email,
    })
      .unwrap()
      .then((res) => {
        console.log(res)
        setShowPassword(true)
      })
      .catch((err) => {
        if (err.status == 'FETCH_ERROR') {
          setErrorMessage('Network error')
        } else {
          setErrorMessage(err.data.message)
        }
      })
  }

  return (
    <Space direction="vertical" className="w-fit mx-auto bg-white p-5 mt-16">
      {errorMessage && (
        <div className="w-full">
          <ErrorAlert description={errorMessage} setError={setErrorMessage} />
        </div>
      )}
      <p className="italic">
        {t('welcome')} {currentUser?.userName}
      </p>
      <Form form={form} onFinish={sendOtp} layout="vertical">
        <Form.Item
          name="email"
          label={t('email')}
          rules={[
            {
              required: true,
              type: 'email',
              message: 'Please enter a valid email',
            },
          ]}
        >
          <Input
            prefix={<MailOutlined />}
            className="rounded-none w-[21rem] h-12"
          />
        </Form.Item>
        <Button
          block
          className="bg-[#0A6046] text-white h-12 rounded-none"
          htmlType="submit"
          loading={isLoading}
        >
          {t('continue')}
        </Button>
      </Form>
    </Space>
  )
}
export default ForgetPasswordForm
