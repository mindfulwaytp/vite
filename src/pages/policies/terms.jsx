import React from 'react';
import SEO from '../../components/SEO';
import TermsOfServiceContent from '../../components/Policies/TermsOfServiceContent';
import PoliciesLayout from '../../components/PoliciesLayout';

function TermsAndConditions() {
  return (
    <div className="bg-[#f3f6f9] text-gray-800">
      <SEO
        title="Terms & Conditions | Mindful Way Therapy"
        description="The terms that apply to your use of the Mindful Way Therapy website."
        canonical="/policies/terms/"
      />
      <PoliciesLayout>
        <TermsOfServiceContent />
      </PoliciesLayout>
    </div>
  );
}

export default TermsAndConditions;
