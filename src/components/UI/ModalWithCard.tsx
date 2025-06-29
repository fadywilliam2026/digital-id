import { Button, Card, Modal } from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

type ModalWithCardProps = {
  children: React.ReactNode
  confirmMessage: string
  handleConfirm?: () => void
  cardCover?: React.ReactNode
}

const ModalWithCard = ({
  children,
  confirmMessage,
  handleConfirm,
  cardCover,
}: ModalWithCardProps) => {
  const { userName } = JSON.parse(localStorage.getItem('user') || '{}')
  const [open, setOpen] = useState(true)
  const { t } = useTranslation()

  return (
    <Modal
      open={open}
      footer={null}
      closable={false}
      className="!p-0 !w-96 !h-52 !rounded-none"
    >
      <Card className="pt-6" cover={cardCover}>
        <p className="italic">
          {t('welcome')} {userName}
        </p>
        {children}
        <Button
          block
          className="bg-[#0A6046] text-white h-12 rounded-none mt-5"
          onClick={() => {
            setOpen(false)
            handleConfirm && handleConfirm()
          }}
        >
          {confirmMessage}
        </Button>
      </Card>
    </Modal>
  )
}

export default ModalWithCard
