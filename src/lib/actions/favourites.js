import { serverMutation } from "../core/server"

export const toggleLike = async (propertyId, tenantId) => {
    return serverMutation(`/api/properties/${propertyId}/like`, { tenantId }, 'PATCH')
}