import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { setUser } from '../redux/user/userSlice'
const baseUrl = import.meta.env.VITE_BASE_URL

export const LoadingState = () => {
  const [searchParams] = useSearchParams()
  const userId = searchParams.get('userId')
  const token = searchParams.get('token')

  const dispatch = useDispatch()

  const navigate = useNavigate()
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(`${baseUrl}/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.ok) {
          const data = await response.json()
          dispatch(setUser({ ...data, accessToken: token }))
          navigate('/profile')
        }
      } catch (error) {
        console.log(error)
      }
    }
    getUser()
  })
  return <></>
}
