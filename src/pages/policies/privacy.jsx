import React from 'react';
import SEO from '../../components/SEO';
import PrivacyPolicyContent from '../../components/Policies/PrivacyPolicyContent';
import PoliciesLayout from '../../components/PoliciesLayout';

function PrivacyPolicy() {
  return (
    <div className="bg-[#f3f6f9] text-gray-800">
      <SEO
        title="Privacy Policy | Mindful Way Therapy"
        description="How Mindful Way Therapy collects, uses, and protects information through this website."
        canonical="/policies/privacy/"
      />
      <PoliciesLayout>
        <PrivacyPolicyContent />
      </PoliciesLayout>
    </div>
  );
}

export default PrivacyPolicy;
