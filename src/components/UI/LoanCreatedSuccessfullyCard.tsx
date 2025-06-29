import { Button, Modal } from 'antd'
import { useTranslation } from 'react-i18next'

export const SuccessCard = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}) => {
  const { t } = useTranslation()
  return (
    <Modal
      open={isOpen}
      onOk={() => setIsOpen(false)}
      footer={null}
      closable={false}
    >
      <div className="flex flex-col justify-center items-center p-5 gap-5">
        <p className="font-semibold text-lg text-gray-900">
          {t('Loan Created Successfully')}
        </p>
        <div className="self-start px-5">
          <p>{t('Please go to the dashboard to see loan contract.')}</p>
        </div>
        <Button
          block
          className="bg-[#0A6046] text-white rounded-none h-11 font-bold"
          onClick={() => setIsOpen(false)}
        >
          {t('I understand')}
        </Button>
      </div>
    </Modal>
  )
}
