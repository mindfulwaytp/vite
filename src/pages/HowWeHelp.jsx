import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { ORGANIZATION_ID, SITE_URL, organizationJsonLd } from '../data/organization';

const PAGE_URL = `${SITE_URL}/how-we-help/`;
const DESCRIPTION =
  'Find your way around Mindful Way Therapy — the kinds of care we offer, what we specialize in, what it costs, and resources you can use whether or not you become a client.';

// A wayfinding page, not an index. Each card says who it is for, so someone who
// does not yet know our vocabulary can still pick the right door.
const paths = [
  {
    label: 'Services',
    path: '/services',
    lede: 'If you know what kind of care you want',
    description:
      'Individual therapy, couples and family therapy, groups, and autism and ADHD assessments. Start here if you already have a format in mind.',
  },
  {
    label: 'Specialties',
    path: '/specialties',
    lede: 'If you know what you’re dealing with',
    description:
      'Autism and ADHD, LGBTQ+ and queer identity, polyamory and non-monogamy. Start here if you want a therapist who already understands your context.',
  },
  {
    label: 'Paying for Therapy',
    path: '/rates-fees',
    lede: 'If cost is the question',
    description:
      'Session rates, the insurance plans we accept, and sliding-scale options. We also accept Washington Apple Health (Medicaid).',
    secondary: { label: 'Help paying for therapy', path: '/affording-therapy' },
  },
  {
    label: 'Resources',
    path: '/resources',
    lede: 'If you’re not looking for a therapist right now',
    description:
      'Reading, tools, and references for neurodivergent people, parents, and professionals. Free to use, no appointment needed.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    organizationJsonLd,
    {
      '@type': 'CollectionPage',
      '@id': PAGE_URL,
      name: 'How We Help',
      description: DESCRIPTION,
      url: PAGE_URL,
      about: { '@id': ORGANIZATION_ID },
    },
  ],
};

function HowWeHelp() {
  return (
    <div className="bg-[#f3f6f9] text-gray-800">
      <SEO
        title="How We Help | Mindful Way Therapy"
        description={DESCRIPTION}
        canonical="/how-we-help/"
        jsonLd={jsonLd}
      />

      {/* Hero */}
      <div
        className="w-full h-[320px] md:h-[400px] bg-cover bg-center mt-20 relative flex items-center justify-center"
        style={{ backgroundImage: "url('/images/individual-therapy-hero.jpg')" }}
      >
        <div className="bg-white/80 text-black px-6 py-8 rounded-xl shadow-md max-w-2xl text-center">
          <h1 className="text-3xl md:text-4xl mb-4">How We Help</h1>
          <p className="text-base md:text-lg leading-relaxed">
            There’s no wrong door. Pick whichever of these matches what you already know.
          </p>
        </div>
      </div>

      <section className="bg-white py-16 px-4 md:px-10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {paths.map((item) => (
            <div
              key={item.path}
              className="border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition p-6 flex flex-col"
            >
              <p className="text-sm font-semibold uppercase tracking-wide text-sky-700 mb-1">
                {item.lede}
              </p>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">{item.label}</h2>
              <p className="text-gray-700 leading-relaxed mb-5">{item.description}</p>

              <div className="mt-auto flex flex-col gap-2">
                <Link
                  to={item.path}
                  className="text-center bg-sky-700 border-2 border-sky-700 text-white font-semibold py-2 px-5 rounded-lg shadow hover:bg-sky-800 hover:border-sky-800 transition"
                >
                  {item.label}
                </Link>
                {item.secondary && (
                  <Link
                    to={item.secondary.path}
                    className="text-center text-sky-700 underline text-sm font-semibold py-1"
                  >
                    {item.secondary.label}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-600 max-w-2xl mx-auto mt-12">
          Still not sure? You don’t need to have it figured out before reaching out.{' '}
          <Link to="/contact/therapy" className="text-sky-700 underline font-semibold">
            Tell us what’s going on
          </Link>{' '}
          and we’ll help you find the right fit, or{' '}
          <Link to="/providers" className="text-sky-700 underline font-semibold">
            browse our therapists
          </Link>
          .
        </p>
      </section>
    </div>
  );
}

export default HowWeHelp;
