import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import FaqAccordion from '../../components/FaqAccordion';
import ServicesLayout from '../../components/ServicesLayout';
import ServiceHero from '../../components/ServiceHero';
import ServiceSection, { ServiceTextSection } from '../../components/ServiceSection';
import { ORGANIZATION_ID, SITE_URL, organizationJsonLd } from '../../data/organization';

const PAGE_URL = `${SITE_URL}/specialties/polyamory-non-monogamy/`;
const DESCRIPTION =
  'Polyamory and ethical non-monogamy therapy in Seattle and by telehealth across Washington. For individuals, couples opening up, and existing polycules.';

const focusAreas = [
  'Opening an existing relationship',
  'Jealousy and insecurity',
  'Negotiating agreements and boundaries',
  'Hierarchy and nesting partners',
  'Metamour relationships',
  'Kitchen-table vs parallel poly',
  'Communication across partners',
  'Time and energy management',
  'Coming out as non-monogamous',
  'Rebuilding after a broken agreement',
  'Solo polyamory',
  'Relationship transitions and endings',
];

// Rendered on the page and emitted as FAQPage structured data — keep answers plain text.
const faqs = [
  {
    question: 'Do you work with more than two partners in a session?',
    answer:
      'Yes. We see individuals, couples, and larger relationship configurations including triads and polycules. Who comes into the room is something we sort out together based on what the work needs, and it can change over time.',
  },
  {
    question: 'We are monogamous and considering opening up. Is that something you help with?',
    answer:
      'Yes. Couples exploring the transition out of monogamy are a large part of this work — including deciding whether to open up at all. We are not here to push you toward any particular structure, including staying as you are.',
  },
  {
    question: 'Will my therapist try to talk me out of non-monogamy?',
    answer:
      'No. Our therapists treat consensual non-monogamy as a valid relationship structure rather than a symptom or a phase. You will not have to defend the premise of your relationship before you can get to the actual work.',
  },
  {
    question: 'What if my partners and I want different things?',
    answer:
      'That is frequently why people come in. Therapy can be a place to name a mismatch honestly and look at it directly, rather than negotiating it in the middle of an argument. Sometimes that leads to a workable agreement, and sometimes it clarifies a difference that needs a different kind of decision.',
  },
  {
    question: 'Can we use insurance for relationship therapy?',
    answer:
      'Sometimes, and it depends on your plan. Insurance generally reimburses therapy for a diagnosed condition, which does not always cover relationship work involving multiple people. We will be straightforward with you about what is likely to be covered and what is not before you commit. Self-pay and sliding-scale options are available.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    organizationJsonLd,
    {
      '@type': 'Service',
      '@id': `${PAGE_URL}#service`,
      name: 'Polyamory & Non-Monogamy Support',
      serviceType: 'Relationship therapy for consensual non-monogamy',
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

function PolyamoryNonMonogamy() {
  return (
    <div className="bg-[#f3f6f9] text-gray-800">
      <SEO
        title="Polyamory & Non-Monogamy Therapy in Seattle, WA"
        description={DESCRIPTION}
        canonical="/specialties/polyamory-non-monogamy/"
        image="/images/polyamory-non-monogamy-hero.jpeg"
        jsonLd={jsonLd}
      />

      <ServiceHero
        image="/images/polyamory-non-monogamy-hero.jpeg"
        alt="Polyamory and non-monogamy support"
        title="Polyamory &amp; Non-Monogamy Support"
        subtitle="Serving clients in Seattle, WA and via telehealth throughout Washington"
      />

      <ServicesLayout>
        <div className="space-y-8">
          <ServiceSection
            title="You Shouldn’t Have to Justify Your Relationship"
            expectedFile="/images/polyamory-non-monogamy-1.jpg"
            alt=""
            tinted
          >
            <p>
              Finding a therapist who understands consensual non-monogamy is genuinely hard. Too many
              people have sat across from someone who treated polyamory as avoidance, a phase, or the
              underlying problem to be solved — and spent the hour defending the structure of their life
              instead of working on it.
            </p>
            <p>
              Our therapists treat non-monogamy as a valid way to build relationships. That means we start
              from your agreements rather than questioning whether you should have made them, and we know
              the vocabulary already — you will not need to explain what a metamour is or sketch out your
              polycule before the work can begin.
            </p>
          </ServiceSection>

          <ServiceTextSection title="What We Can Work On Together">
            <p>
              We see individuals figuring out what they want, couples considering opening up, and existing
              constellations working through something together. Areas we commonly support include:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 list-disc pl-5 marker:text-sky-700">
              {focusAreas.map((area) => (
                <li key={area}>{area}</li>
              ))}
            </ul>
            <p>
              Non-monogamy is not the only reason to come in, either. Plenty of our clients are poly and
              are here for anxiety, burnout, or trauma — they simply want a therapist for whom their
              relationships are unremarkable.
            </p>
          </ServiceTextSection>

          <ServiceSection
            title="What to Expect"
            expectedFile="/images/polyamory-non-monogamy-2.jpg"
            alt=""
            reverse
            tinted
            footer={
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/providers?specialties=Non-Monogamy"
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
            }
          >
            <p>
              Getting started begins with our Therapy Inquiry &amp; Intake Form. Tell us who is hoping to
              be part of the work — yourself, you and a partner, or a larger group — and we will help
              figure out the right format and the right therapist.
            </p>
            <p>
              Who attends sessions does not have to be fixed at the start. Some work happens with everyone
              in the room, some is better one-on-one, and plenty of people move between the two as things
              develop.
            </p>
            <p>
              Sessions are available by telehealth anywhere in Washington, and many of our therapists also
              see clients in person at our office in Seattle’s University District. We will talk through
              insurance and fees honestly before you commit, including where insurance is unlikely to
              apply.{' '}
              <Link to="/rates-fees" className="text-sky-700 underline font-semibold">
                See our rates and accepted plans
              </Link>
              .
            </p>
          </ServiceSection>

          <ServiceTextSection title="Frequently Asked Questions">
            <FaqAccordion items={faqs} />
          </ServiceTextSection>
        </div>
      </ServicesLayout>

      {/* CTA */}
      <section className="bg-sky-700 text-white py-16 px-4 md:px-10 text-center">
        <h2 className="text-3xl font-bold mb-4">Questions About Working With Us?</h2>
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
            to="/rates-fees"
            className="bg-white text-sky-700 font-semibold py-2 px-6 rounded shadow hover:bg-gray-100 transition"
          >
            Rates &amp; Fees
          </Link>
        </div>
      </section>
    </div>
  );
}

export default PolyamoryNonMonogamy;
