import { Outlet, Navigate } from 'react-router'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../redux/user/userSlice'

const PrivateRoutes = () => {
  const user = useSelector(selectCurrentUser)
  return user ? <Outlet /> : <Navigate to="/" />
}

export default PrivateRoutes
