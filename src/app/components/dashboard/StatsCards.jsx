// app/components/dashboard/StatsCards.jsx
export default function StatsCards({ stats, onFavoritesClick }) {
    const cards = [
        {
            label: "Total Bookings",
            value: stats.totalBookings,
            icon: "book_online",
            iconBg: "bg-primary-fixed",
            iconColor: "text-on-primary-fixed",
        },
        {
            label: "Favorites",
            value: stats.favorites,
            icon: "favorite",
            iconBg: "bg-secondary-container",
            iconColor: "text-on-secondary-container",
            iconFilled: true,
            onClick: onFavoritesClick,
        },
        {
            label: "Active Rentals",
            value: stats.activeRentals,
            icon: "vpn_key",
            iconBg: "bg-tertiary-fixed",
            iconColor: "text-on-tertiary-fixed-variant",
        },
        {
            label: "Profile Status",
            badge: stats.profileComplete ? "Completed" : "Incomplete",
            icon: "account_circle",
            iconBg: "bg-surface-container",
            iconColor: "text-outline",
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map((card) => (
                <div
                    key={card.label}
                    onClick={card.onClick}
                    className={`bg-white p-6 rounded-xl shadow-[0px_4px_12px_rgba(15,23,42,0.08)] flex items-start justify-between ${card.onClick ? "cursor-pointer hover:shadow-[0px_8px_24px_rgba(15,23,42,0.12)] hover:-translate-y-0.5 transition-all duration-200" : ""
                        }`}
                >
                    <div>
                        <p className="text-xs font-medium text-on-surface-variant mb-1">{card.label}</p>
                        {card.value !== undefined ? (
                            <p className="text-2xl font-bold text-on-surface">{card.value}</p>
                        ) : (
                            <span className="inline-flex items-center gap-1 bg-secondary-container/30 text-secondary text-xs font-semibold px-3 py-1 rounded-full mt-1">
                                <span className="material-symbols-outlined" style={{ fontSize: 14, fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                {card.badge}
                            </span>
                        )}
                    </div>
                    <div className={`${card.iconBg} p-2 rounded-lg flex-shrink-0`}>
                        <span
                            className={`material-symbols-outlined ${card.iconColor}`}
                            style={card.iconFilled ? { fontVariationSettings: "'FILL' 1" } : undefined}
                        >
                            {card.icon}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}