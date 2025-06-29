import { Col, Flex, Modal, Row, Space } from 'antd'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { ExportOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import PdfViewer from '../components/UI/PdfViewer'
import {
  Contract,
  useGetContractFileQuery,
  useUpdateContractMutation,
} from '../redux/contract/contractApiSlice'

import RejectContract from '../components/RejectContract'
import SignContract from '../components/SignContract'
import ContractPdfHeader from '../components/UI/ContractPdfHeader'

type ContractPdfModalProps = {
  contract: Contract
}

const ContractPdf = ({ contract }: ContractPdfModalProps) => {
  const [open, setOpen] = useState(false)
  const { data } = useGetContractFileQuery(contract.id, { skip: !open })
  const [zoom, setZoom] = useState(100)
  const [isRead, setIsRead] = useState(false)

  const [updateContractReq] = useUpdateContractMutation()

  const { t } = useTranslation()

  const showModal = () => {
    setOpen(true)
  }

  const updateContract = () => {
    updateContractReq(contract.id)
      .unwrap()
      .then((res) => {
        console.log(res)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <>
      <Link to="" onClick={showModal}>
        <Space align="center" className="text-[#0A6046] font-bold mb-5">
          <h1 className="">{contract?.title}</h1>
          <ExportOutlined className="text-xl" />
        </Space>
      </Link>

      <Modal
        open={open}
        className="!w-full !bg-transparent pdf-modal p-0 m-0 top-0 max-w-[calc(100vw)] "
        closable={false}
        footer={null}
      >
        <div className=" ">
          <Row>
            <Col
              flex="auto"
              className="bg-gray-900 px-0 py-0 sm:px-5 sm:py-2 flex justify-between"
            >
              <ContractPdfHeader
                contract={contract}
                setZoom={setZoom}
                setOpen={setOpen}
                zoom={zoom}
                src={data || ''}
                updateContract={updateContract}
              />
            </Col>
          </Row>

          <Row className="h-full" justify="center">
            <Col flex="auto" className="pt-0 sm:p-4">
              {data && (
                <>
                  <PdfViewer pdfData={data} zoom={zoom} setIsRead={setIsRead} />
                </>
              )}
            </Col>
            {['pending', 'pending_on_user'].includes(
              contract.overall_status,
            ) && (
              <Col flex="375px" className="bg-gray-900 p-5">
                <Flex
                  justify="space-between"
                  vertical={true}
                  className="h-full pt-60"
                >
                  <Space
                    className="font-medium text-white text-base"
                    direction="vertical"
                  >
                    <p className="mb-5">
                      {t(
                        'Read the document carefully and thoroughly. Make sure you understand the terms outlined.',
                      )}
                    </p>
                    <p>
                      {t(
                        'Press sign when you are ready. Enable your location and enter the OTP sent to your phone to confirm your signature.',
                      )}
                    </p>
                  </Space>

                  <Space
                    className="w-full"
                    direction="vertical"
                    onClick={() => setOpen(false)}
                  >
                    <SignContract isRead={isRead} contract={contract} />
                    <RejectContract contract={contract} isRead={isRead} />
                  </Space>
                </Flex>
              </Col>
            )}
          </Row>
        </div>
      </Modal>
    </>
  )
}
export default ContractPdf
