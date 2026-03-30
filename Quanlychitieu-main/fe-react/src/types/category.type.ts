export interface Category {
  id: number;
  taiKhoanId: number;
  tenDanhMuc: string;
  loai: 'THU' | 'CHI';
  icon?: string;
  mauSac?: string;
  ghiChu?: string;
  trangThai: 'Hoạt động' | 'Khóa';
  daXoa: boolean;
  ngayTao: string;
  ngayCapNhat: string;
}

export interface CategoryCreateRequest {
  taiKhoanId: number;
  tenDanhMuc: string;
  loai: 'THU' | 'CHI';
  icon?: string;
  mauSac?: string;
  ghiChu?: string;
}

export interface CategoryUpdateRequest extends CategoryCreateRequest {}

export interface CategoryLockRequest {
  taiKhoanId: number;
  isLocked: boolean;
}
