import React from 'react';
import individual from '../assets/individual.avif';
import couples from '../assets/couples.avif'
import adhdeval from '../assets/adhdeval.avif';
import lgbtqtherapy from '../assets/lgbtqtherapy.jpg'
import header from '../assets/therapycouch.jpg'

function Services() {
  const services = [
    {
      title: 'Individual Therapy',
      description: `Our individual therapy services provide a supportive space where you can explore your identity, process life challenges, 
      and build emotional resilience. We specialize in supporting ADHD, Autism, anxiety, trauma, and LGBTQ+ experiences, with a focus on self-acceptance and authentic connection. 
      hether you're navigating stress, burnout, relationships, or life transitions, our therapists offer compassionate, strengths-based support tailored to your unique needs.`,
      image: individual,
    },
    {
      title: 'Couples & Family Therapy',
      description: `Our couples and family therapy services support deeper connection, improved communication, and authentic relationships—especially within neurodivergent, LGBTQ+, 
      and non-traditional relationships such as non-nomongamy and polyamory. We help partners and family members navigate conflict, rebuild trust, and understand each other’s unique needs. 
      Whether you're parenting a neurodivergent teen, managing life as a queer or polyamorous couple, or seeking more harmony at home, our affirming therapists guide you in creating meaningful change together.`,
      image: couples,
    },
    {
      title: 'ADHD & Autism Evaluations',
      description: `We offer comprehensive ADHD and autism evaluations for teens and adults using a neurodivergent-affirming approach. Our assessments focus on understanding 
      your brain’s natural wiring—not labeling deficits—so you can gain clarity, self-awareness, and personalized support. We specialize in late-identified Autism and ADHD, masking, 
      executive functioning challenges, and intersectional identities. Get the insights and language you need to advocate for yourself at school, work, and beyond.`,
      image: adhdeval,
    },
    {
      title: 'Queer Affirming Therapy',
      description: `Our queer-affirming therapy provides a safe, supportive space for LGBTQ+ individuals to explore identity, relationships, mental health, and self-worth without judgment. 
      Our providers how systemic oppression, gender dysphoria, coming out, or navigating queer and trans experiences can impact well-being. Whether you're questioning your identity, 
      seeking healing from past trauma, or wanting to feel more at home in yourself, our therapists offer compassionate, culturally aware support tailored to LGBTQ+ lives.`,
      image: lgbtqtherapy,
    },
  ];

  return (
    <div className="bg-[#f3f6f9] text-gray-800">
      {/* Hero Section */}
      <div
        className="w-full h-[450px] bg-cover bg-center mt-20 relative flex items-center justify-center"
        style={{ backgroundImage: `url(${header})` }}
      >
        <div className="bg-white/80 text-black px-6 py-8 rounded-xl shadow-md max-w-2xl text-center">
          <h1 className="text-3xl md:text-4xl mb-4">Our Services</h1>
          <p className="text-base md:text-lg leading-relaxed">
            At Mindful Way Therapy, we offer a wide range of specialized therapy services to support you on your journey toward improved mental health. Whether you're seeking individual therapy, couples counseling, or a neurodivergent-affirming evaluation, we're here to help.
          </p>
        </div>
      </div>

      {/* Service Cards */}
      <section className="bg-white py-20 px-4 md:px-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-x-20 gap-y-12">
          {services.map((s, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition p-4 flex flex-col items-center text-center max-w-90 mx-auto"
            >
              <div className="w-full aspect-[5/6] max-w-[300px] mx-auto overflow-hidden rounded-lg mb-4">
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full h-full object-cover rounded-lg shadow-sm"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{s.title}</h3>
              <p className="text-gray-700 text-base leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Services;
