'use client'

import { useEffect, useState } from 'react'
import { useSession } from '@/lib/auth-client'
import { getFavourites } from '@/lib/api/favourites'
import { toggleLike } from '@/lib/actions/favourites'
import Link from 'next/link'

export default function FavouritesPage() {
    const { data: session } = useSession()
    const [properties, setProperties] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (session?.user?.id) {
            getFavourites(session.user.id)
                .then(data => setProperties(Array.isArray(data) ? data : []))
                .finally(() => setLoading(false))
        }
    }, [session])

    const handleUnlike = async (propertyId) => {
        await toggleLike(propertyId, session.user.id)
        setProperties(prev => prev.filter(p => p._id !== propertyId))
    }

    if (loading) return (
        <div className="flex items-center justify-center py-20">
            <p className="text-sm text-zinc-400">Loading favourites...</p>
        </div>
    )

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-bold text-black dark:text-white">My Favourites</h2>
                    <p className="text-zinc-500 dark:text-zinc-400 mt-1">
                        You have {properties.length} propert{properties.length === 1 ? 'y' : 'ies'} saved
                    </p>
                </div>
            </div>

            {properties.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <span className="material-symbols-outlined text-6xl text-zinc-300 dark:text-zinc-600 mb-4">favorite</span>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm">No saved properties yet.</p>
                    <Link href="/allpoperties" className="mt-4 text-sm font-semibold text-secondary hover:underline">
                        Browse Properties
                    </Link>
                </div>
            ) : (
                <div className="flex flex-col gap-4 max-w-5xl">
                    {properties.map((p) => (
                        <div key={p._id} className="group bg-white dark:bg-zinc-900 border border-outline-variant/30 dark:border-zinc-700 rounded-xl overflow-hidden flex flex-col md:flex-row shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="md:w-72 h-48 md:h-auto overflow-hidden flex-shrink-0">
                                <img
                                    src={p.images}
                                    alt={p.propertyTitle}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    onError={(e) => { e.target.src = 'https://placehold.co/400x300?text=No+Image' }}
                                />
                            </div>
                            <div className="flex-1 p-6 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${p.status === 'Approved'
                                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                                : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                                }`}>
                                                {p.status}
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => handleUnlike(p._id)}
                                            className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-full transition-colors"
                                            title="Remove from favourites"
                                        >
                                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>Remove favorite</span>
                                        </button>
                                    </div>
                                    <h3 className="text-xl font-bold text-black dark:text-white group-hover:text-secondary transition-colors mb-1">
                                        {p.propertyTitle}
                                    </h3>
                                    <p className="text-sm text-zinc-500 dark:text-zinc-400 flex items-center gap-1 mb-4">
                                        <span className="material-symbols-outlined" style={{ fontSize: 16 }}>location_on</span>
                                        {p.location}
                                    </p>
                                    <div className="flex gap-6 text-zinc-500 dark:text-zinc-400 text-sm">
                                        {p.bedrooms && (
                                            <span className="flex items-center gap-1">
                                                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>bed</span>
                                                {p.bedrooms} Beds
                                            </span>
                                        )}
                                        {p.bathrooms && (
                                            <span className="flex items-center gap-1">
                                                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>bathtub</span>
                                                {p.bathrooms} Baths
                                            </span>
                                        )}
                                        {p.propertySize && (
                                            <span className="flex items-center gap-1">
                                                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>straighten</span>
                                                {p.propertySize} sqft
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-700 flex justify-between items-center">
                                    <div>
                                        <span className="text-2xl font-bold text-secondary">৳{Number(p.rent).toLocaleString()}</span>
                                        <span className="text-sm text-zinc-500 dark:text-zinc-400">/{p.rentType === 'Monthly' ? 'mo' : 'wk'}</span>
                                    </div>
                                    <Link
                                        href={`/allpoperties/${p._id}`}
                                        className="bg-secondary text-white px-6 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}