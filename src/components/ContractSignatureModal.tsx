import { useState } from 'react'
import { Button, Modal } from 'antd'
import { WarningOutlined } from '@ant-design/icons'
import ErrorAlert from './UI/ErrorAlert'
import { useTranslation } from 'react-i18next'

const ContractSignatureModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const { t } = useTranslation()

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = async () => {}

  return (
    <>
      <Button
        block
        className="bg-[#9EE6D0] text-[#063D2D] rounded-none h-11 mt-5 font-semibold "
        onClick={showModal}
        type="primary"
      >
        {t('Proceed to sign')}
      </Button>
      <Modal open={isModalOpen} onOk={handleOk} closable={false} footer={null}>
        <div className="flex flex-col items-center gap-5 p-5">
          <WarningOutlined className="text-xl" />
          <h1 className="text-gray-700 text-xl font-bold ml-2">
            {t('Before signing, read carefully')}
          </h1>
          {errorMessage && (
            <ErrorAlert description={errorMessage} setError={setErrorMessage} />
          )}
          <p className="text-center text-gray-900 font-[500] text-lg">
            {t(
              'Please review the entire contract before signing. Your signature indicates your agreement with the terms. If you have questions, seek clarification. Thank you.',
            )}
          </p>
          <Button
            className="bg-[#0A6046] text-white rounded-none h-11 text-lg font-semibold"
            onClick={handleOk}
            block
          >
            {t('I understand')}
          </Button>
        </div>
      </Modal>
    </>
  )
}
export default ContractSignatureModal
