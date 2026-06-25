'use client'

import Link from 'next/link'

export default function PaymentSuccessPage() {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center px-4">
            <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-2xl p-10 max-w-md w-full text-center shadow-sm">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="material-symbols-outlined text-green-600 dark:text-green-400" style={{ fontSize: 36, fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </div>
                <h1 className="text-2xl font-bold text-black dark:text-white mb-2">Payment Successful!</h1>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-8">
                    Your booking has been confirmed. You can view your booking details below.
                </p>
                <div className="space-y-3">
                    <Link
                        href="/dashboard/tenant/bookings"
                        className="block w-full bg-secondary text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
                    >
                        View My Bookings
                    </Link>
                    <Link
                        href="/"
                        className="block w-full border border-gray-200 dark:border-zinc-700 text-black dark:text-white py-3 rounded-xl font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    )
}