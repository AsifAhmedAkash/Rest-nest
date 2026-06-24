'use client'

import React, { useState } from 'react'
// import { createProperty } from '@/actions/property' // adjust path
import { createProperty } from '@/lib/actions/property'
import { toast } from '@heroui/react'
// import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useSession } from '@/lib/auth-client'
const amenityOptions = [
    'WiFi',
    'Parking',
    'Lift',
    'Security',
]

const propertyTypes = [
    'Apartment',
    'Villa',
    'Commercial',
    'House',
    'Office',
]

const uploadToImgBB = async (file) => {
    if (file.size > 2 * 1024 * 1024) {
        toast.error('Image must be under 2MB');
        return null;
    }

    const formData = new FormData();
    formData.append('image', file);

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`, {
        method: 'POST',
        body: formData,
    });

    const data = await res.json();
    return data.success ? data.data.url : null;
};

const AddProperty = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false)
    const [imageUploading, setImageUploading] = useState(false);
    const validateForm = () => {
        const newErrors = {}

        if (!formData.propertyTitle.trim())
            newErrors.propertyTitle = 'Title is required'

        if (!formData.description.trim())
            newErrors.description = 'Description is required'

        if (!formData.location.trim())
            newErrors.location = 'Location is required'

        if (!formData.rent)
            newErrors.rent = 'Rent is required'

        if (!formData.bedrooms)
            newErrors.bedrooms = 'Bedrooms are required'

        if (!formData.bathrooms)
            newErrors.bathrooms = 'Bathrooms are required'

        if (!formData.propertySize)
            newErrors.propertySize = 'Property size is required'

        setErrors(newErrors)

        return Object.keys(newErrors).length === 0
    }
    const [formData, setFormData] = useState({
        propertyTitle: '',
        description: '',
        location: '',
        propertyType: 'Apartment',

        rent: '',
        rentType: 'Monthly',

        bedrooms: '',
        bathrooms: '',
        propertySize: '',

        amenities: [],

        images: '',

        extraFeatures: '',

        status: 'Pending',

    })

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const toggleAmenity = (amenity) => {
        setFormData((prev) => ({
            ...prev,
            amenities: prev.amenities.includes(amenity)
                ? prev.amenities.filter((a) => a !== amenity)
                : [...prev.amenities, amenity],
        }))
    }


    const handleSubmit = async (e) => {

        e.preventDefault()

        if (!validateForm()) {
            toast.warning('Please fill all required fields')
            return
        }
        setLoading(true)

        try {
            const res = await createProperty({
                ...formData,
                ownerInformation: session?.user?.id, // ← inject here
            });

            if (res.insertedId) {
                toast.success('Property submitted successfully')

                router.push('/dashboard/owner/myproperty')
            }
            setLoading(false)

        } catch (error) {
            console.error(error)
            toast.warning('Something went wrong')

        } finally {
            setLoading(false);
        }
    }

    return (

        <div>
            {/* bg-white -> removed */}
            <div className="lg:col-span-1 border  border-outline-variant/30 bg-background dark:bg-zinc-900 p-6 rounded-2xl shadow-[0px_4px_12px_rgba(15,23,42,0.08)] sticky top-6">

                <h3 className="text-xl font-semibold text-black dark:text-white mb-6">
                    Add New Property
                </h3>

                <form onSubmit={handleSubmit}>
                    {/* Property Title */}

                    <div>
                        <label className="block text-sm font-semibold mb-1">
                            Property Title
                        </label>

                        <input
                            name="propertyTitle"
                            value={formData.propertyTitle}
                            onChange={handleChange}
                            type="text"
                            aria-invalid={!!errors.propertyTitle}
                            className="w-full rounded-lg border  px-3 py-2"
                        />
                        {errors.propertyTitle && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.propertyTitle}
                            </p>
                        )}
                    </div>


                    {/* Description */}

                    <div>
                        <label className="block text-sm font-semibold mb-1">
                            Description
                        </label>

                        <textarea
                            rows={3}
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            aria-invalid={!!errors.description}
                            className="w-full rounded-lg border px-3 py-2"
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.description}
                            </p>
                        )}
                    </div>


                    {/* Location */}

                    <div>
                        <label className="block text-sm font-semibold mb-1">
                            Location
                        </label>

                        <input
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            type="text"
                            aria-invalid={!!errors.location}
                            className="w-full rounded-lg border px-3 py-2"
                        />
                        {errors.location && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.location}
                            </p>
                        )}
                    </div>

                    {/* Property Type */}

                    <div>
                        <label className="block text-sm font-semibold mb-1">
                            Property Type
                        </label>

                        <select
                            name="propertyType"
                            value={formData.propertyType}
                            onChange={handleChange}
                            aria-invalid={!!errors.propertyType}

                            className="w-full rounded-lg border  px-3 py-2"
                        >
                            {propertyTypes.map((type) => (
                                <option className="text-black" key={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                        {errors.propertyType && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.propertyType}
                            </p>
                        )}
                    </div>

                    {/* Rent + Rent Type */}

                    <div className="grid grid-cols-2 gap-3">

                        <div>
                            <label className="block text-sm font-semibold mb-1">
                                Rent
                            </label>

                            <input
                                name="rent"
                                value={formData.rent}
                                onChange={handleChange}
                                type="number"
                                aria-invalid={!!errors.rent}
                                className="w-full rounded-lg border px-3 py-2"
                            />
                            {errors.rent && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.rent}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-1">
                                Rent Type
                            </label>

                            <select
                                name="rentType"
                                value={formData.rentType}
                                onChange={handleChange}
                                className="w-full rounded-lg border px-3 py-2"
                            >
                                <option className="text-black">Monthly</option>
                                <option className="text-black">Weekly</option>
                                <option className="text-black">Daily</option>
                            </select>
                        </div>

                    </div>

                    {/* Bedrooms, Bathrooms, Size */}

                    <div className="grid grid-cols-3 gap-3">

                        <input
                            name="bedrooms"
                            placeholder="Bedrooms"
                            value={formData.bedrooms}
                            onChange={handleChange}
                            type="number"
                            aria-invalid={!!errors.bedrooms}
                            className="rounded-lg border px-3 py-2"
                        />


                        <input
                            name="bathrooms"
                            placeholder="Bathrooms"
                            value={formData.bathrooms}
                            onChange={handleChange}
                            type="number"
                            aria-invalid={!!errors.bathrooms}
                            className="rounded-lg border px-3 py-2"
                        />

                        <input
                            name="propertySize"
                            placeholder="Property Size"
                            value={formData.propertySize}
                            onChange={handleChange}
                            type="text"
                            aria-invalid={!!errors.propertySize}
                            className="rounded-lg border px-3 py-2"
                        />

                    </div>

                    {(errors.propertySize || errors.bedrooms || errors.bathrooms) && (
                        <p className="text-red-500 text-sm mt-1">
                            Add bedroom, bathroom and size
                        </p>
                    )}

                    {/* Amenities */}

                    <div>

                        <label className="block text-sm font-semibold mb-2">
                            Amenities
                        </label>

                        <div className="grid grid-cols-2 gap-2">

                            {amenityOptions.map((amenity) => (

                                <label
                                    key={amenity}
                                    className="flex items-center gap-2"
                                >

                                    <input
                                        type="checkbox"
                                        checked={formData.amenities.includes(amenity)}
                                        onChange={() => toggleAmenity(amenity)}
                                    />

                                    {amenity}

                                </label>

                            ))}

                        </div>

                    </div>

                    {/* Images */}

                    <div>
                        <label className="block text-sm font-semibold mb-1">
                            Images <span className="text-zinc-400 font-normal">(max 2MB)</span>
                        </label>

                        <div className="space-y-2">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (!file) return;

                                    setImageUploading(true);
                                    const url = await uploadToImgBB(file);
                                    if (url) {
                                        setFormData(prev => ({ ...prev, images: url }));
                                        toast.success('Image uploaded!');
                                    } else {
                                        toast.error('Upload failed');
                                    }
                                    setImageUploading(false);
                                }}
                                className="w-full rounded-lg border border-outline-variant dark:border-zinc-700 px-3 py-2 text-sm
                       bg-white dark:bg-zinc-800 text-black dark:text-white
                       file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0
                       file:bg-secondary file:text-white file:text-sm file:font-semibold
                       hover:file:opacity-90 cursor-pointer"
                            />

                            {imageUploading && (
                                <p className="text-sm text-zinc-400">Uploading...</p>
                            )}

                            {formData.images && !imageUploading && (
                                <div className="relative w-full h-40 rounded-lg overflow-hidden border border-outline-variant dark:border-zinc-700">
                                    <img
                                        src={formData.images}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, images: '' }))}
                                        className="absolute top-2 right-2 bg-black/50 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-black/70"
                                    >
                                        ✕
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Extra Features */}

                    <div>

                        <label className="block text-sm font-semibold mb-1">
                            Extra Features
                        </label>

                        <textarea
                            rows={3}
                            name="extraFeatures"
                            value={formData.extraFeatures}
                            onChange={handleChange}
                            className="w-full rounded-lg border px-3 py-2"
                        />

                    </div>




                    <button
                        disabled={loading || imageUploading}
                        type="submit"
                        className="w-full bg-secondary text-white py-3 rounded-xl font-semibold disabled:opacity-50"
                    >
                        {loading ? 'Submitting...' : 'Submit Property'}
                    </button>

                </form>

            </div>
        </div>
    )
}

export default AddProperty