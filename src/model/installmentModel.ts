export enum InstallmentState {
  PENDING = 'PENDING',
  LATE = 'LATE',
  PAID = 'PAID',
  PARTIALLY_PAID = 'PARTIALLY_PAID',
  GRACE = 'GRACE',
}

export interface Installment {
  id: number
  dueDate: Date
  feesDue: string
  feesPaid: string
  fundersInterestDue: string
  interestDue: string
  interestPaid: string
  lastPaidDate: Date
  lastPenaltyAppliedDate: Date
  organizationCommissionDue: string
  penaltyDue: string
  penaltyPaid: string
  principalDue: string
  principalPaid: string
  repaidDate: Date
  noInterest: boolean
  state: InstallmentState
  loanAccountId: number
}
