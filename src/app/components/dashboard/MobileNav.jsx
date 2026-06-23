// app/components/dashboard/MobileNav.jsx
"use client";

const navItems = [
    { label: "Overview", icon: "dashboard" },
    { label: "My Bookings", icon: "book_online" },
    { label: "Favorites", icon: "favorite" },
    { label: "Profile", icon: "person" },
];

export default function MobileNav({ activeView, setActiveView }) {
    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-outline-variant/30 flex justify-around py-3 z-50">
            {navItems.map((item) => {
                const isActive = activeView === item.label;
                return (
                    <button
                        key={item.label}
                        onClick={() => setActiveView(item.label)}
                        className={`flex flex-col items-center gap-1 transition-colors ${isActive ? "text-secondary" : "text-on-surface-variant"
                            }`}
                    >
                        <span
                            className="material-symbols-outlined"
                            style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                        >
                            {item.icon}
                        </span>
                        <span className={`text-[10px] ${isActive ? "font-bold" : ""}`}>
                            {item.label}
                        </span>
                    </button>
                );
            })}
        </nav>
    );
}