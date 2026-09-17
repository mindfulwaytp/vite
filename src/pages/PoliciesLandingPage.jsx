import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

// Each policy lives on its own page so it can be linked to directly — from intake
// forms, emails, or vendor questionnaires — and so the consumer health data policy
// stands alone, as Washington's My Health My Data Act requires.
const policies = [
  {
    title: 'Privacy Policy',
    description: 'How we collect, use, and protect information through this website.',
    to: '/policies/privacy',
  },
  {
    title: 'Terms & Conditions',
    description: 'The terms that apply to your use of this website.',
    to: '/policies/terms',
  },
  {
    title: 'My Health My Data Act',
    description:
      'How we handle consumer health data under Washington’s My Health My Data Act.',
    to: '/policies/my-health-my-data',
  },
];

const PoliciesLandingPage = () => {
  return (
    <div className="bg-[#f3f6f9] text-gray-800">
      <SEO
        title="Policies & Terms | Mindful Way Therapy"
        description="Privacy Policy, Terms & Conditions, and Consumer Health Data Privacy Policy for Mindful Way Therapy."
        canonical="/policies/"
      />

      <main className="mt-20 bg-white py-16 px-4 md:px-10">
        <section className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">Legal</p>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              Policies &amp; Terms
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 md:text-lg">
              Review our policies below.
            </p>
          </div>

          <div className="space-y-4">
            {policies.map((policy) => (
              <Link
                key={policy.to}
                to={policy.to}
                className="block rounded-xl border border-gray-200 shadow-sm p-5 hover:shadow-md hover:border-sky-300 transition"
              >
                <h2 className="text-lg font-semibold text-sky-800 mb-1">{policy.title}</h2>
                <p className="text-gray-600">{policy.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default PoliciesLandingPage;
