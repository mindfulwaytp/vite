import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import FaqAccordion from '../components/FaqAccordion';
import { ORGANIZATION_ID, SITE_URL, organizationJsonLd } from '../data/organization';

// Linked from the rebrand banner (components/RebrandBanner.jsx).
const PAGE_URL = `${SITE_URL}/our-new-name/`;
const DESCRIPTION =
  'Mindful Way Therapy is becoming Kaleidospark Therapy. Same clinicians, same office, same insurance and billing. Only our name, look, website and email addresses are changing.';

const PHONE_DISPLAY = '360-347-2559 x4';
// The comma makes phones pause after connecting, then dial extension 4.
const PHONE_HREF = 'tel:+13603472559,4';
const EMAIL = 'support@mindfulway-therapy.com';

// Rendered on the page and emitted as FAQPage structured data. Keep answers plain text.
const faqs = [
  {
    question: 'Will my therapist or appointments change?',
    answer:
      'No. You’ll keep the same clinician, the same appointment times, and the same office. Telehealth links stay the same unless your clinician lets you know otherwise.',
  },
  {
    question: 'Does this affect my insurance or billing?',
    answer:
      'No. We’re the same practice, and we continue to accept Apple Health, Aetna, Premera Blue Cross, Regence BlueShield, Cigna, and UnitedHealthcare plans. You may see “Mindful Way Therapy, PLLC” or “Kaleidospark Therapy” on statements and insurance paperwork for a while. Both are us.',
  },
  {
    question: 'Do I need to do anything?',
    answer:
      'Not right now. We will be sending out new forms to sign in early January. We ask for your attention when they arrive so we can ensure we have new forms on file. You may want to save our new email addresses in your contacts so our messages don’t land in spam.',
  },
  {
    question: 'Is the practice under new ownership?',
    answer:
      'No. Kaleidospark Therapy is the same practice, with the same owner, clinical director, and team. Only the name is changing.',
  },
  {
    question: 'Will your website and email change?',
    answer:
      'Yes. Our new website will be kaleidosparktherapy.com, and our email addresses will end in @kaleidosparktherapy.com. The old website and email addresses will keep working and will automatically send you to the right place, so nothing gets lost.',
  },
  {
    question: 'Will my records or privacy be affected?',
    answer:
      'No. Your records stay securely with our practice, and our privacy practices aren’t changing. We’ll continue to protect your information the same way we always have.',
  },
  {
    question: 'Who can I contact with questions?',
    answer: `We’re happy to help. Reach us at ${PHONE_DISPLAY} or ${EMAIL}, or ask your clinician at your next session.`,
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    organizationJsonLd,
    {
      '@type': 'WebPage',
      '@id': PAGE_URL,
      name: 'Mindful Way Therapy is becoming Kaleidospark Therapy',
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

function Section({ title, children }) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl md:text-3xl font-bold text-[#3A2340]">{title}</h2>
      <div className="text-gray-700 text-lg leading-relaxed space-y-4">{children}</div>
    </section>
  );
}

function OurNewName() {
  return (
    <div className="bg-white text-gray-800">
      <SEO
        title="Mindful Way Therapy is becoming Kaleidospark Therapy"
        appendSiteName={false}
        description={DESCRIPTION}
        canonical="/our-new-name/"
        jsonLd={jsonLd}
      />

      {/* Intro */}
      <div className="text-[#3A2340] pt-16 pb-4 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          {/* Used as <img>, the SVG's own <title>/aria-label are ignored by screen
              readers, so the alt text here is what gets announced. */}
          <img
            src="/images/Kaleidospark_Logo_Web.svg"
            alt="Kaleidospark Therapy logo"
            width="681"
            height="238"
            className="mx-auto w-full max-w-xs md:max-w-sm h-auto"
          />
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            Mindful Way Therapy is becoming Kaleidospark Therapy
          </h1>
          <div className="mx-auto h-1 w-20 rounded-full bg-[#5FB8B8]" aria-hidden="true" />
          <p className="text-lg md:text-xl text-[#6E4A6A] leading-relaxed">
            A new name that better reflects who we are. Same clinicians, same care, same commitment to you.
          </p>
        </div>
      </div>

      <div className="bg-white pt-8 pb-16 px-4 md:px-10">
        <div className="max-w-3xl mx-auto space-y-14">
          <p className="text-lg md:text-xl leading-relaxed text-gray-700">
            In January 2027, Mindful Way Therapy will officially become Kaleidospark Therapy. Nothing about
            your care is changing: you’ll see the same clinician, at the same office, with the same insurance
            and billing. What’s changing is our name, our look, and our website and email addresses.
          </p>

          <Section title="Why we’re changing our name">
            <p>
              When we opened in 2020, we were a small practice. Today we're a team of 15 clinicians and a graduate intern program, with a 
              clear sense of who we are and who we serve. We wanted a name that grows with us and reflects the colorful, complex, wonderfully different people who walk through our doors.
            </p>
          </Section>

          <Section title="What “Kaleidospark” means">
            <p>
              A kaleidoscope is made of many colorful, one-of-a-kind pieces, and every turn reveals a new
              pattern. Nothing in it is wrong or out of place. A spark is the moment something clicks: feeling
              understood, seeing yourself in a new light, or reconnecting with the part of you that was always
              there.
            </p>
            <p>
              Together, they capture what we believe: every person is beautifully complex, every mind has its
              own spark, and sometimes a new perspective changes everything.
            </p>
          </Section>

          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#3A2340]">Frequently asked questions</h2>
            <FaqAccordion items={faqs} />
            <p className="text-gray-700 text-lg leading-relaxed">
              Still have a question? Call us at{' '}
              <a href={PHONE_HREF} className="text-sky-700 underline">{PHONE_DISPLAY}</a>, email{' '}
              <a href={`mailto:${EMAIL}`} className="text-sky-700 underline">{EMAIL}</a>, or{' '}
              <Link to="/contact" className="text-sky-700 underline">get in touch</Link>.
            </p>
          </section>

          <div className="border-t border-gray-200 pt-10 text-center space-y-3">
            <p className="text-xl italic text-gray-700">
              Thank you for being part of our community. We can’t wait to share this next chapter with you.
            </p>
            <p className="text-gray-600">— Ryne Evans, MA, LMFT, and the Kaleidospark Therapy team</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OurNewName;
