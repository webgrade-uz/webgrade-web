import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/Webgrade.svg";

// const languages = [
//   { code: "uz", label: "UZ", flag: "🇺🇿" },
//   { code: "ru", label: "RU", flag: "🇷🇺" },
//   { code: "en", label: "EN", flag: "🇬🇧" },
// ];

const Header = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  // BlogDetail va BlogList sahifalarida har doim oq header
  const isBlogDetailPage = !!location.pathname.match(/^\/blog\/[^/]+$/);
  const isBlogListPage = location.pathname === "/blogs";
  const isHomePage = location.pathname === "/";

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    setMenuOpen(false);

    if (isHomePage) {
      // Bosh sahifada to'g'ri section'ga scroll qilish
      const section = document.getElementById(sectionId);
      section?.scrollIntoView({ behavior: "smooth" });
    } else {
      // BlogDetail yoki BlogList'dan bosh sahifaga navigate qilish
      navigate("/");
      // Sahifa load bo'lgandan keyin section'ga scroll qilish
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        section?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    setMenuOpen(false);

    if (isHomePage) {
      // Bosh sahifada hero'ga scroll qilish
      const section = document.getElementById("hero");
      section?.scrollIntoView({ behavior: "smooth" });
    } else {
      // BlogDetail yoki BlogList'dan bosh sahifaga navigate qilish
      navigate("/");
    }
  };

  // Sahifa o'zgarishida darhol header state'ni o'rnatish
  useEffect(() => {
    if (isBlogDetailPage) {
      setScrolled(false);
    } else if (isBlogListPage) {
      setScrolled(true);
    }
  }, [isBlogDetailPage, isBlogListPage]);

  useEffect(() => {
    // BlogDetail yoki BlogList sahifalarida scroll listener'ni o'chirish
    if (isBlogDetailPage || isBlogListPage) {
      return;
    }

    const handleScroll = () => {
      // Bosh sahifada services section'dan scroll qilganda oq header
      const servicesSection = document.getElementById("services");
      if (servicesSection) {
        const offsetTop = servicesSection.offsetTop;
        setScrolled(window.scrollY + 80 >= offsetTop);
      }

      const sections = ["hero", "services", "about", "blog", "contact"];
      for (const sectionId of sections.reverse()) {
        const section = document.getElementById(sectionId);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isBlogDetailPage, isBlogListPage]);

  const navLinks = [
    [t.nav.services, "services"],
    [t.nav.about, "about"],
    [t.nav.blog, "blog"],
    [t.nav.contact, "contact"],
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 border-b transition-colors duration-300 ${scrolled
        ? "bg-[#f1f1f1] border-[#989898]/20 text-[#000000] backdrop-blur-md"
        : "bg-[#000000]/60 border-white/10 text-white backdrop-blur"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a
          href="/"
          onClick={handleLogoClick}
          className="flex items-center gap-2 font-bold text-xl"
        >
          <img
            src={Logo}
            alt="Webgrade"
            className={`h-8 w-auto transition-all ${scrolled ? "brightness-0" : "brightness-0 invert"}`}
          />
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => scrollToSection(e, id)}
              className={`relative group transition-colors duration-300 ${activeSection === id
                ? scrolled ? "text-[#000000] font-medium" : "text-white font-medium"
                : "hover:text-[#989898]"
                }`}
            >
              {label}
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-current transition-all ${activeSection === id ? "w-full" : "w-0 group-hover:w-full"
                  }`}
              ></span>
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {/* Language Selector - Disabled */}
          {/* <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1 text-sm px-2 py-1 rounded hover:bg-white/10 transition"
            >
              <span>{currentLang?.flag}</span>
              <span className="hidden sm:inline">{currentLang?.label}</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {langOpen && (
              <div className={`absolute top-full right-0 mt-2 rounded-lg shadow-lg overflow-hidden ${scrolled ? "bg-white" : "bg-[#1a1a1a]"
                }`}>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      changeLanguage(lang.code);
                      setLangOpen(false);
                    }}
                    className={`flex items-center gap-2 px-4 py-2 text-sm w-full hover:bg-white/10 transition ${language === lang.code ? "font-medium" : ""
                      }`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div> */}

          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, "contact")}
            className="hidden sm:block bg-white hover:bg-[#f1f1f1] text-[#000000] font-medium px-5 py-2 rounded-lg transition"
          >
            {t.nav.contactBtn}
          </a>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className={`md:hidden px-6 pb-6 ${scrolled ? "bg-[#f1f1f1]" : "bg-[#000000]"}`}>
          <nav className="flex flex-col gap-4">
            {navLinks.map(([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => scrollToSection(e, id)}
                className={`py-2 transition-colors ${activeSection === id ? "font-medium" : "hover:text-[#989898]"
                  }`}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
