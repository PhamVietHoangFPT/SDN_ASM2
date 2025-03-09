import { apiSlice } from '../../apis/apiSlice'

export const profileApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    editProfile: build.mutation({
      query: (data) => ({
        url: '/members/editProfile', // API để sửa profile
        method: 'PUT',
        body: data, // Dữ liệu: { email, name, YOB, gender }
      }),
      invalidatesTags: ['Profile'],
    }),

    // 🔐 API đổi mật khẩu
    editPassword: build.mutation({
      query: (data) => ({
        url: '/members/changePassword', // API để đổi mật khẩu
        method: 'PUT',
        body: data, // Dữ liệu: { oldPassword, newPassword }
      }),
      invalidatesTags: ['Profile'],
    }),
  }),
})

export const {
  useEditProfileMutation,
  useEditPasswordMutation,
} = profileApi
