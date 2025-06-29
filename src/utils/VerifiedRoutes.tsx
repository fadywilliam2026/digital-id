import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router'
import { UserStatus } from '../model/userModel'
import { selectCurrentUser } from '../redux/user/userSlice'

const VerifiedRoutes = () => {
  const currentUser = useSelector(selectCurrentUser)
  const status = currentUser?.status

  const navigate = useNavigate()
  useEffect(() => {
    // alert(`Status Now is ${status}`)
    if (status == 'initial') {
      navigate('/verify/phone')
    } else if (status == 'phone_verified') {
      navigate('/verify/email')
    } else if (status == 'email_verified') {
      localStorage.setItem('kycState', 'init')
      navigate('/verify/kyc')
    } else if (status == 'id_verified') {
      // alert(localStorage.getItem('kycState'))
      localStorage.setItem('kycState', 'done')
      navigate('/verify/validateClientAnswers')
    } else if (status == 'pending_sign') {
      localStorage.removeItem('kycState')
      localStorage.removeItem('pictures')
      navigate('/profile')
    } else if (status == UserStatus.payment_method) {
      navigate('/verify/payment')
    } else if (status == 'active') {
      navigate('/dashboard')
    } else if (status == 'locked') {
      navigate('/locked')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  return <Outlet />
}

export default VerifiedRoutes
