import { Flex } from 'antd'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import DashboardLayout from '../layout/DashboardLayout'
import { selectCurrentUser, setUser } from '../redux/user/userSlice'
import { useSearchParams } from 'react-router-dom'
import { PaymentStatus } from '../model/paymentAttemptModel'
import { UserStatus } from '../model/userModel'

const PaymentCallBack = () => {
  const [searchParams] = useSearchParams()
  const user = useSelector(selectCurrentUser)!
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const paymentStatus = searchParams.get('paymentStatus')

  if (paymentStatus === PaymentStatus.SUCCESS)
    dispatch(setUser({ status: UserStatus.pending_sign }))

  navigate('/verify')

  return (
    <DashboardLayout page="verify">
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
          {t('Verifying Payment Method')}
        </h1>
      </Flex>
    </DashboardLayout>
  )
}

export default PaymentCallBack
