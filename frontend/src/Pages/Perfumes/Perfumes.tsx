import { Card, Col, Row, Button } from 'antd'
import { useGetPerfumeListQuery } from '../../features/perfumes/perfumesAPI'
import { useNavigate } from 'react-router-dom'
const Perfumes = () => {
  const navigate = useNavigate()
  const { data, error, isLoading } = useGetPerfumeListQuery({})
  interface Perfume {
    _id: string
    perfumeName: string
    uri: string
    price: number
    targetAudience: string
    brand: {
      brandName: string
    }
  }

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error loading perfumes.</p>

  return (
    <Row gutter={[16, 16]} justify='center' style={{ padding: 20 }}>
      {data?.perfumes?.map((perfume: Perfume) => (
        <Col key={perfume._id} xs={24} sm={12} md={8} lg={6}>
          <Card
            hoverable
            style={{
              height: '100%', // Đảm bảo các card có chiều cao đồng đều
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderRadius: 10,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}
            cover={
              <img
                alt={perfume.perfumeName}
                src={perfume.uri}
                style={{
                  height: 250,
                  objectFit: 'cover',
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                }}
              />
            }
          >
            <Card.Meta
              title={
                <span
                  style={{
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {perfume.perfumeName}
                </span>
              }
              description={
                <span
                  style={{
                    color: '#888',
                    display: 'block',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {perfume.brand.brandName}
                </span>
              }
            />
            <div style={{ marginTop: 8, flex: 1 }}>
              <p className='text-lg font-semibold text-gray-700'>
                ${perfume.price}
              </p>
              <p className='text-gray-500 text-sm'>
                For: {perfume.targetAudience}
              </p>
            </div>
            <Button
              type='primary'
              block
              onClick={() => {
                navigate(`/perfumes/${perfume._id}`)
              }}
            >
              Detail
            </Button>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default Perfumes
