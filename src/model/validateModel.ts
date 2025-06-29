export type PartnerClientForm = {
  firstName: string
  lastName: string
  commercialName: string
  taxRecordId: string
  customFields: {
    commercialRecord: string
    establishmentDate: Date
    industry: string
  }
  extraFields: {
    legalStructure: string
    annualRevenueInLastYear: string
    monthlyTransactionVolume: string
    noOfFullTimeEmployees: string
  }
  phone: string
  email: string
  nationalId: string
  address: string
  governorate: string
  city: string
}

export type Values = {
  firstName: string
  lastName: string
  commercialName: string
  taxRecordId: string
  commercialRecord: string
  establishmentDate: Date
  legalStructure: string
  industry: string
  annualRevenue: string
  monthlyTransactions: string
  noOfFullTimeEmployees: string
  phone: string
  email: string
  nationalId: string
  address: string
  governorate: string
  city: string
}
