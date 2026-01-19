import React, { useState, useEffect } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const Blog = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch(`${API_URL}/blog?limit=6`);
      const data = await res.json();
      if (data.success) {
        setBlogs(data.data.reverse());
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
          <div className="grid grid-cols-1 gap-8">
            {blogs.slice(0, 1).map((blog) => (
              <div
                key={blog.id}
                onClick={() => navigate(`/blog/${blog.id}`)}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer flex flex-col md:flex-row"
              >
                {/* Left - Image */}
                {blog.image && (
                  <div className="relative w-full md:w-56 h-48 md:h-auto flex-shrink-0 bg-gray-200">
                    <img
                      src={`${API_URL}${blog.image}`}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                {/* Right - Content */}
                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-[#000000] mb-3 line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-[#989898] text-sm mb-6 line-clamp-4 leading-relaxed">
                      {blog.content}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[#989898]/10">
                    <span className="text-[#989898] text-sm">
                      {formatDate(blog.createdAt)}
                    </span>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-[#989898] text-sm">
                        <Eye className="w-4 h-4" />
                        <span>{blog.views}</span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/blog/${blog.id}`);
                        }}
                        className="bg-[#000000] hover:bg-[#1a1a1a] text-white p-2 rounded-lg transition"
                        title="Ko'rish"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
