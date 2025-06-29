import { Button, CountdownProps, Flex, Input, Statistic } from 'antd'
import { useTranslation } from 'react-i18next'
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react'

const { Countdown } = Statistic
const COUNT_DOWN_TIMER = 9000

interface OTPInputProps {
  verify: (value: string) => void
  resendLink: () => void
}

const OTPInput = ({ verify, resendLink }: OTPInputProps) => {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [timer, setTimer] = useState(Date.now() + COUNT_DOWN_TIMER)

  const [isResendLink, setIsResendLink] = useState(false)

  const inputRefs = useRef(Array(6).fill(null))

  const { t } = useTranslation()
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0]?.focus()
    }
  }, [])

  const handleInputChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    const newOtp = [...otp]
    newOtp[index] = e.target.value
    setOtp(newOtp)

    // Focus on the next input
    if (e.target.value !== '' && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const onFinish: CountdownProps['onFinish'] = () => {
    setIsResendLink(true)
  }

  const handleResendLink = () => {
    resendLink()
    setIsResendLink(false)
    setTimer(Date.now() + COUNT_DOWN_TIMER)
    setOtp(['', '', '', '', '', ''])
  }
  return (
    <Flex vertical={true} gap={10}>
      <Flex justify="center" className="mt-5">
        {otp.map((digit, index) => (
          <Input
            key={index}
            className="border-1 border-[#D0D5DD] rounded-none w-12 h-16 text-2xl text-[#101828] text-center mr-2 font-bold hide-arrow"
            maxLength={1}
            value={digit}
            onChange={(e) => {
              if (!isNaN(+e.target.value)) {
                handleInputChange(index, e)
              }
            }}
            onKeyDown={(e) => handleKeyDown(index, e)}
            ref={(el) => (inputRefs.current[index] = el)}
            // type="number"
            type="text"
            inputMode="numeric"
          />
        ))}
      </Flex>
      <Flex vertical={true} justify="center">
        <Countdown
          value={timer} // value is date + no_of msec
          prefix={t('The code expires in: ')}
          suffix={t('mins')}
          onFinish={onFinish}
          format="mm:ss"
        />
        {isResendLink && (
          <Button
            type="link"
            className="text-blue-600"
            onClick={handleResendLink}
          >
            {t('Resend Verification Code ?')}
          </Button>
        )}
        <Button
          type="primary"
          className="bg-[#0A6046] text-white mt-4 rounded-none h-12"
          onClick={() => verify(otp.join(''))}
          disabled={otp.join('').length < 6}
        >
          {t('verify')}
        </Button>
      </Flex>
    </Flex>
  )
}
export default OTPInput
