import React from 'react';
import PolicyAccordion from '../components/PolicyAccordion';

const PoliciesLandingPage = () => {
  return (
    <main className="bg-white">
      <section className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-20">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">
            Legal
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Policies &amp; Terms
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 md:text-lg">
            Review our Privacy Policy and Terms &amp; Conditions below.
          </p>
        </div>

        <PolicyAccordion />
      </section>
    </main>
  );
};

export default PoliciesLandingPage;