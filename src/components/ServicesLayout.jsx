import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  SERVICE_LINKS,
  SPECIALTY_LINKS,
  SERVICES_INDEX,
  SPECIALTIES_INDEX,
  isActiveLink,
} from '../data/navigation';

// Sidebar + content shell shared by every service and specialty page.
//
// `section` picks which group the sidebar lists. It defaults to whichever group
// contains the current path, so pages don't have to pass it — and a page listed
// under a URL that doesn't match its section (autism/ADHD therapy lives under
// /neurodiversity but is a specialty) still gets the right sidebar.

const GROUPS = {
  services: { heading: 'Our Services', links: SERVICE_LINKS, index: SERVICES_INDEX },
  specialties: { heading: 'Our Specialties', links: SPECIALTY_LINKS, index: SPECIALTIES_INDEX },
};

function inferSection(pathname) {
  if (SPECIALTY_LINKS.some((l) => isActiveLink(pathname, l))) return 'specialties';
  return 'services';
}

export default function ServicesLayout({ children, section }) {
  const { pathname } = useLocation();
  const { heading, links, index } = GROUPS[section || inferSection(pathname)];

  return (
    <section className="bg-white py-16 px-4 md:px-10">
      {/* Mobile: horizontal scroll nav */}
      <div className="md:hidden mb-8 -mx-4 px-4 overflow-x-auto">
        <div className="flex gap-2 w-max">
          {[index, ...links].map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`whitespace-nowrap text-sm font-medium py-1.5 px-4 rounded-full border transition ${
                isActiveLink(pathname, link, { exact: link === index })
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
        <aside className="hidden md:block w-56 flex-shrink-0 sticky top-28">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 px-2">
            {heading}
          </p>
          <nav className="flex flex-col">
            <Link
              to={index.path}
              className={`text-sm py-2 px-3 rounded-lg mb-2 transition leading-snug flex items-center gap-1.5 border-b border-gray-200 pb-3 ${
                isActiveLink(pathname, index, { exact: true })
                  ? 'text-sky-700 font-semibold'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-sky-700'
              }`}
            >
              <span aria-hidden="true">&larr;</span>
              {index.label}
            </Link>

            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm py-2 px-3 rounded-lg mb-1 transition leading-snug ${
                  isActiveLink(pathname, link)
                    ? 'bg-sky-50 text-sky-700 font-semibold border-l-4 border-sky-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-sky-700'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </aside>

        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </section>
  );
}
