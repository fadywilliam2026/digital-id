import { Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { Client } from '../model/clientModel'
import { User } from '../model/userModel'

const MainFields = ({
  user,
  currentUser,
}: {
  user: Client | undefined
  currentUser: User | null
}) => {
  const principalBalance = user?.loanAccounts?.reduce(
    (acc, loan) => acc + +loan.principalBalance,
    0,
  )

  const { t } = useTranslation()
  return (
    <>
      <Typography.Text className="flex justify-between mb-1">
        <strong>{t('Customer Name')}:</strong>
        {currentUser?.userName}
      </Typography.Text>
      <Typography.Text className="flex justify-between mb-1">
        <strong>{t('Loans Outstanding')}:</strong> {principalBalance} L.E
      </Typography.Text>
      <Typography.Text className="flex justify-between mb-1">
        <strong>{t('Total Approved Credit Limit')}:</strong>
        {user?.approvedLimit} L.E
      </Typography.Text>
      <Typography.Text className="flex justify-between mb-1">
        <strong>{t('Number of Loans')}:</strong>{' '}
        {user?.loanAccounts?.length || 0}
      </Typography.Text>
    </>
  )
}

export default MainFields
