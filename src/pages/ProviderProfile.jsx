import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { IoMdVideocam } from 'react-icons/io';
import { HiBuildingOffice2 } from 'react-icons/hi2';
import { FaCalendarCheck, FaCalendarTimes, FaUserClock } from 'react-icons/fa';
import { TbReportSearch } from 'react-icons/tb';
import { IoMdClose } from "react-icons/io";
import { providerImages } from '../assets/images';
import defaultImage from '../assets/images/provider-example.avif';

const SHEETDB_URL = 'https://sheetdb.io/api/v1/zpl35ateeao4a';

function slugify(text) {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
}

export default function ProviderProfile() {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleBack = () => {
    navigate(`/providers${location.search}`);
  };

  useEffect(() => {
    fetch(SHEETDB_URL)
      .then(res => res.json())
      .then(data => {
        const parsed = data.map(t => ({
          ...t,
          specialties: t.specialties?.split(',').map(s => s.trim()) || [],
          topSpecialties: t.topSpecialties?.split(',').map(s => s.trim()) || [],
          insurance: t.insurance?.split(',').map(s => s.trim()) || [],
          location: t.location?.split(',').map(s => s.trim()) || [],
          services: t.services?.split(',').map(s => s.trim()) || [],
          gender: t.gender?.split(',').map(s => s.trim()) || [],
        }));

        const match = parsed.find(p => slugify(p.name) === slug);
        setProvider(match);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading provider:', err);
        setLoading(false);
      });
  }, [slug]);


  if (loading) return <div className="text-center mt-20 text-gray-600">Loading provider info...</div>;
  if (!provider) return <div className="text-center mt-20 text-red-600">Provider not found.</div>;

  return (
    <>
      {/* BACK BUTTON */}
      <button
        onClick={handleBack}
        className="ml-4 mt-6 bg-sky-700 text-white px-4 py-2 rounded-md hover:bg-sky-800 transition"
      >
        ← Back to Directory
      </button>

      {/* HEADER BLOCK */}
      <div className="bg-[#f3f6f9] py-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden md:flex">

          {/* Left: Photo */}
          <div className="md:w-1/3 bg-white p-6 flex flex-col items-center">
            <img
              src={providerImages[provider.name?.trim()] ?? defaultImage}
              alt={provider.name}
              className="w-[275px] h-[325px] rounded-2xl object-cover shadow-sm"
              loading="lazy"
            />
          </div>

          {/* Right: Info */}
          <div className="md:w-2/3 p-6">
            <h1 className="text-3xl text-brand-500">
              {provider.name}
              {provider.license && <span className="text-2xl ml-2">, {provider.license}</span>}
            </h1>

            {provider.pronouns && (
              <p className="text-lg text-gray-800 mt-1">({provider.pronouns})</p>
            )}

            <div className="flex flex-wrap gap-4 mt-4 text-sky-800">
              {provider.location?.includes('U-District') && (
                <span className="flex items-center gap-1"><HiBuildingOffice2 /> U-District</span>
              )}
              {provider.location?.includes('Telehealth') && (
                <span className="flex items-center gap-1"><IoMdVideocam /> Telehealth</span>
              )}
            </div>

            <div className="flex items-center gap-2 mt-4 text-sky-800">
              <span>Availability:</span>

              {provider.acceptingClients?.toLowerCase() === 'yes' && (
                <span className="flex items-center gap-1 text-green-600"><FaCalendarCheck /> Accepting New Clients</span>
              )}
              {provider.acceptingClients?.toLowerCase() === 'assessments only' && (
                <span className="flex items-center gap-1 text-orange-500"><TbReportSearch /> Assessments Only</span>
              )}
              {provider.acceptingClients?.toLowerCase() === 'no' && (
                <span className="flex items-center gap-1 text-red-600"><FaCalendarTimes /> Waitlist</span>
              )}
              {provider.acceptingClients?.toLowerCase() === 'starting soon' && (
                <span className="flex items-center gap-1 text-purple-600"><FaUserClock className="text-lg" /> Starting Soon</span>
              )}
            </div>

            <div className="flex flex-wrap gap-4 mt-4 text-sky-800">
              <span>Services:</span>
              {provider.services?.map((s, i) => (
                <span key={i}>
                  {s}
                  {i !== provider.services.length - 1 && <span className="mx-2 text-gray-400">|</span>}
                </span>
              ))}
            </div>

            <div className="mt-4 text-gray-600">
              <span className="text-sky-800">Insurance:</span>
              <div className="flex flex-wrap gap-3 mt-2 text-sky-800">
                {provider.insurance?.map((ins, i) => (
                  <span key={i} className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    {ins}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 italic">
              Fill out our inquiry form today.
              <a
                href="/contact"
                className="ml-4 bg-sky-700 hover:bg-sky-800 text-white py-2 px-4 rounded-md transition"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
