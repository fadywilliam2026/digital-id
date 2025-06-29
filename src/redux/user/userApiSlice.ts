import { Client } from '../../model/clientModel'
import {
  PaymentAttemptInfo,
  PaymentStatus,
} from '../../model/paymentAttemptModel'
import { User } from '../../model/userModel'
import { apiSlice } from '../api/apiSlice'
import { Location } from '../contract/contractApiSlice'
import { setLanguage } from './userSlice'

type UpdateUnverified = {
  phoneNumber?: string
  email?: string
}

type UpdateQuestion = {
  oldQuestionId: number
  newQuestionId?: number
  answer: string
}

type UpdatePaymentAttempt = {
  status: PaymentStatus
  info: PaymentAttemptInfo
}

type UpdateUser = {
  currentLocation?: Location
  userName?: string
  currentPassword?: string
  newPassword?: string
  questions?: UpdateQuestion[]
  paymentAttempt?: UpdatePaymentAttempt
}

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    update: build.mutation<User, UpdateUser>({
      query: (body) => ({
        url: 'users/update',
        method: 'PUT',
        body: body,
      }),
    }),
    getUserConfig: build.query<{ appLanguage: string }, null>({
      query: () => ({
        url: 'users/user-config',
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const response = await queryFulfilled
        dispatch(setLanguage(response.data.appLanguage))
      },
    }),
    userConfig: build.mutation({
      query: (body) => ({
        url: 'users/user-config',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['Notification'],
    }),
    recordUserDevice: build.mutation({
      query: (body) => ({
        url: 'users/recordUserDevice',
        method: 'POST',
        body: body,
      }),
    }),
    updateUnverified: build.mutation<User, UpdateUnverified>({
      query: (body) => ({
        url: 'users/update-unverified',
        method: 'POST',
        body,
      }),
    }),
    getUserById: build.query<User, number>({
      query: (id) => `users/${id}`,
    }),
    getUserByNationalId: build.query<Client, string | undefined>({
      query: (nationalId) => `users/nationalId/${nationalId}`,
    }),
    validateAnswer: build.mutation({
      query: (body) => ({
        url: 'users/validateAnswer',
        method: 'POST',
        body,
      }),
    }),
    getPayment: build.query({
      query: (id: number) => `users/payment/${id}`,
    }),
    simpleLoan: build.mutation({
      query: (body) => ({
        url: 'users/simpleLoan',
        method: 'POST',
        body,
      }),
    }),
    uploadFile: build.mutation({
      query: (body) => ({
        url: 'users/uploadFile',
        method: 'POST',
        body,
      }),
    }),
    getUploadedFile: build.query({
      query: (id: number) => `users/getUploadedFile/${id}`,
    }),
  }),
})

export const {
  useUpdateMutation,
  useGetUserConfigQuery,
  useUserConfigMutation,
  useRecordUserDeviceMutation,
  useUpdateUnverifiedMutation,
  useGetUserByNationalIdQuery,
  useValidateAnswerMutation,
  useGetPaymentQuery,
  useSimpleLoanMutation,
  useGetUserByIdQuery,
  useUploadFileMutation,
  useGetUploadedFileQuery,
} = extendedApi
