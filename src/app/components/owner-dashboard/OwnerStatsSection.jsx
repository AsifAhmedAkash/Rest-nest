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

export default function OwnerStatsSection() {
    return (
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {stats.map((s) => (
                <div
                    key={s.label}
                    className="bg-white/80 backdrop-blur-md border border-outline-variant/30 p-6 rounded-2xl shadow-[0px_4px_12px_rgba(15,23,42,0.08)] flex flex-col justify-between"
                >
                    <div>
                        <span className={`material-symbols-outlined ${s.iconColor} ${s.iconBg} p-2 rounded-lg`}>
                            {s.icon}
                        </span>
                        <p className="mt-4 text-sm font-semibold text-on-surface-variant">{s.label}</p>
                    </div>
                    <p className="text-2xl font-bold text-on-surface mt-2">{s.value}</p>
                    <p className={`${s.subColor} text-xs font-medium flex items-center gap-1 mt-1`}>
                        {s.subIcon && (
                            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
                                {s.subIcon}
                            </span>
                        )}
                        {s.sub}
                    </p>
                </div>
            ))}

            {/* Mini Bar Chart */}
            <div className="bg-white/80 backdrop-blur-md border border-outline-variant/30 p-6 rounded-2xl shadow-[0px_4px_12px_rgba(15,23,42,0.08)]">
                <p className="text-sm font-semibold text-on-surface-variant mb-4">Monthly Earning</p>
                <div className="flex items-end gap-2 h-24">
                    {chartBars.map((bar, i) => (
                        <div
                            key={i}
                            className={`w-full rounded-t-sm ${bar.active ? "bg-secondary" : "bg-secondary-container"}`}
                            style={{ height: bar.height }}
                        />
                    ))}
                </div>
                <div className="flex justify-between mt-2 text-xs text-outline">
                    <span>Jan</span>
                    <span>Jun</span>
                </div>
            </div>
        </section>
    );
}