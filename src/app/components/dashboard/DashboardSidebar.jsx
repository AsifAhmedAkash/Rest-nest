"use client";

import { useState } from "react";

const navItems = [
    { label: "Overview", icon: "dashboard" },
    { label: "My Bookings", icon: "calendar_today" },
    { label: "Favorites", icon: "favorite" },
    { label: "Profile", icon: "person" },
];

export default function DashboardSidebar() {
    const [active, setActive] = useState("Overview");

    return (
        <aside className="h-screen w-64 hidden md:flex flex-col fixed left-0 top-0 bg-white shadow-md z-40 py-6 gap-2">
            {/* Logo */}
            <div className="px-6 mb-8">
                <span className="text-xl font-bold text-on-surface">RentNest</span>
            </div>

            {/* Profile Mini */}
            <div className="px-6 mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary-container overflow-hidden flex-shrink-0">
                        <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuASKbHwshi694KrrbLHo4osnuabLb0b6ypxyarkospKCxHHSXqG4AI8RI84DlwnpuG8i-Jpp234hqQnA49FZd3mSlBKvmvB1NL68eq68RJu1m3WSkcwY_ET7-rrUhwnj2gf4bulDnltOca14h9lvAyYkJv2wGJ53TeEoG88IDLQTrYPo2_tYgBLjMMiVVYixToJ0MZHpwhdKg3lFfvVkzt5459GgkLBjTX34l6yOBcNylgCaFIEmzGXKO4LTd6-ji_KjOGPOPZCCrbj"
                            alt="User avatar"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-on-surface">
                            Welcome back
                        </p>
                        <p className="text-xs text-on-surface-variant">
                            Manage your rentals
                        </p>
                    </div>
                </div>
            </div>

            {/* Nav Links */}
            <nav className="flex-grow space-y-1">
                {navItems.map((item) => (
                    <a
                        key={item.label}
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            setActive(item.label);
                        }}
                        className={`flex items-center gap-3 rounded-lg px-4 py-3 mx-2 transition-all duration-200 ${active === item.label
                                ? "bg-secondary-container text-on-secondary-container"
                                : "text-on-surface-variant hover:bg-surface-container-high"
                            }`}
                    >
                        <span className="material-symbols-outlined">{item.icon}</span>
                        <span className="text-sm font-semibold">{item.label}</span>
                    </a>
                ))}
            </nav>

            {/* Add Property CTA */}
            <button className="mx-4 bg-secondary text-on-secondary py-3 px-4 rounded-lg text-sm font-semibold shadow-sm hover:opacity-90 transition-all">
                Add New Property
            </button>

            {/* Footer Links */}
            <div className="border-t border-outline-variant/30 pt-4">
                {[
                    { label: "Settings", icon: "settings" },
                    { label: "Logout", icon: "logout" },
                ].map((item) => (
                    <a
                        key={item.label}
                        href="#"
                        className="flex items-center gap-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg px-4 py-3 mx-2 transition-all"
                    >
                        <span className="material-symbols-outlined">{item.icon}</span>
                        <span className="text-sm font-semibold">{item.label}</span>
                    </a>
                ))}
            </div>
        </aside>
    );
}