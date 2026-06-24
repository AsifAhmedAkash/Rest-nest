'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { getPropertyById } from '@/lib/api/property'
import { getOwnerInfo } from '@/lib/api/ownerinfo'
import Link from 'next/link'

export default function PropertyDetailsPage() {
    const { id } = useParams()
    const [property, setProperty] = useState(null)
    const [owner, setOwner] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!id) return
        getPropertyById(id).then(async (data) => {
            setProperty(data)
            if (data?.ownerInformation) {
                const ownerData = await getOwnerInfo(data.ownerInformation)
                setOwner(ownerData)
            }
            setLoading(false)
        })
    }, [id])

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen">
            <p className="text-zinc-400">Loading property...</p>
        </div>
    )

    if (!property?._id) return (
        <div className="flex items-center justify-center min-h-screen">
            <p className="text-zinc-400">Property not found.</p>
        </div>
    )

    return (
        <main className="max-w-6xl mx-auto px-4 md:px-16 py-10">

            {/* Hero Image */}
            <div className="relative rounded-2xl overflow-hidden h-[300px] md:h-[500px] mb-10">
                <img
                    src={property.images}
                    alt={property.propertyTitle}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = 'https://placehold.co/1200x500?text=No+Image' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold mb-3 inline-block ${property.status === 'Approved'
                        ? 'bg-emerald-500/20 border border-emerald-400/30 text-emerald-300'
                        : 'bg-yellow-500/20 border border-yellow-400/30 text-yellow-300'
                        }`}>
                        {property.status}
                    </span>
                    <h1 className="text-3xl md:text-5xl font-bold">{property.propertyTitle}</h1>
                    <p className="mt-2 flex items-center gap-1 opacity-90">
                        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>location_on</span>
                        {property.location}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Left */}
                <div className="lg:col-span-8 space-y-10">

                    {/* Overview */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { icon: 'bed', label: 'Bedrooms', value: property.bedrooms },
                            { icon: 'bathtub', label: 'Bathrooms', value: property.bathrooms },
                            { icon: 'straighten', label: 'Size', value: `${property.propertySize} sqft` },
                            { icon: 'apartment', label: 'Type', value: property.propertyType },
                        ].map(({ icon, label, value }) => (
                            <div key={label} className="bg-zinc-50 dark:bg-zinc-800 p-5 rounded-2xl flex flex-col items-center text-center">
                                <span className="material-symbols-outlined text-secondary mb-2">{icon}</span>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">{label}</p>
                                <p className="text-xl font-bold text-black dark:text-white">{value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Description */}
                    <div>
                        <h2 className="text-xl font-bold text-black dark:text-white mb-3">Description</h2>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{property.description}</p>
                    </div>

                    {/* Amenities */}
                    {property.amenities?.length > 0 && (
                        <div>
                            <h2 className="text-xl font-bold text-black dark:text-white mb-3">Amenities</h2>
                            <div className="flex flex-wrap gap-2">
                                {property.amenities.map((a) => (
                                    <span key={a} className="flex items-center gap-1.5 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-full text-sm font-medium">
                                        <span className="material-symbols-outlined text-secondary" style={{ fontSize: 16 }}>check_circle</span>
                                        {a}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Extra Features */}
                    {property.extraFeatures && (
                        <div>
                            <h2 className="text-xl font-bold text-black dark:text-white mb-3">Extra Features</h2>
                            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{property.extraFeatures}</p>
                        </div>
                    )}
                </div>

                {/* Right Sidebar */}
                <aside className="lg:col-span-4 space-y-6">

                    {/* Booking Card */}
                    <div className="bg-white dark:bg-zinc-900 border border-outline-variant/30 dark:border-zinc-700 rounded-2xl p-6 shadow-sm sticky top-24">
                        <h3 className="text-lg font-bold text-black dark:text-white mb-5">Booking Details</h3>
                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-700">
                                <span className="text-zinc-500 dark:text-zinc-400 text-sm">Monthly Rent</span>
                                <span className="font-bold text-black dark:text-white">৳{Number(property.rent).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-700">
                                <span className="text-zinc-500 dark:text-zinc-400 text-sm">Rent Type</span>
                                <span className="font-semibold text-black dark:text-white">{property.rentType}</span>
                            </div>
                            <div className="flex justify-between py-2">
                                <span className="text-zinc-500 dark:text-zinc-400 text-sm">Status</span>
                                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${property.status === 'Approved'
                                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                    : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                    }`}>{property.status}</span>
                            </div>
                        </div>
                        <Link href={`/allpoperties/${id}/bookproperty`} className="w-full bg-secondary text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity px-3">
                            Book now
                        </Link>
                    </div>

                    {/* Owner Card */}
                    {owner && (
                        <div className="bg-white dark:bg-zinc-900 border border-outline-variant/30 dark:border-zinc-700 rounded-2xl p-6 shadow-sm">
                            <h3 className="text-lg font-bold text-black dark:text-white mb-4">Listed By</h3>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-14 h-14 rounded-full overflow-hidden bg-zinc-200 dark:bg-zinc-700 flex-shrink-0">
                                    {owner.ownerImage
                                        ? <img src={owner.ownerImage} alt={owner.fullName} className="w-full h-full object-cover" />
                                        : <span className="material-symbols-outlined text-zinc-400 flex items-center justify-center h-full">person</span>
                                    }
                                </div>
                                <div>
                                    <p className="font-semibold text-black dark:text-white">{owner.fullName}</p>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400">{owner.email}</p>
                                </div>
                            </div>
                            <div className="space-y-2 text-sm">
                                {owner.mobileNumbers?.map((num, i) => (
                                    <a key={i} href={`tel:${num}`} className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-secondary transition-colors">
                                        <span className="material-symbols-outlined" style={{ fontSize: 16 }}>phone</span>
                                        {num}
                                    </a>
                                ))}
                                {owner.website && (
                                    <a href={owner.website} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-secondary hover:underline">
                                        <span className="material-symbols-outlined" style={{ fontSize: 16 }}>language</span>
                                        Website
                                    </a>
                                )}
                            </div>
                            {owner.otherInformation && (
                                <p className="mt-4 text-xs text-zinc-500 dark:text-zinc-400 border-t border-zinc-100 dark:border-zinc-700 pt-3">
                                    {owner.otherInformation}
                                </p>
                            )}
                        </div>
                    )}
                </aside>
            </div>
        </main>
    )
}