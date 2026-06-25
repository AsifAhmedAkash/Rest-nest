'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from '@heroui/react'
import { createNewBooking } from '@/lib/actions/booking'

const BookThisProperty = ({ tenant, property }) => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        fullName: tenant?.name ?? '',
        mobileNumber: '',
        socialLink: '',
        stayDuration: '',
        stayUnit: 'months',
        moveInDate: '',
        questions: '',
        agreed: false,
    })

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!formData.agreed) {
            toast.warning('Please confirm you have read all the info')
            return
        }

        setLoading(true)
        try {
            // store form data temporarily in sessionStorage
            sessionStorage.setItem('pendingBooking', JSON.stringify({
                propertyId: property._id,
                propertyTitle: property.propertyTitle,
                ownerId: property.ownerInformation,
                tenantUserId: tenant.id,
                tenantName: tenant.name,
                tenantEmail: tenant.email,
                fullName: formData.fullName,
                mobileNumber: formData.mobileNumber,
                socialLink: formData.socialLink,
                stayDuration: `${formData.stayDuration} ${formData.stayUnit}`,
                moveInDate: formData.moveInDate,
                questions: formData.questions,
                bookingStatus: 'Pending',
            }))

            // redirect to payment page with property id
            router.push(`/payment/${property._id}`)

        } catch (err) {
            console.error(err)
            toast.error('Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="bg-white dark:bg-zinc-900 border border-outline-variant/30 dark:border-zinc-700 rounded-2xl overflow-hidden p-8 md:p-12 shadow-sm">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-black dark:text-white mb-2">Book This Property</h1>
                    <p className="text-zinc-500 dark:text-zinc-400">
                        Applying for <span className="text-secondary font-semibold">{property.propertyTitle}</span>
                    </p>
                    <p className="text-sm text-zinc-400 mt-1">{property.location} · ৳{Number(property.rent).toLocaleString()}/{property.rentType === 'Monthly' ? 'mo' : 'wk'}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Full Name */}
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-black dark:text-white flex items-center gap-2">
                            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>person</span>
                            Full Name
                        </label>
                        <input
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            placeholder="John Doe"
                            className="w-full h-12 px-4 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-white focus:border-secondary focus:ring-1 focus:ring-secondary/20 outline-none transition-all"
                        />
                    </div>

                    {/* Email — read only */}
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-black dark:text-white flex items-center gap-2">
                            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>mail</span>
                            Email Address
                        </label>
                        <input
                            value={tenant?.email ?? ''}
                            readOnly
                            className="w-full h-12 px-4 rounded-lg border border-gray-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800/60 text-zinc-500 dark:text-zinc-400 cursor-not-allowed outline-none"
                        />
                    </div>

                    {/* Mobile */}
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-black dark:text-white flex items-center gap-2">
                            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>phone</span>
                            Mobile Number
                        </label>
                        <input
                            name="mobileNumber"
                            value={formData.mobileNumber}
                            onChange={handleChange}
                            required
                            type="tel"
                            placeholder="+880 1700 000000"
                            className="w-full h-12 px-4 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-white focus:border-secondary focus:ring-1 focus:ring-secondary/20 outline-none transition-all"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-black dark:text-white flex items-center gap-2">
                            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>calendar_today</span>
                            Move In Date
                        </label>
                        <input
                            name="moveInDate"
                            value={formData.moveInDate}
                            onChange={handleChange}
                            required
                            type="date"
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full h-12 px-4 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-white focus:border-secondary focus:ring-1 focus:ring-secondary/20 outline-none transition-all"
                        />
                    </div>

                    {/* Stay Duration */}
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-black dark:text-white flex items-center gap-2">
                            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>calendar_month</span>
                            How long are you planning to stay?
                        </label>
                        <div className="flex gap-2">
                            <input
                                name="stayDuration"
                                value={formData.stayDuration}
                                onChange={handleChange}
                                required
                                type="number"
                                min="1"
                                placeholder="e.g. 6"
                                className="flex-1 h-12 px-4 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-white focus:border-secondary focus:ring-1 focus:ring-secondary/20 outline-none transition-all"
                            />
                            <select
                                name="stayUnit"
                                value={formData.stayUnit}
                                onChange={handleChange}
                                className="h-12 px-4 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-white focus:border-secondary outline-none transition-all"
                            >
                                <option value="days">Days</option>
                                <option value="weeks">Weeks</option>
                                <option value="months">Months</option>
                                <option value="years">Years</option>
                            </select>
                        </div>
                    </div>

                    {/* Social Link */}
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-black dark:text-white flex items-center gap-2">
                            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>link</span>
                            Social Media Link <span className="text-zinc-400 font-normal">(optional)</span>
                        </label>
                        <input
                            name="socialLink"
                            value={formData.socialLink}
                            onChange={handleChange}
                            type="url"
                            placeholder="https://linkedin.com/in/username"
                            className="w-full h-12 px-4 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-white focus:border-secondary focus:ring-1 focus:ring-secondary/20 outline-none transition-all"
                        />
                    </div>

                    {/* Questions */}
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-black dark:text-white flex items-center gap-2">
                            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>chat_bubble</span>
                            Additional Info <span className="text-zinc-400 font-normal">(optional)</span>
                        </label>
                        <textarea
                            name="questions"
                            value={formData.questions}
                            onChange={handleChange}
                            rows={4}
                            placeholder="Tell us about your requirements or any questions..."
                            className="w-full p-4 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-white focus:border-secondary focus:ring-1 focus:ring-secondary/20 outline-none transition-all resize-none"
                        />
                    </div>

                    {/* Agree */}
                    <div className="flex items-start gap-3 py-2">
                        <input
                            id="agreed"
                            name="agreed"
                            type="checkbox"
                            checked={formData.agreed}
                            onChange={handleChange}
                            className="mt-1 w-5 h-5 text-secondary border-gray-300 rounded"
                        />
                        <label htmlFor="agreed" className="text-sm text-zinc-600 dark:text-zinc-400 cursor-pointer">
                            Ive read all the description and I understand the terms
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-14 bg-secondary text-white font-semibold rounded-xl hover:opacity-90 active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {loading ? 'Submitting...' : (
                            <>
                                Confirm Booking
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </>
                        )}
                    </button>
                </form>
            </div>

            {/* Trust badges */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                    { icon: 'verified_user', title: 'Secure Process', sub: 'SSL Encrypted' },
                    { icon: 'speed', title: 'Fast Response', sub: 'Within 24 Hours' },
                    { icon: 'support_agent', title: 'Live Support', sub: 'Available 24/7' },
                ].map(({ icon, title, sub }) => (
                    <div key={title} className="bg-zinc-50 dark:bg-zinc-800 p-4 rounded-xl flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-secondary/10 text-secondary flex items-center justify-center flex-shrink-0">
                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-black dark:text-white">{title}</p>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">{sub}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BookThisProperty