import { useState } from 'react'
import { Button, Modal } from 'antd'
import { useRejectContractMutation } from '../redux/contract/contractApiSlice'
import { useTranslation } from 'react-i18next'
interface RejectModalProps {
  contractId: number
  setMessage: (message: string) => void
}
const RejectModal = ({ contractId, setMessage }: RejectModalProps) => {
  const [open, setOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)

  const [rejectContractReq] = useRejectContractMutation()

  const showModal = () => {
    setOpen(true)
  }

  const { t } = useTranslation()

  const handleOk = async () => {
    setConfirmLoading(true)
    rejectContractReq({
      contractId: contractId,
      rejectionReason: "I don't like it",
      otp: '123456',
    })
      .unwrap()
      .then((res) => {
        console.log(res)
        setOpen(false)
        setConfirmLoading(false)
      })
      .catch((error) => {
        setConfirmLoading(false)
        setOpen(false)
        if (error.status == 'FETCH_ERROR') {
          setMessage('Network error')
        } else {
          setMessage(error.data.message)
        }
      })
  }

  return (
    <>
      <Button
        onClick={showModal}
        style={{ marginLeft: '8px' }}
        className="bg-[#E02020] text-white"
      >
        {t('reject')}
      </Button>
      <Modal
        title={t('rejectContract')}
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={() => setOpen(false)}
        okButtonProps={{
          style: { backgroundColor: '#E02020', color: 'white' },
        }}
        okText={t('reject')}
      >
        <p>{t('confirmReject')}</p>
      </Modal>
    </>
  )
}

export default RejectModal
