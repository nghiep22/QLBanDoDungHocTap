export interface Vi {
    id: number;
    taiKhoanId: number;
    tenVi: string;
    loaiVi: string;          // "TIEN_MAT" | "NGAN_HANG" | "VI_DI_DONG"
    soDuBanDau: number;
    soDuHienTai?: number;    // tinh tren FE
    isLocked: boolean;
    isDeleted?: boolean;
}

export interface YeuCauTaoVi {
    taiKhoanId: number;
    tenVi: string;
    loaiVi: string;
    soDuBanDau: number;
}

export interface YeuCauSuaVi {
    tenVi: string;
    loaiVi: string;
    soDuBanDau: number;
}
