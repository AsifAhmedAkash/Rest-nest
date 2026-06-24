// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

import { serverFetch } from "../core/server"

// export const getOwnerInfo = async (userId) => {
//     const res = await fetch(`${baseUrl}/api/ownerinfo?userId=${userId}`);
//     const data = await res.json();
//     return data?._id ? data : null;  // ← return null if empty object
// }

export const getOwnerInfo = async (userId) => {
    return serverFetch(`/api/ownerinfo?userId=${userId}`);
}