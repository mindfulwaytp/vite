import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import PrivacyPolicyContent from './Policies/PrivacyPolicyContent';
import TermsOfServiceContent from './Policies/TermsOfServiceContent';

const sections = [
  {
    title: 'Privacy Policy',
    content: <PrivacyPolicyContent />,
  },
  {
    title: 'Terms & Conditions',
    content: <TermsOfServiceContent />,
  },
];

export default function PolicyAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleSection = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <div className="space-y-4">
      {sections.map((section, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-xl border border-gray-200 shadow-sm"
        >
          <button
            onClick={() => toggleSection(index)}
            className="flex w-full items-center justify-between p-4 text-left text-lg font-semibold text-sky-800 hover:bg-gray-50"
          >
            {section.title}
            {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
          </button>

          {openIndex === index && (
            <div className="bg-white rounded-b-xl">{section.content}</div>
          )}
        </div>
      ))}
    </div>
  );
}