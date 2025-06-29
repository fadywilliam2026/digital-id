import { apiSlice } from '../api/apiSlice'

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    init: build.query<boolean, void>({
      query: () => '/kyc/init',
      onQueryStarted: async (_, { queryFulfilled }) => {
        if (localStorage.getItem('kyceState')) {
          return
        } else {
          const result = await queryFulfilled
          if (result) {
            localStorage.setItem('kycState', 'detectFront')
          }
        }
      },
    }),
    detectFrontBack: build.mutation({
      query: (body) => {
        const formData = new FormData()
        formData.append('images', body.front, 'front.jpg')
        formData.append('images', body.back, 'back.jpg')
        return {
          url: '/kyc/detect-front-back',
          method: 'POST',
          body: formData,
        }
      },
    }),
    userImages: build.mutation({
      query: (body) => ({
        url: '/kyc/userImages',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const {
  useInitQuery,
  useDetectFrontBackMutation,
  useUserImagesMutation,
} = extendedApi
