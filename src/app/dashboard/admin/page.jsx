"use client";

import { useState, useEffect } from "react";
import { serverFetch } from '@/lib/core/server';
import {
    Card,
} from "@heroui/react";
import {
    House as Buildings,
    Calendar,
    Heart,
    House,
    Persons,
    ArrowUp,
} from "@gravity-ui/icons";

/* --------------------------------- helpers -------------------------------- */

function StatCard({ label, value, trend, up, icon: Icon, loading }) {
    return (
        <Card className="gap-4 rounded-xl border border-[#c6c6cd]/40 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex items-start justify-between">
                <div className="rounded-lg bg-[#dae2fd] p-2 text-[#191c1e]">
                    <Icon className="size-5" />
                </div>
                <span
                    className={`flex items-center gap-1 text-xs font-semibold ${up ? "text-[#006c49]" : "text-[#ba1a1a]"}`}
                >
                    <ArrowUp className={`size-3.5 ${up ? "" : "rotate-180"}`} />
                    {trend}%
                </span>
            </div>
            <div>
                <p className="text-sm text-[#45464d]">{label}</p>
                {loading ? (
                    <div className="mt-2 h-8 w-16 animate-pulse rounded-md bg-gray-200" />
                ) : (
                    <h3 className="mt-1 text-2xl font-bold text-[#191c1e]">{value}</h3>
                )}
            </div>
        </Card>
    );
}

/* ---------------------------------- page ---------------------------------- */

export default function AdminDashboardPage() {
    const [stats, setStats] = useState([
        { label: "Total Users", value: 0, trend: 12, up: true, icon: Persons },
        { label: "Total Owners", value: 0, trend: 8, up: true, icon: Buildings },
        { label: "Total Properties", value: 0, trend: 24, up: true, icon: House },
        { label: "Total Bookings", value: 0, trend: 3, up: false, icon: Calendar },
    ]);
    const [statsLoading, setStatsLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            serverFetch('/api/users'),
            serverFetch('/api/properties'),
            serverFetch('/api/booking'),
        ]).then(([users, properties, bookings]) => {
            const owners = users?.filter(u => u.role === 'owner') ?? [];
            setStats([
                { label: "Total Users", value: users?.length ?? 0, trend: 12, up: true, icon: Persons },
                { label: "Total Owners", value: owners.length, trend: 8, up: true, icon: Buildings },
                { label: "Total Properties", value: properties?.length ?? 0, trend: 24, up: true, icon: House },
                { label: "Total Bookings", value: bookings?.length ?? 0, trend: 3, up: false, icon: Calendar },
            ]);
        }).finally(() => setStatsLoading(false));
    }, []);

    return (
        <div className="min-h-screen bg-[#f7f9fb] text-[#191c1e]">
            <style>{`
                :root {
                    --accent: #006c49;
                    --accent-foreground: #ffffff;
                }
            `}</style>

            <main className="min-h-screen md:ml-6">
                <section className="space-y-8 p-4 md:p-12">
                    {/* Stats */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {stats.map((stat) => (
                            <StatCard key={stat.label} {...stat} loading={statsLoading} />
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}