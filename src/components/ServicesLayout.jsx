import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const serviceLinks = [
  { label: 'Individual Therapy', path: '/services/individual-therapy' },
  { label: 'Couples & Family Therapy', path: '/services/couples-family-therapy' },
  { label: 'Polyamory & Non-Monogamy', path: '/services/polyamory-non-monogamy' },
  { label: 'Queer Affirming Therapy', path: '/services/queer-affirming-therapy' },
  { label: 'ADHD & Autism Evaluations', path: '/services/adhd-autism-evaluations' },
  { label: 'Neurodivergent Affirming Therapy', path: '/services/neurodivergent-affirming-therapy' },
  { label: 'Groups', path: '/services/groups' },
];

export default function ServicesLayout({ children }) {
  const { pathname } = useLocation();

  return (
    <section className="bg-white py-16 px-4 md:px-10">
      {/* Mobile: horizontal scroll nav */}
      <div className="md:hidden mb-8 -mx-4 px-4 overflow-x-auto">
        <div className="flex gap-2 w-max">
          {serviceLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`whitespace-nowrap text-sm font-medium py-1.5 px-4 rounded-full border transition ${
                pathname === link.path || pathname.startsWith(link.path + '/')
                  ? 'bg-sky-700 text-white border-sky-700'
                  : 'bg-white text-gray-600 border-gray-300 hover:border-sky-400 hover:text-sky-700'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Desktop: sidebar + content */}
      <div className="max-w-6xl mx-auto flex gap-10 items-start">
        {/* Sidebar */}
        <aside className="hidden md:block w-56 flex-shrink-0 sticky top-28">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 px-2">Our Services</p>
          <nav className="flex flex-col">
            {serviceLinks.map((link) => {
              const active = pathname === link.path || pathname.startsWith(link.path + '/');
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm py-2 px-3 rounded-lg mb-1 transition leading-snug ${
                    active
                      ? 'bg-sky-50 text-sky-700 font-semibold border-l-4 border-sky-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-sky-700'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {children}
        </div>
      </div>
    </section>
  );
}
