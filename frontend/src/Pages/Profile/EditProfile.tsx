import { Form, Input, Button, Card, Typography, Select, message } from 'antd'
import Cookies from 'js-cookie'
import { useEditProfileMutation } from '../../features/profile/profileAPI'
import { jwtDecode } from 'jwt-decode'
const { Title } = Typography
import { useNavigate } from 'react-router-dom'

interface UserData {
  email: string
  name: string
  YOB: number
  gender: boolean
}

export default function EditProfile() {
  const navigate = useNavigate()
  // Lấy dữ liệu user từ Cookies
  const userData: UserData | null = Cookies.get('userData')
    ? JSON.parse(Cookies.get('userData') || '{}')
    : null
  console.log(userData)
  const [editProfile, { isLoading }] = useEditProfileMutation()

  const onFinish = async (values: UserData) => {
    try {
      const data = await editProfile(values).unwrap()
      Cookies.set('userToken', data.token)
      const decoded: any = jwtDecode(data.token)
      Cookies.set('userData', JSON.stringify(decoded))
      message.success(data.message)
      navigate('/profile')
    } catch (error: any) {
      message.error(error.message)
    }
  }

  if (!userData) return <p>Không có dữ liệu người dùng.</p>

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}>
      <Card
        title={<Title level={3}>Edit Profile</Title>}
        bordered={false}
        style={{
          width: 500,
          borderRadius: 10,
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          padding: 20,
        }}
      >
        <Form layout='vertical' initialValues={userData} onFinish={onFinish}>
          <Form.Item label='Email' name='email'>
            <Input disabled />
          </Form.Item>

          <Form.Item
            label='Full Name'
            name='name'
            rules={[
              { required: true, message: 'Please enter your full name!' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Year of Birth'
            name='yob'
            rules={[
              { required: true, message: 'Please enter your year of birth!' },
            ]}
          >
            <Input type='number' />
          </Form.Item>

          <Form.Item label='Gender' name='gender'>
            <Select>
              <Select.Option value={true}>Male</Select.Option>
              <Select.Option value={false}>Female</Select.Option>
            </Select>
          </Form.Item>

          <div style={{ display: 'flex', gap: 10 }}>
            <Button type='primary' htmlType='submit' loading={isLoading}>
              Save
            </Button>
            <Button onClick={() => navigate('/profile')}>
              Cancel
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  )
}
