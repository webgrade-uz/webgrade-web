import Company from "./components/Company";
import Blog from "./components/Blog";
import BlogDetail from "./pages/BlogDetail";
import Contact from "./components/Contact";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";

const App = () => {
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
        <Route path="/blog/:id" element={<BlogDetail />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App