import { Card, Typography, Descriptions, Button } from 'antd'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

const { Title } = Typography

export default function Profile() {
  const navigate = useNavigate()
  // Get user data from Cookies
  const userData = Cookies.get('userData')
    ? JSON.parse(Cookies.get('userData') || '{}')
    : null

  if (!userData) return <p>No user data available.</p>

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}>
      <Card
        title={<Title level={3}>Personal Information</Title>}
        bordered={false}
        style={{
          width: 500,
          borderRadius: 10,
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          padding: 20,
        }}
      >
        <Descriptions column={1} bordered>
          <Descriptions.Item label='Full Name'>
            {userData.name}
          </Descriptions.Item>
          <Descriptions.Item label='Email'>{userData.email}</Descriptions.Item>
          <Descriptions.Item label='Gender'>
            {userData.gender ? 'Male' : 'Female'}
          </Descriptions.Item>
        </Descriptions>

        <div
          style={{
            marginTop: 20,
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}
        >
          <Button
            type='primary'
            block
            onClick={() => navigate('/profile/editProfile')}
          >
            Edit Profile
          </Button>
          <Button
            type='primary'
            danger
            block
            onClick={() => navigate('/profile/changePassword')}
          >
            Change Password
          </Button>
        </div>
      </Card>
    </div>
  )
}
