import { apiSlice } from '../../apis/apiSlice'
import { login, logout } from './authSlice'
export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      { token: string },
      { email: string; password: string }
    >({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(login({ token: data.token }))
        } catch (error) {
          console.log(error)
        }
      },
    }),
    logout: builder.mutation<void, void>({
      queryFn: async () => ({ data: undefined }),
      async onQueryStarted(_, { dispatch }) {
        try {
          dispatch(logout())
        } catch (error) {
          console.log(error)
        }
      },
    }),
    register: builder.mutation<
      { token: string },
      {
        email: string
        password: string
        name: string
        YOB: number
        gender: boolean
      } 
    >({
      query: (credentials) => ({
        url: '/auth/register',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
})

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } =
  authApi
