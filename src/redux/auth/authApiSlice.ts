interface Question {
  id: number
  en: string
  ar: string
  question_order: number
  created_at: Date
  updated_at: Date
}

interface SecurityQuestion {
  id: number
  createdAt: Date
  updatedAt: Date
  securityQuestionId: number
  userId: number
  answer: string
  securityQuestions: {
    id: number
    createdAt: Date
    updatedAt: Date
    en: string
    ar: string
    questionOrder: number
  }
}

interface Login {
  username: string
  password: string
}

// interface SignupForm {
//   username: string;
//   email: string;
//   phone_number: string;
//   password: string;
//   deviceId: string;
//   questions: Question[];
// }
//TODO: ADD USER status && user type
type UserStatus =
  | 'initial'
  | 'phone_verified'
  | 'email_verified'
  | 'id_verified'
  | 'location_verified'
  | 'active'
  | 'locked'
  | 'id_expired'
  | 'pending_sign'

interface User {
  id: number
  userName: string
  nationalId: string
  phoneNumber: string
  email: string
  deviceId: string
  longitude: number
  latitude: number
  ipAddress: string
  secondaryEmail: string
  secondaryPhoneNumber: string | null
  isLocked: boolean
  isPhoneVerified: boolean
  isEmailVerified: boolean
  status: UserStatus
  idExpiration: Date
  isExpired: false
  verifiedAt: Date
  createdAt: Date
  updatedAt: Date
  securityQuestions: SecurityQuestion[]
  accessToken: string
  refreshToken: string
  userType: string
}

interface Validateignup {
  username: string
  email: string
  phone_number: string
}

import { apiSlice } from '../api/apiSlice'

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getQuestions: build.query<Question[], void>({
      query: () => 'auth/getSecurityQuestions',
    }),
    validateSignup: build.mutation<unknown, Validateignup>({
      query: (body) => ({
        url: '/auth/validateSignup',
        method: 'POST',
        body: body,
      }),
    }),
    signup: build.mutation({
      query: (body) => ({
        url: '/auth/signup',
        method: 'POST',
        body: body,
      }),
    }),
    login: build.mutation<User, Login>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body: body,
      }),
    }),
    sendPhoneOtp: build.mutation<void, { phone: string }>({
      query: (body) => ({
        url: '/auth/sendOTP',
        method: 'POST',
        body: body,
      }),
    }),
    verifyOtp: build.mutation<string, { phone: string; otp: string }>({
      query: (body) => ({
        url: '/auth/verifyOTP',
        method: 'POST',
        body: body,
      }),
    }),
    sendVerificationEmail: build.mutation<void, { email: string }>({
      query: (body) => ({
        url: '/auth/sendVerificationEmail',
        method: 'POST',
        body,
      }),
    }),
    verifyEmail: build.mutation<void, { email: string; otp: string }>({
      query: (body) => ({
        url: '/auth/verifyEmail',
        method: 'POST',
        body: body,
      }),
    }),
    otpChangePasswordByEmail: build.mutation<void, { email: string }>({
      query: (body) => ({
        url: '/auth/changePasswordByEmailOTP',
        method: 'POST',
        body: body,
      }),
    }),
    ChangePassword: build.mutation<
      void,
      { newPassword: string; otp: string; email: string }
    >({
      query: (body) => ({
        url: '/auth/changePassword',
        method: 'POST',
        body: body,
      }),
    }),
    createDigified: build.mutation({
      query: (body) => ({
        url: '/digified/create',
        method: 'POST',
        body: body,
      }),
    }),
    getDigifiedToken: build.query<{ token: string }, void>({
      query: () => `${import.meta.env.VITE_BASE_URL}/digified/init`,
      onQueryStarted: async (_, { queryFulfilled }) => {
        const result = await queryFulfilled
        localStorage.setItem('digi_token', result.data.token)
      },
    }),
  }),
})

export const {
  useGetQuestionsQuery,
  useLoginMutation,
  useValidateSignupMutation,
  useSignupMutation,
  useSendPhoneOtpMutation,
  useVerifyOtpMutation,
  useSendVerificationEmailMutation,
  useVerifyEmailMutation,
  useOtpChangePasswordByEmailMutation,
  useChangePasswordMutation,
  useGetDigifiedTokenQuery,
  useCreateDigifiedMutation,
} = extendedApi
