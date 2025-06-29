import { Steps } from 'antd'
import { useTranslation } from 'react-i18next'
import ModalWithCard from './ModalWithCard'
type InstructionsModal = {
  showInstructionModal: boolean
  setShowInstructionModal: (value: boolean) => void
}
const GeneralInstructionsModal = ({
  setShowInstructionModal,
}: InstructionsModal) => {
  const { t } = useTranslation()
  const items = [
    {
      title: t('Scan the front of your National ID'),
    },
    {
      title: t('Scan the back of your National ID'),
    },
  ]

  return (
    <ModalWithCard
      confirmMessage={t('Start')}
      handleConfirm={() => setShowInstructionModal(true)}
    >
      <h1 className="font-bold py-3">{t('Scan your national ID')}</h1>

      <p className="pb-5">{t('Identity Verification Process')}</p>

      <p className="pb-6">{t('National ID Card Registration')} </p>
      <Steps progressDot status="wait" direction="vertical" items={items} />

      <div className="pb-16">{t('preparation')}</div>
    </ModalWithCard>
  )
}

export default GeneralInstructionsModal
