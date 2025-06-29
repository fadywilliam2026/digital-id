export enum PaymentStatus {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
}

export interface PaymentAttemptInfo {
  paymentStatus: PaymentStatus
  cardDataToken?: string | null
  maskedCard?: string | null
  merchantOrderId: string | null
  orderId: string | null
  cardBrand: string | null
  orderReference: string | null
  transactionId: string | null
  amount: string | null
  currency: string | null
  mode: 'test' | 'live'
  signature: string | null
}

// interface PaymentAttempt {
//   id: number
//   status?: PaymentStatus
//   userId: number
//   user: User
//   info: PaymentAttemptInfo
// }
