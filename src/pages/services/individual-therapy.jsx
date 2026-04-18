import React from 'react';
import SEO from '../../components/SEO';

function IndividualTherapy() {
  return (
    <div className="bg-[#f3f6f9] text-gray-800">
      <SEO
        title="Individual Therapy | Mindful Way Therapy"
        description=""
      />

      {/* Hero Section */}
      <div
        className="w-full h-[450px] bg-cover bg-center mt-20 relative flex items-center justify-center"
        style={{ backgroundImage: "url('/images/individual.avif')" }}
      >
        <div className="bg-white/80 text-black px-6 py-8 rounded-xl shadow-md max-w-2xl text-center">
          <h1 className="text-3xl md:text-4xl mb-4">Individual Therapy</h1>
          <p className="text-base md:text-lg leading-relaxed">
            {/* TODO: Hero subtitle */}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <section className="bg-white py-20 px-4 md:px-10">
        <div className="max-w-4xl mx-auto">
          {/* TODO: Add content sections */}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-sky-700 text-white py-16 px-4 md:px-10 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          {/* TODO: CTA copy */}
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <a
            href="/contact"
            className="bg-white text-sky-700 font-semibold py-2 px-6 rounded shadow hover:bg-gray-100 transition"
          >
            Get Started
          </a>
          <a
            href="/providers"
            className="bg-white text-sky-700 font-semibold py-2 px-6 rounded shadow hover:bg-gray-100 transition"
          >
            Meet Our Providers
          </a>
        </div>
      </section>
    </div>
  );
}

export default IndividualTherapy;
