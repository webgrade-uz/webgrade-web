import React from 'react'
import { ArrowRight, Play } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import ParticlesBackground from './ParticlesBackground'

const Hero = () => {
  const { t } = useLanguage();

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id='hero' className="relative min-h-screen bg-[#000000] text-white flex items-center justify-center px-6 overflow-hidden">
      {/* Particles Background */}
      <ParticlesBackground />

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl select-none">
        <h1 className="text-4xl md:text-6xl font-bold leading-snug">
          {t.hero.title1}
          <span className="text-[#f1f1f1]"> {t.hero.title2} </span>
          {t.hero.title3}
        </h1>

        <p className="mt-6 text-[#989898] text-lg md:text-2xl">
          {t.hero.description}
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, "contact")}
            className="bg-white hover:bg-[#f1f1f1] text-[#000000] font-medium px-6 py-3 rounded-lg transition inline-flex items-center justify-center gap-2"
          >
            {t.hero.cta1}
            <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href="#services"
            onClick={(e) => scrollToSection(e, "services")}
            className="border border-white text-white hover:bg-white hover:text-[#000000] px-6 py-3 rounded-lg transition inline-flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5" />
            {t.hero.cta2}
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero
