"use client";

import { useSession, signOut } from "@/lib/auth-client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { data: session, isPending } = useSession();
    const dropdownRef = useRef(null);
    const pathname = usePathname();
    const router = useRouter()
    const user = session?.user;

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = async () => {
        await signOut();
        setDropdownOpen(false);
        router.push('/auth/signin');
    };

    const getInitials = (name) => {
        if (!name) return "?";
        return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
    };

    const navLinks = [
        { label: "Home", href: "/" },
        { label: "All Properties", href: "/allpoperties" },
        { label: "Services", href: "/blogspage" },

    ];

    const dashboardLinks = {
        tenant: '/dashboard/tenant',
        owner: '/dashboard/owner',
        admin: '/dashboard/admin'
    }

    if (user?.email) {
        navLinks.push({
            label: 'Dashboard',
            href: dashboardLinks[user?.role || 'tenant']
        })
    }

    const dropdownLinks = [
        // { label: "My Profile", icon: "person", href: "/dashboard" },
        { label: "My Listings", icon: "home", href: "/" },
    ];

    return (
        <header
            className={`bg-surface/80 backdrop-blur-md sticky top-0 z-50 border-b border-outline-variant/30 flex justify-between items-center w-full px-4 md:px-16 py-4 transition-shadow ${scrolled ? "shadow-md" : "shadow-sm"
                }`}
        >
            {/* Logo */}
            <Link href="/" className="flex items-center">
                <span
                    className=" text-secondary text-3xl"

                >
                    Rent
                </span>
                <span className="text-3xl font-bold text-on-surface">Nest</span>
            </Link>

            {/* Nav Links */}
            <nav className="hidden md:flex items-center gap-8">
                {navLinks.map(({ label, href }) => {
                    const isActive = pathname === href;
                    return (
                        <Link
                            key={label}
                            href={href}
                            className={`text-sm font-semibold transition-colors duration-200 pb-1 ${isActive
                                ? "text-secondary border-b-2 border-secondary"
                                : "text-on-surface-variant hover:text-secondary"
                                }`}
                        >
                            {label}
                        </Link>
                    );
                })}
            </nav>

            {/* CTA / Auth Area */}
            <div className="flex items-center gap-4">
                <ThemeToggle></ThemeToggle>
                <div>
                    {isPending ? (
                        <div className="flex items-center gap-3">
                            <div className="hidden md:block h-4 w-14 rounded bg-outline-variant/30 animate-pulse" />
                            <div className="h-9 w-24 rounded-lg bg-outline-variant/30 animate-pulse" />
                        </div>
                    ) : user ? (
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setDropdownOpen((prev) => !prev)}
                                className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 hover:bg-surface-variant/50 transition-colors"
                                aria-expanded={dropdownOpen}
                                aria-haspopup="true"
                            >
                                {user.image ? (
                                    <img
                                        src={user.image}
                                        alt={user.name ?? "User avatar"}
                                        className="w-8 h-8 rounded-full object-cover ring-2 ring-secondary/30"
                                    />
                                ) : (
                                    <span className="w-8 h-8 rounded-full bg-secondary text-on-secondary text-xs font-bold flex items-center justify-center ring-2 ring-secondary/30">
                                        {getInitials(user.name)}
                                    </span>
                                )}
                                <span className="hidden md:block text-sm font-semibold text-on-surface max-w-[120px] truncate">
                                    {user.name ?? user.email}
                                </span>

                            </button>

                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-52 bg-surface border border-outline-variant/40 rounded-xl shadow-lg overflow-hidden z-50">
                                    <div className="px-4 py-3 border-b border-outline-variant/30">
                                        <p className="text-sm font-semibold text-on-surface truncate">
                                            {user.name ?? "User"}
                                        </p>
                                        <p className="text-xs text-on-surface-variant truncate mt-0.5">
                                            {user.email}
                                        </p>
                                    </div>

                                    <div className="py-1">
                                        {dropdownLinks.map(({ label, icon, href }) => (
                                            <Link
                                                key={label}
                                                href={href}
                                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/40 transition-colors"
                                                onClick={() => setDropdownOpen(false)}
                                            >
                                                <span className="material-symbols-outlined text-base">
                                                    {icon}
                                                </span>

                                            </Link>
                                        ))}
                                    </div>

                                    <div className="border-t border-outline-variant/30 py-1">
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-error hover:bg-error/10 transition-colors"
                                        >
                                            <span className="material-symbols-outlined text-base">
                                                logout
                                            </span>

                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        < >
                            <div className="flex items-center justify-center gap-4">
                                <Link
                                    href="/auth/signin"
                                    className="hidden md:block text-on-surface-variant hover:text-secondary text-sm font-semibold transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/auth/signup"
                                    className="bg-secondary text-on-secondary px-6 py-2.5 rounded-lg text-sm font-semibold shadow-sm hover:scale-[1.02] active:scale-95 transition-all"
                                >
                                    Register
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}