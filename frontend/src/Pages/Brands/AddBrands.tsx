import { useState } from 'react'
import { Button, Modal, Form, Input, message } from 'antd'
import { useCreateBrandsMutation } from '../../features/brands/brandsAPI'

export default function AddBrands() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()
  const [createBrand, { isLoading }] = useCreateBrandsMutation()

  // Mở modal
  const showModal = () => setIsModalOpen(true)

  // Đóng modal
  const handleCancel = () => {
    form.resetFields()
    setIsModalOpen(false)
  }

  // Xử lý tạo brand
  const handleCreate = async () => {
    try {
      const values = await form.validateFields()
      await createBrand({ brandName: values.brandName }).unwrap()
      message.success('Brand created successfully!')
      handleCancel()
    } catch (error: any) {
      message.error(error.message || 'Failed to create brand!')
    }
  }

  return (
    <>
      <Button type='primary' onClick={showModal}>
        Add Brand
      </Button>

      <Modal
        title='Create New Brand'
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleCreate}
        confirmLoading={isLoading}
        okText='Create'
        cancelText='Cancel'
      >
        <Form form={form} layout='vertical'>
          <Form.Item
            label='Brand Name'
            name='brandName'
            rules={[
              { required: true, message: 'Please enter the brand name!' },
            ]}
          >
            <Input placeholder='Enter brand name' />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
