import { Layout } from 'antd'
import Navbar from '../components/UI/Navbar'
// Define the type for props using React.PropsWithChildren
type HomeProps = {
  children: React.ReactNode // Adjust the type according to what your children expect
}

const HomeLayout: React.FC<HomeProps> = ({ children }) => {
  return (
    <Layout className="main">
      <header className="bg-transparent ">
        <Navbar />
      </header>
      <main className="!bg-transparent">{children}</main>
    </Layout>
  )
}

export default HomeLayout
