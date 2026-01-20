import React, { useState, useEffect } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { useNavigate } from "react-router-dom";
import { Eye, ChevronDown } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const Blog = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const itemsPerPage = 4;

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch(`${API_URL}/blog?limit=10`);

      if (!res.ok) {
        throw new Error(`API Error: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();

      if (data.success && data.data) {
        setBlogs(data.data);
      } else {
        console.warn("API success false yoki data yo'q:", data);
      }
    } catch (err) {
      console.error("Bloglarni yuklashda xato:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date)
      .toLocaleDateString("uz-UZ", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\//g, ".");
  };

  return (
    <section id="blog" className="py-12 bg-[#f1f1f1]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[#989898] font-medium tracking-widest text-sm">
            {t.blog.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 text-[#000000]">
            {t.blog.title}
          </h2>
          <p className="text-[#989898] mt-4">{t.blog.description}</p>
        </div>

        {loading ? (
          <div className="text-center text-[#989898]">Yuklanmoqda...</div>
        ) : blogs.length === 0 ? (
          <div className="text-center text-[#989898]">Bloglar topilmadi</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {blogs.slice(0, showAll ? blogs.length : itemsPerPage).map((blog) => (
                <div
                  key={blog.id}
                  onClick={() => navigate(`/blog/${blog.id}`)}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer flex flex-row h-full"
                >
                  {/* Left - Image */}
                  {blog.image && (
                    <div className="relative w-40 h-40 bg-gray-200 flex-shrink-0 overflow-hidden">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/200x200?text=No+Image";
                        }}
                      />
                    </div>
                  )}

                  {/* Right - Content */}
                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="text-base font-bold text-[#000000] mb-2 line-clamp-2 group-hover:text-[#1a1a1a] transition">
                        {blog.title}
                      </h3>
                      <p className="text-[#000000] text-sm mb-4 line-clamp-2 leading-relaxed">
                        {blog.content}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-[#989898]/10">
                      <div className="flex items-center gap-3">
                        <span className="text-[#000000] text-xs font-medium">
                          {formatDate(blog.createdAt)}
                        </span>
                        <div className="flex items-center gap-1 text-[#000000] text-xs font-medium">
                          <Eye className="w-3 h-3" />
                          <span>{blog.views}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {blogs.length > itemsPerPage && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="flex items-center gap-2 bg-[#000000] hover:bg-[#1a1a1a] text-white font-medium px-8 py-3 rounded-lg transition-all duration-300"
                >
                  {showAll ? (
                    <>
                      Kamroq ko'rish
                      <ChevronDown className="w-5 h-5 rotate-180" />
                    </>
                  ) : (
                    <>
                      Ko'proq ko'rish
                      <ChevronDown className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Blog;
