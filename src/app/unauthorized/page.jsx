"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Lock } from '@gravity-ui/icons';
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
                                style={{ fontSize: 90 }}
                            >
                                <Lock width={90} height={90} className="text-secondary/40" />
                            </span>
                            {/* Error badge */}
                            {/* <div className="absolute -top-2.5 -right-2.5 w-8 h-8 bg-error rounded-full flex items-center justify-center border-4 border-white">
                                <span className="material-symbols-outlined text-white" style={{ fontSize: 14 }}>close</span>
                            </div> */}
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
                    <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 w-full">
                        <Link
                            href="/"
                            className="group flex flex-col items-start p-6 bg-secondary text-on-secondary rounded-2xl shadow-md hover:shadow-[0px_8px_24px_rgba(0,108,73,0.25)] hover:-translate-y-1 transition-all overflow-hidden relative text-left"
                        >
                            <div className="absolute right-[-10%] top-[-10%] w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all" />
                            <span className="material-symbols-outlined mb-3 bg-white/20 p-2 rounded-lg text-base">Homepage</span>
                            <h3 className="text-base font-semibold mb-1">Go to Homepage</h3>
                            <p className="text-sm opacity-80 mb-4">Return to your property management overview.</p>
                            <div className="flex items-center gap-1 text-sm font-semibold mt-auto">
                                Explore More
                                <span className="material-symbols-outlined text-base">arrow_forward</span>
                            </div>
                        </Link>

                        {/* <Link
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
                        </Link> */}
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


        </div>
    );
}