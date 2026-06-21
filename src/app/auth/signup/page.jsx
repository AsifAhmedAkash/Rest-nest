"use client";

import { useState } from "react";
import { signUp } from "@/lib/auth-client";

export default function SignUpPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [agreed, setAgreed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);
        try {
            await signUp.email({
                name,
                email,
                password,
                callbackURL: "/dashboard",
            });
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex flex-col md:flex-row">

            {/* ── Left: Image Panel ── */}
            <div className="hidden md:flex md:w-1/2 relative overflow-hidden bg-on-surface">
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB-7KIaYsMjxSZnRJVtTc4i075FH5eYZPsj-6nDIet6n6e6zBvgWy0lqLvPjm0r5DeXN2yso3uwKhCjdWMYqhTZveScX2YC5qrIlczc_Gpf091DdSGQd1_Ou8e4nRVHA-OE3FX5F7NaNJzjqJzAVAwC8DKQx-nuUldZJnOtgR3t5TAkRYUc4ihAc_8WvFXAi2Wdy65AUePuKDGUqaDFicGkrfSXaZ5pWIDB7iGXQG1aYoJS1QrIypY0vaj_WikpYPKLww_D2gtcvnNL')",
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                <div className="relative z-10 flex flex-col justify-between p-16 h-full w-full">
                    <span className="text-xl font-bold text-white tracking-tight">RentNest</span>
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
                            Find the space where your life happens.
                        </h1>
                        <p className="text-lg text-white/90">
                            Join over 10,000 tenants and landlords finding security and simplicity in the modern rental market.
                        </p>
                    </div>
                </div>
            </div>

            {/* ── Right: Form ── */}
            <div className="flex-1 flex items-center justify-center bg-white p-4 md:p-16 min-h-screen overflow-y-auto">
                <div className="w-full max-w-[480px]">

                    {/* Mobile logo */}
                    <div className="md:hidden mb-12">
                        <span className="text-xl font-bold text-on-surface">RentNest</span>
                    </div>

                    <div className="mb-10">
                        <h2 className="text-3xl font-bold text-on-surface mb-1">Create Account</h2>
                        <p className="text-base text-on-surface-variant">Fill in your details to start your journey with us.</p>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="mb-6 px-4 py-3 bg-error-container/30 text-on-error-container text-sm rounded-lg border border-error/20">
                            {error}
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>

                        {/* Full Name */}
                        <div className="space-y-1">
                            <label className="block text-sm font-semibold text-on-surface" htmlFor="fullName">
                                Full Name
                            </label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">person</span>
                                <input
                                    id="fullName"
                                    type="text"
                                    placeholder="John Doe"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-white border border-outline-variant rounded-lg focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all outline-none text-base"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-1">
                            <label className="block text-sm font-semibold text-on-surface" htmlFor="email">
                                Email Address
                            </label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">mail</span>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-white border border-outline-variant rounded-lg focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all outline-none text-base"
                                />
                            </div>
                        </div>

                        {/* Password + Confirm */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label className="block text-sm font-semibold text-on-surface" htmlFor="password">
                                    Password
                                </label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">lock</span>
                                    <input
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 bg-white border border-outline-variant rounded-lg focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all outline-none text-base"
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="block text-sm font-semibold text-on-surface" htmlFor="confirmPassword">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">verified_user</span>
                                    <input
                                        id="confirmPassword"
                                        type="password"
                                        placeholder="••••••••"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className={`w-full pl-10 pr-4 py-3 bg-white border rounded-lg focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all outline-none text-base ${confirmPassword && password !== confirmPassword
                                            ? "border-error"
                                            : "border-outline-variant"
                                            }`}
                                    />
                                </div>
                                {confirmPassword && password !== confirmPassword && (
                                    <p className="text-xs text-error mt-1">Passwords dont match</p>
                                )}
                            </div>
                        </div>

                        {/* Terms */}
                        <div className="flex items-start gap-3">
                            <input
                                id="terms"
                                type="checkbox"
                                checked={agreed}
                                onChange={() => setAgreed(!agreed)}
                                required
                                className="mt-1 w-5 h-5 rounded border-outline-variant text-secondary focus:ring-secondary cursor-pointer"
                            />
                            <label htmlFor="terms" className="text-sm text-on-surface-variant cursor-pointer">
                                I agree to the{" "}
                                <a href="#" className="text-secondary font-semibold hover:underline">Terms &amp; Conditions</a>{" "}
                                and{" "}
                                <a href="#" className="text-secondary font-semibold hover:underline">Privacy Policy</a>.
                            </label>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-secondary text-white py-4 rounded-lg text-sm font-semibold shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Creating Account...
                                </>
                            ) : (
                                "Create Account"
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-8 flex items-center">
                        <div className="flex-grow border-t border-outline-variant/30" />
                        <span className="flex-shrink mx-4 text-xs text-outline font-medium tracking-widest uppercase">
                            or continue with
                        </span>
                        <div className="flex-grow border-t border-outline-variant/30" />
                    </div>

                    {/* Social */}
                    <div className="grid grid-cols-2 gap-6 mb-8">
                        <button className="flex items-center justify-center gap-3 py-3 border border-outline-variant rounded-lg hover:bg-surface-container transition-colors text-sm font-semibold text-on-surface">
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Google
                        </button>
                        <button className="flex items-center justify-center gap-3 py-3 border border-outline-variant rounded-lg hover:bg-surface-container transition-colors text-sm font-semibold text-on-surface">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.05 20.28c-.96.95-2.18 2.02-3.66 2.02-1.4 0-1.85-.86-3.62-.86-1.78 0-2.3.85-3.62.85-1.44 0-2.8-1.18-3.8-2.64-2.07-3-2.6-7.53-.53-10.4 1-1.44 2.5-2.35 4.15-2.35 1.25 0 2.4.86 3.17.86.76 0 2.15-.98 3.65-.83 1.5.15 2.6.72 3.4 1.83-3.1 1.86-2.6 5.86.5 7.15-.65 1.6-1.5 3.2-2.66 4.37zM12.03 7.25c-.02-2.13 1.76-4.1 3.8-4.25.26 2.43-2.14 4.5-3.8 4.25z" />
                            </svg>
                            Apple
                        </button>
                    </div>

                    <p className="text-center text-base text-on-surface-variant">
                        Already have an account?{" "}
                        <a href="/auth/signin" className="text-secondary font-bold hover:underline">
                            Sign In
                        </a>
                    </p>
                </div>
            </div>
        </main>
    );
}