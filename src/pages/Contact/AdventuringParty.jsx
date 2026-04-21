// src/pages/Contact/AdventuringParty.jsx
import { useEffect } from 'react';

export default function AdventuringParty() {
  useEffect(() => {
    window.scrollTo(0, 0);

    // Inject JotForm scripts after component mounts
    const script1 = document.createElement('script');
    script1.src = 'https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js';
    script1.async = true;

    script1.onload = () => {
      if (window.jotformEmbedHandler) {
        window.jotformEmbedHandler(
          "iframe[id='JotFormIFrame-261105910911043']",
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
      <h1 className="text-3xl font-bold text-sky-700 mb-6">The Adventuring Party Inquiry Form</h1>
{/* Redirect to Therapy CTA */}
<section className="bg-blue-50 py-8 border-b border-blue-200">
  <div className="max-w-4xl mx-auto text-center px-6">
    <p className="text-lg text-gray-800 mb-3">
      If you are seeking to join our Adventuring Party and explore new horizons together, please complete the form below.
    </p>
  </div>
</section>

      <div className="w-full">
        <iframe
          id="JotFormIFrame-261105910911043"
          title="The Adventuring Party Inquiry & Intake Form"
          src="https://form.jotform.com/261105910911043"
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
