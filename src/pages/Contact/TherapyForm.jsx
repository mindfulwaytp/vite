// src/pages/Contact/TherapyForm.jsx
import { useEffect } from 'react';

export default function TherapyForm() {
  useEffect(() => {
    window.scrollTo(0, 0);

    const script = document.createElement('script');
    script.src = 'https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js';
    script.async = true;

    script.onload = () => {
      if (window.jotformEmbedHandler) {
        window.jotformEmbedHandler(
          "iframe[id='JotFormIFrame-250715900822048']",
          'https://form.jotform.com/'
        );
      }
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-sky-700 mb-6">Therapy Inquiry & Intake Form</h1>
      <p className="text-lg mb-4 text-gray-700">
{/* Redirect to Evaluation CTA */}
<section className="bg-blue-50 py-8 border-b border-blue-200">
  <div className="max-w-4xl mx-auto text-center px-6">
    <p className="text-lg text-gray-800 mb-3">
      If you are <strong>ONLY</strong> seeking an evaluation (for Autism or ADHD) and are <strong>not</strong> looking for therapy, please{' '}
      <a href="/contact/evaluation" className="text-blue-700 font-semibold underline hover:text-blue-800 transition">
        click here to complete the Evaluation Form
      </a>.
    </p>
    <p className="text-lg text-gray-800">
      If you are seeking <strong>both therapy and an evaluation</strong>, please complete this Therapy Inquiry Form first. You will be redirected to the evaluation form after submission.
    </p>
  </div>
</section>
        </p>

      <div className="w-full">
        <iframe
          id="JotFormIFrame-250715900822048"
          title="Mindful Way Therapy"
          src="https://form.jotform.com/250715900822048"
          allow="geolocation; microphone; camera; fullscreen; payment"
          allowTransparency="true"
          frameBorder="0"
          scrolling="yes"
          className="w-full rounded-lg shadow-md"
          style={{ minWidth: '100%', maxWidth: '100%', height: '1200px', border: 'none' }}
        ></iframe>
      </div>
    </div>
  );
}
