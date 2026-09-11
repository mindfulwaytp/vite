import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import ServicesLayout from '../../components/ServicesLayout';
import { ORGANIZATION_ID, SITE_URL, organizationJsonLd } from '../../data/organization';

const PAGE_URL = `${SITE_URL}/services/individual-therapy/`;
const DESCRIPTION =
  'Individual therapy in Seattle, WA and via telehealth across Washington. Neurodivergent- and LGBTQ+-affirming therapists who meet you where you are.';

const focusAreas = [
  'ADHD and autism',
  'Anxiety',
  'Depression and mood disorders',
  'Trauma',
  'Burnout and masking',
  'LGBTQ+ and gender identity',
  'Self-esteem',
  'Relationships, polyamory, and non-monogamy',
  'Life transitions',
  'Chronic illness',
  'Grief and loss',
  'Racial identity',
];

// Rendered on the page and emitted as FAQPage structured data — keep answers plain text.
const faqs = [
  {
    question: 'Do you offer telehealth for individual therapy?',
    answer:
      'Yes. All of our therapists offer telehealth sessions for clients located in Washington State. Many also see clients in person at our office at 4500 9th Ave NE in Seattle’s University District.',
  },
  {
    question: 'Do you accept insurance?',
    answer:
      'Yes. We are in network with Aetna, Premera Blue Cross, Regence BlueShield, Cigna, and Molina Medicaid, and some therapists accept additional plans. Being in network does not guarantee your specific plan is covered, so we recommend confirming with your insurer. Our Rates & Fees page lists which plans each therapist accepts.',
  },
  {
    question: 'What if I don’t have insurance?',
    answer:
      'Self-pay rates vary by therapist. Sliding-scale fees are available with our student interns and, on a case-by-case basis, with our associate clinicians. See our Rates & Fees page for current pricing.',
  },
  {
    question: 'Do I need to be neurodivergent or LGBTQ+ to work with you?',
    answer:
      'No. Our therapists specialize in neurodivergent- and LGBTQ+-affirming care, and we welcome anyone looking for a therapist who will meet them without judgment.',
  },
  {
    question: 'How do I get started with individual therapy?',
    answer:
      'Complete our Therapy Inquiry & Intake Form. If you are also seeking an ADHD or autism evaluation, fill out the therapy form first and you will be directed to the evaluation form afterward. You can also browse our therapists to find someone who feels like a good fit.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    organizationJsonLd,
    {
      '@type': 'Service',
      '@id': `${PAGE_URL}#service`,
      name: 'Individual Therapy',
      serviceType: 'Individual psychotherapy',
      description: DESCRIPTION,
      url: PAGE_URL,
      provider: { '@id': ORGANIZATION_ID },
      areaServed: organizationJsonLd.areaServed,
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
      <div className="p-5 text-gray-700 leading-relaxed space-y-4">
        {children}
      </div>
    </div>
  );
}

function IndividualTherapy() {
  return (
    <div className="bg-[#f3f6f9] text-gray-800">
      <SEO
        title="Individual Therapy in Seattle, WA | Mindful Way Therapy"
        description={DESCRIPTION}
        canonical="/services/individual-therapy/"
        jsonLd={jsonLd}
      />

      {/* Hero Section */}
      <div className="mt-20 relative w-full overflow-hidden max-h-[420px]">
        <img
          src="/images/individual2.jpg"
          alt="Individual Therapy"
          className="w-full max-h-[420px] object-cover object-center"
        />
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="bg-white/80 text-black px-6 py-8 rounded-xl shadow-md max-w-2xl text-center">
            <h1 className="text-3xl md:text-4xl mb-4">Individual Therapy</h1>
            <p className="text-base md:text-lg leading-relaxed">
              Serving clients in Seattle, WA and via telehealth throughout Washington
            </p>
          </div>
        </div>
      </div>

      {/* Main Content with Sidebar */}
      <ServicesLayout>
        <div className="space-y-8">
          <SectionCard title="You Don’t Have to Figure This Out Alone">
            <p>
              Maybe you’ve been carrying more than you can hold. Maybe you’re burned out, stuck in cycles that
              don’t serve you, or just tired of masking your way through the day. Whatever brought you here, you
              deserve a space where you can show up as you are — without performing, without explaining, without
              shrinking.
            </p>
            <p>
              Individual therapy at Mindful Way Therapy is a collaborative space where you and your therapist work
              together to understand what’s happening beneath the surface. Our Seattle therapists specialize in
              neurodivergent-affirming and LGBTQ+-affirming care, so whether you’re autistic, ADHD, queer, trans, or
              navigating anxiety, depression, or burnout, you won’t have to explain the basics of who you are. We
              don’t believe in one-size-fits-all treatment. Your therapist will meet you where you are and build a
              plan that reflects your goals, your identity, and the way your brain works.
            </p>
          </SectionCard>

          <SectionCard title="What We Can Work On Together">
            <p>
              Our therapists work with a wide range of concerns, and many specialize in the experiences of
              neurodivergent and LGBTQ+ people. Some of the areas we commonly support include:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 list-disc pl-5 marker:text-sky-700">
              {focusAreas.map((area) => (
                <li key={area}>{area}</li>
              ))}
            </ul>
            <p>
              Not sure where your concerns fit? That’s okay — you don’t need to have it all figured out before
              reaching out.
            </p>
          </SectionCard>

          <SectionCard title="What to Expect">
            <p>
              Getting started begins with our Therapy Inquiry &amp; Intake Form. If you’re also interested in an
              ADHD or autism evaluation, complete the therapy form first — you’ll be directed to the evaluation form
              after you submit it. You’re welcome to browse our therapists beforehand to find someone whose
              experience and approach feel like a good fit.
            </p>
            <p>
              Sessions are available by telehealth for clients anywhere in Washington, and many of our therapists
              also see clients in person at our office in Seattle’s University District.
            </p>
            <p>
              Early sessions are about getting to know you — what brought you in, what you want to change, and what
              has and hasn’t helped before. From there, you and your therapist shape the work together. Our
              therapists draw on approaches including person-centered therapy, cognitive behavioral therapy (CBT),
              dialectical behavior therapy (DBT), somatic therapy, narrative therapy, compassion-focused therapy,
              and parts work such as Internal Family Systems (IFS).
            </p>
            <p>
              We’re in network with several insurance plans, including Aetna, Premera Blue Cross, Regence
              BlueShield, Cigna, and Molina Medicaid, though coverage varies by plan and by therapist. Self-pay and
              sliding-scale options are also available.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                to="/providers"
                className="flex-1 text-center border-2 border-sky-700 text-sky-700 font-semibold py-2 px-5 rounded-lg hover:bg-sky-50 transition"
              >
                Meet Our Therapists
              </Link>
              <Link
                to="/contact/therapy"
                className="flex-1 text-center bg-sky-700 border-2 border-sky-700 text-white font-semibold py-2 px-5 rounded-lg shadow hover:bg-sky-800 hover:border-sky-800 transition"
              >
                Complete Our Inquiry Form
              </Link>
            </div>
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
      </ServicesLayout>

      {/* CTA */}
      <section className="bg-sky-700 text-white py-16 px-4 md:px-10 text-center">
        <h2 className="text-3xl font-bold mb-4">Questions About Individual Therapy?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Reach out and we will help you find the right fit.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <a
            href="mailto:support@mindfulway-therapy.com"
            className="bg-white text-sky-700 font-semibold py-2 px-6 rounded shadow hover:bg-gray-100 transition"
          >
            Email Us
          </a>
          <Link
            to="/contact/ratesfees"
            className="bg-white text-sky-700 font-semibold py-2 px-6 rounded shadow hover:bg-gray-100 transition"
          >
            Rates &amp; Fees
          </Link>
        </div>
      </section>
    </div>
  );
}

export default IndividualTherapy;
