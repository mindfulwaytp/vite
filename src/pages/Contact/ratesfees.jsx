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
      <section className="py-16 px-4 md:px-10 bg-white">
        <h1 className="text-3xl text-center text-sky-700 mb-6">Our Rates and Fees</h1>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

          <div>
            <h2 className="text-xl font-bold mb-4 underline">Rates for Our Student Interns</h2>
            <ul className="text-lg mb-6 list-disc list-inside">
              <li><strong>Sliding Fee Available:</strong> $35-70/session</li>
            </ul>

            <div className="text-lg space-y-2 mb-6">
              <h2 className="text-xl font-bold underline mb-4">Rates for Our Associate Clinicians</h2>
              <p className="italic">(McCall Evans; Sarah Pompa; Cheryl Snider; Paige Butkey; Julian Macke; Mary Baja; and Rachel Loch)</p>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>All Sessions:</strong> $115/session</li>
                <li className="italic">Sliding Fee Available On a Case by Case Basis of $50-75/session</li>
              </ul>
            </div>

            <div className="text-lg space-y-2">
              <h2 className="text-xl font-bold mb-4 underline">Rates for Ryne Evans, MA, LMFT</h2>
                <li><strong>Intakes:</strong> $200</li>
                <li><strong>Ongoing Therapy:</strong> $175</li>
          </div>
          </div>
          {/* Accepted by Ryne Only */}
          <div className="flex flex-col items-center text-center">
            <h2 className="text-xl font-bold mb-4">Find Out More About Our Providers</h2>
            <a
              href="/providers"
              className="inline-block bg-sky-700 hover:bg-sky-800 text-white py-2 px-4 rounded shadow transition duration-200 mb-12"
            >
              Our Providers
            </a>
            <h2 className="text-xl font-bold mb-4">Get Started Today!</h2>
            <a
              href="/contact"
              className="inline-block bg-sky-700 hover:bg-sky-800 text-white py-2 px-4 rounded shadow transition duration-200"
            >
              Get Started
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RatesFees;