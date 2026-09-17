import { Link } from 'react-router-dom';
import Modalities from '../../components/Modalities';
import SEO from '../../components/SEO';
import FaqAccordion from '../../components/FaqAccordion';
import ServicesLayout from '../../components/ServicesLayout';
import ServiceHero from '../../components/ServiceHero';
import ServiceSection, { ServiceTextSection } from '../../components/ServiceSection';
import { ORGANIZATION_ID, SITE_URL, organizationJsonLd } from '../../data/organization';

// pages/neurodiversity/affirming-therapy.jsx
//
// Lives under /neurodiversity but wears the services layout — the URL and the
// chrome are independent, and this is one of the seven service offerings listed
// in the sidebar.

const PAGE_URL = `${SITE_URL}/neurodiversity/affirming-therapy/`;
const DESCRIPTION =
  'Neurodivergent-affirming therapy for autistic and ADHD adults, teens, and families in Seattle and by telehealth across Washington. We work with your brain, not against it.';

// Rendered on the page and emitted as FAQPage structured data — keep answers plain text.
const faqs = [
  {
    question: 'What is neurodivergent-affirming therapy?',
    answer:
      'Neurodivergent-affirming therapy recognizes and respects the unique ways that neurodivergent people think, feel, process, and experience the world. Rather than viewing neurodivergence such as ADHD, autism, or sensory differences as something to be fixed or normalized, this approach embraces it as a natural variation of human diversity.',
  },
  {
    question: 'Do you use Applied Behavior Analysis (ABA)?',
    answer:
      'No. We do not use Applied Behavior Analysis because it is often based on modifying behaviors to fit neurotypical standards, which can feel restrictive and invalidating to neurodivergent people. ABA focuses primarily on changing outward behaviors rather than fostering self-acceptance. We focus on understanding and support instead.',
  },
  {
    question: 'What therapy approaches do you use instead?',
    answer:
      'Our therapists integrate evidence-based and neurodivergent-affirming modalities including somatic therapy, parts work such as Internal Family Systems, mindfulness-based interventions, and strengths-based and compassion-focused approaches. These help you explore identity, manage stress, process trauma, and build connection without pathologizing neurodivergent traits.',
  },
  {
    question: 'Do you offer neurodivergent-affirming therapy by telehealth?',
    answer:
      'Yes. We see clients in person at our office in Seattle’s University District and by telehealth anywhere in Washington State.',
  },
  {
    question: 'Do you accept insurance for neurodivergent-affirming therapy?',
    answer:
      'Yes. We are in network with Aetna, Premera Blue Cross, Regence BlueShield, Cigna, Molina Healthcare, and UnitedHealthcare Community Plan, though coverage varies by plan and by therapist. Self-pay and sliding-scale options are also available. Our Rates & Fees page lists which plans each therapist accepts.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    organizationJsonLd,
    {
      '@type': 'Service',
      '@id': `${PAGE_URL}#service`,
      name: 'Autism & ADHD Affirming Therapy',
      serviceType: 'Neurodivergent-affirming psychotherapy',
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

const AffirmingTherapy = () => {
  return (
    <div className="bg-[#f3f6f9] text-gray-800">
      <SEO
        title="Autism & ADHD Therapy in Seattle, WA"
        description={DESCRIPTION}
        canonical="/neurodiversity/affirming-therapy/"
        image="/images/autism-adhd-therapy-hero.jpg"
        jsonLd={jsonLd}
      />

      <ServiceHero
        image="/images/autism-adhd-therapy-hero.jpg"
        alt="Neurodivergent affirming therapy"
        title="Autism &amp; ADHD Affirming Therapy"
        subtitle="Serving clients in Seattle, WA and via telehealth throughout Washington"
      />

      <ServicesLayout>
        <div className="space-y-8">
          <ServiceSection
            title="What is Neurodivergent Affirming Therapy?"
            image="/images/autism-adhd-therapy-1.jpeg"
            alt="Child with colorful background"
            tinted
          >
            <p>
              Neurodivergent Affirming Therapy is a supportive approach that celebrates neurodiversity,
              respecting and valuing traits like ADHD, Autism, and other variations as natural parts of
              identity. Rather than seeking to ‘fix’ or change these differences, this therapy empowers
              individuals to embrace their strengths, build self-acceptance, and thrive authentically.
            </p>
            <p>
              Neurodivergent affirming therapy recognizes and respects the unique ways that neurodivergent
              people think, feel, process, and experience the world. Rather than viewing neurodivergence—such
              as ADHD, autism, or sensory differences—as something to be fixed or normalized, this approach
              embraces it as a natural variation of human diversity.
            </p>
            <p>
              A Brain Style Profile assessment at Mindful Way Therapy goes beyond just answering questions—it’s
              a step toward embracing your or your child’s unique neurodivergent identity. By understanding how
              ADHD or Autism affects thinking, emotions, and interactions, you can access the right tools,
              strategies, and resources to foster growth and well-being.
            </p>
          </ServiceSection>

          <ServiceSection
            title="Why Choose Neurodivergent Affirming Therapy?"
            image="/images/autism-adhd-therapy-2.jpg"
            alt="A woman laughing in a field of wildflowers"
            reverse
          >
            <p>
              Many neurodivergent individuals have spent years feeling misunderstood, pathologized, or
              pressured to mask who they are in order to fit in. Traditional therapy models often focus on
              fixing perceived “deficits” rather than supporting authentic ways of thinking, communicating, and
              existing.
            </p>
            <p>Neurodivergent affirming therapy is different.</p>
            <p>
              It creates a space where you don’t have to explain or justify your differences. Your sensory
              needs, communication style, executive functioning, and social rhythms are understood and
              respected. Rather than trying to make you more “typical,” we focus on helping you explore your
              identity, reduce shame, and build strategies that truly work for your life.
            </p>
          </ServiceSection>

          <ServiceTextSection title="Therapy Modalities" tinted>
            <div className="flex justify-center">
              <img
                src="/images/autism-adhd-therapy-modalities.jpg"
                alt="Therapy Modalities Brain Visual"
                className="w-full max-w-2xl h-auto rounded-lg shadow-md"
              />
            </div>
            <p>
              We use a variety of evidence-based and neurodivergent-affirming therapy modalities tailored to
              support the unique needs of our clients. Our therapists integrate approaches such as somatic
              therapy, parts work, mindfulness-based interventions, and strengths-based and compassion-based
              therapy modalities. These methods help individuals explore identity, manage stress, process
              trauma, and build meaningful connections—without pathologizing neurodivergent traits. Whether
              you're navigating life with ADHD, autism, anxiety, or trauma, our integrative approach creates a
              validating, supportive environment to help you thrive.
            </p>
            <Modalities />
          </ServiceTextSection>

          <ServiceTextSection title="Why We Are Anti-ABA (Applied Behavior Analysis)">
            <p>
              At Mindful Way Therapy, we do not use Applied Behavior Analysis (ABA) because it is often based
              on modifying behaviors to fit neurotypical standards, which can feel restrictive and invalidating
              to neurodivergent individuals. ABA focuses primarily on changing outward behaviors rather than
              fostering self-acceptance, often aiming to eliminate natural expressions of neurodivergent
              traits. This can undermine an individual’s sense of self-worth and authenticity, prioritizing
              “acceptable” behaviors over true understanding and support.
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
          </ServiceTextSection>

          <ServiceTextSection title="Frequently Asked Questions">
            <FaqAccordion items={faqs} />
          </ServiceTextSection>
        </div>
      </ServicesLayout>

      {/* CTA */}
      <section className="bg-sky-700 text-white py-16 px-4 md:px-10 text-center">
        <h2 className="text-3xl font-bold mb-4">Questions About Affirming Therapy?</h2>
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
};

export default AffirmingTherapy;
