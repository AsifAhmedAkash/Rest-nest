"use client";

import { useState } from "react";

// ─── Data ───────────────────────────────────────────────────────────────────

const navItems = [
    { label: "Dashboard", icon: "dashboard" },
    { label: "My Bookings", icon: "calendar_today" },
    { label: "Favorites", icon: "favorite" },
    { label: "Properties", icon: "home_work" },
    { label: "Messages", icon: "mail" },
];

const chartBars = [
    { height: "40%", active: false },
    { height: "60%", active: false },
    { height: "30%", active: false },
    { height: "80%", active: false },
    { height: "100%", active: true },
    { height: "55%", active: false },
];

const stats = [
    {
        icon: "payments",
        iconBg: "bg-secondary-container/30",
        iconColor: "text-secondary",
        label: "Total Earnings",
        value: "৳452,000",
        sub: "+12% from last month",
        subColor: "text-secondary",
        subIcon: "trending_up",
    },
    {
        icon: "home_work",
        iconBg: "bg-tertiary-fixed/30",
        iconColor: "text-on-tertiary-container",
        label: "Total Properties",
        value: "14",
        sub: "2 Pending Approval",
        subColor: "text-on-surface-variant",
    },
    {
        icon: "book_online",
        iconBg: "bg-primary-fixed/30",
        iconColor: "text-primary",
        label: "Total Bookings",
        value: "89",
        sub: "94% Completion rate",
        subColor: "text-secondary",
        subIcon: "check_circle",
    },
];

const amenityOptions = ["WiFi", "Parking", "Lift", "Security"];

