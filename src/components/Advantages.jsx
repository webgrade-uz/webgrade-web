import {
  TimerIcon,
  CheckCircleIcon,
  ShoppingCartIcon,
  UserIcon,
} from "lucide-react";
import React from "react";
import { useLanguage } from "../i18n/LanguageContext";

const icons = [TimerIcon, CheckCircleIcon, ShoppingCartIcon, UserIcon];

const Advantages = () => {
  const { t } = useLanguage();

  return (
    <section id="advantages" className="py-24 bg-white px-6">
      <div className="text-center mb-16">
        <span className="text-[#989898] font-medium tracking-widest text-sm">
          {t.advantages.badge}
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mt-4 text-[#000000]">
          {t.advantages.title}
        </h2>
        <p className="text-[#989898] mt-4">
          {t.advantages.description}
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        {t.advantages.items.map((adv, index) => {
          const Icon = icons[index];
          return (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-[#f1f1f1] rounded-xl hover:shadow-lg transition"
            >
              <div className="w-14 h-14 bg-[#000000] rounded-xl flex items-center justify-center mb-4">
                <Icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-[#000000]">{adv.title}</h3>
              <p className="text-[#989898]">{adv.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Advantages;
