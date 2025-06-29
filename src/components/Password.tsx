import { Button, Form, Input } from 'antd'
import { LockOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

interface Values {
  password: string
  confirm: string
}

type PasswordProps = {
  setIsOTPField: (value: boolean) => void
}

const Password = ({ setIsOTPField }: PasswordProps) => {
  const [form] = Form.useForm()

  const { t } = useTranslation()

  const onFinish = (values: Values) => {
    localStorage.setItem('userPassword', values.password)
    setIsOTPField(true)
  }

  return (
    <div className="w-fit mx-auto bg-white p-5 mt-16">
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          name="password"
          label={t('password')}
          rules={[
            {
              required: true,
              message: 'Please input your password!',
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
                  new Error('The new password that you entered do not match!'),
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
        <Form.Item>
          <Button
            block
            className="bg-[#0A6046] text-white h-12 rounded-none mt-5"
            htmlType="submit"
          >
            {t('continue')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Password
