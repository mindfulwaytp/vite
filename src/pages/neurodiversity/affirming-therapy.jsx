import Modalities from '../../components/Modalities';

// pages/neurodiversity/affirming-therapy.jsx

const AffirmingTheraoy = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Neurodivergent Affirming Therapy</h1>
        <p className="text-lg text-gray-700 mb-10">
          Neurodivergent Affirming Therapy is a supportive approach that celebrates neurodiversity, respecting and valuing traits like ADHD, Autism, 
          and other variations as natural parts of identity. Rather than seeking to ‘fix’ or change these differences, this therapy empowers individuals 
          to embrace their strengths, build self-acceptance, and thrive authentically..
        </p>
        <img
          src="/images/autism_acceptance_splash.png"
          alt="Autism Acceptance Banner"
          className="mx-auto mb-10 rounded-lg shadow-md"
        />
      </section>

      {/* Section 1: What is Neurodivergent Affirming Therapy? */}
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
              What is Neurodivergent Affirming Therapy?
            </h2>
            <p className="text-lg mb-4">
              Neurodivergent affirming therapy recognizes and respects the unique ways that neurodivergent people think, feel, process, and experience the world. 
              Rather than viewing neurodivergence—such as ADHD, autism, or sensory differences—as something to be fixed or normalized, this approach embraces it as a 
              natural variation of human diversity.
            </p>
            <p className="text-lg mb-4">
              A Brain Style Profile assessment at Mindful Way Therapy goes beyond just answering questions—it’s a step toward embracing your or your child’s unique neurodivergent identity. 
              By understanding how ADHD  or Autism affects thinking, emotions, and interactions, you can access the right tools, strategies, and resources to foster growth and well-being.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Why Choose Neurodivergent Affirming Therapy? */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-sky-700">
              Why Choose Neurodivergent Affirming Therapy?
            </h2>
            <p className="text-lg mb-4">
              Many neurodivergent individuals have spent years feeling misunderstood, pathologized, or pressured to mask who they are in order to fit in. Traditional therapy 
              models often focus on fixing perceived “deficits” rather than supporting authentic ways of thinking, communicating, and existing.
            </p>
            <p className="text-lg mb-4">
              Neurodivergent affirming therapy is different.
            </p>
            <p className="text-lg">
              It creates a space where you don’t have to explain or justify your differences. Your sensory needs, communication style, executive functioning, and social rhythms are 
              understood and respected. Rather than trying to make you more “typical,” we focus on helping you explore your identity, reduce shame, and build strategies that truly work for your life.
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
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Therapy Modalities</h2>
                <p className="text-lg text-gray-700">
                We use a variety of evidence-based and neurodivergent-affirming therapy modalities tailored to support the unique needs of our clients. 
                Our therapists integrate approaches such as somatic therapy, parts work, mindfulness-based interventions, and strengths-based and compassion-based 
                therapy modalities. These methods help individuals explore identity, manage stress, process trauma, and build meaningful connections—without pathologizing neurodivergent traits. 
                Whether you're navigating life with ADHD, autism, anxiety, or trauma, our integrative approach creates a validating, supportive environment to help you thrive.
                </p>
              </div>
              <div className="max-w-4xl mx-auto">
                <Modalities />
              </div>
            </section>
            </div>
          );
      };
      
      export default AffirmingTheraoy;