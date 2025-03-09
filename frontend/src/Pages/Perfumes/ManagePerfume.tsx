import { Table, Button, Space, Modal, message, Image, Typography } from 'antd'
import {
  useGetPerfumeListQuery,
  useDeletePerfumeMutation,
} from '../../features/perfumes/perfumesAPI'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import AddPerfume from './AddPerfume'

const { Text } = Typography

export default function ManagePerfumes() {
  const { data: perfumes, isLoading } = useGetPerfumeListQuery({})
  const navigate = useNavigate()
  const dataPerfumes = perfumes?.perfumes
  const [deletePerfume] = useDeletePerfumeMutation()

  // Xác nhận xóa nước hoa
  const handleDelete = (id: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this perfume?',
      okText: 'Yes',
      cancelText: 'No',
      onOk: async () => {
        try {
          await deletePerfume(id).unwrap()
          message.success('Perfume deleted successfully')
        } catch (err: any) {
          message.error(err.message)
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
      width: 60,
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: 'Image',
      dataIndex: 'uri',
      key: 'uri',
      render: (uri: string) => <Image src={uri} width={50} height={50} />,
    },
    {
      title: 'Name',
      dataIndex: 'perfumeName',
      key: 'perfumeName',
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
      render: (brand: { brandName: string }) => brand?.brandName || 'Unknown',
    },
    {
      title: 'Price ($)',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Target',
      dataIndex: 'targetAudience',
      key: 'targetAudience',
      render: (target: string) => <Text strong>{target.toUpperCase()}</Text>,
    },
    {
      title: 'Ingredients',
      dataIndex: 'ingredients',
      key: 'ingredients',
    },
    {
      title: 'Volume (ml)',
      dataIndex: 'volume',
      key: 'volume',
    },
    {
      title: 'Reviews',
      dataIndex: 'comment',
      key: 'comment',
      render: (comment: any[]) => comment?.length || 0,
    },
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space>
          <Button
            type='primary'
            icon={<EditOutlined />}
            onClick={() => navigate(`${record._id}`)}
          >
            Edit
          </Button>
          <Button
            type='primary'
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

  return (
    <div style={{ padding: 20, background: '#fff', borderRadius: 8 }}>
      <h2>Manage Perfumes</h2>
      <AddPerfume />
      <Table
        columns={columns}
        dataSource={
          Array.isArray(dataPerfumes)
            ? dataPerfumes?.map((item: any, index: any) => ({
                ...item,
                key: item._id,
                index: index + 1,
              }))
            : []
        }
        loading={isLoading}
        bordered
        pagination={{ pageSize: 10 }}
      />
    </div>
  )
}
