import { RegisterForm } from '../../components/Authentication/RegisterForm'
import Logo from '../../assets/Logo.jpg'
import { Layout, Card, Typography, Row, Col, Button } from 'antd'
const { Title } = Typography
const { Content } = Layout
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const navigate = useNavigate()
  return (
    <Layout
      style={{
        minHeight: 'calc(100vh - 124px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Content style={{ width: '80%', maxWidth: '1200px', display: 'flex' }}>
        <Row gutter={[32, 32]} align='middle'>
          {/* Hình ảnh */}
          <Col xs={24} md={12} style={{ textAlign: 'center' }}>
            <img
              src={Logo}
              alt='Register'
              style={{ maxWidth: '100%', height: 'auto', borderRadius: '12px' }}
            />
          </Col>

          {/* Form đăng ký */}
          <Col xs={24} md={12}>
            <Card
              bordered={false}
              style={{
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                borderRadius: '12px',
                padding: '24px',
              }}
            >
              <Title
                level={2}
                style={{ textAlign: 'center', marginBottom: '24px' }}
              >
                Create account
              </Title>
              <RegisterForm />
              <Button
                type='link'
                onClick={() => navigate('/')}
                style={{ padding: 0, margin: 0 }}
              >
                Back to home
              </Button>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  )
}
