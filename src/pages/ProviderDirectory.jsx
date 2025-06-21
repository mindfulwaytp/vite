import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Link, useSearchParams } from 'react-router-dom';
import { FaCalendarCheck, FaCalendarTimes } from 'react-icons/fa';
import { TbReportSearch } from 'react-icons/tb';
import { IoMdVideocam } from "react-icons/io";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { providerImages } from '../assets/images';
import exampleImg from '../assets/provider-example.avif';
import '../Providers.css';
import allTherapists from '../data/Providers';

function slugify(text) {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
}

const specialtyOptions = [...new Set(allTherapists.flatMap(t => t.specialties))]
  .map(s => ({ label: s, value: s }))
  .sort((a, b) => a.label.localeCompare(b.label));
const insuranceOptions = [...new Set(allTherapists.flatMap(t => t.insurance))].map(i => ({ label: i, value: i }));
const locationOptions = [...new Set(allTherapists.flatMap(t => t.location))].map(l => ({ label: l, value: l }));
const serviceOptions = [...new Set(allTherapists.flatMap(t => t.services))].map(s => ({ label: s, value: s }));
const genderOptions = [...new Set(allTherapists.map(t => t.gender?.trim()))]
  .filter(Boolean)
  .map(g => ({ label: g, value: g }));

