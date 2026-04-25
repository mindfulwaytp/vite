import React from 'react';
import { Routes, Route, Outlet } from "react-router-dom";
import Header from './components/Header';
import Home from './Home';
import ProviderProfile from './pages/ProviderProfile'; // ✅ Update path if needed
import ProviderDirectory from './pages/ProviderDirectory'; // ✅ THIS IS CORRECT
import JobBoard from './pages/join-our-team/index';
import LGBTQTherapistJob from './pages/join-our-team/lgbtq-therapist';
import ADHDTherapistJob from './pages/join-our-team/adhd-therapist';
import EatingDisorderJob from './pages/join-our-team/eating-disorder-therapist';
import Internships from './pages/join-our-team/internships';
import ScrollToTop from './components/ScrollToTop';
import Contact from './pages/Contact';
import Neurodiversity from './pages/Neurodiversity';
import CategoryResourcePage from './pages/neurodiversity/neurodiversity-resources/CategoryResourcePage';
import NeurodiversityResources from './pages/neurodiversity/neurodiversity-resources/index';
import AssessmentsPage from './pages/neurodiversity/assessments';
import AffirmingTherapy from './pages/neurodiversity/affirming-therapy.jsx';
import Services from './pages/Services.jsx';
import RatesFees from './pages/Contact/ratesfees.jsx';
import IndividualTherapy from './pages/services/individual-therapy.jsx';
import CouplesFamilyTherapy from './pages/services/couples-family-therapy.jsx';
import PolyamoryNonMonogamy from './pages/services/polyamory-non-monogamy.jsx';
import QueerAffirmingTherapy from './pages/services/queer-affirming-therapy.jsx';
import ADHDAutismEvaluations from './pages/services/adhd-autism-evaluations.jsx';
import NeurodivergentAffirmingTherapy from './pages/services/neurodivergent-affirming-therapy.jsx';
import Groups from './pages/services/groups.jsx';
import TTRPGGroup from './pages/services/groups/ttrpg.jsx';
import TherapyForm from './pages/Contact/TherapyForm';
import EvaluationForm from './pages/Contact/EvaluationForm';
import AdventuringParty from './pages/Contact/AdventuringParty.jsx';
import Footer from './components/Footer';
import usePageTracking from './hooks/usePageTracking';
import Login from "./pages/Login";
import IntranetLayout from "./pages/intranet/IntranetLayout.jsx";
import IntranetFeed from "./pages/intranet/IntranetFeed.jsx";
import PostDetail from "./pages/intranet/PostDetail.jsx";
import NewPost from "./pages/intranet/NewPost";
import IntranetResources from "./pages/intranet/IntranetResources.jsx";
import ResourceCategory from "./pages/intranet/ResourceCategory.jsx";
import IntranetLinks from "./pages/intranet/IntranetLinks.jsx";
import ResourceDetail from "./pages/intranet/ResourceDetail.jsx";
import IntranetSearch from './pages/intranet/IntranetSearch.jsx';
import PoliciesLandingPage from './pages/PoliciesLandingPage';
import BlogIndex from './pages/blog/index.jsx';
import BlogPostDetail from './pages/blog/BlogPostDetail.jsx';
import NewBlogPost from './pages/blog/NewBlogPost.jsx';
import EditBlogPost from './pages/blog/EditBlogPost.jsx';

function PublicLayout() {
  usePageTracking();

  return (
    <div className="bg-white">
      <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Routes>
      {/* 🔐 STAFF / INTRANET */}
      <Route path="/login" element={<Login />} />

      <Route path="/intranet" element={<IntranetLayout />}>
        <Route index element={<IntranetFeed />} />
        <Route path="new" element={<NewPost />} />
        <Route path="posts/:postId" element={<PostDetail />} />
        <Route path="search" element={<IntranetSearch />} />

        {/* RESOURCES */}
        <Route path="resources">
          <Route index element={<IntranetResources />} />
          <Route path=":categoryId" element={<ResourceCategory />} />
          <Route
            path=":categoryId/:resourceId"
            element={<ResourceDetail />}
          />
        </Route>

        <Route path="links" element={<IntranetLinks />} />
      </Route>


      {/* 🌐 PUBLIC WEBSITE */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />

        <Route path="/providers" element={<ProviderDirectory />} />
        <Route path="/providers/:slug" element={<ProviderProfile />} />

        <Route path="/neurodiversity/assessments" element={<AssessmentsPage />} />

        <Route path="/join-our-team" element={<JobBoard />} />
        <Route path="/join-our-team/lgbtq-therapist" element={<LGBTQTherapistJob />} />
        <Route path="/join-our-team/adhd-therapist" element={<ADHDTherapistJob />} />
        <Route path="/join-our-team/eating-disorder-therapist" element={<EatingDisorderJob />} />
        <Route path="/join-our-team/internships" element={<Internships />} />

        <Route path="/contact" element={<Contact />} />
        <Route path="/contact/therapy" element={<TherapyForm />} />
        <Route path="/contact/evaluation" element={<EvaluationForm />} />
        <Route path="/contact/adventuring-party" element={<AdventuringParty />} />

        <Route path="/services" element={<Services />} />
        <Route path="/services/individual-therapy" element={<IndividualTherapy />} />
        <Route path="/services/couples-family-therapy" element={<CouplesFamilyTherapy />} />
        <Route path="/services/polyamory-non-monogamy" element={<PolyamoryNonMonogamy />} />
        <Route path="/services/queer-affirming-therapy" element={<QueerAffirmingTherapy />} />
        <Route path="/services/adhd-autism-evaluations" element={<ADHDAutismEvaluations />} />
        <Route path="/services/neurodivergent-affirming-therapy" element={<NeurodivergentAffirmingTherapy />} />
        <Route path="/services/groups" element={<Groups />} />
        <Route path="/services/groups/ttrpg" element={<TTRPGGroup />} />
        <Route path="/contact/ratesfees" element={<RatesFees />} />

        <Route path="/neurodiversity" element={<Neurodiversity />} />
        <Route
          path="/neurodiversity/neurodiversity-resources"
          element={<NeurodiversityResources />}
        />
        <Route
          path="/neurodiversity/neurodiversity-resources/:slug"
          element={<CategoryResourcePage />}
        />
        <Route
          path="/neurodiversity/affirming-therapy"
          element={<AffirmingTherapy />}
        />
        <Route path="/policies" element={<PoliciesLandingPage />}
        />

        <Route path="/blog" element={<BlogIndex />} />
        <Route path="/blog/new" element={<NewBlogPost />} />
        <Route path="/blog/edit/:id" element={<EditBlogPost />} />
        <Route path="/blog/:slug" element={<BlogPostDetail />} />

        <Route path="*" element={<div className="p-6">Not found</div>} />
      </Route>
    </Routes>
  );
}
export default App;