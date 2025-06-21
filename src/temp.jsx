import React from 'react';
import therapyScene from './assets/therapy-scene.avif';
import therapyOffice from './assets/therapy-office.avif';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl  text-gray-900 mb-4">
            Welcome to Mindful Way Therapy
          </h1>
          <p className="text-lg text-gray-600 italic">
            Your Compassionate Space for Mental<br />Health and Wellness.
          </p>
        </div>
        <div>
          <img src={therapyScene} alt="Therapy Scene" className="rounded-xl shadow-md w-full object-cover" />
        </div>
      </section>

      {/* About Section */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-start">
          <div>
            <img src={therapyOffice} alt="Therapy Office" className="rounded-xl shadow-md w-full object-cover" />
          </div>
          <div>
            <h2 className="text-3xl  text-gray-800 mb-4">About Us</h2>
            <h3 className="text-lg  mb-2">Our Approach</h3>
            <p className="text-gray-700 mb-4">
              We specialize in working with neurodivergent individuals, including those with autism, ADHD, and other neurodiverse conditions. Our therapists are trained to understand the unique challenges and strengths of neurodivergent clients.
            </p>
            <p className="text-gray-700">
              At Mindful Way Therapy, we’re dedicated to providing compassionate and effective therapy services to individuals in the Seattle area and beyond...
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
