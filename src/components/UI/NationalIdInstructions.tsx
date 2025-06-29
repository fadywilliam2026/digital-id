import { CameraOutlined } from '@ant-design/icons'
import Frame from '../../assets/Frame.svg'
import { useTranslation } from 'react-i18next'

type NationalIdInstructions = {
  state: string
  takePicture: () => void
}

const NationalIdInstructions = ({
  state = 'takeFront',
  takePicture,
}: NationalIdInstructions) => {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col sm:flex-row gap-20  min-h-[calc(100dvh-4rem)] relative z-20 p-5 sm:p-0">
      <div className="text-white text-lg sm:w-[304px] bg-black opacity-70 p-6 flex flex-col justify-center gap-8">
        <h4 className="text-center sm:text-left">
          {state === 'takeFront' ? t('takeFront') : t('takeBack')}
        </h4>
        <div className="hidden sm:block">
          <h4 className="font-bold">{t('instructions')}</h4>
          <p className="text-base font-normal">{t('idInstructions')}</p>
        </div>
      </div>
      <div className="flex flex-col gap-28 sm:gap-20 justify-center items-center 2xl:ml-[600px]">
        <img src={Frame} alt="frame" className="rotate-90 sm:rotate-0 " />
        <button
          className="bg-white w-10 h-10 rounded-full text-2xl"
          onClick={takePicture}
        >
          <CameraOutlined />
        </button>
      </div>
    </div>
  )
}
export default NationalIdInstructions
