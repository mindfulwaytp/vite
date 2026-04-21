import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const contactOptions = [
    {
      id: 'therapy',
      title: 'Therapy Only',
      image: '/images/James1.JPG',
      description: 'Complete this form if you are seeking individual, couples, or family therapy.',
      to: '/contact/therapy',
    },
    {
      id: 'evaluation',
      title: 'Autism/ADHD Eval Only',
      image: '/images/Evaluation.png',
      description: 'Use this form if you are seeking an evaluation only and are not currently seeking therapy.',
      to: '/contact/evaluation',
    },
    {
      id: 'adventuring-party',
      title: 'The Adventuring Party',
      image: '/images/dnd.jpg',
      description: 'Join our community of adventurers and explore new horizons together.',
      to: '/contact/adventuring-party',
    },
  ];

  return (
    <div className="px-4 py-12 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl text-sky-700 mb-6">Inquiry Forms</h1>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-5xl mx-auto">
          We offer two types of services: therapy and assessments. Please choose the option that best fits your needs.
        </p>
        <p className="italic text-lg md:text-xl text-gray-700 leading-relaxed max-w-5xl mx-auto mt-4">
          If you are seeking <strong>both therapy and an assessment</strong>, please complete the Therapy intake form first.
          You will be redirected to the evaluation form after submission.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {contactOptions.map((option) => (
          <Link
            key={option.id}
            to={option.to}
            className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition flex flex-col h-full"
          >
            <img
              src={option.image}
              alt={option.title}
              className="w-full h-72 md:h-80 object-cover rounded-t-xl"
            />
            <div className="p-6 flex-grow">
              <h3 className="text-xl text-gray-800 mb-2">{option.title}</h3>
              <p className="text-gray-700 text-lg">{option.description}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="border-t border-gray-200 pt-12">
        <h2 className="text-2xl md:text-3xl text-sky-700 mb-3 text-center">Rates & Fees</h2>
        <p className="text-center text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
          Learn about our session rates, insurance plans we accept, and sliding scale options.
        </p>
        <div className="flex justify-center">
          <Link
            to="/contact/ratesfees"
            className="bg-sky-700 text-white font-semibold py-3 px-8 rounded-lg shadow hover:bg-sky-800 transition"
          >
            View Rates & Fees
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Contact; // ✅ THE FIX!