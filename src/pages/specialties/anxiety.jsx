import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import FaqAccordion from '../../components/FaqAccordion';
import SelfAssessment from '../../components/SelfAssessment';
import ServicesLayout from '../../components/ServicesLayout';
import ServiceHero from '../../components/ServiceHero';
import ServiceSection, { ServiceTextSection } from '../../components/ServiceSection';
import { ORGANIZATION_ID, SITE_URL, organizationJsonLd } from '../../data/organization';

const PAGE_URL = `${SITE_URL}/specialties/anxiety/`;
const DESCRIPTION =
  'Anxiety therapy in Seattle and by telehealth across Washington — for worry that won’t quiet, panic, and a body stuck on high alert.';

// Grouped rather than one long list — anxiety is as much physical and
// behavioral as it is mental, and people often only recognize one of the three.
const signGroups = [
  {
    heading: 'In your head',
    items: [
      'Worry that jumps from one thing to the next',
      'Replaying conversations long after they end',
      'Running through worst cases “just in case”',
      'Trouble quieting your mind at night',
    ],
  },
  {
    heading: 'In your body',
    items: [
      'Tight chest or shallow breathing',
      'Stomach trouble with no clear cause',
      'Jaw, shoulders, or hands that are always tense',
      'Sudden waves of panic',
    ],
  },
  {
    heading: 'In what you do',
    items: [
      'Putting off calls, emails, or appointments',
      'Over-preparing, over-checking, over-planning',
      'Asking for reassurance that never quite lands',
      'Skipping things you want to do, to avoid the dread',
    ],
  },
];

// GAD-7. Free to reproduce without permission — developed by Drs. Robert L.
// Spitzer, Kurt Kroenke, Janet B.W. Williams and Bernd Löwe under an
// educational grant from Pfizer Inc. It has no suicide item, so no critical
// flag; the crisis banner at the top of the page still applies.
const gad7Items = [
  'Feeling nervous, anxious, or on edge',
  'Not being able to stop or control worrying',
  'Worrying too much about different things',
  'Trouble relaxing',
  'Being so restless that it is hard to sit still',
  'Becoming easily annoyed or irritable',
  'Feeling afraid, as if something awful might happen',
];

const gad7Bands = [
  {
    min: 0, max: 4, label: 'Minimal symptoms',
    meaning:
      'Your answers point to little anxiety over the past two weeks. The GAD-7 is built around ongoing worry, so it can miss things like panic that comes in bursts, social anxiety, or anxiety tied to one situation. If one of those sounds familiar, it is still worth raising.',
  },
  {
    min: 5, max: 9, label: 'Mild symptoms',
    meaning:
      'Your answers point to some anxiety, the kind people often live with for years because it never quite seems serious enough. It does not have to get worse before it is worth working on, and this is often where change comes most easily.',
  },
  {
    min: 10, max: 14, label: 'Moderate symptoms',
    meaning:
      'Your answers point to anxiety that is probably shaping your days — what you put off, how you sleep, how much energy goes into staying on top of things. Clinicians commonly treat 10 as the point where a closer look is worthwhile.',
  },
  {
    min: 15, max: 21, label: 'Severe symptoms',
    meaning:
      'Your answers point to anxiety that is running close to constantly. Living like that wears a person down, and it is not a sign that anything is wrong with you. Please contact a therapist or your doctor in the next little while rather than waiting it out. Anxiety at this level usually improves a lot with the right support.',
  },
];

