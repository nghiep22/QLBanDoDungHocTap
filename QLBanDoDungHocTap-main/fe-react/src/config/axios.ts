import axios from 'axios';
import { getToken } from '../utils/storage';

// API Gateway base URL (Ocelot)
const GATEWAY_BASE = 'http://localhost:7001';

// Create axios instance
const api = axios.create({
    baseURL: GATEWAY_BASE,
    headers: { 'Content-Type': 'application/json' },
});

// Interceptor: automatically attach Bearer token
api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Helper: try multiple endpoints
export async function callMultipleEndpoints<T>(
    urls: string[],
    config: { method: string; data?: unknown }
): Promise<T> {
    let lastErr: unknown = null;
    for (const url of urls) {
        try {
            const res = await api.request<T>({ url, ...config });
            return res.data;
        } catch (err: unknown) {
            lastErr = err;
            if (axios.isAxiosError(err) && err.response?.status === 404) continue;
            throw err;
        }
    }
    throw lastErr || new Error('Could not call any endpoint.');
}

export default api;
