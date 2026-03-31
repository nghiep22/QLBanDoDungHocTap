export interface DanhMuc {
    id: number;
    taiKhoanId: number;
    tenDanhMuc: string;
    loai: 'THU' | 'CHI';
    icon: string;
    ghiChu: string;
    mauSac: string;
    trangThai: string;
}

export interface YeuCauTaoDanhMuc {
    taiKhoanId: number;
    tenDanhMuc: string;
    loai: 'THU' | 'CHI';
    icon?: string;
    ghiChu?: string;
    mauSac?: string;
    trangThai?: string;
}
