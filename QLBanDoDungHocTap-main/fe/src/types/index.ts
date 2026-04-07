// ============================================
// ĐỊNH NGHĨA KIỂU DỮ LIỆU - AUTHENTICATION
// ============================================

// Interface cho thông tin người dùng
export interface NguoiDung {
  taiKhoan_Id: number;
  tenDangNhap: string;
  vaiTro_Id: number;
}

// Interface cho request đăng nhập
export interface YeuCauDangNhap {
  tenDangNhap: string;
  matKhau: string;
}

// Interface cho request đăng ký
export interface YeuCauDangKy {
  tenDangNhap: string;
  matKhau: string;
  vaiTro_Id?: number;
}

// Interface cho response đăng nhập/đăng ký
export interface KetQuaDangNhap {
  token: string;
  user: NguoiDung;
}

// ============================================
// ĐỊNH NGHĨA KIỂU DỮ LIỆU - SẢN PHẨM
// ============================================

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

// ============================================
// ĐỊNH NGHĨA KIỂU DỮ LIỆU - GIỎ HÀNG & ĐỠN HÀNG
// ============================================

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
