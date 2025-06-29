import {
  InboxOutlined,
  StarOutlined,
  CloseCircleOutlined,
  MinusCircleOutlined,
  ExclamationCircleOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem
}

const DashboardMenu = ({ collapsed }: { collapsed: boolean }) => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const items: MenuItem[] = [
    getItem(t('Inbox'), 'inbox', <InboxOutlined />),
    getItem(t('Starred'), 'starred', <StarOutlined />),
    getItem(t('Rejected'), 'rejected', <CloseCircleOutlined />),
    getItem(t('Cancelled'), 'deleted', <MinusCircleOutlined />),
    { type: 'divider' },

    getItem(t('About us'), 'about', <ExclamationCircleOutlined />),
    getItem(t('Help and support'), 'help', <QuestionCircleOutlined />),
  ]

  return (
    <Menu
      style={{ width: collapsed ? 50 : 'auto' }}
      className="min-h-[calc(100dvh-4rem)]"
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      theme="light"
      inlineCollapsed={collapsed}
      items={items}
      onClick={(e) => {
        if (['inbox'].includes(e.key)) navigate('/dashboard/signed')
        else navigate('/dashboard/' + e.key)
      }}
    />
  )
}

export default DashboardMenu
