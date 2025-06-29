import { Contract } from '../../redux/contract/contractApiSlice'
import star from '../../assets/icons/star.svg'
import download from '../../assets/icons/download.svg'
import print from '../../assets/icons/print.svg'
// import ContractTransactionModal from './ContractTransactionModal'
import ContractPdf from '../../pages/ContractPdf'
import ContractStatus from './ContractStatus'
import { format, parseISO } from 'date-fns'
import { useTranslation } from 'react-i18next'
import SubContract from '../SubContract'

type ContractDetailsProps = {
  contract: Contract
}

const ContractDetails = ({ contract }: ContractDetailsProps) => {
  const { t } = useTranslation()
  const updated = parseISO(contract.updatedAt)
  const formattedUpdatedDate = format(updated, 'dd/MM/yyyy')

  const received = parseISO(contract.createdAt)
  const formattedReceivedDate = format(received, 'dd/MM/yyyy')

  return (
    <>
      <ContractPdf contract={contract} />
      <ContractStatus status={contract?.overall_status} />
      <p className="text-gray-700 mb-2">{contract?.id}</p>

      <div className="flex  gap-3 text-[#0A6046] mb-5">
        <img src={star} alt="star" className="hover:cursor-pointer" />
        <img src={download} alt="download" className="hover:cursor-pointer" />
        <img src={print} alt="print" className="hover:cursor-pointer" />
      </div>

      <div>
        <h1 className="text-gray-900">
          <span className="font-bold">{t('Sender')} </span>
          {contract.company.name}
        </h1>
        <h1 className="text-gray-900">
          <span className="font-bold">{t('Last updated')} </span>
          {formattedUpdatedDate}
        </h1>
        <h1 className="text-gray-900">
          <span className="font-bold">{t('Date received')} </span>
          {formattedReceivedDate}
        </h1>
        <h1 className="text-gray-900">
          <span className="font-bold">{t('Referenced contract')} </span>
          <span className="text-[#0A6046]">
            {contract.parentContractId ? contract.parentContractId : 'None'}
          </span>
        </h1>
      </div>

      {contract.overall_status !== 'pending' && (
        <div className="flex gap-10  text-[#0A6046] m-5">
          {/* <ContractTransactionModal /> */}
          <SubContract parentId={contract?.parentContractId?.toString()} />
        </div>
      )}
      <hr className="border border-gray-300 mt-3" />
    </>
  )
}
export default ContractDetails
