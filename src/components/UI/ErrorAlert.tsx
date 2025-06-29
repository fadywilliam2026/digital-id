import { InfoCircleOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

type ErrorAlertProps = {
  description: string
  setError?: (errorMessage: string) => void
}

const ErrorAlert = ({ description, setError }: ErrorAlertProps) => {
  const [showAlert, setShowAlert] = useState(true)
  const { t } = useTranslation()
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false)
      setError ? setError('') : null
    }, 3000)

    return () => {
      clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div>
      <div
        className={`${
          showAlert ? 'block' : 'hidden'
        } bg-[#912018]  h-14 text-center flex justify-center items-center gap-3 text-white px-4`}
      >
        <InfoCircleOutlined />
        <p>{t(description)}</p>
      </div>
    </div>
  )
}
export default ErrorAlert
