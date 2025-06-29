import Signature from './UI/Signature'
import { Users } from '../redux/contract/contractApiSlice'
type SignaturesProps = {
  users: Users[] | undefined
}

const Signatures = ({ users }: SignaturesProps) => {
  return (
    <>
      {users?.map((user, index) => (
        <div key={user.id} className="">
          <Signature user={user} />
          {index !== users.length - 1 && (
            <hr className="border border-gray-300 my-3" />
          )}
        </div>
      ))}
    </>
  )
}
export default Signatures
