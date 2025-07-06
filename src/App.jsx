import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './Home';
import ProviderProfile from './pages/ProviderProfile'; // ✅ Update path if needed
import ProviderDirectory from './pages/ProviderDirectory'; // ✅ THIS IS CORRECT
import JobBoard from './pages/join-our-team/index';
import LGBTQTherapistJob from './pages/join-our-team/lgbtq-therapist';
import ADHDTherapistJob from './pages/join-our-team/adhd-therapist';
import Internships from './pages/join-our-team/internships'; // ✅ New import for ADHD Therapist job
import Contact from './pages/contact';//
import ScrollToTop from './components/ScrollToTop';
import Neurodiversity from './pages/Neurodiversity';
import CategoryResourcePage from './pages/neurodiversity/neurodiversity-resources/CategoryResourcePage';
import NeurodiversityResources from './pages/neurodiversity/neurodiversity-resources/index';
import AssessmentsPage from './pages/neurodiversity/assessments';
import AffirmingTherapy from './pages/neurodiversity/affirming-therapy.jsx';
import Services from './pages/Services.jsx';
import RatesFess from './pages/services/ratesfees.jsx'
import Footer from './components/Footer'
import usePageTracking from './hooks/usePageTracking';



function App() {
  usePageTracking(); // ✅ Track route changes
  return (
    <div className="bg-white">
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/providers" element={<ProviderDirectory />} />
        <Route path="/providers/:slug" element={<ProviderProfile />} />
        <Route path="/neurodiversity/assessments" element={<AssessmentsPage />} />
        <Route path="/join-our-team/lgbtq-therapist" element={<LGBTQTherapistJob />} />
        <Route path="/join-our-team/adhd-therapist" element={<ADHDTherapistJob />} />
        <Route path="/join-our-team/internships" element={<Internships />} />
        <Route path="/join-our-team" element={<JobBoard />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/ratesfees" element={<RatesFess />} />
        <Route path="/neurodiversity" element={<Neurodiversity />} />
        <Route path="/neurodiversity/neurodiversity-resources" element={<NeurodiversityResources />} />
        <Route path="/neurodiversity/neurodiversity-resources/:slug" element={<CategoryResourcePage />} />
        <Route path="/neurodiversity/affirming-therapy" element={<AffirmingTherapy />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