const ProvidersDirectory = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [selectedInsurance, setSelectedInsurance] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedGender, setSelectedGender] = useState([]);
  const [availability, setAvailability] = useState({ value: 'all', label: 'All' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const getMultiValues = (key, options) => {
      const values = searchParams.getAll(key);
      return options.filter(opt => values.includes(opt.value));
    };

    setSelectedGender(getMultiValues('gender', genderOptions));
    setSelectedSpecialties(getMultiValues('specialties', specialtyOptions));
    setSelectedLocation(getMultiValues('location', locationOptions));
    setSelectedServices(getMultiValues('services', serviceOptions));

    const insurance = searchParams.get('insurance');
    if (insurance) {
      const match = insuranceOptions.find(opt => opt.value === insurance);
      setSelectedInsurance(match || null);
    }

    const avail = searchParams.get('availability');
    if (avail) {
      const match = [
        { value: 'all', label: 'All' },
        { value: 'true', label: 'Accepting New Clients' },
        { value: 'false', label: 'Not Accepting New Clients' },
      ].find(opt => opt.value === avail);
      setAvailability(match || { value: 'all', label: 'All' });
    }
  }, [searchParams]);

  const filteredTherapists = allTherapists.filter(t => {
    const matchesSpecialties = selectedSpecialties.length === 0 || selectedSpecialties.every(sel => t.specialties.includes(sel.value));
    const matchesInsurance = !selectedInsurance || t.insurance.includes(selectedInsurance.value);
    const matchesLocation = selectedLocation.length === 0 || selectedLocation.every(loc => t.location.includes(loc.value));
    const matchesServices = selectedServices.length === 0 || selectedServices.every(serv => t.services.includes(serv.value));
    const matchesGender = selectedGender.length === 0 || selectedGender.some(sel => t.gender === sel.value);
    const matchesAvailability = availability.value === 'all' ||
      (availability.value === 'true' && ['yes', 'assessments only'].includes(t.acceptingClients.toLowerCase())) ||
      (availability.value === 'false' && ['no', 'assessments only'].includes(t.acceptingClients.toLowerCase()));

    return matchesSpecialties && matchesInsurance && matchesLocation && matchesServices && matchesGender && matchesAvailability;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTherapists = filteredTherapists.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTherapists.length / itemsPerPage);

  const updateMultiSelect = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete(key);
    (value || []).forEach(opt => newParams.append(key, opt.value));
    setSearchParams(newParams);
    setCurrentPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl  text-center text-gray-800 mb-2">Meet Our Providers</h1>
      <h3 className="text-lg text-center text-gray-600 mb-6">
        Use the search functions below to find a provider<br />
        Availability Updated as of July 2025
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div><label className="block  text-sm text-gray-700 mb-1">Specialties</label><Select isMulti options={specialtyOptions} value={selectedSpecialties} onChange={(v) => { setSelectedSpecialties(v || []); updateMultiSelect('specialties', v); }} /></div>
        <div><label className="block  text-sm text-gray-700 mb-1">Insurance</label><Select options={insuranceOptions} value={selectedInsurance} onChange={(v) => { setSelectedInsurance(v); const newParams = new URLSearchParams(searchParams); if (v) { newParams.set('insurance', v.value); } else { newParams.delete('insurance'); } setSearchParams(newParams); setCurrentPage(1); }} isClearable /></div>
        <div><label className="block  text-sm text-gray-700 mb-1">Location</label><Select isMulti options={locationOptions} value={selectedLocation} onChange={(v) => { setSelectedLocation(v || []); updateMultiSelect('location', v); }} /></div>
        <div><label className="block  text-sm text-gray-700 mb-1">Services</label><Select isMulti options={serviceOptions} value={selectedServices} onChange={(v) => { setSelectedServices(v || []); updateMultiSelect('services', v); }} /></div>
        <div><label className="block  text-sm text-gray-700 mb-1">Gender Identity</label><Select isMulti options={genderOptions} value={selectedGender} onChange={(v) => { setSelectedGender(v || []); updateMultiSelect('gender', v); }} /></div>
        <div><label className="block  text-sm text-gray-700 mb-1">Availability</label><Select options={[{ value: 'all', label: 'All' }, { value: 'true', label: 'Accepting New Clients' }, { value: 'false', label: 'Not Accepting New Clients' }]} value={availability} onChange={(v) => { setAvailability(v); const newParams = new URLSearchParams(searchParams); newParams.set('availability', v.value); setSearchParams(newParams); setCurrentPage(1); }} /></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentTherapists.map((t, i) => (
        <Link
          to={`/providers/${slugify(t.name)}${window.location.search}`}
          key={i}
          className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition p-4 flex flex-col items-center text-center max-w-sm mx-auto"
        >
          <div className="w-full aspect-[5/6] max-w-[300px] mx-auto overflow-hidden rounded-lg mb-2">
            <img
              src={providerImages[t.name] || t.image || exampleImg}
              alt={t.name}
              className="w-full h-full object-cover rounded-lg shadow-sm"
            />
          </div>

          <h2 className="text-lg  text-sky-700 mt-2">
            {t.name}
            {t.license && (
              <span className="text-sm text-gray-800 ml-1">({t.license})</span>
            )}
            {t.pronouns && (
              <span className="text-sm text-gray-600 ml-1">({t.pronouns})</span>
            )}
          </h2>

          <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-700 mt-2">
            {t.location.includes('Telehealth') && (
              <span className="flex items-center gap-1">
                <IoMdVideocam /> Telehealth
              </span>
            )}
            {t.location.includes('U-District') && (
              <span className="flex items-center gap-1">
                <HiBuildingOffice2 /> U-District
              </span>
            )}
          </div>

          <div className="text-sm  text-gray-700 mt-2">
            {t.acceptingClients?.toLowerCase() === 'yes' && (
              <span className="flex items-center justify-center text-green-600 gap-1">
                <FaCalendarCheck /> Accepting New Clients
              </span>
            )}
            {t.acceptingClients?.toLowerCase() === 'assessments only' && (
              <span className="flex items-center justify-center text-orange-400 gap-1">
                <TbReportSearch className="text-lg" /> Assessments Only
              </span>
            )}
            {t.acceptingClients?.toLowerCase() === 'no' && (
              <span className="flex items-center justify-center text-red-600 gap-1">
                <FaCalendarTimes /> Waitlist
              </span>
            )}
          </div>

          <ul className="flex flex-wrap justify-center gap-2 mt-3">
            {(t.topSpecialties || []).map((spec, j) => (
              <li
                key={j}
                className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full"
              >
                {spec}
              </li>
            ))}
          </ul>

          <p className="text-sm text-gray-700 leading-relaxed mt-3">
            <strong className="text-gray-800">Insurance:</strong>{' '}
            {t.insurance.join(', ')}
          </p>
        </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded-md border ${
                currentPage === i + 1 ? 'bg-sky-700 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProvidersDirectory;
