"use client";

import { useState } from "react";

export default function Sidebar() {
    const [sort, setSort] = useState("low-to-high");

    return (
        <aside className="w-80 hidden lg:flex flex-col bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-700 sticky top-20 h-[calc(100vh-80px)] p-6 gap-10 overflow-y-auto">
            {/* Header */}
            <div>
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-1">Find Your Nest</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Filter through thousands of verified listings.
                </p>
            </div>

            {/* Location */}
            <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Location</label>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="City, Zip, or Neighborhood"
                        className="w-full pl-4 pr-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all text-sm"
                    />
                </div>
            </div>

            {/* Property Type */}
            <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Property Type</label>
                <div className="relative">
                    <select className="w-full appearance-none pl-4 pr-10 py-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:border-emerald-500 outline-none cursor-pointer text-sm">
                        <option>All Types</option>
                        <option>Apartments</option>
                        <option>Houses</option>
                        <option>Vila</option>
                    </select>
                </div>
            </div>

            {/* Sort By */}
            <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Sort By</label>
                {[
                    { value: "low-to-high", label: "Price: Low to High" },
                    { value: "high-to-low", label: "Price: High to Low" },
                ].map((option) => (
                    <label
                        key={option.value}
                        className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${sort === option.value
                                ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950"
                                : "border-zinc-200 dark:border-zinc-700 hover:border-emerald-400 dark:hover:border-emerald-500"
                            }`}
                    >
                        <input
                            type="radio"
                            name="sort"
                            value={option.value}
                            checked={sort === option.value}
                            onChange={() => setSort(option.value)}
                            className="w-4 h-4 text-emerald-500 focus:ring-emerald-500"
                        />
                        <span className="text-sm text-zinc-700 dark:text-zinc-300">{option.label}</span>
                    </label>
                ))}
            </div>

            {/* Apply Button */}
            <button className="mt-auto bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-colors">
                Apply All Filters
            </button>
        </aside>
    );
}