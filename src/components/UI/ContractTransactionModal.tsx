import { Link } from 'react-router-dom'
import bookOpen from '../../assets/icons/book-open.svg'
import { Modal, Space } from 'antd'
import { useState } from 'react'
import { useGetAllContractsQuery } from '../../redux/contract/contractApiSlice'

const ContractTransactionModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { data } = useGetAllContractsQuery()
  console.log(data)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }
  return (
    <>
      <Link to="" onClick={showModal}>
        <Space align="center">
          <img src={bookOpen} />
          <span className="font-semibold ">Show transactions</span>
        </Space>
      </Link>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      ></Modal>
    </>
  )
}
export default ContractTransactionModal
