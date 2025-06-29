import { Flex } from 'antd'
import { useTranslation } from 'react-i18next'
import noGlasses from '../../assets/noGlasses.png'
import noHair from '../../assets/noHair.png'
import sun from '../../assets/sun.png'
import ModalWithCard from './ModalWithCard'

const InstructionFaceDetectionModal = () => {
  const { t } = useTranslation()

  return (
    <ModalWithCard confirmMessage={t('Start')}>
      <h1 className="font-bold text-xl ">{t('Confirm your identity')}</h1>
      <p className="pb-5">{t('face verification process')}</p>
      <p>{t('face preparation')}</p>
      <p className="py-4">{t('when you are ready, press start')}</p>

      <Flex className="pb-16" justify="space-between">
        <img src={noGlasses} alt="noGlasses" />
        <img src={sun} alt="sun" />
        <img src={noHair} alt="noHair" />
      </Flex>
    </ModalWithCard>
  )
}

export default InstructionFaceDetectionModal
