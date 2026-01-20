import Company from "./components/Company";
import Blog from "./components/Blog";
import BlogDetail from "./pages/BlogDetail";
import BlogList from "./pages/BlogList";
import Contact from "./components/Contact";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Footer from "./components/Footer";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

const App = () => {
  const location = useLocation();

  useEffect(() => {
    // Har sahifa o'zgarishida scroll yuqoriga
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <Header />
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
      </Routes>
      <Footer />
    </>
  );
}

export default App