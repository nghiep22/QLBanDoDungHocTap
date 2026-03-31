export interface SanPham {
  id: number;
  ma: string;
  ten: string;
  moTa?: string;
  giaBan: number;
  giaGoc?: number;
  hinhAnh: string;
  loaiId: number;
  tenLoai?: string;
  soLuongTon: number;
  giamGia?: number;
  hot?: boolean;
  moi?: boolean;
  daBan?: number;
}

export interface LoaiSanPham {
  id: number;
  ten: string;
  moTa?: string;
  icon?: string;
}

export interface GioHang {
  sanPham: SanPham;
  soLuong: number;
}

export interface DonHang {
  id?: number;
  maDonHang?: string;
  khachHangId?: number;
  ngayDat: Date;
  tongTien: number;
  trangThai: string;
  diaChiGiao: string;
  soDienThoai: string;
  hoTen: string;
  chiTiet: ChiTietDonHang[];
}

export interface ChiTietDonHang {
  sanPhamId: number;
  tenSanPham: string;
  soLuong: number;
  giaBan: number;
  thanhTien: number;
}
