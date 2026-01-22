import React, { useState, useEffect } from "react";
import { Send, MessageCircle, User, Phone, FileText, ChevronDown, Sparkles } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import Toast from "./Toast";

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    phone: "+998",
    service: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        setIsSuccess(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  // Validation functions
  const validateName = (name) => {
    if (!name.trim()) return "Ism majburiy";
    if (name.length < 3) return "Ism kamida 3 ta harf bo'lishi kerak";
    if (name.length > 18) return "Ism 18 tadan ko'p bo'lmagan";
    if (!/^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(name)) return "Ism faqat harflardan iborat bo'lishi kerak";
    return "";
  };

  const validatePhone = (phone) => {
    if (!phone.trim()) return "Telefon raqami majburiy";

    // +998 bilan boshlanishini tekshirish
    if (!phone.startsWith("+998")) return "Telefon +998 bilan boshlanishi kerak";

    // +998 dan keyin 9 ta raqam bo'lishi kerak
    const phoneNumber = phone.replace("+998", "");
    if (!/^\d{9}$/.test(phoneNumber)) return "Telefon +998 dan keyin 9 ta raqamdan iborat bo'lishi kerak";

    // Uz mobile kodlarini tekshirish (90, 91, 92, 93, 94, 95, 97, 98, 99)
    const mobileCode = phoneNumber.substring(0, 2);
    const validCodes = ["90", "91", "92", "93", "94", "95", "97", "98", "99"];
    if (!validCodes.includes(mobileCode)) return "Noto'g'ri mobil operator kodi";

    return "";
  };

  const validateMessage = (message) => {
    if (!message.trim()) return "Xabar majburiy";
    if (message.trim().length < 10) return "Xabar kamida 10 ta belgidan iborat bo'lishi kerak";
    return "";
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value;

    // Agar +998 o'chirilsa, qayta qo'shish
    if (!value.startsWith("+998")) {
      value = "+998" + value.replace(/\D/g, "");
    }

    // Faqat +998 dan keyin 9 ta raqam qabul qil
    const phoneNumber = value.replace("+998", "");
    const limitedNumber = phoneNumber.slice(0, 9);

    // Faqat raqamlar qabul qil
    if (/^\d*$/.test(limitedNumber)) {
      setFormData({ ...formData, phone: "+998" + limitedNumber });
      if (errors.phone) setErrors({ ...errors, phone: "" });
    }
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
    setError("");

    // Validation
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Unique ID yaratish - sodda format: WG-XXXXXX
    const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
    const requestId = `WG-${randomPart}`;

    const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;
    const API_URL = import.meta.env.VITE_API_URL;

    const text = `🚀 Yangi so'rov!

🆔 ID: ${requestId}

👤 Ism: ${formData.name}
📞 Telefon: ${formData.phone}
🛠 Xizmat: ${formData.service}
💬 Xabar: ${formData.message}

📅 Sana: ${new Date().toLocaleString("uz-UZ")}`;

    try {
      // Avval API'ga ma'lumotlarni saqlash
      await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: requestId,
          name: formData.name,
          phone: formData.phone,
          service: formData.service,
          message: formData.message,
        }),
      });

      // Telegram'ga xabar yuborish
      const response = await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            text: text,
          }),
        }
      );

      const data = await response.json();

      if (data.ok) {
        setIsSuccess(true);
        sessionStorage.setItem('lastRequestId', requestId);
        setFormData({ name: "", phone: "+998", service: "", message: "" });
        setToast({
          message: t.contact.success,
          type: "success"
        });
      } else {
        setToast({ message: t.contact.error, type: "error" });
      }
    } catch (err) {
      setToast({ message: t.contact.networkError, type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="bg-[#000000] text-white py-12 px-6 md:px-20 min-h-screen flex items-center">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          requestId={toast.requestId}
          onClose={() => setToast(null)}
        />
      )}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center w-full">
        <div>
          <span className="inline-flex items-center gap-2 text-[#989898] text-sm font-medium tracking-widest uppercase mb-4">
            <Sparkles className="w-4 h-4" />
            {t.contact.badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {t.contact.title}
          </h2>
          <p className="text-[#989898] text-lg mb-8 max-w-md">
            {t.contact.description}
          </p>
          <a
            href="https://t.me/webgradeuz"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-white text-white px-6 py-3 rounded-xl hover:bg-white hover:text-[#000000] transition"
          >
            <Send className="w-5 h-5" />
            {t.contact.telegram}
          </a>
        </div>

        <div className="bg-[#111111] p-8 md:p-10 rounded-3xl border border-[#989898]/10 shadow-2xl">
          {isSuccess ? (
            <div id="success-modal" className="text-center py-10">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3">{t.contact.success}</h3>
              <p className="text-[#989898]">{t.contact.successDesc}</p>
            </div>
          ) : (
            <>
              <h3 className="text-xl font-semibold mb-6">{t.contact.formTitle}</h3>

              {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl mb-4 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#989898] group-focus-within:text-white transition" />
                  <input
                    type="text"
                    placeholder={t.contact.name}
                    className={`w-full bg-[#1a1a1a] text-white pl-12 pr-4 py-4 rounded-xl outline-none focus:ring-2 border placeholder-[#989898] transition ${errors.name
                      ? "ring-red-500/30 border-red-500/30 focus:border-red-500/30"
                      : "ring-white/30 border-[#989898]/10 focus:border-white/30"
                      }`}
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: "" });
                    }}
                  />
                  {errors.name && (
                    <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#989898] group-focus-within:text-white transition" />
                  <input
                    type="text"
                    placeholder="+998 90 123 456 789"
                    className={`w-full bg-[#1a1a1a] text-white pl-12 pr-4 py-4 rounded-xl outline-none focus:ring-2 border placeholder-[#989898] transition ${errors.phone
                      ? "ring-red-500/30 border-red-500/30 focus:border-red-500/30"
                      : "ring-white/30 border-[#989898]/10 focus:border-white/30"
                      }`}
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    maxLength="15"
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>

                <div className="relative group">
                  <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#989898] group-focus-within:text-white transition" />
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#989898] pointer-events-none" />
                  <select
                    className="w-full bg-[#1a1a1a] text-white pl-12 pr-10 py-4 rounded-xl outline-none focus:ring-2 ring-white/30 border border-[#989898]/10 focus:border-white/30 appearance-none cursor-pointer transition"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    required
                  >
                    <option value="" disabled hidden>{t.contact.selectService}</option>
                    {t.contact.serviceOptions.map((option, i) => (
                      <option key={i} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div className="relative group">
                  <MessageCircle className="absolute left-4 top-4 w-5 h-5 text-[#989898] group-focus-within:text-white transition" />
                  <textarea
                    placeholder={t.contact.message}
                    rows="4"
                    className={`w-full bg-[#1a1a1a] text-white pl-12 pr-4 py-4 rounded-xl outline-none focus:ring-2 border resize-none placeholder-[#989898] transition ${errors.message
                      ? "ring-red-500/30 border-red-500/30 focus:border-red-500/30"
                      : "ring-white/30 border-[#989898]/10 focus:border-white/30"
                      }`}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: "" });
                    }}
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-400 text-xs mt-1">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`font-bold py-4 rounded-xl transition-all flex justify-center items-center gap-2 bg-white hover:bg-[#f1f1f1] text-[#000000] ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-[#000000] border-t-transparent rounded-full animate-spin"></div>
                      {t.contact.sending}
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {t.contact.submit}
                    </>
                  )}
                </button>
              </form>

              <p className="text-[#989898] text-xs text-center mt-6">
                {t.contact.privacy}
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
