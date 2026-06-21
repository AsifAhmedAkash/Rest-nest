"use client";

import { useState } from "react";

const navItems = [
    { label: "Overview", icon: "dashboard" },
    { label: "Bookings", icon: "calendar_today" },
    { label: "Saved", icon: "favorite" },
    { label: "Profile", icon: "person" },
];

export default function MobileNav() {
    const [active, setActive] = useState("Overview");

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white backdrop-blur-md border-t border-outline-variant/30 flex justify-around py-3 z-50">
            {navItems.map((item) => (
                <a
                    key={item.label}
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        setActive(item.label);
                    }}
                    className={`flex flex-col items-center gap-1 transition-colors ${active === item.label
                            ? "text-secondary"
                            : "text-on-surface-variant"
                        }`}
                >
                    <span className="material-symbols-outlined">{item.icon}</span>
                    <span
                        className={`text-[10px] ${active === item.label ? "font-bold" : ""
                            }`}
                    >
                        {item.label}
                    </span>
                </a>
            ))}
        </nav>
    );
}