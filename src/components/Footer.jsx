import React from "react";
import { Phone, Mail, AtSign, MapPin, ArrowUp } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import Logo from "../assets/Webgrade.svg";

const Footer = () => {
    const { t } = useLanguage();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const scrollToSection = (e, sectionId) => {
        e.preventDefault();
        const section = document.getElementById(sectionId);
        section?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <footer className="bg-[#000000] text-[#989898] pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    <div>
                        <div className="mb-4">
                            <img src={Logo} alt="Webgrade" className="h-8 w-auto brightness-0 invert" />
                        </div>
                        <p className="text-sm leading-relaxed">
                            {t.footer.description}
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">{t.footer.servicesTitle}</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="#services" onClick={(e) => scrollToSection(e, "services")} className="hover:text-white transition">
                                    {t.footer.links.website}
                                </a>
                            </li>
                            <li>
                                <a href="#services" onClick={(e) => scrollToSection(e, "services")} className="hover:text-white transition">
                                    {t.footer.links.crm}
                                </a>
                            </li>
                            <li>
                                <a href="#services" onClick={(e) => scrollToSection(e, "services")} className="hover:text-white transition">
                                    {t.footer.links.mobile}
                                </a>
                            </li>
                            <li>
                                <a href="#services" onClick={(e) => scrollToSection(e, "services")} className="hover:text-white transition">
                                    {t.footer.links.bot}
                                </a>
                            </li>
                            <li>
                                <a href="#services" onClick={(e) => scrollToSection(e, "services")} className="hover:text-white transition">
                                    {t.footer.links.support}
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">{t.footer.companyTitle}</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="#about" onClick={(e) => scrollToSection(e, "about")} className="hover:text-white transition">
                                    {t.footer.links.about}
                                </a>
                            </li>
                            <li>
                                <a href="#blog" onClick={(e) => scrollToSection(e, "blog")} className="hover:text-white transition">
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a href="#contact" onClick={(e) => scrollToSection(e, "contact")} className="hover:text-white transition">
                                    {t.footer.links.contact}
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">{t.footer.contactTitle}</h4>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-[#f1f1f1]" />
                                <span>+998 94 161 66 62</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-[#f1f1f1]" />
                                <span>webgrade@gmail.com</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <AtSign className="w-4 h-4 text-[#f1f1f1]" />
                                <span>@webgrade</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-[#f1f1f1]" />
                                <span>Toshkent, O'zbekiston</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-[#989898]/20 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm">
                        {t.footer.copyright}
                    </p>

                    <button
                        onClick={scrollToTop}
                        className="mt-4 md:mt-0 w-10 h-10 bg-white hover:bg-[#f1f1f1] text-[#000000] rounded-full flex items-center justify-center transition"
                    >
                        <ArrowUp className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
