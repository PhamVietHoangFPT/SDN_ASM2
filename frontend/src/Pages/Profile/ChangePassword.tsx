import { Form, Input, Button, Card, Typography, message } from 'antd'
import { useEditPasswordMutation } from '../../features/profile/profileAPI'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
const { Title } = Typography
import { useNavigate } from 'react-router-dom'

interface PasswordData {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

export default function ChangePassword() {
  const [editPassword, { isLoading }] = useEditPasswordMutation()
  const navigate = useNavigate()
  const userData = Cookies.get('userData')
    ? JSON.parse(Cookies.get('userData') || '{}')
    : null

  const onFinish = async (values: PasswordData) => {
    if (values.oldPassword === values.newPassword) {
      message.error('New password must be different from the old password!')
      return
    }

    if (values.newPassword !== values.confirmPassword) {
      message.error('Passwords do not match!')
      return
    }

    try {
      const data = await editPassword({
        email: userData.email,
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      }).unwrap()
      message.success(data.message)
      Cookies.set('userToken', data.token)
      const decoded: any = jwtDecode(data.token)
      Cookies.set('userData', JSON.stringify(decoded))
      navigate('/profile')
    } catch (error: any) {
      message.error(error.data.message)
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}>
      <Card
        title={<Title level={3}>Change Password</Title>}
        bordered={false}
        style={{
          width: 500,
          borderRadius: 10,
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          padding: 20,
        }}
      >
        <Form layout='vertical' onFinish={onFinish}>
          {/* OLD PASSWORD */}
          <Form.Item
            label='Old Password'
            name='oldPassword'
            rules={[
              { required: true, message: 'Please enter your old password!' },
            ]}
          >
            <Input.Password />
          </Form.Item>

          {/* NEW PASSWORD */}
          <Form.Item
            label='New Password'
            name='newPassword'
            rules={[
              { required: true, message: 'Please enter your new password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('oldPassword') !== value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(
                    new Error(
                      'New password must be different from the old password!'
                    )
                  )
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          {/* CONFIRM PASSWORD */}
          <Form.Item
            label='Confirm Password'
            name='confirmPassword'
            dependencies={['newPassword']}
            rules={[
              { required: true, message: 'Please confirm your new password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('Passwords do not match!'))
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          {/* BUTTONS */}
          <div style={{ display: 'flex', gap: 10 }}>
            <Button type='primary' htmlType='submit' loading={isLoading}>
              Change Password
            </Button>
            <Button onClick={() => (window.location.href = '/members/profile')}>
              Cancel
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  )
}
