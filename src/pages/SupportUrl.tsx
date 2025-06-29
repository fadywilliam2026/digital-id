import { InstagramOutlined, LinkedinOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import HomeLayout from '../layout/HomeLayout'

export const SupportUrl = () => {
  return (
    <HomeLayout>
      <div className="flex flex-col items-center  min-h-screen px-6 md:px-12 lg:px-24 py-10 text-white">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center pb-9">
          If you are facing any issues with Flend app, please reach out to our
          team via e-mail:
        </h1>
        <Button
          type="primary"
          size="large"
          href="mailto:info@flend.io"
          style={{
            backgroundColor: '#9EE6D0',
            borderColor: '#0A6046',
            color: '#0A6046',
            display: 'inline-block',
            width: '100%',
            height: '40px',
            borderRadius: '0',
          }}
        >
          SEND A SUPPORT EMAIL
        </Button>
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center pt-9">
          Alternatively, you can reach us through our social media channels or
          website.
        </h1>
        <div className="flex space-x-4 mt-6">
          <a
            href="https://www.linkedin.com/company/flend.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-[#fff] rounded-full flex items-center justify-center hover:bg-gray-300"
          >
            <LinkedinOutlined style={{ fontSize: '20px', color: '#9EE6D0' }} />
          </a>
          <a
            href="https://www.instagram.com/flend.io?igsh=MTY3YXo3ZGdjaXYzZg=="
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-[#fff] rounded-full flex items-center justify-center hover:bg-gray-300"
          >
            <InstagramOutlined style={{ fontSize: '20px', color: '#9EE6D0' }} />
          </a>
        </div>
      </div>
    </HomeLayout>
  )
}
