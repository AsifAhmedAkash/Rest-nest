'use client'
import React from 'react';
const amenityOptions = ["WiFi", "Parking", "Lift", "Security"];
import { useState } from "react";
const AddProperty = () => {
    const [amenities, setAmenities] = useState([]);

    return (
        <div>
            {/* Add Property Form */}
            <div className="lg:col-span-1 bg-white border border-outline-variant/30 p-6 rounded-2xl shadow-[0px_4px_12px_rgba(15,23,42,0.08)] sticky top-6">
                <h3 className="text-xl font-semibold mb-6">Add New Property</h3>
                <form onSubmit={(e) => { e.preventDefault(); alert("Listing submitted for verification!"); }} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-on-surface-variant mb-1">Property Title</label>
                        <input type="text" placeholder="e.g. Modern Apartment in Sonadanga"
                            className="w-full rounded-lg border border-outline-variant bg-white px-3 py-2 text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all" />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-semibold text-on-surface-variant mb-1">Location</label>
                            <input type="text" value="Khulna, Bangladesh" disabled
                                className="w-full rounded-lg border border-outline-variant bg-surface-container-low px-3 py-2 text-sm text-on-surface-variant" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-on-surface-variant mb-1">Property Type</label>
                            <select className="w-full rounded-lg border border-outline-variant bg-white px-3 py-2 text-sm focus:outline-none focus:border-secondary">
                                <option>Apartment</option><option>Villa</option><option>Commercial</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-semibold text-on-surface-variant mb-1">Rent Type</label>
                            <select className="w-full rounded-lg border border-outline-variant bg-white px-3 py-2 text-sm focus:outline-none focus:border-secondary">
                                <option>Monthly</option><option>Daily</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-on-surface-variant mb-1">Price (৳)</label>
                            <input type="number" placeholder="25,000"
                                className="w-full rounded-lg border border-outline-variant bg-white px-3 py-2 text-sm focus:outline-none focus:border-secondary" />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                        {[{ label: "Size (sqft)", placeholder: "1200", type: "text" }, { label: "Beds", placeholder: "3", type: "number" }, { label: "Baths", placeholder: "2", type: "number" }].map((f) => (
                            <div key={f.label}>
                                <label className="block text-xs font-semibold text-on-surface-variant mb-1">{f.label}</label>
                                <input type={f.type} placeholder={f.placeholder}
                                    className="w-full rounded-lg border border-outline-variant bg-white px-2 py-2 text-sm focus:outline-none focus:border-secondary" />
                            </div>
                        ))}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-on-surface-variant mb-2">Amenities</label>
                        <div className="grid grid-cols-2 gap-2">
                            {amenityOptions.map((a) => (
                                <label key={a} className="flex items-center gap-2 text-sm cursor-pointer">
                                    <input type="checkbox" checked={amenities.includes(a)} onChange={() => toggleAmenity(a)}
                                        className="rounded text-secondary focus:ring-secondary" />
                                    {a}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-on-surface-variant mb-1">Property Image URL</label>
                        <input type="text" placeholder="https://..."
                            className="w-full rounded-lg border border-outline-variant bg-white px-3 py-2 text-sm focus:outline-none focus:border-secondary" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-on-surface-variant mb-1">Details</label>
                        <textarea rows={3} placeholder="Describe the property..."
                            className="w-full rounded-lg border border-outline-variant bg-white px-3 py-2 text-sm focus:outline-none focus:border-secondary resize-none" />
                    </div>

                    <button type="submit"
                        className="w-full bg-secondary text-white py-3 rounded-xl text-base font-semibold hover:opacity-90 transition-all shadow-lg shadow-secondary/10 active:scale-95">
                        Submit Listing
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProperty;