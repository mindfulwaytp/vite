import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import { FaCalendarCheck, FaCalendarTimes, FaUserClock } from 'react-icons/fa';
import { TbReportSearch } from 'react-icons/tb';
import { IoMdVideocam } from 'react-icons/io';
import { HiBuildingOffice2 } from 'react-icons/hi2';
import { providerImages } from '../assets/images';
import defaultImage from '../assets/images/provider-example.avif';

import '../Providers.css';

function slugify(text) {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
}

function formatAvailabilityDate() {
  const today = new Date();

  // Get Monday of current week
  const day = today.getDay(); // 0 = Sunday
  const diff = today.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(today);
  monday.setDate(diff);

  return monday.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

const ProvidersDirectory = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const [allTherapists, setAllTherapists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [selectedInsurance, setSelectedInsurance] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedGender, setSelectedGender] = useState([]);
  const [selectedModalities, setSelectedModalities] = useState([]);
  const [availability, setAvailability] = useState({ value: 'all', label: 'All' });

  const initialPage = Math.max(parseInt(searchParams.get('page') || '1', 10), 1);
  const [currentPage, setCurrentPage] = useState(initialPage);

  const itemsPerPage = 6;

  useEffect(() => {
    fetch('https://sheetdb.io/api/v1/zpl35ateeao4a')
      .then((res) => res.json())
      .then((data) => {
        const parsed = data.map((t) => ({
          ...t,
          specialties: t.specialties?.split(',').map((s) => s.trim()) || [],
          topSpecialties: t.topSpecialties?.split(',').map((s) => s.trim()) || [],
          modalities: t.modalities?.split(',').map((s) => s.trim()) || [],
          insurance: t.insurance?.split(',').map((s) => s.trim()) || [],
          location: t.location?.split(',').map((s) => s.trim()) || [],
          services: t.services?.split(',').map((s) => s.trim()) || [],
          gender: t.gender?.split(',').map((s) => s.trim()) || [],
        }));

        setAllTherapists(parsed);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching providers:', err);
        setLoading(false);
      });
  }, []);

  const specialtyOptions = [...new Set(allTherapists.flatMap((t) => t.specialties))]
    .map((s) => ({ label: s, value: s }))
    .sort((a, b) => a.label.localeCompare(b.label));

  const insuranceOptions = [...new Set(allTherapists.flatMap((t) => t.insurance))]
    .map((i) => ({ label: i, value: i }))
    .sort((a, b) => a.label.localeCompare(b.label));

  const locationOptions = [...new Set(allTherapists.flatMap((t) => t.location))]
    .map((l) => ({ label: l, value: l }))
    .sort((a, b) => a.label.localeCompare(b.label));

  const serviceOptions = [...new Set(allTherapists.flatMap((t) => t.services))]
    .map((s) => ({ label: s, value: s }))
    .sort((a, b) => a.label.localeCompare(b.label));

  const modalityOptions = [...new Set(allTherapists.flatMap((t) => t.modalities))]
    .map((m) => ({ label: m, value: m }))
    .sort((a, b) => a.label.localeCompare(b.label));

  const genderOptions = [
    ...new Set(
      allTherapists
        .flatMap((t) => (Array.isArray(t.gender) ? t.gender : [t.gender]))
        .filter(Boolean)
        .map((g) => g.trim())
    ),
  ]
    .map((g) => ({ label: g, value: g }))
    .sort((a, b) => a.label.localeCompare(b.label));

  useEffect(() => {
    if (allTherapists.length === 0) return;

    const specialtyOpts = [...new Set(allTherapists.flatMap((t) => t.specialties))].map((s) => ({
      label: s,
      value: s,
    }));
    const insuranceOpts = [...new Set(allTherapists.flatMap((t) => t.insurance))].map((i) => ({
      label: i,
      value: i,
    }));
    const locationOpts = [...new Set(allTherapists.flatMap((t) => t.location))].map((l) => ({
      label: l,
      value: l,
    }));
    const serviceOpts = [...new Set(allTherapists.flatMap((t) => t.services))].map((s) => ({
      label: s,
      value: s,
    }));
    const modalityOpts = [...new Set(allTherapists.flatMap((t) => t.modalities))].map((m) => ({
      label: m,
      value: m,
    }));
    const genderOpts = [
      ...new Set(
        allTherapists
          .flatMap((t) => (Array.isArray(t.gender) ? t.gender : [t.gender]))
          .filter(Boolean)
          .map((g) => g.trim())
      ),
    ].map((g) => ({ label: g, value: g }));

    const getMultiValues = (key, options) => {
      const values = searchParams.getAll(key);
      return options.filter((opt) => values.includes(opt.value));
    };

    setSelectedGender(getMultiValues('gender', genderOpts));
    setSelectedSpecialties(getMultiValues('specialties', specialtyOpts));
    setSelectedLocation(getMultiValues('location', locationOpts));
    setSelectedServices(getMultiValues('services', serviceOpts));
    setSelectedModalities(getMultiValues('modalities', modalityOpts));

    const insurance = searchParams.get('insurance');
    if (insurance) {
      const match = insuranceOpts.find((opt) => opt.value === insurance);
      setSelectedInsurance(match || null);
    } else {
      setSelectedInsurance(null);
    }

    const avail = searchParams.get('availability');
    if (avail) {
      const match = [
        { value: 'all', label: 'All' },
        { value: 'true', label: 'Accepting New Clients' },
        { value: 'false', label: 'Not Accepting New Clients' },
      ].find((opt) => opt.value === avail);
      setAvailability(match || { value: 'all', label: 'All' });
    } else {
      setAvailability({ value: 'all', label: 'All' });
    }

    const pageFromUrl = Math.max(parseInt(searchParams.get('page') || '1', 10), 1);
    setCurrentPage(pageFromUrl);
  }, [searchParams, allTherapists]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const filteredTherapists = allTherapists.filter((t) => {
    const matchesSpecialties =
      selectedSpecialties.length === 0 ||
      selectedSpecialties.every((sel) => t.specialties.includes(sel.value));

    const matchesInsurance =
      !selectedInsurance || t.insurance.includes(selectedInsurance.value);

    const matchesLocation =
      selectedLocation.length === 0 ||
      selectedLocation.every((loc) => t.location.includes(loc.value));

    const matchesServices =
      selectedServices.length === 0 ||
      selectedServices.every((serv) => t.services.includes(serv.value));

    const matchesModalities =
      selectedModalities.length === 0 ||
      selectedModalities.every((mod) => t.modalities.includes(mod.value));

    const matchesGender =
      selectedGender.length === 0 ||
      t.gender.some((g) => selectedGender.map((sel) => sel.value).includes(g));

    const matchesAvailability =
      availability.value === 'all' ||
      (availability.value === 'true' &&
        ['yes', 'assessments only'].includes(t.acceptingClients?.toLowerCase())) ||
      (availability.value === 'false' &&
        ['no', 'starting soon'].includes(t.acceptingClients?.toLowerCase()));

    return (
      matchesSpecialties &&
      matchesInsurance &&
      matchesLocation &&
      matchesServices &&
      matchesModalities &&
      matchesGender &&
      matchesAvailability
    );
  });

  const totalPages = Math.ceil(filteredTherapists.length / itemsPerPage) || 1;
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const indexOfLastItem = safeCurrentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTherapists = filteredTherapists.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    if (safeCurrentPage !== currentPage) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set('page', String(safeCurrentPage));
      setSearchParams(newParams, { replace: true });
    }
  }, [safeCurrentPage, currentPage, searchParams, setSearchParams]);

  const updateMultiSelect = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete(key);

    (value || []).forEach((opt) => newParams.append(key, opt.value));

    newParams.set('page', '1');
    setSearchParams(newParams);
    setCurrentPage(1);
  };

  const updateSingleSelect = (key, value) => {
    const newParams = new URLSearchParams(searchParams);

    if (value) {
      newParams.set(key, value.value);
    } else {
      newParams.delete(key);
    }

    newParams.set('page', '1');
    setSearchParams(newParams);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', String(page));
    setSearchParams(newParams);
    setCurrentPage(page);
  };

  if (loading) {
    return <div className="text-center py-12 text-gray-500">Loading providers...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl text-center text-sky-700 mb-2">Meet Our Providers</h1>
      <h3 className="text-lg text-center text-gray-700 mb-6">
        Use the search functions below to find a provider. <br />
        To learn more, click on each provider&apos;s profile
        <br />
        <p className="italic mt-3">Availability updated this week ({formatAvailabilityDate()})</p>
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div>
          <label className="block text-base text-gray-700 mb-1">Specialties</label>
          <Select
            isMulti
            options={specialtyOptions}
            value={selectedSpecialties}
            onChange={(v) => {
              setSelectedSpecialties(v || []);
              updateMultiSelect('specialties', v);
            }}
          />
        </div>

        <div>
          <label className="block text-base text-gray-700 mb-1">Insurance</label>
          <Select
            options={insuranceOptions}
            value={selectedInsurance}
            onChange={(v) => {
              setSelectedInsurance(v);
              updateSingleSelect('insurance', v);
            }}
            isClearable
          />
        </div>

        <div>
          <label className="block text-base text-gray-700 mb-1">Location</label>
          <Select
            isMulti
            options={locationOptions}
            value={selectedLocation}
            onChange={(v) => {
              setSelectedLocation(v || []);
              updateMultiSelect('location', v);
            }}
          />
        </div>

        <div>
          <label className="block text-base text-gray-700 mb-1">Services</label>
          <Select
            isMulti
            options={serviceOptions}
            value={selectedServices}
            onChange={(v) => {
              setSelectedServices(v || []);
              updateMultiSelect('services', v);
            }}
          />
        </div>

        <div>
          <label className="block text-base text-gray-700 mb-1">Modalities</label>
          <Select
            isMulti
            options={modalityOptions}
            value={selectedModalities}
            onChange={(v) => {
              setSelectedModalities(v || []);
              updateMultiSelect('modalities', v);
            }}
          />
        </div>

        <div>
          <label className="block text-base text-gray-700 mb-1">Gender Identity</label>
          <Select
            isMulti
            options={genderOptions}
            value={selectedGender}
            onChange={(v) => {
              setSelectedGender(v || []);
              updateMultiSelect('gender', v);
            }}
          />
        </div>

        <div>
          <label className="block text-base text-gray-700 mb-1">Availability</label>
          <Select
            options={[
              { value: 'all', label: 'All' },
              { value: 'true', label: 'Accepting New Clients' },
              { value: 'false', label: 'Not Accepting New Clients' },
            ]}
            value={availability}
            onChange={(v) => {
              setAvailability(v);
              updateSingleSelect('availability', v);
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentTherapists.map((t, i) => (
          <Link
            key={i}
            to={`/providers/${slugify(t.name)}`}
            state={{ from: `${location.pathname}${location.search}` }}
            className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition p-4 flex flex-col items-center text-center max-w-sm mx-auto"
          >
            <div className="w-full aspect-[5/6] max-w-[300px] mx-auto overflow-hidden rounded-lg mb-2">
              <img
                src={providerImages[t.name] ?? defaultImage}
                alt={t.name}
                className="w-[275px] h-[325px] rounded-2xl object-cover shadow-sm"
              />
            </div>

            <h2 className="text-lg text-sky-700 mt-2">
              {t.name}
              {t.license && <span className="text-base text-gray-800 ml-1">({t.license})</span>}
              {t.pronouns && <span className="text-base text-gray-600 ml-1">({t.pronouns})</span>}
            </h2>

            <div className="flex flex-wrap justify-center gap-3 text-base text-gray-700 mt-2">
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

            <div className="text-base text-gray-700 mt-2">
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
              {t.acceptingClients?.toLowerCase() === 'starting soon' && (
                <span className="flex items-center justify-center text-purple-600 gap-1">
                  <FaUserClock className="text-lg" /> Starting Soon
                </span>
              )}
            </div>

            <ul className="flex flex-wrap justify-center gap-2 mt-3">
              {(t.topSpecialties || []).map((spec, j) => (
                <li
                  key={j}
                  className="bg-gray-100 text-gray-800 text-base px-3 py-1 rounded-full"
                >
                  {spec}
                </li>
              ))}
            </ul>

            <p className="text-base text-gray-700 leading-relaxed mt-3">
              <strong className="text-gray-800">Insurance:</strong> {t.insurance.join(', ')}
            </p>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 rounded-md border ${
                safeCurrentPage === i + 1
                  ? 'bg-sky-700 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
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