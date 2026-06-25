

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const serverFetch = async (path) => {
    const res = await fetch(`${baseUrl}${path}`)
    if (!res.ok) {
        console.error(`serverFetch failed: ${res.status} — ${baseUrl}${path}`);
        return null;
    }
    return res.json();
}

export const serverMutation = async (path, data, method = 'POST') => {
    const res = await fetch(`${baseUrl}${path}`, {
        method,
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        console.error(`serverMutation failed: ${res.status} — ${baseUrl}${path}`);
        return null;
    }

    return res.json();
}

export const serverDelete = async (path) => {
    const res = await fetch(`${baseUrl}${path}`, { method: 'DELETE' });
    if (!res.ok) return null;
    return res.json();
}