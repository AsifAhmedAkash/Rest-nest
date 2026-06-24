'use server'

import { serverMutation } from "../core/server"

// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
// export const createOwnerInfo = async (newOwnerInfo) => {
//     const res = await fetch(`${baseUrl}/api/ownerinfo`, {
//         method: 'POST',
//         headers: {
//             'content-type': 'application/json',
//         },
//         body: JSON.stringify(newOwnerInfo),
//     });

//     return res.json();
// }

export const createOwnerInfo = async (newOwnerInfo) => {
    return serverMutation('/api/ownerinfo', newOwnerInfo);
}