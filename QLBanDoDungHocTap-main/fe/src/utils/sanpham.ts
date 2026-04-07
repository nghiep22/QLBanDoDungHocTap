// ============================================
// HELPER FUNCTIONS CHO SẢN PHẨM
// ============================================

import type { SanPhamAPI, SanPham } from '../types';

// Chuyển đổi từ format API sang format frontend
export const chuyendoisanpham = (apiSanPham: SanPhamAPI): SanPham => {
  return {
    id: apiSanPham.sanPham_Id,
    ma: apiSanPham.maSanPham || `SP${apiSanPham.sanPham_Id}`,
    ten: apiSanPham.tenSanPham,
    moTa: apiSanPham.moTa,
    giaBan: apiSanPham.giaBan,
    giaGoc: apiSanPham.giaNhap,
    hinhAnh: apiSanPham.hinhAnh || 'https://via.placeholder.com/400',
    loaiId: apiSanPham.loai_Id,
    soLuongTon: 100, // Mặc định, cần API kho để lấy chính xác
    giamGia: 0,
    hot: false,
    moi: false,
    daBan: 0,
  };
};

// Chuyển đổi danh sách
export const chuyendoidanhsachsanpham = (apiDanhSach: SanPhamAPI[]): SanPham[] => {
  return apiDanhSach.map(chuyendoisanpham);
};

// Map loại sản phẩm
export const danhsachloaisanpham = [
  { id: 1, ten: 'Văn phòng phẩm', slug: 'van-phong-pham' },
  { id: 2, ten: 'Sách & Vở', slug: 'sach-vo' },
  { id: 3, ten: 'Dụng cụ vẽ', slug: 'dung-cu-ve' },
  { id: 4, ten: 'Ba lô & Túi', slug: 'ba-lo-tui' },
  { id: 5, ten: 'Điện tử học tập', slug: 'dien-tu-hoc-tap' },
];

// Lấy loại ID từ slug
export const layloaiidtuslug = (slug: string): number | undefined => {
  const loai = danhsachloaisanpham.find(l => l.slug === slug);
  return loai?.id;
};

// Lấy tên loại từ ID
export const laytenloaituid = (id: number): string => {
  const loai = danhsachloaisanpham.find(l => l.id === id);
  return loai?.ten || 'Khác';
};
