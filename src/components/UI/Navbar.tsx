import { Col, Flex, Row } from 'antd'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectCurrentUser } from '../../redux/user/userSlice'
import LanguageSelector from './LanguageSelector'

const Navbar = () => {
  const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('notificationToken')
    window.location.reload()
  }
  const currentUser = useSelector(selectCurrentUser)
  const { t } = useTranslation()
  return (
    <Row>
      <Col span={24}>
        <header className="bg-transparent p-0 py-10 sm:px-20">
          <Flex justify="space-between" align="center">
            <Link to="/" className="hidden sm:block">
              <img
                src="../src/assets/flend-logo.png"
                alt="logo"
                className="w-36 h-9"
              />
              {/* <MainIcon /> */}
            </Link>
            <LanguageSelector theme="white" fill="#9EE6D0" />
            {currentUser && (
              <Link to="" onClick={logout}>
                {t('logout')}
              </Link>
            )}
          </Flex>
        </header>
      </Col>
    </Row>
  )
}

export default Navbar
