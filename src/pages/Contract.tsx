import { useParams } from 'react-router'
import { useGetContractQuery } from '../redux/contract/contractApiSlice'

import DashboardLayout from '../layout/DashboardLayout'
import Signatures from '../components/Signatures'
import ContractDetails from '../components/UI/ContractDetails'
import ContractInstructions from '../components/UI/ContractInstructions'
import { Collapse, CollapseProps, Space } from 'antd'
import { useTranslation } from 'react-i18next'

const Contract = () => {
  const { id } = useParams() as { id: string }
  const { data } = useGetContractQuery({ contractId: id })
  const { t } = useTranslation()
  if (!data) return null
  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: <h1 className="text-gray-700 font-semibold">{t('Signatures')}</h1>,
      children: <Signatures users={data.users} />,
      style: { borderRadius: 0 },
      showArrow: false,
    },
  ]
  return (
    <DashboardLayout>
      <Space direction="vertical" className="w-full p-10" size={20}>
        <ContractDetails contract={data} />
        {['pending', 'pending_on_user'].includes(data.overall_status) && (
          <div className=" p-5 contract">
            <ContractInstructions />
          </div>
        )}
        <Collapse items={items} className="rounded-none bg-[#F2F4F7]" ghost />
      </Space>
    </DashboardLayout>
  )
}
export default Contract
