// ============================================
// HELPER FUNCTIONS CHO SẢN PHẨM
// ============================================

import type { SanPhamAPI, SanPham } from '../types';
import { danhMucTinhTheoSlug, danhSachThuocTinhLoc, layDanhMucTheoLoaiId, timMauTheoHexHoacTen } from '../data/categoryData';

const slugTheoLoaiId: Record<number, string> = {
  1: 'van-phong-pham',
  2: 'sach-vo',
  3: 'dung-cu-ve',
  4: 'ba-lo-tui',
  5: 'dien-tu-hoc-tap',
};

const suyRaThuongHieuTuTen = (tenSanPham: string, slug?: string) => {
  const thuongHieus = slug ? (danhMucTinhTheoSlug[slug]?.brands || []) : danhSachThuocTinhLoc.brands;
  const ten = tenSanPham.toLowerCase();
  return thuongHieus.find((thuongHieu) => ten.includes(thuongHieu.toLowerCase())) || 'Thiên Long';
};

const suyRaLoaiConTuTen = (tenSanPham: string, loaiId: number) => {
  const danhMuc = layDanhMucTheoLoaiId(loaiId);
  const ten = tenSanPham.toLowerCase();
  return (
    danhMuc?.productTypes.find((loaiCon) => {
      const tuKhoa = loaiCon.toLowerCase().split(/\s+/);
      return tuKhoa.some((tu) => tu.length > 2 && ten.includes(tu));
    }) || danhMuc?.productTypes[0]
  );
};

const suyRaMauSacMacDinh = (id: number, loaiId: number) => {
  const danhMuc = layDanhMucTheoLoaiId(loaiId);
  if (!danhMuc || danhMuc.colors.length === 0) return undefined;
  return danhMuc.colors[id % danhMuc.colors.length]?.name;
};

// Chuyển đổi từ format API sang format frontend
export const chuyendoisanpham = (apiSanPham: SanPhamAPI): SanPham => {
  const slug = slugTheoLoaiId[apiSanPham.loai_Id];
  const mauSac = apiSanPham.mauSac
    ? (timMauTheoHexHoacTen(apiSanPham.mauSac)?.name || apiSanPham.mauSac)
    : suyRaMauSacMacDinh(apiSanPham.sanPham_Id, apiSanPham.loai_Id);

  return {
    id: apiSanPham.sanPham_Id,
    ma: apiSanPham.maSanPham || `SP${apiSanPham.sanPham_Id}`,
    ten: apiSanPham.tenSanPham,
    moTa: apiSanPham.moTa,
    giaBan: apiSanPham.giaBan,
    giaGoc: apiSanPham.giaNhap,
    hinhAnh: apiSanPham.hinhAnh || 'https://via.placeholder.com/400',
    loaiId: apiSanPham.loai_Id,
    loaiCon: apiSanPham.loaiCon || suyRaLoaiConTuTen(apiSanPham.tenSanPham, apiSanPham.loai_Id),
    thuongHieu: apiSanPham.thuongHieu || suyRaThuongHieuTuTen(apiSanPham.tenSanPham, slug),
    mauSac,
    soLuongTon: apiSanPham.soLuongTon ?? 0,
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
