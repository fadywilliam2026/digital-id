import { Button, Checkbox, Modal, Typography } from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const SignupDataPolicy = () => {
  const [isOpen, setIsOpen] = useState(true)
  const [checkBox, setCheckBox] = useState(false)
  const { t } = useTranslation()
  const { Paragraph } = Typography
  return (
    <Modal
      open={isOpen}
      onOk={() => setIsOpen(false)}
      footer={null}
      closable={false}
    >
      <div className="flex flex-col justify-center items-center p-5 gap-5">
        <h1 className="font-bold text-xl">
          {t('Client Consent and Authorization Disclaimer')}
        </h1>
        <div className="self-start p-5  bg-slate-100">
          <Paragraph>
            {t(
              'By signing this consent form, I, the undersigned, hereby give my full and informed consent to Flend SME Financing (&quot;Flend&quot;) to:',
            )}
          </Paragraph>
          <Paragraph>
            {t(
              '1 - Extract Business Information: I authorize Flend to access and retrieve relevant business information from the partner platform(s) associated with my account.',
            )}
          </Paragraph>
          <Paragraph>
            {t(
              '2 - Inquiry Regarding iScore: I consent to Flend inquiring about my personal and business iScore, including credit and financial data, for the purpose of assessing my eligibility for financing.',
            )}
          </Paragraph>
          <Paragraph>
            {t(
              '3 - Account Verification: I acknowledge that Flend may deduct a nominal fee of 1 EGP from my account for the purpose of verifying my identity and account details.',
            )}
          </Paragraph>
          <Paragraph>
            {t(
              'I understand that this information will be used solely for the purpose of processing my financing application and for compliance with relevant legal and regulatory requirements. I also acknowledge that Flend will handle all personal and business information in accordance with applicable data privacy laws. By signing this form, I confirm that I have read and understood the above terms, and I freely and voluntarily consent to these actions.',
            )}
          </Paragraph>
        </div>
        <Checkbox
          value={checkBox}
          onChange={(e) => setCheckBox(e.target.checked)}
        >
          {t('confirmTerms')}
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
export default SignupDataPolicy
