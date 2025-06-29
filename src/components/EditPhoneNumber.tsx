import { useState } from 'react'
import EditTextField from './UI/EditTextField'
import { Button, Form, Input, Modal } from 'antd'
import { useTranslation } from 'react-i18next'
import { useUpdateUnverifiedMutation } from '../redux/user/userApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useSendPhoneOtpMutation } from '../redux/auth/authApiSlice'
import { selectCurrentUser, setUser } from '../redux/user/userSlice'

const EditPhoneNumber = () => {
  const [open, setOpen] = useState(false)
  const [form] = Form.useForm()

  const { t } = useTranslation()

  const [updateUnverifiedReq, { isLoading }] = useUpdateUnverifiedMutation()
  const [sendOTPReq] = useSendPhoneOtpMutation()
  const dispatch = useDispatch()

  const { phoneNumber } = useSelector(selectCurrentUser)!

  const onFinish = (values: { phoneNumber: string }) => {
    const { phoneNumber } = values
    updateUnverifiedReq({ phoneNumber })
      .unwrap()
      .then((res) => {
        dispatch(
          setUser({
            phoneNumber: res.phoneNumber,
          }),
        )
        sendOTPReq({ phone: res.phoneNumber })
        setOpen(false)
      })

      .catch((err) => console.log(err))
  }
  return (
    <>
      <p>{t('A 6-digit code was sent to your phone number')}</p>
      <EditTextField text={phoneNumber} setOpen={setOpen} />
      <Modal
        title={t('Update Phone Number')}
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
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="phoneNumber"
            rules={[
              { required: true, message: 'Please enter phone number' },
              {
                pattern: /^(0\d{10})$/,
                message: 'Please enter a valid phone number',
              },
            ]}
            initialValue={phoneNumber}
          >
            <Input
              placeholder={t('Enter your phone number')}
              className="rounded-none w-[21rem] h-12"
              type="number"
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
export default EditPhoneNumber
