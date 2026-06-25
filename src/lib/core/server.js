

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const getAuthHeaders = async () => {
    // Next.js can read HttpOnly cookies, client-side JS cannot
    const res = await fetch('/api/session-token');
    if (!res.ok) return {};
    const { token } = await res.json();
    return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const serverFetch = async (path) => {
    const authHeaders = await getAuthHeaders();
    const res = await fetch(`${baseUrl}${path}`, {
        headers: { ...authHeaders }
    });
    if (!res.ok) return null;
    return res.json();
}

export const serverMutation = async (path, data, method = 'POST') => {
    const authHeaders = await getAuthHeaders();
    const res = await fetch(`${baseUrl}${path}`, {
        method,
        headers: {
            'content-type': 'application/json',
            ...authHeaders,
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) return null;
    return res.json();
}

export const serverDelete = async (path) => {
    const authHeaders = await getAuthHeaders();
    const res = await fetch(`${baseUrl}${path}`, {
        method: 'DELETE',
        headers: { ...authHeaders }
    });
    if (!res.ok) return null;
    return res.json();
}