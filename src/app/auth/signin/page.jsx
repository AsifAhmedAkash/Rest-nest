"use client";

import { useState } from "react";
import { signIn } from "@/lib/auth-client";

export default function SignInPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            await signIn.email({
                email,
                password,
                callbackURL: "/dashboard",
            });
        } catch (err) {
            setError("Invalid email or password. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex flex-col md:flex-row">

            {/* ── Left: Image Panel ── */}
            <section className="hidden md:flex md:w-1/2 lg:w-3/5 relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div
                        className="w-full h-full bg-cover bg-center"
                        style={{
                            backgroundImage:
                                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAm_q1sdHVwelbkUWd1MEncm60haS602KtKliNvx5tnNEIka6e3BFpKEu1IWzA207JC4RDR3VZ7OzgEzsykL0cllsGWaAf04HtCtUfE0lnXuJqRo-YYYRdVygY9lwYwDlwBSixvoLApp42eYSQSH7zSiIT8Fi51uEXqlZEWZYt8nQNw0MIt4l2BPZqPiNL6zRq03X5QYOFDyt5VfUsooRdklJUDPrwkmXfPj3S0JHB54npfM0QMx6p02Sk6wRX6pEfS_cwq-VncHY97')",
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent" />
                </div>
                <div className="relative z-10 p-16 flex flex-col justify-between h-full w-full">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center text-white">
                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                                nest_eco_leaf
                            </span>
                        </div>
                        <span className="text-xl font-bold text-white tracking-tight">RentNest</span>
                    </div>
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
                            Your next chapter begins here.
                        </h1>
                        <p className="text-lg text-white/90">
                            Experience the most streamlined way to find, rent, and manage your property portfolio
                            with institutional-grade security and modern simplicity.
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <div className="bg-white/80 backdrop-blur-md p-2 rounded-xl flex items-center gap-3 pr-4">
                            <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-secondary">
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                                    verified
                                </span>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-on-surface">Trusted Platform</p>
                                <p className="text-xs text-on-surface-variant">10k+ Verified Listings</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Right: Form ── */}
            <section className="flex-1 flex items-center justify-center p-4 md:p-16 bg-white">
                <div className="w-full max-w-md">

                    {/* Mobile logo */}
                    <div className="flex md:hidden items-center gap-2 mb-20 justify-center">
                        <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center text-white">
                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: 18 }}>
                                nest_eco_leaf
                            </span>
                        </div>
                        <span className="text-xl font-bold text-on-surface">RentNest</span>
                    </div>

                    <div className="mb-12">
                        <h2 className="text-3xl font-bold text-on-surface mb-1">Welcome back</h2>
                        <p className="text-base text-on-surface-variant">Enter your details to access your account</p>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="mb-6 px-4 py-3 bg-error-container/30 text-on-error-container text-sm rounded-lg border border-error/20">
                            {error}
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Email */}
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-on-surface" htmlFor="email">
                                Email Address
                            </label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline" style={{ fontSize: 20 }}>
                                    mail
                                </span>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="name@company.com"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-white border border-outline-variant rounded-lg text-base transition-all focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-1">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-semibold text-on-surface" htmlFor="password">
                                    Password
                                </label>
                                <a href="#" className="text-xs font-semibold text-secondary hover:underline">
                                    Forgot password?
                                </a>
                            </div>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline" style={{ fontSize: 20 }}>
                                    lock
                                </span>
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-12 py-3 bg-white border border-outline-variant rounded-lg text-base transition-all focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-outline hover:text-on-surface-variant"
                                >
                                    <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
                                        {showPassword ? "visibility_off" : "visibility"}
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* Remember me */}
                        <div className="flex items-center gap-2">
                            <input
                                id="remember"
                                type="checkbox"
                                checked={remember}
                                onChange={() => setRemember(!remember)}
                                className="w-4 h-4 text-secondary border-outline-variant rounded focus:ring-secondary cursor-pointer"
                            />
                            <label htmlFor="remember" className="text-sm text-on-surface-variant cursor-pointer">
                                Remember me for 30 days
                            </label>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-secondary hover:bg-secondary/90 text-white text-sm font-semibold py-3.5 rounded-lg shadow-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Signing In...
                                </>
                            ) : (
                                <>
                                    Sign In
                                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_forward</span>
                                </>
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-outline-variant/30" />
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-white px-4 text-xs text-outline font-medium tracking-wider uppercase">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    {/* Social */}
                    <div className="grid grid-cols-2 gap-6">
                        <button className="flex items-center justify-center gap-3 px-4 py-3 border border-outline-variant rounded-lg hover:bg-surface-container-low transition-all text-sm font-semibold text-on-surface active:scale-[0.98]">
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Google
                        </button>
                        <button className="flex items-center justify-center gap-3 px-4 py-3 border border-outline-variant rounded-lg hover:bg-surface-container-low transition-all text-sm font-semibold text-on-surface active:scale-[0.98]">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.3C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.75.9-.03 2.04-.88 3.52-.77 1.25.08 2.2.53 2.89 1.48-2.67 1.54-2.18 5.16.5 6.22-.57 1.5-1.32 2.97-2.99 5.29zM12.03 7.25c-.02-2.13 1.7-3.93 3.75-4.05.21 2.27-2.2 4.13-3.75 4.05z" />
                            </svg>
                            Apple
                        </button>
                    </div>

                    <p className="mt-8 text-center text-sm text-on-surface-variant">
                        Dont have an account?{" "}
                        <a href="/auth/signup" className="text-sm font-semibold text-secondary hover:underline ml-1">
                            Sign Up
                        </a>
                    </p>
                </div>
            </section>
        </main>
    );
}