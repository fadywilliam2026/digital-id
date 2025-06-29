import { Link } from 'react-router-dom'
import zoomIn from '../../assets/icons/zoom-in.svg'
import zoomOut from '../../assets/icons/zoom-out.svg'
import { LeftOutlined, DownloadOutlined, StarOutlined } from '@ant-design/icons'
import ContractStatus from './ContractStatus'
import { Button, Col, Flex, Input, Row, Space } from 'antd'
import { Contract } from '../../redux/contract/contractApiSlice'

type ContractPdfHeaderProps = {
  contract: Contract
  src: string
  zoom: number
  setZoom: React.Dispatch<React.SetStateAction<number>>
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  updateContract: () => void
}

const ContractPdfHeader = ({
  contract,
  src,
  zoom,
  setZoom,
  setOpen,
  updateContract,
}: ContractPdfHeaderProps) => {
  const handleZoomOut = () => {
    if (zoom <= 10) return
    setZoom(zoom - 10)
  }
  const handleZoomIn = () => {
    if (zoom >= 200) return
    setZoom(zoom + 10)
  }

  return (
    <Flex justify="space-between" className="w-full">
      {/* left-side */}
      <Space>
        <Row>
          <Col>
            <Space className="text-gray-200  text-lg mr-2">
              <Link to="" onClick={() => setOpen(false)}>
                <LeftOutlined />
              </Link>
            </Space>
          </Col>
          <Col>
            <Flex align="start" vertical={true} gap={8}>
              <h1 className=" font-bold text-gray-200 text-xl">
                {contract.title}
              </h1>
              <ContractStatus status={contract.overall_status} />
            </Flex>
          </Col>
        </Row>
      </Space>

      {/* right-side */}
      <Flex justify="space-between" className="">
        <Space align="center" className="text-gray-200">
          <Flex justify="center" gap={8} className="mr-0 sm:mr-16">
            <Button
              type="link"
              className="text-gray-200 "
              icon={<img src={zoomIn} />}
              onClick={handleZoomIn}
            />

            <Input
              value={zoom + '%'}
              onChange={(e) => setZoom(+e.target.value)}
              className="w-24 rounded-none text-center"
            />
            <Button
              type="link"
              className="text-gray-200"
              icon={<img src={zoomOut} />}
              onClick={handleZoomOut}
            />
          </Flex>
        </Space>
        <Space align="center" className="text-xl text-gray-200" size="large">
          <a href={src} target="_blank">
            <DownloadOutlined />
          </a>
          <Link to="" onClick={updateContract}>
            <StarOutlined
              className={`${contract.isFavorite ? 'text-yellow-500' : ''}`}
            />
          </Link>
        </Space>
      </Flex>
    </Flex>
  )
}
export default ContractPdfHeader
