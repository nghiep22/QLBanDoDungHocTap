const KHOA = {
    token: 'token',
    nguoiDung: 'currentUser',
    taiKhoanId: 'taiKhoanId',
};

export function layToken(): string | null {
    return localStorage.getItem(KHOA.token) || sessionStorage.getItem(KHOA.token);
}

export function layNguoiDung<T>(): T | null {
    const raw = localStorage.getItem(KHOA.nguoiDung) || sessionStorage.getItem(KHOA.nguoiDung);
    if (!raw) return null;
    try { return JSON.parse(raw); } catch { return null; }
}

export function layTaiKhoanId(): number {
    const user = layNguoiDung<{ id?: number }>();
    if (user?.id) return user.id;
    return Number(localStorage.getItem(KHOA.taiKhoanId) || 0);
}

export function luuPhienDangNhap(token: string, user: unknown, ghiNho: boolean): void {
    xoaPhienDangNhap();
    const store = ghiNho ? localStorage : sessionStorage;
    store.setItem(KHOA.token, token);
    store.setItem(KHOA.nguoiDung, JSON.stringify(user));
}

export function xoaPhienDangNhap(): void {
    localStorage.removeItem(KHOA.token);
    localStorage.removeItem(KHOA.nguoiDung);
    sessionStorage.removeItem(KHOA.token);
    sessionStorage.removeItem(KHOA.nguoiDung);
}
