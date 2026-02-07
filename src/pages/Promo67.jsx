import React, { useState, useEffect, useRef } from "react";
import { Send, MessageCircle, User, Phone, ArrowRight, Check, Sparkles } from "lucide-react";
import Toast from "../components/Toast";
import Squares from "../components/Squares";

const STEPS = [
  { num: "01", title: "Ariza qoldirasiz", desc: "Formani to'ldiring yoki Telegram orqali yozing — 1 daqiqa vaqtingizni oladi" },
  { num: "02", title: "Kelishuv", desc: "Loyihangiz haqida gaplashamiz, ehtiyojlaringizni aniqlaymiz" },
  { num: "03", title: "Dasturlash bosqichi", desc: "Tasdiqlangan dizayn asosida sayt kodlanadi" },
  { num: "04", title: "Sayt topshiriladi", desc: "Tayyor sayt hosting va domenga joylashtiriladi" },
];

const FEATURES = [
  { title: "1-2 sahifalik sayt", desc: "Biznesingizga kerakli barcha ma'lumotlar bir joyda — ixcham va tushunarli" },
  { title: "Mobil qurilmalarga moslashgan", desc: "Telefon, planshet va kompyuterda mukammal ishlaydi" },
  { title: "Yuklanish tezligi", desc: "Sayt 2 soniya ichida ochiladi — mijozlar kutmaydi" },
  { title: "CTA tugmalari", desc: "Qo'ng'iroq, Telegram, WhatsApp — bir bosishda aloqa" },
  { title: "Lead yig'ish formasi", desc: "Forma yoki Telegram bot orqali so'rovlarni qabul qiling" },
  { title: "SEO asoslari", desc: "Googleda topilish uchun to'g'ri struktura" },
  { title: "Hosting va domen", desc: "Saytni internetga joylab beramiz" },
  { title: "SSL sertifikat", desc: "Saytingiz xavfsiz — https bilan ishlaydi" },
];

