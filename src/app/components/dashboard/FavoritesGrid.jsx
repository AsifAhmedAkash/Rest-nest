// app/components/dashboard/FavoritesGrid.jsx
"use client";

import { useState } from "react";

export default function FavoritesGrid({ favorites: initialFavorites = [] }) {
    const [favorites, setFavorites] = useState(initialFavorites);

    const remove = (title) => setFavorites((prev) => prev.filter((f) => f.title !== title));

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-on-surface">Favorites</h3>
                <p className="text-sm text-on-surface-variant">{favorites.length} saved</p>
            </div>

            {favorites.length === 0 ? (
                <div className="text-center py-20 text-on-surface-variant">
                    <span className="material-symbols-outlined text-5xl mb-3 block">favorite_border</span>
                    <p className="text-sm">No favorites yet. Browse properties to save some!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {favorites.map((fav) => (
                        <div key={fav.title} className="group bg-white rounded-xl overflow-hidden shadow-[0px_4px_12px_rgba(15,23,42,0.08)] hover:shadow-[0px_12px_32px_rgba(15,23,42,0.12)] hover:-translate-y-1 transition-all duration-300">
                            <div className="relative aspect-[4/3] overflow-hidden">
                                <img src={fav.image} alt={fav.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <button onClick={() => remove(fav.title)} className="absolute top-3 right-3 bg-white/90 p-2 rounded-full shadow-sm hover:bg-error/10 transition-colors">
                                    <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1", fontSize: 18 }}>favorite</span>
                                </button>
                                <div className="absolute bottom-3 left-3 bg-secondary text-on-secondary text-xs font-semibold px-3 py-1 rounded-lg">
                                    {fav.price}
                                </div>
                            </div>
                            <div className="p-4 space-y-2">
                                <h4 className="text-sm font-semibold text-on-surface">{fav.title}</h4>
                                <div className="flex items-center gap-1 text-on-surface-variant">
                                    <span className="material-symbols-outlined" style={{ fontSize: 15 }}>location_on</span>
                                    <p className="text-xs">{fav.location}</p>
                                </div>
                                <div className="pt-2 flex justify-between border-t border-outline-variant/20">
                                    <button className="text-xs font-semibold text-secondary hover:underline">View Details</button>
                                    <button onClick={() => remove(fav.title)} className="text-xs font-semibold text-error hover:underline">Remove</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}