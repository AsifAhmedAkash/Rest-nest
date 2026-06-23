import Link from "next/link";

const stats = [
    { label: "Total Bookings", value: "12", icon: "book_online", bg: "bg-primary-fixed", color: "text-on-primary-fixed" },
    { label: "Favourites", value: "8", icon: "favorite", bg: "bg-secondary-container", color: "text-on-secondary-container", filled: true, href: "/dashboard/tenant/favourites" },
    { label: "Active Rentals", value: "2", icon: "vpn_key", bg: "bg-tertiary-fixed", color: "text-on-tertiary-fixed-variant" },
    { label: "Profile Status", badge: "Complete", icon: "account_circle", bg: "bg-surface-container", color: "text-outline" },
];

const bookings = [
    { name: "Sarah Khan", email: "sarah.k@example.com", price: "$1,250", payment: "Paid", status: "Confirmed" },
    { name: "James Hossain", email: "james.h@example.com", price: "$850", payment: "Pending", status: "In Review" },
    { name: "Maria Chen", email: "maria.c@example.com", price: "$2,400", payment: "Paid", status: "Active" },
];

const activities = [
    { text: "Booked a 2-bedroom apartment in Dhaka", time: "2 hours ago", dot: "bg-secondary", ring: "ring-secondary-container/40" },
    { text: "Added 'Skyline Villa' to Favourites", time: "Yesterday", dot: "bg-primary-fixed", ring: "ring-primary-fixed/40" },
    { text: "Updated Profile Information", time: "3 days ago", dot: "bg-outline-variant", ring: "ring-outline-variant/40" },
];

const paymentStyle = {
    Paid: "bg-secondary-container/40 text-on-secondary-container",
    Pending: "bg-error-container/40 text-on-error-container",
};
const statusStyle = {
    Confirmed: "bg-primary-fixed/60 text-on-primary-fixed",
    "In Review": "bg-surface-container-high text-on-surface-variant",
    Active: "bg-primary-fixed/60 text-on-primary-fixed",
};

export default function TenantOverview() {
    return (
        <div className="space-y-10">

            {/* Welcome */}
            <div>
                <h2 className="text-2xl font-bold text-on-surface">Welcome Back 👋</h2>
                <p className="text-sm text-on-surface-variant mt-1">Here's what's happening with your rentals today.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {stats.map((s) => {
                    const card = (
                        <div className={`bg-white p-5 rounded-xl shadow-sm border border-outline-variant/20 flex items-start justify-between ${s.href ? "hover:-translate-y-0.5 hover:shadow-md transition-all cursor-pointer" : ""}`}>
                            <div>
                                <p className="text-xs font-medium text-on-surface-variant mb-1">{s.label}</p>
                                {s.value ? (
                                    <p className="text-2xl font-bold text-on-surface">{s.value}</p>
                                ) : (
                                    <span className="inline-flex items-center gap-1 bg-secondary-container/30 text-secondary text-xs font-semibold px-3 py-1 rounded-full mt-1">
                                        <span className="material-symbols-outlined" style={{ fontSize: 13, fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                        {s.badge}
                                    </span>
                                )}
                            </div>
                            <div className={`${s.bg} p-2 rounded-lg`}>
                                <span className={`material-symbols-outlined ${s.color}`} style={s.filled ? { fontVariationSettings: "'FILL' 1" } : {}}>
                                    {s.icon}
                                </span>
                            </div>
                        </div>
                    );
                    return s.href ? <Link key={s.label} href={s.href}>{card}</Link> : <div key={s.label}>{card}</div>;
                })}
            </div>

            {/* Bookings + Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Bookings table */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-base font-semibold text-on-surface">Recent Bookings</h3>
                        <Link href="/dashboard/tenant/mybookings" className="text-sm font-semibold text-secondary hover:underline">View All</Link>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-outline-variant/20 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-surface-container-low border-b border-outline-variant/20">
                                    <tr>
                                        {["Name", "Email", "Price", "Payment", "Status"].map((col) => (
                                            <th key={col} className="px-5 py-3.5 text-xs font-semibold text-on-surface-variant uppercase tracking-wide">{col}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-outline-variant/20">
                                    {bookings.map((row, i) => (
                                        <tr key={i} className="hover:bg-surface-container-low/50 transition-colors">
                                            <td className="px-5 py-4 text-sm font-medium text-on-surface">{row.name}</td>
                                            <td className="px-5 py-4 text-sm text-on-surface-variant">{row.email}</td>
                                            <td className="px-5 py-4 text-sm font-bold text-on-surface">{row.price}</td>
                                            <td className="px-5 py-4">
                                                <span className={`${paymentStyle[row.payment]} px-2.5 py-1 rounded-full text-xs font-bold`}>{row.payment}</span>
                                            </td>
                                            <td className="px-5 py-4">
                                                <span className={`${statusStyle[row.status]} px-2.5 py-1 rounded-full text-xs font-bold`}>{row.status}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Activity */}
                <div className="space-y-4">
                    <h3 className="text-base font-semibold text-on-surface">Recent Activity</h3>
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-outline-variant/20 space-y-5">
                        {activities.map((a, i) => (
                            <div key={i} className="flex gap-3">
                                <div className="relative flex-shrink-0 mt-1.5">
                                    <div className={`w-2 h-2 rounded-full ${a.dot} ring-4 ${a.ring}`} />
                                    {i < activities.length - 1 && (
                                        <div className="absolute top-3.5 left-[3px] w-px h-10 bg-outline-variant/30" />
                                    )}
                                </div>
                                <div>
                                    <p className="text-sm text-on-surface">{a.text}</p>
                                    <p className="text-xs text-on-surface-variant mt-0.5">{a.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}