import { useEffect, useState } from 'react'
import LoginForm from '../components/LoginForm'
import Signup from './Signup'

import HomeLayout from '../layout/HomeLayout'

import { useNavigate } from 'react-router'

import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../redux/user/userSlice'
import { UserStatus } from '../model/userModel'

const Home = () => {
  const [isLogin, setIsLogin] = useState(true)
  const user = useSelector(selectCurrentUser)
  const navigate = useNavigate()
  const { t } = useTranslation()

  useEffect(() => {
    if (user) {
      const { status } = user
      if (status === UserStatus.active) navigate('/dashboard')
      else if (status !== UserStatus.initial) navigate('/verify')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    <HomeLayout>
      <div className="flex items-center flex-col gap-2 sm:gap-5 h-full">
        {isLogin ? (
          <>
            <h1 className="text-white font-bold text-2xl sm:text-4xl  text-center">
              {t('title')}
            </h1>
            <LoginForm />
            <span className="text-white font-semibold ">
              {t('homeCreateAccount')}{' '}
              <a
                onClick={() => setIsLogin(false)}
                className="font-semibold text-[#9EE6D0] cursor-pointer"
              >
                {t('registerLink')}
              </a>
            </span>
          </>
        ) : (
          <>
            <h1 className="text-white font-bold text-2xl sm:text-4xl text-center">
              {t('create')}
            </h1>
            <Signup />
            <span className="text-white font-semibold ">
              {t('homeLogin')}{' '}
              <a
                onClick={() => setIsLogin(true)}
                className="font-semibold text-[#9EE6D0] cursor-pointer"
              >
                {t('loginLink')}
              </a>
            </span>
          </>
        )}
      </div>
    </HomeLayout>
  )
}

export default Home
