// Sidebar.jsx
"use client";

import { useState } from "react";

export default function Sidebar({ onFilter }) {
    const [location, setLocation] = useState('');
    const [propertyType, setPropertyType] = useState('All Types');
    const [sort, setSort] = useState('low-to-high');

    const handleApply = () => {
        onFilter({ location, propertyType, sort });
    };

    const handleReset = () => {
        setLocation('');
        setPropertyType('All Types');
        setSort('low-to-high');
        onFilter({});
    };

    return (
        <aside className="w-80 hidden lg:flex flex-col bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-700 sticky top-20 h-[calc(100vh-80px)] p-6 gap-10 overflow-y-auto">
            <div>
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-1">Find Your Nest</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Filter through verified listings.</p>
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Location</label>
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="City, Zip, or Neighborhood"
                    className="w-full pl-4 pr-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-sm"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Property Type</label>
                <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full appearance-none pl-4 pr-10 py-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:border-emerald-500 outline-none cursor-pointer text-sm"
                >
                    <option>All Types</option>
                    <option>Apartment</option>
                    <option>Villa</option>
                    <option>Commercial</option>
                    <option>House</option>
                    <option>Office</option>
                </select>
            </div>

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
                                : "border-zinc-200 dark:border-zinc-700 hover:border-emerald-400"
                            }`}
                    >
                        <input
                            type="radio"
                            name="sort"
                            value={option.value}
                            checked={sort === option.value}
                            onChange={() => setSort(option.value)}
                            className="w-4 h-4 text-emerald-500"
                        />
                        <span className="text-sm text-zinc-700 dark:text-zinc-300">{option.label}</span>
                    </label>
                ))}
            </div>

            <div className="mt-auto flex flex-col gap-2">
                <button
                    onClick={handleApply}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-4 rounded-xl text-sm font-semibold transition-colors"
                >
                    Apply Filters
                </button>
                <button
                    onClick={handleReset}
                    className="border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 px-4 py-3 rounded-xl text-sm font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                    Reset
                </button>
            </div>
        </aside>
    );
}