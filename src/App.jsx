import React, { lazy, Suspense } from 'react';
import { Routes, Route, Outlet } from "react-router-dom";
import usePageTracking from './hooks/usePageTracking';
import Header from './components/Header';
import Home from './Home';
const ProviderProfile = lazy(() => import('./pages/ProviderProfile'));
const ProviderDirectory = lazy(() => import('./pages/ProviderDirectory'));
const JobBoard = lazy(() => import('./pages/join-our-team/index'));
const GeneralistTherapistJob = lazy(() => import('./pages/join-our-team/generalist-therapist'));
const LGBTQTherapistJob = lazy(() => import('./pages/join-our-team/lgbtq-therapist'));
const ADHDTherapistJob = lazy(() => import('./pages/join-our-team/adhd-therapist'));
const EatingDisorderJob = lazy(() => import('./pages/join-our-team/eating-disorder-therapist'));
const Internships = lazy(() => import('./pages/join-our-team/internships'));
import ScrollToTop from './components/ScrollToTop';
const Contact = lazy(() => import('./pages/Contact'));
const CategoryResourcePage = lazy(() => import('./pages/resources/CategoryResourcePage'));
const NeurodiversityResources = lazy(() => import('./pages/resources/index'));
const AssessmentsPage = lazy(() => import('./pages/services/autism-adhd-assessments'));
const AffirmingTherapy = lazy(() => import('./pages/specialties/autism-adhd-therapy.jsx'));
const Services = lazy(() => import('./pages/Services.jsx'));
const HowWeHelp = lazy(() => import('./pages/HowWeHelp.jsx'));
const RatesFees = lazy(() => import('./pages/rates-fees.jsx'));
const IndividualTherapy = lazy(() => import('./pages/services/individual-therapy.jsx'));
const CouplesFamilyTherapy = lazy(() => import('./pages/services/couples-family-therapy.jsx'));
const PolyamoryNonMonogamy = lazy(() => import('./pages/specialties/polyamory-non-monogamy.jsx'));
const QueerAffirmingTherapy = lazy(() => import('./pages/specialties/queer-affirming-therapy.jsx'));
const Specialties = lazy(() => import('./pages/Specialties.jsx'));
const Anxiety = lazy(() => import('./pages/specialties/anxiety.jsx'));
const Depression = lazy(() => import('./pages/specialties/depression.jsx'));
const Groups = lazy(() => import('./pages/services/groups.jsx'));
const TTRPGGroup = lazy(() => import('./pages/services/groups/ttrpg.jsx'));
const TherapyForm = lazy(() => import('./pages/Contact/TherapyForm'));
const AffordingTherapy = lazy(() => import('./pages/affording-therapy'));
const EvaluationForm = lazy(() => import('./pages/Contact/EvaluationForm'));
const AdventuringParty = lazy(() => import('./pages/Contact/AdventuringParty.jsx'));
import Footer from './components/Footer';
const Login = lazy(() => import("./pages/Login"));
const PoliciesLandingPage = lazy(() => import('./pages/PoliciesLandingPage'));
const MyHealthMyData = lazy(() => import('./pages/policies/my-health-my-data'));
const PrivacyPolicyPage = lazy(() => import('./pages/policies/privacy'));
const TermsAndConditionsPage = lazy(() => import('./pages/policies/terms'));
const BlogIndex = lazy(() => import('./pages/blog/index.jsx'));
const BlogPostDetail = lazy(() => import('./pages/blog/BlogPostDetail.jsx'));
const NewBlogPost = lazy(() => import('./pages/blog/NewBlogPost.jsx'));
const EditBlogPost = lazy(() => import('./pages/blog/EditBlogPost.jsx'));
const AdminSession = lazy(() => import('./components/AdminSession.jsx'));
const AdminHome = lazy(() => import('./pages/admin/AdminHome.jsx'));
const ManageProviders = lazy(() => import('./pages/admin/ManageProviders.jsx'));
const EditProvider = lazy(() => import('./pages/admin/EditProvider.jsx'));

function PublicLayout() {
  // Public pages only — /login sits outside this layout.
  usePageTracking();

  return (
    <div className="bg-white">
      <ScrollToTop />
      <Header />
      <Suspense fallback={<div className="min-h-[70vh]" aria-busy="true" />}>
        <Outlet />
      </Suspense>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Suspense fallback={<div className="min-h-screen" aria-busy="true" />}>
    <Routes>
      {/* 🔐 STAFF — sign-in for blog authoring */}
      <Route path="/login" element={<Login />} />

      {/* 🌐 PUBLIC WEBSITE */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />

        <Route path="/providers" element={<ProviderDirectory />} />
        <Route path="/providers/:slug" element={<ProviderProfile />} />

        <Route path="/services/autism-adhd-assessments" element={<AssessmentsPage />} />

        <Route path="/join-our-team" element={<JobBoard />} />
        <Route path="/join-our-team/generalist-therapist" element={<GeneralistTherapistJob />} />
        <Route path="/join-our-team/lgbtq-therapist" element={<LGBTQTherapistJob />} />
        <Route path="/join-our-team/adhd-therapist" element={<ADHDTherapistJob />} />
        <Route path="/join-our-team/eating-disorder-therapist" element={<EatingDisorderJob />} />
        <Route path="/join-our-team/internships" element={<Internships />} />

        <Route path="/contact" element={<Contact />} />
        <Route path="/contact/therapy" element={<TherapyForm />} />
        <Route path="/contact/evaluation" element={<EvaluationForm />} />
        <Route path="/contact/adventuring-party" element={<AdventuringParty />} />

        <Route path="/how-we-help" element={<HowWeHelp />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/individual-therapy" element={<IndividualTherapy />} />
        <Route path="/services/couples-family-therapy" element={<CouplesFamilyTherapy />} />
        <Route path="/specialties" element={<Specialties />} />
        <Route path="/specialties/anxiety" element={<Anxiety />} />
        <Route path="/specialties/depression" element={<Depression />} />
        <Route path="/specialties/polyamory-non-monogamy" element={<PolyamoryNonMonogamy />} />
        <Route path="/specialties/queer-affirming-therapy" element={<QueerAffirmingTherapy />} />
        <Route path="/services/groups" element={<Groups />} />
        <Route path="/services/groups/ttrpg" element={<TTRPGGroup />} />
        <Route path="/rates-fees" element={<RatesFees />} />
        <Route path="/affording-therapy" element={<AffordingTherapy />} />

        <Route
          path="/resources"
          element={<NeurodiversityResources />}
        />
        <Route
          path="/resources/:slug"
          element={<CategoryResourcePage />}
        />
        <Route
          path="/specialties/autism-adhd-therapy"
          element={<AffirmingTherapy />}
        />
        <Route path="/policies" element={<PoliciesLandingPage />} />
        <Route path="/policies/my-health-my-data" element={<MyHealthMyData />} />
        <Route path="/policies/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/policies/terms" element={<TermsAndConditionsPage />} />

        <Route path="/blog" element={<BlogIndex />} />
        <Route path="/blog/:slug" element={<BlogPostDetail />} />

        {/* 🔐 Signed-in pages: timed sign-out applies to everything in here */}
        <Route element={<AdminSession />}>
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/admin/providers" element={<ManageProviders />} />
          <Route path="/admin/providers/:id" element={<EditProvider />} />
          <Route path="/blog/new" element={<NewBlogPost />} />
          <Route path="/blog/edit/:id" element={<EditBlogPost />} />
        </Route>

        <Route path="*" element={<div className="p-6">Not found</div>} />
      </Route>
    </Routes>
    </Suspense>
  );
}
export default App;