'use server'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const createProperty = async (newPropertyData) => {
    const res = await fetch(`${baseUrl}/api/property`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(newPropertyData),
    });

    return res.json();
}