import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

const Spinner = ({ text }: { text: string }) => {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col gap-10 justify-center items-center">
      <Spin
        indicator={
          <LoadingOutlined style={{ fontSize: 100, color: '#0A6046' }} spin />
        }
      />
      <p>{t(text)}</p>
    </div>
  )
}
export default Spinner
