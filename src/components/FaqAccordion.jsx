import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

// Collapsed answers stay in the DOM (hidden, not unmounted) so the build-time
// prerender still captures them. The FAQ text is a large share of what search
// and AI engines read off these pages — unmounting it would remove it from the
// static HTML.

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60);

export default function FaqAccordion({ items }) {
  const location = useLocation();
  const [openId, setOpenId] = useState(null);

  // Lets a link like /contact/affording-therapy/#can-i-change-my-apple-health-plan
  // open and scroll to a single answer.
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (!hash || !items.some((item) => slugify(item.question) === hash)) return;
    setOpenId(hash);
    document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [location, items]);

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const id = slugify(item.question);
        const isOpen = openId === id;
        return (
          <div key={id} id={id} className="border border-gray-200 rounded-xl shadow-sm">
            <h3>
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : id)}
                aria-expanded={isOpen}
                aria-controls={`${id}-panel`}
                className="w-full flex justify-between items-center gap-3 p-4 text-left text-base md:text-lg font-semibold text-sky-800 hover:bg-gray-50 rounded-xl transition"
              >
                <span>{item.question}</span>
                {isOpen ? (
                  <FaChevronUp className="shrink-0 text-sky-700" aria-hidden="true" />
                ) : (
                  <FaChevronDown className="shrink-0 text-sky-700" aria-hidden="true" />
                )}
              </button>
            </h3>
            <div
              id={`${id}-panel`}
              hidden={!isOpen}
              className="px-4 pb-4 text-gray-700 leading-relaxed"
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
