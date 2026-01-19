import React, { useState, useEffect } from "react";
import { CheckCircle, Users, Briefcase, Award } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const statIcons = [Briefcase, Users, Award];

const Company = () => {
  const { language, t } = useLanguage();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await fetch(`${API_URL}/employee?limit=100`);
      const data = await res.json();
      if (data.success) {
        setEmployees(data.data.reverse());
      }
    } catch (err) {
      console.error('Xodimlarni yuklashda xato:', err);
    } finally {
      setLoading(false);
    }
  };

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

      {/* <div className="py-24 bg-white">
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
            {employees.map((member) => (
              <div
                key={member.id}
                className="group relative bg-[#f1f1f1] rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300"
              >
                {member.role && (
                  <span className="absolute top-4 left-4 bg-[#000000] text-white text-xs px-3 py-1 rounded-full font-medium">
                    {member.role}
                  </span>
                )}

                <div className="flex justify-center mb-6">
                  {member.image ? (
                    <img
                      src={`${API_URL}${member.image}`}
                      alt={member.fullName}
                      className="w-28 h-28 rounded-full border-4 border-[#000000] object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-28 h-28 rounded-full border-4 border-[#000000] bg-blue-600 flex items-center justify-center text-white text-3xl font-bold">
                      {member.fullName.charAt(0)}
                    </div>
                  )}
                </div>

                <h3 className="text-lg font-semibold text-[#000000]">
                  {member.fullName}
                </h3>
                <p className="text-[#989898] text-sm mt-1 font-medium">{member.position}</p>

                <p className="text-[#989898] text-sm mt-4 leading-relaxed">
                  {member.about || member.position}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div> */}
    </section>
  );
};

export default Company;