const Promo67 = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "+998 ",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [toast, setToast] = useState(null);
  const [errors, setErrors] = useState({});
  const [visibleCards, setVisibleCards] = useState(new Set());
  const [visibleFeatures, setVisibleFeatures] = useState(new Set());
  const [visibleSteps, setVisibleSteps] = useState(new Set());
  const [formVisible, setFormVisible] = useState(false);
  const cardRefs = useRef([]);
  const featureRefs = useRef([]);
  const stepRefs = useRef([]);
  const formRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.backgroundColor = "#000000";
    document.documentElement.style.backgroundColor = "#000000";
    return () => { document.body.style.backgroundColor = ""; document.documentElement.style.backgroundColor = ""; };
  }, []);

  useEffect(() => {
    // Scroll fade-in observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.idx);
            setVisibleCards((prev) => new Set([...prev, idx]));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    cardRefs.current.forEach((el) => el && observer.observe(el));

    // Features — slide from left
    const featureObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.idx);
            setVisibleFeatures((prev) => new Set([...prev, idx]));
            featureObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    featureRefs.current.forEach((el) => el && featureObserver.observe(el));

    // Steps — slide from right
    const stepObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.idx);
            setVisibleSteps((prev) => new Set([...prev, idx]));
            stepObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    stepRefs.current.forEach((el) => el && stepObserver.observe(el));

    // Form — scale up
    const formObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setFormVisible(true);
            formObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    if (formRef.current) formObserver.observe(formRef.current);

    // Microsoft Clarity faqat /67 sahifasi uchun
    if (!window.clarity) {
      (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "vd9ruts62h");
    }
  }, []);

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => setIsSuccess(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  const scrollToForm = (e) => {
    e.preventDefault();
    document.getElementById("promo-contact")?.scrollIntoView({ behavior: "smooth" });
  };

  // Validation
  const validateName = (name) => {
    if (!name.trim()) return "Ism majburiy";
    if (name.length < 3) return "Ism kamida 3 ta harf bo'lishi kerak";
    if (name.length > 18) return "Ism 18 tadan ko'p bo'lmasligi kerak";
    if (!/^[a-zA-Za-яА-ЯёЁ\s]+$/.test(name)) return "Ism faqat harflardan iborat bo'lishi kerak";
    return "";
  };

  const validatePhone = (phone) => {
    if (!phone.trim()) return "Telefon raqami majburiy";
    if (!phone.startsWith("+998")) return "Telefon +998 bilan boshlanishi kerak";
    const raw = phone.replace(/\D/g, "").slice(3);
    if (raw.length !== 9) return "Telefon raqami to'liq emas";
    return "";
  };

  const validateMessage = (message) => {
    if (!message.trim()) return "Xabar majburiy";
    if (message.trim().length < 10) return "Xabar kamida 10 ta belgidan iborat bo'lishi kerak";
    return "";
  };

  const formatPhone = (raw) => {
    // raw = faqat raqamlar, +998 dan keyingi
    let formatted = "+998";
    if (raw.length > 0) formatted += " " + raw.slice(0, 2);
    if (raw.length > 2) formatted += " " + raw.slice(2, 5);
    if (raw.length > 5) formatted += " " + raw.slice(5, 7);
    if (raw.length > 7) formatted += " " + raw.slice(7, 9);
    return formatted;
  };

  const handlePhoneChange = (e) => {
    const input = e.target.value;
    // Barcha raqamlarni ajratib olish
    const digits = input.replace(/\D/g, "");
    // 998 dan keyingi raqamlar (max 9 ta)
    let raw;
    if (digits.startsWith("998")) {
      raw = digits.slice(3, 12);
    } else {
      raw = digits.slice(0, 9);
    }
    setFormData({ ...formData, phone: formatPhone(raw) });
    if (errors.phone) setErrors({ ...errors, phone: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    const nameError = validateName(formData.name);
    if (nameError) newErrors.name = nameError;
    const phoneError = validatePhone(formData.phone);
    if (phoneError) newErrors.phone = phoneError;
    const messageError = validateMessage(formData.message);
    if (messageError) newErrors.message = messageError;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
    const requestId = `WG-${randomPart}`;

    const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;
    const API_URL = import.meta.env.VITE_API_URL;

    const text = `\u{1F525} Promo #67 so'rov!

\u{1F194} ID: ${requestId}

\u{1F464} Ism: ${formData.name}
\u{1F4DE} Telefon: ${formData.phone}
\u{1F6E0} Xizmat: Landing page (aksiya)
\u{1F4AC} Xabar: ${formData.message}

\u{1F4C5} Sana: ${new Date().toLocaleString("uz-UZ")}`;

    try {
      await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: requestId,
          name: formData.name,
          phone: formData.phone,
          service: "Landing page (aksiya #67)",
          message: formData.message,
        }),
      });

      const response = await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: CHAT_ID, text }),
        }
      );

      const data = await response.json();

      if (data.ok) {
        if (window.clarity) {
          window.clarity("event", "promo67_submitted", {
            name: formData.name,
            requestId,
          });
        }
        setIsSuccess(true);
        sessionStorage.setItem("lastRequestId", requestId);
        setFormData({ name: "", phone: "+998 ", message: "" });
        setToast({ message: "So'rovingiz yuborildi!", type: "success" });
      } else {
        setToast({ message: "Xabar yuborilmadi. Qayta urinib ko'ring.", type: "error" });
      }
    } catch {
      setToast({ message: "Tarmoq xatosi. Internet aloqasini tekshiring.", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white overflow-x-hidden">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* ===== HERO ===== */}
      <section className="min-h-[600px] md:min-h-screen py-32 md:py-48 pb-36 md:pb-48 flex items-center justify-center px-6 relative overflow-hidden bg-[#000000]">
        <div className="absolute inset-0 opacity-[0.15]">
          <Squares
            speed={0.2}
            squareSize={40}
            direction="diagonal"
            borderColor="#888888"
            hoverFillColor="#555"
          />
        </div>

        <div className="relative z-10 text-center max-w-2xl mx-auto -mt-[20%] md:mt-0">
          <div className="inline-flex items-center gap-2 text-[#989898] text-sm font-medium tracking-widest uppercase mb-8">
            <Sparkles className="w-4 h-4" />
            <span>Cheklangan taklif</span>
          </div>

          <style>{`
            @keyframes shake {
              0%, 50%, 100% { transform: translateX(0); }
              52%, 56%, 60%, 64%, 68% { transform: translateX(-2px); }
              54%, 58%, 62%, 66%, 70% { transform: translateX(2px); }
            }
            .animate-shake {
              animation: shake 4s ease-in-out infinite;
            }
          `}</style>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            Biznesingiz{" "}
            <br className="md:hidden" />
            uchun SAYT
            <span className="block text-[#989898] line-through decoration-1 mt-2 text-2xl md:text-3xl font-normal">
              2 800 000 so'm
            </span>
            <span className="block mt-2">800 000 so'm</span>
          </h1>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#promo-contact"
              onClick={scrollToForm}
              className="inline-flex items-center justify-center gap-2 bg-white text-[#000000] font-medium px-8 py-4 rounded-xl hover:bg-[#f1f1f1] transition text-lg"
            >
              Hoziroq buyurtma berish
              <ArrowRight className="w-5 h-5 rotate-90" />
            </a>
            <a
              href="https://t.me/webgradeuz"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-white text-white font-medium px-8 py-4 rounded-xl hover:bg-white hover:text-[#000000] transition text-lg"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
              Telegram orqali bog'lanish
            </a>
          </div>

          <p className="text-[#989898] text-lg md:text-xl mt-8 animate-shake">
            Faqat 10 ta mijoz uchun
          </p>
        </div>
      </section>

      {/* ===== NIMALAR BOR ===== */}
      <section className="py-24 md:py-44 px-6 bg-[#f1f1f1] text-[#000000]">
        <div className="max-w-2xl md:max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Sayt ichida <br className="md:hidden" />nimalar bor?
          </h2>

          <ul className="space-y-5">
            {FEATURES.map((feature, i) => (
              <li
                key={i}
                ref={(el) => (featureRefs.current[i] = el)}
                data-idx={i}
                className="flex items-start gap-4 transition-all duration-600 ease-out"
                style={{
                  opacity: visibleFeatures.has(i) ? 1 : 0,
                  transform: visibleFeatures.has(i) ? "translateX(0)" : "translateX(-40px)",
                  transitionDelay: `${i * 80}ms`,
                }}
              >
                <div className="w-7 h-7 bg-[#000000] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div>
                  <span className="text-lg font-semibold">{feature.title}</span>
                  <p className="text-[#989898] text-sm mt-0.5">{feature.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== NEGA 800 MING ===== */}
      <section className="py-24 md:py-44 px-6 bg-[#000000]">
        <div className="max-w-2xl md:max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Nega 800 ming so'm?
          </h2>

          <div className="space-y-6 text-left">
            {[
              { label: "Sabab", text: "Webgrade portfolio bosqichida", desc: "Biz hozir yangi loyihalar to'plash bosqichidamiz — shuning uchun maxsus narx taklif qilamiz" },
              { label: "Asl qiymat", text: "2 800 000 so'm", desc: "Bu xizmatning haqiqiy bozor narxi — siz 70% chegirma olasiz" },
              { label: "Sifat", text: "Professional darajada", desc: "Arzon narx — past sifat degani emas. Zamonaviy texnologiyalar va toza kod" },
              { label: "Muddat", text: "3-7 kun ichida tayyor", desc: "Loyiha murakkabligiga qarab, saytingiz qisqa muddatda topshiriladi" },
              { label: "Qo'shimcha xarajat yo'q", text: "Barchasi shu narx ichida", desc: "Dizayn, dasturlash, mobilga moslashtirish — hammasi bitta narxda" },
              { label: "Muhim", text: "Narx vaqtinchalik, sifat o'zgarmaydi", desc: "10 ta joy to'lgach aksiya tugaydi va narx asl holatiga qaytadi" },
            ].map((item, i) => (
              <div
                key={i}
                ref={(el) => (cardRefs.current[i] = el)}
                data-idx={i}
                className="bg-[#111111] border border-[#989898]/10 rounded-xl p-6 transition-all duration-700 ease-out"
                style={{
                  opacity: visibleCards.has(i) ? 1 : 0,
                  transform: visibleCards.has(i) ? "translateY(0)" : "translateY(30px)",
                  transitionDelay: `${i * 100}ms`,
                }}
              >
                <span className="text-[#989898] text-sm font-medium uppercase tracking-wider">
                  {item.label}
                </span>
                <p className="text-white text-lg mt-1">{item.text}</p>
                <p className="text-[#989898] text-sm mt-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== QANDAY ISHLAYMIZ ===== */}
      <section className="py-24 md:py-44 px-6 bg-[#f1f1f1] text-[#000000]">
        <div className="max-w-2xl md:max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Qanday ishlaymiz?
          </h2>

          <div className="space-y-8">
            {STEPS.map((step, i) => (
              <div
                key={i}
                ref={(el) => (stepRefs.current[i] = el)}
                data-idx={i}
                className="flex items-start gap-6 transition-all duration-600 ease-out"
                style={{
                  opacity: visibleSteps.has(i) ? 1 : 0,
                  transform: visibleSteps.has(i) ? "translateX(0)" : "translateX(40px)",
                  transitionDelay: `${i * 120}ms`,
                }}
              >
                <span className="text-3xl font-bold text-[#989898] flex-shrink-0 w-12">
                  {step.num}
                </span>
                <div>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="text-[#989898] mt-1">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== KONTAKT FORM ===== */}
      <section id="promo-contact" className="py-24 md:py-44 px-6 bg-[#f1f1f1] text-[#000000] border-t border-[#000000] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-[20%] -translate-x-1/2 w-[80%] h-[250px] md:h-[500px]" style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(30,80,220,0.55) 0%, rgba(30,80,220,0.25) 40%, transparent 70%)', animation: 'aurora1 3s ease-in-out infinite' }} />
          <div className="absolute bottom-0 left-[75%] -translate-x-1/2 w-[80%] h-[220px] md:h-[450px]" style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(255,200,0,0.45) 0%, rgba(255,200,0,0.18) 40%, transparent 70%)', animation: 'aurora2 4s ease-in-out infinite' }} />
          <div className="absolute bottom-0 left-[50%] -translate-x-1/2 w-[100%] h-[200px] md:h-[400px]" style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(50,100,255,0.4) 0%, rgba(50,100,255,0.15) 40%, transparent 70%)', animation: 'aurora3 2.5s ease-in-out infinite' }} />
          <div className="absolute bottom-0 left-[80%] -translate-x-1/2 w-[70%] h-[280px] md:h-[550px]" style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(30,80,220,0.5) 0%, rgba(30,80,220,0.2) 35%, transparent 65%)', animation: 'aurora2 3.5s ease-in-out 0.5s infinite' }} />
          <div className="absolute bottom-0 left-[15%] -translate-x-1/2 w-[70%] h-[240px] md:h-[480px]" style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(255,180,0,0.5) 0%, rgba(255,180,0,0.2) 35%, transparent 65%)', animation: 'aurora1 2.8s ease-in-out 1s infinite' }} />
          <div className="absolute bottom-0 left-[50%] -translate-x-1/2 w-[160%] h-[180px] md:h-[350px]" style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(255,210,50,0.35) 0%, rgba(255,210,50,0.12) 40%, transparent 70%)', animation: 'aurora3 3.2s ease-in-out 0.8s infinite' }} />
        </div>
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold">Buyurtma berish</h2>
            <p className="text-[#989898] mt-3">
              Formani to'ldiring, tez orada bog'lanamiz
            </p>
          </div>

          <div
            ref={formRef}
            className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-[#989898]/20 transition-all duration-700 ease-out"
            style={{
              opacity: formVisible ? 1 : 0,
              transform: formVisible ? "scale(1)" : "scale(0.9)",
            }}
          >
            {isSuccess ? (
              <div className="text-center py-10">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">So'rovingiz yuborildi!</h3>
                <p className="text-[#989898]">Tez orada siz bilan bog'lanamiz</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#989898] group-focus-within:text-[#000000] transition" />
                  <input
                    type="text"
                    placeholder="Ismingiz"
                    className={`w-full bg-[#f1f1f1] text-[#000000] pl-12 pr-4 py-4 rounded-xl outline-none focus:ring-2 border placeholder-[#989898] transition ${
                      errors.name
                        ? "ring-red-500/30 border-red-500/30"
                        : "ring-[#000000]/20 border-[#989898]/10 focus:border-[#000000]/30"
                    }`}
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: "" });
                    }}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#989898] group-focus-within:text-[#000000] transition" />
                  <input
                    type="text"
                    placeholder="+998 33 888 01 33"
                    className={`w-full bg-[#f1f1f1] text-[#000000] pl-12 pr-4 py-4 rounded-xl outline-none focus:ring-2 border placeholder-[#989898] transition ${
                      errors.phone
                        ? "ring-red-500/30 border-red-500/30"
                        : "ring-[#000000]/20 border-[#989898]/10 focus:border-[#000000]/30"
                    }`}
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    maxLength="17"
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>

                <div className="relative group">
                  <MessageCircle className="absolute left-4 top-4 w-5 h-5 text-[#989898] group-focus-within:text-[#000000] transition" />
                  <textarea
                    placeholder="Loyihangiz haqida qisqacha..."
                    rows="4"
                    className={`w-full bg-[#f1f1f1] text-[#000000] pl-12 pr-4 py-4 rounded-xl outline-none focus:ring-2 border resize-none placeholder-[#989898] transition ${
                      errors.message
                        ? "ring-red-500/30 border-red-500/30"
                        : "ring-[#000000]/20 border-[#989898]/10 focus:border-[#000000]/30"
                    }`}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: "" });
                    }}
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`font-bold py-4 rounded-xl transition-all flex justify-center items-center gap-2 bg-[#000000] hover:bg-[#1a1a1a] text-white ${
                    isLoading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Yuborilmoqda...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      So'rov yuborish
                    </>
                  )}
                </button>

                <p className="text-[#989898] text-xs text-center mt-2">
                  Ma'lumotlaringiz xavfsiz saqlanadi
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-6 px-6 bg-[#000000] text-center">
        <style>{`
          @keyframes aurora1 {
            0%, 100% { opacity: 0.3; transform: translateX(-10%) scaleX(1); }
            50% { opacity: 0.7; transform: translateX(10%) scaleX(1.2); }
          }
          @keyframes aurora2 {
            0%, 100% { opacity: 0.2; transform: translateX(10%) scaleX(1.1); }
            50% { opacity: 0.6; transform: translateX(-10%) scaleX(0.9); }
          }
          @keyframes aurora3 {
            0%, 100% { opacity: 0.25; transform: translateX(5%) scaleX(1); }
            50% { opacity: 0.5; transform: translateX(-5%) scaleX(1.3); }
          }
        `}</style>
        <a
          href="https://t.me/webgradeuz"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 border border-[#989898]/30 text-[#989898] text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-white hover:text-[#000000] transition"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
          Telegram orqali bog'lanish
        </a>
      </footer>
    </div>
  );
};

export default Promo67;
