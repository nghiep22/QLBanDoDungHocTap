export interface TaiKhoan {
    id: number;
    tenDangNhap: string;
    hoTen: string;
    quyen: string;       // "admin" | "user"
}

export interface YeuCauDangNhap {
    tenDangNhap: string;
    matKhau: string;
}

export interface YeuCauDangKy {
    hoTen: string;
    tenDangNhap: string;
    matKhau: string;
}

export interface PhanHoiDangNhap {
    token: string;
    user: TaiKhoan;
}
