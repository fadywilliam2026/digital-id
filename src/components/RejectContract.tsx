import { Button, Modal } from 'antd'
import warning from '../assets/icons/warning.svg'
import { useTranslation } from 'react-i18next'
import { Contract } from '../redux/contract/contractApiSlice'
import { useState } from 'react'
import { CloseCircleOutlined } from '@ant-design/icons'
import ConfirmReject from './ConfirmReject'

type RejectContractProps = {
  contract: Contract
  isRead: boolean
}
const RejectContract = ({ contract, isRead }: RejectContractProps) => {
  const [open, setOpen] = useState(false)
  const [openReject, setOpenReject] = useState(false)
  const { t } = useTranslation()
  return (
    <>
      <Button
        icon={<CloseCircleOutlined />}
        block
        danger
        ghost
        className="rounded-none   h-12 font-semibold text-lg"
        disabled={!isRead}
        onClick={() => setOpen(true)}
      >
        {t('reject')}
      </Button>

      <Modal
        title={
          <div className="text-center flex justify-center flex-col items-center">
            <img src={warning} alt="warning" />
            <h2 className="mt-2">{t('rejectContract')}</h2>
          </div>
        }
        open={open}
        footer={null}
        styles={{
          body: {
            fontSize: '16px',
            fontWeight: '400',
            textAlign: 'center',
            padding: '32px 24px',
          },
          header: {
            textAlign: 'center',
            fontSize: '20px',
            fontWeight: '700',
            padding: '16px 16px 0 16px',
          },
        }}
        onCancel={() => setOpen(false)}
        centered
      >
        <p>{t('confirmRejectContract')}</p>
        <div className="flex justify-center mt-4">
          <Button
            className="cancel-btn mr-2 border-2 border-[#0A6046] text-[#0A6046] h-[46px] w-[50%] rounded-none"
            type="default"
            onClick={() => setOpen(false)}
          >
            {t('Cancel')}
          </Button>
          <Button
            className="continue-btn mr-2 border-2 border-[#0A6046] text-[#0A6046] h-[46px] w-[50%] rounded-none"
            type="default"
            onClick={() => {
              setOpen(false)
              setOpenReject(true)
            }}
          >
            {t('continue')}
          </Button>
        </div>
      </Modal>
      <ConfirmReject
        open={openReject}
        setOpen={setOpenReject}
        contract={contract}
      />
    </>
  )
}
export default RejectContract
