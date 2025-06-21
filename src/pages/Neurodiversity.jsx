import React from 'react';
import balloons from '../assets/balloons.avif'; // adjust path if needed
import { Link } from 'react-router-dom';
import autism1 from '../assets/autism1.svg';
import autism2 from '../assets/autism2.svg';
import autism3 from '../assets/images/autism3.png'; // ✅ correct path

function Neurodiversity() {
  return (
    <div className="bg-[#f3f6f9] text-gray-800">
      
      {/* Hero Section */}
      <div
        className="w-full h-[450px] bg-cover bg-center mt-20 relative flex items-center justify-center"
        style={{ backgroundImage: `url(${balloons})` }}
      >
        <div className="bg-white/80 text-black px-6 py-8 rounded-xl shadow-md max-w-2xl text-center">
          <h1 className="text-3xl md:text-4xl  mb-4">
            Neurodivergent Affirming Care
          </h1>
          <p className="text-base md:text-lg leading-relaxed">
            At Mindful Way Therapy, we believe in celebrating neurodiversity—a perspective that views neurological differences, such as ADHD, Autism, dyslexia, and others, as natural variations of the human experience. Our mission is to provide support that honors these differences, empowering individuals to live authentically and with confidence.
          </p>
        </div>
    </div>

{/* Page Content */}
<div className="max-w-5xl mx-auto px-4 md:px-10 py-16 space-y-16 text-center text-gray-800">

  {/* Section: Our Approach */}
  <section className="space-y-4">
    <h2 className="text-3xl  text-sky-700">Why Neurodivergent Affirming Care?</h2>
    <p className="text-base md:text-lg leading-relaxed">
      In a world that often misunderstands or overlooks neurodivergent experiences, our providers believe in providing Neurodivergent Affirming Care. We provide a space where individuals are valued for who they are. This approach is essential for supporting neurodivergent people in a way that truly honors their unique perspectives and needs. Rather than trying to "fix" or change these traits, we focus on embracing them, helping clients leverage their strengths while navigating any challenges they may face.
    </p>
    <p className="text-base md:text-lg leading-relaxed">
        Neurodivergent Affirming Care respects and validates neurodivergent identities, recognizing that neurological differences are part of natural human diversity. Our goal is to provide compassionate, strengths-based support that empowers individuals to live authentically and thrive.
    </p>
  </section>

<section className="bg-white py-20 px-4 md:px-10">
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 items-start">

    {/* Row 1, Column 1 */}
    <div className="flex flex-col space-y-6">
      <div className="flex items-start gap-4">
        <img src={autism1} alt="Autism visual" />
        <h3 className="text-xl text-gray-900 leading-snug">
          Neurodivergent Affirming<br />Therapy
        </h3>
      </div>
      <p className="text-gray-700 leading-relaxed text-[17px]">
        Our commitment to Neurodivergent Affirming Therapy means creating a therapeutic environment
        where clients feel respected, valued, and empowered to embrace their authentic selves.
        We prioritize understanding and celebrating each person’s unique experiences,
        fostering self-acceptance and resilience.
      </p>
    </div>

    {/* Row 1, Column 2 */}
    <div className="flex flex-col space-y-6">
      <div className="flex items-start gap-4">
        <img src={autism2} alt="Autism visual" />
        <h3 className="text-xl text-gray-900 leading-snug">
          ADHD & Autism Evaluations
        </h3>
      </div>
      <p className="text-gray-700 leading-relaxed text-[17px]">
        Our Neurodivergent Affirming Assessments provide a comprehensive, respectful approach
        to understanding ADHD, Autism, and other neurodivergent traits. Through our evaluations,
        we offer insights that highlight strengths and identify areas where tailored support can enhance
        well-being and help individuals and families to gain clarity and practical tools that fit naturally into their lives.
      </p>
    </div>

    {/* Row 2, Column 1 */}
    <div className="flex flex-col space-y-2">
      <div className="flex items-start gap-2">
        <Link to="/neurodiversity/resources">
          <img src={autism3} alt="Resource Library icon" className="w-[135px] h-[137px] shrink-0" />
        </Link>
        <h3 className="text-xl text-gray-900 leading-snug">
          Neurodiversity Resources
        <div className="text-sm text-gray-600 mt-1 mt-8">
          <p>Click the image to be directed to our resource page</p>
        </div>
        </h3>

      </div>
      <p className="text-gray-700 leading-relaxed text-[17px]">
        Explore our curated library of books, articles, and tools created by and for neurodivergent individuals.
        Whether you’re looking to learn more about autism, ADHD, or affirming care practices,
        these resources offer guidance, validation, and connection for individuals, families, and professionals alike.
      </p>
    </div>

  </div>
</section>



</div>
    </div>
  );
}

export default Neurodiversity;