'use client'

import { useEffect, useState } from 'react'
import { useSession } from '@/lib/auth-client'
// import { getOwnerInfo } from '@/lib/api/ownerInfo'
import { getOwnerInfo } from '@/lib/api/ownerinfo'
import Link from 'next/link'

const ProfilePage = () => {
    const { data: session } = useSession()
    const [owner, setOwner] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        if (session?.user?.id) {
            getOwnerInfo(session.user.id)
                .then(data => setOwner(data?._id ? data : null))
                .finally(() => setLoading(false))
        }
    }, [session])

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <p className="text-sm text-zinc-400">Loading profile...</p>
            </div>
        )
    }

    if (!owner) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="text-center border border-outline-variant/30 dark:border-zinc-700 rounded-2xl p-10 max-w-sm w-full bg-white dark:bg-zinc-900 shadow-sm">
                    <span className="material-symbols-outlined text-5xl text-zinc-300 dark:text-zinc-600">person_off</span>
                    <h3 className="text-lg font-semibold text-black dark:text-white mt-4 mb-2">Profile Incomplete</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
                        Update your owner information to get verified and list properties.
                    </p>
                    <Link
                        href="/dashboard/owner/addownerinfo"
                        className="inline-block bg-secondary text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
                    >
                        Complete Your Profile
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6">

            {/* Header */}
            <div className="flex items-center gap-5 bg-white dark:bg-zinc-900 border border-outline-variant/30 dark:border-zinc-700 rounded-2xl p-6 shadow-sm">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-secondary flex-shrink-0 bg-zinc-200 dark:bg-zinc-700">
                    {owner.ownerImage
                        ? <img src={owner.ownerImage} alt={owner.fullName} className="w-full h-full object-cover" />
                        : <span className="material-symbols-outlined text-4xl text-zinc-400 flex items-center justify-center h-full">person</span>
                    }
                </div>
                <div>
                    <h2 className="text-xl font-bold text-black dark:text-white">{owner.fullName}</h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">{owner.email}</p>
                    <span className="inline-block mt-1 px-3 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                        Verified Owner
                    </span>
                </div>

            </div>

            {/* Details */}
            <div className="bg-white dark:bg-zinc-900 border border-outline-variant/30 dark:border-zinc-700 rounded-2xl p-6 shadow-sm space-y-4">
                <h3 className="text-base font-semibold text-black dark:text-white">Contact Details</h3>

                <InfoRow icon="location_on" label="Address" value={owner.address} />
                <InfoRow icon="mail" label="Email" value={owner.email} />

                <div className="flex gap-3">
                    <span className="material-symbols-outlined text-zinc-400" style={{ fontSize: 20 }}>phone</span>
                    <div>
                        <p className="text-xs text-zinc-400 mb-1">Mobile Numbers</p>
                        {owner.mobileNumbers?.map((num, i) => (
                            <p key={i} className="text-sm text-black dark:text-white">{num}</p>
                        ))}
                    </div>
                </div>

                {owner.website && <InfoRow icon="language" label="Website" value={
                    <a href={owner.website} target="_blank" rel="noreferrer" className="text-secondary hover:underline text-sm">
                        {owner.website}
                    </a>
                } />}

                <InfoRow icon="badge" label="TIN Number" value={owner.tinNumber} />

                {owner.otherInformation && (
                    <InfoRow icon="info" label="Other Information" value={owner.otherInformation} />
                )}
            </div>
        </div>
    )
}

// small helper
const InfoRow = ({ icon, label, value }) => (
    <div className="flex gap-3">
        <span className="material-symbols-outlined text-zinc-400" style={{ fontSize: 20 }}>{icon}</span>
        <div>
            <p className="text-xs text-zinc-400 mb-0.5">{label}</p>
            {typeof value === 'string'
                ? <p className="text-sm text-black dark:text-white">{value}</p>
                : value
            }
        </div>
    </div>
)

export default ProfilePage