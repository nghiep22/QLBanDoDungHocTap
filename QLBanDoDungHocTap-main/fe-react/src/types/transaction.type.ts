export interface Transaction {
  id: number;
  taiKhoanId: number;
  viId: number;
  danhMucId: number;
  soTien: number;
  loaiGD: 'THU' | 'CHI';
  ngayGD: string;
  ghiChu?: string;
  anhHoaDon?: string;
  daXoa: boolean;
  ngayTao: string;
  ngayCapNhat: string;
}

export interface TransactionCreateRequest {
  taiKhoanId: number;
  viId: number;
  danhMucId: number;
  soTien: number;
  loaiGD: 'THU' | 'CHI';
  ngayGD: string;
  ghiChu?: string;
  anhHoaDon?: string;
}

export interface TransactionUpdateRequest extends TransactionCreateRequest {}

export interface TransactionQueryParams {
  taiKhoanId: number;
  from?: string;
  to?: string;
  viId?: number;
  danhMucId?: number;
  loai?: 'THU' | 'CHI';
  q?: string;
  page?: number;
  pageSize?: number;
  sort?: string;
  includeDeleted?: boolean;
}

