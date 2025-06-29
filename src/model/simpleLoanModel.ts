export type LoanForm = {
  loanAmount: number
  nationalId: string | undefined
  organizationId: number
  paymentFrequency: 'EVERY_7_DAYS' | 'EVERY_15_DAYS' | 'EVERY_MONTH'
  tenor: number
}

export type Values = {
  loanAmount: number
  nationalId: string
  organizationId: number
  paymentFrequency: 'EVERY_7_DAYS' | 'EVERY_15_DAYS' | 'EVERY_MONTH'
  tenor: number
}
