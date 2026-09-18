import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { SPECIALTY_LINKS } from '../data/navigation';
import { ORGANIZATION_ID, SITE_URL, organizationJsonLd } from '../data/organization';

const PAGE_URL = `${SITE_URL}/specialties/`;
const DESCRIPTION =
  'What we help with at Mindful Way Therapy — autism and ADHD, LGBTQ+ and queer identity, polyamory and non-monogamy. Seattle and telehealth across Washington.';

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    organizationJsonLd,
    {
      '@type': 'CollectionPage',
      '@id': PAGE_URL,
      name: 'Our Specialties',
      description: DESCRIPTION,
      url: PAGE_URL,
      about: { '@id': ORGANIZATION_ID },
    },
  ],
};

function Specialties() {
  return (
    <div className="bg-[#f3f6f9] text-gray-800">
      <SEO
        title="Our Specialties | Mindful Way Therapy"
        description={DESCRIPTION}
        canonical="/specialties/"
        jsonLd={jsonLd}
      />

      {/* Hero */}
      <div
        className="w-full h-[380px] md:h-[450px] bg-cover bg-center mt-20 relative flex items-center justify-center"
        style={{ backgroundImage: "url('/images/autism-adhd-therapy-hero.jpg')" }}
      >
        <div className="bg-white/80 text-black px-6 py-8 rounded-xl shadow-md max-w-2xl text-center">
          <h1 className="text-3xl md:text-4xl mb-4">Our Specialties</h1>
          <p className="text-base md:text-lg leading-relaxed">
            Our therapists work with a wide range of concerns. These are the areas where our team has
            particular depth — and where you won’t have to explain the basics of who you are.
          </p>
        </div>
      </div>

      {/* Specialty cards */}
      <section className="bg-white py-20 px-4 md:px-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-sky-700 mb-4">What We Help With</h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Looking for a particular format of care instead — individual, couples, groups, or an
            assessment?{' '}
            <Link to="/services" className="text-sky-700 underline font-semibold">
              See our services
            </Link>
            .
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {SPECIALTY_LINKS.map((item) => (
              <div
                key={item.path}
                className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition p-4 flex flex-col items-center text-center"
              >
                <div className="w-full aspect-[5/6] max-w-[300px] mx-auto overflow-hidden rounded-lg mb-4">
                  <img
                    src={item.image}
                    alt={item.label}
                    className="w-full h-full object-cover rounded-lg shadow-sm"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.label}</h3>
                <p className="text-gray-700 text-base leading-relaxed mb-4">{item.description}</p>
                <Link
                  to={item.path}
                  className="mt-auto bg-sky-700 text-white text-sm font-semibold py-2 px-5 rounded shadow hover:bg-sky-800 transition"
                >
                  Learn More
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-600 max-w-2xl mx-auto mt-12">
            Not seeing what you’re looking for? Our therapists also work with anxiety, depression,
            trauma, grief, life transitions, and more.{' '}
            <Link to="/providers" className="text-sky-700 underline font-semibold">
              Search our providers by specialty
            </Link>{' '}
            to find someone who fits.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-sky-700 text-white py-16 px-4 md:px-10 text-center">
        <h2 className="text-3xl font-bold mb-4">Not Sure Where You Fit?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          You don’t need to have it figured out before reaching out. Tell us what’s going on and we’ll
          help you find the right therapist.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link
            to="/contact/therapy"
            className="bg-white text-sky-700 font-semibold py-2 px-6 rounded shadow hover:bg-gray-100 transition"
          >
            Complete Our Inquiry Form
          </Link>
          <Link
            to="/providers"
            className="bg-white text-sky-700 font-semibold py-2 px-6 rounded shadow hover:bg-gray-100 transition"
          >
            Meet Our Providers
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Specialties;
