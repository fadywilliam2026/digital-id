import { useState } from 'react'

import {
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Button, Checkbox, Flex, Form, Input, Space } from 'antd'

import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useValidateSignupMutation } from '../redux/auth/authApiSlice'
import ErrorAlert from './UI/ErrorAlert'
import SignupDataPolicy from './UI/SignupDataPolicy'

interface SetIsQuestionsForm {
  setIsQuestionsForm: (value: boolean) => void
  setErrorMessage: (value: string) => void
}

interface SignupForm {
  userName: string
  email: string
  password: string
  phoneNumber: string
}

const SignupForm = ({ setIsQuestionsForm }: SetIsQuestionsForm) => {
  const [errorMessage, setErrorMessage] = useState('')
  const [form] = Form.useForm()

  const [validateSignup, { isLoading }] = useValidateSignupMutation()

  const { t } = useTranslation()

  const onFinish = async (values: SignupForm) => {
    validateSignup({
      username: values.userName,
      email: values.email,
      phone_number: values.phoneNumber,
    })
      .unwrap()
      .then(() => {
        localStorage.setItem('user', JSON.stringify(values))
        setIsQuestionsForm(true)
      })
      .catch((error) => {
        if (error.status == 'FETCH_ERROR') {
          setErrorMessage('Network error')
        } else {
          setErrorMessage(error.data.message)
        }
      })
  }

  return (
    <Space className="bg-white   p-5 h-fit">
      <SignupDataPolicy />
      <Flex vertical className="gap-5 sm:gap-3 md:gap-0">
        <h2 className="text-[#101828] font-bold text-xl mb-2">{t('signup')}</h2>
        {errorMessage && (
          <ErrorAlert description={errorMessage} setError={setErrorMessage} />
        )}
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="userName"
            label={t('username')}
            rules={[
              {
                required: true,
                min: 3,
                message: 'User name must be 3 char at least',
              },
              {
                pattern: /^[a-zA-Z0-9-_.]+$/,
                message: (
                  <>
                    Username must not contain:
                    <br />- white space <br />- special characters except - _
                    and .
                  </>
                ),
              },
            ]}
            className="md:m-1"
          >
            <Input
              prefix={<UserOutlined />}
              className="rounded-none w-[21rem] h-12"
            />
          </Form.Item>
          <Form.Item
            name="email"
            label={t('email')}
            rules={[
              {
                required: true,
                type: 'email',
                message: 'Please enter a valid email address',
              },
            ]}
            className="md:m-1"
          >
            <Input
              prefix={<MailOutlined />}
              className="rounded-none w-[21rem] h-12"
            />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label={t('phoneNumber')}
            rules={[
              { required: true, message: 'Please enter phone number' },
              {
                pattern: /^(0\d{10})$/,
                message: 'Please enter a valid phone number',
              },
            ]}
            className="md:m-1"
          >
            <Input
              prefix={<PhoneOutlined />}
              type="number"
              className="rounded-none w-[21rem] h-12"
            />
          </Form.Item>
          <Form.Item
            name="password"
            label={t('password')}
            rules={[
              {
                required: true,
                min: 8,
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                message: (
                  <>
                    Password must be:
                    <br />
                    - at least 8 characters long
                    <br />
                    - and include at least one uppercase letter
                    <br />
                    - , one lowercase letter
                    <br />
                    - , one digit
                    <br />
                    - , and one special character
                    <br />- from the set @$!%*?&
                  </>
                ),
              },
            ]}
            className="md:m-1"
          >
            <Input.Password
              prefix={<LockOutlined />}
              className="rounded-none w-[21rem] h-12"
            />
          </Form.Item>

          <Form.Item
            name="confirm"
            label={t('confirmPassword')}
            dependencies={['password']}
            // hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(
                    new Error('Password confirmation does not match'),
                  )
                },
              }),
            ]}
            className="md:m-1"
          >
            <Input.Password
              prefix={<LockOutlined />}
              className="rounded-none w-[21rem] h-12"
            />
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error('Should accept agreement')),
              },
            ]}
            className="md:m-1"
          >
            <Checkbox>
              <Space size={3}>
                <p>{t('agree')}</p>
                <Link to="/terms">{t('terms')}</Link>
              </Space>
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button
              block
              className="bg-[#0A6046] text-white h-12 rounded-none"
              htmlType="submit"
              loading={isLoading}
            >
              {t('continue')}
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </Space>
  )
}

export default SignupForm
