// app/components/dashboard/DashboardSidebar.jsx
"use client";

const navItems = [
    { label: "Overview", icon: "dashboard" },
    { label: "My Bookings", icon: "book_online" },
    { label: "Favorites", icon: "favorite" },
    { label: "Profile", icon: "person" },
];

export default function DashboardSidebar({ activeView, setActiveView, user }) {
    return (
        <aside className="h-screen w-64 hidden md:flex flex-col fixed left-0 top-0 bg-white border-r border-outline-variant/30 z-40 py-6">
            {/* Logo */}
            <div className="px-6 mb-8">
                <span className="text-xl font-bold text-on-surface">RentNest</span>
            </div>

            {/* Profile Mini */}
            <div className="px-6 mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary-container overflow-hidden flex-shrink-0">
                        {user?.image ? (
                            <img src={user.image} alt="avatar" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-sm font-bold text-on-secondary-container">
                                {user?.name?.[0] ?? "?"}
                            </div>
                        )}
                    </div>
                    <div className="min-w-0">
                        <p className="text-sm font-semibold text-on-surface truncate">{user?.name}</p>
                        <p className="text-xs text-on-surface-variant truncate">{user?.email}</p>
                    </div>
                </div>
            </div>

            {/* Nav Links */}
            <nav className="flex-grow space-y-1 px-2">
                {navItems.map((item) => {
                    const isActive = activeView === item.label;
                    return (
                        <button
                            key={item.label}
                            onClick={() => setActiveView(item.label)}
                            className={`w-full flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-200 text-left ${isActive
                                    ? "bg-secondary-container text-on-secondary-container"
                                    : "text-on-surface-variant hover:bg-surface-container-high"
                                }`}
                        >
                            <span
                                className="material-symbols-outlined text-xl leading-none"
                                style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                            >
                                {item.icon}
                            </span>
                            <span className="text-sm font-semibold">{item.label}</span>
                        </button>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="px-2 pt-4 border-t border-outline-variant/30 space-y-1">
                {[
                    { label: "Settings", icon: "settings" },
                    { label: "Logout", icon: "logout" },
                ].map((item) => (
                    <button
                        key={item.label}
                        className="w-full flex items-center gap-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg px-4 py-3 transition-all text-left"
                    >
                        <span className="material-symbols-outlined text-xl leading-none">{item.icon}</span>
                        <span className="text-sm font-semibold">{item.label}</span>
                    </button>
                ))}
            </div>
        </aside>
    );
}