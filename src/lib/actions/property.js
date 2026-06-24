'use server'

import { serverMutation } from "../core/server"

// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const createProperty = async (newPropertyData) => {
    return serverMutation('/api/property', newPropertyData)
}