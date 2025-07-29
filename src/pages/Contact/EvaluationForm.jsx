// src/pages/Contact/EvaluationForm.jsx
import { useEffect } from 'react';

export default function EvaluationForm() {
  useEffect(() => {
    window.scrollTo(0, 0);

    // Inject JotForm scripts after component mounts
    const script1 = document.createElement('script');
    script1.src = 'https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js';
    script1.async = true;

    script1.onload = () => {
      if (window.jotformEmbedHandler) {
        window.jotformEmbedHandler(
          "iframe[id='JotFormIFrame-251917112445049']",
          'https://form.jotform.com/'
        );
      }
    };

    document.body.appendChild(script1);

    return () => {
      document.body.removeChild(script1);
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-sky-700 mb-6">Autism/ADHD Evaluation Intake Form</h1>
{/* Redirect to Therapy CTA */}
<section className="bg-blue-50 py-8 border-b border-blue-200">
  <div className="max-w-4xl mx-auto text-center px-6">
    <p className="text-lg text-gray-800 mb-3">
      If you are seeking <strong>only Therapy services</strong> and <strong>not</strong> an evaluation, please{' '}
      <a href="/contact/therapy" className="text-blue-700 font-semibold underline hover:text-blue-800 transition">
        click here to complete the Therapy Inquiry Form
      </a>.
    </p>
  </div>
</section>

      <div className="w-full">
        <iframe
          id="JotFormIFrame-251917112445049"
          title="Adult Autism and ADHD Evaluation Inquiry & Intake Form"
          src="https://form.jotform.com/251917112445049"
          allow="geolocation; microphone; camera; fullscreen; payment"
          allowTransparency="true"
          scrolling="yes"
          frameBorder="0"
          style={{
            minWidth: '100%',
            maxWidth: '100%',
            height: '400px',
            border: 'none',
          }}
        />
      </div>
    </div>
  );
}
