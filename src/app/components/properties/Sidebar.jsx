"use client";

import { useState } from "react";

export default function Sidebar() {
    const [sort, setSort] = useState("low-to-high");

    return (
        <aside className="w-80 hidden lg:flex flex-col bg-white border-r border-outline-variant/20 sticky top-20 h-[calc(100vh-80px)] p-6 gap-10 overflow-y-auto">
            {/* Header */}
            <div>
                <h3 className="text-xl font-semibold mb-1">Find Your Nest</h3>
                <p className="text-sm text-on-surface-variant">
                    Filter through thousands of verified listings.
                </p>
            </div>

            {/* Location */}
            <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold">Location</label>
                <div className="relative">

                    <input
                        type="text"
                        placeholder="City, Zip, or Neighborhood"
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-outline-variant bg-surface-bright focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all text-sm"
                    />
                </div>
            </div>

            {/* Property Type */}
            <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold">Property Type</label>
                <div className="relative">
                    <select className="w-full appearance-none pl-4 pr-10 py-3 rounded-lg border border-outline-variant bg-surface-bright focus:border-secondary outline-none cursor-pointer text-sm">
                        <option>All Types</option>
                        <option>Apartments</option>
                        <option>Houses</option>
                        <option>Vila</option>

                    </select>

                </div>
            </div>

            {/* Sort By */}
            <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold">Sort By</label>
                {[
                    { value: "low-to-high", label: "Price: Low to High" },
                    { value: "high-to-low", label: "Price: High to Low" },
                ].map((option) => (
                    <label
                        key={option.value}
                        className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${sort === option.value
                            ? "border-secondary"
                            : "border-outline-variant hover:border-secondary"
                            }`}
                    >
                        <input
                            type="radio"
                            name="sort"
                            value={option.value}
                            checked={sort === option.value}
                            onChange={() => setSort(option.value)}
                            className="w-4 h-4 text-secondary focus:ring-secondary"
                        />
                        <span className="text-sm">{option.label}</span>
                    </label>
                ))}
            </div>

            {/* Apply Button */}
            <button className="mt-auto bg-primary-container text-on-primary-container px-4 py-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                {/* <span className="material-symbols-outlined">filter_list</span> */}
                Apply All Filters
            </button>
        </aside>
    );
}