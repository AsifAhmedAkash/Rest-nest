import { serverFetch, serverMutation } from '../core/server'

export const getFavourites = async (tenantId) => {
    return serverFetch(`/api/favourites?tenantId=${tenantId}`)
}

export const checkLiked = async (tenantId) => {
    return serverFetch(`/api/favourites?tenantId=${tenantId}`)
}