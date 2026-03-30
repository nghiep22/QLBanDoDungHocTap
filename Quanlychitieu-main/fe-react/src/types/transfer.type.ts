export interface WalletTransfer {
  id: number;
  taiKhoanId: number;
  viNguonId: number;
  viDichId: number;
  soTien: number;
  ngayChuyen: string;
  ghiChu?: string;
  giaoDichChiId: number;
  giaoDichThuId: number;
  trangThai: string;
  daXoa: boolean;
  ngayTao: string;
}

export interface WalletTransferCreateRequest {
  taiKhoanId: number;
  viNguonId: number;
  viDichId: number;
  soTien: number;
  ngayChuyen: string;
  ghiChu?: string;
}

export interface WalletTransferQueryParams {
  taiKhoanId: number;
  from?: string;
  to?: string;
  viNguonId?: number;
  viDichId?: number;
  page?: number;
  pageSize?: number;
  includeDeleted?: boolean;
}
