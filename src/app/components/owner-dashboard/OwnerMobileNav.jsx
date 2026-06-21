"use client";

import { useState } from "react";

export default function OwnerMobileNav() {
    const [active, setActive] = useState("Home");

    const items = [
        { label: "Home", icon: "dashboard" },
        { label: "Bookings", icon: "calendar_today" },
        { label: "Assets", icon: "home_work" },
        { label: "Profile", icon: "person" },
    ];

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-outline-variant/30 flex justify-around items-center py-3 z-50">
            {items.map((item, i) => (
                <>
                    {i === 2 && (
                        <div key="fab" className="relative -top-6">
                            <button className="bg-secondary text-white p-3 rounded-full shadow-lg">
                                <span className="material-symbols-outlined">add</span>
                            </button>
                        </div>
                    )}
                    <a
                        key={item.label}
                        href="#"
                        onClick={(e) => { e.preventDefault(); setActive(item.label); }}
                        className={`flex flex-col items-center gap-1 transition-colors ${active === item.label ? "text-secondary" : "text-on-surface-variant"
                            }`}
                    >
                        <span className="material-symbols-outlined">{item.icon}</span>
                        <span className="text-[10px] font-medium">{item.label}</span>
                    </a>
                </>
            ))}
        </nav>
    );
}