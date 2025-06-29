import { LoanAccount } from './loanAccount'

interface CustomFields {
  commercialRecord: string
  establishmentDate: Date
  industry: string
}

interface Organization {
  id: number
  createdAt: Date
  updatedAt: Date
  name: string
  products: unknown
  customFields: unknown
}

export interface Client {
  id: number
  userName: string
  nationalId: string
  phone: string
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
  status: string
  idExpiration: Date
  isExpired: false
  verifiedAt: Date
  createdAt: Date
  updatedAt: Date
  accessToken: string
  refreshToken: string
  userType: string
  customFields?: CustomFields
  currentLimit: number
  approvedLimit: number
  paymentFrequency: string
  loanAccounts?: LoanAccount[]
  initialLimit: number
  historicalLoansCount: number
  contractId: number
  organizationId?: number
  organization?: Organization
}
