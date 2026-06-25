'use client'

import { useEffect, useState } from 'react'
import { useSession } from '@/lib/auth-client'
import { getMyPayments } from '@/lib/api/payment'
import Link from 'next/link'

const paymentStyle = {
    succeeded: "bg-secondary-container/40 text-on-secondary-container",
    pending: "bg-error-container/40 text-on-error-container",
}

const bookingStyle = {
    Confirmed: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    Pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
}

export default function MyBookingsPage() {
    const { data: session } = useSession()
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (session?.user?.id) {
            getMyPayments(session.user.id)
                .then(data => setBookings(Array.isArray(data) ? data : []))
                .finally(() => setLoading(false))
        }
    }, [session])

    if (loading) return (
        <div className="flex items-center justify-center py-20">
            <p className="text-sm text-zinc-400">Loading bookings...</p>
        </div>
    )

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-on-surface dark:text-white">My Bookings</h3>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-outline-variant/20 dark:border-zinc-700 overflow-hidden">
                <div className="overflow-x-auto">
                    {bookings.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <span className="material-symbols-outlined text-5xl text-zinc-300 dark:text-zinc-600 mb-4">receipt_long</span>
                            <p className="text-zinc-500 dark:text-zinc-400 text-sm">No bookings yet.</p>
                            <Link href="/allpoperties" className="mt-4 text-sm font-semibold text-secondary hover:underline">
                                Browse Properties
                            </Link>
                        </div>
                    ) : (
                        <table className="w-full text-left">
                            <thead className="bg-surface-container-low dark:bg-zinc-800 border-b border-outline-variant/20 dark:border-zinc-700">
                                <tr>
                                    {["Property", "Move In", "Stay", "Amount", "Payment", "Status"].map((col) => (
                                        <th key={col} className="px-5 py-3.5 text-xs font-semibold text-on-surface-variant dark:text-zinc-400 uppercase tracking-wide">{col}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-outline-variant/20 dark:divide-zinc-700">
                                {bookings.map((b, i) => (
                                    <tr key={i} className="hover:bg-surface-container-low/50 dark:hover:bg-zinc-800 transition-colors">
                                        <td className="px-5 py-4">
                                            <p className="text-sm font-semibold text-on-surface dark:text-white">{b.propertyTitle}</p>
                                        </td>
                                        <td className="px-5 py-4 text-sm text-on-surface-variant dark:text-zinc-400">
                                            {b.moveInDate ?? '—'}
                                        </td>
                                        <td className="px-5 py-4 text-sm text-on-surface-variant dark:text-zinc-400">
                                            {b.stayDuration ?? '—'}
                                        </td>
                                        <td className="px-5 py-4 text-sm font-bold text-on-surface dark:text-white">
                                            ৳{Number(b.amount).toLocaleString()}
                                        </td>
                                        <td className="px-5 py-4">
                                            <span className={`${paymentStyle[b.status] ?? paymentStyle.pending} px-2.5 py-1 rounded-full text-xs font-bold`}>
                                                {b.status === 'succeeded' ? 'Paid' : 'Pending'}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4">
                                            <span className={`${bookingStyle[b.bookingStatus] ?? bookingStyle.Pending} px-2.5 py-1 rounded-full text-xs font-bold`}>
                                                {b.bookingStatus}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    )
}