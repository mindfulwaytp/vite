import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import FaqAccordion from '../../components/FaqAccordion';
import ServicesLayout from '../../components/ServicesLayout';
import ServiceHero from '../../components/ServiceHero';
import ServiceSection, { ServiceTextSection } from '../../components/ServiceSection';
import { ORGANIZATION_ID, SITE_URL, organizationJsonLd } from '../../data/organization';

const PAGE_URL = `${SITE_URL}/specialties/queer-affirming-therapy/`;
const DESCRIPTION =
  'LGBTQ+ affirming therapy in Seattle and by telehealth across Washington. A queer-owned practice for identity exploration, coming out, minority stress, and trauma.';

const focusAreas = [
  'Coming out and disclosure',
  'Gender identity and expression',
  'Questioning and self-understanding',
  'Minority stress and vigilance',
  'Religious and spiritual trauma',
  'Family rejection and estrangement',
  'Internalized shame',
  'Relationships and dating',
  'Workplace and school navigation',
  'Anxiety and depression',
  'Chosen family and community',
  'Intersecting identities',
];

// Rendered on the page and emitted as FAQPage structured data — keep answers plain text.
const faqs = [
  {
    question: 'Do I need to be out to start therapy?',
    answer:
      'No. Many people begin therapy precisely because they are not out, are unsure what they want to be out about, or are weighing whether coming out is safe in their particular situation. You set the pace, and you are not expected to arrive with answers.',
  },
  {
    question: 'Do I have to be questioning my identity to work with a queer-affirming therapist?',
    answer:
      'No. Plenty of our LGBTQ+ clients come in for anxiety, depression, grief, work stress, or relationship concerns that have nothing to do with being queer. Affirming care means your identity is not treated as the problem and is not something you have to explain from scratch.',
  },
  {
    question: 'Is Mindful Way Therapy an LGBTQ+ owned practice?',
    answer:
      'Yes. Mindful Way Therapy is a queer-owned group practice in Seattle. Our therapists provide affirming, culturally sensitive care for LGBTQ+ clients across the gender and sexuality spectrum.',
  },
  {
    question: 'Do you write gender-affirming care letters?',
    answer:
      'Yes. We provide letters for clients seeking gender-affirming medical interventions. If that is part of what you are looking for, mention it in your inquiry form and we will talk through the process and which provider is the right fit.',
  },
  {
    question: 'Do you offer queer-affirming therapy by telehealth?',
    answer:
      'Yes. We see clients in person at our office in Seattle’s University District and by telehealth anywhere in Washington State. We are in network with several insurance plans including Apple Health (Medicaid), and offer self-pay and sliding-scale options.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    organizationJsonLd,
    {
      '@type': 'Service',
      '@id': `${PAGE_URL}#service`,
      name: 'Queer Affirming Therapy',
      serviceType: 'LGBTQ+ affirming psychotherapy',
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

function QueerAffirmingTherapy() {
  return (
    <div className="bg-[#f3f6f9] text-gray-800">
      <SEO
        title="LGBTQ+ Affirming Therapy in Seattle, WA"
        description={DESCRIPTION}
        canonical="/specialties/queer-affirming-therapy/"
        image="/images/queer-affirming-therapy-hero.jpg"
        jsonLd={jsonLd}
      />

      <ServiceHero
        image="/images/queer-affirming-therapy-hero.jpg"
        alt="Queer affirming therapy"
        title="Queer Affirming Therapy"
        subtitle="Serving LGBTQ+ clients in Seattle, WA and via telehealth throughout Washington"
      />

      <ServicesLayout>
        <div className="space-y-8">
          <ServiceSection
            title="You Shouldn’t Have to Explain Yourself First"
            expectedFile="/images/queer-affirming-therapy-1.jpg"
            alt=""
            tinted
          >
            <p>
              A lot of queer and trans people have had the experience of spending the first several
              sessions of therapy educating their therapist — explaining terminology, justifying a
              relationship structure, or bracing for the moment their identity gets treated as the thing
              to be examined. That is exhausting, and it is not therapy.
            </p>
            <p>
              Mindful Way Therapy is a queer-owned practice in Seattle. Our therapists provide affirming,
              culturally sensitive care across the gender and sexuality spectrum, which means you can
              arrive as yourself and spend your sessions on what actually brought you in. Your identity
              is context, not the diagnosis.
            </p>
          </ServiceSection>

          <ServiceTextSection title="What We Can Work On Together">
            <p>
              Some people come to us because of something specific to being LGBTQ+. Others come for
              reasons that have nothing to do with it, and simply want a therapist who will not make it
              an issue. Both are welcome. Areas we commonly support include:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 list-disc pl-5 marker:text-sky-700">
              {focusAreas.map((area) => (
                <li key={area}>{area}</li>
              ))}
            </ul>
            <p>
              Many of our clients are also neurodivergent, and the overlap between queer and autistic or
              ADHD experience is something our therapists work with regularly rather than treating as two
              separate files.{' '}
              <Link to="/specialties/autism-adhd-therapy" className="text-sky-700 underline font-semibold">
                Read about our autism and ADHD affirming therapy
              </Link>
              .
            </p>
          </ServiceTextSection>

          <ServiceSection
            title="What to Expect"
            expectedFile="/images/queer-affirming-therapy-2.jpg"
            alt=""
            reverse
            tinted
            footer={
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/providers?specialties=LGBTQ%2B%20Identities"
                  className="flex-1 text-center border-2 border-sky-700 text-sky-700 font-semibold py-2 px-5 rounded-lg hover:bg-sky-50 transition"
                >
                  Meet Our LGBTQ+ Therapists
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
              Getting started begins with our Therapy Inquiry &amp; Intake Form. You are welcome to browse
              our therapists first — each profile lists the identities, specialties, and approaches they
              work with, so you can look for someone whose fit feels right before you reach out.
            </p>
            <p>
              Early sessions are about getting to know you: what brought you in, what you want to be
              different, and what has and hasn’t helped before. You are never required to disclose more
              than you want to, and you are not obligated to make your identity the subject of the work
              if that is not why you came.
            </p>
            <p>
              Sessions are available by telehealth anywhere in Washington, and many of our therapists also
              see clients in person at our office in Seattle’s University District. We are in network with
              Aetna, Premera Blue Cross, Regence BlueShield, Cigna, Molina Healthcare, and UnitedHealthcare
              Community Plan, though coverage varies by plan and by therapist. Self-pay and sliding-scale
              options are available.
            </p>
          </ServiceSection>

          <ServiceTextSection title="Frequently Asked Questions">
            <FaqAccordion items={faqs} />
          </ServiceTextSection>
        </div>
      </ServicesLayout>

      {/* CTA */}
      <section className="bg-sky-700 text-white py-16 px-4 md:px-10 text-center">
        <h2 className="text-3xl font-bold mb-4">Questions About Queer Affirming Therapy?</h2>
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

export default QueerAffirmingTherapy;
