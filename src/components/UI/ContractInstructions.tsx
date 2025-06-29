import { useTranslation } from 'react-i18next'
import ContractSignatureModal from '../ContractSignatureModal'
import { Typography } from 'antd'

const ContractInstructions = () => {
  const { t } = useTranslation()
  return (
    <>
      <Typography.Title level={1} className="font-bold text-2xl text-[#FEC84B]">
        {t('Your signature is needed!')}
      </Typography.Title>
      <p className="text-white">
        {t(
          'Read the document carefully and thoroughly. Make sure you understand the terms outlined.',
        )}
      </p>
      <p className="text-white">
        {t(
          'Press sign when you are ready. Enable your location and enter the OTP sent to your phone to confirm your signature.',
        )}
      </p>
      <ContractSignatureModal />
    </>
  )
}
export default ContractInstructions
