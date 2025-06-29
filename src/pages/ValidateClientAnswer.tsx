import { useState } from 'react'
import { useSelector } from 'react-redux'
import ErrorAlert from '../components/UI/ErrorAlert'
import { ValidateClientAnswersForm } from '../components/ValidateClientAnswersForm'
import HomeLayout from '../layout/HomeLayout'
import { selectCurrentUser } from '../redux/user/userSlice'

import { useGetUserByNationalIdQuery } from '../redux/user/userApiSlice'

export const ValidateClientAnswers = () => {
  const [errorMessage, setErrorMessage] = useState('')

  const currentUser = useSelector(selectCurrentUser)

  const { data: client } = useGetUserByNationalIdQuery(
    currentUser?.nationalId as string,
  )

  return (
    <HomeLayout>
      <div className="flex items-center flex-col gap-2 sm:gap-5 h-full">
        {errorMessage && (
          <div className="p-5">
            <ErrorAlert description={errorMessage} setError={setErrorMessage} />
          </div>
        )}
        <ValidateClientAnswersForm client={client} />
      </div>
    </HomeLayout>
  )
}
