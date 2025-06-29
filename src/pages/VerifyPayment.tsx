import { Button, Flex, Form, Select } from 'antd'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import ErrorAlert from '../components/UI/ErrorAlert'
import PaymentDataPolicy from '../components/UI/PaymentDataPolicy'
import Spinner from '../components/UI/Spinner'
import i18n from '../i18n'
import DashboardLayout from '../layout/DashboardLayout'
import { useGetPaymentQuery } from '../redux/user/userApiSlice'
import { selectCurrentUser } from '../redux/user/userSlice'

const VerifyPayment = () => {
  const user = useSelector(selectCurrentUser)!
  const {
    data: order,
    error,

    isLoading,
  } = useGetPaymentQuery(user.id, {
    skip: !user,
  })

  const { t } = useTranslation()

  const PAYMENT_METHODS_OPTIONS = [
    { label: t('Card'), value: 'card' },
    { label: t('Wallet'), value: 'wallet' },
  ]

  const handleFinish = (data: { paymentMethod: 'wallet' | 'card' }) => {
    const href =
      `https://checkout.kashier.io/?` +
      `merchantId=${order.mid}&` +
      `orderId=${order.orderId}&` +
      `amount=${order.amount}&` +
      `currency=${order.currency}&` +
      `hash=${order.hash}&` +
      `mode=${order.mode}&` +
      `display=${i18n.language}&` +
      `merchantRedirect=${window.location.origin}/payment/callback&` +
      `serverWebhook=${order.serverWebhook}&` +
      `redirectMethod=get&` +
      `manualCapture=false&` +
      `allowedMethods=${data.paymentMethod}`
    window.location.href = href
  }

  return (
    <DashboardLayout page="verify">
      <PaymentDataPolicy />
      <Flex
        className="text-center"
        justify="center"
        align="center"
        vertical={true}
        gap={10}
      >
        <p className="italic my-2 ">
          {t('welcome')} {user.userName}
        </p>
        <h1 className="font-bold text-gray-700 text-3xl">
          {t('Verify your Payment Method')}
        </h1>

        {isLoading ? (
          <Spinner text="Loading" />
        ) : error ? (
          <ErrorAlert description={'error.data.message'} />
        ) : (
          <Form
            layout="vertical"
            className="shadow-custom w-fit mx-auto p-5 mt-5"
            onFinish={handleFinish}
          >
            <Form.Item
              name="paymentMethod"
              label={t('Payment Methods Options')}
              required
              className="my-select-container"
            >
              <Select
                options={PAYMENT_METHODS_OPTIONS}
                value={'otp'}
                className="h-10 w-[21rem] rounded-none "
              />
            </Form.Item>
            <Form.Item>
              <Button
                block
                type="primary"
                className="bg-[#0A6046] text-white  font-semibold rounded-none"
                htmlType="submit"
                loading={isLoading}
              >
                {t('Confirm')}
              </Button>
            </Form.Item>
          </Form>
        )}
      </Flex>
    </DashboardLayout>
  )
}

export default VerifyPayment
