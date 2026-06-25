'use client';

import { useEffect, useState } from 'react';
import { serverFetch, serverMutation, serverDelete } from '@/lib/core/server';
const STATUS_BADGE = {
    approved: 'bg-green-100 text-green-700',
    pending: 'bg-yellow-100 text-yellow-700',
    rejected: 'bg-red-100 text-red-700',
};

export default function AllPropertiesPage() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({});

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    useEffect(() => {
        serverFetch('/api/properties')
            .then((data) => {
                setProperties(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    // updateStatus
    const updateStatus = async (id, status) => {
        setActionLoading(id + status);
        try {
            const res = await serverMutation(`/api/properties/${id}`, { status }, 'PUT');
            if (res) setProperties((prev) =>
                prev.map((p) => (p._id === id ? { ...p, status } : p))
            );
        } finally {
            setActionLoading(null);
        }
    };

    // handleDelete
    const handleDelete = async (id) => {
        if (!confirm('Delete this property? This cannot be undone.')) return;
        setActionLoading(id + 'delete');
        try {
            const res = await serverDelete(`/api/properties/${id}`);
            if (res) setProperties((prev) => prev.filter((p) => p._id !== id));
        } finally {
            setActionLoading(null);
        }
    };

    // saveEdit
    const saveEdit = async () => {
        setActionLoading(editingId + 'edit');
        try {
            const res = await serverMutation(`/api/properties/${editingId}`, editForm, 'PUT');
            if (res) {
                setProperties((prev) =>
                    prev.map((p) => (p._id === editingId ? { ...p, ...editForm } : p))
                );
                setEditingId(null);
            }
        } finally {
            setActionLoading(null);
        }
    };

    const openEdit = (property) => {
        setEditingId(property._id);
        setEditForm({
            title: property.title || property.name || '',
            rent: property.rent || '',
            location: property.location || '',
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
                <h1 className="text-2xl font-bold text-gray-800">All Properties</h1>
                <p className="text-sm text-gray-500 mt-1">{properties.length} total listings</p>
            </div>

            {/* Edit Modal */}
            {editingId && (
                <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Edit Property</h2>
                        <div className="space-y-3">
                            <div>
                                <label className="text-xs text-gray-500 font-medium block mb-1">Title</label>
                                <input
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                                    value={editForm.title}
                                    onChange={(e) => setEditForm((f) => ({ ...f, title: e.target.value }))}
                                />
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 font-medium block mb-1">Rent (BDT)</label>
                                <input
                                    type="number"
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                                    value={editForm.rent}
                                    onChange={(e) => setEditForm((f) => ({ ...f, rent: e.target.value }))}
                                />
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 font-medium block mb-1">Location</label>
                                <input
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                                    value={editForm.location}
                                    onChange={(e) => setEditForm((f) => ({ ...f, location: e.target.value }))}
                                />
                            </div>
                        </div>
                        <div className="flex gap-2 mt-5">
                            <button
                                onClick={saveEdit}
                                disabled={actionLoading === editingId + 'edit'}
                                className="flex-1 bg-blue-500 text-white rounded-lg py-2 text-sm font-medium hover:bg-blue-600 disabled:opacity-50"
                            >
                                {actionLoading === editingId + 'edit' ? 'Saving…' : 'Save Changes'}
                            </button>
                            <button
                                onClick={() => setEditingId(null)}
                                className="flex-1 border border-gray-200 text-gray-600 rounded-lg py-2 text-sm font-medium hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="text-left px-5 py-3 text-gray-500 font-medium">Property</th>
                                <th className="text-left px-5 py-3 text-gray-500 font-medium">Price / mo</th>
                                <th className="text-left px-5 py-3 text-gray-500 font-medium">Favorites</th>
                                <th className="text-left px-5 py-3 text-gray-500 font-medium">Status</th>
                                <th className="text-left px-5 py-3 text-gray-500 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {properties.map((property) => {
                                const title = property.propertytitle || property.name || 'Untitled';
                                const img = property.
                                    images || property.thumbnail || property.images?.[0];
                                const status = property.status || 'pending';

                                return (
                                    <tr key={property._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-5 py-3">
                                            <div className="flex items-center gap-3">
                                                {img ? (
                                                    <img
                                                        src={img}
                                                        alt={title}
                                                        className="w-12 h-10 rounded-lg object-cover flex-shrink-0"
                                                    />
                                                ) : (
                                                    <div className="w-12 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 text-gray-300 text-lg">
                                                        🏠
                                                    </div>
                                                )}
                                                <div>
                                                    <p className="font-medium text-gray-800 leading-tight">{title}</p>
                                                    <p className="text-xs text-gray-400">{property.location || '—'}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3 font-semibold text-gray-700">
                                            ৳{Number(property.rent).toLocaleString()}
                                        </td>
                                        <td className="px-5 py-3 text-gray-600">
                                            <span className="flex items-center gap-1">
                                                <span className="text-red-400">♥</span>
                                                {property.like ?? 0}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3">
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${STATUS_BADGE[status] ?? STATUS_BADGE.pending}`}>
                                                {status}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3">
                                            <div className="flex flex-wrap gap-1.5">
                                                {status !== 'approved' && (
                                                    <button
                                                        onClick={() => updateStatus(property._id, 'approved')}
                                                        disabled={!!actionLoading}
                                                        className="px-2.5 py-1 rounded-lg text-xs font-medium bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 disabled:opacity-40"
                                                    >
                                                        Approve
                                                    </button>
                                                )}
                                                {status !== 'rejected' && (
                                                    <button
                                                        onClick={() => updateStatus(property._id, 'rejected')}
                                                        disabled={!!actionLoading}
                                                        className="px-2.5 py-1 rounded-lg text-xs font-medium bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 disabled:opacity-40"
                                                    >
                                                        Reject
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => openEdit(property)}
                                                    disabled={!!actionLoading}
                                                    className="px-2.5 py-1 rounded-lg text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 disabled:opacity-40"
                                                >
                                                    Update
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(property._id)}
                                                    disabled={actionLoading === property._id + 'delete'}
                                                    className="px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100 disabled:opacity-40"
                                                >
                                                    {actionLoading === property._id + 'delete' ? '…' : 'Delete'}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}

                            {properties.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-5 py-12 text-center text-gray-400">
                                        No properties found.
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