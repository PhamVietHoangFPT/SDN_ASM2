import { apiSlice } from '../../apis/apiSlice'

export const perfumeApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    // 🟢 Lấy danh sách nước hoa (có tìm kiếm theo tên & thương hiệu)
    getPerfumeList: build.query({
      query: ({ searchPerfumeName, searchBrand }) => ({
        url: '/perfumes',
        method: 'GET',
        params: { searchPerfumeName, searchBrand },
      }),
      providesTags: ['Perfume'],
    }),

    // 🔵 Lấy chi tiết một sản phẩm nước hoa
    getPerfumeDetail: build.query({
      query: (id) => ({
        url: `/perfumes/${id}`,
        method: 'GET',
      }),
      providesTags: ['Perfume'],
    }),

    // 🟠 Thêm một nước hoa mới
    createPerfume: build.mutation({
      query: (data) => ({
        url: '/perfumes',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Perfume'],
    }),

    // 🟡 Cập nhật thông tin nước hoa
    updatePerfume: build.mutation({
      query: ({ id, data }) => ({
        url: `/perfumes/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Perfume'],
    }),

    // 🔴 Xóa nước hoa
    deletePerfume: build.mutation({
      query: (id) => ({
        url: `/perfumes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Perfume'],
    }),

    // 🟢 Thêm bình luận vào sản phẩm nước hoa
    addComment: build.mutation({
      query: ({ id, data }) => ({
        url: `/perfumes/${id}/comment`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Perfume'],
    }),

    // 🔴 Xóa bình luận của người dùng
    deleteComment: build.mutation({
      query: ({ perfumeId, commentId, authorId }) => ({
        url: `/perfumes/${perfumeId}/comment`,
        method: 'DELETE',
        body: { commentId: commentId, authorId: authorId },
      }),
      invalidatesTags: ['Perfume'],
    }),
  }),
})

export const {
  useGetPerfumeListQuery,
  useGetPerfumeDetailQuery,
  useCreatePerfumeMutation,
  useUpdatePerfumeMutation,
  useDeletePerfumeMutation,
  useAddCommentMutation,
  useDeleteCommentMutation,
} = perfumeApi
