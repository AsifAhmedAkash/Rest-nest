'use client'

import React, { useState } from 'react'
import { useSession } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { toast } from '@heroui/react'
import { createOwnerInfo } from '@/lib/actions/ownerinfo'

const OwnerInfoForm = () => {
    const { data: session } = useSession()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [imageUploading, setImageUploading] = useState(false)
    const [errors, setErrors] = useState({})

    const [formData, setFormData] = useState({
        fullName: '',
        address: '',
        mobileNumbers: ['', ''],
        tinNumber: '',
        website: '',
        ownerImage: '',
        otherInformation: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleMobileChange = (index, value) => {
        const updated = [...formData.mobileNumbers]
        updated[index] = value
        setFormData(prev => ({ ...prev, mobileNumbers: updated }))
    }

    const addMobileNumber = () => {
        setFormData(prev => ({ ...prev, mobileNumbers: [...prev.mobileNumbers, ''] }))
    }

    const removeMobileNumber = (index) => {
        if (formData.mobileNumbers.length <= 2) return
        setFormData(prev => ({
            ...prev,
            mobileNumbers: prev.mobileNumbers.filter((_, i) => i !== index)
        }))
    }

    const uploadToImgBB = async (file) => {
        if (file.size > 2 * 1024 * 1024) {
            toast.error('Image must be under 2MB')
            return null
        }
        const data = new FormData()
        data.append('image', file)
        const res = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`, {
            method: 'POST',
            body: data,
        })
        const json = await res.json()
        return json.success ? json.data.url : null
    }

    const validate = () => {
        const newErrors = {}
        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
        if (!formData.address.trim()) newErrors.address = 'Address is required'
        if (!formData.mobileNumbers[0].trim()) newErrors.mobile0 = 'First mobile number is required'
        if (!formData.mobileNumbers[1].trim()) newErrors.mobile1 = 'Second mobile number is required'
        if (!formData.tinNumber.trim()) newErrors.tinNumber = 'TIN number is required'
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validate()) {
            toast.warning('Please fill all required fields')
            return
        }

        setLoading(true)
        try {
            const payload = {
                ...formData,
                email: session?.user?.email,
                userId: session?.user?.id,
            }

            const res = await createOwnerInfo(payload)

            if (res.insertedId) {
                toast.success('Owner info saved!')
                router.push('/dashboard/owner')
            } else {
                toast.error('Failed to save. Try again.')
            }
        } catch (err) {
            console.error(err)
            toast.error('Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="lg:col-span-1 border border-outline-variant/30 bg-background dark:bg-zinc-900 p-6 rounded-2xl shadow-[0px_4px_12px_rgba(15,23,42,0.08)]">
            <h3 className="text-xl font-semibold text-black dark:text-white mb-1">Owner Information</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">This information will be shown to tenants.</p>

            <form onSubmit={handleSubmit} className="space-y-5">

                {/* Full Name */}
                <div>
                    <label className="block text-sm font-semibold mb-1 text-black dark:text-white">Full Name</label>
                    <input
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-white px-3 py-2 text-sm"
                    />
                    {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                </div>

                {/* Email — read only from session */}
                <div>
                    <label className="block text-sm font-semibold mb-1 text-black dark:text-white">Email Address</label>
                    <input
                        value={session?.user?.email ?? 'Loading...'}
                        readOnly
                        className="w-full rounded-lg border border-gray-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800/60 text-zinc-500 dark:text-zinc-400 px-3 py-2 text-sm cursor-not-allowed"
                    />
                </div>

                {/* Address */}
                <div>
                    <label className="block text-sm font-semibold mb-1 text-black dark:text-white">Address</label>
                    <input
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="123 Main St, City"
                        className="w-full rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-white px-3 py-2 text-sm"
                    />
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                </div>

                {/* Mobile Numbers */}
                <div>
                    <label className="block text-sm font-semibold mb-2 text-black dark:text-white">
                        Mobile Numbers <span className="text-zinc-400 font-normal">(at least 2)</span>
                    </label>
                    <div className="space-y-2">
                        {formData.mobileNumbers.map((num, index) => (
                            <div key={index} className="flex gap-2 items-center">
                                <input
                                    value={num}
                                    onChange={(e) => handleMobileChange(index, e.target.value)}
                                    placeholder={`Mobile ${index + 1}`}
                                    type="tel"
                                    className="flex-1 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-white px-3 py-2 text-sm"
                                />
                                {index >= 2 && (
                                    <button
                                        type="button"
                                        onClick={() => removeMobileNumber(index)}
                                        className="text-red-400 hover:text-red-500 transition-colors"
                                    >
                                        <span className="material-symbols-outlined" style={{ fontSize: 20 }}>remove_circle</span>
                                    </button>
                                )}
                            </div>
                        ))}
                        {errors.mobile0 && <p className="text-red-500 text-xs">{errors.mobile0}</p>}
                        {errors.mobile1 && <p className="text-red-500 text-xs">{errors.mobile1}</p>}
                        <button
                            type="button"
                            onClick={addMobileNumber}
                            className="flex items-center gap-1 text-sm text-secondary font-semibold hover:opacity-80 transition-opacity mt-1"
                        >
                            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>add_circle</span>
                            Add another number
                        </button>
                    </div>
                </div>

                {/* TIN Number */}
                <div>
                    <label className="block text-sm font-semibold mb-1 text-black dark:text-white">TIN Number</label>
                    <input
                        name="tinNumber"
                        value={formData.tinNumber}
                        onChange={handleChange}
                        placeholder="e.g. 123-456-789"
                        className="w-full rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-white px-3 py-2 text-sm"
                    />
                    {errors.tinNumber && <p className="text-red-500 text-xs mt-1">{errors.tinNumber}</p>}
                </div>

                {/* Website */}
                <div>
                    <label className="block text-sm font-semibold mb-1 text-black dark:text-white">
                        Website <span className="text-zinc-400 font-normal">(optional)</span>
                    </label>
                    <input
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        placeholder="https://yourwebsite.com"
                        type="url"
                        className="w-full rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-white px-3 py-2 text-sm"
                    />
                </div>

                {/* Owner Image */}
                <div>
                    <label className="block text-sm font-semibold mb-1 text-black dark:text-white">
                        Profile Image <span className="text-zinc-400 font-normal">(max 2MB)</span>
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                            const file = e.target.files?.[0]
                            if (!file) return
                            setImageUploading(true)
                            const url = await uploadToImgBB(file)
                            if (url) {
                                setFormData(prev => ({ ...prev, ownerImage: url }))
                                toast.success('Image uploaded!')
                            } else {
                                toast.error('Upload failed')
                            }
                            setImageUploading(false)
                        }}
                        className="w-full rounded-lg border border-gray-300 dark:border-zinc-700 px-3 py-2 text-sm
                                   bg-white dark:bg-zinc-800 text-black dark:text-white
                                   file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0
                                   file:bg-secondary file:text-white file:text-sm file:font-semibold
                                   hover:file:opacity-90 cursor-pointer"
                    />
                    {imageUploading && <p className="text-sm text-zinc-400 mt-1">Uploading...</p>}
                    {formData.ownerImage && !imageUploading && (
                        <div className="relative mt-2 w-20 h-20 rounded-full overflow-hidden border-2 border-secondary">
                            <img src={formData.ownerImage} alt="Preview" className="w-full h-full object-cover" />
                            <button
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, ownerImage: '' }))}
                                className="absolute inset-0 bg-black/50 text-white text-xs flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                            >
                                Remove
                            </button>
                        </div>
                    )}
                </div>

                {/* Other Information */}
                <div>
                    <label className="block text-sm font-semibold mb-1 text-black dark:text-white">
                        Other Information <span className="text-zinc-400 font-normal">(optional)</span>
                    </label>
                    <textarea
                        rows={3}
                        name="otherInformation"
                        value={formData.otherInformation}
                        onChange={handleChange}
                        placeholder="Anything else tenants should know about you..."
                        className="w-full rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-white px-3 py-2 text-sm resize-none"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading || imageUploading}
                    className="w-full bg-secondary text-white py-3 rounded-xl font-semibold disabled:opacity-50 transition-opacity"
                >
                    {loading ? 'Saving...' : 'Save Owner Info'}
                </button>

            </form>
        </div>
    )
}

export default OwnerInfoForm