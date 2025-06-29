export interface UserConfig {
  appLanguage: string
  deviceId?: string
  deviceToken?: string
}

interface UsersSecurityQuestions {
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

interface CustomFields {
  commercialRecord: string
  establishmentDate: Date
  industry: string
}
export enum UserStatus {
  initial = 'initial',
  phone_verified = 'phone_verified',
  email_verified = 'email_verified',
  id_verified = 'id_verified',
  payment_method = 'payment_method',
  active = 'active',
  locked = 'locked',
  id_expired = 'id_expired',
  deleted = 'deleted',
  id_pending_inspection = 'id_pending_inspection',
  pending_sign = 'pending_sign',
}

export interface User {
  id: number
  userName: string
  password: string
  nationalId: string
  phoneNumber: string
  email: string
  deviceId: string
  secondaryEmail?: string
  secondaryPhoneNumber?: string
  isLocked: boolean
  createdAt: string
  updatedAt: string
  isEmailVerified: boolean
  isPhoneVerified: boolean
  ipAddress: string
  status: UserStatus
  idExpiration?: string
  isExpired: boolean
  verifiedAt?: string
  latitude: number
  longitude: number
  statusReason?: string
  accessToken: string
  refreshToken: string
  userType: string
  customFields?: CustomFields
  UsersSecurityQuestions: UsersSecurityQuestions[]
  userConfig: UserConfig
  signupOrigin: 'web' | 'mobile'
  // contracts              ContractUser[]
  // userDeleted            DeleteUser[]
  // ProviderUser           ProviderUser[]
  // UserBillableAction     UserBillableAction[]
  // userDevices            UserDevice[]
  // UserKycData            UserKycData[]
  // UserNotification       UserNotification[]
}
