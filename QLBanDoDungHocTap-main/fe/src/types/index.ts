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

// Interface sản phẩm từ API backend
export interface SanPhamAPI {
  sanPham_Id: number;
  loai_Id: number;
  nhaCungCap_Id: number;
  maSanPham?: string;
  tenSanPham: string;
  moTa?: string;
  giaBan: number;
  giaNhap: number;
  hinhAnh?: string;
  loaiCon?: string;
  thuongHieu?: string;
  mauSac?: string;
  soLuongTon?: number;
  soLuongToiThieu?: number;
  trangThai: boolean;
  ngayTao: string;
}

// Interface để tạo sản phẩm mới
export interface TaoSanPhamRequest {
  loai_Id: number;
  nhaCungCap_Id: number;
  maSanPham?: string;
  tenSanPham: string;
  moTa?: string;
  giaBan: number;
  giaNhap: number;
  hinhAnh?: string;
  loaiCon?: string;
  thuongHieu?: string;
  mauSac?: string;
}

// Interface để cập nhật sản phẩm
export interface CapNhatSanPhamRequest extends TaoSanPhamRequest {
  trangThai: boolean;
}

// Interface loại sản phẩm
export interface LoaiSanPhamAPI {
  loai_Id: number;
  tenLoai: string;
  moTa?: string;
  hinhAnh?: string;
}

// Interface nhà cung cấp
export interface NhaCungCapAPI {
  nhaCungCap_Id: number;
  tenNCC: string;
  soDienThoai?: string;
  email?: string;
  diaChi?: string;
  trangThai: boolean;
}

// Interface sản phẩm cho frontend (tương thích với code cũ)
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
  loaiCon?: string;
  thuongHieu?: string;
  mauSac?: string;
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

export interface ChiTietDonHangRequestAPI {
  sanPham_Id: number;
  soLuong: number;
  giaBan: number;
}

export interface TaoDonHangRequest {
  khachHang_Id?: number;
  nhanVien_Id?: number;
  km_Id?: number;
  diaChiGiao: string;
  phuongThucTT: string;
  ghiChu?: string;
  chiTiet: ChiTietDonHangRequestAPI[];
}

export interface DonHangAPI {
  donHang_Id: number;
  khachHang_Id?: number | null;
  nhanVien_Id?: number | null;
  km_Id?: number | null;
  maDonHang?: string;
  ngayDat: string;
  ngayGiao?: string | null;
  diaChiGiao?: string;
  phuongThucTT?: string;
  trangThaiDH: string;
  tongTienGoc: number;
  tienGiam: number;
  tongThanhToan: number;
  ghiChu?: string;
}

export interface CapNhatTrangThaiDonHangRequest {
  trangThaiDH: string;
}

// ============================================
// ĐỊNH NGHĨA KIỂU DỮ LIỆU - KHO HÀNG
// ============================================

export interface KhoTonKhoAPI {
  kho_Id: number;
  sanPham_Id: number;
  maSanPham?: string | null;
  tenSanPham: string;
  hinhAnh?: string | null;
  giaBan: number;
  giaNhap: number;
  soLuongTon: number;
  soLuongToiThieu: number;
  viTriKho?: string | null;
  ngayCapNhat: string;
  canhBaoSapHet?: boolean;
}

export interface KhoCapNhatRequest {
  soLuongTon: number;
  soLuongToiThieu: number;
  viTriKho?: string | null;
}

export interface LichSuKhoAPI {
  loaiGiaoDich: string;
  soChungTu: string;
  ngayGiaoDich: string;
  sanPham_Id: number;
  tenSanPham: string;
  soLuong: number;
  donGia: number;
  thanhTien: number;
  doiTuong?: string | null;
  trangThai?: string | null;
}

// ============================================
// ĐỊNH NGHĨA KIỂU DỮ LIỆU - NHẬP HÀNG
// ============================================

export interface ChiTietHDNhapRequestAPI {
  sanPham_Id: number;
  soLuong: number;
  giaNhap: number;
}

export interface TaoHoaDonNhapRequest {
  nhaCungCap_Id: number;
  nhanVien_Id: number;
  ghiChu?: string;
  chiTiet: ChiTietHDNhapRequestAPI[];
}

export interface HoaDonNhapAPI {
  hdNhap_Id: number;
  nhaCungCap_Id: number;
  nhanVien_Id: number;
  maHDNhap?: string;
  ngayNhap: string;
  tongTien: number;
  ghiChu?: string | null;
  trangThai: string;
}
