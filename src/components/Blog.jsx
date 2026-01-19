import React, { useState, useEffect } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { Eye, X } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const Blog = () => {
  const { t } = useLanguage();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null);

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

  const openBlog = async (blog) => {
    try {
      const res = await fetch(`${API_URL}/blog/${blog.id}`);
      const data = await res.json();
      if (data.success) {
        setSelectedBlog(data.data);
      }
    } catch (err) {
      console.error("Blogni yuklashda xato:", err);
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
    <section id="blog" className="py-24 bg-[#f1f1f1]">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {blogs.map((blog) => (
              <div
                key={blog.id}
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
                        onClick={() => openBlog(blog)}
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

      {/* Detail Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
            {/* Banner Section */}
            <div className="relative w-full h-80 bg-gray-200">
              {selectedBlog.image && (
                <img
                  src={`${API_URL}${selectedBlog.image}`}
                  alt={selectedBlog.title}
                  className="w-full h-full object-cover"
                />
              )}

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/40"></div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedBlog(null)}
                className="absolute top-6 right-6 bg-white/90 hover:bg-white text-[#000000] p-2 rounded-lg transition z-10"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Title & Meta on Banner */}
              <div className="absolute inset-0 flex flex-col justify-end p-12 text-white">
                <h1 className="text-5xl font-bold mb-4">
                  {selectedBlog.title}
                </h1>
                <div className="flex items-center gap-6">
                  <p className="text-base opacity-90">
                    {formatDate(selectedBlog.createdAt)}
                  </p>
                  <div className="flex items-center gap-2 text-base opacity-90">
                    <Eye className="w-5 h-5" />
                    <span>{selectedBlog.views}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-12">
              <div className="text-[#000000] leading-relaxed text-base whitespace-normal">
                {selectedBlog.content}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Blog;
