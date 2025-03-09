import { Form, Input, Button, notification } from 'antd'
import { useLoginMutation } from '../../features/auth/authApi'

import { useNavigate } from 'react-router-dom'

export const LoginForm = () => {
  const [form] = Form.useForm()
  const [login, { isLoading }] = useLoginMutation()

  const navigate = useNavigate()

  const handleSubmit = async (values: any) => {
    const response = await login(values)

    if ('data' in response) {
      navigate('/')
    } else if ('error' in response && response.error) {
      const errorData = response.error as any
      if (
        typeof errorData === 'object' &&
        'data' in errorData &&
        typeof errorData.data === 'object' &&
        errorData.data !== null &&
        'message' in errorData.data
      ) {
        notification.error({
          message: 'Login failed',
          description: errorData.data.message,
        })
      }
    }
  }

  return (
    <>
      <Form
        form={form}
        layout='vertical'
        onFinish={handleSubmit}
        name='basic'
        initialValues={{ remember: true }}
        autoComplete='on'
        style={{
          padding: 24,
          background: '#fff',
          borderRadius: 8,
          boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
        }}
      >
        <Form.Item
          name='email'
          rules={[{ required: true, message: 'Please enter your email' }]}
        >
          <Input placeholder='Email' />
        </Form.Item>

        {/* Password field */}
        <Form.Item
          name='password'
          rules={[
            { required: true, message: 'Please enter your password' },
            // { min: 6, message: 'Password must be at least 6 characters' },
          ]}
        >
          <Input.Password placeholder='Enter your password' />
        </Form.Item>

        <Form.Item>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <Button type='link' onClick={() => navigate('/register')}>
                Don't have an account? Register now
              </Button>
            </div>
            <div>
              <Button type='primary' htmlType='submit' loading={isLoading}>
                Login
              </Button>
            </div>
          </div>
        </Form.Item>
      </Form>
    </>
  )
}
