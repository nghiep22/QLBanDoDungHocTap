export interface DoHocTap {
  doHocTap_Id: number;
  tenDoHocTap: string;
  moTa?: string;
  giaBan: number;
  soLuongTon: number;
  hinhAnh?: string;
  loaiDoHocTap_Id: number;
  tenLoai?: string;
  trangThai: boolean;
}

export interface LoaiDoHocTap {
  loaiDoHocTap_Id: number;
  tenLoai: string;
  moTa?: string;
}

export interface DonHang {
  donHang_Id?: number;
  ngayDat: string;
  tongTien: number;
  trangThaiDH: string;
  chiTietDonHang: ChiTietDonHang[];
}

export interface ChiTietDonHang {
  doHocTap_Id: number;
  soLuong: number;
  donGia: number;
}

export interface GioHang {
  sanPham: DoHocTap;
  soLuong: number;
}
