import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import FaqAccordion from '../../components/FaqAccordion';
import SelfAssessment from '../../components/SelfAssessment';
import ServicesLayout from '../../components/ServicesLayout';
import ServiceHero from '../../components/ServiceHero';
import ServiceSection, { ServiceTextSection } from '../../components/ServiceSection';
import { ORGANIZATION_ID, SITE_URL, organizationJsonLd } from '../../data/organization';

const PAGE_URL = `${SITE_URL}/specialties/depression/`;
const DESCRIPTION =
  'Depression therapy in Seattle and by telehealth across Washington. For exhaustion, numbness, and loss of interest — including depression that turns out to be autistic burnout, ADHD, or minority stress.';

const signs = [
  'Exhaustion that sleep doesn’t fix',
  'Numbness or feeling flat',
  'Loss of interest in things you used to enjoy',
  'Irritability and a short fuse',
  'Sleeping much more or much less',
  'Appetite changes',
  'Trouble concentrating or deciding',
  'Harsh self-criticism',
  'Withdrawing from people',
  'Feeling like a burden',
  'Hopelessness about things changing',
  'Still doing everything, and hating all of it',
];


// PHQ-9. Free to reproduce without permission — developed by Drs. Robert L.
// Spitzer, Janet B.W. Williams and Kurt Kroenke under an educational grant from
// Pfizer Inc. Item 9 is the suicidal-ideation item; see SelfAssessment.
const phq9Items = [
  'Little interest or pleasure in doing things',
  'Feeling down, depressed, or hopeless',
  'Trouble falling or staying asleep, or sleeping too much',
  'Feeling tired or having little energy',
  'Poor appetite or overeating',
  'Feeling bad about yourself — or that you are a failure, or have let yourself or your family down',
  'Trouble concentrating on things, such as reading or watching television',
  'Moving or speaking so slowly that other people could have noticed — or the opposite, being so fidgety or restless that you have been moving around a lot more than usual',
  'Thoughts that you would be better off dead, or of hurting yourself in some way',
];

const phq9Bands = [
  {
    min: 0, max: 4, label: 'Minimal symptoms',
    meaning:
      'Your answers suggest few depression symptoms over the past two weeks. If something still feels off, that is worth paying attention to — this questionnaire measures a specific set of symptoms and does not capture everything.',
  },
  {
    min: 5, max: 9, label: 'Mild symptoms',
    meaning:
      'Your answers suggest mild symptoms. Many people at this level are managing, but managing takes energy. Therapy can help before things get harder, and you do not need to wait until they do.',
  },
  {
    min: 10, max: 14, label: 'Moderate symptoms',
    meaning:
      'Your answers suggest symptoms that are likely affecting daily life. This is the range where talking to a therapist tends to make a real difference.',
  },
  {
    min: 15, max: 19, label: 'Moderately severe symptoms',
    meaning:
      'Your answers suggest substantial symptoms. We would encourage you to reach out to a therapist or your doctor soon rather than waiting to see whether it lifts on its own.',
  },
  {
    min: 20, max: 27, label: 'Severe symptoms',
    meaning:
      'Your answers suggest severe symptoms. Please reach out to a professional — a therapist, your doctor, or a crisis line — soon. You do not have to carry this by yourself, and it can get better with support.',
  },
];

