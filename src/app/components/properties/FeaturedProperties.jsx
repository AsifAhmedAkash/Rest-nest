"use client";

import { useEffect, useState } from "react";
import { getAllProperties } from "@/lib/api/property";

export default function FeaturedProperties() {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        getAllProperties().then(data => {
            setProperties(Array.isArray(data) ? data.slice(0, 6) : []);
        });
    }, []);

    return (
        <section className="bg-white dark:bg-zinc-900 py-20 px-4 md:px-16">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-4">
                        Featured Properties
                    </h2>
                    <p className="text-zinc-500 dark:text-zinc-400 text-base max-w-2xl mx-auto">
                        Hand-picked premium listings that define luxury and comfort. Verified for quality and security.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {properties.map((p) => (
                        <div
                            key={p._id}
                            className="bg-white dark:bg-zinc-800 rounded-xl overflow-hidden shadow-[0px_4px_12px_rgba(15,23,42,0.08)] hover:shadow-[0px_12px_32px_rgba(15,23,42,0.12)] dark:shadow-[0px_4px_12px_rgba(0,0,0,0.3)] transition-all duration-300 hover:scale-[1.02] flex flex-col cursor-pointer group"
                        >
                            <div className="relative aspect-[4/3] overflow-hidden">
                                <div
                                    className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                    style={{ backgroundImage: `url('${p.images}')` }}
                                />
                                <div className="absolute top-4 left-4 bg-emerald-500/10 backdrop-blur-md text-emerald-400 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 border border-emerald-400/20">
                                    <span className="material-symbols-outlined" style={{ fontSize: 14, fontVariationSettings: "'FILL' 1" }}>verified</span>
                                    {p.status}
                                </div>
                                <div className="absolute bottom-4 left-4">
                                    <span className="bg-emerald-600 text-white px-4 py-1.5 rounded-lg text-xl font-semibold">
                                        ৳{Number(p.rent).toLocaleString()}
                                        <span className="text-xs opacity-80 font-normal">/{p.rentType === 'Monthly' ? 'mo' : p.rentType === 'Weekly' ? 'wk' : 'day'}</span>
                                    </span>
                                </div>
                            </div>

                            <div className="p-6 flex-1 flex flex-col">
                                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-1">{p.propertyTitle}</h3>
                                <div className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400 text-sm mb-4">
                                    {p.location}
                                </div>
                                <div className="mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-700 flex justify-between items-center text-zinc-500 dark:text-zinc-400">
                                    <div className="flex gap-4">
                                        {p.bedrooms && (
                                            <span className="flex items-center gap-1.5 text-sm font-semibold">
                                                <span className="material-symbols-outlined">bed</span>{p.bedrooms}
                                            </span>
                                        )}
                                        {p.bathrooms && (
                                            <span className="flex items-center gap-1.5 text-sm font-semibold">
                                                <span className="material-symbols-outlined">bathtub</span>{p.bathrooms}
                                            </span>
                                        )}
                                        {p.propertySize && (
                                            <span className="flex items-center gap-1.5 text-sm font-semibold">
                                                <span className="material-symbols-outlined">straighten</span>{p.propertySize} sqft
                                            </span>
                                        )}
                                    </div>
                                    <span className="bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 px-3 py-1 rounded text-xs font-medium">
                                        {p.propertyType}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}