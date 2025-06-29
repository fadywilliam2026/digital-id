import { Typography } from 'antd'
import ReactECharts, { EChartsOption } from 'echarts-for-react'
import { useTranslation } from 'react-i18next'
import { Client } from '../model/clientModel'
import { getMonth } from 'date-fns'
import { useMemo } from 'react'

const HistoricalGraph = ({ user }: { user: Client | undefined }) => {
  const { t } = useTranslation()

  const loanAmountsByMonth = useMemo(() => {
    const amounts = Array(12).fill(0)
    user?.loanAccounts?.forEach((loan) => {
      const { disbursementAt } = loan.disbursementDetails || {}
      if (!disbursementAt) return

      const month = getMonth(new Date(disbursementAt))
      amounts[month] += +loan.loanAmount
    })
    return amounts
  }, [user?.loanAccounts])

  const options: EChartsOption = {
    tooltip: {},
    xAxis: {
      data: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      axisLabel: {
        rotate: 30,
        color: '#FFFFFF',
      },
      nameTextStyle: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: 'bold',
        padding: 15,
      },
      axisLine: {
        lineStyle: {
          color: '#FFFFFF',
        },
      },
    },
    yAxis: {
      nameTextStyle: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: 'bold',
        padding: 30,
      },
      axisLine: {
        lineStyle: {
          color: '#FFFFFF',
        },
      },
      axisLabel: {
        color: '#FFFFFF',
      },
    },
    series: [
      {
        name: 'Amount',
        type: 'bar',
        data: loanAmountsByMonth,
        smooth: true,
        itemStyle: {
          color: '#9EE6D0',
        },
      },
    ],
  }

  return (
    <>
      <Typography.Title
        level={2}
        className="font-bold text-[#FFFF] mb-0 text-center "
      >
        {t('Historical Trends of loans')}
      </Typography.Title>
      <ReactECharts option={options} />
    </>
  )
}

export default HistoricalGraph
