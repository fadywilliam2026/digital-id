import { FilePdfOutlined } from '@ant-design/icons'
import { Button, Flex, Space, Table, Tabs, TabsProps } from 'antd'

import { format } from 'date-fns'
import { useState } from 'react'
import { NavigateFunction, useNavigate, useParams } from 'react-router'
import {
  Contract,
  useDemoSignMutation,
  useGetContractsQuery,
} from '../redux/contract/contractApiSlice'
import ContractStatus from './UI/ContractStatus'
import ErrorAlert from './UI/ErrorAlert'

const TableRow = (
  contract: Contract,
  navigate: NavigateFunction,
  demoSignReq: ({ id }: { id: number }) => void,
) => {
  return (
    <Flex justify="space-between">
      <Space>
        <Button
          size="large"
          onClick={() => navigate(`/contract/${contract.id}`)}
          icon={<FilePdfOutlined style={{ fontSize: 25 }} />}
          shape="circle"
          className="bg-[#F2F4F7]"
          type="text"
        />
        <Space direction="vertical">
          <span>{contract.title}</span>
          {/* <span>{contract.company.name}</span> */}
        </Space>
      </Space>
      <Space direction="vertical" align="end" size={2}>
        <p className="text-gray-500 text-xs">
          {format(contract.createdAt, 'MMM d')}
        </p>
        {contract.overall_status == 'pending_on_company' && (
          <Button
            className="bg-[#0A6046] text-white  rounded-none"
            size="small"
            onClick={() => demoSignReq({ id: contract.id })}
          >
            Hard Token
          </Button>
        )}

        <ContractStatus status={contract.overall_status} />
      </Space>
    </Flex>
  )
}

const renderTable = (contracts: Contract[], columns: Col[]) => (
  <Table
    showHeader={false}
    dataSource={contracts}
    columns={columns}
    rowKey="id"
    size="small"
    pagination={{ pageSize: 6 }}
  />
)

interface Col {
  title: string
  dataIndex?: string
  key: string
  render: (text: string, record: Contract) => JSX.Element
}

const Contracts = () => {
  const { status } = useParams()
  const SKIP_QUERY = ['about', 'help', undefined]

  const { data: contracts } = useGetContractsQuery(
    {
      status: status!,
    },
    { skip: SKIP_QUERY.includes(status) },
  )

  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()
  const [demoSignReq] = useDemoSignMutation()

  const columns: Col[] = [
    {
      title: '',
      dataIndex: 'file',
      key: 'file',
      render: (_, contract: Contract) =>
        TableRow(contract, navigate, demoSignReq),
    },
  ]

  const items: TabsProps['items'] = [
    {
      key: 'active',
      label: 'Active',
      children: renderTable(contracts!, columns),
    },
    {
      key: 'pending',
      label: 'Pending',
      children: renderTable(contracts!, columns),
    },
  ]

  const onChange = (key: string) => {
    navigate(`/dashboard/${key}`)
  }

  return (
    <Space direction="vertical" className="w-full px-3 py-3">
      {errorMessage && (
        <div className="">
          <ErrorAlert description={errorMessage} setError={setErrorMessage} />
        </div>
      )}
      {['signed', 'pending'].includes(status!) ? (
        <Tabs
          defaultActiveKey="signed"
          items={items}
          onChange={onChange}
          tabBarStyle={{ color: 'red' }}
          className="p-0 text-green-600"
        />
      ) : (
        renderTable(contracts!, columns)
      )}
    </Space>
  )
}

export default Contracts
