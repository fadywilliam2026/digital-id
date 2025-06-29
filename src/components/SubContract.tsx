import { useState } from 'react'
import { Modal, Space } from 'antd'
import { Link } from 'react-router-dom'
import fileText from '../assets/icons/file-text.svg'
import SubContractModal from './UI/SubContractModal'
import { useChildContractsQuery } from '../redux/contract/contractApiSlice'
import { useTranslation } from 'react-i18next'

const SubContract = ({ parentId }: { parentId: string | undefined }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { t } = useTranslation()
  const { data: childContracts } = useChildContractsQuery(
    {
      contractId: parentId!,
    },
    { skip: !parentId },
  )

  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleOk = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <Link
        to=""
        onClick={showModal}
        className={`${!childContracts ? 'pointer-events-none' : ''}`}
      >
        <Space align="center">
          <img src={fileText} />
          <span className="font-semibold ">{t('Show subcontracts')}</span>
        </Space>
      </Link>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        {childContracts && (
          <SubContractModal childContracts={childContracts!} />
        )}
      </Modal>
    </>
  )
}

export default SubContract
