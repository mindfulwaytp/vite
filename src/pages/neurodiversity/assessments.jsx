import { Link } from 'react-router-dom';
import Accordion from '../../components/Accordion';
import SEO from '../../components/SEO';
import FaqAccordion from '../../components/FaqAccordion';
import ServicesLayout from '../../components/ServicesLayout';
import ServiceHero from '../../components/ServiceHero';
import ServiceSection, { ServiceTextSection } from '../../components/ServiceSection';
import { ORGANIZATION_ID, SITE_URL, organizationJsonLd } from '../../data/organization';

// pages/neurodiversity/assessments.jsx
//
// Lives under /neurodiversity but wears the services layout — see the note in
// affirming-therapy.jsx.

const PAGE_URL = `${SITE_URL}/neurodiversity/assessments/`;
const DESCRIPTION =
  'Autism and ADHD assessments for adults and teens in Seattle and by telehealth across Washington. Affirming, strengths-based evaluations. Insurance and Apple Health (Medicaid) accepted.';

// Rendered on the page and emitted as FAQPage structured data — keep answers plain text.
// Costs are covered in detail in the Assessment Process accordion below; these
// answers stay general so the two cannot drift apart.
const faqs = [
  {
    question: 'Do you assess adults for autism and ADHD?',
    answer:
      'Yes. We assess both adults and adolescents. For adults, a Brain Style Profile provides a framework to better understand past struggles, improve relationships, and make informed choices about work, daily routines, and personal goals.',
  },
  {
    question: 'What is a Brain Style Profile?',
    answer:
      'A Brain Style Profile is our neurodivergent-affirming approach to assessment, named after the MIGDAS-2 assessment. Rather than producing only a diagnosis, it highlights personal strengths and differences, supports self-discovery, and offers practical guidance. It blends standardized tools with personalized consultation.',
  },
  {
    question: 'How is a neurodivergent-affirming assessment different?',
    answer:
      'It views traits like ADHD and autism as natural parts of identity and focuses on strengths rather than deficits. We avoid pathologizing language, look at the whole person rather than a list of symptoms, and tailor recommendations to help you thrive as you are rather than conform.',
  },
  {
    question: 'Do you take insurance for autism and ADHD assessments?',
    answer:
      'Yes. We accept commercial insurance and Apple Health (Medicaid). Because insurance does not reimburse master’s-level clinicians for scoring, interpreting assessments, or report writing, there is a separate report-writing fee. The Assessment Costs section on this page lists current amounts for each pathway.',
  },
  {
    question: 'Can assessments be done by telehealth?',
    answer:
      'We see clients in person at our office in Seattle’s University District and by telehealth across Washington State. Which format fits your assessment is something we will discuss with you during the screening process.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    organizationJsonLd,
    {
      '@type': 'Service',
      '@id': `${PAGE_URL}#service`,
      name: 'Autism & ADHD Assessments',
      serviceType: 'Autism and ADHD assessment',
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

const AssessmentsPage = () => {
  return (
    <div className="bg-[#f3f6f9] text-gray-800">
      <SEO
        title="Adult Autism & ADHD Assessment in Seattle, WA"
        description={DESCRIPTION}
        canonical="/neurodiversity/assessments/"
        image="/images/autism-adhd-assessments-hero.avif"
        jsonLd={jsonLd}
      />

      <ServiceHero
        image="/images/autism-adhd-assessments-hero.avif"
        alt="Autism and ADHD assessments"
        title="Autism &amp; ADHD Evaluations"
        subtitle="Gain a better understanding of your unique Brain Style — in Seattle and by telehealth across Washington"
      />

      <ServicesLayout>
        <div className="space-y-8">
          <ServiceSection
            title="Why Should I (or My Child) Get Assessed?"
            image="/images/autism-adhd-assessments-1.avif"
            alt="Child with colorful background"
            tinted
          >
            <p>
              At Mindful Way Therapy, we recognize the unique ways ADHD and Autism shape daily experiences,
              from managing focus and productivity to navigating social and emotional dynamics. You don’t have
              to navigate these experiences alone or wonder why certain things feel so difficult.
            </p>
            <p>
              Understanding whether ADHD or Autism is part of your or your child’s experience can be
              life-changing. A Brain Style Profile offers valuable insights into how the brain functions,
              illuminating both strengths and challenges that may have gone unrecognized. For children, an
              early profile can pave the way for tailored support in school and social settings, helping them
              thrive and build confidence. For adults, a Brain Style Profile provides a framework to better
              understand past struggles, improve relationships, and make informed choices about work, daily
              routines, and personal goals.
            </p>
          </ServiceSection>

          <ServiceSection
            title="What is a Brain Style Profile?"
            image="/images/autism-adhd-assessments-2.jpeg"
            alt="Adult considering an autism assessment"
            reverse
          >
            <p>
              Unlike traditional evaluations, our Brain Style Profile (a term coined from the MIGDAS-2
              Assessment) highlights personal strengths and differences; supports self-discovery; and offers
              practical guidance to help neurodivergent individuals thrive.
            </p>
            <p>
              Through a blend of standardized tools and personalized consultations, we dive into how your brain
              works, identifying patterns that reveal areas of both comfort and difficulty. This profile is
              more than just a diagnosis—it’s a personalized roadmap that helps illuminate the underlying
              factors influencing focus, organization, social interaction, and emotional regulation.
            </p>
            <p>Start your journey with us and gain the clarity, confidence, and support you need to thrive.</p>
          </ServiceSection>

          <ServiceSection
            title="Why a Neurodivergent Affirming Assessment?"
            image="/images/autism-adhd-assessments-3.jpeg"
            alt="Neurodivergent affirming assessment"
            tinted
          >
            <p>
              A Neurodivergent Affirming Assessment views traits like ADHD and Autism as natural parts of
              identity, focusing on strengths rather than deficits. This approach provides insight into unique
              qualities and support needs without clinical or pathologizing language, empowering individuals
              and families with a more holistic understanding.
            </p>
            <p className="font-semibold text-gray-900">
              How is this different from a typical assessment?
            </p>
            <ul className="list-disc pl-5 space-y-2 marker:text-sky-700">
              <li>
                <strong>Strength-Based Focus:</strong> We highlight unique strengths, reframing traits as
                valuable differences rather than challenges.
              </li>
              <li>
                <strong>Respectful Language:</strong> Our assessments avoid pathologizing terms, respecting
                neurodivergent traits as natural variations.
              </li>
              <li>
                <strong>Person-Centered:</strong> We see the whole person, not just symptoms, fostering
                self-confidence and acceptance.
              </li>
              <li>
                <strong>Empowering Recommendations:</strong> Strategies are tailored to help clients thrive as
                they are, supporting genuine self-expression rather than conformity.
              </li>
            </ul>
          </ServiceSection>

          <ServiceTextSection title="Our Assessment Process">
            <p>
              Autism and ADHD each bring distinct traits, patterns, and ways of engaging with the world. Our
              Brain Style Profiles highlight both strengths and differences to help individuals and families
              better understand and support neurodivergent identities.
            </p>
            <Accordion />
          </ServiceTextSection>

          <ServiceTextSection title="Frequently Asked Questions" tinted>
            <FaqAccordion items={faqs} />

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                to="/providers"
                className="flex-1 text-center border-2 border-sky-700 text-sky-700 font-semibold py-2 px-5 rounded-lg hover:bg-sky-50 transition"
              >
                Meet Our Providers
              </Link>
              <Link
                to="/contact/evaluation"
                className="flex-1 text-center bg-sky-700 border-2 border-sky-700 text-white font-semibold py-2 px-5 rounded-lg shadow hover:bg-sky-800 hover:border-sky-800 transition"
              >
                Request an Evaluation
              </Link>
            </div>
          </ServiceTextSection>
        </div>
      </ServicesLayout>

      {/* CTA */}
      <section className="bg-sky-700 text-white py-16 px-4 md:px-10 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Begin Your Evaluation?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Whether you’re seeking clarity for yourself or your child, we’re here to help.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link
            to="/contact/evaluation"
            className="bg-white text-sky-700 font-semibold py-2 px-6 rounded shadow hover:bg-gray-100 transition"
          >
            Schedule an Evaluation
          </Link>
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
};

export default AssessmentsPage;
