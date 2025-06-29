import {
  Alert,
  Button,
  DatePicker,
  Divider,
  Flex,
  Form,
  Input,
  Select,
  Space,
  Typography,
} from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../hooks/useLanguage'
import city from '../locale/city.json'
import governorate from '../locale/governorate.json'
import { Client } from '../model/clientModel'
import { PartnerClientForm, Values } from '../model/validateModel'
import { useValidateAnswerMutation } from '../redux/user/userApiSlice'
import { setUser } from '../redux/user/userSlice'
const { Option } = Select

const governorateArray = Object.entries(governorate).map(([value, label]) => ({
  value,
  label,
}))

const cityArray = Object.entries(city).map(([value, label]) => ({
  value,
  label,
}))
export const ValidateClientAnswersForm = ({
  client,
}: {
  client: Client | undefined
}) => {
  const [form] = Form.useForm()

  const [errorMessage, setErrorMessage] = useState<{
    message: string
    description: string
  } | null>(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [validateAnswerRequest] = useValidateAnswerMutation()

  useLanguage()
  const { t } = useTranslation()

  useEffect(() => {
    form.setFieldsValue({
      ...client,
      commercialRecord: client?.customFields?.commercialRecord,
      phone: client?.phone,
    })
  }, [client, form])

  const onFinish = async (values: Values) => {
    const formData: PartnerClientForm = {
      ...values,
      customFields: {
        commercialRecord: values.commercialRecord,
        establishmentDate: new Date(),
        industry: values.industry,
      },
      extraFields: {
        legalStructure: values.legalStructure,
        annualRevenueInLastYear: '1M',
        monthlyTransactionVolume: '100K',
        noOfFullTimeEmployees: '15-20',
      },
      phone: values.phone,
    }

    validateAnswerRequest(formData)
      .unwrap()
      .then((res) => {
        dispatch(setUser({ ...res }))
        navigate('/verify/payment')
      })
      .catch((err) => {
        setErrorMessage(err.data.message)
        setErrorMessage({
          message: err.status,
          description: err.data.message,
        })
        console.log(err)
      })
  }

  return (
    <Space className="bg-white w-fit p-5 h-fit">
      <Flex vertical className="gap-5 sm:gap-3 md:gap-0">
        <Typography.Title level={3} className="text-[#0A6046] text-center">
          Update Client
        </Typography.Title>
        {errorMessage && (
          <Alert
            message={errorMessage.message}
            description={errorMessage.description}
            type="error"
            showIcon
            closable
          />
        )}
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          autoComplete="on"
        >
          <Form.Item
            label={t('First Name')}
            name="firstName"
            rules={[
              { required: true, message: 'Please input your first name!' },
              { min: 3, message: 'Must be at least 3 characters' },
            ]}
            className="inline-block w-[calc(30%-8px)]"
          >
            <Input placeholder={t('First Name')} type="text" />
          </Form.Item>
          <Form.Item
            label={t('Last Name')}
            name="lastName"
            rules={[
              { required: true, message: 'Please input your last name!' },
              { min: 3, message: 'Must be at least 3 characters' },
            ]}
            className="inline-block w-[calc(70%-8px)] mx-2"
          >
            <Input placeholder={t('Last Name')} type="text" />
          </Form.Item>
          <Form.Item
            label={t('NationalId')}
            name="nationalId"
            rules={[
              {
                required: true,
                message: 'Please input your NationalId!',
              },
              { len: 14, message: 'Must be 14 number' },
              { pattern: new RegExp('^[0-9]*$'), message: 'Must be number' },
            ]}
          >
            <Input
              placeholder={t('NationalId')}
              type="number"
              className="no-spinner"
              disabled
            />
          </Form.Item>
          <Form.Item
            label={t('email')}
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your Email!',
              },
              {
                type: 'email',
                message: 'Please enter the right email',
              },
            ]}
          >
            <Input placeholder={t('email')} type="email" />
          </Form.Item>
          <Form.Item
            label={t('phoneNumber')}
            name="phone"
            rules={[
              {
                required: true,
                message: 'Please input your phone number!',
              },
              { len: 11, message: 'Must be 11 numbers' },
              {
                pattern: new RegExp('^01[0125][0-9]{8}$'),
                message: 'Please enter the right number',
              },
            ]}
          >
            <Input
              disabled
              placeholder={t('phoneNumber')}
              type="number"
              className="no-spinner"
              onWheel={(e) => (e.target as HTMLInputElement).blur()}
            />
          </Form.Item>
          <Form.Item
            label={t('Governorate')}
            name="governorate"
            rules={[
              { required: true, message: 'Please input your governorate!' },
            ]}
            className="inline-block w-[calc(50%-8px)]"
          >
            <Select placeholder={t('Governorate')} options={governorateArray} />
          </Form.Item>
          <Form.Item
            label={t('City')}
            name="city"
            rules={[{ required: true, message: 'Please input your city!' }]}
            className="inline-block w-[calc(50%-8px)] mx-2"
          >
            <Select placeholder={t('City')} options={cityArray} />
          </Form.Item>
          <Form.Item
            label={t('Full Address')}
            name="address"
            rules={[
              { required: true, message: 'Please input your Address!' },
              {
                pattern: new RegExp(
                  '[\u0600-\u06ff]|[\u0750-\u077f]|[\ufb50-\ufbc1]|[\ufbd3-\ufd3f]|[\ufd50-\ufd8f]|[\ufd92-\ufdc7]|[\ufe70-\ufefc]|[\uFDF0-\uFDFD]',
                ),
              },
            ]}
            className="inline-block w-full"
          >
            <Input placeholder={t('Full Address')} type="text" />
          </Form.Item>
          {/* <Form.Item
            label={t('Number of Employees')}
            name="noOfFullTimeEmployees"
            rules={[
              {
                required: true,
                message: 'Please input your number of employees!',
              },
            ]}
            validateStatus={
              error.includes('noOfFullTimeEmployees') ? 'error' : 'success'
            }
          >
            <Select placeholder={t('Number of Employees')}>
              <Option value="Option 1">5-10</Option>
              <Option value="Option 2">10-30</Option>
              <Option value="Option 3">30+</Option>
            </Select>
          </Form.Item> */}
          <Divider className="border-[#0A6046] w-1/2" orientationMargin="0" />
          <Typography.Title level={4}>Company Information</Typography.Title>
          <Form.Item
            label={t('Company Name')}
            name="commercialName"
            rules={[
              { required: true, message: 'Please input your company name!' },
              { min: 3, message: 'Must be at least 3 characters' },
            ]}
          >
            <Input placeholder={t('Company Name')} type="text" disabled />
          </Form.Item>

          <Form.Item
            label={t('Tax Record ID')}
            name="taxRecordId"
            rules={[
              { required: true, message: 'Please input your tax record id!' },
              { len: 9, message: 'Must be 9 numbers' },
              { pattern: new RegExp('^[0-9]*$'), message: 'Must be number' },
            ]}
          >
            <Input
              placeholder={t('Tax Record ID')}
              type="number"
              className="no-spinner"
              disabled
            />
          </Form.Item>
          <Form.Item
            label={t('Commercial Record Number')}
            name="commercialRecord"
            rules={[
              {
                required: true,
                message: 'Please input your commercial record number!',
              },
              { len: 4, message: 'Must be 4 numbers' },
            ]}
          >
            <Input
              placeholder={t('Commercial Record Number')}
              type="number"
              className="no-spinner"
              disabled
            />
          </Form.Item>
          <Form.Item
            label={t('Date of Establishment')}
            name="establishmentDate"
            rules={[
              {
                required: true,
                message: 'Please input your date of establishment',
              },
            ]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            label={t('legalStructure')}
            name="legalStructure"
            rules={[
              {
                required: true,
                message: 'Please input your legal structure!',
              },
            ]}
          >
            <Select placeholder={t('legalStructure')}>
              <Option value="Option 1">شركة مساهمة</Option>
              <Option value="Option 2">شركة ذات مسؤولية محددودة</Option>
              <Option value="Option 3">شركة توصية بسيطة</Option>
              <Option value="Option 4">شركة افراد</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label={t('Industry')}
            name="industry"
            rules={[
              {
                required: true,
                message: 'Please input your sector!',
              },
            ]}
          >
            <Select placeholder={t('Industry')}>
              <Option value="Option 1">Medical sector</Option>
              <Option value="Option 2">Business sector</Option>
              <Option value="Option 3">Service sector</Option>
            </Select>
          </Form.Item>
          {/* <Form.Item
            label={t('Annual Revenue In Last Year')}
            name="annualRevenue"
            rules={[
              {
                required: true,
                message: 'Please input your annual revenue in last year!',
              },
            ]}
            validateStatus={
              error.includes('annualRevenueInLastYear') ? 'error' : 'success'
            }
          >
            <Input placeholder={t('Annual Revenue In Last Year')} />
          </Form.Item> */}
          {/* <Form.Item
            label={t('Monthly Transactions')}
            name="monthlyTransactions"
            rules={[
              {
                required: true,
                message: 'Please input your Monthly Transactions!',
              },
            ]}
            validateStatus={
              error.includes('monthlyTransactionVolume') ? 'error' : 'success'
            }
          >
            <Select placeholder={t('Monthly Transactions')}>
              <Option value="10k">10k</Option>
              <Option value="100k">100k</Option>
              <Option value="1M !!">1M !!</Option>
            </Select>
          </Form.Item> */}
          <Form.Item>
            <Button
              block
              htmlType="submit"
              className="bg-[#0A6046] text-white h-12 rounded-none font-bold"
            >
              {t('continue')}
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </Space>
  )
}
