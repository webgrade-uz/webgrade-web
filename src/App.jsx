import Company from "./components/Company";
import Blog from "./components/Blog";
import BlogDetail from "./pages/BlogDetail";
import BlogList from "./pages/BlogList";
import Promo67 from "./pages/Promo67";
import Contact from "./components/Contact";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Footer from "./components/Footer";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const App = () => {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const isPromoPage = location.pathname === "/67";

  // Google Clarity event tracking
  useEffect(() => {
    if (window.clarity) {
      window.clarity('set', 'page_path', location.pathname);
      window.clarity('event', 'page_view', { path: location.pathname });
    }
  }, [location.pathname]);

  // Scroll pozitsiyasini saqlab qo'yish
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.setItem('scrollPosition', window.scrollY);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  // Sahifa yuklanganda scroll pozitsiyasini qaytarish
  useEffect(() => {
    const savedPosition = sessionStorage.getItem('scrollPosition');
    if (savedPosition) {
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedPosition));
        sessionStorage.removeItem('scrollPosition');
      }, 0);
    }
  }, []);

  useEffect(() => {
    // Sahifa o'zgarishida loading state'ni ko'rsatish
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      {!isPromoPage && <Header />}
      {isTransitioning && (
        <div className="fixed inset-0 bg-[#f1f1f1] z-40 pointer-events-none animate-pulse" />
      )}
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <Services />
            <Company />
            <Blog />
            <Contact />
          </>
        } />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/67" element={<Promo67 />} />
      </Routes>
      {!isPromoPage && <Footer />}
    </>
  );
}

export default App