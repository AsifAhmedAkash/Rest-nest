'use client'

import { useState, useEffect } from 'react'
import { useSession } from '@/lib/auth-client'
// import { toggleLike } from '@/lib/api/favourites'
import { toggleLike } from '@/lib/actions/favourites'
import { HeartFill } from '@gravity-ui/icons';

const LikeButton = ({ property, initialLiked = false }) => {
    const { data: session } = useSession()
    const [liked, setLiked] = useState(initialLiked)
    const [count, setCount] = useState(Number(property.like ?? 0))
    const [loading, setLoading] = useState(false)

    // console.log("like btn");

    const handleLike = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (!session?.user?.id || loading) return

        setLoading(true)
        const res = await toggleLike(property._id, session.user.id)
        if (res) {
            setLiked(res.liked)
            setCount(prev => res.liked ? prev + 1 : prev - 1)
        }
        setLoading(false)
    }

    return (
        <button
            onClick={handleLike}
            disabled={loading}
            className={`flex items-center gap-1 transition-colors ${liked ? 'text-red-500' : 'text-white hover:text-red-400'
                }`}
        >
            <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: liked ? "'FILL' 1" : "'FILL' 0", fontSize: 20 }}
            >
                <HeartFill className='' />
            </span>
            <span className="text-xs font-semibold ">{count}</span>
        </button>
    )
}

export default LikeButton