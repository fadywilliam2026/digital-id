import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'
import { UserStatus } from '../model/userModel'
import { selectCurrentUser } from '../redux/user/userSlice'

const ActiveRoutes = () => {
  const user = useSelector(selectCurrentUser)
  const status = user?.status

  return status === UserStatus.active ? (
    <Outlet />
  ) : status === UserStatus.locked ? (
    <Navigate to="/locked" />
  ) : (
    <Navigate to="/verify" />
  )
}
export default ActiveRoutes
