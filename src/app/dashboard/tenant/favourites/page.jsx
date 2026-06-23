"use client";

import { useState } from "react";

const initial = [
    { title: "Urban Loft Metropolis", location: "Dhaka, Bangladesh", price: "$2,500/mo", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDrrtQkDaZTCZOvB0LKlpd2M406y8VAS6NtK_C0fjNYpXsqAkaaWs2B2k3eAmo-4GwSNuQHTFs5e99u8ZJQOAuuBdW22gF2DNzxZGF3K5RtKIHPyvSDPIOZePvG4ycpKhlyhi6ue1XLUh8Nm-FVhAINA8CmO5tF8z-1ZfW-P-61GmlR76DnjpozUO6LBukU7Le5qM-DOXBhVs-m7paEY-Aq8nhjI7FBMQSIbuOtx8-OJENoi5sfM-sYlI2aDX5raTBPBbomJwUysF4L" },
    { title: "Skyline Vista Penthouse", location: "Gulshan, Dhaka", price: "$4,200/mo", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKIFP0LDx_nnx_aFoc27Ooe3duoTcXrrJyK2U447ZncxX6OxzlAdnb7TqBHZf55jfhBFJH3GF9Jy_JGdAeCDfp2oiphwj_B317czCFeooG7SSXSWcqwiMhuhzq_N6t4TrMtq0h0MdPL7gWAdTxsV8DhnQ2dOL_5SmBNea4U-Sc6GO5PjqcNGU1Jq_obVkBUv3CX6iDsEd1VdSZxZFSU311vTs_5dzF6r8Z1yrsnzuXoespMjdBlTnuxh-jTfWDqKiGG1ize4BM0FxH" },
    { title: "Minimalist Studio", location: "Banani, Dhaka", price: "$1,100/mo", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7t2nMRD6sMH6bSWBgI9aB2bi-37ECcviGb8dqV3waooUDmLHLRRA_Te5v4aJSIdBDv4btMzuTecfjdUSU8GzxTaeiIDmHsyHQCei0tmCxx90iRv9a80BeRFiJKcO7nC9ivsuksYOrhNXAj5YWwGdVoZDEUJRLTv5HwusD8puQ-kDMXKG6aKk-HnL4Dj7PW3LU3uAwDyFcybVYDenstkgS2ku5TzVwChDYTta4YM_-SCQgfeL54FLmzr8G6ZQD1cQBmLCdo5pTco5-" },
    { title: "Garden Family Home", location: "Uttara, Dhaka", price: "$3,800/mo", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpM7poXJEg_uZlER1y0GSyyF8XvV1sDPiPxt004-kJmlfsz-IHqyPB9pwR5z98to5t42-nbYTcQwX20bF25bSq7tRRMQCgZ5MRxSaSV2jNQcRnZ-8UIP5YjU_6J-i7TlsFCvOPiR6COGmG5X22SkX__7fTB9e3bDi-rWsP9z5tAqWuc05vdIP7JmMKFEhQ_UTXVpkQ6-sFDCeTV4-IuYVLykXLzOPBPcllAyAxyrZYQKrI2e6TU03trRmDxv21peBknsQaXbEX7_4n" },
];

export default function Favourites() {
    const [items, setItems] = useState(initial);

    const remove = (title) => setItems((prev) => prev.filter((f) => f.title !== title));

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-on-surface">Favourites</h2>
                    <p className="text-sm text-on-surface-variant mt-1">{items.length} properties saved</p>
                </div>
            </div>

            {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-on-surface-variant space-y-3">
                    <span className="material-symbols-outlined text-5xl text-outline">favorite_border</span>
                    <p className="text-sm font-medium">No favourites yet. Browse properties to save some!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {items.map((fav) => (
                        <div key={fav.title} className="group bg-white rounded-xl overflow-hidden shadow-sm border border-outline-variant/20 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                            <div className="relative aspect-[4/3] overflow-hidden">
                                <img src={fav.image} alt={fav.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <button
                                    onClick={() => remove(fav.title)}
                                    className="absolute top-3 right-3 bg-white/90 p-1.5 rounded-full shadow-sm hover:bg-error/10 transition-colors"
                                >
                                    <span className="material-symbols-outlined text-secondary" style={{ fontSize: 18, fontVariationSettings: "'FILL' 1" }}>favorite</span>
                                </button>
                                <div className="absolute bottom-3 left-3 bg-secondary text-on-secondary text-xs font-semibold px-2.5 py-1 rounded-lg">
                                    {fav.price}
                                </div>
                            </div>
                            <div className="p-4 space-y-2">
                                <h4 className="text-sm font-semibold text-on-surface">{fav.title}</h4>
                                <div className="flex items-center gap-1 text-on-surface-variant">
                                    <span className="material-symbols-outlined" style={{ fontSize: 14 }}>location_on</span>
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