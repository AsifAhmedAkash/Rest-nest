"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
const navItems = [
    { label: "Overview", icon: "dashboard", href: "/dashboard/tenant" },
    { label: "My Bookings", icon: "book_online", href: "/dashboard/tenant/mybookings" },
    { label: "Favourites", icon: "favorite", href: "/dashboard/tenant/favourites" },
    { label: "Profile", icon: "person", href: "/dashboard/tenant/profile" },
];

function getInitials(name) {
    if (!name) return "?";
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

function Sidebar({ open, onClose, user }) {
    const pathname = usePathname();

    return (
        <>
            {/* Mobile backdrop */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
                    onClick={onClose}
                />
            )}

            <aside
                className={`fixed left-0 top-0 h-screen w-64 bg-white border-r border-outline-variant/30 z-50 flex flex-col py-6 transition-transform duration-300
                    ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
            >
                {/* Logo + close */}
                <div className="px-6 mb-8 flex items-center justify-between">
                    <Link href="/" className="text-xl font-bold text-on-surface">RentNest</Link>
                    <button
                        onClick={onClose}
                        className="md:hidden p-1 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* User mini */}
                <div className="px-6 mb-6">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low">
                        <div className="w-9 h-9 rounded-full bg-secondary-container overflow-hidden flex-shrink-0 flex items-center justify-center">
                            {user?.image ? (
                                <img src={user.image} alt="avatar" className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-xs font-bold text-on-secondary-container">
                                    {getInitials(user?.name)}
                                </span>
                            )}
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm font-semibold text-on-surface truncate">{user?.name ?? "Tenant"}</p>
                            <p className="text-xs text-on-surface-variant truncate">{user?.email ?? ""}</p>
                        </div>
                    </div>
                </div>

                {/* Nav links */}
                <nav className="flex-1 px-3 space-y-1">
                    {navItems.map(({ label, icon, href }) => {
                        const isActive = pathname === href;
                        return (
                            <Link
                                key={label}
                                href={href}
                                onClick={onClose}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200
                                    ${isActive
                                        ? "bg-secondary-container text-on-secondary-container"
                                        : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                                    }`}
                            >
                                <span
                                    className="material-symbols-outlined text-xl leading-none"
                                    style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                                >
                                    {icon}
                                </span>
                                {label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom actions */}
                <div className="px-3 pt-4 border-t border-outline-variant/30 space-y-1">
                    <Link
                        href="/dashboard/tenant/settings"
                        onClick={onClose}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all"
                    >
                        <span className="material-symbols-outlined text-xl leading-none">settings</span>
                        Settings
                    </Link>
                    <button
                        onClick={() => signOut()}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-error hover:bg-error/10 transition-all"
                    >
                        <span className="material-symbols-outlined text-xl leading-none">logout</span>
                        Logout
                    </button>
                </div>
            </aside>
        </>
    );
}
export default function TenantShell({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { data: session, isPending } = useSession();
    const router = useRouter();
    const user = session?.user;

    useEffect(() => {
        if (isPending) return;
        if (!user) {
            router.replace("/auth/login");
            return;
        }
        if (user.role !== "tenant") {
            router.replace("/unauthorized");
        }
    }, [user, isPending, router]);

    if (isPending || !user || user.role !== "tenant") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-3 text-on-surface-variant">
                    <svg className="animate-spin w-8 h-8 text-secondary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    <p className="text-sm font-medium">Checking access...</p>
                </div>
            </div>
        );
    }
    return (
        <div className="flex min-h-screen bg-surface-container-low/40">
            <Sidebar
                open={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                user={user}
            />

            <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
                {/* Mobile topbar */}
                <div className="md:hidden sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-outline-variant/30 px-4 py-3 flex items-center gap-3">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-2 rounded-xl hover:bg-surface-container-high transition-colors text-on-surface-variant"
                        aria-label="Open menu"
                    >
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                    <span className="text-base font-bold text-on-surface">RentNest</span>
                </div>

                <main className="flex-1 px-4 md:px-10 py-8">
                    {children}
                </main>
            </div>
        </div>
    );
}