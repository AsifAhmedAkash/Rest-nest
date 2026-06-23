"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { HeartCrack } from '@gravity-ui/icons';
export default function NotFound() {
    const nestRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!nestRef.current) return;
            const rect = nestRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const moveX = (e.clientX - centerX) / 30;
            const moveY = (e.clientY - centerY) / 30;
            nestRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className="min-h-screen bg-background text-on-surface flex flex-col">



            {/* Main */}
            <main className="flex-1 flex items-center justify-center relative py-20 px-4 overflow-hidden">

                {/* Background ghost text */}
                <span className="absolute select-none font-extrabold text-[160px] md:text-[220px] leading-none text-secondary/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                    404
                </span>

                {/* Background icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none">
                    <span className="material-symbols-outlined text-[400px] text-secondary">home_work</span>
                </div>

                <div className="max-w-3xl w-full text-center relative z-10 space-y-10">

                    {/* Floating icon */}
                    <div className="flex justify-center">
                        <div
                            ref={nestRef}
                            className="w-44 h-44 md:w-56 md:h-56 rounded-full bg-white/80 backdrop-blur-md border border-outline-variant/40 shadow-xl flex items-center justify-center transition-transform duration-75"
                            style={{ animation: "float 6s ease-in-out infinite" }}
                        >

                            <span
                                className="material-symbols-outlined text-secondary"
                                style={{ fontSize: 96, fontVariationSettings: "'FILL' 1" }}
                            >

                                <HeartCrack width={64} height={64} />
                            </span>
                        </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-3">
                        <h1 className="text-3xl md:text-4xl font-bold text-on-surface">
                            Oops! The nest youre looking for doesnt exist.
                        </h1>
                        <p className="text-base text-on-surface-variant max-w-lg mx-auto leading-relaxed">
                            The property or page youre searching for has been moved or taken off the market. Lets get you back on track.
                        </p>
                    </div>


                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 bg-secondary text-on-secondary px-8 py-3.5 rounded-lg text-sm font-semibold hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all"
                        >
                            <span className="material-symbols-outlined text-base">Return Home</span>

                        </Link>
                        <button
                            onClick={() => history.back()}
                            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg text-sm font-semibold border-2 border-secondary text-secondary hover:bg-secondary/5 active:scale-95 transition-all"
                        >
                            <span className="material-symbols-outlined text-base">Go Back</span>

                        </button>
                    </div>


                </div>
            </main>


            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
            `}</style>
        </div>
    );
}