import { Button, Checkbox, Modal } from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const PaymentDataPolicy = () => {
  const [isOpen, setIsOpen] = useState(true)
  const [checkBox, setCheckBox] = useState(false)
  const { t } = useTranslation()
  return (
    <Modal
      open={isOpen}
      onOk={() => setIsOpen(false)}
      footer={null}
      closable={false}
    >
      <div className="flex flex-col justify-center items-center p-5 gap-5">
        <h1 className="font-bold text-xl">{t('note')}</h1>
        <p className="font-semibold text-lg text-gray-900">
          {t('Card Validation Notice')}
        </p>
        <div className="self-start px-5">
          <p>
            {t(
              'To ensure your credit card is valid, we will temporarily charge 1 LE to your account. This amount is only for verification purposes and will be refunded immediately or not deducted depending on your bank.Thank you for your understanding and trust.',
            )}
          </p>
        </div>
        <Checkbox
          value={checkBox}
          onChange={(e) => setCheckBox(e.target.checked)}
        >
          {t('agree')}
        </Checkbox>
        <Button
          block
          className="bg-[#0A6046] text-white rounded-none h-11 font-bold"
          onClick={() => setIsOpen(false)}
          disabled={!checkBox}
        >
          {t('I understand')}
        </Button>
      </div>
    </Modal>
  )
}
export default PaymentDataPolicy
