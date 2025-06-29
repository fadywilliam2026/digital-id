import { Button, Col, Divider, Flex, Layout, Row } from 'antd'

import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'

import { Link } from 'react-router-dom'
import DashboardMenu from '../components/UI/DashboardMenu'
import LanguageSelector from '../components/UI/LanguageSelector'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Notifications from '../components/Notifications'
import ProfileDropdown from '../components/UI/ProfileDropdown'

type DashboardProps = {
  children: React.ReactNode
  page?: string
}

const DashboardLayout: React.FC<DashboardProps> = ({
  children,
  page = 'dashboard',
}) => {
  const [collapsed, setCollapsed] = useState(true)
  const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('notificationToken')
    window.location.reload()
  }
  const { t } = useTranslation()
  return (
    <Layout className="!bg-white  min-h-screen">
      <Row>
        <Col span={24}>
          <header className="bg-[#D0D5DD] h-16">
            <Flex justify="space-between" align="center">
              {/* Left-side */}
              <Flex align="center" gap={5}>
                {page === 'dashboard' ? (
                  <Button
                    type="primary"
                    onClick={() => setCollapsed(!collapsed)}
                    className="!text-black flex items-center"
                  >
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                  </Button>
                ) : (
                  <></>
                )}

                <Link
                  to="/dashboard"
                  className={page === 'dashboard' ? '' : 'ml-5'}
                >
                  <img
                    src="../src/assets/flend-logo.png"
                    alt="logo"
                    className="w-36 h-9 my-5"
                  />
                  {/* <NavIcon className="my-5" /> */}
                </Link>
              </Flex>

              {/* Right-side */}
              <Flex
                align="center"
                gap={window.innerWidth >= 640 ? 20 : 10}
                className="mr-5"
              >
                <div className="w-[95px] sm:w-auto ">
                  <LanguageSelector theme="black" fill="black" />
                </div>

                {page === 'dashboard' ? (
                  <>
                    <Divider
                      type="vertical"
                      className="border border-gray-400 h-11 m-0"
                    />
                    <div className="hover:bg-gray-400 rounded-full p-1">
                      <Notifications />
                    </div>
                    <Divider
                      type="vertical"
                      className="border border-gray-400 h-11 m-0 hidden sm:block"
                    />
                    <div className="hover:bg-gray-400 rounded-full p-2 border-2 border-gray-400">
                      <ProfileDropdown />
                    </div>
                  </>
                ) : page === 'verify' ? (
                  <Link to="" onClick={logout}>
                    {t('logout')}
                  </Link>
                ) : (
                  <></>
                )}
              </Flex>
            </Flex>
          </header>
        </Col>
      </Row>

      {/* <Row> */}
      <div className="flex ">
        {page === 'dashboard' ? <DashboardMenu collapsed={collapsed} /> : <></>}
        <div className="w-full">{children}</div>
      </div>
    </Layout>
  )
}

export default DashboardLayout
