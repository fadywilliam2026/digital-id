import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import type { ContractStatus } from '../../redux/contract/contractApiSlice'

interface ContractStatusProps {
  status: ContractStatus
}

const getStatusStyle = (status: ContractStatus) => {
  switch (status) {
    case 'pending':
    case 'pending_on_user':
    case 'pending_on_others':
    case 'pending_on_company':
      return {
        bgColor: '#FDB022',
        textColor: '#0000',
        icon: <ExclamationCircleOutlined />,
      }
    case 'signed':
    case 'active':
      return {
        bgColor: '#0A6046',
        textColor: '#ffff',
        icon: <CheckCircleOutlined />,
      }
    case 'rejected':
      return {
        bgColor: '#B42318',
        textColor: '#ffff',
        icon: <CloseCircleOutlined />,
      }
    case 'cancelled':
      return {
        bgColor: '#B42318',
        textColor: '#ffff',
        icon: <MinusCircleOutlined />,
      }
  }
}

const ContractStatus = ({ status }: ContractStatusProps) => {
  const { bgColor, icon, textColor } = getStatusStyle(status)
  const { t } = useTranslation()
  return (
    <span
      className={`flex items-center gap-1 bg-[${bgColor}] text-[${textColor}] px-2 py-[0.1rem] rounded-3xl w-fit mb-3`}
    >
      {icon}
      <h1 className={`font-medium text-xs `}>{t(status)}</h1>
    </span>
  )
}
export default ContractStatus
