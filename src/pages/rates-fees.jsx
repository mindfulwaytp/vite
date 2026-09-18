import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import FaqAccordion from '../components/FaqAccordion';
import { ORGANIZATION_ID, SITE_URL, organizationJsonLd } from '../data/organization';
import insurance from '../assets/healthins.jpg';
import { fetchProviders, seededProviders } from '../lib/providers';


const PAGE_URL = `${SITE_URL}/rates-fees/`;
const DESCRIPTION =
  'Therapy rates and accepted insurance at Mindful Way Therapy in Seattle. Session fees by therapist, sliding-scale options, and Washington Apple Health (Medicaid).';

// Cost terms people are expected to already understand, and usually don't.
const costTerms = [
  {
    term: 'Deductible',
    meaning:
      'The amount you pay out of pocket each year before your insurance starts contributing. If your deductible is $2,000, you pay the full session rate until you have spent $2,000 on covered care that year.',
  },
  {
    term: 'Copay',
    meaning:
      'A flat amount you pay per session, often $20 to $50. Copays usually apply after your deductible is met, though some plans charge a copay from the first visit.',
  },
  {
    term: 'Coinsurance',
    meaning:
      'A percentage of the session rate you pay instead of a flat fee — 20% coinsurance on a $175 session means you pay $35 and your plan pays the rest.',
  },
  {
    term: 'Out-of-pocket maximum',
    meaning:
      'The most you will pay in a year. Once you reach it, covered care is paid in full by your plan for the rest of the plan year.',
  },
  {
    term: 'In network',
    meaning:
      'We have a contract with that insurer and bill them directly at an agreed rate. It does not mean therapy is free — your deductible, copay, and coinsurance still apply.',
  },
];

