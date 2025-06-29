import { useState, useRef } from 'react'
import { usePdf } from '@mikecousins/react-pdf'
import Spinner from './Spinner'
import { RightCircleOutlined, LeftCircleOutlined } from '@ant-design/icons'
import { Button } from 'antd'
interface PDFViewerProps {
  pdfData: string
  zoom: number
  setIsRead: (isRead: boolean) => void
}

const PDFViewer = ({ pdfData, zoom, setIsRead }: PDFViewerProps) => {
  const [page, setPage] = useState(1)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimension, setDimension] = useState({ width: 0, height: 0 })

  const { pdfDocument } = usePdf({
    file: pdfData,
    page,
    canvasRef,
    scale: zoom / 100,
    onDocumentLoadSuccess: (pdf) => {
      setPage(1)
      setIsRead(false)
      if (pdf.numPages === 1) setIsRead(true)
    },
    onPageRenderSuccess: (page) => {
      const viewPort = page.getViewport({ scale: zoom / 100 })
      setDimension({
        width: viewPort.width,
        height: viewPort.height,
      })
    },
  })

  const handleNext = () => {
    if (page + 1 === pdfDocument?.numPages) setIsRead(true)
    setPage(page + 1)
  }

  return (
    <>
      {!pdfDocument && (
        <div className="flex justify-center items-center">
          <Spinner text="Loading..." />
        </div>
      )}
      {Boolean(pdfDocument && pdfDocument.numPages) && (
        <>
          <div className=" sm:hidden flex justify-center items-center gap-5 mb-2">
            <Button
              type="text"
              icon={
                <LeftCircleOutlined className="text-white text-3xl mx-auto " />
              }
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className=" self-center "
              shape="circle"
            />
            <Button
              type="text"
              icon={
                <RightCircleOutlined className="text-white text-3xl mx-auto" />
              }
              disabled={page === pdfDocument?.numPages}
              onClick={handleNext}
              className=" self-center "
              shape="circle"
            />
          </div>

          <div className="flex justify-center gap-3">
            <Button
              type="text"
              icon={
                <LeftCircleOutlined className="text-white text-3xl mx-auto" />
              }
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className=" self-center hidden sm:block"
              shape="circle"
            />

            <div
              className={`h-[500px] w-[500px] ms:h-[600px] sm:w-[500px] md:h-[600px] md:w-[500px] lg:h-[730px] lg:w-[600px] ${zoom > 100 || dimension.height > 812 || dimension.width > 631 ? 'overflow-scroll' : ''}`}
            >
              <canvas
                ref={canvasRef}
                className={`${zoom === 100 ? 'w-full h-full' : ''}`}
              />
            </div>

            <Button
              type="text"
              icon={
                <RightCircleOutlined className="text-white text-3xl mx-auto" />
              }
              disabled={page === pdfDocument?.numPages}
              onClick={handleNext}
              className=" self-center hidden sm:block"
              shape="circle"
            />
          </div>
        </>
      )}
    </>
  )
}

export default PDFViewer
