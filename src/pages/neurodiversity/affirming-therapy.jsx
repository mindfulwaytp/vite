import Modalities from '../../components/Modalities';

// pages/neurodiversity/affirming-therapy.jsx

const AffirmingTheraoy = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
        <section
          className="w-full h-[450px] bg-cover bg-center mt-20 relative flex items-center justify-center"
          style={{ backgroundImage: `url(/images/therapyheader.jpg)` }}
        >
          <div className="bg-white/80 text-black px-6 py-8 rounded-xl shadow-md max-w-2xl text-center">
            <h1 className="text-3xl md:text-4xl mb-4">Neurodivergent Affirming Therapy</h1>
            <p className="text-base md:text-lg leading-relaxed">
            Neurodivergent Affirming Therapy is a supportive approach that celebrates neurodiversity, respecting and valuing traits like ADHD, Autism, 
            and other variations as natural parts of identity. Rather than seeking to ‘fix’ or change these differences, this therapy empowers individuals to embrace their strengths, 
            build self-acceptance, and thrive authentically.
            </p>
          </div>
        </section>

      {/* Section 1: What is Neurodivergent Affirming Therapy? */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="max-w-full">
            <img
              src="/images/what_is_affirming.jpeg"
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
              src="/images/why_affirming.jpg"
              alt="Puzzle pieces with the word autism"
              className="rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Section 4: Traits and Strengths Overview */}
            <section className="bg-gray-100 py-16 px-4">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-8 text-gray-900">Therapy Modalities</h2>

                <div className="flex justify-center mb-8">
                  <img
                    src="/images/therapy_modalities.jpg"
                    alt="Therapy Modalities Brain Visual"
                    className="w-full max-w-3xl h-auto rounded-lg shadow-md"
                  />
                </div>
                <p className="max-w-4xl mx-auto text-lg text-gray-800 mb-12">
                  We use a variety of evidence-based and neurodivergent-affirming therapy modalities tailored to support the unique needs of our clients.
                  Our therapists integrate approaches such as somatic therapy, parts work, mindfulness-based interventions, and strengths-based and compassion-based therapy modalities.
                  These methods help individuals explore identity, manage stress, process trauma, and build meaningful connections—without pathologizing neurodivergent traits.
                  Whether you're navigating life with ADHD, autism, anxiety, or trauma, our integrative approach creates a validating, supportive environment to help you thrive.
                </p>
              </div>
              <div className="max-w-4xl mx-auto">
                <Modalities />
              </div>
            </section>
              <div className="max-w-6xl mx-auto py-8 px-4 text-center">
                <h2 className="text-xl font-bold text-gray-700 mb-6">Why We are Anti-ABA (Applied Behavioral Anaylsis)</h2>
                <p className="text-lg">At Mindful Way Therapy, we do not use Applied Behavior Analysis (ABA) because it is often based on modifying behaviors to fit neurotypical standards, which can feel restrictive 
                  and invalidating to neurodivergent individuals. ABA focuses primarily on changing outward behaviors rather than fostering self-acceptance, often aiming to eliminate natural expressions 
                  of neurodivergent traits. This can undermine an individual’s sense of self-worth and authenticity, prioritizing “acceptable” behaviors over true understanding and support.</p>
              </div>
            </div>
          );
      };
      
      export default AffirmingTheraoy;