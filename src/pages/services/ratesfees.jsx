import React from 'react';
import insurance from '../../assets/healthins.jpg';

function RatesFees() {
  return (
    <div className="bg-[#f3f6f9] text-gray-800">
      {/* Hero Section */}
      <div
        className="w-full h-[450px] bg-cover bg-center mt-20 relative flex items-center justify-center"
        style={{ backgroundImage: `url(${insurance})` }}
      >
        <div className="bg-gray-600/80 text-white px-6 py-8 rounded-xl shadow-md max-w-2xl text-center">
          <h1 className="text-3xl md:text-4xl mb-4">Fees & Insurance</h1>
          <p className="text-base md:text-lg leading-relaxed">
            We are considered in-network with the following insurance companies. Please note: just because we are in network does not mean we accept your specific plan. It is ultimately your responsibility to confirm the network status of your provider.
          </p>
        </div>
      </div>

      {/* Insurance Details */}
      <section className="py-16 px-4 md:px-10 bg-white">
        <h1 className="text-3xl text-center text-sky-700 mb-6">Insurance Plans We Accept</h1>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Accepted by All Providers */}
          <div>
            <h2 className="text-xl font-bold mb-4 underline">The Following Plans are Accepted by All Providers</h2>
            <ul className="text-lg mb-6 list-disc list-inside">
              <li><strong>Medicaid</strong></li>
              <ul className="ml-12 list-disc">
                <li>Molina Medicaid</li>
              </ul>
            </ul>

            <h2 className="text-xl font-bold mb-2 underline">The Following Plans are Accepted by All Providers (Except Interns)</h2>
            <ul className="text-lg list-disc list-inside space-y-2">
              <li><strong>Aetna</strong>
                <ul className="ml-12 list-disc">
                  <li>Including Meritain Health</li>
                </ul>
              </li>
              <li><strong>BlueCross/BlueShield</strong>
                <ul className="ml-12 list-disc">
                  <li>Premera BlueCross</li>
                  <li>Regence BlueShield</li>
                  <li>Out-of-State BCBS Plans, including BCBS FEP</li>
                </ul>
              </li>
              <li><strong>Cigna</strong></li>
            </ul>
          </div>

          {/* Accepted by Ryne Only */}
          <div>
            <h2 className="text-xl font-bold mb-4 underline">The Following Plans are Only Accepted by Ryne:</h2>
            <ul className="text-lg list-disc list-inside space-y-4">
              <li><strong>FirstChoice Health Network (FCHN)</strong></li>

              <li>
                <strong>Kaiser Permanente Health Plan of Washington</strong>
                <p className="ml-10 text-md italic mt-1">
                  Note: We only accept Kaiser PPO Plans through FCHN. We do not accept Kaiser HMO or single-case agreements with Kaiser.
                </p>
              </li>

              <li>
                <strong>United Healthcare (Medicaid and Commercial)</strong>
                <ul className="ml-10 list-disc">
                  <li>Including UMR</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </section>
            {/* Our Fees Section */}
      <section className="py-10 px-4 md:px-10 bg-white border-t border-gray-200">
        <h1 className="text-3xl text-center text-sky-700 mb-6">Our Fees</h1>
        <div className="max-w-3xl mx-auto">
          <ul className="text-lg list-disc list-inside space-y-2">
            <li><strong>Interns:</strong> $30–60/session</li>
            <li><strong>Associate Providers:</strong> $115/session</li>
            <li><strong>Fully Licensed:</strong> $125/session</li>
            <li>
              <strong>Ryne:</strong>
              <ul className="ml-10 list-disc space-y-1">
                <li><strong>Intakes:</strong> $200</li>
                <li><strong>Ongoing Therapy:</strong> $175</li>
              </ul>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default RatesFees;