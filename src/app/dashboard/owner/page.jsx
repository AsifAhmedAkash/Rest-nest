"use client";



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


// ─── Page ────────────────────────────────────────────────────────────────────

export default function OwnerDashboard() {
    // const [activeNav, setActiveNav] = useState("Dashboard");

    const toggleAmenity = (a) =>
        setAmenities((prev) =>
            prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]
        );

    return (
        <div className="bg-white min-h-screen">



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