export type DisbursementDetails = {
  id: number
  createdAt: Date
  updatedAt: Date

  // The activation date, the date when the disbursement actually took place. Stored as Organization Time.
  disbursementAt: Date

  // The expected disbursement date of the account. Stored as Organization Time.
  expectedDisbursementAt: Date

  // The date of the first repayment. Stored as Organization Time.
  firstInstallmentAt: Date
}
