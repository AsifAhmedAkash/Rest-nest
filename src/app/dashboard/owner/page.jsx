"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { getMyProperty } from "@/lib/api/property";
import { getBookingsByOwner } from "@/lib/api/payment";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function OwnerDashboard() {
    const { data: session } = useSession();
    const [properties, setProperties] = useState([]);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        if (session?.user?.id) {
            getMyProperty(session.user.id).then(data => setProperties(Array.isArray(data) ? data : []));
            getBookingsByOwner(session.user.id).then(data => setBookings(Array.isArray(data) ? data : []));
        }
    }, [session]);

    const totalEarnings = bookings
        .filter(b => b.status === 'succeeded')
        .reduce((sum, b) => sum + Number(b.amount ?? 0), 0);

    const totalBookings = bookings.length;
    const totalProperties = properties.length;
    const pendingProperties = properties.filter(p => p.status === 'Pending').length;

    // group earnings by month
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyMap = {};
    bookings.forEach(b => {
        if (!b.paidAt) return;
        const month = monthNames[new Date(b.paidAt).getMonth()];
        monthlyMap[month] = (monthlyMap[month] ?? 0) + Number(b.amount ?? 0);
    });
    const chartData = monthNames
        .filter(m => monthlyMap[m])
        .map(m => ({ month: m, amount: monthlyMap[m] }));

    const stats = [
        {
            icon: "payments",
            iconBg: "bg-secondary-container/30",
            iconColor: "text-secondary",
            label: "Total Earnings",
            value: `৳${totalEarnings.toLocaleString()}`,
            sub: `From ${totalBookings} payments`,
            subColor: "text-secondary",
            subIcon: "trending_up",
        },
        {
            icon: "home_work",
            iconBg: "bg-tertiary-fixed/30",
            iconColor: "text-on-tertiary-container",
            label: "Total Properties",
            value: totalProperties,
            sub: `${pendingProperties} Pending Approval`,
            subColor: "text-on-surface-variant",
        },
        {
            icon: "book_online",
            iconBg: "bg-primary-fixed/30",
            iconColor: "text-on-primary-container",
            label: "Total Bookings",
            value: totalBookings,
            sub: `${bookings.filter(b => b.bookingStatus === 'Confirmed').length} Confirmed`,
            subColor: "text-secondary",
            subIcon: "check_circle",
        },
    ];

    return (
        <div className="bg-white dark:bg-zinc-800 min-h-screen text-on-surface dark:text-white">
            <main className="md:ml-4 min-h-screen px-4 md:px-16 py-12 space-y-12 pb-20">

                {/* Header */}
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Owner Dashboard</h2>
                        <p className="text-base text-on-surface-variant dark:text-zinc-400 mt-1">
                            Welcome back, {session?.user?.name}. Heres whats happening with your properties today.
                        </p>
                    </div>
                </header>

                {/* Stats */}
                <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {stats.map((s) => (
                        <div key={s.label} className="bg-white dark:bg-zinc-900 border border-outline-variant/30 dark:border-zinc-700 p-6 rounded-2xl shadow-[0px_4px_12px_rgba(15,23,42,0.08)] flex flex-col justify-between">
                            <div>
                                <span className={`material-symbols-outlined ${s.iconColor} ${s.iconBg} p-2 rounded-lg`}>
                                    {s.icon}
                                </span>
                                <p className="mt-4 text-sm font-semibold text-on-surface-variant dark:text-zinc-400">{s.label}</p>
                            </div>
                            <p className="text-2xl font-bold mt-2">{s.value}</p>
                            <p className={`${s.subColor} text-xs font-medium flex items-center gap-1 mt-1`}>
                                {s.subIcon && <span className="material-symbols-outlined" style={{ fontSize: 16 }}>{s.subIcon}</span>}
                                {s.sub}
                            </p>
                        </div>
                    ))}

                    {/* Bar Chart */}
                    <div className="bg-white dark:bg-zinc-900 border border-outline-variant/30 dark:border-zinc-700 p-6 rounded-2xl shadow-[0px_4px_12px_rgba(15,23,42,0.08)]">
                        <p className="text-sm font-semibold text-on-surface-variant dark:text-zinc-400 mb-4">Monthly Earnings</p>
                        {chartData.length === 0 ? (
                            <div className="h-24 flex items-center justify-center text-xs text-zinc-400">No data yet</div>
                        ) : (
                            <ResponsiveContainer width="100%" height={96}>
                                <BarChart data={chartData} barSize={16}>
                                    <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#76777d' }} axisLine={false} tickLine={false} />
                                    <YAxis hide />
                                    <Tooltip
                                        formatter={(value) => [`৳${Number(value).toLocaleString()}`, 'Earnings']}
                                        contentStyle={{ fontSize: 12, borderRadius: 8 }}
                                    />
                                    <Bar dataKey="amount" fill="#006c49" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </section>

            </main>
        </div>
    );
}