import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import FaqAccordion from '../components/FaqAccordion';
import { ORGANIZATION_ID, SITE_URL, organizationJsonLd } from '../data/organization';

const PAGE_URL = `${SITE_URL}/affording-therapy/`;
const DESCRIPTION =
  'Seattle therapists who take Washington Apple Health (Medicaid). We are in network with Molina Healthcare and UnitedHealthcare Community Plan, in person in the U-District and by telehealth statewide, plus sliding-scale options.';

const HEALTHPLANFINDER_URL = 'https://www.wahealthplanfinder.org';
const HCA_CHANGE_PLAN_URL =
  'https://www.hca.wa.gov/free-or-low-cost-health-care/i-need-medical-dental-or-vision-care/change-my-health-plan';

// Rendered on the page and emitted as FAQPage structured data — keep answers plain text.
const faqs = [
  {
    question: 'Does Apple Health (Washington Medicaid) cover therapy?',
    answer:
      'Yes. Apple Health covers mental health care, including individual therapy, for people who qualify. There are no copays for covered mental health services.',
  },
  {
    question: 'Can I apply for Apple Health at any time of year?',
    answer:
      'Yes. Unlike private plans bought through the exchange, Apple Health has no open enrollment period. You can apply any time through Washington Healthplanfinder, and coverage can start quickly once you are approved.',
  },
  {
    question: 'Do you take Medicaid? Which Apple Health plans do you accept?',
    answer:
      'Yes, we accept Washington Apple Health (Medicaid). Every therapist on our team is in network with Molina Healthcare of Washington. Several of our therapists also accept UnitedHealthcare Community Plan, though our student interns do not — you can filter our provider directory by insurance to see who takes which plan. We are currently completing credentialing with Community Health Plan of Washington (CHPW) and Coordinated Care; contact us to check the current status before making a decision based on it.',
  },
  {
    question: 'Can I change my Apple Health managed care plan?',
    answer:
      'Yes. You can change your Apple Health managed care plan at any time of year through the Washington State Health Care Authority — there is no open enrollment window. Before switching, confirm that your other providers, such as your primary care doctor, prescriber, specialists, and pharmacy, also take the plan you are moving to, since your managed care plan covers all of your care and not just therapy.',
  },
  {
    question: 'Do you offer therapy by telehealth in Washington?',
    answer:
      'Yes. We see clients in person in Seattle’s University District and by telehealth anywhere in Washington State, including for clients using Apple Health (Medicaid).',
  },
  {
    question: 'What if I do not qualify for Apple Health and cannot afford the full fee?',
    answer:
      'Our student interns offer a sliding scale of $35 to $70 per session. Our associate clinicians offer sliding-scale fees on a case-by-case basis. Tell us about your situation in the inquiry form and we will talk through what is possible.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    organizationJsonLd,
    {
      '@type': 'WebPage',
      '@id': PAGE_URL,
      name: 'Help Paying for Therapy',
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

function SectionCard({ title, children }) {
  return (
    <div className="bg-white rounded-2xl shadow-md flex flex-col overflow-hidden">
      <div className="bg-sky-700 px-5 py-4">
        <h2 className="text-white text-xl font-bold leading-tight">{title}</h2>
      </div>
      <div className="p-5 text-gray-700 leading-relaxed space-y-4">{children}</div>
    </div>
  );
}

function AffordingTherapy() {
  return (
    <div className="bg-[#f3f6f9] text-gray-800">
      <SEO
        title="Apple Health (Medicaid) Therapy in Seattle | Mindful Way Therapy"
        description={DESCRIPTION}
        canonical="/affording-therapy/"
        jsonLd={jsonLd}
      />

      {/* Hero */}
      <div className="mt-20 relative w-full overflow-hidden max-h-[420px]">
        <img
          src="/images/medicaid_header.jpg"
          alt="Help paying for therapy"
          className="w-full max-h-[420px] object-cover object-center"
        />
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="bg-white/80 text-black px-6 py-8 rounded-xl shadow-md max-w-2xl text-center">
            <h1 className="text-3xl md:text-4xl mb-4">
              Help Paying for Therapy in Seattle
            </h1>
            <p className="text-base md:text-lg leading-relaxed">
              We accept Washington Apple Health (Medicaid), in person in Seattle’s U-District and by
              telehealth anywhere in Washington. Cost should not be the reason you never start.
            </p>
          </div>
        </div>
      </div>

      <section className="bg-white py-16 px-4 md:px-10">
        <div className="max-w-3xl mx-auto space-y-8">
          <SectionCard title="Start With Washington Apple Health (Medicaid)">
            <p>
              Washington Apple Health is the state’s Medicaid program. It provides free or low-cost health
              coverage, and that coverage includes mental health care — therapy through Apple Health has no
              copay. Many people assume they earn too much to qualify, or that they missed a deadline —
              neither is usually true.
            </p>
            <p>
              <strong>There is no open enrollment period for Apple Health.</strong> You can apply any time of
              year, and eligibility is based on your household size and income. If your income has recently
              dropped, you may qualify now even if you did not before.
            </p>
            <p>
              You can apply online through Washington Healthplanfinder, or by phone at{' '}
              <a href="tel:1-855-923-4633" className="text-sky-700 underline">1-855-923-4633</a>.
            </p>
            <p>
              <strong>One thing worth knowing before you choose a plan:</strong> Apple Health is delivered
              through managed care plans (MCOs), and every therapist on our team can bill{' '}
              <strong>Molina Healthcare of Washington</strong>. Several of our therapists also accept{' '}
              <strong>UnitedHealthcare Community Plan</strong>, though our student interns do not. If you are
              picking a plan for the first time, choosing Molina gives you the widest choice of therapists
              here.
            </p>
            <p>
              To see which plans a specific therapist takes,{' '}
              <Link
                to="/providers?insurance=UHC-Medicaid"
                className="text-sky-700 underline font-semibold"
              >
                filter our provider directory by insurance
              </Link>
              . Each therapist’s profile lists the plans they are in network with.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={HEALTHPLANFINDER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center bg-sky-700 border-2 border-sky-700 text-white font-semibold py-2 px-5 rounded-lg shadow hover:bg-sky-800 hover:border-sky-800 transition"
              >
                Apply Through Healthplanfinder
              </a>
              <Link
                to="/contact/therapy"
                className="flex-1 text-center border-2 border-sky-700 text-sky-700 font-semibold py-2 px-5 rounded-lg hover:bg-sky-50 transition"
              >
                Complete Our Inquiry Form
              </Link>
            </div>
          </SectionCard>

          <SectionCard title="What If You Have a Different Apple Health Plan?">
            <p>
              Washington has five Apple Health managed care plans: Molina Healthcare, UnitedHealthcare
              Community Plan, Community Health Plan of Washington (CHPW), Coordinated Care, and Wellpoint.
              Right now we are in network with <strong>Molina Healthcare</strong>, which every therapist on
              our team can bill, and <strong>UnitedHealthcare Community Plan</strong>, which several of our
              therapists accept.{' '}
              <Link to="/providers" className="text-sky-700 underline font-semibold">
                Search our providers
              </Link>{' '}
              to see who takes which plan.
            </p>
            <p>
              We are currently going through credentialing with <strong>CHPW</strong> and{' '}
              <strong>Coordinated Care</strong>. We expect to be in network with both before long, but
              credentialing timelines are set by the plans and we cannot promise a date — please contact us
              to check where it stands rather than assuming.
            </p>
            <p>
              <strong>You can change your Apple Health managed care plan at any time.</strong> There is no
              open enrollment window for Apple Health, so if the plan you are on does not work for the care
              you want, you are not stuck with it until next year.
            </p>
            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded">
              <p className="text-gray-800">
                <strong>Before you switch, check your other providers first.</strong> Your managed care plan
                covers all of your care, not just therapy — your primary care doctor, any specialists, your
                prescriber, and your pharmacy. Changing plans to see us could mean losing coverage for
                someone else you rely on. Confirm that the people already treating you take the new plan
                before you make the change.
              </p>
            </div>
            <p>
              <a
                href={HCA_CHANGE_PLAN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-700 underline font-semibold"
              >
                How to change your Apple Health plan (Washington State Health Care Authority)
              </a>
            </p>
          </SectionCard>

          <SectionCard title="If You Already Have Insurance">
            <p>
              We are in network with Aetna, Premera Blue Cross, Regence BlueShield, Cigna, Molina
              Healthcare, and UnitedHealthcare Community Plan. A few additional plans are accepted by
              specific therapists.
            </p>
            <p>
              Being in network does not guarantee your particular plan is covered, and coverage can vary by
              therapist, so it is worth confirming with your insurer before your first session.
            </p>
            <p>
              <Link to="/rates-fees" className="text-sky-700 underline font-semibold">
                See the full list of plans and rates
              </Link>
            </p>
          </SectionCard>

          <SectionCard title="Sliding Scale and Self-Pay">
            <p>
              If insurance is not an option, we still have room to work with you. Our student interns offer
              sliding-scale sessions from $35 to $70, based on what you can afford. Our associate clinicians
              offer sliding-scale fees on a case-by-case basis.
            </p>
            <p>
              Our interns are graduate students in supervised training. They are early in their careers, and
              they are also often the therapists with the most availability and the most flexibility on fee.
            </p>
          </SectionCard>

          <SectionCard title="If None of This Fits">
            <p>
              Reach out anyway. Tell us what your situation is in the inquiry form, and we will be honest
              with you about what we can do and where else to look. We would rather help you find the right
              fit somewhere else than have you give up on therapy entirely.
            </p>
            <p className="text-sm text-gray-600 border-t border-gray-200 pt-4">
              If you are in crisis or need someone right now, call or text <strong>988</strong> to reach the
              Suicide &amp; Crisis Lifeline, any time, at no cost.
            </p>
          </SectionCard>

          <SectionCard title="Frequently Asked Questions">
            <FaqAccordion items={faqs} />
          </SectionCard>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-sky-700 text-white py-16 px-4 md:px-10 text-center">
        <h2 className="text-3xl font-bold mb-4">Still Not Sure Where You Land?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Send us a note. We will help you figure out what is realistic.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <a
            href="mailto:support@mindfulway-therapy.com"
            className="bg-white text-sky-700 font-semibold py-2 px-6 rounded shadow hover:bg-gray-100 transition"
          >
            Email Us
          </a>
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

export default AffordingTherapy;
