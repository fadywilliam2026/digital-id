import { Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { Client } from '../model/clientModel'
import { Installment } from '../model/installmentModel'

const PaymentSchedule = ({ user }: { user: Client | undefined }) => {
  const pendingInstallments = user?.loanAccounts
    ?.flatMap((loan) => loan.installments)
    .sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
    )

  const installmentItem = function ({
    installment,
  }: {
    installment: Installment
  }) {
    const dueDate = new Date(installment.dueDate).toDateString()
    const sum =
      (parseFloat(installment.feesDue) || 0) +
      (parseFloat(installment.interestDue) || 0) +
      (parseFloat(installment.penaltyDue) || 0) +
      (parseFloat(installment.principalDue) || 0) +
      (parseFloat(installment.organizationCommissionDue) || 0)

    return (
      <>
        <div className="flex justify-between flex-row ">
          <span>
            {t('Date')} : {dueDate}
          </span>
          <p>{installment.state}</p>
          <p>
            {t('Amount')} : {isNaN(sum) ? '0' : sum.toFixed(2)}
          </p>
        </div>
      </>
    )
  }

  const { t } = useTranslation()
  return (
    <>
      <Typography.Text className="flex justify-between mt-3">
        <strong>{t('Payment Schedule')}:</strong>
        {user?.paymentFrequency || 'NONE'}
      </Typography.Text>
      {pendingInstallments?.map((installment) => (
        <div className="text-[#667085] text-[13px] mt-2" key={installment.id}>
          {installmentItem({ installment })}
        </div>
      ))}
    </>
  )
}

export default PaymentSchedule
