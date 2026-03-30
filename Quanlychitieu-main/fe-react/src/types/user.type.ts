export interface User {
    id: number;
    tenDangNhap: string;
    email: string;
    hoTen?: string;
    quyen: string;       // "admin" | "user"
}

export interface TaiKhoan extends User {} // Alias for backward compatibility

export interface LoginRequest {
    email: string;
    matKhau: string;
}

export interface RegisterRequest {
    tenDangNhap: string;
    email: string;
    matKhau: string;
    hoTen?: string;
}

export interface LoginResponse {
    token: string;
    taiKhoan: User;
}
