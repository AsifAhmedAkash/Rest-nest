'use client'

import { useState } from 'react'
import {
    useStripe,
    useElements,
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
} from '@stripe/react-stripe-js'
import { useRouter } from 'next/navigation'
import { toast } from '@heroui/react'
import { serverMutation } from '@/lib/core/server'

const cardStyle = {
    style: {
        base: {
            fontSize: '16px',
            color: '#111827',
            backgroundColor: 'transparent',
            fontFamily: 'Inter, sans-serif',
            '::placeholder': { color: '#9ca3af' },
            iconColor: '#6b7280',
        },
        invalid: { color: '#ba1a1a' },
    }
}

const PaymentForm = ({ property, tenant }) => {
    const stripe = useStripe()
    const elements = useElements()
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const handlePay = async (e) => {
        e.preventDefault()
        if (!stripe || !elements) return

        setLoading(true)
        try {
            const { clientSecret } = await serverMutation('/api/create-payment-intent', {
                amount: Number(property.rent) * 100,
                currency: 'bdt',
            })

            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: tenant.name,
                        email: tenant.email,
                    },
                },
            })

            if (error) {
                toast.error(error.message)
                return
            }

            if (paymentIntent.status === 'succeeded') {
                const pendingBooking = JSON.parse(sessionStorage.getItem('pendingBooking'))

                await serverMutation('/api/booking', {
                    ...pendingBooking,
                    bookingStatus: 'Confirmed',
                })

                await serverMutation('/api/payments', {
                    ...pendingBooking,
                    stripePaymentIntentId: paymentIntent.id,
                    amount: Number(property.rent),
                    currency: 'bdt',
                    status: 'succeeded',
                    paidAt: new Date().toISOString(),
                })

                sessionStorage.removeItem('pendingBooking')
                toast.success('Payment successful!')
                router.push('/payment/success')
            }
        } catch (err) {
            console.error(err)
            toast.error('Payment failed. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Complete Payment</h2>
                <p className="text-gray-500 text-sm mb-8">
                    {property.propertyTitle} · ৳{Number(property.rent).toLocaleString()}/{property.rentType === 'Monthly' ? 'mo' : 'wk'}
                </p>

                <form onSubmit={handlePay} className="space-y-5">

                    {/* Card Number */}
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-800">Card Number</label>
                        <div className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white">
                            <CardNumberElement options={cardStyle} />
                        </div>
                    </div>

                    {/* Expiry */}
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-800">Expiry Date</label>
                        <div className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white">
                            <CardExpiryElement options={cardStyle} />
                        </div>
                    </div>

                    {/* CVC */}
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-800">CVC</label>
                        <div className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white">
                            <CardCvcElement options={cardStyle} />
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-500">Rent</span>
                            <span className="font-semibold text-gray-900">৳{Number(property.rent).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Rent Type</span>
                            <span className="font-semibold text-gray-900">{property.rentType}</span>
                        </div>
                        <div className="border-t border-gray-200 pt-2 flex justify-between">
                            <span className="font-semibold text-gray-900">Total</span>
                            <span className="font-bold text-secondary">৳{Number(property.rent).toLocaleString()}</span>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={!stripe || loading}
                        className="w-full h-14 bg-secondary text-white font-semibold rounded-xl hover:opacity-90 active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {loading ? 'Processing...' : (
                            <>
                                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>lock</span>
                                Pay ৳{Number(property.rent).toLocaleString()}
                            </>
                        )}
                    </button>

                    <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1">
                        <span className="material-symbols-outlined" style={{ fontSize: 14 }}>verified_user</span>
                        Secured by Stripe. We never store your card details.
                    </p>
                </form>
            </div>
        </div>
    )
}

export default PaymentForm