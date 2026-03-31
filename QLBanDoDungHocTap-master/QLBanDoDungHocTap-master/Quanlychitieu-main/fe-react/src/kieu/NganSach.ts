export interface NganSach {
    id: number;
    danhMucId: number;
    tenDanhMuc?: string;
    soTienGioiHan: number;
    soDaDung: number;
    tgBatDau?: string;
    tgKetThuc?: string;
}

export interface MucTieu {
    id: number;
    tenMucTieu: string;
    soTienCanDat: number;
    soTienHienTai: number;
    hanChot: string;
}

export interface YeuCauDongGop {
    mucTieuId: number;
    soTien: number;
    ghiChu?: string;
}
