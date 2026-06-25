'use client';
import { serverFetch, serverMutation, serverDelete } from '@/lib/core/server';
import { useEffect, useState } from 'react';

export default function TransactionsPage() {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    useEffect(() => {
        serverFetch('/api/payments')
            .then((data) => {
                setPayments(Array.isArray(data) ? data : []);
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

    const fmtAmount = (amt) => {
        if (!amt) return '—';
        // Stripe amounts are in paisa (×100)
        const taka = amt >= 100 ? amt / 100 : amt;
        return `৳${Number(taka).toLocaleString()}`;
    };

    const filtered = payments.filter((p) => {
        const q = search.toLowerCase();
        return (
            !q ||
            p.transactionId?.toLowerCase().includes(q) ||
            p.propertyName?.toLowerCase().includes(q) ||
            p.tenantName?.toLowerCase().includes(q) ||
            p.ownerName?.toLowerCase().includes(q)
        );
    });

    const total = filtered.reduce((sum, p) => {
        const amt = p.amount >= 100 ? p.amount / 100 : p.amount;
        return sum + (Number(amt) || 0);
    }, 0);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Transactions</h1>
                    <p className="text-sm text-gray-500 mt-1">{payments.length} total payments</p>
                </div>

                {/* Search */}
                <input
                    type="text"
                    placeholder="Search by ID, property, tenant…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border border-gray-200 rounded-xl px-4 py-2 text-sm w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
            </div>

            {/* Summary card */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
                    <p className="text-xs text-blue-500 font-medium">Total Collected</p>
                    <p className="text-xl font-bold text-blue-700 mt-1">৳{total.toLocaleString()}</p>
                </div>
                <div className="bg-green-50 rounded-2xl p-4 border border-green-100">
                    <p className="text-xs text-green-500 font-medium">Transactions</p>
                    <p className="text-xl font-bold text-green-700 mt-1">{filtered.length}</p>
                </div>
                <div className="bg-purple-50 rounded-2xl p-4 border border-purple-100 col-span-2 sm:col-span-1">
                    <p className="text-xs text-purple-500 font-medium">Avg. Amount</p>
                    <p className="text-xl font-bold text-purple-700 mt-1">
                        {filtered.length ? `৳${Math.round(total / filtered.length).toLocaleString()}` : '—'}
                    </p>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="text-left px-5 py-3 text-gray-500 font-medium">Transaction ID</th>
                                <th className="text-left px-5 py-3 text-gray-500 font-medium">Property</th>
                                <th className="text-left px-5 py-3 text-gray-500 font-medium">Tenant</th>
                                <th className="text-left px-5 py-3 text-gray-500 font-medium">Owner</th>
                                <th className="text-left px-5 py-3 text-gray-500 font-medium">Amount</th>
                                <th className="text-left px-5 py-3 text-gray-500 font-medium">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filtered.map((payment) => (
                                <tr key={payment._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-5 py-3">
                                        <span className="font-mono text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                                            {payment.transactionId
                                                ? payment.transactionId.slice(0, 16) + '…'
                                                : payment._id?.slice(0, 12) + '…'}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3 font-medium text-gray-800">
                                        {payment.propertyName || payment.propertyTitle || '—'}
                                    </td>
                                    <td className="px-5 py-3 text-gray-600">
                                        <div>
                                            <p className="text-gray-800">{payment.tenantName || '—'}</p>
                                            {payment.tenantEmail && (
                                                <p className="text-xs text-gray-400">{payment.tenantEmail}</p>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-5 py-3 text-gray-600">
                                        <div>
                                            <p className="text-gray-800">{payment.ownerName || '—'}</p>
                                            {payment.ownerEmail && (
                                                <p className="text-xs text-gray-400">{payment.ownerEmail}</p>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-5 py-3">
                                        <span className="font-semibold text-gray-800">
                                            {fmtAmount(payment.amount)}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3 text-gray-500">
                                        {fmt(payment.paidAt || payment.createdAt)}
                                    </td>
                                </tr>
                            ))}

                            {filtered.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-5 py-12 text-center text-gray-400">
                                        {search ? 'No results for that search.' : 'No transactions yet.'}
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