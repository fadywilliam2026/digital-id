import { Form, Input, Button, Checkbox, Space, Flex } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { useLoginMutation } from '../redux/auth/authApiSlice'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import ErrorAlert from './UI/ErrorAlert'
import { useTranslation } from 'react-i18next'
import { setUser } from '../redux/user/userSlice'
import { UserStatus } from '../model/userModel'

interface LoginFormProps {
  password: string
  userName: string
  stayLoggedIn: boolean
}

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState('')

  const [form] = Form.useForm()

  const [login, { isLoading }] = useLoginMutation()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { t } = useTranslation()

  const onFinish = async (values: LoginFormProps) => {
    login({
      username: values.userName,
      password: values.password,
    })
      .unwrap()
      .then((data) => {
        dispatch(setUser({ ...data }))
        if (data.status === UserStatus.active) navigate('/dashboard')
        else navigate('/verify')
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
    <Space className="bg-white  w-fit p-5">
      <Flex vertical gap={5}>
        <h3 className=" text-gray-900 font-bold text-xl mb-5">{t('login')}</h3>
        {errorMessage && (
          <ErrorAlert description={errorMessage} setError={setErrorMessage} />
        )}
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="userName"
            label={t('username')} // Label for username input
            rules={[
              {
                required: true,
                min: 3,
                message: 'User name must be at least 3 characters',
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
          >
            <Input
              prefix={<UserOutlined />}
              className="rounded-none w-[21rem] h-12"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label={t('password')} // Label for password input
            rules={
              [
                // {
                //   required: true,
                //   min: 8,
                //   pattern:
                //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                //   message: (
                //     <>
                //       Password must be:
                //       <br />
                //       - at least 8 characters long
                //       <br />
                //       - and include at least one uppercase letter
                //       <br />
                //       - , one lowercase letter
                //       <br />
                //       - , one digit
                //       <br />
                //       - , and one special character
                //       <br />- from the set @$!%*?&
                //     </>
                //   ),
                // },
              ]
            }
          >
            <Input.Password
              prefix={<LockOutlined />}
              className="rounded-none  w-[21rem] h-12"
            />
          </Form.Item>
          <Flex justify="flex-end">
            <Link
              className="text-right text-[#0A6046] font-medium "
              to="/forgetpassword"
            >
              {t('forgotPassword')}
            </Link>
          </Flex>
          <Form.Item>
            <Form.Item name="stayLoggedIn" valuePropName="checked" noStyle>
              <Checkbox className="text-[#344054] font-medium text-base ">
                {t('stayLogged')}
              </Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Button
              block
              className="bg-[#0A6046] text-white h-12 rounded-none"
              htmlType="submit"
              loading={isLoading}
            >
              {t('login')}
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </Space>
  )
}
export default LoginForm
