import { Flex, Input, Select, Space } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import i18n from '../i18n'
import { useGetQuestionsQuery } from '../redux/auth/authApiSlice'

interface Field {
  securityQuestionId: number
  answer: string
}

interface QuestionProps {
  label: string
  field: Field
  setField: React.Dispatch<React.SetStateAction<Field>>
  selectedQuestionIds?: number
}

const Question = ({
  label,
  field,
  setField,
  selectedQuestionIds,
}: QuestionProps) => {
  const { data: questionsOptions } = useGetQuestionsQuery()
  const { t } = useTranslation()
  const handleChange = (value: number) => {
    setField({ ...field, securityQuestionId: value, answer: '' })
  }

  const filteredQuestions = questionsOptions?.filter(
    (question) => question.id !== selectedQuestionIds,
  )

  return (
    <>
      <h3 className="text-gray-900 font-semibold text-left mb-1">{label}</h3>
      <Flex vertical gap={10}>
        <Space className="my-select-container">
          <Select
            value={
              filteredQuestions?.find(
                (q) => q.id === field.securityQuestionId,
              )?.[i18n.language === 'en' ? 'en' : 'ar']
            }
            onChange={(value) => handleChange(+value)}
            options={filteredQuestions?.map((question) => {
              return { label: question.ar, value: question.id }
            })}
            className=" h-12 w-[21rem] rounded-none "
          />
        </Space>
        <Input
          placeholder={t('answer')}
          value={field.answer}
          onChange={(e) => setField({ ...field, answer: e.target.value })}
          className="rounded-none w-[21rem] h-12"
        />
      </Flex>
    </>
  )
}

export default Question
