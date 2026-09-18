import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { SERVICE_LINKS } from '../data/navigation';

function Services() {
  const services = SERVICE_LINKS;

  return (
    <div className="bg-[#f3f6f9] text-gray-800">
      <SEO
        title="Therapy Services in Seattle, WA | Mindful Way Therapy"
        description="Individual therapy, couples and family therapy, groups, and autism and ADHD assessments in Seattle and by telehealth across Washington."
        canonical="/services/"
      />

      {/* Hero Section */}
      <div
        className="w-full h-[450px] bg-cover bg-center mt-20 relative flex items-center justify-center"
        style={{ backgroundImage: "url('/images/groups-hero.jpg')" }}
      >
        <div className="bg-white/80 text-black px-6 py-8 rounded-xl shadow-md max-w-2xl text-center">
          <h1 className="text-3xl md:text-4xl mb-4">Our Services</h1>
          <p className="text-base md:text-lg leading-relaxed">
            At Mindful Way Therapy, we offer a wide range of specialized therapy services to support you on your journey toward improved mental health.
            Whether you are seeking individual therapy, couples counseling, or a neurodivergent-affirming evaluation, we are here to help.
          </p>
        </div>
      </div>

      {/* Service Cards */}
      <section className="bg-white py-20 px-4 md:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-x-10 gap-y-8">
          <div className="col-span-full text-center mb-10">
            <h2 className="text-3xl font-bold text-sky-700 mb-4">What We Offer</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Looking for a particular area of focus instead — autism and ADHD, LGBTQ+ care, or
              non-monogamy?{' '}
              <Link to="/specialties" className="text-sky-700 underline font-semibold">
                See our specialties
              </Link>
              .
            </p>
          </div>

          {services.map((s, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition p-4 flex flex-col items-center text-center max-w-90 mx-auto"
            >
              <div className="w-full aspect-[5/6] max-w-[300px] mx-auto overflow-hidden rounded-lg mb-4">
                <img
                  src={s.image}
                  alt={s.label}
                  className="w-full h-full object-cover rounded-lg shadow-sm"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{s.label}</h3>
              <p className="text-gray-700 text-base leading-relaxed mb-4">{s.description}</p>
              <Link
                to={s.path}
                className="mt-auto bg-sky-700 text-white text-sm font-semibold py-2 px-5 rounded shadow hover:bg-sky-800 transition"
              >
                Learn More
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-sky-700 text-white py-16 px-4 md:px-10 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Take the Next Step?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Whether you are looking to find the right provider, have questions about therapy, or want to learn more about our rates and services, we are here to help you get started.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <a
            href="/providers"
            className="bg-white text-sky-700 font-semibold py-2 px-6 rounded shadow hover:bg-gray-100 transition"
          >
            Meet Our Providers
          </a>
          <a
            href="/contact"
            className="bg-white text-sky-700 font-semibold py-2 px-6 rounded shadow hover:bg-gray-100 transition"
          >
            Get Started
          </a>
          <a
            href="/rates-fees"
            className="bg-white text-sky-700 font-semibold py-2 px-6 rounded shadow hover:bg-gray-100 transition"
          >
            View Rates &amp; Fees
          </a>
        </div>
      </section>
    </div>
  );
}

export default Services;
