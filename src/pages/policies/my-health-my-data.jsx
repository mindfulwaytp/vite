import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import PoliciesLayout from '../../components/PoliciesLayout';

// Washington My Health My Data Act (RCW 19.373) requires this to be a standalone
// policy, linked separately from the homepage, containing only what the Act requires.
// Do not merge it into the general Privacy Policy or add unrelated terms.

const EFFECTIVE_DATE = 'September 16, 2026';
const PRIVACY_CONTACT = 'support@mindfulway-therapy.com';

function Section({ title, children }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold text-sky-700 mb-3">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function MyHealthMyData() {
  return (
    <div className="bg-[#f3f6f9] text-gray-800">
      <SEO
        title="My Health My Data Act | Mindful Way Therapy"
        description="How Mindful Way Therapy handles consumer health data under Washington's My Health My Data Act."
        canonical="/policies/my-health-my-data/"
      />

      <PoliciesLayout>
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Legal</p>
          <h1 className="text-3xl md:text-4xl text-sky-700 mb-2">My Health My Data Act</h1>
          <p className="text-gray-600">Consumer Health Data Privacy Policy</p>
          <p className="text-gray-500 mb-10">Effective {EFFECTIVE_DATE}</p>

          <p className="text-gray-700 leading-relaxed mb-6">
            This My Health My Data Act policy (&ldquo;Policy&rdquo;) applies to personal data defined as
            &ldquo;Consumer Health Data&rdquo; by the Washington My Health My Data Act
            (&ldquo;MHMDA&rdquo;) that is collected from you by Mindful Way Therapy, PLLC
            (&ldquo;Mindful Way Therapy,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;).
            This Policy supplements our{' '}
            <Link to="/policies/privacy" className="text-sky-700 underline">
              Privacy Policy
            </Link>
            . In the event of a conflict between any other policy, statement, or notice and this Policy,
            this Policy will prevail as to Consumer Health Data collected under MHMDA.
          </p>

          <p className="text-gray-700 leading-relaxed mb-10">
            Consumer Health Data under MHMDA means personal information that is linked or reasonably
            linkable to a consumer, and that identifies the consumer&rsquo;s past, present, or future
            physical or mental health status. This Policy does not apply where an exception or exemption
            applies, such as to Protected Health Information (&ldquo;PHI&rdquo;) under the Health
            Insurance Portability and Accountability Act of 1996 (&ldquo;HIPAA&rdquo;). As a health care
            provider, most of the information we collect and use is excluded from MHMDA because it is
            regulated under HIPAA. See our Notice of Privacy Practices and the other notices we provide
            for disclosures about information that is not Consumer Health Data subject to MHMDA.
          </p>

          <div className="text-gray-700 leading-relaxed">
            <Section title="Categories of consumer health data we collect">
              <p>We collect a limited amount of information from visitors to this website:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Pages viewed on this website, including pages about specific services such as therapy
                  or ADHD and autism evaluations. Because of what those pages are about, a page view may
                  suggest an interest in health care services.
                </li>
                <li>
                  Information you choose to submit through our inquiry forms when you contact us about
                  becoming a client.
                </li>
              </ul>
              <p>
                We do not use cookies or advertising trackers on this website, and our analytics provider
                does not store visitor IP addresses or assign visitors a persistent identifier.
              </p>
              <p>We do not collect:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Precise location data.</li>
                <li>Biometric or genetic data.</li>
                <li>Data about your use of this website from advertising networks or data brokers.</li>
              </ul>
            </Section>

            <Section title="How we use this data and why we collect it">
              <p>
                We use page view data to understand which parts of our website people find useful, so we
                can improve it. We use information submitted through our inquiry forms to respond to you
                and determine whether we can provide the care you are seeking.
              </p>
              <p>
                We do not use consumer health data for advertising, and we do not use it to build profiles
                about individuals.
              </p>
            </Section>

            <Section title="Sources we collect it from">
              <p>
                We collect this data directly from you — either from your use of this website or from
                information you submit to us. We do not purchase consumer health data or obtain it from
                data brokers.
              </p>
            </Section>

            <Section title="Categories of data we share, and with whom">
              <p>
                We do not sell consumer health data. We do not share it with advertisers or data brokers.
              </p>
              <p>
                We use service providers to operate this website, and they process data only to provide
                services to us:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Our website host and content delivery network, which process visitor requests.</li>
                <li>Our analytics provider, which receives page view data without persistent identifiers.</li>
                <li>Our online form provider, which processes inquiry form submissions.</li>
              </ul>
            </Section>

            <Section title="Consent">
              <p>
                We collect consumer health data only as necessary to provide the services you ask us
                for. If we ever wanted to collect or share it for another purpose, we would ask for your
                consent first. We do not sell consumer health data, which under the My Health My Data Act
                would require your separate written authorization.
              </p>
            </Section>

            <Section title="How long we keep it">
              <p>
                We keep consumer health data only as long as needed for the purpose it was collected for,
                unless a longer period is required by law. Records we maintain as your health care
                provider are kept according to our legal obligations as a provider and are covered by
                HIPAA, not this policy.
              </p>
            </Section>

            <Section title="Your rights">
              <p>Under the My Health My Data Act, you have the right to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Confirm whether we collect, share, or sell your consumer health data, and access that
                  data, including a list of third parties it has been shared with.
                </li>
                <li>Withdraw your consent to our collection and sharing of your consumer health data.</li>
                <li>
                  Have your consumer health data deleted, including asking us to notify affiliates and
                  service providers of your deletion request.
                </li>
              </ul>
            </Section>

            <Section title="How to exercise your rights">
              <p>
                Email us at{' '}
                <a href={`mailto:${PRIVACY_CONTACT}`} className="text-sky-700 underline">
                  {PRIVACY_CONTACT}
                </a>{' '}
                and tell us which right you would like to exercise. We will respond within 45 days of
                receiving your request. If we need more time, we will tell you why and how much longer we
                need, up to an additional 45 days.
              </p>
              <p>
                If we deny your request, you may appeal by replying to our decision or emailing the same
                address. We will respond to your appeal in writing within 45 days, with an explanation of
                our reasons. If we deny your appeal, you may submit a complaint to the Washington State
                Attorney General at{' '}
                <a
                  href="https://www.atg.wa.gov/file-complaint"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-700 underline"
                >
                  atg.wa.gov/file-complaint
                </a>
                .
              </p>
            </Section>

            <Section title="Contact us">
              <p>
                Mindful Way Therapy, PLLC
                <br />
                4500 9th Ave NE, Suite 300
                <br />
                Seattle, WA 98105
                <br />
                Phone: <a href="tel:360-347-2559" className="text-sky-700 underline">360-347-2559</a>
                <br />
                Email:{' '}
                <a href={`mailto:${PRIVACY_CONTACT}`} className="text-sky-700 underline">
                  {PRIVACY_CONTACT}
                </a>
              </p>
            </Section>

            <Section title="Changes to this policy">
              <p>
                If we change this policy, we will post the updated version here with a new effective date.
              </p>
            </Section>
          </div>
        </div>
      </PoliciesLayout>
    </div>
  );
}

export default MyHealthMyData;
