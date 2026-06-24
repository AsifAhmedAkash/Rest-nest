// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
// export const getMyProperty = async (ownerId) => {
//     const res = await fetch(`${baseUrl}/api/properties?ownerId=${ownerId}`);
//     return res.json();
// }

import { serverFetch } from "../core/server"


export const getMyProperty = async (ownerId) => {
    return serverFetch(`/api/properties?ownerId=${ownerId}`);
}