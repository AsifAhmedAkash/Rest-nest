"use client";

import { BookOpen, Heart, Person, Bars as Bars3Lines, House, Plus, Star, CircleDollar } from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "@/lib/auth-client";

const tenantNavItems = [
    { icon: BookOpen, label: "My Bookings", href: "/dashboard/tenant/bookings" },
    { icon: Heart, label: "Favourites", href: "/dashboard/tenant/favourites" },
    { icon: Person, label: "Profile", href: "/dashboard/tenant/profile" },
];

const ownerNavItems = [
    { icon: House, label: "My Properties", href: "/dashboard/owner/myproperty" },
    { icon: Plus, label: "Add Property", href: "/dashboard/owner/addproperty" },
    { icon: BookOpen, label: "Booking Requests", href: "/dashboard/owner/bookingrequest" },
    { icon: Person, label: "Profile", href: "/dashboard/owner/profile" },
];

const adminNavItems = [
    { icon: Person, label: "All Users", href: "/dashboard/admin/allusers" },
    { icon: House, label: "All Properties", href: "/dashboard/admin/allproperties" },
    { icon: BookOpen, label: "All Bookings", href: "/dashboard/admin/allbookings" },
    { icon: CircleDollar, label: "Transactions", href: "/dashboard/admin/transactions" },
];

function NavLinks({ onClose }) {
    const { data: session } = useSession();
    const pathname = usePathname();
    const role = session?.user?.role;

    const navItems =
        role === 'owner' ? ownerNavItems :
            role === 'admin' ? adminNavItems :
                tenantNavItems;

    return (
        <nav className="flex flex-col gap-1 px-3">
            {navItems.map(({ icon: Icon, label, href }) => {
                const active = pathname?.startsWith(href);
                return (
                    <Link
                        key={label}
                        href={href}
                        onClick={onClose}
                        className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors
                            ${active
                                ? "bg-on-primary-container text-primary-foreground"
                                : "text-foreground hover:bg-default"
                            }`}
                    >
                        <Icon className="size-5 shrink-0" />
                        {label}
                    </Link>
                );
            })}
        </nav>
    );
}

export function DashboardSidebar() {
    const [open, setOpen] = useState(false);
    const { data: session } = useSession();
    const role = session?.user?.role;

    const dashboardLabel =
        role === 'owner' ? 'Owner Dashboard' :
            role === 'admin' ? 'Admin Dashboard' :
                'My Dashboard';

    return (
        <>
            {/* Desktop sidebar */}
            <aside className="hidden md:flex w-60 shrink-0 flex-col border-r border-divider bg-content1 py-6 gap-4">
                <div className="px-6 mb-2">
                    <span className="text-lg font-semibold tracking-tight">{dashboardLabel}</span>
                    {session?.user?.name && (
                        <p className="text-xs text-zinc-400 mt-0.5">{session.user.name}</p>
                    )}
                </div>
                <NavLinks onClose={() => { }} />
            </aside>

            {/* Mobile hamburger */}
            <div className="md:hidden fixed top-20 left-4 z-40">
                <Button isIconOnly variant="flat" size="sm" aria-label="Open menu" onPress={() => setOpen(true)}>
                    <Bars3Lines className="size-5" />
                </Button>
            </div>

            {/* Mobile drawer */}
            {open && (
                <div className="md:hidden fixed inset-0 z-50 flex">
                    <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
                    <aside className="relative z-10 flex w-64 flex-col bg-white py-6 gap-4 shadow-xl">
                        <div className="flex items-center justify-between px-6 mb-2">
                            <span className="text-lg font-semibold tracking-tight">{dashboardLabel}</span>
                            <button onClick={() => setOpen(false)} className="text-foreground-400 hover:text-foreground text-xl leading-none">✕</button>
                        </div>
                        <NavLinks onClose={() => setOpen(false)} />
                    </aside>
                </div>
            )}
        </>
    );
}