// Rendered on the page and emitted as FAQPage structured data — keep answers plain text.
const faqs = [
  {
    question: 'Why do your rates differ by therapist?',
    answer:
      'Our therapists are at different stages of licensure. Student interns are graduate students completing supervised training. Associate clinicians hold an associate license and practice under supervision. Fully licensed therapists have completed their supervised hours and hold independent licensure. Every therapist here is either licensed or working under the supervision of someone who is.',
  },
  {
    question: 'What is the difference between an intern, an associate, and a fully licensed therapist?',
    answer:
      'A lower rate does not mean lesser care. Student interns are in a graduate program and receive close, frequent supervision on every case. Associate clinicians hold a master\u2019s degree and an associate license from Washington State, and are accruing supervised hours toward full licensure. Fully licensed therapists have completed those hours and practice independently. Many clients do excellent work with interns and associates, who often also have the most availability.',
    body: (
      <>
        <p className="mb-3">A lower rate does not mean lesser care.</p>
        <ul className="list-disc pl-5 space-y-2 marker:text-sky-700">
          <li>
            <strong>Student interns</strong> are graduate students completing a supervised practicum.
            They receive close, frequent supervision on every case.
          </li>
          <li>
            <strong>Associate clinicians</strong> hold a master’s degree and an associate license from
            Washington State (LMHCA, LSWAIC), and are accruing supervised hours toward full licensure.
          </li>
          <li>
            <strong>Fully licensed therapists</strong> have completed those supervised hours and practice
            independently (LMFT, LMHC).
          </li>
        </ul>
        <p className="mt-3">
          Many clients do excellent work with interns and associates, who often also have the most
          availability.
        </p>
      </>
    ),
  },
  {
    question: 'Do you offer a sliding scale?',
    answer:
      'Yes. Our student interns offer sliding-scale sessions from $35 to $70 based on what you can afford. Our associate clinicians offer sliding-scale fees on a case-by-case basis, generally between $50 and $75. If cost is a barrier, tell us in the inquiry form and we will talk through the options, including Washington Apple Health (Medicaid), which covers therapy at no copay.',
  },
  {
    question: 'Does every therapist on your team take my insurance?',
    answer:
      'No, and this is the detail that catches people out. Coverage varies by therapist. Our student interns cannot bill most insurance plans, and some plans are accepted only by our fully licensed therapists. The insurance list on this page shows which group accepts each plan, and you can filter our provider directory by insurance to see who takes yours.',
  },
  {
    question: 'How much will I actually pay if I use insurance?',
    answer:
      'It depends on your plan, not on us. Being in network means we bill your insurer directly at a contracted rate, but you may still owe a deductible, a copay, or coinsurance. Until your deductible is met you may be responsible for the full session rate. Deductible is the amount you pay each year before insurance starts contributing. Copay is a flat amount per session, often $20 to $50. Coinsurance is a percentage of the session rate you pay instead of a flat fee. Out-of-pocket maximum is the most you will pay in a year, after which covered care is paid in full. In network means we hold a contract with that insurer and bill them directly, which is not the same as therapy being free.',
    body: (
      <>
        <p className="mb-3">
          It depends on your plan, not on us. Being in network means we bill your insurer directly at a
          contracted rate, but you may still owe a deductible, a copay, or coinsurance — and until your
          deductible is met you may be responsible for the full session rate.
        </p>
        <p className="mb-2 font-semibold text-gray-800">What those words mean:</p>
        <dl className="space-y-3 border-l-2 border-sky-100 pl-4">
          {costTerms.map((item) => (
            <div key={item.term}>
              <dt className="font-semibold text-sky-800">{item.term}</dt>
              <dd className="text-gray-700">{item.meaning}</dd>
            </div>
          ))}
        </dl>
      </>
    ),
  },
  {
    question: 'What should I ask my insurance company before my first session?',
    answer:
      'Call the member services number on the back of your card and ask: do I have outpatient mental health benefits; do I have to meet a deductible first and if so how much; do I have a copay or coinsurance amount and if so how much; are telehealth visits covered differently than in-person visits; do I need a referral or prior authorization; and is there a maximum number of sessions per year. Washington parity law generally requires telehealth to be covered no less favorably than in-person care, and mental health parity rules generally prevent plans from limiting therapy more strictly than medical care \u2014 but self-funded employer plans are regulated federally rather than by the state, so those protections can work differently.',
    body: (
      <>
        <p className="mb-3">
          Call the member services number on the back of your insurance card and ask:
        </p>
        <ol className="list-decimal pl-5 space-y-3 marker:text-sky-700 marker:font-semibold">
          <li>Do I have outpatient mental health benefits?</li>
          <li>Do I have to meet a deductible first? If so, how much?</li>
          <li>Do I have a copay or coinsurance amount? If so, how much?</li>
          <li>
            Are telehealth visits covered differently than in-person visits?
            <span className="block text-sm text-gray-600 mt-1">
              Washington’s parity law generally requires telehealth to be covered no less favorably
              than in-person care. Self-funded employer plans are regulated federally rather than by the
              state, so this may not apply to them.
            </span>
          </li>
          <li>Do I need a referral or prior authorization?</li>
          <li>
            Is there a maximum number of sessions I can have per year?
            <span className="block text-sm text-gray-600 mt-1">
              Mental health parity rules generally prevent plans from limiting therapy more strictly than
              medical care, so hard session caps are uncommon. Coverage can still depend on medical
              necessity, and self-funded employer plans follow different rules.
            </span>
          </li>
        </ol>
        <p className="mt-4 text-sm text-gray-600">
          <strong>“Self-funded”</strong> means your employer pays claims directly rather than buying
          coverage from an insurer, even though a familiar insurer may administer the plan. Your HR or
          benefits team can tell you which kind you have.
        </p>
        <p className="mt-3 text-sm text-gray-600">
          Write down who you spoke with and the date. If coverage is later disputed, that record helps.
        </p>
      </>
    ),
  },
  {
    question: 'How do I know if my insurance plan is covered?',
    answer:
      'We are in network with Aetna, Premera Blue Cross, Regence BlueShield, Cigna, Molina Healthcare, and UnitedHealthcare Community Plan, but being in network does not guarantee your specific plan is covered, and some plans are accepted only by certain therapists. We recommend confirming directly with your insurer before your first session.',
  },
  {
    question: 'Will I get a Good Faith Estimate of what therapy will cost?',
    answer:
      'Yes. Under the federal No Surprises Act, clients who are uninsured or not using insurance are entitled to a written estimate of expected costs. We include a Good Faith Estimate in your intake paperwork, so you receive one automatically rather than having to ask.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    organizationJsonLd,
    {
      '@type': 'WebPage',
      '@id': PAGE_URL,
      name: 'Rates & Insurance',
      description: DESCRIPTION,
      url: PAGE_URL,
      about: { '@id': ORGANIZATION_ID },
    },
    {
      '@type': 'FAQPage',
      '@id': `${PAGE_URL}#faq`,
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
  ],
};

// Plans and prices are reproduced exactly as previously published. Update carefully:
// the sliding-scale figures also appear on /affording-therapy.
const insuranceGroups = [
  {
    title: 'Accepted by All Providers',
    plans: [
      {
        name: 'Molina Healthcare of Washington',
        detail: 'A Washington Apple Health (Medicaid) managed care plan, also listed as Molina Apple Health',
      },
    ],
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
      {
        name: 'UnitedHealthcare Community Plan',
        detail: 'UnitedHealthcare’s Washington Apple Health (Medicaid) managed care plan',
      },
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

// Names come from the provider sheet rather than the page, which is what let the old
// hardcoded list go stale. Associates aren't listed individually — there are nine and
// the roster moves; the fully licensed pair is stable enough to name.
const ASSOCIATE_LICENSES = ['LMHCA', 'LSWAIC'];
const FULLY_LICENSED_LICENSES = ['LMFT', 'LMHC'];

const namesByLicense = (providers, licenses) =>
  providers.filter((provider) => licenses.includes(provider.license)).map((p) => p.name);

const buildRateTiers = (providers) => [
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
    details: [
      `${namesByLicense(providers, ASSOCIATE_LICENSES).length} associate-licensed clinicians working under supervision`,
    ],
    featured: true,
  },
  {
    title: 'Fully Licensed Providers',
    price: '$175',
    unit: 'per ongoing session',
    note: 'Intake sessions are $200.',
    details: [namesByLicense(providers, FULLY_LICENSED_LICENSES).join(' · ')],
  },
];

function RatesFees() {
  const [providers, setProviders] = useState(seededProviders);

  // Seeded from the build-time snapshot so the page renders immediately, then
  // updated from the sheet — no redeploy needed when the roster changes.
  useEffect(() => {
    let alive = true;
    fetchProviders()
      .then((rows) => {
        if (alive && rows.length) setProviders(rows);
      })
      .catch((err) => console.error('Error fetching providers:', err));
    return () => {
      alive = false;
    };
  }, []);

  const rateTiers = buildRateTiers(providers);

  return (
    <div className="bg-[#f3f6f9] text-gray-800">
      <SEO
        title="Therapy Rates & Insurance in Seattle, WA"
        description={DESCRIPTION}
        canonical="/rates-fees/"
        jsonLd={jsonLd}
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
          <strong>Worried about affording therapy?</strong> You may qualify for Washington Apple Health
          (Medicaid), which covers therapy at no cost and can be applied for any time of year. We are in
          network with Molina Healthcare and UnitedHealthcare Community Plan, and you can change your Apple
          Health plan at any time.{' '}
          <Link to="/affording-therapy" className="text-sky-700 underline font-semibold">
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


      {/* FAQ */}
      <section className="bg-white py-16 px-4 md:px-10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl text-center text-sky-700 mb-10">Frequently Asked Questions</h2>
          <FaqAccordion items={faqs} />
          <p className="text-center text-gray-600 mt-8">
            Worried about affording therapy?{' '}
            <Link to="/affording-therapy" className="text-sky-700 underline font-semibold">
              See our guide to Apple Health and low-cost options
            </Link>
            .
          </p>
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
