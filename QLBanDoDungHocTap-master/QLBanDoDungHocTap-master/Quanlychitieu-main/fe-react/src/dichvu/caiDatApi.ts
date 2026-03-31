import axios from 'axios';
import { layToken } from '../tienich/luuTru';

// API Gateway base URL (Ocelot)
const GATEWAY_BASE = 'http://localhost:7001';

// Tao axios instance
const api = axios.create({
    baseURL: GATEWAY_BASE,
    headers: { 'Content-Type': 'application/json' },
});

// Interceptor: tu dong gan Bearer token
api.interceptors.request.use((config) => {
    const token = layToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Helper: thu nhieu endpoint (tuong tu goiNhieuEndpoint trong code cu)
export async function goiNhieuEndpoint<T>(
    danhSachUrl: string[],
    cauHinh: { method: string; data?: unknown }
): Promise<T> {
    let lastErr: unknown = null;
    for (const url of danhSachUrl) {
        try {
            const res = await api.request<T>({ url, ...cauHinh });
            return res.data;
        } catch (err: unknown) {
            lastErr = err;
            if (axios.isAxiosError(err) && err.response?.status === 404) continue;
            throw err;
        }
    }
    throw lastErr || new Error('Khong goi duoc endpoint nao.');
}

export default api;
