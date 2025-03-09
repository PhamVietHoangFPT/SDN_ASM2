import { useCreatePerfumeMutation } from '../../features/perfumes/perfumesAPI'
import { useGetBrandsListQuery } from '../../features/brands/brandsAPI'
import { Button, Form, Input, InputNumber, Select, Modal, message } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const { Option } = Select

export default function AddPerfume() {
  const { data: brands } = useGetBrandsListQuery({})
  const [createPerfume, { isLoading }] = useCreatePerfumeMutation()
  const navigate = useNavigate()
  const [form] = Form.useForm()

  // State mở/đóng Modal
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Xử lý tạo nước hoa mới
  const handleCreate = async (values: any) => {
    try {
      await createPerfume({
        ...values,
        price: Number(values.price),
        volume: Number(values.volume),
      }).unwrap()

      message.success('Perfume created successfully!')
      setIsModalOpen(false)
      navigate('/admin/perfumes')
      form.resetFields()
    } catch (err: any) {
      message.error(err.data.message)
    }
  }

  return (
    <>
      {/* Button mở Modal */}
      <Button type='primary' onClick={() => setIsModalOpen(true)}>
        Add New Perfume
      </Button>

      {/* Modal tạo nước hoa */}
      <Modal
        title='Add New Perfume'
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form form={form} layout='vertical' onFinish={handleCreate}>
          <Form.Item
            label='Perfume Name'
            name='perfumeName'
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Image URL'
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
                brands.map((brand: any) => (
                  <Option key={brand._id} value={brand._id}>
                    {brand.brandName}
                  </Option>
                ))}
            </Select>
          </Form.Item>

          <Button type='primary' htmlType='submit' loading={isLoading}>
            Create Perfume
          </Button>
        </Form>
      </Modal>
    </>
  )
}
