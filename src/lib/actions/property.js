'use server'

import { serverMutation, serverDelete } from "../core/server"

// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const createProperty = async (newPropertyData) => {
    return serverMutation('/api/property', newPropertyData)
}

export const updateProperty = async (id, data) => {
    return serverMutation(`/api/properties/${id}`, data, 'PUT')
}

export const deleteProperty = async (id) => {
    return serverDelete(`/api/properties/${id}`)
}