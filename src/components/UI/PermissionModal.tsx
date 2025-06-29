import { Button, Modal } from 'antd'
import { useTranslation } from 'react-i18next'

type PermissionModalProps = {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  permission: string
}

const PermissionModal = ({
  isOpen,
  setIsOpen,
  permission,
}: PermissionModalProps) => {
  const { t } = useTranslation()
  return (
    <Modal open={isOpen} onOk={() => setIsOpen(false)} footer={null}>
      <div className="flex flex-col justify-center items-center p-5 gap-5">
        <h1 className="font-bold text-xl">{t('Warning')}</h1>
        <p className="font-semibold text-lg text-gray-900">
          {t(
            `Please allow ${
              permission === 'camera'
                ? t('Camera')
                : permission === 'deviceId'
                  ? t('Notification')
                  : ''
            } access from your browser to proceed.`,
          )}
        </p>
        <div className="self-start px-5">
          <ul className="list-disc pl-5">
            <li>{t('Open Chrome settings.')}</li>
            <li>{t('Navigate to Site Settings.')}</li>
            <li>
              {t(
                `Find ${
                  permission === 'camera'
                    ? t('camera')
                    : permission === 'deviceId'
                      ? t('notification')
                      : ''
                } settings.`,
              )}
            </li>
            <li>
              {t(
                `Allow our website to access the ${
                  permission === 'camera'
                    ? t('camera')
                    : permission === 'deviceId'
                      ? t('notification')
                      : ''
                }.`,
              )}
            </li>
          </ul>
        </div>
        <Button
          block
          className="bg-[#0A6046] text-white rounded-none h-11 font-bold"
          onClick={() => setIsOpen(false)}
        >
          {t('I understand')}
        </Button>
      </div>
    </Modal>
  )
}
export default PermissionModal
