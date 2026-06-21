const stats = [
    {
        label: "Total Bookings",
        value: "12",
        icon: "book_online",
        iconBg: "bg-primary-fixed",
        iconColor: "text-on-primary-fixed",
    },
    {
        label: "Favorites",
        value: "8",
        icon: "favorite",
        iconBg: "bg-secondary-container",
        iconColor: "text-on-secondary-container",
        iconFilled: true,
    },
    {
        label: "Active Rentals",
        value: "2",
        icon: "vpn_key",
        iconBg: "bg-tertiary-fixed",
        iconColor: "text-on-tertiary-fixed-variant",
    },
    {
        label: "Profile Status",
        value: null,
        badge: "Completed",
        icon: "account_circle",
        iconBg: "bg-surface-container",
        iconColor: "text-outline",
    },
];

export default function StatsCards() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
                <div
                    key={stat.label}
                    className="bg-white p-6 rounded-xl shadow-[0px_4px_12px_rgba(15,23,42,0.08)] flex items-start justify-between"
                >
                    <div>
                        <p className="text-xs font-medium text-on-surface-variant mb-1">
                            {stat.label}
                        </p>
                        {stat.value ? (
                            <p className="text-2xl font-semibold text-on-surface">
                                {stat.value}
                            </p>
                        ) : (
                            <span className="text-secondary text-sm font-semibold inline-flex items-center gap-1 bg-secondary-container/30 px-3 py-1 rounded-full mt-2">
                                <span
                                    className="material-symbols-outlined"
                                    style={{ fontSize: 16 }}
                                >
                                    check_circle
                                </span>
                                {stat.badge}
                            </span>
                        )}
                    </div>
                    <div className={`${stat.iconBg} p-2 rounded-lg`}>
                        <span
                            className={`material-symbols-outlined ${stat.iconColor}`}
                            style={
                                stat.iconFilled
                                    ? { fontVariationSettings: "'FILL' 1" }
                                    : undefined
                            }
                        >
                            {stat.icon}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}