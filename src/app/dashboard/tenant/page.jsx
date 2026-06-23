'use client'
import { useSession } from "@/lib/auth-client";
import Link from "next/link";

const stats = [
    { label: "Total Bookings", value: "12", icon: "book_online", bg: "bg-primary-fixed", color: "text-on-primary-fixed" },
    { label: "Favourites", value: "8", icon: "favorite", bg: "bg-secondary-container", color: "text-on-secondary-container", filled: true, href: "/dashboard/tenant/favourites" },
    { label: "Active Rentals", value: "2", icon: "vpn_key", bg: "bg-tertiary-fixed", color: "text-on-tertiary-fixed-variant" },
    { label: "Profile Status", badge: "Complete", icon: "account_circle", bg: "bg-surface-container", color: "text-outline" },
];



export default function TenantDashboardPage() {
    const { data: session, isPending } = useSession();
    if (isPending) {
        return <div>loading...</div>
    }

    const user = session?.user;
    console.log("session data", session);

    //     demo data:
    //     user
    // : 
    // createdAt
    // : 
    // Tue Jun 23 2026 13:37:49 GMT+0600 (Bangladesh Standard Time) {}
    // email
    // : 
    // "asif@asifh.asid"
    // emailVerified
    // : 
    // false
    // id
    // : 
    // "6a3a37cd1cba7f17d259488b"
    // name
    // : 
    // "asif"
    // role
    // : 
    // "owner"

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


        </div>
    );
}