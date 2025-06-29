import { Button, Modal, Card } from 'antd'

import ID from '../../assets/ID.svg'
import { useTranslation } from 'react-i18next'
import GeneralInstructionsModal from './GeneralInstructionsModal'
import { TFunction } from 'i18next'

const { Meta } = Card

const ModalContent = (
  kycState: string,
  t: TFunction<'translation', undefined>,
) => {
  switch (kycState) {
    case 'detectFront':
    case 'init':
      return {
        header: t('Scan the front of your National ID'),
        description: t('detectFront'),
      }
    case 'detectBack':
      return {
        header: t('Scan the back of your National ID'),
        description: t('detectBack'),
      }
    default:
      return {
        header: '',
        description: '',
      }
  }
}

type InstructionsModal = {
  type: string
  state: string
  showInstructionModal: boolean
  setShowInstructionModal: (value: boolean) => void
}

const InstructionNationalIdModel = ({
  showInstructionModal,
  setShowInstructionModal,
}: InstructionsModal) => {
  const { t } = useTranslation()
  const kycState = localStorage.getItem('kycState')

  const { header, description } = ModalContent(kycState!, t)

  return (
    <>
      <GeneralInstructionsModal
        showInstructionModal={showInstructionModal}
        setShowInstructionModal={setShowInstructionModal}
      />

      <Modal
        open={showInstructionModal}
        footer={null}
        closable={false}
        className="!p-0 !w-96 !h-52 !rounded-none"
      >
        <Card cover={<img src={ID} alt="ID" className="rounded-none" />}>
          <h1 className="font-bold pb-3">{header}</h1>
          <Meta title={t('instructions')} description={description} />
          <p className="py-6">{t('press scan when you are ready')}</p>
          <Button
            block
            className="bg-[#0A6046] text-white h-12 rounded-none mt-5 w-1/3 float-right"
            onClick={() => setShowInstructionModal(false)}
          >
            {t('Scan')}
          </Button>
        </Card>
      </Modal>
    </>
  )
}

export default InstructionNationalIdModel
