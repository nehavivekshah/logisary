const API_URL = 'http://localhost:3000';

export const api = {
    get: async (endpoint: string, token?: string) => {
        const headers: HeadersInit = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const res = await fetch(`${API_URL}${endpoint}`, { headers });
        if (!res.ok) {
            const error = await res.json().catch(() => ({ message: 'An error occurred' }));
            throw error;
        }
        return res.json();
    },

    post: async (endpoint: string, body: any, token?: string) => {
        const headers: HeadersInit = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const res = await fetch(`${API_URL}${endpoint}`, {
            method: 'POST',
            headers,
            body: JSON.stringify(body),
        });
        if (!res.ok) {
            const error = await res.json().catch(() => ({ message: 'An error occurred' }));
            throw error;
        }
        return res.json();
    },

    patch: async (endpoint: string, body: any, token?: string) => {
        const headers: HeadersInit = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const res = await fetch(`${API_URL}${endpoint}`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify(body),
        });
        if (!res.ok) {
            const error = await res.json().catch(() => ({ message: 'An error occurred' }));
            throw error;
        }
        return res.json();
    }
};
