import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

function Services() {
  const services = [
    {
      title: 'Individual Therapy',
      description: 'Our individual therapy services provide a supportive space where you can explore your identity, process life challenges, and build emotional resilience.',
      image: 'images/individual.avif',
      href: '/services/individual-therapy',
    },
    {
      title: 'Couples & Family Therapy',
      description: 'Our couples and family therapy services support deeper connection, improved communication, and authentic relationships in neurodivergent, LGBTQ+, and non-traditional relationships.',
      image: 'images/couples.avif',
      href: '/services/couples-family-therapy',
    },
    {
      title: 'Polyamory & Non-Monogamy Support',
      description: 'We support individuals, couples, and relationship constellations exploring polyamory, ethical non-monogamy, or open relationships in a safe, nonjudgmental space.',
      image: 'images/polyamory.jpeg',
      href: '/services/polyamory-non-monogamy',
    },
    {
      title: 'Queer Affirming Therapy',
      description: 'Our queer-affirming therapy provides a safe, supportive space for LGBTQ+ individuals to explore identity, relationships, mental health, and self-worth without judgment.',
      image: 'images/lgbtqtherapy.jpg',
      href: '/services/queer-affirming-therapy',
    },
    {
      title: 'ADHD & Autism Evaluations',
      description: 'We offer comprehensive ADHD and autism evaluations for teens and adults using a neurodivergent-affirming approach focused on clarity, self-awareness, and personalized support.',
      image: 'images/ndassessment.avif',
      href: '/services/adhd-autism-evaluations',
    },
    {
      title: 'Neurodivergent Affirming Therapy',
      description: 'We specialize in working with autistic and ADHD individuals across all ages using a strengths-based, neurodiversity-affirming approach.',
      image: 'images/ndservices.avif',
      href: '/services/neurodivergent-affirming-therapy',
    },
    {
      title: 'Groups',
      description: '',
      image: 'images/therapycouch.jpg',
      href: '/services/groups',
    },
  ];

  return (
    <div className="bg-[#f3f6f9] text-gray-800">
      {/* Hero Section */}
      <div
        className="w-full h-[450px] bg-cover bg-center mt-20 relative flex items-center justify-center"
        style={{ backgroundImage: "url('/images/therapycouch.jpg')" }}
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
          <h2 className="text-3xl font-bold text-center text-sky-700 mb-10 col-span-full">
            What We Offer
          </h2>

          {services.map((s, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition p-4 flex flex-col items-center text-center max-w-90 mx-auto"
            >
              <div className="w-full aspect-[5/6] max-w-[300px] mx-auto overflow-hidden rounded-lg mb-4">
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full h-full object-cover rounded-lg shadow-sm"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{s.title}</h3>
              <p className="text-gray-700 text-base leading-relaxed mb-4">{s.description}</p>
              <Link
                to={s.href}
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
            href="/contact/ratesfees"
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
