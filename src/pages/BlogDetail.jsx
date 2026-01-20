import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Eye, ArrowLeft } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

const API_URL = import.meta.env.VITE_API_URL;

const BlogDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useLanguage();
    const [blog, setBlog] = useState(null);
    const [relatedBlogs, setRelatedBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBlog();
        fetchRelatedBlogs();
    }, [id]);

    const fetchBlog = async () => {
        try {
            const res = await fetch(`${API_URL}/blog/${id}`);
            const data = await res.json();
            if (data.success) {
                setBlog(data.data);
                // SEO meta tags
                document.title = `${data.data.title} | Webgrade Blog`;
                document.querySelector('meta[name="description"]')?.setAttribute('content', data.data.content.substring(0, 160));

                // Open Graph
                const ogTitle = document.querySelector('meta[property="og:title"]');
                const ogDesc = document.querySelector('meta[property="og:description"]');
                const ogImage = document.querySelector('meta[property="og:image"]');

                if (ogTitle) ogTitle.setAttribute('content', data.data.title);
                if (ogDesc) ogDesc.setAttribute('content', data.data.content.substring(0, 160));
                if (ogImage && data.data.image) ogImage.setAttribute('content', data.data.image);
            }
        } catch (err) {
            console.error("Blogni yuklashda xato:", err);
        } finally {
            setLoading(false);
        }
    };

    const fetchRelatedBlogs = async () => {
        try {
            const res = await fetch(`${API_URL}/blog?limit=10`);
            const data = await res.json();
            if (data.success && data.data) {
                // Hozirgi blogni o'chirib, random 3-4 ta blog tanlash
                const filtered = data.data.filter(b => b.id !== id);
                const shuffled = filtered.sort(() => Math.random() - 0.5);
                setRelatedBlogs(shuffled.slice(0, 4));
            }
        } catch (err) {
            console.error("Bog'liq bloglarni yuklashda xato:", err);
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

    if (loading) {
        return (
            <div className="min-h-screen bg-[#f1f1f1] flex items-center justify-center">
                <div className="text-[#989898]">Yuklanmoqda...</div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen bg-[#f1f1f1] flex items-center justify-center">
                <div className="text-center">
                    <p className="text-[#989898] mb-4">Blog topilmadi</p>
                    <button
                        onClick={() => navigate("/")}
                        className="text-[#000000] hover:text-[#989898] transition"
                    >
                        Bosh sahifaga qaytish
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#000000]">
            {/* Back Button */}
            <div className="pt-24 pb-6 px-6 max-w-7xl mx-auto">
                <button
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2 text-white hover:text-[#989898] transition text-sm"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Orqaga
                </button>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Left - Image */}
                    {blog.image && (
                        <div className="relative rounded-2xl overflow-hidden bg-gray-900 h-96 lg:h-full lg:min-h-96">
                            <img
                                src={blog.image}
                                alt={blog.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.src = "https://via.placeholder.com/600x500?text=Blog+Image";
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        </div>
                    )}

                    {/* Right - Content */}
                    <div className="flex flex-col justify-start">
                        {/* Badge */}
                        <span className="inline-block text-[#989898] text-xs font-medium tracking-widest uppercase mb-6 w-fit">
                            Blog
                        </span>

                        {/* Title */}
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            {blog.title}
                        </h1>

                        {/* Meta Info */}
                        <div className="flex items-center gap-6 pb-8 border-b border-white/10 mb-8">
                            <span className="text-white text-sm font-medium">
                                {formatDate(blog.createdAt)}
                            </span>
                            <div className="flex items-center gap-2 text-white text-sm font-medium">
                                <Eye className="w-4 h-4" />
                                <span>{blog.views}</span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="text-white/80 leading-relaxed text-base whitespace-pre-wrap">
                            {blog.content}
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Blogs */}
            {relatedBlogs.length > 0 && (
                <div className="max-w-7xl mx-auto px-6 py-16 border-t border-white/10">
                    <h2 className="text-3xl font-bold text-white mb-8">Boshqa Bloglar</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {relatedBlogs.map((relBlog) => (
                            <div
                                key={relBlog.id}
                                onClick={() => navigate(`/blog/${relBlog.id}`)}
                                className="bg-[#1a1a1a] rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer flex flex-col h-full"
                            >
                                {/* Image */}
                                {relBlog.image && (
                                    <div className="relative w-full h-40 bg-gray-800 overflow-hidden">
                                        <img
                                            src={relBlog.image}
                                            alt={relBlog.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                            onError={(e) => {
                                                e.target.src = "https://via.placeholder.com/300x200?text=Blog";
                                            }}
                                        />
                                    </div>
                                )}

                                {/* Content */}
                                <div className="p-4 flex flex-col justify-between flex-1">
                                    <div>
                                        <h3 className="text-sm font-bold text-white mb-2 line-clamp-2 group-hover:text-[#989898] transition">
                                            {relBlog.title}
                                        </h3>
                                        <p className="text-[#000000] text-xs mb-3 line-clamp-2">
                                            {relBlog.content}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between pt-3 border-t border-white/10">
                                        <span className="text-white text-xs font-medium">
                                            {formatDate(relBlog.createdAt)}
                                        </span>
                                        <div className="flex items-center gap-1 text-white text-xs font-medium">
                                            <Eye className="w-3 h-3" />
                                            <span>{relBlog.views}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default BlogDetail;
