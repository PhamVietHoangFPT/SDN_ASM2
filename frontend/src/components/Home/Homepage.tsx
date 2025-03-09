import { Typography, Button, Row, Col, List } from 'antd'
import { ShoppingOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
const { Title, Paragraph } = Typography

const Homepage = () => {
  const navigate = useNavigate()
  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <Title level={1}>Welcome to Perfume Store</Title>
        <Paragraph>Explore the best perfumes and brands!</Paragraph>
      </div>

      {/* About Section */}
      <Row gutter={[24, 24]} align='middle'>
        <Col xs={24} md={12}>
          <img
            src='https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg'
            alt='Perfume'
            style={{
              width: '100%',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}
          />
        </Col>
        <Col xs={24} md={12}>
          <Title level={2}>About Our Store</Title>
          <Paragraph>
            We offer a wide selection of luxury perfumes from top brands.
            Whether you are looking for a signature scent or a gift for someone
            special, we have the perfect fragrance for you.
          </Paragraph>
          <List
            bordered
            dataSource={[
              'Premium quality perfumes',
              'Exclusive brands and collections',
              'Fast and reliable delivery',
            ]}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
        </Col>
      </Row>

      {/* Why Choose Us Section */}
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <Title level={2}>Why Choose Us?</Title>
        <Paragraph>
          We provide 100% authentic perfumes, excellent customer service, and
          the best prices in the market.
        </Paragraph>
        <Button
          type='primary'
          size='large'
          icon={<ShoppingOutlined />}
          onClick={() => navigate('/perfumes')}
        >
          Shop Now
        </Button>
      </div>
    </div>
  )
}

export default Homepage
