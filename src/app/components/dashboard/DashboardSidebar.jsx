"use client";

import { BookOpen, Heart, Person, Bars as Bars3Lines } from "@gravity-ui/icons";
import { Button, useDisclosure } from "@heroui/react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
    { icon: BookOpen, label: "My Bookings", href: "/dashboard/tenant/bookings" },
    { icon: Heart, label: "Favourites", href: "/dashboard/tenant/favourites" },
    { icon: Person, label: "Profile", href: "/dashboard/tenant/profile" },
];

function NavLinks({ onClose }) {
    const pathname = usePathname();

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

    return (
        <>
            {/* ── Desktop sidebar ── */}
            <aside className="hidden md:flex w-60 shrink-0 flex-col border-r border-divider bg-content1 py-6 gap-4">
                <div className="px-6 mb-2">
                    <span className="text-lg font-semibold tracking-tight">My Dashboard</span>
                </div>
                <NavLinks onClose={() => { }} />
            </aside>

            {/* ── Mobile: hamburger button ── */}
            <div className="md:hidden fixed top-20 left-4 z-40">
                <Button
                    isIconOnly
                    variant="flat"
                    size="sm"
                    aria-label="Open menu"
                    onPress={() => setOpen(true)}
                >
                    <Bars3Lines className="size-5" />
                </Button>
            </div>

            {/* ── Mobile drawer (custom, no HeroUI Drawer dependency issue) ── */}
            {open && (
                <div className="md:hidden fixed inset-0 z-50 flex">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/40"
                        onClick={() => setOpen(false)}
                    />

                    {/* Panel */}
                    <aside className="relative z-10 flex w-64 flex-col bg-white py-6 gap-4 shadow-xl">
                        <div className="flex items-center justify-between px-6 mb-2">
                            <span className="text-lg font-semibold tracking-tight">My Dashboard</span>
                            <button
                                onClick={() => setOpen(false)}
                                className="text-foreground-400 hover:text-foreground text-xl leading-none"
                                aria-label="Close menu"
                            >
                                ✕
                            </button>
                        </div>
                        <NavLinks onClose={() => setOpen(false)} />
                    </aside>
                </div>
            )}
        </>
    );
}