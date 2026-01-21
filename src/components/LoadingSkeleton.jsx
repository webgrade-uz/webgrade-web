import React from "react";

export const BlogCardSkeleton = () => {
    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse flex flex-col h-full">
            {/* Image Skeleton */}
            <div className="w-full h-48 bg-gray-300" />

            {/* Content Skeleton */}
            <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                    {/* Title Skeleton */}
                    <div className="h-6 bg-gray-300 rounded mb-3 w-3/4" />
                    <div className="h-4 bg-gray-300 rounded mb-2 w-full" />
                    <div className="h-4 bg-gray-300 rounded mb-4 w-5/6" />

                    {/* Content Skeleton */}
                    <div className="space-y-2">
                        <div className="h-4 bg-gray-300 rounded w-full" />
                        <div className="h-4 bg-gray-300 rounded w-full" />
                        <div className="h-4 bg-gray-300 rounded w-4/5" />
                    </div>
                </div>

                {/* Footer Skeleton */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 mt-4">
                    <div className="h-4 bg-gray-300 rounded w-20" />
                    <div className="h-4 bg-gray-300 rounded w-16" />
                </div>
            </div>
        </div>
    );
};

export const PageLoadingSkeleton = () => {
    return (
        <div className="min-h-screen bg-[#f1f1f1] pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-6 mb-8">
                <div className="h-6 bg-gray-300 rounded w-20 animate-pulse" />
            </div>

            <div className="max-w-7xl mx-auto px-6">
                {/* Header Skeleton */}
                <div className="text-center mb-12">
                    <div className="h-12 bg-gray-300 rounded w-1/2 mx-auto mb-4 animate-pulse" />
                    <div className="h-6 bg-gray-300 rounded w-1/3 mx-auto animate-pulse" />
                </div>

                {/* Search Skeleton */}
                <div className="mb-12 max-w-2xl mx-auto">
                    <div className="h-12 bg-gray-300 rounded-xl animate-pulse" />
                </div>

                {/* Grid Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...Array(6)].map((_, i) => (
                        <BlogCardSkeleton key={i} />
                    ))}
                </div>
            </div>
        </div>
    );
};
