import { useState } from 'react'
import SignupForm from '../components/SignupForm'
import Questions from '../components/Questions'
import ErrorAlert from '../components/UI/ErrorAlert'
const Signup = () => {
  const [isQuestionsForm, setIsQuestionsForm] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  return (
    <div className="bg-white">
      {errorMessage && (
        <div className=" p-5">
          <ErrorAlert description={errorMessage} setError={setErrorMessage} />
        </div>
      )}

      {!isQuestionsForm ? (
        <SignupForm
          setIsQuestionsForm={setIsQuestionsForm}
          setErrorMessage={setErrorMessage}
        />
      ) : (
        <Questions setIsQuestionsForm={setIsQuestionsForm} />
      )}
    </div>
  )
}

export default Signup
