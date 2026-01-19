import React from "react";
import {
  Globe,
  Database,
  Smartphone,
  Bot,
  Headphones,
  Code,
} from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

const icons = [Globe, Database, Smartphone, Bot, Headphones, Code];

const Services = () => {
  const { t } = useLanguage();

  return (
    <section id="services" className="py-24 bg-[#f1f1f1] scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[#989898] font-medium tracking-widest text-sm">
            {t.services.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 text-[#000000]">
            {t.services.title}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.services.items.map((service, index) => {
            const Icon = icons[index];
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#000000] text-white mb-6">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[#000000]">{service.title}</h3>
                <p className="text-[#989898] mb-6">{service.desc}</p>
                <ul className="space-y-3">
                  {service.prices.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-[#000000]">{item.name}</span>
                      <span className="bg-[#f1f1f1] text-[#000000] px-3 py-1 rounded-full text-xs font-medium">
                        {item.price}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
