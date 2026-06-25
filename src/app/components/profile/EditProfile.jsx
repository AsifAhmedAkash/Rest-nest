'use client'

import { useState } from 'react'
import { authClient } from '@/lib/auth-client'
// import toast from 'react-hot-toast'
import { toast } from '@heroui/react'

const uploadToImgBB = async (file) => {
    if (file.size > 2 * 1024 * 1024) {
        toast.warning('Image must be under 2MB')
        return null
    }
    const formData = new FormData()
    formData.append('image', file)
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`, {
        method: 'POST',
        body: formData,
    })
    const data = await res.json()
    return data.success ? data.data.url : null
}

const EditProfile = ({ user }) => {
    const [name, setName] = useState(user?.name || '')
    const [imageFile, setImageFile] = useState(null)
    const [preview, setPreview] = useState(user?.image || null)
    const [loading, setLoading] = useState(false)

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (!file) return
        setImageFile(file)
        setPreview(URL.createObjectURL(file))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            let imageUrl = user?.image  // keep existing if no new upload

            if (imageFile) {
                imageUrl = await uploadToImgBB(imageFile)
                if (!imageUrl) {
                    setLoading(false)
                    return
                }
            }

            await authClient.updateUser({
                name,
                image: imageUrl,
            })

            toast.success('Profile updated!')
        } catch (err) {
            console.error(err)
            toast.error('Failed to update profile')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
            {/* Avatar */}
            <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-zinc-200">
                    {preview
                        ? <img src={preview} alt="avatar" className="w-full h-full object-cover" />
                        : <div className="w-full h-full flex items-center justify-center text-zinc-400 text-2xl">?</div>
                    }
                </div>
                <label className="cursor-pointer text-sm text-blue-500 hover:underline">
                    Change photo
                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
            </div>

            {/* Name */}
            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Email (read-only) */}
            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-zinc-400">Email</label>
                <input
                    type="text"
                    value={user?.email || ''}
                    disabled
                    className="border rounded-lg px-3 py-2 text-sm bg-zinc-100 text-zinc-400 cursor-not-allowed"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white rounded-lg py-2 text-sm font-semibold hover:bg-blue-700 disabled:opacity-50 transition"
            >
                {loading ? 'Saving...' : 'Save changes'}
            </button>
        </form>
    )
}

export default EditProfile