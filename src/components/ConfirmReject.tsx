import { Button, Flex, Input, Modal, Space } from 'antd'
import { useState } from 'react'
import { useSendPhoneOtpMutation } from '../redux/auth/authApiSlice'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../redux/user/userSlice'
import OTPInput from './UI/OTPInput'
import {
  Contract,
  useRejectContractMutation,
} from '../redux/contract/contractApiSlice'
import ErrorAlert from './UI/ErrorAlert'
import { useTranslation } from 'react-i18next'

type ConfirmRejectProps = {
  open: boolean
  setOpen: (value: boolean) => void
  contract: Contract
}

const ConfirmReject = ({ open, setOpen, contract }: ConfirmRejectProps) => {
  const [showOTP, setShowOTP] = useState(false)
  const [rejectionReason, setRejectionReason] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const [sendOTPReq] = useSendPhoneOtpMutation()
  const [rejectContractReq] = useRejectContractMutation()

  const currentUser = useSelector(selectCurrentUser)

  const { t } = useTranslation()

  const sendOTP = () => {
    sendOTPReq({ phone: currentUser?.phoneNumber as string })
      .unwrap()
      .then(() => setShowOTP(true))
      // .catch((error) => {
      //   if (error.status == 'FETCH_ERROR') {
      //     setErrorMessage('Network error')
      //   } else {
      //     setErrorMessage(error.data.message)
      //   }
      // })
      .finally(() => {
        setShowOTP(true)
      })
  }

  const rejectContract = (otp: string) => {
    rejectContractReq({
      contractId: contract.id,
      rejectionReason,
      otp,
    })
      .unwrap()
      .then(() => setShowOTP(false))
      .catch((error) => {
        if (error.status == 'FETCH_ERROR') {
          setErrorMessage('Network error')
        } else {
          setErrorMessage(error.data.message)
        }
      })
  }
  return (
    <div>
      <Modal
        title="Reject contract"
        footer={null}
        open={open}
        onCancel={() => {
          setOpen(false)
          setRejectionReason('')
        }}
        maskClosable={false}
        styles={{
          body: {
            padding: '32px 24px',
          },
          header: {
            fontSize: '20px',
            fontWeight: '700',
            padding: '16px 16px 0 16px',
          },
        }}
        className="w-[500px] "
        destroyOnClose={true}
      >
        <Flex vertical={true} className="text-gray-900 ">
          <Space direction="vertical">
            <p>{t('You are rejecting the contract titled:')} </p>
            <p className="font-semibold">{contract.title}</p>
            <p>
              {t(
                'You can send the reason of your rejection to the sender. This feedback would be useful for future communications.',
              )}
            </p>
            <h3 className="font-semibold">
              {t('Rejection reason (optional)')}
            </h3>
            <Input.TextArea
              className="rounded-none h-36"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
            />
            <Button
              block
              type="primary"
              className="bg-[#0A6046] text-white  font-semibold rounded-none"
              onClick={sendOTP}
            >
              {t('Submit Rejection')}
            </Button>
            <Button
              block
              type="text"
              className="cancel-btn mr-2 border-2 border-[#0A6046] text-[#0A6046]  rounded-none"
              onClick={() => {
                setOpen(false)
                setRejectionReason('')
              }}
            >
              {t('Cancel')}
            </Button>
          </Space>
        </Flex>
      </Modal>

      <Modal
        open={showOTP}
        onCancel={() => setShowOTP(false)}
        footer={null}
        maskClosable={false}
        title="Reject Contract"
        styles={{
          body: {
            fontSize: '16px',
            fontWeight: '400',
            padding: '32px 24px',
          },
          header: {
            fontSize: '20px',
            fontWeight: '700',
            padding: '16px 16px 0 16px',
            textAlign: 'center',
          },
        }}
        destroyOnClose={true}
      >
        <Flex vertical={true} className="text-gray-900">
          <Space direction="vertical" align="start">
            <p>{t('You are about to reject the contract titled:')}</p>
            <p className="font-semibold">{contract.title}</p>
            <p>
              {t('We sent an OTP to your phone to confirm your rejection.')}
            </p>
          </Space>

          {errorMessage && (
            <ErrorAlert description={errorMessage} setError={setErrorMessage} />
          )}
          <Flex align="center" justify="center">
            <OTPInput verify={rejectContract} resendLink={sendOTP} />
          </Flex>
        </Flex>
      </Modal>
    </div>
  )
}
export default ConfirmReject
