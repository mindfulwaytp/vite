import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import ServicesLayout from '../../components/ServicesLayout';

const statusConfig = {
  enrolling: { label: 'Now Enrolling', classes: 'bg-green-100 text-green-700 border border-green-300' },
  waitlist: { label: 'Waitlist Only', classes: 'bg-amber-100 text-amber-700 border border-amber-300' },
  'coming-soon': { label: 'Coming Soon', classes: 'bg-gray-100 text-gray-500 border border-gray-300' },
};

const groups = [
  {
    title: 'The Adventuring Party',
    subtitle: 'A Tabletop RPG for Neurodiverse Adolescents',
    description:
      'A virtual tabletop RPG campaign for neurodiverse teens ages 13-17. Your party will face dungeons, wild beasts, and dangerous traps that no one character can handle alone. The adventure is the point.',
    ages: '13-17',
    format: 'Virtual (Zoom)',
    schedule: 'Fridays, 5:30 PM - 7:00 PM',
    startDate: 'Starting July 3, 2026',
    duration: '6-8 weeks',
    cost: '$40/session',
    facilitators: 'Ryne Evans, MA, LMFT & Julian Macke, MA, LMHCA',
    note: 'Powered by Critical Core\u2122 \u2014 A therapeutic RPG system by Game to Grow',
    status: 'enrolling',
    href: '/services/groups/ttrpg',
  },
];

function Groups() {
  return (
    <div className="bg-[#f3f6f9] text-gray-800">
      <SEO
        title="Groups | Mindful Way Therapy"
        description="Therapeutic group offerings at Mindful Way Therapy, including groups for neurodiverse teens, adults, and more."
      />

      {/* Hero Section */}
      <div className="mt-20 relative w-full overflow-hidden max-h-[420px]">
        <img
          src="/images/therapycouch.jpg"
          alt="Groups"
          className="w-full max-h-[420px] object-cover object-center"
        />
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="bg-white/80 text-black px-6 py-8 rounded-xl shadow-md max-w-2xl text-center">
            <h1 className="text-3xl md:text-4xl mb-4">Groups</h1>
            <p className="text-base md:text-lg leading-relaxed">
              Community, connection, and shared experience — our groups bring people together in a supportive, therapeutic setting.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content with Sidebar */}
      <ServicesLayout>
        <h2 className="text-2xl font-bold text-sky-700 mb-4">Why Group Therapy?</h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-10">
          Groups offer something individual therapy cannot — the experience of being truly seen and understood by others who get it.
          Whether you are here to build skills, find community, or simply feel less alone, our groups are designed to be affirming,
          accessible, and genuinely therapeutic.
        </p>

        <h2 className="text-2xl font-bold text-sky-700 mb-6">Current Groups</h2>
        <div className="grid grid-cols-1 gap-8">
          {groups.map((group, i) => {
            const status = statusConfig[group.status];
            return (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition flex flex-col overflow-hidden"
              >
                <div className="bg-sky-700 px-5 py-4 flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-white text-xl font-bold leading-tight">{group.title}</h3>
                    <p className="text-sky-200 text-sm mt-1 italic">{group.subtitle}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap mt-1 ${status.classes}`}>
                    {status.label}
                  </span>
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <p className="text-gray-700 text-sm leading-relaxed mb-5">{group.description}</p>

                  <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm mb-5">
                    <div>
                      <dt className="font-semibold text-gray-500 uppercase tracking-wide text-xs">Ages</dt>
                      <dd className="text-gray-800">{group.ages}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-gray-500 uppercase tracking-wide text-xs">Format</dt>
                      <dd className="text-gray-800">{group.format}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-gray-500 uppercase tracking-wide text-xs">Schedule</dt>
                      <dd className="text-gray-800">{group.schedule}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-gray-500 uppercase tracking-wide text-xs">Start Date</dt>
                      <dd className="text-gray-800">{group.startDate}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-gray-500 uppercase tracking-wide text-xs">Duration</dt>
                      <dd className="text-gray-800">{group.duration}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-gray-500 uppercase tracking-wide text-xs">Cost</dt>
                      <dd className="text-gray-800">{group.cost}</dd>
                    </div>
                    <div className="col-span-2">
                      <dt className="font-semibold text-gray-500 uppercase tracking-wide text-xs">Facilitators</dt>
                      <dd className="text-gray-800">{group.facilitators}</dd>
                    </div>
                  </dl>

                  {group.note && (
                    <p className="text-xs text-gray-400 italic mb-5">{group.note}</p>
                  )}

                  <Link
                    to={group.href}
                    className="mt-auto block text-center bg-sky-700 text-white font-semibold py-2 px-5 rounded-lg shadow hover:bg-sky-800 transition"
                  >
                    Learn More & Register
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </ServicesLayout>

      {/* CTA */}
      <section className="bg-sky-700 text-white py-16 px-4 md:px-10 text-center">
        <h2 className="text-3xl font-bold mb-4">Questions About Our Groups?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Reach out and we will help you find the right fit.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <a
            href="mailto:support@mindfulway-therapy.com"
            className="bg-white text-sky-700 font-semibold py-2 px-6 rounded shadow hover:bg-gray-100 transition"
          >
            Email Us
          </a>
          <a
            href="/contact"
            className="bg-white text-sky-700 font-semibold py-2 px-6 rounded shadow hover:bg-gray-100 transition"
          >
            Get Started
          </a>
        </div>
      </section>
    </div>
  );
}

export default Groups;
