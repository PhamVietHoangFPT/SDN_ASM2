import { apiSlice } from '../../apis/apiSlice'

export const testApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getBrandsList: build.query({
      query: () => ({
        url: '/brands',
        method: 'GET',
      }),
      transformResponse: (res) => res,
      providesTags: ['brands'],
    }),
    createBrands: build.mutation({
      query: (data) => ({
        url: '/brands/add',
        method: 'POST',
        body: data,
      }),
      transformResponse: (res) => res,
      invalidatesTags: ['brands'],
    }),
    updateBrands: build.mutation({
      query: ({ data, id }) => ({
        url: `/brands/${id}`,
        method: 'PUT',
        body: data,
      }),
      transformResponse: (res) => res,
      invalidatesTags: ['brands'],
    }),
    deleteBrands: build.mutation({
      query: (id) => ({
        url: `/brands/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (res) => res,
      invalidatesTags: ['brands'],
    }),
  }),
})

export const {
  useGetBrandsListQuery,
  useCreateBrandsMutation,
  useUpdateBrandsMutation,
  useDeleteBrandsMutation,
} = testApi
