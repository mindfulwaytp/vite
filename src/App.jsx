import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Header.jsx';
import Home from './Home';
import ProviderProfile from './pages/ProviderProfile'; // ✅ Update path if needed
import ProviderDirectory from './pages/ProviderDirectory'; // ✅ THIS IS CORRECT
import Neurodiversity from './pages/Neurodiversity';
import JobBoard from './pages/join-our-team/index';
import LGBTQTherapistJob from './pages/join-our-team/lgbtq-therapist';
import ADHDTherapistJob from './pages/join-our-team/adhd-therapist';
import Internships from './pages/join-our-team/internships'; // ✅ New import for ADHD Therapist job
import Contact from './pages/contact';//
import ScrollToTop from './components/ScrollToTop';
import NeurodiversityResources from './pages/NeurodiversityResources';



function App() {
  return (
    <div className="bg-white">
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/providers" element={<ProviderDirectory />} />
        <Route path="/providers/:slug" element={<ProviderProfile />} /> {/* ✅ New route */}
        <Route path="/neurodiversity" element={<Neurodiversity />} />
        <Route path="/join-our-team/lgbtq-therapist" element={<LGBTQTherapistJob />} />
        <Route path="/join-our-team/adhd-therapist" element={<ADHDTherapistJob />} />
        <Route path="/join-our-team/internships" element={<Internships />} />
        <Route path="/join-our-team" element={<JobBoard />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/neurodiversity/resources" element={<NeurodiversityResources />} />
      </Routes>
    </div>
  );
}

export default App;
