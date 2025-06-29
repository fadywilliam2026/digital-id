import HomeLayout from '../layout/HomeLayout'

const PrivacyPolicy = () => {
  return (
    <HomeLayout>
      <div className="bg-white px-6 md:px-12 lg:px-24 py-10 text-gray-800">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 ">
          Flend SME Financing App Privacy Policy
        </h1>
        <h2 className="text-xl md:text-2xl font-medium mb-6 ">
          Effective Date: December 25, 2024
        </h2>
        <ol className="list-decimal pl-5 space-y-8">
          {/* introduction */}
          <div>
            <li className="font-semibold mb-2">Introduction</li>
            <p className="text-sm md:text-base leading-6">
              Welcome to Flend! Your privacy is critically important to us. This
              Privacy Policy explains how Flend ("we," "our," or "us") collects,
              uses, shares, and protects your personal data when you use our SME
              financing application (the "App"). By using the App, you agree to
              the terms of this Privacy Policy. Our commitment aligns with
              global privacy standards, including GDPR, CCPA, and Egyptian Data
              Protection regulations.
            </p>
          </div>
          {/* information we collect */}
          <div>
            <li className="font-semibold mb-2">Information We Collect</li>
            <span className="block mb-2 text-sm md:text-base">
              We collect and process the following categories of information:
            </span>
            <ul className="list-disc pl-5 space-y-2">
              <li className="text-sm md:text-base">
                <span className="font-semibold">Personal Information:</span>{' '}
                Full name, email address, phone number, national ID, business
                registration details, and other identifying information.
              </li>
              <li className="text-sm md:text-base">
                <span className="font-semibold">Financial Information:</span>{' '}
                Bank account details, financial statements, transaction history,
                credit scores, and loan application details.
              </li>
              <li className="text-sm md:text-base">
                <span className="font-semibold">Business Information:</span>{' '}
                Company name, registration number, industry, annual revenue,
                employee count, and supplier or customer information.
              </li>
              <li className="text-sm md:text-base">
                <span className="font-semibold">Device Information:</span>{' '}
                Device type, operating system, IP address, browser type, device
                identifiers, and usage data.
              </li>
              <li className="text-sm md:text-base">
                <span className="font-semibold">Location Data:</span> Real-time
                geolocation data if enabled.
              </li>
              <li className="text-sm md:text-base">
                <span className="font-semibold">Communications Data:</span>{' '}
                Records of customer support interactions, feedback, and survey
                responses.
              </li>
            </ul>
          </div>
          {/* how we use your information */}
          <div>
            <li className="font-semibold mb-2">How We Use Your Information</li>
            <span className="block mb-2 text-sm md:text-base">
              We use your data to:
            </span>
            <ul className="list-disc pl-5 space-y-2">
              <li className="text-sm md:text-base">
                Facilitate and process loan applications efficiently.
              </li>
              <li className="text-sm md:text-base">
                Assess creditworthiness and financial health.
              </li>
              <li className="text-sm md:text-base">
                Improve loan offerings and financial products.
              </li>
              <li className="text-sm md:text-base">
                Enhance user experience and app functionality.
              </li>
              <li className="text-sm md:text-base">
                Send important notifications and updates.
              </li>
              <li className="text-sm md:text-base">
                Prevent fraudulent activities and security breaches.
              </li>
              <li className="text-sm md:text-base">
                Ensure compliance with financial regulatory requirements.
              </li>
              <li className="text-sm md:text-base">
                Conduct research and analytics to improve our services.
              </li>
            </ul>
          </div>
          {/* legal basis for processing data */}
          <div>
            <li className="font-semibold mb-2">
              Legal Basis for Processing Data
            </li>
            <span className="block mb-2 text-sm md:text-base">
              We process your data based on:
            </span>
            <ul className="list-disc pl-5 space-y-2">
              <li className="text-sm md:text-base">Your consent.</li>
              <li className="text-sm md:text-base">
                The necessity to fulfill a contractual agreement.
              </li>
              <li className="text-sm md:text-base">
                Compliance with legal obligations.
              </li>
              <li className="text-sm md:text-base">
                Legitimate business interests, including fraud prevention and
                service improvement.
              </li>
            </ul>
          </div>
          {/* Sharing Your Information */}
          <div>
            <li className="font-semibold mb-2">Sharing Your Information</li>
            <span className="block mb-2 text-sm md:text-base">
              We may share your data with:
            </span>
            <ul className="list-disc pl-5 space-y-2">
              <li className="text-sm md:text-base">
                <span className="font-semibold">Financial Partners:</span>{' '}
                Banks, financial institutions, and lending partners for loan
                processing.
              </li>
              <li className="text-sm md:text-base">
                <span className="font-semibold">Service Providers:</span> IT
                support, cloud hosting, analytics, and payment gateways.
              </li>
              <li className="text-sm md:text-base">
                <span className="font-semibold">Regulatory Authorities: </span>{' '}
                Governmental and regulatory bodies as required by law.
              </li>
              <li className="text-sm md:text-base">
                <span className="font-semibold">Referral Partners:</span> To
                facilitate financing solutions.
              </li>
              <li className="text-sm md:text-base">
                <span className="font-semibold">Third-Party Integrations:</span>{' '}
                Platforms like Amazon, Noon, or other POS financing tools.
              </li>
            </ul>
          </div>
          <p>
            We ensure that all third parties adhere to strict data protection
            agreements.
          </p>
          {/* data security */}
          <div>
            <li className="font-semibold mb-2">Data Security</li>
            <span className="block mb-2 text-sm md:text-base">
              We employ industry-leading security measures, including:
            </span>
            <ul className="list-disc pl-5 space-y-2">
              <li className="text-sm md:text-base">
                End-to-end data encryption.
              </li>
              <li className="text-sm md:text-base">
                Multi-factor authentication (MFA).
              </li>
              <li className="text-sm md:text-base">
                Secure servers and firewalls.
              </li>
              <li className="text-sm md:text-base">
                Regular security audits and vulnerability assessments.
              </li>
              <li className="text-sm md:text-base">
                Restricted access controls.
              </li>
            </ul>
          </div>
          <p>
            Despite our best efforts, no system is entirely secure. We encourage
            you to safeguard your login credentials.
          </p>
          {/* Data Retention */}
          <div>
            <li className="font-semibold mb-2">Data Retention</li>
            <p className="text-sm md:text-base leading-6">
              We retain your data for as long as necessary to fulfill the
              purposes outlined in this policy, comply with legal obligations,
              or resolve disputes. Financial data related to loan processing may
              be retained for longer periods as required by financial
              regulations.
            </p>
          </div>

          {/* Your Rights */}
          <div>
            <li className="font-semibold mb-2">Your Rights</li>
            <span className="block mb-2 text-sm md:text-base">
              You have the following rights regarding your data:
            </span>
            <ul className="list-disc pl-5 space-y-2">
              <li className="text-sm md:text-base">
                <span className="font-semibold">Access:</span> Review your
                personal data.
              </li>
              <li className="text-sm md:text-base">
                <span className="font-semibold">Correction:</span> Update
                inaccurate or incomplete data.
              </li>
              <li className="text-sm md:text-base">
                <span className="font-semibold">Deletion:</span> Request data
                deletion when no longer necessary.
              </li>
              <li className="text-sm md:text-base">
                <span className="font-semibold">Restriction:</span> Limit data
                processing under certain conditions.
              </li>
              <li className="text-sm md:text-base">
                <span className="font-semibold">Objection:</span> Object to
                processing based on legitimate interests.
              </li>
              <li className="text-sm md:text-base">
                <span className="font-semibold">Portability:</span> Request a
                copy of your data in a structured format.
              </li>
            </ul>
          </div>
          <p>You can exercise these rights by contacting us directly.</p>
          {/*  Automated Decision-Making and Profiling  */}
          <div>
            <li className="font-semibold mb-2">
              Automated Decision-Making and Profiling
            </li>
            <p className="text-sm md:text-base leading-6">
              We may use automated systems to assess creditworthiness and loan
              eligibility. These systems use financial data, transaction
              history, and other indicators. You have the right to request human
              intervention if automated decisions significantly affect you.
            </p>
          </div>

          {/* Third-Party Links and Services  */}
          <div>
            <li className="font-semibold mb-2">
              Third-Party Links and Services
            </li>
            <p className="text-sm md:text-base leading-6">
              Our App may include links to third-party services. We are not
              responsible for the privacy practices of these third parties.
              Please review their respective privacy policies.
            </p>
          </div>

          {/*International Data Transfers  */}
          <div>
            <li className="font-semibold mb-2">International Data Transfers</li>
            <p className="text-sm md:text-base leading-6">
              Your information may be transferred and processed outside your
              country of residence, including jurisdictions with different data
              protection laws. We ensure appropriate safeguards are in place for
              such transfers.
            </p>
          </div>

          {/* Children's Privacy   */}
          <div>
            <li className="font-semibold mb-2">Children's Privacy </li>
            <p className="text-sm md:text-base leading-6">
              Our App is not intended for individuals under 18 years old. We do
              not knowingly collect data from children. If we discover such data
              has been collected, we will promptly delete it.
            </p>
          </div>

          {/* Updates to This Policy   */}
          <div>
            <li className="font-semibold mb-2">Updates to This Policy </li>
            <p className="text-sm md:text-base leading-6">
              We may periodically update this Privacy Policy to reflect changes
              in regulations, technology, or our services. You will be notified
              of significant changes via email or within the App.
            </p>
          </div>

          {/* Contact Us   */}
          <div>
            <li className="font-semibold mb-2">Contact Us </li>
            <span className="block mb-2 text-sm md:text-base">
              If you have any questions, concerns, or requests regarding this
              Privacy Policy, please contact us at:
            </span>

            <p className="text-sm md:text-base leading-6">
              <span className="font-semibold">Email:</span>
              <a href="mailto:info@flend.io"> info@flend.io</a>
            </p>
            <p className="text-sm md:text-base leading-6">
              <span className="font-semibold">Address:</span> 32 Shagaret El Dor
            </p>
          </div>

          <p>
            Thank you for trusting Flend with your financial needs. Your privacy
            and data security are our top priorities.
          </p>
        </ol>
      </div>
    </HomeLayout>
  )
}

export default PrivacyPolicy
