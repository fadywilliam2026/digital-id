import { Button, Flex } from 'antd'
import { EditOutlined } from '@ant-design/icons'

type EditTextFieldProps = {
  text: string
  setOpen: (value: boolean) => void
}

const EditTextField = ({ text, setOpen }: EditTextFieldProps) => {
  return (
    <Flex align="center" justify="center">
      <p>{text}</p>
      <Button
        type="link"
        icon={<EditOutlined className="text-[#0A6046] text-lg" />}
        onClick={() => setOpen(true)}
      />
    </Flex>
  )
}
export default EditTextField
