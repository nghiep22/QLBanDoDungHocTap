import api from './caiDatApi';
import { luuPhienDangNhap, xoaPhienDangNhap } from '../tienich/luuTru';
import type { YeuCauDangNhap, YeuCauDangKy, PhanHoiDangNhap, TaiKhoan } from '../kieu/TaiKhoan';

const LOGIN_BASE = '/api';

// Dang nhap
export async function dangNhap(duLieu: YeuCauDangNhap, ghiNho: boolean): Promise<PhanHoiDangNhap> {
    const res = await api.post<PhanHoiDangNhap>(`${LOGIN_BASE}/auth/login`, duLieu);
    if (!res.data?.token) throw new Error('Khong nhan duoc token tu server.');
    luuPhienDangNhap(res.data.token, res.data.user, ghiNho);
    return res.data;
}

// Dang ky - thu nhieu endpoint
export async function dangKy(duLieu: YeuCauDangKy): Promise<unknown> {
    const danhSachUrl = [
        `${LOGIN_BASE}/auth/register`,
        `${LOGIN_BASE}/taikhoan/register`,
        `${LOGIN_BASE}/taikhoan`,
    ];

    let lastErr: unknown = null;
    for (const url of danhSachUrl) {
        try {
            const res = await api.post(url, duLieu);
            return res.data;
        } catch (err: unknown) {
            lastErr = err;
            if ((err as { response?: { status: number } }).response?.status === 404) continue;
            throw err;
        }
    }
    throw lastErr || new Error('Khong tim thay endpoint dang ky phu hop.');
}

// Lay thong tin nguoi dang nhap
export async function layThongTinNguoiDung(): Promise<TaiKhoan> {
    const res = await api.get<TaiKhoan>(`${LOGIN_BASE}/auth/me`);
    return res.data;
}

// Dang xuat
export function dangXuat(): void {
    xoaPhienDangNhap();
}

// Chuyen huong sau dang nhap theo quyen
export function duongDanSauDangNhap(user: TaiKhoan): string {
    const quyen = (user.quyen || '').toLowerCase();
    if (quyen === 'admin') return '/quan-tri';
    return '/';
}
