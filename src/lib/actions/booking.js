'use server'

import { serverMutation } from "../core/server"

// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const createNewBooking = async (bookingData) => {
    return serverMutation('/api/booking', bookingData)
}