import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import insurance from '../../assets/healthins.jpg';
import { seededProviders } from '../../lib/providers';

// Plans and prices are reproduced exactly as previously published. Update carefully:
// the sliding-scale figures also appear on /contact/affording-therapy.
const insuranceGroups = [
  {
    title: 'Accepted by All Providers',
    plans: [{ name: 'Molina Medicaid', detail: 'A Washington Apple Health (Medicaid) plan' }],
  },
  {
    title: 'Accepted by All Providers Except Interns',
    plans: [
      { name: 'Aetna', detail: 'Including Meritain Health' },
      {
        name: 'BlueCross / BlueShield',
        items: [
          'Premera BlueCross',
          'Regence BlueShield',
          'Out-of-State BCBS Plans, including BCBS FEP',
        ],
      },
      { name: 'Cigna' },
      { name: 'United Healthcare (Medicaid)' },
    ],
  },
  {
    title: 'Accepted by Fully Licensed Providers Only',
    plans: [
      { name: 'United Healthcare Marketplace', detail: 'Including UMR' },
      { name: 'Molina Marketplace' },
    ],
  },
];

// Licences map to the rate tiers below; names come from the provider data rather than
// being listed here, which is what let the old hardcoded list go stale.
const ASSOCIATE_LICENSES = ['LMHCA', 'LSWAIC'];
const FULLY_LICENSED_LICENSES = ['LMFT', 'LMHC'];

const namesByLicense = (licenses) =>
  seededProviders.filter((provider) => licenses.includes(provider.license)).map((p) => p.name);

const associateNames = namesByLicense(ASSOCIATE_LICENSES);
const fullyLicensedNames = namesByLicense(FULLY_LICENSED_LICENSES);

const rateTiers = [
  {
    title: 'Student Interns',
    price: '$35–70',
    unit: 'per session',
    note: 'Sliding fee, based on what you can afford.',
    details: ['Graduate students in supervised training', 'Often the most availability'],
  },
  {
    title: 'Associate Clinicians',
    price: '$115',
    unit: 'per session',
    note: 'Sliding fee available on a case-by-case basis, $50–75/session.',
    details: [associateNames.join(' · ')],
    featured: true,
  },
  {
    title: 'Fully Licensed Providers',
    price: '$175',
    unit: 'per ongoing session',
    note: 'Intake sessions are $200.',
    details: [fullyLicensedNames.join(' · ')],
  },
];

function RatesFees() {
  return (
    <div className="bg-[#f3f6f9] text-gray-800">
      <SEO
        title="Rates & Insurance | Mindful Way Therapy"
        description="Insurance plans accepted at Mindful Way Therapy in Seattle, session rates by therapist, and sliding-scale options."
        canonical="/contact/ratesfees/"
      />

      {/* Hero */}
      <div className="mt-20 relative w-full overflow-hidden max-h-[420px]">
        <img
          src={insurance}
          alt="Rates and insurance"
          className="w-full max-h-[420px] object-cover object-center"
        />
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="bg-white/80 text-black px-6 py-8 rounded-xl shadow-md max-w-2xl text-center">
            <h1 className="text-3xl md:text-4xl mb-4">Rates &amp; Insurance</h1>
            <p className="text-base md:text-lg leading-relaxed">
              What therapy costs here, which plans we accept, and what to do if neither works for you.
            </p>
          </div>
        </div>
      </div>

      {/* Affordability entry point */}
      <div className="bg-sky-50 border-b border-sky-100 px-4 py-5">
        <p className="max-w-3xl mx-auto text-center text-gray-700">
          <strong>Worried about affording therapy?</strong> You may qualify for Apple Health (Washington
          Medicaid), which covers therapy and can be applied for any time of year.{' '}
          <Link to="/contact/affording-therapy" className="text-sky-700 underline font-semibold">
            See your options
          </Link>
          .
        </p>
      </div>

      {/* Insurance */}
      <section className="bg-white py-16 px-4 md:px-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl text-center text-sky-700 mb-3">Insurance We Accept</h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
            Coverage varies by therapist. Being in network does not mean we accept your specific plan —
            it is ultimately your responsibility to confirm your provider’s network status with your
            insurer.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {insuranceGroups.map((group) => (
              <div
                key={group.title}
                className="bg-white rounded-2xl shadow-md flex flex-col overflow-hidden border border-gray-100"
              >
                <div className="bg-sky-700 px-5 py-4">
                  <h3 className="text-white font-bold leading-tight">{group.title}</h3>
                </div>
                <ul className="p-5 space-y-4">
                  {group.plans.map((plan) => (
                    <li key={plan.name}>
                      <p className="font-semibold text-gray-800">{plan.name}</p>
                      {plan.detail && (
                        <p className="text-sm text-gray-600 mt-1 leading-relaxed">{plan.detail}</p>
                      )}
                      {plan.items && (
                        <ul className="list-disc pl-5 mt-1 space-y-1 text-sm text-gray-600 marker:text-sky-700">
                          {plan.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rates */}
      <section className="bg-[#f3f6f9] py-16 px-4 md:px-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl text-center text-sky-700 mb-3">Our Rates</h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
            Rates depend on your therapist’s licensure. Sliding-scale options are available.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {rateTiers.map((tier) => (
              <div
                key={tier.title}
                className={`bg-white rounded-2xl shadow-md p-6 flex flex-col h-full ${
                  tier.featured ? 'ring-2 ring-sky-700' : ''
                }`}
              >
                <h3 className="text-lg font-bold text-gray-800">{tier.title}</h3>
                <p className="mt-4">
                  <span className="text-3xl font-bold text-sky-700">{tier.price}</span>{' '}
                  <span className="text-sm text-gray-500">{tier.unit}</span>
                </p>
                <p className="text-sm text-gray-700 mt-3">{tier.note}</p>
                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  {tier.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-sky-700 text-white py-16 px-4 md:px-10 text-center">
        <h2 className="text-3xl font-bold mb-4">Not Sure What You’ll Pay?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Tell us your plan in the inquiry form and we will help you sort it out before your first
          session.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link
            to="/providers"
            className="bg-white text-sky-700 font-semibold py-2 px-6 rounded shadow hover:bg-gray-100 transition"
          >
            Meet Our Providers
          </Link>
          <Link
            to="/contact/therapy"
            className="bg-white text-sky-700 font-semibold py-2 px-6 rounded shadow hover:bg-gray-100 transition"
          >
            Complete Our Inquiry Form
          </Link>
        </div>
      </section>
    </div>
  );
}

export default RatesFees;
