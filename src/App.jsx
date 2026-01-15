import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import BackgroundEffects from './components/BackgroundEffects.jsx';
import MotionGraphicsPage from './pages/MotionGraphicsPage.jsx';
import MontagePage from './pages/MontagePage.jsx';
import PhotographyPage from './pages/PhotographyPage.jsx';
import StudioRentalPage from './pages/StudioRentalPage.jsx';
import WebDesignPage from './pages/WebDesignPage.jsx';
import ContentWritingPage from './pages/ContentWritingPage.jsx';
import MarketingPage from './pages/MarketingPage.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import SocialSidebar from './components/SocialSidebar.jsx';
import CursorEffect from './components/CursorEffect.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import Home from './pages/Home.jsx';
import Footer from './components/footer.jsx';

const App = () => {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#080911] overflow-x-hidden">
      {/* الخلفية المتحركة */}
      <BackgroundEffects />
      <CursorEffect />
      <ScrollToTop />
      <SocialSidebar />
      
      {/* النافبار في الأعلى */}
      <Navbar />
      
      {/* المحتوى الرئيسي - يأخذ المساحة المتبقية */}
      <main className="flex-grow relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/motion-graphics" element={<MotionGraphicsPage />} />
          <Route path="/services/montage" element={<MontagePage />} />
          <Route path="/services/photography" element={<PhotographyPage />} />
          <Route path="/services/studio-rental" element={<StudioRentalPage />} />
          <Route path="/services/web-design" element={<WebDesignPage />} />
          <Route path="/services/content-writing" element={<ContentWritingPage />} />
          <Route path="/services/marketing" element={<MarketingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      
      {/* الفوتر في الأسفل */}
      <Footer />
    </div>
  );
};

export default App;