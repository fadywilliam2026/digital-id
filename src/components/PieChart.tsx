import { Progress, Tooltip, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { Client } from '../model/clientModel'

const PieChart = ({ user }: { user: Client | undefined }) => {
  const { currentLimit, approvedLimit } = user || {
    currentLimit: 0,
    approvedLimit: 0,
  }

  const percentAvaialable = +((currentLimit / approvedLimit) * 100).toFixed(2)

  const { t } = useTranslation()
  return (
    <div className="flex flex-col items-center">
      <Typography.Title
        level={2}
        className="font-bold text-[#FFFF] mb-5 text-center"
      >
        {t('Available Limit')}
      </Typography.Title>
      <Tooltip
        title={`${t('Current Limit / Approved Limit ')}: ${currentLimit} / ${user?.approvedLimit}`}
      >
        <Progress
          type="circle"
          strokeColor="var(--Brand-300, #0A6046)"
          strokeWidth={15}
          trailColor="var(--Brand-700, #ffff)"
          strokeLinecap="square"
          percent={percentAvaialable}
          format={(percent) => `${percent}%`}
        />
      </Tooltip>
    </div>
  )
}

export default PieChart
