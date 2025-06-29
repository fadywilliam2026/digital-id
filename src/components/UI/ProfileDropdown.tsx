import {
  LockOutlined,
  LogoutOutlined,
  QuestionOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Divider, Dropdown, MenuProps } from 'antd'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'

const ProfileDropdown = () => {
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}')

  const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('tokens')
    localStorage.removeItem('notificationToken')
    window.location.reload()
  }

  const { t } = useTranslation()
  const navigate = useNavigate()
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div>
          <Link to="/profile" className="flex flex-col p-3">
            <h1 className="text-gray-900 font-bold text-2xl">
              {currentUser.userName}
            </h1>
            <p className="text-gray-700 font-normal">{currentUser.email}</p>
          </Link>

          <Divider />
        </div>
      ),
    },
    // to do as app
    // {
    //   key: '2',
    //   label: (
    //     <a onClick={logout}>
    //       <span>
    //         <h1 className="text-gray-700 font-bold text-xl">
    //           <SettingOutlined className="text-gray-500 mr-5" />
    //           {t('accountSettings')}
    //         </h1>
    //       </span>
    //     </a>
    //   ),
    // },
    {
      key: '3',
      label: (
        <a onClick={() => navigate('/privacy-policy')}>
          <span>
            <h1 className="text-gray-700 font-bold text-xl">
              <LockOutlined className="text-gray-500 mr-5" />
              {t('privacyPolicy')}
            </h1>
          </span>
        </a>
      ),
    },
    {
      key: '4',
      label: (
        <a onClick={() => navigate('/support')}>
          <span>
            <h1 className="text-gray-700 font-bold text-xl">
              <QuestionOutlined className="text-gray-500 mr-5" />
              {t('Support')}
            </h1>
          </span>
        </a>
      ),
    },
    {
      key: '5',
      label: (
        <a onClick={logout}>
          <span>
            <h1 className="text-gray-700 font-bold text-xl">
              <LogoutOutlined className="text-gray-500 mr-5" />
              {t('logout')}
            </h1>
          </span>
        </a>
      ),
    },
  ]

  return (
    <>
      <Dropdown
        menu={{ items, className: 'min-h-[35dvh]' }}
        placement="bottomLeft"
        overlayStyle={{ overflow: 'auto' }}
      >
        <UserOutlined className=" text-2xl " />
      </Dropdown>
    </>
  )
}
export default ProfileDropdown
