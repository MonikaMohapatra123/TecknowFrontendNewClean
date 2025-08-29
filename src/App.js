import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import AreaOfActivities from './pages/AreaOfActivities/AreaOfActivities';
import Career from './pages/Career/Career';
import Company from './pages/Company/Company';
import Projects from './pages/Projects/Projects';
import WhyPriya from './pages/WhyPriya/WhyPriya';
import ProjectPage from './pages/Project_page/Project_page';
import ServicesPage from './pages/Services_page/Services_page';
import Sustainability from './pages/Sustainability/Sustainability';
import Contact from './pages/Contact/Contact';
import NotFound from './components/NotFound/NotFound';
import Admin from './pages/Admin/Admin';
import PrivateRoute from './pages/PrivateRoute/PrivateRoute';
import useScrollToTop from './components/useScrollToTop/useScrollToTop';
import Login from './pages/Login/Login.js';
import AdminProjects from './pages/AdminProjects/AdminProjects';
import AdminServices from './pages/AdminServices/AdminServices';
import AdminHiring from './pages/AdminHiring/AdminHiring';
import AdminSubmission from './pages/AdminSubmission/AdminSubmission.js';
import AddProjectsPage from './pages/AddProjectsPage/AddProjectsPage';
import AddServicesPage from './pages/AddServicesPage/AddServicesPage';
import AddHiringPage from './pages/AddHiringPage/AddHiringPage';
import EditProjectsPage from './pages/EditProjectsPage/EditProjectsPage';
import EditServicesPage from './pages/EditServicesPage/EditServicesPage';
import EditHiringPage from './pages/EditHiringPage/EditHiringPage';
import EditSubmissionPage from './pages/EditSubmissionPage/EditSubmissionPage';

const PublicLayout = ({ children }) => (
  <>
    <NavBar />
    {children}
    <Footer />
  </>
);

const PrivateLayout = ({ children }) => (
  <>
    {children}
  </>
);

const RoutesWithLayout = () => {
  const location = useLocation();
  useScrollToTop();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
      <Route path="/services" element={<PublicLayout><AreaOfActivities /></PublicLayout>} />
      <Route path="/career" element={<PublicLayout><Career /></PublicLayout>} />
      <Route path="/company" element={<PublicLayout><Company /></PublicLayout>} />
      <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
      <Route path="/projects" element={<PublicLayout><Projects /></PublicLayout>} />
      <Route path="/why-priya" element={<PublicLayout><WhyPriya /></PublicLayout>} />
      <Route path="/projects/:id" element={<PublicLayout><ProjectPage /></PublicLayout>} />
      <Route path="/services/:id" element={<PublicLayout><ServicesPage /></PublicLayout>} />
      <Route path="/sustainability" element={<PublicLayout><Sustainability /></PublicLayout>} />

      {/* Private Routes */}
      <Route path="/admin" element={<PrivateRoute><PrivateLayout><Admin /></PrivateLayout></PrivateRoute>} />
        <Route path="/AdminProjects" element={<PrivateRoute><PrivateLayout><AdminProjects /></PrivateLayout></PrivateRoute>} />
        <Route path="/AdminServices" element={<PrivateRoute><PrivateLayout><AdminServices /></PrivateLayout></PrivateRoute>} />
        <Route path="/AdminHiring" element={<PrivateRoute><PrivateLayout><AdminHiring /></PrivateLayout></PrivateRoute>} />
        <Route path="/AdminSubmission" element={<PrivateRoute><PrivateLayout><AdminSubmission /></PrivateLayout></PrivateRoute>} />
        <Route path="/AddProjectsPage" element={<PrivateRoute><PrivateLayout><AddProjectsPage /></PrivateLayout></PrivateRoute>} />
        <Route path="/AddServicesPage" element={<PrivateRoute><PrivateLayout><AddServicesPage /></PrivateLayout></PrivateRoute>} />
        <Route path="/AddHiringPage" element={<PrivateRoute><PrivateLayout><AddHiringPage /></PrivateLayout></PrivateRoute>} />
        <Route path="/AdminProjects/:id" element={<PrivateRoute><PrivateLayout><EditProjectsPage /></PrivateLayout></PrivateRoute>} />
        <Route path="/AdminServices/:id" element={<PrivateRoute><PrivateLayout><EditServicesPage /></PrivateLayout></PrivateRoute>} />
        <Route path="/AdminHiring/:id" element={<PrivateRoute><PrivateLayout><EditHiringPage /></PrivateLayout></PrivateRoute>} />
        <Route path="/AdminSubmission/:id" element={<PrivateRoute><PrivateLayout><EditSubmissionPage /></PrivateLayout></PrivateRoute>} />

      {/* Catch-all Route */}
      <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

const AppRoutes = () => {
  return (
    <Router>
      <RoutesWithLayout />
    </Router>
  );
};

export default AppRoutes;
