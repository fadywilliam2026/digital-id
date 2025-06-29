import DashboardLayout from '../layout/DashboardLayout'

import Contracts from '../components/Contracts'

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="min-h-[calc(100vh-4rem)]">
        <Contracts />
      </div>
    </DashboardLayout>
  )
}

export default Dashboard
