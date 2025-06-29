import React from 'react';
import therapyScene from './assets/therapy-scene.avif';
import therapyOffice from './assets/therapy-office.avif';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-6 px-6 mt-20 md:px-12 py-10 bg-brand-100">
        <div className="md:w-1/2 text-center md:text-center">
          <h1 className="text-4xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Welcome to Mindful Way Therapy
          </h1>
          <p className="text-2xl text-gray-700 leading-relaxed">Therapy that Honors Who You Are</p>
          <p className="text-xl text-gray-700 leading-relaxed">We believe therapy should feel safe, validating, and grounded in real understanding. Whether you're seeking support for yourself, your relationship, or your child—we’re here to walk with you.</p>
        </div>

        <div className="md:w-1/2">
          <img
            src={therapyScene}
            alt="Therapy Scene"
            className="rounded-lg shadow-md w-full h-auto object-cover"
          />
        </div>
      </section>

      {/* About Section */}
      <section className="flex flex-col md:flex-row items-start gap-10 px-6 md:px-12 py-20 bg-white">
        <div className="md:w-1/2">
          <img
            src={therapyOffice}
            alt="About Us"
            className="rounded-lg shadow-lg w-[900px] h-[900px] object-cover"
          />
        </div>

        <div className="md:w-1/2 space-y-4">
          <h2 className="text-3xl font-bold text-center text-sky-700">About Us</h2>

          <h3 className="text-lg font-semibold text-gray-700">
            At Mindful Way Therapy, we offer affriming, trauma-informed care with a focus on the lived
            experiences of LGBTQ+ and neurodivergent individuals. Many of our providers are members of these communities
            themselves, or have close connections that inform their work. Under the direction of Practice Owner, Ryne Evans, MA, LMFT,
            our providers are commmitted to providing care that is affirming and culturally sensitive. We know how painful it can feel
            to be misunderstood in a healthcare setting--and we are committed to doing it differently.
          </h3>

          <h3 className="text-2xl font-semibold text-sky-700">Why Choose Us?</h3>
          <ul className="list-disc list-outside ml-6 text-gray-700 mb-6 space-y-2 text-lg">
            <li>We're not just affirming, we are part of your community. At Mindful Way, many of our providers are part of
              the communities we serve or have deep personal connections to these identities. We bring lived experiences, not just
              training to the therapy room.</li>
            <li>Experienced therapists who understand the challenges you're facing</li>
            <li>Safe and supportive environment where you can explore your thoughts and feelings</li>
            <li>Commitment to inclusivity and understanding of neurodiversity</li>
            <li>Flexible scheduling options to accommodate your lifestyle</li>
          </ul>

          <div className="flex flex-col sm:flex-row gap-4 pt-6 items-center justify-center">
            <Link
              to="/providers"
              className="px-5 py-3 border border-gray-400 rounded-lg text-gray-800 hover:border-sky-500 hover:text-sky-700 transition inline-flex items-center gap-2"
            >
              <span>👥</span> Our Providers
            </Link>
            <button
              disabled
              className="px-5 py-3 border border-gray-300 rounded-lg text-gray-400 cursor-not-allowed inline-flex items-center gap-2"
            >
              <span>💰</span> Rates Coming Soon
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="gap-10 px-6 md:px-12 mb-12 bg-white">
        <div>
          <h2 className="text-center text-3xl font-bold text-sky-700">Our Services & Specialties</h2>
        </div>
      </section>

      <section className="flex flex-col md:flex-row items-start gap-10 px-6 md:px-12 mb-12 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 items-start">
          <div className="flex flex-col space-y-2">
            <div className="flex items-start gap-2"></div>
            <h2 className="text-2xl font-bold text-center text-sky-700">Services</h2>
          <ul className="list-disc list-outside ml-2 text-gray-700 mb-6 space-y-2 text-lg">
            <ul className="list-disc list-outside ml-6 text-gray-700 mb-6 space-y-2 text-lg">
              <li>
                <span className="font-extrabold text-sky-800">Individual Therapy:</span>
                <span className="font-normal text-gray-700"> Support for a wide variety of challenges, including anxiety, depression, identity exploration, relationships and more.</span>
              </li>
              <li>
                <span className="font-extrabold text-sky-800">Couples and Family Therapy:</span>
                <span className="font-normal text-gray-700"> Help navigating conflict, communication, and deeper connection.</span>
              </li>
              <li>
                <span className="font-extrabold text-sky-800">ADHD & Autism Evaluations:</span>
                <span className="font-normal text-gray-700"> Affirming assessments focused on insight, not diagnosis alone.</span>
              </li>
              <li>
                <span className="font-extrabold text-sky-800">Surgery and Gender-Affirming Letters:</span>
                <span className="font-normal text-gray-700"> Respectful documentation for clients seeking medical transition support.</span>
              </li>
            </ul>
          </ul>
        </div>
      </div>
      </section>
    </>
  );
}

export default Home;


