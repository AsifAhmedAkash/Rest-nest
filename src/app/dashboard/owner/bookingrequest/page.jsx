'use client'

import { useEffect, useState } from 'react'
import { useSession } from '@/lib/auth-client'
import { getBookingsByOwner } from '@/lib/api/payment'

const paymentStyle = {
    succeeded: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
}

const bookingStyle = {
    Confirmed: "bg-secondary-container/40 text-on-secondary-container",
    Pending: "bg-error-container/40 text-on-error-container",
}

const BookingRequest = () => {
    const { data: session } = useSession()
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (session?.user?.id) {
            getBookingsByOwner(session.user.id)
                .then(data => setBookings(Array.isArray(data) ? data : []))
                .finally(() => setLoading(false))
        }
    }, [session])

    if (loading) return (
        <div className="flex items-center justify-center py-20">
            <p className="text-sm text-zinc-400">Loading booking requests...</p>
        </div>
    )

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-on-surface dark:text-white">Booking Requests</h3>
                <span className="text-sm text-zinc-400">{bookings.length} total</span>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-outline-variant/20 dark:border-zinc-700 overflow-hidden">
                <div className="overflow-x-auto">
                    {bookings.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <span className="material-symbols-outlined text-5xl text-zinc-300 dark:text-zinc-600 mb-4">inbox</span>
                            <p className="text-zinc-500 dark:text-zinc-400 text-sm">No booking requests yet.</p>
                        </div>
                    ) : (
                        <table className="w-full text-left">
                            <thead className="bg-surface-container-low dark:bg-zinc-800 border-b border-outline-variant/20 dark:border-zinc-700">
                                <tr>
                                    {["Property Name", "Tenant", "Booking Date", "Amount Paid", "Booking Status", "Payment Status"].map((col) => (
                                        <th key={col} className="px-5 py-3.5 text-xs font-semibold text-on-surface-variant dark:text-zinc-400 uppercase tracking-wide whitespace-nowrap">
                                            {col}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-outline-variant/20 dark:divide-zinc-700">
                                {bookings.map((b, i) => (
                                    <tr key={i} className="hover:bg-surface-container-low/50 dark:hover:bg-zinc-800 transition-colors">
                                        <td className="px-5 py-4">
                                            <p className="text-sm font-semibold text-on-surface dark:text-white">{b.propertyTitle}</p>
                                        </td>
                                        <td className="px-5 py-4">
                                            <p className="text-sm font-medium text-on-surface dark:text-white">{b.tenantName}</p>
                                            <p className="text-xs text-zinc-400">{b.tenantEmail}</p>
                                        </td>
                                        <td className="px-5 py-4 text-sm text-on-surface-variant dark:text-zinc-400 whitespace-nowrap">
                                            {b.paidAt ? new Date(b.paidAt).toLocaleDateString() : '—'}
                                        </td>
                                        <td className="px-5 py-4 text-sm font-bold text-on-surface dark:text-white whitespace-nowrap">
                                            ৳{Number(b.amount).toLocaleString()}
                                        </td>
                                        <td className="px-5 py-4">
                                            <span className={`${bookingStyle[b.bookingStatus] ?? bookingStyle.Pending} px-2.5 py-1 rounded-full text-xs font-bold`}>
                                                {b.bookingStatus ?? 'Pending'}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4">
                                            <span className={`${paymentStyle[b.status] ?? paymentStyle.pending} px-2.5 py-1 rounded-full text-xs font-bold`}>
                                                {b.status === 'succeeded' ? 'Paid' : 'Pending'}
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

export default BookingRequest