import { apiSlice } from '../api/apiSlice'
type User = {
  id: number
  userName: string
  UserKycData: []
}
export type Users = {
  id: number
  contractId: number
  nationalId: string
  userId: number
  phoneNumber: string
  deviceId: string
  ipAddress: string
  longitude: number
  latitude: number
  status: ContractStatus
  checksum: null
  rejectionReason: null
  signedAt: string
  createdAt: string
  updatedAt: string
  user: User
}

export type ContractStatus =
  | 'pending'
  | 'rejected'
  | 'signed'
  | 'cancelled'
  | 'pending_on_user'
  | 'pending_on_others'
  | 'pending_on_company'
  | 'active'

export type Contract = {
  id: number
  title: string
  description: string
  companyId: number
  checksum: string
  uuid: string
  hash: string
  createdAt: string
  updatedAt: string
  expirationDate: string | null
  formerContractId: number | null
  parentContractId: number | null
  company: {
    id: number
    name: string
  }
  users: Users[]
  overall_status: ContractStatus
  isFavorite: boolean
}

export type Location = {
  latitude: number
  longitude: number
}
type SignContractBody = {
  contractId: number
  currentLocation: Location
  deviceId: string
  otp: string
}

export type RejectContractBody = {
  contractId: number
  rejectionReason?: string
  otp: string
}

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllContracts: build.query<Contract[], void>({
      query: () => 'contract',
      providesTags: ['Contract'],
    }),
    getContracts: build.query<Contract[], { status: string }>({
      query: ({ status }) => `contract?status=${status}`,
      providesTags: ['Contract'],
    }),
    getContract: build.query<Contract, { contractId: string | undefined }>({
      query: ({ contractId }) => `contract/${contractId}`,
      providesTags: ['Contract'],
    }),
    getContractFile: build.query<string, number>({
      query: (contractId) => ({
        url: `contract/file/${contractId}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/pdf',
        },
        responseHandler: async (response) =>
          URL.createObjectURL(await response.blob()),
      }),
    }),
    updateContract: build.mutation<object, number>({
      query: (id) => ({
        url: `contract/update/${id}`,
        method: 'PUT',
      }),
      invalidatesTags: ['Contract'],
    }),
    rejectContract: build.mutation<Contract, RejectContractBody>({
      query: ({ contractId, ...body }) => ({
        url: `contract/reject/${contractId}`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['Contract'],
    }),
    signContract: build.mutation<Contract, SignContractBody>({
      query: ({ contractId, ...body }) => ({
        url: `contract/sign/${contractId}`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['Contract', 'Notification'],
    }),
    childContracts: build.query<
      { parentContract: Contract; childrenContracts: Contract[] },
      { contractId: string }
    >({
      query: ({ contractId }) => `contract/child-contracts/${contractId}`,
    }),
    company: build.query<Contract[], { companyId: string }>({
      query: ({ companyId }) => `contract/company/${companyId}`,
    }),
    demoSign: build.mutation({
      query: ({ id }) => ({
        url: `company/demo-sign/${id}`,
        method: 'POST',
      }),
      invalidatesTags: ['Contract', 'Notification'],
    }),
  }),
})

export const {
  useGetContractsQuery,
  useGetAllContractsQuery,
  useGetContractQuery,
  useGetContractFileQuery,
  useUpdateContractMutation,
  useRejectContractMutation,
  useSignContractMutation,
  useChildContractsQuery,
  useCompanyQuery,
  useDemoSignMutation,
} = extendedApi
