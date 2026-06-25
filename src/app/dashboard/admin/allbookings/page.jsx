'use client';

import { useEffect, useState } from 'react';
import { serverFetch, serverMutation, serverDelete } from '@/lib/core/server';
export default function AllBookingsPage() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    useEffect(() => {
        serverFetch('/api/booking')
            .then((data) => {
                setBookings(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const fmt = (dateStr) => {
        if (!dateStr) return '—';
        return new Date(dateStr).toLocaleDateString('en-BD', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">All Bookings</h1>
                <p className="text-sm text-gray-500 mt-1">{bookings.length} total bookings</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="text-left px-5 py-3 text-gray-500 font-medium">#</th>
                                <th className="text-left px-5 py-3 text-gray-500 font-medium">Property</th>
                                {/* <th className="text-left px-5 py-3 text-gray-500 font-medium">Owner</th> */}
                                <th className="text-left px-5 py-3 text-gray-500 font-medium">Booked by</th>
                                <th className="text-left px-5 py-3 text-gray-500 font-medium">Booking Date</th>
                                <th className="text-left px-5 py-3 text-gray-500 font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {bookings.map((booking, idx) => (
                                <tr key={booking._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-5 py-3 text-gray-400">{idx + 1}</td>
                                    <td className="px-5 py-3">
                                        <div className="flex items-center gap-3">
                                            {booking.propertyImage ? (
                                                <img
                                                    src={booking.propertyImage}
                                                    alt={booking.propertyName}
                                                    className="w-10 h-9 rounded-lg object-cover flex-shrink-0"
                                                />
                                            ) : (
                                                <div className="w-10 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-300">
                                                    🏠
                                                </div>
                                            )}
                                            <span className="font-medium text-gray-800">
                                                {booking.propertyName || booking.propertyTitle || '—'}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="px-5 py-3 text-gray-600">
                                        {booking.tenantName || booking.tenantEmail || '—'}
                                    </td>
                                    <td className="px-5 py-3 text-gray-500">
                                        {fmt(booking.createAt || booking.createdAt || booking.bookingDate)}
                                    </td>
                                    <td className="px-5 py-3">
                                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize
                                            ${booking.status === 'confirmed'
                                                ? 'bg-green-100 text-green-700'
                                                : booking.status === 'cancelled'
                                                    ? 'bg-red-100 text-red-700'
                                                    : 'bg-yellow-100 text-yellow-700'}`}>
                                            {booking.status || 'pending'}
                                        </span>
                                    </td>
                                </tr>
                            ))}

                            {bookings.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-5 py-12 text-center text-gray-400">
                                        No bookings yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}