'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
// import PaymentForm from '@/components/PaymentForm'
import PaymentForm from '@/app/components/payment/PaymentForm'
import { getPropertyById } from '@/lib/api/property'
import { useSession } from '@/lib/auth-client'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

export default function PaymentPage() {
    const { id } = useParams()
    const { data: session } = useSession()
    const [property, setProperty] = useState(null)

    useEffect(() => {
        if (id) getPropertyById(id).then(setProperty)
    }, [id])

    if (!property) return (
        <div className="flex items-center justify-center min-h-screen">
            <p className="text-zinc-400">Loading...</p>
        </div>
    )

    return (
        <Elements stripe={stripePromise}>
            <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center px-4 py-12">
                <PaymentForm
                    property={property}
                    tenant={session?.user}
                />
            </div>
        </Elements>
    )
}