"use client";

import { useState } from "react";
import { signIn } from "@/lib/auth-client";
import { Eye, EyeClosed } from "@gravity-ui/icons";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignInForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get('redirect') || '/';
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const { data, error } = await signIn.email({
                email,
                password,
            });

            if (error) {
                setError("Invalid email or password. Please try again.");
                return;
            }

            router.push(redirectTo); // ← only on success
        } catch (err) {
            setError("Invalid email or password. Please try again.");
        } finally {
            setLoading(false); // ← only this here
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

                        <span className="text-xl font-bold text-white tracking-tight"> </span>
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
                        <div>

                        </div>
                    </div>
                </div>
            </section>

            {/* ── Right: Form ── */}
            <section className="flex-1 flex items-center justify-center p-4 md:p-16 bg-white dark:bg-zinc-900 transition-colors">
                <div className="w-full max-w-md">

                    {/* Mobile logo */}
                    <div className="flex md:hidden items-center gap-2 mb-20 justify-center">
                        <span className="text-xl font-bold text-on-surface dark:text-white">
                            RentNest
                        </span>
                    </div>

                    <div className="mb-12">
                        <h2 className="text-3xl font-bold text-on-surface dark:text-white mb-1">
                            Welcome back
                        </h2>
                        <p className="text-base text-on-surface-variant dark:text-zinc-300">
                            Enter your details to access your account
                        </p>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="mb-6 px-4 py-3 bg-red-500/10 text-red-500 text-sm rounded-lg border border-red-500/20">
                            {error}
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>

                        {/* EMAIL */}
                        <div>
                            <label className="text-sm font-semibold text-on-surface dark:text-white">
                                Email Address
                            </label>

                            <input
                                className="
            w-full px-4 py-3 rounded-lg border
            bg-white dark:bg-zinc-800
            text-black dark:text-white
            border-gray-300 dark:border-zinc-700
            focus:border-secondary focus:ring-2 focus:ring-secondary/20
          "
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* PASSWORD */}
                        <div>
                            <label className="text-sm font-semibold text-on-surface dark:text-white">
                                Password
                            </label>

                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="
              w-full px-4 py-3 rounded-lg border
              bg-white dark:bg-zinc-800
              text-black dark:text-white
              border-gray-300 dark:border-zinc-700
            "
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* BUTTON */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-secondary text-white py-3 rounded-lg font-semibold disabled:opacity-50"
                        >
                            {loading ? 'Signing In...' : 'Sign In'}
                        </button>

                    </form>



                    {/* Divider */}
                    <div className="relative my-8">

                        <div className="relative flex justify-center">
                            <span className="px-4 text-xs text-outline font-medium tracking-wider uppercase">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    {/* Social */}
                    <div className="grid grid-cols-1">
                        <button className="flex items-center justify-center gap-3 px-4 py-3 border text-black dark:text-white
              border-gray-300 dark:border-zinc-700 border-outline-variant rounded-lg hover:bg-surface-container-low transition-all text-sm font-semibold text-on-surface active:scale-[0.98]">
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Google
                        </button>

                    </div>

                    <p className="mt-8 text-center text-sm text-on-surface-variant">
                        Dont have an account?{" "}
                        <Link href={`/auth/signup?redirect=${redirectTo}`} className="text-sm font-semibold text-secondary hover:underline ml-1">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </section>
        </main>
    );
}