import { Route, Routes } from 'react-router-dom'

import Profile from './pages/Profile'
import VerifyEmail from './pages/VerifyEmail'
import { VerifyPhone } from './pages/VerifyPhone'

import FaceDetection from './components/kyc/FaceDetection'
import Contract from './pages/Contract'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import PaymentCallBack from './pages/PaymentCallBack'
import Terms from './pages/Terms'
import VerifyKyc from './pages/VerifyKyc'
import VerifyPayment from './pages/VerifyPayment'

import ActiveRoutes from './utils/ActiveRoutes'
import PrivateRoutes from './utils/PrivateRoutes'
import VerifiedRoutes from './utils/VerifiedRoutes'

import { useLanguage } from './hooks/useLanguage'
import ForgetPassword from './pages/ForgetPassword'
import { LoadingState } from './pages/LoadingState'
import PrivacyPolicy from './pages/PrivacyPolicy'
import { SupportUrl } from './pages/SupportUrl'
import { ValidateClientAnswers } from './pages/ValidateClientAnswer'

function App() {
  useLanguage()

  return (
    <div className="">
      <Routes>
        {/* Public Routes */}
        <Route path="/terms" element={<Terms />} />
        <Route path="/" element={<Home />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/signByJWT" element={<LoadingState />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/support" element={<SupportUrl />} />
        {/* Private Routes */}
        <Route element={<PrivateRoutes />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="contract/:id" element={<Contract />} />
          <Route path="payment/callback" element={<PaymentCallBack />} />
          {/* VerifyRoutes */}
          <Route path="/verify" element={<VerifiedRoutes />}>
            <Route path="phone" element={<VerifyPhone />} />
            <Route path="email" element={<VerifyEmail />} />
            <Route path="kyc" element={<VerifyKyc />} />
            <Route path="face" element={<FaceDetection />} />
            <Route path="payment" element={<VerifyPayment />} />
            <Route path="locked" element={<div>Locked</div>} />
            <Route
              path="validateClientAnswers"
              element={<ValidateClientAnswers />}
            />
          </Route>

          {/* active routes */}
          <Route element={<ActiveRoutes />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path=":status" element={<Dashboard />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
