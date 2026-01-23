import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Eye, ArrowLeft, Search } from "lucide-react";
import { PageLoadingSkeleton } from "../components/LoadingSkeleton";

const API_URL = import.meta.env.VITE_API_URL;

const BlogList = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
    const [displayCount, setDisplayCount] = useState(4);

    useEffect(() => {
        fetchBlogs();
        // Sahifaga kirganda scroll yuqoriga qaytarish
        window.scrollTo(0, 0);
    }, []);

    const fetchBlogs = async () => {
        try {
            const res = await fetch(`${API_URL}/blog?limit=100`);
            const data = await res.json();
            if (data.success && data.data) {
                setBlogs(data.data);
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

    const filteredBlogs = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const displayedBlogs = filteredBlogs.slice(0, displayCount);
    const hasMore = displayCount < filteredBlogs.length;

    if (loading) {
        return <PageLoadingSkeleton />;
    }

    return (
        <div className="min-h-screen bg-[#f1f1f1] pt-24 pb-12">
            {/* Back Button */}
            <div className="max-w-7xl mx-auto px-6 mb-8">
                <button
                    onClick={() => {
                        navigate("/");
                        setTimeout(() => {
                            document.getElementById("blog")?.scrollIntoView({ behavior: "smooth" });
                        }, 100);
                    }}
                    className="flex items-center gap-2 text-[#000000] hover:text-[#989898] transition text-sm font-medium"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Orqaga
                </button>
            </div>

            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-[#000000] mb-4">
                        Barcha Bloglar
                    </h1>
                    <p className="text-[#989898] text-lg">
                        {filteredBlogs.length} ta maqola topildi
                    </p>
                </div>

                {/* Search */}
                <div className="mb-12 max-w-2xl mx-auto">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#989898]" />
                        <input
                            type="text"
                            placeholder="Maqola qidirish..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-[#989898]/20 bg-white text-[#000000] placeholder-[#989898] focus:outline-none focus:ring-2 ring-[#000000]/20 transition"
                        />
                    </div>
                </div>

                {/* Blogs Grid */}
                {filteredBlogs.length === 0 ? (
                    <div className="text-center text-[#989898] py-12">
                        Maqolalar topilmadi
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {displayedBlogs.map((blog) => (
                                <div
                                    key={blog.id}
                                    onClick={() => navigate(`/blog/${blog.id}`)}
                                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer flex flex-col h-full"
                                >
                                    {/* Image */}
                                    {blog.image && (
                                        <div className="relative w-full h-48 bg-gray-200 overflow-hidden">
                                            <img
                                                src={blog.image.startsWith('http') ? blog.image : `${API_URL}${blog.image}`}
                                                alt={blog.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                onError={(e) => {
                                                    e.target.src = "https://via.placeholder.com/400x300?text=Blog";
                                                }}
                                            />
                                        </div>
                                    )}

                                    {/* Content */}
                                    <div className="p-6 flex flex-col justify-between flex-1">
                                        <div>
                                            <h3 className="text-lg font-bold text-[#000000] mb-2 line-clamp-2 group-hover:text-[#1a1a1a] transition">
                                                {blog.title}
                                            </h3>
                                            <p className="text-[#989898] text-sm mb-4 line-clamp-3 leading-relaxed">
                                                {blog.content}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between pt-4 border-t border-[#989898]/10">
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
                            ))}
                        </div>

                        {hasMore && (
                            <div className="flex justify-center mt-12">
                                <button
                                    onClick={() => setDisplayCount(displayCount + 4)}
                                    className="px-8 py-3 bg-[#000000] text-white rounded-xl font-medium hover:bg-[#1a1a1a] transition"
                                >
                                    Ko'proq ko'rish
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default BlogList;
