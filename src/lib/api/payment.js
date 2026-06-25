import { serverFetch } from '../core/server'

export const getMyPayments = async (tenantUserId) => {
    return serverFetch(`/api/payments?tenantUserId=${tenantUserId}`)
}

export const getBookingsByOwner = async (ownerId) => {
    return serverFetch(`/api/payments?ownerId=${ownerId}`)
}