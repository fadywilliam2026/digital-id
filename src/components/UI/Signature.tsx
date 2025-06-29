import { format, parseISO } from 'date-fns'
import { Users } from '../../redux/contract/contractApiSlice'
import ContractStatus from './ContractStatus'
import { useTranslation } from 'react-i18next'

type SignatureProps = {
  user: Users
}

const Signature = ({ user }: SignatureProps) => {
  const { t } = useTranslation()
  const date = parseISO(user.updatedAt)
  const formattedDate = format(date, 'dd/MM/yyyy')
  return (
    <div className="flex justify-between">
      <div>
        <h1 className="text-gray-900 font-semibold">{user.user.userName}</h1>
        <p className="text-[#667085] text-[13px] ">
          {t('Sent on:')} {formattedDate}
        </p>
      </div>
      <ContractStatus status={user.status} />
    </div>
  )
}
export default Signature
