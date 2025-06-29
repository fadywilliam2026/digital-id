import { useState } from 'react'
import EditTextField from './UI/EditTextField'
import { Button, Form, Input, Modal } from 'antd'
import { useTranslation } from 'react-i18next'
import { useUpdateUnverifiedMutation } from '../redux/user/userApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useSendVerificationEmailMutation } from '../redux/auth/authApiSlice'
import { selectCurrentUser, setUser } from '../redux/user/userSlice'

const EditEmail = () => {
  const [open, setOpen] = useState(false)
  const [form] = Form.useForm()

  const { t } = useTranslation()

  const [updateUnverifiedReq, { isLoading }] = useUpdateUnverifiedMutation()
  const [sendToEmailReq] = useSendVerificationEmailMutation()
  const dispatch = useDispatch()

  const { email } = useSelector(selectCurrentUser)!

  const onFinish = (values: { email: string }) => {
    updateUnverifiedReq({ email: values.email })
      .unwrap()
      .then((res) => {
        dispatch(setUser({ email: res.email }))
        sendToEmailReq({ email: res.email })
        setOpen(false)
      })

      .catch((err) => console.log(err))
  }
  return (
    <>
      <p>{t('A 6-digit code was sent to your email address')}</p>
      <EditTextField text={email} setOpen={setOpen} />
      <Modal
        title={t('Update Email Address')}
        open={open}
        footer={null}
        styles={{
          body: {
            fontSize: '16px',
            fontWeight: '400',
            textAlign: 'center',
            padding: '32px 24px',
          },
          header: {
            textAlign: 'center',
            fontSize: '20px',
            fontWeight: '700',
            padding: '16px 16px 0 16px',
          },
        }}
        onCancel={() => setOpen(false)}
        maskClosable={false}
        destroyOnClose={true}
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please enter your email ' }]}
            initialValue={email}
          >
            <Input
              placeholder={t('Enter your email')}
              className="rounded-none w-[21rem] h-12"
              type="email"
            />
          </Form.Item>
          <Button
            block
            className="bg-[#0A6046] text-white w-[21rem] h-12 rounded-none"
            htmlType="submit"
            loading={isLoading}
          >
            {t('Update')}
          </Button>
        </Form>
      </Modal>
    </>
  )
}
export default EditEmail
