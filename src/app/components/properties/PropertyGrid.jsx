// PropertyGrid.jsx
"use client";

import { useState, useEffect } from "react";
import { Bookmark, TriangleRight, TriangleLeft } from '@gravity-ui/icons';
import { getAllProperties } from "@/lib/api/property";

function PropertyCard({ property }) {
    return (
        <div className="group bg-white dark:bg-zinc-800 rounded-xl overflow-hidden shadow-[0px_4px_12px_rgba(15,23,42,0.08)] hover:shadow-[0px_12px_32px_rgba(15,23,42,0.12)] dark:shadow-[0px_4px_12px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-1">
            <div className="relative aspect-[4/3] overflow-hidden">
                <img
                    src={property.images}
                    alt={property.propertyTitle}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => { e.target.src = 'https://placehold.co/400x300?text=No+Image' }}
                />
                <div className="absolute top-4 left-4">
                    <span className={`backdrop-blur-md text-xs font-semibold px-3 py-1 rounded-full border ${property.status === 'Approved'
                            ? 'bg-emerald-500/20 text-white border-emerald-400/30'
                            : 'bg-yellow-500/20 text-white border-yellow-400/30'
                        }`}>
                        {property.status}
                    </span>
                </div>
                <button className="absolute top-4 right-4 w-10 h-10 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-emerald-500 transition-colors">
                    <Bookmark className="w-5 h-5" />
                </button>
            </div>

            <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {property.propertyTitle}
                    </h3>
                    <span className="text-xl font-semibold text-emerald-600 dark:text-emerald-400 whitespace-nowrap ml-2">
                        ৳{Number(property.rent).toLocaleString()}
                        <span className="text-sm font-normal text-zinc-500 dark:text-zinc-400">/{property.rentType === 'Monthly' ? 'mo' : property.rentType === 'Weekly' ? 'wk' : 'day'}</span>
                    </span>
                </div>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-6">{property.location}</p>
                <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-700 pt-4">
                    <div className="flex items-center gap-4 text-zinc-500 dark:text-zinc-400">
                        {property.bedrooms && (
                            <div className="flex items-center gap-1.5">
                                <span className="material-symbols-outlined" style={{ fontSize: 14 }}>bed</span>
                                <span className="text-sm font-semibold">{property.bedrooms}</span>
                            </div>
                        )}
                        {property.bathrooms && (
                            <div className="flex items-center gap-1.5">
                                <span className="material-symbols-outlined" style={{ fontSize: 14 }}>bathtub</span>
                                <span className="text-sm font-semibold">{property.bathrooms}</span>
                            </div>
                        )}
                        {property.propertySize && (
                            <div className="flex items-center gap-1.5">
                                <span className="material-symbols-outlined" style={{ fontSize: 14 }}>straighten</span>
                                <span className="text-sm font-semibold">{property.propertySize} sqft</span>
                            </div>
                        )}
                    </div>
                    <span className="bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 px-3 py-1 rounded text-xs font-medium">
                        {property.propertyType}
                    </span>
                </div>
            </div>
        </div>
    );
}

const ITEMS_PER_PAGE = 6;

export default function PropertyGrid({ filters }) {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setLoading(true);
        getAllProperties(filters)
            .then(data => {
                setProperties(Array.isArray(data) ? data : []);
                setCurrentPage(1);
            })
            .finally(() => setLoading(false));
    }, [filters]);

    const totalPages = Math.ceil(properties.length / ITEMS_PER_PAGE);
    const paginated = properties.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    return (
        <section className="flex-1 px-4 md:px-16 py-12 bg-zinc-50 dark:bg-zinc-900">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div>
                    <h1 className="text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-2">All Properties</h1>
                    <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl">
                        Discover hand-picked, premium rentals managed with absolute security and transparency.
                    </p>
                </div>
                <span className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
                    Showing {properties.length} properties
                </span>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="rounded-xl bg-zinc-200 dark:bg-zinc-800 animate-pulse aspect-[4/3]" />
                    ))}
                </div>
            ) : paginated.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                    <span className="material-symbols-outlined text-6xl text-zinc-300 dark:text-zinc-600 mb-4">search_off</span>
                    <p className="text-zinc-500 dark:text-zinc-400">No properties match your filters.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {paginated.map((p) => (
                        <PropertyCard key={p._id} property={p} />
                    ))}
                </div>
            )}

            {totalPages > 1 && (
                <div className="mt-20 flex items-center justify-center gap-2">
                    <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="w-10 h-10 rounded-lg border border-zinc-200 dark:border-zinc-700 flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-colors disabled:opacity-40"
                    >
                        <TriangleLeft />
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`w-10 h-10 rounded-lg text-sm font-semibold transition-colors ${currentPage === i + 1
                                    ? "bg-emerald-600 text-white"
                                    : "border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="w-10 h-10 rounded-lg border border-zinc-200 dark:border-zinc-700 flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-colors disabled:opacity-40"
                    >
                        <TriangleRight />
                    </button>
                </div>
            )}
        </section>
    );
}