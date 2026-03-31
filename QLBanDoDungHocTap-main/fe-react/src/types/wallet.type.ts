export interface Wallet {
  id: number;
  taiKhoanId: number;
  tenVi: string;
  loaiVi: string; // 'Tiền mặt' | 'Ngân hàng' | 'Ví điện tử'
  soDuBanDau: number;
  ghiChu?: string;
  trangThai: string; // 'Hoạt động' | 'Khóa'
  daXoa: boolean;
  ngayTao: string;
  ngayCapNhat: string;
}

export interface WalletCreateRequest {
  taiKhoanId: number;
  tenVi: string;
  loaiVi: string;
  soDuBanDau: number;
  ghiChu?: string;
}

export interface WalletUpdateRequest extends WalletCreateRequest {}

export interface WalletLockRequest {
  taiKhoanId: number;
  isLocked: boolean;
}
