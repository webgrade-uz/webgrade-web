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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBlog();
    }, [id]);

    const fetchBlog = async () => {
        try {
            const res = await fetch(`${API_URL}/blog/${id}`);
            const data = await res.json();
            if (data.success) {
                setBlog(data.data);
                // SEO uchun title o'zgartiramiz
                document.title = `${data.data.title} | Webgrade`;
            }
        } catch (err) {
            console.error("Blogni yuklashda xato:", err);
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
        <div className="min-h-screen bg-[#f1f1f1] pt-24 pb-12">
            <div className="max-w-4xl mx-auto px-6">
                {/* Back Button */}
                <button
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2 text-[#000000] hover:text-[#989898] transition mb-8"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Orqaga
                </button>

                {/* Banner */}
                {blog.image && (
                    <div className="relative w-full h-96 rounded-2xl overflow-hidden mb-8">
                        <img
                            src={`${API_URL}${blog.image}`}
                            alt={blog.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/30"></div>
                    </div>
                )}

                {/* Content */}
                <div className="bg-white rounded-2xl p-8 md:p-12">
                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl font-bold text-[#000000] mb-6">
                        {blog.title}
                    </h1>

                    {/* Meta Info */}
                    <div className="flex items-center gap-6 pb-8 border-b border-[#989898]/10 mb-8">
                        <span className="text-[#989898] text-sm">
                            {formatDate(blog.createdAt)}
                        </span>
                        <div className="flex items-center gap-2 text-[#989898] text-sm">
                            <Eye className="w-4 h-4" />
                            <span>{blog.views}</span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="text-[#000000] leading-relaxed text-lg whitespace-pre-wrap">
                        {blog.content}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;
