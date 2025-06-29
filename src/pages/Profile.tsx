import { Card } from 'antd'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import HistoricalGraph from '../components/HistoricalGraph'
import MainFields from '../components/MainFields'
import PaymentSchedule from '../components/PaymentSchedule'
import PieChart from '../components/PieChart'
import SimpleLoanForm from '../components/SimpleLoanForm'
import { UploadFiles } from '../components/UploadFiles'
import HomeLayout from '../layout/HomeLayout'
import { useGetContractQuery } from '../redux/contract/contractApiSlice'
import { useGetUserByNationalIdQuery } from '../redux/user/userApiSlice'
import { selectCurrentUser } from '../redux/user/userSlice'

const Profile = () => {
  const currentUser = useSelector(selectCurrentUser)
  const { data: user } = useGetUserByNationalIdQuery(currentUser?.nationalId, {
    skip: !currentUser?.nationalId,
  })

  const { data: contract } = useGetContractQuery(
    {
      contractId: user?.contractId?.toString(),
    },
    { skip: !user },
  )

  const { t } = useTranslation()

  const isContractSigned = contract?.users[0].status === 'signed'

  return (
    <HomeLayout>
      <div className="grid gap-4 p-4 sm:grid-cols-1 lg:grid-cols-2">
        <div className="col-span-1 ">
          <Card
            title={t('Customer Information')}
            bordered={false}
            className="bg-white rounded-md p-4"
          >
            <MainFields currentUser={currentUser} user={user} />
            <PaymentSchedule user={user} />
          </Card>
        </div>
        <div className="col-span-1 lg:col-span-1">
          <HistoricalGraph user={user} />
        </div>
        <div className="col-span-1">
          <Card
            title={t('Missing Links')}
            bordered={false}
            className="bg-white rounded-md p-4"
          >
            <Link
              to={`/contract/${user?.contractId}`}
              onClick={(e) => {
                if (isContractSigned) e.preventDefault()
              }}
              className={`block pb-4 ${isContractSigned ? 'text-inherit cursor-not-allowed hover:text-black ' : 'text-red-500 cursor-pointer'}`}
            >
              {t('Agreement Contract')}
              <span
                className={`ml-2 ${isContractSigned ? 'text-green-500' : 'text-red-500'}`}
              >
                {contract?.users[0].status}
              </span>
            </Link>
            <div className="flex gap-2 mb-4 flex-col">
              <UploadFiles user={user} />
            </div>
            <SimpleLoanForm client={user} />
          </Card>
        </div>
        <div className="col-span-1 lg:col-span-1">
          <PieChart user={user} />
        </div>
      </div>
    </HomeLayout>
  )
}

export default Profile
