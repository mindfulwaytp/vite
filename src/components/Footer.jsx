import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        {/* Contact Info */}
        <div className="text-md">
          <h3 className="font-bold mb-3">Contact Us</h3>
          <p>4500 9th Ave NE</p>
          <p>Suite 300</p>
          <p>Seattle, WA 98105</p>
          <p className="mt-3">
            Call:{" "}
            <a href="tel:360-347-2559" className="text-blue-600 underline">
              360-347-2559 x 1
            </a>
          </p>
          <p>
            Text:{" "}
            <a href="sms:360-347-2559" className="text-blue-600 underline">
              360-347-2559
            </a>
          </p>
          <p>Fax: 800-240-1139</p>
          <p>
            Email:{" "}
            <a
              href="mailto:support@mindfulway-therapy.com"
              className="text-blue-600 underline"
            >
              support@mindfulway-therapy.com
            </a>
          </p>
        </div>

        {/* LGBTQ+ Owned Badge */}
        <div className="flex justify-center items-center">
          <img
            src="/images/lgbt_owned.png" // Update filename as needed
            alt="LGBTQ+ Owned Business"
            className="w-36 h-36"
          />
        </div>

        {/* LGBTQ+ Owned Badge */}
        <div className="flex justify-center items-center">
          <img
            src="/images/nd_owned.png" // Update filename as needed
            alt="LGBTQ+ Owned Business"
            className="w-36 h-36"
          />
        </div>

    {/* Badge & Copyright */}
    <div className="flex flex-col items-start text-md space-y-2">
        <img
          src="/images/ptprofile.svg"
          alt="Verified by Psychology Today"
          className="w-max"
        />
      <p className="text-sm text-gray-600">
        &copy; {new Date().getFullYear()} Mindful Way Therapy. All rights reserved.
      </p>
    </div>
  </div>
</footer>
  );
};

export default Footer;
