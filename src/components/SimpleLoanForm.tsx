import { Button, Form, Input, Modal, Select } from 'antd'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Client } from '../model/clientModel'
import { Values } from '../model/simpleLoanModel'
import { useSimpleLoanMutation } from '../redux/user/userApiSlice'
import ErrorAlert from './UI/ErrorAlert'
import { SuccessCard } from './UI/LoanCreatedSuccessfullyCard'

interface SimpleLoanFormProps {
  client: Client | undefined
}

const SimpleLoanForm: React.FC<SimpleLoanFormProps> = ({ client }) => {
  const [open, setOpen] = useState(false)
  const [showSuccessCard, setShowSuccessCard] = useState(false)
  const [error, setError] = useState('')
  const [simpleLoan, { isLoading }] = useSimpleLoanMutation()
  const { t } = useTranslation()

  const SELECT_OPTIONS = [
    {
      label: client?.organization?.name,
      value: client?.organization?.id,
    },
  ]

  const onClose = () => setOpen(false)

  const onFinish = async (data: Values) => {
    try {
      await simpleLoan({
        loanAmount: +data.loanAmount,
        nationalId: client?.nationalId,
        organizationId: +data.organizationId,
        paymentFrequency: data.paymentFrequency,
        tenor: +data.tenor,
      }).unwrap()
      setShowSuccessCard(true)
    } catch (err: any) {
      console.log(err)
      setError(err?.data.message)
    }
    onClose()
  }

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="header-menu-items"
        size="small"
        style={{ marginRight: 1 }}
      >
        {t('Apply for a loan')}
      </Button>
      <Modal open={open} onCancel={onClose} className="h-fit" footer={null}>
        <h1 className="text-center pt-5">{t('Request Loan')}</h1>
        <Form onFinish={onFinish} className="p-6">
          <Form.Item
            name="loanAmount"
            label={t('Loan Amount')}
            rules={[{ required: true, message: t('Loan Amount is required') }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="tenor"
            label={t('Tenor')}
            rules={[{ required: true, message: t('Tenor is required') }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="paymentFrequency"
            label={t('Payment Frequency')}
            rules={[
              { required: true, message: t('Payment Frequency is required') },
            ]}
          >
            <Select
              options={[
                // { label: t('Every 7 Days'), value: 'EVERY_7_DAYS' },
                // { label: t('Every 15 Days'), value: 'EVERY_15_DAYS' },
                { label: t('Every Month'), value: 'EVERY_MONTH' },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="organizationId"
            label={t('Organization Name')}
            rules={[
              { required: true, message: t('Organization Name is required') },
            ]}
          >
            <Select options={SELECT_OPTIONS} />
          </Form.Item>
          {/* <Form.Item
          name="nationalId"
          label={t('National ID')}
          rules={[
            { required: true, message: t('National ID is required') },
            { len: 14, message: t('National ID must be 14 characters') },
            ]}
            >
            <Input type="string" />
            </Form.Item> */}
          <Form.Item>
            <Button
              htmlType="submit"
              className="hover:bg-[#0A6046] hover:text-white"
              loading={isLoading}
            >
              {t('Submit')}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <SuccessCard isOpen={showSuccessCard} setIsOpen={setShowSuccessCard} />
      {error && <ErrorAlert description={error} />}
    </>
  )
}

export default SimpleLoanForm
