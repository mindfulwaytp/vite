import { useEffect } from 'react';

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Page Title */}
      <h1 className="text-3xl  text-sky-700 mb-4">Contact Us</h1>

      {/* Intro Text */}
      <p className="mb-6 text-gray-700">
        Thank you for your interst in working with us. To get started, we recommend viewing our provider directory to see who has the most current availability. 
        From there, please fill out our intake form below so we can help match you to the therapist who would be the best fit for you. {' '}
      </p>
      <p className="mb-6 text-gray-700">
        If you have already completed this form, rest assured we have received your inquiry in our centralized intake sheet, and we will contact you as soon as a provider has availability that meets your needs. Please do not submit multiple forms.
      </p>

      {/* JotForm Embed */}
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
