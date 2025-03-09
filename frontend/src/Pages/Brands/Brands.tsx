import { useGetBrandsListQuery } from '../../features/brands/brandsAPI'
import { Card, Row, Col, Spin, Alert } from 'antd'

interface Brand {
  _id: string
  brandName: string
}

export default function Brands() {
  const { data, error, isLoading } = useGetBrandsListQuery({})

  if (isLoading)
    return (
      <Spin
        size='large'
        style={{ display: 'block', textAlign: 'center', marginTop: 50 }}
      />
    )
  if (error)
    return <Alert message='Error loading brands!' type='error' showIcon />

  return (
    <Row gutter={[16, 16]} style={{ padding: 20 }}>
      {Array.isArray(data) &&
        data.map((brand: Brand) => (
          <Col xs={24} sm={12} md={8} lg={6} key={brand._id}>
            <Card hoverable style={{ borderRadius: 10, textAlign: 'center' }}>
              <h3>{brand.brandName}</h3>
            </Card>
          </Col>
        ))}
    </Row>
  )
}
