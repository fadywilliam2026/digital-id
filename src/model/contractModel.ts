//TODO: add contract status interface

export interface Contract {
  id: number
  contractId: number
  nationalId: string
  userId: number
  phoneNumber: string
  deviceId: string
  ipAddress: string
  longitude: number
  latitude: number
  status: string
  checksum: string
  rejectionReason: string
  signedAt: Date
  createdAt: Date
  updatedAt: Date
  contract: {
    id: number
    title: string
    companyId: number
    checksum: string
    uuid: string
    hash: string
    createdAt: Date
    updatedAt: Date
    expirationDate: null
    formerContractId: null
    parentContractId: null
  }
}