// Rendered on the page and emitted as FAQPage structured data — keep answers plain text.
const faqs = [
  {
    question: 'Is this anxiety, or just stress?',
    body: (
      <>
        <p className="mb-3">
          Stress usually has a clear source and eases when that source does. Anxiety tends to outlast
          the situation, attach itself to new things once the old ones resolve, or show up with no
          obvious cause at all. If worry is shaping what you do — what you avoid, how much you prepare,
          how you sleep — it is worth talking about, whatever you call it.
        </p>
        <p>
          If you want something more concrete,{' '}
          <a href="#self-check" className="text-sky-700 underline font-semibold">
            the seven-question GAD-7 below
          </a>{' '}
          takes about a minute, and your answers never leave your device.
        </p>
      </>
    ),
    answer:
      'Stress usually has a clear source and eases when that source does. Anxiety tends to outlast the situation, attach itself to new things once the old ones resolve, or show up with no obvious cause at all. If worry is shaping what you do — what you avoid, how much you prepare, how you sleep — it is worth talking about, whatever you call it.',
  },
  {
    question: 'What should I do during a panic attack?',
    answer:
      'Panic attacks feel dangerous but are not, and they pass — most peak within about ten minutes. Slowing your exhale, naming what you can see and hear, and reminding yourself that this is panic can help it crest sooner. If you have chest pain or trouble breathing and are not sure it is panic, treat it as a medical emergency and call 911; it is better to be checked than to guess. If panic attacks keep happening, therapy is very effective for them.',
  },
  {
    question: 'I’m autistic or have ADHD. Is this anxiety, or something else?',
    answer:
      'Often both, and it is worth untangling. Sensory overload, masking, and difficulty with uncertainty can look like anxiety from the outside, and so can the constant vigilance of trying not to forget something. Sometimes the most useful change is to the environment or the demands rather than to your thoughts. Our therapists are neurodivergent-affirming and will help you sort out which is which.',
  },
  {
    question: 'Should I be on medication for anxiety?',
    answer:
      'That is a conversation for you and a prescriber, and we can help you prepare for it. Our therapists are master’s-level clinicians and don’t prescribe. Many people manage anxiety well through therapy alone, and others find medication takes the edge off enough to make therapy easier to use. If you are already taking something, or thinking about it, we are glad to coordinate with your doctor or psychiatric provider.',
  },
  {
    question: 'Do I have to call to get started?',
    answer:
      'No. Everything can happen in writing. Fill out the inquiry form whenever you are ready, or email us, and tell us if you would rather we not call. Plenty of people put off starting therapy because of the phone call. It does not need to be a hurdle here.',
  },
  {
    question: 'Will my insurance cover anxiety therapy?',
    answer:
      'Most plans cover it. We are in network with Aetna, Premera Blue Cross, Regence BlueShield, Cigna, Molina Healthcare, and UnitedHealthcare Community Plan, including Washington Apple Health (Medicaid), though which plans a given therapist takes varies. If you are paying out of pocket, we offer sliding-scale rates.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    organizationJsonLd,
    {
      '@type': 'Service',
      '@id': `${PAGE_URL}#service`,
      name: 'Anxiety Therapy',
      serviceType: 'Psychotherapy for anxiety',
      description: DESCRIPTION,
      url: PAGE_URL,
      provider: { '@id': ORGANIZATION_ID },
      areaServed: organizationJsonLd.areaServed,
    },
    {
      '@type': 'FAQPage',
      '@id': `${PAGE_URL}#faq`,
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
  ],
};

function Anxiety() {
  return (
    <div className="bg-[#f3f6f9] text-gray-800">
      <SEO
        title="Anxiety Therapy in Seattle, WA"
        description={DESCRIPTION}
        canonical="/specialties/anxiety/"
        image="/images/anxiety-hero.jpg"
        jsonLd={jsonLd}
      />

      <ServiceHero
        image="/images/anxiety-hero.jpg"
        alt="Anxiety therapy"
        title="Anxiety Therapy"
        subtitle="Serving clients in Seattle, WA and via telehealth throughout Washington"
      />

      {/* Kept from the depression page: anxiety and depression overlap heavily,
          and someone arriving here may be in more distress than the GAD-7 asks about. */}
      <div className="bg-amber-50 border-y border-amber-200 px-4 py-4">
        <p className="max-w-3xl mx-auto text-center text-gray-800">
          <strong>If you need someone right now,</strong> call or text{' '}
          <a href="tel:988" className="text-sky-800 underline font-semibold">988</a> to reach the Suicide
          &amp; Crisis Lifeline, free, any time. If you are in immediate danger, call{' '}
          <a href="tel:911" className="text-sky-800 underline font-semibold">911</a>.
        </p>
      </div>

      <ServicesLayout>
        <div className="space-y-8">
          <ServiceSection
            title="When Anxiety Looks Like Having It Together"
            image="/images/anxiety-1.jpg"
            alt="A person pausing in a quiet moment"
            tinted
          >
            <p>
              A lot of anxious people look, from the outside, like the most dependable person in the room.
              They’re early. They’ve thought of everything. They answered the email before anyone else did.
              What nobody sees is the running commentary underneath: the rehearsing, the double-checking,
              the low hum of bracing for whatever goes wrong next.
            </p>
            <p>
              Anxiety is an alarm system. Its job is to spot danger and get you moving, and it is very good
              at that job. Trouble starts when it stays switched on, sounding for unanswered texts and
              unfamiliar plans as if they were emergencies. Needing that alarm to keep things together
              doesn’t mean it has to run your life.{' '}
              <a href="#self-check" className="text-sky-700 underline font-semibold">
                Seven quick questions
              </a>{' '}
              can give you a sense of how loud yours has been lately.
            </p>
          </ServiceSection>

          <ServiceTextSection title="How Anxiety Shows Up">
            <p>
              People usually notice one side of their anxiety and miss the others. It tends to show up in
              three places:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {signGroups.map((group) => (
                <div key={group.heading} className="bg-sky-50 rounded-xl p-4">
                  <h3 className="font-semibold text-sky-800 mb-2">{group.heading}</h3>
                  <ul className="list-disc pl-5 space-y-1 text-base marker:text-sky-700">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p>
              If you’re mostly seeing yourself in the body column, that’s common. Plenty of people spend
              years seeing doctors about stomach trouble or tension before anyone mentions anxiety.
            </p>
          </ServiceTextSection>

          <ServiceSection
            title="Sometimes the Alarm Is Right"
            image="/images/anxiety-2.jpg"
            alt="A person taking a breath outdoors"
            reverse
          >
            <p>
              Much of standard anxiety treatment assumes the fear is out of proportion to the situation.
              Sometimes it is. But for a lot of the people we work with, the nervous system is reacting to
              something real, and treating that as a thinking error misses the point.
            </p>
            <ul className="list-disc pl-5 space-y-3 marker:text-sky-700">
              <li>
                <strong>For autistic people,</strong> loud rooms, surprise changes, and hours of masking
                really are costly. When the environment is the problem, fixing the environment can help more
                than talking yourself out of the reaction.
              </li>
              <li>
                <strong>With ADHD,</strong> worry often starts as a workaround. If forgetting things has cost
                you before, constant checking is a reasonable strategy, just an exhausting one. Better
                systems for the executive-function side often quiet the worry that grew up to cover for it.
              </li>
              <li>
                <strong>After trauma, or as an LGBTQ+ person,</strong> staying on guard may be something you
                learned because you needed it. The work is not to call that paranoia. It is helping your
                body recognize the places and people where it can finally put the guard down.
              </li>
            </ul>
            <p>
              Sorting out which alarms are accurate and which are miscalibrated is a large part of the work
              here, and it goes better with a therapist who already understands your context.
            </p>
          </ServiceSection>

          <ServiceTextSection title="How We Work With Anxiety" tinted>
            <p>
              The goal isn’t to get rid of anxiety. You need that alarm. The goal is for it to go off at the
              right times, and to settle once it has.
            </p>
            <p>
              Therapy usually has two sides: understanding what sets your anxiety off, and practicing
              different responses to it. Depending on what fits, your therapist may use cognitive behavioral
              therapy (CBT) to catch the what-ifs before they snowball, and exposure work that moves step by
              step and at a pace you agree to. Acceptance and commitment therapy (ACT) can help you act on
              what matters even while worry is present. Internal Family Systems (IFS) looks at the parts of
              you that feel responsible for keeping everyone safe, and body-based approaches help you
              recognize and calm the physical side of fear.
            </p>
            <p>
              For neurodivergent clients, we adapt rather than apply the standard playbook. Pushing through
              sensory distress isn’t the same thing as facing a fear, and your therapist will know the
              difference.
            </p>
          </ServiceTextSection>

          <ServiceSection
            title="Reaching Out, at Your Own Pace"
            image="/images/anxiety-3.jpg"
            alt="A therapist and client in conversation"
            reverse
            tinted
            footer={
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/providers?specialties=Anxiety"
                  className="flex-1 text-center border-2 border-sky-700 text-sky-700 font-semibold py-2 px-5 rounded-lg hover:bg-sky-50 transition"
                >
                  Browse Therapists Who Treat Anxiety
                </Link>
                <Link
                  to="/contact/therapy"
                  className="flex-1 text-center bg-sky-700 border-2 border-sky-700 text-white font-semibold py-2 px-5 rounded-lg shadow hover:bg-sky-800 hover:border-sky-800 transition"
                >
                  Complete Our Inquiry Form
                </Link>
              </div>
            }
          >
            <p>
              If making the first phone call is exactly the kind of thing you’ve been putting off, you don’t
              need to make one. Our Therapy Inquiry &amp; Intake Form can be filled out whenever you’re
              ready, or you can write to{' '}
              <a href="mailto:support@mindfulway-therapy.com" className="text-sky-700 underline">
                support@mindfulway-therapy.com
              </a>
              . If you’d rather keep things in writing, just say so.
            </p>
            <p>
              You can meet by telehealth from anywhere in Washington, or in person at our office in
              Seattle’s University District. For some people, being in their own space makes it much easier
              to relax into a session.
            </p>
            <p>
              We’re in network with most major Washington plans and Apple Health (Medicaid), and have
              sliding-scale rates for people paying out of pocket.{' '}
              <Link to="/rates-fees" className="text-sky-700 underline font-semibold">
                Rates and accepted plans
              </Link>
              .
            </p>
          </ServiceSection>

          <ServiceTextSection id="self-check" title="A Quick Anxiety Self-Check">
            <SelfAssessment
              name="gad7"
              prompt="Over the last two weeks, how often have you been bothered by the following problems?"
              items={gad7Items}
              bands={gad7Bands}
              condition="an anxiety disorder"
              medicalNote="Anxiety has a strong physical side, and a few medical issues can cause or amplify it — an overactive thyroid, heart rhythm problems, blood sugar swings, heavy caffeine use, and some medications among them. If your symptoms are mostly physical, a primary care visit can rule those out."
              attribution="GAD-7 developed by Drs. Robert L. Spitzer, Kurt Kroenke, Janet B.W. Williams, and Bernd Löwe, with an educational grant from Pfizer Inc. No permission required to reproduce or distribute."
            />
          </ServiceTextSection>

          <ServiceTextSection title="Frequently Asked Questions">
            <FaqAccordion items={faqs} />
          </ServiceTextSection>
        </div>
      </ServicesLayout>

      {/* CTA */}
      <section className="bg-sky-700 text-white py-16 px-4 md:px-10 text-center">
        <h2 className="text-3xl font-bold mb-4">You Can Start Small</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          One form or one email is enough. No phone call needed, and no need to have the right words
          yet.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link
            to="/contact/therapy"
            className="bg-white text-sky-700 font-semibold py-2 px-6 rounded shadow hover:bg-gray-100 transition"
          >
            Complete Our Inquiry Form
          </Link>
          <a
            href="mailto:support@mindfulway-therapy.com"
            className="bg-white text-sky-700 font-semibold py-2 px-6 rounded shadow hover:bg-gray-100 transition"
          >
            Email Us
          </a>
        </div>
      </section>
    </div>
  );
}

export default Anxiety;