// Rendered on the page and emitted as FAQPage structured data — keep answers plain text.
const faqs = [
  {
    question: 'How do I know if what I’m feeling is depression?',
    body: (
      <>
        <p className="mb-3">
          You do not have to be sure before reaching out. Depression is more than a low mood — it tends
          to persist for weeks, affects sleep, energy, concentration, and interest, and does not lift
          when circumstances improve. A therapist can help you sort out what is going on, including
          whether something other than depression fits better.
        </p>
        <p>
          <a href="#self-check" className="text-sky-700 underline font-semibold">
            The PHQ-9 self-check on this page
          </a>{' '}
          is one way to see where you land. It is anonymous and nothing is recorded.
        </p>
      </>
    ),
    answer:
      'You do not have to be sure before reaching out. Depression is more than a low mood — it tends to persist for weeks, affects sleep, energy, concentration, and interest, and does not lift when circumstances improve. A therapist can help you sort out what is going on, including whether something other than depression fits better.',
  },
  {
    question: 'How long does therapy for depression take?',
    answer:
      'It varies, and anyone who gives you a fixed number is guessing. Some people notice a shift within a couple of months; for others the work is longer, particularly when depression has been present for years or sits alongside trauma, ADHD, or autism. You and your therapist will revisit what is helping rather than committing to a set course up front.',
  },
  {
    question: 'Do I need medication? Can you prescribe it?',
    answer:
      'We do not prescribe. Our therapists are master’s-level clinicians, not prescribers. Many people do well with therapy alone, and many others find that therapy and medication together work better than either by itself. If medication is worth exploring, we can talk it through and coordinate with your primary care provider or a psychiatric prescriber.',
  },
  {
    question: 'What if I can’t find the motivation to start?',
    answer:
      'That is a symptom, not a character flaw, and it is one of the reasons depression is so hard to climb out of alone. Our inquiry form is short. If filling it out is more than you can manage today, you can email us instead and we will take it from there.',
  },
  {
    question: 'Do you take insurance for depression therapy?',
    answer:
      'Yes. We are in network with Aetna, Premera Blue Cross, Regence BlueShield, Cigna, Molina Healthcare, and UnitedHealthcare Community Plan, including Washington Apple Health (Medicaid). Coverage varies by plan and by therapist. Sliding-scale and self-pay options are also available.',
  },
  {
    question: 'What if I’m having thoughts of suicide?',
    answer:
      'If you are in immediate danger, call 911. To talk to someone right now, call or text 988 to reach the Suicide and Crisis Lifeline, free, any time. Thoughts of suicide are more common in depression than most people realize, and they are something you can bring into therapy — our therapists will not panic or judge you for saying so out loud.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    organizationJsonLd,
    {
      '@type': 'Service',
      '@id': `${PAGE_URL}#service`,
      name: 'Depression Therapy',
      serviceType: 'Psychotherapy for depression',
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

function Depression() {
  return (
    <div className="bg-[#f3f6f9] text-gray-800">
      <SEO
        title="Depression Therapy in Seattle, WA"
        description={DESCRIPTION}
        canonical="/specialties/depression/"
        image="/images/depression-hero.jpg"
        jsonLd={jsonLd}
      />

      <ServiceHero
        image="/images/depression-hero.jpg"
        alt="Depression therapy"
        title="Depression Therapy"
        subtitle="Serving clients in Seattle, WA and via telehealth throughout Washington"
      />

      {/* Crisis resources sit above the fold rather than in an FAQ — someone
          arriving at this page may be in a much worse state than someone
          browsing rates. */}
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
            title="It Doesn’t Always Look Like Sadness"
            image="/images/depression-1.jpg"
            alt="A quiet moment alone"
            tinted
          >
            <p>
              A lot of people expect depression to feel like crying. Often it feels like nothing at all —
              flat, muffled, going through the motions. Or it feels like exhaustion that sleep doesn’t
              touch, or a short temper you don’t recognize in yourself, or the slow disappearance of things
              you used to care about.
            </p>
            <p>
              That gap is part of why depression goes unaddressed for so long. If you’re still getting to
              work, still answering messages, still doing what’s required, it’s easy to conclude you don’t
              have it bad enough to justify help. You don’t have to be at a breaking point to deserve
              support, and you don’t have to arrive with a diagnosis or the right words for it.{' '}
              <a href="#self-check" className="text-sky-700 underline font-semibold">
                Take a two-minute self-check
              </a>{' '}
              if you want a place to start.
            </p>
          </ServiceSection>

          <ServiceTextSection title="What It Can Look Like">
            <p>
              Depression shows up differently in different people. Some of what we commonly hear:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 list-disc pl-5 marker:text-sky-700">
              {signs.map((sign) => (
                <li key={sign}>{sign}</li>
              ))}
            </ul>
            <p>
              You don’t need to check every box. If several of these have been true for a few weeks, that’s
              worth talking about —{' '}
              <a href="#self-check" className="text-sky-700 underline font-semibold">
                the questionnaire below
              </a>{' '}
              can help you put words to it.
            </p>
          </ServiceTextSection>

          <ServiceSection
            title="When It Might Not Only Be Depression"
            image="/images/depression-2.jpg"
            alt="A person resting"
            reverse
          >
            <p>
              Depression is real, and it is also frequently the label that gets applied when something else
              is driving the exhaustion. That matters, because the approaches are different.
            </p>
            <ul className="list-disc pl-5 space-y-3 marker:text-sky-700">
              <li>
                <strong>Autistic burnout.</strong> Sustained masking is expensive. The resulting shutdown —
                exhaustion, loss of speech or skills, sensory intolerance — can look like depression while
                responding poorly to the usual depression playbook. Rest and reduced demands often matter
                more than behavioral activation.
              </li>
              <li>
                <strong>Unmanaged ADHD.</strong> Years of missed deadlines, lost objects, and being told you
                aren’t trying hard enough tend to produce genuine depressive symptoms. Treating the
                depression without addressing the executive-function load underneath tends to stall.
              </li>
              <li>
                <strong>Minority stress.</strong> The cumulative weight of navigating a world that is
                hostile to who you are is a well-documented contributor to depression in LGBTQ+ people. That
                isn’t a distortion to be corrected — it’s a reasonable response to real conditions, and it
                deserves to be treated as such.
              </li>
            </ul>
            <p>
              Our therapists work across all of this, so you won’t have to choose between a therapist who
              understands depression and one who understands the rest of your life.
            </p>
          </ServiceSection>

          <ServiceTextSection title="What Therapy for Depression Looks Like Here" tinted>
            <p>
              We won’t ask you to arrive with energy you don’t have. Early sessions are mostly about
              understanding what’s happening and what has and hasn’t helped before — not homework.
            </p>
            <p>
              From there, your therapist will draw on approaches suited to what you’re dealing with. That may
              include behavioral activation, which works in small, achievable steps rather than large ones;
              cognitive behavioral therapy (CBT) for patterns of thinking that keep the cycle going;
              compassion-focused work when self-criticism is doing much of the damage; parts work such as
              Internal Family Systems (IFS); and somatic approaches when depression is sitting in your body
              as much as your thoughts.
            </p>
            <p>
              If your depression is tangled up with autism, ADHD, trauma, or identity, your therapist will
              work with that rather than treating it as a separate matter for somewhere else.
            </p>
          </ServiceTextSection>

          <ServiceSection
            title="Getting Started"
            image="/images/depression-3.jpg"
            alt="A therapist and client in conversation"
            reverse
            tinted
            footer={
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/providers?specialties=Depression"
                  className="flex-1 text-center border-2 border-sky-700 text-sky-700 font-semibold py-2 px-5 rounded-lg hover:bg-sky-50 transition"
                >
                  Meet Our Therapists
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
              Getting started begins with our Therapy Inquiry &amp; Intake Form. It’s short. If that’s more
              than you can manage today, email us at{' '}
              <a href="mailto:support@mindfulway-therapy.com" className="text-sky-700 underline">
                support@mindfulway-therapy.com
              </a>{' '}
              and we’ll take it from there.
            </p>
            <p>
              Sessions are available by telehealth anywhere in Washington, and many of our therapists also
              see clients in person at our office in Seattle’s University District.
            </p>
            <p>
              We’re in network with several insurance plans, including Washington Apple Health (Medicaid),
              and offer sliding-scale and self-pay options.{' '}
              <Link to="/rates-fees" className="text-sky-700 underline font-semibold">
                See rates and accepted plans
              </Link>
              .
            </p>
          </ServiceSection>

          <ServiceTextSection id="self-check" title="Check In With Yourself">
            <SelfAssessment
              name="phq9"
              prompt="Over the last two weeks, how often have you been bothered by any of the following?"
              items={phq9Items}
              bands={phq9Bands}
              criticalItemIndex={8}
              criticalNote="You indicated thoughts of being better off dead or of hurting yourself. That is worth taking seriously, and you deserve support with it right now."
              attribution="PHQ-9 developed by Drs. Robert L. Spitzer, Janet B.W. Williams, and Kurt Kroenke, with an educational grant from Pfizer Inc. No permission required to reproduce or distribute."
            />
          </ServiceTextSection>

          <ServiceTextSection title="Frequently Asked Questions">
            <FaqAccordion items={faqs} />
          </ServiceTextSection>
        </div>
      </ServicesLayout>

      {/* CTA */}
      <section className="bg-sky-700 text-white py-16 px-4 md:px-10 text-center">
        <h2 className="text-3xl font-bold mb-4">You Don’t Have to Sort This Out Alone</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Tell us what’s going on and we’ll help you find the right therapist.
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

export default Depression;
