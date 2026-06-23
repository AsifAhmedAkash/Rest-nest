"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export default function Unauthorized() {
    const iconRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!iconRef.current) return;
            const xAxis = (window.innerWidth / 2 - e.clientX) / 45;
            const yAxis = (window.innerHeight / 2 - e.clientY) / 45;
            iconRef.current.style.transform = `translate(${xAxis}px, ${yAxis}px)`;
        };
        const handleMouseLeave = () => {
            if (iconRef.current) iconRef.current.style.transform = "translate(0, 0)";
        };
        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseleave", handleMouseLeave);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return (
        <div className="min-h-screen bg-background text-on-surface flex flex-col">

            {/* Nav */}
            <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant/30 flex justify-between items-center w-full px-4 md:px-16 py-4">
                <Link href="/" className="text-xl font-bold text-on-surface">RentNest</Link>
                <nav className="hidden md:flex items-center gap-8">
                    {["Home", "All Properties", "Services", "Blog"].map((l) => (
                        <Link key={l} href="#" className="text-sm font-semibold text-on-surface-variant hover:text-secondary transition-colors">{l}</Link>
                    ))}
                </nav>
                <div className="flex items-center gap-4">
                    <Link href="/auth/login" className="text-sm font-semibold text-on-surface-variant hover:text-secondary transition-colors">Login</Link>
                    <Link href="/auth/register" className="bg-secondary text-on-secondary px-6 py-2 rounded-lg text-sm font-semibold hover:opacity-90 active:scale-95 transition-all">Register</Link>
                </div>
            </header>

            {/* Main */}
            <main className="flex-1 flex items-center justify-center px-4 py-20 relative overflow-hidden">

                {/* Atmospheric blobs */}
                <div className="absolute top-1/4 -left-20 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-on-tertiary-container/5 rounded-full blur-[80px] pointer-events-none" />

                <div className="max-w-2xl w-full flex flex-col items-center text-center relative z-10 space-y-10">

                    {/* Icon container */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-secondary/10 rounded-full scale-150 blur-3xl" />
                        <div className="relative w-36 h-36 md:w-48 md:h-48 bg-white rounded-2xl shadow-[0px_12px_32px_rgba(15,23,42,0.08)] border border-outline-variant/20 flex items-center justify-center">
                            <span
                                ref={iconRef}
                                className="material-symbols-outlined text-secondary/40 transition-transform duration-75 select-none"
                                style={{ fontSize: 80 }}
                            >
                                lock_person
                            </span>
                            {/* Error badge */}
                            <div className="absolute -top-2.5 -right-2.5 w-8 h-8 bg-error rounded-full flex items-center justify-center border-4 border-white">
                                <span className="material-symbols-outlined text-white" style={{ fontSize: 14 }}>close</span>
                            </div>
                        </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-3">
                        <span className="text-secondary text-xs font-semibold tracking-widest uppercase">403 Error</span>
                        <h1 className="text-3xl md:text-4xl font-bold text-on-surface">Access Restricted</h1>
                        <p className="text-base text-on-surface-variant max-w-lg mx-auto leading-relaxed">
                            You dont have permission to view this section of RentNest. This could be due to your account type or a temporary restriction.
                        </p>
                    </div>

                    {/* Action cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                        <Link
                            href="/dashboard"
                            className="group flex flex-col items-start p-6 bg-secondary text-on-secondary rounded-2xl shadow-md hover:shadow-[0px_8px_24px_rgba(0,108,73,0.25)] hover:-translate-y-1 transition-all overflow-hidden relative text-left"
                        >
                            <div className="absolute right-[-10%] top-[-10%] w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all" />
                            <span className="material-symbols-outlined mb-3 bg-white/20 p-2 rounded-lg text-base">dashboard</span>
                            <h3 className="text-base font-semibold mb-1">Go to Dashboard</h3>
                            <p className="text-sm opacity-80 mb-4">Return to your property management overview.</p>
                            <div className="flex items-center gap-1 text-sm font-semibold mt-auto">
                                Explore Dashboard
                                <span className="material-symbols-outlined text-base">arrow_forward</span>
                            </div>
                        </Link>

                        <Link
                            href="#"
                            className="group flex flex-col items-start p-6 bg-white text-on-surface border border-outline-variant/30 rounded-2xl shadow-md hover:border-secondary/30 hover:-translate-y-1 transition-all text-left"
                        >
                            <span className="material-symbols-outlined mb-3 text-secondary bg-secondary/10 p-2 rounded-lg text-base">support_agent</span>
                            <h3 className="text-base font-semibold mb-1">Contact Support</h3>
                            <p className="text-sm text-on-surface-variant mb-4">Think this is a mistake? Our team can help clarify your access level.</p>
                            <div className="flex items-center gap-1 text-sm font-semibold text-secondary mt-auto group-hover:underline">
                                Open Support Ticket
                                <span className="material-symbols-outlined text-base">open_in_new</span>
                            </div>
                        </Link>
                    </div>

                    {/* Back link */}
                    <button
                        onClick={() => history.back()}
                        className="flex items-center gap-1.5 text-sm font-semibold text-on-surface-variant hover:text-secondary transition-colors"
                    >
                        <span className="material-symbols-outlined text-base">arrow_back</span>
                        Go back to previous page
                    </button>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-inverse-surface text-inverse-on-surface w-full px-4 md:px-16 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 border-t border-outline-variant/20">
                <div className="space-y-2">
                    <span className="text-lg font-bold text-white">RentNest</span>
                    <p className="text-sm text-surface-variant/80">Elevating the rental experience through secure, modern, and efficient tools.</p>
                </div>
                <div className="space-y-3">
                    <h5 className="text-xs font-semibold uppercase tracking-wider text-white">Quick Links</h5>
                    {["About Us", "Terms of Service", "Privacy Policy", "Contact Support"].map((l) => (
                        <Link key={l} href="#" className="block text-sm text-surface-variant hover:text-white hover:underline transition-all">{l}</Link>
                    ))}
                </div>
                <div className="space-y-3">
                    <h5 className="text-xs font-semibold uppercase tracking-wider text-white">Services</h5>
                    {["Tenant Screening", "Property Valuation", "Legal Consultation"].map((l) => (
                        <Link key={l} href="#" className="block text-sm text-surface-variant hover:text-white transition-all">{l}</Link>
                    ))}
                </div>
                <div className="space-y-4">
                    <h5 className="text-xs font-semibold uppercase tracking-wider text-white">Stay Connected</h5>
                    <div className="flex gap-4">
                        {["public", "share", "chat"].map((icon) => (
                            <span key={icon} className="material-symbols-outlined text-surface-variant hover:text-secondary cursor-pointer transition-colors">{icon}</span>
                        ))}
                    </div>
                    <p className="text-xs text-surface-variant">© 2024 RentNest Real Estate. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}