// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
// export const getMyProperty = async (ownerId) => {
//     const res = await fetch(`${baseUrl}/api/properties?ownerId=${ownerId}`);
//     return res.json();
// }

import { serverFetch } from "../core/server"


export const getMyProperty = async (ownerId) => {
    return serverFetch(`/api/properties?ownerId=${ownerId}`);
}

export const getPropertyById = async (id) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/properties/${id}`);
    if (!res.ok) return null;
    return res.json();
}

export const getAllProperties = async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.location) params.append('location', filters.location);
    if (filters.propertyType) params.append('propertyType', filters.propertyType);
    if (filters.sort) params.append('sort', filters.sort);
    return serverFetch(`/api/properties?${params.toString()}`);
}