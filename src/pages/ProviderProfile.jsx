import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { IoMdVideocam } from 'react-icons/io';
import { HiBuildingOffice2 } from 'react-icons/hi2';
import { FaCalendarCheck, FaCalendarTimes } from 'react-icons/fa';
import { TbReportSearch } from 'react-icons/tb';
import allTherapists from '../data/Providers';
import { providerImages } from '../assets/images';
import exampleImg from '../assets/provider-example.avif';

function slugify(text) {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
}

export default function ProviderProfile() {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const provider = allTherapists.find(p => slugify(p.name) === slug);

const handleBack = () => {
    navigate(`/providers${location.search}`);
};

if (!provider) {
  return <div className="text-center mt-20 text-red-600 ">Provider not found.</div>;
}

  return (
    <>
      <button
        onClick={handleBack}
        className="ml-4 mt-6 inline-block bg-sky-700 text-white px-4 py-2 rounded-md hover:bg-sky-800 transition"
      >
        ← Back to Directory
      </button>

      {/* HEADER BLOCK */}
      <div className="bg-[#f3f6f9] py-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden md:flex">
          {/* Left: Photo */}
          <div className="md:w-1/3 bg-white p-6 flex flex-col items-center">
            <img
              src={providerImages[provider.name] || provider.image || exampleImg}
              alt={provider.name}
              className="w-[275px] h-[325px] rounded-2xl object-cover shadow-sm"
            />
          </div>

          {/* Right: Info */}
          <div className="md:w-2/3 p-6">
            <h1 className="text-3xl  text-brand-500">
              {provider.name}
              {provider.license && (
                <span className="text-2xl  text-brand-500 ml-2">, {provider.license}</span>
              )}
            </h1>
            {provider.pronouns && <p className="text-lg text-gray-800 mt-1">({provider.pronouns})</p>}

            {/* Location */}
            <div className="flex flex-wrap gap-4 mt-4 text-base  text-sky-800">
              {provider.location?.includes('U-District') && (
                <span className="flex items-center gap-1">
                  <HiBuildingOffice2 />
                  U-District
                </span>
              )}
              {provider.location?.includes('Telehealth') && (
                <span className="flex items-center gap-1">
                  <IoMdVideocam />
                  Telehealth
                </span>
              )}
            </div>

            {/* Availability */}
            <div className="flex items-center gap-2 mt-4 text-base  text-sky-800">
              <span>Availability:</span>
              {provider.acceptingClients?.toLowerCase() === 'yes' && (
                <span className="flex items-center gap-1 text-green-600 ">
                  <FaCalendarCheck />
                  Accepting New Clients
                </span>
              )}
              {provider.acceptingClients?.toLowerCase() === 'assessments only' && (
                <span className="flex items-center gap-1 text-orange-500 ">
                  <TbReportSearch />
                  Assessments Only
                </span>
              )}
              {provider.acceptingClients?.toLowerCase() === 'no' && (
                <span className="flex items-center gap-1 text-red-600 ">
                  <FaCalendarTimes />
                  Waitlist
                </span>
              )}
            </div>

            {/* Services */}
            <div className="flex flex-wrap gap-4 mt-4 text-base text-sky-800 ">Services:
              {provider.services?.map((s, i) => (
                <span key={i}>
                  {s}
                  {i !== provider.services.length - 1 && (
                    <span className="mx-2 text-gray-400">|</span>
                  )}
                </span>
              ))}
            </div>

            {/* Insurance */}
            <div className="mt-4 text-base text-gray-600">
              <span className=" text-sky-800">Insurance:</span>
              <div className="flex flex-wrap gap-3 mt-2 text-base text-sky-800 ">
                {provider.insurance.map((ins, i) => (
                  <span key={i} className="flex items-center gap-1 text-base">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    {ins}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ABOUT + SPECIALTIES BLOCK */}
      <div className="flex-col-reverse mt-10 bg-white p-6 rounded-xl shadow-sm flex md:flex-row gap-8 max-w-6xl mx-auto">
        {/* Left: About */}
        <div className="md:w-1/2 order-1 md:order-1">
          <h2 className="text-2xl  text-sky-800 mb-2">About</h2>
          <p className="text-base text-gray-700 leading-relaxed whitespace-pre-line">
            {provider.about}
          </p>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px bg-gray-200"></div>

        {/* Right: Specialties */}
        <div className="md:w-1/2 space-y-6 order-2 md:order-2">
          {provider.topSpecialties?.length > 0 && (
            <div>
              <h2 className="text-2xl  text-sky-800 mb-2">Primary Specialties :</h2>
              <div className="flex flex-wrap gap-3 text-base  text-sky-700">
                {provider.topSpecialties.map((s, i) => (
                  <span key={i} className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span> {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {provider.specialties?.length > 0 && (
            <div>
              <h2 className="text-2xl  text-sky-800 mb-2">Also Experienced With :</h2>
              <div className="flex flex-wrap gap-3 text-base text-sky-700 ">
                {provider.specialties
                  .filter(s => !provider.topSpecialties?.includes(s))
                  .map((s, i) => (
                    <span key={i} className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-400 rounded-full"></span> {s}
                    </span>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
