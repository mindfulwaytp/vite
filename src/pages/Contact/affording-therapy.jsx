import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import { ORGANIZATION_ID, SITE_URL, organizationJsonLd } from '../../data/organization';

const PAGE_URL = `${SITE_URL}/contact/affording-therapy/`;
const DESCRIPTION =
  'Worried about affording therapy in Seattle? How Apple Health (Washington Medicaid) covers mental health care, which insurance we accept, and our sliding scale options.';

const HEALTHPLANFINDER_URL = 'https://www.wahealthplanfinder.org';

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
    question: 'Do you accept Apple Health at Mindful Way Therapy?',
    answer:
      'We accept Molina Medicaid, and every therapist on our team can bill it. Ryne Evans also accepts UnitedHealthcare Medicaid. If you are choosing or switching an Apple Health managed care plan, Molina is the one our whole team can see you on.',
  },
  {
    question: 'What if I do not qualify for Apple Health and cannot afford the full fee?',
    answer:
      'Our student interns offer a sliding scale of $35 to $70 per session. Our associate clinicians offer sliding-scale fees on a case-by-case basis. Tell us about your situation in the inquiry form and we will talk through what is possible.',
  },
  {
    question: 'How do I know if my insurance plan is covered?',
    answer:
      'We are in network with Aetna, Premera Blue Cross, Regence BlueShield, Cigna, and Molina Medicaid, but being in network does not guarantee your specific plan is covered, and some plans are accepted only by certain therapists. Our Rates & Fees page lists the details, and we recommend confirming with your insurer.',
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
        title="Help Paying for Therapy | Mindful Way Therapy"
        description={DESCRIPTION}
        canonical="/contact/affording-therapy/"
        jsonLd={jsonLd}
      />

      {/* Hero */}
      <section className="mt-20 bg-sky-700 text-white py-16 px-4 md:px-10 text-center">
        <h1 className="text-3xl md:text-4xl mb-4">Help Paying for Therapy</h1>
        <p className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
          Cost should not be the reason you never start. Here are the options, including one a lot of
          people do not realize they qualify for.
        </p>
      </section>

      <section className="bg-white py-16 px-4 md:px-10">
        <div className="max-w-3xl mx-auto space-y-8">
          <SectionCard title="Start With Apple Health (Washington Medicaid)">
            <p>
              Apple Health is Washington’s Medicaid program. It provides free or low-cost health coverage,
              and that coverage includes mental health care. Many people assume they earn too much to
              qualify, or that they missed a deadline — neither is usually true.
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
              through managed care plans, and every therapist on our team can bill{' '}
              <strong>Molina Medicaid</strong>. If you are picking a plan or able to switch, choosing Molina
              means you can see anyone here.
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

          <SectionCard title="If You Already Have Insurance">
            <p>
              We are in network with Aetna, Premera Blue Cross, Regence BlueShield, Cigna, and Molina
              Medicaid. A few additional plans are accepted by specific therapists.
            </p>
            <p>
              Being in network does not guarantee your particular plan is covered, and coverage can vary by
              therapist, so it is worth confirming with your insurer before your first session.
            </p>
            <p>
              <Link to="/contact/ratesfees" className="text-sky-700 underline font-semibold">
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
            <div className="divide-y divide-gray-200">
              {faqs.map((faq) => (
                <div key={faq.question} className="py-4 first:pt-0 last:pb-0">
                  <h3 className="font-semibold text-gray-800 mb-1">{faq.question}</h3>
                  <p>{faq.answer}</p>
                </div>
              ))}
            </div>
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
