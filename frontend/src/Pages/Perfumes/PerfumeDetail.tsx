import {
  useGetPerfumeDetailQuery,
  useAddCommentMutation,
  useDeleteCommentMutation,
} from '../../features/perfumes/perfumesAPI'
import { useParams } from 'react-router-dom'
import Cookies from 'js-cookie'
import {
  Card,
  Spin,
  Typography,
  Image,
  Descriptions,
  List,
  Form,
  Input,
  Button,
  Rate,
  message,
} from 'antd'
import { useState } from 'react'

const { Title, Text } = Typography

export default function PerfumeDetail() {
  const { perfumesId } = useParams()
  interface CommentType {
    _id: string
    rating: number
    content: string
    author: {
      _id: any
      name: string
    }
  }
  const {
    data: perfume,
    error,
    isLoading: loading,
  } = useGetPerfumeDetailQuery(perfumesId)

  const [addComment] = useAddCommentMutation()
  const [commentData, setCommentData] = useState({
    content: '',
    rating: 0,
  })

  const [deleteComment] = useDeleteCommentMutation()
  const handleDeleteComment = async (
    commentId: string,
    authorId: string,
    perfumeId: string
  ) => {
    await deleteComment({
      perfumeId: perfumeId,
      commentId: commentId,
      authorId: authorId,
    }).unwrap()
  }

  const handleCommentSubmit = async () => {
    try {
      const userData = Cookies.get('userData')
        ? JSON.parse(Cookies.get('userData') || '{}')
        : null

      if (!userData || !userData.id) {
        message.warning('You need to log in to leave a comment!')
        return
      }

      if (!commentData.content.trim()) {
        message.warning('Please enter your comment!')
        return
      }

      const response = await addComment({
        id: perfumesId, // Đúng theo mutation đã định nghĩa
        data: {
          authorId: userData.id,
          perfumeId: perfumesId,
          content: commentData.content,
          rating: commentData.rating,
        },
      }).unwrap()

      if (response?.comment) {
        setCommentData({ content: '', rating: 0 })
        message.success('Comment added successfully!')
      }
    } catch (error: any) {
      console.log(error)
      message.error(error.data.message)
    }
  }

  const dataPerfumeDetail = perfume?.perfume
  const comment = dataPerfumeDetail?.comment
  console.log(comment)

  if (loading)
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
          style={{ objectFit: 'cover', borderRadius: 10 }}
        />
      }
    >
      <Title level={2}>{dataPerfumeDetail.perfumeName}</Title>
      <Descriptions column={1} bordered>
        <Descriptions.Item label='Brand'>
          {dataPerfumeDetail.brand.brandName}
        </Descriptions.Item>
        <Descriptions.Item label='Price'>
          <Text style={{ color: '#d9534f', fontWeight: 'bold' }}>
            ${dataPerfumeDetail.price}
          </Text>
        </Descriptions.Item>
        <Descriptions.Item label='Volume'>
          {dataPerfumeDetail.volume} ml
        </Descriptions.Item>
        <Descriptions.Item label='Concentration'>
          {dataPerfumeDetail.concentration}
        </Descriptions.Item>
        <Descriptions.Item label='Ingredients'>
          {dataPerfumeDetail.ingredients}
        </Descriptions.Item>
        <Descriptions.Item label='Target Audience'>
          {dataPerfumeDetail.targetAudience}
        </Descriptions.Item>
      </Descriptions>
      {/* Form thêm bình luận */}
      {Cookies.get('userData') &&
      !comment?.some(
        (c: { author: { _id: any } }) =>
          c.author._id === JSON.parse(Cookies.get('userData') || '{}').id
      ) ? (
        <div className='mt-5'>
          <Title level={3}>Leave a Comment</Title>
          <Form layout='vertical' onFinish={handleCommentSubmit}>
            <Form.Item label='Your Comment'>
              <Input.TextArea
                rows={3}
                value={commentData.content}
                onChange={(e) =>
                  setCommentData({ ...commentData, content: e.target.value })
                }
                placeholder='Write your comment...'
              />
            </Form.Item>
            <Form.Item label='Rating' rules={[{ required: true }]}>
              <Rate
                value={commentData.rating}
                count={3}
                onChange={(value) =>
                  setCommentData({ ...commentData, rating: value })
                }
              />
            </Form.Item>
            <Form.Item>
              <Button type='primary' htmlType='submit'>
                Add Comment
              </Button>
            </Form.Item>
          </Form>
        </div>
      ) : (
        <Text type='danger'>You have already commented on this perfume</Text>
      )}

      {/* Danh sách bình luận */}
      {comment.length > 0 && (
        <div>
          <Title level={3}>Comments</Title>
          <List
            itemLayout='horizontal'
            dataSource={comment}
            renderItem={(item: CommentType) => (
              <List.Item>
                <Card
                  style={{
                    width: '100%',
                    borderRadius: 10,
                    backgroundColor: '#f9f9f9',
                  }}
                >
                  <List.Item.Meta
                    title={
                      <Text strong style={{ fontSize: '16px', color: '#333' }}>
                        {item.author.name}
                      </Text>
                    }
                    description={
                      <div>
                        <Rate
                          disabled
                          value={item.rating}
                          count={3}
                          style={{ color: '#faad14' }}
                        />
                        <p style={{ marginTop: 5, color: '#555' }}>
                          {item.content}
                        </p>
                      </div>
                    }
                  />
                  {Cookies.get('userData') &&
                  JSON.parse(Cookies.get('userData') || '{}').id ===
                    item.author._id ? (
                    <Button
                      onClick={() =>
                        handleDeleteComment(
                          item._id,
                          item.author._id,
                          (perfumesId ?? '').toString()
                        )
                      }
                      danger
                    >
                      Delete Comment
                    </Button>
                  ) : null}
                </Card>
              </List.Item>
            )}
          />
        </div>
      )}
    </Card>
  )
}
