import React, { useState } from 'react'
import { Table, Button, Space, Typography, message, Modal, Input } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import AddBrands from './AddBrands'
import {
  useGetBrandsListQuery,
  useUpdateBrandsMutation,
  useDeleteBrandsMutation,
} from '../../features/brands/brandsAPI'

const { Title } = Typography

export default function BrandsManager() {
  const { data: brands, error, isLoading } = useGetBrandsListQuery({})
  const [updateBrands] = useUpdateBrandsMutation()
  const [deleteBrands] = useDeleteBrandsMutation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentBrand, setCurrentBrand] = useState<{
    _id: string
    brandName: string
  } | null>(null)

  // Mở modal và đặt dữ liệu thương hiệu
  const handleEdit = (brand: { _id: string; brandName: string }) => {
    setCurrentBrand(brand)
    setIsModalOpen(true)
  }

  // Đóng modal
  const handleCancel = () => {
    setIsModalOpen(false)
    setCurrentBrand(null)
  }

  // Lưu thay đổi
  const handleSave = async () => {
    try {
      if (currentBrand) {
        const data = await updateBrands({
          id: currentBrand._id,
          data: { brandName: currentBrand.brandName },
        }).unwrap()
        message.success((data as { message: string }).message)
      }
    } catch (error: any) {
      message.error(error.message)
    }
    setIsModalOpen(false)
  }

  // Xử lý khi thay đổi tên thương hiệu
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (currentBrand) {
      setCurrentBrand({ ...currentBrand, brandName: e.target.value })
    }
  }

  const handleDelete = async (_id: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this brand?',
      content: 'This action cannot be undone.',
      okText: 'Yes, delete it',
      cancelText: 'Cancel',
      okType: 'danger',
      onOk: async () => {
        try {
          const data = await deleteBrands(_id).unwrap()
          message.success((data as { message: string }).message)
        } catch (error: any) {
          message.error(error.data.message)
        }
      },
    })
  }

  // Cấu hình cột của bảng
  const columns = [
    {
      title: 'No.',
      dataIndex: 'index',
      key: 'index',
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: 'Brand Name',
      dataIndex: 'brandName',
      key: 'brandName',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space>
          <Button
            type='default'
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Button
            type='default'
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record._id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ]

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading brands</div>

  return (
    <div style={{ padding: 20 }}>
      <Title level={3}>Brands Management</Title>
      <AddBrands />
      {Array.isArray(brands) && (
        <Table
          columns={columns}
          dataSource={
            brands?.map((brand: any, index: number) => ({
              ...brand,
              key: brand.id,
              index: index + 1,
            })) || []
          } // Giá trị mặc định là mảng rỗng
          pagination={{ pageSize: 10 }}
        />
      )}

      {/* Modal chỉnh sửa thương hiệu */}
      <Modal
        title='Edit Brand'
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleSave}
        okText='Save'
        cancelText='Cancel'
      >
        <Input
          value={currentBrand?.brandName}
          onChange={handleNameChange}
          placeholder='Enter brand name'
        />
      </Modal>
    </div>
  )
}
