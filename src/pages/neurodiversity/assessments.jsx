import Accordion from '../../components/Accordion';
import { Helmet } from 'react-helmet';

// pages/neurodiversity/assessments.jsx

const AssessmentsPage = () => {
  return (
    <>
      <Helmet>
        <title>ADHD & Autism Evaluations | Mindful Way Therapy</title>
        <meta
          name="description"
          content="Affirming ADHD and autism assessments for adults and teens. Discover your Brain Style with our neurodiversity-affirming team in Seattle."
        />
        <link
          rel="canonical"
          href="https://www.mindfulway-therapy.com/neurodiversity/assessments"
        />
        <meta property="og:title" content="ADHD & Autism Evaluations | Mindful Way Therapy" />
        <meta
          property="og:description"
          content="Discover your unique Brain Style with affirming ADHD and autism assessments for teens and adults."
        />
        <meta
          property="og:url"
          content="https://www.mindfulway-therapy.com/neurodiversity/assessments"
        />
        <meta property="og:image" content="https://www.mindfulway-therapy.com/images/assessmentheader.avif" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

    <div className="bg-white text-gray-800">
      {/* Hero Section */}
        <section
          className="w-full h-[450px] bg-cover bg-center mt-20 relative flex items-center justify-center"
          style={{ backgroundImage: `url(/images/assessmentheader.avif)` }}
        >
          <div className="bg-white/80 text-black px-6 py-8 rounded-xl shadow-md max-w-2xl text-center">
            <h1 className="text-3xl md:text-4xl mb-4">Autism & ADHD Evaluations</h1>
            <p className="italic text-lg text-gray-700 mb-4">
              Gain a better understanding of your unique <span className="underline">Brain Style</span>
            </p>
            <p className="text-base md:text-lg leading-relaxed">
              At Mindful Way Therapy, we recognize the unique ways ADHD and Autism shape daily experiences,
              from managing focus and productivity to navigating social and emotional dynamics. You don’t
              have to navigate these experiences alone or wonder why certain things feel so difficult.
            </p>
          </div>
        </section>

      {/* Section 1: Why Should I (or my child) Get Assesed? */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="max-w-full">
            <img
              src="/images/colorful_child.avif"
              alt="Child with colorful background"
              className="w-full rounded-xl shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-sky-700">
              Why should I (or my child) Get Assessed?
            </h2>
            <p className="text-lg mb-4">
              Understanding whether ADHD or Autism is part of your or your child’s experience can be life-changing. A Brain Style Profile offers valuable insights into how the brain functions, 
              illuminating both strengths and challenges that may have gone unrecognized. For children, an early profile can pave the way for tailored support in school and social settings, 
              helping them thrive and build confidence. For adults, a Brain Style Profile provides a framework to better understand past struggles, improve relationships, and make informed choices 
              about work, daily routines, and personal goals.
            </p>
            <p className="text-lg mb-4">
              A Brain Style Profile assessment at Mindful Way Therapy goes beyond just answering questions—it’s a step toward embracing your or your child’s unique neurodivergent identity. 
              By understanding how ADHD  or Autism affects thinking, emotions, and interactions, you can access the right tools, strategies, and resources to foster growth and well-being.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: What is a Brain Style Profile */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-sky-700">
              What is a Brain Style Profile?
            </h2>
            <p className="text-lg mb-4">
              Unlike traditional evaluations, our Brain Style Profile (a term coined from the MIGDAS-2 Assessment)
              highlights personal strengths and differences; supports self-discovery; and offers practical guidance
              to help neurodivergent individuals thrive.
            </p>
            <p className="text-lg mb-4">
              Through a blend of standardized tools and personalized consultations, we dive into how your brain
              works, identifying patterns that reveal areas of both comfort and difficulty. This profile is more
              than just a diagnosis—it’s a personalized roadmap that helps illuminate the underlying factors
              influencing focus, organization, social interaction, and emotional regulation.
            </p>
            <p className="text-lg">
              Start your journey with us and gain the clarity, confidence, and support you need to thrive.
            </p>
          </div>
                    <div>
            <img
              src="/images/autism_adult.jpeg"
              alt="Puzzle pieces with the word autism"
              className="rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Section 3: Why a "neuro-divergent" affirming assessment? */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="/images/autism_affirming.jpeg"
              alt="Child with colorful background"
              className="rounded-xl shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-sky-700">
              Why a neurodivergent affimring assessment?
            </h2>
            <p className="text-lg mb-4">
              A Neurodivergent Affirming Assessment views traits like ADHD and Autism as natural parts of identity, 
              focusing on strengths rather than deficits. This approach provides insight into unique qualities and support 
              needs without clinical or pathologizing language, empowering individuals and families with a more holistic 
              understanding.
            </p>
            <h2 className="text-xl font-bold mb-4">How is this different from a typical assessment?</h2>
            <ul className="text-lg mb-6 list-disc list-inside">
              <li>Strength-Based Focus: We highlight unique strengths, reframing traits as valuable differences rather than challenges.</li>
              <li>Respectful Language: Our assessments avoid pathologizing terms, respecting neurodivergent traits as natural variations.</li>
              <li>Person-Centered: We see the whole person, not just symptoms, fostering self-confidence and acceptance.</li>
              <li>Empowering Recommendations: Strategies are tailored to help clients thrive as they are, supporting genuine self-expression rather than conformity.</li>
            </ul>
            <p className="text-lg">
              A Brain Style Profile assessment at Mindful Way Therapy goes beyond just answering questions—
              it’s a step toward embracing your or your child’s unique neurodivergent identity. By
              understanding how ADHD or Autism affects thinking, emotions, and interactions, you can access
              the right tools, strategies, and resources to foster growth and well-being.
            </p>
          </div>
        </div>
      </section>
      
      {/* Section 4: Traits and Strengths Overview */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Assessment Process</h2>
          <p className="text-lg text-gray-700">
            Autism and ADHD each bring distinct traits, patterns, and ways of engaging with the world.
            Our Brain Style Profiles highlight both strengths and differences to help individuals and families
            better understand and support neurodivergent identities.
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <Accordion />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-sky-100 py-12">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h3 className="text-2xl font-bold text-sky-800 mb-4">Ready to Begin Your Evaluation?</h3>
          <p className="text-lg mb-6">
            Whether you’re seeking clarity for yourself or your child, we’re here to help.
            Reach out today to schedule a consultation and take the next step toward understanding your brain style.
          </p>
          <a
            href="/contact/evaluation"
            className="inline-block bg-sky-700 text-white px-6 py-3 rounded-lg text-lg hover:bg-sky-800 transition"
          >
            Schedule an Evaluation
          </a>
        </div>
      </section>
    </div>
  </>
  );
}
export default AssessmentsPage