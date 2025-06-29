import { format, parseISO } from 'date-fns'
import ContractStatus from './ContractStatus'
import { Contract } from '../../redux/contract/contractApiSlice'
import { useTranslation } from 'react-i18next'

interface SubContractProps {
  childContracts: {
    parentContract: Contract
    childrenContracts: Contract[]
  }
}
const SubContractModal = ({ childContracts }: SubContractProps) => {
  const { t } = useTranslation()
  return (
    <>
      <div>
        <div className="pl-8 pr-10 pt-7 pb-3">
          <p className="">{childContracts?.parentContract?.id}</p>
          <h1 className="font-bold first-letter:uppercase">
            {childContracts?.parentContract?.title}
          </h1>
          <p>
            {t('Sender to:')}
            {childContracts?.parentContract?.company?.name}
          </p>
        </div>

        <div className="flex justify-between items-center w-full px-5 pb-3 pt-3">
          <div className="flex gap-2 items-center">
            <div className="flex flex-col">
              <h1 className="text-gray-900 font-bold capitalize">
                {childContracts?.parentContract?.title}
              </h1>
              {childContracts?.parentContract?.createdAt && (
                <p className="text-[#667085] text-[13px] ">
                  {format(
                    parseISO(childContracts.parentContract.createdAt),
                    'MMM d yyy',
                  )}
                </p>
              )}
            </div>
          </div>
          <div className="pt-2">
            <ContractStatus
              status={childContracts?.parentContract?.overall_status}
            />
          </div>
        </div>
        <hr className="border border-gray-300" />
      </div>

      {childContracts?.childrenContracts
        ?.slice()
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        .map((contract, index, array) => (
          <div key={contract.id}>
            <div
              className="flex justify-between items-center w-full ml-8 pr-14 pl-3 pb-5 pt-3"
              style={{ borderLeft: '2px solid #ccc' }}
            >
              <div className="flex gap-2 items-center">
                <div className="flex flex-col">
                  <h1 className="text-gray-900 font-bold capitalize">
                    {contract.title}
                  </h1>
                  <p className="text-[#667085] text-[13px] ">
                    {format(parseISO(contract.createdAt), 'MMM d yyy')}
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <ContractStatus status={contract.overall_status} />
              </div>
            </div>
            <div className="pl-8 ">
              {index !== array.length - 1 && (
                <hr className="border border-gray-300" />
              )}
            </div>
          </div>
        ))}
    </>
  )
}

export default SubContractModal
