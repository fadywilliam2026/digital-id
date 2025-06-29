//TODO: ADD Document type.

import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  UploadOutlined,
} from '@ant-design/icons'
import { Button, message, Upload } from 'antd'
import { UploadChangeParam } from 'antd/es/upload'
import { t } from 'i18next'
import { useEffect, useState } from 'react'
import { Client } from '../model/clientModel'
import {
  useGetUploadedFileQuery,
  useUploadFileMutation,
} from '../redux/user/userApiSlice'

export const UploadFiles = ({ user }: { user: Client | undefined }) => {
  const [uploadFile] = useUploadFileMutation()
  const { data: documents } = useGetUploadedFileQuery(user?.id as number, {
    skip: !user,
  })

  const [uploadedFileTypes, setUploadedFileTypes] = useState<string[]>([])

  useEffect(() => {
    if (documents)
      setUploadedFileTypes(documents.map((doc: { type: string }) => doc.type))
  }, [documents])

  //NOTE: TO BE Deleted
  useEffect(() => {
    if (documents?.length == 0) {
      const formData = new FormData()
      formData.append('uploadFile', new Blob(['empty file']) as Blob)
      formData.append(
        'createDocumentDto',
        JSON.stringify({
          type: 'Financial statements',
          description: `Financial statements Description`,
          customFields: {
            industry: user?.customFields?.industry,
            commercialRecord: user?.customFields?.commercialRecord,
            establishmentDate: user?.customFields?.establishmentDate,
          },
          clientId: user?.id,
        }),
      )
      uploadFile(formData).unwrap()
    }
  }, [user, documents])

  if (!user || !documents) return null

  const fileTypes = ['Financial statements', 'Other files']

  const handleUpload = (fileType: string) => {
    return async (info: UploadChangeParam) => {
      const { status, originFileObj } = info.file

      if (status === 'done') {
        try {
          const formData = new FormData()
          formData.append('uploadFile', originFileObj as Blob)
          formData.append(
            'createDocumentDto',
            JSON.stringify({
              type: fileType,
              description: `${fileType} Description`,
              customFields: {
                industry: user.customFields?.industry,
                commercialRecord: user.customFields?.commercialRecord,
                establishmentDate: user.customFields?.establishmentDate,
              },
              clientId: user.id,
            }),
          )

          await uploadFile(formData).unwrap()
          message.success(`${fileType} uploaded successfully.`)

          setUploadedFileTypes((prev) => [...prev, fileType])
        } catch (error) {
          console.error(`${fileType} file upload failed.`, error)
          message.error(`${fileType} upload failed.`)
        }
      } else if (status === 'error') {
        console.log(`${fileType} file upload failed.`)
        message.error(`${fileType} upload failed.`)
      }
    }
  }

  const UploadStatusIcon = ({ isUploaded }: { isUploaded: boolean }) =>
    isUploaded ? (
      <CheckCircleOutlined className="text-green-500 mx-4" />
    ) : (
      <CloseCircleOutlined className="text-red-500 mx-4" />
    )

  return (
    <>
      {documents.some(
        (doc: { type: string }) => !uploadedFileTypes.includes(doc.type),
      ) && (
        <p className="text-red-500">
          {t('* Please upload all missing files before requesting a loan.')}
        </p>
      )}
      {fileTypes.map((fileType) => (
        <Upload
          key={fileType}
          customRequest={({ onSuccess }) => {
            setTimeout(() => onSuccess && onSuccess('ok'), 0)
          }}
          onChange={handleUpload(fileType)}
        >
          <Button icon={<UploadOutlined />}>{t(`Upload ${fileType}`)}</Button>
          <UploadStatusIcon isUploaded={uploadedFileTypes.includes(fileType)} />
        </Upload>
      ))}
    </>
  )
}
