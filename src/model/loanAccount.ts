import { DisbursementDetails } from './disbursementDetails'
import { Installment } from './installmentModel'

export interface LoanAccount {
  principalBalance: string
  loanAmount: string
  createdAt: string
  installments: Installment[]
  disbursementDetails?: DisbursementDetails
}
