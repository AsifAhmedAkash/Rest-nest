"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`bg-surface/80 backdrop-blur-md sticky top-0 z-50 border-b border-outline-variant/30 flex justify-between items-center w-full px-4 md:px-16 py-4 transition-shadow ${scrolled ? "shadow-md" : "shadow-sm"
                }`}
        >
            {/* Logo */}
            <div className="flex items-center gap-2">
                <span
                    className="material-symbols-outlined text-secondary text-3xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                >
                    home_work
                </span>
                <span className="text-2xl font-bold text-on-surface">RentNest</span>
            </div>

            {/* Nav Links */}
            <nav className="hidden md:flex items-center gap-8">
                <a
                    href="#"
                    className="text-secondary font-semibold border-b-2 border-secondary pb-1 text-sm"
                >
                    Home
                </a>
                {["All Properties", "Services", "Blog"].map((link) => (
                    <a
                        key={link}
                        href="#"
                        className="text-on-surface-variant hover:text-secondary transition-colors duration-200 text-sm font-semibold"
                    >
                        {link}
                    </a>
                ))}
            </nav>

            {/* CTA Buttons */}
            <div className="flex items-center gap-4">
                <button className="hidden md:block text-on-surface-variant hover:text-secondary text-sm font-semibold transition-colors">
                    Login
                </button>
                <button className="bg-secondary text-on-secondary px-6 py-2.5 rounded-lg text-sm font-semibold shadow-sm hover:scale-[1.02] active:scale-95 transition-all">
                    Register
                </button>
            </div>
        </header>
    );
}