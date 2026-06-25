'use client';

import { useEffect, useState } from 'react';
import { serverFetch, serverMutation, serverDelete } from '@/lib/core/server';

const ROLES = ['admin', 'owner', 'tenant'];
const PAGE_SIZE = 10;

export default function AllUsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [updating, setUpdating] = useState(null); // userId being updated

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    useEffect(() => {
        serverFetch('/api/users')
            .then((data) => {
                setUsers(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const handleRoleChange = async (userId, newRole) => {
        setUpdating(userId);
        try {
            const res = await serverMutation(`/api/users/${userId}/role`, { role: newRole }, 'PATCH');
            if (res) setUsers((prev) =>
                prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
            );
        } finally {
            setUpdating(null);
        }
    };

    const totalPages = Math.ceil(users.length / PAGE_SIZE);
    const paginated = users.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    const roleBadge = (role) => {
        const map = {
            admin: 'bg-purple-100 text-purple-700',
            owner: 'bg-blue-100 text-blue-700',
            tenant: 'bg-green-100 text-green-700',
        };
        return (
            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${map[role] ?? 'bg-gray-100 text-gray-600'}`}>
                {role ?? 'tenant'}
            </span>
        );
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
                <h1 className="text-2xl font-bold text-gray-800">All Users</h1>
                <p className="text-sm text-gray-500 mt-1">{users.length} registered users</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="text-left px-5 py-3 text-gray-500 font-medium">#</th>
                                <th className="text-left px-5 py-3 text-gray-500 font-medium">User</th>
                                <th className="text-left px-5 py-3 text-gray-500 font-medium">Email</th>
                                <th className="text-left px-5 py-3 text-gray-500 font-medium">Role</th>
                                <th className="text-left px-5 py-3 text-gray-500 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {paginated.map((user, idx) => (
                                <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-5 py-3 text-gray-400">
                                        {(page - 1) * PAGE_SIZE + idx + 1}
                                    </td>
                                    <td className="px-5 py-3">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={user.photoURL || user.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || user.email)}&background=6366f1&color=fff`}
                                                alt={user.name}
                                                className="w-9 h-9 rounded-full object-cover flex-shrink-0"
                                            />
                                            <span className="font-medium text-gray-800">
                                                {user.name || '—'}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3 text-gray-600">{user.email}</td>
                                    <td className="px-5 py-3">{roleBadge(user.role)}</td>
                                    <td className="px-5 py-3">
                                        <div className="flex flex-wrap gap-2">
                                            {ROLES.filter((r) => r !== (user.role ?? 'tenant')).map((r) => (
                                                <button
                                                    key={r}
                                                    onClick={() => handleRoleChange(user._id, r)}
                                                    disabled={updating === user._id}
                                                    className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all
                                                        ${r === 'admin' ? 'border-purple-300 text-purple-700 hover:bg-purple-50' : ''}
                                                        ${r === 'owner' ? 'border-blue-300 text-blue-700 hover:bg-blue-50' : ''}
                                                        ${r === 'tenant' ? 'border-green-300 text-green-700 hover:bg-green-50' : ''}
                                                        disabled:opacity-40 disabled:cursor-not-allowed`}
                                                >
                                                    {updating === user._id ? '...' : `Make ${r}`}
                                                </button>
                                            ))}
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {paginated.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-5 py-12 text-center text-gray-400">
                                        No users found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100">
                        <span className="text-xs text-gray-400">
                            Page {page} of {totalPages}
                        </span>
                        <div className="flex gap-1">
                            <button
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="px-3 py-1 rounded-lg text-xs border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                Prev
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                <button
                                    key={p}
                                    onClick={() => setPage(p)}
                                    className={`px-3 py-1 rounded-lg text-xs border transition-colors
                                        ${p === page ? 'bg-blue-500 border-blue-500 text-white' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                                >
                                    {p}
                                </button>
                            ))}
                            <button
                                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                                className="px-3 py-1 rounded-lg text-xs border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}