const properties = [
    {
        title: "Skyline Penthouse",
        location: "Sonadanga R/A, Khulna",
        price: "৳45,000",
        rentType: "Monthly",
        type: "Apartment",
        status: "Approved",
        statusStyle: "bg-secondary-container/30 text-on-secondary-container",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBAPM_1ORDcnBM-zXSJ7GHkoghIqg6kz97LVULoSx0OmzPK_lf2XGRYiyCUP3debt3354vBQ6EwRlFdHw_HSaN0m3SjCcuSWbjPW5qc4cjNVcVNL5cAeIFSRbKBnVv8V8evutqRbY_ifofdD5w9rtwhjCBZ8WAirjOlQTOcw7Z6P-UNAT0jhfhIRVTMhMSTzIGQz2c1dJfwIZz-fROv0iCsBT6WOUFUTBDEL_b08T0QSYIDMnqOxF--lWi8p9ILb4W0aS9IltgKSY_P",
    },
    {
        title: "Green Valley Villa",
        location: "Khalishpur, Khulna",
        price: "৳120,000",
        rentType: "Monthly",
        type: "Villa",
        status: "Pending",
        statusStyle: "bg-tertiary-fixed text-on-tertiary-container",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBfPo4wVeLjtWJfnsiCjxZIM5j2Xrys5nAIxJ4Q4FyuJLdO7jWJQkR_uuR4WJIGnA0ZX6-fXUye04ykQ7X1C3aSPJIvt67KFEZj7aDHp1ZfStuenZVhiRb7PFwZjp_QyxkZmz_fX9liQ3KP_iVbXidkNqN-FQbj5ZXfvOFWr3yzM5w1BaQeR4YG1p5t7bJo7r-dE2oQhd0lDPIG97DByXNhdlvD1izLRq-ASTuJcrJW-MOhdIcYZZAvzW4MH9pmofI1q5F28_yRKFeO",
    },
    {
        title: "Royal Studio Space",
        location: "Mujgunni R/A, Khulna",
        price: "৳32,000",
        rentType: "Monthly",
        type: "Commercial",
        status: "Approved",
        statusStyle: "bg-secondary-container/30 text-on-secondary-container",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYPfPXxdNbcCOumOaK_CkLc0NVejrstBd0kmQQQqVCwcnBDk0i-llKa8VtmRhLzOGITwY1-M5Gr4nASdUOmn4ouW1lUbgnof-KwRBiTLCVE3PFQmI3GZoQ3Cze3xFN4f-kbeo-7UVcBvl6KtxY4gDfdhDX4Kh5wBHyoULhQdx2im_IeCTBgjGkkTGQkD-QXsFnEp3U3S-yLoGgtfD91P4l1lLtoqDbStdPWca8ulc2-lYP83ZCoJFgOTC2X4zWMoJ-yeo2029DdWoW",
    },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function OwnerDashboard() {
    const [activeNav, setActiveNav] = useState("Dashboard");
    const [amenities, setAmenities] = useState([]);

    const toggleAmenity = (a) =>
        setAmenities((prev) =>
            prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]
        );

    return (
        <div className="bg-white min-h-screen">

            {/* ── Sidebar ── */}
            <aside className="h-screen w-64 hidden md:flex flex-col fixed left-0 top-0 bg-white shadow-md z-40 py-6 gap-2">
                <div className="px-6 mb-8">
                    <h1 className="text-xl font-bold text-on-surface">RentNest</h1>
                </div>

                <nav className="flex-1 flex flex-col gap-1">
                    {navItems.map((item) => (
                        <a
                            key={item.label}
                            href="#"
                            onClick={(e) => { e.preventDefault(); setActiveNav(item.label); }}
                            className={`flex items-center gap-3 rounded-lg px-4 py-3 mx-2 transition-all duration-200 ${activeNav === item.label
                                ? "bg-secondary-container text-on-secondary-container"
                                : "text-on-surface-variant hover:bg-surface-container-high"
                                }`}
                        >
                            <span className="material-symbols-outlined">{item.icon}</span>
                            <span className="text-sm font-semibold">{item.label}</span>
                        </a>
                    ))}
                </nav>

                <div className="px-4 py-4 border-t border-outline-variant/30 space-y-1">
                    <div className="flex items-center gap-3 p-2">
                        <div
                            className="w-10 h-10 rounded-full bg-cover bg-center ring-2 ring-secondary/20 flex-shrink-0"
                            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBQQCtKJf45MXZfjvrpHJDXFNh3WCsNf7WxmbdQCIeEDPiZfiWKcVhnKeCh6gGMzIgdDwOMzEhhN98op-VBa-SMWjBqhJzIA7EytINo0-ZtUJfuroYbXXT879MZBILyR__fmz4Wb4ja8wqX7QLGL9WqcG4QOiyvLd7j5bT89qTJxaf7abmky6OQGDKCUJKxzNe50F37mBuVrNpgt7nTClaFEYD2btZ0xo0z4K1zMKL9Pac496mOCFf0HGY21EteMMRxb_eOmefG3tbI')" }}
                        />
                        <div>
                            <p className="text-sm font-semibold">Farhan Ahmed</p>
                            <p className="text-xs text-on-surface-variant">Owner</p>
                        </div>
                    </div>
                    <a href="#" className="flex items-center gap-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg px-4 py-3 transition-all">
                        <span className="material-symbols-outlined">settings</span>
                        <span className="text-sm font-semibold">Settings</span>
                    </a>
                    <a href="#" className="flex items-center gap-3 text-error hover:bg-error-container/20 rounded-lg px-4 py-3 transition-all">
                        <span className="material-symbols-outlined">logout</span>
                        <span className="text-sm font-semibold">Logout</span>
                    </a>
                </div>
            </aside>

            {/* ── Main ── */}
            <main className="md:ml-64 min-h-screen px-4 md:px-16 py-12 space-y-12 pb-20">

                {/* Header */}
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h2 className="text-3xl font-bold text-on-surface tracking-tight">Owner Dashboard</h2>
                        <p className="text-base text-on-surface-variant mt-1">
                            Welcome back, Farhan. Here is whats happening with your properties today.
                        </p>
                    </div>
                    <div className="flex items-center gap-4 bg-white p-3 rounded-xl shadow-sm border border-outline-variant/30">
                        <div className="text-right">
                            <p className="text-xs text-on-surface-variant">Member Since</p>
                            <p className="text-sm font-semibold">January 2022</p>
                        </div>
                        <div className="h-8 w-px bg-outline-variant" />
                        <button className="bg-secondary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:shadow-md transition-shadow active:scale-95">
                            Add New Property
                        </button>
                    </div>
                </header>

                {/* Stats */}
                <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {stats.map((s) => (
                        <div key={s.label} className="bg-white border border-outline-variant/30 p-6 rounded-2xl shadow-[0px_4px_12px_rgba(15,23,42,0.08)] flex flex-col justify-between">
                            <div>
                                <span className={`material-symbols-outlined ${s.iconColor} ${s.iconBg} p-2 rounded-lg`}>
                                    {s.icon}
                                </span>
                                <p className="mt-4 text-sm font-semibold text-on-surface-variant">{s.label}</p>
                            </div>
                            <p className="text-2xl font-bold text-on-surface mt-2">{s.value}</p>
                            <p className={`${s.subColor} text-xs font-medium flex items-center gap-1 mt-1`}>
                                {s.subIcon && <span className="material-symbols-outlined" style={{ fontSize: 16 }}>{s.subIcon}</span>}
                                {s.sub}
                            </p>
                        </div>
                    ))}

                    {/* Bar Chart */}
                    <div className="bg-white border border-outline-variant/30 p-6 rounded-2xl shadow-[0px_4px_12px_rgba(15,23,42,0.08)]">
                        <p className="text-sm font-semibold text-on-surface-variant mb-4">Monthly Earning</p>
                        <div className="flex items-end gap-2 h-24">
                            {chartBars.map((bar, i) => (
                                <div key={i} className={`w-full rounded-t-sm ${bar.active ? "bg-secondary" : "bg-secondary-container"}`} style={{ height: bar.height }} />
                            ))}
                        </div>
                        <div className="flex justify-between mt-2 text-xs text-outline">
                            <span>Jan</span><span>Jun</span>
                        </div>
                    </div>
                </section>

                {/* Form + Table */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

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

                    {/* Properties Table */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-semibold text-on-surface">My Properties</h3>
                            <div className="flex gap-2">
                                <button className="p-2 border border-outline-variant rounded-lg hover:bg-surface-container-high transition-colors">
                                    <span className="material-symbols-outlined">filter_list</span>
                                </button>
                                <button className="p-2 border border-outline-variant rounded-lg hover:bg-surface-container-high transition-colors">
                                    <span className="material-symbols-outlined">search</span>
                                </button>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-outline-variant/30 overflow-hidden shadow-sm">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-surface-container text-on-surface-variant">
                                            {["Property", "Price", "Type", "Status", "Actions"].map((col) => (
                                                <th key={col} className="px-6 py-4 text-sm font-semibold">{col}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-outline-variant/20">
                                        {properties.map((p) => (
                                            <tr key={p.title} className="hover:bg-surface-container-low transition-colors group">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-12 h-12 rounded-lg bg-cover bg-center flex-shrink-0"
                                                            style={{ backgroundImage: `url('${p.image}')` }} />
                                                        <div>
                                                            <p className="text-sm font-semibold text-on-surface">{p.title}</p>
                                                            <p className="text-xs text-on-surface-variant">{p.location}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="text-sm font-semibold">{p.price}</p>
                                                    <p className="text-xs text-outline">{p.rentType}</p>
                                                </td>
                                                <td className="px-6 py-4 text-sm">{p.type}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${p.statusStyle}`}>{p.status}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button className="p-1 hover:text-secondary transition-colors">
                                                            <span className="material-symbols-outlined">edit</span>
                                                        </button>
                                                        <button className="p-1 hover:text-error transition-colors">
                                                            <span className="material-symbols-outlined">delete</span>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <button className="flex items-center gap-2 text-sm font-semibold text-on-surface-variant hover:text-secondary transition-colors">
                                Show more properties
                                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>expand_more</span>
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            {/* ── Footer ── */}
            <footer className="md:ml-64 w-full px-4 md:px-16 py-12 bg-inverse-surface text-white">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="space-y-4">
                        <h4 className="text-xl font-bold">RentNest</h4>
                        <p className="text-sm text-white/50 max-w-xs">Connecting owners and tenants in Khulna with reliability and modern simplicity.</p>
                    </div>
                    {[
                        { title: "Quick Links", links: ["About Us", "Contact Support"] },
                        { title: "Legal", links: ["Terms of Service", "Privacy Policy"] },
                        { title: "Support", links: ["Contact Support", "FAQ"] },
                    ].map((col) => (
                        <div key={col.title} className="space-y-4">
                            <h5 className="text-sm font-semibold text-white">{col.title}</h5>
                            <ul className="space-y-2">
                                {col.links.map((l) => (
                                    <li key={l}><a href="#" className="text-sm text-white/50 hover:text-white transition-colors">{l}</a></li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="mt-8 pt-6 border-t border-white/10 text-xs text-white/30">
                    © 2024 RentNest Real Estate. All rights reserved.
                </div>
            </footer>

            {/* ── Mobile Nav ── */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-outline-variant/30 flex justify-around items-center py-3 z-50">
                {[{ label: "Home", icon: "dashboard" }, { label: "Bookings", icon: "calendar_today" }].map((item) => (
                    <a key={item.label} href="#" className="flex flex-col items-center gap-1 text-on-surface-variant">
                        <span className="material-symbols-outlined">{item.icon}</span>
                        <span className="text-[10px]">{item.label}</span>
                    </a>
                ))}
                <div className="relative -top-6">
                    <button className="bg-secondary text-white p-3 rounded-full shadow-lg">
                        <span className="material-symbols-outlined">add</span>
                    </button>
                </div>
                {[{ label: "Assets", icon: "home_work" }, { label: "Profile", icon: "person" }].map((item) => (
                    <a key={item.label} href="#" className="flex flex-col items-center gap-1 text-on-surface-variant">
                        <span className="material-symbols-outlined">{item.icon}</span>
                        <span className="text-[10px]">{item.label}</span>
                    </a>
                ))}
            </nav>

        </div>
    );
}