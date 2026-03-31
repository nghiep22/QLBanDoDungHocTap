export interface GiaoDich {
    id: number;
    taiKhoanId: number;
    viId: number;
    danhMucId: number;
    soTien: number;
    loaiGD: 'THU' | 'CHI';
    ngayGD: string;
    ghiChu: string;
    tenVi?: string;
    tenDanhMuc?: string;
}

export interface YeuCauTaoGiaoDich {
    taiKhoanId: number;
    viId: number;
    danhMucId: number;
    soTien: number;
    loaiGD: 'THU' | 'CHI';
    ngayGD: string;
    ghiChu?: string;
}

export interface BoLocGiaoDich {
    taiKhoanId: number;
    from?: string;
    to?: string;
    viId?: number;
    danhMucId?: number;
    loai?: string;
    q?: string;
    page?: number;
    pageSize?: number;
    sort?: string;
    includeDeleted?: boolean;
}
