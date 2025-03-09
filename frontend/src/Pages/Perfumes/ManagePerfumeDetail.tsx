import {
  useGetPerfumeDetailQuery,
  useUpdatePerfumeMutation,
} from '../../features/perfumes/perfumesAPI'
import { useGetBrandsListQuery } from '../../features/brands/brandsAPI'
import { useParams } from 'react-router-dom'
import {
  Card,
  Spin,
  Typography,
  Image,
  Form,
  Input,
  Button,
  message,
  InputNumber,
  Select,
} from 'antd'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const { Title, Text } = Typography
const { Option } = Select

export default function ManagePerfumeDetail() {
  const { perfumesId } = useParams()
  const navigate = useNavigate()
  const {
    data: perfume,
    error,
    isLoading,
  } = useGetPerfumeDetailQuery(perfumesId)
  const { data: brands } = useGetBrandsListQuery({})
  const [updatePerfume, { isLoading: isUpdating }] = useUpdatePerfumeMutation()

  const dataPerfumeDetail = perfume?.perfume

  const [form] = Form.useForm()

  // Set dữ liệu vào form khi có data
  useEffect(() => {
    if (dataPerfumeDetail) {
      form.setFieldsValue({
        perfumeName: dataPerfumeDetail.perfumeName || '',
        uri: dataPerfumeDetail.uri || '',
        price: dataPerfumeDetail.price ? Number(dataPerfumeDetail.price) : 0,
        volume: dataPerfumeDetail.volume ? Number(dataPerfumeDetail.volume) : 0,
        concentration: dataPerfumeDetail.concentration || '',
        ingredients: dataPerfumeDetail.ingredients || '',
        targetAudience: dataPerfumeDetail.targetAudience || '',
        brand: dataPerfumeDetail.brand._id || '',
        description: dataPerfumeDetail.description || '',
      })
    }
  }, [dataPerfumeDetail, form])

  const handleUpdate = async (values: any) => {
    const inputValues = {
      ...values,
      price: Number(values.price),
      volume: Number(values.volume),
    }
    try {
      const data = await updatePerfume({
        id: perfumesId,
        data: inputValues,
      }).unwrap()
      message.success(data.message)
      navigate('/admin/perfumes')
    } catch (err: any) {
      message.error(err.data.message)
    }
  }

  if (isLoading)
    return (
      <Spin size='large' style={{ display: 'block', margin: '50px auto' }} />
    )

  if (error) {
    const errorMessage = 'status' in error ? error.status : error.message
    return <Text type='danger'>{errorMessage}</Text>
  }

  return (
    <Card
      style={{
        maxWidth: 900,
        margin: '50px auto',
        padding: 20,
        borderRadius: 10,
      }}
      cover={
        <Image
          alt={dataPerfumeDetail.perfumeName}
          src={dataPerfumeDetail.uri}
          style={{ width: 200, objectFit: 'cover', borderRadius: 10 }}
        />
      }
    >
      <Title level={2}>{dataPerfumeDetail.perfumeName}</Title>

      {/* Form cập nhật */}
      <Form
        form={form}
        layout='vertical'
        onFinish={handleUpdate}
        initialValues={{
          perfumeName: dataPerfumeDetail.perfumeName,
          price: dataPerfumeDetail.price,
          volume: dataPerfumeDetail.volume,
          concentration: dataPerfumeDetail.concentration,
          ingredients: dataPerfumeDetail.ingredients,
          targetAudience: dataPerfumeDetail.targetAudience,
          brand: dataPerfumeDetail.brand._id,
        }}
      >
        <Form.Item
          label='Perfume Name'
          name='perfumeName'
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Image url'
          name='uri'
          rules={[
            { required: true },
            { type: 'url', message: 'Please enter a valid URL' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Description'
          name='description'
          rules={[{ required: true }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label='Price ($)'
          name='price'
          rules={[{ required: true, type: 'number' }]}
        >
          <InputNumber style={{ width: '100%' }} min={1} />
        </Form.Item>

        <Form.Item
          label='Volume (ml)'
          name='volume'
          rules={[{ required: true, type: 'number' }]}
        >
          <InputNumber style={{ width: '100%' }} min={1} />
        </Form.Item>

        <Form.Item label='Concentration' name='concentration'>
          <Input />
        </Form.Item>

        <Form.Item label='Ingredients' name='ingredients'>
          <Input.TextArea rows={2} />
        </Form.Item>

        <Form.Item label='Target Audience' name='targetAudience'>
          <Select>
            <Option value='male'>Male</Option>
            <Option value='female'>Female</Option>
            <Option value='unisex'>Unisex</Option>
          </Select>
        </Form.Item>

        <Form.Item label='Brand' name='brand'>
          <Select>
            {Array.isArray(brands) &&
              brands?.map((brand: any) => (
                <Option key={brand._id} value={brand._id}>
                  {brand.brandName}
                </Option>
              ))}
          </Select>
        </Form.Item>

        <Button type='primary' htmlType='submit' loading={isUpdating}>
          Update Perfume
        </Button>
      </Form>
    </Card>
  )
}
