import React from "react";
import { CheckCircle, Users, Briefcase, Award } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

const team = [
  {
    name: "Muhammadali Khasanov",
    role: { uz: "Bosh direktor", ru: "Генеральный директор", en: "CEO" },
    desc: {
      uz: "Kompaniya asoschisi. IT biznesda 5+ yillik tajriba bilan strategik yo'nalishni belgilaydi.",
      ru: "Основатель компании. Определяет стратегическое направление с 5+ летним опытом в IT-бизнесе.",
      en: "Company founder. Sets strategic direction with 5+ years of experience in IT business.",
    },
    image: "/team/ceo.jpg",
    badge: "CEO",
  },
  {
    name: "Abdulbosit G'oforaliyev",
    role: { uz: "Full-Stack Dasturchi", ru: "Full-Stack Разработчик", en: "Full-Stack Developer" },
    desc: {
      uz: "React, Next.js, Python, Django, FastAPI, Telegram-botlarda ekspert.",
      ru: "Эксперт в React, Next.js, Python, Django, FastAPI, Telegram-ботах.",
      en: "Expert in React, Next.js, Python, Django, FastAPI, Telegram bots.",
    },
    image: "/team/dev.jpg",
    badge: "COO",
  },
  {
    name: "Abbos Pardayev",
    role: { uz: "Loyiha Menejeri", ru: "Менеджер проектов", en: "Project Manager" },
    desc: {
      uz: "Loyihalarni muvaffaqiyatli yetkazib beradi va jamoani boshqaradi.",
      ru: "Успешно реализует проекты и управляет командой.",
      en: "Successfully delivers projects and manages the team.",
    },
    image: "/team/pm.jpg",
  },
  {
    name: "Shohrux Kuyandikov",
    role: { uz: "Front-end Dasturchi", ru: "Front-end Разработчик", en: "Front-end Developer" },
    desc: {
      uz: "Next.js, React va TypeScript yordamida zamonaviy interfeyslar yaratadi.",
      ru: "Создает современные интерфейсы с помощью Next.js, React и TypeScript.",
      en: "Creates modern interfaces using Next.js, React and TypeScript.",
    },
    image: "/team/frontend.jpg",
  },
];

const statIcons = [Briefcase, Users, Award];

const Company = () => {
  const { language, t } = useLanguage();

  return (
    <section id="about" className="bg-[#f1f1f1]">
      <div className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block text-[#989898] font-medium tracking-widest uppercase text-sm bg-white px-4 py-2 rounded-full">
              {t.company.badge}
            </span>

            <h2 className="text-3xl md:text-4xl font-bold text-[#000000] mt-6 leading-tight">
              {t.company.title}
            </h2>

            <p className="text-[#989898] mt-6 leading-relaxed text-lg">
              {t.company.description1}
            </p>

            <p className="text-[#989898] mt-4 leading-relaxed">
              {t.company.description2}
            </p>

            <h3 className="text-lg font-semibold text-[#000000] mt-8 mb-4">
              {t.company.reasonsTitle}
            </h3>

            <ul className="space-y-4">
              {t.company.reasons.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-[#000000]">
                  <div className="w-6 h-6 bg-[#000000] rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm">
            <div className="text-center mb-10">
              <div className="w-20 h-20 bg-[#000000] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-white">W</span>
              </div>
              <h3 className="text-xl font-semibold text-[#000000]">Webgrade</h3>
              <p className="text-[#989898] text-sm mt-1">IT Solutions</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {["5+", "1k+", "3+"].map((value, i) => {
                const Icon = statIcons[i];
                const labels = [t.company.stats.projects, t.company.stats.clients, t.company.stats.experience];
                return (
                  <div key={i} className="bg-[#f1f1f1] rounded-2xl p-4 text-center">
                    <div className="w-10 h-10 bg-[#000000] rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="text-2xl md:text-3xl font-bold text-[#000000]">{value}</h4>
                    <p className="text-[#989898] text-xs md:text-sm mt-1">{labels[i]}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block text-[#989898] font-medium tracking-widest uppercase text-sm bg-[#f1f1f1] px-4 py-2 rounded-full">
              {t.company.teamBadge}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#000000] mt-6">{t.company.teamTitle}</h2>
            <p className="text-[#989898] mt-4 max-w-xl mx-auto">
              {t.company.teamDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="group relative bg-[#f1f1f1] rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300"
              >
                {member.badge && (
                  <span className="absolute top-4 left-4 bg-[#000000] text-white text-xs px-3 py-1 rounded-full font-medium">
                    {member.badge}
                  </span>
                )}

                <div className="flex justify-center mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-28 h-28 rounded-full border-4 border-[#000000] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <h3 className="text-lg font-semibold text-[#000000]">
                  {member.name}
                </h3>
                <p className="text-[#989898] text-sm mt-1 font-medium">{member.role[language]}</p>

                <p className="text-[#989898] text-sm mt-4 leading-relaxed">
                  {member.desc[language]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Company;
